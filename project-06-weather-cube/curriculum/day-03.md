# Day 3: WiFi 联网与 HTTP 请求 | WiFi Networking & HTTP Requests

## 今日目标 | Today's Goals

- 理解 WiFi Station 模式的工作原理
- 掌握 ESP8266 连接 WiFi 的方法
- 理解 HTTP 和 HTTPS 协议的区别
- 成功发送第一个 HTTP GET 请求
- 能通过串口监视器查看返回数据

---

## 上午 (3h) | Morning Session

### 1. WiFi 基础概念 (1h)

**WiFi 的两种角色**：
| 角色 | 说明 | 类比 |
|------|------|------|
| AP (Access Point) | 提供 WiFi 热点 | 家里的路由器 |
| Station | 连接到 WiFi 的设备 | 你的手机、电脑、ESP8266 |

**ESP8266 的两种模式**：
- **Station 模式**：ESP8266 作为设备连接路由器（本项目主要使用）
- **AP 模式**：ESP8266 自己成为热点（WiFi 配网时使用）

**WiFi 频段注意**：
- ESP8266 **仅支持 2.4GHz WiFi**
- 不支持 5GHz WiFi
- 确认你的路由器支持 2.4G 频段（大部分都支持）

### 2. ESP8266 WiFi 连接代码 (1h)

```cpp
#include <ESP8266WiFi.h>

const char* ssid = "你的WiFi名称";
const char* password = "你的WiFi密码";

void setup() {
  Serial.begin(115200);
  
  Serial.print("正在连接 WiFi");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\n连接成功！");
  Serial.print("IP 地址: ");
  Serial.println(WiFi.localIP());
}
```

**WiFi 状态说明**：
- `WL_IDLE_STATUS` — 空闲
- `WL_CONNECTED` — 已连接 ✓
- `WL_CONNECT_FAILED` — 密码错误
- `WL_NO_SSID_AVAIL` — 找不到该 WiFi
- `WL_DISCONNECTED` — 已断开

### 3. MAC 地址与 IP 地址 (1h)

- **MAC 地址**：硬件地址，出厂固定（类似身份证号），如 `AA:BB:CC:DD:EE:FF`
- **IP 地址**：网络地址，路由器分配（类似门牌号），如 `192.168.1.100`
- **DNS**：域名解析服务，将网址转为 IP（如 baidu.com → 110.242.68.66）

---

## 下午 (4h) | Afternoon Session

### 4. HTTP 协议原理 (1.5h)

**HTTP 是什么**：
HyperText Transfer Protocol（超文本传输协议）

**HTTP 请求的结构**（以访问和风天气 API 为例）：

```
GET /v7/weather/now?location=101010100&key=your_key HTTP/1.1
Host: devapi.heweather.net
```

**HTTP 响应的结构**：

```
HTTP/1.1 200 OK
Content-Type: application/json

{"code":"200","now":{"temp":"25","text":"晴"}}
```

- **状态码**：200=成功, 404=找不到, 500=服务器错误
- **Header**：元信息（内容类型、长度等）
- **Body**：实际数据（JSON 格式）

**HTTPS vs HTTP**：
- HTTPS = HTTP + SSL/TLS 加密
- HTTPS 使用端口 443，HTTP 使用端口 80
- 现代 API 基本都要求 HTTPS
- ESP8266 使用 HTTPS 需要 BearSSL 库（代码中已包含）

### 5. ESP8266 HTTP GET 请求 (1.5h)

**使用 HTTPClient 库发送请求**：

```cpp
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

void httpGetExample() {
  std::unique_ptr<BearSSL::WiFiClientSecure> client(
    new BearSSL::WiFiClientSecure
  );
  client->setInsecure();  // 跳过证书验证（开发阶段使用）
  
  HTTPClient https;
  
  // 构建 URL
  String url = "https://devapi.heweather.net/v7/weather/now";
  url += "?location=101010100";
  url += "&key=YOUR_API_KEY";
  
  if (https.begin(*client, url)) {
    int httpCode = https.GET();  // 发送 GET 请求
    
    if (httpCode > 0) {
      if (httpCode == HTTP_CODE_OK) {  // 200
        String payload = https.getString();
        Serial.println("返回数据: " + payload);
      }
    } else {
      Serial.printf("请求失败: %s\n", https.errorToString(httpCode).c_str());
    }
    https.end();
  }
}
```

### 6. 实战：获取天气数据 (1h)

**任务**：
1. 申请和风天气 API Key（https://console.heweather.com/app/index）
2. 在代码中填入 API Key
3. 运行程序，通过串口监视器查看 JSON 返回数据
4. 确认能成功获取天气数据

---

## 今日作业 | Today's Task

1. 完成 WiFi 连接，在串口看到分配的 IP 地址
2. 注册和风天气 API Key
3. 成功调用天气 API 并在串口看到返回的 JSON
4. 将 JSON 数据复制到 https://json.cn 查看结构

## 今日检查点 | Checkpoint

- [ ] ESP8266 能连接上 WiFi 吗？
- [ ] 串口能看到分配的 IP 地址吗？
- [ ] 天气 API 调用成功了吗？（串口看到 JSON 数据）
- [ ] 你知道 HTTP 和 HTTPS 的区别吗？
