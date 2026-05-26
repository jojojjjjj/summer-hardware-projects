# 硬件故障排除 | Hardware Troubleshooting

## 常见问题列表 | Common Issues

### 1. Arduino无法被电脑识别

**症状：** 插入USB线后，设备管理器中没有出现COM端口。

**可能原因与解决方案：**

| 原因 | 解决方案 |
|------|----------|
| USB线只能充电不能传数据 | 更换一根支持数据传输的USB线 |
| 驱动未安装 | 安装CH340驱动（大多数国产Arduino Nano使用CH340芯片） |
| USB口故障 | 换一个USB口试试 |
| Arduino硬件故障 | 尝试连接另一块Arduino |

**安装CH340驱动：**
1. 搜索"CH340 驱动下载"
2. 下载对应操作系统的驱动
3. 安装后重新插拔USB线
4. 在设备管理器中确认COM端口出现

### 2. 串口连接失败

**症状：** Python的`serial.Serial()`报错"could not open port"。

**可能原因与解决方案：**

| 原因 | 解决方案 |
|------|----------|
| COM端口号错误 | 使用`serial.tools.list_ports`查看正确的端口号 |
| 端口被占用 | 关闭Arduino IDE的串口监视器或其他串口工具 |
| 权限不足（Mac/Linux） | 使用`sudo`运行或添加用户到dialout组 |
| 波特率不匹配 | 确认Python代码中的波特率与Arduino代码中一致 |

**查看可用端口的Python代码：**
```python
import serial.tools.list_ports

ports = serial.tools.list_ports.comports()
if not ports:
    print("没有找到串口设备！请检查USB连接。")
else:
    for port in ports:
        print(f"端口: {port.device}")
        print(f"  描述: {port.description}")
        print(f"  制造商: {port.manufacturer}")
```

### 3. 按键无反应

**症状：** 按下按键后，桌宠没有任何反应。

**排查步骤：**

1. **检查接线**
   - 确认VCC接5V、GND接GND、OUT接D2
   - 确认杜邦线插紧

2. **测试Arduino端**
   - 在Arduino IDE中打开串口监视器
   - 确认Arduino代码正在读取D2引脚

3. **测试传感器**
   ```python
   import serial
   ser = serial.Serial('COM3', 9600)  # 替换为你的端口号
   while True:
       if ser.in_waiting:
           line = ser.readline().decode().strip()
           print(f"收到: {line}")
   ```

4. **确认按键模块类型**
   - 自锁按键：按下一次保持，再按一次弹起
   - 瞬时按键：按住才触发，松开就恢复
   - 不同类型需要不同的Arduino代码

### 4. DHT11读数异常

**症状：** 温度/湿度读数为0、NaN或明显不正确。

**排查步骤：**

1. **检查接线**：DATA线连接到D3
2. **确认模块类型**：3引脚模块 vs 4引脚模块
3. **检查上拉电阻**：部分DHT11裸模块需要外部4.7K上拉电阻
4. **等待时间**：DHT11采样间隔不低于1秒
5. **检查供电**：确保5V供电正常

**Arduino测试代码：**
```cpp
#include <DHT.h>
#define DHTPIN 3
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
    Serial.begin(9600);
    dht.begin();
}

void loop() {
    float h = dht.readHumidity();
    float t = dht.readTemperature();

    if (isnan(h) || isnan(t)) {
        Serial.println("读取DHT11失败！");
    } else {
        Serial.print("湿度: ");
        Serial.print(h);
        Serial.print("% 温度: ");
        Serial.print(t);
        Serial.println("°C");
    }
    delay(2000);
}
```

### 5. 数据传输不稳定

**症状：** 串口数据时有时无，或者收到乱码。

**可能原因与解决方案：**

| 原因 | 解决方案 |
|------|----------|
| 杜邦线松动 | 重新插紧所有杜邦线 |
| 波特率不匹配 | 确保Arduino和Python使用相同的波特率 |
| USB线质量差 | 更换数据线 |
| 电磁干扰 | 远离大功率电器和手机 |

### 6. Arduino Nano引脚接触不良

**症状：** 某些功能时好时坏，轻拍面包板后变化。

**解决方案：**
- 检查Arduino Nano引脚是否弯曲
- 重新拔插Arduino到面包板
- 如果面包板质量差，更换面包板
- 确认Arduino完全插入面包板（引脚没入一半以上）

---

## 调试工具 | Debugging Tools

### 工具1：Arduino IDE 串口监视器
- 下载安装 Arduino IDE
- 工具 -> 串口监视器
- 选择正确的COM端口和波特率
- 可以直接查看Arduino发送的数据

### 工具2：Python串口测试脚本
```python
"""串口调试工具 -- 用于测试Arduino连接"""
import serial
import serial.tools.list_ports
import time

def list_ports():
    """列出所有可用串口"""
    ports = serial.tools.list_ports.comports()
    print("=" * 40)
    print("可用串口：")
    for i, port in enumerate(ports):
        print(f"  [{i+1}] {port.device}: {port.description}")
    print("=" * 40)
    return ports

def monitor(port_name, baudrate=9600):
    """监控串口数据"""
    try:
        ser = serial.Serial(port_name, baudrate, timeout=1)
        print(f"已连接 {port_name}，波特率 {baudrate}")
        print("按 Ctrl+C 退出监控\n")

        while True:
            if ser.in_waiting:
                line = ser.readline().decode('utf-8', errors='ignore').strip()
                if line:
                    print(f"[收到] {line}")
    except serial.SerialException as e:
        print(f"连接错误: {e}")
    except KeyboardInterrupt:
        print("\n监控已停止")
    finally:
        if 'ser' in locals() and ser.is_open:
            ser.close()

if __name__ == "__main__":
    ports = list_ports()
    if ports:
        port = input("请输入要监控的端口号（如 COM3）: ")
        monitor(port)
    else:
        print("未找到串口设备，请检查USB连接。")
```

---

## 联系帮助 | Getting Help

如果以上方法都无法解决问题：

1. **搜索错误信息**：将完整的错误信息复制到搜索引擎
2. **查看Arduino官方论坛**：https://forum.arduino.cc/
3. **B站搜索**：搜索"Arduino Nano 入门教程"
4. **向老师求助**：将问题描述、错误信息、已尝试的解决方法一起发给老师

*最后更新：2026-05-26*
