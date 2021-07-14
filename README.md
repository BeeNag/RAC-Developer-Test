# Red Apple Creative Developer Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br />

This is my attempt at creating an interactive carousel, as outlined in the brief.\
I have used `create-react-app` to quickly bootstrap a project and then added packages that I find useful.\
Such as `prettier` for code formatting, `tailwindcss` for styling and `react-spring` for animations.\
I made the conscious decision **not** to use `redux` in this instance, as in my opinion it isn't required at this stage (details can be found [here](https://redux.js.org/faq/general#when-should-i-use-redux)). The downside being that while the carousel does keep track of the state locally, if you refresh the page it will reset.\
Tailwind was used for all the styling, and I haven't veered away from the default configuration that it provides because in this case it gives me what I need.\
`craco` is used because `create-react-app` does not allow you to directly edit the postcss configuration. More information on `craco` can be found [here](https://github.com/gsoft-inc/craco).

## Running the prototype

Firstly, you should clone this repository:

```bash
$ git clone https://github.com/BeeNag/rac-developer-test.git
```

or

```bash
git clone git@github.com:BeeNag/rac-developer-test.git
```

In the root directory of the project, you should run:

### `yarn start:server`

Starts a lightweight json-server with the data provided in the **JSON file**.\
Open [http://localhost:3001](http://localhost:3001) to view the json in the browser.

### `yarn start`

Runs the app in development mode, and will automatically open a new tab in the default browser at [http://localhost:3000](http://localhost:3000).

## Other Available Scripts

There are some other scripts that you can run provided by `create-react-app`, but aren't directly used by this prototype currently:

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
