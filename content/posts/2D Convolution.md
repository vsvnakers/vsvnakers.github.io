---
title: "二维卷积实现"
date: 2025-05-31T02:58:00+08:00
tags: ["图像处理", "卷积", "C语言", "Python"]
categories: ["博客"]
draft: false
---



# 二维卷积操作：原理解析 + C语言与Python手写实现




## 一、什么是二维卷积？

二维卷积（2D Convolution）是图像处理中最基础也最重要的操作之一，广泛应用于：

* 图像模糊
* 边缘检测
* 卷积神经网络（CNN）特征提取

**通俗地讲：**

> 把一个小的“滤波器”（也叫“卷积核”）放在图像上一个位置，对应区域的值和卷积核每个位置相乘后加总，结果作为输出图像的一个像素值，然后不断滑动这个核，得到整张图的新图像。

---

## 二、卷积的操作步骤（滑动 + 乘加）

假设你有：

* 原始图像（5×5）
* 卷积核（3×3）

**操作过程如下：**

1. 卷积核放在图像左上角，和 3x3 区域重叠
2. 对应位置相乘，然后求和
3. 得到的结果就是输出图像对应位置的像素值
4. 卷积核向右移动一格，重复以上过程
5. 到右边边缘后，向下一行移动，从左往右继续滑动

---

### 示例计算：

图像窗口：

```
1 2 3
4 5 6
7 8 9
```

卷积核：

```
1  0 -1
1  0 -1
1  0 -1
```

计算：

```
= 1×1 + 2×0 + 3×(-1)
+ 4×1 + 5×0 + 6×(-1)
+ 7×1 + 8×0 + 9×(-1)
= 1 - 3 + 4 - 6 + 7 - 9 = -6
```

输出图像中对应位置的值就是 `-6`。

---

## 三、输出图像大小怎么计算？

若输入图像为 `H × W`，卷积核为 `kH × kW`，不加填充（padding），步幅（stride）为 1：

```
输出高 = H - kH + 1
输出宽 = W - kW + 1
```

举例：5×5 输入图像 + 3×3 卷积核 → 输出图像为 3×3。

---

## 四、卷积与相关运算的区别（细节）

数学上的卷积会对卷积核进行 **180° 翻转**，但在图像处理中（尤其是 CNN）中，一般不翻转核，这种形式实际上是**相关运算（correlation）**。但业界仍普遍称其为“卷积”。

---

## 五、C语言手写二维卷积实现

```c
#include <stdio.h>

#define IMG_H 5
#define IMG_W 5
#define KERNEL_SIZE 3

// 二维卷积：不含填充，不含步幅
void conv2d(float input[IMG_H][IMG_W], float kernel[KERNEL_SIZE][KERNEL_SIZE], float output[IMG_H - KERNEL_SIZE + 1][IMG_W - KERNEL_SIZE + 1]) {
    for (int i = 0; i <= IMG_H - KERNEL_SIZE; i++) {
        for (int j = 0; j <= IMG_W - KERNEL_SIZE; j++) {
            float sum = 0.0;
            for (int m = 0; m < KERNEL_SIZE; m++) {
                for (int n = 0; n < KERNEL_SIZE; n++) {
                    sum += input[i + m][j + n] * kernel[m][n];
                }
            }
            output[i][j] = sum;
        }
    }
}

int main() {
    float image[IMG_H][IMG_W] = {
        {1, 1, 1, 0, 0},
        {0, 1, 1, 1, 0},
        {0, 0, 1, 1, 1},
        {0, 0, 1, 1, 0},
        {0, 1, 1, 0, 0}
    };

    float kernel[KERNEL_SIZE][KERNEL_SIZE] = {
        {1, 0, -1},
        {1, 0, -1},
        {1, 0, -1}
    };

    float output[IMG_H - KERNEL_SIZE + 1][IMG_W - KERNEL_SIZE + 1];

    conv2d(image, kernel, output);

    printf("卷积结果：\n");
    for (int i = 0; i < IMG_H - KERNEL_SIZE + 1; i++) {
        for (int j = 0; j < IMG_W - KERNEL_SIZE + 1; j++) {
            printf("%5.1f ", output[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```

---

## 六、Python 纯手写实现

```python
def conv2d(image, kernel):
    H, W = len(image), len(image[0])
    kH, kW = len(kernel), len(kernel[0])
    out_H, out_W = H - kH + 1, W - kW + 1

    output = [[0 for _ in range(out_W)] for _ in range(out_H)]

    for i in range(out_H):
        for j in range(out_W):
            total = 0
            for m in range(kH):
                for n in range(kW):
                    total += image[i + m][j + n] * kernel[m][n]
            output[i][j] = total

    return output

# 示例图像
image = [
    [1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0]
]

# 卷积核（边缘检测）
kernel = [
    [1, 0, -1],
    [1, 0, -1],
    [1, 0, -1]
]

result = conv2d(image, kernel)

print("卷积结果：")
for row in result:
    print(["%.1f" % val for val in row])
```

---

## 七、卷积能实现哪些操作？

| 卷积核类型     | 功能      |
| --------- | ------- |
| 均值核（全部 1） | 模糊/平滑图像 |
| Sobel 核   | 边缘检测    |
| Laplacian | 边缘锐化    |
| 自定义核      | 特征提取    |

---

## 八、总结

| 项目   | 内容说明             |
| ---- | ---------------- |
| 操作   | 二维卷积             |
| 输入   | 图像 + 卷积核         |
| 核心过程 | 滑动窗口 → 乘加 → 求和   |
| 输出   | 新图像（特征图）         |
| 实现语言 | C语言 / Python（手写） |
| 实用场景 | 图像处理、深度学习、CNN 等  |















