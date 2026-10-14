// ============================================================
// ICPC 区域银牌备战模块（独立 · 不影响原有模块）
// 数据 + 状态 + 渲染 全部自包含；LocalStorage 用独立 key「icpc-v1-state」
// 由 index.html 末尾 <script src="icpc.js"> 加载，挂到 #icpc-wrap
// ============================================================

// ---------- 区域赛真题库（阶段 3 综合训练用） ----------
const ICPC_ZHENTI = [
  "2021CCPC 哈尔滨 B", "2022ICPC 杭州 A", "2023CCPC 威海 E",
  "2022ICPC 南京 D", "2021ICPC 上海 G", "2020CCPC 长春 D",
  "2023ICPC 济南 D", "2022CCPC 绵阳 B", "2021ICPC 沈阳 F",
  "2023CCPC 广州 C", "2022ICPC 沈阳 D", "2023ICPC 武汉 F",
  "2021CCPC 珠海 G", "2022CCPC 哈尔滨 I",
];

// ============================================================
// 树图专项题库（每天第 4 题 · 全年贯彻 · 从易到难螺旋上升）
// 从「树的遍历 / 图遍历」最基础开始 → 并查集 → 拓扑 → 直径重心
// → LCA → 树上 DP → 树上概率 DP/期望 → 最短路 → MST → Tarjan
// → 二分图 → 树链剖分 → 网络流。刷完循环复习（螺旋，防止遗忘）
// ============================================================
const TREE_GRAPH_POOL = [
  // —— 第 1 段：树的遍历（最弱先打基础，把遍历彻底吃透）——
  "洛谷 P1305 新二叉树（入门）",
  "洛谷 P1030 求先序排列（入门）",
  "洛谷 P1827 美国血统（普及）",
  "洛谷 P4913 二叉树深度（入门）",
  "洛谷 P3884 二叉树问题（普及）",
  // —— 第 2 段：图遍历 / 连通块 ——
  "洛谷 P5318 查找文献（普及）",
  "洛谷 P1141 01迷宫（普及）",
  "洛谷 P1162 填涂颜色（普及）",
  "洛谷 P1451 求细胞数量（普及）",
  "洛谷 P1332 血色先锋队（普及）",
  // —— 第 3 段：并查集 ——
  "洛谷 P3367 并查集（入门）",
  "洛谷 P1551 亲戚（普及）",
  "洛谷 P1536 村村通（普及）",
  "洛谷 P3958 奶酪（提高）",
  // —— 第 4 段：拓扑排序 ——
  "洛谷 P1113 杂务（普及）",
  "洛谷 P4017 最大食物链计数（普及）",
  "洛谷 P2712 摄像头（普及）",
  // —— 第 5 段：树上 DP 入门 / 直径 / 重心 ——
  "洛谷 P1352 没有上司的舞会（普及）",
  "洛谷 P1122 最大子树和（普及）",
  "洛谷 P1099 树网的核（提高）",
  "洛谷 P5536 树的重心（提高）",
  // —— 第 6 段：LCA ——
  "洛谷 P3379 最近公共祖先（普及）",
  "洛谷 P3398 仓鼠找sugar（普及）",
  "洛谷 P1967 货车运输（提高）",
  // —— 第 7 段：树上 DP / 树形背包 ——
  "洛谷 P2015 二叉苹果树（普及）",
  "洛谷 P2014 选课（普及）",
  "洛谷 P1273 有线电视网（提高）",
  "洛谷 P2279 消防局的设立（提高）",
  "洛谷 P2607 骑士（提高）",
  // —— 第 8 段：树上概率 DP / 期望 DP ——
  "洛谷 P4316 绿豆蛙的归宿（普及）",
  "洛谷 P1297 单选错位（普及）",
  "洛谷 P1365 WJMZBMR打osu（提高）",
  "洛谷 P1850 换教室（提高）",
  "CF 148D Bag of mice（概率DP）",
  "CF 518D Ilya and Escalator（概率DP）",
  // —— 第 9 段：图最短路 ——
  "洛谷 P4779 Dijkstra堆优化（普及）",
  "洛谷 P1119 灾后重建（Floyd·提高）",
  "洛谷 P1522 牛的旅行（Floyd·提高）",
  "洛谷 P1462 通往奥格瑞玛的道路（提高）",
  "洛谷 P3385 负环（提高）",
  // —— 第 10 段：最小生成树 ——
  "洛谷 P3366 最小生成树（普及）",
  "洛谷 P1991 无线通讯网（普及）",
  "洛谷 P1546 最短网络（普及）",
  // —— 第 11 段：强连通 / Tarjan ——
  "洛谷 P2863 强连通分量（普及）",
  "洛谷 P3388 割点（普及）",
  "洛谷 P3387 缩点（普及）",
  // —— 第 12 段：二分图 ——
  "洛谷 P3386 二分图最大匹配（普及）",
  "洛谷 P1330 封锁阳光大学（提高）",
  "洛谷 P1129 矩阵游戏（提高）",
  // —— 第 13 段：树链剖分 / 网络流（高级收尾）——
  "洛谷 P3384 树链剖分（提高）",
  "洛谷 P2146 软件包管理器（提高）",
  "洛谷 P3376 网络最大流（提高）",
];

