import React, { useContext, useMemo } from "react";

import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';
import FolderTreeContext from '../../../../../../context/FolderTreeContext.js';

const ItemDefaultMainContent = ({
    item,
    itemIcon,
    isFolder,
    isOpen,
    iterationKey,
    itemIsSelectedToGroup,
    itemIsExcludedFromGroup,
    parentIsSelectedToGroup,
    parentIsExcludedFromGroup,
}) => {

    const {
        openFileToCurrentView
    } = useContext(ViewContext);

    const {
        openFolder,
        closeFolder,
        setCurrentSelected,

        openContextMenu,
        toggleToGroupActionsItemSelection,
        toggleExcludeFromGroupActions,
    } = useContext(FolderTreeContext);
    
    const toggleItem = () => {
        if (isFolder) {
            isOpen ? closeFolder(item.id) : openFolder(item.id);
        } else {
            openFileToCurrentView(item.id);
        }

        setCurrentSelected(item.id);
    }

    const toggleContextMenu = () => {
        setTimeout(() => {
            openContextMenu({
                ...item,
                iterationKey,
                parentIsSelectedToGroup
            });
        })
    }

    let selectionButtonClassName = '';
    if (itemIsSelectedToGroup) {
        selectionButtonClassName = 'folder-tree-item_item-actions-item--selected';
    }

    if (parentIsSelectedToGroup) {
        selectionButtonClassName = 'folder-tree-item_item-actions-item--selected-parent';
    } 
    
    if (itemIsExcludedFromGroup || parentIsExcludedFromGroup) {
        selectionButtonClassName = 'folder-tree-item_item-actions-item--selected-excluded';
    } 

    const toggleToSelection = () => {
        if (parentIsExcludedFromGroup) {
            return;
        }
        
        if (parentIsSelectedToGroup) {
            toggleExcludeFromGroupActions(item);
        } else {
            toggleToGroupActionsItemSelection(item);
        }
    }
    return (
        ( <>
            <div className="folder-tree-item_item-actions">
                <button
                    onClick={toggleToSelection}
                    title="Выбрать"
                    style={{fontSize: '4.5px', marginTop:'3.5px', paddingLeft: '2px'}}
                    className={selectionButtonClassName}
                >
                    ●
                </button>
                <button
                    onClick={toggleContextMenu}
                    title="Меню"
                >
                   ⌘
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