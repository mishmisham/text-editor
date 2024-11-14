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
        setContextMenuItem,

        isOpenFolder,
       
        isDropFileTarget,
    } = useContext(FolderTreeContext);
    
    const isFolder = item.type === 'folder';
    const isOpen = useMemo(()=>isFolder ? isOpenFolder(item.id, openFolders) : isOpenFile(item), [isFolder, isOpenFile, isOpenFolder, item, openFolders]);
    const children = useMemo(()=>isFolder && isOpen ? getFolderCurrentChildren(item.id) : null, [getFolderCurrentChildren, isFolder, isOpen, item.id]);
    const itemIcon = useMemo(()=>isFolder ? (isOpen ? '📂' : '📁') : '📒', [isFolder, isOpen]);

    const onContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setCurrentSelected(item.id);
        setContextMenuItem(item);
    }
    
    const defaultItemClass = `folder-tree-item folder-tree-item--${item.type}`;
    let itemClassName = currentSelected === item.id ? `${defaultItemClass} folder-tree-item--current` : defaultItemClass;
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
                mouseContextMenuItem && mouseContextMenuItem.id === item.id &&
                <ContextMenu
                    item={item}
                    leftPadding={leftPadding}
                />
            }

            {  children && isOpen &&
                <div className="folder-tree-item_children">
                {
                    children.map(child => {
                        return (
                            <TreeItemComponent
                                key={child.id}
                                item={child}
                                level={(level + 1)}
                                leftPadding={(leftPadding + 10)}
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