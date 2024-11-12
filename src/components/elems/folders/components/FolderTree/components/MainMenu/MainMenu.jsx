
import React, { useMemo, useContext } from "react";
import InputText from '@/components/primitive/inputs/InputText/InputText';
import './MainMenu.sass';

import FileContext from '@/components/app/context/FileContext/FileContext.js';
import FolderTreeContext from '../../context/FolderTreeContext.js';

const MainMenu = () => {

    const {
        tree,
        createNewFolder,
        getTreeItemByID,
        createNewFile,
    } = useContext(FileContext);

    const {
        openFolders,
        currentSelected,
        search,
        setSearch,
        setOpenFolders,
        setRenameID,
        setCurrentSelected,
    } = useContext(FolderTreeContext);

    const onSearch = (value) => {
        setOpenFolders([]);
        setSearch(value);
    }

    const openSelectedFolderIfNot = () => {
        if (openFolders.indexOf(currentSelectedFolder) === -1) {
            setOpenFolders([...openFolders, currentSelectedFolder])
        }
    }

    const currentSelectedFolder = useMemo(() => {
        if (!currentSelected) {
            return null;
        }
        const { item } = getTreeItemByID(currentSelected);
        if (!item) {
            return null;
        }

        return item.type === 'folder' ? currentSelected : (item.parent ? item.parent : 0);
    }, [currentSelected, tree]);

    const buttons = [
        {
            text: '☵',
            title: 'Создать файл',
            action: () => {
                const newFile = createNewFile(currentSelectedFolder);

                openSelectedFolderIfNot();
                setCurrentSelected(newFile.id);
                setRenameID(newFile.id);
            }
        },
        {
            text: '❒',
            title: 'Создать папку',
            action: () => {
                const newFolder = createNewFolder(currentSelectedFolder);
               
                openSelectedFolderIfNot();
                setCurrentSelected(newFolder.id);
                setRenameID(newFolder.id);
            }
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