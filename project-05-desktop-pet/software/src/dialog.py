"""
桌宠 "萌桌面" -- 对话系统
Desktop Pet "PetDesk" -- Dialogue System

功能：AI对话管理器（调用LLM API实现智能对话）
"""

# 注意：AI对话功能需要配置API密钥
# 请在 config.yaml 中设置 ai.api_key 和 ai.base_url

import threading
from PyQt5.QtWidgets import (QDialog, QVBoxLayout, QLineEdit,
                               QPushButton, QLabel, QHBoxLayout)
from PyQt5.QtCore import Qt, QTimer


class AIDialogManager:
    """AI对话管理器 -- 通过LLM API实现智能对话

    支持OpenAI格式的API（兼容DeepSeek、通义千问、智谱AI等）。
    """

    def __init__(self, api_key, base_url, model, pet_name="萌萌"):
        """初始化AI对话管理器

        参数:
            api_key: API密钥
            base_url: API服务地址
            model: 模型名称
            pet_name: 宠物名字（用于人设）
        """
        self.pet_name = pet_name
        self.conversation_history = []
        self.max_history = 10  # 最多保留最近10轮对话

        # 宠物的AI人设（System Prompt）
        self.system_prompt = f"""你是一只可爱的桌面宠物，名叫"{pet_name}"。

你的性格特点：
- 活泼可爱，喜欢用"~"、"！"结尾
- 偶尔会说一些卖萌的话，比如"喵~"、"嘿嘿"
- 关心主人，会提醒主人休息和喝水
- 回答简洁，每次回复不超过50个字
- 你生活在主人的电脑桌面上，喜欢观察主人在做什么
- 你有时候会假装自己是真的宠物（比如会说"我饿了"、"想睡觉"）

请保持角色扮演，用可爱的语气回复。"""

        # 延迟导入openai（避免未安装时报错）
        self.client = None
        self.model = model
        try:
            from openai import OpenAI
            self.client = OpenAI(api_key=api_key, base_url=base_url)
            print(f"[AI] 对话系统初始化成功 (模型: {model})")
        except ImportError:
            print("[AI] 警告：openai 库未安装，AI对话功能不可用")
        except Exception as e:
            print(f"[AI] 警告：初始化失败: {e}")

    def chat(self, user_message):
        """发送消息并获取AI回复

        参数:
            user_message: 用户输入的文字

        返回:
            AI的回复文字（字符串）
        """
        if not self.client:
            return "AI功能未配置哦~请先安装openai库并配置API密钥。"

        # 添加用户消息到对话历史
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })

        # 限制对话历史长度
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
                max_tokens=100,
                temperature=0.8,
            )

            ai_reply = response.choices[0].message.content.strip()

            # 将AI回复添加到对话历史
            self.conversation_history.append({
                "role": "assistant",
                "content": ai_reply
            })

            return ai_reply

        except Exception as e:
            print(f"[AI] 对话请求失败: {e}")
            return "呜...我突然说不出话了..."

    def clear_history(self):
        """清除对话历史"""
        self.conversation_history = []

    def update_system_prompt(self, new_prompt):
        """更新人设（System Prompt）

        参数:
            new_prompt: 新的人设文字
        """
        self.system_prompt = new_prompt


class ChatDialog(QDialog):
    """聊天输入对话框 -- 让用户输入要对桌宠说的话"""

    def __init__(self, pet_name="萌萌", parent=None):
        super().__init__(parent)
        self.pet_name = pet_name
        self.user_message = ""
        self.setup_ui()

    def setup_ui(self):
        """设置UI界面"""
        self.setWindowTitle(f"和{self.pet_name}聊天")
        self.setFixedSize(320, 130)
        self.setStyleSheet("""
            QDialog {
                background-color: #f8f8f8;
            }
            QLabel {
                font-size: 13px;
                color: #666;
            }
            QLineEdit {
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 15px;
                font-size: 14px;
            }
            QLineEdit:focus {
                border-color: #4CAF50;
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
            QPushButton:pressed {
                background-color: #3d8b40;
            }
        """)

        layout = QVBoxLayout()
        layout.setSpacing(10)

        # 提示标签
        hint = QLabel(f"对{self.pet_name}说点什么吧：")
        layout.addWidget(hint)

        # 输入区域
        input_layout = QHBoxLayout()
        self.input_field = QLineEdit()
        self.input_field.setPlaceholderText("输入你想说的话...")
        self.input_field.returnPressed.connect(self.on_send)

        self.send_btn = QPushButton("发送")
        self.send_btn.clicked.connect(self.on_send)
        self.send_btn.setFixedWidth(70)

        input_layout.addWidget(self.input_field)
        input_layout.addWidget(self.send_btn)
        layout.addLayout(input_layout)

        self.setLayout(layout)

        # 自动聚焦到输入框
        self.input_field.setFocus()

    def on_send(self):
        """发送按钮点击处理"""
        text = self.input_field.text().strip()
        if text:
            self.user_message = text
            self.accept()  # 关闭对话框，返回QDialog.Accepted

    def get_message(self):
        """获取用户输入的消息

        返回:
            用户输入的文字字符串
        """
        return self.user_message
