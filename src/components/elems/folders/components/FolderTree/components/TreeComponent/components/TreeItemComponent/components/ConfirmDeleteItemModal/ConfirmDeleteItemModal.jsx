import React, { useContext, useRef, forwardRef, useImperativeHandle } from "react";
import useAddEventListener from '@/hooks/useAddEventListener';

import ModalComponent from '@/components/primitive/ModalComponent/ModalComponent.jsx';
import FileContext from '@/components/app/context/FileContext/FileContext.js';
import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';
import FolderTreeContext from '../../../../../../context/FolderTreeContext.js';

const ConfirmDeleteItemModal = ({
    item,
    contentRef
}, ref) => {

    const {
        deleteTreeItem,
    } = useContext(FileContext);

    const {
        removeFileFromAllViews,
    } = useContext(ViewContext);

    const {
        onRemoveChildItemsCallback,
    } = useContext(FolderTreeContext);
    
    const modal = useRef(null);

    const confirmDelete = () => {
        deleteTreeItem(item.id, (child)=>{
            onRemoveChildItemsCallback(child);
            removeFileFromAllViews(child.item.id);
        });
    }

    const openModal = () => {
        modal.current.openModal(true);
    }

    const closeModal = () => {
        modal.current.openModal(false);
    }

    useImperativeHandle(ref, () => ({
        openModal() {
            openModal();
        },
    }));

    useAddEventListener(document, 'keydown', e=>{
        if (!modal?.current?.isOpen) {
            return;
        }
        if (e.key === 'Enter') {
            confirmDelete();
        }
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    const appendProps = () => {
        if (contentRef && contentRef.current) {
            return {
                appendTo: contentRef.current,
                modeAbsolute: true
            };
        }

        return {
            modeAbsolute: false
        }
    }

    return (
        <ModalComponent
            ref={modal}
            customStyle={{
                maxWidth: '240px',
                padding: '8px'
            }}
            {
                ...appendProps()
            }
            BodyComponents={() => {
                return (
                    <div style={{
                        width: '100%',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        <span>Удалить {item.name} ?</span>
                    </div>
                )
            }}
            FooterComponents={() => {
                return (
                    <>
                        <button onMouseUp={confirmDelete}>Да</button>
                        <button onMouseUp={closeModal}>Нет</button>
                    </>
                )
            }}
        />
    )
}

export default forwardRef(ConfirmDeleteItemModal);