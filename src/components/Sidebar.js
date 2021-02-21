import React, {useEffect} from 'react';

const Sidebar = ({ showNav, toggleNav, toggleSettings }) => {
    useEffect(() => {
            let sideBarWidth = "20ch"
            if (showNav) {
                document.getElementById("mySidebar").style.width = sideBarWidth;
                document.getElementById("main").style.marginLeft = sideBarWidth;
                document.getElementById("mySidebar").style.padding = "initial";
            }
            else {
                document.getElementById("mySidebar").style.width = "0";
                document.getElementById("mySidebar").style.padding = "0";
                document.getElementById("mySidebar").style.borderWidth = "0";
                document.getElementById("main").style.marginLeft = "0";
            }
    }, [showNav]);

    return (
        <div id="mySidebar" className="sidebar left">
            <button className="sidebar-item" onClick={() => toggleNav()}>{`<<`}</button>
            <button className="sidebar-item" onClick={() => toggleSettings()}>{`Settings`}</button>
        </div>
    );
}

export default Sidebar;
