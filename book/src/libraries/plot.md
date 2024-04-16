# Plot
The plot library allows the plotting of data.

## Types
The following types are commonly used by functions of this library

### {{#!type domain}}
A tuple representing a mathematical function's domain as a closed interval. Example domains are `(0, 1)` for \\([0,1]\\) or `(-calc.pi, calc.pi)` for \\([-\pi, \pi]\\).

### {{#!type axes}}
A tuple of axis names. Functions that take {{#type axes}} will use those axes as their `x` and `y` axis for plotting. To rotate a plot, you can simply swap its axes such as `("y", "x")`.

## Usage


...