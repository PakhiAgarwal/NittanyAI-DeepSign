var pictureIds = [];
var totalPictures = 155;
var times = [5, 4, 3]; // Time for each picture in seconds
var interval;
var time;
var numPictures;
var level;
var progress;
var currentPicture = 0;
var ringColors = ["blue", "green", "yellow", "orange"];
var assessmentId = 0;

var mediaRecorder;
var recordedChunks = [];

var startingRingWidth = 300;

// Randomly picks amount pictures and returns an array pictureIds
function getPictures(amount, totalPictures) {
    var pictureArray = [];
    
    // Add all pictureIds to an array
    for(var i = 1; i <= totalPictures; i ++) {
        pictureArray.push(i);
    }
    // Pick without replacement
    var resultArray = [];
    var rndm;
    for(var i = 0; i < numPictures; i++) {
        rndm = Math.floor(Math.random() * pictureArray.length);
        resultArray.push(pictureArray[rndm]);
        pictureArray.splice(rndm, 1); // Remove the value from the array
    }
    return resultArray;
}

// Check if camera usable
function hasGetUserMedia() {
    // Convert to a boolean by inverting and then invert again to get actual true or false
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if(hasGetUserMedia()) {
    navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;
} else {
    alert('No user media. Please use a different browser like FireFox or Chrome');
}

// Populates the level indicator
function showProgress(current, level) {
    $('#startLevelImg').attr('src', "images/animals/Small/animal" + level + ".png");
    $('#startLevelImg').attr('title', "level" + level);
    $('#startLevelImg').attr('alt', "level" + level);
    $('#endLevelImg').attr('src', "images/animals/Small/animal" + (level + 1) + ".png");
    $('#endLevelImg').attr('title', "level" + (level + 1));
    $('#endLevelImg').attr('alt', "level" + (level + 1));
    
    for(var i = 0; i < 3; i ++) {
        var segmentDiv;
        if(i < current)
            segmentDiv = "<div id='step" + i + "Div' class='stepDiv'><img id='stepImg" + i + "' src='images/activeStepBar.png' title='Step" + i + "' alt='achieved Step" + i + "'/></div>";
        else
            segmentDiv = "<div id ='step" + i + "Div' class='stepDiv'><img id='stepImg" + i + "' src='images/inactiveStepBar.png'  aria-hidden='true' role='presentation'  title='Step" + i + "' alt='Unfinished Step" + i + "'/></div>";
        $('#progress').append(segmentDiv);
    }
}

function setUpSession(userInfo) {    
    level = parseInt(userInfo["level"]);
    progress = parseInt(userInfo["progress"]);
    showProgress(progress, level);
    time = times[level - 1];
    numPictures = 60 / time;
    // Add progress dots
    for(var i = 0; i < numPictures; i ++) {
        $('.progressbar').append("<div class='dot' id='dot" + i + "'></div>");
    }
            
    // Generate the pictures to use for the session
    pictureIds = getPictures(numPictures, totalPictures);

    var options = {video:true, audio:false};

    // Start webcam preview
    navigator.mediaDevices.getUserMedia(options).then(function(localMediaStream) {
        var video = document.getElementById('camPreview');
        video.srcObject = localMediaStream;
        video.onloadedmetadata = function() {
            // Enable the begin button when the cam preview is loaded
            $('#beginButton').removeAttr('disabled');
        };
              
        // Set up the recording
        var options = {mimeType: 'video/webm'};
        if(MediaRecorder.isTypeSupported('video/webm;codecs=vp9')){
            options = {mimeType: 'video/webm;codecs=vp9'};
        } else if(MediaRecorder.isTypeSupported('video/webm;codecs=vp8')){
            options = {mimeType: 'video/webm;codecs=vp8'};
        } else if(MediaRecorder.isTypeSupported('video/webm')){
            options = {mimeType: 'video/webm'};
        } else {
            options = {mimeType: ''};
        }

        var stream = document.getElementById('camPreview').srcObject;
        mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.ondataavailable = handleDataAvailable;        
    });
}

// Saves the recorded data
function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
        recordedChunks.push(event.data);
    }
}

// Updates the image tag src to the image with id
function updateCurrentPicture(id) {
    $('#picture').attr('src', "images/pnimages/image" + id + ".png");
}

function startSession() {
    try {
        mediaRecorder.start(10); // Start recording every 10ms
    } catch(err) {
        console.log("Video Unavailable:" + err);
    }
    
    // Hide the begin button
    $('#beginButton').hide();
    
    // Set the current image to the first one
    updateCurrentPicture(pictureIds[0]);
    
    // Start the interval for displaying pictures
    interval = setInterval(function() {
        nextImage();
    }, time * 1000);
    
    // Show first image on progress bar
    $('#dot0').removeClass().addClass('dot green');

    $.ajax({
		type: 'POST',
		url: "./php/recordPNContent.php",
		data: {
            level:level,
            progress:progress,
            username:username,
            pictureIds:pictureIds
        },
        dataType: "JSON",
		success: function(result) {
            console.log(result["assessmentId"]);
            assessmentId = result["assessmentId"];
		}
	});
}

// Goes to the next image depending on currentPicture
function nextImage() {
    currentPicture ++;
    if(currentPicture > numPictures - 1) {
        console.log("Session Ending");
        endSession();
    } else {
        $('#dot' + currentPicture).removeClass().addClass('dot green');
        updateCurrentPicture(pictureIds[currentPicture]);
    }
}

function endSession() {
    clearInterval(interval);

    // Stop webcam
    document.getElementById('camPreview').srcObject.getTracks().forEach(track => track.stop());
    
    try {
        mediaRecorder.stop();
        uploadVideo();
    } catch(err) {
        console.log("Video Unavailable");
    }
}

function uploadVideo(callback) {
    var blob = new Blob(recordedChunks, {
        type: 'video/webm'
    });
    var formData = new FormData();
    formData.append('video-blob', blob);
    var videoName = assessmentId + ".webm";
    formData.append('video-filename', videoName);
    $.ajax({
        type: 'POST',
        url: "./php/savePNVideo.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function(result) {
            alert(result);
        }
    });
}

$(document).ready(function(){
    document.getElementById("beginButton").addEventListener('click', startSession, false); // Save Button
    document.getElementById("tempButton").addEventListener('click', endSession, false);
    
    $.ajax({
		type: 'GET',
		url: "./php/getPNUserInfo.php",
		data: {
            userId:username,
        },
        dataType: "JSON",
		success: function(result) {
            setUpSession(result)
        }
    });
});