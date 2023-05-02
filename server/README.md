# VotEase-server

Repository contains the server-side application for [VotEase project](https://github.com/r1pk/votease-client). Server is written in Node.js and uses the [Colyseus](https://colyseus.io/) framework.

## Pre-requisites

Application was developed and tested in a stable environment, utilizing the following versions:

- [node.js v19.7.0](https://nodejs.org/en/)
- [npm v9.6.0](https://nodejs.org/en/download/)

This ensures that the application runs smoothly and efficiently.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```bash
NODE_ENV=development         # node environment
COLYSEUS_MONITOR_PASSWORD=   # password for colyseus monitor
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/r1pk/votease-server.git
```

Go to the project directory

```bash
  cd votease-server
```

Install dependencies

```bash
  npm install
```

Run the project locally

```bash
  npm start
```

## Project structure

```
src
  |-- rooms               # available room types
  |  |-- room-type        # room directory
  |  |  |-- commands      # commands used by given room
  |  |  |-- schemas       # schemas used by given room
  |  |  |-- RoomName.js   # room class
  |  |  |-- index.js      # exports main room class
  |-- arena.config.js     # contains and exports created arena config
  |-- logger.js           # logger configuration
  |-- index.js            # server entry point
```

Files outside of `src` directory are mostly configuration files for git, editor and npm.

## Room types

### Vote-Room

#### Room state schema

- [Schema definition](./src/features/vote-room/schemas/RoomState.js)

#### Events listened by server

- `poll::edit` - edit current poll in room.
  Accept object with `title` and `choices` fields. `title` is a string with poll title and `choices` is an array of strings with poll choices.

  ```json
  {
    "title": "string",
    "choices": ["string"]
  }
  ```

- `poll::reset-answers` - reset all answers in poll.
  Accepts empty object. This event is only available for current room owner otherwise it will throw an error.

  ```
  {}
  ```

- `poll::cast-answer` - cast answer to poll.
  Accepts object with `choiceId` field which is a string with id of selected choice.

  ```
  {
    choiceId: string
  }
  ```

#### Client communication

Communication between client and server is done using [Colyseus.js](https://www.colyseus.io/) framework which notifies every client about changes in room state.

## Author

- Patryk [r1pk](https://github.com/r1pk) Krawczyk

## License

- [MIT](https://choosealicense.com/licenses/mit/)
