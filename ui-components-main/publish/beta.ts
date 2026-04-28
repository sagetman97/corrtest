/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/default */
import core from '@actions/core'
import { $ } from 'bun'

const packageName = '@pollyex/ui-components'

const packagePath = 'packages/ui-components'

async function setupGit() {
  await $`git config user.name "github-actions[bot]"`
  await $`git config user.email "41898282+github-actions[bot]@users.noreply.github.com"`
}

async function run() {
  try {
    await setupGit()

    const currentVersion = (await $`npm view ${packageName} version`.text()).trim()

    //since we aren't updating package.json with the current version, we need to manually set the version to the current
    //version and the apply the version bump.
    await $`cd ${packagePath} && npm version "${currentVersion}" --allow-same-version`.text()

    let newVersion = await $`cd ${packagePath} && npm version prerelease --preid=beta`.text()
    newVersion = newVersion
      .trim()
      .split(/(\r\n|\n|\r)/gm)
      .filter((word: string) => !/(\r\n|\n|\r)/.test(word))[1]
      .slice(1)

    core.setOutput('version', newVersion)
    console.log('Current Version:', currentVersion)
    console.log('New version:', newVersion)

    const publishOutput = await $`cd ${packagePath} && npm publish --access=restricted`.text()
    console.log(publishOutput)
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

await run()
