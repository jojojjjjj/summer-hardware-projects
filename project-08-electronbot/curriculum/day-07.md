# Day 07: 表情动画系统与状态机设计 | Expression Animation System & State Machine Design

> **今日目标:**
> - 掌握表情动画的三段式原理（enter/loop/exit），理解帧动画播放流程
> - 学习SD卡文件系统（FatFS），实现表情帧数据从SD卡加载
> - 掌握有限状态机(FSM)设计模式，实现表情切换逻辑
> - 理解缓动函数(Easing Function)和动画时序控制
>
> **产出:** ElectronBot能在圆形屏幕上播放流畅的表情动画，通过状态机实现多种表情之间的自然切换

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间回顾 | 回顾Day 6舵机控制与PID调参成果，解答疑问 |
| 09:15 - 10:30 | 知识讲解 | 帧动画原理、FatFS文件系统、JPEG解码、状态机设计模式 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | SD卡驱动初始化、表情帧加载与显示 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 表情状态机实现、表情切换逻辑、缓动函数 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 表情+动作协同、情感表达系统、动画时序优化 |
| 16:30 - 17:00 | 总结分享 | ElectronBot展示——让机器人"有表情" |

---

## 上午: 表情动画原理与帧加载 | Morning: Animation Principles & Frame Loading

### 为什么要学这个? | Why Learn This?

表情是桌宠机器人的"灵魂"。一个没有表情的机器人只是机械装置，但加上眼睛转动、微笑、惊讶等表情后，它就"活"了。表情动画系统是ElectronBot最直观的用户体验要素。理解帧动画原理、文件系统和状态机，是开发任何具有图形界面的嵌入式产品都需要的核心能力。

Expressions are the "soul" of a desktop pet robot. A robot without expressions is just a mechanical device, but with eye movements, smiles, and surprise expressions, it "comes alive." The expression animation system is ElectronBot's most direct user experience element. Understanding frame animation, file systems, and state machines are core skills needed for any embedded product with a graphical interface.

### 任务7.1: 表情动画原理 (30分钟)

ElectronBot的表情动画采用三段式结构（Enter-Loop-Exit），这是游戏和动画行业广泛使用的方法。

ElectronBot's expression animation uses a three-segment structure (Enter-Loop-Exit), widely used in the game and animation industry.

```
表情动画三段式结构 | Expression Animation Three-Segment Structure:

  Enter Segment (入场段)          Loop Segment (循环段)         Exit Segment (退场段)
  ┌──────────────────┐     ┌──────────────────────────────┐    ┌──────────────────┐
  │ 帧1 → 帧2 → ... → 帧N │ ──→ │ 帧A → 帧B → ... → 帧M → 帧A │ ──→ │ 帧1 → 帧2 → ... → 帧K │
  │  (播放一次)         │     │        (循环播放)             │    │   (播放一次)       │
  │  "睁开眼"          │     │        "眨眼/转动"            │    │   "闭眼/消隐"      │
  └──────────────────┘     └──────────────────────────────┘    └──────────────────┘
  播放完毕→进入Loop         直到被新表情打断                     播放完毕→回到Neutral

状态转换示例 | State Transition Example:
  Neutral → [Happy Enter] → [Happy Loop] → [Happy Exit] → Neutral
  Neutral → [Happy Enter] → [Happy Loop] ←被打断→ [Surprised Enter] → [Surprised Loop] ...
```

**帧动画基本概念:**

| 概念 | 说明 |
|------|------|
| 帧(Frame) | 一张静态图片，GC9A01上为240x240 RGB565数据 |
| 帧率(FPS) | 每秒播放的帧数，ElectronBot表情动画推荐15-24fps |
| 关键帧(Keyframe) | 动画中关键的姿势帧，中间帧通过插值生成 |
| 精灵(Sprite) | 动画中的一组连续帧，构成一个完整的动作序列 |
| 精灵表(Sprite Sheet) | 将多帧拼接成一张大图，减少文件数量 |

