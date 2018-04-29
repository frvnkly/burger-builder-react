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
  building: false,
};

const reducer = (state=initialState, action) => {
	switch (action.type) {
    case (actionTypes.ADD_INGREDIENT):
      return modifyIngredients(state, action, 1);
    case (actionTypes.REMOVE_INGREDIENT):
      return modifyIngredients(state, action, -1);
    case (actionTypes.SET_INGREDIENTS):
      return setIngredients(state, action);
    case (actionTypes.FETCH_INGREDIENTS_FAILED):
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

const cloneState = state => {
  return {
    ...state,
    ingredients: { ...state.ingredients },
  };
};

const modifyIngredients = (state, action, n) => {
  const newState = cloneState(state);
  newState.ingredients[action.ingredientName] += n;
  newState.totalPrice += n * INGREDIENT_PRICES[action.ingredientName];
  newState.building = true;
  return newState;
};

const setIngredients = (state, action) => {
  const newState = cloneState(state);
  newState.ingredients = action.ingredients;
  newState.totalPrice = 4;
  newState.error = false;
  newState.building = false;
  return newState;
};

const fetchIngredientsFailed = (state, action) => {
  const newState = cloneState(state);
  newState.error = true;
  return newState;
};

export default reducer;