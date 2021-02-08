import React from 'react';
import getDateValues from '../helper-functions/getDateValues';
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const Header = () => {
    let [day, month, year, dayOfWeek] = getDateValues(new Date());
    
    console.log(day, month, year, dayOfWeek);
    return (
        <div className="header">
            <h1>{`Today is ${daysOfWeek[dayOfWeek]}, ${month} ${day}`}</h1>
        </div>
    );
}

export default Header;
