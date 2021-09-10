import {createGlobalStyle} from 'styled-components'

/* margin,padding 은 90% */

/*color*/
export const BackgroundColor = '#fff';
export const MainColor = '#245CCE';
export const PointColor = '#ff5954';
export const TextColor = '#000';
export const TextDarkGrey = '#434A54';
export const TextLightGrey = '#656D78';

/*font*/
export const SmallFont = '14px';
export const BaseFont = '16px';
export const MediumFont = '20px';
export const LargeFont = '24px';
export const UltraLargeFont = '60px';

export const GlobalStyle = createGlobalStyle`
  * {
    margin : 0px; 
    padding : 0px;
    box-sizing: border-box;
    font-family: -apple-system, 'Noto Sans KR', sans-serif;
  };
`

