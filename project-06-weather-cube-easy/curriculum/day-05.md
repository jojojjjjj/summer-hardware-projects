# Day 5: NTP 时间同步 | NTP Time Synchronization

## 今日目标 | Today's Goals

- 理解 NTP 网络时间协议的工作原理
- 掌握 UDP 协议与 TCP/HTTP 的区别
- 实现从 NTP 服务器获取精确时间
- 在 ESP8266 上维护准确的时钟

---

## 上午 (3h) | Morning Session

### 1. 为什么需要 NTP？(0.5h)

ESP8266 本身没有实时时钟（RTC）芯片，断电后无法保持时间。通过 NTP 协议从网络获取时间是目前最简单可靠的方案。

**对比**：
| 方案 | 精度 | 成本 | 可靠性 |
|------|------|------|--------|
| 内置 RTC 芯片 (DS3231) | 高 | 需额外硬件 | 断电不丢失 |
| NTP 网络同步 | 高 | 0（免费） | 需网络连接 |
| millis() 计数 | 低 | 0 | 断电丢失 |

本项目选择 NTP 方案：**零成本、精度高、自带 WiFi 天然支持**。

### 2. UDP 协议 vs TCP 协议 (1h)

| 特性 | UDP | TCP |
|------|-----|-----|
| 连接方式 | 无连接（发出去不管） | 面向连接（三次握手） |
| 可靠性 | 不保证送达 | 保证送达、顺序正确 |
| 速度 | 快 | 较慢 |
| 典型应用 | DNS、NTP、视频直播 | HTTP、文件传输、邮件 |

**类比**：
- UDP = 寄明信片（扔进邮筒，不确定对方收没收到）
- TCP = 寄挂号信（需要签收确认）

NTP 使用 UDP 端口 123，因为时间同步需要低延迟，不在乎偶尔丢包。

### 3. NTP 协议原理 (1.5h)

**NTP 工作原理**：

```
客户端(ESP8266)                    服务器(NTP)
     │                                  │
     │──── 请求 (当前几点了?) ──────→    │  t1
     │                                  │  t2 (服务器收到)
     │                                  │  t3 (服务器回复)
     │←─── 回复 (现在是 xxx 秒) ────    │
     │  t4
     
网络延迟 = (t4 - t1) - (t3 - t2)
时间偏移 = ((t2 - t1) + (t3 - t4)) / 2
```

**NTP 时间戳**：从 1900 年 1 月 1 日 00:00:00 UTC 开始计算的总秒数。

**UNIX 时间戳**：从 1970 年 1 月 1 日 00:00:00 UTC 开始计算的总秒数。

**转换**：`UNIX时间戳 = NTP时间戳 - 2208988800`

---

## 下午 (4h) | Afternoon Session

### 4. Arduino Time 库 (1h)

**Time 库的核心函数**：

```cpp
#include <TimeLib.h>

// 获取当前时间的各个分量
int h = hour();      // 小时 (0-23)
int m = minute();    // 分钟 (0-59)
int s = second();    // 秒 (0-59)
int d = day();       // 日 (1-31)
int mo = month();    // 月 (1-12)
int y = year();      // 年

// 设置同步函数（定期自动调用）
setSyncProvider(getNtpTime);   // 注册 NTP 时间获取函数
setSyncInterval(300);          // 每 300 秒同步一次
```

**格式化显示**：
```cpp
String timeStr = String(hour()) + ":" + 
                 (minute() < 10 ? "0" : "") + String(minute());
String dateStr = String(year()) + "/" + 
                 String(month()) + "/" + String(day());
```

### 5. NTP 时间获取实战 (1.5h)

**NTP 请求报文格式**（48 字节）：

```cpp
const int NTP_PACKET_SIZE = 48;
byte packetBuffer[NTP_PACKET_SIZE];

// IPAddress timeServer(120, 25, 115, 20); // 阿里云 NTP
IPAddress timeServer(119, 28, 183, 184);     // 腾讯云 NTP 备用

void sendNTPpacket(IPAddress &address) {
  memset(packetBuffer, 0, NTP_PACKET_SIZE);
  
  // 设置 NTP 请求头
  packetBuffer[0] = 0b11100011;  // LI, Version, Mode
  packetBuffer[1] = 0;           // Stratum
  packetBuffer[2] = 6;           // Polling Interval
  packetBuffer[3] = 0xEC;        // Peer Clock Precision
  
  // 发送 UDP 包到 NTP 服务器端口 123
  Udp.beginPacket(address, 123);
  Udp.write(packetBuffer, NTP_PACKET_SIZE);
  Udp.endPacket();
}

time_t getNtpTime() {
  // 清空接收缓冲区
  while (Udp.parsePacket() > 0);
  
  sendNTPpacket(timeServer);
  
  uint32_t beginWait = millis();
  while (millis() - beginWait < 1500) {  // 等待 1.5 秒
    int size = Udp.parsePacket();
    if (size >= NTP_PACKET_SIZE) {
      Udp.read(packetBuffer, NTP_PACKET_SIZE);
      
      // 从报文第 40 字节开始提取 4 字节的时间戳
      unsigned long secsSince1900;
      secsSince1900 = (unsigned long)packetBuffer[40] << 24;
      secsSince1900 |= (unsigned long)packetBuffer[41] << 16;
      secsSince1900 |= (unsigned long)packetBuffer[42] << 8;
      secsSince1900 |= (unsigned long)packetBuffer[43];
      
      // NTP 时间戳 → UNIX 时间戳 + 时区偏移
      return secsSince1900 - 2208988800UL + 8 * 3600;
    }
  }
  Serial.println("NTP 无响应");
  return 0;
}
```

### 6. 整合：在 OLED 上显示时间 (1.5h)

**任务**：
1. 将 NTP 获取的时间显示在 OLED 屏幕上
2. 格式：大字体显示 `HH:MM`，小字体显示 `YYYY/MM/DD`
3. 每 30 秒刷新一次时间显示（用 millis() 控制）

```cpp
unsigned long previousMillis = 0;
const long interval = 30000; // 30 秒

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    refreshDisplay(); // 刷新时间和显示
  }
}
```

---

## 今日作业 | Today's Task

1. 完成 NTP 时间获取并在串口打印当前时间
2. 将时间显示到 OLED 屏幕上（含日期）
3. 实现每 30 秒自动刷新

## 今日检查点 | Checkpoint

- [ ] NTP 时间能正常获取吗？（串口看到正确时间）
- [ ] OLED 上显示的时间正确吗？
- [ ] 日期也能正确显示吗？
- [ ] 你知道 NTP 和 HTTP 使用不同协议（UDP vs TCP）的原因吗？
