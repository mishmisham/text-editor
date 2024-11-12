import React, { useEffect, useState } from "react";
import classNames from 'classnames';
import './NotifyComponent.sass'

const NotifyComponent = ({ show, text, timeout, type, onHide }) => {

    const [displayNotify, setDisplayNotify] = useState(false);
    const [displayTimeout, setDisplayTimeout] = useState(5000);

    useEffect(() => {

        if (timeout) {
            setDisplayTimeout(timeout);
        }

        setDisplayNotify(show);

        if (displayTimeout > 0 && displayNotify)  {
            setTimeout(() => {
                onHide();
                setDisplayNotify(false);
            }, displayTimeout);
        }
    }, [displayNotify, displayTimeout, onHide, setDisplayNotify, show, timeout]);

    const hideNotify = () => {
        onHide();
        setDisplayNotify(false);
    }

    const wrapperClass = classNames({
        'notify-component': true,
        'notify-component--visible': displayNotify,
        'notify-component--hidden': !displayNotify,
    });

    const innerContentClass = 'notify-component_inner-content notify-component_inner-content--'+type;

    return (
        <div className={wrapperClass}>
            <div className="notify-component_inner">
                <div className={innerContentClass}>
                    <div className="notify-component_inner-content-header">
                        <button
                            onClick={hideNotify}
                            className="notify-component_inner-content-header-close"
                        >
                            x
                        </button>
                    </div>
                    <div className="notify-component_inner-content-body">
                    { text }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotifyComponent;