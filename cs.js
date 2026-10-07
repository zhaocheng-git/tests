// ============================================================
// 计算机基础专业课 · 并行学习规划（独立 · 不影响算法板块）
// 4 门课：操作系统 / 计算机网络 / 分布式系统 / 并行计算
// 自动每日任务（4 门课周任务按日期映射）+ 打卡日历 + 课程详情
// LocalStorage 独立 key「cs-v1-state」，挂到 #cs-wrap
// ============================================================

// ---------- 总阶段划分（4 个阶段 = 4 门课） ----------
const CS_STAGES = [
  { no: 1, name: "操作系统",   icon: "🖥", pos: "考研408重点 · 面试必问",   weeks: 8,  suggest: "打地基，与算法刷题同步，每天抽 1h" },
  { no: 2, name: "计算机网络", icon: "🌐", pos: "考研408重点 · 面试必问",   weeks: 8,  suggest: "紧跟 OS 之后，重在抓包 + 手写协议流程" },
  { no: 3, name: "分布式系统", icon: "🕸", pos: "研究生面试加分 + 科研方向", weeks: 10, suggest: "难度最高放后期，投入整块时间做 6.824 Lab" },
  { no: 4, name: "并行计算",   icon: "⚡", pos: "面试加分 · 高性能计算",     weeks: 6,  suggest: "轻量，穿插在分布式期间，重在动手写并行程序" },
];

