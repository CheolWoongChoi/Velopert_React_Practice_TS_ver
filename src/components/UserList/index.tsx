import * as React from 'react';

export type User = {
	id: number;
	username: string;
	email: string;
}

type UserProps = {
	user: User
}

type UserListProps = {
	users: User[]
}

function User({ user }: UserProps) {
  return (
    <div>
      <b>{user.username}</b> 
			<span>({user.email})</span>
    </div>
  );
}

function UserList({ users }: UserListProps) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;