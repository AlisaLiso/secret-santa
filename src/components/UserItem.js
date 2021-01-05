export default function userItem({ selectUserOnClick, user, selectedUser }) {
  return (
    <li
      onClick={() => selectUserOnClick(user)}
      className={`list-item ${selectedUser === user && "list-item__selected"}`}
    >
      <div className="list-item__img">
        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
        {user.receiver &&
          (
            <img className="list-item__img-reciver" src={user.receiver.picture.thumbnail} alt={`${user.receiver.name.first} ${user.receiver.name.last}`} />
          )
        }
      </div>
      <h3>{user.name.first} {user.name.last}</h3>
    </li>
  )
}
