## 开始

NextJs Prisma Mysql 全栈App zod(数据验证)

```bash
yarn install
```

## 后端

使用NextJs Api Routes

### Prisma

#### 连接数据库

1. 在.env 文件中添加本地数据库地址
2. 部署到你的数据库

```bash
    yarn prisma migrate  dev
    yarn prisma migrate  deploy
    yarn prisma generate
```
## 前端
基础样式 Tailwindcss   
主题切换 next-themes   
icon iconify   
状态管理库 zustand   
动画 framer-motion   
数据请求 @tanstack/react-query   
表单 react-hook-from  @hookform/resolvers   
日期时间 react-datetime moment