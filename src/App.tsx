import * as React from 'react';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './App.scss';

import CreateUser from 'components/CreateUser';
import { default as UserList, User } from 'components/UserList';

const cx = classNames.bind(styles);

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  }

	const users: User[] = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ];

	const nextId = useRef(4);

  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...
    
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </>
  );
}

export default App;