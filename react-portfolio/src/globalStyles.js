import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*,*::before,*::after,h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

h1,h2,h3,h4,h5,h6{
    display: block;
}

html {
    scroll-behavior: smooth;
}

body{
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: ${(props) => props.theme.fontFamily};
    background: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
}

::selection {
    background: rgba(0, 229, 255, 0.35);
    color: #fff;
}
`

export default GlobalStyle;
