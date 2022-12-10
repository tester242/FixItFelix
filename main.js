var main_text_color=[255,255,255];
var main_background_color=[0,0,0];

//these three functions found at
//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
//and later moddified a bit
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(arr) {
    if (arr.length!=3)
        throw new Error('Passed arr wrong size');
    var r=arr[0];
    var g=arr[1];
    var b=arr[2];
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return [r,g,b];
}
//----------------------------------------------------------------------------

function contrast(colorOne,colorTwo){

}
