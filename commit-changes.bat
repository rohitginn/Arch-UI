@echo off
REM Navigate to project directory
cd /d D:\Programming\React\Project\ZenLab

REM Check git status
echo.
echo ===== GIT STATUS =====
git status
echo.

REM Add all changes
echo ===== ADDING CHANGES =====
git add .

REM Commit with descriptive message
echo ===== COMMITTING CHANGES =====
git commit -m "feat: Add GlassDataTable component with comprehensive features

- Implement Advanced Data Table component (glass-data-table.tsx)
- Features: Column sorting, filtering, pagination, row selection
- Features: Expandable rows, custom rendering, loading states
- Features: Sticky header, density modes (compact/normal/comfortable)
- Add 8 comprehensive examples (glass-data-table.examples.tsx)
- ARIA attributes for full accessibility (aria-sort, semantic markup)
- Memoized filtering/sorting/pagination for performance
- Support TypeScript generics for type-safe usage
- Update table exports in index.ts

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

REM Show what was committed
echo.
echo ===== COMMIT CREATED =====
git log --oneline -1

REM Optional: Push to remote
echo.
echo ===== PUSH TO REMOTE =====
REM Uncomment the line below to push changes
REM git push origin main

echo.
echo Done! Your changes have been committed locally.
echo To push to remote repository, run: git push origin main
pause
