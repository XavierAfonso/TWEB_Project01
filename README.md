# Github analytics - TWEB project 1 HEIG-VD
Xavier Vaz Afonso & Joël Kaufmann
## *JS Client repository*
Backend server repository can be found [here](https://github.com/XavierAfonso/TWEB_Project01_Server)

## Goal
Extract data from the [Github REST API](https://developer.github.com/v3/) and present them with a useful vizualisation (Client side).</br></br>
Our approach consists in finding someone in our Github *network* that could help us. We define that *network* by developpers that contibuted in one or more of our public projects and by people that contributed to one or more of their public projects.</br>

#### Github data used
- user information (bio, location, company)
- repository contributors
- repository language

#### Examples
- *I need to go to California for a convention, who in my "network" lives nearby, so that I can have a contact once there?*</br>
- *I'm a C++ newbie, can someone in my "network" help me learning that language?*
- *I'd like to apply for a job, is there someone in my "network" working in that company?"*

## Demo
##### Online demo
The project has been deployed [here](https://xavierafonso.github.io/TWEB_Project01/). Have fun :)

##### Screenshots
![Home](./screenshots/Capture1.PNG)
![Graph](./screenshots/Capture2.PNG)

## Running the app
Please note that this is only the client side, You will need a running backend server ([see backend repo](https://github.com/XavierAfonso/TWEB_Project01_Server)).

##### Tools required
- [nodejs](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm)

##### Commands

1. Clone this repo
```sh
$ git clone https://github.com/XavierAfonso/TWEB_Project01.git
```

2. Install project dependencies
```sh
$ npm install
```

3. Run the app
Run the following command to start a development server on `localhost:8080`.
```sh
$ live-server
```

4. Run tests
```sh
$ npm test
```

## Resources
This project uses :
- Theme adapted from [Bootstrap Grayscale template](https://startbootstrap.com/template-overviews/grayscale/)
- Scrolling management from [Sal.js](https://mciastek.github.io/sal/)
- Amazing network from [vis.js](http://visjs.org/)
- inspired from [Github Analytics light](https://github.com/heig-vd-tweb/github-analytics-light) by [Paul Nta](https://github.com/paulnta), [edri](https://github.com/edri)

Published under [MIT](https://github.com/XavierAfonso/TWEB_Project01/blob/master/LICENSE) license.
