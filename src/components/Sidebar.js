import React, { useState } from 'react';

const Sidebar = ({collapsed}) => {

    return (
        <>
            {collapsed ?
                <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{ background: collapsed ? 'green' : 'blue' }}>
                </div>
                :
                <div className="bob">bob</div>
            }
        </>
    );
}

export default Sidebar;
