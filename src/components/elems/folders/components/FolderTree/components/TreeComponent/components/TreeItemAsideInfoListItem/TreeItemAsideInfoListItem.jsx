
import React, { useMemo, useRef, useContext, useEffect } from "react";
import './TreeItemAsideInfoListItem.sass';

import FolderTreeContext from '../../../../context/FolderTreeContext.js';
import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';
import FileContext from '@/components/app/context/FileContext/FileContext.js';

const TreeItemAsideInfoListItem = ({
    item,
}) => {


    const {
        isOpenFile,
    } = useContext(ViewContext);

    const {
        getFolderCurrentChildren,
    } = useContext(FileContext);

    const {
        openFolders,
        isOpenFolder,
    } = useContext(FolderTreeContext);

    const isFolder = item.type === 'folder';
    const isOpen = useMemo(()=>isFolder ? isOpenFolder(item.id, openFolders) : isOpenFile(item), [isFolder, isOpenFile, isOpenFolder, item, openFolders]);
    const children = useMemo(()=>isFolder && isOpen ? getFolderCurrentChildren(item.id) : null, [getFolderCurrentChildren, isFolder, isOpen, item.id]);

    return (
        <div className="folder-tree-aside_item">
            <div className="folder-tree-aside_item-content">
                {item.type}
            </div>

            <div className="folder-tree-aside_item-children">
                {
                    isOpen && children && 
                    children.map((child, i) => {
                        return (
                            <TreeItemAsideInfoListItem
                                item={child}
                                key={child.id}
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default TreeItemAsideInfoListItem;