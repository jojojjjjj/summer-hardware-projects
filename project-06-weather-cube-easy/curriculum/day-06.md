# Day 6: OLED 屏幕布局设计 | OLED Screen Layout Design

## 今日目标 | Today's Goals

- 学会像素级 UI 布局设计
- 掌握 U8g2 多字体混排
- 理解 BMP 位图在嵌入式设备上的存储和显示
- 完成气象站完整界面布局

---

## 上午 (3h) | Morning Session

### 1. UI 布局规划 (1h)

**设计目标**：在 128×64 像素的屏幕上规划信息区域。

**目标布局**：

```
┌──────────────────────────────┐
│ [天气图标]    HH:MM   y 64px │
│  40×40        大字体   │     │
│               YYYY/MM/DD│    │
│ PM2.5: xx    温度°C    │     │
└──────────────────────────────┘
   ←──────── 128px ────────→
```

**布局分析**：
| 元素 | 位置 (x, y) | 尺寸 | 字体 |
|------|-------------|------|------|
| 天气图标 | (0, 0) | 40×40 px | BMP 位图 |
| 时间 HH:MM | (40, 32) | 大字体 | fub25 (25px) |
| 日期 | (60, 64) | 小字体 | 6x10 |
| 温度数值 | (65, 53) | 中字体 | ncenB18 |
| 摄氏度符号 | (100, 32) | 25×25 | BMP 位图 |
| PM2.5 标签 | (0, 48) | 小字体 | ncenR12 |
| PM2.5 数值 | (10, 62) | 小字体 | ncenR12 |

### 2. U8g2 字体系统 (1.5h)

**U8g2 内置字体命名规则**：`u8g2_font_[名称]_[大小][修饰符]`

| 字体 | 用途 | 示例 |
|------|------|------|
| `u8g2_font_fub25_tf` | 大标题（时间） | 25px 粗体数字 |
| `u8g2_font_ncenB18_tf` | 中等文字（温度） | 18px Bold |
| `u8g2_font_ncenR12_tf` | 小标签 | 12px Regular |
| `u8g2_font_6x10_tf` | 日期等小字 | 6×10 像素 |
| `u8g2_font_unifont_t_chinese2` | 中文 | 16×16 像素 |

**字体大小对比**（128×64 屏幕空间参考）：
- fub25: 一个数字约 15×25 像素 → 一行约 8 个字符
- ncenB18: 一个字母约 10×18 像素 → 一行约 12 个字符
- 6x10: 一个字母 6×10 → 一行约 21 个字符
- unifont: 一个汉字 16×16 → 一行约 8 个汉字

### 3. 显示缓冲区管理 (0.5h)

**典型绘制流程**：
```cpp
u8g2.clearBuffer();        // 1. 清空画布（内存中）

// 2. 绘制所有元素（任何顺序都可以，因为是画在内存中）
u8g2.setFont(font1);
u8g2.drawStr(x1, y1, text1);

u8g2.setFont(font2);
u8g2.drawStr(x2, y2, text2);

u8g2.drawXBMP(0, 0, 40, 40, icon); // 绘制位图

u8g2.sendBuffer();         // 3. 一次性发送到屏幕
```

**⚠️ 注意**：
- `setCursor()` + `print()` 和 `drawStr()` 效果相同，风格不同
- 字体切换后光标位置不会自动调整，需要重新 setCursor
- `drawXBMP(x, y, w, h, bitmap)` 用于绘制单色位图

---

## 下午 (4h) | Afternoon Session

### 4. BMP 位图原理 (1.5h)

**XBM (X BitMap) 格式**：
- 是 U8g2 原生支持的位图格式
- 用 C 数组存储，每个 bit 代表一个像素
- 1 = 亮，0 = 暗（或反过来）

**位图转换工具**：
- GIMP（免费图片编辑软件）：导出为 XBM 格式
- 在线工具：https://javl.github.io/image2cpp/
- LCD Assistant（Windows 小程序）

**PROGMEM 关键字**：
```cpp
// 将位图数据存储在 Flash（程序存储器）而非 RAM
// ESP8266 的 RAM 非常有限（约 80KB），必须节省
const unsigned char icon_sunny[] PROGMEM = {
  0x00, 0x00, 0x00, 0x00, 0x00, // ... 位图数据
};
```

**为什么需要 PROGMEM**：
- RAM 容量小（~80KB），Flash 容量大（2MB+）
- PROGMEM 将只读数据放在 Flash 中
- 需要使用特殊函数（`drawXBMP`）来读取 PROGMEM 中的数据

### 5. 整合全部 UI 元素 (1.5h)

参考 `software/src/standard/weather_cube.ino` 中的 `shuaxin()` 函数：

```cpp
void refreshDisplay() {
  u8g2.clearBuffer();
  
  // 1. 天气图标（左上角）
  drawWeatherIcon(weatherCode); // 根据天气代码选择对应位图
  
  // 2. 时间（大字）
  u8g2.setFont(u8g2_font_fub25_tf);
  u8g2.setCursor(40, 32);
  u8g2.print(timeStr);
  
  // 3. 日期（小字）
  u8g2.setFont(u8g2_font_6x10_tf);
  u8g2.setCursor(60, 64);
  u8g2.print(dateStr);
  
  // 4. 温度数值
  u8g2.setFont(u8g2_font_ncenB18_tf);
  u8g2.setCursor(65, 53);
  u8g2.print(temperature);
  
  // 5. 摄氏度符号
  u8g2.drawXBMP(100, 32, 25, 25, col_ssd);
  
  // 6. PM2.5
  u8g2.setFont(u8g2_font_ncenR12_tf);
  u8g2.setCursor(0, 48);
  u8g2.print("pm2.5");
  u8g2.setCursor(10, 62);
  u8g2.print(pm25Value);
  
  u8g2.sendBuffer();
}
```

### 6. 第一次完整运行 (1h)

**任务**：将以下功能全部整合并运行：
1. WiFi 连接
2. NTP 时间获取
3. 天气数据获取 + JSON 解析
4. PM2.5 数据获取
5. OLED UI 完整显示

**调试技巧**：
- 先用串口确认每个模块独立正常
- 再逐步添加 UI 元素测试
- 最后整合全部功能

---

## 今日作业 | Today's Task

1. 完成完整 UI 布局，所有元素正确显示
2. 提交第一周进度汇报（Week 1 Check-in）

## 今日检查点 | Checkpoint

- [ ] 时间、日期、天气图标、温度、PM2.5 全部显示在屏幕上吗？
- [ ] 各元素的位置是否合理（不重叠）？
- [ ] 屏幕刷新时有没有明显闪烁？
- [ ] Week 1 Check-in 写完了吗？
