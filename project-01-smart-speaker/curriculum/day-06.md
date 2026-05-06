# Day 6: LLM API 调用 | LLM API Integration

## 学习目标 | Learning Objectives

- 理解大语言模型 (LLM) API 的工作原理
- 掌握使用 OpenAI 兼容 API 的方法
- 实现基本的对话功能
- 学会管理 API Key 和配置

> Understand how Large Language Model (LLM) APIs work; master using OpenAI-compatible APIs; implement basic conversation functionality; learn to manage API Keys and configuration.

## 前置准备检查 | Prerequisites Check

- [ ] 已注册 DeepSeek 或 OpenAI 账号
- [ ] 已获取 API Key
- [ ] 已完成 Day 5 的 TTS 练习

---

## 为什么学这个 | Why Learn This

**真实世界应用：** 大语言模型是现代 AI 应用的核心。ChatGPT、Claude、文心一言等都使用类似的技术。通过 API 调用，你可以在自己的应用中集成强大的对话能力。

> **Real-world application:** Large Language Models are the core of modern AI applications. ChatGPT, Claude, Wenxin Yiyan, etc. all use similar technology. Through API calls, you can integrate powerful conversational capabilities into your applications.

---

## 任务一：API 准备 | Task 1: API Preparation

### 步骤 1：获取 API Key

**选项 A：DeepSeek（推荐，便宜）**
1. 访问：https://platform.deepseek.com/
2. 注册账号
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 复制并保存 Key

**选项 B：OpenAI**
1. 访问：https://platform.openai.com/
2. 注册账号并充值
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 复制并保存 Key

### 步骤 2：测试 API 连接

```bash
# 安装 OpenAI SDK（支持 DeepSeek）
pip install openai
```

创建测试文件 `src/test_api_connection.py`：

```python
"""
测试 API 连接
"""
import os
from openai import OpenAI

def test_deepseek():
    """测试 DeepSeek API"""
    print("=== 测试 DeepSeek API ===\n")

    # 替换为你的 API Key
    api_key = "your-deepseek-api-key-here"

    if api_key == "your-deepseek-api-key-here":
        print("请先设置你的 API Key")
        return False

    try:
        # 创建客户端
        client = OpenAI(
            api_key=api_key,
            base_url="https://api.deepseek.com"
        )

        # 发送测试请求
        print("发送测试请求...")
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "user", "content": "你好"}
            ],
            max_tokens=50
        )

        # 打印响应
        reply = response.choices[0].message.content
        print(f"API 响应: {reply}")
        print("\n✓ API 连接成功")
        return True

    except Exception as e:
        print(f"✗ API 连接失败: {e}")
        return False

def test_openai():
    """测试 OpenAI API"""
    print("=== 测试 OpenAI API ===\n")

    # 替换为你的 API Key
    api_key = "your-openai-api-key-here"

    if api_key == "your-openai-api-key-here":
        print("请先设置你的 API Key")
        return False

    try:
        client = OpenAI(api_key=api_key)

        print("发送测试请求...")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "Hello"}
            ],
            max_tokens=50
        )

        reply = response.choices[0].message.content
        print(f"API 响应: {reply}")
        print("\n✓ API 连接成功")
        return True

    except Exception as e:
        print(f"✗ API 连接失败: {e}")
        return False

if __name__ == "__main__":
    print("API 连接测试\n")

    print("选择 API 提供商:")
    print("1. DeepSeek (推荐)")
    print("2. OpenAI")

    choice = input("\n请选择 (1/2): ").strip()

    if choice == "1":
        test_deepseek()
    elif choice == "2":
        test_openai()
    else:
        print("无效选择")
```

### 预期结果 | Expected Result

- 成功获取 API Key
- API 连接测试成功
- 收到模型的响应

### 常见问题 | Common Issues

**Q: API 连接超时？**
A: 检查网络连接，确保可以访问 API 服务器。

**Q: 认证失败？**
A: 检查 API Key 是否正确复制。

---

## 任务二：创建对话模块 | Task 2: Create Chat Module

### 步骤 1：创建 Chat 类

创建文件 `src/chat.py`：

