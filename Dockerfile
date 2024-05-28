FROM node:18.20-alpine3.18 as build
WORKDIR /opt
COPY package*.json ./
RUN npm install -g npm@10.7.0 && \
npm i --legacy-peer-deps

FROM node:18.20-alpine3.18
WORKDIR /opt/app
COPY . .
ENV NEXT_PUBLIC_UPLOAD=https://admin.kiendev.click
ENV NEXT_PUBLIC_BE=https://admin.kiendev.click/api

COPY --from=build /opt/node_modules ./node_modules
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]