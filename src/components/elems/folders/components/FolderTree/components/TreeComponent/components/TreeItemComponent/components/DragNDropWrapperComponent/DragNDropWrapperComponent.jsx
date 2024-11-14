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
        pasteFolderItem
    } = useContext(FolderTreeContext);
    
    const refreshMouseOver = useDebounced(() => {
        const hoverIsAlreadyRegistered = mouseOverItem?.id === item.id;
        if (!mouseDownItem?.id || hoverIsAlreadyRegistered) {
            return;
        }

        const currentHoverIsNotDraggingNow = mouseDownItem && mouseDownItem?.id !== item.id;
        const draggingItemIsNotAlreadyRegistered = (!cutOrCopyItem || cutOrCopyItem?.id !== mouseDownItem?.id);
        if (currentHoverIsNotDraggingNow && draggingItemIsNotAlreadyRegistered) {
            setCutOrCopyItem({
                mode: 'cut',
                item: mouseDownItem
            });
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
        setMouseDownItem(item);
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

        pasteFolderItem(mouseDownItem, item);
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