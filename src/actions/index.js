import getCurrencyList from '../services/currencyAPI';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCY = 'ADD_CURRENCY';
export const FETCHING_LIST = 'FETCHING_LIST';

export const emailLogin = (value) => ({ type: LOGIN, value });

export const addExpense = (value) => ({ type: ADD_EXPENSE, value });

export const addCurrency = (value) => ({ type: ADD_CURRENCY, value });

export const fetchingList = () => ({ type: FETCHING_LIST });

export const fetchCurrencyList = () => (
  async (dispatch) => {
    dispatch(fetchingList());

    const currencyList = await getCurrencyList('USDT');
    const currencyArray = Object.keys(currencyList)
      .map((currency) => currencyList[`${currency}`]);
    dispatch(addCurrency(currencyArray));
  }
);
