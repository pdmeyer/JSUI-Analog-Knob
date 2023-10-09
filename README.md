# JSUI-Analog-Knob
A simple JSUI example creating an analog synth-style knob.

<img width="177" alt="Screenshot 2023-10-09 at 2 22 49 PM" src="https://github.com/pdmeyer/JSUI-Analog-Knob/assets/44841504/46dca171-25c6-477e-89f9-30393108acca">

This makes use of JSUI's ability to render and transform SVG and PNG files. In this case, the black knob body is an SVG file, while the silver center portion is a PNG (because JSUI doesn't handle angular shading).

The SVG and PNG graphics were made in Figma. You can see the Figma project [here:](https://www.figma.com/file/WyGINS15cVnWcbaubDGnpZ/Analog-Knobs?type=design&node-id=0%3A1&mode=design&t=GlLDuPAYWd6A32hI-1).

Note: the object is rendered using absolute coordinates. To change the size of the JSUI element, change the size of the SVG and PNG files. The example here uses 100px x 100px assets.

##Getting Started
Open the patcher analogknob.maxpat.
