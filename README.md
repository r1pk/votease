# VotEase

VotEase is a responsive web application that allows users to perform simple and quick polls in private rooms. VotEase is built using technologies such as [React](https://reactjs.org/), [React-Router](https://reactrouter.com), [Redux](https://redux.js.org/), [Material-UI](https://mui.com/) and [Colyseus](https://colyseus.io/).

## Project structure

```bash
project/            # root directory
├─ client/          # client-side application
├─ server/          # server-side application
```

## Pre-requisites

Application was developed and tested in a stable environment, utilizing the following versions:

- [node.js v19.7.0](https://nodejs.org/en/)
- [npm v9.6.0](https://nodejs.org/en/download/)

This ensures that the application runs smoothly and efficiently.

## Configuration

### Server

To run the server locally, you might need to change the following configuration in specific files:

- `development.env` - Default configuration used by the local development server.
- `arena.env` - Configuration used by the Arena Cloud service.

Default configuration:

```bash
NODE_ENV=development          # node environment
COLYSEUS_MONITOR_PASSWORD=    # password for colyseus monitor
```

### Client

To run the client locally, you might need to change the following configuration in specific files:

- `.env.local` - Configuration used by the local development server.
- `.env` - Configuration used by default and will be used as fallback if some variables are not defined in `.env.local`.

Default configuration:

```bash
VITE_BASE_APP_TITLE=VotEase   # Base application title
VITE_COLYSEUS_URL=            # Colyseus server address
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/r1pk/votease.git
```

### Server

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Run the server locally

```bash
  npm start
```

### Client

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Run the client locally

```bash
  npm run dev
```

## More information

For more information about the project, please refer to specific README files in the `client` and `server` directories.

- [Client README](./client/README.md)
- [Server README](./server/README.md)

## Demo

Application is automatically deployed using [Vercel](https://vercel.com) and [Fly.io](https://fly.io/).

[VotEase Live Demo](https://votease.vercel.app/)

## Authors

- [@r1pk](https://github.com/r1pk)

## License

[MIT](https://choosealicense.com/licenses/mit/)
