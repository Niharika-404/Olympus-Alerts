# Step 1: Choose the base image
FROM node:latest

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Step 5: Copy the rest of your application's source code
COPY . .

# Step 6: Your application will bind to port 3000, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Step 7: Define the command to run your app
CMD ["npm", "start"]

