# Day 2: 图像基础 | Image Fundamentals

> **今日目标:** 理解数字图像的本质，学习读取、显示和保存图像
>
> **Today's Goal:** Understand the nature of digital images, learn to read, display, and save images

---

## 学习目标 | Learning Objectives

完成今天的学习后，你将能够:
- ✅ 解释数字图像的像素表示（RGB模型）
- ✅ 使用OpenCV读取、显示和保存图像文件
- ✅ 访问和修改图像的像素值
- ✅ 转换图像格式（RGB ↔ 灰度）
- ✅ 应用基本的图像操作（裁剪、缩放、翻转）

> After completing today's lesson, you will be able to:
> - ✅ Explain the pixel representation of digital images (RGB model)
> - ✅ Use OpenCV to read, display, and save image files
> - ✅ Access and modify image pixel values
> - ✅ Convert image formats (RGB ↔ Grayscale)
> - ✅ Apply basic image operations (crop, resize, flip)

---

## 前置准备检查 | Prerequisites Check

- [ ] 已完成Day 1的环境搭建
- [ ] OpenCV能正常工作
- [ ] 准备一些测试图片（或使用项目提供的示例图片）

---

## 为什么学这个？| Why Learn This?

### 图像是数字的阵列
> 在计算机眼中，一张照片不是"风景"或"人物"，而是一大串数字。理解这些数字如何组织，是所有图像处理的基础。

### 像素操作是CV的"原子操作"
> 就像化学中的原子一样，像素是图像处理的最小单位。无论是Instagram滤镜还是人脸识别，本质上都是在操作像素。

### 从图像到视频
> 视频就是连续播放的图像序列（通常每秒30帧）。掌握图像处理后，视频处理只需要加上一个循环。

---

## 任务一: 理解数字图像 | Task 1: Understand Digital Images (20分钟)

### 2.1 什么是像素？（10分钟）

**像素（Pixel）** = "Picture Element"（图像元素）

一张数字图像是一个**二维数组**（矩阵）：

```
对于一张 3x3 的图像:
┌─────┬─────┬─────┐
│(0,0)│(1,0)│(2,0)│  行0
├─────┼─────┼─────┤
│(0,1)│(1,1)│(2,1)│  行1
├─────┼─────┼─────┤
│(0,2)│(1,2)│(2,2)│  行2
└─────┴─────┴─────┘
  列0   列1   列2
```

### 2.2 RGB颜色模型（10分钟）

**RGB** = Red（红）+ Green（绿）+ Blue（蓝）

每个像素由**三个数字**组成 (R, G, B)，每个数字范围是 0-255：

```
(0, 0, 0)     = 纯黑色
(255, 255, 255) = 纯白色
(255, 0, 0)   = 纯红色
(0, 255, 0)   = 纯绿色
(0, 0, 255)   = 纯蓝色
(255, 255, 0) = 黄色（红+绿）
```

**为什么是0-255?**
> 计算机使用8位（1字节）存储每个颜色通道，2^8 = 256种可能（0-255）。

**灰度图像:**
- 只有一个通道（亮度），值0-255
- 0 = 最暗（黑），255 = 最亮（白）

---

## 任务二: 读取和显示图像 | Task 2: Read and Display Images (40分钟)

### 2.1 基础操作（15分钟）

创建 `image_basics.py`:

```python
import cv2
import numpy as np

def main():
    # 1. 读取图像
    img = cv2.imread('test_image.jpg')
    
    if img is None:
        print("无法读取图像 | Cannot read image")
        print("请确保test_image.jpg在同一目录下 | Ensure test_image.jpg is in the same directory")
        return
    
    # 2. 显示图像信息
    print(f"图像尺寸 | Image shape: {img.shape}")
    print(f"数据类型 | Data type: {img.dtype}")
    print(f"总像素数 | Total pixels: {img.size}")
    
    # 3. 显示图像
    cv2.imshow('Original Image', img)
    cv2.waitKey(0)  # 等待任意按键
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
```

**创建测试图像:**
如果没有图片，用代码创建一个:

```python
import cv2
import numpy as np

# 创建一个红色方块（200x200像素）
red_square = np.zeros((200, 200, 3), dtype=np.uint8)
red_square[:] = [0, 0, 255]  # BGR格式（OpenCV使用BGR而非RGB！）
cv2.imwrite('test_image.jpg', red_square)
```

### 2.2 像素访问（15分钟）

