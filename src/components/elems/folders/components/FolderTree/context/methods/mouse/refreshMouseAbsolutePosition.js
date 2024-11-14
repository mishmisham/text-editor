

export const refreshMouseAbsolutePosition = (e, contextData) => {
    const {
        mouseDownItem,
        contentRef,
        renameID,
        setMouseMoveAbsoluteCoordinates
    } = contextData;

    if (!mouseDownItem || !contentRef.current || renameID) {
        return;
    }

    const {
        clientX,
        clientY
    } = e;

    const { left, top } = contentRef.current.getBoundingClientRect();

    setMouseMoveAbsoluteCoordinates({
        left: clientX - left,
        top: clientY - top,
    })
}