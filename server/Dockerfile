# Use the official Node.js image as a base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]

