

export const createNewView = (switchToNew=false, withFile=null, contextData) => {
    const {
        views,
        setViews,
        currentView,
        setCurrentView,
    } = contextData;

    const newViewArray = withFile ? [withFile] : [];
    setViews([...views, newViewArray]);

    if (switchToNew) {
        setCurrentView({
            ...currentView,
            file: withFile,
            view: views.length
        });
    }
}