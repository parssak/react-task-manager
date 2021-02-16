const prefsReducer = (state, action) => {
    let all = state;
    switch (action.type) {
        case 'CHANGE_GENERAL':
            console.log('called change_general');
            all.general = action.payload;
            break;
        case 'CHANGE_APPEARENCE':
            console.log('called change_appearence');
            all.appearence = action.payload;
            break;
        default:
            break;
    }
    localStorage.setItem('prefs', JSON.stringify(all));
    return all;
};

export { prefsReducer as default };
