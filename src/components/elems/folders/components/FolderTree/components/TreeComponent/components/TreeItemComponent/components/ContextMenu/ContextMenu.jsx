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
        moveTreeItemToFolder,
        pasteCopyOfTreeItem,
        checkForMayCutOrCopyHereHere
    } = useContext(FileContext);

    const {
        cutOrCopyItem,
        startRenameItem,
        setCutOrCopyItem,
        setContextMenuItem,
    } = useContext(FolderTreeContext);

    const mayPaste = useMemo(() => {
        return item.type === 'folder' && cutOrCopyItem && checkForMayCutOrCopyHereHere(cutOrCopyItem, item, cutOrCopyItem.mode === 'copy');
    }, [checkForMayCutOrCopyHereHere, cutOrCopyItem, item]);

    const actions = [
        {
            title: 'Copy',
            action: () => {
                setCutOrCopyItem({
                    item,
                    mode: 'copy'
                });
                closeContextMenu();
            }
        },
        {
            title: 'Cut',
            action: () => {
                setCutOrCopyItem({
                    item,
                    mode: 'cut'
                });
                closeContextMenu();
            }
        },
        
        mayPaste ? {
            title: 'Paste',
            action: () => {
                if (cutOrCopyItem.mode === 'cut') {
                    moveTreeItemToFolder(cutOrCopyItem.item, item);
                    setCutOrCopyItem(null);
                }
                if (cutOrCopyItem.mode === 'copy') {
                    pasteCopyOfTreeItem(cutOrCopyItem.item, item);
                }
                closeContextMenu();
            }
        } : null,

        mayPaste ? {
            title: 'Paste & replace',
            action: () => {
                if (cutOrCopyItem.mode === 'cut') {
                    moveTreeItemToFolder(cutOrCopyItem.item, item, true);
                    setCutOrCopyItem(null);
                }
                if (cutOrCopyItem.mode === 'copy') {
                    pasteCopyOfTreeItem(cutOrCopyItem.item, item, true);
                }
                closeContextMenu();
            }
        } : null,

        {
            title: 'Rename',
            action: () => {
                startRenameItem(item.id);
                closeContextMenu();
            }
        },
        {
            title: 'Delete',
            action: () => {
                deleteTreeItem();
                closeContextMenu();
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
                            onClick={action.action}
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