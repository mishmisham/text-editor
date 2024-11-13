

export const createNewView = (switchToNew=false, contextData) => {
    const {
        views,
        setViews,
        currentView,
        setCurrentView,
    } = contextData;
    setViews([...views, []]);

    if (switchToNew) {
        setCurrentView({
            ...currentView,
            file: null,
            view: views.length - 1
        });
    }
}