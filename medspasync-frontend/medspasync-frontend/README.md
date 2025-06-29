# MedSpaSync Frontend

## 🚀 Developer Tools & Scripts

### DevTools Hook & Panel

- **useDevTools**: Import and use the `useDevTools` hook in any component for live debugging, performance monitoring, and state tracking.
- **DevToolsPanel**: The main `App.jsx` includes a DevTools overlay in development mode for real-time insights.
- Enable debug mode with `REACT_APP_DEBUG=true` or by running `npm run debug`.

**Example:**
```jsx
import { useDevTools } from './hooks/useDevTools';

function MyComponent() {
  const devTools = useDevTools('MyComponent');
  // ...
}
```

### Scripts

- `npm run dev` — Start the app in development mode
- `npm run debug` — Start with DevTools debug mode enabled
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm test` — Run all tests
- `npm run test:watch` — Run tests in watch mode
- `npm run test:coverage` — Run tests with coverage report
- `npm run lint` — Lint the codebase
- `npm run format` — Format code with Prettier

### Best Practices
- Use the DevTools panel to monitor render performance, memory, and network stats.
- Use `devTools.logDebug`, `logPerformance`, and `logError` for advanced debugging.
- Run `npm run lint` and `npm run format` before committing code.
- Use `npm run test:coverage` to ensure high test coverage.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
