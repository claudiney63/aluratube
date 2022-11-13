import React, { createContext, useState } from "react";

export const ColorModeContext = createContext({
    mode: 'dark',
    setMode: () => {},
    toggleMode: () => {}
})

export default function ColorModeProvider(props) {

    const [mode,  setMode] = useState(props.initialMode)

    function toggleMode() {
        if(mode === 'light') setMode('dark')
        if(mode === 'dark') setMode('light')
    }

    return (
        <ColorModeContext.Provider value={{mode: mode, setMode: setMode, toggleMode: toggleMode}}>
            {props.children}
        </ColorModeContext.Provider>
    )
}