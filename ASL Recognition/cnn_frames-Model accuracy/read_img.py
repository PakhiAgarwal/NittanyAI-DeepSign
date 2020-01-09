import os
import cv2


#According to the absolute path of the input folder, all the files of the specified suffix under the folder are read into a list, and the first element of the list is the name of the folder.
def readAllImg(path,*suffix):
    try:

        s = os.listdir(path)
        resultArray = []
        fileName = os.path.basename(path)
        resultArray.append(fileName)

        for i in s:
            if endwith(i, suffix):
                document = os.path.join(path, i)
                img = cv2.imread(document)
                resultArray.append(img)


    except IOError:
        print ("Error")

    else:
        print ("Read successfully")
        return resultArray

#Enter a string and a label to match the subsequent and label of the string
def endwith(s,*endstring):
   resultArray = map(s.endswith,endstring)
   if True in resultArray:
       return True
   else:
       return False

if __name__ == '__main__':

  result = readAllImg("aa",'.pgm')
  print (result[0])
  # cv2.namedWindow("Image")
  # cv2.imshow("Image", result[1])
  # cv2.waitKey(0)
  # cv2.destroyAllWindows()
