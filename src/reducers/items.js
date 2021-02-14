const itemsReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_ITEMS':
      return action.items;
    case 'ADD_ITEM':
      return [...state, action.item];
    case 'REMOVE_ITEM':
      return state.filter((item) => item.key !== action.itemToBeDeleted);
    case 'EDIT_ITEM': 
      console.log(action.payload);
      return state.map(item => {
        if (item.key === action.payload.key) {
          item = action.payload; 
        }
        return item;
      })
    case 'CLEAR_ALL':
      console.log("Cleared all items!");
      return [];
    default:
      return state;
  }
};

export { itemsReducer as default };
