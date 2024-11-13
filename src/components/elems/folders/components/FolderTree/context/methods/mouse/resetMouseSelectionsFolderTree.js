

export const resetMouseSelectionsFolderTree = (contextData) => {
    const {
        setMouseDownItem,
        setMouseOverItem,
        setMouseMoveAbsoluteCoordinates
    } = contextData;
    
    setMouseDownItem(null);
    setMouseOverItem(null);
    setMouseMoveAbsoluteCoordinates(null);
}