// ---------- 4 门课详细规划 ----------
const CS_COURSES = {
  os: {
    id: "os", name: "操作系统", icon: "🖥", pos: "考研408重点 · 面试必问",
    goal: "系统掌握「进程/线程、内存、文件、IO」四大子系统，能独立做 408 真题，能答透面试高频题。",
    books: [
      { name: "《操作系统导论》(OSTEP)", tag: "req", note: "免费、图解清晰，主线教材" },
      { name: "王道 408 操作系统", tag: "req", note: "考研真题导向，配合刷题" },
      { name: "《现代操作系统》(Tanenbaum)", tag: "opt", note: "选学，深入原理" },
      { name: "CSAPP 第 8~10 章", tag: "opt", note: "选学，从程序员视角看 OS" },
    ],
    weeks: [
      { w: 1, name: "进程与线程、进程状态转换", tag: "req", key: "ky", desc: "进程控制块、五态模型、上下文切换、进程 vs 线程" },
      { w: 2, name: "CPU 调度算法", tag: "req", key: "ky", desc: "FCFS / SJF / RR / 优先级 / 多级反馈队列" },
      { w: 3, name: "进程同步：锁、信号量、条件变量", tag: "req", key: "ky", desc: "临界区、互斥、PV 操作、生产者消费者、管程" },
      { w: 4, name: "死锁", tag: "req", key: "ky", desc: "死锁四条件、银行家算法、死锁检测与恢复" },
      { w: 5, name: "内存管理：分页 / 分段 / 虚拟内存", tag: "req", key: "ky", desc: "页表、地址翻译、虚拟内存机制" },
      { w: 6, name: "页面置换算法与 TLB", tag: "req", key: "ky", desc: "FIFO / LRU / Clock、缺页中断、TLB 命中" },
      { w: 7, name: "文件系统与磁盘", tag: "req", key: "ky", desc: "inode、目录结构、磁盘调度算法" },
      { w: 8, name: "IO 管理 + 408 真题综合", tag: "opt", key: "iv", desc: "IO 模型、零拷贝、真题套卷查漏补缺" },
    ],
    check: "能徒手画进程状态转换图、手写调度/置换算法；408 操作系统真题正确率 ≥80%；能清晰回答「进程 vs 线程」「虚拟内存原理」「死锁四条件」。",
    project: "① 实现一个 mini shell（支持管道、重定向、后台运行）；② 实现线程池。",
  },

  net: {
    id: "net", name: "计算机网络", icon: "🌐", pos: "考研408重点 · 面试必问",
    goal: "掌握五层体系结构，重点吃透传输层 TCP、网络层 IP、应用层 HTTP，能完整讲清协议流程。",
    books: [
      { name: "《计算机网络：自顶向下方法》", tag: "req", note: "主线教材，讲解清楚" },
      { name: "王道 408 计算机网络", tag: "req", note: "考研真题导向" },
      { name: "《TCP/IP 详解 卷1》", tag: "opt", note: "选学，协议细节深入" },
      { name: "《图解HTTP》", tag: "opt", note: "选学，轻松入门 HTTP" },
    ],
    weeks: [
      { w: 1, name: "网络体系结构（OSI / TCP-IP 分层）", tag: "req", key: "ky", desc: "分层思想、封装解封装、各层功能" },
      { w: 2, name: "应用层：HTTP / DNS", tag: "req", key: "ky", desc: "HTTP 报文、状态码、DNS 解析流程" },
      { w: 3, name: "传输层：UDP 与 TCP 首部、可靠传输", tag: "req", key: "ky", desc: "三次握手、四次挥手、序号确认、重传" },
      { w: 4, name: "TCP 流量控制与拥塞控制", tag: "req", key: "ky", desc: "滑动窗口、慢启动、拥塞避免、快重传快恢复" },
      { w: 5, name: "网络层：IP、子网划分、路由协议", tag: "req", key: "ky", desc: "IP 地址、CIDR、RIP/OSPF/BGP" },
      { w: 6, name: "数据链路层：以太网、交换机、VLAN", tag: "req", key: "ky", desc: "MAC 地址、交换机转发、VLAN" },
      { w: 7, name: "物理层 + 网络安全", tag: "req", key: "ky", desc: "编码、对称/非对称加密、数字证书、HTTPS" },
      { w: 8, name: "HTTP 演进（1.1 / 2 / 3、QUIC）", tag: "opt", key: "iv", desc: "HTTP2 多路复用、HTTP3、QUIC（面试加分）" },
    ],
    check: "能完整讲 TCP 三次握手/四次挥手、拥塞控制各阶段；408 计网真题正确率 ≥80%；能回答「HTTP vs HTTPS」「TCP vs UDP」「浏览器输入 URL 发生了什么」。",
    project: "① 用 socket 实现一个简易 HTTP 服务器；② Wireshark 抓包分析 TCP 握手/挥手全过程。",
  },

  dist: {
    id: "dist", name: "分布式系统", icon: "🕸", pos: "研究生面试加分 + 科研方向",
    goal: "完成 MIT6.824 核心 Lab，吃透 Raft 一致性算法，理解分布式复制、容错、共识（华科李钦宾分布式方向对口）。",
    books: [
      { name: "MIT6.824 课程 + Lab", tag: "req", note: "主线，边看 Lecture 边做 Lab" },
      { name: "Raft 论文", tag: "req", note: "精读，面试必讲" },
      { name: "《数据密集型应用系统设计》(DDIA)", tag: "opt", note: "选学，面试加分神书" },
      { name: "Paxos 论文", tag: "opt", note: "选学，进阶共识" },
    ],
    weeks: [
      { w: 1, name: "分布式基础：CAP、一致性模型、时钟", tag: "req", key: "iv", desc: "CAP 取舍、线性一致/最终一致、逻辑时钟" },
      { w: 2, name: "6.824 Lab1 MapReduce", tag: "req", key: "", desc: "实现 MapReduce，理解分布式容错" },
      { w: 3, name: "Raft 论文精读（选举 / 日志 / 安全）", tag: "req", key: "iv", desc: "领导人选举、日志复制、安全性质" },
      { w: 4, name: "6.824 Lab2A 领导人选举", tag: "req", key: "", desc: "实现 Raft 选举、心跳" },
      { w: 5, name: "6.824 Lab2B 日志复制", tag: "req", key: "", desc: "日志复制、一致性检查" },
      { w: 6, name: "6.824 Lab2C 持久化 + Lab2D 日志压缩", tag: "req", key: "", desc: "持久化、快照" },
      { w: 7, name: "6.824 Lab3A/B KV 服务 + 快照", tag: "req", key: "", desc: "基于 Raft 的容错 KV 存储" },
      { w: 8, name: "6.824 Lab4A/B 分片 + 配置变更", tag: "opt", key: "iv", desc: "分片 KV、shard 迁移（选做）" },
      { w: 9, name: "分布式共识进阶：Paxos、ZAB、Raft", tag: "opt", key: "iv", desc: "多 Paxos、ZAB、Raft 异同" },
      { w: 10, name: "DDIA 精读：复制 / 分区 / 事务 / 一致性", tag: "opt", key: "iv", desc: "分布式存储核心章节" },
    ],
    check: "完成 6.824 Lab1~Lab3（Lab4 选做）；能讲清 Raft 选举、日志复制、快照机制；能回答「为什么需要分布式」「CAP 怎么取舍」「Raft vs Paxos」。",
    project: "MIT6.824 全部 Lab（本身就是含金量最高的项目）；（选做）用 Raft 实现一个分布式 KV 存储。",
  },

  parallel: {
    id: "parallel", name: "并行计算", icon: "⚡", pos: "面试加分 · 高性能计算",
    goal: "掌握并行编程基本范式（线程 / OpenMP / MPI），理解并行性能分析（加速比、阿姆达尔定律）。",
    books: [
      { name: "《并行程序设计导论》(Pacheco)", tag: "req", note: "主线，覆盖 OpenMP/MPI" },
      { name: "CSAPP 第 12 章（并发编程）", tag: "req", note: "线程、共享内存、同步" },
      { name: "《CUDA C Programming Guide》", tag: "opt", note: "选学，GPU 编程" },
      { name: "《CUDA by Example》", tag: "opt", note: "选学，CUDA 实战" },
    ],
    weeks: [
      { w: 1, name: "并行基础：线程、共享内存、竞态、锁", tag: "req", key: "", desc: "数据竞争、互斥、原子性、可见性" },
      { w: 2, name: "OpenMP：并行 for、规约、调度", tag: "req", key: "iv", desc: "pragma、reduction、schedule" },
      { w: 3, name: "MPI：点对点通信、集合通信", tag: "req", key: "iv", desc: "Send/Recv、Broadcast、Reduce" },
      { w: 4, name: "并行算法：归约、扫描、排序", tag: "req", key: "", desc: "并行归约、前缀和、并行快排" },
      { w: 5, name: "GPU / CUDA 入门", tag: "opt", key: "iv", desc: "核函数、线程层次、内存层次" },
      { w: 6, name: "并行性能分析：加速比、效率、阿姆达尔", tag: "req", key: "iv", desc: "加速比、阿姆达尔定律、假共享、负载均衡" },
    ],
    check: "能用 OpenMP/MPI 写出并行程序并对比串行加速比；能解释阿姆达尔定律、假共享、负载均衡；理解 CPU 与 GPU 并行的差异。",
    project: "① 并行化矩阵乘法（OpenMP + CUDA 双版本）；② 实现并行归约 / 前缀和。",
  },
};

