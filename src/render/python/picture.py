'''
Author: your name
Date: 2020-09-06 16:12:21
LastEditTime: 2021-02-03 13:41:45
LastEditors: Please set LastEditors
Description: In User Settings Edit
FilePath: \electron-vue-vite\src\render\python\picture.py
'''

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
        (filepath,tempfilename) = os.path.split(filePath)
        (filename,extension) = os.path.splitext(tempfilename)
        storepath=os.path.join(store,(filename+'.jpg'))
        if (os.path.exists(storepath)): return

        cap = cv2.VideoCapture(filePath)
        if (cap.isOpened()):
            (flag,frame)=cap.read()
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

