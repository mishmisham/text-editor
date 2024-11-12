import React from "react";
import './TabsComponent.sass';

const TabsComponent = ({
    tabs,
    current,
    onChange
}) => {

    return (
        <div className="tabs">
            <div className="tabs_inner">
            {
                tabs.map(tab => {
                    const tabClass = tab.key === current ? 'tabs_tab tabs_tab--current' : 'tabs_tab';
                    return (
                        <button
                            onClick={e=>onChange(tab.key)}
                            className={tabClass}
                            key={tab.key}
                            title={tab.title || ''}
                        >
                            <span>{ tab.label }</span>
                        </button>
                    )
                })
            }
            </div>
        </div>
    )
}

export default TabsComponent;