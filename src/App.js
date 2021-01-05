import React, { useState, useEffect } from 'react';
import './scss/App.scss';
import './scss/input.scss';
import { secretSantaShuffeled, secretSantaPair } from './helpers';
import Logo from './components/Logo';
import MainContent from './components/MainContent';

/// Users number range
const minInput = 3;
const maxInput = 1000;

/// Initial states
const initialInputErrorState = 'How many users to load?';
const initialUsersNumber = 15;

function getUsers(number) {
  return fetch(`https://randomuser.me/api/?results=${number}&nat=US&inc=name,email,picture,location,dob`)
    .then(data => data.json())
}

function App() {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState(initialUsersNumber);
  const [inputError, setInputError] = useState(initialInputErrorState);
  const [selectedUser, setSelectedUser] = useState({});

  const inputOnChange = ({ target }) => {
    if (target.value > maxInput) {
      setInputError("Number is too big")
    } else if (target.value < minInput) {
      setInputError("Number is too small")
    } else {
      setInputError(initialInputErrorState)
    }

    setInputValue(target.value);
  }

  const loadPeopleOnEnter = (event) => {
    if (event.key === 'Enter') {
      uploadUsersOnClick(inputValue);
    }
  }

  /// Load people from API on mount/render page
  useEffect(() => {
    getUsers(initialUsersNumber)
      .then(items => {
        setUsers(items.results)
        setSelectedUser(items.results[0])
      })
  }, []);

  /// Pair people with saving oeder
  const pairOnClick = () => {
    const usersCopy = secretSantaPair(users);
    setUsers(usersCopy);
  }

  /// Pair people without saving order
  const pairWithShuffleOnClick = () => {
    const paired = secretSantaShuffeled(users);

    // Set new users state
    setUsers(paired);
  }

  /// Upload selected number of user on click
  const uploadUsersOnClick = () => {
    if (inputValue < maxInput && inputValue > minInput) {
      getUsers(inputValue)
        .then(items => {
          setUsers(items.results)
          setSelectedUser(items.results[0])
        })
    }
  }

  return (
    <>
      <header className="wrapper small-header">
        <Logo>Secret Santa</Logo>
        <div className="wrapper__search">
          <div className="wrapper__search-input">
            <input
              id="numberInput"
              name="number"
              type="number"
              value={inputValue}
              min={minInput}
              max={maxInput}
              step="1"
              onChange={inputOnChange}
              onKeyPress={loadPeopleOnEnter} />
            <label htmlFor="numberInput">{inputError}</label>
          </div>
          <button className="secondary" onClick={uploadUsersOnClick}>Load users</button>
          <div className="wrapper__border-vertical"></div>
          <button onClick={pairWithShuffleOnClick}>Pair Them With Shuffle!</button>
          <button onClick={pairOnClick}>Pair Them!</button>
        </div>
      </header>
      <MainContent
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}>
      </MainContent>
    </>
  );
}

export default App;
