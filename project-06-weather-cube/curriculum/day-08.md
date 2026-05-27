# Day 8: 天气图标与整合测试 | Weather Icons & Integration Testing

## 今日目标 | Today's Goals

- 理解天气代码到图标的映射逻辑
- 掌握 BMP 位图在嵌入式设备上的管理
- 完成所有功能整合
- 进行系统级测试，修复 bug

---

## 上午 (3h) | Morning Session

### 1. 天气图标系统 (1.5h)

**图标映射函数**（来自 weather_cube.ino）：

```cpp
void drawWeatherIcon(int weatherCode) {
  if (weatherCode == 100 || weatherCode == 150) {
    u8g2.drawXBMP(0, 0, 40, 40, col_100);  // 晴
  } else if (weatherCode == 102 || weatherCode == 101) {
    u8g2.drawXBMP(0, 0, 40, 40, col_102);  // 多云
  } else if (weatherCode == 103 || weatherCode == 153) {
    u8g2.drawXBMP(0, 0, 40, 40, col_103);  // 晴间多云
  } else if (weatherCode == 104 || weatherCode == 154) {
    u8g2.drawXBMP(0, 0, 40, 40, col_104);  // 阴
  } else if (weatherCode >= 300 && weatherCode <= 301) {
    u8g2.drawXBMP(0, 0, 40, 40, col_301);  // 阵雨
  } else if (weatherCode >= 302 && weatherCode <= 303) {
    u8g2.drawXBMP(0, 0, 40, 40, col_302);  // 雷阵雨
  } else if (weatherCode == 304) {
    u8g2.drawXBMP(0, 0, 40, 40, col_304);  // 冰雹
  }
  // ... 更多天气代码映射 ...
  else {
    u8g2.drawXBMP(0, 0, 40, 40, col_999);  // 未知
  }
}
```

**为什么用 if/else 链而不是 switch/case**：
- 很多天气代码是**区间范围**（如 300-301、305-399）
- switch/case 不支持区间匹配
- if/else 链虽然写起来长，但逻辑清晰

**位图数据管理**：
- 所有图标存储在 `zlt.h` 文件中
- 使用 `PROGMEM` 存储在 Flash 中
- 每个 40×40 图标约 200 字节（40×40/8）

### 2. 位图数据结构理解 (1.5h)

**一个 8×8 像素的简单位图示例**：

```
位图内容：
  □□□■■□□□   对应 HEX: 0x18
  □□■■■■□□           0x3C
  □■■□□■■□           0x66
  □■■□□■■□           0x66
  □■■■■■■□           0x7E
  □■■□□■■□           0x66
  □□□□□□□□           0x00
  □□□□□□□□           0x00

C 数组表示：
const unsigned char smiley[] PROGMEM = {
  0x18, 0x3C, 0x66, 0x66, 0x7E, 0x66, 0x00, 0x00
};
// drawXBMP(x, y, 8, 8, smiley)
```

**练习**：在纸上画一个 8×8 的简单图案（如心形），手动编码为字节数组。

---

## 下午 (4h) | Afternoon Session

### 3. 全功能整合 (1.5h)

**整合 checklist**：

```
[ ] 上电 → OLED 显示启动画面
[ ] WiFi 未配置 → 进入 AP 配网模式
[ ] WiFi 已配置 → 自动连接
[ ] 连接成功 → 显示 logo
[ ] 获取天气数据（和风天气 API）
[ ] 获取 PM2.5 数据
[ ] 同步 NTP 时间
[ ] 显示完整 UI（图标 + 时间 + 日期 + 温度 + PM2.5）
[ ] 每 30 秒刷新时间
[ ] 每 30 分钟刷新天气
[ ] 串口输出完整调试信息
```

### 4. 系统测试 (1h)

**测试维度**：

| 测试场景 | 预期行为 | 实际结果 |
|---------|---------|---------|
| 首次上电 | AP 配网模式 | |
| WiFi 密码错误 | 提示连接失败 | |
| API Key 无效 | 天气数据为空，不崩溃 | |
| WiFi 断连 | 继续显示旧数据 | |
| 重新上电 | 自动重连 WiFi | |
| 连续运行 1 小时 | 时间准确，无内存泄漏 | |

**调试技巧**：
- 在每个 `loop()` 循环打印 `ESP.getFreeHeap()` 查看剩余内存
- 如果内存持续下降 → 存在内存泄漏
- 常见原因：JSON buffer 未 clear、String 大量拼接

### 5. Bug 修复与代码优化 (1.5h)

**常见问题**：

1. **屏幕闪烁** → 确保使用 `clearBuffer/sendBuffer` 双缓冲
2. **天气图标不更新** → 检查 `col = tq;` 是否在数据获取后执行
3. **时间显示错乱** → 检查 `timeZone = 8` 是否正确
4. **内存不足重启** → 减少 String 使用，及时 `jsonBuffer.clear()`
5. **HTTPS 连接失败** → 检查 `client->setInsecure()` 是否调用

**代码整理建议**：
- 将常数值提取为 #define
- 统一变量命名风格
- 添加必要注释
- 删除调试用的 Serial.print

---

## 今日作业 | Today's Task

1. 完成全功能整合，所有功能正常运行
2. 进行至少 3 个测试场景的验证
3. 修复发现的 bug
4. 开始编写最终项目文档

## 今日检查点 | Checkpoint

- [ ] 所有核心功能（时间、天气、PM2.5）都正常工作吗？
- [ ] 设备能长时间稳定运行（1 小时+）吗？
- [ ] 断电重启后能自动恢复工作吗？
- [ ] 代码已经基本整理干净了吗？
