# Installing console dash on raspberry pi

### Video guide

Instructions are below, but here is a [video guide](https://www.youtube.com/watch?v=5C9ypE6JUuY)
to help guide you through it.

##### If RPI is a fresh install you might need to expand your file system

`sudo raspi-config`

`choose option 1 (expand file system)`

`reboot`


##### Install node

`sudo apt-get update`

`sudo apt-get upgrade`

*NOTE: You must install node version v5.12 for the dash to work. Instructions on how to install a specific version of node incoming...*

`sudo apt-get install nodejs npm`


##### Install Chromium

`wget -qO - http://bintray.com/user/downloadSubjectPublicKey?username=bintray | sudo apt-key add -`

`echo "deb http://dl.bintray.com/kusti8/chromium-rpi jessie main" | sudo tee -a /etc/apt/sources.list`

`sudo apt-get update`

`sudo apt-get install chromium-browser rpi-youtube -y`

##### Install Dash

`git clone https://github.com/gregsqueeb/consultDash.git`

`cd consultDash`

`npm install`


##### Install script for mausberry circuit

`http://mausberrycircuits.com/pages/car-setup`

Open Menu > Preferences > Default applications for LXSession

Add these two entries to Autostart

`@/home/pi/consultDash/startScript.sh`

`@chromium-browser —kiosk --incognito file:///home/pi/consultDash/re-direct-page.html`


### Related guides

- [How to install a consult port](https://youtu.be/6Vd9oKWORPs?t=164)
- [How to install the OS on your Raspberry Pi](https://www.raspberrypi.org/learning/software-guide/quickstart/)
- [How to guide on installing that dash and power supply software](https://github.com/gregsqueeb/consultDash)

### Suggested hardware

- [Raspberry Pi 3](https://www.adafruit.com/products/3055)
- [Touch screen](https://www.adafruit.com/products/2718)
- [Mausberry Circuit Power Supply](http://mausberry-circuits.myshopify.com/collections/car-power-supply-switches/products/3a-car-supply-switch)
- [USB Consult cable](http://www.ebay.com/itm/14-Pin-Consult-II-OBD-DDL-USB-Interface-Diagnostic-Scanner-Tool-For-Nissan-Z32-/291644411718?hash=item43e75c8f46:g:bOkAAOSwQM9UZfVB&item=291644411718&vxp=mtr) (I am pretty sure this will work but I have not tested it yet. Let me know if you get it and it works)

or

- [Consult cable](http://www.ebay.com/itm/Consult-Auto-Car-Diagnostic-Interface-Tool-14-Pin-Scanner-Scan-Cable-for-Nissan-/261194185645?hash=item3cd062fbad:g:EdIAAOxyB0VRrvEt&item=261194185645&vxp=mtr)
- [Serial to USB cable](http://www.ebay.com/itm/RS232-RS-232-Serial-to-USB-2-0-PL2303-Cable-Adapter-Converter-for-Win-7-8-10-/301675657589?hash=item463d453975:g:wRQAAOSwHnFVkj3Z)

# How to run for development

This will loop through MPH RPM and Temp so you can style things without being connected to a car :)

`npm run dev`
