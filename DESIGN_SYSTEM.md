# CloudEval Design System
> **Theme:** Ocean Tech (Deep Blue & Electric Teal)  
> **Style:** Modern SaaS, Glassmorphism, Soft UI  
> **Version:** 2.0

## 1. Design Principles (设计原则)

*   **Mobile First & Thumb-Friendly:** 所有交互区域（按钮、卡片）高度至少 44px+，关键操作位于屏幕下半部分。
*   **Emotional & Intelligent:** 使用柔和的渐变和动效传达 AI 的智能感，避免冷冰冰的工具感。
*   **Action-Oriented Dashboard:** 首页即行动中心，通过 "Focus Card" 引导用户完成当务之急。
*   **Async Feedback:** 对于耗时操作（如报告生成），采用异步轮询 + 全局通知的设计，不阻塞用户操作。

---

## 2. Color System (色彩系统)

基于 Tailwind CSS 扩展配置。

### Primary (Brand Blue)
用于主按钮、关键强调、渐变背景。传达专业、科技与冷静。
*   `brand-900` (#0f172a): Midnight - 标题文字，深色背景
*   `brand-600` (#2563eb): Electric Blue - 主色，激活状态
*   `brand-500` (#3b82f6): Action Blue - 按钮渐变起点
*   `brand-50`  (#eff6ff): Ice Blue - 浅色背景，卡片高亮

### Accent (Teal)
用于成功状态、数据高亮、装饰性元素。传达活力与生长。
*   `accent-500` (#14b8a6): Teal - 成功图标，副按钮
*   `accent-400` (#2dd4bf): Cyan - 渐变终点，光效

### Neutral & Surface
*   `Background`: #F8FAFC (Slate-50) - 全局背景
*   `Surface`: #FFFFFF / rgba(255,255,255, 0.8) - 卡片与玻璃层
*   `Text Primary`: #0f172a (Slate-900)
*   `Text Secondary`: #64748b (Slate-500)

---

## 3. Typography (排版)

字体栈: `Inter`, system-ui, sans-serif.

| Usage | Size | Weight | Tracking | Example |
| :--- | :--- | :--- | :--- | :--- |
| **Display Title** | 30px+ | ExtraBold (800) | Tight | Hello, User |
| **Card Title** | 18px | Bold (700) | Normal | 2024年度测评 |
| **Body** | 14px | Medium (500) | Normal | 描述文本... |
| **Caption** | 10-12px | Bold (700) | Wide | PENDING / TAGS |

---

## 4. UI Components (组件规范)

### Cards (卡片)
*   **Radius:** `rounded-[1.5rem]` to `rounded-[2rem]` (24px-32px)
*   **Shadow:** `shadow-soft` (弥散阴影)
*   **Style:** 白色背景，激活态带有 `border-brand-200`。
*   **Featured Card:** 使用深色渐变 (`from-slate-800 to-brand-800`) + 背景模糊光斑。

### Buttons (按钮)
*   **Shape:** Pill-shaped (`rounded-full`).
*   **Primary:** `bg-gradient-to-r from-brand-600 to-brand-500`. 带有 `shadow-brand-500/30` 投影。
*   **Secondary:** 白色背景，灰色边框，按压变色。
*   **Ghost:** 透明背景，用于次要导航。

### Navigation (导航)
*   **Bottom Bar:** 浮动式玻璃拟态 (`glass-nav`)。
*   **Radius:** `rounded-[2rem]`.
*   **Interaction:** 点击切换 Tab 时图标有缩放动效。

---

## 5. Motion & Effects (动效与特效)

在 `tailwind.config` 中定义的自定义动画。

*   **Glassmorphism:**
    *   `.glass-card`: 背景模糊 `blur(12px)` + 半透明白。
    *   `.glass-nav`: 底部导航专用，高模糊 `blur(16px)`。

*   **Animations:**
    *   `animate-fade-in-up`: 页面进入时的上浮淡入效果。
    *   `animate-slide-down`: 顶部通知条 (Toast) 的滑入效果。
    *   `animate-pulse-slow`: 背景光斑的呼吸效果 (3s 循环)。
    *   `animate-shimmer`: AI 生成报告时的流光加载条。
    *   `shadow-glow`: 关键图标背后的发光效果。

---

## 6. Iconography (图标)

使用 **FontAwesome 6 (Solid & Regular)**。

*   **Style:** 保持统一大小，通常包裹在圆角容器中。
*   **Container:** 
    *   Primary Icon: `w-12 h-12 rounded-2xl`
    *   Action Icon: `w-10 h-10 rounded-full`

---

## 7. UX Patterns (交互模式)

### Async Report Generation (异步报告生成)
1.  **Trigger:** 用户提交测评。
2.  **Immediate Feedback:** 弹出 "提交成功" Toast，跳转回 Dashboard。
3.  **Process:** 任务卡片显示 "AI 生成中..." 流光条 (Shimmer)。
4.  **Completion:** 顶部弹出全局 Notification，卡片状态变为 "报告已生成"。

### Navigation Logic
*   **Home:** 任务流 (To-Do)，只展示未完成或高优先级任务。
*   **Mine:** 档案流 (Profile)，展示数据统计、报告归档、设置。
