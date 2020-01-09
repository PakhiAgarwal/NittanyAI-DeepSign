import cv2
import os
INPUTPATH = '/DSResources/SecondRound/'
OUTPUTPATH = '/DSResources/Output/OpticalFlow/'

def find_folder(input_root_path):
    imagePath = os.listdir(input_root_path)
    for p in imagePath:
        in_folder_list = []
        in_path = input_root_path + '/' + os.path.splitext(p)[0]
        out_path = OUTPUTPATH + '/' + os.path.splitext(p)[0]

        if os.path.isdir(out_path) is False:
            os.mkdir(out_path)

        folders = os.listdir(in_path)
        #show all the folders in this path

        #folders.remove('.DS_Store')
        for f in folders:
            in_folder_list.append(f)            #
            create_frame(in_path, f, out_path)
    print('The number of input folders is:', len(in_folder_list))

def create_frame(folder_path, f, out_path):
    #img_path = folder_path.replace('video', 'image')
    img_path = out_path + '/' + os.path.splitext(f)[0]
    if os.path.isdir(img_path) is False:
        os.mkdir(img_path)

    video_path = os.listdir(folder_path)
    for video in video_path:
        frame(folder_path + '/' + video, out_path + '/' + os.path.splitext(video)[0])

def frame(path, outputPath):
    vc = cv2.VideoCapture(path) #read videos files
    c=0
    rval=vc.isOpened()

    while rval:   #read images
        c = c + 1
        rval, frame = vc.read()

    #    if(c%timeF == 0): #Reda image very timeF frame
    #        cv2.imwrite('smallVideo/smallVideo'+str(c) + '.jpg', frame) #store as images
        if rval:
            cv2.imwrite(outputPath + '/' + str(c) + '.jpg', frame) #store as images
            cv2.waitKey(1)
        else:
            break
    vc.release()


find_folder(INPUTPATH)