```c
/* animation_types.h — 动画系统类型定义 */
/* animation_types.h — Animation System Type Definitions */

#ifndef ANIMATION_TYPES_H
#define ANIMATION_TYPES_H

#include <stdint.h>
#include <stdbool.h>

// 表情类型枚举 | Expression type enumeration
typedef enum {
    EXPR_NEUTRAL = 0,     // 中性/默认 | Neutral/default
    EXPR_HAPPY,           // 开心 | Happy
    EXPR_SAD,             // 伤心 | Sad
    EXPR_ANGRY,           // 生气 | Angry
    EXPR_SURPRISED,       // 惊讶 | Surprised
    EXPR_SLEEPY,          // 困倦 | Sleepy
    EXPR_WINK,            // 眨眼 | Wink
    EXPR_COUNT            // 表情总数 | Total expression count
} Expression_t;

// 动画段类型 | Animation segment type
typedef enum {
    SEGMENT_ENTER = 0,    // 入场段 | Enter segment
    SEGMENT_LOOP,         // 循环段 | Loop segment
    SEGMENT_EXIT,         // 退场段 | Exit segment
} SegmentType_t;

// 动画播放状态 | Animation playback state
typedef enum {
    ANIM_STOPPED = 0,     // 已停止 | Stopped
    ANIM_PLAYING,         // 正在播放 | Playing
    ANIM_PAUSED,          // 已暂停 | Paused
    ANIM_TRANSITIONING,   // 正在过渡(淡入淡出) | Transitioning (fade)
} AnimState_t;

// 单帧数据 | Single frame data
typedef struct {
    const uint16_t *pixel_data;  // RGB565像素数据指针 | RGB565 pixel data pointer
    uint16_t duration_ms;        // 该帧显示时长(ms) | Frame display duration (ms)
} AnimFrame_t;

// 动画段(Enter/Loop/Exit) | Animation segment (Enter/Loop/Exit)
typedef struct {
    AnimFrame_t *frames;         // 帧数组 | Frame array
    uint16_t    frame_count;     // 帧数量 | Frame count
    uint16_t    current_frame;   // 当前帧索引 | Current frame index
    bool        loop;            // 是否循环 | Whether to loop
} AnimSegment_t;

// 完整表情动画 | Complete expression animation
typedef struct {
    Expression_t    id;           // 表情ID | Expression ID
    const char     *name;         // 表情名称 | Expression name
    AnimSegment_t   enter;        // 入场段 | Enter segment
    AnimSegment_t   loop;         // 循环段 | Loop segment
    AnimSegment_t   exit;         // 退场段 | Exit segment
    SegmentType_t   active_seg;   // 当前激活的段 | Currently active segment
    AnimState_t     state;        // 播放状态 | Playback state
} ExpressionAnim_t;

#endif // ANIMATION_TYPES_H
```

**预期结果:**
- 理解Enter-Loop-Exit三段式动画结构
- 理解帧、帧率、精灵表等动画基本概念
- 掌握动画系统所需的数据结构设计

### 任务7.2: SD卡文件系统与表情帧加载 (50分钟)

表情帧数据存储在SD卡上，使用FatFS文件系统读取。STM32通过SDIO接口连接SD卡，提供高速的数据访问。

Expression frame data is stored on an SD card and read using the FatFS file system. The STM32 connects to the SD card via the SDIO interface, providing high-speed data access.

**SD卡目录结构:**
```
SD卡根目录 | SD Card Root:
├── expr/                      ← 表情目录 | Expressions directory
│   ├── neutral/               ← 中性表情 | Neutral expression
│   │   ├── enter/             ← 入场帧 | Enter frames
│   │   │   ├── frame_000.bin
│   │   │   ├── frame_001.bin
│   │   │   └── ...
│   │   ├── loop/              ← 循环帧 | Loop frames
│   │   │   ├── frame_000.bin
│   │   │   └── ...
│   │   └── exit/              ← 退场帧 | Exit frames
│   │       └── ...
│   ├── happy/
│   │   ├── enter/
│   │   ├── loop/
│   │   └── exit/
│   └── ...                    ← 其他表情 | Other expressions
│
│  每个.bin文件是240x240=57600个uint16_t的RGB565原始数据(115200字节)
│  Each .bin file is 240x240 = 57600 uint16_t RGB565 raw data (115200 bytes)
```

```c
/* sd_card.h — SD卡与FatFS封装 */
/* sd_card.h — SD Card & FatFS Wrapper */

#ifndef SD_CARD_H
#define SD_CARD_H

#include "ff.h"          // FatFS头文件 | FatFS header
#include "stm32f4xx_hal.h"
#include <stdint.h>
#include <stdbool.h>

// SD卡状态 | SD card status
typedef enum {
    SD_OK = 0,
    SD_NOT_INSERTED,
    SD_INIT_FAILED,
    SD_MOUNT_FAILED,
    SD_FILE_NOT_FOUND,
    SD_READ_ERROR,
} SD_Status_t;

SD_Status_t SD_Init(void);
SD_Status_t SD_LoadFrame(const char *path, uint16_t *buffer, uint32_t buf_size);
SD_Status_t SD_GetFrameCount(const char *dir_path, uint16_t *count);
SD_Status_t SD_ListFiles(const char *dir_path, char filenames[][32], uint16_t max_files);

#endif // SD_CARD_H
```

