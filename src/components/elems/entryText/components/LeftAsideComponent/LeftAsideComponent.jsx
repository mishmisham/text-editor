import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import './LeftAsideComponent.sass';

const LeftAsideComponent = ({
    inputListRef,
    textInformation,
}, ref) => {

    const wrapperRef = useRef(null)
    const [rowNumbers, setRowNumbers] = useState([]);
    const [currentRow, setCurrentRow] = useState(null);

    const updateRowNumbers = () => {
        if (!inputListRef.current || textInformation.rows.length === rowNumbers.length) {
            return [];
        }

        const rowContainers = inputListRef.current.querySelectorAll('.row');

        const rows = textInformation.rows.map((row) => {
            const container = rowContainers[row.summary.row];
            const itemHeight = container.offsetHeight + 'px';

            return {
                row: row.summary.row,
                number: row.summary.displayRowNumber,
                item: row,
                styles: {
                    height: itemHeight,
                    minHeight: itemHeight,
                    maxHeight: itemHeight
                }
            }
        });

        setRowNumbers(rows);
    };

    useImperativeHandle(ref, () => ({

        aside: wrapperRef.current,

        refreshRowNumbers() {
            updateRowNumbers();
        },

        refreshCurrentRowNumber(number) {
            setCurrentRow(number);
        },
    }));

    return (
        <div
            className='left-aside'
            ref={wrapperRef}
        >
            {
                rowNumbers.map((item, i) => {
                    const rowClassName = currentRow === item.row ? 'left-aside_row left-aside_row--current' : 'left-aside_row';
                    return (
                        <div
                            className={rowClassName}
                            style={item.styles}
                            key={i}
                        >
                            <span className='left-aside_row-number'>
                                { item.number }
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default forwardRef(LeftAsideComponent);