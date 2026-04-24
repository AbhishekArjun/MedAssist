@echo off
echo.
echo 🚀 Updating GitHub with latest changes (including README)...
git add .
git commit -m "Integrate Groq AI, fix backend connectivity, and enhance clinical triage logic"
git push
if %errorlevel% neq 0 (
    echo.
    echo ❌ Git push failed! Please check your internet connection and Git credentials.
) else (
    echo.
    echo ✅ GitHub updated successfully!
)
pause
