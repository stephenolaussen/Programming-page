# DevSpace - GitHub Connection Commands

## After creating your GitHub repository, run these commands:

# Add your GitHub repository as remote origin
git remote add origin https://github.com/Stephenolaussen/devspace-programming-hub.git

# Push your code to GitHub
git push -u origin main

## Alternative: If you want to use SSH instead of HTTPS:
# git remote add origin git@github.com:Stephenolaussen/devspace-programming-hub.git
# git push -u origin main

## Verify connection:
git remote -v

## Check branches:
git branch -a

---

## 🎯 Next Steps After Pushing to GitHub:

1. Enable GitHub Pages:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from branch "main"
   - Folder: / (root)
   - Your site will be live at: https://stephenolaussen.github.io/devspace-programming-hub/

2. Add repository description and topics:
   - Go to your repository main page
   - Click the gear icon next to "About"
   - Add description: "🚀 Ultimate Programming Hub with Bootstrap, jQuery & Developer Tools"
   - Add topics: bootstrap, jquery, javascript, developer-tools, responsive-design, web-development

3. Create issues for future features:
   - Code editor integration
   - PWA support
   - More developer tools

## 🛠️ Future Git Workflow:

# Make changes to your code
git add .
git commit -m "✨ Add new feature: [description]"
git push

# Create feature branches:
git checkout -b feature/new-tool
# Make changes
git add .
git commit -m "Add new developer tool"
git push -u origin feature/new-tool
# Create pull request on GitHub

## 📊 Useful Git Commands:

git log --oneline          # View commit history
git status                 # Check current status
git diff                   # See changes
git checkout -b <branch>   # Create new branch
git merge <branch>         # Merge branch
git pull                   # Pull latest changes