// ---------- 每周学习资源（在哪里学） ----------
const CS_RES = {
  // 操作系统
  "os-1": "OSTEP 第4章 · 王道408 第2章",
  "os-2": "OSTEP 第7-9章 · 王道408 第2章",
  "os-3": "OSTEP 第28-31章 · 王道408 第2章",
  "os-4": "OSTEP 第32章 · 王道408 第2章",
  "os-5": "OSTEP 第13-16章 · 王道408 第3章",
  "os-6": "OSTEP 第18-22章 · 王道408 第3章",
  "os-7": "OSTEP 第39-40章 · 王道408 第4章",
  "os-8": "OSTEP 第36-37章 · 王道408 第5章",
  // 计算机网络
  "net-1": "《自顶向下》第1章",
  "net-2": "《自顶向下》第2章",
  "net-3": "《自顶向下》第3章",
  "net-4": "《自顶向下》第3章（拥塞控制）",
  "net-5": "《自顶向下》第4-5章",
  "net-6": "《自顶向下》第6章",
  "net-7": "《自顶向下》第1章 + 第8章",
  "net-8": "《图解HTTP》+ HTTP2/3 资料",
  // 分布式系统
  "dist-1": "6.824 Lecture 1-2 · DDIA 第1-2章",
  "dist-2": "6.824 Lecture 1 · Lab1 文档",
  "dist-3": "Raft 论文原文",
  "dist-4": "6.824 Lecture 5-6 · Lab2A",
  "dist-5": "6.824 Lab2B 文档",
  "dist-6": "6.824 Lab2C/D 文档",
  "dist-7": "6.824 Lecture 8 · Lab3",
  "dist-8": "6.824 Lab4 文档",
  "dist-9": "Paxos 论文 · DDIA 第9章",
  "dist-10": "DDIA 第5-9章",
  // 并行计算
  "parallel-1": "Pacheco 第1-2章 · CSAPP 12.1-12.4",
  "parallel-2": "Pacheco 第5章",
  "parallel-3": "Pacheco 第3章",
  "parallel-4": "Pacheco 第6-7章",
  "parallel-5": "CUDA C Programming Guide 第1-3章",
  "parallel-6": "Pacheco 第2章 · CSAPP 12.5-12.7",
};

