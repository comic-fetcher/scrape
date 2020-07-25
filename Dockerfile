FROM node:12

ENV NODE_ENV production

COPY package.json package.json
COPY yarn.lock yarn.lock

COPY src src
COPY tsconfig.json tsconfig.json
COPY ormconfig.json ormconfig.json

RUN yarn install --frozen-lockfile
# RUN yarn build
CMD ["yarn", "start"]