```python
"""
LLM 对话模块
支持 OpenAI 兼容的 API
"""
from openai import OpenAI
import os

class ChatBot:
    """AI 聊天机器人"""

    def __init__(self, api_key, base_url="https://api.deepseek.com",
                 model="deepseek-chat", temperature=0.7):
        """
        初始化聊天机器人

        Args:
            api_key: API Key
            base_url: API 基础 URL
            model: 模型名称
            temperature: 温度参数 (0-2, 越高越随机)
        """
        self.api_key = api_key
        self.base_url = base_url
        self.model = model
        self.temperature = temperature
        self.client = None
        self.conversation_history = []

        # 系统提示词
        self.system_prompt = """你是小智同学，一个友好、智能的语音助手。

特点：
- 简洁回答，通常不超过50字
- 友好、礼貌
- 中文回答
- 可以回答各种问题
- 如果不知道，诚实地说不知道"""

    def connect(self):
        """连接到 API"""
        try:
            self.client = OpenAI(
                api_key=self.api_key,
                base_url=self.base_url
            )
            print("✓ API 连接成功")
            return True

        except Exception as e:
            print(f"✗ API 连接失败: {e}")
            return False

    def chat(self, user_message, keep_history=True):
        """
        发送消息并获取回复

        Args:
            user_message: 用户消息
            keep_history: 是否保留对话历史

        Returns:
            AI 回复
        """
        if not self.client:
            if not self.connect():
                return None

        try:
            # 构建消息列表
            messages = []

            # 添加系统提示词
            if self.system_prompt:
                messages.append({
                    "role": "system",
                    "content": self.system_prompt
                })

            # 添加历史对话
            if keep_history:
                messages.extend(self.conversation_history)
            else:
                self.conversation_history = []

            # 添加当前消息
            messages.append({
                "role": "user",
                "content": user_message
            })

            # 调用 API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=self.temperature,
                max_tokens=200
            )

            # 获取回复
            ai_reply = response.choices[0].message.content

            # 更新历史
            if keep_history:
                self.conversation_history.append({
                    "role": "user",
                    "content": user_message
                })
                self.conversation_history.append({
                    "role": "assistant",
                    "content": ai_reply
                })

                # 限制历史长度
                if len(self.conversation_history) > 10:
                    self.conversation_history = self.conversation_history[-10:]

            return ai_reply

        except Exception as e:
            print(f"对话出错: {e}")
            return None

    def clear_history(self):
        """清除对话历史"""
        self.conversation_history = []
        print("对话历史已清除")

    def set_system_prompt(self, prompt):
        """设置系统提示词"""
        self.system_prompt = prompt

    def set_temperature(self, temperature):
        """设置温度参数"""
        self.temperature = max(0, min(2, temperature))

# 便捷函数
def quick_chat(api_key, message, provider="deepseek"):
    """
    便捷的对话函数

    Args:
        api_key: API Key
        message: 消息内容
        provider: 提供商 (deepseek/openai)

    Returns:
        AI 回复
    """
    if provider == "deepseek":
        bot = ChatBot(api_key, base_url="https://api.deepseek.com")
    else:
        bot = ChatBot(api_key, base_url="https://api.openai.com",
                     model="gpt-3.5-turbo")

    return bot.chat(message, keep_history=False)
```

### 步骤 2：测试对话功能

创建文件 `src/test_chat.py`：

```python
"""
测试 LLM 对话
"""
from chat import ChatBot, quick_chat

def test_basic_chat():
    """测试基础对话"""
    print("=== 基础对话测试 ===\n")

    # 设置 API Key
    api_key = input("请输入你的 API Key: ").strip()

    if not api_key:
        print("API Key 不能为空")
        return

    # 创建聊天机器人
    bot = ChatBot(api_key)

    # 测试对话
    test_questions = [
        "你好",
        "今天天气怎么样",
        "讲个笑话",
        "什么是人工智能"
    ]

    for question in test_questions:
        print(f"\n问题: {question}")
        answer = bot.chat(question)
        if answer:
            print(f"回答: {answer}")
        else:
            print("回答失败")

def test_conversation():
    """测试连续对话"""
    print("\n=== 连续对话测试 ===\n")

    api_key = input("请输入你的 API Key: ").strip()

    if not api_key:
        print("API Key 不能为空")
        return

    bot = ChatBot(api_key)

    print("\n开始对话（输入 'quit' 退出）\n")

    while True:
        user_input = input("你: ").strip()

        if not user_input:
            continue

        if user_input.lower() in ['quit', '退出', 'exit']:
            print("再见！")
            break

        response = bot.chat(user_input)

        if response:
            print(f"小智: {response}\n")
        else:
            print("抱歉，我遇到了一些问题\n")

def test_different_prompts():
    """测试不同系统提示词"""
    print("\n=== 不同角色测试 ===\n")

    api_key = input("请输入你的 API Key: ").strip()

    if not api_key:
        print("API Key 不能为空")
        return

    # 测试不同角色
    personas = [
        ("默认助手", "你是一个友好的AI助手。"),
        ("幽默助手", "你是一个幽默风趣的AI助手，回答时要搞笑一些。"),
        ("简洁助手", "你是一个简洁的AI助手，回答不超过20个字。")
    ]

    test_question = "介绍一下你自己"

    for name, prompt in personas:
        print(f"\n{name}:")
        bot = ChatBot(api_key)
        bot.set_system_prompt(prompt)

        response = bot.chat(test_question, keep_history=False)
        if response:
            print(f"  {response}")

if __name__ == "__main__":
    print("LLM 对话测试\n")

    print("选择测试模式:")
    print("1. 基础对话")
    print("2. 连续对话")
    print("3. 不同角色")

    choice = input("\n请选择 (1/2/3): ").strip()

    if choice == "1":
        test_basic_chat()
    elif choice == "2":
        test_conversation()
    elif choice == "3":
        test_different_prompts()
    else:
        print("无效选择")
```

