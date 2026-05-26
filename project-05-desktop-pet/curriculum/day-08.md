# Day 08: 音效与特效系统 | Sound Effects & Visual Effects

> **今日目标:**
> - 学习使用QMediaPlayer播放音效
> - 创建音效管理器
> - 实现粒子特效系统
> - 为各种交互添加音效和视觉反馈
>
> **产出:** 桌宠有完整的音效反馈和粒子特效

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 对话系统效果展示 |
| 09:15 - 10:30 | 知识讲解 | 音频播放API、粒子系统基础 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 实现音效管理器 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 粒子特效系统 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 整合音效和特效到桌宠 |
| 16:30 - 17:00 | 总结分享 | 效果系统设计讨论 |

---

## 上午: 音效系统 | Morning: Sound Effects System

### 为什么要学这个? | Why Learn This?

你有没有注意到，每个手机App在点击按钮时都有微妙的振动反馈，游戏中的每个动作都伴随音效？这不是装饰，而是"感觉反馈"设计的核心。研究表明，带有声音反馈的界面会让用户感觉响应更快、更有亲和力。

Have you noticed that every mobile app provides subtle haptic feedback on button clicks, and every game action has a sound effect? This is not decoration -- it is core "sensory feedback" design. Research shows that interfaces with audio feedback feel more responsive and approachable.

音效设计是游戏开发的重要环节，也是所有交互式应用不可忽视的用户体验要素。学会音效系统，你做任何交互应用都会更有"感觉"。

Sound design is important in game development and a crucial UX element in all interactive applications.

### 任务8.1: 获取音效素材 (20分钟)

**步骤:**