// ---------- 状态（独立 LocalStorage key） ----------
const CS_KEY = "cs-v1-state";

function csDefaultState() {
  return { start: null, done: {}, checkin: {} };
  // done: { "os-1": "2026-10-07" } 周任务打卡
  // checkin: { "2026-10-07": true } 每日打卡
}

let csState = csLoad();
let csCurrent = "os";

function csLoad() {
  try {
    return Object.assign(csDefaultState(), JSON.parse(localStorage.getItem(CS_KEY)) || {});
  } catch (e) {
    return csDefaultState();
  }
}

function csSave() {
  localStorage.setItem(CS_KEY, JSON.stringify(csState));
}

// ---------- 日期工具 ----------
function csPad(n) { return String(n).padStart(2, "0"); }
function csToday() { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }
function csKey(d) { return d.getFullYear() + "-" + csPad(d.getMonth() + 1) + "-" + csPad(d.getDate()); }
function csParse(k) { const p = k.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); }
function csAddDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function csWeek(d) { return "周" + ["日", "一", "二", "三", "四", "五", "六"][d.getDay()]; }
function csStartDate() { return csState.start ? csParse(csState.start) : null; }

// 4 门课所有周任务按顺序排成一条时间线（OS → 计网 → 分布式 → 并行）
function csAllTasks() {
  const order = ["os", "net", "dist", "parallel"];
  const tasks = [];
  order.forEach(function (cid) {
    const c = CS_COURSES[cid];
    c.weeks.forEach(function (wk) {
      tasks.push({ cid: cid, course: c, week: wk });
    });
  });
  return tasks;
}

// 某天对应的周任务（从起始日起，每 7 天推进一个周任务）
function csDayTask(dateKey) {
  const s = csStartDate();
  if (!s) return null;
  const dayIndex = Math.round((csParse(dateKey) - s) / 86400000);
  if (dayIndex < 0) return null;
  const weekIndex = Math.floor(dayIndex / 7);
  const tasks = csAllTasks();
  if (weekIndex >= tasks.length) return null;
  return tasks[weekIndex];
}

function csDayState(dateKey) {
  const t = csDayTask(dateKey);
  if (!t) return "none";
  if (csState.checkin[dateKey]) return "done";
  const today = csKey(csToday());
  if (dateKey === today) return "today";
  if (dateKey < today) return "missed";
  return "upcoming";
}

// 全部任务覆盖的日期范围（32 周 = 224 天）
function csAllDays() {
  const s = csStartDate();
  const days = [];
  if (!s) return days;
  const total = csAllTasks().length * 7;
  for (let i = 0; i < total; i++) days.push(csAddDays(s, i));
  return days;
}

