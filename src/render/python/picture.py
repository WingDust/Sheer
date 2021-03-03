import cv2
import re
import sys
import os
import json

def wFrame(film,filename,ThumbnailPath):
    """[summary]

    Args:
        filename ([type]): [视频文件路径]
        ThumbnailPath ([type]): [储存帧文件路径]
    """    
    
    if (filename is None and ThumbnailPath is None): return
    # print(film)
    # print(len(json.loads(filename.replace("\'","\""))))
    # print(ThumbnailPath )
    for file in json.loads(filename.replace("\'","\"")):
        storepath =ThumbnailPath+re.sub(r'\.(mp4|mkv|avi)$',".jpg",file.replace(film,""),1)
        secondir = os.path.split(storepath)[0]
        # print(file)
        # print(storepath)
        # print(secondir)
        if (os.path.exists(storepath)):
            print('1',end='') # node 会接收打印的换行符
            continue
        cap = cv2.VideoCapture(file)
        if (cap.isOpened()):
            (flag,frame)=cap.read()
            if flag:
                #  cv2.imwrite(os.path.join(ThumnailPath,'1.jpg'),frame)
                # 解决 cv2.imwrite 无法写中文文件名问题
                if os.path.exists(secondir):
                    cv2.imencode('.jpg',frame)[1].tofile(storepath)
                    if os.path.exists(storepath):
                        print('1',end='')
                else :
                    os.mkdir(secondir)
                    cv2.imencode('.jpg',frame)[1].tofile(storepath)
                    if os.path.exists(storepath):
                        print('1',end='')


if __name__ == '__main__':
    #  for i in range(len(sys.argv)):
      #  print(sys.argv[i])
    wFrame(sys.argv[1],sys.argv[2],sys.argv[3])


r"""
os.path.join("G:\test","\JavaScript\Realistic Water Ripple Effect JavaScript Tutorial - 副本 - 副本 (10) - 副本.jpg")
'G:\\JavaScript\\Realistic Water Ripple Effect JavaScript Tutorial - 副本 - 副本 (10) - 副本.jpg'
"""
# (filepath,tempfilename) = os.path.split(filename)
# (filename,extension) = os.path.splitext(tempfilename)
# ThumnailPathpath=os.path.join(ThumnailPath,(filename+'.jpg'))