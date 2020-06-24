# HeisenGame

## What is the Heisen Game?

The Heisen Game is a small memory game with the characters of Breaking Bad.
The game is using the open [breakingbadapi.com](https://breakingbadapi.com/), to get the characters information.
Highscores are stored using the [HeisenApi](https://github.com/Bjornnyborg/HeisenApi)

## Gameplay

When you start the game, you will get to the main view, which is a memory game containing the first 6 characters from the API. On entering the memory game, a timer starts.
When you successfully match a character, you will unlock more information about this character, you can navigate to the unlocked characters, by pressing the Heisenberg icon.
When all characters on the main view are matched, you will get the option to submit your score.
On submission you will see the current leaderboard, and if you're good, you will see yourself on it!

## Try the game

[Play the HeisenGame online](http://heisengame.herokuapp.com/)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# deploy to heroku
$ git push heroku
```

### ENV

Create an .env file with `API_URL=http://localhost:9292` for local development.

### Tech

I am using the nuxt.js framework, that is based on Vue.js for detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
