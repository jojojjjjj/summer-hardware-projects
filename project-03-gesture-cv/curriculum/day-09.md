# Day 9: 手势控制——音量调节器 | Gesture Control: Volume Controller

> **今日目标:** 将手势识别映射到系统音量控制
>
> **Today's Goal:** Map gesture recognition to system volume control

---

## 学习目标 | Learning Objectives

完成今天的学习后，你将能够:
- ✅ 调用系统API控制音量
- ✅ 实现手势到音量的平滑映射
- ✅ 添加防抖和平滑处理
- ✅ 创建完整的交互体验

> After completing today's lesson, you will be able to:
> - ✅ Call system API to control volume
> - ✅ Implement smooth gesture-to-volume mapping
> - ✅ Add debouncing and smoothing
> - ✅ Create complete interactive experience

---

## 为什么学这个？| Why Learn This?

### 人机交互的实际应用
> 从智能汽车的中控到智能家居，手势控制正在改变我们与设备的交互方式。

### 系统API调用能力
> 现代编程不只是算法，还包括与操作系统和其他服务的集成。

### 用户体验设计
> 好的控制需要考虑响应速度、平滑过渡、视觉反馈等UX要素。

---

## 任务一: 音量控制器实现 | Task 1: Volume Controller Implementation (60分钟)

