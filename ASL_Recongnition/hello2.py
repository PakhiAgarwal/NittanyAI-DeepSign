from flask import Flask, render_template, Response, jsonify, request, flash, abort
from flask_socketio import SocketIO, join_room, emit
import cv2
import base64
import numpy as np
from werkzeug.utils import secure_filename
import os

def g():
    filepath='abcd/upload/blob.webm'
    cap = cv2.VideoCapture(filepath)
    if (cap.isOpened()== False):
        print('shobhit')
	raise 'bla'
    while(cap.isOpened()):
        # Capture frame-by-frame
        ret, frame = cap.read()
        if ret == True:
            # Display the resulting frame
            cv2.imshow('Frame',frame)
            # Press Q on keyboard to  exit
            if cv2.waitKey(25) & 0xFF == ord('q'):
                break
        # Break the loop
        else:
            break
    cap.release()


if __name__ == '__main__':
    g()
