import cv2 as cv
import numpy as np
import os



def get_image(path):
	cap = cv.VideoCapture(path)
	ret, frame1 = cap.read()
	prvs = cv.cvtColor(frame1,cv.COLOR_BGR2GRAY)
	hsv = np.zeros_like(frame1)
	hsv[...,1] = 255
	i = 0
	while(1):
		ret, frame2 = cap.read()
		if ret==False:
			break
		next = cv.cvtColor(frame2,cv.COLOR_BGR2GRAY)
		flow = cv.calcOpticalFlowFarneback(prvs,next, None, 0.5, 3, 15, 3, 5, 1.2, 0)
		mag, ang = cv.cartToPolar(flow[...,0], flow[...,1])
		hsv[...,0] = ang*180/np.pi/2
		hsv[...,2] = cv.normalize(mag,None,0,255,cv.NORM_MINMAX)
		bgr = cv.cvtColor(hsv,cv.COLOR_HSV2BGR)

		k = cv.waitKey(30) & 0xff
		if k == 27:
			break

		img = path.replace('video', 'image')
		img = img.replace('.webm', '_')
		cv.imwrite(img + str(i) + '.png',bgr)
		i = i+ 1
		prvs = next
	cap.release()
	cv.destroyAllWindows()


def find_folder(in_path):
	in_folder_list = []
	folders = os.listdir(in_path)


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
		get_image(folder_path + '/' + video)



find_folder('/Users/wanghang/Downloads/DeepSign Videos/PN1-2/video/')