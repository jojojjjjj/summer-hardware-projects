"""
基础测试文件 | Basic Test File

用于验证 Python 环境和基础模块 | For verifying Python environment and basic modules
"""
import sys
from pathlib import Path

# 添加 src 目录到路径 | Add src directory to path
src_dir = Path(__file__).parent.parent / "src"
sys.path.insert(0, str(src_dir))


def test_imports():
    """测试模块导入 | Test module imports"""
    print("=== 测试模块导入 | Testing module imports ===\n")

    modules = [
        ("numpy", "NumPy"),
        ("sounddevice", "SoundDevice"),
    ]

    results = {}

    for module_name, display_name in modules:
        try:
            __import__(module_name)
            print(f"✓ {display_name} 已安装 | {display_name} installed")
            results[display_name] = True
        except ImportError:
            print(f"✗ {display_name} 未安装 | {display_name} not installed")
            results[display_name] = False

    return results


def test_audio_devices():
    """测试音频设备 | Test audio devices"""
    print("\n=== 测试音频设备 | Testing audio devices ===\n")

    try:
        import sounddevice as sd

        devices = sd.query_devices()
        print(f"找到 {len(devices)} 个音频设备 | Found {len(devices)} audio devices\n")

        has_input = False
        has_output = False

        for i, device in enumerate(devices):
            if device['max_input_channels'] > 0:
                print(f"✓ 输入设备 | Input device {i}: {device['name']}")
                has_input = True
            if device['max_output_channels'] > 0:
                print(f"✓ 输出设备 | Output device {i}: {device['name']}")
                has_output = True

        return has_input and has_output

    except ImportError:
        print("✗ SoundDevice 未安装 | SoundDevice not installed")
        return False


def test_config():
    """测试配置文件 | Test configuration file"""
    print("\n=== 测试配置文件 | Testing configuration ===\n")

    import yaml

    config_path = Path(__file__).parent.parent / "config.template.yaml"

    if config_path.exists():
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                config = yaml.safe_load(f)

            print(f"✓ 配置文件存在 | Config file exists: {config_path}")
            print(f"✓ 配置加载成功 | Config loaded successfully")

            # 检查必要配置 | Check required config
            required_keys = ['api', 'stt', 'tts', 'audio']
            for key in required_keys:
                if key in config:
                    print(f"  ✓ {key} | {key} present")
                else:
                    print(f"  ✗ {key} | {key} missing")

            return True

        except Exception as e:
            print(f"✗ 配置加载失败 | Config load failed: {e}")
            return False
    else:
        print(f"✗ 配置文件不存在 | Config file not found: {config_path}")
        print(f"提示 | Hint: 请复制 config.template.yaml 为 config.yaml | Please copy config.template.yaml to config.yaml")
        return False


def run_all_tests():
    """运行所有测试 | Run all tests"""
    print("=" * 60)
    print("小智同学基础测试 | Xiao Zhi Basic Tests")
    print("=" * 60)
    print()

    tests = [
        ("模块导入 | Module imports", test_imports),
        ("音频设备 | Audio devices", test_audio_devices),
        ("配置文件 | Configuration", test_config),
    ]

    results = {}

    for name, test_func in tests:
        print(f"\n测试 | Test: {name}")
        print("-" * 40)
        result = test_func()
        results[name] = result

    # 打印总结 | Print summary
    print("\n" + "=" * 60)
    print("测试总结 | Test Summary")
    print("=" * 60)

    for name, result in results.items():
        status = "✓ 通过 | Pass" if result else "✗ 失败 | Fail"
        print(f"{name}: {status}")

    all_passed = all(results.values())

    print("\n" + "=" * 60)
    if all_passed:
        print("✓ 所有测试通过 | All tests passed!")
        print("可以开始使用小智同学 | Ready to use Xiao Zhi")
    else:
        print("✗ 部分测试失败 | Some tests failed")
        print("请解决上述问题后再继续 | Please fix the issues above before continuing")

    return all_passed


if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
