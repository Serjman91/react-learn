import { createStore, compose, applyMiddleware } from 'redux';
import { createMigrate, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import { migrations, lastVersion } from './storeMigrations';

function middleware({ dispatch, getState }) {
    return (next) => (action) => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
        return next(action);
    };
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
    version: lastVersion,
    migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(middleware)));
const persistor = persistStore(store);
export { store, persistor };