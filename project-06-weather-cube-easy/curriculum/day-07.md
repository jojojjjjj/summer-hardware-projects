# Day 7: WiFi 配网系统 | WiFi Provisioning System

## 今日目标 | Today's Goals

- 理解为什么需要 WiFi 配网
- 理解 AP 模式 + Web 配网的原理
- 学会使用 wifi_link_tool 库
- 理解 SPIFFS 文件系统和 Web 页面存储

---

## 上午 (3h) | Morning Session

### 1. 为什么需要配网？(1h)

**问题**：怎么告诉 ESP8266 连接哪个 WiFi？

**方案对比**：

| 方案 | 优点 | 缺点 |
|------|------|------|
| 硬编码 | 简单 | 换 WiFi 就要重新烧录，不现实 |
| 串口 AT 指令 | 灵活 | 需要电脑，不用户友好 |
| **AP 模式 + Web 配网** | 用户友好，手机即可操作 | 实现稍复杂 |
| SmartConfig | 一键配网 | 不稳定，兼容性差 |
| 蓝牙配网 | 体验好 | 需要额外硬件 |

本项目使用 **AP 模式 + Web 配网**，用 wifi_link_tool 库实现。

### 2. AP 模式原理 (1h)

**AP (Access Point) 模式**：

```
正常模式（Station）：
  手机 ←→ 路由器 ←→ ESP8266
        (WiFi)    (WiFi)

配网模式（AP）：
  手机 ←→ ESP8266 (AP)
   (直接 WiFi 连接，无需路由器)
```

**配网流程**：
1. ESP8266 启动后检测不到已保存的 WiFi
2. 自动切换到 AP 模式，创建热点：`wifi_link_tool`
3. 用户手机连接此热点
4. 手机浏览器访问 `http://6.6.6.6`
5. 网页扫描周围 WiFi → 用户选择 → 输入密码
6. ESP8266 收到 SSID + 密码，切换到 Station 模式连接
7. 配网成功！

### 3. SPIFFS 文件系统 (1h)

**什么是 SPIFFS**：
SPI Flash File System — ESP8266 Flash 上的文件系统，用于存储 Web 页面和配置。

**为什么需要 SPIFFS**：
- Web 配网页面（config.html）是 HTML 文件，不适合硬编码在 C 代码中
- 存储在 Flash 文件系统中，读取后直接发送给浏览器

**上传 SPIFFS 文件**：
1. 安装 ESP8266 SPIFFS 上传工具
2. 将 HTML 文件放在项目目录的 `data/` 文件夹下
3. 工具 → ESP8266 Sketch Data Upload

---

## 下午 (4h) | Afternoon Session

### 4. wifi_link_tool 库使用 (2h)

**安装**：
1. 下载 https://github.com/bilibilifmk/wifi_link_tool
2. Arduino IDE → 项目 → 加载库 → 添加 .ZIP 库

**基本配置**：

```cpp
#define FS_CONFIG
#include <wifi_link_tool.h>

void setup() {
  Serial.begin(115200);
  
  // wifi_link_tool 初始化配置
  rstb = D3;           // 重置按钮引脚
  stateled = D4;       // 状态指示灯引脚
  Hostname = "oled气象站"; // 设备名称
  wxscan = true;       // 允许微信小程序发现
  
  u8g2.begin();
  // ... OLED 初始化 ...
  
  load();  // 加载 wifi_link_tool，读取已保存的 WiFi 配置
  
  if (link()) {
    // WiFi 已连接（之前配过网）
    // 直接进入正常工作模式
    showLogo();
    syncTime();
  } else {
    // 未配网，进入 AP 模式
    showAPModeScreen();
  }
}

void loop() {
  pant();  // wifi_link_tool 维护函数，必须放在 loop() 中
  
  if (link()) {
    // 正常工作的逻辑
    refreshDisplay();
  }
}
```

### 5. Web 配网页面分析 (1h)

配网页面 `config.html` 的核心功能：

```javascript
// 1. 扫描 WiFi
function scan() {
  // GET /wifiscan
  // 返回 JSON: {"req":[{"ssid":"MyWiFi","rssi":-45,"encryptionType":"WPA2"}]}
}

// 2. 选择 WiFi 并输入密码
function ssid_select(id) { /* 弹出密码输入框 */ }

// 3. 连接
function connect() {
  // GET /wificonfig?ssid=MyWiFi&password=12345678
  // 返回: IP地址 或 "0"(失败)
}

// 4. 重启
function reboot() {
  // GET /opera?opera=reboot
}
```

### 6. 测试配网流程 (1h)

**任务**：从头测试完整配网流程
1. 清除 ESP8266 已保存的 WiFi（注释掉或删除配置文件）
2. 重新上电，观察 AP 模式是否正常启动
3. 手机连接 `wifi_link_tool` 热点
4. 浏览器访问 `6.6.6.6`
5. 选择 WiFi、输入密码、连接
6. 观察 OLED 显示是否从配网界面切换到正常界面

---

## 今日作业 | Today's Task

1. 完成 wifi_link_tool 集成
2. 测试完整的配网流程（模拟首次使用的场景）
3. 思考：如果用户的 WiFi 密码改了，怎么让设备重新配网？

## 今日检查点 | Checkpoint

- [ ] 首次上电时 OLED 是否显示配网界面？
- [ ] 手机能否连接 `wifi_link_tool` 热点？
- [ ] Web 配网页面能正常打开吗？
- [ ] 配网成功后设备能自动切换到正常工作模式吗？
- [ ] `pant()` 函数是否放在了 `loop()` 中？
