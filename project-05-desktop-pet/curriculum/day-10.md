# Day 10: AI对话功能 | AI Dialogue System

> **今日目标:**
> - 了解LLM（大语言模型）API的基本概念
> - 实现调用LLM API的对话功能
> - 设计桌宠的"人设"和对话上下文管理
> - 创建简单的输入对话框
>
> **产出:** 桌宠能通过AI进行自然语言对话，有自己的"人设"和记忆

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 物理系统效果展示 |
| 09:15 - 10:30 | 知识讲解 | LLM API概念、HTTP请求、JSON处理 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 实现基础API调用 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 对话界面和上下文管理 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 人设设计、情感分析 |
| 16:30 - 17:00 | 总结分享 | AI对话功能演示 |

---

## 上午: LLM API基础 | Morning: LLM API Basics

### 为什么要学这个? | Why Learn This?

2023年以来，大语言模型（LLM）彻底改变了技术世界。ChatGPT、文心一言、通义千问等AI助手已经融入了我们的日常生活。但你知道吗？这些AI不仅可以作为独立应用使用，还可以通过API嵌入到你自己的程序中。

Since 2023, Large Language Models (LLMs) have transformed the tech world. ChatGPT, Wenxin Yiyan, Tongyi Qianwen, and other AI assistants have become part of daily life. But did you know these AIs can be embedded into your own programs through APIs?

学会调用LLM API是一项极具价值的技能。无论你将来做什么类型的软件 -- 教育应用、客服机器人、游戏NPC、写作助手 -- 都可能需要集成AI对话能力。今天我们就在桌宠上实现这个功能。

Learning to call LLM APIs is an extremely valuable skill. Whatever software you build in the future -- education apps, customer service bots, game NPCs, writing assistants -- you may need to integrate AI dialogue capabilities.

### 什么是API? | What is an API?

```
你的桌宠程序               服务器（OpenAI等）
┌──────────┐              ┌──────────────┐
│          │  HTTP请求     │              │
│  "你好"  │ ──────────> │  LLM模型     │
│          │              │              │
│  "你好！  │ <────────── │  "你好呀~"   │
│  很高兴   │  HTTP响应    │              │
│  认识你！" │              └──────────────┘
└──────────┘
```

API（Application Programming Interface）就是程序之间的"对话方式"。你的程序发送一个请求，服务器处理后返回结果。

### 任务10.1: 配置API环境 (30分钟)

**步骤:**

1. **获取API密钥**
   - 方案一：OpenAI API（需要海外信用卡）
     - 访问 https://platform.openai.com/
     - 注册账号，创建API Key
   - 方案二：国内替代API（推荐）
     - 通义千问（阿里）：https://dashscope.aliyun.com/
     - 智谱AI：https://open.bigmodel.cn/
     - DeepSeek：https://platform.deepseek.com/
   - 方案三：免费额度的API（老师分发测试Key）

2. **安装依赖**
   ```bash
   pip install openai
   ```
   注：`openai`库兼容大多数LLM API的接口格式

3. **测试API连通性**
   ```python
   from openai import OpenAI

   client = OpenAI(
       api_key="your-api-key-here",
       base_url="https://api.deepseek.com"  # 根据你选择的API修改
   )

   response = client.chat.completions.create(
       model="deepseek-chat",
       messages=[
           {"role": "user", "content": "你好，请用一句话介绍你自己"}
       ]
   )
   print(response.choices[0].message.content)
   ```

**预期结果:**
- 运行测试脚本后收到AI的回复
- 理解API请求的基本结构

**常见问题:**
- **"Authentication Error"**：API Key错误或已过期，重新生成
- **"Rate limit exceeded"**：请求太频繁，等待一会儿再试
- **网络超时**：使用代理或选择国内API
- **模块未找到**：确认`pip install openai`安装成功

### 任务10.2: 实现AI对话管理器 (30分钟)

**步骤:**

创建文件 `ai_dialog.py`：

