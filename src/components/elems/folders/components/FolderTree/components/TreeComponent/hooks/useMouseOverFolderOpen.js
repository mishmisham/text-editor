import { useContext } from "react";
import useWatch from '@/hooks/useWatch';
import useDebounced from '@/hooks/useDebounced';

import FolderTreeContext from '../../../context/FolderTreeContext.js';
export default function useMouseOverFolderOpen () {
    const {
        mouseOverItem,
        checkIfNeedOpenHoveredFolder
    } = useContext(FolderTreeContext);

    const onMoveFileOpenFolder = useDebounced((id) => {
        if ( !checkIfNeedOpenHoveredFolder(id) ) {
            return;
        }

        mouseOverItem.openFolder();
    }, 400);

    useWatch(()=>{
        if (!mouseOverItem) {
            return;
        }

        onMoveFileOpenFolder(mouseOverItem.id);
    }, [mouseOverItem]);
}