# Use Node.js image for local development
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port that Vite will run on
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
