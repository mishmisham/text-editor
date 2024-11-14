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
        if (!mouseDownItem?.id || mouseOverItem?.id === item.id) {
            return;
        }

        if (mouseDownItem && mouseDownItem?.id !== item.id && (!cutOrCopyItem || cutOrCopyItem?.id !== mouseDownItem?.id)) {
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
        if (mouseDownItem && mouseDownItem.id === item.id) {
            setMouseDownItem(null);
        }

        if (cutOrCopyItem && cutOrCopyItem?.id === item.id) {
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