// ---------- 渲染入口 ----------
function renderCs() {
  const wrap = document.getElementById("cs-wrap");
  if (!wrap) return;
  wrap.innerHTML = "";

  const card = document.createElement("details");
  card.className = "card cs-card";
  card.open = true;

  const sum = document.createElement("summary");
  sum.className = "roadmap-summary";
  sum.textContent = "🧭 计算机基础专业课 · 并行学习规划（操作系统 / 计网 / 分布式 / 并行）";
  card.appendChild(sum);

  card.appendChild(csBuildSetup());

  if (!csStartDate()) { wrap.appendChild(card); return; }

  card.appendChild(csBuildProgress());
  card.appendChild(csBuildCalendar());
  card.appendChild(csBuildDaily());
  card.appendChild(csBuildTabs());
  card.appendChild(csBuildCourse(csCurrent));
  card.appendChild(csBuildStages());

  wrap.appendChild(card);
}

// 设置开始日期 + 规则
function csBuildSetup() {
  const box = document.createElement("div");
  box.className = "cs-setup";

  const label = document.createElement("p");
  label.className = "subtitle";
  label.textContent = "选择开始日期，自动从该日期生成每日学习任务（4 门课共 32 周，每 7 天推进一个主题）。";
  box.appendChild(label);

  const row = document.createElement("div");
  row.className = "cs-start-row";
  const input = document.createElement("input");
  input.type = "date";
  input.className = "cs-start-input";
  input.id = "cs-start";
  if (csState.start) input.value = csState.start;
  input.addEventListener("change", function () {
    if (!input.value) return;
    csState.start = input.value;
    csSave();
    renderCs();
  });
  const nowBtn = document.createElement("button");
  nowBtn.className = "cs-add-btn";
  nowBtn.textContent = "从今天开始";
  nowBtn.addEventListener("click", function () {
    csState.start = csKey(csToday());
    csSave();
    renderCs();
  });
  row.append(input, nowBtn);
  box.appendChild(row);

  if (csState.start) {
    const info = document.createElement("p");
    info.className = "subtitle";
    info.textContent = "计划已开始：" + csState.start + " · 共 32 周。修改日期会整体平移计划（打卡记录按日期对齐保留）。";
    box.appendChild(info);
  }

  const rules = document.createElement("div");
  rules.className = "cs-rules";
  rules.innerHTML =
    "<b>📋 学习节奏</b>" +
    "<ul>" +
    "<li>与算法训练同步：工作日每天固定 1~1.5h 学专业课，周末整块时间做小项目。</li>" +
    "<li>每 7 天推进一个主题，每天打卡记录学习；下面「每日任务」可勾选当天完成。</li>" +
    "<li>区分必学/选学，标注 🔴考研重点 / 🟣面试加分，先抓必学+考研重点。</li>" +
    "<li>所有数据仅存本地浏览器（localStorage）。</li>" +
    "</ul>";
  box.appendChild(rules);

  return box;
}

// 总进度（4 门课周任务完成情况）
function csBuildProgress() {
  const wrap = document.createElement("div");
  wrap.className = "cs-progress";

  const head = document.createElement("h3");
  head.className = "sub-title";
  head.style.marginTop = "0";
  head.textContent = "📈 总进度 · 4 门课";
  wrap.appendChild(head);

  const tasks = csAllTasks();
  const done = tasks.filter(function (t) { return csState.done[csTaskId(t.cid, t.week.w)]; }).length;
  const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0;

  const num = document.createElement("div");
  num.className = "overview-number";
  num.textContent = pct + "%";
  wrap.appendChild(num);

  const lbl = document.createElement("div");
  lbl.className = "overview-label";
  lbl.textContent = "周任务完成 " + done + " / " + tasks.length;
  wrap.appendChild(lbl);

  const bar = document.createElement("div");
  bar.className = "progress-bar";
  const fill = document.createElement("div");
  fill.className = "progress-fill";
  fill.style.width = pct + "%";
  bar.appendChild(fill);
  wrap.appendChild(bar);

  return wrap;
}

