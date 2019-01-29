# coding= utf-8
import os
import cv2
import numpy as np

from read_img import endwith

#Enter a file path, read the images under each folder under it, and give each folder a different Label
#Returns an img list, returns a list of labels, returns a few folders (there are several labels)

def read_file(path):
    img_list = []
    label_list = []
    dir_counter = 0

    #for i in os.listdir(path):
        #print (os.path.isfile(i))
    #Read all jpg files in all subfolders under the path and save them to a list
    for child_dir in os.listdir(path):
        if os.path.isfile(child_dir)==False:
            child_path = os.path.join(path, child_dir)
            for dir_image in os.listdir(child_path):
                print(child_path)
                if endwith(dir_image,'jpg'):
                    img = cv2.imread(os.path.join(child_path, dir_image))
                    img =cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
                    img_list.append(img)
                    label_list.append(dir_counter)

            dir_counter += 1

    # The returned img_list is converted to the format of np.array
    img_list = np.array(img_list)

    return img_list,label_list,dir_counter

#Read the folder of the training dataset and return their name to a list
def read_name_list(path):
    name_list = []
    for child_dir in os.listdir(path):
        if os.path.isfile(child_dir)==False:
            name_list.append(child_dir)
    return name_list



if __name__ == '__main__':
    img_list,label_lsit,counter = read_file('im')
    print (counter)

