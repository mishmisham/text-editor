import React, { useMemo, useRef, useContext, useEffect } from "react";
import './TreeComponent.sass';
import TreeItemComponent from './components/TreeItemComponent/TreeItemComponent';
import ConfirmModal from './components/ConfirmModal/ConfirmModal.jsx';
import DraggingTreeItemMouseGhost from './components/DraggingTreeItemMouseGhost/DraggingTreeItemMouseGhost.jsx';

import FileContext from '@/components/app/context/FileContext/FileContext.js';
import FolderTreeContext from '../../context/FolderTreeContext.js';

import useMouseOverFolderOpen from './hooks/useMouseOverFolderOpen.js'

const TreeComponent = () => {

    const {
        searchTreeItemsByName,
        getAllRootTreeItems,
    } = useContext(FileContext);

    const {
        search,
        mouseDownItem,
        resetMouseSelectionsFolderTree,
        setContentRef,
        setConfirmModal,
        refreshMouseAbsolutePosition,
        pasteFolderItem
    } = useContext(FolderTreeContext);


    const contentRef = useRef(null);
    const confirmModal = useRef(null);
   
    useEffect(() => {
        setContentRef(contentRef)
        setConfirmModal(confirmModal)
    }, [contentRef, setConfirmModal, setContentRef]);

    const rootItems = useMemo(() => {
        return getAllRootTreeItems();
    }, [getAllRootTreeItems]);

    const foundItems = useMemo(() => {
        return searchTreeItemsByName(search);
    }, [searchTreeItemsByName, search]);

    const itemList = search ? foundItems : rootItems;

    const onDrop = async (e) => {
        if (e.target.classList.contains('.folder-tree-item') || e.target.closest('.folder-tree-item')) {
            resetMouseSelectionsFolderTree();
            return;
        }

        pasteFolderItem(mouseDownItem, {type:'root'});
    }

    const onMouseMove = (e) => {
        refreshMouseAbsolutePosition(e);
    }
    
    useMouseOverFolderOpen();

    return (
        <div
            onMouseMove={onMouseMove}
            onMouseUp={onDrop}
            onMouseLeave={resetMouseSelectionsFolderTree}
            className="folder-tree_content"
            ref={contentRef}
        >
            <div className="folder-tree_content_inner">
            {
                itemList.map(item => {
                    return (
                        <TreeItemComponent
                            leftPadding={0}
                            level={0}
                            item={item}
                            key={item.id}
                        />
                    )
                })
            }
            </div>
            <DraggingTreeItemMouseGhost />
            <ConfirmModal
                ref={confirmModal}
            />
        </div>
    )
}

export default TreeComponent;