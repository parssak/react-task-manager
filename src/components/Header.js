import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <h1>{`Today is ${new Date().toDateString()}`}</h1>
        </div>
    );
}

export default Header;