```c
/* sd_card.c — SD卡与FatFS实现 */
/* sd_card.c — SD Card & FatFS Implementation */

#include "sd_card.h"
#include <string.h>
#include <stdio.h>

extern SD_HandleTypeDef hsd;     // CubeMX生成的SD句柄 | CubeMX-generated SD handle
extern FATFS fs;                  // FatFS文件系统对象 | FatFS filesystem object
static bool sd_mounted = false;

SD_Status_t SD_Init(void)
{
    // 1. 初始化SDIO外设（CubeMX已完成）| SDIO init (done by CubeMX)

    // 2. 挂载FatFS文件系统 | Mount FatFS
    FRESULT res = f_mount(&fs, "0:", 1);  // 1=立即挂载 | 1=mount now
    if (res != FR_OK) {
        return SD_MOUNT_FAILED;
    }

    sd_mounted = true;
    return SD_OK;
}

// 加载一帧数据到缓冲区 | Load one frame into buffer
SD_Status_t SD_LoadFrame(const char *path, uint16_t *buffer, uint32_t buf_size)
{
    if (!sd_mounted) return SD_INIT_FAILED;

    FIL file;
    FRESULT res;
    UINT bytes_read;

    // 打开文件 | Open file
    res = f_open(&file, path, FA_READ);
    if (res != FR_OK) {
        return SD_FILE_NOT_FOUND;
    }

    // 读取帧数据 | Read frame data
    uint32_t bytes_to_read = buf_size * 2;  // uint16_t → 2 bytes each
    res = f_read(&file, buffer, bytes_to_read, &bytes_read);
    f_close(&file);

    if (res != FR_OK || bytes_read != bytes_to_read) {
        return SD_READ_ERROR;
    }

    return SD_OK;
}

// 获取目录中的帧数量 | Get frame count in directory
SD_Status_t SD_GetFrameCount(const char *dir_path, uint16_t *count)
{
    DIR dir;
    FILINFO fno;
    *count = 0;

    FRESULT res = f_opendir(&dir, dir_path);
    if (res != FR_OK) return SD_FILE_NOT_FOUND;

    while (1) {
        res = f_readdir(&dir, &fno);
        if (res != FR_OK || fno.fname[0] == 0) break;  // 到末尾 | End of dir
        if (!(fno.fattrib & AM_DIR)) {  // 非目录(文件) | Not a directory (file)
            (*count)++;
        }
    }

    f_closedir(&dir);
    return SD_OK;
}

// 列出目录中的文件名 | List filenames in directory
SD_Status_t SD_ListFiles(const char *dir_path, char filenames[][32],
                          uint16_t max_files)
{
    DIR dir;
    FILINFO fno;
    uint16_t idx = 0;

    FRESULT res = f_opendir(&dir, dir_path);
    if (res != FR_OK) return SD_FILE_NOT_FOUND;

    while (idx < max_files) {
        res = f_readdir(&dir, &fno);
        if (res != FR_OK || fno.fname[0] == 0) break;
        if (!(fno.fattrib & AM_DIR)) {
            strncpy(filenames[idx], fno.fname, 31);
            filenames[idx][31] = '\0';
            idx++;
        }
    }

    f_closedir(&dir);
    return SD_OK;
}
```

**预期结果:**
- FatFS成功挂载SD卡
- 能读取SD卡上的帧数据文件
- 能统计目录中的帧文件数量

**常见问题:**
- **f_mount返回FR_NOT_READY**：SD卡未插入或SDIO引脚配置错误，检查PC8/PC9/PC10/PC11/PC12引脚
- **读取速度太慢**：确认SDIO时钟配置为48MHz（而非慢速的400kHz初始化模式）
- **中文文件名乱码**：FatFS需要启用长文件名(LFN)和Unicode支持，在ffconf.h中配置

### 任务7.3: 动画播放引擎 (30分钟)

动画播放引擎负责按时间顺序加载和显示帧数据。它在一个定时器中断中以固定频率被调用。

The animation playback engine loads and displays frame data in chronological order. It's called at a fixed frequency from a timer interrupt.

```c
/* animation_player.h — 动画播放引擎 */
/* animation_player.h — Animation Playback Engine */

#ifndef ANIMATION_PLAYER_H
#define ANIMATION_PLAYER_H

#include "animation_types.h"
#include "gc9a01.h"
#include "sd_card.h"

// 帧缓冲区（双缓冲）| Frame buffer (double buffering)
#define FRAME_BUF_SIZE  (GC9A01_WIDTH * GC9A01_HEIGHT)  // 57600 uint16_t
extern uint16_t frame_buf[FRAME_BUF_SIZE];

void AnimPlayer_Init(void);
void AnimPlayer_SetExpression(Expression_t expr);
void AnimPlayer_Update(void);  // 在定时器中断中调用 | Called from timer interrupt
void AnimPlayer_Stop(void);
void AnimPlayer_Play(void);
void AnimPlayer_SetFPS(uint8_t fps);

#endif // ANIMATION_PLAYER_H
```