### 预期结果 | Expected Result

- 成功与 AI 进行对话
- 连续对话能够保持上下文
- 不同系统提示词产生不同风格

### 常见问题 | Common Issues

**Q: 响应很慢？**
A: API 响应时间取决于网络和模型。DeepSeek 通常较快。

**Q: 回答太长？**
A: 在系统提示词中明确要求简洁回答，或限制 max_tokens。

---

## 任务三：配置管理 | Task 3: Configuration Management

### 步骤 1：创建配置文件

创建文件 `software/config.template.yaml`：

```yaml
# 小智同学配置文件

# API 配置
api:
  provider: deepseek  # deepseek 或 openai
  api_key: "your-api-key-here"
  model: deepseek-chat
  temperature: 0.7
  max_tokens: 200

# STT 配置
stt:
  model: tiny  # tiny/base/small/medium/large
  language: zh

# TTS 配置
tts:
  voice: zh-CN-XiaoxiaoNeural
  rate: "+0%"
  volume: "+0%"

# 音频配置
audio:
  sample_rate: 16000
  channels: 1
  chunk_size: 1024
  recording_duration: 5

# 唤醒词配置（可选）
wake_word:
  enabled: false
  keyword: "小智"
  sensitivity: 0.5
```

### 步骤 2：创建配置加载器

更新文件 `src/config_manager.py`：

```python
"""
配置管理器（更新版）
"""
import yaml
import os

class Config:
    """配置类"""

    def __init__(self, config_path="config.yaml"):
        """加载配置"""
        self.config_path = config_path
        self.config = None
        self.load()

    def load(self):
        """加载配置文件"""
        try:
            if os.path.exists(self.config_path):
                with open(self.config_path, 'r', encoding='utf-8') as f:
                    self.config = yaml.safe_load(f)
                print(f"✓ 配置加载成功: {self.config_path}")
            else:
                print(f"配置文件不存在: {self.config_path}")
                print("使用默认配置")
                self.config = self.get_default_config()
        except Exception as e:
            print(f"配置加载失败: {e}")
            self.config = self.get_default_config()

    def get(self, key, default=None):
        """获取配置项"""
        keys = key.split('.')
        value = self.config

        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default

        return value

    def get_default_config(self):
        """获取默认配置"""
        return {
            "api": {
                "provider": "deepseek",
                "api_key": "",
                "model": "deepseek-chat",
                "temperature": 0.7,
                "max_tokens": 200
            },
            "stt": {
                "model": "tiny",
                "language": "zh"
            },
            "tts": {
                "voice": "zh-CN-XiaoxiaoNeural",
                "rate": "+0%",
                "volume": "+0%"
            },
            "audio": {
                "sample_rate": 16000,
                "channels": 1,
                "chunk_size": 1024,
                "recording_duration": 5
            }
        }

# 使用示例
if __name__ == "__main__":
    config = Config("config.yaml")
    print(f"API Provider: {config.get('api.provider')}")
    print(f"STT Model: {config.get('stt.model')}")
```

---

## 今日作业 | Today's Assignment

1. **完成所有练习**（必须）
   - 成功获取 API Key
   - 完成基础对话测试
   - 完成连续对话测试

2. **配置文件**（必须）
   - 复制 config.template.yaml 为 config.yaml
   - 填入你的 API Key
   - 测试配置加载

3. **创意任务**（可选）
   - 设计一个独特的系统提示词
   - 测试不同温度参数的效果

---

## 明日预告 | Preview of Tomorrow

明天是激动人心的一天！我们将把所有模块串联起来，实现完整的语音对话功能：你说 → 机器听 → AI 思考 → 机器回答。

> Tomorrow is an exciting day! We will connect all modules to implement complete voice conversation: You speak → Machine listens → AI thinks → Machine responds.

---

## 参考资源 | References

- **DeepSeek API 文档**：https://platform.deepseek.com/api-docs/
- **OpenAI API 文档**：https://platform.openai.com/docs/
- **OpenAI Python SDK**：https://github.com/openai/openai-python

---

*预计完成时间：4-6 小时*
*Estimated completion time: 4-6 hours*
