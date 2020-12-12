
import cv2
import re
import sys
import os

def getFrame(filePath,store):
    """[summary]

    Args:
        filePath ([type]): [视频文件路径]
        store ([type]): [储存帧文件路径]
    """    
    print(filePath,store)
    if (filePath is not None and store is not None):
        cap = cv2.VideoCapture(filePath)
        if (cap.isOpened()):
            (flag,frame)=cap.read()
            (filepath,tempfilename) = os.path.split(filePath)
            (filename,extension) = os.path.splitext(tempfilename)
            storepath=os.path.join(store,(filename+'.jpg'))

            if flag:
                #  cv2.imwrite(os.path.join(store,'1.jpg'),frame)
                # 解决 cv2.imwrite 无法写中文文件名问题
                if os.path.exists(store):
                    cv2.imencode('.jpg',frame)[1].tofile(storepath)
                    if os.path.exists(storepath):
                        print('Done')
                else :
                    os.mkdir(store)
                    cv2.imencode('.jpg',frame)[1].tofile(storepath)
                    if os.path.exists(storepath):
                        print('Done')


if __name__ == '__main__':
    #  for i in range(len(sys.argv)):
      #  print(sys.argv[i])

    getFrame(sys.argv[1],sys.argv[2])

