# VotEase-server

Directory containing server-side application for [VotEase project](https://github.com/r1pk/votease). VotEase server is written in Node.js and uses the [Colyseus](https://colyseus.io/) framework.

## Project structure

```bash
server/                 # root directory
├─ src/                 # application source code
│  ├─ rooms/            # room related files grouped by room type
│  ├─ arena.config.js   # server configuration
│  ├─ index.js          # application entry point
│  ├─ logger.js         # logger configuration
├─ arena.env            # arena cloud configuration
├─ development.env      # local development configuration
```

Files outside of `src` directory are mostly configuration files for git, editor and npm.

## Environment Variables

To run the application locally, you might need to change the following configuration in specific files:

- `development.env` - Default configuration used by the local development server.
- `arena.env` - Configuration used by the Arena Cloud service.

Default configuration:

```bash
NODE_ENV=development         # node environment
COLYSEUS_MONITOR_PASSWORD=   # password for colyseus monitor
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/r1pk/votease.git
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Run the project locally

```bash
  npm start
```

## Room types

### Vote-Room

#### Room state schema

- [Schema definition](./src/rooms/vote-room/schemas/RoomState.js)

#### Events listened by server

- `poll::edit` - edit current poll in room.
  Accept object with `title` and `choices` fields. `title` is a string with poll title and `choices` is an array of strings with poll choices.

  ```javascript
  {
    "title": "string",
    "choices": ["string"]
  }
  ```

- `poll::reset-answers` - reset all answers in poll.
  Accepts empty object. This event is only available for current room owner otherwise it will throw an error.

  ```javascript
  {
  }
  ```

- `poll::cast-answer` - cast answer to poll.
  Accepts object with `choiceId` field which is a string with id of selected choice.

  ```javascript
  {
    choiceId: string;
  }
  ```

#### Client communication

Communication between client and server is done using [Colyseus.js](https://www.colyseus.io/) framework which notifies every client about changes in room state.

## Author

- Patryk [r1pk](https://github.com/r1pk) Krawczyk
