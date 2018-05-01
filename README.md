# AML CSS

This is a personal project, based heavily on things like ITCSS and SUITCSS. I don't really recommend anyone else use it at the moment. Class names and attributes aren't really stable at the moment.

## TODO

* Write clearer explanations and provide better information about various
  aspects of this library. This should include much better comments and
  documentation in the actual scss files.
* Determine better element defaults, write a more comprehensive reset which strips
  some of the browser-specific defaults that can cause some common issues with
  styling and layout.
* Implement more object types. media, flag etc.
* Check for (and fix) any inconsistent formatting/spelling/terminology.
* Look into setting up a linter to catch small errors, and enforce some of the
  naming conventions and code style.
* Look into the possibility of regression testing to
  determine when changes affect layout or style.
* Do proper versioning. Too in flux at the moment!

## Install

Just clone this repository and copy the skeleton.

## Naming Conventions

This mostly follows the [SUITCSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md):

* All classes (aside from state classes) can be namespaced
  by defining `$aml-namespace`
* Variables, functions, and mixins are snake-case
* Objects are prefixed with `o-`, components should be prefixed with `c-`
* Objects start in title-case, with sub-objects being separated by a hyphen and
  written in camel-case, e.g. `.o-Object-subObject`
* No components are included, but they should be follow the same rules as
  objects
* Modifiers for both objects and components are separated with two hyphens and
  written in camelcase, e.g. `.o-Object--modifierName` or
  `.o-Object-subObject--modifierName`
* Utility classes are prefixed with `u-` and are in camel-case following that,
  e.g. `.u-utilityName`
* State classes starts with the verb and a hyphen (`has-`, `is-`, etc.) and
  ends with the state name in camel-case, e.g. `.is-someState`

## Structure

The structure used here is basically ITCSS (Inverted Triangle CSS).

The order is as follows, from least specific to most specific:

1. Settings (Set variables here)
2. Tools (Sass functions/mixins are defined here)
3. Generic (CSS Reset/Box-Sizing)
4. Elements (Setting defaults for bare element selectors)
5. Objects (Generic objects for common patterns, such as [the media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/))
6. Components (Most page styles will go here)
7. Utilities (Utility classes, e.g. `.u-visuallyHidden`)
8. Vendor code (3rd party libs)
9. Overrides (Styles which need a high specificity, e.g. print styles)

Any of the sections listed above may be omitted if not needed.

## Useful variables

### Class namespace

The format will output as follows: `.{prefix}-{namespace}-ClassName`.

* `$aml-namespace`: The namespace for all classes (except states). Defaults to `""`.<br>
When set, a hypen will automatically be used as a separator.

### Colors

* `$aml-bg-color`: The background color applied to the body tag.
  Defaults to `transparent`.
* `$aml-text-color`: the default color for most text. Defaults to `#000`.
* `$aml-heading-color`: the default text color for headings. Defaults to `$aml-text-color`.
* `$aml-link-color`: The text color applied to links. Defaults to `#3084bb`.
* `$aml-link-color-hover`: The text color applied to links which are being
  interacted with. Defaults to `$aml-link-color`.

### Type

The following type-related variables are available to change:

* `$aml-font-family`: sets the default font family for most text. Defaults to
  `"Helvetica Neue", Helvetica, Arial, sans-serif`.
* `$aml-font-size`: sets the default font size for most text. Defaults to `16px`.
* `$aml-line-height`: sets the default line height for most text.
  Defaults to `1.5`.
* `$aml-font-weight`: sets the default font weight for most text.
  Defaults to `400`.
* `$aml-heading-font-family`: sets the default font-family for headings.
  Defaults to `$aml-font-family`
* `$aml-heading-font-weight`: sets the default font weight for headings.
  Defaults to `700`.
* `$aml-link-decoration`: sets the default link decoration. Defaults to `underline`.
* `$aml-link-decoration-hover`: sets the default link decoration when a link
  is hovering/active. Defaults to `none`
* `$aml-button-font-family`: sets the default font family for buttons.
  Defaults to `inherit`

### Links


### Sizes and Spacing

* `$aml-max-width`: The maximum width of the site, used for the `.Container` object
  along with the `huge` breakpoint by default
