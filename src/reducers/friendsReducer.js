import * as friends from '../actions/constants';

const loadFromStorage = (friends) => {
  const loadedData = localStorage.getItem('redux_localstorage_simple');
  if (!loadedData) return [];
  if (friends === 'all') return JSON.parse(loadedData).friends.allFriends;
  if (friends === 'selected')
    return JSON.parse(loadedData).friends.selectedFriends;
};

const removeFriend = (friends, id) => {
  const idx = friends.findIndex((friend) => friend.id === id);
  const before = friends.slice(0, idx);
  const after = friends.slice(idx + 1);
  return [...before, ...after];
};

// const fn = (arr, id) => {
//   if(arr.some(item => item.id === id)) {

//   }
// }

const initialState = {
  allFriends: loadFromStorage('all'),
  allLoading: false,
  selectedFriends: loadFromStorage('selected'),
  selectedFriendsLoading: false
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case friends.ALL_FRIENDS_LOADING:
      return { ...state, allLoading: true };
    case friends.ALL_FRIENDS_FETCHED:
      return { ...state, allFriends: action.payload, allLoading: false };
    case friends.MOVE_FRIEND_TO_SELECTED:
      const allFriendsArr = [...state.allFriends];
      return {
        ...state,
        allFriends: removeFriend(allFriendsArr, action.payload),
        selectedFriends: [
          ...state.selectedFriends,
          allFriendsArr.find((friend) => friend.id === action.payload)
        ]
      };
    case friends.MOVE_FRIEND_TO_ALL:
      const selectedFriendsArr = [...state.selectedFriends];
      return {
        ...state,
        selectedFriends: removeFriend(selectedFriendsArr, action.payload),
        allFriends: [
          ...state.allFriends,
          selectedFriendsArr.find((friend) => friend.id === action.payload)
        ]
      };
    default:
      return state;
  }
};

export default friendsReducer;
