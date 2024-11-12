import React, { useState } from "react";
import './SearchInFiles.sass';
import FoundFileComponent from './components/FoundFileComponent/FoundFileComponent';
import MainMenu from './components/MainMenu/MainMenu';
import PreloaderComponent from '@/components/primitive/PreloaderComponent/PreloaderComponent';

const SearchInFiles = () => {

    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
   
    return (
        <div className="search-in-files">
            <div className="search-in-files_header">
                <MainMenu
                    {
                        ...{
                            replaceText,
                            setReplaceText,
                            searchText,
                            setLoading,
                            setSearchText,
                            searchResults,
                            setSearchResults
                        }
                    }
                />
            </div>
            <div className="search-in-files_content">
                <div className="search-in-files_content_inner">
                    { !loading && 
                        searchResults.map((file, k) => {
                            return (
                                <FoundFileComponent
                                    file={file}
                                    searchText={searchText}
                                    replaceText={replaceText}
                                    key={k}
                                />
                            )
                        })
                    }
                    {
                        loading &&
                        <PreloaderComponent />
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchInFiles;