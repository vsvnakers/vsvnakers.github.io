---
title : 'LRU 页面置换算法'
date : '2025-04-26'
---

---

# 🚀 LRU 页面置换算法

在操作系统内存管理中，除了 FIFO，另一种更聪明且常用的页面置换策略是 —— **LRU 页面置换算法**

---

## 📌 一、什么是 LRU 页面置换算法？

**LRU（Least Recently Used，最近最少使用）页面置换算法**是这样一种策略：

> **淘汰最近最久未被访问过的页面。**

**直白地说**：如果一个页面很久没用了，那么它以后可能也不怎么用，所以优先把它换出去。

### ✅ 特点：

- 需要记录页面最近的访问历史
- 淘汰“最久没用”的页面，而不是最早进入的
- 通常使用**栈（Stack）**、**链表（List）** 或 **时间戳（Timestamp）**结构实现

---

## ❗ 二、缺页中断机制简介（同样适用 LRU）

当访问一个不在内存中的页面时：

1. 触发缺页中断
2. 如果内存满了，选择最近最久未使用的页面进行置换
3. 加载新页面并恢复执行

💡 缺页次数依然是评估 LRU 表现的关键指标，通常 **比 FIFO 更少的缺页次数**。

---

## 🧪 三、LRU 算法示例分析

假设页面访问序列为：

```
[7, 0, 1, 2, 0, 3, 0, 4]
```

帧数 3，使用 LRU 策略：

| 步骤 | 页面访问 | 内存状态           | 缺页？ |
|------|---------|--------------------|--------|
| 1    | 7       | 7                  | ✅     |
| 2    | 0       | 7 0                | ✅     |
| 3    | 1       | 7 0 1              | ✅     |
| 4    | 2       | 0 1 2（7 最久未用，被换出） | ✅     |
| 5    | 0       | 0 1 2（已存在）    | ❌     |
| 6    | 3       | 1 2 3（0 最久未用，被换出） | ✅     |
| 7    | 0       | 2 3 0（1 最久未用，被换出） | ✅     |
| 8    | 4       | 3 0 4（2 最久未用，被换出） | ✅     |

**缺页次数：6**

---

## 🔧 四、C语言实现（函数封装版）

```c
#include <stdio.h>

int find_lru(int time[], int frames) {
    int min = time[0], pos = 0;
    for (int i = 1; i < frames; i++) {
        if (time[i] < min) {
            min = time[i];
            pos = i;
        }
    }
    return pos;
}

int lru_page_replacement(int pages[], int n, int frames) {
    int memory[frames];
    int time[frames];
    int counter = 0, faults = 0;

    for (int i = 0; i < frames; i++) memory[i] = -1;

    for (int i = 0; i < n; i++) {
        int found = 0;

        for (int j = 0; j < frames; j++) {
            if (memory[j] == pages[i]) {
                found = 1;
                time[j] = counter++; // 更新访问时间
                break;
            }
        }

        if (!found) {
            int pos = -1;
            for (int j = 0; j < frames; j++) {
                if (memory[j] == -1) {
                    pos = j;
                    break;
                }
            }
            if (pos == -1) pos = find_lru(time, frames);

            memory[pos] = pages[i];
            time[pos] = counter++;
            faults++;
        }
    }

    return faults;
}

int main() {
    int pages[] = {7, 0, 1, 2, 0, 3, 0, 4};
    int n = sizeof(pages) / sizeof(pages[0]);
    int frames = 3;

    int faults = lru_page_replacement(pages, n, frames);
    printf("缺页中断次数: %d\n", faults); // 应输出 6
    return 0;
}
```

---

## 🦀 五、Rust实现（函数封装版）

```rust
use std::collections::HashMap;

fn lru_page_replacement(pages: &[i32], frames: usize) -> usize {
    let mut memory = Vec::new();
    let mut last_used = HashMap::new();
    let mut faults = 0;
    let mut time = 0;

    for &page in pages {
        time += 1;

        if memory.contains(&page) {
            last_used.insert(page, time);
        } else {
            if memory.len() == frames {
                // 找出最久未用的页面
                let lru_page = memory
                    .iter()
                    .min_by_key(|&&p| last_used.get(&p).unwrap_or(&0))
                    .copied()
                    .unwrap();
                memory.retain(|&p| p != lru_page);
            }
            memory.push(page);
            last_used.insert(page, time);
            faults += 1;
        }
    }

    faults
}

fn main() {
    let pages = vec![7, 0, 1, 2, 0, 3, 0, 4];
    let frames = 3;

    let faults = lru_page_replacement(&pages, frames);
    println!("缺页中断次数: {}", faults); // 应输出 6
}
```

---

## ⚡ 六、为什么 LRU 不会出现 Belady 异常？

✅ **LRU 是栈算法（Stack Algorithm）的一种**，特点是：

- 随着帧数增加，缺页次数单调不增
- 永远不会因为增加帧数导致缺页次数增加
- 相比 FIFO 更聪明，性能更好

因此，**LRU 不会出现 Belady 异常！**

---



# 🎉 总结一览表

| 项目                 | 内容                                       |
|----------------------|--------------------------------------------|
| 页面置换算法         | LRU（最近最少使用）                       |
| 基本数据结构         | 哈希表 + 队列（或链表）                    |
| 缺页中断机制         | 淘汰最近最久未使用页面                     |
| Belady 异常          | ❌ 不会出现                               |
| 优点                 | 高效，缺页少，符合程序局部性原理           |
| 缺点                 | 需要维护访问时间，稍复杂                   |

---
