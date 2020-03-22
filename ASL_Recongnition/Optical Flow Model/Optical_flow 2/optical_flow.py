import cv2 as cv
import numpy as np




#cap = cv.VideoCapture("/Users/wanghang/Downloads/DeepSign Videos/Apple/31-1.mp4")
cap = cv.VideoCapture("/Users/wanghang/Downloads/DeepSign Videos/PN1-2/video/10-Shoe/32-4.webm")
ret, frame1 = cap.read()
prvs = cv.cvtColor(frame1,cv.COLOR_BGR2GRAY)
hsv = np.zeros_like(frame1)
hsv[...,1] = 255
i = 0

fourcc = cv.VideoWriter_fourcc(*'XVID')
out = cv.VideoWriter('output.mp4',fourcc, 20.0, (640,480))
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
    cv.imshow('frame', frame2)
    cv.imshow('frame2',bgr)

    out.write(bgr)

    k = cv.waitKey(30) & 0xff
    if k == 27:
        break

    #cv.imwrite('opticalhsv.png' + str(i) + '.png',bgr)
    i = i+ 1
    prvs = next
cap.release()
cv.destroyAllWindows()