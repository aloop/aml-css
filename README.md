# AML CSS

This is a personal project, based on things like ITCSS and SUITCSS. Just for messing around with.

## Install

### NPM

```sh
npm install --save-dev @amloop/aml-css
```

#### Scaffolding

```sh
# Will output to $(pwd)/styles by default
npm exec aml-css create
```

or

```sh
# will output to $(pwd)/src/styles
npm exec aml-css create --output=src/styles
```

For the moment it may still be necessary to manually alter some of the `@use` paths
to point to the proper directory

### Manual

Clone the repository somewhere in your project, then copy the contents of the `scaffold` directory to wherever you like, then customize import paths as needed.

## Recommended tooling

- [PurgeCSS](https://purgecss.com/) - Remove unused classes or class variants

## Naming Conventions

This mostly follows the [SUITCSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md):

- All classes (aside from state classes) can be namespaced
  by overriding `settings.$namespace` from `./settings/_index.scss`
- Variables, functions, and mixins are snake-case
- Objects are prefixed with `o-`, components are prefixed with `c-`
- Objects and Components start in title-case, with sub-objects and sub-components being separated by a hyphen and
  written in camel-case, e.g. `.o-Object-subObject` or `.c-Component-subComponent`
- No components are included, but they should be follow the same rules as
  objects
- Modifiers for both objects and components are separated with two hyphens and
  written in snake-case, e.g. `.o-Object--some-modifier` or
  `.o-Object-subObject--modifierName`
- Utility classes are prefixed with `u-` and are in camel-case following that,
  e.g. `.u-utilityName`
- State classes starts with the verb and a hyphen (`has-`, `is-`, etc.) and
  ends with the state name in snake-case, e.g. `.is-some-state`

## Structure

The structure used here is basically ITCSS (Inverted Triangle CSS).

The order is as follows, from least specific to most specific:

1. Settings (Set variables here)
2. Tools (Sass functions/mixins are defined here)
3. Generic (CSS Reset/Box-Sizing)
4. Elements (Setting defaults for bare element selectors)
5. Objects (Generic objects for common patterns, such as [the media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/))
6. Components (Most styles will go here)
7. Utilities (Utility classes, e.g. `.u-visuallyHidden`)
8. Vendor code (3rd party libs)
9. Overrides (Styles which need a high specificity, e.g. print styles)

Any of the sections listed above may be omitted if not needed.

## Mixins

### Breakpoints

There are 3 breakpoint mixins provided by aml-css:

- `bp`, which creates a min-width media query
- `bp-max`, which creates a max-width media query
- `bp-min-max`, which creates a media query constrained between a min-width and
  max-width

The `bp` and `bp-max` mixins share the same function signature of: `bp($breakpoint, $media)`,
where `$breakpoint` can be a named breakpoint, as defined in `settings.$breakpoints`,
or alternatively a number with or without a unit.

Numbers given without units
are assumed to be pixels, and are converted to rem in the final output. `$media` is an optional parameter, defaulting to `settings.$default-media-type`.

The `bp-min-max` mixin's function signature is `bp-min-max($min-bp, $max-bp, $media)`. `$media` is an optional parameter, defaulting to `settings.$default-media-type`.

## Functions

- ```scss
  rem($pixels, $base-font-size: settings.$base-font-size)
  ```

  Takes a unitless number `$pixels`, representing the desired size in pixels, and converts it to a rem unit.

- ```scss
  em($pixels, $base-font-size: settings.$base-font-size)
  ```

  Identical to `rem` above, but outputs an number with an em unit instead.

- ```scss
  responsive-font-size(
    $min-font-size,
    $max-font-size,
    $min-site-width: settings.$min-site-width,
    $max-site-width: settings.$max-site-width,
    $base-font-size: settings.$base-font-size
  )
  ```

## SCSS Variables & CSS Custom Properties

### Class namespacing

The format will output as follows: `.{prefix}-{namespace-}ClassName`.

- `settings.$namespace`: The namespace for all classes (except state classes). Defaults to `""`.

  When set, a hypen will automatically be used as a separator.

### Colors

- `--aml-bg-color`: The background color applied to the body tag.
  Defaults to `transparent`.
- `--aml-text-color`: the default color for most text. Defaults to `#000`.
- `--aml-link-color`: The text color applied to links. Defaults to `#3084bb`.
- `--aml-link-color-hover`: The text color applied to links which are being
  interacted with. Defaults to `--aml-link-color`.

### Type

The following type-related variables are available to change:

- `--aml-font-family`: sets the default font family for most text. Defaults to
  `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- `--aml-font-size`: sets the default font size for most text. Defaults to `16px`.
  Should be set in pixels.
- `--aml-line-height`: sets the default line height for most text.
  Defaults to `1.5`.
- `--aml-font-weight`: sets the default font weight for most text.
  Defaults to `400`.
- `--aml-heading-font-family`: sets the default font-family for headings.
  Defaults to `$aml-font-family`
- `--aml-heading-font-weight`: sets the default font weight for headings.
  Defaults to `700`.
- `--aml-link-decoration`: sets the default link decoration. Defaults to `underline`.
- `--aml-link-decoration-hover`: sets the default link decoration when a link
  is hovering/active. Defaults to `none`
- `--aml-button-font-family`: sets the default font family for buttons.
  Defaults to `inherit`

### Sizes and Spacing

- `--aml-min-site-width`: The minimum width of the site. Defaults to `settings.$min-site-width`
- `--aml-max-site-width`: The maximum width of the site, used for the `.Container` object, along with the `max` breakpoint. Defaults to `settings.$max-site-width`
- `--aml-spacing` and it's size variants. The size of `--aml-spacing` should be between
  `--aml-spacing-small` and `--aml-spacing-large`

  Defaults to:

  ```scss
  --aml-spacing: rem(20);
  --aml-spacing-xs: calc(var(--aml-spacing) / 4);
  --aml-spacing-s: calc(var(--aml-spacing) / 2);
  --aml-spacing-l: calc(var(--aml-spacing) * 2);
  --aml-spacing-xl: calc(var(--aml-spacing) * 4);
  ```

  The default ratios should allow you to just set `--aml-spacing` and still get reasonable output

- `--aml-margin` and `--aml-padding` set the amount of margin or
  padding to apply to certain elements by default.

#### Global defaults for breakpoints

- `$default-media-type`: Sets the media type to use in media queries.
  Defaults to `all`
- `$breakpoints`: The sass map which defines the various breakpoints to use with
  the `bp`, `bp-max`, and `bp-min-max` mixins, as well as for the various
  classes which can generate variants such as `.u-hidden@lg`, with `lg`
  being the name of the breakpoint.

  Defaults breakpoints are:

  ```scss
  $breakpoints = (
    xs: rem(480),
    sm: rem(680),
    md: rem(768),
    lg: rem(960),
    xl: rem(1200),
    max: rem(settings.$max-site-width),
  );
  ```

  If you want to add custom breakpoints the map, use the sass built-in
  [`map.merge`](https://sass-lang.com/documentation/modules/map#merge)
  e.g. `settings.$breakpoints = map_merge(settings.$breakpoints, (large: rem(1600)));`

### Transition/Animation Easings

The following custom easings are defined for convenience: `sine`, `quad`,
`cubic`, `quart`, `quint`, `expo`, `circ`, `back`.

Each easing definition has an `in`, `out`, and `inOut` variant, along with a sub-map `reversed` with the same variants.

All variations of the above follow the formatting below (with names substituted
for `sine` in this example):

```scss
@use "tools/functions/easings";

// Getting the normal variants
easings.get(sine, in);
easings.get(sine, out);
easings.get(sine, inOut);

// Getting the reversed variants
easings.get(sine, in, true);
easings.get(sine, out, true);
easings.get(sine, inOut, true);
```

### Alternative forms

```scss
@use "tools";

tools.easings-get(sine, in);
```

```scss
@use "tools/functions";

functions.easings-get(sine, in);
```

### Base64-encoded Placeholder Images

There are 4 of these by default, in 4 different aspect ratios (1:1, 2:1, 4:3,
and 16:9). The color is transparent.

```scss
@use "tools/functions/placeholder-images" as img;

img.get("1:1");
```

## TODO

- Write clearer explanations and provide better information about various
  aspects of this library. This should include much better comments and
  documentation in the actual scss files.
- Implement more objects
- Look into setting up a linter to catch errors, and enforce some of the
  naming conventions and code style.
- Look into the possibility of regression testing to
  determine when changes affect layout or style.
