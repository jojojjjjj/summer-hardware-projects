# Day 11: AI对话集成与自定义行为系统 | AI Dialogue & Custom Behavior System

> **今日目标:**
> - 实现LLM API集成（DeepSeek/OpenAI），让机器人能进行智能对话
> - 集成语音识别（STT）和语音合成（TTS）
> - 设计行为树（Behavior Tree），实现反应式AI行为
> - 构建情感模型，让桌宠拥有个性化性格
>
> **产出:** ElectronBot能听懂语音、调用大模型生成回复、通过TTS语音播放，并根据传感器事件做出个性化反应

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间回顾 | OpenCV/MediaPipe集成回顾，延迟优化讨论 |
| 09:15 - 10:30 | 知识讲解 | LLM API调用、流式响应、STT/TTS原理 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | DeepSeek API集成、流式对话实现 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | STT/TTS集成、对话状态管理 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 行为树设计、情感模型、个性参数 |
| 16:30 - 17:00 | 总结分享 | AI集成经验分享、项目进度检查 |

---

## 上午: LLM API集成 | Morning: LLM API Integration

### 为什么要学这个? | Why Learn This?

让桌宠拥有"智能大脑"是区别于传统玩具的关键。通过调用云端大模型API，ElectronBot可以理解自然语言、记住对话上下文、做出有上下文关联的回答，真正成为一个"有个性"的AI伙伴。

Giving the desktop pet an "intelligent brain" is what sets it apart from traditional toys. By calling cloud-based LLM APIs, ElectronBot can understand natural language, remember conversation context, and make contextually relevant responses — truly becoming an "AI companion with personality."

### 任务11.1: DeepSeek API集成 (40分钟)

```python
import openai
import json

class LLMChat:
    def __init__(self, api_key, model="deepseek-chat", base_url="https://api.deepseek.com"):
        self.client = openai.OpenAI(api_key=api_key, base_url=base_url)
        self.model = model
        self.system_prompt = """你是ElectronBot，一个可爱的桌面机器人。
你的性格特征：
- 活泼开朗，喜欢和主人互动
- 偶尔会撒娇或卖萌
- 对科技知识很感兴趣
- 会用简短的语言回复（适合语音播放）
- 有时会用emoji表达情绪

回复要求：
- 每次回复不超过2-3句话
- 语气轻松活泼
- 如果主人说"再见"或"晚安"，要表达不舍"""
        self.history = []

    def chat(self, user_message, stream=True):
        self.history.append({"role": "user", "content": user_message})

        messages = [
            {"role": "system", "content": self.system_prompt}
        ] + self.history[-10:]  # 保留最近10轮对话

        if stream:
            return self._chat_stream(messages)
        else:
            return self._chat_sync(messages)

    def _chat_stream(self, messages):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            stream=True,
            temperature=0.8,
            max_tokens=150
        )
        full_reply = ""
        for chunk in response:
            if chunk.choices[0].delta.content:
                text = chunk.choices[0].delta.content
                full_reply += text
                yield text  # 逐字输出用于TTS

        self.history.append({"role": "assistant", "content": full_reply})

    def _chat_sync(self, messages):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0.8,
            max_tokens=150
        )
        reply = response.choices[0].message.content
        self.history.append({"role": "assistant", "content": reply})
        return reply

    def clear_history(self):
        self.history = []
```

**预期结果:** 调用 `chat("你好")` 得到角色化回复，如"嘿嘿，主人好呀！今天想和我聊什么呢？"

### 任务11.2: 语音识别（STT）集成 (30分钟)

```python
import speech_recognition as sr

class VoiceRecognizer:
    def __init__(self, language="zh-CN"):
        self.recognizer = sr.Recognizer()
        self.language = language
        # 调整环境噪声阈值
        self.recognizer.dynamic_energy_threshold = True
        self.recognizer.pause_threshold = 0.8  # 停顿0.8秒认为说完了

    def listen(self, timeout=5, phrase_time_limit=10):
        """从麦克风录音并识别"""
        with sr.Microphone() as source:
            print("Listening...")
            self.recognizer.adjust_for_ambient_noise(source, duration=0.5)
            try:
                audio = self.recognizer.listen(
                    source, timeout=timeout,
                    phrase_time_limit=phrase_time_limit)
                text = self.recognizer.recognize_google(
                    audio, language=self.language)
                return text
            except sr.WaitTimeoutError:
                return None
            except sr.UnknownValueError:
                return None
            except sr.RequestError as e:
                print(f"STT Error: {e}")
                return None
```

### 任务11.3: 语音合成（TTS）集成 (20分钟)

