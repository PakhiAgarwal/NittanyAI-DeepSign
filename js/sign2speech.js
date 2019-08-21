// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using DoodleNet and p5.js
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier method with DoodleNet.
let mobilenet;
let classifier;

// A variable to hold the Webcam video we want to classify
let video;

// Two variable to hold the label and confidence of the result
let label = 'loading model';

let classifyButton;

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
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);
    console.log("Preloaded!");
}

function modelReady(){
    console.log('Model is ready!!!');
    classifier.load('https://ldt.vmhost.psu.edu/deepsign/DeepSignOnline/model.json', customModelReady);
}

function customModelReady(){
    console.log('Custom Model is ready!!!');
    classifyVideo();
}

function videoReady(){
    console.log('Video is ready!!!');
}

function setup() {
    /*
    // Create a 'label' and 'confidence' div to hold results
    createCanvas(640,480)
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    // Load the DoodleNet Image Classification model
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);
    console.log("Set up!");
    video.parent("videoPlayDiv");
     */
}

function classifyVideo(){
    console.log("Start to classify!");
    classifier.classify(gotResults);
}

function draw2(){
    background(0);
    image(video, 0, 0, 640, 480);
    fill(255);
    textSize(16);
    text(label, 10, height - 10);
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
    // Call classifyVideo again
    //classifyVideo();
}
