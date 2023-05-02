# VotEase-client

Directory containing client-side application for [VotEase project](https://github.com/r1pk/votease). VotEase client is built using technologies such as [React](https://reactjs.org/), [React-Router](https://reactrouter.com), [Redux](https://redux.js.org/), [Material-UI](https://mui.com/).

## Screenshots

Create room page
![Create Room Page](https://i.imgur.com/QnHY4Xg.png)

Join room page
![Join Room Page](https://i.imgur.com/bNyRCEB.png)

Room page
![Room Page](https://i.imgur.com/YGDzb9A.png)

## Project structure

```bash
client/               # root directory
├─ public/            # static files
├─ src/               # application source code
│  ├─ apis/           # api related files
│  ├─ components/     # reusable components grouped by features
│  ├─ hooks/          # custom hooks
│  ├─ layouts/        # layout components grouped by layout type
│  ├─ pages/          # page components
│  ├─ redux/          # redux related files
│  ├─ themes/         # theme related files (e.g. colors, fonts)
│  ├─ utils/          # utility functions
│  ├─ App.jsx         # application root component
│  ├─ AppRoutes.jsx   # application routes
│  ├─ main.jsx        # application entry point
├─ .env               # default environment variables
```

## Environment Variables

To run the application locally, you might need to change the following configuration in specific files:

- `.env.local` - Configuration used by the local development server.
- `.env` - Configuration used by default and will be used as fallback if some variables are not defined in `.env.local`.

Default configuration:

```bash
VITE_BASE_APP_TITLE=VotEase              # Base application title
VITE_COLYSEUS_URL=                       # Colyseus server address
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/r1pk/votease.git
```

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Run the project locally

```bash
  npm run dev
```

## Authors

- [@r1pk](https://github.com/r1pk)
