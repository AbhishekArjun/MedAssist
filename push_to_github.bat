@echo off
echo.
echo 🚀 Updating GitHub with latest changes (including README)...
git add .
git commit -m "Update README and final chatbot refinements"
git push
if %errorlevel% neq 0 (
    echo.
    echo ❌ Git push failed! Please check your internet connection and Git credentials.
) else (
    echo.
    echo ✅ GitHub updated successfully!
)
pause
