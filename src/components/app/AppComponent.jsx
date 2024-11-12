import './AppComponent.sass';
import React, { useState } from "react";
import EntryTextComponent from '@/components/elems/entryText/EntryTextComponent';
import FoldersComponent from '@/components/elems/folders/FoldersComponent';
import FileProvider from './context/FileContext/FileProvider';
import ViewProvider from './context/ViewContext/ViewProvider';

import {
  demotextsettings, 
  demotext
} from './demotext';

  /*
    demo props for folder component
  */
// import {
//   demofolders
// } from './demofolders';

function App() {

  /*
    demo props for one text editor instance
  */
  const [text, setText] = useState(demotext);
  const [textUpgrades, setTextUpgrades] = useState({...demotextsettings});

  const onInput = (newText) => {
    setText(newText);
  } 

  const onTextUpgrade = (upgrades) => {
    setTextUpgrades(upgrades);
  }

  return (
    <div className="app">
      <div className="content">
        
        <FileProvider>
          <ViewProvider>
            <FoldersComponent />
          </ViewProvider>
        </FileProvider>

        <EntryTextComponent
          texts={text}
          textUpgrades={textUpgrades}
          onInput={onInput}
          onTextUpgrade={onTextUpgrade}
        />
      </div>
    </div>
  );
}

export default App;
