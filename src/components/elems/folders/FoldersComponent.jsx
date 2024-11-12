import React, {  forwardRef, useState } from "react";
import './FoldersComponent.sass';
import TabsComponent from '@/components/primitive/TabsComponent/TabsComponent';
import CurrentlyOpenFiles from './components/CurrentlyOpenFiles/CurrentlyOpenFiles';
import SearchInFiles from './components/SearchInFiles/SearchInFiles';
import FolderTree from './components/FolderTree/FolderTree';
import { tabContents } from './tabContents';

const FoldersComponent = () => {

    const [currentTab, setCurrentTab] = useState('FolderTree');
    
    const componentList = {
        CurrentlyOpenFiles,
        SearchInFiles,
        FolderTree,
    };

    const CurrentComponent = componentList[currentTab];
    
    return (
        <div className="folders">
            <div className="folders-header">
                <TabsComponent
                    tabs={tabContents}
                    current={currentTab}
                    onChange={setCurrentTab}
                />
            </div>
            <div className="folders-content">
                <CurrentComponent />
            </div>
        </div>
    )
}

export default forwardRef(FoldersComponent);