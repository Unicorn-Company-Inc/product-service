FROM node:17-alpine as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN npm install -g pnpm

RUN pnpm i \
    && pnpm run build \
    && pnpm prune --prod

FROM node:17-alpine

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

EXPOSE 3001

CMD ["node", "dist/main.js"]