# Day 10: PC 性能监控（拓展功能）| PC Performance Monitor (Extension)

## 今日目标 | Today's Goals

- 理解 ESP8266 作为 HTTP Server 接收数据
- 了解 AIDA64 上位机的工作原理
- 实现 PC 硬件信息的 OLED 显示
- 理解客户端-服务器模式

---

## 上午 (3h) | Morning Session

### 1. 功能概述 (1h)

**PC 性能监控功能**允许气象站接收来自电脑的性能数据并显示：

**数据流**：
```
AIDA64（PC 软件）
    ↓ 读取硬件传感器数据
上位机程序（Windows EXE）
    ↓ HTTP GET 带查询参数
ESP8266 HTTP Server
    ↓ 解析参数
OLED 显示 CPU/内存/温度
```

**显示内容**：
- CPU 使用率 (%)
- CPU 温度 (°C)
- 内存使用率 (%)
- CPU 时钟频率 (MHz)

### 2. ESP8266 HTTP Server 基础 (1h)

**ESP8266 内置 Web Server** 可以处理 HTTP 请求：

```cpp
#include <ESP8266WebServer.h>

ESP8266WebServer server(80);  // 监听 80 端口

void setup() {
  // ... WiFi 连接 ...
  
  // 注册路由处理函数
  server.on("/pc", handlePCData);
  
  server.begin();
}

void loop() {
  server.handleClient();  // 处理 HTTP 请求
}
```

### 3. 解析 URL 查询参数 (1h)

上位机发送的数据格式：
```
GET /pc?cpu=45&cput=62&ram=78&clk=3600&cpuv=1.2
```

**解析代码**：
```cpp
void handlePCData() {
  // 从 URL 参数提取数据
  String cpu = server.arg("cpu");     // CPU 使用率: "45"
  String cput = server.arg("cput");   // CPU 温度: "62"
  String ram = server.arg("ram");     // 内存使用率: "78"
  String clk = server.arg("clk");     // CPU 频率: "3600"
  
  // 切换到 PC 监控显示模式
  displayPCMode(cpu, cput, ram, clk);
  
  // 返回确认
  server.send(200, "text/plain", "ok");
}
```

---

## 下午 (4h) | Afternoon Session

### 4. PC 监控显示界面 (1.5h)

**UI 布局**（使用预制的背景图 `pctp`）：

```cpp
void displayPCMode(String cpu, String cput, String ram, String clk) {
  u8g2.clearBuffer();
  
  // 绘制背景（含边框和标签）
  u8g2.drawXBMP(0, 0, 128, 64, pctp);
  
  // CPU 使用率
  u8g2.setFont(u8g2_font_crox5hb_tf);
  u8g2.setCursor(33, 25);
  u8g2.print(cpu + "%");
  
  // CPU 温度
  u8g2.setCursor(33, 57);
  u8g2.print(cput);
  
  // 内存使用率
  u8g2.setCursor(95, 57);
  u8g2.print(ram + "%");
  
  // CPU 时钟频率
  u8g2.setFont(u8g2_font_ncenR10_tf);
  u8g2.setCursor(96, 16);
  u8g2.print(clk);
  u8g2.setCursor(94, 30);
  u8g2.print("MHz");
  
  u8g2.sendBuffer();
}
```

### 5. 上位机配置 (1h)

**AIDA64 设置**：
1. 打开 AIDA64 → 文件 → 设置 → LCD
2. 选择 "RemoteSensor"
3. 配置输出格式和端口

**上位机程序**：
- 预编译版本：`PC上位机/气象站pc性能监视器上位机.exe`
- 功能：从 AIDA64 读取数据 → 格式化 → HTTP GET 发送到 ESP8266

### 6. 整合：两种显示模式切换 (1.5h)

**模式切换逻辑**：
```cpp
int displayMode = 0;           // 0=天气模式，1=PC监控模式
unsigned long pcLastTime = 0;  // 最后一次收到 PC 数据的时间

void loop() {
  server.handleClient();       // 随时接收 PC 数据
  
  // 如果超过 5 秒没收到 PC 数据，切回天气模式
  if (displayMode == 1 && millis() - pcLastTime > 5000) {
    displayMode = 0;
    refreshWeather();  // 强制刷新天气界面
  }
  
  if (displayMode == 0) {
    // 天气模式正常刷新
    if (millis() - previousMillis >= 30000) {
      refreshWeather();
    }
  }
}
```

---

## 今日作业 | Today's Task

1. 实现 HTTP Server `/pc` 路由
2. 完成 PC 监控显示界面
3. （如果有 AIDA64）实测 PC 监控数据推送
4. 提交第二周进度汇报（Week 2 Check-in）

## 今日检查点 | Checkpoint

- [ ] ESP8266 HTTP Server 能正常接收请求吗？
- [ ] PC 监控界面布局正确吗？
- [ ] 从天气模式到 PC 模式的切换正常吗？
- [ ] Week 2 Check-in 写完了吗？
