
import React, { useContext } from "react";
import './MainMenu.sass';

import ViewContext from '@/components/app/context/ViewContext/ViewContext.js';

const MainMenu = () => {

    const {
        createNewView,
    } = useContext(ViewContext);

    const buttons = [
        {
            text: '+',
            title: 'Добавить рабочее пространство',
            action: () => {
                createNewView();
            }
        },
    ]
    
    return (
        <div className="currently-open_main-menu">
            <div className="currently-open_main-menu-inner">
                {
                    buttons.map((button, i) => {
                        return (
                            <button
                                onClick={button.action}
                                disabled={button.disabled}
                                title={button.title}
                                key={i}
                            >
                                <span>{button.text}</span>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MainMenu;