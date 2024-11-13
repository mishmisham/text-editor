import FolderTreeContext from './FolderTreeContext.js';
import FolderTreeReducer from './FolderTreeReducer.js'
import * as FolderTreeProviderMethods from './methods';

import { useReducer } from "react";

const FolderTreeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FolderTreeReducer, {
        search: '',
        renameID: null,
        currentSelected: null,
        openFolders: [],
        cutOrCopyItem: null,

        mouseDownItem: null,
        mouseOverItem: null,
        mouseContextMenuItem: null,
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
    const setOpenFolders = (value) => dispatch({
        payload: value,
        type: 'setOpenFolders'
    });
    const setCurrentSelected = (value) => dispatch({
        payload: value,
        type: 'setCurrentSelected'
    });
    const setCutOrCopyItem = (value) => dispatch({
        payload: value,
        type: 'setCutOrCopyItem'
    });
    const setContextMenuItem = (value) => dispatch({
        payload: value,
        type: 'setContextMenuItem'
    });
    const setMouseDownItem = (value) => dispatch({
        payload: value,
        type: 'setMouseDownItem'
    });
    const setMouseOverItem = (value) => dispatch({
        payload: value,
        type: 'setMouseOverItem'
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

    const contextData = {
        ...state,

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
    }

    return (
        <FolderTreeContext.Provider value={contextData}>
            { children }
        </FolderTreeContext.Provider>
    );
};

export default FolderTreeProvider;