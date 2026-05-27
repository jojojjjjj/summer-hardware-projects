// ==========================================
// 桌面气象站 - 配置文件模板
// Weather Cube - Configuration Template
// ==========================================
// 将此文件重命名为 config.h 并填入你的配置
// Rename this file to config.h and fill in your settings

#ifndef CONFIG_H
#define CONFIG_H

// 和风天气 API Key
// 申请地址: https://console.heweather.com/app/index
// HeFeng Weather API Key - Get yours at https://console.qweather.com/
#define HEFENG_API_KEY "your_api_key_here"

// 城市编号 City Code
// 查询地址: https://github.com/qwd/LocationList
// 常用城市代码 Common city codes:
//   北京 Beijing:    101010100
//   上海 Shanghai:   101020100
//   广州 Guangzhou:  101280101
//   深圳 Shenzhen:   101280601
//   杭州 Hangzhou:   101210101
//   成都 Chengdu:    101270101
#define CITY_CODE "101010100"

// B站用户UID (仅B站UP主版需要 / Only for Bilibili version)
// 在B站个人中心查看你的UID
// Find your UID at https://space.bilibili.com/
#define BILIBILI_UID "your_uid_here"

// OLED 引脚配置 (ESP-01S 推荐使用 GPIO0 和 GPIO2)
// OLED Pin Configuration (GPIO0 and GPIO2 recommended for ESP-01S)
#define OLED_SCL 0    // SCL = GPIO0 = ESP-01S pin 3
#define OLED_SDA 2    // SDA = GPIO2 = ESP-01S pin 2

// NTP 时间服务器 (默认阿里云，也可选用其他)
// NTP Time Server (Alibaba Cloud by default)
// 备选 Alternative: ntp.aliyun.com, pool.ntp.org
#define NTP_SERVER_IP 120, 25, 115, 20

// 时区 Timezone (中国标准时间 = UTC+8)
#define TIMEZONE 8

// 天气更新间隔 (毫秒) - 默认30分钟
// Weather update interval (ms) - Default 30 minutes
#define WEATHER_UPDATE_INTERVAL 1800000

// 屏幕刷新间隔 (毫秒) - 默认30秒
// Screen refresh interval (ms) - Default 30 seconds
#define SCREEN_REFRESH_INTERVAL 30000

#endif
