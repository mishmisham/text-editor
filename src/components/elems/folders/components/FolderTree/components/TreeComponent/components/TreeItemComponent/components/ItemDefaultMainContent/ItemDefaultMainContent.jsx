import React, { useContext } from "react";

import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';
import FolderTreeContext from '../../../../../../context/FolderTreeContext.js';

const ItemDefaultMainContent = ({
    item,
    itemIcon,
    isFolder,
    isOpen,
}) => {

    const {
        openFileToCurrentView
    } = useContext(ViewContext);

    const {
        openFolder,
        closeFolder,
        setContextMenuItem,
        setCurrentSelected,
    } = useContext(FolderTreeContext);
    
    const toggleItem = () => {
        if (isFolder) {
            isOpen ? closeFolder(item.id) : openFolder(item.id);
        } else {
            openFileToCurrentView(item.id);
        }

        setCurrentSelected(item.id);
    }

    const openContextMenu = () => {
        setTimeout(() => {
            setContextMenuItem(item);
        })
    }

    return (
        ( <>
            <div className="folder-tree-item_item-actions">
                <button
                    onClick={openContextMenu}
                    title="Меню"
                >
                   ☰
                </button>
            </div>

            <button
                onClick={toggleItem}
                className="folder-tree-item_item-main"
            >
                <span className="folder-tree-item_type-icon">
                    {itemIcon}
                </span>

                <span className="folder-tree-item_name">
                { item.name }
                </span>
            </button>
            
        </> )
    )
}

export default ItemDefaultMainContent;