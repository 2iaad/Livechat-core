SHELL := /bin/sh 
BACKEND_DIR := Backend
FRONTEND_DIR := Frontend

.PHONY: help install setup dev-backend dev-frontend build lint preview clean

.DEFAULT_GOAL := help

help:
	@echo "Livechat-core Makefile targets:"
	@echo "  make install       Install dependencies in Backend and Frontend"
	@echo "  make setup         Install dependencies and print .env guidance"
	@echo "  make dev-backend   Run backend dev server"
	@echo "  make dev-frontend  Run frontend dev server"
	@echo "  make build         Build frontend for production"
	@echo "  make lint          Lint frontend source"
	@echo "  make preview       Preview frontend production build"
	@echo "  make clean         Remove node_modules and lockfiles in both apps"

install:
	cd $(BACKEND_DIR) && npm install
	cd $(FRONTEND_DIR) && npm install

setup: install
	@echo "Dependencies installed."
	@echo "Create Backend/.env with required values:"
	@echo "  MONGODB_URI, JWT_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"
	@echo "Create Frontend/.env with required values:"
	@echo "  VITE_API_URL=http://localhost:5001/api"

dev-backend:
	cd $(BACKEND_DIR) && npm run dev

dev-frontend:
	cd $(FRONTEND_DIR) && npm run dev

build:
	cd $(FRONTEND_DIR) && npm run build

lint:
	cd $(FRONTEND_DIR) && npm run lint

preview:
	cd $(FRONTEND_DIR) && npm run preview

clean:
	rm -rf $(BACKEND_DIR)/node_modules $(FRONTEND_DIR)/node_modules
	rm -f $(BACKEND_DIR)/package-lock.json $(FRONTEND_DIR)/package-lock.json
