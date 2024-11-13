import React, { useState, useContext } from "react";
import './ViewItem.sass';
import ViewItemFileItem from './ViewItemFileItem/ViewItemFileItem';

import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';

const ViewItem = ({
    view,
}) => {

    const {
        closeOneView,
        switchViewToSelectedFile,
    } = useContext(ViewContext);

    const collapsedByDefault = !view.isCurrent;
    const [collapsed, setCollapsed] = useState(collapsedByDefault);

    const switchToView = () => {
        const fileID = view.fileIDs.length ? view.fileIDs[0] : null;
        switchViewToSelectedFile(fileID, view.index);
    }

    const closeView = () => {
        closeOneView(view.index);
    }

    return (
        <div
            className={view.wrapperClassName}
            key={view.key}
        >
            <div className={view.className+'-header'}>
                <button
                    onClick={e=>setCollapsed(!collapsed)}
                    className={view.className+'-collapse'}
                >
                    {( collapsed ? '+' : '-')}
                </button>
                <span className={view.className+'-title'}>
                    { view.name }
                </span>
                <button
                    onClick={closeView}
                    className={view.className+'-action'}
                    title="Закрыть view"
                >
                    ⏏
                </button>
                { !view.isCurrent &&
                    <button
                        onClick={switchToView}
                        className={view.className+'-action'}
                        title="Переключиться на этот view"
                    >
                        ⇨
                    </button>
                }
            </div>
            <div className={view.className+'-files'} >
            {
                !collapsed &&
                view.files.map((file) => {
                    return (
                        <ViewItemFileItem
                            file={file}
                            view={view}
                            key={file.key}
                        />
                    )
                })
            }
            </div>
        </div>
    )
}

export default ViewItem;