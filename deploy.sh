#!/bin/bash
echo "🚀 Starting deployment..."

echo "📥 Pulling latest changes from master..."
git pull origin master

echo "📦 Installing dependencies..."
pnpm install

echo "🏗️ Building the application..."
pnpm run build

echo "🔄 Restarting application process via PM2..."
pm2 restart kanqoo

echo "✅ Deployment completed successfully!"
