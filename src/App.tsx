import * as React from 'react';
import { useReducer, useMemo } from 'react';
import classNames from 'classnames/bind';
import CreateUser from 'components/CreateUser';
import { default as UserList, User } from 'components/UserList';
import styles from './App.scss';

const cx = classNames.bind(styles);

export const CREATE_USER = 'CREATE_USER';
export const TOGGLE_USER = 'TOGGLE_USER';
export const REMOVE_USER = 'REMOVE_USER';

function countActiveUsers(users: User[]) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
}

function reducer(state = initialState, action: any) {
  switch(action.type) {
    case CREATE_USER:
      return {
        users: state.users.concat(action.user)
      };
    case TOGGLE_USER:
      return {
        ...state,
        users: state.users.map((user: User) =>
          user.id === action.id ? { ...user, active: !user.active } : user  
        )
      };
    case REMOVE_USER:
      return {
        users: state.users.filter((user: User) => user.id !== action.id)
      };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext<any>(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <main className={cx('app-main')}>
      <UserDispatch.Provider value={dispatch}>
        <CreateUser />
        <UserList users={users} />
        <div>활성 사용자 수 : {count}</div>
      </UserDispatch.Provider>
    </main>
  );
}

export default App;