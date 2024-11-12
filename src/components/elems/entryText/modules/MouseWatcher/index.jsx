import React, {useState, useImperativeHandle, forwardRef} from "react";

const MouseWatcher = (props,  ref) => {
    // mouseIsDown
    const [mouseIsDown, setMouseIsDown] = useState(false);
    // mouse click coordinates
    const [clickCoordinates, setMouseClickCoordinates] = useState({});
    // mouse move coordinates
    const [currentCoordinates, setMouseCurrentCoordinates] = useState({x:0, y:0});

    useImperativeHandle(ref, () => ({

        setMouseIsDown(value) {
            setMouseIsDown(value);
        },

        setClickCoordinates(e) {
            setMouseClickCoordinates(e);
        },

        setMouseMoveCoordinates(posiiton) {
            setMouseCurrentCoordinates(posiiton)
        },

        info() {
            return {
                mouseIsDown,
                clickCoordinates,
                currentCoordinates
            }
        }
    
    }));

    return (<></>)
}

export default forwardRef(MouseWatcher);