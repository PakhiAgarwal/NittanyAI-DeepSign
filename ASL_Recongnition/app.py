import sys
sys.path.append("./Histogram Model")
from flask import Flask, render_template, Response, jsonify, request, flash, abort
from flask_socketio import SocketIO, join_room, emit
import cv2
import base64
import numpy as np
from werkzeug.utils import secure_filename
import os
from recognize_gesture import recognize
from keras.models import load_model
from base64 import b64encode
import subprocess

app = Flask(__name__, template_folder='.')
app.config['imgdir'] = 'abcd/upload'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/stream', methods=['GET'])
def stream():
    with open('output.mp4', 'rb') as o:
        x=o.read()
    return Response(x, 206, mimetype='video/mp4', content_type='video/mp4', direct_passthrough=True)

@app.route('/upload', methods=['POST'])
def upload():
    print(request.files)
    if 'data' not in request.files:
        #flash('No file part')
        abort(404)
    file = request.files['data']
    print(type(file))
    print(file.filename)
    print('--------------------------')
    filename = secure_filename(file.filename) # save file 
    filepath = os.path.join(app.config['imgdir'], filename) + '.webm'
    print(filepath)
    file.save(filepath)
    #model_path = os.path.join(app.config['imgdir'], 'cnn_model_keras2.h5')
    #print(model_path)
    #model = load_model('cnn_model_keras2.h5')

    m = recognize(filepath)

    command = r'''"C:\Users\pua66\Documents\ffmpeg-20200522-38490cb-win64-static\bin\ffmpeg" -y -i "static\output.avi" -ac 2 -b:v 2000k -c:a aac -c:v libx264 -b:a 160k -vprofile high -bf 0 -strict experimental -f mp4 "static\output.mp4"'''
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
    process.wait()
    return jsonify({"a": m})

if __name__ == '__main__':
    app.run(threaded=False)
