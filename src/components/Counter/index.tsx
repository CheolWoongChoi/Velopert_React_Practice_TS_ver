import * as React from 'react';
import { useReducer } from 'react';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function reducer(state: number, action: any) {
	switch (action.type) {
		case INCREMENT:
			return state + 1;
		case DECREMENT:
			return state - 1;
		default:
			return state;
	}
}

function Counter() {
	const [number, dispatch] = useReducer(reducer, 0);

	const onIncrease = () => {
		dispatch({ type: INCREMENT });
	}

	const onDecrement = () => {
		dispatch({ type: DECREMENT });
	}

	return (
		<div>
			<h1>{number}</h1>
			<button onClick={onIncrease}>+1</button>
			<button onClick={onDecrement}>-1</button>
		</div>
	);
};

export default Counter;
