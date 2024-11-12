import React, { useState, useContext } from "react";
import './ViewItemFileItem.sass';

import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';

const ViewItemFileItem = ({
    view,
    file,
}) => {

    const {
        closeFileInTargetView,
        switchViewToSelectedFile
    } = useContext(ViewContext);

    const [collapsed, setCollapsed] = useState(true);

    const collapse = () => {
        setCollapsed(!collapsed);
    }

    const closeFile = () => {
        closeFileInTargetView(file.item.id, file.viewIndex);
    }

    const switchToFile = () => {
        switchViewToSelectedFile(file.item.id, file.viewIndex);
    }

    return (
        <div
            className={file.wrapperClassName}
            key={file.key}
        >
            <div className={file.className+'-title'}>
                <button
                    className={file.className+'-title-collapse'}
                    onClick={collapse}>
                    {( collapsed ? '+' : '-')}
                </button>
                <span className={file.className+'-title-name'}>
                    { file.item.name }
                </span>
                <button
                    onClick={closeFile}
                    className={file.className+'-title-action'}
                    title="Закрыть файл"
                >
                    ⏏
                </button>
                { !file.isCurrent &&
                    <button
                        onClick={switchToFile}
                        className={file.className+'-title-action'}
                        title="Переключиться на этот файл"
                    >
                        ⇨
                    </button>
                }
            </div>
            {
                !collapsed &&
                <div className={file.className+'-details'}>
                    <div className={file.className+'-path'}>
                        <div className={file.className+'-path-inner'}>
                            <span className={file.className+'-path-item'}>~/</span>
                            {
                                file.path.length &&
                                file.path.map((pathItem, index) => {
                                    if (!pathItem) {
                                        return null
                                    }
                                    return (
                                        <span
                                            className={file.className+'-path-item'}
                                            key={file.key + '-' + index}
                                        >{pathItem.name}/</span>
                                    )
                                })
                            }
                            <span className={file.className+'-path-item'}>
                                { file.item.name }
                            </span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ViewItemFileItem;