import React from "react";
import './FolderTree.sass';

import MainMenu from './components/MainMenu/MainMenu'
import TreeComponent from './components/TreeComponent/TreeComponent';

import FolderTreeProvider from './context/FolderTreeProvider';

const FolderTree = () => {

    return (
        <FolderTreeProvider>
            <div className="folder-tree">
                
                <div className="folder-tree_header">
                    <MainMenu />
                </div>

                <TreeComponent />

            </div>
        </FolderTreeProvider>
    )
}

export default FolderTree;