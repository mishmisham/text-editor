

export default function FolderTreeReducer(state, action) {
    switch (action.type) {
        case 'setSearch':
            return {
                ...state,
                search: action.payload
            };
        case 'setRenameID':
            return {
                ...state,
                renameID: action.payload
            };
        case 'setOpenFolders':
            return {
                ...state,
                openFolders: action.payload
            };
        case 'setCurrentSelected':
            return {
                ...state,
                currentSelected: action.payload
            };
        case 'setCutOrCopyItem':
            return {
                ...state,
                cutOrCopyItem: action.payload
            };

        case 'setContextMenuItem':
            return {
                ...state,
                mouseContextMenuItem: action.payload
            };
        case 'setMouseDownItem':
            return {
                ...state,
                mouseDownItem: action.payload
            };
        case 'setMouseOverItem':
            return {
                ...state,
                mouseOverItem: action.payload
            };
        case 'setMouseMoveAbsoluteCoordinates':
            return {
                ...state,
                mouseMoveAbsoluteCoordinates: action.payload
            };

        default:
          throw new Error();
      }
}