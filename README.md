# FPWD - Recruitment challenge - backend

by @wojoti

Backend part of FPWD Recruitment task - powered by NestJS

## Installation

In project's root directory create **.env.local** file with Dummy API URL and API key!

```bash
# run MongoDB docker image
$ docker compose up

# watch mode
$ npm run start:dev

```

## Usage

- GET _/exchange/eur/pln_ - fetch exchange rate's data (cached for 60 seconds)
- POST _/exchange/exchange_ - add conversion transaction
  Request body:

```
{
    "from": "eur",
    "to": "pln",
    "amount": <number>
}
```

Response body:

```
{
    "rate": <number>,
    "from": "eur",
    "to": "pln",
    "amountFrom": <number>,
    "amountTo": <number>,
    "_id": <id>,
    "createdAt": <timestamp>,
    "updatedAt": <timestamp>,
}
```