```python
import cv2
import numpy as np

def pixel_demo():
    # 创建一个简单的渐变图像
    height, width = 100, 100
    img = np.zeros((height, width, 3), dtype=np.uint8)
    
    # 创建红色渐变
    for i in range(height):
        img[i, :] = [0, 0, i * 2]  # BGR: 红色通道从0到200
    
    # 访问特定像素
    print(f"像素(50, 50)的值 | Pixel at (50,50): {img[50, 50]}")
    
    # 修改特定像素为白色
    img[50, 50] = [255, 255, 255]
    
    # 修改一块区域为绿色
    img[20:40, 20:40] = [0, 255, 0]
    
    cv2.imshow('Gradient Image', img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    pixel_demo()
```

### 2.3 图像格式转换（10分钟）

```python
import cv2

def color_conversion():
    # 读取彩色图像
    img = cv2.imread('test_image.jpg')
    
    # 转换为灰度图
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 转换为RGB（OpenCV默认使用BGR）
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # 转换为HSV颜色空间
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # 并排显示
    cv2.imshow('Original (BGR)', img)
    cv2.imshow('Grayscale', gray)
    cv2.imshow('RGB', rgb)
    
    print(f"原始图形状 | Original shape: {img.shape}")
    print(f"灰度图形状 | Grayscale shape: {gray.shape}")
    
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    color_conversion()
```

---

## 任务三: 基本图像操作 | Task 3: Basic Image Operations (40分钟)

### 3.1 裁剪、缩放、翻转（20分钟）

```python
import cv2

def image_transformations():
    img = cv2.imread('test_image.jpg')
    
    if img is None:
        # 创建一个测试图像
        img = cv2.imread('lena.jpg')  # 或者用自己创建的图像
        if img is None:
            print("无法找到图像，请准备一张图片 | Cannot find image, please prepare a picture")
            return
    
    height, width = img.shape[:2]
    
    # 1. 裁剪图像 (Crop)
    # 格式: img[y1:y2, x1:x2]
    crop_img = img[50:200, 100:300]
    
    # 2. 缩放图像 (Resize)
    # 方法1: 指定新尺寸
    resize_img = cv2.resize(img, (300, 200))
    
    # 方法2: 按比例缩放
    scale_percent = 50  # 缩小到50%
    new_width = int(width * scale_percent / 100)
    new_height = int(height * scale_percent / 100)
    scaled_img = cv2.resize(img, (new_width, new_height))
    
    # 3. 翻转图像 (Flip)
    # 0: 垂直翻转, 1: 水平翻转, -1: 同时翻转
    flip_horizontal = cv2.flip(img, 1)
    flip_vertical = cv2.flip(img, 0)
    flip_both = cv2.flip(img, -1)
    
    # 显示所有变换
    cv2.imshow('Original', img)
    cv2.imshow('Cropped', crop_img)
    cv2.imshow('Resized', resize_img)
    cv2.imshow('Horizontal Flip', flip_horizontal)
    
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    image_transformations()
```

### 3.2 图像算术运算（20分钟）

```python
import cv2
import numpy as np

def image_arithmetic():
    # 创建两个测试图像
    img1 = np.zeros((200, 200, 3), dtype=np.uint8)
    img1[:] = [100, 0, 0]  # 深蓝色
    
    img2 = np.zeros((200, 200, 3), dtype=np.uint8)
    img2[:] = [0, 100, 0]  # 深绿色
    
    # 1. 图像相加
    add_result = cv2.add(img1, img2)
    
    # 2. 图像相减
    sub_result = cv2.subtract(img1, img2)
    
    # 3. 图像相乘（亮度调整）
    bright_img = cv2.multiply(img1, 2)  # 亮度翻倍
    
    # 4. 按位运算
    # 创建两个不同颜色的矩形
    rect1 = np.zeros((200, 200, 3), dtype=np.uint8)
    rect1[50:150, 50:150] = [255, 0, 0]  # 蓝色矩形
    
    rect2 = np.zeros((200, 200, 3), dtype=np.uint8)
    rect2[100:180, 80:180] = [0, 255, 0]  # 绿色矩形
    
    # 按位AND
    bit_and = cv2.bitwise_and(rect1, rect2)
    # 按位OR
    bit_or = cv2.bitwise_or(rect1, rect2)
    
    # 显示结果
    cv2.imshow('Addition', add_result)
    cv2.imshow('Subtraction', sub_result)
    cv2.imshow('Bitwise AND', bit_and)
    cv2.imshow('Bitwise OR', bit_or)
    
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    image_arithmetic()
```