// ============================================================
// 螺旋式刷题训练清单（3 阶段 · 优先练熟旧算法，再学新算法）
// 每个专题分 3 档：p1 入门巩固 / p2 中档 / p3 综合
// check = 验收标准，pitfalls = 易错点/训练提醒；后期月份穿插复习旧专题
// ============================================================
// ============================================================
// 螺旋式训练计划（科学版）：52 周，每周一个专题（1 周 ≈ 1 知识点）
// 每专题 3 档：p1 入门 / p2 中档 / p3 综合，题在专题周内循环练熟
// 每天第 5 题 = 螺旋复习（自动回到「约一个月前」的专题，防遗忘）
// 覆盖完整：基础 / 贪心 / 数论 / 搜索 / 全部 DP / 数据结构 / 图论 / 字符串 / 数学进阶
// ============================================================
const ICPC_PLAN = [
  // ================= 阶段 1：基础算法 + 搜索（月 1-3） =================
  {
    mo: 1, stage: 1, title: "基础算法 I",
    core: "模拟·排序·二分·前缀和",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "语法与基础算法一次写对",
    weeks: [
      { name: "模拟 / 枚举 / 高精度", p1: ["洛谷 P1042 乒乓球（入门）", "洛谷 P1303 A*B 高精度（入门）"], p2: ["洛谷 P1601 A+B 高精度（入门）", "洛谷 P1009 阶乘之和（普及）"], p3: ["洛谷 P1255 数楼梯（普及）", "洛谷 P1045 麦森数（提高）"], check: "模拟题不写 bug，高精度加减乘除默写", pitfalls: "高精度进位/借位、前导零；模拟边界条件" },
      { name: "排序 / 离散化 / 双指针", p1: ["洛谷 P1059 明明的随机数（入门）", "洛谷 P1177 快速排序（入门）"], p2: ["洛谷 P1923 第k小（普及）", "洛谷 P1102 A-B数对（普及）"], p3: ["洛谷 P1908 逆序对（普及）", "洛谷 P1012 拼数（普及）"], check: "快排/归并/双指针模板无 bug，离散化会用", pitfalls: "快排边界；逆序对用归并；双指针指针移动条件" },
      { name: "二分 / 三分", p1: ["洛谷 P2249 查找（入门）", "洛谷 P1873 砍树（入门）"], p2: ["洛谷 P2678 跳石头（普及）", "洛谷 P2440 木材加工（普及）"], p3: ["洛谷 P1182 数列分段（普及）", "洛谷 P1314 聪明的质检员（提高）"], check: "二分边界、check 函数一次写对", pitfalls: "left/right 取错死循环；答案上界下界判断" },
      { name: "前缀和 / 差分", p1: ["洛谷 P1115 最大子段和（入门）", "洛谷 P2367 语文成绩（入门）"], p2: ["洛谷 P2004 领地选择（普及）", "洛谷 P3397 地毯（普及）"], p3: ["洛谷 P1083 借教室（提高）", "洛谷 P2280 激光炸弹（普及）"], check: "一/二维前缀和、差分公式默写无误", pitfalls: "二维前缀和容斥符号；差分数组长度+1；下标从 1 起" },
    ],
  },
  {
    mo: 2, stage: 1, title: "贪心 + 数论",
    core: "贪心模型·数论基础·组合数学·线性基",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "贪心会证明，数论模板一次写对",
    weeks: [
      { name: "贪心入门", p1: ["洛谷 P1223 排队接水（入门）", "洛谷 P1803 凌乱的yyy（入门）"], p2: ["洛谷 P1090 合并果子（普及）", "洛谷 P2240 部分背包（普及）"], p3: ["洛谷 P1080 国王游戏（提高）"], check: "区间调度/哈夫曼/交换论证熟练", pitfalls: "贪心先证明再写码；比较器写反；忘开 long long" },
      { name: "贪心进阶", p1: ["洛谷 P1208 混合牛奶（入门）", "洛谷 P4995 跳跳（普及）"], p2: ["洛谷 P3817 小A的糖果（普及）", "洛谷 P5019 铺设道路（普及）"], p3: ["洛谷 P1106 删数问题（普及）", "洛谷 P1094 纪念品分组（普及）"], check: "构造/反悔/相邻交换等贪心技巧能一眼判断", pitfalls: "贪心无后效性判断；局部最优≠全局最优" },
      { name: "数论基础（gcd/exgcd/筛/逆元）", p1: ["洛谷 P3383 线性筛素数（入门）", "洛谷 P1226 快速幂（入门）"], p2: ["洛谷 P1082 同余方程（普及）", "洛谷 P3811 乘法逆元（普及）"], p3: ["洛谷 P1495 中国剩余定理（提高）", "洛谷 P2158 仪仗队（提高）"], check: "gcd/exgcd/筛/逆元/快速幂默写，一次编译过", pitfalls: "exgcd 回代符号；费马小定理仅模质数；快速幂取模边界" },
      { name: "组合数学 / 容斥", p1: ["洛谷 P1866 编号（普及）", "洛谷 P3807 组合数（普及）"], p2: ["洛谷 P4071 错排（提高）", "洛谷 P1044 栈（卡特兰数·普及）"], p3: ["洛谷 P2525 Uim的情人节礼物（提高）", "洛谷 P5520 排列组合（普及）"], check: "组合数/排列/容斥/卡特兰数公式会用", pitfalls: "组合数取模逆元；容斥正负号；卡特兰数递推式" },
      { name: "线性基", p1: ["洛谷 P3812 线性基（普及）", "洛谷 P3857 彩灯（普及）"], p2: ["洛谷 P4570 元素（提高）", "洛谷 P4301 新Nim游戏（提高）"], p3: ["CF 1100F Ivan and Burgers", "洛谷 P4151 最大XOR和路径（省选）"], check: "线性基插入/异或最大值手写，理解线性无关", pitfalls: "插入从高位到低位；第 k 小先重构基" },
    ],
  },
  {
    mo: 3, stage: 1, title: "搜索 + 线性DP入门",
    core: "单调栈·DFS/BFS·搜索进阶·线性DP",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "搜索模板无 bug，DP 状态设计清晰",
    weeks: [
      { name: "栈 / 队列 / 单调栈 / 单调队列", p1: ["洛谷 P5788 单调栈（普及）", "洛谷 P1886 滑动窗口（普及）"], p2: ["洛谷 P1440 求m区间最小值（普及）", "洛谷 P2866 Bad Hair Day（普及）"], p3: ["洛谷 P2422 良好的感觉（提高）", "洛谷 P2627 修剪草坪（提高）"], check: "讲清单调栈/队列维护什么单调性", pitfalls: "队列存下标而非值；弹栈条件写错；哨兵处理" },
      { name: "DFS / BFS / 回溯剪枝", p1: ["洛谷 P1605 迷宫（入门）", "洛谷 P1443 马的遍历（普及）"], p2: ["洛谷 P1135 奇怪的电梯（普及）", "洛谷 P1219 八皇后（普及）"], p3: ["洛谷 P1126 机器人搬重物（提高）", "洛谷 P1074 靶形数独（提高）"], check: "BFS 层序、DFS 回溯剪枝模板无 bug", pitfalls: "BFS 忘标记 visited 死循环；DFS 回溯没恢复状态" },
      { name: "搜索进阶（双向BFS/迭代加深/A*）", p1: ["洛谷 P1379 八数码难题（普及）", "洛谷 P1032 字串变换（提高）"], p2: ["洛谷 P2324 骑士精神（提高）", "洛谷 P1433 吃奶酪（普及）"], p3: ["洛谷 P1092 虫食算（提高）", "洛谷 P2895 流星雨（提高）"], check: "双向BFS/IDA*/估价函数会设计", pitfalls: "A* 估价函数不合法；双向 BFS 相遇点判断" },
      { name: "线性DP入门", p1: ["洛谷 P1216 数字三角形（入门）", "洛谷 P1048 采药（普及）"], p2: ["洛谷 P1002 过河卒（入门）", "洛谷 P1077 摆花（普及）"], p3: ["洛谷 P1541 乌龟棋（提高）", "洛谷 P1359 租用游艇（普及）"], check: "DP 状态定义、转移、边界一次写对", pitfalls: "状态维度定错；初始化/边界漏掉；滚动数组方向" },
    ],
  },

  // ================= 阶段 2：动态规划专题（月 4-5） =================
  {
    mo: 4, stage: 2, title: "DP 专题 I（背包/区间/树形/状压）",
    core: "背包·区间DP·树形DP·状压DP",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "四大 DP 类型全部能独立建模",
    weeks: [
      { name: "背包DP（01/完全/多重）", p1: ["洛谷 P1048 采药（普及）", "洛谷 P1616 疯狂的采药（普及）"], p2: ["洛谷 P1833 樱花（普及）", "洛谷 P1776 宝物筛选（普及）"], p3: ["洛谷 P1757 通天之分组背包（普及）", "洛谷 P2170 选学霸（提高）"], check: "01/完全/多重/分组背包模板一次写对", pitfalls: "体积/价值维度搞反；多重二进制优化；完全背包正向循环" },
      { name: "背包DP进阶", p1: ["洛谷 P1855 榨取kkksc03（普及）", "洛谷 P1507 NASA食物计划（普及）"], p2: ["洛谷 P5322 排兵布阵（普及）", "洛谷 P1450 硬币购物（提高）"], p3: ["洛谷 P2340 Cow Exhibition（提高）", "洛谷 P1156 垃圾陷阱（普及）"], check: "二维费用/混合/变种背包能独立建模", pitfalls: "多维度循环顺序；背包+容斥；体积为负处理" },
      { name: "区间DP", p1: ["洛谷 P1880 石子合并（普及）", "洛谷 P1063 能量项链（普及）"], p2: ["洛谷 P4170 涂色（普及）", "洛谷 P1220 关路灯（提高）"], p3: ["洛谷 P3205 合唱队（提高）", "洛谷 P1040 加分二叉树（提高）"], check: "区间 DP 枚举长度/起点/断点一次写对", pitfalls: "枚举顺序（先长度后端点）；断点范围；环拆链" },
      { name: "树形DP入门", p1: ["洛谷 P1352 没有上司的舞会（普及）", "洛谷 P2015 二叉苹果树（普及）"], p2: ["洛谷 P2014 选课（普及）", "洛谷 P1122 最大子树和（普及）"], p3: ["洛谷 P1273 有线电视网（提高）", "洛谷 P2279 消防局的设立（提高）"], check: "树形 DP 自底向上转移、树上背包一次写对", pitfalls: "dfs 后序处理；子节点状态合并；树上背包枚举顺序" },
      { name: "状压DP", p1: ["洛谷 P1896 互不侵犯（普及）", "洛谷 P1879 玉米田（普及）"], p2: ["洛谷 P2704 炮兵阵地（普及）", "洛谷 P1433 吃奶酪（状压·普及）"], p3: ["洛谷 P2831 愤怒的小鸟（提高）", "洛谷 P3959 宝藏（提高）"], check: "状态压缩、合法状态预处理、状压转移一次写对", pitfalls: "状态不合法漏判；滚动数组压维；子集枚举复杂度" },
    ],
  },
  {
    mo: 5, stage: 2, title: "DP 专题 II（数位/期望/计数/优化）",
    core: "数位DP·概率期望DP·LIS/LCS·DP优化",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "进阶 DP 类型全会，优化方向清晰",
    weeks: [
      { name: "数位DP", p1: ["洛谷 P2657 windy数（普及）", "洛谷 P4999 烦人的数学作业（普及）"], p2: ["洛谷 P4317 花神的数论题（提高）", "洛谷 P2602 数字计数（提高）"], p3: ["洛谷 P4127 同类分布（提高）", "洛谷 P1836 数页码（普及）"], check: "数位 DP 记忆化、按位枚举模板一次写对", pitfalls: "前导零处理；dp 数组维度；上下界限制" },
      { name: "概率 / 期望DP", p1: ["洛谷 P4316 绿豆蛙的归宿（普及）", "洛谷 P1297 单选错位（普及）"], p2: ["洛谷 P1365 WJMZBMR打osu（提高）", "洛谷 P1850 换教室（提高）"], p3: ["CF 148D Bag of mice", "CF 518D Ilya and Escalator"], check: "期望线性性、状态转移概率/期望建模正确", pitfalls: "期望用记忆化或拓扑倒推；概率加和归一" },
      { name: "LIS / LCS / 计数DP", p1: ["洛谷 P1020 导弹拦截（普及）", "洛谷 P1233 木棍加工（普及）"], p2: ["洛谷 P1439 最长公共子序列（提高）", "洛谷 P1091 合唱队形（普及）"], p3: ["洛谷 P1108 低价购买（提高）", "洛谷 P1631 序列合并（提高）"], check: "LIS(nlogn)/LCS/计数去重一次写对", pitfalls: "LIS 用 lower_bound；计数去重；LCS 转 LIS" },
      { name: "DP 优化（单调队列/斜率优化）", p1: ["洛谷 P2627 修剪草坪（提高）", "洛谷 P3572 Little Bird（提高）"], p2: ["洛谷 P3195 玩具装箱（提高）", "洛谷 P1725 琪露诺（普及）"], p3: ["洛谷 P3628 特别行动队（提高）", "洛谷 P2120 仓库建设（提高）"], check: "单调队列/斜率优化转移能独立写", pitfalls: "去无用状态；斜率单调性与凸壳维护" },
    ],
  },

  // ================= 阶段 3：数据结构 + 图论（月 6-9） =================
  {
    mo: 6, stage: 3, title: "数据结构 I（并查集/树状数组/线段树）",
    core: "并查集·树状数组·线段树",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "三大数据结构模板一次写对",
    weeks: [
      { name: "并查集基础", p1: ["洛谷 P3367 并查集（入门）", "洛谷 P1551 亲戚（普及）"], p2: ["洛谷 P1536 村村通（普及）", "洛谷 P1892 团伙（普及）"], p3: ["洛谷 P1111 修复公路（普及）", "洛谷 P3958 奶酪（提高）"], check: "路径压缩、按秩合并 find/union 一次写对", pitfalls: "忘初始化 father；路径压缩与合并顺序" },
      { name: "带权 / 种类并查集", p1: ["洛谷 P2024 食物链（普及）", "洛谷 P1525 关押罪犯（普及）"], p2: ["洛谷 P1196 银河英雄传说（普及）", "洛谷 P1455 搭配购买（普及）"], p3: ["洛谷 P1197 星球大战（提高）", "洛谷 P2700 逐个击破（提高）"], check: "带权/种类并查集维护关系一次写对", pitfalls: "种类并查集开 3 倍空间；权值在路径压缩时更新" },
      { name: "树状数组", p1: ["洛谷 P3374 树状数组1（入门）", "洛谷 P3368 树状数组2（普及）"], p2: ["洛谷 P1908 逆序对（普及）", "洛谷 P1168 中位数（普及）"], p3: ["洛谷 P1972 HH的项链（提高）", "洛谷 P3431 二维偏序（提高）"], check: "lowbit、单点/区间更新查询模板无 bug", pitfalls: "lowbit 用 i&(-i)；下标不能为 0；离线应用" },
      { name: "线段树基础", p1: ["洛谷 P3372 线段树1（普及）", "洛谷 P1198 最大数（普及）"], p2: ["洛谷 P3373 线段树2（提高）", "洛谷 P4588 数学计算（提高）"], p3: ["洛谷 P5490 扫描线（提高）", "洛谷 P4198 楼房重建（提高）"], check: "线段树建树/查询/区间加乘一次写对", pitfalls: "开 4 倍空间；区间合并顺序；mid 边界" },
      { name: "线段树懒标记", p1: ["洛谷 P2846 开关（提高）", "洛谷 P3372 线段树1（复习）"], p2: ["洛谷 P2023 维护序列（提高）", "洛谷 P4145 上帝造题（提高）"], p3: ["洛谷 P3380 二逼平衡树（提高）", "洛谷 P3373 线段树2（复习）"], check: "懒标记 pushdown 一次写对，标记不丢", pitfalls: "pushdown 忘清标记；加乘标记优先级；异或标记" },
    ],
  },
  {
    mo: 7, stage: 3, title: "数据结构 II + 图论 I",
    core: "ST表·主席树·平衡树·最短路",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "进阶数据结构会用，最短路熟练",
    weeks: [
      { name: "ST表 / RMQ", p1: ["洛谷 P3865 ST表模板（普及）", "洛谷 P2251 质量检测（普及）"], p2: ["洛谷 P2880 Balanced Lineup（普及）", "洛谷 P1714 切蛋糕（普及）"], p3: ["洛谷 P2216 理想的正方形（提高）", "洛谷 P2412 查单词（提高）"], check: "ST 表预处理/查询一次写对，理解倍增", pitfalls: "log 预处理；查询区间重叠取 max/min 不影响" },
      { name: "可持久化 / 主席树", p1: ["洛谷 P3919 可持久化线段树（普及）", "洛谷 P3834 主席树第k小（提高）"], p2: ["洛谷 P3567 KUR-Couriers（提高）", "洛谷 P4137 Rmq Problem（提高）"], p3: ["洛谷 P3168 任务查询系统（提高）", "洛谷 P2633 树上的数（提高）"], check: "可持久化数组/主席树建树、区间第 k 小一次写对", pitfalls: "每次修改新建节点；左右子树计数；离散化" },
      { name: "平衡树 / Treap", p1: ["洛谷 P3369 普通平衡树（提高）", "洛谷 P6136 平衡树加强（提高）"], p2: ["洛谷 P1801 黑匣子（普及）", "洛谷 P2286 宠物收养场（提高）"], p3: ["洛谷 P1486 郁闷的出纳员（提高）", "洛谷 P3224 永无乡（提高）"], check: "平衡树插入/删除/排名/前驱后继会用", pitfalls: "旋转/分裂边界；随机优先级；重复元素计数" },
      { name: "最短路（Dijkstra/SPFA/Floyd）", p1: ["洛谷 P3371 单源最短路（普及）", "洛谷 P4779 Dijkstra堆优化（普及）"], p2: ["洛谷 P1629 邮递员送信（普及）", "洛谷 P3385 负环（提高）"], p3: ["洛谷 P1144 最短路计数（普及）", "洛谷 P1462 通往奥格瑞玛的道路（提高）"], check: "Dijkstra 堆优化 / SPFA 判负环一次写对", pitfalls: "Dijkstra 不能负权；SPFA 判负环入队次数；dis 初始化 INF" },
    ],
  },
  {
    mo: 8, stage: 3, title: "图论 II（MST/拓扑/连通性/二分图）",
    core: "最小生成树·拓扑·Tarjan·割点桥·二分图",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "图论基础算法全熟练",
    weeks: [
      { name: "最小生成树", p1: ["洛谷 P3366 最小生成树（普及）", "洛谷 P1546 最短网络（普及）"], p2: ["洛谷 P1991 无线通讯网（普及）", "洛谷 P1547 Out of Hay（普及）"], p3: ["洛谷 P4180 次小生成树（提高）", "洛谷 P1967 货车运输（提高）"], check: "Kruskal/Prim 一次写对，理解次小生成树", pitfalls: "并查集初始化；按边权排序；次小生成树换边" },
      { name: "拓扑排序", p1: ["洛谷 P1113 杂务（普及）", "洛谷 P4017 最大食物链计数（普及）"], p2: ["洛谷 P2712 摄像头（普及）", "洛谷 P1807 最长路（普及）"], p3: ["洛谷 P1983 车站分级（提高）", "洛谷 P1137 旅行计划（提高）"], check: "拓扑排序 + 拓扑序上 DP 一次写对", pitfalls: "入度数组别改原图；有环图无拓扑序；拓扑 DP 顺序" },
      { name: "强连通 / Tarjan / 缩点", p1: ["洛谷 P2863 强连通分量（普及）", "洛谷 P3387 缩点（普及）"], p2: ["洛谷 P2002 消息扩散（普及）", "洛谷 P2341 受欢迎的牛（普及）"], p3: ["洛谷 P2746 校园网（提高）", "洛谷 P1073 最优贸易（提高）"], check: "Tarjan 求 SCC、缩点后 DAG DP 一次写对", pitfalls: "dfn/low 更新时机；缩点后重连边；出度入度统计" },
      { name: "割点 / 桥 / 双连通", p1: ["洛谷 P3388 割点（普及）", "洛谷 P1656 炸铁路（普及）"], p2: ["洛谷 P3469 BLO-Blockade（提高）", "洛谷 P1613 跑路（提高）"], p3: ["洛谷 P3225 矿场搭建（提高）", "洛谷 P2860 Redundant Paths（提高）"], check: "割点/桥判定、点双/边双一次写对", pitfalls: "根节点割点特判；low[v]>=dfn[u] 与 low[v]>dfn[u] 区分" },
      { name: "二分图（染色/匹配）", p1: ["洛谷 P3386 二分图最大匹配（普及）", "洛谷 P1330 封锁阳光大学（提高）"], p2: ["洛谷 P1129 矩阵游戏（提高）", "洛谷 P1525 关押罪犯（二分图·普及）"], p3: ["洛谷 P1640 连续攻击游戏（提高）", "洛谷 P2071 座位安排（提高）"], check: "匈牙利算法、二分图染色判定一次写对", pitfalls: "染色判定奇环；匈牙利增广路；邻接表建图方向" },
    ],
  },
  {
    mo: 9, stage: 3, title: "图论 III + 网络流",
    core: "LCA·差分约束·网络流·费用流",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "图论进阶 + 网络流建图",
    weeks: [
      { name: "LCA（最近公共祖先）", p1: ["洛谷 P3379 最近公共祖先（普及）", "洛谷 P3398 仓鼠找sugar（普及）"], p2: ["洛谷 P3258 松鼠的新家（提高）", "洛谷 P4427 求和（提高）"], p3: ["洛谷 P2680 运输计划（提高）", "洛谷 P3128 Max Flow（提高）"], check: "倍增 LCA + 树上差分一次写对", pitfalls: "倍增表大小；树上差分正负；路径拆分" },
      { name: "差分约束", p1: ["洛谷 P1993 小K的农场（普及）", "洛谷 P1260 工程规划（普及）"], p2: ["洛谷 P3275 糖果（提高）", "洛谷 P4878 布局（提高）"], p3: ["洛谷 P4926 倍杀测量者（提高）", "洛谷 P2474 天平（提高）"], check: "不等式建图、spfa 判负环解差分约束", pitfalls: "建图方向（<= 用最短路）；超级源点；无解判负环" },
      { name: "网络流（最大流 Dinic）", p1: ["洛谷 P3376 网络最大流（提高）", "洛谷 P2740 草地排水（提高）"], p2: ["洛谷 P3254 圆桌问题（提高）", "洛谷 P2756 飞行员配对（普及）"], p3: ["洛谷 P2774 方格取数问题（提高）", "洛谷 P2763 试题库问题（提高）"], check: "Dinic 模板一次写对，能建二分图/最大流模型", pitfalls: "反向边容量；当前弧优化；建图方向" },
      { name: "费用流 / 二分图带权匹配", p1: ["洛谷 P3381 最小费用最大流（提高）", "洛谷 P4015 运输问题（提高）"], p2: ["洛谷 P4014 分配问题（提高）", "洛谷 P2153 晨跑（提高）"], p3: ["洛谷 P3356 火星探险（提高）", "洛谷 P1251 餐巾计划（提高）"], check: "SPFA/Dijkstra 费用流、二分图带权匹配一次写对", pitfalls: "费用流建负边；反向边费用取负；KM/费用流选型" },
    ],
  },

  // ================= 阶段 4：字符串 + 数学进阶 + 冲刺（月 10-12） =================
  {
    mo: 10, stage: 4, title: "字符串（哈希/KMP/Trie/AC自动机）",
    core: "字符串哈希·KMP·Trie·AC自动机",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "字符串四大件一次写对",
    weeks: [
      { name: "字符串哈希", p1: ["洛谷 P3370 字符串哈希（普及）", "洛谷 P2957 谷仓的回声（普及）"], p2: ["洛谷 P3501 反回文串（提高）", "CF 7D Palindrome Degree"], p3: ["CF 126B Password", "洛谷 P3449 回文串（提高）"], check: "字符串哈希（单/双哈希）模板一次写对", pitfalls: "哈希冲突；取模/双哈希；子串哈希前缀差" },
      { name: "KMP", p1: ["洛谷 P3375 KMP（普及）", "洛谷 P4391 无线传输（普及）"], p2: ["洛谷 P4824 KMP删除（提高）", "洛谷 P2375 动物园（提高）"], p3: ["洛谷 P3435 OKR-Periods（提高）", "CF 126B Password"], check: "KMP 前缀函数、next 数组一次写对", pitfalls: "next 数组边界；失配回退；循环节 n-next[n]" },
      { name: "Trie 字典树", p1: ["洛谷 P2580 于是他错误的点名（普及）", "洛谷 P2922 Secret Message（普及）"], p2: ["洛谷 P4551 最长异或路径（提高）", "洛谷 P5283 异或粽子（提高）"], p3: ["洛谷 P4735 最大异或和（提高）"], check: "Trie 插入/查询、01 Trie 异或最值一次写对", pitfalls: "01 Trie 从高位到低位；节点计数；可持久化 Trie" },
      { name: "AC自动机", p1: ["洛谷 P3808 AC自动机模板（普及）", "洛谷 P3796 AC自动机模板2（提高）"], p2: ["洛谷 P5357 AC自动机模板3（提高）", "洛谷 P4052 文本生成器（提高）"], p3: ["洛谷 P2444 病毒（提高）", "洛谷 P3966 单词（提高）"], check: "AC 自动机建图、fail 树、多模式匹配一次写对", pitfalls: "fail 指针构建；失配转移；多模式计数去重" },
    ],
  },
  {
    mo: 11, stage: 4, title: "数学进阶 + 综合刷题",
    core: "Manacher·矩阵快速幂·博弈论·真题混合",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "数学进阶收官，进入混合刷题",
    weeks: [
      { name: "Manacher / Z函数", p1: ["洛谷 P3805 Manacher（普及）", "洛谷 P5410 Z函数模板（普及）"], p2: ["洛谷 P4555 最长双回文串（提高）", "洛谷 P1659 拉拉队排练（提高）"], p3: ["洛谷 P4287 双倍回文（提高）", "CF 17E Palisection"], check: "Manacher/Z 函数模板一次写对", pitfalls: "Manacher 插入分隔符；回文半径边界；Z 函数区间" },
      { name: "矩阵快速幂", p1: ["洛谷 P3390 矩阵快速幂（普及）", "洛谷 P1962 斐波那契（普及）"], p2: ["洛谷 P1939 矩阵加速（普及）", "洛谷 P1306 斐波那契公约数（提高）"], p3: ["洛谷 P1349 广义斐波那契（普及）", "洛谷 P2044 随机数生成器（提高）"], check: "矩阵乘法/快速幂、递推转矩阵一次写对", pitfalls: "矩阵乘法顺序；初始化单位阵；递推构造" },
      { name: "博弈论（SG函数/Nim）", p1: ["洛谷 P2197 Nim游戏（普及）", "洛谷 P1247 取火柴游戏（普及）"], p2: ["洛谷 P2252 取石子游戏（普及）", "洛谷 P4136 谁能赢呢（普及）"], p3: ["洛谷 P2575 高手过招（提高）", "洛谷 P1290 欧几里德的游戏（普及）"], check: "Nim 异或、SG 函数、必胜/必败态判断一次写对", pitfalls: "SG 函数打表；异或和判胜负；博弈+DP" },
      { name: "真题混合刷题", zhenti: true, problems: ICPC_ZHENTI, check: "拿到题 30 秒内判断算法方向", pitfalls: "多知识点混合，先想清楚再写码" },
      { name: "区域赛套题训练 I", zhenti: true, problems: ICPC_ZHENTI, check: "套题计时训练，稳定 A 出 2-3 题", pitfalls: "比赛节奏：先易后难，卡题及时换题" },
    ],
  },
  {
    mo: 12, stage: 4, title: "赛前冲刺",
    core: "套题训练·错题复盘·模板库整理",
    daily: "专题 3 题 + 树图 1 题 + 螺旋复习 1 题",
    goal: "稳定发挥，冲击区域银牌",
    weeks: [
      { name: "区域赛套题训练 II", zhenti: true, problems: ICPC_ZHENTI, check: "完整 5 小时计时赛，赛后逐题复盘", pitfalls: "严格计时；没做出来的题当天补题" },
      { name: "冲刺 · 错题复盘", zhenti: true, problems: ICPC_ZHENTI, check: "重做错题本全部错题，错题清零", pitfalls: "错题重做而非看答案；总结错因归类" },
      { name: "冲刺 · 模板库整理", zhenti: true, problems: ICPC_ZHENTI, check: "个人模板库完整，常用算法一次写对", pitfalls: "考前不学新算法，只复习 + 保持手感" },
    ],
  },
];

