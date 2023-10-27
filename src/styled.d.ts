import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        titleColor: string;
        accentColor: string;
        cardBgColor: string;
        overviewBg: string;
        reverseBg: string;
        reverseText: string;
        tableThOdd: string;
        tableThEven: string;
        tableTdOdd: string;
        tableTdEven: string;
    }
}
