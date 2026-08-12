export const recommendedResources = [
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
  },
  {
    title: 'Simon Boehm',
    url: 'https://siboehm.com/',
    domain: 'siboehm.com',
    category: '性能工程实践',
    description: '以工作日志式文章拆解 CUDA Matmul、CPU 矩阵乘法、并行训练和数值一致性等问题。',
    note: '适合跟着逐步优化过程学习，而不只是阅读最终结论。'
  },
  {
    title: 'Colfax Research Articles',
    url: 'https://research.colfax-intl.com/blog/',
    domain: 'research.colfax-intl.com',
    category: 'GPU 内核优化',
    description: '偏实践的 GPU 优化文章与代码教程，覆盖 CUTLASS、CuTe、GEMM、FlashAttention 及新架构特性。',
    note: '适合沿着具体内核实现，观察硬件特性如何转化为优化策略。'
  },
  {
    title: 'LMSYS Org',
    url: 'https://www.lmsys.org/',
    domain: 'lmsys.org',
    category: '大模型系统',
    description: '开放的大模型系统研究与项目入口，汇集 SGLang、Chatbot Arena、FastChat、RouteLLM 等工作。',
    note: '适合追踪大模型推理、服务与评测方向的开源进展。'
  },
  {
    title: 'Ahead of AI',
    url: 'https://magazine.sebastianraschka.com/',
    domain: 'magazine.sebastianraschka.com',
    category: 'AI 研究解读',
    description: 'Sebastian Raschka 面向研究者和工程师撰写的机器学习与 AI 研究长文及趋势整理。',
    note: '适合补充模型研究背景，并快速了解值得继续深挖的方向。'
  },
  {
    title: 'SemiAnalysis',
    url: 'https://semianalysis.com/',
    domain: 'semianalysis.com',
    category: '半导体与产业',
    description: '连接芯片、加速器、HBM、AI 网络、云计算成本与数据中心产业的深度分析。',
    note: '适合从技术之外理解算力供给、成本结构和产业约束；部分内容需要订阅。'
  }
]
