import React from 'react';
import ItemList from './ItemList';

const ItemListView = ({ sort, selectItem, selectedItem }) => {

    return (
        <div className="item-list-view" >

            <ItemList sort={sort} select={selectItem} selectedItem={selectedItem} />
        </div>
    );
}

export default ItemListView;
