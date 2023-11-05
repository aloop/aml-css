# AML CSS

This is a personal project, just for messing around with.

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

### Manual

Clone the repository somewhere in your project, then copy the contents of the `scaffold` directory to wherever you like, then customize import paths as needed.

## Recommended tooling

- [PurgeCSS](https://purgecss.com/) - Remove unused classes or class variants - heavily recommended!

## Naming Conventions

This mostly follows the [SUITCSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md):

- All classes (aside from state classes) can be namespaced
  by overriding `$namespace` from `./src/abstract/_variables.scss`
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

1. **Abstract**: Variables, root css properties, functions/mixins
2. **Base**: CSS Reset/Box-Sizing, defaults for bare element selectors
3. **Layout**: Main layout styles, e.g. Page Header, Main Nav, Footer
4. **Pages**: Page-specific styles (e.g. Home page, About page, etc.)
5. **Objects**: Generic objects for common patterns, such as [the media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)
6. **Components**: Re-usable classes go here
7. **Utilities**: Utility classes, e.g. `.u-visuallyHidden`
8. **Vendor**: 3rd party CSS goes here
9. **Overrides**: Styles which need a high specificity, e.g. print styles, overrides of CSS from vendor code, etc.

Any of the sections listed above may be omitted if not needed.

## Mixins

### Breakpoints

There are 3 breakpoint mixins provided by aml-css:

- `bp`, which creates a min-width media query
- `bp-max`, which creates a max-width media query
- `bp-min-max`, which creates a media query constrained between a min-width and
  max-width

The `bp` and `bp-max` mixins share the same function signature of: `bp($breakpoint, $media)`,
where `$breakpoint` can be a named breakpoint, as defined in `variables.$breakpoints`,
or alternatively a number with or without a unit.

Numbers given without units
are assumed to be pixels, and are converted to rem in the final output. `$media` is an optional parameter, defaulting to `variables.$default-media-type`.

The `bp-min-max` mixin's function signature is `bp-min-max($min-bp, $max-bp, $media)`. `$media` is an optional parameter, defaulting to `variables.$default-media-type`.

## Functions

- ```scss
  rem($pixels, $base-font-size: variables.$base-font-size)
  ```

  Takes a unitless number `$pixels`, representing the desired size in pixels, and converts it to a rem unit.

- ```scss
  em($pixels, $base-font-size: variables.$base-font-size)
  ```

  Identical to `rem` above, but outputs an number with an em unit instead.

- ```scss
  fluid-size(
    $min-size,
    $max-size,
    $min-container-width: variables.$min-site-width,
    $max-container-width: variables.$max-site-width,
    $unit: vw
  )
  ```

  All numbers given to `fluid-size` are expected to be in pixels, with or without the px unit.

## SCSS Variables & CSS Custom Properties

### Class namespacing

The format will output as follows: `.{prefix}-{namespace-}ClassName`.

- `$namespace`: The namespace for all classes (except state classes). Defaults to `""`.

  When set, a hypen will automatically be used as a separator.

  Can be set during the initial @forward/@use:

  ```scss
  @forward "src/abstract/variables" with (
    $namespace: "NAMESPACE"
  );
  ```

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
- `--aml-font-scale`: Used to calculate the base font size set on the `html` element.
  A value of `1` is equivalent to 16px. By default the scale is calculated as
  `variables.$base-font-size / 16`.
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

### Sizes

- `--aml-min-site-width`: The minimum width of the site. Defaults to `variables.$min-site-width`
- `--aml-max-site-width`: The maximum width of the site, used for the `.Container` object, along with the `max` breakpoint. Defaults to `variables.$max-site-width`
- `$base-size` and it's size variants.

  Default sizes as defined in `src/abstract/_variables.scss`:

  ```scss
  $base-size: 20;

  $sizes: (
    default: $base-size,
    xs: math.div($base-size, 4),
    sm: math.div($base-size, 2),
    md: $base-size,
    lg: $base-size * 2,
    xl: $base-size * 4,
  );
  ```

  Will generate:

  ```scss
  --aml-size: 1.25rem;
  --aml-size-xs: 0.3125rem;
  --aml-size-sm: 0.625rem;
  --aml-size-md: 1.25rem;
  --aml-size-lg: 2.5rem;
  --aml-size-xl: 5rem;
  ```

  If you want to add or change breakpoints, override `additionalBreakpoints` as in the following example:

  ```scss
  @forward "src/abstract/variables" with (
    $additionalSizes: (
      xxl: 120,
    )
  );
  ```

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
    xs: 480,
    sm: 680,
    md: 768,
    lg: 960,
    xl: 1200,
    max: $max-site-width,
  ) !default;
  ```

  If you want to add or change breakpoints, override `additionalBreakpoints` as in the following example:

  ```scss
  @forward "src/abstract/variables" with (
    $additionalBreakpoints: (
      xxl: 1600,
    )
  );
  ```

### Transition/Animation Easings

The following custom easings are defined for convenience: `sine`, `quad`,
`cubic`, `quart`, `quint`, `expo`, `circ`, `back`.

Each easing definition has an `in`, `out`, and `inOut` variant, along with a sub-map `reversed` with the same variants.

These are defined in `src/abstract/_variables.scss` and can be overridden or added to like so:

```scss
@forward "src/abstract/variables" with (
  $additionalEasings: (
    sine: (
      in: cubic-bezier(0.47, 0, 0.745, 0.715),
      out: cubic-bezier(0.39, 0.575, 0.565, 1),
      inOut: cubic-bezier(0.445, 0.05, 0.55, 0.95),
      // The following key `reversed` is optional, but if defined
      // is treated specially. It will generate custom properties
      // ending in `-reverse`
      reversed:
        (
          in: cubic-bezier(0.255, 0.285, 0.53, 1),
          out: cubic-bezier(0.435, 0, 0.61, 0.425),
          inOut: cubic-bezier(0.45, 0.05, 0.555, 0.95),
        ),
    ),
  )
);
```

The sass map will be transformed into CSS custom properties like so:

```scss
--ease-sine-in: cubic-bezier(0.47, 0, 0.745, 0.715);
--ease-sine-out: cubic-bezier(0.39, 0.575, 0.565, 1);
```

and so on.

### Base64-encoded Placeholder Images

There are 4 defined by default, in 4 different aspect ratios (1:1, 2:1, 4:3,
and 16:9). They are transparent.

These are defined in `src/abstract/_variables.scss` and can be overridden or added to like so:

```scss
@forward "src/abstract/variables" with (
  $additionalPlaceholders: (
    "16x10": "data:image/png;base64,...",
  )
);
```

## TODO

- Write clearer explanations and provide better information about various
  aspects of this library. This should include much better comments and
  documentation in the actual scss files.
- Implement more objects
- Look into setting up a linter to catch errors, and enforce some of the
  naming conventions and code style.
- Unit tests
- Look into the possibility of regression testing to
  determine when changes affect layout or style.
