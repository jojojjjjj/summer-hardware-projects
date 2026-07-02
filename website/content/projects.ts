/** Difficulty level type */
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5

/** Project tag */
export interface ProjectTag {
  label: string
  color: string
}

/** Skills learning outcomes */
export interface Skills {
  hardware: string[]
  software: string[]
  system: string[]
  engineering: string[]
}

/** Hardware list item */
export interface HardwareItem {
  name: string
  spec: string
  note?: string
}

/** Timeline phase */
export interface TimelinePhase {
  days: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
}

/** Open source links */
export interface ProjectLinks {
  github?: string
  bilibili?: string
  oshwhub?: string
  gitee?: string
  other?: { label: string; url: string }[]
  /** User's adapted course-pack repo (jojojjjjj/<folder>) — secondary, below the original. */
  adaptedRepo?: string
}

/** Deep-dive section: summary + who-it's-for + application-essay takeaways (optional, per-project) */
export interface DeepDiveAudience {
  key: string
  labelZh: string
  labelEn: string
  whoZh: string
  whoEn: string
}

export interface DeepDiveTakeaway {
  titleZh: string
  titleEn: string
  projectElementZh: string
  projectElementEn: string
  knowledgePointZh: string
  knowledgePointEn: string
  essayAngleZh: string
  essayAngleEn: string
}

export interface ProjectDeepDive {
  summaryZh: string
  summaryEn: string
  audiences: DeepDiveAudience[]
  takeaways: DeepDiveTakeaway[]
}

/** Full project data */
export interface Project {
  id: string
  slug: string
  number: number
  titleZh: string
  titleEn: string
  subtitle: string
  subtitleEn: string
  description: string
  descriptionEn: string
  difficulty: DifficultyLevel
  difficultyLabel: string
  duration: number
  durationUnit: string
  color: string
  colorHex: string
  icon: string
  tags: ProjectTag[]
  skills: Skills
  hardware: HardwareItem[]
  timeline: TimelinePhase[]
  links: ProjectLinks
  mcu: string
  coreTech: string
  cover?: string
  deepDive?: ProjectDeepDive
}

/** Difficulty filter options */
export const difficultyFilters = [
  { value: 0, label: '全部', labelEn: 'All' },
  { value: 1, label: '入门', labelEn: 'Beginner' },
  { value: 2, label: '基础', labelEn: 'Basic' },
  { value: 3, label: '中等', labelEn: 'Intermediate' },
  { value: 4, label: '进阶', labelEn: 'Advanced' },
  { value: 5, label: '高级', labelEn: 'Expert' },
] as const