```c
/* animation_player.c — 动画播放引擎实现 */
/* animation_player.c — Animation Playback Engine Implementation */

#include "animation_player.h"
#include <string.h>
#include <stdio.h>

// 双帧缓冲 | Double frame buffer
uint16_t frame_buf[FRAME_BUF_SIZE];

// 表情路径模板 | Expression path template
static const char *expr_names[EXPR_COUNT] = {
    "neutral", "happy", "sad", "angry", "surprised", "sleepy", "wink"
};

// 播放器状态 | Player state
static struct {
    ExpressionAnim_t current;     // 当前表情动画 | Current expression animation
    AnimState_t      state;       // 播放状态 | Playback state
    SegmentType_t    active_seg;  // 当前段 | Current segment
    uint16_t         frame_index; // 当前帧索引 | Current frame index
    uint32_t         frame_timer; // 帧计时器(ms) | Frame timer (ms)
    uint16_t         frame_duration; // 当前帧持续时长 | Current frame duration
    uint8_t          fps;         // 目标帧率 | Target FPS
    uint32_t         update_interval_ms; // 更新间隔(ms) | Update interval (ms)
} player;

void AnimPlayer_Init(void)
{
    player.state = ANIM_STOPPED;
    player.active_seg = SEGMENT_ENTER;
    player.frame_index = 0;
    player.frame_timer = 0;
    player.fps = 15;  // 默认15fps | Default 15fps
    player.update_interval_ms = 1000 / player.fps;

    // 加载默认表情(中性) | Load default expression (neutral)
    AnimPlayer_SetExpression(EXPR_NEUTRAL);
}

// 构建帧文件路径 | Build frame file path
static void build_frame_path(char *path, size_t len, Expression_t expr,
                               SegmentType_t seg, uint16_t frame_idx)
{
    const char *seg_names[] = {"enter", "loop", "exit"};
    snprintf(path, len, "0:/expr/%s/%s/frame_%03d.bin",
             expr_names[expr], seg_names[seg], frame_idx);
}

// 加载并显示一帧 | Load and display one frame
static void load_and_display_frame(Expression_t expr, SegmentType_t seg,
                                     uint16_t frame_idx)
{
    char path[64];
    build_frame_path(path, sizeof(path), expr, seg, frame_idx);

    // 从SD卡加载帧数据 | Load frame data from SD card
    SD_Status_t status = SD_LoadFrame(path, frame_buf, FRAME_BUF_SIZE);
    if (status != SD_OK) {
        // 加载失败，显示错误帧（纯红色）| Load failed, show error frame (red)
        for (uint32_t i = 0; i < FRAME_BUF_SIZE; i++) {
            frame_buf[i] = COLOR_RED;
        }
    }

    // 在GC9A01上显示帧 | Display frame on GC9A01
    GC9A01_DrawImage(0, 0, GC9A01_WIDTH, GC9A01_HEIGHT, frame_buf);
}

// 主更新函数（由定时器调用）| Main update function (called by timer)
void AnimPlayer_Update(void)
{
    if (player.state != ANIM_PLAYING) return;

    player.frame_timer += player.update_interval_ms;

    // 检查是否需要切换帧 | Check if frame should advance
    if (player.frame_timer >= player.frame_duration) {
        player.frame_timer = 0;

        // 加载当前帧 | Load current frame
        load_and_display_frame(player.current.id, player.active_seg,
                               player.frame_index);

        player.frame_index++;

        // 检查段结束 | Check segment end
        uint16_t total_frames = 0;
        // ... 获取当前段的总帧数 | Get total frames for current segment

        if (player.frame_index >= total_frames) {
            // 当前段播放完毕 | Current segment finished
            switch (player.active_seg) {
                case SEGMENT_ENTER:
                    // Enter结束→进入Loop | Enter done → enter Loop
                    player.active_seg = SEGMENT_LOOP;
                    player.frame_index = 0;
                    break;

                case SEGMENT_LOOP:
                    // Loop: 回到第一帧继续循环 | Loop: restart from first frame
                    player.frame_index = 0;
                    break;

                case SEGMENT_EXIT:
                    // Exit结束→停止 | Exit done → stop
                    player.state = ANIM_STOPPED;
                    break;
            }
        }
    }
}

// 切换表情 | Switch expression
void AnimPlayer_SetExpression(Expression_t expr)
{
    // 如果正在播放其他表情，先播放当前表情的Exit段
    // If playing another expression, play current expression's Exit segment first
    if (player.state == ANIM_PLAYING && player.active_seg != SEGMENT_EXIT) {
        player.active_seg = SEGMENT_EXIT;
        player.frame_index = 0;
        // Exit播放完后会在Update中切换到新表情的Enter
        // Update will switch to new expression's Enter after Exit finishes
    } else {
        // 直接开始新表情的Enter | Start new expression's Enter directly
        player.current.id = expr;
        player.active_seg = SEGMENT_ENTER;
        player.frame_index = 0;
        player.state = ANIM_PLAYING;
    }
}

void AnimPlayer_Stop(void)  { player.state = ANIM_STOPPED; }
void AnimPlayer_Play(void)  { player.state = ANIM_PLAYING; }
void AnimPlayer_SetFPS(uint8_t fps)
{
    player.fps = fps;
    player.update_interval_ms = 1000 / fps;
}
```

**预期结果:**
- 表情动画能流畅播放，帧率稳定在15fps以上
- Enter段播放一次后自动进入Loop段循环播放
- 切换表情时能先播放Exit段再进入新表情

**常见问题:**
- **播放卡顿**：SD卡读取速度不够，使用SDIO DMA模式加速数据传输
- **第一帧显示异常**：帧数据未完全加载就开始显示，确保`SD_LoadFrame`返回SD_OK后再显示
- **切换表情时闪烁**：没有使用双缓冲，在加载新帧时旧帧被覆盖，使用两个帧缓冲区交替使用

---

## 下午: 状态机设计与表情协同 | Afternoon: State Machine & Expression Coordination

### 为什么要学这个? | Why Learn This?

状态机(State Machine)是嵌入式系统中最核心的设计模式之一。ElectronBot需要管理多种状态（待机、交互、睡眠、充电等），每种状态下有不同的表情和动作。如果用一堆if-else来管理，代码很快会变得不可维护。状态机将每种状态封装为独立的处理逻辑，让系统行为清晰可预测。

