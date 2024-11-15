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
        contextMenuItem: null,
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

    const itemIsSelectedToGroupActions = (item, deepCheck=false) => {
        return contextControllers.itemIsSelectedToGroupActions(item, deepCheck, contextData);
    }

    const itemIsExcludedFromGroupActions = (item, deepCheck=false) => {
        return contextControllers.itemIsExcludedFromGroupActions(item, deepCheck, contextData);
    }

    const resetGroupActionSelection = () => {
        contextControllers.resetGroupActionSelection(contextData);
    }

    const addToGroupActionsItemSelection = (item) => {
        contextControllers.addToGroupActionsItemSelection(item, contextData);
    }

    const getExcludedFromGroupActionsChildren = (item) => {
        return contextControllers.getExcludedFromGroupActionsChildren(item, contextData);
    }

    const removeFromGroupActionsItemSelection = (item) => {
        contextControllers.removeFromGroupActionsItemSelection(item, contextData);
    }

    const toggleToGroupActionsItemSelection = (item) => {
        contextControllers.toggleToGroupActionsItemSelection(item, contextData);
    }

    const getChildrenListForRemoveFromGroupActionsSelection = (item) => {
        return contextControllers.getChildrenListForRemoveFromGroupActionsSelection(item, contextData);
    }

    const removeChildrenFromGroupActionsSelection = (item) => {
        contextControllers.removeChildrenFromGroupActionsSelection(item, contextData);
    }

    const excludeFromGroupActionSelection = (item) => {
        contextControllers.excludeFromGroupActionSelection(item, contextData);
    }

    const removeFromExcludedActionSelection = (itemList) =>{
        contextControllers.removeFromExcludedActionSelection(itemList, contextData);
    }

    const toggleExcludeFromGroupActions = (item) => {
        contextControllers.toggleExcludeFromGroupActions(item, contextData);
    }

    const isAllFoldersForGroupActionsSelected = () => {
        return contextControllers.isAllFoldersForGroupActionsSelected(contextData);
    }

    const selectAllItemsToGroupAction = () => {
        contextControllers.selectAllItemsToGroupAction(contextData);
    }


    // context menu

    const setupItemForActions = (item) => {
        return contextControllers.setupItemForActions(item, contextData);
    }

    const openContextMenu = (item) => {
        contextControllers.openContextMenu(item, contextData);
    }

    const addCopyOrCutItem = (item, mode) => {
        contextControllers.addCopyOrCutItem(item, mode, contextData);
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
    const pasteFolderItem = async (targetFolder, resetSelectedIfCut=true) => {
        return await contextControllers.pasteFolderItem(targetFolder, resetSelectedIfCut, contextData);
    }
    const deleteFolderItem = (item) => {
        contextControllers.deleteFolderItem(item, contextData);
    }

    const contextData = {
       
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
        setExcludedFromGroupActionsItems,
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
        
        setupItemForActions,
        addCopyOrCutItem,
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
        getChildrenListForRemoveFromGroupActionsSelection,

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