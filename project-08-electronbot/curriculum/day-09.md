# Day 09: Unity基础与ElectronBot SDK架构 | Unity Basics & ElectronBot SDK Architecture

---

## 今日目标 | Today's Objectives

- 理解Unity编辑器的基本工作流程和C#脚本开发 | Understand Unity editor workflow and C# scripting
- 掌握Unity场景、游戏对象和组件的概念 | Master Unity scenes, GameObjects, and components
- 理解ElectronBot SDK的四层架构设计 | Understand ElectronBot SDK's 4-layer architecture
- 实现Unity与硬件之间的C++ DLL桥接通信 | Implement Unity-to-hardware C++ DLL bridge communication

## 产出 | Deliverables

- Unity项目基础框架（场景+脚本） | Unity project base framework (scene + scripts)
- UnityBridge DLL桥接代码 | UnityBridge DLL bridge code
- 3D虚拟机器人同步演示 | 3D virtual robot sync demo

---

## 时间安排 | Schedule

| 时间 Time | 内容 Content | 类型 Type |
|-----------|-------------|-----------|
| 09:00 - 09:30 | Unity编辑器入门 Unity Editor Intro | 讲解 Lecture |
| 09:30 - 10:30 | C#脚本基础与组件系统 C# Scripting & Components | 实践 Practice |
| 10:30 - 10:45 | 休息 Break | — |
| 10:45 - 11:30 | 场景搭建与游戏对象 Scene Building | 实践 Practice |
| 11:30 - 12:00 | Unity-硬件桥接架构 Hardware Bridge Architecture | 讲解 Lecture |
| 12:00 - 13:30 | 午休 Lunch Break | — |
| 13:30 - 14:30 | ElectronBot SDK四层架构 ElectronBot SDK Layers | 讲解+实践 Lecture+Practice |
| 14:30 - 15:30 | C++ DLL桥接与USB通信 C++ DLL Bridge & USB | 实践 Practice |
| 15:30 - 15:45 | 休息 Break | — |
| 15:45 - 16:30 | 3D虚拟机器人同步 3D Virtual Robot Sync | 实践 Practice |
| 16:30 - 17:00 | 总结与答疑 Summary & Q&A | 讨论 Discussion |

---

## 上午 | Morning Session

### 任务一：Unity编辑器基础 | Task 1: Unity Editor Basics

#### 为什么要学这个 | Why Learn This

Unity是工业标准的实时3D引擎，掌握Unity编辑器是构建桌面宠物软件界面的前提。ElectronBot的桌面端控制软件就是基于Unity构建的。

Unity is an industry-standard real-time 3D engine. Mastering the Unity editor is the prerequisite for building the desktop pet software interface. ElectronBot's desktop control software is built on Unity.

#### 步骤 | Steps

1. 下载并安装Unity Hub + Unity 2021.3 LTS | Download and install Unity Hub + Unity 2021.3 LTS
2. 创建新3D项目 | Create a new 3D project
3. 熟悉编辑器布局：Hierarchy、Inspector、Scene、Game、Project | Familiarize with editor layout
4. 创建基本3D对象（Cube、Sphere、Plane）| Create basic 3D objects
5. 学习摄像机和灯光设置 | Learn camera and lighting setup

#### 代码示例 | Code Example

```csharp
// HelloUnity.cs - 第一个Unity脚本 | First Unity script
using UnityEngine;

public class HelloUnity : MonoBehaviour
{
    // Start在第一帧更新前调用 | Start is called before the first frame update
    void Start()
    {
        Debug.Log("ElectronBot Desktop Pet - Unity initialized!");
        Debug.Log("ElectronBot桌面宠物 - Unity已初始化！");
    }

    // Update每帧调用 | Update is called once per frame
    void Update()
    {
        // 按空格键旋转对象 | Rotate object on spacebar press
        if (Input.GetKeyDown(KeyCode.Space))
        {
            transform.Rotate(0f, 45f, 0f);
            Debug.Log("Rotated! 旋转了！");
        }
    }
}
```

#### 预期结果 | Expected Result