```python
from pathlib import Path
import edge_tts

class VoiceSynthesizer:
    def __init__(self, voice="zh-CN-XiaoyiNeural"):
        self.voice = voice  # 微软Edge TTS中文女声（活泼风格）

    async def synthesize(self, text, output_path="temp_tts.mp3"):
        """将文本转为语音文件"""
        communicate = edge_tts.Communicate(text, self.voice)
        await communicate.save(output_path)
        return output_path

    def speak(self, text):
        """同步接口：生成语音并播放"""
        import asyncio
        import subprocess
        output = asyncio.run(self.synthesize(text))
        # Windows播放音频
        subprocess.Popen(['cmd', '/c', 'start', '/min', output],
                        shell=False)
```

---

## 下午: 行为树与情感模型 | Afternoon: Behavior Tree & Emotion Model

### 为什么要学行为树? | Why Behavior Trees?

简单的if-else很难描述复杂的AI行为。行为树（Behavior Tree）是游戏AI中广泛使用的架构，它用树状结构组织行为优先级和选择逻辑，让桌宠的"个性"可以通过配置而非硬编码来实现。

Simple if-else can't describe complex AI behaviors well. Behavior Trees are widely used in game AI — they organize behavior priorities and selection logic in a tree structure, making the pet's "personality" configurable rather than hard-coded.

### 任务11.4: 行为树实现 (40分钟)

```python
from enum import Enum

class NodeStatus(Enum):
    SUCCESS = 1
    FAILURE = 2
    RUNNING = 3

# 行为树节点基类
class BTNode:
    def tick(self, context):
        raise NotImplementedError

class SelectorNode(BTNode):
    """选择节点：依次执行子节点，任一成功则成功"""
    def __init__(self, children):
        self.children = children

    def tick(self, context):
        for child in self.children:
            status = child.tick(context)
            if status != NodeStatus.FAILURE:
                return status
        return NodeStatus.FAILURE

class SequenceNode(BTNode):
    """序列节点：依次执行子节点，全部成功才成功"""
    def __init__(self, children):
        self.children = children

    def tick(self, context):
        for child in self.children:
            status = child.tick(context)
            if status != NodeStatus.SUCCESS:
                return status
        return NodeStatus.SUCCESS

class ActionNode(BTNode):
    """动作节点：执行具体行为"""
    def __init__(self, action_fn):
        self.action_fn = action_fn

    def tick(self, context):
        return self.action_fn(context)

class ConditionNode(BTNode):
    """条件节点：检查是否满足条件"""
    def __init__(self, condition_fn):
        self.condition_fn = condition_fn

    def tick(self, context):
        if self.condition_fn(context):
            return NodeStatus.SUCCESS
        return NodeStatus.FAILURE

# 构建ElectronBot行为树
def build_behavior_tree(bridge, expression_engine):
    def check_poked(ctx):
        return ctx.get('last_event') == 'EVENT_TAPPED'

    def check_picked_up(ctx):
        return ctx.get('last_event') == 'EVENT_PICKED_UP'

    def check_idle_timeout(ctx):
        return ctx.get('idle_seconds', 0) > 30

    def check_voice_command(ctx):
        return ctx.get('voice_text') is not None

    def react_surprised(ctx):
        expression_engine.play_expression('surprised')
        bridge.send_servo_command(neck=10, left_arm_pitch=-20, right_arm_pitch=-20)
        return NodeStatus.SUCCESS

    def react_scared(ctx):
        expression_engine.play_expression('scared')
        bridge.send_servo_command(waist=0, neck=-15,
                                  left_arm_pitch=-45, right_arm_pitch=-45)
        return NodeStatus.SUCCESS

    def idle_behavior(ctx):
        # 随机播放idle动作
        import random
        expr = random.choice(['happy', 'sleepy', 'curious', 'blink'])
        expression_engine.play_expression(expr)
        return NodeStatus.SUCCESS

    def handle_voice(ctx):
        text = ctx.get('voice_text', '')
        expression_engine.play_expression('listening')
        # LLM对话由上层处理
        return NodeStatus.SUCCESS

    # 行为树结构（优先级从高到低）
    root = SelectorNode([
        # 最高优先级：语音命令
        SequenceNode([
            ConditionNode(check_voice_command),
            ActionNode(handle_voice),
        ]),
        # 高优先级：被拍打
        SequenceNode([
            ConditionNode(check_poked),
            ActionNode(react_surprised),
        ]),
        # 高优先级：被拿起
        SequenceNode([
            ConditionNode(check_picked_up),
            ActionNode(react_scared),
        ]),
        # 低优先级：空闲行为
        SequenceNode([
            ConditionNode(check_idle_timeout),
            ActionNode(idle_behavior),
        ]),
    ])
    return root
```

### 任务11.5: 情感模型 (30分钟)