```python
import cv2
import mediapipe as mp
import numpy as np
import time

try:
    from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
    from ctypes import cast, POINTER
    from comtypes import CLSCTX_ALL
    PYCAW_AVAILABLE = True
except ImportError:
    PYCAW_AVAILABLE = False
    print("警告: pycaw未安装，音量控制将被模拟")
    print("Warning: pycaw not installed, volume control will be simulated")


class SystemVolumeController:
    """系统音量控制器"""
    
    def __init__(self):
        if PYCAW_AVAILABLE:
            devices = AudioUtilities.GetSpeakers()
            interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
            self.volume = cast(interface, POINTER(IAudioEndpointVolume))
            self.volume_range = self.volume.GetVolumeRange()
            self.min_vol, self.max_vol = self.volume_range[0], self.volume_range[1]
        else:
            self.volume = None
            self.current_volume = 50  # 模拟音量
    
    def set_volume(self, level):
        """设置音量 (0-100)"""
        level = max(0, min(100, level))
        if PYCAW_AVAILABLE:
            # 将0-100映射到系统音量范围
            system_level = self.min_vol + (level / 100) * (self.max_vol - self.min_vol)
            self.volume.SetMasterVolumeLevel(system_level, None)
        else:
            self.current_volume = level
    
    def get_volume(self):
        """获取当前音量"""
        if PYCAW_AVAILABLE:
            system_level = self.volume.GetMasterVolumeLevel()
            level = ((system_level - self.min_vol) / (self.max_vol - self.min_vol)) * 100
            return max(0, min(100, level))
        else:
            return self.current_volume
    
    def mute(self):
        """静音"""
        if PYCAW_AVAILABLE:
            self.volume.SetMute(1, None)
    
    def unmute(self):
        """取消静音"""
        if PYCAW_AVAILABLE:
            self.volume.SetMute(0, None)


class GestureVolumeController:
    """手势音量控制器"""
    
    def __init__(self):
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            max_num_hands=1,
            min_detection_confidence=0.7,
            min_tracking_confidence=0.5
        )
        self.volume_ctrl = SystemVolumeController()
        self.current_volume = self.volume_ctrl.get_volume()
        self.target_volume = self.current_volume
        
        # 平滑参数
        self.smoothing_factor = 0.1
        self.gesture_active = False
        self.last_gesture_time = 0
        self.gesture_debounce = 0.5  # 500ms防抖
    
    def detect_volume_gesture(self, landmarks):
        """
        检测音量控制手势
        握拳激活，手掌上下移动控制音量
        """
        lm = landmarks.landmark
        
        # 检测握拳（激活手势）
        fingers_curled = (
            lm[8].y > lm[6].y and
            lm[12].y > lm[10].y and
            lm[16].y > lm[14].y and
            lm[20].y > lm[18].y
        )
        
        return fingers_curled
    
    def update_volume(self, hand_y):
        """根据手部Y位置更新音量"""
        # Y坐标转换为音量（屏幕上方=高音量，下方=低音量）
        target = int((1 - hand_y) * 100)
        target = max(0, min(100, target))
        
        # 平滑过渡
        self.current_volume = (self.current_volume * (1 - self.smoothing_factor) + 
                              target * self.smoothing_factor)
        
        self.volume_ctrl.set_volume(int(self.current_volume))
        return self.current_volume
    
    def detect_mute_gesture(self, landmarks):
        """检测静音手势（OK手势）"""
        lm = landmarks.landmark
        
        # 拇指和食指接触
        thumb_tip = lm[4]
        index_tip = lm[8]
        distance = np.sqrt((thumb_tip.x - index_tip.x)**2 + 
                          (thumb_tip.y - index_tip.y)**2)
        
        # 其他手指弯曲
        others_curled = (
            lm[12].y > lm[10].y and
            lm[16].y > lm[14].y and
            lm[20].y > lm[18].y
        )
        
        return distance < 0.05 and others_curled


def main():
    """主程序"""
    controller = GestureVolumeController()
    cap = cv2.VideoCapture(0)
    
    print("手势音量控制 | Gesture Volume Control")
    print("握拳: 激活音量控制 | Fist: Activate volume control")
    print("上下移动: 调节音量 | Move up/down: Adjust volume")
    print("OK手势: 静音/取消静音 | OK gesture: Mute/Unmute")
    print("按 'q' 退出 | Press 'q' to quit")
    
    # 音量条参数
    bar_x, bar_y = 50, 100
    bar_width, bar_height = 300, 30
    
    # 手势状态
    mute_state = False
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        frame = cv2.flip(frame, 1)
        h, w = frame.shape[:2]
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = controller.hands.process(rgb_frame)
        
        gesture_detected = False
        
        if results.multi_hand_landmarks:
            hand_landmarks = results.multi_hand_landmarks[0]
            
            # 检测静音手势
            if controller.detect_mute_gesture(hand_landmarks):
                current_time = time.time()
                if current_time - controller.last_gesture_time > controller.gesture_debounce:
                    mute_state = not mute_state
                    if mute_state:
                        controller.volume_ctrl.mute()
                        print("静音 | Muted")
                    else:
                        controller.volume_ctrl.unmute()
                        print("取消静音 | Unmuted")
                    controller.last_gesture_time = current_time
            
            # 检测音量控制手势
            elif controller.detect_volume_gesture(hand_landmarks):
                gesture_detected = True
                controller.gesture_active = True
                
                # 获取手掌中心Y坐标
                palm_y = hand_landmarks.landmark[9].y
                volume = controller.update_volume(palm_y)
                
                # 绘制手势提示
                cv2.putText(frame, "Volume Control Active", (bar_x, bar_y - 20),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            else:
                controller.gesture_active = False
        
        # 绘制音量条背景
        cv2.rectangle(frame, (bar_x, bar_y), (bar_x + bar_width, bar_y + bar_height), 
                     (100, 100, 100), -1)
        
        # 绘制当前音量
        fill_width = int((controller.current_volume / 100) * bar_width)
        color = (0, 255, 0) if not mute_state else (0, 0, 255)
        cv2.rectangle(frame, (bar_x, bar_y), (bar_x + fill_width, bar_y + bar_height), 
                     color, -1)
        
        # 绘制音量条边框
        cv2.rectangle(frame, (bar_x, bar_y), (bar_x + bar_width, bar_y + bar_height), 
                     (255, 255, 255), 2)
        
        # 显示音量百分比
        volume_text = f"Volume: {int(controller.current_volume)}%"
        if mute_state:
            volume_text += " (MUTED)"
        cv2.putText(frame, volume_text, (bar_x, bar_y + bar_height + 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)
        
        # 显示使用提示
        cv2.putText(frame, "Fist: Control | OK: Mute", (bar_x, bar_y + bar_height + 60),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1)
        
        cv2.imshow('Gesture Volume Control', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
```

---

## 任务二: 优化用户体验 | Task 2: UX Optimization (30分钟)

添加以下增强功能:
1. 音量变化时的视觉反馈动画
2. 触觉反馈（如果支持）
3. 音量达到最大/最小时的提示

---

## 今日作业 | Today's Assignment

### 基础作业（必做）
1. ✅ 实现手势音量控制
2. ✅ 添加静音/取消静音功能
3. ✅ 显示当前音量百分比

### 进阶作业（选做）
1. 添加音量预设值（25%、50%、75%、100%）的快速切换
2. 实现音量变化的声音提示

### 挑战作业
1. 创建音量控制的历史记录和回放功能

---

## 明日预告 | Tomorrow's Preview

**Day 10: 手势控制——虚拟画板**
- 实现手指在空中绘画
- 创建可保存的艺术作品
- 学习画布状态管理

---

**恭喜完成Day 9！** 你已经创建了第一个实用功能。明天将探索更创意的交互！

> **Congratulations on completing Day 9!** You've created your first practical feature. Tomorrow we'll explore more creative interactions!
