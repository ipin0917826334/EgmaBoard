# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm ci

# Copy the rest of the application to the working directory
COPY . .

# Build the React application for production
RUN npm run build

# Use Nginx to serve the React application
FROM nginx:1.21

# Copy the build output to Nginx's default public folder
COPY --from=0 /app/build /usr/share/nginx/html

# Update the default.conf file to use the desired listening port
RUN sed -i 's/listen\s*80;/listen 3000;/g' /etc/nginx/conf.d/default.conf
RUN sed -i 's/listen\s*\[::\]:80;/listen [::]:3000;/g' /etc/nginx/conf.d/default.conf

# Update the location block to handle client-side routing
RUN sed -i 's|location / {|location / {\n        try_files $uri $uri/ /index.html;|' /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

