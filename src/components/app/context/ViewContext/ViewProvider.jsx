import ViewContext from './ViewContext.js';
import ViewReducer from './ViewReducer.js'
import { useReducer } from "react";

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

    const openFileToCurrentView = (openFileID) => {
        const { views, currentView } = state;
        const currentViewFileIDs = views[currentView.view];

        if (currentViewFileIDs.indexOf(openFileID) === -1) {
            const newViews = [...views];
            newViews[currentView.view].push(openFileID);
            setViews(newViews);
        }

        setCurrentView({
            ...currentView,
            file: openFileID
        });
    }

    const closeFileIfCurrentView = (closeFileID) => {
        const { views, currentView } = state;
        const { view, file } = currentView;
        if (file === closeFileID) {
            const newOpenFileID = views[view].length ? views[view][0] : null;
           
            setCurrentView({
                ...currentView,
                file: newOpenFileID
            });
        }
    }

    const closeFileInTargetView = (closeFileID, viewIndex) => {
        const { views } = state;

        const newViews = [...views]
        newViews[viewIndex] = newViews[viewIndex].filter(id=>id !== closeFileID);

        closeFileIfCurrentView(closeFileID);
        setViews(newViews);  
    }

    const removeFileFromAllViews = (closeFileID) => {
        const { views } = state;

        const newViews = [...views];

        newViews.forEach(view => {
            const viewIndex = view.indexOf(closeFileID);
            if (viewIndex !== -1) {
                view.splice(viewIndex, 1);
            }
        });

        setViews(newViews);  
        closeFileIfCurrentView(closeFileID);
    }

    const closeOneView = (viewIndex) => {
        const { views, currentView } = state;
        const newViews = [...views];
        newViews.splice(viewIndex, 1);

        if (!newViews.length) {
            newViews.push([]);
        }

        if (currentView.view === viewIndex) {
            setCurrentView({
                ...currentView,
                view: 0,
                file: newViews[0].length ? newViews[0][0] : null,
            });
        }

        setViews(newViews);
    }

    const createNewView = () => {
        const { views } = state;
        setViews([...views, []])
    }

    const switchViewToSelectedFile = (fileID, viewIndex) => {
        const { currentView } = state;
        setCurrentView({
            ...currentView,
            file: fileID,
            view: viewIndex
        })
    }

    const isOpenFile = (itemID, views) => {
        return views.filter(view => {
            return view.indexOf(itemID) !== -1;
        }).length ? true : false;
    };

    return (
        <ViewContext.Provider value={{
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
        }}>
        { children }
        </ViewContext.Provider>
    );
};

export default ViewProvider;