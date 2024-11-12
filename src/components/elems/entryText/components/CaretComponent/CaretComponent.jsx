import React, { forwardRef, useImperativeHandle, useState, useMemo } from 'react';
import useWatch from '@/hooks/useWatch'
import './CaretComponent.sass'
import {
    getCaretPosition,
    setCaretPosition,
    getSelectionRange,
    setSelectionRange
} from './utils/contentEditableCaretPosition';

const CaretComponent = ({
    inputListRef,
    textInformation,
    leftAsideMethods
}, ref) => {

    // current caret position
    const [caret, setCaret] = useState(0);
    // current selection
    const [selection, setSelection] = useState({start: 0, end: 0});

    const [caretXY, setCaretXY] = useState({
        top: 0,
        left: 0,
        height: 0
    })

    const isSingleRowMode = useMemo(() => {
        let { start, end } = selection;
        return start === end;
    }, [selection])

    const [caretInfo, setCaretInfo] = useState();

    const refreshCaretInfo = () => {
        if (!inputListRef.current) {
            setCaretInfo({
                caretNode: null,
                startNode: null,
                endNode: null,
                currentRowNumber: null,
                startRowNumber: null,
                endRowNumber: null,
                selectedRows: null,
            });
        }

        const {
            start, end
        } = selection;

        const getRowNumber = (node) => {
            return node ? parseInt(node.getAttribute('data-row')) : null
        }

        const caretNode = inputListRef.current.querySelector(`[data-position="${start}"]`);
        const currentRowNumber = getRowNumber(caretNode);

        const startNode = isSingleRowMode ? null : inputListRef.current.querySelector(`[data-position="${start}"]`);
        const startRowNumber = isSingleRowMode ? null : getRowNumber(startNode);
        const endNode = isSingleRowMode ? null : inputListRef.current.querySelector(`[data-position="${end}"]`);
        const endRowNumber = isSingleRowMode ? null : getRowNumber(endNode);

        const selectedRows = [];

        if (!isSingleRowMode) {
            for (let i = startRowNumber; i <= endRowNumber; i ++) {
                selectedRows.push(textInformation.rows[i])
            }
        } else {
            selectedRows.push(textInformation.rows[currentRowNumber]);
        }

        setCaretInfo({
            caretNode,
            startNode,
            endNode,
            currentRowNumber,
            startRowNumber,
            endRowNumber,
            selectedRows
        });
    };

    const getCaretXY = () => {
        if (selection.start !== selection.end || !inputListRef.current) {
            return;
        }

        const pos = inputListRef.current.querySelector(`[data-position="${caret}"]`);
       
        if (!pos) {
            return;
        }

        const positionRow = pos.closest(`.row`);

        const heightOnePercent = positionRow.offsetHeight / 100;
        const itemHeight = (80 * heightOnePercent) + 'px';
        const itemTop = (12 * heightOnePercent)  + 'px';

        return {
            top: positionRow.offsetTop,
            left: pos.offsetLeft,
            height: itemHeight,
            minHeight: itemHeight,
            maxHeight: itemHeight,
            marginTop: itemTop 
        }
    }

    const selectionXY = useMemo(() => {
        if (!inputListRef.current || selection.start === selection.end) {
            return;
        }

        const { selectedRows } = caretInfo;
       
        if (!selectedRows || !selectedRows.length) {
            return [];
        }

        const coords = selectedRows.map(rowObject => {
            const { summary } = rowObject;
            const rowNumber = summary.row;
            const {
                start, end
            } = summary.position;
            
            const minStart = Math.max(selection.start, start);
            const maxEnd = Math.min(selection.end, end) - 1;
            
            const rowItem = inputListRef.current.querySelector(`[data-container-row="${rowNumber}"]`);
            const first = rowItem.querySelector(`[data-position="${minStart}"]`);
            
            let last = rowItem.querySelector(`[data-position="${maxEnd}"]`);

            if (!last) {
                const fixedLastIndex = rowObject.structure[rowObject.structure.length - 1].position.start;
                last = rowItem.querySelector(`[data-position="${fixedLastIndex}"]`);
            }

            if (!first || !last) {
                return {
                    top: null,
                    left: null,
                    height: null,
                    width: null
                }
            }

            const heightOnePercent = rowItem.offsetHeight / 100;
            const itemHeight = (80 * heightOnePercent) + 'px';

            return {
                top: rowItem.offsetTop,
                left: first.offsetLeft,
                height: itemHeight,
                minHeight: itemHeight,
                maxHeight: itemHeight,
                width: (last.offsetLeft + last.offsetWidth) - first.offsetLeft
            }
        });

        return coords.filter(item=>item);
    }, [inputListRef, caretInfo, selection])
    
    const restoreCurrentCaret = () => {
        if (!inputListRef.current) {
            return;
        }

        if (isSingleRowMode) {
            setCaretPosition(inputListRef.current, caret, ['real-br']);
        } else {
            setSelectionRange(inputListRef.current, selection.start, selection.end);
        }

        if (isSingleRowMode) {
            setCaretXY(getCaretXY());
        }

        refreshCaretInfo();
    }

    const getCurrentCaretPosition = () => {
        if (!inputListRef.current) {
            return;
        }

        const position = getCaretPosition(inputListRef.current);
        return position;
    }

    const getCurrentSelection = () => {
        if (!inputListRef.current) {
            return selection;
        }

        const {
            start, end
        } =  getSelectionRange(inputListRef.current);

        return {
            start,
            end
        };
    }

    const backupCaret = () => {
        const position = getCurrentCaretPosition();
        const currentSelection = getCurrentSelection();
        if (position !== caret) {
            setCaret(position);
        }
        if (currentSelection.start !== selection.start || currentSelection.end !== selection.end) {
            setSelection(currentSelection);
        }
    }

    useWatch(() => {
        restoreCurrentCaret();
    }, [caret, selection]);

    useWatch(() => {
        if (caretInfo) {
            leftAsideMethods('refreshCurrentRowNumber', caretInfo.currentRowNumber)
        }
    }, [caretInfo])

    useImperativeHandle(ref, () => ({
        getCaretInfo() {
            return {
                caret,
                selection,
                isSingleRowMode,
                ...caretInfo
            }
        },

        restoreCaret() {
            restoreCurrentCaret();
        },

        backupCaretPosition() {
            backupCaret();
        },
    }));

    const caretStyles = useMemo(() => {
        return {
            ...caretXY,
        }
    }, [caretXY]);

    const selectedRowStyles = (row) => {
        const rowItem = inputListRef.current.querySelector(`[data-container-row="${row.summary.row}"]`);
        return {
            top: rowItem.offsetTop + 'px',
            height: (rowItem.offsetHeight) + 'px',
        }
    }

    return (
        <>
        {
            caretInfo && caretInfo.selectedRows && caretInfo.selectedRows.map((row, i) => {
                return (
                    row && <div
                        className="selected-row"
                        style={selectedRowStyles(row)}
                        key={i}
                    ></div>
                )
            })
        }
        {
            caretXY && (selection.start === selection.end) && <div
                className="caret-component"
                style={caretStyles}
            ></div>
        }
        {
            selectionXY && selectionXY.map((row, i) => {
                 return <div
                             className="caret-selection"
                             style={row}
                             key={i}
                       ></div>
             })
        }
        
        </>
    )
}

export default forwardRef(CaretComponent);