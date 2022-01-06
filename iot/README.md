# Raspberry Pi Temperature and Heart-beat Sensors

How to setup a raspberry pi with the sensors.

---

## Prerequisites

- Raspberry pi 3
- Micro SD-card
- temperature and heart-beat sensor
- 1 breakout board 
- Jumper cables 

## How it works :

There's probably tons of different ways to get this done but here you have our take on it:

### 1) Initial setup of the Raspberry pi
Follow the [instructions on how to setup a headless raspberry pi](https://hackernoon.com/raspberry-pi-headless-install-462ccabd75d0).

### 2) Connect temperature and heart-beat sensors 
Connect your sensors to the raspberry pi 
 **Notice** that DS18B20 sensors uses the "Dallas 1-Wire protocol" which means that you can connect multiple sensors in parallel.

### 3) Download the python scripts
Having completed the step above you should be able to get data from the sensors. Now you can download the scripts in this repository and place them somewhere suitable on your raspberry pi. You can do this by installing git on the pi.

### 4) Configure 
Open the file `config.json` and add the folders and names of each sensor you have connected to the pi. 

Now you can either call `$ python temp_monitor.py`, to get a nice presentation of each sensor.