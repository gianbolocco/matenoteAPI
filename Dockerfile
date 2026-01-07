# Use Node 20 (required by mongoose/mongodb)
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start command
CMD ["npm", "start"]