- Unity编辑器正常运行，可以看到3D场景 | Unity editor runs with visible 3D scene
- 挂载脚本后对象可以通过空格键旋转 | Object rotates via spacebar after script attachment
- Console面板输出日志信息 | Console panel shows log messages

#### 常见问题 | Common Issues

| 问题 Issue | 原因 Cause | 解决 Solution |
|------------|-----------|--------------|
| 脚本无法挂载 Script won't attach | 类名与文件名不一致 Class/file name mismatch | 确保类名=文件名 Ensure class name = file name |
| Console无输出 No console output | 未展开Console面板 Console panel collapsed | 点击Window > General > Console |
| 场景全黑 Scene is black | 没有灯光 No light | 添加Directional Light |

---

### 任务二：C#脚本基础与组件系统 | Task 2: C# Scripting & Component System

#### 为什么要学这个 | Why Learn This

C#是Unity的核心编程语言。理解MonoBehaviour生命周期和组件模式是编写硬件控制逻辑的基础。

C# is Unity's core programming language. Understanding MonoBehaviour lifecycle and component patterns is the foundation for writing hardware control logic.

#### 步骤 | Steps

1. 学习MonoBehaviour生命周期（Awake, Start, Update, OnApplicationQuit）| Learn MonoBehaviour lifecycle
2. 理解组件模式：一个GameObject可挂载多个组件 | Understand component pattern
3. 使用SerializeField和public变量在Inspector中调节参数 | Use SerializeField and public variables
4. 实现对象间的引用和通信 | Implement inter-object references

#### 代码示例 | Code Example

```csharp
// ServoController.cs - 舵机控制器组件 | Servo controller component
using UnityEngine;

public class ServoController : MonoBehaviour
{
    [Header("舵机配置 Servo Configuration")]
    [SerializeField] private int servoId = 0;
    [SerializeField] private float minAngle = 0f;
    [SerializeField] private float maxAngle = 180f;
    [SerializeField] private float currentAngle = 90f;

    // 舵机ID属性 | Servo ID property
    public int ServoId => servoId;

    // 设置角度（带范围限制）| Set angle with range clamping
    public void SetAngle(float angle)
    {
        currentAngle = Mathf.Clamp(angle, minAngle, maxAngle);
        // 更新3D对象的旋转 | Update 3D object rotation
        transform.localRotation = Quaternion.Euler(0f, currentAngle, 0f);
    }

    // 获取当前角度 | Get current angle
    public float GetAngle()
    {
        return currentAngle;
    }

    // 平滑旋转到目标角度 | Smoothly rotate to target angle
    public void RotateTo(float targetAngle, float speed)
    {
        float clamped = Mathf.Clamp(targetAngle, minAngle, maxAngle);
        currentAngle = Mathf.Lerp(currentAngle, clamped, Time.deltaTime * speed);
        transform.localRotation = Quaternion.Euler(0f, currentAngle, 0f);
    }

    void OnDrawGizmos()
    {
        // 在Scene视图中显示舵机范围 | Show servo range in Scene view
        Gizmos.color = Color.green;
        Gizmos.DrawWireSphere(transform.position, 0.1f);
    }
}
```

```csharp
// RobotArm.cs - 机器人手臂组件 | Robot arm component
using UnityEngine;

public class RobotArm : MonoBehaviour
{
    [Header("关节引用 Joint References")]
    [SerializeField] private ServoController shoulder;
    [SerializeField] private ServoController elbow;
    [SerializeField] private ServoController wrist;

    // 同时设置所有关节角度 | Set all joint angles simultaneously
    public void SetPose(float shoulderAngle, float elbowAngle, float wristAngle)
    {
        shoulder.SetAngle(shoulderAngle);
        elbow.SetAngle(elbowAngle);
        wrist.SetAngle(wristAngle);
    }

    // 获取当前姿态 | Get current pose
    public float[] GetPose()
    {
        return new float[]
        {
            shoulder.GetAngle(),
            elbow.GetAngle(),
            wrist.GetAngle()
        };
    }
}
```

#### 预期结果 | Expected Result

