# Day 9: B站粉丝数显示（拓展功能）| Bilibili Follower Count (Extension)

## 今日目标 | Today's Goals

- 理解 RESTful API 调用的通用模式
- 学会使用 HTTP（非加密）调用开放 API
- 掌握在已有 UI 中替换显示模块的方法
- 了解 Bilibili API 的数据结构

---

## 上午 (3h) | Morning Session

### 1. 拓展功能介绍 (0.5h)

B站UP主版气象站将 PM2.5 显示区域替换为 B站粉丝数显示：

| | 标准版 | B站UP主版 |
|------|--------|----------|
| 左下方标签 | "pm2.5" | "bilibili" |
| 下方数值 | PM2.5 浓度 | 粉丝数 |
| 数据来源 | 和风天气 API (HTTPS) | Bilibili API (HTTP) |
| 更新频率 | 30 分钟 | 30 秒（每次屏幕刷新） |

### 2. Bilibili API 分析 (1h)

**获取用户粉丝数的 API**：
```
GET http://api.bilibili.com/x/relation/stat?vmid=UID
```

**返回 JSON 示例**：
```json
{
  "code": 0,
  "message": "0",
  "data": {
    "mid": 123456789,
    "following": 123,
    "whisper": 0,
    "black": 0,
    "follower": 12345
  }
}
```

**关键字段**：
- `data.follower` — 粉丝数（这是我们需要的）
- `data.following` — 关注数
- `code: 0` — 请求成功

**⚠️ 注意**：
- B站 API 使用 **HTTP**（不是 HTTPS），不能用 `WiFiClientSecure`
- 必须使用普通的 `WiFiClient` + `HTTPClient`
- 和风天气 API 使用 HTTPS，B站 API 使用 HTTP

### 3. HTTP vs HTTPS 在代码中的区别 (1.5h)

**HTTPS 请求（和风天气）**：
```cpp
std::unique_ptr<BearSSL::WiFiClientSecure> client(
  new BearSSL::WiFiClientSecure
);
client->setInsecure();
HTTPClient https;
https.begin(*client, "https://devapi.heweather.net/...");
```

**HTTP 请求（B站 API）**：
```cpp
WiFiClient client;  // 普通客户端，不需要 BearSSL
HTTPClient http;
http.begin(client, "http://api.bilibili.com/x/relation/stat?vmid=" + UID);
```

**为什么 B站用 HTTP？**
- HTTP 更快、占用内存更少
- 公开数据不需要加密
- ESP8266 的 HTTPS 开销较大（内存和 CPU）

---

## 下午 (4h) | Afternoon Session

### 4. 实现粉丝数获取函数 (1.5h)

```cpp
String followerCount = "NO UID";  // 初始值

void getBilibiliFollower() {
  WiFiClient client;
  HTTPClient http;
  
  String url = "http://api.bilibili.com/x/relation/stat?vmid=" + bilibiliUID;
  
  if (http.begin(client, url)) {
    int httpCode = http.GET();
    
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      
      DynamicJsonBuffer jsonBuffer(512);
      JsonObject& root = jsonBuffer.parseObject(payload);
      
      if (root.success()) {
        String follower = root["data"]["follower"];
        if (follower != "") {
          followerCount = follower;
          Serial.println("粉丝数: " + followerCount);
        }
      }
      jsonBuffer.clear();
    }
    http.end();
  }
}
```

### 5. 修改 UI 布局 (1h)

**标准版 UI**（含 PM2.5）：
```cpp
u8g2.setCursor(0, 48);
u8g2.print("pm2.5");
u8g2.setCursor(10, 62);
u8g2.print(pm25Value);
```

**B站版 UI**（含粉丝数）：
```cpp
u8g2.setCursor(0, 50);
u8g2.print("bilibili");
u8g2.setFont(u8g2_font_ncenR10_tf);
u8g2.setCursor(0, 64);
u8g2.print(followerCount);
```

### 6. 粉丝数格式化（可选，1h）

粉丝数很大时显示不下？可以格式化：

```cpp
String formatNumber(String num) {
  long n = num.toInt();
  if (n >= 10000) {
    float wan = n / 10000.0;
    return String(wan, 1) + "w";  // 如 "12.3w"
  }
  return num;
}
```

### 7. 练习：其他公开 API (0.5h)

**可探索的免费 API**：
- 一言 (Hitokoto)：`https://v1.hitokoto.cn/` — 随机一句话
- 天气 API 扩展：空气质量、生活指数、逐小时预报
- 微博热搜、知乎热榜（需爬虫）

---

## 今日作业 | Today's Task

1. 完成 B站粉丝数获取功能
2. 在 OLED 上成功显示粉丝数（替换 PM2.5 区域）
3. （选做）尝试调用一个其他公开 API 并显示数据

## 今日检查点 | Checkpoint

- [ ] B站 API 能正确返回粉丝数吗？
- [ ] OLED 上能显示粉丝数吗？（检查 bilibili 字样和数字）
- [ ] 你知道 HTTP 和 HTTPS 在 ESP8266 代码中的实现区别吗？
- [ ] 粉丝数为空时（新用户/API 失败），显示 "NO UID" 吗？
