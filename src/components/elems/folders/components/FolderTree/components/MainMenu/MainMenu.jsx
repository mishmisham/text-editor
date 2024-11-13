
import React, { useContext } from "react";
import InputText from '@/components/primitive/inputs/InputText/InputText';
import './MainMenu.sass';

import FolderTreeContext from '../../context/FolderTreeContext.js';

const MainMenu = () => {

    const {
        // folder context
        openFolders,
        search,
        setSearch,
        setOpenFolders,

        // with file context usage
        createFile,
        createFolder,
    } = useContext(FolderTreeContext);

    const onSearch = (value) => {
        setOpenFolders([]);
        setSearch(value);
    }

    const buttons = [
        {
            text: '☵',
            title: 'Создать файл',
            action: () => createFile()
        },
        {
            text: '❒',
            title: 'Создать папку',
            action: () => createFolder()
        },
        {
            text: '-',
            title: 'Свернуть все',
            action: () => setOpenFolders([]),
            disabled: !openFolders.length
        }
    ]
    
    return (
        <div className="folder-tree_main-menu">
            <div className="folder-tree_main-menu-inner">
                <InputText
                    value={search}
                    onInput={onSearch}
                    addReset={true}
                    placeholder="Поиск"
                />
                {
                    buttons.map((button, i) => {
                        return (
                            <button
                                onClick={button.action}
                                disabled={button.disabled}
                                title={button.title}
                                key={i}
                            >
                                <span>{button.text}</span>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MainMenu;