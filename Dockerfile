FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm config set unsafe-perm true
RUN npm install
RUN npm install @vue/cli@3.7.0 -g 
RUN npm install -g express

# start app
CMD ["npm", "run", "serve"]
