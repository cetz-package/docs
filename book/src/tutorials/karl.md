# A Picture for Karl's New Students
This tutorial is intended for new users of CeTZ. It does not give an exhaustive account of all the features of CeTZ, just of those you are likely to use right away. This tutorial also acts as a parallel to Ti*k*Z's tutorial [A Picture for Karl's Students](https://tikz.dev/tutorial).

Karl is a math and chemistry high-school teacher. He used to create the graphics in his worksheets and exams using the Ti*k*Z package with \\(\LaTeX\\). While the results were acceptable, Karl, for his own reasons, has started using Typst instead. He looks through the provided packages in [Typst: Universe](https://typst.app/universe/) and finds CeTZ, which is supposed to stand for "CeTZ, ein Typst Zeichenpaket" and appears appropriate.

## Problem Statement
Karl wants to put a graphic on the next worksheet for his students. He is currently teaching his students about sine and cosine. He already has the graphic drawn with Ti*k*Z and would like to keep it as close to it as possible:
```
Either the example gets rendered using a block or we pre-render it I'm not sure yet.
```

## Setting up the Enironment
In CeTZ, to draw a picture, two imports and a function call is all you need. Karl sets up his file as follows:
```typ
#set page(width: auto, height: auto)
#import "@preview/cetz:0.2.2"

We are working on
#cetz.canvas({
  import cetz.draw: *
  line((-1.5, 0), (1.5, 0))
  line((0, -1.5), (0, 1.5))
})
```

When compiled via the Typst web app or the Typst command line interface, the resulting output will contain something that looks like this:
```typ,example
We are working on
#cetz.canvas({
  import cetz.draw: *
  line((-1.5, 0), (1.5, 0))
  line((0, -1.5), (0, 1.5))
})
```

Admittedly, not quite the whole picture, yet, but we do have the axes established. Well, not quite, but we have the lines that make up the axes drawn. Karl suddenly has a sinking feeling that the picture is still some way off.

Let's have a more detailed look at the code. First, the package `cetz` is imported. The `canvas` function in the `cetz` module is then called and a pair of curly braces are placed as the function's first (and only) positional argument. The braces create a scope or body, in which more functions can be called, but first must be imported from the `draw` module.

Inside the body there are two `line` functions. They are draw functions that draw straight lines between given positions. The first `line` function is given the parameters `(-1.5, 0), (1.5, 0)`, which refer to a point at position \\((-1.5, 0)\\) and \\((1.5, 0)\\). Here, the positions are specified within a special coordinate system in which, initially, one unit is 1cm.

Karl is quite pleased to note that the environment automatically reserves enough space to encompass the picture.

## Line Construction

The basic building block of all pictures in CeTZ are draw functions. A draw function is a function that can be called inside the canvas body in order to create the graphic, such as `line`, `bezier`, `rect` and many more (not all draw functions *acutally* draw something, like `set-style`, but still effect the outcome of the picture). 

In order to draw a path of straight lines, the `line` draw function can be used. You specify the coordinates of the start position by passing an array with two numbers (a {{#type coordinate}} type) to the first parameter of `line`. The second coordinate must be given as the second parameter of the function otherwise it will panic. Subsequent coordinates can be passed to the function to draw additional lines between the previous and next coordinates.
```typc,example
line((-1.5, 0), (1.5, 0), (0, -1.5), (0, 1.5))
```
Note that the `canvas` function and import statments have been omitted from the code as they are boiler plate and don't always need to be shown. They are very much still required in order to produce the picture, so just remember they are there okay.


## Curve Construction

The next think Karl wants to do is to draw the circle. For this, straight lines obviously will not do. Instead, we need some way to draw curves. For this, CeTZ provides several other draw functions, the most useful here would be the `bezier` function. As the name suggests, it can draw a bezier curve when a start and end coordinate is given, as well as one or two control points.

Here is an example (the control points have been added for clarity):
```typc,example
// start and end
circle((0, 0), radius: 2pt, fill: gray)
circle((2, 0), radius: 2pt, fill: gray)
// control points
circle((1, 1), radius: 2pt, fill: gray)
circle((2, 1), radius: 2pt, fill: gray)

bezier((0, 0), (2, 0), (1, 1), (2, 1))
```

So, Karl can now add the first half circle to the picture:
```typc,example
line((-1.5, 0), (1.5, 0))
line((0, -1.5), (0, 1.5))

bezier((-1, 0), (0, 1), (-1, 0.555), (-0.555, 1))
bezier((0, 1), (1, 0), (0.555, 1), (1, 0.555))
```

Karl is happy with the result, but finds specifying circles in this way to be extremely awkward. Fortunately, there is a much simpler way.

## Circle Construction

In order to draw a circle, the `circle` draw function can be used:
```typc,example
circle((0, 0), radius: 10pt)
```

You can also draw an ellipse with this draw function by passing an array of two numbers to the `radius` argument:
```typc,example
circle((0, 0), radius: (20pt, 10pt))
```

To draw an ellipse whose axes are not horizontal and vertical, but point in an arbitrary direction you can use transformations, which are explained later.

So, returning to Karl's problem, he can write `circle((0, 0))` to draw the circle as, by default, the `radius` argument is `1`:
```typc,example
line((-1.5, 0), (1.5, 0))
line((0, -1.5), (0, 1.5))

circle((0, 0))
```

At this point, Karl is a bit alarmed that the circle is so small when he wants the final picture to be much bigger. He is pleased to learn that CeTZ has transformation draw functions and scaling everything by a factor of three is very easy. But let us leave the size as it is for the moment ot save some space.


## Rectangle Construction

The next things we would like to haveis the grid in the background. There are several ways to produce it. For example, one might draw lots of rectangles. To do so, the `rect` draw function can be used. Two coordinates should be passed as arguments, they specify the corners of the rectangle:

```typc,example
line((-1.5, 0), (1.5, 0))
line((0, -1.5), (0, 1.5))
circle((0, 0))

rect((0, 0), (0.5, 0.5))
rect((-0.5, -0.5), (-1, -1))
```

While this may be nice in other situations, this is not really leading anywhere with Karl's problem: First, we would need an awful lot of these rectangles and then there is the border that is not "closed".

So, Karl is about to resort to simply drawing four vertical and four horizontal lines using the nice `line` draw function, when he learns that there is a `grid` draw function.

## Grid Construction

The `grid` draw function adds a grid to the picture. It will add lines making up a grid that fills the rectangle specified by two coordinates passed to it.

For Karl, the following code could be used:
```typc,example
line((-1.5, 0), (1.5, 0))
line((0, -1.5), (0, 1.5))
circle((0, 0))

grid((-1.5, -1.5), (1.5, 1.5), step: 0.5)
```

Having another look at his desired picture, karl notices that it would be nice for the grid to be more subdued. To subdue the grid, Karl adds more named arguments to the `grid` draw function. First, he uses the color `gray` for the grid lines. Second, he reduces the line width to `0.2pt` (Ti*k*Z's `very thin`). Finally, he swaps the ordering of the commands so that the grid is drawn first and everything else on top.
```typc,example
grid((-1.5, -1.5), (1.5, 1.5), step: 0.5, stroke: gray + 0.2pt)
line((-1.5, 0), (1.5, 0))
line((0, -1.5), (0, 1.5))
circle((0, 0))
```

## Adding a Touch of Style

Karl notices that the thickness of the circle and axes paths are much greater than the grid's thickness. He learns that CeTZ's default stroke thickness is actually `1pt` and not Ti*k*Z's `0.4pt`. Karl decides that he would like to use the thinner lines to keep this new picture as close to the original as possible.

We can use the `set-style` draw function to apply styling to all subsequent draw functions, similar to how Typst's `set` and `show` rules work. To set the stroke's thickness he uses the named argument `stroke: 0.4pt`:

```typc,example
set-style(stroke: 0.4pt)
grid((-1.5, -1.5), (1.5, 1.5), step: 0.5, stroke: gray + 0.2pt)
line((-1.5, 0), (1.5, 0))
line((0, -1.5), (0, 1.5))
circle((0, 0))
```

Karl can also move the grid's styling into the same `set-style` function by passing it as a dictionary to the `grid` named argument:
```typc
set-style(
  stroke: 0.4pt,
  grid: (
    stroke: gray + 0.2pt,
    step: 0.5
  )
)
grid((-1.5, -1.5), (1.5, 1.5))
line((-1.5, 0), (1.5, 0))
line((0, -1.5), (0, 1.5))
circle((0, 0))
```

## Arc Construction

Our next obstacle is to draw the arc for the angle. For this, the `arc` draw function can be used, which draws part of a circle or ellipse. This function requires arguments to specify the arc. An example would be `arc((0, 0), start: 10deg, stop: 80deg, radius: 10pt)`, which creates an arc starting at \\((0, 0)\\) at an angle of \\(10°\\) to \\(80°\\) with a radius of `10pt`. Karl obviously needs an arc from \\(0°\\) to \\(30°\\). The radius should be something relatively small, perhaps around one third fo the circle's radius.

```typc,example
set-style(
  stroke: 0.4pt,
  grid: (
    stroke: gray + 0.2pt,
    step: 0.5
  )
)
grid((-1.5, -1.5), (1.5, 1.5))
line((-1.5, 0), (1.5, 0))
line((0, -1.5), (0, 1.5))
circle((0, 0))
arc((3mm, 0), start: 0deg, stop: 30deg, radius: 3mm)
```

Karl thinks this is really a bit small and he cannot continue unless he learns how to do scaling. For this, he can use the `scale` draw function at the start of the canvas body
```typc,example
set-style(
  stroke: 0.4pt,
  grid: (
    stroke: gray + 0.2pt,
    step: 0.5
  )
)
scale(3)
grid((-1.5, -1.5), (1.5, 1.5))
line((-1.5, 0), (1.5, 0))
line((0, -1.5), (0, 1.5))
circle((0, 0))
arc((3mm, 0), start: 0deg, stop: 30deg, radius: 3mm)
```

As for circles, you can specify the radius as an array of two numbers to get an elliptical arc.
```typc,example
arc((0, 0), start: 0deg, stop: 315deg, radius: (1.75, 1))
```
