import * as friends from './constants';
import getFriendsFromVK from '../vkService';

export const friendsLoading = () => ({
  type: friends.ALL_FRIENDS_LOADING,
  loading: true
});

const friendsLoaded = (list) => ({
  type: friends.ALL_FRIENDS_FETCHED,
  loading: false,
  payload: list
});

export const loadFriends = () => async (dispatch) => {
  dispatch(friendsLoading());
  const f = await getFriendsFromVK();
  dispatch(friendsLoaded(f));
};

export const moveFriendToSelected = (id) => ({
  type: friends.MOVE_FRIEND_TO_SELECTED,
  payload: id
});

export const moveFriendToAll = (id) => ({
  type: friends.MOVE_FRIEND_TO_ALL,
  payload: id
});

export const filterAllFriends = (val) => ({
  type: friends.FILTER_ALL_FRIENDS,
  payload: val
});

export const filterSelectedFriends = (val) => ({
  type: friends.FILTER_SELECTED_FRIENDS,
  payload: val
});
