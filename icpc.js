// ============================================================
// ICPC 区域银牌备战模块（独立 · 不影响原有模块）
// 数据 + 状态 + 渲染 全部自包含；LocalStorage 用独立 key「icpc-v1-state」
// 由 index.html 末尾 <script src="icpc.js"> 加载，挂到 #icpc-wrap
// ============================================================

// ---------- 全年 12 个月规划数据 ----------
// 每月：mo / title / core / daily / goal / types[]（每日三题的标签）/ topics[]
// months 1-9 的每日三题按「列」从 topics 派生（每 topic 3 题：坑/模板、变形/中档、真题）
// months 10-12 直接给出 pools（混合真题 / 套题 / 错题复盘）
const ICPC_ZHENTI = [
  "2021CCPC 哈尔滨 B", "2022ICPC 杭州 A", "2023CCPC 威海 E",
  "2022ICPC 南京 D", "2021ICPC 上海 G", "2020CCPC 长春 D",
  "2023ICPC 济南 D", "2022CCPC 绵阳 B", "2021ICPC 沈阳 F",
  "2023CCPC 广州 C", "2022ICPC 沈阳 D", "2023ICPC 武汉 F",
  "2021CCPC 珠海 G", "2022CCPC 哈尔滨 I",
];

// ============================================================
// 螺旋式刷题训练清单（3 阶段 · 优先练熟旧算法，再学新算法）
// 每个专题分 3 档：p1 入门巩固 / p2 中档 / p3 综合
// check = 验收标准，pitfalls = 易错点/训练提醒；后期月份穿插复习旧专题
// ============================================================
const ICPC_PLAN = [
  // ================= 阶段 1：巩固旧知识点（月 1-5） =================
  {
    mo: 1, stage: 1, title: "算数基础 + 线性基",
    core: "gcd / exgcd / 素数筛 / 逆元 / 快速幂 + 线性基模板",
    daily: "入门巩固 + 中档 + 综合 各 1 题",
    goal: "数论基础模板一次写对，代码无 bug",
    types: ["入门巩固", "中档", "综合"],
    topics: [
      { name: "算数 / 数论基础", p1: ["洛谷 P3383 线性筛素数（入门）", "洛谷 P1226 快速幂（入门）"], p2: ["洛谷 P1082 同余方程（普及）", "洛谷 P3811 乘法逆元（普及）"], p3: ["洛谷 P1495 中国剩余定理（提高）", "洛谷 P2158 仪仗队（提高）"],
        check: "10 分钟内默写 gcd/exgcd/逆元/筛法模板，一次编译通过", pitfalls: "exgcd 回代 x/y 符号易错；费马小定理仅模质数；快速幂注意取模边界" },
      { name: "线性基", p1: ["洛谷 P3812 线性基（普及）"], p2: ["洛谷 P4570 [BJWC2011] 元素（提高）"], p3: ["HDU 3949 XOR（省选）"],
        check: "能手写线性基插入 / 异或最大值，理解线性无关", pitfalls: "插入从高位到低位贪心；第 k 小需先重构基" },
    ],
  },
  {
    mo: 2, stage: 1, title: "贪心 + 二分",
    core: "经典贪心模型 + 二分查找 / 二分答案",
    daily: "入门巩固 + 中档 + 综合 各 1 题",
    goal: "贪心策略一眼判断，二分边界一次写对",
    types: ["入门巩固", "中档", "综合"],
    topics: [
      { name: "贪心", p1: ["洛谷 P1223 排队接水（入门）", "洛谷 P1803 凌乱的yyy（入门）"], p2: ["洛谷 P1090 合并果子（普及）", "洛谷 P2240 部分背包（普及）"], p3: ["洛谷 P1080 国王游戏（提高）"],
        check: "能说明贪心为何最优，区间调度/哈夫曼/交换论证熟练", pitfalls: "贪心要先证明再写码；排序比较器写反；忘开 long long" },
      { name: "二分", p1: ["洛谷 P2249 查找（入门）", "洛谷 P1873 砍树（入门）"], p2: ["洛谷 P2678 跳石头（普及）", "洛谷 P2440 木材加工（普及）"], p3: ["洛谷 P1314 聪明的质检员（提高）"],
        check: "二分左右边界、check 函数一次写对", pitfalls: "二分边界 left/right 取错导致死循环；答案上界下界判断" },
    ],
  },
  {
    mo: 3, stage: 1, title: "前缀和 + 差分",
    core: "一维/二维前缀和 + 一维/二维差分",
    daily: "入门巩固 + 中档 + 综合 各 1 题",
    goal: "前缀和/差分一眼看出，公式不背错",
    types: ["入门巩固", "中档", "综合"],
    topics: [
      { name: "前缀和", p1: ["洛谷 P1115 最大子段和（入门）", "洛谷 P1719 最大加权矩形（普及）"], p2: ["洛谷 P2280 激光炸弹（普及）", "洛谷 P2004 领地选择（普及）"], p3: ["洛谷 P1387 最大正方形（普及）"],
        check: "一维/二维前缀和公式默写无误", pitfalls: "二维前缀和容斥加减符号易错；下标从 1 开始避免越界" },
      { name: "差分", p1: ["洛谷 P2367 语文成绩（入门）", "洛谷 P3397 地毯（普及）"], p2: ["洛谷 P1083 借教室（提高）"], p3: ["洛谷 P4552 差分应用（提高）"],
        check: "差分区间加减、二维差分一次写对", pitfalls: "差分数组要原数组长度+1；配合二分时 check 复杂" },
    ],
  },
  {
    mo: 4, stage: 1, title: "简单 DP + BFS/DFS",
    core: "线性 DP / 背包 / LIS + BFS 最短路 / DFS 回溯剪枝",
    daily: "入门巩固 + 中档 + 综合 各 1 题",
    goal: "DP 状态设计清晰，搜索模板无 bug",
    types: ["入门巩固", "中档", "综合"],
    topics: [
      { name: "简单 DP", p1: ["洛谷 P1216 数字三角形（入门）", "洛谷 P1048 采药（普及）"], p2: ["洛谷 P1616 完全背包（普及）", "洛谷 P1020 导弹拦截（普及）"], p3: ["洛谷 P1439 最长公共子序列（提高）"],
        check: "01/完全背包、LIS/LCS 一次写对", pitfalls: "背包体积/价值维度搞反；LIS 需 nlogn 用 lower_bound" },
      { name: "BFS / DFS", p1: ["洛谷 P1443 马的遍历（普及）", "洛谷 P1605 迷宫（入门）"], p2: ["洛谷 P1135 奇怪的电梯（普及）", "洛谷 P1332 血色先锋队（普及）"], p3: ["洛谷 P1126 机器人搬重物（提高）"],
        check: "BFS 层序、DFS 回溯剪枝模板无 bug", pitfalls: "BFS 忘标记 visited 导致死循环；DFS 回溯状态没恢复" },
    ],
  },
  {
    mo: 5, stage: 1, title: "最短路 + 单调队列/栈",
    core: "Dijkstra / SPFA / Floyd + 单调队列 / 单调栈（阶段2 前哨）",
    daily: "入门巩固 + 中档 + 综合 各 1 题",
    goal: "最短路三种算法熟练，单调栈单调队列入门",
    types: ["入门巩固", "中档", "综合"],
    topics: [
      { name: "最短路", p1: ["洛谷 P3371 单源最短路（普及）", "洛谷 P4779 Dijkstra堆优化（普及）"], p2: ["洛谷 P1629 邮递员送信（普及）", "洛谷 P3385 负环（提高）"], p3: ["洛谷 P1144 最短路计数（普及）"],
        check: "Dijkstra 堆优化 / SPFA 判负环 一次写对", pitfalls: "Dijkstra 不能处理负权；SPFA 判负环入队次数；初始化 dis=INF" },
      { name: "单调队列 / 单调栈", p1: ["洛谷 P1886 滑动窗口（普及）", "洛谷 P5788 单调栈（普及）"], p2: ["洛谷 P1440 求m区间最小值（普及）"], p3: ["洛谷 P2866 Bad Hair Day（普及）"],
        check: "能讲清单调队列/栈维护什么单调性", pitfalls: "队列存下标而非值；弹栈条件写错；哨兵处理" },
    ],
  },

  // ================= 阶段 2：进阶银牌算法（月 6-9） =================
  {
    mo: 6, stage: 2, title: "线段树 + 树状数组",
    core: "线段树（区间修改/懒标记）+ 树状数组（单点/区间）",
    daily: "入门巩固 + 中档 + 综合 各 1 题",
    goal: "线段树/树状数组模板一次写对，懒标记不丢",
    types: ["入门巩固", "中档", "综合"],
    topics: [
      { name: "线段树", p1: ["洛谷 P3372 线段树1（普及）", "洛谷 P3373 线段树2（提高）"], p2: ["洛谷 P4588 数学计算（提高）"], p3: ["洛谷 P5490 扫描线（提高）"],
        check: "线段树区间加乘、懒标记 pushdown 一次写对", pitfalls: "pushdown 忘清标记；区间合并顺序；开 4 倍空间" },
      { name: "树状数组", p1: ["洛谷 P3374 树状数组1（入门）", "洛谷 P3368 树状数组2（普及）"], p2: ["洛谷 P1908 逆序对（普及）"], p3: ["洛谷 P3431 二维偏序（提高）"],
        check: "lowbit、单点/区间更新查询模板无 bug", pitfalls: "lowbit 用 i&(-i)；树状数组下标不能为 0" },
      { name: "复习 · 贪心/二分", p1: ["洛谷 P1223 排队接水"], p2: ["洛谷 P2678 跳石头"], p3: ["洛谷 P1080 国王游戏"], check: "旧专题保持手感", pitfalls: "" },
    ],
  },
  {
    mo: 7, stage: 2, title: "并查集进阶 + DP 优化",
    core: "带权/种类并查集 + 区间 DP / 单调队列优化 DP",
    daily: "入门巩固 + 中档 + 综合 各 1 题",
    goal: "并查集维护关系熟练，DP 优化方向清晰",
    types: ["入门巩固", "中档", "综合"],
    topics: [
      { name: "并查集进阶", p1: ["洛谷 P3367 并查集（入门）"], p2: ["洛谷 P1525 关押罪犯（普及）", "洛谷 P2024 食物链（普及）"], p3: ["洛谷 P1197 星球大战（提高）"],
        check: "带权/种类并查集 find/union 一次写对", pitfalls: "路径压缩与合并顺序；种类并查集开 3 倍空间" },
      { name: "DP 优化", p1: ["洛谷 P1757 分组背包（普及）"], p2: ["洛谷 P1880 石子合并（普及）", "洛谷 P3572 Little Bird（提高）"], p3: ["洛谷 P3195 玩具装箱（提高）"],
        check: "区间 DP 转移、单调队列优化 DP 能独立写", pitfalls: "区间 DP 枚举顺序；优化 DP 去无用状态" },
      { name: "复习 · 前缀和/差分", p1: ["洛谷 P1115 最大子段和"], p2: ["洛谷 P1083 借教室"], p3: ["洛谷 P2280 激光炸弹"], check: "旧专题保持手感", pitfalls: "" },
    ],
  },
  {
    mo: 8, stage: 2, title: "最小生成树进阶 + 网络流入门",
    core: "Kruskal/Prim + 次小生成树 + Dinic 最大流 / 二分图匹配",
    daily: "入门巩固 + 中档 + 综合 各 1 题",
    goal: "MST 变形熟练，网络流基础建图",
    types: ["入门巩固", "中档", "综合"],
    topics: [
      { name: "最小生成树进阶", p1: ["洛谷 P3366 最小生成树（普及）"], p2: ["洛谷 P1547 Out of Hay（普及）", "洛谷 P1991 无线通讯网（普及）"], p3: ["洛谷 P4180 次小生成树（提高）"],
        check: "Kruskal 一次写对，理解次小生成树", pitfalls: "并查集初始化；Kruskal 按边权排序；次小生成树替换边" },
      { name: "网络流入门", p1: ["洛谷 P3376 网络最大流（提高）"], p2: ["洛谷 P3386 二分图最大匹配（普及）"], p3: ["洛谷 P3381 最小费用最大流（提高）"],
        check: "Dinic 模板一次写对，能建基础二分图/最大流模型", pitfalls: "反向边容量；建图方向；Dinic 当前弧优化" },
      { name: "复习 · 最短路", p1: ["洛谷 P4779 Dijkstra"], p2: ["洛谷 P1629 邮递员送信"], p3: ["洛谷 P1144 最短路计数"], check: "旧专题保持手感", pitfalls: "" },
    ],
  },
  {
    mo: 9, stage: 2, title: "字符串基础（KMP）+ 综合复习",
    core: "KMP 前缀函数 + 字符串哈希 + 阶段1/2 螺旋复习",
    daily: "入门巩固 + 中档 + 综合 各 1 题",
    goal: "KMP 一次写对，阶段1/2 知识点不遗忘",
    types: ["入门巩固", "中档", "综合"],
    topics: [
      { name: "KMP / 字符串哈希", p1: ["洛谷 P3375 KMP（普及）"], p2: ["洛谷 P4391 无线传输（普及）", "洛谷 P4824 KMP删除（提高）"], p3: ["洛谷 P3805 Manacher（提高）"],
        check: "KMP 前缀函数、字符串哈希模板一次写对", pitfalls: "next 数组边界；哈希冲突；取模/双哈希" },
      { name: "复习 · 线段树/树状数组", p1: ["洛谷 P3372 线段树1"], p2: ["洛谷 P1908 逆序对"], p3: ["洛谷 P3373 线段树2"], check: "数据结构模板保持手感", pitfalls: "" },
      { name: "复习 · DP", p1: ["洛谷 P1048 采药"], p2: ["洛谷 P1880 石子合并"], p3: ["洛谷 P1020 导弹拦截"], check: "DP 状态设计不遗忘", pitfalls: "" },
    ],
  },

  // ================= 阶段 3：银牌综合训练（月 10-12） =================
  {
    mo: 10, stage: 3, title: "全专题混合刷题 + 错题复盘",
    core: "不再按专题，混合刷题，训练快速识别算法模型",
    daily: "3 道混合真题（覆盖前面所有专题）",
    goal: "快速读题、判断算法，消除知识遗忘",
    types: ["混合真题", "混合真题", "混合真题"],
    pools: [ICPC_ZHENTI, ICPC_ZHENTI, ICPC_ZHENTI],
    topics: [
      { name: "全专题混合真题（自动轮换）", problems: ICPC_ZHENTI, check: "拿到题 30 秒内判断出算法方向", pitfalls: "多知识点混合题，先想清楚再写码" },
    ],
  },
  {
    mo: 11, stage: 3, title: "区域赛套题训练",
    core: "每周 2 套 ICPC/CCPC 区域赛真题完整计时训练",
    daily: "平日 3 道专题真题，周末完整套题模拟赛",
    goal: "适应 3-5 小时比赛节奏，训练读题、调试、时间分配",
    types: ["专题真题", "专题真题", "专题真题"],
    pools: [ICPC_ZHENTI, ICPC_ZHENTI, ICPC_ZHENTI],
    weekendTask: "周末：完整套题模拟赛（5 小时计时）",
    topics: [
      { name: "区域赛套题（历年真题轮换）", problems: ICPC_ZHENTI, check: "模拟赛稳定 A 出 2-3 题，时间分配合理", pitfalls: "比赛节奏：先易后难，卡题及时换题" },
    ],
  },
  {
    mo: 12, stage: 3, title: "赛前冲刺",
    core: "刷近年同赛区区域真题，重做所有错题，整理个人模板库",
    daily: "薄弱专题真题 + 错题复盘，保持手感",
    goal: "稳定发挥，冲击区域银牌",
    types: ["薄弱真题", "错题复盘", "真题"],
    pools: [ICPC_ZHENTI, ["重做本月 / 本周错题本全部错题"], ICPC_ZHENTI],
    topics: [
      { name: "冲刺：薄弱专题 + 错题复盘", problems: ICPC_ZHENTI, check: "错题本清空，模板库完整，心态稳定", pitfalls: "考前不再学新算法，只做复习 + 保持手感" },
    ],
  },
];

