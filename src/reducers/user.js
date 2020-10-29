import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email, password: action.password };
  default:
    return state;
  }
}

/*
uma funct que recebe um state global e retorna
um novo state baseado no TYPE da action.
*/