The state machine is one of the most core design patterns in embedded systems. ElectronBot needs to manage multiple states (idle, interacting, sleeping, charging, etc.), each with different expressions and motions. If managed with a pile of if-else statements, the code quickly becomes unmaintainable. The state machine encapsulates each state as independent handling logic, making system behavior clear and predictable.

### 任务7.4: 状态机设计模式 (40分钟)

有限状态机(FSM)由状态、事件和转换三个要素组成。每个状态定义了在该状态下如何响应不同事件。

A finite state machine (FSM) consists of three elements: states, events, and transitions. Each state defines how to respond to different events.

```
ElectronBot 主状态机 | ElectronBot Main State Machine:

                 ┌──────────────┐
       上电 ──→  │   INIT       │
                 │  (初始化)     │
                 └──────┬───────┘
                        │ 初始化完成
                        ▼
                 ┌──────────────┐   无交互60秒    ┌──────────────┐
        ┌───────│   IDLE       │───────────────→  │   SLEEP      │
        │       │  (待机)      │ ←───────────────  │  (睡眠)      │
        │       └──────┬───────┘   检测到交互      └──────┬───────┘
        │              │ 检测到用户                     │
        │              ▼                                │
        │       ┌──────────────┐                        │
        │       │ INTERACTING  │ ←─────────────────────┘
        │       │  (交互)      │
        │       └──────┬───────┘
        │              │ 收到手势命令
        │              ▼
        │       ┌──────────────┐
        │       │ REACTING     │
        │       │  (响应中)     │
        │       └──────┬───────┘
        │              │ 响应完成
        └──────────────┘
```

```c
/* state_machine.h — 表情状态机 */
/* state_machine.h — Expression State Machine */

#ifndef STATE_MACHINE_H
#define STATE_MACHINE_H

#include "animation_types.h"
#include <stdint.h>

// 系统状态 | System states
typedef enum {
    STATE_INIT = 0,        // 初始化 | Initialization
    STATE_IDLE,            // 待机 | Idle
    STATE_INTERACTING,     // 交互中 | Interacting
    STATE_REACTING,        // 响应中 | Reacting
    STATE_SLEEPING,        // 睡眠 | Sleeping
    STATE_ERROR,           // 错误 | Error
} SystemState_t;

// 触发事件 | Trigger events
typedef enum {
    EVENT_NONE = 0,
    EVENT_USER_DETECTED,    // 检测到用户 | User detected
    EVENT_USER_LEFT,        // 用户离开 | User left
    EVENT_GESTURE_UP,       // 手势:上 | Gesture: up
    EVENT_GESTURE_DOWN,     // 手势:下 | Gesture: down
    EVENT_GESTURE_LEFT,     // 手势:左 | Gesture: left
    EVENT_GESTURE_RIGHT,    // 手势:右 | Gesture: right
    EVENT_TOUCH,            // 触摸 | Touch
    EVENT_TIMEOUT,          // 超时 | Timeout
    EVENT_USB_CONNECTED,    // USB连接 | USB connected
    EVENT_USB_DATA,         // USB数据到达 | USB data arrived
} Event_t;

// 状态处理函数类型 | State handler function type
typedef void (*StateHandler_t)(Event_t event);

// 状态机结构 | State machine structure
typedef struct {
    SystemState_t  current_state;
    SystemState_t  previous_state;
    Event_t        last_event;
    uint32_t       state_timer;     // 当前状态持续时间(ms) | Time in current state (ms)
    uint32_t       idle_timeout;    // 进入睡眠的超时时间 | Timeout for entering sleep
    Expression_t   current_expr;    // 当前表情 | Current expression
} StateMachine_t;

void SM_Init(void);
void SM_ProcessEvent(Event_t event);
void SM_Update(void);  // 在主循环中调用 | Call in main loop
SystemState_t SM_GetState(void);
const char* SM_GetStateName(SystemState_t state);

#endif // STATE_MACHINE_H
```

