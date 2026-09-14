import { PortfolioStore } from '../types';

export const initialPortfolioData: PortfolioStore = {
  profile: {
    name: "陈墨",
    englishName: "Alex Chen",
    title: "资深全栈工程师 / 架构师 / AI 工程化践行者",
    tagline: "构建高可用分布式系统与极具美感的现代 Web 体验",
    elevatorPitch: "专注高并发分布式云原生架构与大模型工程化落地。7年+全栈研发经验，曾主导亿级日活交易链路重构及 15k+ Stars 开源生态建设，善于在业务价值与工程卓越之间找到最佳平衡点。",
    shortBio: "你好！我是陈墨，现任某头部科技公司资深架构工程师。长年深耕 TypeScript、Go、React/Next.js 及 LLM Agent 架构，热衷打造可靠的生产级数字工具与开源基础设施。",
    detailedBio: "毕业于计算机科学与技术专业，拥有 7 年互联网大型系统与技术品牌孵化经验。早期专注于大规模微服务性能治理与高频前端状态流，近年来深入研究生成式 AI 基础设施、本地向量检索与自动化 Agent 系统。\n\n崇尚「好代码如同好散文」的设计哲学：代码应当具有极致的可读性、完备的容灾弹性与优雅的设计约束。工作之余活跃于 GitHub 开源社区，并持续在知识库沉淀高质量工程复盘。",
    location: "中国 · 上海 (支持 Remote 协作)",
    experienceYears: 7,
    availability: "开放技术顾问 / 全职高潜机会 / 架构技术交流",
    email: "alex.chen.dev@example.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
    wechat: "Dev_AlexChen",
    blogUrl: "https://alexchen.dev",
    resumeUrl: "#",
    techDirections: [
      {
        title: "分布式高并发架构",
        desc: "微服务治理、高可用网关、缓存穿透防御体系以及毫秒级弹性伸缩方案。",
        icon: "Cpu"
      },
      {
        title: "现代 Web 与全栈交互",
        desc: "精通 React/Next.js、TypeScript、Tailwind CSS 及复杂前端状态与微前端编排。",
        icon: "Layout"
      },
      {
        title: "LLM Agent 与 AI 落地",
        desc: "基于 RAG 知识检索、向量库混合索引、自动化工作流编排及垂直模型微调评测。",
        icon: "Bot"
      },
      {
        title: "云原生与 DevOps 效能",
        desc: "Kubernetes 自动化集群、GitOps CI/CD 流水线、零信任网络与分布式链路追踪监控。",
        icon: "Cloud"
      }
    ],
    skills: [
      {
        category: "前端与交互体系",
        list: [
          { name: "React / Next.js", level: 95, tag: "生产主力" },
          { name: "TypeScript", level: 95, tag: "严格类型工程" },
          { name: "Tailwind CSS / UI", level: 90, tag: "设计系统" },
          { name: "Node.js / SSR", level: 90, tag: "全栈基建" },
          { name: "Three.js / WebGL", level: 75, tag: "数据可视化" }
        ]
      },
      {
        category: "后端与分布式",
        list: [
          { name: "Go (Golang)", level: 90, tag: "高并发微服务" },
          { name: "PostgreSQL / Redis", level: 88, tag: "存储与缓存" },
          { name: "gRPC & Protobuf", level: 86, tag: "高性能通信" },
          { name: "Kafka / RabbitMQ", level: 84, tag: "事件驱动流" }
        ]
      },
      {
        category: "AI工程与数据基建",
        list: [
          { name: "LangChain / LlamaIndex", level: 88, tag: "Agent工作流" },
          { name: "Milvus / PgVector", level: 85, tag: "向量数据库" },
          { name: "Prompt / RAG Pipeline", level: 92, tag: "企业知识库" },
          { name: "Python / FastApi", level: 85, tag: "模型推理服务" }
        ]
      },
      {
        category: "DevOps & 运维可观测",
        list: [
          { name: "Docker & Kubernetes", level: 88, tag: "容器编排" },
          { name: "CI/CD & GitHub Actions", level: 90, tag: "流水线自动化" },
          { name: "Prometheus & Grafana", level: 82, tag: "链路度量告警" },
          { name: "Terraform / IaC", level: 80, tag: "基础设施即代码" }
        ]
      }
    ],
    careerTimeline: [
      {
        period: "2023.03 - 至今",
        company: "星穹智能科技 (AI Cloud)",
        role: "资深全栈架构师",
        summary: "负责企业级企业 AI Agent 协作平台与知识中台技术架构设计，带领 8 人跨职能工程小队。",
        achievements: [
          "从零搭建基于 Next.js + Go 的多租户 LLM 调度架构，服务 120+ 家中大型企业客户。",
          "创新混合 RAG 算法与倒排索引加速技术，检索召回率提升 34%，响应延迟降低 55%。",
          "规范团队 TypeScript Monorepo 体系与端到端自动化测试，交付周期缩短 40%。"
        ]
      },
      {
        period: "2020.06 - 2023.02",
        company: "极客云图网络 (FinTech)",
        role: "核心系统研发工程师 / 技术组长",
        summary: "深度参与核心交易与结算系统服务化改造，负责大促高可用保障及风控引擎。",
        achievements: [
          "重构日均 8000 万请求的订单结算网关，实现零停机热迁移与熔断限流防护。",
          "主导建立全链路分布式追踪 (SkyWalking)，将系统故障定位时间从小时级压减至 5 分钟内。",
          "撰写多项技术专利，并荣获公司年度卓越技术贡献奖。"
        ]
      },
      {
        period: "2018.07 - 2020.05",
        company: "光年未来实验室",
        role: "全栈开发工程师",
        summary: "参与研发 SaaS 协同办公套件及实时富文本协同编辑器核心引擎。",
        achievements: [
          "负责基于 WebSocket 与 OT 算法的协同编辑模块，支持万人级并发在线协同编辑。",
          "独立负责前端性能治理专项，首次内容绘制 (FCP) 从 2.4s 优化至 0.8s。"
        ]
      }
    ],
    coreValues: [
      {
        title: "第一性原理思维",
        desc: "不盲从技术潮流，从业务本质与系统吞吐底层剖析问题，选择最合适而非最炫技的技术。",
        icon: "Compass"
      },
      {
        title: "极致的用户与工程体验",
        desc: "对交互响应、无障碍访问、类型安全与日志可观测性有近乎苛刻的质量标准。",
        icon: "ShieldCheck"
      },
      {
        title: "开放分享与开源共建",
        desc: "坚持知识开源沉淀，输出高质量长文与实用工具，积极回馈全球开发者生态。",
        icon: "Share2"
      }
    ]
  },
  projects: [
    {
      id: "proj-1",
      title: "OmniFlow - 企业级多 Agent 知识协同工作台",
      tagline: "下一代生成式 AI 自动化办公引擎，支持自定义 Agent 编排与私有化知识库检索",
      category: "ai",
      categoryName: "AI 智能应用",
      isFeatured: true,
      role: "主导架构师 & 核心全栈研发",
      background: "解决企业员工在碎片化系统间查询资料费时、缺乏自动化跨系统调度工具的痛点。打造开箱即用的 Agent 流水线。",
      techStack: ["Next.js", "TypeScript", "Python FastApi", "LangChain", "Milvus", "Tailwind CSS"],
      achievements: [
        "企业内部 3,000+ 员工高频使用，日均响应问答超 25,000 次",
        "RAG 混合召回方案实现平均准确率 94.2%，文档解析速度较主流商用方案提升 3 倍",
        "获 2024 年开源开发者创新奖，GitHub 标星超 3,200+"
      ],
      demoUrl: "https://example.com/omniflow",
      githubUrl: "https://github.com/example/omniflow",
      date: "2024",
      status: "active"
    },
    {
      id: "proj-2",
      title: "HyperGate - 高性能云原生微服务 API 网关",
      tagline: "基于 Go 语言研发的轻量级无侵入边缘网关，内置动态鉴权与熔断降级",
      category: "infra",
      categoryName: "基础设施与后端",
      isFeatured: true,
      role: "后端架构负责人",
      background: "传统网关在高并发大促下内存占用高、热更新路由需重启节点。针对性研发零损耗动态插件机制。",
      techStack: ["Golang", "eBPF", "Redis Cluster", "gRPC", "Prometheus", "Docker"],
      achievements: [
        "实测单节点压测支撑 85,000+ QPS，P99 响应延迟低于 1.8ms",
        "支持基于 WebAssembly 的动态插件热加载，配置生效延迟控制在 100ms 以内",
        "平稳支撑双十一大促数十亿级请求，全链路零故障"
      ],
      demoUrl: "https://example.com/hypergate",
      githubUrl: "https://github.com/example/hypergate",
      date: "2023",
      status: "active"
    },
    {
      id: "proj-3",
      title: "DevPulse - 现代化全栈技术品牌与博客系统",
      tagline: "为工程师量身定做的高性能个人主页与知识库模板，支持秒级速览与无缝管理",
      category: "fullstack",
      categoryName: "全栈 Web 应用",
      isFeatured: true,
      role: "独立设计与全栈研发",
      background: "市面上的静态博客缺乏招聘方30秒速览评估能力与交互式内容管理，开发此系统赋能技术人塑造专业个人品牌。",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Motion", "Vite", "Markdown Parser"],
      achievements: [
        "Lighthouse 性能跑分 99+，极致的首屏渲染与骨架加载体验",
        "内置便捷的内容管理系统 (CMS)，支持离线数据备份与无感数据同步",
        "累计被 500+ 资深开发者作为个人求职与技术主页模板采用"
      ],
      demoUrl: "https://example.com/devpulse",
      githubUrl: "https://github.com/example/devpulse",
      date: "2024",
      status: "active"
    },
    {
      id: "proj-4",
      title: "LogikMock - 智能 API 仿真与契约测试套件",
      tagline: "前端开发者零依赖快速联调工具，支持基于 JSON Schema 与自然语言的实时 Mock 生成",
      category: "opensource",
      categoryName: "开源开发工具",
      isFeatured: false,
      role: "开源发起人与维护者",
      background: "跨前后端联调阶段经常出现接口未就绪导致阻塞。提供本地沙箱与自动化契约校验。",
      techStack: ["Node.js", "TypeScript", "Fastify", "Monaco Editor"],
      achievements: [
        "NPM 周下载量突破 12,000 次，在 GitHub 累计 1,800+ Stars",
        "团队前后端联调等待时间减少 60%，CI 契约断言通过率 100%"
      ],
      githubUrl: "https://github.com/example/logikmock",
      date: "2022",
      status: "active"
    },
    {
      id: "proj-5",
      title: "MatrixVision - WebGL 实时数据流监控大屏",
      tagline: "轻量级高帧率 3D 拓扑图谱与网络流量可视化看板",
      category: "fullstack",
      categoryName: "全栈 Web 应用",
      isFeatured: false,
      role: "前端可视化负责人",
      background: "为大型机房与分布式节点打造实时拓扑渲染大屏，需在低端显卡下稳定 60 FPS。",
      techStack: ["React", "Three.js", "WebGL", "WebSocket", "ECharts"],
      achievements: [
        "通过 GPU 实例化与自定义着色器优化，同屏渲染 10,000+ 节点保持 60 FPS",
        "荣获行业优秀工业互联网界面设计银奖"
      ],
      demoUrl: "https://example.com/matrixvision",
      date: "2023",
      status: "archived"
    }
  ],
  articles: [
    {
      id: "art-1",
      title: "现代前端工程：从零设计生产级微服务全栈架构与状态流",
      slug: "modern-fullstack-architecture-best-practices",
      category: "前端架构",
      tags: ["React", "Next.js", "TypeScript", "架构设计", "性能优化"],
      publishDate: "2024-08-22",
      readingTime: "8 分钟",
      isFeatured: true,
      excerpt: "探讨在千万级流量与复杂业务场景下，如何组织前端单体到微前端体系的演进，以及服务端渲染 (SSR)、类型同构和状态生命周期的治理策略。",
      content: `## 为什么需要重构前端架构？

在软件工程演进中，业务的膨胀往往快于代码的组织速度。当一个项目拥有超过 50 个复杂路由、上百个复合状态时，传统的单体前端仓库往往面临以下挑战：

1. **类型割裂与契约不一致**：前端维护一份 DTO，后端维护一份 Proto，联调阶段频频发生隐式运行时错误。
2. **状态树过于深沉**：过度使用全局状态管理（如过重的 Redux），导致无关组件频繁触发昂贵的重新渲染。
3. **构建与首屏水合瓶颈**：随着依赖包膨胀，客户端水合 (Hydration) 耗时剧增，尤其在低配移动端上甚至出现白屏卡顿。

---

## 核心设计法则：三层隔离与类型同构

为了解决上述问题，我们推行了「契约驱动开发 (Schema-Driven Development)」规范：

\`\`\`typescript
// 声明严格的领域对象契约
export interface ServiceResponse<T> {
  code: number;
  message: string;
  data: T;
  traceId: string;
  timestamp: number;
}
\`\`\`

### 1. 领域模型层 (Domain Layer)
独立于 UI 框架，所有核心业务计算（如计费规则、权限树遍历）均封装在纯函数中，覆盖 100% 单元测试。

### 2. 状态原子化与就近原则
尽量避免庞大的全局 Store。利用局部 Hook 与原子状态（Atoms）管理瞬时 UI 状态，仅在跨路由持久化需求时才接入持久层。

### 3. 服务端优先策略 (Server-First)
利用 React Server Components (RSC) 或 SSR 机制，将繁重的数据抓取与安全鉴权下沉至边缘服务端节点完成，减少客户端网络往返延迟 (RTT)。

---

## 性能评测与收益总结

实施上述架构后，核心链路 Lighthouse 性能评分从 62 分提升至 96 分，首屏最大内容绘制时间 (LCP) 下降了 **64%**。保持架构克制与关注点分离，永远是应对复杂度的良方。`
    },
    {
      id: "art-2",
      title: "企业级 LLM Agent 与混合 RAG 架构落地复盘",
      slug: "enterprise-llm-agent-rag-architecture",
      category: "AI与大模型",
      tags: ["LLM", "RAG", "向量检索", "Python", "系统架构"],
      publishDate: "2024-07-15",
      readingTime: "12 分钟",
      isFeatured: true,
      excerpt: "详述真实生产环境中大语言模型知识库的痛点解决策略：解决幻觉、多路召回重排、文本分块颗粒度优化及自动化评测流水线。",
      content: `## 背景与核心痛点

构建一个演示级别的 RAG (Retrieval-Augmented Generation) 只需半小时，但要将其推向千人使用的企业生产环境，会遭遇严苛的现实阻碍：

- **长文本截断与语义丢失**：粗暴的固定字数分块 (Chunking) 破坏了语义完整性。
- **检索准确率衰减**：单纯依赖稠密向量 (Dense Vector) 检索，对专业术语、料号、精确英文缩写的命中率严重不足。
- **模型幻觉不可控**：大模型在检索不到强相关依据时，容易生成似是而非的错误结论。

---

## 架构演进：多路混合召回 + 重排 (Hybrid Search & Re-rank)

我们设计了分层混合管道：

1. **粗筛阶段**：
   - 稠密向量检索（基于 BGE-M3 / OpenAI Embeddings 捕获语义相似度）。
   - 稀疏关键词检索（基于 BM25 算法捕获专业术语与精准匹配）。
2. **多路归并**：利用 RRF (Reciprocal Rank Fusion) 算法做无参结果融合。
3. **精排阶段 (Re-ranking)**：接入 Cross-Encoder 模型对 Top 20 结果重算语义相关性打分。

\`\`\`python
# 混合召回伪代码示意
def hybrid_search(query: str, top_k: int = 5):
    dense_results = vector_db.similarity_search(query, k=top_k * 2)
    sparse_results = bm25_index.search(query, k=top_k * 2)
    fused_docs = reciprocal_rank_fusion([dense_results, sparse_results])
    ranked_docs = reranker.score(query, fused_docs[:10])
    return ranked_docs[:top_k]
\`\`\`

---

## 结语

工程化的本质是用系统确定性包容模型的不确定性。通过合理的管道切分与度量指标，才能让 AI 真正为业务创造确定性的价值。`
    },
    {
      id: "art-3",
      title: "Go 高并发网关实战：高可用防御与零停机动态配置",
      slug: "go-high-concurrency-api-gateway",
      category: "后端与系统设计",
      tags: ["Golang", "网关", "高并发", "微服务", "限流容灾"],
      publishDate: "2024-05-10",
      readingTime: "10 分钟",
      isFeatured: true,
      excerpt: "从底层 epoll 与 goroutine 调度机制谈起，深入解析自研千万级高并发网关的令牌桶限流、自适应熔断及平滑更新机制。",
      content: `## 网关的定位与技术选型思考

在微服务拓扑结构中，API 网关是系统的「第一道守门人」。它不仅负责反向代理与协议转换，还承担着鉴权、防刷、全链路追踪与流量染色的职责。

我们在对比了 Nginx + Lua、Envoy 与自研 Go 网关后，最终选择基于 Go 打造轻量级核心：
- **开发与维护效率**：Go 语言拥有极佳的代码可读性与健壮的垃圾回收机制。
- **并发性能**：GMP 调度模型能够原生承载数十万长连接而无需复杂的回调地狱。

---

## 核心技术点：自适应弹性熔断器

传统固定阈值的熔断器在流量陡增时容易产生误判。我们基于滑动时间窗口与错误率动态偏离算法设计了弹性熔断：

\`\`\`go
// 滑动窗口统计错误率
type CircuitBreaker struct {
    mu          sync.RWMutex
    windowSize  time.Duration
    failureRate float64
    state       State // Closed, Open, Half-Open
}
\`\`\`

当后端实例响应出现持续超时（P99 > 800ms）或 5xx 突增时，网关可在 50ms 内自动降级并返回预热兜底数据，有效避免了服务雪崩。`
    },
    {
      id: "art-4",
      title: "极简工程主义：如何保持技术栈的清晰与长期可维护性",
      slug: "minimalist-software-engineering-philosophy",
      category: "工程哲学",
      tags: ["软件设计", "重构", "可维护性", "技术选型"],
      publishDate: "2024-03-01",
      readingTime: "6 分钟",
      isFeatured: false,
      excerpt: "在工具泛滥与过度工程的时代，为什么克制的技术选型才是长期成功的关键？分享关于架构负债、依赖黑洞与文档驱动开发的思考。",
      content: `## 警惕「技术游乐场」陷阱

很多工程项目在初期充满了激情，架构师引入了最前沿的库、最复杂的范式；然而一年后，团队新人甚至不敢轻易改动一行核心代码。这就是典型的**过度工程 (Over-engineering)**。

### 评估引入新依赖的黄金准则：
1. **解决的问题是否属于系统核心价值？**
2. **是否可以用现有的语言标准库在 50 行内实现？**
3. **团队内是否有至少 2 人精通该依赖的内部原理与故障排查？**

---

## 结论

优秀的系统往往朴实无华。把简单的事情做到极致，比用复杂的架构掩盖低劣的实现要困难得多。`
    }
  ],
  tools: [
    {
      id: "tool-1",
      name: "Cursor / VS Code",
      category: "dev",
      categoryName: "开发利器",
      purpose: "AI 强力赋能的代码编辑器，支持跨文件上下文理解与智能指令",
      tags: ["IDE", "AI Coding", "效率翻倍"],
      websiteUrl: "https://cursor.com",
      recommendationReason: "重塑了我的编码心流。尤其在重构大型类型定义与编写样板代码时，Tab 补全与智能感知极其精准，日常开发效率提升 40% 以上。",
      iconName: "Terminal",
      isTopPick: true
    },
    {
      id: "tool-2",
      name: "Raycast",
      category: "productivity",
      categoryName: "效率与工作流",
      purpose: "极速 Mac 启动器与自动化中心，替代 Spotlight 的生产力神器",
      tags: ["Launcher", "脚本工具", "快捷键"],
      websiteUrl: "https://raycast.com",
      recommendationReason: "剪贴板历史、窗口分屏、快速计算器以及自定义 Node 脚本一应俱全。键盘不离手即可调度整个操作系统的中枢。",
      iconName: "Zap",
      isTopPick: true
    },
    {
      id: "tool-3",
      name: "Docker & OrbStack",
      category: "cloud",
      categoryName: "基础设施与云",
      purpose: "超轻量、极速的 macOS 容器与 Linux 运行环境，资源占用极低",
      tags: ["DevOps", "容器", "本地开发"],
      websiteUrl: "https://orbstack.dev",
      recommendationReason: "相较传统 Docker Desktop，OrbStack 启动只需 1 秒，CPU 与内存占用减少了 70%，在本地并行启动多个微服务与数据库毫无压力。",
      iconName: "Box",
      isTopPick: true
    },
    {
      id: "tool-4",
      name: "v0 by Vercel",
      category: "ai",
      categoryName: "AI 与前沿",
      purpose: "基于自然语言快速生成高质量 React + Tailwind CSS 界面组件原型",
      tags: ["AI 原型", "UI 生成", "Tailwind"],
      websiteUrl: "https://v0.dev",
      recommendationReason: "灵感捕捉神器。当需要验证一个新的设计系统或后台页面布局时，几句话就能生成接近生产级别的代码骨架。",
      iconName: "Sparkles",
      isTopPick: true
    },
    {
      id: "tool-5",
      name: "Postman / Bruno",
      category: "dev",
      categoryName: "开发利器",
      purpose: "轻量级、开源的 Git 友好 API 探索与自动化测试工具",
      tags: ["API", "HTTP", "Git 协作"],
      websiteUrl: "https://usebruno.com",
      recommendationReason: "纯文本文件存储集合（.bru），直接与代码仓库一同版本化管理，完全无需云端同步隐私担忧，开源且极速。",
      iconName: "Send",
      isTopPick: false
    },
    {
      id: "tool-6",
      name: "Figma",
      category: "productivity",
      categoryName: "效率与工作流",
      purpose: "业界事实标准的协同界面与原型设计工具，设计系统必备",
      tags: ["Design", "UI/UX", "协作"],
      websiteUrl: "https://figma.com",
      recommendationReason: "工程师必须理解设计语言。用 Figma 搭建组件规范 (Auto-layout / Tokens) 后，编写对应的前端代码如同拼装乐高积木。",
      iconName: "PenTool",
      isTopPick: false
    },
    {
      id: "tool-7",
      name: "Obsidian",
      category: "productivity",
      categoryName: "效率与工作流",
      purpose: "基于本地 Markdown 文件的双链个人知识库与技术复盘中心",
      tags: ["PKM", "双链笔记", "Local First"],
      websiteUrl: "https://obsidian.md",
      recommendationReason: "本地优先与纯文本哲学保证数据 100% 掌握在自己手中。通过知识图谱沉淀复杂系统架构的因果脉络。",
      iconName: "FileText",
      isTopPick: false
    },
    {
      id: "tool-8",
      name: "Supabase",
      category: "cloud",
      categoryName: "基础设施与云",
      purpose: "开源 Firebase 替代方案，提供完整的 Postgres、Auth 与实时订阅",
      tags: ["BaaS", "PostgreSQL", "全栈后端"],
      websiteUrl: "https://supabase.com",
      recommendationReason: "开箱即用的 PostgreSQL 生产环境，兼具行级安全策略 (RLS) 与高性能向量扩展 (pgvector)，个人副业项目的最佳起步支点。",
      iconName: "Database",
      isTopPick: false
    }
  ]
};
