# Asset Handling Service
Small project based on Nest.js to handle Assets. 

## Installation

Create local config file and change database values
```bash
mv config/local.example.yaml config/local.yaml
```

Use your new database credentials in docker-compose file. Start PostgreSQL
```bash
docker-compose up
```

Install npm dependencies
```bash
$ npm install
```

## Seed demo date in the application
```
npm run console:dev test-briefing:create
```

delete data
```
npm run console:dev test-briefing:create
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```