// ---------- 状态（独立 LocalStorage key，绝不碰原 study-v3-state） ----------
const ICPC_KEY = "icpc-v1-state";

function icpcDefaultState() {
  return { start: null, task: {}, custom: {}, deleted: {}, checkin: {}, contest: [] };
}

let icpcState = icpcLoad();

function icpcLoad() {
  try {
    return Object.assign(icpcDefaultState(), JSON.parse(localStorage.getItem(ICPC_KEY)) || {});
  } catch (e) {
    return icpcDefaultState();
  }
}

function icpcSave() {
  localStorage.setItem(ICPC_KEY, JSON.stringify(icpcState));
}

// ---------- 日期工具 ----------
function icpcPad(n) { return String(n).padStart(2, "0"); }
function icpcKey(d) { return d.getFullYear() + "-" + icpcPad(d.getMonth() + 1) + "-" + icpcPad(d.getDate()); }
function icpcParse(k) { const p = k.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); }
function icpcAddDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function icpcWeek(d) { return "周" + ["日", "一", "二", "三", "四", "五", "六"][d.getDay()]; }
function icpcToday() { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }
function icpcStartDate() {
  if (icpcState.start) return icpcParse(icpcState.start);
  return null;
}

// 某日期属于第几「计划月」（0-based，越界夹到 0..11）
function icpcPlanMonth(date) {
  const s = icpcStartDate();
  if (!s) return 0;
  const m = (date.getFullYear() - s.getFullYear()) * 12 + (date.getMonth() - s.getMonth());
  return Math.min(11, Math.max(0, m));
}

