
import React, { useContext } from "react";
import './MainMenu.sass';
import InputText from '@/components/primitive/inputs/InputText/InputText';

import useDebounced from '@/hooks/useDebounced';

import FileContext from '@/components/app/context/FileContext/FileContext.js';

const MainMenu = ({
    replaceText,
    setReplaceText,
    searchText,
    setLoading,
    setSearchText,
    searchResults,
    setSearchResults
}) => {

    const {
        searchTextInAllFiles,
        replaceTextInFiles
    } = useContext(FileContext);

    const search = useDebounced(async (value) => {
        const results = await searchTextInAllFiles(value, true);
        setSearchResults(results);
        setLoading(false);
    }, 500);

    const onInput = async (value) => {
        if (!value) {
            setSearchText(value);
            return;
        }
        setLoading(true);
        setSearchText(value);
        search(value);
    }

    const replaceInFiles = () => {
        if (!searchResults.length || !searchText) {
            return;
        }

        replaceTextInFiles(searchResults, searchText, replaceText);
        setSearchResults([]);
    }

    return (
        <div className="search-in-files_main-menu">
            <div className="search-in-files_main-menu-inner">
                <div className="search-in-files_main-menu-row">
                    <InputText
                        onInput={onInput}
                        value={searchText}
                        addReset={true}
                        placeholder="Поиск в файлах"
                    />
                </div>
                <div className="search-in-files_main-menu-row">
                    <InputText
                        onInput={e=>setReplaceText(e)}
                        value={replaceText}
                        addReset={true}
                        placeholder="Заменить"
                    />
                    <button
                        onClick={replaceInFiles}
                        title="Заменить"
                        disabled={!searchText || !replaceText}
                    >↬</button>
                </div>
            </div>
        </div>
    )
}

export default MainMenu;