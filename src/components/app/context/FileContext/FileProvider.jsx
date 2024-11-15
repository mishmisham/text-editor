import FileContext from './FileContext.js';
import FileReducer from './FileReducer.js'
import { useReducer } from "react";
import * as FileProviderMethods from './methods'

import {
    demofolders
  } from '../../demofolders';

// all file tree in open project folder
const FileProvider = ({ children }) => {
   
    const [state, dispatch] = useReducer(FileReducer, {
        // will set from outside project folder scaner
        tree: demofolders.tree, // []
    });

    const setTree = (newTree) => dispatch({
        payload: newTree,
        type: 'setTree'
    });

    // create

    const createNewFile = (parentFolderID, addToTree=true) => {
        return FileProviderMethods.createNewFile(parentFolderID, addToTree, contextData);
    }

    const createNewFolder = (parentFolderID, addToTree=true) => {
        return FileProviderMethods.createNewFolder(parentFolderID, addToTree, contextData);
    }


    // getters

    const generateNewUniqueID = (arrayToCheck=state.tree) => {
        return FileProviderMethods.generateNewUniqueID(state, arrayToCheck);
    }

    const getAllRootTreeItems = () => {
        return FileProviderMethods.getAllRootTreeItems(contextData);
     }
 
     const getTreeItemByID = (id, sourceArray=state.tree) => {
         return FileProviderMethods.getTreeItemByID(id, sourceArray);
     }
 
     const getTreeItemPath = (item, sourceArray=state.tree) => {
         return FileProviderMethods.getTreeItemPath(item, sourceArray)
     }
 
     const getClosestTreeItemFolder = (item) => {
         return FileProviderMethods.getClosestTreeItemFolder(item)
     }

     const getRecursiveCopyOfAllChildren = (oldParentID, newParentID, idCompareArray=[], excluded=[], list=[]) => {
         return FileProviderMethods.getRecursiveCopyOfAllChildren(oldParentID, newParentID, idCompareArray, excluded, list, contextData);
     }

     const getCopyOfItem = (item, parentID, idCompareArray=[]) => {
         return FileProviderMethods.getCopyOfItem(item, parentID, idCompareArray, contextData);
     }

     const getAllFolderChildren = (id, sourceArray=state.tree) => {
         return FileProviderMethods.getAllFolderChildren(id, sourceArray);
     }
 
     const getFolderCurrentChildren = (id, sourceArray=state.tree) => {
         return FileProviderMethods.getFolderCurrentChildren(id, sourceArray);
     }


    // search

    const searchTreeItemsByName = (searchText) => {
        return FileProviderMethods.searchTreeItemsByName(searchText, contextData);
    }

    const searchTextInAllFiles = async (text, useBreadcrumbs=false, sourceArray=state.tree) => {
        return await FileProviderMethods.searchTextInAllFiles(text, sourceArray, useBreadcrumbs)
    }


    // utils

    const sortFolderContent = (folderItems) => {
        return FileProviderMethods.sortFolderContent(folderItems);
    }

    const renameTreeItem = (itemID, newName) => {
        FileProviderMethods.renameTreeItem(itemID, newName, contextData);
    }

    const replaceTextInFiles = (fileArray, searchText, replaceValue) => {
        FileProviderMethods.replaceTextInFiles(fileArray, searchText, replaceValue, contextData)
    }

    const renameIfNewNeighboursHasSimilarName = (item, parentID, sourceArray=state.tree) => {
        FileProviderMethods.renameIfNewNeighboursHasSimilarName(item, parentID, sourceArray, contextData);
    }


    // crud

    const checkForMayCutOrCopyHere = (moveTreeItem, moveTo, allowCopyHere=true) => {
        return FileProviderMethods.checkForMayCutOrCopyHere(moveTreeItem, moveTo, allowCopyHere, contextData);
    }

    const removeOldCopyOnPasteReplace = (file, parentID, sourceArray=state.tree) => {
        return FileProviderMethods.removeOldCopyOnPasteReplace(file, parentID, sourceArray, contextData);
    }

    const moveTreeItemToFolder = (moveTreeItem, moveTo, pasteWithReplace=false, excluded=[]) => {
        return FileProviderMethods.moveTreeItemToFolder(moveTreeItem, moveTo, pasteWithReplace, excluded, contextData);
    }

    const pasteCopyOfTreeItem = (copyTreeItem, copyTo, pasteWithReplace=false, excluded=[]) => {
        return FileProviderMethods.pasteCopyOfTreeItem(copyTreeItem, copyTo, pasteWithReplace, excluded, contextData);
    }

    const deleteTreeItem = (itemID, eachChildItemCallback = null, sourceArray=state.tree, onlyUpgradeArray=false, excluded=[]) => {
        return FileProviderMethods.deleteTreeItem(itemID, eachChildItemCallback, sourceArray, onlyUpgradeArray, excluded, contextData);
    }

    const contextData = {
        ...state,
        setTree,

        generateNewUniqueID,

        createNewFile,
        createNewFolder,

        moveTreeItemToFolder,
        pasteCopyOfTreeItem,
        getCopyOfItem,
        getRecursiveCopyOfAllChildren,

        removeOldCopyOnPasteReplace,
        renameIfNewNeighboursHasSimilarName,

        checkForMayCutOrCopyHere,

        renameTreeItem,
        deleteTreeItem,

        getTreeItemByID,
        getTreeItemPath,
        getClosestTreeItemFolder,
        getAllRootTreeItems,

        getAllFolderChildren,
        getFolderCurrentChildren,

        searchTreeItemsByName,
        searchTextInAllFiles,
        replaceTextInFiles,

        sortFolderContent,

    }

    return (
        <FileContext.Provider value={contextData}>
        { children }
        </FileContext.Provider>
    );
};

export default FileProvider;