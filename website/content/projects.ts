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
    description: '基于 ESP32-S3 的轮足机器人，结合双足步态和轮式运动。使用 PID 控制实现自平衡，MPU6050 姿态检测，支持遥控与自主运动模式。',
    descriptionEn: 'ESP32-S3-based bipedal wheeled robot with PID self-balancing and MPU6050 IMU.',
    difficulty: 4, difficultyLabel: '进阶', duration: 12, durationUnit: '天',
    color: 'text-project-07', colorHex: '#d45050', icon: 'Footprints',
    mcu: 'ESP32-S3', coreTech: 'ESP32-S3 + PID + MPU6050 + FOC',
    tags: [
      { label: 'ESP32-S3', color: 'bg-tag-teal text-tag-teal-text' },
      { label: 'PID', color: 'bg-tag-rust text-tag-rust-text' },
      { label: 'FOC', color: 'bg-tag-gold text-tag-gold-text' },
    ],
    skills: { hardware: ['ESP32-S3 开发', 'FOC 电机控制', 'IMU 姿态解算', '模块化接线'], software: ['C++ (PlatformIO)', 'PID 算法', 'FOC 控制', '遥控协议'], system: ['运动控制', '状态机', '通信架构'], engineering: ['机械设计', '系统调试', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'ESP32-S3 开发板', spec: '双核 + WiFi+BT' },
      { name: 'MPU6050', spec: '六轴 IMU' },
      { name: '2808 BLDC', spec: '无刷电机 ×2' },
      { name: 'StackForce Dual', spec: 'FOC 驱动板' },
      { name: '3D 打印结构件', spec: 'PLA' },
    ],
    timeline: [
      { days: 'Day 1-4', title: '嵌入式基础', titleEn: 'Embedded Basics', description: 'ESP32-S3 入门、PWM 输出、IMU 读取', descriptionEn: 'ESP32-S3 intro, PWM, IMU read' },
      { days: 'Day 5-8', title: '电机与平衡控制', titleEn: 'Motor & Balance', description: 'FOC 控制、PID 调参、平衡控制', descriptionEn: 'FOC, PID tuning, balance' },
      { days: 'Day 9-12', title: '系统集成与展示', titleEn: 'Integration & Demo', description: '结构组装、系统调试、项目展示', descriptionEn: 'Assembly, debug, demo' },
    ],
    links: {
      gitee: 'https://gitee.com/StackForce/bipedal_wheeled_robot',
      adaptedRepo: 'https://github.com/jojojjjjj/project-07-bipedal-wheeled-robot-high',
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
