# 陈述性记忆

## 高价值记忆（评分 ≥ 7）

- 2025/06/27 18:54 START
TaskBaker项目核心信息：
1. 项目背景：用户因每天事情太多感到烦躁，需要有效的时间管理方法
2. 核心理念："烘焙法" - 通过类比烘焙过程来管理时间和任务，避免临时抱佛脚
3. 目标用户：个人用户，需要时间管理的人群
4. 主要功能需求：
   - 任务记录与管理（像记账一样）
   - 四象限优先级排序
   - Todo数量限制机制
   - 标签和分类系统
   - 动态管理方法
   - 统计功能（记录开始完成时间）
5. 技术要求：移动应用，插件化开发，高内聚低耦合
6. 用户痛点："任何不起眼的任务都会占用注意力"
7. 现状：正处于技术栈选择阶段 --tags TaskBaker 项目分析 烘焙法 时间管理 移动开发
--tags #其他 #评分:8 #有效期:长期
- END



- 2025/06/27 19:54 START
TaskBaker项目技术决策过程和最终方案：
1. 技术选择考虑因素：
   - 用户是Unity开发者，有C#和组件化开发经验
   - 需要一套代码支持多平台（网页+Android+未来iOS）
   - 要求AI支持度最高的技术栈
   - 个人开发，需要技术集中不分散
   - 暂时本地存储，未来可能需要后端

2. 最终技术栈：React + TypeScript + Node.js + Capacitor/Electron
   - React：全球最流行前端框架，AI支持最好，与Unity组件化思维契合
   - TypeScript：强类型语言，Unity C#开发者容易上手
   - Node.js：JavaScript运行时，可统一前后端语言
   - Capacitor：跨平台打包工具，支持Android/iOS
   - Electron：桌面端打包工具

3. 项目结构规划：Monorepo单仓库管理
   - frontend/ (React前端)
   - backend/ (Node.js后端) 
   - mobile/ (Capacitor配置)
   - desktop/ (Electron配置)
   - shared/ (共享TypeScript类型)

4. 平台支持：网页版、Android、未来iOS(需Mac)、桌面端 --tags TaskBaker 技术栈 React TypeScript Unity开发者 跨平台 产品决策
--tags #工具使用 #评分:8 #有效期:长期
- END

- 2025/06/27 20:24 START
TaskBaker项目决策会议总结（2025-06-27）：
1. 用户背景：Unity开发者，对时间管理有迫切需求，希望通过"烘焙法"解决任务过多的问题
2. 技术栈最终决定：React + TypeScript + Node.js + Vite + Capacitor/Electron + Monorepo架构
3. 决策关键因素：AI协作效果最佳，Unity开发经验迁移性好，一套代码全平台覆盖
4. 项目结构：采用Monorepo单仓库管理，便于个人开发和AI理解
5. 下一步计划：明天开始创建项目框架和MVP原型
6. 用户学习态度：积极提问，理解能力强，已掌握核心概念如Monorepo、MVP等
7. 沟通风格：偏好苏格拉底式引导，通过对话逐步理解和决策 --tags TaskBaker 会议总结 技术决策 Unity开发者 产品经理 项目规划
--tags #其他 #评分:8 #有效期:长期
- END