export const recommendedResources = [
  {
    title: 'Colfax Research Articles',
    url: 'https://research.colfax-intl.com/blog/',
    domain: 'research.colfax-intl.com',
    category: 'GPU 性能工程',
    description: '偏实践的 GPU 优化文章与代码教程，覆盖 CUTLASS、CuTe、GEMM、FlashAttention 及新架构特性。',
    note: '适合沿着具体内核实现，观察硬件特性如何转化为优化策略。'
  },
  {
    title: 'Modern GPU Programming for MLSys',
    url: 'https://mlc.ai/modern-gpu-programming-for-mlsys/index.html',
    domain: 'mlc.ai',
    category: 'GPU 编程课程',
    description: '从 GPU 执行模型和数据布局出发，逐步进入 TMA、GEMM、Warp Specialization 与 FlashAttention。',
    note: '适合系统建立现代 GPU 内核编程的知识主线。'
  },
  {
    title: 'MLSys·im Getting Started',
    url: 'https://mlsysbook.ai/mlsysim/getting-started.html',
    domain: 'mlsysbook.ai',
    category: 'ML 系统建模',
    description: '通过 Roofline 等一阶原理模型分析训练与推理中的延迟、吞吐、显存和性能瓶颈。',
    note: '适合在真正实现或采购硬件之前，先快速验证系统设计假设。'
  }
]
