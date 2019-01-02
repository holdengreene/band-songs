FROM node:10-alpine

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

# Build the nuxt app
RUN yarn install --production
RUN yarn build

# Clean it all up
# RUN rm -r components layouts pages plugins

ENV HOST 0.0.0.0
