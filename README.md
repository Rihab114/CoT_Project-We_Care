# Cloud of Things Application
## Description
The project objective is to create a system capable of measuring an animal's body temperature and heart rate (ECG: electrocardiogram) 
then send the measures taken to an application that will process this data and extract the health status of the animal and send a status
report to the keeper. In case of danger, the application will trigger an alert that will be received by the owner who will intervene to save
them before reaching any high level complications .


## Technologies

- Front-End : Ionic-React
- Middleware : Node.js
- Backend : Raspberry pi 4 , mosquitto
- Database : mongoDB
![architecture]![image](https://user-images.githubusercontent.com/75638904/148512609-ee9c30a2-6cea-4846-87cc-65a4e868b1b4.png)

## Technical documentation 

###  WeCare :
######  Server side :
- Download and Install node.js :

`wget -qO- https://deb.nodesource.com/setup_14.x | sudo -E bash -`

`sudo apt install -y nodejs`

- Run the server :

`npm start` 

######  Client side :
- Run the application :

`ionic serve `

## Deployment
- The NodeJS server part is deployed on an Azure virtual machine with an Ubuntu 20.4 OS and accessible via the URL wecarecot.me .
- This server is secured with a Wildard SSL certificate associated with an rsa 4096 key, issued by Let's Encrypt and generated with the following command:
`sudo certbot certonly --manual -d *.$cotsmartalarm.me -d $cotsmartalarm.me --agree-tos --manual-public-ip-logging-ok --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory --register-unsafely-without-email --rsa-key-size 4096`

![certif]![SSLabA](https://user-images.githubusercontent.com/75638904/148512671-9f486f72-ebab-401b-af16-89dfd6755600.PNG)