// 螺旋复习间隔（天）：约一个月后自动回滚复习旧专题
const ICPC_REVIEW_GAP = 28;

// 把 12 个月 × 每周专题 展平成一条「按天推进」的时间表
// 每个 segment = 一个专题，占据 days 天（默认 7 天 = 1 周）
function icpcSchedule() {
  const out = [];
  let day = 0;
  ICPC_PLAN.forEach(function (mo) {
    (mo.weeks || []).forEach(function (w) {
      out.push({
        name: w.name, days: w.days || 7, start: day,
        p1: w.p1 || [], p2: w.p2 || [], p3: w.p3 || [],
        zhenti: !!w.zhenti,
      });
      day += (w.days || 7);
    });
  });
  return out;
}

// 找 dayIndex 落在哪个专题段
function icpcSegAt(dayIndex) {
  const sched = icpcSchedule();
  for (let i = 0; i < sched.length; i++) {
    const seg = sched[i];
    if (dayIndex >= seg.start && dayIndex < seg.start + seg.days) return seg;
  }
  return null;
}

// 螺旋复习：回到「约一个月前」的专题，取它当时的题（在专题周内循环）
function icpcReviewProblem(dayIndex) {
  const t = dayIndex - ICPC_REVIEW_GAP;
  if (t < 0) return null;
  const seg = icpcSegAt(t);
  if (!seg || seg.zhenti) return null;
  const all = seg.p1.concat(seg.p2).concat(seg.p3);
  if (!all.length) return null;
  const off = t - seg.start;
  return { name: all[off % all.length], topic: seg.name };
}

