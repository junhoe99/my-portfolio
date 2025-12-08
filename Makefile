# Portfolio Deployment Makefile
# Usage: make [target]
# Default target (make): builds and deploys to GitHub Pages

.PHONY: all build push deploy dev clean help

# Default target - full deploy
all: deploy

# Start development server
dev:
	npm run dev

# Build the project
build:
	npm run build

# Git add, commit and push
push:
	@echo "📦 Staging all changes..."
	git add .
	@echo "💬 Enter commit message: "; \
	read msg; \
	git commit -m "$$msg"
	@echo "🚀 Pushing to GitHub..."
	git push origin main
	@echo "✅ Push complete!"

# Quick push with auto message
quick-push:
	@echo "📦 Staging all changes..."
	git add .
	git commit -m "Update portfolio - $(shell date /t) $(shell time /t)"
	@echo "🚀 Pushing to GitHub..."
	git push origin main
	@echo "✅ Push complete!"

# Build and deploy to GitHub Pages
deploy: build
	@echo "📦 Staging all changes..."
	git add .
	@echo "💬 Enter commit message: "; \
	read msg; \
	git commit -m "$$msg"
	@echo "🚀 Pushing to GitHub..."
	git push origin main
	@echo "✅ Deploy complete! Your site will be updated shortly."

# Quick deploy with auto message
quick-deploy: build
	@echo "📦 Staging all changes..."
	git add .
	git commit -m "Deploy: $(shell date /t) $(shell time /t)"
	@echo "🚀 Pushing to GitHub..."
	git push origin main
	@echo "✅ Deploy complete!"

# Check git status
status:
	git status

# View git log
log:
	git log --oneline -10

# Clean build artifacts
clean:
	@if exist dist rmdir /s /q dist
	@echo "🧹 Cleaned build artifacts"

# Install dependencies
install:
	npm install

# Help
help:
	@echo.
	@echo Portfolio Makefile Commands:
	@echo ============================
	@echo   make          - Build and deploy (same as 'make deploy')
	@echo   make dev      - Start development server
	@echo   make build    - Build the project
	@echo   make push     - Git add, commit, and push (prompts for message)
	@echo   make quick-push - Push with auto-generated commit message
	@echo   make deploy   - Build and deploy to GitHub
	@echo   make quick-deploy - Build and deploy with auto commit message
	@echo   make status   - Show git status
	@echo   make log      - Show recent git commits
	@echo   make clean    - Remove build artifacts
	@echo   make install  - Install npm dependencies
	@echo   make help     - Show this help message
	@echo.