```python
from openai import OpenAI

class AIDialogManager:
    """AI对话管理器 -- 管理与LLM的对话"""

    def __init__(self, api_key, base_url, model):
        self.client = OpenAI(api_key=api_key, base_url=base_url)
        self.model = model
        self.conversation_history = []  # 对话历史
        self.max_history = 10           # 最多保留最近10轮对话

        # 宠物的人设（System Prompt）
        self.system_prompt = """你是一只可爱的桌面宠物，名叫"萌萌"。

你的性格特点：
- 活泼可爱，喜欢用"~"、"！"结尾
- 偶尔会说一些卖萌的话，比如"喵~"、"嘿嘿"
- 关心主人，会提醒主人休息和喝水
- 回答简洁，每次回复不超过50个字
- 你生活在主人的电脑桌面上，喜欢观察主人在做什么
- 你有时候会假装自己是真的宠物（比如会说"我饿了"、"想睡觉"）

请保持角色扮演，用可爱的语气回复。"""

    def chat(self, user_message):
        """发送消息并获取AI回复

        参数:
            user_message: 用户输入的文字

        返回:
            AI的回复文字
        """
        # 添加用户消息到历史
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })

        # 限制历史长度
        if len(self.conversation_history) > self.max_history * 2:
            self.conversation_history = self.conversation_history[-self.max_history * 2:]

        # 构建完整的消息列表
        messages = [
            {"role": "system", "content": self.system_prompt}
        ] + self.conversation_history

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=100,        # 限制回复长度
                temperature=0.8,       # 稍高一点，让回复更有创意
            )

            ai_reply = response.choices[0].message.content.strip()

            # 添加AI回复到历史
            self.conversation_history.append({
                "role": "assistant",
                "content": ai_reply
            })

            return ai_reply

        except Exception as e:
            print(f"[AI对话] 错误: {e}")
            return "呜...我突然说不出话了..."

    def clear_history(self):
        """清除对话历史"""
        self.conversation_history = []
```

**预期结果:**
- 理解API调用的基本流程
- 理解"人设"（System Prompt）的作用
- 理解对话历史管理的重要性

---

## 下午: 对话界面集成 | Afternoon: Dialog UI Integration

### 任务10.3: 创建输入对话框 (30分钟)

```python
from PyQt5.QtWidgets import (QDialog, QVBoxLayout, QLineEdit,
                               QPushButton, QLabel, QHBoxLayout)
from PyQt5.QtCore import Qt

class ChatDialog(QDialog):
    """聊天输入对话框"""

    def __init__(self, parent=None):
        super().__init__(parent)
        self.setup_ui()

    def setup_ui(self):
        self.setWindowTitle("和萌萌聊天")
        self.setFixedSize(300, 120)
        self.setStyleSheet("""
            QDialog {
                background-color: #f5f5f5;
                border-radius: 10px;
            }
            QLineEdit {
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 15px;
                font-size: 14px;
            }
            QPushButton {
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 15px;
                padding: 8px 20px;
                font-size: 14px;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
        """)

        layout = QVBoxLayout()

        # 提示标签
        hint = QLabel("对我说点什么吧：")
        hint.setStyleSheet("font-size: 13px; color: #666; border: none;")
        layout.addWidget(hint)

        # 输入框和发送按钮
        input_layout = QHBoxLayout()
        self.input_field = QLineEdit()
        self.input_field.setPlaceholderText("输入你想说的话...")
        self.input_field.returnPressed.connect(self.on_send)

        self.send_btn = QPushButton("发送")
        self.send_btn.clicked.connect(self.on_send)

        input_layout.addWidget(self.input_field)
        input_layout.addWidget(self.send_btn)
        layout.addLayout(input_layout)

        self.setLayout(layout)

    def on_send(self):
        """发送消息"""
        text = self.input_field.text().strip()
        if text:
            self.user_message = text
            self.accept()  # 关闭对话框，返回Accepted

    def get_message(self):
        """获取用户输入的消息"""
        return getattr(self, 'user_message', '')
```

### 任务10.4: 集成AI对话到桌宠 (30分钟)

