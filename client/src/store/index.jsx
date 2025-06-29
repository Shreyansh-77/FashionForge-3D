import { proxy } from "valtio";


const state = proxy({
    intro: true,
    modelId: 0,
    color: "#EFBD48",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./threejs.png",
    fullDecal: "./threejs.png",
    editorOpen: false,
    pointer: { x: 0, y: 0 },
})

export default state;