import React, { useMemo, useRef, useContext, useEffect } from "react";
import './TreeComponent.sass';
import TreeItemComponent from './components/TreeItemComponent/TreeItemComponent';
import TreeItemAsideInfoListItem from './components/TreeItemAsideInfoListItem/TreeItemAsideInfoListItem';

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
        resetMouseSelectionsFolderTree,
        setContentRef,
        setConfirmModal,
        refreshMouseAbsolutePosition,
        pasteFolderItem
    } = useContext(FolderTreeContext);

    const contentRef = useRef(null);
    const confirmModal = useRef(null);
    const asideRef = useRef(null);
   
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

        pasteFolderItem({type:'root'});
    }

    const onMouseMove = (e) => {
        refreshMouseAbsolutePosition(e);
    }
    
    useMouseOverFolderOpen();

    const setAsideLeftMarginOnScroll = () => {
        if (contentRef?.current && asideRef?.current){
            const {
                clientWidth,
                scrollLeft
            } = contentRef.current;
            asideRef.current.style.left = (clientWidth + scrollLeft - asideRef?.current.clientWidth  + 1) + 'px';
        }
    }

    const onScroll = (e) => {
        setAsideLeftMarginOnScroll();
    }

    useEffect(() => {
        setAsideLeftMarginOnScroll();
    }, [contentRef, asideRef]);


    return (
        <div
            onMouseMove={onMouseMove}
            onMouseUp={onDrop}
            onScroll={onScroll}
            onMouseLeave={resetMouseSelectionsFolderTree}
            className="folder-tree_content"
            ref={contentRef}
        >

            <div className="folder-tree_content_inner">
                {
                    itemList.map((item, i) => {
                        return (
                            <TreeItemComponent
                                leftPadding={0}
                                level={0}
                                item={item}
                                key={item.id}
                                // for one context menu when search similar open paths
                                iterationKey={i}
                            />
                        )
                    })
                }
                <div
                    className="folder-tree_content_aside"
                    ref={asideRef}
                >
                {
                    itemList.map((item, i) => {
                        return (
                            <TreeItemAsideInfoListItem
                                item={item}
                                key={item.id}
                            />
                        )
                    })
                }
                </div>
            </div>
            
            
            <DraggingTreeItemMouseGhost />

            <ConfirmModal
                ref={confirmModal}
            />
        </div>
    )
}

export default TreeComponent;