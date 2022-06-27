FROM node:16-alpine 

WORKDIR /app

# Optimize the dependencies installation with cache
COPY . .
RUN yarn
# ADD . .

EXPOSE 3000

CMD ["yarn", "dev"]
