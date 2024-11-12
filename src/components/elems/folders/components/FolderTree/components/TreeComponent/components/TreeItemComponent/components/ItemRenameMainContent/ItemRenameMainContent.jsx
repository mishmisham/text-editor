import React, { useContext, useState, useRef, useEffect } from "react";
import InputText from '@/components/primitive/inputs/InputText/InputText';
import useAddEventListener from '@/hooks/useAddEventListener';

import FileContext from '@/components/app/context/FileContext/FileContext.js';
import FolderTreeContext from '../../../../../../context/FolderTreeContext.js';

const ItemRenameMainContent = ({
    item,
    itemIcon,
}) => {
    const [fileName, setFileName] = useState(item.name);
    const renameRef = useRef(null);

    useEffect(() => {
        if (renameRef.current) {
            renameRef.current.focus();
        }
    });

    useAddEventListener(document, 'keydown', e=>{
        if (e.key === 'Enter') {
            saveRename();
        }
        if (e.key === 'Escape') {
            cancelRename();
        }
    });

    useAddEventListener(document, 'mousedown', e=>{
        if (!e.target.closest('.folder-tree-item--current')) {
            cancelRename();
        }
    });
    
    const {
        renameTreeItem,
    } = useContext(FileContext);

    const {
        cancelRename,
        setRenameID,
    } = useContext(FolderTreeContext);

    const saveRename = () => {
        renameTreeItem(item.id, fileName);
        setRenameID(null);
    }

    return (
        ( <>
            <div className="folder-tree-item_item-actions">
                <button
                    onClick={cancelRename}
                    title="Отмена"
                >
                    ✕
                </button>
                <button
                    onClick={saveRename}
                    title="Переименовать"
                >
                    ✔
                </button>
            </div>

            <span className="folder-tree-item_type-icon">
                {itemIcon}
            </span>

            <InputText
                onInput={(e)=>setFileName(e)}
                value={fileName}
                ref={renameRef}
            />
        </> )
    )
}

export default ItemRenameMainContent;