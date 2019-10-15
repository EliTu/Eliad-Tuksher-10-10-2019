import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
	createStore,
	compose,
	combineReducers,
	applyMiddleware,
	Store,
	Reducer,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import searchReducer from './components/containers/SearchContainer/store/searchReducer';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Enabling the Redux Dev tools for development mode:
const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer: Reducer = combineReducers({
	search: searchReducer,
});

const store: Store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
