import { useReducer, useCallback } from 'react';

const CHANGE_INPUT = 'CHANGE_INPUT';
const RESET = 'RESET';

function reducer(state: any, action: any) {
	switch(action.type) {
		case CHANGE_INPUT: 
			return {
				...state,
				[action.payload.name]: action.payload.value
			}
		case RESET: {
			const newState: { [key: string]: string } = {};
			
			for (let prop in state) {
				newState[prop] = '';
			}

			return newState;
		}
		default: 
			return state;
	}
};

function useInputs(initialState: any) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		dispatch({
			type: CHANGE_INPUT,
			payload: {
				name: [name],
				value
			}
		});
	}, []);

	const reset = useCallback(() => {
		dispatch({ type: RESET })
	}, []);

	return [state, onChange, reset];
}


export default useInputs;