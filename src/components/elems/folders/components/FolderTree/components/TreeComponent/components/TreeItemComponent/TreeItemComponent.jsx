import React, { useMemo, useContext } from "react";
import './TreeItemComponent.sass';
import ContextMenu from './components/ContextMenu/ContextMenu';
import ItemDefaultMainContent from './components/ItemDefaultMainContent/ItemDefaultMainContent';
import ItemRenameMainContent from './components/ItemRenameMainContent/ItemRenameMainContent';

import FileContext from '@/components/app/context/FileContext/FileContext.js';
import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';
import FolderTreeContext from '../../../../context/FolderTreeContext.js';

import DragNDropWrapperComponent from './components/DragNDropWrapperComponent/DragNDropWrapperComponent.jsx';

const TreeItemComponent = ({
    item,
    level,
    leftPadding,
    iterationKey,

    parentIsSelectedToGroup,
    parentIsExcludedFromGroup,
}) => {

    const {
        getFolderCurrentChildren,
    } = useContext(FileContext);

    const {
        isOpenFile,
    } = useContext(ViewContext);

    const {
        renameID,
        openFolders,
        currentSelected,
        setCurrentSelected,
        
        mouseContextMenuItem,

        isOpenFolder,
       
        isDropFileTarget,

        selectedToGroupActionsItems,
        itemIsSelectedToGroupActions,
        itemIsExcludedFromGroupActions,

        openContextMenu
    } = useContext(FolderTreeContext);
    
    const isFolder = item.type === 'folder';
    const isOpen = useMemo(()=>isFolder ? isOpenFolder(item.id, openFolders) : isOpenFile(item), [isFolder, isOpenFile, isOpenFolder, item, openFolders]);
    const children = useMemo(()=>isFolder && isOpen ? getFolderCurrentChildren(item.id) : null, [getFolderCurrentChildren, isFolder, isOpen, item.id]);
    const itemIcon = useMemo(()=>isFolder ? (isOpen ? '📂' : '📁') : '📒', [isFolder, isOpen]);
    const isOneItemSelectionMode = !selectedToGroupActionsItems.length;
    const itemIsSelectedToGroup = useMemo(()=>itemIsSelectedToGroupActions(item), [item, itemIsSelectedToGroupActions]);
    const itemIsExcludedFromGroup = useMemo(()=>itemIsExcludedFromGroupActions(item), [item, itemIsExcludedFromGroupActions]);


    const onContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setCurrentSelected(item.id);

        openContextMenu({
            ...item,
            iterationKey,
            parentIsSelectedToGroup
        })
    }
    
    const defaultItemClass = `folder-tree-item folder-tree-item--${item.type}`;
    let itemClassName = ((isOneItemSelectionMode && currentSelected === item.id) || itemIsSelectedToGroup) ? `${defaultItemClass} folder-tree-item--current` : defaultItemClass;
    if (isDropFileTarget(item.id)) {
        itemClassName += ' folder-tree-item--drop-target';
    }

    return (
        <div className={itemClassName}>
            <DragNDropWrapperComponent
                item={item}
                leftPadding={leftPadding}
                wrapperClass="folder-tree-item_item"
            >
                <div
                    onContextMenu={onContextMenu}
                    className="folder-tree-item_item-inner"
                >

                { renameID !== item.id &&
                    <ItemDefaultMainContent
                        item={item}
                        itemIcon={itemIcon}
                        isFolder={isFolder}
                        isOpen={isOpen}
                        iterationKey={iterationKey}
                        itemIsSelectedToGroup={itemIsSelectedToGroup}
                        itemIsExcludedFromGroup={itemIsExcludedFromGroup}
                        parentIsSelectedToGroup={parentIsSelectedToGroup}
                        parentIsExcludedFromGroup={parentIsExcludedFromGroup}
                    />
                }

                { renameID === item.id && 
                    <ItemRenameMainContent
                        item={item}
                        itemIcon={itemIcon}
                    />
                }
                </div>
            </DragNDropWrapperComponent>

            {
                mouseContextMenuItem
                && mouseContextMenuItem.id === item.id
                && mouseContextMenuItem.iterationKey === iterationKey
                && <ContextMenu
                    item={item}
                    leftPadding={leftPadding}
                />
            }

            {  children && isOpen &&
                <div className="folder-tree-item_children">
                {
                    children.map((child, i) => {
                        return (
                            <TreeItemComponent
                                key={child.id}
                                item={child}
                                level={(level + 1)}
                                leftPadding={(leftPadding + 10)}
                                iterationKey={`${iterationKey}-${i}`}

                                parentIsSelectedToGroup={itemIsSelectedToGroup || parentIsSelectedToGroup}
                                parentIsExcludedFromGroup={itemIsExcludedFromGroup || parentIsExcludedFromGroup}
                            />
                        )
                    })
                }
                </div>
            }
        </div>
    )
}

export default TreeItemComponent;