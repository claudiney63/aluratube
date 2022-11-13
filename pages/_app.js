import { useContext } from 'react';
import { ThemeProvider } from 'styled-components'
import { CSSReset } from '../src/components/CSSReset'
import ColorModeProvider, { ColorModeContext } from '../src/components/Menu/components/ColorModeProvider';

//ThemeProvider -> prover o tema para o app todo
//ColorModeProvider -> Prove o state de light ou dark para todo mundo

function ProviderWrapper(props) {
    return (
        <ColorModeProvider initialMode={'dark'}>
            {props.children}
        </ColorModeProvider>
    )
}

function MyApp({ Component, pageProps }) {

    const themeActive = {
        light: {
            backgroundBase: "#f9f9f9",
            backgroundLevel1: "#ffffff",
            backgroundLevel2: "#f0f0f0",
            borderBase: "#e5e5e5",
            textColorBase: "#222222",
        },
        dark: {
            backgroundBase: "#181818",
            backgroundLevel1: "#202020",
            backgroundLevel2: "#313131",
            borderBase: "#383838",
            textColorBase: "#FFFFFF",
        }
    };

    const Contexto = useContext(ColorModeContext)

    return (

        <ThemeProvider theme={themeActive[Contexto.mode]}>
            <CSSReset />
            <Component {...pageProps}></Component>
        </ThemeProvider>
    )
}

export default function _App(props) {
    return (
        <ProviderWrapper>
            <MyApp {...props}></MyApp>
        </ProviderWrapper>
    )
}