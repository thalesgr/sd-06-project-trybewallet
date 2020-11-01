import React, { Component } from 'react';
import { connect } from 'react-redux';
import { catchInputEntries } from '../actions';
import PropTypes from 'prop-types';
import fetchApi from '../services';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      forms: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState((prevState) => ({
      forms: {
        ...prevState.forms,
        [name]: value,
      }
    }));
  }

  async handleClick() {
    const { expenseState, dispachExpenses } = this.props;
    const currentCurrencies = await fetchApi();
    const currencies = Object.keys(currentCurrencies);
    const exchangeRates = currencies.reduce((obj, current) => {
      return {
        ...obj,
        [current]: {
          code: currentCurrencies[current].code,
          name: currentCurrencies[current].name,
          ask: currentCurrencies[current].ask,
        },
      };
    }, {});

    this.setState((prevState) => ({
      forms: {
        ...prevState.forms,
        id: expenseState.length,
        exchangeRates,
      }
    }));

    const { forms } = this.state;

    dispachExpenses(forms);
  }

  render() {
    const { handleChange } = this;
    const { currencieState } = this.props;
    
    return (
      <section>
        <label htmlFor="value-input" >
          Valor:
          <input required type="number" data-testid="value-input" name="value" onChange={ handleChange } />
        </label>
        <label htmlFor="currency-input" >
          Moeda:
          <select data-testid="currency-input" name="currency" onChange={ handleChange }>
            { currencieState.map((currency, index) => (
              <option key={index} data-testid={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input" >
          Método de Pagamento:
          <select data-testid="method-input" name="method" onChange={ handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input" >
          Tag:
          <select data-testid="tag-input" name="tag" onChange={ handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer ">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input" >
          Descrição:
          <input required data-testid="description-input" name="description" onChange={ handleChange } />
        </label>
        <button type="submit" onClick={this.handleClick}>Adicionar despesa</button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispachExpenses: (expenses) => dispatch(catchInputEntries(expenses)),
});

const mapStateToProps = (state) => ({
  expenseState: state.wallet.expenses,
  currencieState: state.wallet.currencies,
});

Forms.propTypes = {
  dispachExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
