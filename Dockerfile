FROM node:18-alpine

WORKDIR /app

# 複製package文件
COPY package*.json ./

# 安裝依賴
RUN npm ci --only=production

# 複製應用文件
COPY . .

# 暴露端口
EXPOSE 3000

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/students || exit 1

# 啟動應用
CMD ["npm", "start"]