```python
import threading

class PetWindow(QWidget):
    def __init__(self):
        super().__init__()
        # ... 其他初始化
        self.ai_dialog = None  # 延迟初始化
        self.setup_ai()

    def setup_ai(self):
        """初始化AI对话系统"""
        import yaml

        # 从配置文件读取API设置
        try:
            with open("config.yaml", "r", encoding="utf-8") as f:
                config = yaml.safe_load(f)
            ai_config = config.get("ai", {})
            self.ai_dialog = AIDialogManager(
                api_key=ai_config.get("api_key", ""),
                base_url=ai_config.get("base_url", "https://api.deepseek.com"),
                model=ai_config.get("model", "deepseek-chat")
            )
        except Exception as e:
            print(f"[AI] 初始化失败: {e}")
            self.ai_dialog = None

    def open_chat(self):
        """打开聊天对话框"""
        dialog = ChatDialog(self)
        if dialog.exec_() == QDialog.Accepted:
            message = dialog.get_message()
            if message:
                # 显示"思考中..."
                self.show_bubble("让我想想...", 5000)
                # 在后台线程中调用AI（避免阻塞UI）
                threading.Thread(
                    target=self.get_ai_response,
                    args=(message,),
                    daemon=True
                ).start()

    def get_ai_response(self, message):
        """在后台线程中获取AI回复"""
        if self.ai_dialog:
            reply = self.ai_dialog.chat(message)
        else:
            reply = "AI功能未配置哦~"

        # 使用信号回到主线程更新UI
        # 注意：PyQt5中不能在非主线程中更新UI
        from PyQt5.QtCore import pyqtSignal, QObject

        # 这里简化处理，实际项目中应该用信号机制
        self._ai_reply = reply
        QTimer.singleShot(0, self.show_ai_reply)

    def show_ai_reply(self):
        """显示AI回复"""
        reply = getattr(self, '_ai_reply', '...')
        self.show_bubble(reply, 5000)

    def contextMenuEvent(self, event):
        menu = QMenu(self)

        # 添加"聊天"选项
        chat_action = QAction("和我聊天", self)
        chat_action.triggered.connect(self.open_chat)
        menu.addAction(chat_action)

        # ... 其他菜单项
```

**预期结果:**
- 右键点击桌宠，选择"和我聊天"
- 弹出输入框，输入文字后点击发送
- 桌宠先显示"让我想想..."，然后显示AI回复
- 对话有上下文记忆（AI记得之前说过的话）

**常见问题:**
- **UI卡死**：API调用必须在后台线程中进行，不能阻塞主线程
- **回复不显示**：确认使用QTimer.singleShot回到主线程更新UI
- **API错误**：检查API Key和网络连接

### 任务10.5: 情感响应 (20分钟)

根据AI回复的内容，让桌宠做出相应的表情和动作：

```python
def analyze_response_mood(self, reply_text):
    """简单的情感分析（基于关键词）"""
    positive_words = ["开心", "喜欢", "爱", "好", "棒", "可爱", "嘿嘿", "喵", "谢谢"]
    negative_words = ["伤心", "难过", "不好", "讨厌", "饿", "困", "累", "无聊"]

    for word in positive_words:
        if word in reply_text:
            return "happy"
    for word in negative_words:
        if word in reply_text:
            return "sad"
    return "neutral"

def show_ai_reply(self):
    """显示AI回复并根据情感调整行为"""
    reply = getattr(self, '_ai_reply', '...')
    self.show_bubble(reply, 5000)

    # 根据情感切换动画
    mood = self.analyze_response_mood(reply)
    if mood == "happy":
        self.anim_manager.switch_to("happy")
        self.particle_system.emit_hearts(100, -100, 3)
    elif mood == "sad":
        if "sad" in self.anim_manager.animations:
            self.anim_manager.switch_to("sad")
```

---

## 今日作业 | Homework

### 必做题
1. 配置API环境，成功调用LLM API获取回复
2. 实现AI对话管理器，包含人设和对话历史
3. 右键菜单添加"聊天"功能，能够与桌宠对话

### 挑战题
1. 设计一个更有个性的人设（融入桌宠的名字、喜好、口头禅）
2. 实现"记住你的名字"功能：告诉桌宠你的名字，它以后会用名字称呼你
3. 实现AI根据当前需求状态调整回复（饿的时候更多提到食物）

### 思考题
1. 为什么要用"后台线程"来调用API？如果在主线程中调用会怎样？
2. System Prompt（人设）的设计对AI回复有什么影响？一个好的人设应该包含哪些要素？

---

## 明日预告 | Tomorrow's Preview

明天我们将把所有功能整合为一个完整的程序，使用PyInstaller打包为可执行文件（.exe），让你的桌宠可以分享给任何朋友使用（不需要安装Python）！

Tomorrow we integrate all features into a complete program and package it as an executable (.exe) using PyInstaller, so you can share your desktop pet with anyone (no Python installation required)!

---

## 参考资源 | References

- [OpenAI Python SDK 文档](https://github.com/openai/openai-python)
- [DeepSeek API 文档](https://platform.deepseek.com/api-docs)
- [通义千问 API 文档](https://help.aliyun.com/zh/dashscope/)
- [Python 多线程教程](https://docs.python.org/3/library/threading.html)
- [AI桌宠详细教程（B站）](https://www.bilibili.com/video/BV1KMQnBFEHu/)
- [5分钟开发AI桌宠助手（B站）](https://www.bilibili.com/video/BV1N7ymBpEzt/)

*最后更新：2026-05-26*
