# Demo

The demo for ui-components is hosted on GitHub Pages:
http://pollyex.github.io/ui-components

Code Coverage:
http://pollyex.github.io/ui-components/code-coverage-report

# Local setup
You may need to run `nvm install` and `nvm use` to use a consistent Node.Js version to run certain scripts, like for Cypress testing.

Next, you must install Bun to install deps, and run dev scripts. its essentially the same thing as npm.

`npm install -g bun`

or visit https://bun.sh/docs/installation for more options for installing.

once bun is installed you can run

`bun install` or `bun i`

`bun run dev` will run the open the demo locally.

`bun run build` will build the library for production.

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3
`<script setup>` SFCs, check out
the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (
  and disable
  Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for
type checking. In editors, we
need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented
a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more
performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Testing

We have vitest and cypress component tests setup for the library. Each component should have a corresponding cypress
test suite in the packages/ui-components/cypress/components folder. Vitest tests are used more for service testing and
they are located next to the component they are testing.

The main philosophy for the cypress tests is to test functionality and interactions. We are not doing 100% visual or
snapshot testing for these components.

### Running tests

`bun run test` will run vitest.

`bun run cypress` will run cypress component tests in headless mode.

`bun run cypress:open` will open cypress component tests in headed mode through a browser window.

## Code Coverage

Code coverage occurs against both unit and component tests in separate reports. This will happen on the GitHub Actions
job for testing (`test.yml`), but also can be run locally, where it outputs both an interactive HTML report and as a
text table to the console.

### Code Coverage configuration files

There is a common `packages/ui-copmonents'./.nycrc.config.mjs` file, but it is solely used for reporting merged unit +
component code coverage results. It also serves as the basis for the unit and component configuration files.

Cypress uses the "nyc" configuration of `packages/ui-components/.nycrc.config.component.mjs`; it must be set as the
default in the `packages/ui-components/package.json`
file. [See here for reasoning.](https://github.com/cypress-io/code-coverage/issues/967)

Vitest/unit testing uses the "nyc" configuration listed in the `packages/ui-components/.nycrc.config.unit.mjs` file.

See

* code coverage guide for Vitest: https://vitest.dev/guide/coverage
* code coverage guides for Cypress: https://docs.cypress.io/app/tooling/code-coverage
* Additionally: https://github.com/istanbuljs/nyc

### Specifying ".ts" files covered by Cypress

Cypress is preferred to be used only for `.vue` files in this package, as Vitest handles ".ts" files.
However, there are times where Cypress must be used for ".ts" files, like composables interacting with a real DOM, and
therefore must be included in coverage reporting.

If a Cypress test file is added that covers a ".ts" file, then the `.nycrc.config.component.mjs` config file must be
updated, with the path to the file must be added to the array in `TS_FILES_COVERED_BY_CYPRESS`.

### How to read code coverage

From [Wikipedia - Code Coverage](https://en.wikipedia.org/wiki/Code_coverage):

* "% Stmts" / "% Statements": has each statement in the program been executed?
* "% Branch": has each branch (also called the DD-path) of each control structure (such as in _if_ and _case_
  statements)
  been executed? For example, given an _if_ statement, have both the _true_ and _false_ branches been executed? (This is
  a
  subset of edge coverage.)
* "% Funcs" / "% Functions": has each function (or subroutine) in the program been called?
* "% Lines": total percentage of all lines with executable code covered

### Running locally

To see results locally, run the following commands:

* Vitest (unit tests):
  * `bun test:unit:with-coverage`
  * `bun coverage:unit:local`
  * To see the HTML report, open `coverage/index.html` in your browser.
* Cypress (component tests):
  * `bun test:cypress`
  * run with UI: `bun test:cypress:open`
  * default port used for ui-app is `8081` with cypress
  * `bun coverage:component:local`
  * To see the HTML report, open `coverage/index.html` in your browser.

You can also clean out the coverage directories by running `bun coverage:clean`.

### Ignoring certain blocks of code from coverage

Cypress can use the default `nyc` statements to disable code coverage for any block on which we do not want to report.

### Parsing Hints (Ignoring Lines)

There may be some sections of your codebase that you wish to purposefully exclude from coverage tracking, to do so you
can use the following parsing hints:

* `/* istanbul ignore if @preserve */`: ignore the next if statement.
* `/* istanbul ignore else @preserve */`: ignore the else portion of an if statement.
* `/* istanbul ignore next @preserve */`: ignore the next thing in the source-code ( functions, if statements, classes,
  you name
  it).
* `/* istanbul ignore file @preserve */`: ignore an entire source-file (this should be placed at the top of the file).

For example, this ignore the next `if/else` statement as it is difficult to test:

```ts
//istanbul ignore next @preserve
export const baseUrl = import.meta.env.DEV ? appUrl : '/'
```

**Note: Vite/Vitest requires having `@preserve` for all code coverage comments!**

### Ignoring Methods

You can ignore every instance of a method simply by adding its name to the ignore-class-method array in your nyc
config.

 ```
{
 "ignore-class-method": ["render"] 
}
 ```

_The above was copied
from [ignoring code with istanbul/nyc](https://github.com/istanbuljs/nyc?tab=readme-ov-file#parsing-hints-ignoring-lines)._

## Publishing beta versions of ui-components

Publishing a beta version [current version]-beta.0 of the ui-components that can be installed in ui-application can be
done through the github actions tab.

- Click on the "Publish Beta Version" workflow on the left side
- Click "Run workflow" in the top right
- Select what branch you want to publish from
- Click "Run workflow"

![github action workflow](image-2.png)

When the workflow completes it will tell you the version that was published. All subsequent workflows will increment the
beta version number. 1.54.0-beta.0 -> 1.54.0-beta.1 -> 1.54.0-beta.2, etc.

once that workflow completes, you can install the beta version of ui-components in ui-application by running:

- `bun install @pollyex/ui-components@1.54.0-beta.0`

![publish beta version workflow](image-1.png)

