# Meetup

Meetup is an Ios and Andriod app that helps groups of friends decide on what restaurant or bar to go to based on the groups location. It was made using React Native, GraphQL, Node JS, Postgres, and Expo.

### Installing

* first clone the repository to your local machine

```
git clone git@github.com:ChrisProbyn/meetup2.0.git
```

* then go into both the client and ServerNode folders and install the dependencies

```
cd client
npm install
cd ..
cd ServerNode
npm install
```
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


### Usage

What things you need to install the software and how to install them

```
Give examples
```


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds




## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

