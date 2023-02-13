/*
@title: 3d_wire_frame_renderer
@author: Patcybermind
*/
/* HOW TO USE :
  w = move further
  s = move closer
  d = move to the right
  a = move to the left
  i = move up
  k = move down

  j = debugger;
  
*/
// set up everything
const blue_pixel = "p";
const background = "g";

setLegend(
  [ blue_pixel, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ background, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);



let level = 0;
const levels = [
  map`
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................`,
];

setMap(levels[level]);
setBackground(background);

// initial translation values
let translationx = 0;
let translationy = 0; // vertical
let translationz = 50;
// focal length
let focal_length = 30;


// listeners
// i
onInput("i", () => {
  translationy += 1;
  console.log("translationy: ", translationy)
})
// k
onInput("k", () => {
  translationy += -1;
  console.log("translationy: ", translationy)
})
// a
onInput("a", () => {
  translationx += -1;
  console.log("translationx: ", translationx)
})
// d
onInput("d", () => {
  translationx += 1;
  console.log("translationx: ", translationx)
})
// s
onInput("s", () => {
  translationz += -1;
  console.log("translationz: ", translationz)
})
// w
onInput("w", () => {
  translationz += 1;
  console.log("translationz: ", translationz)
})
// j to stop
onInput("j", () => {
  debugger;
})


// functions

function draw_line(x1, y1, x2, y2) {    // Iterators, counters required by algorithm
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;    // Calculate line deltas
    dx = x2 - x1;
    dy = y2 - y1;    // Create a positive copy of deltas (makes iterating easier)
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);    // Calculate error intervals for both axis
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;    // The line is X-axis dominant
    if (dy1 <= dx1) {        // Line is drawn left to right
        if (dx >= 0) {
            x = x1; y = y1; xe = x2;
        } else { // Line is drawn right to left (swap ends)
            x = x2; y = y2; xe = x1;
        }
        try {
          addSprite(Math.round(x), (y), blue_pixel); // Draw first pixel        // Rasterize the line
        }
        catch (error) {
          console.log("outside of screen")
        }
        for (i = 0; x < xe; i++) {
            x = x + 1;            // Deal with octants...
            if (px < 0) {
                px = px + 2 * dy1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    y = y + 1;
                } else {
                    y = y - 1;
                }
                px = px + 2 * (dy1 - dx1);
            }            // Draw pixel from line span at
            // currently rasterized position
            try {
              addSprite(Math.round(x), Math.round(y), blue_pixel);
            }
            catch (error) {
              console.log("outside of screen")
            }
        }    } else { // The line is Y-axis dominant        // Line is drawn bottom to top
        if (dy >= 0) {
            x = x1; y = y1; ye = y2;
        } else { // Line is drawn top to bottom
            x = x2; y = y2; ye = y1;
        }
        try {
          addSprite(Math.round(x), Math.round(y), blue_pixel); // Draw first pixel        // Rasterize the line
        }
        catch (error) {
          console.log("outside of screen")
        }
        for (i = 0; y < ye; i++) {
            y = y + 1;            // Deal with octants...
            if (py <= 0) {
                py = py + 2 * dx1;
            } else {
                if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                    x = x + 1;
                } else {
                    x = x - 1;
                }
                py = py + 2 * (dx1 - dy1);
            }            // Draw pixel from line span at
            // currently rasterized positions
            try {
              addSprite(Math.round(x), Math.round(y), blue_pixel);
            }
            catch (error) {
              console.log("outside of screen")
            }
        }
    }
 }

function draw_wire_frame(x0, y0, z0, x1, y1, z1) {
  draw_line(80 + Math.round(focal_length * (x0 + translationx) / (z0 + translationz)),
            64 + Math.round(focal_length * (-y0 + -translationy) / (z0 + translationz)),
            80 + Math.round(focal_length * (x1 + translationx) / (z1 + translationz)),
            64 + Math.round(focal_length * (-y1 + -translationy) / (z1 + translationz))
           );
}

function clear(){
  for (let yclear = 0; yclear < 129; yclear++){
    for (let xclear = 0; xclear < 161; xclear++) {
      clearTile(xclear, yclear)
    }
  }
}

// save for later code
/*
draw_line(0, 100, 100, 0, blue_pixel);

*/
// render
function render() {
  // code goes here

/*
  Notes
  the top is +y
  bottom is -y

  left is -x
  right is +x
  
  further is +z
  closer is -z
*/

  // Cube
  
  // front
  // front top
  draw_wire_frame(-10, 10, 0, 10, 10, 0);
  // front bottom
  draw_wire_frame(-10, -10, 0, 10, -10, 0);
  // front right
  draw_wire_frame(10, -10, 0, 10, 10, 0);
  // front left
  draw_wire_frame(-10, -10, 0, -10, 10, 0);

  // back
  // back top
  draw_wire_frame(-10, 10, 20, 10, 10, 20);
  // back bottom
  draw_wire_frame(-10, -10, 20, 10, -10, 20);
  // back right
  draw_wire_frame(10, -10, 20, 10, 10, 20);
  // back left
  draw_wire_frame(-10, -10, 20, -10, 10, 20);

  // links
  // top right
  draw_wire_frame(10, 10, 0, 10, 10, 20);
  // top left
  draw_wire_frame(-10, 10, 0, -10, 10, 20);
  // bottom right
  draw_wire_frame(-10, -10, 0, -10, -10, 20);
  // bottom left
  draw_wire_frame(10, -10, 0, 10, -10, 20);


  
  // Pyramid
  
  // front
  draw_wire_frame(-60, -10, 0, -40, -10, 0);
  // back
  draw_wire_frame(-60, -10, 20, -40, -10, 20);
  // right union
  draw_wire_frame(-40, -10, 0, -40, -10, 20);
  // left union
  draw_wire_frame(-60, -10, 0, -60, -10, 20);

  // center unions
  
  // front right
  draw_wire_frame(-50, 10, 10, -40, -10, 0);
  // front left
  draw_wire_frame(-50, 10, 10, -60, -10, 0);

  // back right
  draw_wire_frame(-50, 10, 10, -40, -10, 20);
  // back left
  draw_wire_frame(-50, 10, 10, -60, -10, 20);
}
// main code

function main() {
  clear();
  render();
}
// schedule main
setInterval(main, 100);

