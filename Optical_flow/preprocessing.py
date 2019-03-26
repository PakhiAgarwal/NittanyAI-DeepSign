import cv2
import os

def find_folder(in_path):
    in_folder_list = []
    folders = os.listdir(in_path)
    #show all the folders in this path

    folders.remove('.DS_Store')
    for f in folders:
        folder_path = in_path + f           #genearte the path
        in_folder_list.append(f)            #
        create_frame(folder_path)
    print('The number of input folders is:', len(in_folder_list))

def create_frame(folder_path):
    img_path = folder_path.replace('video', 'image')
    if os.path.isdir(img_path) is False:
        os.mkdir(img_path)

    video_path = os.listdir(folder_path)
    for video in video_path:
        frame(folder_path + '/' + video)

def frame(path):
    vc = cv2.VideoCapture(path) #读入视频文件
    c=0
    rval=vc.isOpened()



    while rval:   #循环读取视频帧
        c = c + 1
        rval, frame = vc.read()

    #    if(c%timeF == 0): #每隔timeF帧进行存储操作
    #        cv2.imwrite('smallVideo/smallVideo'+str(c) + '.jpg', frame) #存储为图像
        if rval:
            #img为当前目录下新建的文件夹
            img = path.replace('video', 'image')
            img = img.replace('.webm', '_')
            cv2.imwrite(img + str(c) + '.jpg', frame) #存储为图像
            cv2.waitKey(1)
        else:
            break
    vc.release()


find_folder('/Users/wanghang/Downloads/DeepSign Videos/PN1-2/video/')