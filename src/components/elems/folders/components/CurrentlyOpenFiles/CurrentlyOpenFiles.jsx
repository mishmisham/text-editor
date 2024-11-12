import React, { useMemo, useContext } from "react";
import './CurrentlyOpenFiles.sass';

import MainMenu from "./components/MainMenu/MainMenu";
import ViewItem from './components/ViewItem/ViewItem'

import FileContext from '@/components/app/context/FileContext/FileContext.js';
import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';

const CurrentlyOpenFiles = () => {

    const {
        tree,
        getTreeItemPath,
        getTreeItemByID,
    } = useContext(FileContext);

    const {
        views,
        currentView,
    } = useContext(ViewContext);

    const openViews = useMemo(() => {
        return views.map((view, i) => {
            const defaultViewClass = 'currently-open-files_view';
            const isCurrentView = i === currentView.view;
            const viewClass = isCurrentView ? `${defaultViewClass} ${defaultViewClass}--current` : defaultViewClass;
            return {
                key: `view-${i}`,
                index: i,
                isCurrent: isCurrentView,
                className: defaultViewClass,
                wrapperClassName: viewClass,
                fileIDs: view,
                name: `View ${ i + 1 }`,
                files: view.map(fileID => {
                    const { item, index } = getTreeItemByID(fileID);
                    const isCurrentFile = fileID === currentView.file;
                    const defaultFilelass = 'currently-open-files_file';
                    const fileClass = isCurrentFile ? `${defaultFilelass} ${defaultFilelass}--current` : defaultFilelass;
                    return {
                        key: `file-${i}-${fileID}`,
                        item,
                        index,
                        viewIndex: i,
                        className: defaultFilelass,
                        wrapperClassName: fileClass,
                        isCurrent: isCurrentFile,
                        path: getTreeItemPath(item),
                    };
                }),
            }
        });
    }, [tree, views, currentView.view, currentView.file, getTreeItemByID, getTreeItemPath]);
    
    return (
        <div className="currently-open-files">
            <div className="currently-open-files_header">

                <MainMenu/>

            </div>
            <div className="currently-open-files_content">
                <div className="currently-open-files_content_inner">
                {
                    openViews.map((view, i) => {
                       return (
                            <ViewItem
                                key={view.key}
                                view={view}
                            />
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default CurrentlyOpenFiles;