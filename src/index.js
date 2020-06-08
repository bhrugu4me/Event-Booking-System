import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './containers/app';

const redux = configureStore();

export default render(
	<Provider store={redux.store}>
		<PersistGate persistor={redux.persistor}>
			<ConnectedRouter history={redux.history}>
				<App />
			</ConnectedRouter>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
