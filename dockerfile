# base image
# FROM node:12.2.0-alpine
# # set working directory
# WORKDIR /app
# # add /app/node_modules/.bin to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# # install and cache app dependencies
# # COPY package.json /app/package.json
# COPY package*.json ./
# # RUN npm install @vue/cli@3.7.0 -g
# RUN npm install
# # start app
# EXPOSE 8080
# CMD ["npm", "run", "build"]
################################

# FROM node:lts-alpine
FROM node:12.2.0-alpine
# make the 'app' folder the current working directory
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
# install project dependencies
RUN npm install
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# build app for production with minification
EXPOSE 8080
CMD ["npm", "run", "build"]

