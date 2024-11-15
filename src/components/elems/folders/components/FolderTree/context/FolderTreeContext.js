import { createContext, useRef } from 'react';

export default createContext({
    search: '',
    renameID: null,
    currentSelected: null,
    openFolders: [],
    cutOrCopyItem: null,
    contentRef: null,
    confirmDeleteModal: null,
    contextMenuItem: null,
    mouseDownItem: null,
    mouseOverItem: null,
    mouseMoveAbsoluteCoordinates: null,

    fileContext: {},
    viewContext: {},

    // current context
    setSearch: ()=>{},
    setRenameID: ()=>{},
    setOpenFolders: ()=>{},
    setCurrentSelected: ()=>{},
    setCutOrCopyItem: ()=>{},
    setContextMenuItem: ()=>{},
    setMouseDownItem: ()=>{},
    setMouseOverItem: ()=>{},
    setMouseMoveAbsoluteCoordinates: ()=>{},
    isDropFileTarget: ()=>{},
    resetMouseSelectionsFolderTree: ()=>{},
    checkIfNeedOpenHoveredFolder: ()=>{},
    isOpenFolder: ()=>{},
    openFolder: ()=>{},
    closeFolder: ()=>{},
    startRenameItem: ()=>{},
    cancelRename: ()=>{},
    onRemoveChildItemsCallback: ()=>{},

    // functions, that use file context
    getCurrentSelectedFolder: ()=>{},
    openSelectedFolderIfNot: ()=>{},
    createFile: ()=>{},
    createFolder: ()=>{},
    pasteFolderItem: ()=>{},
    deleteFolderItem: ()=>{},
});