// 打卡日历（月历，点击标记当天打卡）
function csBuildCalendar() {
  const wrap = document.createElement("div");
  wrap.className = "cs-calendar";

  const head = document.createElement("h3");
  head.className = "sub-title";
  head.textContent = "🔥 每日打卡（绿=已打卡 · 红=逾期 · 蓝框=今天 · 点击标记）";
  wrap.appendChild(head);

  const weekdays = document.createElement("div");
  weekdays.className = "cal-weekdays";
  weekdays.innerHTML = "<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>";
  wrap.appendChild(weekdays);

  const today = csToday();
  const y = today.getFullYear(), m = today.getMonth();
  const first = new Date(y, m, 1);
  const dim = new Date(y, m + 1, 0).getDate();
  const todayKey = csKey(today);

  const grid = document.createElement("div");
  grid.className = "cal-grid";
  for (let i = 0; i < first.getDay(); i++) {
    const b = document.createElement("div");
    b.className = "cal-day blank";
    grid.appendChild(b);
  }
  for (let d = 1; d <= dim; d++) {
    const dk = csKey(new Date(y, m, d));
    const st = csDayState(dk);
    const cell = document.createElement("div");
    cell.className = "cal-day";
    if (st === "done") cell.classList.add("cs-cal-done");
    else if (st === "missed") cell.classList.add("cs-cal-missed");
    if (dk === todayKey) cell.classList.add("today");
    cell.textContent = d;
    cell.title = dk;
    cell.addEventListener("click", function () {
      if (!csDayTask(dk)) return;
      if (csState.checkin[dk]) delete csState.checkin[dk];
      else csState.checkin[dk] = true;
      csSave();
      renderCs();
    });
    grid.appendChild(cell);
  }
  wrap.appendChild(grid);

  return wrap;
}

// 每日任务时间线（按月分组）
function csBuildDaily() {
  const wrap = document.createElement("div");
  wrap.className = "cs-timeline";

  const head = document.createElement("h3");
  head.className = "sub-title";
  head.textContent = "📅 每日任务时间线（点日期展开 / 收起，勾选当天完成）";
  wrap.appendChild(head);

  const todayKey = csKey(csToday());
  const days = csAllDays();

  const groups = [];
  let cur = -1;
  days.forEach(function (d) {
    const gk = d.getFullYear() + "-" + d.getMonth();
    if (gk !== cur) { cur = gk; groups.push({ gk: gk, days: [] }); }
    groups[groups.length - 1].days.push(d);
  });

  groups.forEach(function (g) {
    const firstDay = g.days[0];
    const mHead = document.createElement("div");
    const isCurrent = (firstDay.getFullYear() === csToday().getFullYear() && firstDay.getMonth() === csToday().getMonth());
    mHead.className = "cs-month-head" + (isCurrent ? " open" : "");
    mHead.innerHTML =
      "<span>" + firstDay.getFullYear() + " 年 " + (firstDay.getMonth() + 1) + " 月</span>" +
      "<span class=\"cs-month-arrow\">" + (isCurrent ? "▾" : "▸") + "</span>";
    mHead.addEventListener("click", function () {
      const body = mHead.nextSibling;
      const open = body.style.display !== "none";
      body.style.display = open ? "none" : "";
      mHead.classList.toggle("open", !open);
      mHead.querySelector(".cs-month-arrow").textContent = open ? "▸" : "▾";
    });
    wrap.appendChild(mHead);

    const mBody = document.createElement("div");
    mBody.className = "cs-month-body";
    mBody.style.display = isCurrent ? "" : "none";
    g.days.forEach(function (d) {
      mBody.appendChild(csBuildDay(d, todayKey));
    });
    wrap.appendChild(mBody);
  });

  return wrap;
}

