import * as React from 'react';
import { useRef, useContext } from 'react';
import { UserDispatch, CREATE_USER } from 'src/App';
import useInputs from 'hooks/useInputs';

function CreateUser() {
  const dispatch = useContext(UserDispatch);
  const [{ username, email }, onChange, reset] = useInputs({ 
    username: '', 
    email: ''
  });
  const nextId = useRef(4);

  React.useEffect(() => {
    console.log('CreateUser...');
  });

  return (
    <div>
      <input
        name='username'
        placeholder='계정명'
        onChange={onChange}
        value={username}
      />
      <input
        name='email'
        placeholder='이메일'
        onChange={onChange}
        value={email}
      />
      <button onClick={() => {
        dispatch({
          type: CREATE_USER,  
          user: {
            id: nextId.current,
            username,
            email,
            active: false
          }
        })

        reset();
        nextId.current += 1;
      }}>등록</button>
    </div>
  );
}

export default React.memo(CreateUser);