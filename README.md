# nestjs-microservices

nestjs microservices project

# config

npm i @nestjs/config

# monorepo

nest g library common
nest g module database -p common
nest g module config -p common (wrapper around config module)

# mongodb

npm i @nestjs/mongoose mongoose
