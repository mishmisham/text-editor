

export const closeOneView = (viewIndex, contextData) => {
    const {
        views,
        currentView,
        setCurrentView,
        setViews
    } = contextData;
    
    const newViews = [...views];
    newViews.splice(viewIndex, 1);

    if (currentView.view === viewIndex && newViews.length) {
        setCurrentView({
            ...currentView,
            view: 0,
            file: newViews[0].length ? newViews[0][0] : null,
        });
    }

    if (!newViews.length) {
        setCurrentView({
            ...currentView,
            view: null,
            file: null,
        });
    }

    setViews(newViews);
}