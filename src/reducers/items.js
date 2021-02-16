const itemsReducer = (state, action) => {
  console.log('called items reducer', state);
  switch (action.type) {
    case 'POPULATE_ITEMS':
      return action.items;
    case 'ADD_ITEM':
      console.log('called add_item');
      return [...state, action.item];
    case 'REMOVE_ITEM':
      console.log('state is rn', state);
      console.log('called remove_item');
      let removed = state.filter(item => item.key === action.itemToBeDeleted);
      let updatedArray = state;
      if (removed[0]) {
        let parent = state.filter(item => item.key === removed[0].data.parent)[0];
        if (parent) {
          let newParent = parent;
          newParent.data.children = parent.data.children.filter(child => child !== action.itemToBeDeleted);
          updatedArray = updatedArray.filter(e => e.key !== removed[0].data.parent);
          updatedArray.push(newParent);
        }
        if (removed[0].data.children.length > 0) {
          removed[0].data.children.forEach(c => {
            let child = updatedArray.filter(item => item.key === c)[0];
            if (child) {
              updatedArray = updatedArray.filter(item => item.key !== c);
              child.data.parent = removed[0].data.parent;
              updatedArray.push(child);
            }
          })
        }
      }
      updatedArray = updatedArray.filter((item) => item.key !== action.itemToBeDeleted);
      return updatedArray;
    case 'EDIT_ITEM':
      console.log('called edit_item');
      return state.map(item => {
        if (item.key === action.payload.key) {
          item = action.payload;
        }
        return item;
      })
    case 'ADD_CHILD':
      console.log('called add_child')
      let parent = state.filter(item => item.key === action.payload.parent);
      let child = state.filter(item => item.key === action.payload.child);
      if (parent !== null && child !== null) {
        parent = parent[0];
        child = child[0];
        if (!parent.data.children.includes(child.key)) {
          parent.data.children.push(child.key);
          child.data.parent = parent.key;
        }
      }
      let newItems = state.filter(item => item.key !== action.payload.parent);
      newItems = newItems.filter(item => item.key !== action.payload.child);
      newItems.push(parent);
      newItems.push(child);
      return newItems;
    case 'CLEAR_ALL':
      console.log("Cleared all items!");
      return [];
    default:
      return state;
  }
};

export { itemsReducer as default };
