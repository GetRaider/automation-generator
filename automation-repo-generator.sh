#!/bin/bash

REPO_NAME=$1
CURRENT_DIR=$(pwd)
PROJECT_DIR="$CURRENT_DIR"
WDIO_SOURCE_DIR="$CURRENT_DIR/wdio"
JEST_SOURCE_DIR="$CURRENT_DIR/jest"

# Check if the repository name argument is provided
if [ $# -eq 0 ]; then
    echo "❌ Provide the repository name as an argument"
    exit 1
fi

# Check if the second argument is provided and set the source directory accordingly
if [ "$2" == "wdio+mocha" ]; then
    SOURCE_DIR=$WDIO_SOURCE_DIR
elif [ "$2" == "jest" ]; then
    SOURCE_DIR=$JEST_SOURCE_DIR
else
    echo "❌ Second argument must be either 'wdio+mocha' for UI+API framework or 'jest' for API"
    exit 1
fi

# Enable dotglob to include hidden files
shopt -s dotglob

# Create a new directory for the repository
mkdir -p $PROJECT_DIR/$REPO_NAME
cd $PROJECT_DIR/$REPO_NAME || exit

# Copy files and folders from source directory to the repository directory
cp -r $SOURCE_DIR/* .

# Init git repository
git init

# NPM install
echo "🔄 Installing packages..."
npm install

echo "✅ Project with '$REPO_NAME' name has been created"
