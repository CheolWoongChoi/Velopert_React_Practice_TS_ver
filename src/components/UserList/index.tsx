import * as React from 'react';
import { useContext } from 'react';
import { UserDispatch, TOGGLE_USER, REMOVE_USER } from 'src/App';

export type User = {
	id: number;
	username: string;
	email: string;
  active: boolean;
}

type UserProps = {
	user: User;
}

type UserListProps = {
	users: User[];
}

const User = React.memo(
  function User({ user }: UserProps) {
    const dispatch = useContext(UserDispatch);

    React.useEffect(() => {
      console.log('User...');
      console.log(user);
    });

    return (
      <div>
        <b
          style={{
            cursor: 'pointer',
            color: user.active ? 'green' : 'black'
          }}
          onClick={() => {
            dispatch({ type: TOGGLE_USER, id: user.id });
          }} 
        >
          {user.username}
        </b> 
        <span>({user.email})</span>
        <button 
          onClick={() => {
            dispatch({ type: REMOVE_USER, id: user.id});
          }}>삭제</button>
      </div>
    );
  }
);

function UserList({ users }: UserListProps) {
  React.useEffect(() => {
    console.log('UserList...');
  });

  return (
    <div>
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}

export default React.memo(UserList);