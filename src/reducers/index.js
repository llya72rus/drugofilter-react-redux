import { combineReducers } from 'redux';
import friends from './friendsReducer';
import filterFriends from './filterFriends';

export default combineReducers({ friends, filterFriends });