export const projects: Project[] = [
  {
    id: '01', slug: 'binocular-thermal-imager', number: 1,
    titleZh: '双目热成像仪', titleEn: 'ThermalEyes',
    subtitle: '基于 STM32 的手机热成像设备', subtitleEn: 'STM32-based mobile phone thermal imager',
    description: '基于可见光和热成像传感器的双目手机热成像仪。通过 STM32F411 读取传感器数据，经 USB 传输到手机端，借助 OpenCV 进行图像融合，在手机屏幕中显示热成像叠加图像。',
    descriptionEn: 'A binocular thermal imager for smartphones with visible-light and infrared sensors.',
    difficulty: 3, difficultyLabel: '中等', duration: 15, durationUnit: '天',
    color: 'text-project-01', colorHex: '#f97316', icon: 'ScanEye',
    mcu: 'STM32F411', coreTech: 'STM32 + MLX90640 + OpenCV + USB',
    cover: '/media/thermal-cover.webp',
    tags: [
      { label: 'STM32', color: 'bg-tag-bronze text-tag-bronze-text' },
      { label: 'OpenCV', color: 'bg-tag-solder text-tag-solder-text' },
      { label: 'USB', color: 'bg-tag-copper text-tag-copper-text' },
    ],
    skills: { hardware: ['STM32 开发', 'I2C 通信', 'USB CDC/HS', 'PCB 设计'], software: ['C 语言', 'Android 开发', 'OpenCV 图像处理', 'USB 协议'], system: ['传感器数据融合', '实时图像处理', 'USB 通信架构'], engineering: ['焊接技能', '系统调试', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'STM32F411CEU6', spec: 'Cortex-M4 MCU' },
      { name: 'MLX90640', spec: '32×24 热成像传感器' },
      { name: 'OV2640/OV5640', spec: '可见光摄像头模块' },
      { name: 'USB Type-C', spec: '连接器' },
      { name: 'PCB', spec: '嘉立创打样' },
    ],
    timeline: [
      { days: 'Day 1-3', title: '基础准备', titleEn: 'Fundamentals', description: '项目介绍、STM32 基础与 GPIO、I2C 通信协议', descriptionEn: 'Project intro, STM32 basics, I2C protocol' },
      { days: 'Day 4-7', title: '传感器驱动', titleEn: 'Sensor Driver', description: 'MLX90640 驱动开发、I2C 数据读取、温度矩阵解析', descriptionEn: 'MLX90640 driver, I2C data read, temp matrix' },
      { days: 'Day 8-11', title: 'USB通信', titleEn: 'USB Communication', description: 'USB CDC 配置、数据传输协议、手机端接收', descriptionEn: 'USB CDC, data protocol, phone receive' },
      { days: 'Day 12-15', title: '图像融合', titleEn: 'Image Fusion', description: 'OpenCV 图像处理、热成像叠加、调试与展示', descriptionEn: 'OpenCV processing, thermal overlay, demo' },
    ],
    links: {
      github: 'https://github.com/colourfate/thermal_bridge',
      other: [
        { label: '原作者 Android APP · Original app', url: 'https://github.com/colourfate/ThermalEyes' },
        { label: '原作者 PCB · 立创开源', url: 'https://oshwhub.com/colourfate/binocular_thermal_imager' },
      ],
      adaptedRepo: 'https://github.com/jojojjjjj/project-01-binocular-thermal-imager',
    },
  },
  {
    id: '02', slug: 'env-monitor', number: 2,
    titleZh: '温湿度网络时钟', titleEn: 'EnvClock',
    subtitle: 'WiFi 联网授时的桌面温湿度时钟', subtitleEn: 'WiFi-networked desktop temp/humidity clock',
    description: '基于 STM32L433 的 WiFi 温湿度网络时钟。ESP8266 负责联网与 SNTP 网络授时，SHT31 采集温湿度，OLED 实时显示时间、温度与湿度。复刻 UP主「乐在程上」的桌面摆件项目。',
    descriptionEn: 'STM32L433-based WiFi temp/humidity network clock — ESP8266 SNTP time sync, SHT31 sensor, OLED display. Adapted from UP主 乐在程上 desktop ornament build.',
    difficulty: 2, difficultyLabel: '基础', duration: 10, durationUnit: '天',
    color: 'text-project-02', colorHex: '#3d8b5e', icon: 'CloudSun',
    mcu: 'STM32L433', coreTech: 'STM32L433 + ESP8266 + SHT31 + OLED',
    tags: [
      { label: 'STM32', color: 'bg-tag-bronze text-tag-bronze-text' },
      { label: 'WiFi', color: 'bg-tag-solder text-tag-solder-text' },
      { label: 'IoT', color: 'bg-tag-patina text-tag-patina-text' },
    ],
    skills: { hardware: ['STM32 基础', 'I2C 通信', 'UART/AT 命令', '传感器选型'], software: ['C 嵌入式阅读', 'ESP8266 AT', 'SNTP/NTP', 'OLED 显示'], system: ['WiFi 联网', '时钟同步', '复刻调试'], engineering: ['接线焊接', '工具链使用', '系统调试', '项目演示'] },
    hardware: [
      { name: 'STM32L433 开发板', spec: 'Cortex-M4, KE1 板兼容' },
      { name: 'ESP-01S', spec: 'ESP8266 WiFi, AT 固件' },
      { name: 'SHT31', spec: '高精度温湿度 I2C' },
      { name: 'SSD1306 OLED', spec: '0.96" 128×64 I2C' },
      { name: '蜂鸣器+按键', spec: 'PWM 报时 + 调时' },
      { name: 'PCB/面包板', spec: '桌面摆件外壳' },
    ],
    timeline: [
      { days: 'Day 1-3', title: '嵌入式基础', titleEn: 'Embedded Basics', description: 'STM32L433 入门、CubeIDE 工具链、GPIO/UART、点灯与串口', descriptionEn: 'STM32L433 intro, CubeIDE, GPIO/UART, blink & printf' },
      { days: 'Day 4-6', title: '传感器与显示', titleEn: 'Sensor & Display', description: 'SHT31 温湿度采集、SSD1306 OLED 显示', descriptionEn: 'SHT31 sensing, SSD1306 OLED display' },
      { days: 'Day 7-10', title: 'WiFi 联网与整合', titleEn: 'WiFi & Integration', description: 'ESP8266 联网、SNTP 网络授时、时钟整合、外壳组装与展示', descriptionEn: 'ESP8266 WiFi, SNTP time sync, clock integration, assembly & demo' },
    ],
    links: {
      bilibili: 'https://www.bilibili.com/video/BV1tb4y1U7Du/',
      adaptedRepo: 'https://github.com/jojojjjjj/project-02-env-monitor-mid',
    },
  },
  {
    id: '03', slug: '4mode-keyboard', number: 3,
    titleZh: '四模机械键盘', titleEn: 'KeyForge',
    subtitle: 'ESP32-S3 四模机械键盘', subtitleEn: 'ESP32-S3 quad-mode mechanical keyboard',
    // (成本 <¥500 / cost <¥500) removed — price hidden per user request (inaccurate, not rigorous as reference)
    description: '基于 ESP32-S3 的机械键盘，支持 USB HID 有线与 BLE/ESP-NOW 无线，45 键布局、74HC165 移位扫描、WS2812B 背光。夏令营主线为精简档，FOC 旋钮/语音等列为可选进阶。',
    descriptionEn: 'ESP32-S3-based mechanical keyboard with USB HID and BLE/ESP-NOW wireless, 45-key, 74HC165 shift-scan, WS2812B backlight. Summer-camp main line is a simplified tier; FOC knob/voice are optional/advanced.',
    difficulty: 4, difficultyLabel: '进阶', duration: 20, durationUnit: '天',
    color: 'text-project-03', colorHex: '#7c6bb5', icon: 'Keyboard',
    mcu: 'ESP32-S3', coreTech: 'ESP32-S3 + USB HID + BLE/ESP-NOW',
    tags: [
      { label: 'ESP32-S3', color: 'bg-tag-teal text-tag-teal-text' },
      { label: 'USB HID', color: 'bg-tag-copper text-tag-copper-text' },
      { label: 'BLE', color: 'bg-tag-bronze text-tag-bronze-text' },
    ],
    skills: { hardware: ['ESP32-S3 开发', '双层 PCB 设计', 'USB HID', '移位扫描'], software: ['C/C++', 'USB HID', 'BLE/ESP-NOW', '键位映射'], system: ['多协议切换', '电源管理', 'WS2812B 背光'], engineering: ['PCB 布线', '结构设计', '固件调试', '项目演示'] },
    hardware: [
      { name: 'ESP32-S3-WROOM-1', spec: '双核 + WiFi/BLE/USB' },
      { name: '74HC165', spec: '移位寄存器键扫描' },
      { name: '机械轴体', spec: 'Cherry 兼容 × 45' },
      { name: 'WS2812B', spec: 'RGB 背光' },
      { name: 'PCB', spec: '双层板' },
    ],
    timeline: [
      { days: 'Day 1-5', title: '基础开发', titleEn: 'Fundamentals', description: 'ESP32-S3 入门、USB HID、矩阵扫描', descriptionEn: 'ESP32-S3 intro, USB HID, matrix scan' },
      { days: 'Day 6-10', title: '无线通信', titleEn: 'Wireless', description: 'BLE/ESP-NOW、协议切换', descriptionEn: 'BLE/ESP-NOW, protocol switching' },
      { days: 'Day 11-15', title: 'PCB 设计', titleEn: 'PCB Design', description: '双层板设计、布线、DFM', descriptionEn: '2-layer PCB, routing, DFM' },
      { days: 'Day 16-20', title: '组装调试', titleEn: 'Assembly', description: '焊接组装、固件调试、展示', descriptionEn: 'Soldering, firmware debug, demo' },
    ],
    links: {
      oshwhub: 'https://oshwhub.com/ran-pang/multifunctional-keyboard',
      adaptedRepo: 'https://github.com/jojojjjjj/project-03-4mode-keyboard',
    },
  },
  {
    id: '04', slug: 'pocket-signal-generator', number: 4,
    titleZh: '口袋信号发生器', titleEn: 'WavePocket',
    subtitle: '基于 FPGA 的便携式信号发生器', subtitleEn: 'FPGA-based portable signal generator',
    description: '基于 Lattice iCE40 FPGA 的便携式信号发生器，支持正弦波、方波、三角波等多种波形输出，频率范围 1Hz-10MHz，TFT 彩屏显示与旋转编码器交互。',
    descriptionEn: 'Lattice iCE40 FPGA portable signal generator with multi-waveform output.',
    difficulty: 5, difficultyLabel: '高级', duration: 20, durationUnit: '天',
    color: 'text-project-04', colorHex: '#d45d8a', icon: 'Radio',
    mcu: 'iCE40 FPGA', coreTech: 'FPGA/Verilog + DAC + TFT',
    tags: [
      { label: 'FPGA', color: 'bg-tag-rust text-tag-rust-text' },
      { label: 'Verilog', color: 'bg-tag-olive text-tag-olive-text' },
      { label: 'DAC', color: 'bg-tag-gold text-tag-gold-text' },
    ],
    skills: { hardware: ['FPGA 开发', 'Verilog HDL', '高速 DAC', 'PCB 设计'], software: ['Verilog', '约束文件', '仿真验证', 'C 嵌入式'], system: ['DDS 算法', '时钟管理', '信号完整性'], engineering: ['FPGA 调试', '信号测量', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'iCE40-HX8K', spec: 'FPGA 开发板' },
      { name: 'DAC904', spec: '14-bit 高速 DAC' },
      { name: 'ST7735 TFT', spec: '1.8" SPI 彩屏' },
      { name: 'EC11', spec: '旋转编码器' },
      { name: 'PCB', spec: '四层板' },
    ],
    timeline: [
      { days: 'Day 1-5', title: 'FPGA 基础', titleEn: 'FPGA Basics', description: 'iCE40 开发环境、Verilog 语法、LED/按键', descriptionEn: 'iCE40 setup, Verilog, LED/button' },
      { days: 'Day 6-10', title: 'DDS 核心', titleEn: 'DDS Core', description: 'DDS 算法、DAC 驱动、波形生成', descriptionEn: 'DDS algorithm, DAC driver, waveform' },
      { days: 'Day 11-15', title: '交互显示', titleEn: 'Display & Control', description: 'TFT 显示、编码器控制、参数调节', descriptionEn: 'TFT display, encoder, parameter tuning' },
      { days: 'Day 16-20', title: '系统集成', titleEn: 'Integration', description: 'PCB 设计、焊接调试、项目展示', descriptionEn: 'PCB design, soldering, demo' },
    ],
    links: {
      oshwhub: 'https://oshwhub.com/greentor/tinyawg-signal-source',
      adaptedRepo: 'https://github.com/jojojjjjj/project-04-pocket-oscilloscope-high',
    },
  },
  {
    id: '05', slug: 'desktop-pet', number: 5,
    titleZh: '桌宠机器人', titleEn: 'DeskPet',
    subtitle: '能对话的桌面小机器人', subtitleEn: 'Chat-capable desktop companion robot',
    description: '基于 ESP32-S3 的桌宠机器人，集成语音识别、LLM 对话和 TTS 语音合成。3D 打印外壳 + LCD 表情显示，可进行自然语言交互。',
    descriptionEn: 'ESP32-S3-based desktop pet robot with STT, LLM chat, and TTS capabilities.',
    difficulty: 3, difficultyLabel: '中等', duration: 12, durationUnit: '天',
    color: 'text-project-05', colorHex: '#c9944a', icon: 'Bot',
    mcu: 'ESP32-S3', coreTech: 'ESP32-S3 + STT + LLM + TTS',
    tags: [
      { label: 'ESP32-S3', color: 'bg-tag-teal text-tag-teal-text' },
      { label: 'LLM', color: 'bg-tag-gold text-tag-gold-text' },
      { label: 'TTS', color: 'bg-tag-copper text-tag-copper-text' },
    ],
    skills: { hardware: ['ESP32-S3', 'I2S 音频', 'SPI LCD 显示', '3D 打印'], software: ['ESP-IDF C', 'LLM API', 'STT/TTS', 'WiFi'], system: ['音频流水线', '对话状态机', '低功耗管理'], engineering: ['3D 建模', '组装调试', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'ESP32-S3', spec: '双核 + WiFi+BT' },
      { name: 'ST7789 LCD', spec: '1.54" 240×240 SPI' },
      { name: 'ES8311', spec: '音频编解码 + 麦克风' },
      { name: '3D 打印外壳', spec: 'PLA' },
    ],
    timeline: [
      { days: 'Day 1-4', title: '嵌入式基础', titleEn: 'Embedded Basics', description: 'ESP32-S3 入门、I2S 音频、WiFi', descriptionEn: 'ESP32-S3 intro, I2S audio, WiFi' },
      { days: 'Day 5-9', title: 'AI 能力', titleEn: 'AI Capabilities', description: 'STT 语音识别、LLM API、TTS 合成', descriptionEn: 'STT, LLM API, TTS synthesis' },
      { days: 'Day 10-12', title: '系统集成', titleEn: 'Integration', description: '对话状态机、3D 外壳、组装展示', descriptionEn: 'Dialog state machine, 3D shell, demo' },
    ],
    links: {
      gitee: 'https://gitee.com/esp-friends/esp_sparkbot',
      other: [
        { label: '进阶原项目 · AI DesktopCat', url: 'https://github.com/AI-FanGe/AI_DesktopCat_Qwen3.5Omni' },
      ],
      adaptedRepo: 'https://github.com/jojojjjjj/project-05-desktop-pet-mid',
    },
    deepDive: {
      summaryZh: '一台能对话的桌面机器人，放在书桌前既能解压、又能把孩子从手机里拉出来一会儿。更实在的是，它是孩子亲手造的工程作品——ESP32、大模型、3D 打印——够格写进申请。',
      summaryEn: "A voice-chat desktop robot for the desk — something to decompress with and to pull your teen away from their phone for a while. More importantly, it's a project they built themselves — ESP32, LLMs, 3D printing — solid enough to write into an application.",
      audiences: [
        {
          key: 'ee-me',
          labelZh: '电子/机械工程方向',
          labelEn: 'EE/ME-Inclined Builders',
          whoZh: '如果你已经倾向于电子或机械工程方向，这个项目能让你把两边的本事各占一段、亲手做出来。电子侧从读原理图、器件识别到点亮一块真正的 PCB——ESP32-S3、ST7789 屏、BMI270 IMU、ES8311 音频编解码器，含 0805/0603 贴片焊接（也提供出厂预焊方案，初学者只需补焊排针、Type-C、FPC 等约十余处）；机械侧用 PLA/PETG 在 Cura/Bambu 里设计并打印外壳，让屏幕支架、摄像头座、底盘严丝合缝。营期结束时，你带走的是一台电路板能读懂、外壳能复刻的机器人——而因为它一通电就会开口回话，电子与机械两半不再是各做各的实验，而是同一台会动的整机。',
          whoEn: "If you already lean toward electrical or mechanical engineering, this project lets you own a genuine piece of each. On the EE side you read schematics, identify components, and bring up a real PCB — ESP32-S3, ST7789 LCD, BMI270 IMU, ES8311 codec — soldering SMD 0805/0603 parts (with a factory-pre-soldered option that leaves you only the headers, Type-C, and FPC to finish, about a dozen joints). On the ME side you design and 3D-print the enclosure in PLA/PETG (Cura/Bambu) so the screen mount, camera housing, and chassis fit and assemble cleanly. You leave camp with a self-built robot whose board you can read and whose shell you can remake — and because it talks back when you power it on, the two halves come alive together rather than as separate lab exercises.",
        },
        {
          key: 'explorer',
          labelZh: '想搞工程、方向还没定的探索者',
          labelEn: 'Direction-Still-Exploring Students',
          whoZh: '如果你确定要走工程，但具体哪个细分方向还没想清楚，这个项目是用十二天把几个主流方向一次性都试一遍的好机会。在这台整机里你会同时碰到嵌入式固件（ESP-IDF、FreeRTOS、C 语言跑在 ESP32-S3）、云端 AI 接入（LLM 的 WebSocket/HTTP、TTS、流式对话）、感知（OV2640 人脸检测、BMI270 手势）、以及数字化制造（PCB、3D 打印）。每天最让你期待的那一块，就是下一步方向最诚实的信号；而不那么来电的部分，也已经变成了你身上的实打实技能。等到演示日，你不仅知道自己真正想往哪走，身后还有一台做完的整机——而不是四个互不搭界的体验模块。',
          whoEn: "If you're confident engineering is your path but haven't yet pinned down the specific direction, this project is an efficient way to sample several at once in twelve days. Across the build you touch embedded firmware (ESP-IDF, FreeRTOS, C on the ESP32-S3), cloud AI integration (LLM over WebSocket/HTTP, TTS, streaming dialogue), perception (OV2640 face detection, BMI270 gesture), and digital fabrication (PCB, 3D printing). Which part you look forward to most each morning becomes a honest signal for your next step — and the parts that don't grab you are still skills you keep. By demo day you'll know where your enthusiasm actually points, with one finished robot behind you rather than four disconnected taster modules.",
        },
        {
          key: 'theory-to-practice',
          labelZh: '有理论基础、缺动手经验',
          labelEn: 'Theory-Solid, Hands-On-New',
          whoZh: '如果你的课本基础扎实，但还很少把一个项目从零一路做到通电点亮，这个项目正是为合上这道缝而设计的。课程从你已会的入手——ESP-IDF 环境搭建、读原理图、器件识别是头几节课而非默认前提——再带你焊板子、点亮 ST7789+LVGL 屏幕、调通 I2S 音频与 I2C 传感器，最后把 Wi-Fi、LLM 接口、TTS 串成一台能语音对话的机器人。整个过程是刻意搭好台阶的：你已经懂的部分会稳稳托住你走向还没懂的部分。当你亲手写的固件让屏幕上的小脸动起来、开口回话的那一刻，理论就不再是抽象的了。',
          whoEn: "If your textbook foundation is solid but you've rarely carried a project all the way to power-on, this is built to close exactly that gap. The curriculum meets you where you are — ESP-IDF environment setup, schematic reading, component identification are the first lessons, not assumed — then walks you through soldering the board, bringing up the ST7789+LVGL display, wiring I2S audio and I2C sensors, and finally threading Wi-Fi, the LLM API, and TTS into a working voice-chat robot. The transition is deliberate and scaffolded, so the parts you already know carry you smoothly into the parts you don't. Your theory stops being abstract the moment the firmware you wrote makes the on-screen face animate and talk back.",
        },
        {
          key: 'app-season',
          labelZh: '申请季、缺一个大项目的同学',
          labelEn: 'Application-Season, Project-Seeking',
          whoZh: '如果你在课业上下了很深的功夫，现在到了申请季正缺一个有分量的项目，那这个项目正是让这份投入开始复利增长的地方。你已经练成的本事——精读、严谨推理、把一整套系统装进脑子——会直接迁移到读 ESP32-S3 数据手册、设计 FreeRTOS 任务结构、对接 LLM 云端 API 上。你带来的是真实的优势而非短板：只搭过套件的同学，很少能像你这样去推敲固件架构。而因为这个系统从硬件到云端是真正意义上的全栈（固件、视觉、音频、网络、AI、制造），你写出来的会是一个有层次、有自己故事的原创项目——而不是一道通用练习题。等到演示日，你手里会有一台能语音对话的机器人，和一段具体、属于你、能在文书里讲得出细节的工程经历。',
          whoEn: "If you've invested deeply in coursework and now need a substantial project for application season, this is exactly where that investment compounds. The same focus you've already trained — reading carefully, reasoning precisely, holding a whole system in your head — transfers directly to reading the ESP32-S3 datasheet, designing FreeRTOS task structure, and integrating the LLM cloud API. You arrive with a real edge, not a deficit: students who've only built kits rarely reason about firmware architecture the way you can. And because the system is genuinely full-stack (embedded firmware, vision, audio, networking, AI, fabrication), it gives you a layered, original story to write — not a generic exercise. By demo day you'll have a working voice-chat robot and a specific, personal engineering journey, grounded in skills your application essays can speak to concretely.",
        },
      ],
      takeaways: [
        {
          titleZh: '3D 打印外壳：从数字模型到可制造实物',
          titleEn: '3D-printed enclosure: digital model to physical product',
          projectElementZh: '3D 打印 ESP-SparkBot 外壳（主体后壳 + 带屏幕窗口的前盖 + 摄像头/喇叭/电池仓），在 Cura/Bambu Studio 中切片，Day 4 装配到堆叠 PCB 上，使屏幕窗口、摄像头开孔与 USB 开口都对齐。',
          projectElementEn: '3D-printing the ESP-SparkBot enclosure (main rear shell + screen-mount front cover + camera/speaker/battery compartments), sliced in Cura/Bambu Studio and assembled onto the stacked PCBs on Day 4 so the screen window, camera aperture, and USB opening all align.',
          knowledgePointZh: 'STL 网格与打印方向取舍、支撑生成与层附着分析、G-code 刀轨与切片参数控制（Cura/Bambu Studio）、零件间的装配公差设计、材料选择（PLA/PETG 的 FDM vs. 光敏树脂）。',
          knowledgePointEn: 'STL mesh and print-orientation reasoning, support-generation and layer-adhesion analysis, G-code toolpath and slicer parameter control (Cura/Bambu Studio), part-to-part fit and assembly tolerance design, material selection (PLA/PETG FDM vs. photopolymer resin).',
          essayAngleZh: '把数字 STL 转化为必须容纳 1.54 寸 ST7789 屏、OV2640 摄像头模组、3W 喇叭和 2000mAh 锂电池的实体外壳，并在毫米级公差内完成装配，体现申请者能把 CAD 设计闭环到可制造实物，在设计意图与制造现实之间做工程取舍（FDM 层附着 vs. 树脂精度、支撑拆除、卡口 vs. 螺丝分模）。',
          essayAngleEn: 'Translating a digital STL into a physical enclosure that must seat a 1.54" ST7789 screen, an OV2640 camera module, a 3W speaker, and a 2000mAh LiPo within millimeter-scale tolerances shows the applicant can close the CAD-to-fabrication loop, negotiating the trade-off between design intent and manufacturing reality (FDM layer adhesion vs. resin accuracy, support removal, snap-fit vs. screw-fastened parting lines).',
        },
        {
          titleZh: '嵌入式固件：ESP32-S3 / ESP-IDF 上从启动到应用的全链路',
          titleEn: 'Embedded firmware: the boot-to-application chain on ESP32-S3 / ESP-IDF',
          projectElementZh: '用 C 语言在 ESP-IDF v5.3/v5.4 上编写 ESP32-S3 主固件：app_main.c 完成事件组/队列、netif、WiFi 与全部硬件外设（I2C、SPI、ST7789、OV2640、I2S 音频、BMI270、触摸）初始化后进入事件分发主循环。',
          projectElementEn: 'Writing the ESP32-S3 main firmware in C on ESP-IDF v5.3/v5.4: app_main.c boots NVS, the event group/queue, netif, WiFi, and all hardware peripherals (I2C, SPI, ST7789, OV2640, I2S audio, BMI270, touch), then enters the dispatch main loop.',
          knowledgePointZh: 'ESP-IDF 工业级工具链（idf.py menuconfig/build/flash/monitor 全流程）、app_main 入口与启动序列、NVS 非易失存储与分区表、esp_netif/TCP-IP 协议栈初始化、GPIO/SPI/I2C/I2S/DVP 外设驱动、双核 Xtensa LX7（16MB Flash + 8MB PSRAM）架构。',
          knowledgePointEn: 'ESP-IDF industrial toolchain (idf.py menuconfig/build/flash/monitor), app_main entry and boot sequence, NVS non-volatile storage and partition table, esp_netif/TCP-IP stack init, GPIO/SPI/I2C/I2S/DVP peripheral drivers, dual-core Xtensa LX7 (16MB Flash + 8MB PSRAM) architecture.',
          essayAngleZh: '在工业级 ESP-IDF 工具链（而非 Arduino 封装）上写出从 ESP32-S3 上电启动、初始化 NVS、TCP/IP 协议栈、WiFi 与全部硬件外设，到进入事件驱动主循环的固件，体现申请者能在资源受限的双核 MCU 上掌握从启动到应用的完整链路，其中栈大小、任务优先级与分区表都是有意的工程决策，而非被隐藏的默认值。',
          essayAngleEn: 'Writing firmware that boots the ESP32-S3, initializes NVS, the TCP/IP stack, WiFi, and every hardware peripheral, then enters an event-driven main loop on the industrial ESP-IDF toolchain (not Arduino wrappers) demonstrates the applicant commands the complete boot-to-application chain on a resource-constrained dual-core MCU, where stack sizes, task priorities, and partition tables are deliberate engineering decisions rather than hidden defaults.',
        },
        {
          titleZh: '音频编解码：从麦克风采集到 TTS 播放的编解码链路',
          titleEn: 'Audio codec: the encode/decode pipeline from mic capture to TTS playback',
          projectElementZh: '音频子系统：ES8311 编解码器 + NS4150B 3W D 类功放 + 驻极体麦克风 + 喇叭，由音频任务中的 ESP-IDF I2S 驱动完成麦克风录音、语音活动检测与 TTS 播放，并支持 A2DP 蓝牙音箱，使设备兼作蓝牙音箱。',
          projectElementEn: 'The audio subsystem: ES8311 codec + NS4150B 3W class-D amp + electret mic + speaker, driven by the ESP-IDF I2S driver in the audio task for mic recording, VAD, and TTS playback, plus an A2DP Bluetooth-audio sink so the device doubles as a BT speaker.',
          knowledgePointZh: 'I2S 串行音频协议（MCLK/BCLK/LRCK）与 DMA 缓冲、ES8311 编解码器寄存器配置（麦克偏置、PGA 增益、采样率）、PCM 数据采集与播放、WAV/PCM 解码、A2DP 蓝牙音频接收、经 D 类功放（NS4150B）的硬件/软件音频路由。',
          knowledgePointEn: 'I2S serial audio protocol (MCLK/BCLK/LRCK) and DMA buffering, ES8311 codec register configuration (mic bias, PGA gain, sampling rate), PCM data capture and playback, WAV/PCM decode, A2DP Bluetooth audio sink, hardware/software audio routing through a class-D amplifier (NS4150B).',
          essayAngleZh: '配置 I2S 编解码器、经 ES8311 ADC 采集麦克风 PCM、把 TTS 解码后的 PCM 经 ES8311 DAC 送入 D 类功放播放，体现申请者理解数字音频完整的编解码路径，把"声音"这一抽象概念落到具体的信号链路与寄存器级驱动上（麦克偏置、PGA 增益、MCLK/BCLK/LRCK、DMA 缓冲）。',
          essayAngleEn: 'Configuring an I2S codec, capturing microphone PCM through the ES8311 ADC, and feeding TTS-decoded PCM out through the ES8311 DAC into a class-D amplifier shows the applicant understands the full encode/decode path of digital audio, grounding the abstract idea of sound in concrete signal-chain and register-level driver terms (mic bias, PGA gain, MCLK/BCLK/LRCK, DMA buffering).',
        },
        {
          titleZh: '并发与架构：FreeRTOS 多任务调度与有限状态机',
          titleEn: 'Concurrency & architecture: FreeRTOS tasks and a finite state machine',
          projectElementZh: 'FreeRTOS + 有限状态机架构：state_machine.h 定义 8 个状态（INIT/IDLE/LISTENING/SPEAKING/GAMING/CHARGING/SLEEP/ERROR）与转换规则表及每状态操作函数；app_main.c 创建六个双核固定任务（显示、AI 对话、音频、传感器、状态机、维护），通过一个事件队列与一个事件组通信。',
          projectElementEn: 'The FreeRTOS + finite-state-machine architecture: state_machine.h defines 8 states (INIT/IDLE/LISTENING/SPEAKING/GAMING/CHARGING/SLEEP/ERROR) with a transition rules table and per-state ops; app_main.c creates six pinned-core tasks (display, ai_dialog, audio, sensor, state_machine, maintenance) communicating through one event queue and one event group.',
          knowledgePointZh: '有限状态机设计（状态枚举、转换规则、每状态 on_enter/on_exit/on_update/can_transition 函数指针表）、FreeRTOS 任务/队列/事件组/信号量、双核任务绑定（xTaskCreatePinnedToCore）、优先级与栈空间预算、事件驱动分发架构。',
          knowledgePointEn: 'Finite-state-machine design (state enum, transition rules, per-state on_enter/on_exit/on_update/can_transition function-pointer table), FreeRTOS task/queue/event-group/semaphore, dual-core task pinning (xTaskCreatePinnedToCore), priority and stack-size budgeting, event-driven dispatch architecture.',
          essayAngleZh: '把宠物行为建模为带 on_enter/on_exit/on_update 函数表的显式有限状态机，并用双核固定、事件队列与事件组编排六个并发 FreeRTOS 任务，体现申请者能把一个复杂的反应式系统分解为有纪律的并发单元，并合理设定优先级与栈预算，这是嵌入式软件工程的核心。',
          essayAngleEn: "Modeling the pet's behavior as an explicit finite-state machine with an on_enter/on_exit/on_update function table, and orchestrating six concurrent FreeRTOS tasks with pinned cores, an event queue, and an event group shows the applicant can decompose a complex reactive system into disciplined concurrent units with deliberate priority and stack budgets, the core of embedded software engineering.",
        },
        {
          titleZh: '嵌入式图形界面：LVGL 控件树与 ST7789 实时渲染',
          titleEn: 'Embedded GUI: LVGL widget tree and real-time rendering on ST7789',
          projectElementZh: 'Day 6 显示工作：驱动 1.54 寸 ST7789 240×240 SPI LCD，移植 LVGL 渲染天气时钟界面与宠物表情动画（12 种表情状态），显示任务以 16ms 周期通过 lv_tick_inc/lv_task_handler 以 60FPS 为目标。',
          projectElementEn: 'Day-6 display work: driving the 1.54" ST7789 240x240 SPI LCD and porting LVGL to render the weather-clock UI and animated pet expressions (12 expression states), with the display task targeting 60 FPS via lv_tick_inc/lv_task_handler on a 16 ms period.',
          knowledgePointZh: 'SPI 主机驱动、ST7789 初始化命令序列与帧缓冲推送、LVGL 控件树与 lv_task_handler 心跳、事件回调、动画与过渡、240×240 显示上的 60FPS（16ms）帧预算与 DMA/分块缓冲区大小设计。',
          knowledgePointEn: 'SPI master driver, ST7789 init command sequence and frame-buffer pushing, LVGL widget tree and lv_task_handler tick, event callbacks, animation/transition, 60-FPS (16 ms) frame budget and DMA/partial-buffer sizing on a 240x240 display.',
          essayAngleZh: '在 240×240 ST7789 SPI 屏上用 LVGL 以 16ms（60FPS）帧预算、分块行帧缓冲与周期调用 lv_tick_inc/lv_task_handler 的动画任务渲染界面，体现申请者能在内存受限的 MCU 上交付实时 GUI，在帧率、缓冲区大小与驱动正确性之间做工程权衡，而非把显示屏当作黑箱。',
          essayAngleEn: 'Driving a 240x240 ST7789 LCD over SPI through LVGL with a 16 ms (60 FPS) frame budget, a partial-line frame buffer, and an animation-task that calls lv_tick_inc/lv_task_handler shows the applicant can deliver a real-time GUI on a memory-constrained MCU, balancing frame rate, buffer size, and driver correctness rather than treating the display as a black box.',
        },
        {
          titleZh: '对话式 AI 管线：边缘端的 STT→LLM→TTS 全流程',
          titleEn: 'Conversational AI pipeline: STT → LLM → TTS on an edge device',
          projectElementZh: '对话式 AI 管线：ESP-SR 本地唤醒词/语音命令识别，llm_dialog.c 调用多家大模型 API（DeepSeek / ChatGPT-OpenAI / 文心 / 豆包）并以流式 token 回调（llm_dialog_chat_stream）接收，再向音频任务派发 TTS 事件进行播放。',
          projectElementEn: 'The conversational AI pipeline: ESP-SR on-device wake-word/voice-command recognition, llm_dialog.c calling multi-provider LLM APIs (DeepSeek / ChatGPT-OpenAI / Wenxin / Doubao) with a streaming-token callback (llm_dialog_chat_stream), then dispatching a TTS event to the audio task for playback.',
          knowledgePointZh: '本地唤醒词/命令识别（ESP-SR）、带流式响应的 HTTP 客户端、按供应商构造 JSON 请求体、多轮对话上下文管理、流式 token 回调、云端 TTS 合成、跨 FreeRTOS 任务的事件驱动 STT→LLM→TTS 编排。',
          knowledgePointEn: 'On-device wake-word/command recognition (ESP-SR), HTTP client with streaming responses, per-provider JSON request body construction, multi-turn conversation context management, streaming-token callback, cloud TTS synthesis, event-driven STT→LLM→TTS orchestration across FreeRTOS tasks.',
          essayAngleZh: '把本地唤醒词/语音命令识别、支持多供应商并以流式 token 回调接收的云端大模型、以及 TTS 合成串成一个可响应的对话循环，体现申请者能把异构 AI 系统集成为一个面向用户的连贯产品，并处理流式传输、延迟、多供应商请求格式差异，以及 AI 任务与音频任务之间的事件驱动交接。',
          essayAngleEn: 'Chaining on-device wake-word/voice-command recognition, a provider-abstracted cloud LLM with streaming-token callbacks, and TTS synthesis into one responsive dialogue loop shows the applicant can integrate heterogeneous AI systems into a coherent user-facing product, handling streaming, latency, multi-provider request-format differences, and event-driven handoff between the AI task and the audio task.',
        },
        {
          titleZh: '传感器融合与交互：BMI270 IMU 到手势输入',
          titleEn: 'Sensor fusion & interaction: BMI270 IMU to gesture input',
          projectElementZh: 'Day 5 传感器工作：在 100Hz 传感器轮询任务中经 I2C 读取 BMI270 6 轴 IMU（touch_motion_detect_gesture），分类双击/摇晃/倾斜手势，经事件队列驱动赛博骰子与手势控制的 2048 游戏。',
          projectElementEn: 'Day-5 sensor work: reading the BMI270 6-axis IMU over I2C in the 100 Hz sensor-poll task (touch_motion_detect_gesture), classifying double-tap/shake/tilt gestures that drive the cyber-dice and the gesture-controlled 2048 game through the event queue.',
          knowledgePointZh: 'I2C 总线协议与 BMI270 寄存器读取（芯片 ID 校验、PWR_CTRL、加速度/陀螺仪数据寄存器）、加速度计/陀螺仪单位与换算、基于阈值的手势检测算法、定频（100Hz）传感器轮询与经 FreeRTOS 队列的事件分发。',
          knowledgePointEn: 'I2C bus protocol and BMI270 register reading (chip-ID check, PWR_CTRL, accel/gyro data registers), accelerometer/gyroscope units and scaling, threshold-based gesture detection algorithms, fixed-rate (100 Hz) sensor polling and event dispatch via FreeRTOS queues.',
          essayAngleZh: '以固定 100Hz 经 I2C 读取 6 轴 IMU 原始数据，并解算双击/摇晃/倾斜手势用于驱动赛博骰子与手势控制的 2048 游戏，体现申请者理解从传感器到交互的映射，能把噪声惯性信号滤波为可靠的人机输入，这是物理计算的根基。',
          essayAngleEn: 'Reading raw 6-axis IMU data over I2C at a fixed 100 Hz and computing double-tap / shake / tilt gestures that drive the cyber dice and a gesture-controlled 2048 game shows the applicant understands sensor-to-interaction mapping, filtering noisy inertial signals into reliable human input, the foundation of physical computing.',
        },
        {
          titleZh: 'Wi-Fi 与云端 API：把 MCU 接入互联网服务',
          titleEn: 'Wi-Fi & cloud APIs: connecting an MCU to internet services',
          projectElementZh: 'Day 9 网络工作：带事件驱动连接/失败位的 WiFi station 连接、HTTP 客户端 + cJSON 解析、NTP 时间同步，以及 IP 定位 + 天气 REST API，解析结果在 LVGL 显示上渲染实时天气时钟。',
          projectElementEn: 'Day-9 networking work: WiFi station connection with event-driven connect/fail bits, HTTP client + cJSON parsing, NTP time sync, and an IP-geolocation + weather REST API whose parsed results render the live weather-clock on the LVGL display.',
          knowledgePointZh: 'WiFi station 连接与事件驱动重连（事件组位）、HTTP 客户端 GET/POST、嵌入式 C 下的 cJSON 解析、NTP 时间同步、IP 定位与天气 REST API 调用、API 密钥与凭证在 NVS 中的管理。',
          knowledgePointEn: 'WiFi station connection and event-driven reconnect (event group bits), HTTP client GET/POST, cJSON parsing on embedded C, NTP time synchronization, IP-geolocation and weather REST API consumption, API-key/credential handling in NVS.',
          essayAngleZh: '让设备连接 WiFi、用 NTP 同步时间、调用 IP 定位+天气 REST API 并用 cJSON 解析响应，体现申请者能把微控制器接入互联网服务，处理 station 模式事件生命周期、HTTP 请求/响应、嵌入式 JSON 解析，以及离线玩具不会遇到的失败模式（断连/重连），这是物联网工程的基石。',
          essayAngleEn: 'Connecting the device to WiFi, synchronizing time over NTP, and consuming an IP-geolocation-plus-weather REST API with cJSON-parsed responses shows the applicant can bridge a microcontroller to internet services, handling the station-mode event lifecycle, HTTP request/response, embedded JSON parsing, and failure modes (disconnect/reconnect) that an offline toy never faces, the basis of IoT engineering.',
        },
      ],
    },
  },
  {
    id: '06', slug: 'weather-cube', number: 6,
    titleZh: '天气魔方', titleEn: 'WeatherCube',
    subtitle: 'ESP8266 桌面天气站', subtitleEn: 'ESP8266 desktop weather station',
    description: '使用 ESP8266 驱动 OLED 屏，通过和风天气 API 获取实时天气、NTP 同步时间，3D 打印立方体外壳，桌面摆件级完成度。',
    descriptionEn: 'ESP8266-driven OLED weather station with 和风 weather API, NTP, and 3D-printed cube enclosure.',
    difficulty: 1, difficultyLabel: '入门', duration: 12, durationUnit: '天',
    color: 'text-project-06', colorHex: '#3a9b9b', icon: 'Thermometer',
    mcu: 'ESP8266', coreTech: 'ESP8266 + OLED + WiFi + 和风API',
    tags: [
      { label: 'ESP8266', color: 'bg-tag-teal text-tag-teal-text' },
      { label: 'OLED 显示', color: 'bg-tag-patina text-tag-patina-text' },
      { label: 'WiFi', color: 'bg-tag-solder text-tag-solder-text' },
    ],
    skills: { hardware: ['ESP8266 开发', 'I2C OLED', 'HTTP API', '3D 打印'], software: ['Arduino IDE', 'U8g2 库', 'WiFi/NTP', 'JSON 解析'], system: ['天气 API', '数据刷新策略', 'UI 布局'], engineering: ['3D 建模', '组装调试', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'ESP8266 (ESP-01S)', spec: 'WiFi 内置' },
      { name: 'SSD1306 OLED', spec: '0.96" 128×64 I2C' },
      { name: '和风天气 API', spec: 'HTTPS RESTful' },
      { name: '3D 打印外壳', spec: 'PLA 立方体' },
    ],
    timeline: [
      { days: 'Day 1-3', title: '入门', titleEn: 'Getting Started', description: 'ESP8266 入门、Arduino IDE、Blink', descriptionEn: 'ESP8266 intro, Arduino IDE, Blink' },
      { days: 'Day 4-8', title: '显示与联网', titleEn: 'Display & WiFi', description: 'OLED 驱动、和风天气 API、JSON 解析', descriptionEn: 'OLED driver, weather API, JSON parse' },
      { days: 'Day 9-12', title: '整合与展示', titleEn: 'Integration & Demo', description: 'NTP 时间、外壳组装、项目展示', descriptionEn: 'NTP, enclosure, demo' },
    ],
    links: {
      github: 'https://github.com/bilibilifmk/ESP_weather_Cube',
      adaptedRepo: 'https://github.com/jojojjjjj/project-06-weather-cube-easy',
    },
  },
  {
    id: '07', slug: 'bipedal-wheeled-robot', number: 7,
    titleZh: '轮足机器人', titleEn: 'BipedBot',
    subtitle: '双足轮式平衡机器人', subtitleEn: 'Bipedal wheeled balancing robot',
    description: '基于 ESP32 的轮足机器人，结合双足步态和轮式运动。使用 PID 控制实现自平衡，MPU6050 姿态检测，支持遥控与自主运动模式。',
    descriptionEn: 'ESP32-based bipedal wheeled robot with PID self-balancing and MPU6050 IMU.',
    difficulty: 4, difficultyLabel: '进阶', duration: 12, durationUnit: '天',
    color: 'text-project-07', colorHex: '#d45050', icon: 'Footprints',
    mcu: 'ESP32', coreTech: 'ESP32 + PID + MPU6050 + FOC',
    tags: [
      { label: 'ESP32', color: 'bg-tag-teal text-tag-teal-text' },
      { label: 'PID', color: 'bg-tag-rust text-tag-rust-text' },
      { label: 'FOC', color: 'bg-tag-gold text-tag-gold-text' },
    ],
    skills: { hardware: ['ESP32 开发', 'FOC 电机控制', 'IMU 姿态解算', '模块化接线'], software: ['C++ (PlatformIO)', 'PID 算法', 'FOC 控制', '遥控协议'], system: ['运动控制', '状态机', '通信架构'], engineering: ['机械设计', '系统调试', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'ESP32 开发板', spec: '双核 + WiFi+BT' },
      { name: 'MPU6050', spec: '六轴 IMU' },
      { name: '2808 BLDC', spec: '无刷电机 ×2' },
      { name: 'StackForce Dual', spec: 'FOC 驱动板' },
      { name: '3D 打印结构件', spec: 'PLA' },
    ],
    timeline: [
      { days: 'Day 1-4', title: '嵌入式基础', titleEn: 'Embedded Basics', description: 'ESP32 入门、PWM 输出、IMU 读取', descriptionEn: 'ESP32 intro, PWM, IMU read' },
      { days: 'Day 5-8', title: '电机与平衡控制', titleEn: 'Motor & Balance', description: 'FOC 控制、PID 调参、平衡控制', descriptionEn: 'FOC, PID tuning, balance' },
      { days: 'Day 9-12', title: '系统集成与展示', titleEn: 'Integration & Demo', description: '结构组装、系统调试、项目展示', descriptionEn: 'Assembly, debug, demo' },
    ],
    links: {
      gitee: 'https://gitee.com/StackForce/bipedal_wheeled_robot',
      adaptedRepo: 'https://github.com/jojojjjjj/project-07-bipedal-wheeled-robot-high',
    },
    deepDive: {
      summaryZh: '两轮自平衡机器人，全手工制作。耗时12天，从裸板焊接、平衡代码编写到PID调参全独立完成。支持手机蓝牙遥控前进后退，机身外壳自主设计3D打印。从不稳到站稳，完整经历了一个小型机电系统的诞生。',
      summaryEn: 'A two-wheeled self-balancing robot, built entirely by hand. Over 12 days — bare-board soldering, writing the balance code, PID tuning — every step done independently. It drives forward and back by phone Bluetooth, with a self-designed, 3D-printed shell. From wobbling to standing steady, the student lives the birth of a small electromechanical system end to end.',
      audiences: [
        {
          key: 'ee-me',
          labelZh: '电子/机械工程方向',
          labelEn: 'EE/ME-Inclined Builders',
          whoZh: '如果你已经倾向于电子或机械工程方向，这个项目把两边的本事各交一段到你手上，并且要求它们在同一台机器里合在一起、自己站稳。电子侧是真刀真枪的控制：用 SimpleFOC 驱动 2808 无刷电机做磁场定向控制（FOC）、读编码器反馈、I2C 读取 MPU6050 六轴姿态，再调通直立环+速度环+转向环的串级 PID，让倒立摆真的不倒——这正是机器人、电机驱动、机电一体化最核心的反馈控制。机械侧用 Fusion 360 建模、PLA 打印底盘与轮足结构，让轮距、电机座、电池仓对得上、重心落到该落的位置。你手上已有的——焊过几个套件、写过几段 Arduino——是合理的起点而不是缺口：到第十二天，你带走的是一块能自己调试的板子、一组能重新整定的控制器、和一个能自己改版的外壳，全在同一台能自己站稳的整机里。而因为它一通电就拒绝倒下，电子与机械两半不再是各做各的实验，而是同一台会动的整机。',
          whoEn: 'If you already lean toward electrical or mechanical engineering, this project hands you a genuine slice of each — and fuses them in one machine that has to keep itself upright. On the EE side you drive a 2808 BLDC motor with field-oriented control (SimpleFOC), read the encoder, talk to the MPU6050 over I2C, and tune a cascade PID (upright + speed + turn loops) until the inverted pendulum holds its balance — the kind of feedback-control work that sits at the heart of robotics, motor drives, and mechatronics. On the ME side you model the chassis and leg structures in Fusion 360 and print them in PLA, so that the wheelbase, motor mounts, and battery bay line up and the center of mass lands where the math said it should. You arrive with whatever you already know — a soldered kit, a few Arduino sketches — and that is a fair starting point, not a gap: by day twelve you leave with a board you can debug, a controller you can retune, and a frame you can redesign, all in the same self-balancing robot. And because it literally refuses to fall over the moment you power it on, the electronics and the mechanics stop being separate lab exercises and become one living machine.',
        },
        {
          key: 'explorer',
          labelZh: '想选工程、方向还没定的探索者',
          labelEn: 'Direction-Still-Exploring Students',
          whoZh: '如果你确定要选工程，但具体往哪个细分方向走还没想清楚，这个项目是用十二天把几个主流方向一次性都摸一遍的好机会——而且它们都装在同一台能自己站稳的机器人里。在这台整机中你会同时碰到嵌入式固件（在 PlatformIO 里用 C++ 写 ESP32、I2C 读 MPU6050、PWM 驱动）、电机与控制理论（用 SimpleFOC 库对 2808 无刷电机做 FOC 磁场定向控制，再手调直立环+速度环+转向环的串级 PID）、物理建模（倒立摆的传递函数，搞懂它为什么不会倒）、无线通信（蓝牙/WiFi 遥控和握手指令协议）、以及数字化制造（Fusion 360 建模、PLA 3D 打印结构件）。每天最让你期待的那一块，就是下一步方向最诚实的信号；而不那么来电的部分，也已经变成了你身上的实打实技能。等到演示日，你不仅知道自己真正想往哪走，身后还有一台能两轮自平衡、听你手机指挥的整机——而不是一堆互不搭界的体验模块。',
          whoEn: "If you're set on engineering but haven't pinned down the specific direction yet, this project is an efficient way to sample several at once in twelve days — all inside one machine that holds itself up. Across the build you touch embedded firmware (C++ on the ESP32 in PlatformIO, reading the IMU over I2C, driving PWM), motor control and control theory (FOC field-oriented control on the 2808 BLDC with the SimpleFOC library, then a cascaded PID loop — upright / speed / turn — tuned by hand), physical modeling (the inverted-pendulum transfer function behind why it stays up), wireless comms (Bluetooth/WiFi remote control and a handshaking protocol), and digital fabrication (modeling parts in Fusion 360 and 3D-printing them in PLA). Whichever day you look forward to most is the most honest signal for your next step — and the parts that don't grab you are still skills you keep. By demo day you know where your interest actually points, and behind you stands a robot that balances on two wheels and obeys your phone — not a pile of disconnected taster modules.",
        },
        {
          key: 'theory-to-practice',
          labelZh: '有理论基础、缺动手经验',
          labelEn: 'Theory-Solid, Hands-On-New',
          whoZh: '如果你的物理和数学底子不错——牛顿定律、矢量、一点微积分，可能还翻过控制理论的章节——但还很少把一台真正的设备从零一路做到通电、再让它靠自己站稳，这个项目正是为合上这道缝而设计的。课程从你已会的入手：PlatformIO 环境搭建、ESP32 的 GPIO 与 I2C、读 MPU6050 六轴原始数据是头几节课而非默认前提。再带你一步步往上走——PWM 驱动 2808 无刷电机、用 SimpleFOC 把磁场定向控制跑通、推导你在课堂里已有感觉的倒立摆传递函数、最后把串级 PID（直立环+速度环+转向环）调到机器人真的稳稳站住。整个过程是刻意搭好台阶的：你已经掌握的理论会稳稳托住你走向还没碰过的部分——焊线、接线、Fusion 360 建模、3D 打印结构件。当你亲手调的参数第一次让机器人自己站稳、手机蓝牙一推它就往前走的那一刻，那些方程就不再是纸上的了。',
          whoEn: "If you've done well in physics and math — Newton's laws, vectors, a bit of calculus, maybe a chapter on control systems — but you've rarely carried a real device all the way to power-on and stood it up on its own, this project is built to close exactly that gap. The curriculum meets you where you are: PlatformIO environment setup, ESP32 GPIO and I2C, and reading the MPU6050's raw six-axis data are the first few lessons, not assumed prerequisites. From there it climbs in deliberate steps — PWM driving the 2808 BLDC, bringing it up under SimpleFOC field-oriented control, deriving the inverted-pendulum transfer function you already sense from class, then tuning the cascaded PID (balance + speed + steering loops) until the robot actually holds its balance. The scaffolding is intentional: the theory you already command steadies you through the parts you don't — soldering, wiring, Fusion 360 modeling, 3D-printing the frame. Your equations stop being abstract the moment a gain you tuned yourself keeps the robot standing steady for the first time, and the phone in your hand drives it forward by Bluetooth.",
        },
        {
          key: 'app-season',
          labelZh: '申请季、缺一个大项目的同学',
          labelEn: 'Application-Season, Project-Seeking',
          whoZh: '如果你一直把重心放在课业和学术上，到了申请季才发觉还缺一个有分量的项目来撑起文书，那这个项目正是让这份投入开始复利增长的地方。你已经练成的本事——精读、严谨推理、把一整套量化系统装进脑子——会直接迁移到 Day 4 推导倒立摆的传递函数、Day 6 整定串级 PID 的三个环（直立环、速度环、转向环）、读 MPU6050 的 I2C 寄存器表上。你带来的是真实的优势而非短板：只搭过套件的同学，很少能像你这样去追问"为什么速度环必须慢于直立环"。而因为这台整机是从 FOC 力矩控制、IMU 姿态融合、串级 PID，到蓝牙/WiFi 遥控、Fusion 360 建模与 3D 打印结构件一路打通的，十二天里你从空白的 PlatformIO 工程走到一台能自己站稳的机器人，写出来的会是一个有层次、有自己故事的原创项目——而不是一道通用练习题。等到演示日，你手里会有一台响应你调参、稳稳站住的轮足机器人，和一段具体、属于你、能在文书里讲得出细节的工程经历。',
          whoEn: "If you've poured yourself into coursework and now, entering application season, realize you're missing one substantial project to anchor your file, this is where that effort starts to compound. The strengths you've already trained — disciplined study, careful reasoning, holding a quantitative system in your head — transfer directly to deriving the inverted pendulum transfer function on Day 4, tuning the cascaded PID's three loops (balance, speed, steering) on Day 6, and reading the MPU6050's I2C register map. You arrive with a real edge, not a deficit: students who've only assembled kits rarely reason about why the speed loop must lag the balance loop the way you can. And because this build runs genuinely end-to-end — FOC torque control on the 2808 BLDC motors, IMU attitude fusion, cascaded PID, Bluetooth/WiFi teleoperation, Fusion 360 modeling and 3D-printed structural parts — over twelve days you go from an empty PlatformIO project to a robot that stands on its own, giving you a layered, original story rather than a generic exercise. By demo day you'll have a self-balancing robot that responded to your tuning, and a specific, personal engineering journey your application essays can speak to concretely.",
        },
      ],
      takeaways: [
        {
          titleZh: '3D 打印结构件：Fusion 360 参数化建模与强度-重量-重心的工程取舍',
          titleEn: '3D-printed chassis: parametric modeling and the design trade-off between strength, weight, and center of gravity',
          projectElementZh: 'Day 10 工作：获取并分析 StackForce 开源模型集（gitee.com/StackForce/bipedal_wheeled_robot，含 框架.stl、大腿1~4.stl、前/后小臂.stl、电机固定.stl、舵机接口.stl、轮毂.stl、电池架.stl、上盖.stl 等十余件），在 Fusion 360 中基于原始 STL 修改并定制零件——把电池仓改为适配本项目 3S 11.1V 锂电池包、把轮毂轴孔从 5mm 改为 8mm 以适配不同 BLDC 电机轴、为 ESP32 开发板设计带 2.5mm 内径固定柱与 USB 缺口的安装座；在 Cura 中按受力件（层高 0.15mm、壁厚 2.0mm、填充 30-50% 陀螺仪图案、树状支撑）与装饰件（0.20mm、1.2mm 壁厚、15-20% 填充）分别切片，PLA 打印后打磨试装、锉刀微调公差，最终装配到 StackForce 框架上。',
          projectElementEn: "Day 10 work: obtaining and analyzing the StackForce open-source model set (gitee.com/StackForce/bipedal_wheeled_robot, files including 框架.stl, 大腿1-4.stl, 前/后小臂.stl, 电机固定.stl, 舵机接口.stl, 轮毂.stl, 电池架.stl, 上盖.stl), then in Fusion 360 modifying and customizing parts — e.g. redesigning the battery holder to fit the project's 3S 11.1V lithium pack, adjusting wheel-hub bore from 5mm to 8mm to fit a different BLDC motor shaft, and designing an ESP32 dev-board mount with 2.5mm-ID mounting posts and a USB-port notch — slicing each part in Cura with differentiated settings (load-bearing parts: 0.15mm layer height, 2.0mm walls, 30-50% gyroid infill, tree supports; decorative covers: 0.20mm, 1.2mm walls, 15-20% infill) and printing in PLA, then hand-fitting and filing to tolerance before final assembly onto the StackForce frame.",
          knowledgePointZh: 'Fusion 360 参数化建模流程（草图→尺寸约束/几何约束→拉伸/旋转→倒角/圆角→导出 STL）、零件间装配公差设计（针对 FDM 收缩与螺丝配合预留 0.2-0.3mm 间隙）、Cura 切片参数控制（层高、壁厚线数、填充密度/图案、树状 vs 普通支撑、裙边/底座附着）、FDM 层附着与打印朝向取舍、针对倒立摆机器人的重心控制设计约束（电池下沉居中、IMU 靠近旋转轴、重型件对称布置）、强度与重量平衡（受力件壁厚≥3mm、非受力件 1.5-2mm、不含电池总重<500g）。',
          knowledgePointEn: 'Parametric 3D modeling workflow in Fusion 360 (sketch → dimension/constraint → extrude/revolve → fillet/chamfer → STL export), part-to-part assembly tolerance design (0.2-0.3mm clearance for FDM shrinkage and screw fit), Cura slicer parameter control (layer height, wall count, infill density/pattern, tree vs. normal supports, brim/skirt adhesion), FDM layer-adhesion and print-orientation reasoning, center-of-gravity control as a design constraint specific to an inverted-pendulum robot (battery low and centered, IMU near the rotation axis, symmetric heavy-component layout), strength-to-weight balancing (load-bearing walls ≥3mm vs. non-load-bearing 1.5-2mm, target <500g excluding battery).',
          essayAngleZh: '用 PLA 打印并反复修改 StackForce 框架与电池仓/IMU 安装座，使最重的 3S 电池下沉到轮轴正下方、IMU 贴近俯仰轴，体现申请者理解自平衡机器人首先是机械问题：倒立摆的稳定裕度由零件几何与打印朝向决定，电机座壁厚、0.2-0.3mm 装配公差、受力件填充率都不是装饰，而是直接关系到控制器能否成立的工程取舍——这是把 CAD 闭环到可制造实物、并让结构与控制算法互相成就的能力。',
          essayAngleEn: "Printing the robot's structural parts in PLA and iteratively modifying the StackForce frame so the 3S battery sits low and the MPU6050 mounts near the pitch axis shows the applicant understands that a self-balancing robot is a mechanical system first: the inverted-pendulum controller's margin of stability is set by part geometry and print orientation, and decisions like wall thickness on the motor mount or 0.2-0.3mm assembly tolerances are deliberate engineering trade-offs tied to the control problem, not styling choices.",
        },
        {
          titleZh: 'ESP32 嵌入式固件与 PlatformIO/C++ 工具链：从板级配置到 10ms 控制循环',
          titleEn: 'ESP32 firmware & the PlatformIO/C++ toolchain: from board config to a 10 ms control loop',
          projectElementZh: 'Day 1 学员在 VSCode + PlatformIO 下用 C++ 编写第一个固件（Blink、SOS、呼吸灯）并跑通编译烧录链路；完整项目的 software/src 则展示了后续各模块要填入的结构：platformio.ini 声明 espressif32 平台、esp32dev 板型、Arduino 框架、lib_deps 拉取 ElectronicCats/MPU6050 + askuric/SimpleFOC + madhephaestus/ESP32Encoder 三库、-O2 编译优化、921600 上传波特率、115200 监视波特率；config.template.h 把每个外设映射到物理 GPIO——两路电机的 PWM（GPIO25/27）与方向（26/14）、编码器（32/33/4/16）、I2C SDA/SCL（21/22，MPU6050 地址 0x68）、电池 ADC（35）；main.cpp 运行 setup()→loop()→10ms controlLoop() 三层骨架与四状态状态机（IDLE/BALANCING/REMOTE_CONTROL/FALLING），供后续 PID 代码填入。',
          projectElementEn: 'Day 1 students set up the VSCode + PlatformIO toolchain and write their first C++ firmware (Blink, SOS, breathing-LED) in src/main.cpp for the ESP32, learning the platformio.ini that the full project later fills in (platform=espressif32, board=esp32dev, framework=arduino, lib_deps for MPU6050/SimpleFOC/ESP32Encoder, -O2 optimization, 921600-baud upload, 115200 monitor). The committed software/src then exposes the structure the rest of the project fills: config.template.h maps every peripheral to physical GPIO — PWM (25/27) and direction (26/14) for the two motors, encoders (32/33/4/16), I2C SDA/SCL (21/22) for the MPU6050 at 0x68, an ADC pin (35) for battery monitoring — and main.cpp runs a setup()->loop()->10 ms controlLoop() skeleton with a four-state machine (IDLE/BALANCING/REMOTE_CONTROL/FALLING) that the PID code drops into.',
          knowledgePointZh: 'PlatformIO 工具链（platformio.ini：platform=espressif32、board=esp32dev、framework=arduino、lib_deps 拉取 ElectronicCats/MPU6050 + askuric/SimpleFOC + madhephaestus/ESP32Encoder 三库、-O2 编译优化、921600 上传波特率 / 115200 监视波特率）、esp32dev 板型对应的 240MHz 双核 Xtensa MCU + 520KB SRAM + 片内 WiFi/BT、GPIO 复用与仅输入引脚约束（GPIO 34/35/36/39 不能做 PWM）、电机驱动的 PWM 频率/分辨率权衡（20kHz/8-bit）、I2C 总线与 MPU6050 @ 0x68 从机地址、ADC 分压电池监测、Arduino 框架的 setup()/loop() 结构、以及用 millis() 实现固定 10ms（100Hz）周期的定时控制循环。',
          knowledgePointEn: 'PlatformIO toolchain (platformio.ini: platform=espressif32, board=esp32dev, framework=arduino, lib_deps pulling ElectronicCats/MPU6050 + askuric/SimpleFOC + madhephaestus/ESP32Encoder, -O2 build flags, 921600-baud upload / 115200 monitor), the dual-core Xtensa MCU @ 240 MHz with 520 KB SRAM and integrated WiFi/BT targeted by the esp32dev board, GPIO multiplexing and input-only pins (GPIO 34/35/36/39 cannot do PWM), PWM frequency/resolution trade-offs (20 kHz / 8-bit) for motor drive, I2C bus with MPU6050 @ 0x68, ADC battery monitoring via voltage divider, Arduino-framework setup()/loop() structure, and a timed control loop driven by millis() at a fixed 10 ms (100 Hz) period.',
          essayAngleZh: '在 PlatformIO（VSCode + platformio.ini 声明板型/框架/库依赖/编译优化）而非"一键编译"的 Arduino IDE 上用 C++ 写出机器人主固件 main.cpp，把每一个外设映射到 config.h 里具体的物理 GPIO 引脚，并搭建 setup()→loop()→10ms controlLoop() 三层结构与四状态状态机（IDLE/BALANCING/REMOTE_CONTROL/FALLING）骨架供后续 PID 代码填入，体现申请者已经在用大学课程级别的嵌入式开发流程——引脚分配、编译选项、实时循环周期都是有据可查的工程决策，而非被图形化 IDE 隐藏的默认值，这正是"提前使用大学级硬件/工具链"的可信证据。',
          essayAngleEn: "Building the robot's main firmware in C++ on the PlatformIO toolchain (VSCode + platformio.ini pinning board/framework/lib_deps/-O2) rather than a click-to-compile IDE, mapping every peripheral to a physical GPIO in a config.h header, and writing a setup()->loop()->10 ms controlLoop() skeleton with a four-state state machine (IDLE/BALANCING/REMOTE_CONTROL/FALLING) that the later PID code drops into, shows the applicant already works at the university-course level of embedded development — making explicit, defensible engineering decisions about pin assignment, compile flags, and real-time loop timing that a beginner-friendly IDE keeps hidden.",
        },
        {
          titleZh: 'FOC 磁场定向控制与 BLDC 驱动：从六步换向到矢量力矩',
          titleEn: 'FOC field-oriented control & BLDC drive: from six-step commutation to vector torque',
          projectElementZh: 'Day 2 学员经 StackForce Dual FOC 驱动板驱动两只带编码器的 2808 BLDC 电机：先用手转轴验证正交编码器 4 状态转换表与 4 倍频解码（11 线 → 44 计数/圈），再接 A/B/C 三相动力线，在 software/src/motor_control.cpp 中配置 ESP32 LEDC PWM（20kHz/8-bit、左电机通道 0、右电机通道 1）。已发布的 MotorControl 类通过 setSingleMotor() 闭合回路：施加 MOTOR_DEAD_ZONE=30 的死区补偿（低于此 PWM 电机不启动，故小指令被抬到死区边界）、并在 setSpeed() 中把右电机方向取反以抵消镜像安装。FOC 矢量闭环本身——BLDCMotor(7 极对) + BLDCDriver3PWM、motor.initFOC()/loopFOC() 让定子磁场与转子保持 90°——作为 Day 2 的进阶选做 SimpleFOC 练习教授（并在 MotorControl::initFOC() 中以预留桩形式留给学生扩展）；该课解释了为何电机是一个由转子角度反馈支配的系统，而非黑箱。',
          projectElementEn: "On Day 2 students drive two 2808 BLDC motors with encoders via the StackForce Dual FOC driver board: first reading the quadrature encoder by hand to verify the 4-state transition table and 4x decoding (11 lines → 44 counts/rev), then wiring the A/B/C phase leads and configuring ESP32 LEDC PWM at 20 kHz/8-bit (left motor channel 0, right motor channel 1) in software/src/motor_control.cpp. The released MotorControl class closes the loop with setSingleMotor(), which applies a MOTOR_DEAD_ZONE=30 dead-zone compensation (motors stall below this PWM, so small commands are boosted to the dead-zone edge) and inverts the right motor's direction in setSpeed() to offset its mirrored mounting. The FOC vector loop itself — BLDCMotor(7 pole pairs) + BLDCDriver3PWM, motor.initFOC()/loopFOC() keeping the stator field at 90° to the rotor — is taught as the day-02 advanced/optional SimpleFOC exercise (and reserved as a stub in MotorControl::initFOC() for students to extend); the lesson explains why a motor is a rotor-angle-feedback system rather than a black box.",
          knowledgePointZh: 'BLDC 三相定子/转子结构与六步换向、FOC 磁场定向控制信号链（转子角度 → Clarke 变换 → Park 变换 → PI 电流控制 → 逆 Park → 逆 Clarke → SVPWM 三相输出）、定子磁场与转子磁场保持 90° 夹角以获最大力矩的原理、增量式正交编码器 A/B 相 90° 相位差解码与 4 倍频（11 线 → 44 计数/圈）、ESP32 LEDC PWM 通道/占空比/分辨率配置（左电机通道 0、右电机通道 1）、PWM 频率高于可听频段（20kHz）的取舍、电机死区非线性与补偿（MOTOR_DEAD_ZONE=30）、镜像安装的方向取反。',
          knowledgePointEn: 'BLDC three-phase stator/rotor structure and six-step commutation, FOC field-oriented control signal chain (rotor angle → Clarke transform → Park transform → PI current control → inverse Park → inverse Clarke → SVPWM three-phase output), the 90° stator-rotor field angle for maximum torque, incremental quadrature encoder A/B-phase 90° phase-difference decoding and 4x quadrature multiplication (11-line → 44 counts/rev), ESP32 LEDC PWM channel/duty/resolution configuration (left motor ch0 / right motor ch1), PWM frequency above the audible band (20 kHz), motor dead-zone nonlinearity and compensation (MOTOR_DEAD_ZONE=30), mirrored-mounting direction inversion.',
          essayAngleZh: '把 2808 BLDC 驱动到"可控出力"而非"通电就转"——在 motor_control.cpp 里把 PWM 频率设到 20kHz 越过人耳听阈、在 setSingleMotor() 中施加 30 的死区补偿修正低占空比下电机不启动的非线性、并把右电机方向取反以抵消镜像安装——体现申请者把电机理解为一个机电系统，而非"给电压就转"的黑箱。Day 2 课程进一步把这一理解推进到 FOC 磁场定向控制：让定子磁场与转子保持 90° 夹角以获最大力矩（Clarke→Park→PI→逆 Park→SVPWM 信号链，由 SimpleFOC 的 initFOC()/loopFOC() 封装）——作为进阶选做练习，它解释了电机为何如此表现。其中的取舍（PWM 频率 vs. 开关损耗、死区 vs. 线性度、电压限制保安全）都是有意为之的工程决策，是电机控制工程的根基。',
          essayAngleEn: "Driving the 2808 BLDC so it produces controllable torque rather than just spinning wild — setting 20 kHz PWM above the audible band, applying a 30-count dead-zone compensation in setSingleMotor() so the motor actually starts at low command instead of stalling, and inverting the right motor's direction to offset its mirrored mounting — shows the applicant understands a motor as a closed electromechanical system, not a black box that turns when you give it voltage. The day-02 lesson carries this further into FOC field-oriented control: keeping the stator field at 90° to the rotor (the maximum-torque angle) via the Clarke→Park→PI→inverse-Park→SVPWM chain that SimpleFOC's initFOC()/loopFOC() wraps — studied as the advanced/optional exercise that explains why the motor behaves the way it does. The trade-offs (PWM frequency vs. switching loss, dead-zone vs. linearity, voltage limit for safety) are deliberate engineering decisions, the foundation of motor control engineering.",
        },
        {
          titleZh: '传感器融合：用互补滤波把噪声满满的六轴 IMU 变成可信的倾角估计',
          titleEn: 'Sensor fusion: turning a noisy 6-axis IMU into a trustworthy tilt estimate via the complementary filter',
          projectElementZh: 'Day 3 在 software/src/imu.cpp 与 imu.h 中编写 IMU 模块：通过 I2C（SDA=GPIO21/SCL=GPIO22，400kHz）经 WHO_AM_I 寄存器（期望 0x68）校验 MPU6050 身份后用 PWR_MGMT_1 唤醒，从 0x3B 寄存器一次性突发读取 14 字节原始数据（6 加速度+2 温度+6 陀螺仪），减去静态平均校准零偏，用 atan2(ax, az) 从加速度计算倾斜角，再用互补滤波（config.h 中 COMPLEMENTARY_ALPHA=0.97，DLPF 带宽在 CONFIG 寄存器配置）融合陀螺仪积分，输出 getAngle()/getGyroY()/getGyroZ() 供 main.cpp 控制环中的直立环 P/D 项与转向环使用。',
          projectElementEn: "On Day 3, in software/src/imu.cpp + imu.h, the IMU module drives the MPU6050 6-axis sensor: it verifies the chip via the WHO_AM_I register (expecting 0x68) over I2C (SDA=GPIO21/SCL=GPIO22, 400kHz), wake via PWR_MGMT_1, burst-reads 14 bytes from register 0x3B (6 accel + 2 temp + 6 gyro), subtracts the gyroscope zero-bias from static-average calibration, computes the accelerometer tilt with atan2(ax, az), and fuses the two via the complementary filter (α=0.97 set as COMPLEMENTARY_ALPHA in config.h, with DLPF bandwidth configured in the CONFIG register). The resulting getAngle()/getGyroY()/getGyroZ() feed the upright loop's proportional/D terms and the steering loop in main.cpp's control loop.",
          knowledgePointZh: 'I2C 总线协议（START/ACK/STOP、7 位从机地址 0x68/0x69、重复起始条件下的 14 字节连续突发读）、MPU6050 寄存器映射（WHO_AM_I 身份校验、PWR_MGMT_1 唤醒、GYRO_CONFIG/ACCEL_CONFIG 量程、CONFIG 数字低通滤波器 DLPF、SMPLRT_DIV 采样率分频）、大端序高低字节拼成 int16_t、陀螺仪灵敏度换算（131/2^range LSB/(°/s)）；基于 atan2(ax, az) 的加速度计倾角解算（优于 arcsin，在 ±90° 附近不失敏）、陀螺仪积分漂移、互补滤波作为高通(陀螺仪)+低通(加速度计)的频域互补融合及系数 α 的物理含义；陀螺仪零偏的静态平均校准，以及与卡尔曼滤波（预测-修正、协方差驱动的卡尔曼增益）的对比。',
          knowledgePointEn: 'I2C bus protocol (START/ACK/STOP, 7-bit slave addressing 0x68/0x69, repeated-start burst read of 14 bytes), MPU6050 register map (WHO_AM_I identity check, PWR_MGMT_1 wake, GYRO_CONFIG/ACCEL_CONFIG range, CONFIG DLPF, SMPLRT_DIV sample rate), big-endian high/low byte combination into int16_t, gyroscope sensitivity scaling (131/2^range LSB per °/s); accelerometer tilt via atan2(ax, az) (superior to arcsin near ±90°), gyroscope integration drift, complementary filter as high-pass(gyro)+low-pass(accel) fusion with coefficient α; gyroscope zero-bias calibration by static averaging, and the contrast with Kalman filtering (predict-correct, covariance-driven Kalman gain).',
          essayAngleZh: '把噪声大但长期指向重力的加速度计、与短期精确但积分漂移的陀螺仪，用互补滤波一行公式 α×(角度+角速度×dt)+(1−α)×加速度计角度融合成一个可信的倾斜角，是两轮机器人能"知道哪边是下"并据此站立的前提。在电机转动会污染加速度计读数的真实约束下，申请者从频域取舍（陀螺仪漂移 vs. 加速度计噪声）出发选定 α=0.97 与 DLPF 带宽，并说明为何 atan2 优于 arcsin（在 ±90° 附近不失敏）、为何固定比例互补滤波胜过任一单传感器。这体现的是"在正确的时间尺度上信任正确的传感器"这一工程判断力，是机器人状态估计的根基。',
          essayAngleEn: 'Fusing a noisy accelerometer (long-term-accurate but vibration-corrupted) with a drifting gyroscope (short-term-accurate but integration-error-accumulating) into a single trustworthy tilt estimate via the complementary filter formula α×(angle + gyro·dt) + (1−α)×accel_angle is what lets a two-wheeled robot know which way is "down" fast enough to stand. Facing the real constraint that motor vibration contaminates the accelerometer reading, the applicant reasoned from the frequency-domain trade-off (gyro drift vs. accel noise) to pick α=0.97 and the DLPF bandwidth, and explained why atan2 beats arcsin near ±90° and why a fixed-ratio complementary filter beats either sensor alone for this robot. This shows the engineering judgement of trusting the right sensor at the right time-scale, the foundation of robotics state estimation.',
        },
        {
          titleZh: '串级 PID：直立环+速度环+转向环三环嵌套与让机器人站稳的参数整定',
          titleEn: 'Cascaded PID: nested balance/velocity/yaw loops and tuning a self-balancing robot to stand',
          projectElementZh: 'Day 5-6 在 balance_controller 模块（software/src/balance.cpp、balance.h）中实现通用 PIDController 类与 BalanceController 三环控制器：速度环（PI）以（目标速度−平均轮速）为误差，输出"目标倾角"作为直立环的设定值；直立环（PD）以（目标角度−实测倾角）为误差，并把陀螺仪 Y 轴角速度直接当 D 项，输出基础 PWM；转向环（PID）输出左右差速，最终 leftPWM = basePWM − yawPWM、rightPWM = basePWM + yawPWM，全部钳位到 MOTOR_MAX_PWM。控制周期上，平衡环跑 200Hz、速度环跑 50Hz（约四倍慢，由 config.h 中 CONTROL_LOOP_PERIOD_MS 与 VELOCITY_LOOP_DIVIDER 设定）。三组增益（BALANCE_KP/KI/KD、VELOCITY_*、YAW_*）写在 config.h 里，靠 Ziegler-Nichols 与试凑在两轮 2808 BLDC 实车上反复调参直到机器人稳稳站立。',
          projectElementEn: 'Day 5-6 work in the balance_controller module (software/src/balance.cpp / balance.h): implementing the generic PIDController class and the three-loop BalanceController. The velocity PI loop takes (targetVelocity − avgSpeed) and outputs a target lean angle; the upright PD loop takes (targetAngle − tilt) with gyroY fed in directly as the derivative term and outputs base PWM; the yaw PID loop outputs a left-right differential. Final leftPWM = basePWM − yawPWM, rightPWM = basePWM + yawPWM, all clamped to MOTOR_MAX_PWM. The balance loop is scheduled at 200 Hz and the velocity loop at 50 Hz (about 4x slower, set via CONTROL_LOOP_PERIOD_MS and VELOCITY_LOOP_DIVIDER in config.h). Gains (BALANCE_KP/KI/KD, VELOCITY_*, YAW_*) live in config.h and are tuned by hand (Ziegler-Nichols + trial-and-error) on the real robot until it stands on two 2808 BLDC wheels.',
          knowledgePointZh: '串级控制架构（外环速度环输出角度补偿量作为内环直立环的目标角度，前倾则加速、后仰则减速）、各环作用与增益类型选择（直立环 PD、速度环 PI、转向环 PID）、Ziegler-Nichols 法与试凑法整定及"内环平衡环 200Hz、外环速度环 50Hz（约四倍快）"的整定原则、积分饱和与积分限幅（integralLimit = 0.5 × 输出上限）、微分测量替代（直接用陀螺仪角速度作 D 项，避免对噪声角度求导放大噪声）、输出/PWM 限幅、控制周期时序与设定值/扰动抑制的权衡。',
          knowledgePointEn: "Cascade control architecture (outer velocity loop's angle-offset output feeding the inner upright loop's setpoint, so leaning forward accelerates and leaning back brakes), per-loop role and gain type (upright PD, velocity PI, yaw PID), Ziegler-Nichols and trial-and-error tuning with the inner balance loop running at 200 Hz and the outer velocity loop at 50 Hz (about 4x faster, per the day-06 design), integral windup and clamping (integralLimit = 0.5 × outputMax), derivative-on-measurement (feeding gyroY directly as the D term to avoid amplifying angle noise), output and PWM saturation, control-cycle timing and the setpoint/disturbance trade-off.",
          essayAngleZh: '让一台两轮机器人稳稳站住，靠的不是单环 PID，而是把直立 PD 环嵌进速度 PI 环里——想要前进时，外环先让车身主动前倾，内环再去追这个倾斜角；并按"内环须快于外环"的级联原则逐环整定 Kp/Ki/Kd，让内环平衡环跑在 200Hz、外环速度环跑在 50Hz（约四倍快，因为速度变化没那么紧急），在积分饱和限幅（限到输出上限的一半）与用陀螺仪角速度替代噪声角度微分之间做取舍，体现申请者理解多环控制不是死记公式，而是按时间尺度分层、按信号质量选结构的工程判断，能把一个不稳定的欠驱动系统从模型一路推到能站住的真实增益。',
          essayAngleEn: "Making a two-wheeled robot stand by nesting an upright PD loop inside a velocity PI loop so that wanting to move forward first makes the body lean (and only then do the wheels chase), and tuning each loop's gains by hand so the inner balance loop runs at 200 Hz while the outer velocity loop runs at 50 Hz — about four times faster, deliberately slower because speed changes are less urgent — with integral windup clamped to half the output ceiling and the D-term taken straight from the gyro rather than differentiated from a noisy angle, shows the applicant grasps that multi-loop control is about deliberate timescale separation and signal-conditioning trade-offs, not memorized formulas, and that they can reason an unstable, under-actuated plant from a model to working gains.",
        },
        {
          titleZh: '倒立摆建模：从力矩平衡到能预测"必倒"的传递函数',
          titleEn: 'Inverted-pendulum modeling: from torque balance to a transfer function that predicts instability',
          projectElementZh: 'Day 4 物理建模工作：把整车抽象成"小车+倒立摆"二自由度模型，用实测参数（轮子+电机等效质量 M ≈ 0.3 kg、车体质量 m ≈ 1.5 kg、质心到轮轴距离 L ≈ 0.08 m、轮半径 R ≈ 0.03 m）对车体列力矩平衡方程、对轮+车体列水平力平衡方程，做小角度线性化（sin θ ≈ θ），联立求解得到控制方程 θ̈ = a·θ - b·F（其中 a = (M+m)g/(ML)、b = 1/(ML)）；再写成状态空间 ẋ = Ax + Bu 形式，计算可控性矩阵 [B  AB] 得出 det(C) = -b² ≠ 0（系统可控）；最后用 Python odeint 跑"无控制自由倒下"与"PD 控制"两组仿真验证模型，得到的参数范围随后喂给 software/src/balance.cpp 里的串级 PID。',
          projectElementEn: "Day 4 modeling work: abstracting the self-balancing robot into a 2-DOF inverted-pendulum-on-a-cart with measured parameters (wheel+motor equivalent mass M ≈ 0.3 kg, body mass m ≈ 1.5 kg, center-of-mass-to-axle distance L ≈ 0.08 m, wheel radius R ≈ 0.03 m), writing the body's torque-balance and the wheel+body horizontal-force-balance equations, linearizing at small angle (sin θ ≈ θ), and deriving the control equation θ̈ = a·θ - b·F (a = (M+m)g/(ML), b = 1/(ML)); then writing it in state-space form ẋ = Ax + Bu, computing the controllability matrix [B  AB] and concluding det(C) = -b² ≠ 0 (controllable); finally verifying with a Python odeint simulation (free-fall vs. PD-controlled) before the parameters carry over to the cascaded PID in software/src/balance.cpp.",
          knowledgePointZh: '倒立摆运动方程推导（车体绕轮轴的力矩平衡 + 轮与车体整体的水平力平衡）、小角度线性化（sin θ ≈ θ、cos θ ≈ 1、忽略 θ̇²）、状态空间表示 ẋ = Ax + Bu（系统矩阵 A = [[0,1],[a,0]]）、特征值与平衡点稳定性分析（λ = ±√a，正特征值即不稳定系统的数学标志）、传递函数 G(s) = -b/(s²-a) 及其右半平面极点、可控性矩阵 [B  AB] 与 det(C) = -b² ≠ 0 ⇒ 存在状态反馈 u = -Kx 使系统稳定的结论、用 scipy.integrate.odeint 对微分方程组做数值积分以验证模型。',
          knowledgePointEn: 'Inverted-pendulum equations of motion (body torque balance and wheel+body horizontal force balance), small-angle linearization (sin θ ≈ θ, cos θ ≈ 1), state-space representation ẋ = Ax + Bu with the system matrix A = [[0,1],[a,0]], eigenvalue/equilibrium stability analysis (λ = ±√a, the positive eigenvalue as the signature of an unstable system), transfer function G(s) = -b/(s²-a) and its right-half-plane pole, the controllability matrix [B  AB] and the controllability conclusion det(C) = -b² ≠ 0 ⇒ a stabilizing state-feedback law u = -Kx exists, and scipy.integrate.odeint numerical integration of the ODE system for model verification.',
          essayAngleZh: '不是把机器人当作"不知怎么就站住了"的黑箱，而是对车体列力矩平衡方程、对轮+车体列水平力平衡方程，做小角度线性化后得到传递函数 G(s) = -b/(s²-a)，用右半平面极点解释"不加控制必然倒下"这件事，再用 Python odeint 在 PD 控制下仿真观察不稳定极点被拉回稳定——体现申请者能在物理直觉、形式化动力学、数值仿真三端之间自由往返，更重要的是：能把一台正在倒下的机器人读懂成一个正特征值，而不是一个玄学故障。这正是"理解系统为什么这样行为"和"只知道它这样行为"之间的分水岭，是建模推导一路走到预测的能力。',
          essayAngleEn: 'Rather than treating the robot as a black box that "balances somehow," the student derives the inverted-pendulum equations of motion from a torque balance on the body and a horizontal-force balance on wheel-plus-body, linearizes with the small-angle approximation, and arrives at the transfer function G(s) = -b/(s²-a) whose right-half-plane pole is the mathematical reason an uncontrolled robot must fall — then runs a Python odeint simulation under PD control to watch the unstable pole get pulled back to stability. This shows the applicant can move between physical intuition, formal dynamics, and numerical verification in one breath, and — most importantly — can read a falling robot as the expression of a single positive eigenvalue rather than a mysterious failure. It is the kind of modeling-through-to-prediction that distinguishes a student who understands why a system behaves as it does from one who only knows that it does.',
        },
        {
          titleZh: '为轮足机器人设计遥控通信协议：从蓝牙到帧格式编解码',
          titleEn: 'Designing a Binary Serial Protocol for Phone-Controlled Balance',
          projectElementZh: 'Day 7 学员为 ESP32 自行设计一套二进制遥控通信协议（以 protocol.h / PacketParser / SimpleRemote.h 代码块形式写在 curriculum/day-07.md 中，由学员作为 Day-7 作业实现，并非 software/src/ 中预置的文件）：帧格式为「0xAA 帧头 + 命令字节 + 长度字节 + 变长数据 + 1 字节 XOR 校验和」，定义 CMD_SPEED/CMD_TURN/CMD_MODE/CMD_PID_PARAMS/CMD_HEARTBEAT/CMD_TELEMETRY 等命令，并实现逐字节 PacketParser 状态机解析器。速度/转向等 float 值用 floatToBytes 编码为 2 字节（×100 定点、低/高字节拆分）；SimpleRemote 文本命令路径（F/B/L/R/S/X，V:value/T:value）作为更简单的备选。实际 software/src/main.cpp 接好了安全侧：定义 STATE_REMOTE_CONTROL 及全局 remoteVelocity/remoteYawRate/lastRemoteTime，config.template.h 中 REMOTE_TIMEOUT_MS=500 让控制循环在 500ms 内收不到指令时清零 remoteVelocity/remoteYawRate 并切换到 STATE_BALANCING。传输走 ESP32 内置蓝牙 Classic SPP（main.cpp setup 注释段的 SerialBT.begin(BT_DEVICE_NAME="BipedalBot")，及 day-07 的 BluetoothSerial 示例）与手机蓝牙串口终端通信；config.template.h 另留 WiFi AP 模式（WIFI_SSID="BipedalBot_AP"、WIFI_CONTROL_PORT=8888）作为备选链路，并为 iOS 提供 BLE 简化版。',
          projectElementEn: 'In Day 7 the student designs a custom binary remote-control protocol on the ESP32 (taught as inline protocol.h / PacketParser / SimpleRemote.h code blocks in curriculum/day-07.md, which the student implements as the Day-7 assignment — they are not pre-shipped files in software/src/): a frame format of 0xAA header + command byte + length byte + variable payload + 1-byte XOR checksum, with commands CMD_SPEED/CMD_TURN/CMD_MODE/CMD_PID_PARAMS/CMD_HEARTBEAT/CMD_TELEMETRY, implemented via a byte-at-a-time PacketParser state machine. The float speed/turn values are encoded into 2 bytes (floatToBytes: ×100 fixed-point, low/high byte split); a SimpleRemote text-command path (F/B/L/R/S/X, V:value/T:value) is provided as a simpler fallback. The shipped software/src/main.cpp wires the safety half: it defines STATE_REMOTE_CONTROL with global remoteVelocity/remoteYawRate/lastRemoteTime, and config.template.h\'s REMOTE_TIMEOUT_MS=500 makes the control loop auto-zero remoteVelocity/remoteYawRate and transition to STATE_BALANCING if no command arrives within 500 ms. Transport uses ESP32 Bluetooth Classic SPP (SerialBT.begin(BT_DEVICE_NAME="BipedalBot"), shown in the main.cpp setup comment block and the day-07 BluetoothSerial example) with a phone Bluetooth serial terminal; config.template.h also exposes WiFi AP mode (WIFI_SSID="BipedalBot_AP", WIFI_CONTROL_PORT=8888) as an alternate transport, and a BLE simplified path is provided for iOS.',
          knowledgePointZh: '蓝牙 Classic（SPP 串口协议）与 BLE 的取舍（数据率/延迟/iOS 支持——iOS 不支持 SPP 故提供 BLE 简化版），ESP32 BluetoothSerial 库基于 SPP；二进制帧协议设计（固定帧头 0xAA + 命令字节 + 长度字节 + 变长数据 + 1 字节 XOR 校验和）、命令集（CMD_SPEED/CMD_TURN/CMD_MODE/CMD_PID_PARAMS/CMD_HEARTBEAT/CMD_TELEMETRY 及 CMD_STATUS）、帧定界与校验失败重同步（解析器 reset）；逐字节状态机解析器（WAIT_HEADER→WAIT_CMD→WAIT_LENGTH→WAIT_DATA→WAIT_CHECKSUM）与 SimpleRemote 文本行解析路径的对比；float 定点编码（×100 缩放为 int16，拆低/高字节）以在窄带宽链路传输浮点；XOR 校验的错误检测能力与 CRC 的差异；心跳包与遥测下行；接收端安全超时（config.template.h 中 REMOTE_TIMEOUT_MS=500）——链路丢失即清零 remoteVelocity/remoteYawRate、退回自平衡模式。',
          knowledgePointEn: 'Bluetooth Classic SPP vs BLE trade-offs (data rate, latency, iOS support — iOS lacks SPP so a BLE fallback is provided), ESP32 BluetoothSerial library built on the SPP profile; binary frame protocol design (fixed 0xAA header + command byte + length byte + variable-length payload + 1-byte XOR checksum), command set (CMD_SPEED/CMD_TURN/CMD_MODE/CMD_PID_PARAMS/CMD_HEARTBEAT/CMD_TELEMETRY, plus CMD_STATUS), frame delimiting and re-sync on checksum failure (parser reset); byte-at-a-time state-machine parser (WAIT_HEADER→WAIT_CMD→WAIT_LENGTH→WAIT_DATA→WAIT_CHECKSUM) versus the text-line parser used in the SimpleRemote fallback path; float-to-fixed-point encoding (scale ×100, int16 little-endian split into low/high bytes) to compress floats for narrow-band links; XOR checksum error detection and its limitations versus CRC; heartbeat/telemetry for liveness; receiver-side safety timeout (REMOTE_TIMEOUT_MS=500 in config.template.h) that zeroes remoteVelocity/remoteYawRate and falls back to self-balance on link loss.',
          essayAngleZh: '申请者没有把"手机遥控"当成发个字符就跑的练习，而是从零设计一条链路层通信契约：自定义 0xAA 帧头+长度+XOR 校验的二进制帧、逐字节推进的状态机解析器、float×100 的定点编码、以及 500ms 收不到指令即超时退回自平衡的安全兜底，并通过 ESP32 蓝牙 Classic SPP 与手机蓝牙串口终端完成收发验证。这体现的不是"会用蓝牙库"，而是能在不可靠无线信道上设计一条"带校验、带超时、带状态机"的可信指令通道，并把协议规范、编解码、故障安全做成可验证的闭环——文书可据此呈现申请者对"系统间通信"的工程严谨度与安全思维，而非泛泛的"做了一个遥控"。',
          essayAngleEn: 'Instead of treating the phone link as a magic "send a character" exercise, the applicant designs a real binary link-layer protocol — fixed 0xAA header, length field, XOR checksum, a byte-at-a-time state-machine parser, float-scaled-to-int16 encoding, and a 500 ms command-timeout that auto-drops the robot out of remote mode back into self-balance — then validates it over ESP32 Bluetooth Classic SPP with a phone serial terminal. This reframes the work as the applicant engineering a link-layer contract from scratch: defining a frame grammar with a header that resists mis-synchronization, hardening it with a timeout safety fallback, and shipping a verifiable encode/decode round-trip — exactly the protocol-design and safety-thinking rigor a CS/EE program looks for, grounded in this project\'s concrete bytes rather than a generic tutorial.',
        },
        {
          titleZh: '轮足混合运动：用状态机守卫轮式与足式模式的安全切换',
          titleEn: 'Wheeled-legged hybrid modes: a guarded state machine for wheel/leg/hybrid switching',
          projectElementZh: "Day 9 选做挑战（作业中标注为选做/加分项——核心 MVP 是平衡站立+蓝牙遥控）：定义 MotionMode 枚举（MODE_WHEEL / MODE_LEG / MODE_HYBRID / MODE_TRANSITION）与 switchToWheelMode / switchToLegMode / switchToHybridMode 三个切换函数，用 canSwitchMode() 守卫切换安全（轮→足要求 currentSpeed<0.1，足→轮要求 isLegsStanding() 腿部回到中位 ±5°），并用 7 帧的 gaitSequence[] 步态表（站立→左抬→左伸→站立→右抬→右伸→站立）驱动 4 个腿部舵机，再由 handleRemoteCommand() 解析蓝牙 'W'/'L'/'H' 指令从手机端选择模式。Day 9 课内示例用 ESP32Servo 在 GPIO25/26/27/14 驱动 SG90 舵机；整车装配硬件则经 PCA9685 I2C 舵机驱动板接 MG996R 舵机。",
          projectElementEn: "Day 9 stretch challenge (marked optional/bonus in the assignments — the core MVP is balance-standing + Bluetooth remote): defining the MotionMode enum (MODE_WHEEL / MODE_LEG / MODE_HYBRID / MODE_TRANSITION) and the switchToWheelMode/switchToLegMode/switchToHybridMode handlers, with the canSwitchMode() guard (wheel→leg requires currentSpeed < 0.1; leg→wheel requires isLegsStanding() within ±5°), plus the 7-pose gaitSequence[] table (stand → left-lift → left-extend → stand → right-lift → right-extend → stand) for four leg servos, and the Bluetooth 'W'/'L'/'H' command dispatch in handleRemoteCommand() that selects the mode from a phone. The Day-9 lesson drives the servos via ESP32Servo on GPIO25/26/27/14 (SG90 in the example); the assembled robot's hardware instead routes the four leg servos (MG996R) through a PCA9685 I2C driver board.",
          knowledgePointZh: '有限状态机模式仲裁（MotionMode 枚举、currentMode/targetMode、MODE_TRANSITION 过渡态）、带安全前置条件的受保护切换（canSwitchMode() 校验速度<0.1、腿部 isLegsStanding()±5°）、按序编排的切换动作序列（减速停车→禁用平衡PID→腿部站立，或收腿→启用平衡PID）、离散步态关键帧姿态表（GaitPose 数组 {hipL,kneeL,hipR,kneeR} 依次经历支撑/抬腿/前伸/落地相位）、50Hz 舵机 PWM 信号（500–2500µs 脉宽→0–180°，Day 9 课内用 ESP32Servo 在 GPIO25/26/27/14 演示；整车硬件经 I2C 地址 0x40 的 PCA9685 驱动板接 MG996R 舵机走同一组四通道）、混合模式下 BLDC 平衡环与舵机步态环的执行器仲裁。',
          knowledgePointEn: 'Finite-state machine mode arbitration (MotionMode enum, currentMode/targetMode, MODE_TRANSITION transitional state), guarded transitions with safety preconditions (canSwitchMode() checking currentSpeed < 0.1 and isLegsStanding() ±5°), sequential transition choreography (decelerate wheels → disable balance PID → stand up legs, or retract legs → enable balance PID), discrete gait-cycle pose tables (GaitPose arrays of {hipL, kneeL, hipR, kneeR} stepping through support/lift/extend/strike phases), servo PWM signaling at 50Hz with 500–2500µs pulse → 0–180° (taught via ESP32Servo on GPIO25/26/27/14 in the Day-9 lesson; the production hardware routes the same four channels through a PCA9685 I2C driver at 0x40 with MG996R servos), actuator arbitration between the BLDC balance loop and the servo gait loop in hybrid mode.',
          essayAngleZh: '在 Day 9 选做的轮足模式切换挑战里，申请者设计了一个显式的 MotionMode 状态机，并用 canSwitchMode() 守卫把"轮→足切换必须先减速到接近零、足→轮切换必须先收回腿部到 ±5° 站立位"写成硬约束，使任何一次远程按键都不能让机器人带着速度强行进入步态而倾倒。因为这是在核心 MVP（平衡站立+蓝牙遥控）之外自选的加分项，它更说明申请者愿意超出大纲要求，把一个混合系统拆成多个安全可独立验证的模式，而非一锅端的大循环——这种"先证明安全再允许切换"的工程纪律，正是自动驾驶从巡航模式切到低速泊车模式时同样要解决的守护式状态切换问题。',
          essayAngleEn: 'Taking on the optional Day-9 stretch challenge of wheel/leg mode-switching, the applicant designed an explicit MotionMode state machine whose canSwitchMode() guard refuses a wheel-to-leg transition until wheel speed drops below 0.1 and a leg-to-wheel transition until isLegsStanding() confirms the four leg servos are within ±5° of center — so a premature Bluetooth tap can\'t topple the robot mid-gait. Because this was a self-elected bonus (not the core balance+remote MVP), it shows the applicant reaching past the syllabus to partition a hybrid system into safe, individually-verifiable modes rather than monolithic control, treating "don\'t let it fall over" as a guarded-state-transition problem — the same discipline that lets a self-driving stack move between highway-cruise and low-speed-maneuver regimes without an unsafe handoff.',
        },
      ],
    },
  },
  {
    id: '08', slug: 'electronbot', number: 8,
    titleZh: 'ElectronBot', titleEn: 'ElectronBot',
    subtitle: 'USB 桌面机器人 — 眼动 + 表情 + 交互', subtitleEn: 'USB desktop robot with eye tracking and expressions',
    description: '稚晖君开源的 USB 桌面机器人。双舵机控制头部运动，LCD 显示表情，支持 USB 通信与 Unity 上位机交互。可扩展 OpenCV 视觉和语音交互。',
    descriptionEn: 'Peng Zhihui\'s open-source USB desktop robot with servo head, LCD expressions, and Unity app.',
    difficulty: 5, difficultyLabel: '高级', duration: 12, durationUnit: '天',
    color: 'text-project-08', colorHex: '#9a6bc9', icon: 'Monitor',
    mcu: 'STM32F405', coreTech: 'STM32 + USB HS + Servo PID + LCD + Unity',
    tags: [
      { label: 'STM32', color: 'bg-tag-bronze text-tag-bronze-text' },
      { label: 'Unity', color: 'bg-tag-olive text-tag-olive-text' },
      { label: 'OpenCV', color: 'bg-tag-solder text-tag-solder-text' },
    ],
    skills: { hardware: ['STM32 开发', 'USB HS 通信', 'I2C 舵机 PID', 'LCD 显示'], software: ['C 语言', 'Unity/C#', 'OpenCV 视觉', 'USB 协议'], system: ['USB 通信架构', '表情系统', '视觉交互'], engineering: ['PCB 设计', '3D 打印', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'STM32F405RGT6', spec: 'Cortex-M4 + USB HS' },
      { name: 'LCD 显示屏', spec: '表情显示' },
      { name: 'SG90 舵机', spec: '×6 头部+手臂+腰部' },
      { name: '3D 打印外壳', spec: 'SLA 树脂' },
    ],
    timeline: [
      { days: 'Day 1-4', title: '嵌入式基础', titleEn: 'Embedded Basics', description: 'STM32 入门、USB CDC、舵机控制', descriptionEn: 'STM32 intro, USB CDC, servo control' },
      { days: 'Day 5-8', title: '核心功能', titleEn: 'Core Features', description: 'USB HS 通信、I2C 舵机 PID、LCD 表情、传感器', descriptionEn: 'USB HS, I2C servo PID, LCD expressions, sensors' },
      { days: 'Day 9-15', title: '上位机与集成', titleEn: 'Desktop App & Integration', description: 'Unity 上位机、OpenCV 视觉、系统集成、展示', descriptionEn: 'Unity app, OpenCV vision, integration, demo' },
    ],
    links: {
      github: 'https://github.com/peng-zhihui/ElectronBot',
      bilibili: 'https://www.bilibili.com/video/BV1ka411b76m',
      adaptedRepo: 'https://github.com/jojojjjjj/project-08-electronbot-xhigh',
    },
  },
  {
    id: '09', slug: 'desk-satellite', number: 9,
    titleZh: '桌面卫星气象站', titleEn: 'Desk Satellite',
    subtitle: '太阳能供电的卫星造型桌面气象站', subtitleEn: 'Solar-powered satellite-shaped desktop weather station',
    description: '使用 ESP32-C3 驱动 TFT 彩屏，搭载 SHT31-D 高精度温湿度传感器，支持 WiFi NTP 时间同步、Type-C + 太阳能双充电，铜线+黄铜管手工弯制卫星造型外壳。',
    descriptionEn: 'ESP32-C3 with TFT, SHT31-D, WiFi NTP, solar + Type-C charging, copper wire satellite enclosure.',
    difficulty: 4, difficultyLabel: '进阶', duration: 12, durationUnit: '天',
    color: 'text-project-09', colorHex: '#3b82f6', icon: 'Satellite',
    mcu: 'ESP32-C3', coreTech: 'ESP32-C3 + TFT + 太阳能 + SHT31',
    tags: [
      { label: 'ESP32-C3', color: 'bg-tag-teal text-tag-teal-text' },
      { label: 'TFT 显示', color: 'bg-tag-patina text-tag-patina-text' },
      { label: '太阳能', color: 'bg-tag-gold text-tag-gold-text' },
    ],
    skills: { hardware: ['ESP32-C3 RISC-V', 'SPI TFT 显示', 'I2C 传感器', '电源管理'], software: ['Arduino IDE', 'Adafruit GFX/ST7735', 'WiFi/NTP', '低功耗设计'], system: ['太阳能充电系统', '电池管理', '触摸交互', '多屏 UI'], engineering: ['铜线结构弯制', '焊接组装', '结构设计', '项目展示'] },
    hardware: [
      { name: 'ESP32-C3 开发板', spec: 'RISC-V, 4MB Flash' },
      { name: 'ST7735 TFT', spec: '0.96" 80x160 SPI 彩色' },
      { name: 'SHT31-D', spec: '高精度温湿度 I2C' },
      { name: '锂电池+充电模块', spec: '3.7V + Type-C + 太阳能' },
      { name: '铜线+黄铜管', spec: '卫星外壳材料' },
    ],
    timeline: [
      { days: 'Day 1-4', title: '嵌入式基础', titleEn: 'Embedded Basics', description: 'ESP32-C3 入门、SPI TFT、I2C 传感器、WiFi NTP', descriptionEn: 'ESP32-C3 intro, SPI TFT, I2C sensor, WiFi NTP' },
      { days: 'Day 5-8', title: '核心功能', titleEn: 'Core Features', description: '电源管理、显示界面、交互功能、系统整合', descriptionEn: 'Power management, display UI, interaction, integration' },
      { days: 'Day 9-14', title: '结构组装与展示', titleEn: 'Assembly & Demo', description: '铜线结构焊接、卫星外壳组装、整机调试、展示', descriptionEn: 'Copper wire structure, satellite assembly, testing, demo' },
    ],
    links: {
      other: [
        { label: '原作者 YouTube · Author video', url: 'https://www.youtube.com/watch?v=0zJG3wExY-c' },
        { label: '原作者网站 · Author site', url: 'https://www.huyvector.org/clocks/desk-satellite' },
      ],
      adaptedRepo: 'https://github.com/jojojjjjj/project-09-desk-satellite-high',
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug)
}

export function getDifficultyColor(difficulty: DifficultyLevel): string {
  const colors: Record<DifficultyLevel, string> = {
    1: 'text-success',
    2: 'text-success',
    3: 'text-warning',
    4: 'text-accent-copper',
    5: 'text-danger',
  }
  return colors[difficulty]
}

export function getDifficultyBg(difficulty: DifficultyLevel): string {
  const colors: Record<DifficultyLevel, string> = {
    1: 'bg-success/20 text-success',
    2: 'bg-success/20 text-success',
    3: 'bg-warning/20 text-warning',
    4: 'bg-accent-copper/20 text-accent-copper',
    5: 'bg-danger/20 text-danger',
  }
  return colors[difficulty]
}