- Inspector面板显示可调节的舵机参数 | Inspector shows adjustable servo parameters
- 3D对象随角度变化而旋转 | 3D objects rotate with angle changes
- 多个组件可以协同工作 | Multiple components work together

---

### 任务三：Unity-硬件桥接架构 | Task 3: Unity-Hardware Bridge Architecture

#### 为什么要学这个 | Why Learn This

Unity运行在C#托管环境中，而硬件通信需要调用底层C++ DLL。理解桥接架构是实现软件控制硬件的关键。

Unity runs in a C# managed environment, while hardware communication requires calling low-level C++ DLLs. Understanding bridge architecture is key to software-controlled hardware.

#### 架构概览 | Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│  Layer 4: Unity Application (C# Scripts)            │
│  - UI Controller, Animation, User Interaction        │
│  Unity应用层                                         │
├─────────────────────────────────────────────────────┤
│  Layer 3: C# Bridge Layer (DllImport Wrapper)        │
│  - UnityBridge.cs, DataConverter.cs                  │
│  C#桥接层                                            │
├─────────────────────────────────────────────────────┤
│  Layer 2: C++ SDK Layer (ElectronBot SDK DLL)        │
│  - USB Communication, Protocol Parsing               │
│  C++ SDK层                                           │
├─────────────────────────────────────────────────────┤
│  Layer 1: Hardware Layer (ElectronBot Robot)         │
│  - MCU, Servos, Sensors, USB Device                  │
│  硬件层                                              │
└─────────────────────────────────────────────────────┘
```

#### 步骤 | Steps

1. 理解四层架构的职责划分 | Understand responsibility of each layer
2. 学习P/Invoke和DllImport机制 | Learn P/Invoke and DllImport mechanism
3. 设计数据流：Unity -> Bridge -> DLL -> USB -> Robot | Design data flow
4. 编写桥接层代码 | Write bridge layer code

#### 代码示例 | Code Example

```csharp
// UnityBridge.cs - Unity到C++ DLL的桥接层 | Unity to C++ DLL bridge layer
using System;
using System.Runtime.InteropServices;
using UnityEngine;

public static class UnityBridge
{
    // DLL路径 | DLL path - 将编译好的DLL放在Unity项目Plugins文件夹
    private const string DLL_NAME = "ElectronBotDLL";

    // ===== DLL导入函数 | DLL Import Functions =====

    // 连接机器人 | Connect to robot
    [DllImport(DLL_NAME, CallingConvention = CallingConvention.Cdecl)]
    private static extern int EB_Connect();

    // 断开连接 | Disconnect
    [DllImport(DLL_NAME, CallingConvention = CallingConvention.Cdecl)]
    private static extern void EB_Disconnect();

    // 发送舵机角度数据 | Send servo angle data
    [DllImport(DLL_NAME, CallingConvention = CallingConvention.Cdecl)]
    private static extern int EB_SendServoAngles(
        float j1, float j2, float j3, float j4, float j5, float j6);

    // 读取传感器数据 | Read sensor data
    [DllImport(DLL_NAME, CallingConvention = CallingConvention.Cdecl)]
    private static extern int EB_ReadSensorData(byte[] buffer, int bufferSize);

    // 获取连接状态 | Get connection status
    [DllImport(DLL_NAME, CallingConvention = CallingConvention.Cdecl)]
    private static extern bool EB_IsConnected();

    // ===== 高级封装 | High-level Wrappers =====

    private static bool isConnected = false;

    // 连接机器人（带错误处理）| Connect with error handling
    public static bool Connect()
    {
        try
        {
            int result = EB_Connect();
            isConnected = result == 0;
            if (isConnected)
            {
                Debug.Log("[UnityBridge] ElectronBot connected! 机器人已连接！");
            }
            else
            {
                Debug.LogError($"[UnityBridge] Connection failed: code {result} 连接失败");
            }
            return isConnected;
        }
        catch (DllNotFoundException)
        {
            Debug.LogError("[UnityBridge] DLL not found! 请将ElectronBotDLL放入Plugins文件夹");
            return false;
        }
        catch (EntryPointNotFoundException e)
        {
            Debug.LogError($"[UnityBridge] Function not found: {e.Message} 函数未找到");
            return false;
        }
    }

