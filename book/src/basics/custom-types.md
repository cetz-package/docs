# Custom Types
Many CeTZ functions expect data in certain formats which we will call types. Note that these are actually made up of Typst primtives.

## {{#!type coordinate}}
A position on the canvas specified by any coordinate system. See [Coordinate Systems]().

## {{#!type number}}
Any of {{#type float}}, {{#type int}}, {{#type length}}.

## {{#!type style}}
Named arguments (or a dictionary if used for a single argument) of style key-values.

## {{#!type context}}
A CeTZ context object that holds internal state.

## {{#!type vector}}
A three element {{#type array}} of {{#type float}}s