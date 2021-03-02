import cv2
import re
import sys
import os

def wFrame(film,filePath,store):
    """[summary]

    Args:
        filePath ([type]): [视频文件路径]
        store ([type]): [储存帧文件路径]
    """    
    
    if (filePath is None and store is None): return
    storepath =store+re.sub(r'\..+$',".jpg",filePath.replace(film,""),1)
    r"""
    os.path.join("G:\test","\JavaScript\Realistic Water Ripple Effect JavaScript Tutorial - 副本 - 副本 (10) - 副本.jpg")
    'G:\\JavaScript\\Realistic Water Ripple Effect JavaScript Tutorial - 副本 - 副本 (10) - 副本.jpg'
    """
    # (filepath,tempfilename) = os.path.split(filePath)
    # (filename,extension) = os.path.splitext(tempfilename)
    # storepath=os.path.join(store,(filename+'.jpg'))
    print(storepath)
    if (os.path.exists(storepath)):
        return

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
    wFrame(sys.argv[1],sys.argv[2],sys.argv[3])

