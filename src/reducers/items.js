const itemsReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_ITEMS':
      return action.items;
    case 'ADD_ITEM':
      return [...state, action.item];
    case 'REMOVE_ITEM':
      return state.filter((item) => item !== action.itemToBeDeleted);
    case 'EDIT_ITEM': // todo
      console.log(action.payload);
      break;
    default:
      return state;
  }
};

export { itemsReducer as default };
