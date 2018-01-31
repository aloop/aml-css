# AML CSS

## Install

Right now this is internal only, so it isn't being published on any sort of
package repo.
Just clone this repository and copy the skeleton.

## Naming Conventions

This mostly follows the [SUITCSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md):

* All classes (aside from state classes) can be namespaced
  by defining `$aml-namespace`
* Variables, functions, and mixins are snake-case
* Objects start in title-case, with sub-objects being separated by a hyphen and
  written in camel-case, e.g. `.Object-subObject`
* No components are included, but they should be follow the same rules as
  objects
* Modifiers for both objects and components are separated with two hyphens and
  written in camelcase, e.g. `.Object--modifierName` or
  `.Object-subObject--modifierName`
* Utility classes are prefixed with `u-` by default and are then camel-case,
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
5. Objects (Generic objects such as [the media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/))
6. Components (Most page styles will go here)
7. Utilities (Utility classes, e.g. `.u-visuallyHidden`)
8. Vendor code (3rd party libs)
9. Overrides (Styles which need a high specificity, e.g. print styles)

Any of the sections listed above may be omitted if not needed.

## Useful classes


## Useful variables

### Class namespace and prefixes

The format will output as follows: `.{prefix}-{namespace}-ClassName`.<br>
Any hyphens needed will be added automatically.

* `$aml-namespace`: The namespace for all classes (except states).
* `$object-prefix`: The prefix for all objects. Defaults to `""`
* `$utility-prefix`: The prefix for all utility classes. Defaults to `"u"`

### Colors

* `$bg-color`: The background color applied to the body tag.
  Defaults to `transparent`
* `$link-color`: The text color applied to links. Defaults to `#3084bb`
* `$link-color-hover`: The text color applied to links which are being
  interacted with. Defaults to `$link-color`

### Sizes and Spacing

* `$max-width`: The maximum width of the site, used for the `.Container` object
  along with the `huge` breakpoint by default
* `$spacing` and it's size variants. The size of `$spacing` should be between
  `$spacing-small` and `$spacing-large`<br>
  Defaults to:

  ```
  $spacing-tiny: $spacing-small / 2;
  $spacing-small: $spacing / 2;
  $spacing: rem(20);
  $spacing-large: $spacing * 2;
  $spacing-huge: $spacing * 3;
  ```

  The default ratios should allow you to just set `$spacing` and still get reasonable output

* Size class type: whether to output a normal class or a placeholder class.<br>
  Defaults to:

  ```
  $size-class-type: ".";
  $push-class-type: $size-type;
  $pull-class-type: $size-type;
  ```

  Acceptable values are `"."` (for normal classes) or `"%"` (for placeholder classes)

* `$size-denominators`: Controls which denominators to generate common fraction
  based size classes from. Defaults to: `1 2 3 4 5 6`.<br>
  Note that this will simplify the fractions which are output, meaning that
  `.u-2/4` will not be created because `.u-1/2` is a simpler fraction.

### Breakpoints

The `bp`, `bp-max`, and `bp-min-max` mixins can take either named breakpoints,
as defined in `$breakpoints`, or it can directly take a size
(unitless numbers are assumed to be in pixels, and are converted to `rem`)

* `$default-media`: Sets the media type to use in media queries.
  Defaults to `all`
* `$breakpoints`: The sass map which defines the various breakpoints to use with
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
  e.g. `$breakpoints = map_merge($breakpoints, (large: rem(1080)));`

### Grid


### Links


### Type

