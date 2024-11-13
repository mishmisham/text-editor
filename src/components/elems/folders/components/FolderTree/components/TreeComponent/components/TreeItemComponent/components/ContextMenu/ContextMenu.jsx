import React, { useContext, useMemo } from "react";
import './ContextMenu.sass';
import useAddEventListener from '@/hooks/useAddEventListener';

import FileContext from '@/components/app/context/FileContext/FileContext.js'
import FolderTreeContext from '../../../../../../context/FolderTreeContext.js';

const ContextMenu = ({
    item,
    leftPadding,
    deleteTreeItem,
}) => {

    const {
        checkForMayCutOrCopyHereHere
    } = useContext(FileContext);

    const {
        cutOrCopyItem,
        startRenameItem,
        setCutOrCopyItem,
        setContextMenuItem,
        confirmDeleteModal,

        // folder context usage
        createFile,
        createFolder,
        pasteFolderItem,
    } = useContext(FolderTreeContext);

    const isFolder = item.type === 'folder';
    const mayPaste = useMemo(() => {
        return isFolder && cutOrCopyItem && checkForMayCutOrCopyHereHere(cutOrCopyItem, item, cutOrCopyItem.mode === 'copy');
    }, [checkForMayCutOrCopyHereHere, cutOrCopyItem, isFolder, item]);

    const actions = [

        isFolder && {
            title: '+ File',
            action: () => createFile(item.id)
        },
        isFolder && {
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
        mayPaste && {
            title: 'Paste',
            action: () => pasteFolderItem(cutOrCopyItem.item, item, false, true)
        },
        mayPaste && {
            title: 'Paste & replace',
            action: () => pasteFolderItem(cutOrCopyItem.item, item, true, true)
        },
        {
            title: 'Rename',
            action: () => startRenameItem(item.id)
        },
        {
            title: 'Delete',
            action: () => confirmDeleteModal?.current?.openModal(item)
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