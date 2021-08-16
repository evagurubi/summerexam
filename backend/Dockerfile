FROM node:12
WORKDIR /backend
COPY package.json* .
RUN npm install
COPY . ./
EXPOSE 5000
CMD ["node", "start.js"]

