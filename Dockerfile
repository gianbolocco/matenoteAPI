# Use specific version for reproducibility
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache for dependencies
COPY package*.json ./

# Install production dependencies only using npm ci for faster, reliable builds
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose the port the app runs on (defaults to 5000 in .env.example)
EXPOSE 5000

# Start command
CMD ["npm", "start"]