    // 发送姿态数据 | Send pose data
    public static bool SendPose(float[] angles)
    {
        if (!isConnected || angles.Length < 6)
        {
            Debug.LogWarning("[UnityBridge] Cannot send pose: not connected or invalid data");
            return false;
        }

        int result = EB_SendServoAngles(
            angles[0], angles[1], angles[2],
            angles[3], angles[4], angles[5]);

        return result == 0;
    }

    // 断开连接 | Disconnect
    public static void Disconnect()
    {
        if (isConnected)
        {
            EB_Disconnect();
            isConnected = false;
            Debug.Log("[UnityBridge] ElectronBot disconnected. 机器人已断开。");
        }
    }

    // 检查连接状态 | Check connection status
    public static bool IsConnected => isConnected;
}
```

#### 预期结果 | Expected Result

- 理解四层架构的数据流向 | Understand data flow across 4 layers
- DLL桥接代码编译无错误 | DLL bridge code compiles without errors
- 能够在Unity中调用C++ DLL函数 | Can call C++ DLL functions from Unity

#### 常见问题 | Common Issues

| 问题 Issue | 原因 Cause | 解决 Solution |
|------------|-----------|--------------|
| DllNotFoundException | DLL文件不在Plugins文件夹 | 将DLL放入Assets/Plugins/x86_64/ |
| EntryPointNotFoundException | 函数签名不匹配 | 检查CallingConvention和函数名 |
| BadImageFormatException | 32/64位不匹配 | 确保DLL位数与Unity一致 |

---

## 下午 | Afternoon Session

### 任务四：ElectronBot SDK四层架构详解 | Task 4: ElectronBot SDK 4-Layer Architecture Deep Dive

#### 为什么要学这个 | Why Learn This

深入理解SDK架构才能正确使用API，也便于调试通信问题。每一层都有不同的职责，错误可能出现在任何一层。

Deep understanding of SDK architecture enables correct API usage and easier debugging. Each layer has distinct responsibilities, and errors can occur at any level.

#### 步骤 | Steps

1. 分析ElectronBot SDK源码结构 | Analyze ElectronBot SDK source structure
2. 理解USB数据包协议格式 | Understand USB packet protocol format
3. 实现数据封包和解包 | Implement packet packing and unpacking
4. 编写通信测试代码 | Write communication test code

#### 代码示例 | Code Example

```csharp
// USBDataPacket.cs - USB数据包定义 | USB data packet definition
using System;
using System.Runtime.InteropServices;

[StructLayout(LayoutKind.Sequential, Pack = 1)]
public struct ServoCommand
{
    // 包头 | Packet header
    public ushort header;           // 0xEB01 固定包头 Fixed header

    // 6个舵机角度（单位：度）| 6 servo angles in degrees
    public float joint1;
    public float joint2;
    public float joint3;
    public float joint4;
    public float joint5;
    public float joint6;

    // 控制标志 | Control flags
    public byte ledEnable;          // LED使能 LED enable
    public byte ledR, ledG, ledB;   // LED颜色 LED color

    // 校验和 | Checksum
    public byte checksum;

    // 包尾 | Packet tail
    public ushort tail;             // 0xEB02 固定包尾 Fixed tail
}

// 数据包工具类 | Data packet utility
public static class PacketBuilder
{
    public const ushort HEADER = 0xEB01;
    public const ushort TAIL = 0xEB02;

    // 构建命令包 | Build command packet
    public static ServoCommand BuildCommand(
        float[] angles,
        bool ledOn = false,
        byte r = 0, byte g = 0, byte b = 0)
    {
        var cmd = new ServoCommand
        {
            header = HEADER,
            joint1 = angles[0],
            joint2 = angles[1],
            joint3 = angles[2],
            joint4 = angles[3],
            joint5 = angles[4],
            joint6 = angles[5],
            ledEnable = (byte)(ledOn ? 1 : 0),
            ledR = r,
            ledG = g,
            ledB = b,
            tail = TAIL
        };

        cmd.checksum = CalculateChecksum(cmd);
        return cmd;
    }