// 某一天的任务清单：本周专题 3 题（入门/中档/综合）+ 树图 1 题 + 螺旋复习 1 题
function icpcDayTasks(dateKey) {
  const date = icpcParse(dateKey);
  const s = icpcStartDate();
  if (!s) return [];
  const dayIndex = Math.round((date - s) / 86400000);
  if (dayIndex < 0) return [];
  const list = [];
  const types = ["入门巩固", "中档", "综合"];
  const seg = icpcSegAt(dayIndex);
  if (seg) {
    const off = dayIndex - seg.start;
    if (seg.zhenti) {
      // 真题阶段：三档都从区域赛真题池轮换
      for (let j = 0; j < 3; j++) {
        const id = dateKey + "|A" + j;
        if (icpcState.deleted[id]) continue;
        list.push({ id: id, kind: "auto", type: "真题", name: ICPC_ZHENTI[(off + j) % ICPC_ZHENTI.length] });
      }
    } else {
      const tiers = [seg.p1, seg.p2, seg.p3];
      tiers.forEach(function (pool, j) {
        const id = dateKey + "|A" + j;
        if (icpcState.deleted[id]) return;
        const name = pool.length ? pool[off % pool.length] : ICPC_ZHENTI[(dayIndex + j) % ICPC_ZHENTI.length];
        list.push({ id: id, kind: "auto", type: types[j], name: name });
      });
    }
  } else {
    // 超过 52 周计划天数：真题轮换兜底
    for (let j = 0; j < 3; j++) {
      const id = dateKey + "|A" + j;
      if (icpcState.deleted[id]) continue;
      list.push({ id: id, kind: "auto", type: "真题", name: ICPC_ZHENTI[(dayIndex + j) % ICPC_ZHENTI.length] });
    }
  }
  // 第 4 题：树图专项（全年每天一道，从易到难螺旋，刷完循环复习）
  const tgId = dateKey + "|A3";
  if (!icpcState.deleted[tgId]) {
    list.push({ id: tgId, kind: "auto", type: "树图", name: TREE_GRAPH_POOL[dayIndex % TREE_GRAPH_POOL.length] });
  }
  // 第 5 题：螺旋复习（约一个月前的专题，自动回顾）
  const revId = dateKey + "|A4";
  if (!icpcState.deleted[revId]) {
    const rev = icpcReviewProblem(dayIndex);
    if (rev) list.push({ id: revId, kind: "auto", type: "复习", name: rev.name + "（" + rev.topic + "）" });
  }
  (icpcState.custom[dateKey] || []).forEach(function (c) {
    list.push({ id: c.id, kind: "custom", type: "自定义", name: c.name });
  });
  return list;
}

// ---------- 统计 ----------
// 全年 365 天（从开始日期起）
function icpcAllDays() {
  const s = icpcStartDate();
  const days = [];
  if (!s) return days;
  for (let i = 0; i < 365; i++) days.push(icpcAddDays(s, i));
  return days;
}

// 计划月 M（0-based）范围内、截至今天的所有日期 key
function icpcPlanMonthDays(M) {
  const s = icpcStartDate();
  if (!s) return [];
  const sy = s.getFullYear(), sm = s.getMonth();
  const y = sy + Math.floor((sm + M) / 12);
  const mo = (sm + M) % 12;
  const first = (M === 0) ? new Date(s) : new Date(y, mo, 1);
  const monthEnd = new Date(y, mo + 1, 0);
  const today = icpcToday();
  const last = monthEnd > today ? today : monthEnd;
  if (first > last) return [];
  const days = [];
  let cur = new Date(first);
  while (cur <= last) { days.push(icpcKey(cur)); cur = icpcAddDays(cur, 1); }
  return days;
}

function icpcStats() {
  const M = icpcPlanMonth(icpcToday());
  const days = icpcPlanMonthDays(M);
  let total = 0, done = 0;
  days.forEach(function (dk) {
    icpcDayTasks(dk).forEach(function (t) {
      total++;
      const st = icpcState.task[t.id];
      if (st && st.done) done++;
    });
  });
  // 累计刷题数（全时段）
  let allDone = 0;
  icpcAllDays().forEach(function (d) {
    icpcDayTasks(icpcKey(d)).forEach(function (t) {
      const st = icpcState.task[t.id];
      if (st && st.done) allDone++;
    });
  });
  return { month: ICPC_PLAN[M], M: M, total: total, done: done, allDone: allDone };
}

