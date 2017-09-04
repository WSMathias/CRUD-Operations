# Indian-Kitchen
Catalog of indian dishes with following features
-Add
-Edit
-Deleted
more featres coming soon

Bulit using HTML,CSS and JavaScript
## Requirements:
-linux OS
-Apache web server
-Nodejs
-npm
-json-server

## Installation of dependencies.
Apache web server :
```bash
$ sudo apt-get install apache2
```
Nodejs & npm:
```bash
$ sudo apt-get install python-software-properties
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install nodejs
$ json-server:
$ sudo npm install -g json-server
```
read more about json-server from https://github.com/typicode/json-server

## Setting up server:
```bash
 $ cd /var/www/
 $ sudo chmod -R 755 html && cd html
 $ sudo git clone https://github.com/WSMathias/ndian-IKitchen.git
 $ cd Indian-Kitchen && json-server -watch db.json
```
After successfully completing above steps to type http://localhost/Indian-Kitchen in your browser

###### NOTE:
Everytime you restart your computer type following command to run json-server
```bash
$ cd /var/www/html/Indian-Kitchen && json-server -watch db.json
```
