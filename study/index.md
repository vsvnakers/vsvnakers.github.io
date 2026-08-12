---
title: 学习
description: 系统编程方向的学习路线与资料索引
sidebar: false
---

# 学习

这里整理我正在关注的系统编程资料。它不是“全部看完”的完成清单，而是一张持续维护的路线图：先确定当前问题，再选择一份主材料和一份练习材料。

> [!TIP]
> 如果你也在学习这个方向，可以先阅读[我的系统学习地图](/posts/2026-08-12-systems-learning-map)，里面说明了各部分之间的关系和建议顺序。

## 当前主线

| 阶段 | 核心问题 | 预期输出 |
| --- | --- | --- |
| Rust | 如何安全、清晰地表达系统程序？ | 小工具、练习代码、概念笔记 |
| 操作系统 | 进程、内存和文件系统怎样工作？ | 内核实验、执行路径图 |
| 组成原理 | 软件抽象如何落到处理器和设备？ | RTL 练习、调试记录 |
| Linux 内核 | 真实内核如何实现这些机制？ | 调用链笔记、源码分析 |

## 基础工具与 Linux 环境

- **[The Missing Semester 中文版](https://missing-semester-cn.github.io/)**：先补齐 Shell、编辑器、Git、调试与自动化等课程里常被略过的实用工具。
- **[Linux Journey](https://labex.io/linuxjourney)**：从命令行、权限和进程逐步进入文件系统、网络与系统管理。
- **[Learn X in Y Minutes](https://learnxinyminutes.com/)**：需要快速了解一门语言或配置格式时，用它建立语法概览，再转向正式文档。
- **[Arch Linux](https://archlinux.org/)**：通过发行版公告、软件包与社区资源了解一个持续更新的 Linux 系统；具体配置问题可继续查阅 ArchWiki。

## Rust

### 主线阅读

- **[Rust 语言圣经](https://course.rs/about-book.html)**：中文主教程，适合系统建立所有权、生命周期、类型与并发知识。
- **[Comprehensive Rust](https://google.github.io/comprehensive-rust/zh-CN/index.html)**：内容紧凑，适合有其他语言基础时快速过一遍，也适合复习。

### 动手练习

- **[100 Exercises to Learn Rust](https://colobu.com/rust100/)**：短小、连续的练习，用来把概念变成肌肉记忆。
- **[Rust Algorithm Solutions](https://www.bookstack.cn/read/rustlang-cn-rust-algos/README.md)**：通过算法题熟悉容器、迭代器与所有权写法。
- **[Rust Learning Projects](https://rustmagazine.github.io/rust_magazine_2021/chapter_3/projects.html)**：寻找合适的小项目，把语言知识带入完整程序。

## 操作系统

### 建立概念

- **[操作系统：设计与实现](https://jyywiki.cn/OS/2024/)**：从程序和真实问题出发理解操作系统抽象，适合作为理论主线。

### 完成实验

- **[rCore Tutorial v3](https://rcore-os.cn/rCore-Tutorial-Book-v3/index.html)**：用 Rust 逐步实现教学内核，连接语言、体系结构和操作系统知识。
- **[rCore Tutorial Guide 2025S](https://learningos.cn/rCore-Tutorial-Guide-2025S/0setup-devel-env.html)**：实验环境、任务要求与排错入口。
- **[ArceOS Tutorial Book](https://oslearning365.github.io/arceos-tutorial-book/)**：了解组件化内核的构造方式，适合在完成基础实验后继续阅读。

### 社区与训练营

- **[EulixOS Community](https://opencamp.cn/EulixOS/camp/202501)**：开源操作系统相关课程与活动。
- **[Open Source OS Community](https://opencamp.ai/os2edu)**：操作系统学习社区和开放课程入口。

## 计算机组成与 Verilog

- **[一生一芯讲义](https://ysyx.oscc.cc/docs/)**：从程序运行一路深入到处理器实现，适合作为计算机系统主线。
- **[HDLBits](https://hdlbits.01xz.net/wiki/Main_Page)**：在线 Verilog 练习平台，可用于巩固组合逻辑、时序逻辑和有限状态机。

学习这部分时，重点不是堆积 HDL 语法，而是建立“指令—处理器状态—硬件信号”之间的联系。

## Linux 内核

- **[Linux Kernel Source](https://elixir.bootlin.com/linux/v6.13.7/source)**：支持符号搜索和交叉引用，适合追踪函数、结构体与调用关系。
- **[Linux Kernel Documentation](https://www.kernel.org/doc/html/latest/)**：内核官方文档；遇到具体子系统时优先从这里查起。

阅读源码时，我会尽量从一个具体入口切入，例如一次系统调用、一个 `/proc` 节点或一次中断，而不是按目录顺序浏览整个内核。

## AI 系统

- **[AI Systems Training Camp](https://opencamp.cn/InfiniTensor/camp/2024winter)**：从系统实现角度理解张量计算、算子与训练框架，可作为系统方向的拓展主题。

这部分暂时作为拓展路线，不与当前的 Rust—操作系统—内核主线争夺优先级。

## 学习记录原则

1. 每次只解决一个足够具体的问题。
2. 阅读后必须留下代码、图示、实验结果或简短总结中的至少一种。
3. 资料重复时保留更清晰、更新更稳定的一份。
4. 无法验证的理解标记为待确认，不把猜测写成结论。
5. 每完成一个阶段，整理为一篇可以独立阅读的文章。
