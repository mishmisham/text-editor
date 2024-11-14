


import React, { useContext } from "react";
import FolderTreeContext from '../../../../context/FolderTreeContext.js';

const DraggingTreeItemMouseGhost = () => {

    const {
        mouseDownItem,
        mouseMoveAbsoluteCoordinates,
    } = useContext(FolderTreeContext);

    return (
        <>
        {
            mouseDownItem && mouseMoveAbsoluteCoordinates &&
            <div
                className="folder-tree_content_drag-n-drop-tooltip"
                style={{ ...mouseMoveAbsoluteCoordinates }}
            >
                { mouseDownItem.name }
            </div>
        }
        </>
    )
}

export default DraggingTreeItemMouseGhost;