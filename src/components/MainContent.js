import React from 'react'
import UserBox from './UserBox';
import UserItem from './UserItem';


function MainContent({ users, setSelectedUser, selectedUser }) {

  const selectUserOnClick = (user) => {
    setSelectedUser(user);
  }

  return (
    <div className="wrapper">
      <div className="wrapper__content">
        <ul className="list wrapper__content-big">
          {users.length > 0 ?
            users.map((user, key) => (
              <UserItem
                key={key}
                selectedUser={selectedUser}
                selectUserOnClick={selectUserOnClick}
                user={user}
              />
            ))
            : <p> No people was found</p>
          }
        </ul>
        <div className="wrapper__content-small">
          <UserBox user={selectedUser} setSelectedUser={setSelectedUser} />
        </div>
      </div>
    </div>
  )
}

export default MainContent;
