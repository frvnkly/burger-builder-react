import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
	ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const reducer = (state=initialState, action) => {
  // clone old state
  const newState = {
    ...state,
    ingredients: { ...state.ingredients },
  };

	switch (action.type) {
    case (actionTypes.ADD_INGREDIENT):
      newState.ingredients[action.ingredientName] += 1;
      newState.totalPrice += INGREDIENT_PRICES[action.ingredientName];
      return newState;
    case (actionTypes.REMOVE_INGREDIENT):
      newState.ingredients[action.ingredientName] -= 1;
      newState.totalPrice -= INGREDIENT_PRICES[action.ingredientName];
      return newState;
    default:
      return newState;
  }
};

export default reducer;