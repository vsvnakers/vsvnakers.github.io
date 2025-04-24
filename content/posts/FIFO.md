---
title : 'FIFO 页面置换算法'
date : '2025-04-04'
---

> 学习 FIFO 的总结

---


# 🧠 理解 FIFO 页面置换算法

在操作系统的内存管理中，**页面置换算法**起着至关重要的作用。当物理内存不足以容纳所有需要的页面时，系统必须选择一部分页面“换出去”，以便为新的页面腾出空间。

---

## 📌 一、什么是 FIFO 页面置换算法？

**FIFO（First-In, First-Out）页面置换算法**是一种遵循“谁先进来谁先出去”的策略：

> **最早进入内存的页面，会最先被淘汰。**

这就像排队买票，先排队的先服务，后来的人必须等队列的前面腾出位置。

### ✅ 特点：

- 实现简单
- 使用**队列（Queue）** 结构模拟
- 不考虑页面是否常用

---

## ❗ 二、缺页中断机制简介

当一个进程访问某个页面时：

1. 如果该页面已经在内存中 ✅ → 正常访问
2. 如果该页面不在内存中 ❌ → 触发 **缺页中断（Page Fault）**

系统将：
- 从磁盘中加载页面
- 如内存已满，使用页面置换算法（如 FIFO）决定淘汰哪个页面
- 更新内存状态，继续执行程序

### 💡 缺页中断数就是衡量页面置换算法好坏的指标之一。

---

## 🧪 三、FIFO 算法示例分析

假设页面访问序列为：

```
[7, 0, 1, 2, 0, 3, 0, 4]
```

内存帧数为 `3`。

使用 FIFO 策略处理：

| 操作 | 内存状态      | 缺页？ |
|------|---------------|--------|
| 7    | 7             | ✅     |
| 0    | 7 0           | ✅     |
| 1    | 7 0 1         | ✅     |
| 2    | 0 1 2         | ✅     |
| 0    | 0 1 2         | ❌     |
| 3    | 1 2 3         | ✅     |
| 0    | 2 3 0         | ✅     |
| 4    | 3 0 4         | ✅     |

**缺页次数 = 6**

---

## 🔧 四、C语言实现（函数封装 + 验证）

```c
#include <stdio.h>

int fifo_page_replacement(int pages[], int n, int frames) {
    int memory[frames];
    for (int i = 0; i < frames; i++) memory[i] = -1;

    int index = 0, pageFaults = 0;

    for (int i = 0; i < n; i++) {
        int found = 0;
        for (int j = 0; j < frames; j++) {
            if (memory[j] == pages[i]) {
                found = 1;
                break;
            }
        }

        if (!found) {
            memory[index] = pages[i]; // 替换掉最老的页面
            index = (index + 1) % frames;
            pageFaults++;
        }
    }

    return pageFaults;
}

int main() {
    int pages[] = {7, 0, 1, 2, 0, 3, 0, 4};
    int n = sizeof(pages) / sizeof(pages[0]);
    int frames = 3;

    int faults = fifo_page_replacement(pages, n, frames);
    printf("缺页中断次数: %d\n", faults); // 输出应为 6
    return 0;
}
```

---

## 🦀 五、Rust 实现（函数封装 + 验证）

```rust
use std::collections::VecDeque;

fn fifo_page_replacement(pages: &[i32], frames: usize) -> usize {
    let mut memory: VecDeque<i32> = VecDeque::new();
    let mut faults = 0;

    for &page in pages {
        if !memory.contains(&page) {
            if memory.len() == frames {
                memory.pop_front(); // 移除最老页面
            }
            memory.push_back(page); // 加入新页面
            faults += 1;
        }
    }

    faults
}

fn main() {
    let pages = vec![7, 0, 1, 2, 0, 3, 0, 4];
    let frames = 3;

    let faults = fifo_page_replacement(&pages, frames);
    println!("缺页中断次数: {}", faults); // 应输出 6
}
```

---

## ⚠️ 六、Belady 异常：内存越大越差？

> **Belady 异常**指的是在某些页面访问序列下，**增加内存页框反而会导致缺页次数上升**。这是 FIFO 算法独有的问题！

### 🔥 经典案例：

```text
页面访问序列：1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5
```

- 使用 **3 个帧**：缺页次数 = 9
- 使用 **4 个帧**：缺页次数 = 10（反而更多了！）

### 🧠 原因：

FIFO 不考虑页面的使用频率，只按照“谁先来谁先走”，导致常用页面也可能被早早淘汰。

### ❓ 哪些算法不会有这种问题？

- ✅ LRU（最近最少使用）
- ✅ Optimal（最优页面置换）
- ❌ FIFO → 会发生 Belady 异常

---

## 🧾 七、总结一览

| 项目                 | 内容                                       |
|----------------------|--------------------------------------------|
| 页面置换算法         | FIFO（先进先出）                          |
| 基本数据结构         | 队列（Queue）                              |
| 缺页中断机制         | 页面不在内存时触发，执行置换并加载         |
| Belady 异常          | FIFO 在某些序列下会因帧数增多反而更差       |
| 适合学习/对比        | 是操作系统课程和面试中常见考点              |
| 更优选择（生产环境） | LRU、Clock、Optimal 等                     |

