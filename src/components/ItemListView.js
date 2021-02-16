import React, { useState, useRef } from 'react';
import ItemList from './ItemList';
import EditItem from './EditItem';

const DURATION = "DURATION";
const DATE = "DATE";
const TAG = "TAG";
const TODAY = "TODAY";

const sortOptions = [DURATION, DATE, TAG, TODAY];
const ItemListView = () => {
    const [sort, setSort] = useState(sortOptions[2]);
    const [selectedItem, setSelectedItem] = useState(null);
    const view = useRef()
    function selectItem(key) {
        setSelectedItem(key);
    }
    let width = 1000;
    if (view.current) {
        width = view.current.clientWidth
        console.log(width);
    }

    return (
        <div
            className={`item-list-view ${width < 500 && "v-wrapper"}`}
            ref={view}
            
        >
            
            
            <ItemList sort={sort} select={selectItem} selectedItem={selectedItem} />
            {selectedItem &&
                <div className={width < 500 && "v-wrapper"}>
                    <EditItem itemKey={selectedItem} cancel={() => selectItem(false)} />
                    <div className="h-wrapper">
                        <button className="settings-button glassy-inner" onClick={() => setSort(sortOptions[0])}>Duration</button>
                        <button className="settings-button glassy-inner" onClick={() => setSort(sortOptions[1])}>Date</button>
                        <button className="settings-button glassy-inner" onClick={() => setSort(sortOptions[2])}>Tag</button>
                        <button className="settings-button glassy-inner" onClick={() => setSort(sortOptions[3])}>Today</button></div>
                </div>
            }
        </div>
    );
}

export default ItemListView;
