import React, { useContext } from 'react';
import ItemsContext from '../context/items-context';
import modifyItem from '../helper-functions/modifyItem';

const UpdateItemsPrompt = ({ tasks }) => {
    const { itemsDispatch } = useContext(ItemsContext);

    function moveAllToToday() {
        tasks.forEach(task => {
            const payload = modifyItem(task.label, task.duration, task.data.tag, new Date(), task.data.children, task.data.parent,task.key);
            itemsDispatch({ type: 'EDIT_ITEM', payload })
        })
    }

    function complete(key) {
        itemsDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: key });
    }

    return (
        <div className="update-items-prompt glassy">
            <h3>Old tasks</h3>
            <p>These tasks are overdue, what would you like to do?</p>
            <div className="items-container glassy">
                {
                    tasks.map((item) => (
                        <div className="item glassy-inner" key={item.key}>
                            <div className="center-align">
                                <button onClick={() => complete(item.key)}></button>
                            </div>
                            
                            <div className="center-align label">{item.label}</div>
                            <div className="center-align tag">
                                {item.data.tag.label !== "NULL" && <span className="tag" style={{ backgroundColor: item.data.tag.color }}>{item.data.tag.label}</span>}
                            </div>
                        </div>
                    ))
                }
            </div>
            <button className="glassy-inner"onClick={() => moveAllToToday()}>Move tasks to today</button>
        </div>
    );
}

export default UpdateItemsPrompt;
