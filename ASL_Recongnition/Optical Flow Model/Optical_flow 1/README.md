# Optical Flow Model

Optical flow model tracks the motion of an object by comparing the differences between frames. Optical flow is basically used 
for tracking cars, for tracking insects like ants, tracking people in stores to analyze the shopping pattern.

## Steps to run the code:

### Method I: ImageNet Transfer Learning using LSTM

CNNs trained on ImageNet can be used to extract image features like eyes, mouth, corners, etc. ImageNet can be easily re-used for any type of Image classification. 
LSTM is Long Short-term memory. The Short-term here is used to detect the flow/motion of hand. Long-term is used to remember the sequence.

<p align="center">
<img src="https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/Model%201.JPG">
</p>

#### 1. Extracting Image Frames-

[frame.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/frame.py) is used for extracting image frames from each video.

#### 2. Calculating Optical Flow-

[opticalflow.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/opticalflow.py) calculates optical flow from the image frames of the video. [opticalflow.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/opticalflow.py) is dependent on [frame.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/frame.py) and [timer.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/timer.py). 
[timer.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/timer.py) is used for measurement of time.

#### 3. Training the Neural Network-

[train_mobile_lstm.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/train_mobile_lstm.py) trains the Neural Network. It involves training an LSTM Neural network to classify the videos. It requires pre-computed features calculated for each video frame as input. It is dependent of [datagenerator.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/datagenerator.py) and [model_lstm.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/model_lstm.py). 
[model_lstm.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/model_i3d.py) defines/loads a Keras LSTM model .
Training requires a GPU is performed through a generator which is done using [datagenerator.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/datagenerator.py).
[model_mobile.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/model_mobile.py) is used to load pre-trained MobileNet or Inception CNN to perform some checks. 
[pipeline_mobile_lstm.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/pipeline_mobile_lstm.py) extracts frames from videos. It also calculates Optical flow and MobileNet features from frames and from Optical Flow. It trains an LSTM Neural Network.

#### 4. Realtime Recognition-

[livedemo.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/livedemo.py) launches the webcam and uses the neural network to predict gestures of sign language.
[livedemo.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/livedemo.py) is dependent on [predict.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/predict.py), [datagenerator.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/datagenerator.py), [timer.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/timer.py), [frame.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/frame.py),[videocapture.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/videocapture.py), [opticalflow.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/opticalflow.py), [model_mobile.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/model_mobile.py), [model_lstm.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/model_i3d.py).
[videocapture.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/videocapture.py) provides utilities for launching the webcam, capture or record the video, and display text and bounding box on screen.
[predict.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/predict.py) is used for predicting output label with neural network.

### Method II: Using Optical Flow



### Method III: Pre-trained 3D CNN from DeepMind

A 3D CNN adds time as a third dimension to "classical" 2D CNNs. The I3D model created by DeepMind is inflated from 2D-Inception CNN. I3D is built over the pretraining from ImageNet and is pretrained on Kinetics human action video dataset. 
Here we used pretrained I3D for transfer learning. 

<p align="center">
<img align="center" src="https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/Model%203.JPG">
</p>

#### 1. Extracting Image Frames-

[frame.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/frame.py) is used for extracting image frames from each video.

#### 2. Calculating Optical Flow-

[opticalflow.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/opticalflow.py) calculates optical flow from the image frames of the video. [opticalflow.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/opticalflow.py) is dependent on [frame.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/frame.py) and [timer.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/timer.py). 
[timer.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/timer.py) is used for measurement of time.

#### 3. Training the Neural Network-

[train_i3d.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/train_i3d.py) trains the Neural Network. It involves training a pre-trained I3D convolutional network to classify the videos. It is dependent of [datagenerator.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/datagenerator.py) and [model_i3d.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/model_i3d.py). 
[model_i3d.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/model_i3d.py) contains a pretrained 3D convolutional neural network, which was developed in 2017 by Deepmind.
Training requires a GPU is performed through a generator which is done using [datagenerator.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/datagenerator.py).
[pipeline_i3d](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/pipeline_i3d.py) is used extract frames from videos(training and validation). It also calculates Optical Flow and trains an I3D Neural Network.

#### 4. Realtime Recognition-

[livedemo.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/livedemo.py) launches the webcam and uses the neural network to predict gestures of sign language.
[livedemo.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/livedemo.py) is dependent on [predict.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/predict.py), [model_i3d.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/model_i3d.py), [datagenerator.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/datagenerator.py), [timer.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/timer.py), [frame.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/frame.py),[videocapture.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/videocapture.py), [opticalflow.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/opticalflow.py).
[videocapture.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/videocapture.py) provides utilities for launching the webcam, capture or record the video, and display text and bounding box on screen.
[predict.py](https://github.com/simonrh/DeepSign/blob/master/Optical%20Flow%20Model/Optical_flow%201/predict.py) is used for predicting output label with neural network.



