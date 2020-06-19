# Builder stage
FROM node:13-alpine as builder
ENV NODE_ENV=production

WORKDIR /opt/app

COPY package.json yarn.lock /opt/app/
COPY docker/ClientConfig.json.travis.prod /opt/app/src/config/ClientConfig.json
COPY public/ /opt/app/public
COPY src/ /opt/app/src
COPY src/components/ /opt/app/src/components/
COPY src/contexts/ /opt/app/src/contexts/
COPY src/services/ /opt/app/src/services/

RUN yarn install
RUN yarn build

# Deploy stage
FROM node:13-alpine
RUN apk add --no-cache bash=~5

ENV NODE_ENV=production


COPY --from=builder /opt/app/build /opt/app/
RUN yarn global add serve
WORKDIR /opt/app

EXPOSE 5000

CMD [ "serve", "-s", "."]
