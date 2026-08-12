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

### 继续实践

- **[Linux Kernel Labs](https://linux-kernel-labs.github.io/refs/heads/master/)**：用讲义和动手实验学习系统调用、进程、内存、中断与设备驱动，适合从教学内核过渡到真实 Linux。
- **[openEuler](https://www.openeuler.org/en/)**：观察服务器、云、边缘和嵌入式场景中的开源 Linux 发行版生态，也可以从 SIG 与贡献指南进入社区实践。
- **[LinuxBlog.io](https://linuxblog.io/)**：补充 Linux 管理、性能优化、网络、安全和故障排查方面的实用文章。

## 计算机组成与 Verilog

- **[CS61C: Great Ideas in Computer Architecture](https://cs61c.org/su26/)**：从 C、RISC-V 进入数据通路、流水线、缓存、并行与虚拟内存，适合作为组成原理主线。
- **[Onur Mutlu's Lecture Videos and Materials](https://people.inf.ethz.ch/omutlu/lecture-videos.html)**：包含数字设计、计算机体系结构、并行架构和内存系统课程，适合在主线之后按专题深入。
- **[ChipVerify Verilog Tutorial](https://chipverify.com/tutorials/verilog)**：按主题学习 Verilog 语法、模块、过程块和验证基础。
- **[HDLBits](https://hdlbits.01xz.net/wiki/Main_Page)**：在线 Verilog 练习平台，用于巩固组合逻辑、时序逻辑和有限状态机。

建议先用 CS61C 建立“程序—指令—处理器—存储层次”的联系，再用 ChipVerify 与 HDLBits 完成小型电路练习；遇到体系结构或内存系统问题时，再进入 Onur Mutlu 的专题课程。

## Linux 内核

- **[Linux Kernel Source](https://elixir.bootlin.com/linux/v6.13.7/source)**：支持符号搜索和交叉引用，适合追踪函数、结构体与调用关系。
- **[Linux Kernel Documentation](https://www.kernel.org/doc/html/latest/)**：内核官方文档；遇到具体子系统时优先从这里查起。

阅读源码时，我会尽量从一个具体入口切入，例如一次系统调用、一个 `/proc` 节点或一次中断，而不是按目录顺序浏览整个内核。

## AI 工程与模型基础

- **[Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)**：从反向传播开始亲手构建神经网络、语言模型、GPT 与 tokenizer，适合建立模型内部机制的直觉。
- **[AI Engineer Roadmap](https://roadmap.sh/ai-engineer)**：用路线图检查应用 AI 所需的模型、工具和工程能力，适合查漏补缺，不必按图一次性学完。

这部分暂时作为拓展路线：先完成 Zero to Hero 中可运行的实现，再用 Roadmap 选择与实际项目有关的下一项能力，避免把路线图变成收藏清单。

## 学习记录原则

1. 每次只解决一个足够具体的问题。
2. 阅读后必须留下代码、图示、实验结果或简短总结中的至少一种。
3. 资料重复时保留更清晰、更新更稳定的一份。
4. 无法验证的理解标记为待确认，不把猜测写成结论。
5. 每完成一个阶段，整理为一篇可以独立阅读的文章。
