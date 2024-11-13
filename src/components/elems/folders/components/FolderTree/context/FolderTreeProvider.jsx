import FolderTreeContext from './FolderTreeContext.js';
import * as FolderTreeProviderMethods from './methods';
import * as contextControllers from './contextControllers';

import FileContext from '@/components/app/context/FileContext/FileContext.js';

import { useContext, useState } from "react";

const FolderTreeProvider = ({ children }) => {
   
    // обертка дерева файлов
    const [contentRef, setContentRef] = useState(null);
    // модалка удаления файла
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(null);

    const [search, setSearch] = useState('');
    const [renameID, setRenameID] = useState(null);
    const [currentSelected, setCurrentSelected] = useState(null);
    const [openFolders, setOpenFolders] = useState([]);
    const [cutOrCopyItem, setCutOrCopyItem] = useState(null);
    const [mouseDownItem, setMouseDownItem] = useState(null);
    const [mouseOverItem, setMouseOverItem] = useState(null);
    const [mouseContextMenuItem, setContextMenuItem] = useState(null);
    const [mouseMoveAbsoluteCoordinates, setMouseMoveAbsoluteCoordinates] = useState(null);


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
    const pasteFolderItem = (addItem, targetFolder, replaceMode=false, resetSelectedIfCut=false) => {
        return contextControllers.pasteFolderItem(addItem, targetFolder, replaceMode, resetSelectedIfCut, contextData);
    }

    const contextData = {
        search,
        renameID,
        currentSelected,
        openFolders,
        cutOrCopyItem,

        mouseDownItem,
        mouseOverItem,
        mouseContextMenuItem,
        mouseMoveAbsoluteCoordinates,

        contentRef, setContentRef,
        confirmDeleteModal, setConfirmDeleteModal,

        fileContext: useContext(FileContext),

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
    }

    return (
        <FolderTreeContext.Provider value={contextData}>
            { children }
        </FolderTreeContext.Provider>
    );
};

export default FolderTreeProvider;