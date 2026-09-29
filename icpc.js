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

const ICPC_PLAN = [
  {
    mo: 1, title: "查漏补缺阶段",
    core: "STL 进阶 / 二分·前缀差分进阶 / 贪心进阶",
    daily: "1 道坑题 + 1 道变形题 + 1 道真题",
    goal: "基础模块坑点全部踩完，养成稳定每日 3 题习惯",
    types: ["坑题", "变形题", "真题"],
    topics: [
      { name: "STL 进阶坑点", problems: ["洛谷 P1908 逆序对", "QOJ10052", "2021CCPC 哈尔滨 B"] },
      { name: "二分 & 前缀差分进阶", problems: ["洛谷 P1873 砍树", "洛谷 P2219 修筑绿地", "2022ICPC 杭州 A"] },
      { name: "贪心进阶", problems: ["洛谷 P1040 加分二叉树", "洛谷 P2672 推销员", "2023CCPC 威海 E"] },
    ],
  },
  {
    mo: 2, title: "DP & 搜索进阶",
    core: "多维 DP / 滚动数组 / 计数 DP / 记忆化搜索 / 双向 BFS / 剪枝",
    daily: "1 道坑题 + 1 道变形题 + 1 道真题",
    goal: "复杂 DP 状态设计、搜索剪枝能力",
    types: ["坑题", "变形题", "真题"],
    topics: [
      { name: "DP 进阶", problems: ["洛谷 P1757 分组背包", "洛谷 P1880 石子合并", "2022ICPC 南京 D"] },
      { name: "搜索进阶", problems: ["洛谷 P1120 小木棍", "洛谷 P1443 马的遍历", "2021ICPC 上海 G"] },
    ],
  },
  {
    mo: 3, title: "进阶图论",
    core: "带权/扩展域并查集 / 01BFS / 最短路计数 / MST 模型拓展",
    daily: "1 道坑题 + 1 道变形题 + 1 道真题",
    goal: "熟练处理图论各类变形模型",
    types: ["坑题", "变形题", "真题"],
    topics: [
      { name: "并查集进阶", problems: ["洛谷 P1525 关押罪犯", "洛谷 P2024 食物链", "2020CCPC 长春 D"] },
      { name: "图论进阶", problems: ["洛谷 P1629 邮递员送信", "洛谷 P4782", "2023ICPC 济南 D"] },
    ],
  },
  {
    mo: 4, title: "进阶数论 + 计算几何查漏",
    core: "欧拉函数 / 同余 / 逆元 / CRT / 莫比乌斯基础；浮点 eps / 向量叉积 / 线段相交",
    daily: "1 道坑题 + 1 道变形题 + 1 道真题",
    goal: "搞定数论模板、几何浮点精度坑",
    types: ["坑题", "变形题", "真题"],
    topics: [
      { name: "数论进阶", problems: ["洛谷 P2613 有理数取余", "洛谷 P2158 仪仗队", "2022CCPC 绵阳 B"] },
      { name: "计算几何进阶", problems: ["洛谷 P1357", "洛谷 P2424", "2021ICPC 沈阳 F"] },
    ],
  },
  {
    mo: 5, title: "银牌新算法 Ⅰ：线段树 & 树状数组",
    core: "树状数组 / 线段树（区间修改、懒标记、离线扫描线）",
    daily: "1 道模板入门题 + 1 道中档变形题 + 1 道区域真题",
    goal: "熟练线段树各类经典模型",
    types: ["模板入门", "中档变形", "区域真题"],
    topics: [
      { name: "线段树 / 树状数组", problems: ["洛谷 P3372 线段树 1", "洛谷 P3373 线段树 2", "2023CCPC 广州 C"] },
    ],
  },
  {
    mo: 6, title: "银牌新算法 Ⅱ：树上算法",
    core: "倍增 LCA / 树上 DP / 树的重心 / 树上路径问题",
    daily: "1 道模板入门题 + 1 道中档变形题 + 1 道区域真题",
    goal: "树上问题解题框架",
    types: ["模板入门", "中档变形", "区域真题"],
    topics: [
      { name: "树上算法", problems: ["洛谷 P3379 LCA", "洛谷 P1352 没有上司的舞会", "2022ICPC 沈阳 D"] },
    ],
  },
  {
    mo: 7, title: "银牌新算法 Ⅲ：字符串算法",
    core: "KMP / 字符串哈希 / Trie 字典树 / 哈希冲突处理",
    daily: "1 道模板入门题 + 1 道中档变形题 + 1 道区域真题",
    goal: "字符串基础套路全部掌握",
    types: ["模板入门", "中档变形", "区域真题"],
    topics: [
      { name: "字符串算法", problems: ["洛谷 P3375 KMP", "洛谷 P1481 魔王语言", "2023ICPC 武汉 F"] },
    ],
  },
  {
    mo: 8, title: "银牌新算法 Ⅳ：单调队列、单调栈",
    core: "滑动窗口 / 区间极值 / 单调栈维护单调性",
    daily: "1 道模板入门题 + 1 道中档变形题 + 1 道区域真题",
    goal: "熟练单调性优化类题目",
    types: ["模板入门", "中档变形", "区域真题"],
    topics: [
      { name: "单调队列 / 单调栈", problems: ["洛谷 P1886 滑动窗口", "洛谷 P2657 栈", "2021CCPC 珠海 G"] },
    ],
  },
  {
    mo: 9, title: "银牌新算法 Ⅴ：网络流 Dinic 基础",
    core: "Dinic 最大流 / 基础建图模型，银牌保底模型",
    daily: "1 道模板入门题 + 1 道中档变形题 + 1 道区域真题",
    goal: "看懂基础网络流建图，能处理简单模型",
    types: ["模板入门", "中档变形", "区域真题"],
    topics: [
      { name: "网络流 Dinic", problems: ["洛谷 P3381 Dinic 模板", "洛谷 P2756 飞行员配对", "2022CCPC 哈尔滨 I"] },
    ],
  },
  {
    mo: 10, title: "全专题混合刷题 + 错题复盘",
    core: "不再按专题，混合随机刷题，大量重做前面所有月份错题，训练快速识别算法模型",
    daily: "3 道混合真题，覆盖前面所有专题",
    goal: "快速读题、判断该用什么算法，消除知识遗忘",
    types: ["混合真题", "混合真题", "混合真题"],
    pools: [ICPC_ZHENTI, ICPC_ZHENTI, ICPC_ZHENTI],
    topics: [
      { name: "全专题混合真题（自动轮换）", problems: ICPC_ZHENTI },
    ],
  },
  {
    mo: 11, title: "区域赛套题训练",
    core: "每周 2 套 ICPC/CCPC 区域赛真题完整计时训练，模拟赛场环境",
    daily: "平日 3 道专题真题，周末完整套题模拟赛",
    goal: "适应 3-5 小时比赛节奏，训练读题、代码调试、时间分配",
    types: ["专题真题", "专题真题", "专题真题"],
    pools: [ICPC_ZHENTI, ICPC_ZHENTI, ICPC_ZHENTI],
    weekendTask: "周末：完整套题模拟赛（5 小时计时）",
    topics: [
      { name: "区域赛套题（历年真题轮换）", problems: ICPC_ZHENTI },
    ],
  },
  {
    mo: 12, title: "赛前冲刺",
    core: "刷近年同赛区区域真题，重做所有错题，整理个人模板库，针对性补齐薄弱专题",
    daily: "薄弱专题真题 + 错题复盘，保持手感",
    goal: "稳定发挥，冲击区域银牌",
    types: ["薄弱真题", "错题复盘", "真题"],
    pools: [ICPC_ZHENTI, ["重做本月 / 本周错题本全部错题"], ICPC_ZHENTI],
    topics: [
      { name: "冲刺：薄弱专题 + 错题复盘", problems: ICPC_ZHENTI },
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

// 由 topics 派生每日三题的三个「题池」（第 j 列）
function icpcPools(month) {
  if (month.pools) return month.pools;
  const pools = [[], [], []];
  month.topics.forEach(function (t) {
    t.problems.forEach(function (p, j) { if (pools[j]) pools[j].push(p); });
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
    const pool = pools[j] || ["（本轮无固定题目，自选同专题）"];
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

  // 本月专题
  const tl = document.createElement("div");
  tl.className = "icpc-topic-list";
  const tlLabel = document.createElement("div");
  tlLabel.className = "note-label";
  tlLabel.textContent = "🧩 本月专题（每日三题从下表中自动轮换）";
  tl.appendChild(tlLabel);
  const tblWrap = document.createElement("div");
  tblWrap.className = "table-wrap";
  const table = document.createElement("table");
  table.className = "roadmap-table";
  table.innerHTML = "<thead><tr><th>专题</th><th>题目</th></tr></thead>";
  const tbody = document.createElement("tbody");
  s.month.topics.forEach(function (t) {
    const tr = document.createElement("tr");
    tr.innerHTML = "<td><b>" + t.name + "</b></td><td>" + t.problems.join(" · ") + "</td>";
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tblWrap.appendChild(table);
  tl.appendChild(tblWrap);
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
      "<td><b>" + m.title + "</b></td>" +
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