---

## 任务四: 实战练习 | Task 4: Hands-on Practice (30分钟)

### 练习1: 创建自己的头像框（15分钟）

```python
import cv2
import numpy as np

def add_frame():
    # 读取你的照片
    img = cv2.imread('your_photo.jpg')
    
    if img is None:
        print("请准备一张名为your_photo.jpg的照片")
        return
    
    height, width = img.shape[:2]
    
    # 创建边框
    border_size = 20
    border_color = [255, 0, 255]  # 紫色 BGR
    
    # 方法1: 使用copyMakeBorder
    framed = cv2.copyMakeBorder(img, border_size, border_size, 
                                border_size, border_size,
                                cv2.BORDER_CONSTANT, value=border_color)
    
    # 添加文字
    cv2.putText(framed, "My Frame", (30, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
    
    cv2.imshow('Framed Photo', framed)
    cv2.imwrite('framed_photo.jpg', framed)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    add_frame()
```

### 练习2: 图像拼贴（15分钟）

```python
import cv2
import numpy as np

def image_collage():
    # 读取三张图片（或创建三张测试图片）
    img1 = np.zeros((200, 200, 3), dtype=np.uint8)
    img1[:] = [255, 0, 0]  # 蓝色
    
    img2 = np.zeros((200, 200, 3), dtype=np.uint8)
    img2[:] = [0, 255, 0]  # 绿色
    
    img3 = np.zeros((200, 200, 3), dtype=np.uint8)
    img3[:] = [0, 0, 255]  # 红色
    
    # 水平拼接
    h_concat = np.hstack((img1, img2, img3))
    
    # 垂直拼接
    v_concat = np.vstack((img1, img2, img3))
    
    # 创建2x2网格
    row1 = np.hstack((img1, img2))
    row2 = np.hstack((img3, img1))
    grid = np.vstack((row1, row2))
    
    cv2.imshow('Horizontal', h_concat)
    cv2.imshow('Vertical', v_concat)
    cv2.imshow('Grid', grid)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    image_collage()
```

---

## 今日作业 | Today's Assignment

### 基础作业（必做）
1. ✅ 编写程序读取一张图片，并显示其尺寸和像素总数
2. ✅ 将彩色图片转换为灰度图，并保存
3. ✅ 对图片进行水平翻转，保存结果

### 进阶作业（选做）
1. 创建一个"水印"功能：在图片右下角添加半透明文字
2. 实现图像的"拼图"效果：将图片分割为4块，随机打乱位置

### 挑战作业
1. 创建一个简单的"图像编辑器"，可以:
   - 调整亮度（变亮/变暗）
   - 调整对比度
   - 转换为灰度
   - 应用简单的滤镜（如反色）

---

## 明日预告 | Tomorrow's Preview

**Day 3: 摄像头实时采集**
- 我们将学习如何从摄像头获取实时视频流
- 理解帧率（FPS）的概念
- 开始构建实时图像处理管道

**预告:** 明天你将制作第一个实时应用程序！

---

## 常见问题 | FAQ

### Q1: OpenCV显示的颜色为什么不对？
**A:** OpenCV默认使用BGR而非RGB。转换方法:
```python
rgb_image = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2RGB)
```

### Q2: 如何处理中文路径？
**A:** OpenCV的imread不支持中文路径。使用numpy读取:
```python
import cv2
import numpy as np
img = cv2.imdecode(np.fromfile("中文路径.jpg", dtype=np.uint8), -1)
```

### Q3: 图像太大/太小怎么办？
**A:** 使用resize函数调整尺寸:
```python
resized = cv2.resize(img, (new_width, new_height))
```

---

## 参考资源 | Resources

- 📚 [OpenCV图像处理教程](https://docs.opencv.org/4.x/d3/df2/tutorial_py_basic_ops.html)
- 📺 [5分钟理解RGB颜色模型](https://www.bilibili.com/video/BV1et411u78U)
- 💻 [NumPy数组操作速查](https://numpy.org/doc/stable/user/quickstart.html)

---

**恭喜完成Day 2！** 你已经掌握了图像处理的基石。明天我们将让图像"动"起来！

> **Congratulations on completing Day 2!** You've mastered the fundamentals of image processing. Tomorrow we'll make images "come alive"!
