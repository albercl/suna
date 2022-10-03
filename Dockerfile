FROM node:18

RUN mkdir /suna

WORKDIR /suna

COPY . /suna

RUN npm install --omit=dev --omit=optional
RUN npm run build

CMD ["npm", "run", "start"]