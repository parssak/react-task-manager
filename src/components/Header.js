import React from 'react';

/**
 * {selectedItem &&
                <div className="edit-section view-section">
                    <EditItem itemKey={selectedItem} cancel={() => selectItem(false)} />
                </div>
            }
 */
const Header = () => {
    return (
        <div className="header">
            <h1>{`Today is ${new Date().toDateString()}`}</h1>
        </div>
    );
}

export default Header;