```c
/* state_machine.c — 状态机实现 */
/* state_machine.c — State Machine Implementation */

#include "state_machine.h"
#include "animation_player.h"
#include "servo_manager.h"
#include <stdio.h>

static StateMachine_t sm;

// 前向声明各状态处理函数 | Forward declarations of state handlers
static void state_init_handler(Event_t event);
static void state_idle_handler(Event_t event);
static void state_interacting_handler(Event_t event);
static void state_reacting_handler(Event_t event);
static void state_sleeping_handler(Event_t event);
static void state_error_handler(Event_t event);

// 状态处理函数表 | State handler function table
static const StateHandler_t state_handlers[] = {
    state_init_handler,        // STATE_INIT
    state_idle_handler,        // STATE_IDLE
    state_interacting_handler, // STATE_INTERACTING
    state_reacting_handler,    // STATE_REACTING
    state_sleeping_handler,    // STATE_SLEEPING
    state_error_handler,       // STATE_ERROR
};

// 状态名称 | State names (调试用 | for debugging)
static const char *state_names[] = {
    "INIT", "IDLE", "INTERACTING", "REACTING", "SLEEPING", "ERROR"
};

void SM_Init(void)
{
    sm.current_state = STATE_INIT;
    sm.previous_state = STATE_INIT;
    sm.last_event = EVENT_NONE;
    sm.state_timer = 0;
    sm.idle_timeout = 60000;  // 60秒无交互进入睡眠 | 60s idle → sleep
    sm.current_expr = EXPR_NEUTRAL;
}

// 切换状态 | Transition state
static void change_state(SystemState_t new_state)
{
    sm.previous_state = sm.current_state;
    sm.current_state = new_state;
    sm.state_timer = 0;

    // 进入新状态的初始化动作 | Entry actions for new state
    switch (new_state) {
        case STATE_IDLE:
            AnimPlayer_SetExpression(EXPR_NEUTRAL);
            break;
        case STATE_INTERACTING:
            AnimPlayer_SetExpression(EXPR_HAPPY);
            break;
        case STATE_SLEEPING:
            AnimPlayer_SetExpression(EXPR_SLEEPY);
            // 降低舵机扭矩(节能) | Reduce servo torque (power saving)
            break;
        case STATE_ERROR:
            AnimPlayer_SetExpression(EXPR_ANGRY);
            break;
        default:
            break;
    }
}

// ---- 各状态处理函数 | State Handler Functions ----

static void state_init_handler(Event_t event)
{
    // 初始化完成后自动转到IDLE | Auto-transition to IDLE after init
    change_state(STATE_IDLE);
}

static void state_idle_handler(Event_t event)
{
    switch (event) {
        case EVENT_USER_DETECTED:
            change_state(STATE_INTERACTING);
            break;
        case EVENT_TIMEOUT:
            change_state(STATE_SLEEPING);
            break;
        case EVENT_TOUCH:
            AnimPlayer_SetExpression(EXPR_SURPRISED);
            break;
        default:
            break;
    }
}

static void state_interacting_handler(Event_t event)
{
    switch (event) {
        case EVENT_USER_LEFT:
            change_state(STATE_IDLE);
            break;
        case EVENT_GESTURE_UP:
            AnimPlayer_SetExpression(EXPR_HAPPY);
            // 执行举手动作 | Perform arm-raise action
            ServoMgr_SetPose(&POSE_ARMS_UP);
            change_state(STATE_REACTING);
            break;
        case EVENT_GESTURE_DOWN:
            AnimPlayer_SetExpression(EXPR_SAD);
            ServoMgr_SetPose(&POSE_ARMS_DOWN);
            change_state(STATE_REACTING);
            break;
        case EVENT_TOUCH:
            AnimPlayer_SetExpression(EXPR_WINK);
            break;
        default:
            break;
    }
}

static void state_reacting_handler(Event_t event)
{
    // 反应完成后回到交互状态 | Return to interacting after reaction
    // 由定时器检测动画和动作是否完成
    if (sm.state_timer > 2000) {  // 2秒后回到交互 | Return after 2s
        ServoMgr_SetPose(&POSE_NEUTRAL);
        AnimPlayer_SetExpression(EXPR_HAPPY);
        change_state(STATE_INTERACTING);
    }
}

static void state_sleeping_handler(Event_t event)
{
    switch (event) {
        case EVENT_USER_DETECTED:
        case EVENT_TOUCH:
            change_state(STATE_INTERACTING);
            break;
        default:
            break;
    }
}

static void state_error_handler(Event_t event)
{
    // 错误状态下只响应USB重置命令 | Only respond to USB reset in error state
    if (event == EVENT_USB_CONNECTED) {
        change_state(STATE_INIT);
    }
}

// ---- 公共接口 | Public Interface ----

void SM_ProcessEvent(Event_t event)
{
    sm.last_event = event;

    // 调用当前状态的处理函数 | Call current state's handler
    if (sm.current_state < sizeof(state_handlers) / sizeof(state_handlers[0])) {
        state_handlers[sm.current_state](event);
    }
}

void SM_Update(void)
{
    sm.state_timer += 10;  // 假设每10ms调用一次 | Assume called every 10ms

    // 检查超时 | Check timeout
    if (sm.current_state == STATE_IDLE &&
        sm.state_timer >= sm.idle_timeout) {
        SM_ProcessEvent(EVENT_TIMEOUT);
    }

    // REACTING状态自动恢复 | Auto-recover from REACTING
    if (sm.current_state == STATE_REACTING) {
        SM_ProcessEvent(EVENT_NONE);  // 让handler检查定时器 | Let handler check timer
    }
}

SystemState_t SM_GetState(void) { return sm.current_state; }

const char* SM_GetStateName(SystemState_t state)
{
    if (state < sizeof(state_names) / sizeof(state_names[0]))
        return state_names[state];
    return "UNKNOWN";
}
```

**预期结果:**
- 状态机能正确响应各种事件进行状态转换
- 不同状态自动切换对应的表情动画
- 状态转换日志可在串口观察调试

### 任务7.5: 缓动函数与动画时序控制 (30分钟)

缓动函数(Easing Function)让动画从"匀速线性"变成"自然有弹性"。线性动画看起来机械生硬，而缓动函数模拟了物理世界中的加速和减速过程。

Easing functions transform animation from "uniform linear" to "natural and elastic." Linear animation looks mechanical and stiff, while easing functions simulate acceleration and deceleration from the physical world.