* `$aml-spacing` and it's size variants. The size of `$aml-spacing` should be between
  `$aml-spacing-small` and `$aml-spacing-large`<br>
  Defaults to:

  ```
  $aml-spacing: rem(20) !default;
  $aml-spacing-tiny:  $aml-spacing / 4 !default;
  $aml-spacing-small: $aml-spacing / 2 !default;
  $aml-spacing-large: $aml-spacing * 2 !default;
  $aml-spacing-huge:  $aml-spacing * 4 !default;
  ```

  The default ratios should allow you to just set `$aml-spacing` and still get reasonable output

* `$aml-default-margin` and `$aml-default-padding` set the amount of margin or
  padding to apply to certain elements by default.
* `$aml-denominators`: Controls which denominators to generate common fraction
  based size classes from. Defaults to: `1 2 3 4 5 6`.<br>
  _**Note:**_ the fractions output will be simplified, meaning that
  `.u-2/4` will not be created because `.u-1/2` is a simpler fraction.
* `$aml-generate-breakpoint-variants` controls whether or not breakpoint variants will be generated for size classes. For example: `.u-1/2@tiny`, where `tiny` represents the breakpoint name defined in `$aml-breakpoints`.
* `$aml-generate-pushers` and `$aml-generate-pullers` determines if we should generate push and pull classes for each size, allowing us to push or pull an element by a certain size.

### Grid

* `$aml-grid-use-flexbox`: use flexbox, otherwise use floats. Defaults to true.
* `$aml-grid-gutter`: the horizontal spacing between grid items. Defaults to `$aml-spacing`.
* `$aml-grid-vertical-gutter`: the vertical spacing between grid items. Defaults to `$aml-grid-gutter`.

### Breakpoints

There are 3 breakpoint mixins provided by aml-css:
* `bp`, which creates a min-width media query
* `bp-max`, which creates a max-width media query
* `bp-min-max`, which creates a media query constrained between a min-width and
  max-width

The `bp` and `bp-max` mixins share the same function signature of: `bp($breakpoint, $media)`,
where `$breakpoint` can be a named breakpoint, as defined in `$aml-breakpoints`,
or alternatively a number with or without a unit. Numbers given without units
are assumed to be pixels, and is converted to rem in the final output. `$media` is an optional parameter.

The `bp-min-max` mixin's function signature is `bp-min-max($min-bp, $max-bp, $media)`, where media is an optional parameter.

#### Global defaults for breakpoints

* `$aml-default-media-type`: Sets the media type to use in media queries.
  Defaults to `all`
* `$aml-breakpoints`: The sass map which defines the various breakpoints to use with
  the `bp`, `bp-max`, and `bp-min-max` mixins, as well as for the various
  classes which can generate variants such as `.u-1/2@large`, with `large`
  being the name of the breakpoint.<br>
  Defaults to:
  ```
  $breakpoints = (
    tiny: rem(480)
    small: rem(680)
    medium: rem(768)
    large: rem(960)
    huge: rem($max-width)
  );
  ```

  If you just want to add to or change the map, use the sass built-in
  [`map_merge`](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_merge-instance_method)
  e.g. `$aml-breakpoints = map_merge($aml-breakpoints, (large: rem(1080)));`

### Utilities

`$aml-immutable-utilities`, when true, sets attributes in utilities as `!important`. Defaults to `true`.

### Transition/Animation Easings

The following custom easings are defined for convenience: `Sine`, `Quad`,
`Cubic`, `Quart`, `Quint`, `Expo`, `Circ`, `Back`.

All variations of the above follow the formatting below (with names substituted
for `Sine` in this example):

```
$easeInSine
$easeOutSine
$easeInOutSine
// Also reversed versions
$easeInSineReverse
$easeOutSineReverse
$easeInOutSineReverse
```

### Placeholder Base64 image uris

There are 4 of these by default, in 4 different aspect ratios (1:1, 2:1, 4:3,
and 16:9). The color is transparent.

```
$aml-placeholder-1x1-gif
$aml-placeholder-2x1-png
$aml-placeholder-4x3-png
$aml-placeholder-16x9-png
```