    // 计算校验和 | Calculate checksum
    private static byte CalculateChecksum(ServoCommand cmd)
    {
        byte sum = 0;
        byte[] bytes = StructureToByteArray(cmd);
        // 跳过包头2字节和校验和1字节 | Skip header(2) and checksum(1)
        for (int i = 2; i < bytes.Length - 3; i++)
        {
            sum += bytes[i];
        }
        return (byte)(sum & 0xFF);
    }

    // 结构体转字节数组 | Struct to byte array
    public static byte[] StructureToByteArray<T>(T obj) where T : struct
    {
        int size = Marshal.SizeOf<T>();
        byte[] arr = new byte[size];
        IntPtr ptr = Marshal.AllocHGlobal(size);
        Marshal.StructureToPtr(obj, ptr, true);
        Marshal.Copy(ptr, arr, 0, size);
        Marshal.FreeHGlobal(ptr);
        return arr;
    }

    // 验证接收到的数据包 | Validate received packet
    public static bool ValidatePacket(byte[] data)
    {
        if (data.Length < 4) return false;

        // 检查包头 | Check header
        if (data[0] != 0xEB || data[1] != 0x01) return false;

        // 检查包尾 | Check tail
        int len = data.Length;
        if (data[len - 2] != 0xEB || data[len - 1] != 0x02) return false;

        return true;
    }
}
```

#### 预期结果 | Expected Result

- 理解USB数据包的完整格式 | Understand complete USB packet format
- 能够构建和解析数据包 | Can build and parse data packets
- 校验和计算正确 | Checksum calculation is correct

---

### 任务五：C++ DLL桥接实现 | Task 5: C++ DLL Bridge Implementation

#### 为什么要学这个 | Why Learn This

实际的ElectronBot SDK是C++编写的，Unity通过P/Invoke调用。理解C++端的实现有助于排查通信问题。

The actual ElectronBot SDK is written in C++, called by Unity via P/Invoke. Understanding the C++ side helps troubleshoot communication issues.

#### 步骤 | Steps

1. 创建C++ DLL项目 | Create C++ DLL project
2. 实现USB设备枚举和连接 | Implement USB device enumeration and connection
3. 编写导出函数（extern "C"）| Write export functions
4. 编译DLL并放入Unity项目 | Compile DLL and place in Unity project

#### 代码示例 | Code Example

```cpp
// ElectronBotDLL.cpp - C++ DLL导出函数 | C++ DLL export functions
// 编译命令 (Visual Studio): Build as x64 DLL
// Compile command (Visual Studio): Build as x64 DLL

#include <windows.h>
#include <setupapi.h>
#include <hidsdi.h>
#include <cstdint>
#include <cstring>

#pragma comment(lib, "setupapi.lib")
#pragma comment(lib, "hid.lib")

// ===== USB设备句柄 | USB Device Handle =====
static HANDLE g_deviceHandle = INVALID_HANDLE_VALUE;
static bool g_connected = false;

// ElectronBot VID/PID
#define EB_VID 0xXXXX  // 替换为实际VID | Replace with actual VID
#define EB_PID 0xXXXX  // 替换为实际PID | Replace with actual PID

// ===== 导出函数 | Exported Functions =====

