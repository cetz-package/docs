# Marks
Marks are arrow tips that can be added to the end of path based elements that support the `mark` style key, or can be directly drawn by using the `mark` draw function. Marks are specified by giving their names (or shorthand) as strings and have several options to customise them. You can give an array of names to have multiple marks, dictionaries can be used in the array for per mark styling.

```typ,render
#set page(margin: 0cm)
#align(center, table(
  columns: 3,
  [*Name*], [*Shorthand*], [*Shape*],
  ..(for (name, item) in cetz.mark-shapes.marks {
    let name-to-mnemonic = (:)
    for (name, item) in cetz.mark-shapes.mnemonics {
      let list = name-to-mnemonic.at(item.at(0), default: ())
      list += (raw(name) + if item.at(1) { " (reversed)" },)
      name-to-mnemonic.insert(item.at(0), list)
    }
    (
      raw(name),
      name-to-mnemonic.at(name, default: ([],)).join([, ]),
      cetz.canvas(cetz.draw.line((), (1, 0), mark: (end: name)))
    )
  })
))
```


```typc,example
let c = ((rel: (0, -1)), (rel: (2, 0), update: false)) // Coordinates to draw the line, it is not necessary to understand this for this example.

// No marks
line((), (rel: (1, 0), update: false))

// Draws a triangle mark at both ends of the line.
set-style(mark: (symbol: ">"))
line(..c)

// Overrides the end mark to be a diamond but the start is still a triangle.
set-style(mark: (end: "<>"))
line(..c)

// Draws two triangle marks at both ends but the first mark of end is still a diamond.
set-style(mark: (symbol: (">", ">")))
line(..c)

// Sets the stroke of first mark in the sequence to red but the end mark overrides it to be blue.
set-style(mark: (symbol: ((symbol: ">", stroke: red), ">"), end: (stroke: blue)))
line(..c)
```

---

<parameter-definition name="symbol" types="none,str,array,dictionary" default="none">
This option sets the mark to draw when using the `mark` draw function, or applies styling to both mark ends of path based elements. The mark's name or shorthand can be given. Multiple marks can be drawn by passing an array of names or shorthands. When `none`, no marks will be drawn. A style {{#type dictionary}} can be given instead of a {{#type str}} to override styling for that particular mark, just make sure to still give the mark name using the `symbol` key otherwise nothing will be drawn!
</parameter-definition>

<parameter-definition name="start" types="none,str,array,dictionary" default="none">
This option sets the mark to draw at the start of a path based element. It will override all options of the `symbol` key and iwll not affect marks drawn using the `mark` draw function.
</parameter-definition>

<parameter-definition name="end" types="none,str,array,dictionary" default="none">
Like `start` but for the mark at the end of a path.
</parameter-definition>

<parameter-definition name="length" types="number" default="0.2cm">
The size of the mark in the direction it is pointing.
</parameter-definition>

<parameter-definition name="width" types="number" default="0.15cm">
The size of the mark along the normal of its direction.
</parameter-definition>

<parameter-definition name="inset" types="number" default="0.05cm">
It specifies a distance by which something inside the arrow tip is set inwards; for the stealth arrow tip it is the distance by which the back angle is moved inwards.
</parameter-definition>

<parameter-definition name="scale" types="float" default="1">
A factor that is applied to the mark's length, width and inset.
</parameter-definition>

<parameter-definition name="sep" types="number" default="0.1cm">
The distance between multiple marks along their path.
</parameter-definition>

<parameter-definition name="flex" types="bool" default="true">
Only applicable when marks are used on curves such as bezier and hobby. If true, the mark will point along the secant of the curve. If false, the tangent at the mark's tip will be used.
</parameter-definition>

<parameter-definition name="position-samples" types="int" default="30">
Only applicable when marks are used on curves such as bezier and hobby. The maximum number of samples to use for calculating curve positions. A higher number gives better results but may slow down compilation
</parameter-definition>

<parameter-definition name="pos" types="number,ratio,none" default="none">
Overrides the mark's position along a path. A number will move it an absolute distance, while a ratio will be a distance relative to the length of the path. Note that this may be removed in the future in preference of a different method.
</parameter-definition>

<parameter-definition name="offset" types="number,ratio,none" default="none">
Like `pos` but it advances the position of the mark instead of overriding it.
</parameter-definition>

<parameter-definition name="slant" types="ratio" default="0%">
How much to slant the mark relative to the axis of the arrow. 0% means no slant 100% slants at 45 degrees.
</parameter-definition>

<parameter-definition name="harpoon" types="bool" default="false">
When true only the top half of the mark is drawn.
</parameter-definition>

<parameter-definition name="flip" types="bool" default="false">
When true the mark is flipped along its axis.
</parameter-definition>

<parameter-definition name="reverse" types="bool" default="false">
Reverses the direction of the mark.
</parameter-definition>

<parameter-definition name="xy-up" types="vector" default="(0, 0, 1)">
The direction which is "up" for use when drawing 2D marks.
</parameter-definition>

<parameter-definition name="z-up" types="vector" default="(0, 1, 0)">
The direction which is "up" for use when drawing 3D marks.
</parameter-definition>

<parameter-definition name="shorten-to" types="integer,auto,none" default="auto">
Which mark to shorten the path to when multiple marks are given. `auto` will shorten to the last mark, `none` will shorten to the first mark (effectively disabling path shortening). An integer can be given to select the mark's index.
</parameter-definition>

<parameter-definition name="transform-shape" types="bool" default="true">
When `false` marks will not be stretched/affected by the current transformation, marks will be placed after the path is transformed.
</parameter-definition>