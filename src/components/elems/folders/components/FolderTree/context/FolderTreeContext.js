import { createContext, useRef } from 'react';

export default createContext({
    search: '',
    renameID: null,
    currentSelected: null,
    openFolders: [],
    cutOrCopyItem: null,

    mouseContextMenuItem: null,
    mouseDownItem: null,
    mouseOverItem: null,
    mouseMoveAbsoluteCoordinates: null,

    setSearch: ()=>{},
    setRenameID: ()=>{},
    setOpenFolders: ()=>{},
    setCurrentSelected: ()=>{},
    setCutOrCopyItem: ()=>{},

    setContextMenuItem: ()=>{},
    setMouseDownItem: ()=>{},
    setMouseOverItem: ()=>{},
    setMouseMoveAbsoluteCoordinates: ()=>{},

    resetMouse: ()=>{},
    checkIfNeedOpenHoveredFolder: ()=>{},
});
