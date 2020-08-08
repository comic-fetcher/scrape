FROM node:12 AS build

WORKDIR /projects

ADD package.json yarn.lock ./
ADD tsconfig.json tsconfig.build.json ./
ADD src ./

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:lts

ENV NODE_ENV production

ADD package.json yarn.lock ./
COPY --from=build /projects/dist ./dist

RUN yarn install --frozen-lockfile --production

CMD ["node", "./dist/index.js"]
