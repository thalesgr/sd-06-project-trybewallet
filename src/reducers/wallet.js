// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCH_CURRENCIES_SUCCESS,
  EXPENSES_SAVE,
  ADDTOTAL,
  DELETE_ITEM,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  id: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return (
      {
        ...state,
        currencies: [...state.currencies, ...Object.keys(action.currencies)]
          .filter((currency) => currency !== 'USDT'),
      }
    );
  case EXPENSES_SAVE:
    return (
      {
        ...state,
        expenses: [...state.expenses, { ...action.expenses, id: state.id }],
        id: state.id + 1,
      }
    );
  case ADDTOTAL:
    return (
      {
        ...state,
        total: state.total + action.total,
      }
    );
  case DELETE_ITEM:
    return (
      {
        ...state,
        expenses: state.expenses.filter((expenses) => expenses.id !== action.id),
      }
    );
  default:
    return state;
  }
}
