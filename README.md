# Installing console dash on raspberry pi

If RPI is a fresh install you might need to expand your file system
`sudo raspi-config`
`choose option 1 (expand file system)`
`reboot`


Install node
`sudo apt-get update`
`sudo apt-get upgrade`
`sudo apt-get install nodejs npm`


Install Chromium
`wget -qO - http://bintray.com/user/downloadSubjectPublicKey?username=bintray | sudo apt-key add -`
`echo "deb http://dl.bintray.com/kusti8/chromium-rpi jessie main" | sudo tee -a /etc/apt/sources.list`
`sudo apt-get update`
`sudo apt-get install chromium-browser rpi-youtube -y`


`git clone https://github.com/gregsqueeb/consultDash.git`
`cd consultDash`
`npm install`


Install script for mausberry circuit
`http://mausberrycircuits.com/pages/car-setup`


Open Menu > Preferences > Default applications for LXSession
Add these two entries to Autostart
`@/home/pi/consultDash/startScript.sh`
`@chromium-browser —kiosk file:///home/pi/consultDash/re-direct-page.html`


