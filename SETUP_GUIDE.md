# Quick Setup Guide

## Prerequisites Installation

### Option 1: Install Node.js (Recommended for Windows)

1. Download Node.js v20.x or higher from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the prompts
3. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

### Option 2: Install Bun (Faster Alternative)

1. Open PowerShell and run:
   ```powershell
   irm bun.sh/install.ps1 | iex
   ```
2. Verify installation:
   ```powershell
   bun --version
   ```

## Project Setup

1. **Navigate to the project directory:**
   ```powershell
   cd c:\Users\darsh\Downloads\finagent-ai-testing-main\finagent-ai-testing-main
   ```

2. **Install dependencies:**
   
   With npm:
   ```powershell
   npm install
   ```
   
   Or with bun (faster):
   ```powershell
   bun install
   ```

3. **Configure environment variables:**
   
   The `.env.local` file has been created for you. You need to add your Gemini API key:
   
   ```powershell
   notepad .env.local
   ```
   
   Replace `your_gemini_api_key_here` with your actual API key from:
   https://makersuite.google.com/app/apikey

4. **Run the development server:**
   
   With npm:
   ```powershell
   npm run dev
   ```
   
   Or with bun:
   ```powershell
   bun dev
   ```

5. **Open your browser:**
   
   Navigate to http://localhost:3000

## Verification

After setup, verify everything works:

```powershell
# Type check
npx tsc --noEmit

# Lint check
npm run lint

# Run tests (after dependencies are installed)
npm test

# Build for production
npm run build
```

## Issues Fixed

✅ Created `.env.local` file with template  
✅ Fixed ESLint configuration (removed non-existent tsconfig.app.json)  
✅ Created test directory structure (tests/unit, tests/integration, tests/e2e)  
✅ Added Vitest setup file with proper DOM mocking  
✅ Created sample unit tests for utilities  
✅ Updated Vitest config to include tests directory  

## Next Steps

⚠️ **You still need to:**
1. Install Node.js or Bun
2. Run `npm install` or `bun install`
3. Add your actual GEMINI_API_KEY to `.env.local`

## Documentation

- Full issues list: See `ISSUES_AND_FIXES.md`
- Project README: See `README.md`
- Contributing guide: See `CONTRIBUTING.md`

---

**Last Updated:** December 26, 2025
