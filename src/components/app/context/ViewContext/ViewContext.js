import { createContext } from 'react';

export default createContext({
    views: [],
    currentView: {
        view: 0,
        file: null,
    },
    setViews: () => {},
    setCurrentView: () => {}
});