```c
/* easing.h — 缓动函数库 */
/* easing.h — Easing Functions Library */

#ifndef EASING_H
#define EASING_H

#include <stdint.h>
#include <math.h>

// 所有缓动函数的输入: t ∈ [0.0, 1.0], 输出 ∈ [0.0, 1.0]
// All easing functions: input t ∈ [0.0, 1.0], output ∈ [0.0, 1.0]

// 线性(无缓动) | Linear (no easing)
static inline float ease_linear(float t) { return t; }

// 缓入(慢启动) | Ease in (slow start)
static inline float ease_in_quad(float t) { return t * t; }

// 缓出(慢停止) | Ease out (slow stop)
static inline float ease_out_quad(float t) { return t * (2.0f - t); }

// 缓入缓出 | Ease in-out
static inline float ease_in_out_quad(float t)
{
    return (t < 0.5f) ? (2.0f * t * t) : (-1.0f + (4.0f - 2.0f * t) * t);
}

// 弹性缓出 | Elastic ease out
static inline float ease_out_elastic(float t)
{
    if (t == 0.0f || t == 1.0f) return t;
    float p = 0.3f;
    return powf(2.0f, -10.0f * t) * sinf((t - p / 4.0f) * 2.0f * 3.14159f / p) + 1.0f;
}

// 弹跳缓出 | Bounce ease out
static inline float ease_out_bounce(float t)
{
    if (t < 1.0f / 2.75f) {
        return 7.5625f * t * t;
    } else if (t < 2.0f / 2.75f) {
        t -= 1.5f / 2.75f;
        return 7.5625f * t * t + 0.75f;
    } else if (t < 2.5f / 2.75f) {
        t -= 2.25f / 2.75f;
        return 7.5625f * t * t + 0.9375f;
    } else {
        t -= 2.625f / 2.75f;
        return 7.5625f * t * t + 0.984375f;
    }
}

#endif // EASING_H
```

**缓动函数对比图:**
```
  1.0 ──┬─── ease_in_out (S形) | S-curve
        │       ╭───────
  0.75 ─┤     ╭─╯
        │    ╱   ease_out (减速) | Decelerate
  0.5 ──┤  ╱───╯
        │ ╱
  0.25 ─┤╱ linear (匀速) | Uniform
        │
  0.0 ──┴──────────────────
        0              1.0
              t (归一化时间) | Normalized time
```

### 任务7.6: 表情+动作协同系统 (30分钟)

将表情动画和舵机动作组合起来，实现"表情+动作"的协同效果。例如开心时同时播放笑脸表情和举起手臂。

Combine expression animation with servo motion for "expression + motion" coordination. For example, a happy face with raised arms simultaneously.

```c
/* behavior_system.h — 行为系统(表情+动作协同) */
/* behavior_system.h — Behavior System (Expression + Motion Coordination) */

#ifndef BEHAVIOR_SYSTEM_H
#define BEHAVIOR_SYSTEM_H

#include "animation_types.h"
#include "servo_manager.h"
#include "easing.h"
#include <stdint.h>

// 行为定义(表情+动作组合) | Behavior definition (expression + motion combo)
typedef struct {
    Expression_t   expression;    // 表情 | Expression
    const Pose_t  *start_pose;    // 起始姿态 | Start pose
    const Pose_t  *end_pose;      // 结束姿态 | End pose
    uint16_t       duration_ms;   // 过渡时长 | Transition duration
    float (*easing)(float);       // 缓动函数 | Easing function
    bool           hold;          // 是否保持结束姿态 | Whether to hold end pose
} Behavior_t;

// 预定义行为 | Predefined behaviors
static const Behavior_t BEHAVIOR_WAVE = {
    .expression  = EXPR_HAPPY,
    .start_pose  = &POSE_NEUTRAL,
    .end_pose    = &POSE_WAVE_LEFT,
    .duration_ms = 500,
    .easing      = ease_out_elastic,  // 弹性效果 | Elastic effect
    .hold        = false,             // 完成后回中立 | Return to neutral after
};

static const Behavior_t BEHAVIOR_BOW = {
    .expression  = EXPR_NEUTRAL,
    .start_pose  = &POSE_NEUTRAL,
    .end_pose    = &POSE_ARMS_DOWN,
    .duration_ms = 800,
    .easing      = ease_in_out_quad,
    .hold        = false,
};

void Behavior_Init(void);
void Behavior_Play(const Behavior_t *behavior);
void Behavior_Update(void);  // 在主循环调用 | Call in main loop
bool Behavior_IsFinished(void);

#endif // BEHAVIOR_SYSTEM_H
```