function icpcLongestStreak() {
  const keys = Object.keys(icpcState.checkin).filter(function (k) { return icpcState.checkin[k]; }).sort();
  if (!keys.length) return 0;
  let max = 1, cur = 1;
  for (let i = 1; i < keys.length; i++) {
    const diff = Math.round((icpcParse(keys[i]) - icpcParse(keys[i - 1])) / 86400000);
    if (diff === 1) { cur++; max = Math.max(max, cur); } else cur = 1;
  }
  return max;
}

// 本周刷题总时长（分钟）
function icpcWeekMinutes() {
  const today = icpcToday();
  const dow = today.getDay();
  const weekStart = icpcAddDays(today, -dow); // 周日为一周起点
  let sum = 0;
  for (let i = 0; i <= dow; i++) {
    const dk = icpcKey(icpcAddDays(weekStart, i));
    icpcDayTasks(dk).forEach(function (t) {
      const st = icpcState.task[t.id];
      if (st && st.time) sum += Number(st.time) || 0;
    });
  }
  return sum;
}

// ---------- 标签配色 ----------
function icpcTagClass(type) {
  if (/树图/.test(type)) return "icpc-tag-tg";
  if (/复习/.test(type)) return "icpc-tag-rev";
  if (/坑|模板|入门|薄弱/.test(type)) return "icpc-tag-a";
  if (/变形|中档/.test(type)) return "icpc-tag-b";
  if (/真题|区域|套题|专题/.test(type)) return "icpc-tag-c";
  return "icpc-tag-d";
}

// ---------- 渲染入口 ----------
function renderIcpc() {
  const wrap = document.getElementById("icpc-wrap");
  if (!wrap) return;
  wrap.innerHTML = "";

  const card = document.createElement("details");
  card.className = "card icpc-card";
  card.open = true;

  const sum = document.createElement("summary");
  sum.className = "roadmap-summary";
  sum.textContent = "🏆 ICPC 区域银牌备战（每日 5 题 · 每周 1 专题 · 螺旋复习 · 点击展开/收起）";
  card.appendChild(sum);

  card.appendChild(icpcBuildSetup());

  if (!icpcStartDate()) {
    wrap.appendChild(card);
    return;
  }

  card.appendChild(icpcBuildProgress());
  card.appendChild(icpcBuildCalendar());
  card.appendChild(icpcBuildTimeline());
  card.appendChild(icpcBuildWrong());
  card.appendChild(icpcBuildContest());
  card.appendChild(icpcBuildRoadmap());

  wrap.appendChild(card);
}

// 设置开始日期 + 训练规则
function icpcBuildSetup() {
  const box = document.createElement("div");
  box.className = "icpc-setup";

  const label = document.createElement("p");
  label.className = "subtitle";
  label.textContent = "选择计划开始日期，自动从该日期生成一整年每日任务（每天 5 题：3 题本周专题 + 1 题树图专项 + 1 题螺旋复习）。";
  box.appendChild(label);

  const row = document.createElement("div");
  row.className = "icpc-start-row";
  const input = document.createElement("input");
  input.type = "date";
  input.className = "icpc-start-input";
  input.id = "icpc-start";
  if (icpcState.start) input.value = icpcState.start;
  input.addEventListener("change", function () {
    if (!input.value) return;
    icpcState.start = input.value;
    icpcSave();
    renderIcpc();
  });
  const nowBtn = document.createElement("button");
  nowBtn.className = "icpc-add-btn";
  nowBtn.textContent = "从今天开始";
  nowBtn.addEventListener("click", function () {
    icpcState.start = icpcKey(icpcToday());
    icpcSave();
    renderIcpc();
  });
  row.append(input, nowBtn);
  box.appendChild(row);

  if (icpcState.start) {
    const info = document.createElement("p");
    info.className = "subtitle";
    info.textContent = "计划已开始：" + icpcState.start + " · 共 365 天。修改日期会重新生成整年任务（已完成/错题记录保留，按日期对齐）。";
    box.appendChild(info);
  }

  const rules = document.createElement("div");
  rules.className = "icpc-rules";
  rules.innerHTML =
    "<b>📋 训练规则</b>" +
    "<ul>" +
    "<li>每日固定任务：5 题（入门 / 中档 / 综合 / 树图专项 / 螺旋复习），可手动增加题目。</li>" +
    "<li>做题建议：独立思考，卡题 90 分钟再看题解；做完勾选，错题标记加入错题本。</li>" +
    "<li>每周自动生成复盘任务：重做本周错题。</li>" +
    "<li>每月末自动生成月度复盘任务，回顾本月全部错题。</li>" +
    "</ul>";
  box.appendChild(rules);

  return box;
}

// 月度进度
function icpcBuildProgress() {
  const s = icpcStats();
  const wrap = document.createElement("div");
  wrap.className = "icpc-progress";

  const pct = s.total ? Math.round((s.done / s.total) * 100) : 0;

  const head = document.createElement("h3");
  head.className = "sub-title";
  head.style.marginTop = "0";
  head.textContent = "📈 本月进度 · 第 " + (s.M + 1) + " 月「" + s.month.title + "」";
  wrap.appendChild(head);

  const num = document.createElement("div");
  num.className = "overview-number";
  num.textContent = pct + "%";
  wrap.appendChild(num);

  const lbl = document.createElement("div");
  lbl.className = "overview-label";
  lbl.textContent = "本月进度（已过天数 × 5 题计）";
  wrap.appendChild(lbl);

  const bar = document.createElement("div");
  bar.className = "progress-bar";
  const fill = document.createElement("div");
  fill.className = "progress-fill";
  fill.style.width = pct + "%";
  bar.appendChild(fill);
  wrap.appendChild(bar);

  const stats = document.createElement("div");
  stats.className = "overview-stats";
  stats.innerHTML =
    '<div class="stat"><span class="stat-value">' + s.done + "/" + s.total + '</span><span class="stat-name">完成任务</span></div>' +
    '<div class="stat"><span class="stat-value">' + s.allDone + '</span><span class="stat-name">累计刷题</span></div>' +
    '<div class="stat"><span class="stat-value">' + Math.round(icpcWeekMinutes() / 60 * 10) / 10 + '</span><span class="stat-name">本周时长(h)</span></div>';
  wrap.appendChild(stats);

  // 本月专题（3 档题 + 验收标准 + 易错点）
  const tl = document.createElement("div");
  tl.className = "icpc-topic-list";
  const tlLabel = document.createElement("div");
  tlLabel.className = "note-label";
  tlLabel.textContent = "🧩 本月每周专题（每周 1 个 · 入门巩固 / 中档 / 综合 三档 · 含验收标准与易错点）";
  tl.appendChild(tlLabel);
  (s.month.weeks || []).forEach(function (t) {
    const box = document.createElement("div");
    box.className = "icpc-topic";
    let html = '<div class="icpc-topic-name"><b>' + t.name + '</b></div>';
    if (t.p1 && t.p1.length) html += '<div class="icpc-topic-row">🟢 入门巩固：' + t.p1.join(" · ") + '</div>';
    if (t.p2 && t.p2.length) html += '<div class="icpc-topic-row">🟡 中档：' + t.p2.join(" · ") + '</div>';
    if (t.p3 && t.p3.length) html += '<div class="icpc-topic-row">🔴 综合：' + t.p3.join(" · ") + '</div>';
    if (t.problems) html += '<div class="icpc-topic-row">🎯 题目池：' + t.problems.join(" · ") + '</div>';
    if (t.check) html += '<div class="icpc-topic-check">✅ 验收：' + t.check + '</div>';
    if (t.pitfalls) html += '<div class="icpc-topic-pit">⚠️ 易错：' + t.pitfalls + '</div>';
    box.innerHTML = html;
    tl.appendChild(box);
  });
  wrap.appendChild(tl);

  return wrap;
}

