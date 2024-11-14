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
        renameID: null,
        currentSelected: null,
        openFolders: [],
        cutOrCopyItem: null,
        contentRef: null,
        confirmDeleteModal: null,
        mouseContextMenuItem: null,
        mouseDownItem: null,
        mouseOverItem: null,
        mouseMoveAbsoluteCoordinates: null,
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