```c
/* behavior_system.c — 行为系统实现 */
/* behavior_system.c — Behavior System Implementation */

#include "behavior_system.h"
#include "animation_player.h"

static struct {
    const Behavior_t *active;      // 当前行为 | Current behavior
    int16_t  start_angles[6];     // 起始关节角度 | Start joint angles
    uint32_t elapsed_ms;          // 已经过的时间 | Elapsed time
    bool     running;             // 是否运行中 | Is running
    bool     returning;           // 是否在返回中 | Is returning (to neutral)
} bhv;

void Behavior_Init(void)
{
    bhv.active = NULL;
    bhv.running = false;
    bhv.returning = false;
    bhv.elapsed_ms = 0;
}

void Behavior_Play(const Behavior_t *behavior)
{
    bhv.active = behavior;
    bhv.elapsed_ms = 0;
    bhv.running = true;
    bhv.returning = false;

    // 记录当前舵机角度作为起始 | Record current angles as start
    for (uint8_t i = 0; i < 6; i++) {
        bhv.start_angles[i] = behavior->start_pose->angles[i];
    }

    // 切换表情 | Switch expression
    AnimPlayer_SetExpression(behavior->expression);
}

void Behavior_Update(void)
{
    if (!bhv.running || bhv.active == NULL) return;

    bhv.elapsed_ms += 10;  // 假设10ms调用一次 | Assume 10ms call interval

    // 计算归一化进度 t ∈ [0, 1] | Compute normalized progress
    float t = (float)bhv.elapsed_ms / (float)bhv.active->duration_ms;
    if (t > 1.0f) t = 1.0f;

    // 应用缓动函数 | Apply easing function
    float eased_t = bhv.active->easing(t);

    // 插值计算各关节角度 | Interpolate joint angles
    int16_t interp_angles[6];
    for (uint8_t i = 0; i < 6; i++) {
        float start = (float)bhv.start_angles[i];
        float end   = (float)bhv.active->end_pose->angles[i];
        interp_angles[i] = (int16_t)(start + eased_t * (end - start));
    }

    // 发送给舵机 | Send to servos
    Servo_BroadcastMove(interp_angles);

    // 检查是否完成 | Check if finished
    if (t >= 1.0f) {
        if (!bhv.active->hold && !bhv.returning) {
            // 返回中性姿态 | Return to neutral pose
            bhv.returning = true;
            bhv.elapsed_ms = 0;
            // 反向播放 | Play in reverse
            Pose_t reverse_start = *bhv.active->end_pose;
            // ...
        } else {
            bhv.running = false;
        }
    }
}

bool Behavior_IsFinished(void) { return !bhv.running; }
```

**预期结果:**
- 行为系统能同时驱动表情和动作
- 缓动函数让动作自然流畅，不是匀速机械运动
- 多个行为可以顺序执行

**常见问题:**
- **动作和表情不同步**：动画帧率和舵机更新频率不同，统一使用同一时间基准
- **弹性缓动导致动作过冲**：弹性函数会让关节角度暂时超过目标值，确保舵机机械限位大于缓动过冲范围
- **行为队列冲突**：新行为打断旧行为时，需要平滑过渡而非突变

---

## 今日作业 | Homework

### 必做题
1. 完成SD卡FatFS初始化，能成功读取SD卡上的表情帧文件
2. 实现动画播放引擎，至少能播放一个表情的Loop段（连续循环）
3. 实现基础状态机，支持IDLE和INTERACTING两个状态的切换
4. 在串口打印当前状态机的状态和事件日志

### 挑战题
1. **表情淡入淡出**: 实现两个表情之间的Alpha混合过渡（像素级混合两个帧缓冲区）
2. **行为队列**: 实现一个行为队列，支持多个行为按顺序自动执行（如：挥手→鞠躬→回到中立）
3. **自适应帧率**: 根据SD卡实际读取速度动态调整帧率，确保不卡顿

### 思考题
1. 为什么帧动画系统使用Enter-Loop-Exit三段式而不是简单地循环播放所有帧？这种设计有什么好处？
2. 状态机模式相比大量if-else语句有什么优势？在什么场景下状态机会变得复杂到不适合使用？
3. 缓动函数的本质是什么？为什么ease_out_elastic看起来比ease_linear"更自然"？（提示：物理世界中运动都有惯性）

---

## 明日预告 | Tomorrow's Preview

明天我们将集成传感器系统！上午学习MPU6050 IMU驱动，读取加速度计和陀螺仪数据，实现姿态解算。下午驱动APDS-9960手势传感器，实现手势识别算法。最后将所有传感器数据融合到事件系统中，让ElectronBot能感知自身姿态和用户手势——从"被动"变成"主动"！

Tomorrow we integrate the sensor system! In the morning, learn the MPU6050 IMU driver, read accelerometer and gyroscope data, and implement attitude estimation. In the afternoon, drive the APDS-9960 gesture sensor and implement gesture recognition. Finally, fuse all sensor data into the event system, enabling ElectronBot to sense its own attitude and user gestures -- transforming from "passive" to "active"!

---

## 参考资源 | References

- [FatFS 通用FAT文件系统模块](http://elm-chan.org/fsw/ff/00index_e.html)
- [STM32 SDIO 接口应用手册](https://www.st.com/resource/en/application_note/cd00259245.pdf)
- [有限状态机设计模式](https://en.wikipedia.org/wiki/Finite-state_machine)
- [缓动函数速查表 (Easings.net)](https://easings.net/)
- [游戏引擎动画系统设计](https://gameprogrammingpatterns.com/state.html)
- [GC9A01 圆形屏表情项目参考](https://github.com/0zv0/ElectronBot)
- [FatFS 移植教程 (B站)](https://search.bilibili.com/all?keyword=STM32%20FatFS%20SD%E5%8D%A1)

*最后更新：2026-05-27*