// 打卡日历
function icpcBuildCalendar() {
  const wrap = document.createElement("div");
  wrap.className = "icpc-calendar";

  const head = document.createElement("h3");
  head.className = "sub-title";
  head.textContent = "🔥 每日打卡（点击日历标记当天已完成训练）";
  wrap.appendChild(head);

  const stats = document.createElement("div");
  stats.className = "cal-stats";
  const totalChecked = Object.keys(icpcState.checkin).filter(function (k) { return icpcState.checkin[k]; }).length;
  stats.innerHTML =
    "<span>已打卡 <b>" + totalChecked + "</b> 天</span>" +
    "<span>最长连续 <b>" + icpcLongestStreak() + "</b> 天</span>";
  wrap.appendChild(stats);

  const weekdays = document.createElement("div");
  weekdays.className = "cal-weekdays";
  weekdays.innerHTML = "<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>";
  wrap.appendChild(weekdays);

  const today = icpcToday();
  const y = today.getFullYear(), m = today.getMonth();
  const first = new Date(y, m, 1);
  const dim = new Date(y, m + 1, 0).getDate();

  const grid = document.createElement("div");
  grid.className = "cal-grid";
  for (let i = 0; i < first.getDay(); i++) {
    const b = document.createElement("div");
    b.className = "cal-day blank";
    grid.appendChild(b);
  }
  for (let d = 1; d <= dim; d++) {
    const dk = icpcKey(new Date(y, m, d));
    const cell = document.createElement("div");
    cell.className = "cal-day";
    if (icpcState.checkin[dk]) cell.classList.add("checked");
    if (d === today.getDate()) cell.classList.add("today");
    cell.textContent = d;
    cell.addEventListener("click", function () {
      icpcState.checkin[dk] = !icpcState.checkin[dk];
      icpcSave();
      renderIcpc();
    });
    grid.appendChild(cell);
  }
  wrap.appendChild(grid);

  return wrap;
}

// 每日任务时间线（按月折叠）
function icpcBuildTimeline() {
  const wrap = document.createElement("div");
  wrap.className = "icpc-timeline";

  const head = document.createElement("h3");
  head.className = "sub-title";
  head.textContent = "📅 每日任务时间线（一整年 · 点日期展开 / 收起）";
  wrap.appendChild(head);

  const hint = document.createElement("p");
  hint.className = "dailyplan-hint";
  hint.textContent = "蓝框 = 今天；每道题勾选打卡，⛔ 标记错题进错题本，⏱ 记录耗时（分钟），✕ 删除该题；下方输入框可手动加题。";
  wrap.appendChild(hint);

  const todayKey = icpcKey(icpcToday());
  const days = icpcAllDays();

  // 按计划月分组
  const groups = [];
  let cur = -1;
  days.forEach(function (d) {
    const mi = icpcPlanMonth(d);
    if (mi !== cur) { cur = mi; groups.push({ mi: mi, days: [] }); }
    groups[groups.length - 1].days.push(d);
  });

  groups.forEach(function (g) {
    const month = ICPC_PLAN[g.mi];
    const isCurrent = g.mi === icpcPlanMonth(icpcToday());

    const mHead = document.createElement("div");
    mHead.className = "icpc-month-head" + (isCurrent ? " open" : "");
    mHead.innerHTML =
      "<span>第 " + (g.mi + 1) + " 月 · " + month.title + "</span>" +
      "<span class=\"icpc-month-core\">" + month.core + "</span>" +
      "<span class=\"icpc-month-arrow\">" + (isCurrent ? "▾" : "▸") + "</span>";
    mHead.addEventListener("click", function () {
      const body = mHead.nextSibling;
      const open = body.style.display !== "none";
      body.style.display = open ? "none" : "";
      mHead.classList.toggle("open", !open);
      mHead.querySelector(".icpc-month-arrow").textContent = open ? "▸" : "▾";
    });
    wrap.appendChild(mHead);

    const mBody = document.createElement("div");
    mBody.className = "icpc-month-body";
    mBody.style.display = isCurrent ? "" : "none";

    g.days.forEach(function (d) {
      mBody.appendChild(icpcBuildDay(d, todayKey));
    });

    wrap.appendChild(mBody);
  });

  return wrap;
}

// 单日卡片
function icpcBuildDay(d, todayKey) {
  const dk = icpcKey(d);
  const isToday = dk === todayKey;

  const row = document.createElement("div");
  row.className = "icpc-day" + (isToday ? " icpc-today icpc-open" : "");

  const headEl = document.createElement("div");
  headEl.className = "icpc-day-head";
  const dateEl = document.createElement("span");
  dateEl.className = "icpc-date";
  dateEl.textContent = (d.getMonth() + 1) + "." + d.getDate() + " · " + icpcWeek(d);
  headEl.appendChild(dateEl);
  if (isToday) {
    const badge = document.createElement("span");
    badge.className = "icpc-badge";
    badge.textContent = "今天";
    headEl.appendChild(badge);
  }
  // 当日完成计数
  const tasks = icpcDayTasks(dk);
  const doneCount = tasks.filter(function (t) { const st = icpcState.task[t.id]; return st && st.done; }).length;
  const cnt = document.createElement("span");
  cnt.className = "icpc-day-count";
  cnt.textContent = doneCount + "/" + tasks.length;
  headEl.appendChild(cnt);

  const arrow = document.createElement("span");
  arrow.className = "icpc-arrow";
  arrow.textContent = isToday ? "▾" : "▸";
  headEl.appendChild(arrow);

  const body = document.createElement("div");
  body.className = "icpc-day-body";
  body.style.display = isToday ? "" : "none";

  tasks.forEach(function (t) {
    body.appendChild(icpcBuildTask(dk, t));
  });

  // 添加自定义题目
  const addRow = document.createElement("div");
  addRow.className = "icpc-add-row";
  const addInput = document.createElement("input");
  addInput.className = "icpc-add-input";
  addInput.placeholder = "手动添加题目（如：洛谷 P1001）";
  addInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addBtn.click();
  });
  const addBtn = document.createElement("button");
  addBtn.className = "icpc-add-btn";
  addBtn.textContent = "＋ 添加";
  addBtn.addEventListener("click", function () {
    const name = addInput.value.trim();
    if (!name) return;
    if (!icpcState.custom[dk]) icpcState.custom[dk] = [];
    const id = dk + "|C" + Date.now();
    icpcState.custom[dk].push({ id: id, name: name });
    icpcSave();
    renderIcpc();
  });
  addRow.append(addInput, addBtn);
  body.appendChild(addRow);

  headEl.addEventListener("click", function (e) {
    if (e.target.closest(".icpc-day-head") !== headEl) return;
    const open = body.style.display !== "none";
    body.style.display = open ? "none" : "";
    arrow.textContent = open ? "▸" : "▾";
    row.classList.toggle("icpc-open", !open);
  });

  row.appendChild(headEl);
  row.appendChild(body);
  return row;
}

// 单题行
function icpcBuildTask(dk, t) {
  const st = icpcState.task[t.id] || {};
  const line = document.createElement("div");
  line.className = "icpc-task" + (st.done ? " done" : "");

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = !!st.done;
  cb.addEventListener("change", function () {
    if (!icpcState.task[t.id]) icpcState.task[t.id] = { name: t.name, type: t.type };
    icpcState.task[t.id].done = cb.checked;
    icpcSave();
    line.classList.toggle("done", cb.checked);
  });

  const tag = document.createElement("span");
  tag.className = "icpc-tag " + icpcTagClass(t.type);
  tag.textContent = t.type;

  const name = document.createElement("span");
  name.className = "icpc-name";
  name.textContent = t.name;

  // 耗时
  const time = document.createElement("input");
  time.type = "number";
  time.min = "0";
  time.className = "icpc-time";
  time.placeholder = "分钟";
  time.value = st.time || "";
  time.addEventListener("change", function () {
    if (!icpcState.task[t.id]) icpcState.task[t.id] = { name: t.name, type: t.type };
    icpcState.task[t.id].time = Number(time.value) || 0;
    icpcSave();
  });

  // 错题标记
  const wrong = document.createElement("button");
  wrong.className = "icpc-wrong-btn" + (st.wrong ? " on" : "");
  wrong.title = "标记为错题";
  wrong.textContent = st.wrong ? "⛔" : "⚑";
  wrong.addEventListener("click", function () {
    if (!icpcState.task[t.id]) icpcState.task[t.id] = { name: t.name, type: t.type };
    icpcState.task[t.id].wrong = !icpcState.task[t.id].wrong;
    icpcSave();
    renderIcpc();
  });

  // 删除
  const del = document.createElement("button");
  del.className = "icpc-del-btn";
  del.title = "删除该题";
  del.textContent = "✕";
  del.addEventListener("click", function () {
    if (t.kind === "custom") {
      icpcState.custom[dk] = (icpcState.custom[dk] || []).filter(function (c) { return c.id !== t.id; });
    } else {
      icpcState.deleted[t.id] = true;
    }
    delete icpcState.task[t.id];
    icpcSave();
    renderIcpc();
  });

  line.append(cb, tag, name, time, wrong, del);
  return line;
}

