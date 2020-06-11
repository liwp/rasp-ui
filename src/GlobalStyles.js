import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    align-items: center;
    background: #0D0C1D;
    color: #EFFFFA;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    justify-content: center;
    text-rendering: optimizeLegibility;
    touch-action: manipulation;
  }

  #mapId {
    flex: 1;
    width: 100%;
  }

  .bm-item:focus {
    outline: none;
  }

  .bm-item.active {
    filter: brightness(50%);
  }
`;

export default GlobalStyles;
