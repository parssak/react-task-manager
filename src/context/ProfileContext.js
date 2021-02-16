import React from 'react';
const ProfileContext = React.createContext({
    profile: {
        items: [],
        prefs: {}
    },
    profileDispatch: () => { }
});

export { ProfileContext as default };
