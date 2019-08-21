var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 5;

var lemmatizer = new Lemmatizer();

var videoId = 0;
var speechWords;
var wordsAmount;

var MAXPHRASELENGTH = 4;

var fallbackInterval;

function pageOnLoad(){
    document.getElementById("videoPlayer").onended = function() {
        playNext();
    };
}

function playNext(){
    videoId ++;
    if(videoId < wordsAmount){
        playSpeechVideo(videoId);
    } else { // finished
        document.getElementById('listeningButton').innerHTML = "Start Listening";
        document.getElementById('listeningButton').setAttribute('href', "javascript:startListening()");
        document.getElementById('videoDiv').style.display = "block";;
        document.getElementById('fallbackWord').style.display = "none";
        document.getElementById('videoPlayer').src = "https://asl-videos.s3.amazonaws.com/all/snake.mp4";
    }
}

recognition.onresult = function(event) {
    let result = event.results[0][0].transcript.toLowerCase();
    speechWords = result.split(" ");

    for (var i = 0; i < speechWords.length; i++) {
        console.log( speechWords[i] + ':' + lemmatizer.only_lemmas(speechWords[i])[0]);
        speechWords[i] = lemmatizer.only_lemmas(speechWords[i])[0];
        console.log( speechWords[i]);
    }

    for (i=2; i<= MAXPHRASELENGTH; i++){ // go through all length
        var j= i -1;
        while (typeof speechWords[j] !== 'undefined' ){
            var newWord = "";
            for (k=i; k >= 1 ; k--){
                newWord += (speechWords[j-k+1] + " ");
            }
            newWord = newWord.trim();
            if (predefinedWords.indexOf(newWord) >= 0 ) { // word is in the predefined list
                speechWords[j] = newWord;
                speechWords.splice(j -i + 1, i-1);
            }
            j++;
        }
    }
    wordsAmount = speechWords.length;
    videoId = 0;
    document.getElementById('listeningButton').innerHTML = "Showing ASL";
    playSpeechVideo(videoId);
};

function showFallbackWord(word){
    document.getElementById('videoDiv').style.display = "none";;
    document.getElementById('fallbackWord').style.display = "block";
    document.getElementById('fallbackWord').innerHTML = word;
    fallbackInterval = setInterval(
        function(){
            clearInterval(fallbackInterval);
            playNext();
        },
        1800
    );
}

function playVideo(fileName){
    document.getElementById('videoDiv').style.display = "block";;
    document.getElementById('fallbackWord').style.display = "none";
    var video = document.getElementById('videoPlayer');
    video.src = "https://asl-videos.s3.amazonaws.com/all/" + fileName + ".mp4";
    video.play();
}

function playSpeechVideo(videoId){

    if (videoId < wordsAmount) {
        if (predefinedWords.indexOf(speechWords[videoId]) >= 0 ) { // word is in the predefined list
            playVideo(speechWords[videoId]);
        }else{
            showFallbackWord(speechWords[videoId]);
        }
    }
};

function startListening(){
    videoId = 0;
    wordsAmount = 0;
    speechWords = [];
    document.getElementById('listeningButton').innerHTML = "Listening";
    document.getElementById('listeningButton').setAttribute('href', "javascript: return false;");
    recognition.start();
}