import React, { useMemo, useContext, useRef } from "react";
import './TreeItemComponent.sass';
import ContextMenu from './components/ContextMenu/ContextMenu';
import ItemDefaultMainContent from './components/ItemDefaultMainContent/ItemDefaultMainContent';
import ItemRenameMainContent from './components/ItemRenameMainContent/ItemRenameMainContent';
import useDebounced from '@/hooks/useDebounced';

import FileContext from '@/components/app/context/FileContext/FileContext.js';
import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';
import FolderTreeContext from '../../../../context/FolderTreeContext.js';

const TreeItemComponent = ({
    item,
    level,
    leftPadding,
}) => {

    const {
        getFolderCurrentChildren,
        moveTreeItemToFolder,
    } = useContext(FileContext);

    const {
        isOpenFile,
    } = useContext(ViewContext);

    const {
        renameID,
        openFolders,
        currentSelected,
        setCurrentSelected,

        mouseDownItem,
        setMouseDownItem,
        mouseOverItem,
        setMouseOverItem,
        mouseContextMenuItem,
        setContextMenuItem,
        resetMouseSelectionsFolderTree,

        isOpenFolder,
        openFolder,

        isDropFileTarget,
    } = useContext(FolderTreeContext);
    
    const isFolder = item.type === 'folder';
    const isOpen = useMemo(()=>isFolder ? isOpenFolder(item.id, openFolders) : isOpenFile(item), [isFolder, isOpenFile, isOpenFolder, item, openFolders]);
    const children = useMemo(()=>isFolder && isOpen ? getFolderCurrentChildren(item.id) : null, [getFolderCurrentChildren, isFolder, isOpen, item.id]);
    const itemIcon = useMemo(()=>isFolder ? (isOpen ? '📂' : '📁') : '📒', [isFolder, isOpen]);

    const itemStyles = {
        paddingLeft: 32 + leftPadding + 'px',
    }

    const onMouseUp = (e) => {
        setCurrentSelected(item.id);
        const moveDone = moveTreeItemToFolder(mouseDownItem, item);
        if (moveDone) {
            resetMouseSelectionsFolderTree();
        }
    }

    const onMouseDown = (e) => {
        if (mouseDownItem?.id === item.id || currentSelected !== item.id) {
            return;
        }
        setMouseDownItem(item);
    }

    const refreshMouseOver = useDebounced(() => {
        setMouseOverItem({
            ...item,
            openFolder: e=>openFolder(item.id)
        });
    }, 30);

    const onMouseOver = (e) => {
        if (!mouseDownItem?.id || mouseOverItem?.id === item.id) {
            return;
        }
        refreshMouseOver();
    }

    const onMouseLeave = () => {
        setMouseOverItem(null);
    }

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
        <>
        <div className={itemClassName}>
            <div
                onMouseUp={onMouseUp}
                onTouchEnd={onMouseUp}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                onMouseOver={onMouseOver}
                onTouchMoveCapture={onMouseOver}
                onMouseLeave={onMouseLeave}
                onContextMenu={onContextMenu}
                className="folder-tree-item_item"
                style={itemStyles}
            >
                <div className="folder-tree-item_item-inner">
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
            </div>
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
        </>
    )
}

export default TreeItemComponent;