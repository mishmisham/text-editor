import React, { useMemo, useRef, useContext, useEffect } from "react";
import './TreeComponent.sass';
import TreeItemComponent from './components/TreeItemComponent/TreeItemComponent';
import ConfirmDeleteItemModal from './components/ConfirmDeleteItemModal/ConfirmDeleteItemModal.jsx';

import FileContext from '@/components/app/context/FileContext/FileContext.js';
import FolderTreeContext from '../../context/FolderTreeContext.js';

import useMouseOverFolderOpen from './hooks/useMouseOverFolderOpen.js'

const TreeComponent = () => {

    const {
        moveTreeItemToFolder,
        searchTreeItemsByName,
        getAllRootTreeItems,
    } = useContext(FileContext);

    const {
        search,
        renameID,
        mouseDownItem,
        mouseMoveAbsoluteCoordinates,
        resetMouseSelectionsFolderTree,
        setMouseMoveAbsoluteCoordinates,
        setContentRef,
        setConfirmDeleteModal,
    } = useContext(FolderTreeContext);


    const contentRef = useRef(null);
    const confirmDeleteModal = useRef(null);
   
    useEffect(() => {
        setContentRef(contentRef)
        setConfirmDeleteModal(confirmDeleteModal)
    }, [contentRef, setConfirmDeleteModal, setContentRef]);


    const rootItems = useMemo(() => {
        return getAllRootTreeItems();
    }, [getAllRootTreeItems]);

    const foundItems = useMemo(() => {
        return searchTreeItemsByName(search);
    }, [searchTreeItemsByName, search]);

    const itemList = search ? foundItems : rootItems;

    const onDrop = (e) => {
        if (e.target.classList.contains('.folder-tree-item') || e.target.closest('.folder-tree-item')) {
            resetMouseSelectionsFolderTree();
            return;
        }

        moveTreeItemToFolder(mouseDownItem, {type:'root'});
        resetMouseSelectionsFolderTree();
    }

    const onMouseMove = (e) => {
        if (!mouseDownItem || !contentRef.current || renameID) {
            return;
        }

        const { left, top } = contentRef.current.getBoundingClientRect();
        
        setMouseMoveAbsoluteCoordinates({
            left: e.clientX - left,
            top: e.clientY - top,
        })
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
            {
                mouseDownItem && mouseMoveAbsoluteCoordinates &&
                <div
                    className="folder-tree_content_drag-n-drop-tooltip"
                    style={{ ...mouseMoveAbsoluteCoordinates }}
                >
                    { mouseDownItem.name }
                </div>
            }
            <ConfirmDeleteItemModal
                ref={confirmDeleteModal}
            />
        </div>
    )
}

export default TreeComponent;