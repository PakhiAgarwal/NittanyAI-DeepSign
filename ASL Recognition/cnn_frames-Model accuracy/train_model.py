# coding= utf-8
from dataSet import DataSet
from keras.models import Sequential,load_model
from keras.layers import Dense,Activation,Convolution2D,MaxPooling2D,Flatten,Dropout,BatchNormalization
import numpy as np
from keras.callbacks import TensorBoard
from keras.utils import plot_model


#Establish a recognition model based on CNN
class Model(object):
    FILE_PATH = "model.h5"   #Where the model is stored and read
    def __init__(self):
        self.model = None

    #Read the instantiated DataSet class as the data source for training
    def read_trainData(self,dataset):
        self.dataset = dataset

    #Create a CNN model, a layer of convolution, a layer of pooling, a layer of convolution, a layer of pooling, smoothing, then full link, and finally classification. Flatten is a function that is one-dimensional for multidimensional input. Floor
    def build_model(self):
        self.model = Sequential()
        self.model.add(
            Convolution2D(
                          
                filters=32,
                kernel_size=(5, 5),
                padding='same',
                dim_ordering='tf',
                input_shape=self.dataset.X_train.shape[1:], 
               
            )
        )
        self.model.add( BatchNormalization())

        self.model.add(Activation('relu'))
        self.model.add(
            MaxPooling2D(
                pool_size=(2, 2),
                strides=(2, 2), 
                padding='same'
            )
        )
        

        self.model.add(Convolution2D(filters=64, kernel_size=(5, 5), padding='same'))
        self.model.add(BatchNormalization())
        self.model.add(Activation('relu'))
        self.model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2), padding='same'))
        self.model.add(Dropout(0.15))
        
        
        self.model.add(Convolution2D(filters=64, kernel_size=(5, 5), padding='same'))
        self.model.add(BatchNormalization())
        self.model.add(Activation('relu'))
        self.model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2), padding='same'))
        self.model.add(Dropout(0.15))
        

        self.model.add(Flatten())
        self.model.add(Dense(512))
        self.model.add(BatchNormalization())
        self.model.add(Activation('relu'))
        self.model.add(Dropout(0.5))
        
        self.model.add(Dense(128))
        self.model.add(BatchNormalization())
        self.model.add(Activation('relu'))
        self.model.add(Dropout(0.5))
        
        self.model.add(Dense(self.dataset.num_classes))
        self.model.add(BatchNormalization())
        self.model.add(Activation('softmax'))
        self.model.summary()
#         plot_model(model,to_file='G:/desktop/myProject/model.png')
        
    #Functions for model training, specific optimizer, loss can be used for different choices
    def train_model(self):
        self.model.compile(
            optimizer='adadelta',  #There are a lot of optional optimizers, such as RMSprop, Adagrad, you can also try which one is good, I personally feel the difference is not big adadelta            Loss='squared_hinge', #you can use categorical_crossentropy squared_hinge as a loss to see which is better
            metrics=['accuracy'])

        #Epochs, batch_size are adjustable parameters, epochs is how many rounds are trained, and batch_size is how many samples are trained each time.
        self.model.fit(self.dataset.X_train,self.dataset.Y_train,epochs=1,batch_size=20,callbacks=[TensorBoard(log_dir='aa')])

    def evaluate_model(self):
        print('\nTesting---------------')
        loss, accuracy = self.model.evaluate(self.dataset.X_test, self.dataset.Y_test)

        print('test loss;', loss)
        print('test accuracy:', accuracy)

    def save(self, file_path=FILE_PATH):
        print('Model Saved.')
        self.model.save(file_path)

    def load(self, file_path=FILE_PATH):
        print('Model Loaded.')
        self.model = load_model(file_path)

    #Need to ensure that the input img is grayed out (channel =1) and the size is IMAGE_SIZE face image
    def predict(self,img):
        img = img.reshape((1,  480, 640,1))
        img = img.astype('float32')
        img = img/255.0
        result = self.model.predict_proba(img)  #Calculate the probability that the img belongs to a label
        max_index = np.argmax(result) #Find the highest probability

        return max_index,result[0][max_index] #The first parameter is the index of the label with the highest probability, and the second parameter is the corresponding probability.


if __name__ == '__main__':
    datast = DataSet('im')
    model = Model()
    model.read_trainData(datast)
    model.build_model()
    model.train_model()
    model.evaluate_model()
    model.save()
    #score=model.evaluate()
