function csBuildDay(d, todayKey) {
  const dk = csKey(d);
  const isToday = dk === todayKey;
  const t = csDayTask(dk);

  const row = document.createElement("div");
  row.className = "cs-day" + (isToday ? " cs-today cs-open" : "");

  const headEl = document.createElement("div");
  headEl.className = "cs-day-head";
  const dateEl = document.createElement("span");
  dateEl.className = "cs-date";
  dateEl.textContent = (d.getMonth() + 1) + "." + d.getDate() + " · " + csWeek(d);
  headEl.appendChild(dateEl);
  if (isToday) {
    const badge = document.createElement("span");
    badge.className = "cs-badge";
    badge.textContent = "今天";
    headEl.appendChild(badge);
  }
  const checked = !!csState.checkin[dk];
  const stEl = document.createElement("span");
  stEl.className = "cs-day-count" + (checked ? " cs-done" : "");
  stEl.textContent = checked ? "✅ 已打卡" : (t ? "待打卡" : "—");
  headEl.appendChild(stEl);

  const arrow = document.createElement("span");
  arrow.className = "cs-arrow";
  arrow.textContent = isToday ? "▾" : "▸";
  headEl.appendChild(arrow);

  const body = document.createElement("div");
  body.className = "cs-day-body";
  body.style.display = isToday ? "" : "none";

  if (t) {
    const label = document.createElement("div");
    label.className = "cs-day-task";
    label.innerHTML = "<b>" + t.course.icon + " " + t.course.name + " · 第 " + t.week.w + " 周</b><br>" + t.week.name;
    body.appendChild(label);

    const desc = document.createElement("div");
    desc.className = "cs-day-desc";
    desc.textContent = t.week.desc;
    body.appendChild(desc);

    const res = CS_RES[t.cid + "-" + t.week.w];
    if (res) {
      const resEl = document.createElement("div");
      resEl.className = "cs-day-res";
      resEl.innerHTML = "📖 学习资源：<b>" + res + "</b>";
      body.appendChild(resEl);
    }

    const cbLabel = document.createElement("label");
    cbLabel.className = "cs-day-check";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = checked;
    cb.addEventListener("change", function () {
      if (cb.checked) csState.checkin[dk] = true;
      else delete csState.checkin[dk];
      csSave();
      renderCs();
    });
    cbLabel.append(cb, document.createTextNode(" 今日完成"));
    body.appendChild(cbLabel);
  } else {
    const empty = document.createElement("div");
    empty.className = "cs-day-desc";
    empty.textContent = "计划已结束（32 周完成）。";
    body.appendChild(empty);
  }

  headEl.addEventListener("click", function () {
    const open = body.style.display !== "none";
    body.style.display = open ? "none" : "";
    arrow.textContent = open ? "▸" : "▾";
    row.classList.toggle("cs-open", !open);
  });

  row.appendChild(headEl);
  row.appendChild(body);
  return row;
}

// 子栏目 Tab
function csBuildTabs() {
  const wrap = document.createElement("div");
  wrap.className = "cs-tabs";
  ["os", "net", "dist", "parallel"].forEach(function (id) {
    const c = CS_COURSES[id];
    const btn = document.createElement("button");
    btn.className = "cs-tab" + (id === csCurrent ? " active" : "");
    btn.textContent = c.icon + " " + c.name;
    btn.addEventListener("click", function () { csCurrent = id; renderCs(); });
    wrap.appendChild(btn);
  });
  return wrap;
}

// 当前课程详情
function csBuildCourse(courseId) {
  const c = CS_COURSES[courseId];
  const box = document.createElement("div");
  box.className = "cs-course";

  const goal = document.createElement("div");
  goal.className = "cs-goal";
  goal.innerHTML = '<span class="cs-pos">' + c.pos + '</span><div>🎯 学习目标：<b>' + c.goal + '</b></div>';
  box.appendChild(goal);

  box.appendChild(csBuildBooks(c));
  box.appendChild(csBuildWeeks(c));
  box.appendChild(csBuildCheck(c));
  box.appendChild(csBuildProject(c));

  return box;
}

function csBuildBooks(c) {
  const wrap = document.createElement("div");
  wrap.className = "cs-section";
  const head = document.createElement("div");
  head.className = "cs-section-title";
  head.textContent = "📚 学习书目 / 资源";
  wrap.appendChild(head);
  c.books.forEach(function (b) {
    const row = document.createElement("div");
    row.className = "cs-book";
    const tag = document.createElement("span");
    tag.className = "cs-tag " + (b.tag === "req" ? "cs-tag-req" : "cs-tag-opt");
    tag.textContent = b.tag === "req" ? "必学" : "选学";
    const name = document.createElement("span");
    name.className = "cs-book-name";
    name.textContent = b.name;
    const note = document.createElement("span");
    note.className = "cs-book-note";
    note.textContent = b.note;
    row.append(tag, name, note);
    wrap.appendChild(row);
  });
  return wrap;
}

