FROM node:12 AS build

WORKDIR /projects

COPY package.json yarn.lock tsconfig.json tsconfig.build.json  ./
COPY src ./

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:lts

ENV NODE_ENV production

COPY package.json yarn.lock ./
COPY --from=build /projects/dist ./dist

RUN yarn install --frozen-lockfile --production

CMD ["node", "./dist/index.js"]
