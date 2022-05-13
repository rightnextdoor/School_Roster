import {createStore, combineReducers,applyMiddleware, compose} from 'redux';
import {createForms} from 'react-redux-form';
import { User } from './UserCreators/user';
import { error } from './Errors/errors';
import { Photo } from './PhotoCreators/photo';
import { StudentUsers } from './UserCreators/studentUser';
import { TeacherUsers } from './UserCreators/teacherUser';
import { LeaderUsers } from './UserCreators/leaderUser';
import { AllRoster } from './Roster/allRoster';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        combineReducers({
            user: User,
            error: error,
            photo: Photo,
            studentUsers: StudentUsers,
            teacherUsers: TeacherUsers,
            leaderUsers: LeaderUsers,
            allRoster: AllRoster,
            ...createForms({

            })
        }),
        storeEnhancers(applyMiddleware(thunk, logger))
        
    ); 
 
    return store;
}