```python
import random

class EmotionModel:
    """简单的PAD情感模型（Pleasure-Arousal-Dominance）"""
    def __init__(self):
        # PAD值范围 [-1.0, 1.0]
        self.pleasure = 0.5    # 正=开心，负=不开心
        self.arousal = 0.3     # 正=兴奋，负=困倦
        self.dominance = 0.0   # 正=主导，负=顺从
        self.personality = {
            'friendliness': 0.8,   # 友好度（影响pleasure变化速率）
            'curiosity': 0.7,      # 好奇心（影响对新事件的反应）
            'laziness': 0.3,       # 懒惰度（影响idle行为频率）
            'shyness': 0.4,        # 害羞度（影响被拍打时的反应）
        }

    def update(self, event):
        """根据事件更新情感状态"""
        event_effects = {
            'EVENT_TAPPED':    {'pleasure': -0.1, 'arousal': 0.3, 'dominance': -0.2},
            'EVENT_PICKED_UP': {'pleasure': -0.2, 'arousal': 0.5, 'dominance': -0.3},
            'EVENT_PUT_DOWN':  {'pleasure': 0.1,  'arousal': -0.2, 'dominance': 0.1},
            'EVENT_WAVE_UP':   {'pleasure': 0.2,  'arousal': 0.1, 'dominance': 0.0},
            'EVENT_WAVE_LEFT': {'pleasure': 0.15, 'arousal': 0.1, 'dominance': 0.0},
            'VOICE_POSITIVE':  {'pleasure': 0.3,  'arousal': 0.2, 'dominance': 0.1},
            'VOICE_NEGATIVE':  {'pleasure': -0.2, 'arousal': 0.1, 'dominance': -0.1},
            'IDLE_LONG':       {'pleasure': -0.05, 'arousal': -0.1, 'dominance': 0.0},
        }
        effects = event_effects.get(event, {'pleasure': 0, 'arousal': 0, 'dominance': 0})

        # 应用性格修正
        self.pleasure += effects['pleasure'] * self.personality['friendliness']
        self.arousal += effects['arousal'] * (1 - self.personality['laziness'])
        self.dominance += effects['dominance'] * (1 - self.personality['shyness'])

        # 限制范围
        self.pleasure = max(-1, min(1, self.pleasure))
        self.arousal = max(-1, min(1, self.arousal))
        self.dominance = max(-1, min(1, self.dominance))

        # 情感自然衰减（趋向中性状态）
        self.pleasure *= 0.98
        self.arousal *= 0.95

    def get_expression(self):
        """根据当前情感状态返回推荐表情"""
        if self.pleasure > 0.5 and self.arousal > 0.3:
            return 'happy'
        elif self.pleasure > 0.3 and self.arousal < -0.1:
            return 'sleepy'
        elif self.pleasure < -0.3 and self.arousal > 0.3:
            return 'angry'
        elif self.pleasure < -0.3:
            return 'sad'
        elif self.arousal > 0.5:
            return 'surprised'
        elif self.pleasure > 0.2:
            return 'curious'
        else:
            return 'neutral'
```

**预期结果:** 机器人能根据交互历史展现不同的情感状态，idle时逐渐变得困倦，被互动时变得活跃

**常见问题:**
- **DeepSeek API返回错误**: 检查API Key是否正确，账户余额是否充足，网络是否通畅
- **TTS语音卡顿**: edge-tts是异步的，确保在后台线程运行，不阻塞主循环
- **STT识别率低**: 调高`pause_threshold`，或在安静环境下使用。也可以换用Whisper本地模型
- **行为树不触发**: 检查context字典是否正确更新，条件函数是否返回正确的布尔值

---

## 今日作业 | Homework

### 必做题
1. 完成DeepSeek/OpenAI API集成，能进行基本的多轮对话
2. 完成STT+TTS集成，实现语音对话闭环
3. 实现基本的行为树，至少包含3种事件反应

### 挑战题
1. 给LLM添加"记住主人名字"功能，在system prompt中动态注入上下文
2. 实现情感模型驱动表情选择，让机器人的情感变化可视化（显示当前PAD值）
3. 添加"学习模式"：机器人可以通过对话学习新词汇，并在后续对话中使用

### 思考题
1. 行为树的Selector和Sequence节点有什么区别？为什么高优先级行为要放在Selector的前面？
2. PAD情感模型中的"衰减"机制有什么意义？如果不衰减会怎样？
3. 如何让多个用户使用同一个ElectronBot时拥有不同的"记忆"？

---

## 明日预告 | Tomorrow's Preview

最后一天！我们将进行系统稳定性优化、Bug修复马拉松、演示流程排练，然后正式进行项目展示。准备好展示你的ElectronBot进阶桌宠！

The final day! We'll optimize system stability, run a bug fix marathon, rehearse demo flow, then hold formal project presentations. Get ready to showcase your advanced ElectronBot desktop pet!

---

## 参考资源 | References

- [DeepSeek API文档](https://platform.deepseek.com/api-docs/)
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [edge-tts项目](https://github.com/rany2/edge-tts)
- [SpeechRecognition库](https://pypi.org/project/SpeechRecognition/)
- [行为树入门教程](https://www.behaviortree.dev/)
- [PAD情感模型论文](https://doi.org/10.1111/j.1467-6494.1985.tb01609.x)

*最后更新：2026-05-27*
