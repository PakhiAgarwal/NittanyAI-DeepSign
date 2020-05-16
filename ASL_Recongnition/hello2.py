from flask import Flask, render_template, Response, jsonify, request, flash, abort
from flask_socketio import SocketIO, join_room, emit
import cv2
import base64
import numpy as np
from werkzeug.utils import secure_filename
import os
from base64 import b64encode

#ffmpeg -i 'output.avi' -ac 2 -b:v 2000k -c:a aac -c:v libx264 -b:a 160k -vprofile high -bf 0 -strict experimental -f mp4 'output.mp4'
def g():
    with open('output.mp4', mode='rb') as o:
        x=o.read()
    r=b64encode(x)
    w = jsonify({"b": r})


def gg():
    #filepath='abcd/upload/blob.webm'
    #cap = cv2.VideoCapture(filepath)
	out = cv2.VideoWriter('output.avi', cv2.VideoWriter_fourcc(*'DIVX'), 15, (640, 480))
	cap = cv2.VideoCapture(0)
	while (cap.isOpened()):
		# Capture frame-by-frame
		ret, frame = cap.read()
		print (frame.shape)
		if ret == True:
			# Display the resulting frame
			cv2.imshow('Frame',frame)
			out.write(frame)
			# Press Q on keyboard to  exit
			if cv2.waitKey(25) & 0xFF == ord('q'):
				break
		# Break the loop
		else:
			break
	cap.release()
	out.release()


if __name__ == '__main__':
	g()
