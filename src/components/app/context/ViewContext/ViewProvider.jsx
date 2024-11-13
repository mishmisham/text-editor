import ViewContext from './ViewContext.js';
import ViewReducer from './ViewReducer.js'
import { useReducer } from "react";
import * as ViewProviderMethods from './methods';

import {
    demofolders
  } from '../../demofolders';

// all View tree in open project folder
const ViewProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ViewReducer, {
        currentView: demofolders.currentView,
        views: demofolders.views
    });

    const setViews = (newViews) => dispatch({
        payload: newViews,
        type: 'setViews'
    });

    const setCurrentView = (currentView) => dispatch({
        payload: currentView,
        type: 'setCurrentView'
    });

    const isOpenFile = (itemID) => {
        ViewProviderMethods.isOpenFile(itemID, contextData);
    };

    const createNewView = (switchToNew=false) => {
        ViewProviderMethods.createNewView(switchToNew, contextData);
    }

    const openFileToCurrentView = (openFileID) => {
        ViewProviderMethods.openFileToCurrentView(openFileID, contextData);
    }

    const switchViewToSelectedFile = (fileID, viewIndex) => {
        ViewProviderMethods.switchViewToSelectedFile(fileID, viewIndex, contextData);
    }

    const closeFileIfCurrentView = (closeFileID) => {
        ViewProviderMethods.closeFileIfCurrentView(closeFileID, contextData);
    }

    const closeFileInTargetView = (closeFileID, viewIndex) => {
        ViewProviderMethods.closeFileInTargetView(closeFileID, viewIndex, contextData);
    }

    const closeOneView = (viewIndex) => {
        ViewProviderMethods.closeOneView(viewIndex, contextData);
    }

    const removeFileFromAllViews = (closeFileID) => {
        ViewProviderMethods.removeFileFromAllViews(closeFileID, contextData);
    }


    const contextData = {
        ...state,

        setViews,
        setCurrentView,

        isOpenFile,
        openFileToCurrentView,
        closeFileInTargetView,
        closeFileIfCurrentView,
        removeFileFromAllViews,
        switchViewToSelectedFile,
        
        createNewView,
        closeOneView,
    }

    return (
        <ViewContext.Provider value={contextData}>
        { children }
        </ViewContext.Provider>
    );
};

export default ViewProvider;