extern "C" {

// 连接ElectronBot | Connect to ElectronBot
__declspec(dllexport) int EB_Connect()
{
    // 枚举HID设备 | Enumerate HID devices
    GUID hidGuid;
    HidD_GetHidGuid(&hidGuid);

    HDEVINFO devInfo = SetupDiGetClassDevs(
        &hidGuid, NULL, NULL,
        DIGCF_PRESENT | DIGCF_DEVICEINTERFACE);

    if (devInfo == INVALID_HANDLE_VALUE)
        return -1;  // 枚举失败 | Enumeration failed

    SP_DEVICE_INTERFACE_DATA devInterfaceData;
    devInterfaceData.cbSize = sizeof(SP_DEVICE_INTERFACE_DATA);

    for (DWORD i = 0; SetupDiEnumDeviceInterfaces(
        devInfo, NULL, &hidGuid, i, &devInterfaceData); i++)
    {
        // 获取设备路径 | Get device path
        DWORD requiredSize = 0;
        SetupDiGetDeviceInterfaceDetail(
            devInfo, &devInterfaceData, NULL, 0, &requiredSize, NULL);

        PSP_DEVICE_INTERFACE_DETAIL_DATA detailData =
            (PSP_DEVICE_INTERFACE_DETAIL_DATA)malloc(requiredSize);
        detailData->cbSize = sizeof(SP_DEVICE_INTERFACE_DETAIL_DATA);

        if (SetupDiGetDeviceInterfaceDetail(
            devInfo, &devInterfaceData, detailData,
            requiredSize, NULL, NULL))
        {
            // 打开设备 | Open device
            g_deviceHandle = CreateFile(
                detailData->DevicePath,
                GENERIC_READ | GENERIC_WRITE,
                FILE_SHARE_READ | FILE_SHARE_WRITE,
                NULL, OPEN_EXISTING, 0, NULL);

            if (g_deviceHandle != INVALID_HANDLE_VALUE)
            {
                // 检查VID/PID | Check VID/PID
                HIDD_ATTRIBUTES attr;
                attr.Size = sizeof(HIDD_ATTRIBUTES);
                HidD_GetAttributes(g_deviceHandle, &attr);

                if (attr.VendorID == EB_VID && attr.ProductID == EB_PID)
                {
                    g_connected = true;
                    free(detailData);
                    SetupDiDestroyDeviceInfoList(devInfo);
                    return 0;  // 连接成功 | Connection successful
                }
                CloseHandle(g_deviceHandle);
                g_deviceHandle = INVALID_HANDLE_VALUE;
            }
        }
        free(detailData);
    }

    SetupDiDestroyDeviceInfoList(devInfo);
    return -2;  // 未找到设备 | Device not found
}

// 发送舵机角度 | Send servo angles
__declspec(dllexport) int EB_SendServoAngles(
    float j1, float j2, float j3, float j4, float j5, float j6)
{
    if (!g_connected) return -1;

    // 构建数据包 | Build data packet
    uint8_t packet[64];
    memset(packet, 0, sizeof(packet));

    // 包头 | Header
    packet[0] = 0xEB;
    packet[1] = 0x01;

    // 舵机角度（float转byte）| Servo angles (float to bytes)
    memcpy(&packet[2],  &j1, 4);
    memcpy(&packet[6],  &j2, 4);
    memcpy(&packet[10], &j3, 4);
    memcpy(&packet[14], &j4, 4);
    memcpy(&packet[18], &j5, 4);
    memcpy(&packet[22], &j6, 4);

    // 包尾 | Tail
    packet[62] = 0xEB;
    packet[63] = 0x02;

    // 通过HID写入 | Write via HID
    DWORD bytesWritten;
    BOOL success = WriteFile(
        g_deviceHandle, packet, sizeof(packet), &bytesWritten, NULL);

    return success ? 0 : -3;  // 0=成功 | 0=success
}

// 断开连接 | Disconnect
__declspec(dllexport) void EB_Disconnect()
{
    if (g_deviceHandle != INVALID_HANDLE_VALUE)
    {
        CloseHandle(g_deviceHandle);
        g_deviceHandle = INVALID_HANDLE_VALUE;
    }
    g_connected = false;
}

// 查询连接状态 | Query connection status
__declspec(dllexport) bool EB_IsConnected()
{
    return g_connected;
}

} // extern "C"
```

#### 预期结果 | Expected Result

- C++ DLL编译成功生成.dll文件 | C++ DLL compiles to .dll file
- DLL放入Unity后可被正确识别 | DLL is recognized when placed in Unity
- 导出函数在Dependency Walker中可见 | Exported functions visible in Dependency Walker

---

### 任务六：3D虚拟机器人同步 | Task 6: 3D Virtual Robot Sync

#### 为什么要学这个 | Why Learn This

在连接实际硬件前，需要在Unity中创建3D虚拟模型来验证控制逻辑。虚拟模型与真实机器人的同步是调试的关键工具。

Before connecting actual hardware, a 3D virtual model is needed to verify control logic. Virtual-real synchronization is a key debugging tool.

#### 步骤 | Steps

1. 在Unity中搭建简易机器人3D模型 | Build a simple robot 3D model in Unity
2. 为每个关节添加ServoController组件 | Add ServoController component to each joint
3. 实现虚拟模型与硬件数据的双向同步 | Implement bidirectional sync between virtual model and hardware
4. 添加UI滑块来手动控制每个关节 | Add UI sliders for manual joint control

#### 代码示例 | Code Example

```csharp
// VirtualRobot.cs - 虚拟机器人管理器 | Virtual robot manager
using UnityEngine;
using UnityEngine.UI;

