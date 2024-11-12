import React, { useContext, useMemo } from "react";
import './ContextMenu.sass';
import useAddEventListener from '@/hooks/useAddEventListener';

import FileContext from '@/components/app/context/FileContext/FileContext.js'
import FolderTreeContext from '../../../../../../context/FolderTreeContext.js';

const ContextMenu = ({
    item,
    leftPadding,
    deleteItem,
}) => {

    const {
        moveFile,
        addCopyOfItem,
        checkForMayCutOrCopyHere
    } = useContext(FileContext);

    const {
        cutOrCopyItem,
        startRenameItem,
        setCutOrCopyItem,
        setContextMenuItem,
    } = useContext(FolderTreeContext);

    const mayPaste = useMemo(() => {
        return item.type === 'folder' && cutOrCopyItem && checkForMayCutOrCopyHere(cutOrCopyItem, item, cutOrCopyItem.mode === 'copy');
    }, [checkForMayCutOrCopyHere, cutOrCopyItem, item]);

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
                    moveFile(cutOrCopyItem.item, item);
                    setCutOrCopyItem(null);
                }
                if (cutOrCopyItem.mode === 'copy') {
                    addCopyOfItem(cutOrCopyItem.item, item);
                }
                closeContextMenu();
            }
        } : null,

        mayPaste ? {
            title: 'Paste & replace',
            action: () => {
                if (cutOrCopyItem.mode === 'cut') {
                    moveFile(cutOrCopyItem.item, item, true);
                    setCutOrCopyItem(null);
                }
                if (cutOrCopyItem.mode === 'copy') {
                    addCopyOfItem(cutOrCopyItem.item, item, true);
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
                deleteItem();
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
    )
}

export default ContextMenu;