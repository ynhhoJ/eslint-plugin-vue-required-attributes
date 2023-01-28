# eslint-plugin-vue-required-attributes

Inspired by [eslint-plugin-idiomatic-jsx](https://github.com/danrigsby/eslint-plugin-idiomatic-jsx) & `require-attributes` rule.

Require specified `attributes` on specified `components` from being used.

This is useful for things such as:

- Requiring a `id` attribute on things used by automated tests
- Requiring attributes needed for SEO or a11y concerns

## Installation

You'll first need to install ESLint:

```sh
# npm
npm install eslint --save-dev

# yarn
yarn add eslint --dev
```

Next, install `eslint-plugin-vue-required-attributes`:

```sh
# npm
npm install eslint-plugin-vue-required-attributes --save-dev

# yarn
yarn add eslint-plugin-vue-required-attributes --dev
```

## Configuration

Add `vue-required-attributes` to the plugins section of your `.eslintrc` configuration file. _You can omit the `eslint-plugin-` prefix_

```javascript
{
  "plugins": [
    "vue-required-attributes"
  ]
}
```

Configure the rules you want to use under the rules section.

```javascript
{
  "rules": {
    "vue-required-attributes/require-attributes": [ 1, {
      // options
    } ]
  }
}
```

## Usage

This rule takes one object argument of type object that defines an associative array of `attributes` that that should be required on the defined array of `components`.

```json
{
  "rules": {
    "vue-required-attributes/require-attributes": [
      1,
      {
        "id": ["a", "button", "input"]
      }
    ]
  }
}
```

### Succeed

```jsx
<a id='my-id'></a>                  <!-- Good: id is provided-->
<input id='my-id' />          <!-- Good: id is provided-->
```

### Fail

```jsx
<a></a>                             <!-- Bad: id is missing-->
<button></button>                   <!-- Bad: id is missing-->
```

### Custom output message

You may also pass in a 3rd option to change the default message that is output on error.

This can be handy if you want to explain "why" this rule is being used in your project or organization. This option is a `function` that takes in the `nodeType` and `attribute` name and returns a `string`.

```ts
{
  "rules": {
    "vue-required-attributes/require-attributes": [
      1,
      {
        id: ['a', 'button'],
      },
      (componentName: string, missedAttribute: string) => `"${componentName}" missing "${missedAttribute} attribute."`
    ]
  }
}
```

## ✏️ Code conduction

This project uses [Gitmoji](https://gitmoji.carloscuesta.me) for commit messages
