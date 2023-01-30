import { RuleTester } from "eslint";

import rule from "../rules/require-attributes";

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2022 }
});

tester.run("require-attributes", rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template> <input id="test" /> </template>`,
      options: [{
        id: ['input']
      }]
    },
    {
      filename: 'test.vue',
      code: `<template> <button type="reset" /> </template>`,
      options: [{
        type: ['button']
      }]
    },
    {
      filename: 'test.vue',
      code: `<template> <users-table :usersList="[]" /> </template>`,
      options: [{
        usersList: ['users-table']
      }]
    },
    {
      filename: 'test.vue',
      code: `<template> <PriceLists :prices="[22, 33, 44]" /> </template>`,
      options: [{
        prices: ['PriceLists']
      }]
    },
    {
      filename: 'test.vue',
      code: `<template> <a href="/" /> </template>`,
      options: [{
        href: ['a']
      }]
    },
    {
      filename: 'test.vue',
      code: `<template> <a href="/" id="main" /> </template>`,
      options: [{
        href: ['a'],
        id: ['a'],
      }]
    },
    {
      filename: 'test.vue',
      code: `<template>
      <client-only>
        <div class="">
          <div class="">
            <test-field style="">
              <field class="">
                <input
                  v-model="myName"
                  size="is-small"
                  type="search"
                  data="data"
                ></input>
                
                <p>
                  <button
                    data="data"
                    type="is-primary"
                    icon-right="loading"
                  />
                </p>
              </field>
            </test-field>
          </div>
        </div>
      </client-only>
    </template>
    `,
      options: [{
        'data': ['input', 'button', 'select', 'datepicker']
      }]
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `<template> <input /> </template>`,
      options: [{
        id: ['input']
      }],
      errors: [
        {
          message: "\"input\" component must have \"id\" attribute."
        }
      ],
    },
    {
      filename: 'test.vue',
      code: `<template> <a /> </template>`,
      options: [{
        href: ['a']
      }],
      errors: [
        {
          message: "\"a\" component must have \"href\" attribute."
        }
      ],
    },
    {
      filename: 'test.vue',
      code: `<template> <custom-link /> </template>`,
      options: [{
        href: ['custom-link']
      }],
      errors: [
        {
          message: "\"custom-link\" component must have \"href\" attribute."
        }
      ],
    },
    {
      filename: 'test.vue',
      code: `<template> <is-loading /> </template>`,
      options: [
        {
          'is-visible': ['is-loading']
        },
        (tagName: string, missedAttribute: string) => `"${tagName}" -> "${missedAttribute}"`
      ],
      errors: [
        {
          message: "\"is-loading\" -> \"is-visible\""
        }
      ],
    },
  ],
});