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
    subtitle: 'USB/蓝牙/2.4G/Type-C 四模机械键盘', subtitleEn: 'Quad-mode mechanical keyboard',
    description: '基于 STM32 的四模机械键盘，支持 USB 有线、蓝牙 5.0、2.4G 无线和 Type-C 直连。自定义键位映射，支持 QMK/VIA 兼容固件。',
    descriptionEn: 'STM32-based quad-mode mechanical keyboard with USB, Bluetooth 5.0, 2.4G, and Type-C.',
    difficulty: 4, difficultyLabel: '进阶', duration: 18, durationUnit: '天',
    color: 'text-project-03', colorHex: '#7c6bb5', icon: 'Keyboard',
    mcu: 'STM32F103', coreTech: 'STM32 + BLE + 2.4G + USB HID',
    tags: [
      { label: 'STM32', color: 'bg-tag-bronze text-tag-bronze-text' },
      { label: 'BLE', color: 'bg-tag-teal text-tag-teal-text' },
      { label: 'USB HID', color: 'bg-tag-copper text-tag-copper-text' },
    ],
    skills: { hardware: ['STM32 开发', '四层 PCB 设计', 'USB HID', '射频天线'], software: ['C 语言', 'HID 协议栈', 'BLE 协议', 'QMK 固件'], system: ['多协议切换', '电源管理', '键位映射引擎'], engineering: ['PCB 布线', '结构设计', '固件调试', '项目演示'] },
    hardware: [
      { name: 'STM32F103C6T6', spec: 'Cortex-M3 MCU' },
      { name: 'nRF51822', spec: 'BLE 5.0 模块' },
      { name: 'CH582F', spec: '2.4G 无线芯片' },
      { name: '机械轴体', spec: 'Cherry 兼容 × 65' },
      { name: 'PCB', spec: '四层板' },
    ],
    timeline: [
      { days: 'Day 1-4', title: '基础开发', titleEn: 'Fundamentals', description: 'STM32 入门、USB HID、矩阵扫描', descriptionEn: 'STM32 intro, USB HID, matrix scan' },
      { days: 'Day 5-9', title: '无线通信', titleEn: 'Wireless', description: 'BLE 协议栈、2.4G 无线、协议切换', descriptionEn: 'BLE stack, 2.4G, protocol switching' },
      { days: 'Day 10-14', title: 'PCB 设计', titleEn: 'PCB Design', description: '四层板设计、布线规则、DFM', descriptionEn: '4-layer PCB, routing rules, DFM' },
      { days: 'Day 15-18', title: '组装调试', titleEn: 'Assembly', description: '焊接组装、固件调试、展示', descriptionEn: 'Soldering, firmware debug, demo' },
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
    description: '基于 ESP32 的桌宠机器人，集成语音识别、LLM 对话和 TTS 语音合成。3D 打印外壳 + 双舵机头部运动，可进行自然语言交互。',
    descriptionEn: 'ESP32-based desktop pet robot with STT, LLM chat, and TTS capabilities.',
    difficulty: 3, difficultyLabel: '中等', duration: 15, durationUnit: '天',
    color: 'text-project-05', colorHex: '#c9944a', icon: 'Bot',
    mcu: 'ESP32-S3', coreTech: 'ESP32-S3 + STT + LLM + TTS',
    tags: [
      { label: 'ESP32-S3', color: 'bg-tag-teal text-tag-teal-text' },
      { label: 'LLM', color: 'bg-tag-gold text-tag-gold-text' },
      { label: 'TTS', color: 'bg-tag-copper text-tag-copper-text' },
    ],
    skills: { hardware: ['ESP32-S3', 'I2S 音频', '舵机控制', '3D 打印'], software: ['MicroPython', 'LLM API', 'STT/TTS', 'WiFi'], system: ['音频流水线', '对话状态机', '低功耗管理'], engineering: ['3D 建模', '组装调试', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'ESP32-S3', spec: '双核 + WiFi+BT' },
      { name: 'INMP441', spec: 'I2S 麦克风' },
      { name: 'MAX98357', spec: 'I2S 功放' },
      { name: 'SG90 舵机', spec: '×2 头部运动' },
      { name: '3D 打印外壳', spec: 'PLA' },
    ],
    timeline: [
      { days: 'Day 1-4', title: '嵌入式基础', titleEn: 'Embedded Basics', description: 'ESP32-S3 入门、I2S 音频、WiFi', descriptionEn: 'ESP32-S3 intro, I2S audio, WiFi' },
      { days: 'Day 5-9', title: 'AI 能力', titleEn: 'AI Capabilities', description: 'STT 语音识别、LLM API、TTS 合成', descriptionEn: 'STT, LLM API, TTS synthesis' },
      { days: 'Day 10-15', title: '系统集成', titleEn: 'Integration', description: '对话状态机、3D 外壳、组装展示', descriptionEn: 'Dialog state machine, 3D shell, demo' },
    ],
    links: {
      gitee: 'https://gitee.com/esp-friends/esp_sparkbot',
      other: [
        { label: '进阶原项目 · AI DesktopCat', url: 'https://github.com/AI-FanGe/AI_DesktopCat_Qwen3.5Omni' },
      ],
      adaptedRepo: 'https://github.com/jojojjjjj/project-05-desktop-pet-mid',
    },
  },
  {
    id: '06', slug: 'weather-cube', number: 6,
    titleZh: '天气魔方', titleEn: 'WeatherCube',
    subtitle: 'ESP32 彩屏桌面天气站', subtitleEn: 'ESP32 color display desktop weather station',
    description: '使用 ESP32 驱动 TFT 彩屏，搭配温湿度传感器，支持 WiFi 天气获取与 NTP 时间同步。3D 打印立方体外壳，桌面摆件级完成度。',
    descriptionEn: 'ESP32-driven TFT weather station with 3D-printed cube enclosure.',
    difficulty: 1, difficultyLabel: '入门', duration: 8, durationUnit: '天',
    color: 'text-project-06', colorHex: '#3a9b9b', icon: 'Thermometer',
    mcu: 'ESP32', coreTech: 'ESP32 + TFT + WiFi + 传感器',
    tags: [
      { label: 'ESP32', color: 'bg-tag-teal text-tag-teal-text' },
      { label: 'TFT 显示', color: 'bg-tag-patina text-tag-patina-text' },
      { label: 'WiFi', color: 'bg-tag-solder text-tag-solder-text' },
    ],
    skills: { hardware: ['ESP32 开发', 'SPI 显示', 'I2C 传感器', '3D 打印'], software: ['Arduino IDE', 'TFT 库', 'WiFi/NTP', 'JSON 解析'], system: ['天气 API', '数据刷新策略', 'UI 布局'], engineering: ['3D 建模', '组装调试', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'ESP32 开发板', spec: 'WiFi+BT' },
      { name: 'ST7789 TFT', spec: '1.54" 240×240 SPI' },
      { name: 'BME280', spec: '温湿压 I2C 传感器' },
      { name: '3D 打印外壳', spec: 'PLA 立方体' },
    ],
    timeline: [
      { days: 'Day 1-2', title: '入门', titleEn: 'Getting Started', description: 'ESP32 入门、Arduino IDE、Blink', descriptionEn: 'ESP32 intro, Arduino IDE, Blink' },
      { days: 'Day 3-5', title: '显示与传感器', titleEn: 'Display & Sensor', description: 'TFT 驱动、传感器读取、数据展示', descriptionEn: 'TFT driver, sensor read, display' },
      { days: 'Day 6-8', title: '联网与整合', titleEn: 'WiFi & Integration', description: 'WiFi 天气、NTP 时间、外壳组装', descriptionEn: 'WiFi weather, NTP, enclosure' },
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
    description: '基于 STM32 的轮足机器人，结合双足步态和轮式运动。使用 PID 控制实现自平衡，MPU6050 姿态检测，支持遥控与自主运动模式。',
    descriptionEn: 'STM32-based bipedal wheeled robot with PID self-balancing and MPU6050 IMU.',
    difficulty: 4, difficultyLabel: '进阶', duration: 18, durationUnit: '天',
    color: 'text-project-07', colorHex: '#d45050', icon: 'Footprints',
    mcu: 'STM32F103', coreTech: 'STM32 + PID + MPU6050 + FOC',
    tags: [
      { label: 'STM32', color: 'bg-tag-bronze text-tag-bronze-text' },
      { label: 'PID', color: 'bg-tag-rust text-tag-rust-text' },
      { label: 'FOC', color: 'bg-tag-gold text-tag-gold-text' },
    ],
    skills: { hardware: ['STM32 开发', 'FOC 电机控制', 'IMU 姿态解算', 'PCB 设计'], software: ['C 语言', 'PID 算法', 'FOC 控制', '遥控协议'], system: ['运动控制', '状态机', '通信架构'], engineering: ['机械设计', '系统调试', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'STM32F103C8T6', spec: 'Cortex-M3' },
      { name: 'MPU6050', spec: '六轴 IMU' },
      { name: 'GM2804', spec: '无刷电机 ×2' },
      { name: 'FOC 驱动板', spec: 'SimpleFOC' },
      { name: '3D 打印结构件', spec: 'PLA' },
    ],
    timeline: [
      { days: 'Day 1-4', title: '嵌入式基础', titleEn: 'Embedded Basics', description: 'STM32 入门、PWM 输出、IMU 读取', descriptionEn: 'STM32 intro, PWM, IMU read' },
      { days: 'Day 5-9', title: '电机控制', titleEn: 'Motor Control', description: 'FOC 控制、PID 调参、平衡控制', descriptionEn: 'FOC, PID tuning, balance' },
      { days: 'Day 10-14', title: '步态运动', titleEn: 'Gait Motion', description: '步态规划、运动控制、遥控集成', descriptionEn: 'Gait planning, motion, remote' },
      { days: 'Day 15-18', title: '系统集成', titleEn: 'Integration', description: '结构组装、系统调试、项目展示', descriptionEn: 'Assembly, debug, demo' },
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
    difficulty: 5, difficultyLabel: '高级', duration: 20, durationUnit: '天',
    color: 'text-project-08', colorHex: '#9a6bc9', icon: 'Monitor',
    mcu: 'STM32F411', coreTech: 'STM32 + USB HS + Servo PID + LCD + Unity',
    tags: [
      { label: 'STM32', color: 'bg-tag-bronze text-tag-bronze-text' },
      { label: 'Unity', color: 'bg-tag-olive text-tag-olive-text' },
      { label: 'OpenCV', color: 'bg-tag-solder text-tag-solder-text' },
    ],
    skills: { hardware: ['STM32 开发', 'USB HS 通信', 'I2C 舵机 PID', 'LCD 显示'], software: ['C 语言', 'Unity/C#', 'OpenCV 视觉', 'USB 协议'], system: ['USB 通信架构', '表情系统', '视觉交互'], engineering: ['PCB 设计', '3D 打印', '文档撰写', '项目演示'] },
    hardware: [
      { name: 'STM32F411CEU6', spec: 'Cortex-M4' },
      { name: 'LCD 显示屏', spec: '表情显示' },
      { name: 'SG90 舵机', spec: '×2 头部运动' },
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
    difficulty: 4, difficultyLabel: '进阶', duration: 14, durationUnit: '天',
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
