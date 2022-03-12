import {createStore, combineReducers,applyMiddleware, compose} from 'redux';
import {createForms} from 'react-redux-form';
import { User } from './user';
import { Profile } from './profile';
import { error } from './errors';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        combineReducers({
            user: User,
            profile: Profile,
            error: error,
            ...createForms({

            })
        }),
        storeEnhancers(applyMiddleware(thunk, logger))
        
    ); 
 
    return store;
}
