// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using DoodleNet and p5.js
This example uses a callback pattern to create the classifier
=== */

var words = ["NO SIGN", "hello", "ok", "apple","STOP"];
var noSignWord = "NO SIGN";
var stopWord = "STOP";
var infoTexts = [];
var sampleSizes = [];
var currentWord = "";
var lastWord = "";

// Initialize the Image Classifier method with DoodleNet.
let mobilenet;
let classifier;
let epochs = 1;

// A variable to hold the Webcam video we want to classify
let video;

// Two variable to hold the label and confidence of the result
let label = 'loading model';
let confidence;
let ukeButton;
let whistleButton;

let happyButton;
let sadButton;
let trainButton;
let saveButton;
let classifyButton;

let currentVoice;

// list of languages is probably not loaded, wait for it
if(window.speechSynthesis.getVoices().length == 0) {
    window.speechSynthesis.addEventListener('voiceschanged', function() {
        textToSpeech();
    });
}
else {
    // languages list available, no need to wait
    textToSpeech()
}

function textToSpeech() {
    // get all voices that browser offers
    var available_voices = window.speechSynthesis.getVoices();

    // this will hold an english voice
    var english_voice = '';

    // find voice by language locale "en-US"
    // if not then select the first voice
    for(var i=0; i<available_voices.length; i++) {
        if(available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    if(english_voice === '')
        currentVoice = available_voices[1];
}

function speakWord(word){
    // new SpeechSynthesisUtterance object
    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = word;
    utter.voice = currentVoice;

    // event after text has been spoken
    utter.onend = function() {
        console.log('Speech has finished');
        // Call classifyVideo again
        //classifyVideo();
        if(currentWord!=stopWord){
            classifier.classify(gotResults);
        }


    }
    // speak
    window.speechSynthesis.speak(utter);
}

function preload() {
    // Create a camera input

    video = createCapture(VIDEO, {
        video: {
            width: 640,
            height: 480,
            aspectRatio: 1
        }
    });

    video.parent("videoPlayDiv");
    // Load the DoodleNet Image Classification model
    mobilenet = ml5.featureExtractor('MobileNet', {numLabels:5}, modelReady);
    mobilenet.numLabels = 5;
    classifier = mobilenet.classification(video, videoReady);

    console.log("Preloaded!");
}

function modelReady(){
    console.log('Model is ready!!!');
    //classifier.load('model.json. customModelReady');
}

function customModelReady(){
    console.log('Custom Model is ready!!!');
}

function videoReady(){
    console.log('Video is ready!!!');
}

function prepareTraining(){
    document.getElementById("rightPanel").style.display = "block";
    document.getElementById("prepareButton").style.display = "none";
}

function startTraining(){
    document.getElementById("training-list").style.display = "none";
    document.getElementById("trainingResultsDiv").style.display = "block";
    document.getElementById("trainingResultsDiv").innerText = "Start to train...\n"
    classifier.train(whileTraining);
}

function finishTraining(){
    document.getElementById("rightPanel").style.display = "none";
}

function saveModel(){
    console.log("Start to save!");
    classifier.save();
    console.log("Save finished!");
}

function startSigning(){
    console.log("Start to classify!");
    document.getElementById("status-text").innerText = "";
    document.getElementById("status-text").style.display = "block";
    document.getElementById("signButton").style.display = "none";
    classifier.classify(gotResults);
}

function createButtonList(showBtn){
    //showBtn - true: show training btns, false:show only text

    // Clear List
    var exampleListDiv = document.getElementById("example-list");
    exampleListDiv.innerHTML = "";

    // Create training buttons and info texts
    for(let i=0;i<words.length; i++){
        sampleSizes[i] = 0;
        createWordButton(i, showBtn);
    }
}

function createWordButton(i, showBtn){
    const div = document.createElement('div');
    var exampleListDiv = document.getElementById("example-list");
    exampleListDiv.appendChild(div);
    div.style.marginLeft = '70px';
    div.style.marginBottom = '10px';
    div.style.display = "flex";

    const labelDiv = document.createElement('div');
    labelDiv.style.width = '120px';
    labelDiv.style.marginTop = '10px';
    div.appendChild(labelDiv);
    // Create Word Text
    const wordText = document.createElement('span');

    wordText.innerText = words[i].toUpperCase()+" ";
    wordText.style.fontWeight = "bold";

    labelDiv.appendChild(wordText);

    if(showBtn){

        // Create info text
        const infoText = document.createElement('span');
        infoText.innerText = "(0)";
        labelDiv.appendChild(infoText);
        infoTexts.push(infoText);


        const buttonDiv = document.createElement('div');
        buttonDiv.style.width = '250px';
        div.appendChild(buttonDiv);

        // Create training button
        const button = document.createElement('button');
        button.innerText = "Add Example";//"Train " + words[i].toUpperCase()
        buttonDiv.appendChild(button);

        // Listen for mouse events when clicking the button
        button.addEventListener('mousedown', function() {
            classifier.addImage(words[i]);
            sampleSizes[i] ++;
            infoTexts[i].innerText = "("+ sampleSizes[i] +")";
            console.log(words[i]);
        });


        // Create clear button to emove training examples
        /*
        const btn = document.createElement('button');
        btn.innerText = "Clear";//`Clear ${words[i].toUpperCase()}`
        buttonDiv.appendChild(btn);

        btn.addEventListener('mousedown', () => {
            console.log("clear training data for this label");
            infoTexts[i].innerText = "(0)";
        })
         */
    }
}

function setup() {
    // Create a 'label' and 'confidence' div to hold results

    createButtonList(true);

    console.log("Setup1!");
    //classifyVideo();
    console.log("Setup2!");
}



function whileTraining(loss){
    if(loss == null){
        console.log('Training Complete');
        document.getElementById("trainingResultsDiv").innerText = "Training Complete\n" + document.getElementById("trainingResultsDiv").innerText;
        document.getElementById("finishTrainDiv").style.display = "block";
        document.getElementById("signButton").style.display = "block";

        epochs = 1;
    }else{
        console.log('Epochs(' + epochs + '): ' + loss);
        document.getElementById("trainingResultsDiv").innerText = 'Epochs(' + epochs + '): ' + loss + "\n" + document.getElementById("trainingResultsDiv").innerText;
        epochs ++;
    }
}

// A function to run when we get any errors and the results
function gotResults(error, results) {
    // Display error in the console
    if (error) {
        console.error(error);
    }
    // The results are in an array ordered by confidence.
    //console.log(results);
    // Show the first label and confidence
    //label.html('Label: ' + results[0].label);
    //confidence.html('Confidence: ' + nf(results[0].confidence, 0, 2)); // Round the confidence to 0.01

    currentWord = results[0].label;
    if (currentWord== stopWord){
        document.getElementById("status-text").innerText = currentWord;
        speakWord(currentWord);
        document.getElementById("signButton").style.display = "block";
    }else if (currentWord!= noSignWord && currentWord != lastWord) {
        document.getElementById("status-text").innerText = currentWord;
        speakWord(currentWord);
        lastWord = currentWord;
    } else {
        classifier.classify(gotResults);
    }
}
