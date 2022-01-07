# Cloud of Things Application
## Description
It's about a pet contol  application using cloud of things.. Our approach is based on the use of smartphones, with devices such as (alarm, Raspberry Pi board..) as additional peripherals.

## Technologies

- Front-End : React
- Middleware : Node.js
- Backend : Raspberry pi 4 , mosquitto
- Database : mongoDB
![architecture]
## Technical documentation 

### how to install SmartAlarm ?
######  Server side :
- Download and Install node.js :

`wget -qO- https://deb.nodesource.com/setup_14.x | sudo -E bash -`

`sudo apt install -y nodejs`

- Run the server :

`npm start` 

######  Client side :
- Run the application :

`npm  start `

## Deployment
- The NodeJS server part is deployed on an Azure virtual machine with an Ubuntu 20.4 OS and accessible via the URL wecarecot.me .
- This server is secured with a Wildard SSL certificate associated with an rsa 4096 key, issued by Let's Encrypt and generated with the following command:
`sudo certbot certonly --manual -d *.$cotsmartalarm.me -d $cotsmartalarm.me --agree-tos --manual-public-ip-logging-ok --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory --register-unsafely-without-email --rsa-key-size 4096`

![certif]


