@echo off

echo Setting Git User Information...
git config --global user.email "azozsony1@gmail.com"
git config --global user.name "i3z1"

echo Removing existing origin if it exists...
git remote rm origin

echo Adding new origin...
git remote add origin https://github.com/i3z1/test.git

echo Adding all modified and new files to the staging area...
git add -A

echo Committing changes...
git commit -m "First commit"

echo Renaming current branch to main...
git branch -M main

echo Pushing to remote repository...
git push -u origin main

echo Done.
