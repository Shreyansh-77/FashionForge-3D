import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";
import {clothes, croptop, hoodie, pants, shirt, shoe, trouser} from "../assets/icons";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};

export const ClothModels = [
  {
    name: "TShirt",
    icon: shirt,
    num: 0
  },
  {
    name: "Crop Top",
    icon: croptop,
    num: 1
  },
  {
    name: "Hoodie",
    icon: hoodie,
    num: 2
  },
  {
    name: "Pants",
    icon: pants,
    num: 3
  },
  {
    name: "Trouser",
    icon: trouser,
    num: 4
  },
  {
    name: "Shoe",
    icon: shoe,
    num: 5
  },
  {
    name: "Full Shirt",
    icon: clothes,
    num: 6
  },
];

