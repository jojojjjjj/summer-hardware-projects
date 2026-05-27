# Day 4: JSON 解析与天气数据提取 | JSON Parsing & Weather Data

## 今日目标 | Today's Goals

- 理解 JSON 数据格式的结构
- 学会使用 ArduinoJson 库解析 JSON
- 从和风天气 API 返回数据中提取温度和天气代码
- 了解天气代码与天气类型的对应关系

---

## 上午 (3h) | Morning Session

### 1. JSON 格式入门 (1.5h)

**JSON 是什么**：
JavaScript Object Notation — 一种轻量级的数据交换格式，易于人阅读和机器解析。

**JSON 的数据类型**：
| 类型 | 示例 | 说明 |
|------|------|------|
| 对象 Object | `{"name":"Tom","age":18}` | 花括号，键值对 |
| 数组 Array | `["晴","多云","雨"]` | 方括号，有序列表 |
| 字符串 String | `"hello"` | 双引号包裹 |
| 数字 Number | `25` / `3.14` | 整数或浮点数 |
| 布尔 Boolean | `true` / `false` | 真或假 |
| 空值 Null | `null` | 表示无值 |

**和风天气 API 返回的 JSON 结构**（简化版）：

```json
{
  "code": "200",
  "now": {
    "temp": "25",
    "feelsLike": "23",
    "icon": "100",
    "text": "晴",
    "windDir": "北风",
    "windScale": "3"
  },
  "basic": {
    "location": "北京"
  }
}
```

**练习：手动解析**
```json
{
  "name": "Xiao Ming",
  "scores": [85, 92, 78],
  "address": {
    "city": "Beijing",
    "district": "Haidian"
  }
}
```
问题：
1. `name` 的值是什么？
2. `scores` 数组的第二项是多少？
3. `address.city` 的值是什么？

### 2. ArduinoJson 库入门 (1.5h)

**安装**：Arduino IDE → 工具 → 管理库 → 搜索 "ArduinoJson" → 安装 (by Benoit Blanchon)

**⚠️ 版本注意**：本项目使用 ArduinoJson v5，API 为 `DynamicJsonBuffer`。v6+ 改用 `DynamicJsonDocument`。请安装 5.x 版本。

**解析 JSON 的基本步骤**：

```cpp
#include <ArduinoJson.h>

void parseExample(String jsonString) {
  // 1. 创建 JSON 缓冲区（1024 字节）
  DynamicJsonBuffer jsonBuffer(1024);
  
  // 2. 解析 JSON 字符串
  JsonObject& root = jsonBuffer.parseObject(jsonString);
  
  // 3. 检查解析是否成功
  if (!root.success()) {
    Serial.println("JSON 解析失败！");
    return;
  }
  
  // 4. 提取数据（按路径逐级访问）
  String location = root["basic"]["location"];  // "北京"
  String temp = root["now"]["feelsLike"];        // "23"
  int icon = root["now"]["icon"];                // 100
  
  // 5. 打印结果
  Serial.println("地区: " + location);
  Serial.println("温度: " + temp + "°C");
  Serial.println("天气代码: " + String(icon));
  
  // 6. 清理
  jsonBuffer.clear();
}
```

**常见错误**：
- `root["xxx"]` 字段名写错 → 检查 API 返回的 JSON 中的实际字段名
- 数字类型用 String 接收 → `int icon = root["now"]["icon"];` 而不是 `String icon = ...;`
- 缓冲区太小 → 增大 `DynamicJsonBuffer(2048)` 的值

---

## 下午 (4h) | Afternoon Session

### 3. 整合：从 API 到结构化数据 (2h)

**完整的天气数据获取+解析函数**：

```cpp
void getWeatherData() {
  // 连接和风天气 API
  std::unique_ptr<BearSSL::WiFiClientSecure> client(
    new BearSSL::WiFiClientSecure
  );
  client->setInsecure();
  
  HTTPClient https;
  String url = "https://devapi.heweather.net/v7/weather/now";
  url += "?gzip=n&location=" + cityCode + "&key=" + apiKey;
  
  if (https.begin(*client, url)) {
    int httpCode = https.GET();
    
    if (httpCode == HTTP_CODE_OK) {
      String response = https.getString();
      Serial.println("原始返回: " + response);
      
      // 解析 JSON
      DynamicJsonBuffer jsonBuffer(1024);
      JsonObject& root = jsonBuffer.parseObject(response);
      
      if (root.success()) {
        // 提取三个关键数据
        cityName = root["basic"]["location"].as<String>();
        weatherIcon = root["now"]["icon"];           // int
        feelsLike = root["now"]["feelsLike"].as<String>();
        
        Serial.println("城市: " + cityName);
        Serial.println("天气图标代码: " + String(weatherIcon));
        Serial.println("体感温度: " + feelsLike + "°C");
      } else {
        Serial.println("JSON 解析失败！");
      }
      jsonBuffer.clear();
    }
    https.end();
  }
}
```

### 4. 天气代码映射 (1h)

和风天气使用数字代码表示天气类型：

| 代码 | 天气 | 图标文件 |
|------|------|---------|
| 100, 150 | 晴 Sunny | col_100 |
| 101, 102 | 多云 Cloudy | col_102 |
| 103, 153 | 晴间多云 Partly Cloudy | col_103 |
| 104, 154 | 阴 Overcast | col_104 |
| 300-301 | 阵雨 Shower | col_301 |
| 302-303 | 雷阵雨 Thunderstorm | col_302 |
| 304 | 冰雹 Hail | col_304 |
| 305-307, 314-315, 350-351, 399 | 雨 Rain | col_307 |
| 308-313, 316-318 | 暴雨 Heavy Rain | col_310 |
| 400-401, 408-410, 456, 499 | 雪 Snow | col_401 |
| 407, 457 | 阵雪 Snow Shower | col_407 |
| 500-502 | 雾霾 Haze | col_500 |
| 503-508 | 沙尘暴 Sandstorm | col_503 |
| 509-515 | 恶劣天气 Severe | col_509 |
| 其他 | 未知 Unknown | col_999 |

### 5. 练习：获取空气质量数据 (1h)

**PM2.5 API**：
```
https://devapi.heweather.net/v7/air/now?location=城市编号&key=你的key
```

**任务**：
1. 仿照天气数据获取函数，实现 PM2.5 数据的获取和解析
2. 需要提取的字段：`root["now"]["pm2p5"]`
3. 将 PM2.5 值显示在串口

---

## 今日作业 | Today's Task

1. 完成天气数据获取 + JSON 解析，串口输出城市名、天气代码、体感温度
2. 完成 PM2.5 数据获取和解析
3. 将天气代码映射表抄写到笔记本上（不用全记，理解对应关系即可）

## 今日检查点 | Checkpoint

- [ ] 能正确解析 JSON 并提取 `location`, `icon`, `feelsLike` 三个字段吗？
- [ ] 解析失败时有没有错误提示（串口输出）？
- [ ] PM2.5 数据能正确获取吗？
- [ ] 你知道 `DynamicJsonBuffer` 的作用吗？
