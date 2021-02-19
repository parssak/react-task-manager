const itemsReducer = (state, action) => {
  console.log('called items reducer', state);
  switch (action.type) {
    case 'POPULATE_ITEMS':
      return action.items;
    case 'ADD_ITEM':
      console.log('called add_item');
      return [...state, action.item];
    case 'COMPLETE_ITEM':
      console.log('called compelte item')
      let completedItem = state.filter(item => item.key === action.payload.completedItem)[0];
      let completedItemVersion = state.filter(item => item.key !== action.payload.completedItem);
      completedItem.completed = action.payload.completeStatus;
      completedItemVersion.push(completedItem);
      return completedItemVersion;
    case 'REMOVE_ITEM':
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
          let newVersion = action.payload;
          newVersion.completed = item.completed;
          item = newVersion;
        }
        console.log('returning item!', item)
        return item;
      })
    case 'ADD_CHILD':
      console.log('called add_child')
      let parent = state.filter(item => item.key === action.payload.parent)[0];
      let child = state.filter(item => item.key === action.payload.child)[0];
      if (parent === undefined && child !== undefined) {
        child.data.parent = '';
        if (action.payload.oldParent !== '') {
          let new_parent = state.filter(item => item.key === action.payload.oldParent)[0];
          let updated_children = new_parent.data.children;
          updated_children = updated_children.filter(a => a !== action.payload.child);
          new_parent.data.children = updated_children;
          let updated_arr = state;
          updated_arr = updated_arr.filter(e => e.key !== child.key);
          updated_arr = updated_arr.filter(e => e.key !== new_parent.key);
          updated_arr.push(child);
          updated_arr.push(new_parent);
          return updated_arr;
        }
      }
      else if (parent !== undefined && child !== undefined) {
        console.log(parent, child)
        if (!parent.data.children.includes(child.key)) {
          parent.data.children.push(child.key);
        }
        child.data.parent = parent.key;
      } 
      let newItems = state.filter(item => item.key !== action.payload.parent);
      newItems = newItems.filter(item => item.key !== action.payload.child);

      if (action.payload.oldParent !== '' && action.payload.oldParent !== action.payload.parent) {
        let oldParent = state.filter(item => item.key === action.payload.oldParent)[0];
        let newChildren = oldParent.data.children;
        newChildren = newChildren.filter(item => item !== action.payload.child);
        oldParent.data.children = newChildren;
        newItems = newItems.filter(item => item.key !== action.payload.oldParent);
        newItems.push(oldParent);  
      }
      parent && newItems.push(parent);
      child &&  newItems.push(child);
      console.log(parent, child, newItems);
      return newItems;
    case 'CLEAR_ALL':
      console.log("Cleared all items!");
      return [];
    case 'CLEAR_ALL_COMPLETED':
      return state.filter(item => !item.completed);
    default:
      return state;
  }
};

export { itemsReducer as default };
