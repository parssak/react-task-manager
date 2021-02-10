import React from 'react';
import ItemList from './ItemList';
// import EditItem from './EditItem';

const ItemListView = ({sort, selectItem, selectedItem}) => {
    return (
        <div className="item-list-view" >
            <ItemList sort={sort} select={selectItem} selectedItem={selectedItem} />
            {/* {selectedItem !== null && <EditItem itemKey={selectedItem} />} */}
        </div>
    );
}

export default ItemListView;
