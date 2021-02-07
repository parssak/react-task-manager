import React from 'react';

const TagsContext = React.createContext({
    tags: [
        {
            label: "CSC236",
            color: "green"
        }],
    tagsDispatch: () => { },
});

export { TagsContext as default };
