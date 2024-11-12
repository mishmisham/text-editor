import FileContext from './FileContext.js';
import FileReducer from './FileReducer.js'
import { useReducer } from "react";
import { findAllChildren } from './utils/findAllChildren.js'
import { findChildren } from './utils/findChildren.js'
import { getNewID } from './utils/getNewID.js'
import { getItemByID } from './utils/getItemByID.js'
import { getBreadCrumbs } from './utils/getBreadCrumbs.js';
import { getClosestFolder } from './utils/getClosestFolder.js';
import { searchingInFiles } from './utils/searchingInFiles.js';
import { sortFirstIsFolder } from './utils/sortFirstIsFolder.js';
import { copyItem } from './utils/copyItem.js';
import { searchFileByName } from './utils/searchFileByName.js';
import { replaceTextsInFiles } from './utils/replaceTextsInFiles.js';
import { getAllRootItems } from './utils/getAllRootItems.js';
import { renameItem } from './utils/renameItem.js';
import { checkForMayCutOrCopy } from './utils/checkForMayCutOrCopy.js';
import { removeOldCopyOnPasteWithReplace } from './utils/removeOldCopyOnPasteWithReplace.js';
import { renameIfNewNeighbourHasSimilarName } from './utils/renameIfNewNeighbourHasSimilarName.js';
import { moveFileTo } from './utils/moveFileTo.js';
import { getRecursiveCopyOfAllChildrens } from './utils/getRecursiveCopyOfAllChildrens.js';
import { pasteCopy } from './utils/pasteCopy.js';
import { deleteItem } from './utils/deleteItem.js';
import { createAndAddNewFile } from './utils/createAndAddNewFile.js';
import { createAndAddNewFolder } from './utils/createAndAddNewFolder.js';

import { newFileTemplate } from './jsonTemplates/newFileTemplate.js';
import { newFolderTemplate } from './jsonTemplates/newFolderTemplate.js';

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

    const generateNewUniqueID = (arrayToCheck=state.tree) => {
        return getNewID(state, arrayToCheck);
    }

    const createNewFile = (parentFolderID) => {
        return createAndAddNewFile(parentFolderID, contextData);
    }

    const createNewFolder = (parentFolderID) => {
        return createAndAddNewFolder(parentFolderID, contextData);
    }

    const replaceTextInFiles = (fileArray, searchText, replaceValue) => {
        replaceTextsInFiles(fileArray, searchText, replaceValue, contextData)
    }

    const findAllFolderChildren = (id, sourceArray=state.tree) => {
        return findAllChildren(id, sourceArray);
    }

    const findFolderCurrentChildren = (id, sourceArray=state.tree) => {
        return findChildren(id, sourceArray);
    }

    const findTreeItemsByName = (searchText) => {
        return searchFileByName(searchText, contextData);
    }

    const getAllRootTreeItems = () => {
       return getAllRootItems(contextData);
    }

    const getTreeItemByID = (id, sourceArray=state.tree) => {
        return getItemByID(id, sourceArray);
    }

    const getTreeItemPath = (item, sourceArray=state.tree) => {
        return getBreadCrumbs(item, sourceArray)
    }

    const getClosestTreeItemFolder = (item) => {
        return getClosestFolder(item)
    }

    const getCopyOfItem = (item, parentID, idCompareArray=[]) => {
        return copyItem(item, parentID, idCompareArray, contextData);
    }

    const searchTextInAllFiles = async (text, useBreadcrumbs=false, sourceArray=state.tree) => {
        return await searchingInFiles(text, sourceArray, useBreadcrumbs)
    }

    const sortFolderContent = (folderItems) => {
        return sortFirstIsFolder(folderItems);
    }

    const renameTreeItem = (itemID, newName) => {
        renameItem(itemID, newName, contextData);
    }

    const checkForMayCutOrCopyHere = (moveTreeItem, moveTo, allowCopyHere=false) => {
        return checkForMayCutOrCopy(moveTreeItem, moveTo, allowCopyHere, contextData);
    }

    const removeOldCopyOnPasteReplace = (file, parentID, sourceArray=state.tree) => {
        return removeOldCopyOnPasteWithReplace(file, parentID, sourceArray, contextData);
    }

    const renameIfNewNeighboursHasSimilarName = (item, parentID, sourceArray=state.tree) => {
        renameIfNewNeighbourHasSimilarName(item, parentID, sourceArray, contextData);
    }

    const moveFile = (moveTreeItem, moveTo, pasteWithReplace=false) => {
        return moveFileTo(moveTreeItem, moveTo, pasteWithReplace, contextData);
    }

    const getRecursiveCopyOfAllChildren = (oldParentID, newParentID, idCompareArray=[], list=[]) => {
        return getRecursiveCopyOfAllChildrens(oldParentID, newParentID, idCompareArray, list, contextData);
    }

    const addCopyOfItem = (copyTreeItem, copyTo, pasteWithReplace=false) => {
        return pasteCopy(copyTreeItem, copyTo, pasteWithReplace, contextData);
    }

    const deleteTreeItem = (itemID, eachChildItemCallback = null, sourceArray=state.tree, onlyUpgradeArray=false) => {
        return deleteItem(itemID, eachChildItemCallback, sourceArray, onlyUpgradeArray, contextData);
    }

    const contextData = {
        ...state,
        setTree,

        generateNewUniqueID,

        createNewFile,
        createNewFolder,

        moveFile,
        addCopyOfItem,
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

        findAllFolderChildren,
        findFolderCurrentChildren,

        findTreeItemsByName,
        searchTextInAllFiles,
        replaceTextInFiles,

        sortFolderContent,

        newFileTemplate,
        newFolderTemplate,
    }

    return (
        <FileContext.Provider value={contextData}>
        { children }
        </FileContext.Provider>
    );
};

export default FileProvider;