#!/bin/bash

REPO_NAME=$1
CURRENT_DIR=$(pwd)
PROJECT_DIR="$CURRENT_DIR"
WDIO_SOURCE_DIR="$CURRENT_DIR/templates/wdio"
JEST_SOURCE_DIR="$CURRENT_DIR/templates/jest"
SHARED_DIR="$CURRENT_DIR/shared"

echo "🔄 Creating a new automation project..."

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
echo "🔄 Copying template code"
cp -r $SOURCE_DIR/* .

# Merge the shared directory content into the new project, preserving existing files
if [ -d "$SHARED_DIR" ]; then
    echo "🔄 Merging 'shared' content into the new project..."
    # Using rsync to merge shared content into project
    rsync -av --ignore-existing "$SHARED_DIR/" "$PROJECT_DIR/$REPO_NAME/src"
    echo "✅ Merged 'shared' content into the new project"
else
    echo "❌ Shared directory does not exist"
    exit 1
fi

# NPM install
echo "🔄 Installing packages..."
npm install

echo "✅ Project with '$REPO_NAME' name has been created"
