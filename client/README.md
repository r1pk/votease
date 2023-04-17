# VotEase

VotEase is a responsive web application that allows users to perform simple and quick polls in private rooms. VotEase is built using technologies such as [React](https://reactjs.org/), [React-Router](https://reactrouter.com), [Redux](https://redux.js.org/), [Material-UI](https://mui.com/).

## Screenshots

Create room page
![Create Room Page](https://i.imgur.com/YkaHBey.png)

Join room page
![Join Room Page](https://i.imgur.com/Natc3Aj.png)

Room page
![Room Page](https://i.imgur.com/YGDzb9A.png)

## Pre-requisites

Application was developed and tested in a stable environment, utilizing the following versions:

- [node.js v19.7.0](https://nodejs.org/en/)
- [npm v9.6.0](https://nodejs.org/en/download/)

This ensures that the application runs smoothly and efficiently.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```bash
VITE_BASE_APP_TITLE=VotEase              # Base application title
VITE_COLYSEUS_URL=                       # Colyseus server address

VITE_USERNAME_LOCALSTORAGE_KEY=username  # Local storage key used to store username
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/r1pk/votease-client.git
```

Go to the project directory

```bash
  cd votease-client
```

Install dependencies

```bash
  npm install
```

Run the project locally

```bash
  npm run dev
```

## Project file structure

```bash
public                            # static files
src
   |-- apis                       # api related folders and files
   |   |-- group                  # files grouped by specific api
   |   |   |-- index.js           # exports main api instance
   |-- components                 # components used across the application
   |   |-- common                 # common components used across the application
   |   |-- group                  # components grouped by their purpose
   |-- hooks                      # hooks used across the application
   |-- layouts                    # application layouts
   |   |-- layout                 # layout components grouped by their purpose
   |   |   |-- index.js           # exports main layout component from the folder
   |-- pages                      # page components
   |-- redux                      # redux related files
   |   |-- slices                 # redux toolkit store slices
   |   |-- store.js               # store configuration
   |   |-- index.js               # exports redux related resources from the folder
   |-- themes                     # theme related files
   |   |-- base.js                # base style object containing common styles
   |   |-- dark.js                # dark theme object
   |-- utils                      # utility functions used across the application
   |-- App.jsx                    # main application component
   |-- AppRoutes.jsx              # available routes in the application
   |-- main.jsx                   # entry point of the application
.env                              # file containing environment variables
```

## Demo

Application is automatically deployed using Vercel.

[VotEase Live Demo](https://votease.vercel.app/)

## Authors

- [@r1pk](https://github.com/r1pk)

## License

[MIT](https://choosealicense.com/licenses/mit/)
