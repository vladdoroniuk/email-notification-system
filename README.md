## Tasks

- [x] Analyze business requirements and technical details
- [x] Clarify questions with the customer
- [x] Create system design diagram
- [x] Create entity relationship diagram
- [x] Setup NestJS monorepo
- [x] Create Prisma schema file based on ERD
- [x] Create Dockerfile for service app and worker app
- [x] Create docker-compose.yml file
- [x] Connect to external BTC-to-UAH API
- [x] Configure Prometheus and prom-client
- [ ] Create endpoints
  - [x] GET /rate
  - [ ] POST /rate
  - [x] GET /emails
  - [x] POST /emails
  - [x] DELETE /emails
  - [x] GET /metrics
- [ ] Collect metrics
  - [x] subscribe email count
  - [x] unsubscribe email count
  - [ ] send email count
  - [ ] send email error count
  - [x] exchange rate gauge
- [ ] Get exchange rate every hour
- [ ] Get exchange rate at 9 AM Kyiv time
- [x] Use CQRS pattern
- [ ] Use Nodemailer for mailing
- [ ] Use Bull for task queuing
- [x] Use Cron/Interval for task scheduling
- [ ] Use Pino for logging
- [ ] Add unit tests

## System Design Diagram

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)">
    <img src="./images/system_design.svg">
  </picture>
</p>

## Entity Relationship Diagram

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)">
    <img src="./images/erd.svg">
  </picture>
</p>

## Services

- localhost:3001 -> Service App (localhost:3001/api -> Swagger Docs)
- localhost:3002 -> Worker App
- localhost:9090 -> Prometheus
- localhost:6379 -> Redis
- localhost:5432 -> PostgreSQL
- localhost:5555 -> Prisma Studio (npm run db:studio)

## Useful Articles

- https://www.bemyaficionado.com/design-a-notification-system
- https://blog.risingstack.com/node-js-performance-monitoring-with-prometheus/