public class VirtualRobot : MonoBehaviour
{
    [Header("机器人关节 Robot Joints")]
    [SerializeField] private Transform baseJoint;
    [SerializeField] private Transform shoulderJoint;
    [SerializeField] private Transform elbowJoint;
    [SerializeField] private Transform wristJoint;
    [SerializeField] private Transform gripperJoint;
    [SerializeField] private Transform headJoint;

    [Header("UI控制 UI Controls")]
    [SerializeField] private Slider[] jointSliders;

    [Header("同步设置 Sync Settings")]
    [SerializeField] private bool syncWithHardware = false;
    [SerializeField] private float syncInterval = 0.05f; // 20Hz

    // 当前关节角度 | Current joint angles
    private float[] jointAngles = new float[6];
    private float syncTimer;

    void Update()
    {
        // 从UI滑块读取角度 | Read angles from UI sliders
        for (int i = 0; i < 6 && i < jointSliders.Length; i++)
        {
            if (jointSliders[i] != null)
            {
                jointAngles[i] = jointSliders[i].value;
            }
        }

        // 更新3D模型姿态 | Update 3D model pose
        UpdateVisualPose();

        // 定时同步到硬件 | Periodically sync to hardware
        if (syncWithHardware)
        {
            syncTimer += Time.deltaTime;
            if (syncTimer >= syncInterval)
            {
                syncTimer = 0f;
                SendToHardware();
            }
        }
    }

    // 更新可视化姿态 | Update visual pose
    private void UpdateVisualPose()
    {
        if (baseJoint) baseJoint.localRotation =
            Quaternion.Euler(0f, jointAngles[0], 0f);
        if (shoulderJoint) shoulderJoint.localRotation =
            Quaternion.Euler(jointAngles[1], 0f, 0f);
        if (elbowJoint) elbowJoint.localRotation =
            Quaternion.Euler(jointAngles[2], 0f, 0f);
        if (wristJoint) wristJoint.localRotation =
            Quaternion.Euler(jointAngles[3], 0f, 0f);
        if (gripperJoint) gripperJoint.localRotation =
            Quaternion.Euler(jointAngles[4], 0f, 0f);
        if (headJoint) headJoint.localRotation =
            Quaternion.Euler(0f, jointAngles[5], 0f);
    }

    // 发送到硬件 | Send to hardware
    private void SendToHardware()
    {
        if (UnityBridge.IsConnected)
        {
            UnityBridge.SendPose(jointAngles);
        }
    }

    // 从硬件接收（用于反向同步）| Receive from hardware
    public void ReceiveFromHardware(float[] angles)
    {
        if (angles == null || angles.Length < 6) return;

        for (int i = 0; i < 6; i++)
        {
            jointAngles[i] = angles[i];
            if (i < jointSliders.Length && jointSliders[i] != null)
            {
                jointSliders[i].value = angles[i];
            }
        }
        UpdateVisualPose();
    }

    // 播放预设动画 | Play preset animation
    public void PlayWaveAnimation()
    {
        StartCoroutine(WaveCoroutine());
    }

