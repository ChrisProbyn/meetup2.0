# Meetup

Meetup is an Ios and Andriod app that helps groups of friends decide on what restaurant or bar to go to based on the groups location. It was made using React Native, GraphQL, Node JS, Postgres, and Expo.

### Usage

After following the installation instructions bellow you can use our app
* upon opening our app you will be shown our landing page
* after touching the logo you will be able to login or sign up
*  upon sucsessful login you will be directed to the groups page. This page shows the list of groups the user is in. Each group shows the group name, number of users, the last time it was updated, and the usernames of everyone in the group
* to create a new group there is a button in the top right corner which will allow you to create a new group by name
* when you touch the group area you will be directed to the group chat
* the orange plus sign will allow you to add people to the group
* when you navigate to the map you will see all of the group members as map markers except for yourself
* all of the group members will be bounded by a purple polyline to help refine your search
* pressing the blue flag will create place markers with their name, rating and type of place centered around the centroid of the purple bounding polygon
* the shuffle button will pick using our alogorithim a place for you to go if your group cannot decide
* our app defaults to restaurants but if you want to switch to nightlife you press the refine button on the top right, flip the switch to nightlife, and press refine.

### Installing

* first clone the repository to your local machine

```
git clone git@github.com:ChrisProbyn/meetup2.0.git
```
* create all of the necessary acounts:
    * firebase project for the realtime database
    * google api acount for the places and map API
    * expo account

* then go into both the client and ServerNode folders and install the dependencies

```
cd client
npm install
cd ..
cd ServerNode
npm install
```
* create a database using the postgres CLI and add the information into an env in your ServerNode folder
* create a file apikey.js in /client/components/ and add/export your google api key.
* create a file firebase.js in /client/components/ and add/export your firebase project info.
* migrate and seed the database
```
cd ServerNode
/node_modules/.bin/knex migrate:latest
/node_modules/.bin/knex seed:run
```
* with multiple terminal tabs open run the client and Server. for example:
```
cd client
npm start
```
* with both the client and server side running expo will start on your browser
* you can run this app on a simulator or real device
* for the simulator you need to:
    1. install XCode
    2. press Run on ios simulator
* for a real device
    1. install the expo app on either ios or andriod
    2. open the expo app and scan the QR code genertated by the expo client in your browser


## Built With

* [React Native](https://facebook.github.io/react-native/) - Mobile front end framework
* [Expo](https://expo.io/) - Mobile development tools
* [GraphQL](https://graphql.org/) - API query language
* [Node JS](https://nodejs.org/en/) - Backend framework
* [Postgres](https://www.postgresql.org/) - SQL framework




## Authors

* **Chris Probyn** - [ChrisProbyn](https://github.com/ChrisProbyn)
* **Brian Wu** - [wubrian](https://github.com/wubrian)


