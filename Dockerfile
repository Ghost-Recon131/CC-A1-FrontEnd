# pull the official base image
FROM node:17.9.0-alpine

# set working direction
WORKDIR /frontend

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/web
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]