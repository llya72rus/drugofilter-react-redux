import React, { Component } from 'react';
import logo from './logo.svg';
import './scss/style.scss';
import {
  loadFriends,
  moveFriendToSelected,
  moveFriendToAll,
  filterAllFriends,
  filterSelectedFriends
} from './actions';
import { connect } from 'react-redux';
import Friend from './components/Friend';
import * as utils from './utils';
const filterFriendsList = (elem, val) =>
  utils.isMatching(elem.first_name, elem.last_name, val);
class App extends Component {
  state = {
    allSearch: '',
    selectedSearch: ''
  };
  componentDidMount = () => {
    if (!localStorage.getItem('redux_localstorage_simple')) {
      this.props.loadFriends();
    }
  };

  moveFriendToSelected = (id) => {
    this.props.moveFriendToSelected(id);
  };

  moveFriendToAll = (id) => {
    this.props.moveFriendToAll(id);
  };

  handleAllFriendsInputChange = (e) => {
    this.props.filterAllFriends(e.target.value);
  };

  handleSelectedFriendsInputChange = (e) => {
    this.props.filterSelectedFriends(e.target.value);
  };

  render() {
    const { allFriendsloading, allFriends, selectedFriends } = this.props;
    return (
      <div className='wrapper'>
        <a href='/' className='logo'>
          <img src={logo} alt='Logo' className='logo__img' />
        </a>
        <div className='panel'>
          <div className='panel__top'>
            <b className='panel__top-text'>Выберите друзей</b>
            <button type='button' className='panel__close' />
          </div>
          <div className='panel__filters'>
            <div className='panel__filters-wrapper'>
              <input
                type='text'
                id='initial-list-input'
                placeholder='Начните вводить имя друга'
                className='panel__filters-input'
                onChange={this.handleAllFriendsInputChange}
              />
            </div>
            <div className='panel__filters-wrapper'>
              <input
                type='text'
                id='selected-list-input'
                placeholder='Начните вводить имя друга'
                onChange={this.handleSelectedFriendsInputChange}
                className='panel__filters-input'
              />
            </div>
          </div>
          <div className='panel__friends-wrapper'>
            <div className='panel__friends-container'>
              <span className='panel__friends-list-title'>Ваши друзья</span>
              {allFriendsloading ? (
                <div>Loading ...</div>
              ) : (
                <ul className='friends'>
                  {allFriends.map(({ id, first_name, last_name, photo_50 }) => (
                    <Friend
                      id={id}
                      moveFriend={this.moveFriendToSelected}
                      key={id}
                      first_name={first_name}
                      last_name={last_name}
                      photo_50={photo_50}
                    />
                  ))}
                </ul>
              )}
            </div>
            <div className='panel__friends-container'>
              <span className='panel__friends-list-title'>Друзья в списке</span>
              <ul className='friends friends-selected'>
                {selectedFriends.map(
                  ({ id, first_name, last_name, photo_50 }) => (
                    <Friend
                      id={id}
                      moveFriend={this.moveFriendToAll}
                      key={id}
                      first_name={first_name}
                      last_name={last_name}
                      photo_50={photo_50}
                      selected
                    />
                  )
                )}
              </ul>
            </div>
          </div>
          <div className='panel__bottom'>
            <button className='panel__btn clear-btn'>Сбросить</button>
            <button className='panel__btn save-btn'>Сохранить</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allFriends: state.friends.allFriends.filter((friend) =>
    filterFriendsList(friend, state.filterFriends.filterAllFriends)
  ),
  selectedFriends: state.friends.selectedFriends.filter((friend) =>
    filterFriendsList(friend, state.filterFriends.filterSelectedFriends)
  ),
  allFriendsloading: state.friends.allFriendsloading
});
const mapDispatchToProps = (dispatch) => ({
  loadFriends() {
    dispatch(loadFriends());
  },
  moveFriendToSelected(id) {
    dispatch(moveFriendToSelected(id));
  },
  moveFriendToAll(id) {
    dispatch(moveFriendToAll(id));
  },
  filterAllFriends(val) {
    dispatch(filterAllFriends(val));
  },
  filterSelectedFriends(val) {
    dispatch(filterSelectedFriends(val));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
