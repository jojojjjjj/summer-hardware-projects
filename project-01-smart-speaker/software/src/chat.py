"""
LLM 对话模块 | LLM Chat Module

支持 OpenAI 兼容的 API | Supports OpenAI-compatible APIs
"""
from openai import OpenAI


class ChatBot:
    """AI 聊天机器人 | AI Chatbot"""

    def __init__(self, api_key, base_url="https://api.deepseek.com",
                 model="deepseek-chat", temperature=0.7):
        """
        初始化聊天机器人 | Initialize chatbot

        Args:
            api_key: API Key
            base_url: API 基础 URL | API base URL
            model: 模型名称 | Model name
            temperature: 温度参数 (0-2) | Temperature (0-2)
        """
        self.api_key = api_key
        self.base_url = base_url
        self.model = model
        self.temperature = temperature
        self.client = None
        self.conversation_history = []

        # 系统提示词 | System prompt
        self.system_prompt = """你是小智同学，一个友好、智能的语音助手。
You are Xiao Zhi, a friendly and intelligent voice assistant.

特点 | Characteristics:
- 简洁回答，通常不超过50字 | Concise answers, usually under 50 words
- 友好、礼貌 | Friendly and polite
- 中文回答 | Answer in Chinese
- 可以回答各种问题 | Can answer various questions
- 如果不知道，诚实地说不知道 | If don't know, honestly say so"""

    def connect(self):
        """连接到 API | Connect to API"""
        try:
            self.client = OpenAI(
                api_key=self.api_key,
                base_url=self.base_url
            )
            print("✓ API 连接成功 | API connected successfully")
            return True

        except Exception as e:
            print(f"✗ API 连接失败 | API connection failed: {e}")
            return False

    def chat(self, user_message, keep_history=True):
        """
        发送消息并获取回复 | Send message and get response

        Args:
            user_message: 用户消息 | User message
            keep_history: 是否保留对话历史 | Keep conversation history

        Returns:
            AI 回复 | AI response
        """
        if not self.client:
            if not self.connect():
                return None

        try:
            messages = []

            if self.system_prompt:
                messages.append({
                    "role": "system",
                    "content": self.system_prompt
                })

            if keep_history:
                messages.extend(self.conversation_history)
            else:
                self.conversation_history = []

            messages.append({
                "role": "user",
                "content": user_message
            })

            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=self.temperature,
                max_tokens=200
            )

            ai_reply = response.choices[0].message.content

            if keep_history:
                self.conversation_history.append({
                    "role": "user",
                    "content": user_message
                })
                self.conversation_history.append({
                    "role": "assistant",
                    "content": ai_reply
                })

                if len(self.conversation_history) > 10:
                    self.conversation_history = self.conversation_history[-10:]

            return ai_reply

        except Exception as e:
            print(f"对话出错 | Chat error: {e}")
            return None

    def clear_history(self):
        """清除对话历史 | Clear conversation history"""
        self.conversation_history = []
        print("对话历史已清除 | Conversation history cleared")

    def set_system_prompt(self, prompt):
        """设置系统提示词 | Set system prompt"""
        self.system_prompt = prompt

    def set_temperature(self, temperature):
        """设置温度参数 | Set temperature"""
        self.temperature = max(0, min(2, temperature))


def quick_chat(api_key, message, provider="deepseek"):
    """便捷的对话函数 | Convenient chat function"""
    if provider == "deepseek":
        bot = ChatBot(api_key, base_url="https://api.deepseek.com")
    else:
        bot = ChatBot(api_key, base_url="https://api.openai.com",
                     model="gpt-3.5-turbo")

    return bot.chat(message, keep_history=False)
