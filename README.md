# GabySystem Backend

API RESTFul developmented with Node.js

![Node.js](https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png)

## Features

- Endpoints
- Authentication
- Authorization
- PDF
- Send Emails
- Cron Jobs
- Statics Files

## Technologies Used

- Node.js
- MongoDB
- MySQL
- Docker

## Project Structure

API RESTFul

## Getting Stared

To set up GabySystem API RESTFul and get it running on your local development environment, follow these steps:

### Prerequisites

- Linux or Windows
- Visual Studio
- NODE.js >= 18
- Docker
- Docker Compose
- MongoDB <a href="https://github.com/gabyreload1983/mongodb-gabysystem" target="_blank">README</a>
- [Urbano Server DEV](#urbano-server-dev)
- Gabysystem Frontend <a href="https://github.com/gabyreload1983/front-gabysystem/blob/main/README.md" target="_blank">README</a>

### Develpment

1. Clone the repository to your local machine.
2. Rename .env.template file into .en.development and replace environment variables
3. Run npm run dev

## Deploy

1. Rename api-gabysystem-template.yml to api-gabysystem.yml and copy into the server
2. Complete the environment variables of production
3. Run docker-compose -f api-gabysystem.yml up -d

## Urbano Server DEV

1. Create a Virtual Machine with Windows 10 or higher
2. Install Urbano Server
3. Stop MySQL Service
4. Copy and replace database backup
5. Restart MySQL Service
6. Create firewall rules for entry and exit on port 3306
