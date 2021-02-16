const prefsReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_PREFS':
            console.log('called_populate_prefs', state, action)
            return action.items;
        default:
            return state;
    }
};

export { prefsReducer as default };
