import {Colors as MaterialColors} from "react-native-paper";

export class TagColor {
    active: string;
    inactive: string;

    constructor(active: string, inactive: string) {
        this.active = active;
        this.inactive = inactive;
    }
}

export const AppColors = {
    primaryColor: MaterialColors.orange500,

    background: "black",
    backgroundLight: MaterialColors.grey900,
    backgroundLighter: MaterialColors.grey800,

    textColor: MaterialColors.grey100,
    textColorDarker: MaterialColors.grey400,

    darkShade: "rgba(0,0,0,0.6)",

    focusColor: MaterialColors.green500,
    restColor: MaterialColors.orange500,

    tagColors: {
        red: new TagColor(MaterialColors.red900, MaterialColors.red800),
        pink: new TagColor(MaterialColors.pink900, MaterialColors.pink800),
        purple: new TagColor(MaterialColors.purple900, MaterialColors.purple800),
        lightBlue: new TagColor(MaterialColors.lightBlue900, MaterialColors.lightBlue800),
        teal: new TagColor(MaterialColors.teal900, MaterialColors.teal800),
        green: new TagColor(MaterialColors.green900, MaterialColors.green800),
        lightGreen: new TagColor(MaterialColors.lightGreen900, MaterialColors.lightGreen800),
        lime: new TagColor(MaterialColors.lime900, MaterialColors.lime800),
        amber: new TagColor(MaterialColors.amber900, MaterialColors.amber800),
        deepOrange: new TagColor(MaterialColors.deepOrange900, MaterialColors.deepOrange800),
        brown: new TagColor(MaterialColors.brown900, MaterialColors.brown800),
        blueGrey: new TagColor(MaterialColors.blueGrey900, MaterialColors.blueGrey800),
    },
};
