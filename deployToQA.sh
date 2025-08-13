#!/bin/bash

# Variables
PEM_PATH="$HOME/Downloads/paw-new-account.pem"
LOCAL_BUILD_DIR="/Users/atulry/petqura-frontend.com"
ZIP_FILE="build.zip"
REMOTE_USER="ubuntu"
REMOTE_HOST="ec2-43-204-18-98.ap-south-1.compute.amazonaws.com"
REMOTE_DIR="/home/ubuntu/pawwalker-fe/new-fe-design"

Step 1: Build project
echo "📦 Building project..."
npm run build || { echo "❌ Build failed"; exit 1; }

# Step 2: Zip only contents of build folder (no full path)
echo "🗜 Zipping build folder..."
cd "$LOCAL_BUILD_DIR"
zip -r "$ZIP_FILE" build || { echo "❌ Zip failed"; exit 1; }


# Step 3: Upload zip to EC2
echo "📤 Uploading build.zip to server..."
scp -i "$PEM_PATH" "$ZIP_FILE" $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR || { echo "❌ SCP failed"; exit 1; }

# Step 4: SSH into server and deploy
echo "🚀 Deploying on server..."
ssh -i "$PEM_PATH" $REMOTE_USER@$REMOTE_HOST << EOF
    cd $REMOTE_DIR
    unzip -o $ZIP_FILE
    sudo systemctl reload nginx
    echo "✅ Deployment complete!"
EOF

# Step 5: Cleanup local zip
rm "$ZIP_FILE"
echo "🧹 Cleaned up local zip file."
