import React, { useContext } from "react";
import './FoundFileComponent.sass';
import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';

const FoundFileComponent = ({
    file,
    searchText,
    replaceText,
}) => {

    const {
        openFileToCurrentView
    } = useContext(ViewContext);

    const openFound = () => {
        openFileToCurrentView(file.file.id);
    }

    const FoundText = () => {
        if (replaceText) {
            return (
                <>
                    <span className="search-in-files_results-found-item-highlight search-in-files_results-found-item-highlight--old">
                        {searchText}
                    </span>
                    <span className="search-in-files_results-found-item-highlight search-in-files_results-found-item-highlight--new">
                        {replaceText}
                    </span>
                </>
            )
        } else {
            return (
                <span className="search-in-files_results-found-item-highlight">
                    {searchText}
                </span>
            )
        }
    }

    return (
        <div
            className="search-in-files_results"
        >
            <div className="search-in-files_results-name">
                { file.file.name }
            </div>
            <div className="search-in-files_results-path">
                <span>~/</span>
                {
                    file.path.map((pathItem) =>{
                        return (
                            <span key={pathItem.id}>{pathItem.name}/</span>
                        )
                    })
                }
                <span>{ file.file.name }</span>
            </div>
            <div className="search-in-files_results-found">
            {
                file.found.map((item) => {
                    return (
                        <div
                            onClick={openFound}
                            className="search-in-files_results-found-item"
                            key={item.position}
                        >
                            <span className="search-in-files_results-found-item-context">
                                {item.before}
                            </span>

                            <FoundText />

                            <span className="search-in-files_results-found-item-context">
                                {item.after}
                            </span>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default FoundFileComponent;