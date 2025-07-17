#!/bin/bash

echo "DubsWay Video AI - APK Installation Script"
echo "=========================================="

APK_DEBUG="android/app/build/outputs/apk/debug/app-debug.apk"
APK_RELEASE="android/app/build/outputs/apk/release/app-release.apk"

echo "Available APK files:"
echo "1. Debug APK: $APK_DEBUG ($(du -h "$APK_DEBUG" | cut -f1))"
echo "2. Release APK: $APK_RELEASE ($(du -h "$APK_RELEASE" | cut -f1))"
echo ""

echo "Choose APK to install:"
echo "1) Debug APK (larger, with debugging symbols)"
echo "2) Release APK (smaller, optimized for production)"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        APK_FILE="$APK_DEBUG"
        echo "Installing Debug APK..."
        ;;
    2)
        APK_FILE="$APK_RELEASE"
        echo "Installing Release APK..."
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo "Checking for connected devices..."
adb devices

echo ""
echo "Installing APK: $APK_FILE"
adb install -r "$APK_FILE"

if [ $? -eq 0 ]; then
    echo "✅ APK installed successfully!"
    echo "You can now find 'DubsWay Video AI' in your app drawer."
else
    echo "❌ APK installation failed. Please check:"
    echo "- Device is connected and USB debugging is enabled"
    echo "- Developer options are enabled"
    echo "- Device is authorized for debugging"
fi
