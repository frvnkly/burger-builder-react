import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
	ingredients: null,
  totalPrice: 4,
  error: false,
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
    case (actionTypes.SET_INGREDIENTS):
      newState.ingredients = action.ingredients;
      newState.error = false;
      return newState;
    case (actionTypes.FETCH_INGREDIENTS_FAILED):
      newState.error = true;
      return newState;
    default:
      return state;
  }
};

export default reducer;