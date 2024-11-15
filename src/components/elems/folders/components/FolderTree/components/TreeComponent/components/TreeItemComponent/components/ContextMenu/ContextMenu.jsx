import React, { useContext } from "react";
import './ContextMenu.sass';
import useAddEventListener from '@/hooks/useAddEventListener';

import FolderTreeContext from '../../../../../../context/FolderTreeContext.js';

const ContextMenu = ({
    leftPadding,
}) => {

    const {
        contextMenuItem,
        startRenameItem,
        setContextMenuItem,
        addCopyOrCutItem,

        // folder context usage
        createFile,
        createFolder,
        pasteFolderItem,
        deleteFolderItem,
        resetGroupActionSelection,
    } = useContext(FolderTreeContext);

    const {
        isFolder,
        mayPasteHere,
        groupMode,
        isSelectedInGroup,
        notInSelection,
        inGroupAction
    } = contextMenuItem;

    const actions = [
        isFolder && !isSelectedInGroup && {
            title: '+ File',
            action: () => {
                resetGroupActionSelection();
                createFile(contextMenuItem.id);
            }
        },
        isFolder && !isSelectedInGroup && {
            title: '+ Folder',
            action: () => {
                resetGroupActionSelection();
                createFolder(contextMenuItem.id);
            }
        },
        {
            title: 'Copy',
            action: () => addCopyOrCutItem(contextMenuItem, 'copy')
        },
        {
            title: 'Cut',
            action: () => addCopyOrCutItem(contextMenuItem, 'cut')
        },
        mayPasteHere && !isSelectedInGroup && {
            title: 'Paste',
            action: () => {
                pasteFolderItem(contextMenuItem);

                if (groupMode) {
                    resetGroupActionSelection();
                }
            }
        },
        !isSelectedInGroup && {
            title: 'Rename',
            action: () => {
                if (groupMode) {
                    resetGroupActionSelection();
                }
                startRenameItem(contextMenuItem.id)
            }
        },
        {
            title: 'Delete',
            action: () => {

                if (notInSelection) {
                    resetGroupActionSelection();
                    deleteFolderItem(contextMenuItem);
                } else if (inGroupAction) {
                    // delete all selected items
                }
                
            }
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