// ---------- 状态（独立 LocalStorage key，绝不碰原 study-v3-state） ----------
const ICPC_KEY = "icpc-v1-state";

function icpcDefaultState() {
  return { start: null, task: {}, custom: {}, deleted: {}, checkin: {} };
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

// 由 topics 派生每日三题的三个「题池」（p1 入门巩固 / p2 中档 / p3 综合）
function icpcPools(month) {
  if (month.pools) return month.pools;
  const pools = [[], [], []];
  month.topics.forEach(function (t) {
    (t.p1 || []).forEach(function (p) { pools[0].push(p); });
    (t.p2 || []).forEach(function (p) { pools[1].push(p); });
    (t.p3 || []).forEach(function (p) { pools[2].push(p); });
  });
  return pools;
}

// 某一天的任务清单（自动 3 题 + 手动添加，剔除已删）
function icpcDayTasks(dateKey) {
  const date = icpcParse(dateKey);
  const mi = icpcPlanMonth(date);
  const month = ICPC_PLAN[mi];
  const pools = icpcPools(month);
  const s = icpcStartDate();
  const dayIndex = s ? Math.round((date - s) / 86400000) : 0;
  const list = [];
  month.types.forEach(function (type, j) {
    const id = dateKey + "|A" + j;
    if (icpcState.deleted[id]) return;
    const pool = pools[j];
    if (!pool || !pool.length) return;   // 该档无题则跳过
    const name = pool[((dayIndex + j) % pool.length + pool.length) % pool.length];
    list.push({ id: id, kind: "auto", type: type, name: name });
  });

  // 指定了 weekendTask 的月份（如第 11 月套题训练），周末把当天任务换成整场模拟赛
  if (month.weekendTask && (date.getDay() === 0 || date.getDay() === 6)) {
    const last = list[list.length - 1];
    if (last && last.kind === "auto") last.name = month.weekendTask;
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
  sum.textContent = "🏆 ICPC 区域银牌备战（每日 ≥3 题 · 点击展开/收起）";
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
  card.appendChild(icpcBuildRoadmap());

  wrap.appendChild(card);
}

// 设置开始日期 + 训练规则
function icpcBuildSetup() {
  const box = document.createElement("div");
  box.className = "icpc-setup";

  const label = document.createElement("p");
  label.className = "subtitle";
  label.textContent = "选择计划开始日期，自动从该日期生成一整年每日任务（每天 3 题）。";
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
    "<li>每日固定任务：最少 3 题，可手动增加题目。</li>" +
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
  lbl.textContent = "本月进度（已过天数 × 3 题计）";
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
  tlLabel.textContent = "🧩 本月专题（入门巩固 / 中档 / 综合 三档 · 含验收标准与易错点）";
  tl.appendChild(tlLabel);
  s.month.topics.forEach(function (t) {
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
  table.innerHTML = "<thead><tr><th>月份</th><th>阶段</th><th>核心内容</th><th>每日任务</th><th>月度目标</th></tr></thead>";
  const tbody = document.createElement("tbody");
  ICPC_PLAN.forEach(function (m) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>第 " + m.mo + " 月</td>" +
      "<td><b>阶段" + m.stage + " · " + m.title + "</b></td>" +
      "<td>" + m.core + "</td>" +
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
