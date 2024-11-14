import React, { useContext, useMemo } from "react";
import './ContextMenu.sass';
import useAddEventListener from '@/hooks/useAddEventListener';

import FileContext from '@/components/app/context/FileContext/FileContext.js'
import FolderTreeContext from '../../../../../../context/FolderTreeContext.js';

const ContextMenu = ({
    item,
    leftPadding,
}) => {

    const {
        checkForMayCutOrCopyHere
    } = useContext(FileContext);

    const {
        cutOrCopyItem,
        mouseDownItem,
        mouseOverItem,
        startRenameItem,
        setCutOrCopyItem,
        setContextMenuItem,
        selectedToGroupActionsItems,

        // folder context usage
        createFile,
        createFolder,
        pasteFolderItem,
        deleteFolderItem,
    } = useContext(FolderTreeContext);

    const isFolder = item.type === 'folder';
    const oneSelectedMode = !selectedToGroupActionsItems.length;

    const mayPaste = useMemo(() => {
        return isFolder && !mouseOverItem && cutOrCopyItem && checkForMayCutOrCopyHere(cutOrCopyItem, item);
    }, [isFolder, mouseDownItem, mouseOverItem, cutOrCopyItem]);
   

    const actions = [

        isFolder && oneSelectedMode && {
            title: '+ File',
            action: () => createFile(item.id)
        },
        isFolder && oneSelectedMode && {
            title: '+ Folder',
            action: () => createFolder(item.id)
        },
        {
            title: 'Copy',
            action: () => setCutOrCopyItem({ mode: 'copy', item })
        },
        {
            title: 'Cut',
            action: () => setCutOrCopyItem({ mode: 'cut', item })
        },
        mayPaste && oneSelectedMode && {
            title: 'Paste',
            action: () => pasteFolderItem(cutOrCopyItem.item, item)
        },
        oneSelectedMode && {
            title: 'Rename',
            action: () => startRenameItem(item.id)
        },
        {
            title: 'Delete',
            action: () => deleteFolderItem(item)
        }
    ];

    const closeContextMenu = () => {
        setContextMenuItem(null);
    }

    useAddEventListener(document, 'click', (e) => {
        if (!e.target.closest('.folder-tree_context-menu')) {
            closeContextMenu();
        }
    })

    const onClick = (e, action) => {
        action();
        closeContextMenu();
    }

    const menuMargin = {
        marginLeft: -4 + leftPadding + 'px'
    }
    
    return (
        <div
            className="folder-tree_context-menu"
            style={menuMargin}
        >
            <div className="folder-tree_context-menu-inner">
            {
                actions.map((action, i) => {
                    return (
                        action &&
                        <button
                            onClick={e=>onClick(e, action.action)}
                            className="folder-tree_context-menu-item"
                            title={action.title}
                            key={i}
                        >
                            <span>
                                { action.title }
                            </span>
                        </button>
                    )
                })
            }
            </div>
        </div>
    )
}

export default ContextMenu;