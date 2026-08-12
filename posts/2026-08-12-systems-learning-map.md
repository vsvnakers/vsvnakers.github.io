---
title: 我的系统学习地图：Rust、操作系统与 Linux 内核
description: 把现有学习资料整理成一条可执行的主线，并为每个阶段定义目标和输出。
date: 2026-08-12
tags: [学习路线, Rust, 操作系统, Linux]
---

系统方向的资料很多，真正困难的往往不是“找不到”，而是同时打开了太多入口，却不知道此刻应该解决哪个问题。

这篇文章把本站已有资料整理为一张学习地图。它不是完成清单，也不代表其中的内容已经全部掌握；它更像一个可持续调整的路线基线。

<!-- more -->

## 总体主线

我把学习顺序分成四个阶段：

```text
Rust 基础与工程习惯
        ↓
操作系统概念与实验
        ↓
计算机组成与硬件接口
        ↓
Linux 内核源码与真实系统
```

这四部分不是严格串行的。更实际的方式是：以操作系统实验为中心，缺少语言能力时补 Rust，遇到硬件行为时补组成原理，理解抽象后再去 Linux 内核中寻找真实实现。

## 第一阶段：让 Rust 成为工具

### 目标

能够独立完成中小型命令行程序，读懂所有权与生命周期错误，并熟悉 Cargo、测试和基本错误处理。这个阶段不追求记住所有语法，而是消除“语言本身阻碍问题求解”的情况。

### 建议材料

1. [Rust 语言圣经](https://course.rs/about-book.html)：作为中文主线教程，建立完整概念框架。
2. [Comprehensive Rust](https://google.github.io/comprehensive-rust/zh-CN/index.html)：适合快速复习和查缺补漏。
3. [100 Exercises to Learn Rust](https://colobu.com/rust100/)：通过短练习把阅读转化为代码。
4. [Rust Algorithm Solutions](https://www.bookstack.cn/read/rustlang-cn-rust-algos/README.md)：熟悉集合、迭代器和常见数据结构表达。

### 阶段输出

- 一个包含参数解析、错误处理和测试的小工具；
- 一篇用自己的话解释所有权、借用和生命周期关系的笔记；
- 能够看懂并修改一个现成 Rust 项目的模块结构。

## 第二阶段：用实验理解操作系统

### 目标

把进程、虚拟内存、文件系统和并发从名词变成可以观察的机制。仅仅阅读定义不够，最好能通过内核实验看到一次系统调用或一次地址转换究竟发生了什么。

### 建议顺序

1. [南京大学《操作系统：设计与实现》](https://jyywiki.cn/OS/2024/)：建立问题意识，理解“为什么需要这个抽象”。
2. [rCore Tutorial v3](https://rcore-os.cn/rCore-Tutorial-Book-v3/index.html)：用 Rust 实现小型内核，把概念落到代码。
3. [rCore Tutorial Guide 2025S](https://learningos.cn/rCore-Tutorial-Guide-2025S/0setup-devel-env.html)：补充实验环境和任务指导。
4. [ArceOS Tutorial Book](https://oslearning365.github.io/arceos-tutorial-book/)：进一步观察组件化操作系统的设计。

### 阅读时关注的问题

- 用户态为什么不能直接完成所有操作？
- 保存和恢复上下文时，哪些状态必须被保留？
- 虚拟地址如何一步步变成物理地址？
- 文件描述符为什么能统一文件、管道和设备？
- 锁解决了什么，又引入了哪些新问题？

每完成一个实验，最好留下一张执行路径图或一段调试记录。能够描述一次真实路径，比背诵一组概念更有价值。

## 第三阶段：补上硬件视角

操作系统最终运行在真实硬件上。异常、时钟中断、内存映射和设备访问都依赖处理器提供的机制。这一阶段不必急着设计复杂处理器，先把软件行为和硬件状态对应起来。

### 建议顺序

1. [CS61C](https://cs61c.org/su26/)：以 C 和 RISC-V 为起点，理解数据通路、流水线、缓存、并行和虚拟内存；
2. [ChipVerify Verilog Tutorial](https://chipverify.com/tutorials/verilog)：补齐模块、组合逻辑、时序逻辑和 testbench 等 Verilog 基础；
3. [HDLBits](https://hdlbits.01xz.net/wiki/Main_Page)：用短题验证语法与电路设计是否真正掌握；
4. [Onur Mutlu 的课程资料](https://people.inf.ethz.ch/omutlu/lecture-videos.html)：按需要深入数字设计、体系结构、并行架构或内存系统。

学习时可以持续追问三个问题：

1. 一条指令怎样经过取指、译码、执行并更新体系结构状态？
2. 处理器怎样进入异常处理，又怎样返回原程序？
3. 软件看到的设备寄存器，如何与硬件模块发生联系？

## 第四阶段：进入 Linux 内核

Linux 源码规模很大，不适合从目录第一页顺序读到最后。更有效的入口是选择一条已经理解过的机制，再沿着实际调用路径验证它在 Linux 中如何实现。

### 工具与资料

- [Linux Kernel Source](https://elixir.bootlin.com/linux/v6.13.7/source)：在线交叉引用，适合追踪符号与调用关系；
- [Linux Kernel Documentation](https://www.kernel.org/doc/html/latest/)：优先查阅的官方说明；
- [Linux Kernel Labs](https://linux-kernel-labs.github.io/refs/heads/master/)：通过系统调用、进程、内存、中断和驱动实验，从概念过渡到真实内核；
- [Linux Journey](https://labex.io/linuxjourney)：循序学习命令行、权限、进程、文件系统与 Linux 系统管理；
- [LinuxBlog.io](https://linuxblog.io/)：在遇到管理、性能、网络或故障排查问题时查阅实践文章。

### 推荐的切入方式

- 从一个简单系统调用开始，跟踪用户态到内核态的路径；
- 对照 `/proc` 或 `/sys` 的可观察结果查找对应实现；
- 用一次实际错误或性能现象驱动源码阅读；
- 每次只追一条主路径，先忽略不影响理解的分支。

## 如何避免“只收藏、不学习”

每个阶段只保留一份主材料和一份练习材料。新发现的链接先放入候选区，只有当它能解决当前问题时才进入主路线。

学习结果尽量留下可验证的输出：

- 能运行的代码；
- 一张结构或执行流程图；
- 一篇回答具体问题的短文；
- 一段包含现象、假设和结论的调试记录。

路线不是日程表，不需要一次规划到底。完成一个小闭环后再调整下一步，通常比制定一份庞大的年度清单更可靠。

## 拓展：从模型原理到 AI 工程

AI 暂时不加入系统主线，但可以作为独立拓展。先跟随 [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) 从反向传播逐步实现语言模型、GPT 和 tokenizer，留下能够运行与修改的代码；完成一个小项目后，再用 [AI Engineer Roadmap](https://roadmap.sh/ai-engineer) 检查工程能力缺口。路线图只负责导航，实际项目才决定下一步学什么。

完整资源入口会继续维护在[学习页面](/study/)。
