const itemsReducer = (state, action) => {
  console.log("items reducer enterd");
  switch (action.type) {
    case 'POPULATE_ITEMS':
      console.log("A");
      return action.items;
    case 'ADD_ITEM':
      console.log("B");
      return [...state, action.item];
    case 'REMOVE_ITEM':
      console.log("C");
      return state.filter((item) => item !== action.itemToBeDeleted);
    case 'EDIT_ITEM': // todo
      return state.map(item => {
        if (item.key === action.payload.key) {
          console.log(action.payload);
          item = action.payload; 
        }
        return item;
      })
    default:
      return state;
  }
};

export { itemsReducer as default };
