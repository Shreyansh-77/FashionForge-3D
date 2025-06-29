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
    num: 6
  },
  {
    name: "Full Shirt",
    icon: clothes,
    num: 5
  },
  {
    name: "Hoodie",
    icon: hoodie,
    num: 4
  },
  {
    name: "Pants",
    icon: pants,
    num: 2
  },
  {
    name: "Trouser",
    icon: trouser,
    num: 1
  },
  {
    name: "Shoe",
    icon: shoe,
    num: 3
  },
];

