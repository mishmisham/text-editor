import FolderTreeContext from './FolderTreeContext.js';
import FolderTreeReducer from './FolderTreeReducer.js'
import { useReducer } from "react";

const FolderTreeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FolderTreeReducer, {
        search: '',
        renameID: null,
        currentSelected: null,
        openFolders: [],
        cutOrCopyItem: null,

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

    const resetMouse = () => {
        setMouseDownItem(null);
        setMouseOverItem(null);
        setMouseMoveAbsoluteCoordinates(null);
    }

    const isDropFileTarget = (itemID) => {
        const { mouseDownItem, mouseOverItem } = state;
        return mouseDownItem
                    && mouseOverItem
                    && mouseDownItem.id !== itemID
                    && mouseOverItem.id === itemID;
    };

    const checkIfNeedOpenHoveredFolder = (id) => {
        const { mouseOverItem, mouseDownItem } = state;

        const notNeed = !mouseOverItem
        || mouseOverItem.id !== id
        || mouseOverItem.type !== 'folder'
        || !mouseDownItem
        || mouseDownItem.id === mouseOverItem.id

        return !notNeed;
    }

    const isOpenFolder = (itemID) => {
        const { openFolders } = state;
        return openFolders.indexOf(itemID) !== -1
    };

    const openFolder = (itemID) => {
        const { openFolders } = state;
        const newFolderList = [ ...openFolders ]
                                    .filter(folderID=>folderID !== itemID);
        newFolderList.push(itemID);
        setOpenFolders(newFolderList);
    }

    const closeFolder = (itemID) => {
        const { openFolders } = state;
        const newFolderList = [ ...openFolders ]
                                    .filter(folderID=>folderID !== itemID);
        setOpenFolders(newFolderList);
    }

    const startRenameItem = (itemID) => {
        setCurrentSelected(itemID);
        setRenameID(itemID);
    }

    const cancelRename = () => {
        setRenameID(null);
    }

    const onRemoveChildItemsCallback = (child) => {
        const { 
            currentSelected,
            renameID,
            openFolders,
        } = state;

        if (currentSelected === child.item.id) {
            setCurrentSelected(null);
        }
        if (renameID === child.item.id) {
            setRenameID(null);
        }
        if (openFolders.indexOf(child.item.id)) {
            const newOpenFolders = openFolders.filter(id => id !== child.item.id);
            setOpenFolders(newOpenFolders);
        }
    }

    return (
        <FolderTreeContext.Provider value={{
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

            resetMouse,
            checkIfNeedOpenHoveredFolder,

            isOpenFolder,
            openFolder,
            closeFolder,

            startRenameItem,
            cancelRename,

            onRemoveChildItemsCallback,
        }}>
        { children }
        </FolderTreeContext.Provider>
    );
};

export default FolderTreeProvider;