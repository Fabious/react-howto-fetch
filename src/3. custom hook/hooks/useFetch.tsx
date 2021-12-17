import { useEffect, useReducer } from 'react';
import axios from 'axios';

type State = {
  data: any;
  error: string | null;
};

type Actions =
  | {
      type: 'SUCCESS';
      payload: unknown;
    }
  | {
      type: 'ERROR';
      error: string;
    };

const initialState: State = {
  data: null,
  error: null,
};

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'SUCCESS':
      return {
        data: action.payload,
        error: null,
      };

    case 'ERROR':
      return {
        data: null,
        error: action.error,
      };

    default:
      return state;
  }
}

export const useFetch = (endpoint: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        dispatch({ type: 'SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error });
      });
  }, [endpoint]);

  return {
    data: state.data,
    error: state.error,
  };
};
