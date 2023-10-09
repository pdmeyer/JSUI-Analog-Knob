//initialize mgraphics
mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;


var value = 0;      //knob value 0. - 1. will be output
var rot = 0;        //knob rotation amount in radians;
var drag = 0.005;   //knob sensitivity (0.0002 - 0.0008)
var changed = 0;    //prevents unnecessary re-renders
var start;          //pointer position for calculating value

//load in SVG and PNG files
var body = new MGraphicsSVG("body.svg");
var center = new Image("center.png");

//calculate center position of SVG for rotation
var offset = [body.size[0] / 2, body.size[1] / 2];


//MAIN DRAW FUNCTION
function paint() {
    mgraphics.save();
        mgraphics.translate(offset[0], offset[1]); //shift so that we rotate around the center, instead of top left corner
        mgraphics.rotate((rot - 2.617993930351372) % (Math.PI * 2)) //rotate knob according to current value
        mgraphics.translate(-offset[0], -offset[1]); //shift back to original position before rendering
        mgraphics.svg_render(body);
    mgraphics.restore();
    mgraphics.image_surface_draw(center);
}


//INTERACTIONS

//runs when JSUI object is clicked
function onclick(x, y, button, cmd, shift, capslock, option, ctrl) {
    start = y; //store current pointer y position relative to JSUI
    changed = 1;
}

//executed while the user drags 
function ondrag(x, y, button, cmd, shift, capslock, option, ctrl) {
    var sens = shift ? drag * 1.65 : drag;  //if shift is held, increase the knob sensitivity
    delta =  -(y - start) * sens;           //measure the change in pointer y position
    start = y;                              //update y start position for next time
    value = clip(value + delta, 0, 1);      //accumulate output value from delta, clamping to 0. to 1. range
    rot = calculate_rot(value);             //calculate knob rotation amount from value
    changed = 1;                            //let the renderer know that the knob value has changed so that re-render will occur
    outlet(0, value);                       //send the new value to JSUI outlet
}

//floats sent into the JSUI object's inlet update the stored internal value and are output
function msg_float(v) {
    set(v);
    outlet(0, value);
}

//STATE FUNCTIONS
//re-render the JSUI
function bang() {
    if(changed) mgraphics.redraw(); //don't bother to re-render if nothing has changed
    changed = 0;
}

//initialize mgraphics
function init() {
    mgraphics.init();
}

//update internal value and rotate knob without outputting
function set(v) {
    value = clip(v, 0, 1);
    rot = calculate_rot(value)
    changed = 1
}

//update sensitivity to drag (higher = more coarse, lower = more fine)
function sensitivity (v) {
    r = clip(v, 0, 1);
    drag = v * 0.007 + 0.002;
}


//UTILITIES
function clip(v, min, max) {
    return Math.min(Math.max(v,min), max);
}

//300-degree range (~5.24 radians)
function calculate_rot(v) {
    return v * Math.PI * 1.6667;
}