1. 从以下网站下载免费音效：
   - [Pixabay Sound Effects](https://pixabay.com/sound-effects/) -- 免费可商用
   - [Freesound](https://freesound.org/) -- 社区贡献的免费音效

2. 准备以下音效文件：
```
assets/sounds/
├── click.wav       # 点击音效（短促的"叮"声）
├── meow.wav        # 猫叫声
├── eat.wav         # 吃东西音效
├── sleep.wav       # 打呼噜声
├── walk.wav        # 脚步声
├── happy.wav       # 开心音效
└── bubble.wav      # 气泡弹出音效
```

3. 音效文件格式建议：
   - 格式：WAV或MP3
   - 时长：0.5-2秒（短音效）
   - 采样率：44100Hz
   - 大小：每个文件不超过500KB

### 任务8.2: 实现音效管理器 (30分钟)

**步骤:**

创建文件 `sound_manager.py`：

```python
import os
from PyQt5.QtMultimedia import QMediaPlayer, QMediaContent
from PyQt5.QtCore import QUrl

class SoundManager:
    """音效管理器 -- 管理所有音效的加载和播放"""

    def __init__(self, sounds_dir="assets/sounds"):
        self.sounds_dir = sounds_dir
        self.sounds = {}         # 存储音效文件路径
        self.enabled = True      # 音效总开关
        self.volume = 50         # 音量（0-100）
        self.player = QMediaPlayer()  # 播放器实例

        # 自动加载目录中的所有音效
        self.load_all_sounds()

    def load_all_sounds(self):
        """自动加载音效目录中的所有音频文件"""
        if not os.path.exists(self.sounds_dir):
            print(f"[音效] 警告：音效目录 {self.sounds_dir} 不存在")
            return

        for filename in os.listdir(self.sounds_dir):
            if filename.endswith(('.wav', '.mp3', '.ogg')):
                name = os.path.splitext(filename)[0]  # 去掉扩展名
                path = os.path.join(self.sounds_dir, filename)
                self.sounds[name] = path
                print(f"[音效] 已加载: {name}")

    def play(self, sound_name):
        """播放指定音效"""
        if not self.enabled:
            return

        if sound_name not in self.sounds:
            print(f"[音效] 警告：音效 '{sound_name}' 未找到")
            return

        # 停止当前播放
        self.player.stop()

        # 设置音效文件
        url = QUrl.fromLocalFile(os.path.abspath(self.sounds[sound_name]))
        self.player.setMedia(QMediaContent(url))
        self.player.setVolume(self.volume)
        self.player.play()

    def set_volume(self, volume):
        """设置音量（0-100）"""
        self.volume = max(0, min(100, volume))
        self.player.setVolume(self.volume)

    def toggle(self):
        """切换音效开关"""
        self.enabled = not self.enabled
        return self.enabled

    def mute(self):
        """静音"""
        self.enabled = False

    def unmute(self):
        """取消静音"""
        self.enabled = True
```

**预期结果:**
- 音效管理器自动加载指定目录中的所有音频文件
- 调用`play("click")`可以播放对应的音效
- 支持音量控制和静音功能

**常见问题:**
- **没有声音**：检查音效文件路径是否正确，检查系统音量
- **报错"No module named 'PyQt5.QtMultimedia'"**：需要额外安装 `pip install PyQt5-sip PyQt5`
- **播放延迟**：QMediaPlayer对短音效可能有延迟，可以改用QSoundEffect

### 任务8.3: 使用QSoundEffect播放短音效 (20分钟)

QSoundEffect更适合播放短音效（无延迟）：

```python
from PyQt5.QtMultimedia import QSoundEffect
from PyQt5.QtCore import QUrl

class SoundEffectManager:
    """短音效管理器 -- 使用QSoundEffect，更适合短音效"""

    def __init__(self, sounds_dir="assets/sounds"):
        self.sounds_dir = sounds_dir
        self.effects = {}       # 存储预加载的音效
        self.enabled = True
        self.volume = 0.5       # 音量（0.0-1.0）

        self.preload_all()

    def preload_all(self):
        """预加载所有音效到内存"""
        if not os.path.exists(self.sounds_dir):
            return

        for filename in os.listdir(self.sounds_dir):
            if filename.endswith(('.wav', '.ogg')):
                name = os.path.splitext(filename)[0]
                path = os.path.join(self.sounds_dir, filename)

                effect = QSoundEffect()
                effect.setSource(QUrl.fromLocalFile(os.path.abspath(path)))
                effect.setVolume(self.volume)
                self.effects[name] = effect

    def play(self, sound_name):
        """播放音效（几乎无延迟）"""
        if not self.enabled:
            return
        if sound_name in self.effects:
            self.effects[sound_name].play()

    def set_volume(self, volume):
        """设置音量（0.0-1.0）"""
        self.volume = max(0.0, min(1.0, volume))
        for effect in self.effects.values():
            effect.setVolume(self.volume)
```

---

## 下午: 粒子特效系统 | Afternoon: Particle Effects System

### 为什么要学粒子特效? | Why Learn This?

游戏中的火焰、烟雾、爆炸、魔法光效，甚至天气效果（雨、雪），全都是粒子系统实现的。粒子系统是游戏开发中最常用的视觉效果技术，它的核心思想非常简单：大量微小的粒子按照物理规律运动，组合起来就形成了复杂的视觉效果。

Game effects like fire, smoke, explosions, magic glows, and even weather (rain, snow) are all created with particle systems. The core idea is simple: many tiny particles follow physics rules, and their combined motion creates complex visual effects.

在桌宠项目中，当宠物开心时飘出心形、被点击时出现星星、喂食时出现食物图标，都需要粒子系统。

In a desktop pet project, hearts when happy, stars when clicked, food icons when feeding -- all require a particle system.

### 任务8.4: 实现基础粒子系统 (40分钟)

创建文件 `particle_system.py`：

```python
import random
import math
from PyQt5.QtWidgets import QWidget, QLabel
from PyQt5.QtCore import Qt, QTimer, QPoint
from PyQt5.QtGui import QPainter, QColor, QFont

class Particle:
    """单个粒子"""

    def __init__(self, x, y, char="*", color=QColor(255, 100, 100), size=16):
        self.x = x
        self.y = y
        self.char = char       # 粒子显示的字符（emoji或符号）
        self.color = color
        self.size = size
        # 随机速度和方向
        angle = random.uniform(0, 2 * math.pi)
        speed = random.uniform(1, 3)
        self.vx = math.cos(angle) * speed
        self.vy = math.sin(angle) * speed - 2  # 初始向上
        self.gravity = 0.05    # 重力加速度
        self.life = 1.0        # 生命值（1.0 -> 0.0）
        self.decay = random.uniform(0.01, 0.02)  # 生命衰减速度

    def update(self):
        """更新粒子状态"""
        self.vy += self.gravity   # 重力影响
        self.x += self.vx
        self.y += self.vy
        self.life -= self.decay   # 生命衰减

    def is_alive(self):
        """粒子是否还存活"""
        return self.life > 0


class ParticleSystem(QWidget):
    """粒子特效系统 -- 在桌宠上方显示粒子效果"""

    def __init__(self, parent=None):
        super().__init__(parent)
        self.particles = []
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.setAttribute(Qt.WA_TransparentForMouseEvents)  # 鼠标穿透

        # 更新定时器
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_particles)
        self.timer.start(16)  # 约60FPS

    def emit_hearts(self, x, y, count=5):
        """发射爱心粒子"""
        heart_chars = ["❤", "♥", "♡"]  # ❤ ♥ ♡
        for _ in range(count):
            px = x + random.randint(-20, 20)
            py = y + random.randint(-20, 0)
            color = QColor(
                random.randint(200, 255),
                random.randint(50, 150),
                random.randint(100, 200)
            )
            p = Particle(px, py, random.choice(heart_chars), color, 18)
            p.vy = -2  # 向上飘
            p.gravity = 0.02
            p.decay = 0.008
            self.particles.append(p)

    def emit_stars(self, x, y, count=8):
        """发射星星粒子"""
        star_chars = ["*", "★", "☆"]  # * ★ ☆
        for _ in range(count):
            px = x + random.randint(-30, 30)
            py = y + random.randint(-30, 30)
            color = QColor(255, 215, 0)  # 金色
            p = Particle(px, py, random.choice(star_chars), color, 14)
            p.gravity = 0.03
            self.particles.append(p)

    def emit_music_notes(self, x, y, count=3):
        """发射音符粒子"""
        notes = ["♪", "♫", "♩"]  # ♪ ♫ ♩
        for _ in range(count):
            px = x + random.randint(-10, 10)
            py = y + random.randint(-10, 0)
            color = QColor(100, 200, 255)  # 浅蓝色
            p = Particle(px, py, random.choice(notes), color, 16)
            p.vy = -1.5
            p.vx = random.uniform(-0.5, 0.5)
            p.gravity = 0.01
            p.decay = 0.006
            self.particles.append(p)

    def update_particles(self):
        """更新所有粒子"""
        # 更新每个粒子
        for p in self.particles:
            p.update()

        # 移除死亡粒子
        self.particles = [p for p in self.particles if p.is_alive()]

        # 触发重绘
        if self.particles:
            self.update()

    def paintEvent(self, event):
        """绘制所有粒子"""
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)

        for p in self.particles:
            # 根据生命值调整透明度
            alpha = int(p.life * 255)
            color = QColor(p.color.red(), p.color.green(), p.color.blue(), alpha)

            painter.setPen(color)
            font = QFont("Segoe UI Emoji", p.size)
            painter.setFont(font)
            painter.drawText(int(p.x), int(p.y), p.char)

        painter.end()
```

### 任务8.5: 集成音效和特效 (30分钟)

```python
class PetWindow(QWidget):
    def __init__(self):
        super().__init__()
        # ... 其他初始化
        self.sound_manager = SoundEffectManager("assets/sounds")
        self.setup_particles()

    def setup_particles(self):
        """设置粒子系统"""
        self.particle_system = ParticleSystem(self)
        self.particle_system.setGeometry(0, 0, 400, 400)  # 比窗口大，粒子可以飘出去
        self.particle_system.move(-100, -200)  # 偏移到宠物上方

    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            # 播放点击音效
            self.sound_manager.play("click")

            # 在点击位置发射星星
            pos = event.pos()
            self.particle_system.emit_stars(pos.x(), pos.y() - 200 + 100)

            # 显示开心气泡
            self.show_bubble("喵~")

            # 触发状态机事件
            self.state_machine.handle_event("clicked")

    def do_feed(self):
        """喂食操作"""
        self.needs.feed()
        self.sound_manager.play("eat")
        self.show_bubble("好好吃！谢谢！")
        # 发射爱心
        self.particle_system.emit_hearts(100, -100, count=8)

    def do_pet(self):
        """抚摸操作"""
        self.needs.pet()
        self.sound_manager.play("meow")
        self.particle_system.emit_hearts(100, -100, count=3)
```

**预期结果:**
- 点击桌宠时有音效和星星粒子
- 喂食时有吃东西音效和爱心粒子
- 抚摸时有猫叫声和小爱心
- 粒子从宠物位置向上飘散后消失
- 气泡弹出时有音效

---

## 关于代码组织的说明 | Note on Code Organization

> **提示：** 本课程将音效管理器（SoundEffectManager）和粒子系统（ParticleSystem）分别放在独立文件中讲解，便于理解各模块的职责。在实际项目代码（`pet.py`）中，这些功能被简化并整合在同一个文件中。两种方式都是合理的：
> - **独立文件**：模块职责清晰，便于维护大型项目
> - **整合到主文件**：减少文件数量，适合中小型项目
>
> 学生可以自行选择将功能拆分为独立模块，也可以将其保留在 `pet.py` 中。
>
> **Note:** This course teaches SoundEffectManager and ParticleSystem in separate files for clarity. In the actual project code (`pet.py`), these features are simplified and integrated into a single file. Both approaches are valid:
> - **Separate files**: Clear module responsibilities, better for large projects
> - **Single file**: Fewer files, suitable for small/medium projects

---

## 今日作业 | Homework

### 必做题
1. 实现音效管理器，加载至少3个音效文件
2. 实现粒子特效系统，至少有星星和爱心两种粒子
3. 为点击、喂食、抚摸操作添加音效和粒子反馈

### 挑战题
1. 实现"下雨"特效（大量小粒子从上往下落）
2. 实现"生气"特效（红色蒸汽粒子从头顶冒出）
3. 添加背景音乐功能（循环播放轻柔的BGM）

### 思考题
1. 为什么短音效推荐用QSoundEffect而不是QMediaPlayer？
2. 粒子系统中"重力"参数的作用是什么？如果去掉重力，粒子效果会有什么变化？

---

## 明日预告 | Tomorrow's Preview

恭喜完成第二阶段！从明天开始进入第三阶段。首先我们将实现完整的拖拽交互和桌面边界检测，让桌宠在屏幕边缘自动攀爬和掉落（像Shimeji那样），并添加物理模拟效果。

Congratulations on completing Phase 2! Starting tomorrow in Phase 3, we implement full drag interaction with desktop boundary detection, letting the pet climb and fall at screen edges (like Shimeji), with physics simulation.

---

## 参考资源 | References

- [PyQt5 多媒体模块文档](https://www.riverbankcomputing.com/static/Docs/PyQt5/api/qtmultimedia.html)
- [Pixabay 免费音效](https://pixabay.com/sound-effects/)
- [Freesound 音效库](https://freesound.org/)
- [Canvas 粒子特效基础（MDN）](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations)
- [Pygame 粒子效果教程](https://www.pygame.org/docs/)
- [AI桌宠详细教程，如果这都做不出来，那我送你了！](https://www.bilibili.com/video/BV1KMQnBFEHu/) -- UP主：VOID造物主，含音效和特效的实际应用演示
- [AI猫娘桌宠项目，作为交互游戏作业的案例](https://www.bilibili.com/video/BV1FULS6mEkP/) -- UP主：狼凛望，展示桌宠音效和粒子特效的完整效果

*最后更新：2026-05-26*
