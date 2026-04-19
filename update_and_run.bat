@echo off
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo npm install failed!
    pause
    exit /b %errorlevel%
)

echo.
echo Commissioning changes to Git...
git add .
git commit -m "Fix AI chatbot robustness, enhance backend logic, and resolve linting issues"

echo.
echo Pushing to GitHub...
git push
if %errorlevel% neq 0 (
    echo git push failed! You may need to authenticate or check your remote settings.
)

echo.
echo Starting the application...
npm run start:all
pause