    private System.Collections.IEnumerator WaveCoroutine()
    {
        // 挥手动画关键帧 | Wave animation keyframes
        float[][] keyframes = new float[][]
        {
            new float[] { 0, 45, 0, 0, 0, 0 },    // 抬起手臂 Raise arm
            new float[] { 0, 45, 30, 0, 0, 0 },    // 弯曲肘部 Bend elbow
            new float[] { 0, 45, 30, -20, 0, 0 },  // 挥手 Wave
            new float[] { 0, 45, 30, 20, 0, 0 },   // 挥手 Wave
            new float[] { 0, 45, 30, -20, 0, 0 },  // 挥手 Wave
            new float[] { 0, 45, 30, 20, 0, 0 },   // 挥手 Wave
            new float[] { 0, 0, 0, 0, 0, 0 },       // 复位 Reset
        };

        foreach (var frame in keyframes)
        {
            ReceiveFromHardware(frame);
            yield return new WaitForSeconds(0.3f);
        }
    }

    void OnApplicationQuit()
    {
        // 程序退出时断开连接 | Disconnect on application quit
        UnityBridge.Disconnect();
    }
}
```

#### 预期结果 | Expected Result

- 3D机器人模型在Scene视图中正确显示 | 3D robot model displays correctly in Scene view
- 拖动滑块时模型关节同步旋转 | Model joints rotate when dragging sliders
- 挥手动画流畅播放 | Wave animation plays smoothly

#### 常见问题 | Common Issues

| 问题 Issue | 原因 Cause | 解决 Solution |
|------------|-----------|--------------|
| 模型关节旋转方向错误 | 旋转轴设置不对 | 调整localRotation的轴分量 |
| 动画抖动 Animation jitter | Update频率与同步频率冲突 | 使用Lerp平滑过渡 |
| UI滑块不响应 Slider no response | 未在Canvas中正确关联 | 检查SerializeField引用 |

---

## 今日作业 | Today's Homework

### 必做题 | Required

1. **Unity场景搭建**：创建一个包含6个关节的机器人3D模型，每个关节使用不同颜色的Cube表示 | Create a 6-joint robot 3D model using colored Cubes
2. **DLL桥接测试**：编写UnityBridge.cs，模拟连接/断开/发送数据的完整流程 | Write UnityBridge.cs simulating connect/disconnect/send flow
3. **数据包验证**：实现PacketBuilder.BuildCommand()并验证校验和正确性 | Implement PacketBuilder.BuildCommand() and verify checksum

### 挑战题 | Challenge

1. **动画录制器**：实现一个可以在运行时录制关键帧并在之后回放的系统 | Implement a runtime keyframe recording and playback system
2. **串口备选方案**：除了HID USB，实现SerialPort串口通信作为备选方案 | Implement SerialPort communication as alternative to HID USB

### 思考题 | Reflection

1. 为什么ElectronBot SDK使用四层架构？如果合并为两层会有什么问题？| Why use a 4-layer architecture? What problems would arise with only 2 layers?
2. Unity中Update()和FixedUpdate()在硬件控制中有什么区别？应该用哪个？| What's the difference between Update() and FixedUpdate() for hardware control?

---

## 明日预告 | Tomorrow's Preview

明天我们将进入计算机视觉的世界！学习OpenCV图像处理基础，实现摄像头人脸检测，并探索姿态估计（Pose Estimation）技术，让ElectronBot能够模仿你的动作！

Tomorrow we enter the world of computer vision! We'll learn OpenCV image processing basics, implement camera face detection, and explore pose estimation technology to make ElectronBot mimic your movements!

---

## 参考资源 | References

- [Unity官方文档 - Scripting](https://docs.unity3d.com/Manual/scripting-section.html)
- [Unity官方文档 - DllImport与插件](https://docs.unity3d.com/Manual/NativePlugins.html)
- [ElectronBot GitHub仓库](https://github.com/nicholasgasior/electronbot)
- [P/Invoke详解](https://docs.microsoft.com/en-us/dotnet/standard/native-interop/pinvoke)
- [Windows HID API文档](https://docs.microsoft.com/en-us/windows-hardware/drivers/hid/)

---

*最后更新：2026-05-27*