function csTaskId(courseId, w) { return courseId + "-" + w; }

function csBuildWeeks(c) {
  const wrap = document.createElement("div");
  wrap.className = "cs-section";
  const head = document.createElement("div");
  head.className = "cs-section-title";
  head.textContent = "📅 每周任务清单（点击打勾，记录完成日期）";
  wrap.appendChild(head);
  c.weeks.forEach(function (wk) {
    const tid = csTaskId(c.id, wk.w);
    const doneDate = csState.done[tid];
    const row = document.createElement("div");
    row.className = "cs-week-item" + (doneDate ? " done" : "");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!doneDate;
    cb.addEventListener("click", function (e) { e.stopPropagation(); });

    const body = document.createElement("div");
    body.className = "cs-w-body";
    const nm = document.createElement("div");
    nm.className = "cs-w-name";
    nm.textContent = "第 " + wk.w + " 周 · " + wk.name;
    const desc = document.createElement("div");
    desc.className = "cs-w-desc";
    desc.textContent = wk.desc;
    body.append(nm, desc);

    const tag = document.createElement("span");
    tag.className = "cs-tag " + (wk.tag === "req" ? "cs-tag-req" : "cs-tag-opt");
    tag.textContent = wk.tag === "req" ? "必学" : "选学";
    const keyTag = document.createElement("span");
    if (wk.key === "ky") { keyTag.className = "cs-tag cs-tag-ky"; keyTag.textContent = "考研重点"; }
    else if (wk.key === "iv") { keyTag.className = "cs-tag cs-tag-iv"; keyTag.textContent = "面试加分"; }

    const date = document.createElement("span");
    date.className = "cs-w-date";
    date.textContent = doneDate ? "✓ " + doneDate.slice(5) : "";

    row.append(cb, body, tag, keyTag, date);
    row.addEventListener("click", function () {
      if (csState.done[tid]) delete csState.done[tid];
      else csState.done[tid] = csKey(csToday());
      csSave();
      renderCs();
    });
    wrap.appendChild(row);
  });
  return wrap;
}

function csBuildCheck(c) {
  const wrap = document.createElement("div");
  wrap.className = "cs-section";
  const head = document.createElement("div");
  head.className = "cs-section-title";
  head.textContent = "✅ 验收标准（怎么判断学会了）";
  wrap.appendChild(head);
  const box = document.createElement("div");
  box.className = "cs-check";
  box.textContent = c.check;
  wrap.appendChild(box);
  return wrap;
}

function csBuildProject(c) {
  const wrap = document.createElement("div");
  wrap.className = "cs-section";
  const head = document.createElement("div");
  head.className = "cs-section-title";
  head.textContent = "🛠️ 配套小项目";
  wrap.appendChild(head);
  const box = document.createElement("div");
  box.className = "cs-project";
  box.textContent = c.project;
  wrap.appendChild(box);
  return wrap;
}

// 总阶段划分
function csBuildStages() {
  const wrap = document.createElement("div");
  wrap.className = "cs-section";
  const head = document.createElement("h3");
  head.className = "sub-title";
  head.textContent = "🗺️ 总阶段划分（4 门课 · 与算法训练同步推进）";
  wrap.appendChild(head);
  const tableWrap = document.createElement("div");
  tableWrap.className = "table-wrap";
  const table = document.createElement("table");
  table.className = "roadmap-table";
  table.innerHTML = "<thead><tr><th>阶段</th><th>课程</th><th>定位</th><th>周期</th><th>节奏建议</th></tr></thead>";
  const tbody = document.createElement("tbody");
  CS_STAGES.forEach(function (s) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>阶段 " + s.no + "</td>" +
      "<td><b>" + s.icon + " " + s.name + "</b></td>" +
      "<td>" + s.pos + "</td>" +
      "<td>" + s.weeks + " 周</td>" +
      "<td>" + s.suggest + "</td>";
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableWrap.appendChild(table);
  wrap.appendChild(tableWrap);
  return wrap;
}

// ---------- 启动 ----------
if (document.getElementById("cs-wrap")) {
  renderCs();
}