// 错题本
function icpcBuildWrong() {
  const wrap = document.createElement("div");
  wrap.className = "icpc-wrong";

  const head = document.createElement("h3");
  head.className = "sub-title";
  head.textContent = "📕 错题本（标记 ⛔ 的题目自动汇总到这里）";
  wrap.appendChild(head);

  const entries = [];
  Object.keys(icpcState.task).forEach(function (id) {
    const st = icpcState.task[id];
    if (!st || !st.wrong) return;
    const parts = id.split("|");
    entries.push({ date: parts[0], name: st.name || "", type: st.type || "", id: id, note: st.note || "" });
  });
  entries.sort(function (a, b) { return a.date < b.date ? 1 : -1; });

  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "dailyplan-hint";
    empty.textContent = "暂无错题。做题时点 ⚑ / ⛔ 即可把题目加入错题本。";
    wrap.appendChild(empty);
    return wrap;
  }

  const list = document.createElement("div");
  list.className = "icpc-wrong-list";
  entries.forEach(function (en) {
    const item = document.createElement("div");
    item.className = "icpc-wrong-item";

    const top = document.createElement("div");
    top.className = "icpc-wrong-top";
    const tag = document.createElement("span");
    tag.className = "icpc-tag " + icpcTagClass(en.type);
    tag.textContent = en.type || "错题";
    const nm = document.createElement("span");
    nm.className = "icpc-name";
    nm.textContent = en.name;
    const date = document.createElement("span");
    date.className = "icpc-wrong-meta";
    date.textContent = en.date;
    top.append(tag, nm, date);

    const note = document.createElement("input");
    note.className = "icpc-wrong-note";
    note.placeholder = "备注：错因 / 关键思路（本地保存）";
    note.value = en.note;
    note.addEventListener("change", function () {
      if (icpcState.task[en.id]) icpcState.task[en.id].note = note.value;
      icpcSave();
    });

    const unmark = document.createElement("button");
    unmark.className = "icpc-add-btn icpc-unmark";
    unmark.textContent = "移出错题本";
    unmark.addEventListener("click", function () {
      if (icpcState.task[en.id]) icpcState.task[en.id].wrong = false;
      icpcSave();
      renderIcpc();
    });

    item.append(top, note, unmark);
    list.appendChild(item);
  });
  wrap.appendChild(list);

  return wrap;
}

// 每周模拟赛 + 对拍训练
function icpcBuildContest() {
  const wrap = document.createElement("div");
  wrap.className = "icpc-contest";

  const head = document.createElement("h3");
  head.className = "sub-title";
  head.textContent = "🎯 每周模拟赛 + 对拍训练";
  wrap.appendChild(head);

  // 对拍方法
  const duel = document.createElement("div");
  duel.className = "icpc-duel";
  duel.innerHTML =
    "<b>⚙️ 对拍训练（写完题一定要对拍，银牌必备习惯）</b>" +
    "<ol><li>写暴力程序 brute（保证正确但慢）</li>" +
    "<li>写正解 sol（要验证的程序）</li>" +
    "<li>写数据生成器 gen（随机造小数据）</li>" +
    "<li>循环 gen → brute → sol，输出不一致就 debug</li></ol>" +
    "<span>时机：模板题 / 有把握但可能出 bug 的题 / 交题前。工具：Windows 用 .bat 循环、Linux 用 bash，或直接用洛谷 / CF 评测。</span>";
  wrap.appendChild(duel);

  // 本周模拟赛提醒
  const s = icpcStartDate();
  if (s) {
    const sun = icpcAddDays(icpcToday(), (7 - icpcToday().getDay()) % 7);
    const week = document.createElement("div");
    week.className = "icpc-contest-week";
    week.innerHTML = "<b>📅 本周模拟赛</b>：周日 " + (sun.getMonth() + 1) + " 月 " + sun.getDate() +
      " 日，做一场 5 小时计时赛（Codeforces div2 / AtCoder ABC / 洛谷套题），严格计时，赛后复盘每道没做出来的题。";
    wrap.appendChild(week);
  }

  // 模拟赛记录
  const recHead = document.createElement("div");
  recHead.className = "note-label";
  recHead.textContent = "📊 模拟赛记录（每场赛完记一笔，见证进步）";
  wrap.appendChild(recHead);

  const list = document.createElement("div");
  list.className = "icpc-contest-list";
  const arr = icpcState.contest || [];
  if (!arr.length) {
    list.innerHTML = '<p class="dailyplan-hint">还没有模拟赛记录，打完第一场就来记一笔吧。</p>';
  } else {
    arr.slice().reverse().forEach(function (c) {
      const item = document.createElement("div");
      item.className = "icpc-contest-item";
      item.innerHTML =
        '<span class="icpc-contest-meta">' + (c.date || "") + '</span>' +
        '<b>' + (c.name || "模拟赛") + '</b>' +
        '<span>过 ' + (c.solved || "0") + ' 题</span>' +
        (c.note ? '<span class="icpc-contest-note">📝 ' + c.note + '</span>' : '') +
        '<button class="icpc-del-btn" data-cid="' + c.id + '" title="删除">✕</button>';
      list.appendChild(item);
    });
    list.querySelectorAll(".icpc-del-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        icpcState.contest = icpcState.contest.filter(function (x) { return x.id !== Number(b.dataset.cid); });
        icpcSave();
        renderIcpc();
      });
    });
  }
  wrap.appendChild(list);

  // 添加记录
  const add = document.createElement("div");
  add.className = "icpc-add-row";
  const nameInput = document.createElement("input");
  nameInput.className = "icpc-add-input";
  nameInput.placeholder = "比赛名（如 CF Round 900）";
  const solvedInput = document.createElement("input");
  solvedInput.className = "icpc-add-input";
  solvedInput.style.width = "70px";
  solvedInput.placeholder = "过题数";
  const noteInput = document.createElement("input");
  noteInput.className = "icpc-add-input";
  noteInput.placeholder = "复盘（可选）";
  const addBtn = document.createElement("button");
  addBtn.className = "icpc-add-btn";
  addBtn.textContent = "记录";
  addBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const solved = solvedInput.value.trim();
    if (!name && !solved) return;
    icpcState.contest.push({ id: Date.now(), date: icpcKey(icpcToday()), name: name, solved: solved, note: noteInput.value.trim() });
    icpcSave();
    renderIcpc();
  });
  add.append(nameInput, solvedInput, noteInput, addBtn);
  wrap.appendChild(add);

  return wrap;
}

// 全年路线图表格
function icpcBuildRoadmap() {
  const wrap = document.createElement("details");
  wrap.className = "card roadmap";
  wrap.style.padding = "0";
  wrap.style.boxShadow = "none";
  wrap.style.border = "none";
  wrap.style.margin = "0";

  const sum = document.createElement("summary");
  sum.className = "roadmap-summary";
  sum.textContent = "🗺️ ICPC 全年路线图（12 个月 · 点击展开/收起）";
  wrap.appendChild(sum);

  const tableWrap = document.createElement("div");
  tableWrap.className = "table-wrap";
  const table = document.createElement("table");
  table.className = "roadmap-table";
  table.innerHTML = "<thead><tr><th>月份</th><th>阶段</th><th>每周专题（1 周 1 个）</th><th>每日任务</th><th>月度目标</th></tr></thead>";
  const tbody = document.createElement("tbody");
  ICPC_PLAN.forEach(function (m) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>第 " + m.mo + " 月</td>" +
      "<td><b>阶段" + m.stage + " · " + m.title + "</b></td>" +
      "<td>" + (m.weeks || []).map(function (w) { return w.name; }).join(" · ") + "</td>" +
      "<td>" + m.daily + "</td>" +
      "<td>" + m.goal + "</td>";
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableWrap.appendChild(table);
  wrap.appendChild(tableWrap);

  return wrap;
}

// ---------- 启动 ----------
if (document.getElementById("icpc-wrap")) {
  renderIcpc();
}
