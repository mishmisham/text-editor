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

        contextMenuItem,
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

    let selectItemButtonTitle = 'Выбрать';
    const isIncluded = itemIsSelectedToGroup || parentIsSelectedToGroup;
    const isExcluded = itemIsExcludedFromGroup || parentIsExcludedFromGroup;
    if (isIncluded && !isExcluded) {
        selectItemButtonTitle = 'Исключить';
    } else if (isExcluded)  {
        selectItemButtonTitle = 'Включить';
    } 

    const mainMenuButtonClass = contextMenuItem?.id === item.id ? 'folder-tree-item_item-actions-menu--selected' : (isExcluded ? 'folder-tree-item_item-actions-menu--disabled' : '');


    return (
        ( <>
            <div className="folder-tree-item_item-actions">
                <button
                    onClick={toggleToSelection}
                    title={selectItemButtonTitle}
                    style={{fontSize: '4px', marginTop:'2px', paddingLeft: '3px'}}
                    className={selectionButtonClassName}
                >
                    ●
                </button>
                <button
                    onClick={toggleContextMenu}
                    title="Меню"
                    className={mainMenuButtonClass}
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