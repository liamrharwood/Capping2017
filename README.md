# Capping2017
Senior capping project for Fall 2017.
## Helping Hands Social Network
### Running the Backend
Main class:
```com.helpinghands.HelpingHandsApplication```

Program arguments:
```server helping-hands.yml```

VM options:
```
-Ddw.database.url=[DATABASE URL]
-Ddw.database.user=[USER FOR DATABASE]
-Ddw.database.password=[PASSWORD FOR USER]
```


## Front-End Development Environment

The front end is composed of a single page application written in React.

### Web Server

It is necessary to host the page on a local web server, otherwise the client-side routing will not work. You can read more about `react-router` [here](https://reacttraining.com/react-router/).

The easiest way to set up a local web server is to use NodeJS. You can check if you are running Node by using the command `node -v`. If you are not, install node at https://nodejs.org/en/.

Once node is installed, navigate in your terminal to the location containing the `index.html` file, in this case `src/client/app`, and run the command

`ws --spa index.html`

You can then access the site by simply going to `localhost:8000/home` in a browser.

### Setting up Webpack bundling

The bulk of the written project consists of `.jsx` files, a variant of JavaScript that needs to converted and bundled to be readable by the browser. There are two commands to do so:

`npm run build` bundles all current `.jsx` files into a `bundle.js` file.

`npm run dev` causes Webpack to constantly watch the project, and rebundle any time it detects any new changes saved.


It is recommended to have both `ws --spa index.html` and `npm run dev` running in two terminal windows while developing.

