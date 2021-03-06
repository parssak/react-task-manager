const completeItem = (state, action) => {
  let completedItem = state.filter(item => item.key === action.payload.completedItem)[0];
  let newState = state.filter(item => item.key !== action.payload.completedItem);
  completedItem.completed = action.payload.completeStatus;
  newState.push(completedItem);
  return newState;
}

const removeItem = (state, action) => {
  let removed = state.filter(item => item.key === action.itemToBeDeleted);
  let newState = state;
  if (removed[0]) {
    let parent = state.filter(item => item.key === removed[0].data.parent)[0];
    if (parent) {
      let newParent = parent;
      newParent.data.children = parent.data.children.filter(child => child !== action.itemToBeDeleted);
      newState = newState.filter(e => e.key !== removed[0].data.parent);
      newState.push(newParent);
    }
    if (removed[0].data.children.length > 0) {
      removed[0].data.children.forEach(c => {
        let child = newState.filter(item => item.key === c)[0];
        if (child) {
          newState = newState.filter(item => item.key !== c);
          child.data.parent = removed[0].data.parent;
          newState.push(child);
        }
      })
    }
  }
  newState = newState.filter((item) => item.key !== action.itemToBeDeleted);
  return newState;
}

const addChild = (state, action) => {
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
    if (!parent.data.children.includes(child.key)) {
      parent.data.children.push(child.key);
    }
    child.data.parent = parent.key;
  }
  let newState = state.filter(item => item.key !== action.payload.parent);
  newState = newState.filter(item => item.key !== action.payload.child);

  if (action.payload.oldParent !== '' && action.payload.oldParent !== action.payload.parent) {
    let oldParent = state.filter(item => item.key === action.payload.oldParent)[0];
    let newChildren = oldParent.data.children;
    newChildren = newChildren.filter(item => item !== action.payload.child);
    oldParent.data.children = newChildren;
    newState = newState.filter(item => item.key !== action.payload.oldParent);
    newState.push(oldParent);
  }
  parent && newState.push(parent);
  child && newState.push(child);
  return newState;
} 

const itemsReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_ITEMS':
      return action.items;
    case 'ADD_ITEM':
      return [...state, action.item];
    case 'COMPLETE_ITEM':
      return completeItem(state, action);
    case 'REMOVE_ITEM':
      return removeItem(state, action);
    case 'EDIT_ITEM':
      return state.map(item => {
        if (item.key === action.payload.key) {
          let newVersion = action.payload;
          newVersion.completed = item.completed;
          item = newVersion;
        }
        return item;
      })
    case 'ADD_CHILD':
      return addChild(state, action);
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
