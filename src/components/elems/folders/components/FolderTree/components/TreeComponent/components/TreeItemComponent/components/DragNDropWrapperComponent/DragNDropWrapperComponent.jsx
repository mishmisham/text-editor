import useDebounced from '@/hooks/useDebounced';
import React, { useContext } from "react";

import FolderTreeContext from '../../../../../../context/FolderTreeContext.js';

const DragNDropWrapperComponent = ({
    item,
    wrapperClass,
    leftPadding,
    children
}) => {
    
    const {
        currentSelected,
        mouseDownItem,
        setMouseDownItem,
        mouseOverItem,
        setMouseOverItem,
        openFolder,
        cutOrCopyItem,
        setCutOrCopyItem,
        pasteFolderItem,
        addCopyOrCutItem,
        setupItemForActions
    } = useContext(FolderTreeContext);
    
    const refreshMouseOver = useDebounced(() => {
        const hoverIsAlreadyRegistered = mouseOverItem?.id === item.id;
        if (!mouseDownItem?.id || hoverIsAlreadyRegistered) {
            return;
        }

        const currentHoverIsNotDraggingNow = mouseDownItem && mouseDownItem?.id !== item.id;
        const draggingItemIsNotAlreadyRegistered = (!cutOrCopyItem || cutOrCopyItem?.id !== mouseDownItem?.id);
        if (currentHoverIsNotDraggingNow && draggingItemIsNotAlreadyRegistered) {
            addCopyOrCutItem(mouseDownItem, 'cut');
        }

        setMouseOverItem({
            ...item,
            openFolder: e=>openFolder(item.id)
        });
    }, 100);

    const onMouseDown = (e) => {
        if (currentSelected !== item.id) {
            return;
        }
        const actionItem = setupItemForActions(item);
        setMouseDownItem(actionItem);
    }

    const onMouseOver = (e) => {
        refreshMouseOver();
    }

    const onMouseUp = async (e) => {
        const itWasJustClick = mouseDownItem && mouseDownItem.id === item.id;
        if (itWasJustClick) {
            setMouseDownItem(null);
        }

        const draggableWasRegisteredButItWasClick = cutOrCopyItem && cutOrCopyItem?.id === item.id;
        if (draggableWasRegisteredButItWasClick) {
            setCutOrCopyItem(null);
        }

        if (!mouseDownItem || itWasJustClick || draggableWasRegisteredButItWasClick) {
            return;
        }

        pasteFolderItem(item);
    }

    const onMouseLeave = () => {
        setMouseOverItem(null);
    }

    const itemStyles = {
        paddingLeft: 32 + leftPadding + 'px',
    }

    return (
        <div
            onMouseUp={onMouseUp}
            onTouchEnd={onMouseUp}
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
            onMouseOver={onMouseOver}
            onTouchMoveCapture={onMouseOver}
            onMouseLeave={onMouseLeave}
            className={wrapperClass}
            style={itemStyles}
        >
            { children }
        </div>
    )
}

export default DragNDropWrapperComponent;