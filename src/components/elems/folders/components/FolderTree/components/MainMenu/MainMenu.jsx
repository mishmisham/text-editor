
import React, { useContext, useMemo } from "react";
import InputText from '@/components/primitive/inputs/InputText/InputText';
import './MainMenu.sass';

import FileContext from '@/components/app/context/FileContext/FileContext.js'
import FolderTreeContext from '../../context/FolderTreeContext.js';

const MainMenu = () => {

    const {
        // folder context
        openFolders,
        search,
        setSearch,
        setOpenFolders,

        selectAllItemsToGroupAction,
        resetGroupActionSelection,
        isAllFoldersForGroupActionsSelected,

        // with file context usage
        createFile,
        createFolder,
    } = useContext(FolderTreeContext);

    const onSearch = (value) => {
        setOpenFolders([]);
        setSearch(value);
    }

    const allItemsSelected = useMemo(() => isAllFoldersForGroupActionsSelected(), [isAllFoldersForGroupActionsSelected]);

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
        },
        
        {
            text: allItemsSelected ? '◎' : '◉',
            title: allItemsSelected ? 'Отменить все' : 'Выделить все',
            action: () => {
                allItemsSelected ? resetGroupActionSelection() : selectAllItemsToGroupAction();
            },
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
                            button &&
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