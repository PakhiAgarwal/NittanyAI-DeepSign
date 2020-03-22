# -*- coding: utf-8 -*-

from read_data import read_file
#from sklearn.model_selection import train_test_split
from sklearn.model_selection import train_test_split
from keras.utils import np_utils
import random

#Create a class for storing and formatting read training data
class DataSet(object):
    def __init__(self,path):
        self.num_classes = None
        self.X_train = None
        self.X_test = None
        self.Y_train = None
        self.Y_test = None
        self.extract_data(path)
        #Read the training data in the path during the initialization of this class

    def extract_data(self,path):
        #Read the number of pictures, tags, and categories based on the specified path
        imgs,labels,counter = read_file(path)
  
        print("Output tag")
        print(labels)

        #Dataset random grouping    
        
        
        X_train,X_test,y_train,y_test = train_test_split(imgs,labels,test_size=0.4,random_state=random.randint(0, 100))
        print("Output training mark and training set length")
        print(y_train)
        print(len(X_train))
        print(X_train[1])
        print("Test length and test set tag")
        print(len(X_test))
        print(y_test)
        print("Output and")
        print(counter)

        #reformatting and standardization
        # This case is based on thano, if the backend based on tensorflow needs to be modified
        print(X_train.shape)
        X_train = X_train.reshape(X_train.shape[0], 480, 640, 1)
        X_test = X_test.reshape(X_test.shape[0], 480, 640,1)
        
        
        X_train = X_train.astype('float32')/255
        X_test = X_test.astype('float32')/255
        print(X_train[1])

       #labels into binary class matrices
        Y_train = np_utils.to_categorical(y_train, num_classes=counter)
        Y_test = np_utils.to_categorical(y_test, num_classes=counter)
        
        print(Y_train)
        # Assign the formatted data to the properties of the class
        self.X_train = X_train
        self.X_test = X_test
        self.Y_train = Y_train
        self.Y_test = Y_test
        self.num_classes = counter

    def check(self):
        print('num of dim:', self.X_test.ndim)
        print('shape:', self.X_test.shape)
        print('size:', self.X_test.size)

        print('num of dim:', self.X_train.ndim)
        print('shape:', self.X_train.shape)
        print('size:', self.X_train.size)
        

        
