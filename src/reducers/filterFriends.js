import * as friends from '../actions/constants';
const initialState = {
  filterAllFriends: '',
  filterSelectedFriends: ''
};
export default (state = initialState, action) => {
  console.log(state);
  if (action.type === friends.FILTER_ALL_FRIENDS) {
    return { ...state, filterAllFriends: action.payload };
  }

  if (action.type === friends.FILTER_SELECTED_FRIENDS) {
    return { ...state, filterSelectedFriends: action.payload };
  }
  return state;
};
