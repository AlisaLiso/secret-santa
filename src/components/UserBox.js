import React from 'react'
import '../scss/user-box.scss';

function UserBox({ user, setSelectedUser }) {
  const setCurrentUser = (user) => {
    setSelectedUser(user)
  }

  return (
    <div className="user-box">
      {user?.name?.first ? (
        <>
          <div className="user-box__image">
            <img src={user.picture?.large} alt={`${user.name.first} ${user.name.last}`} />
          </div>

          <div className="user-box-wrapper">
            {/* Name/Age */}
            <h1>{user.name.first} {user.name.last}, {user.dob.age}</h1>

            {/* Location */}
            <div className="user-box__location">
              <b>Location:</b> {user.location.city}, {user.location.state}, {user.location.country}
            </div>

            {/* Email */}
            <div className="user-box__email">
              <b>Email:</b> {user.email}
            </div>

            <div className="user-box__border"></div>

            {/* Recivier */}
            <div className="user-box__recivier">
              {user.receiver ? (
                <div
                  className="user-box__recivier-wrapper"
                  onClick={() => setCurrentUser(user.receiver)}>
                  Gives to
                  <div className="user-box__recivier-box">
                    <img src={user.receiver.picture.thumbnail} alt="" />
                    <div className="user-box__recivier-name">
                      <div>{user.receiver.name.first}</div>
                      <div>{user.receiver.name.last}</div>
                    </div>
                  </div>
                </div>
              ) : (
                  <div className="user-box__recivier-name">
                    You need to pair them
                  </div>
                )
              }
            </div>
          </div>
        </>
      ) : (
          <p>No user selected</p>
        )}
    </div>
  )
}

export default UserBox;
