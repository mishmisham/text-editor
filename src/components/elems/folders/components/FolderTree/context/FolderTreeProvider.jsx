import FolderTreeContext from './FolderTreeContext.js';
import FolderTreeReducer from './FolderTreeReducer.js';
import * as FolderTreeProviderMethods from './methods';
import * as contextControllers from './contextControllers';

import FileContext from '@/components/app/context/FileContext/FileContext.js';
import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';

import { useContext, useState, useReducer } from "react";

const FolderTreeProvider = ({ children }) => {
   
    // обертка дерева файлов
    const [contentRef, setContentRef] = useState(null);
    // модалка удаления файла
    const [confirmModal, setConfirmModal] = useState(null);

    const [state, dispatch] = useReducer(FolderTreeReducer, {
        search: '',
        // rename
        renameID: null,
        // for selections and tech needs
        currentSelected: null,
        // currently open folders
        openFolders: [],
        // selected for copy item
        cutOrCopyItem: null,
        // list of item wrapper ref
        contentRef: null,
        // modal for confirm delete && replace when paste
        confirmDeleteModal: null,
        // context menu (with iteration key - for exclude search doubles of menu)
        mouseContextMenuItem: null,
        // drag n drop
        mouseDownItem: null,
        mouseOverItem: null,
        mouseMoveAbsoluteCoordinates: null,
        // group actions selection
        selectedToGroupActionsItems: [],
        excludedFromGroupActionsItems: []
    });

    const setSearch = (value) => dispatch({
        payload: value,
        type: 'setSearch'
    });
    const setRenameID = (value) => dispatch({
        payload: value,
        type: 'setRenameID'
    });
    const setCurrentSelected = (value) => dispatch({
        payload: value,
        type: 'setCurrentSelected'
    });
    const setOpenFolders = (value) => dispatch({
        payload: value,
        type: 'setOpenFolders'
    });
    const setCutOrCopyItem = (value) => dispatch({
        payload: value,
        type: 'setCutOrCopyItem'
    });
    const setMouseDownItem = (value) => dispatch({
        payload: value,
        type: 'setMouseDownItem'
    });
    const setMouseOverItem = (value) => dispatch({
        payload: value,
        type: 'setMouseOverItem'
    });
    const setContextMenuItem = (value) => dispatch({
        payload: value,
        type: 'setContextMenuItem'
    });
    const setMouseMoveAbsoluteCoordinates = (value) => dispatch({
        payload: value,
        type: 'setMouseMoveAbsoluteCoordinates'
    });
    const setSelectedToGroupActionsItems = (value) => dispatch({
        payload: value,
        type: 'setSelectedToGroupActionsItems'
    });
    const setExcludedFromGroupActionsItems = (value) => dispatch({
        payload: value,
        type: 'setExcludedFromGroupActionsItems'
    });

    
    

    // mouse

    const resetMouseSelectionsFolderTree = () => {
        FolderTreeProviderMethods.resetMouseSelectionsFolderTree(contextData);
    }
    const isDropFileTarget = (itemID) => {
        return FolderTreeProviderMethods.isDropFileTarget(itemID, contextData);
    };
    const checkIfNeedOpenHoveredFolder = (itemID) => {
        return FolderTreeProviderMethods.checkIfNeedOpenHoveredFolder(itemID, contextData);
    }
    const refreshMouseAbsolutePosition = (e) => {
        FolderTreeProviderMethods.refreshMouseAbsolutePosition(e, contextData);
    }


    // folders

    const isOpenFolder = (itemID) => {
        return FolderTreeProviderMethods.isOpenFolder(itemID, contextData);
    };
    const openFolder = (itemID) => {
        return FolderTreeProviderMethods.openFolder(itemID, contextData);
    }
    const closeFolder = (itemID) => {
        FolderTreeProviderMethods.closeFolder(itemID, contextData);
    }
    const onRemoveChildItemsCallback = (child) => {
        FolderTreeProviderMethods.onRemoveChildItemsCallback(child, contextData);
    }


    // rename

    const startRenameItem = (itemID) => {
        FolderTreeProviderMethods.startRenameItem(itemID, contextData);
    }
    const cancelRename = () => {
        FolderTreeProviderMethods.cancelRename(contextData);
    }


    // group actions

    const resetGroupActionSelection = () => {
        setSelectedToGroupActionsItems([]);
        setExcludedFromGroupActionsItems([]);
    }

    const addToGroupActionsItemSelection = (item) => {
        const { selectedToGroupActionsItems } = state;
       
        // remove children from selected when parent is selected
        const removeFromGroupList = getChildrenListForRemoveFromGroupActionsSelection(item);

        setSelectedToGroupActionsItems([
            item,
            ...selectedToGroupActionsItems
                    .filter(elem=> -1 === removeFromGroupList
                            .findIndex(child=>elem.id === child.id)),
        ]);
    }

    const getExcludedFromGroupActionsChildren = (item) => {
        const {
            excludedFromGroupActionsItems
        } = state;
        const {
            getAllFolderChildren,
            tree,
        } = contextData.fileContext;
        
        const itemChildren = item.type === 'folder' ? getAllFolderChildren(item.id, tree).map(child=>child.item) : [];
        const excludedChildren = itemChildren.filter(child => excludedFromGroupActionsItems.find(elem=>elem.id === child.id));
       
        return excludedChildren;
    }

    const removeFromGroupActionsItemSelection = (item) => {
        const { selectedToGroupActionsItems } = state;
        const excludedChildren = getExcludedFromGroupActionsChildren(item);

        removeFromExcludedActionSelection(excludedChildren);

        setSelectedToGroupActionsItems([
            ...selectedToGroupActionsItems
                    .filter(elem=>elem.id !== item.id),
        ]);
    }

    const toggleToGroupActionsItemSelection = (item) => {
        const issetInGroup = itemIsSelectedToGroupActions(item);
        if (issetInGroup) {
            removeFromGroupActionsItemSelection(item);
        } else {
            addToGroupActionsItemSelection(item);
        }
    }

    const itemIsSelectedToGroupActions = (item) => {
        const { selectedToGroupActionsItems } = state;
        return selectedToGroupActionsItems.find(elem=>elem.id === item.id);
    }

    const itemIsExcludedFromGroupActions = (item) => {
        const { excludedFromGroupActionsItems } = state;
        return excludedFromGroupActionsItems.find(elem=>elem.id === item.id);
    }

    const getChildrenListForRemoveFromGroupActionsSelection = (item) => {
        if (item.type !== 'folder') {
            return [];
        }
        
        const {
            getAllFolderChildren,
            tree,
        } = contextData.fileContext;

        const itemChildren = getAllFolderChildren(item.id, tree).map(child=>child.item);
        const removeFromGroupList = itemChildren.filter(child=>itemIsSelectedToGroupActions(child));
        return removeFromGroupList;
    }

    const removeChildrenFromGroupActionsSelection = (item) => {
        const { selectedToGroupActionsItems } = state;
        const removeFromGroupList = getChildrenListForRemoveFromGroupActionsSelection(item);

        if (!removeFromGroupList) {
            return;
        }

        setSelectedToGroupActionsItems([
            ...selectedToGroupActionsItems
                .filter(elem=> -1 === removeFromGroupList
                    .findIndex(child=>elem.id === child.id)),
        ]);

    }

    const excludeFromGroupActionSelection = (item) => {
        const { excludedFromGroupActionsItems } = state;
        
        if (itemIsSelectedToGroupActions(item)) {
            removeFromGroupActionsItemSelection(item);
        }

        removeChildrenFromGroupActionsSelection(item);

        setExcludedFromGroupActionsItems([
            ...excludedFromGroupActionsItems,
            item
        ]);
    }

    const removeFromExcludedActionSelection = (itemList) =>{
        const { excludedFromGroupActionsItems } = state;
        const filtered = [...excludedFromGroupActionsItems].filter(elem=> !itemList.find(item => elem.id === item.id));
        setExcludedFromGroupActionsItems([
            ...filtered
        ]);
    }

    const toggleExcludeFromGroupActions = (item) => {
        if (!itemIsExcludedFromGroupActions(item)) {
            excludeFromGroupActionSelection(item);
        } else {
            removeFromExcludedActionSelection([item]);
        }
    }

    const isAllFoldersForGroupActionsSelected = () => {
        const {
            getAllRootTreeItems
        } = contextData.fileContext;

        const allRoots = getAllRootTreeItems();
        let allSelected = true;
        allRoots.forEach(item => {
            if (!itemIsSelectedToGroupActions(item)) {
                allSelected = false;
            }
        })
        return allSelected;
    }

    const selectAllItemsToGroupAction = () => {
        const {
            selectedToGroupActionsItems
        } = state;

        const {
            getAllRootTreeItems
        } = contextData.fileContext;

        const allRoots = getAllRootTreeItems();
        const newToSelect = allRoots.filter(rootItem => !itemIsSelectedToGroupActions(rootItem));
        
        setSelectedToGroupActionsItems([
            ...selectedToGroupActionsItems,
            ...newToSelect
        ]);
    }

    // context menu

    const openContextMenu = (item) => {
        const {
            selectedToGroupActionsItems
        } = state;
 
        if (!selectedToGroupActionsItems.length) {
            setCurrentSelected(item.id);
        }

        setContextMenuItem(item);
    }


    // functions, that use file context

    const getCurrentSelectedFolder = () => {
        return contextControllers.getCurrentSelectedFolder(contextData);
    }
    const openSelectedFolderIfNot = (targetID=null) => {
        return contextControllers.openSelectedFolderIfNot(targetID, contextData);
    }
    const createFile = (parentFolderID=null) => {
        return contextControllers.createFile(parentFolderID, contextData);
    }
    const createFolder = (parentFolderID=null) => {
        return contextControllers.createFolder(parentFolderID, contextData);
    }
    const pasteFolderItem = async (addItem, targetFolder, resetSelectedIfCut=true) => {
        return await contextControllers.pasteFolderItem(addItem, targetFolder, resetSelectedIfCut, contextData);
    }
    const deleteFolderItem = (item) => {
        contextControllers.deleteFolderItem(item, contextData);
    }

    const contextData = {
        // search,
        // renameID,
        // currentSelected,
        // openFolders,
        // cutOrCopyItem,

        // mouseDownItem,
        // mouseOverItem,
        // mouseContextMenuItem,
        // mouseMoveAbsoluteCoordinates,
        ...state,

        contentRef, setContentRef,
        confirmModal, setConfirmModal,

        fileContext: useContext(FileContext),
        viewContext: useContext(ViewContext),

        // current context
        setSearch,
        setRenameID,
        setOpenFolders,
        setCurrentSelected,
        setCutOrCopyItem,
        setContextMenuItem,
        setMouseDownItem,
        setMouseOverItem,
        setMouseMoveAbsoluteCoordinates,
        setSelectedToGroupActionsItems,
        refreshMouseAbsolutePosition,
        isDropFileTarget,
        resetMouseSelectionsFolderTree,
        checkIfNeedOpenHoveredFolder,
        isOpenFolder,
        openFolder,
        closeFolder,
        startRenameItem,
        cancelRename,
        onRemoveChildItemsCallback,
        
        openContextMenu,

        resetGroupActionSelection,
        addToGroupActionsItemSelection,
        removeFromGroupActionsItemSelection,
        toggleToGroupActionsItemSelection,
        itemIsSelectedToGroupActions,
        itemIsExcludedFromGroupActions,
        excludeFromGroupActionSelection,
        removeFromExcludedActionSelection,
        toggleExcludeFromGroupActions,
        getExcludedFromGroupActionsChildren,
        removeChildrenFromGroupActionsSelection,
        isAllFoldersForGroupActionsSelected,
        selectAllItemsToGroupAction,

        // functions, that use file context
        getCurrentSelectedFolder,
        openSelectedFolderIfNot,
        createFile,
        createFolder,
        pasteFolderItem,
        deleteFolderItem,
    }

    return (
        <FolderTreeContext.Provider value={contextData}>
            { children }
        </FolderTreeContext.Provider>
    );
};

export default FolderTreeProvider;