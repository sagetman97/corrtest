/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/default */
import core from '@actions/core'
import github from '@actions/github'
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

    const messages = (github.context.payload.commits || []).map((commit: { message: string }) => commit.message)

    console.log('Messages:', messages)

    let version = 'patch'
    if (messages.some((message: string) => message.includes('MAJOR:'))) {
      version = 'major'
    } else if (messages.some((message: string) => message.includes('MINOR:'))) {
      version = 'minor'
    }

    //since we aren't updating package.json with the current version, we need to manually set the version to the current
    //version and the apply the version bump.
    const currentVersion = (await $`npm view ${packageName} version`.text()).trim()

    await $`cd ${packagePath} && npm version "${currentVersion}" --allow-same-version --legacy-peer-deps`.text()

    let newVersion = await $`cd ${packagePath} && npm version ${version} --legacy-peer-deps`.text()
    newVersion = newVersion
      .trim()
      .split(/(\r\n|\n|\r)/gm)
      .filter((word: string) => !/(\r\n|\n|\r)/.test(word))[1]
      .slice(1)

    core.setOutput('version', newVersion)
    console.log('Current Version:', currentVersion)
    console.log('New version:', newVersion)

    const gitTagMessage = `Release v${newVersion}\n\n${messages.join(`\n\n`)}`
    core.setOutput('message', gitTagMessage)
    const tagOutput = await $`git tag -a v${newVersion} -m "${gitTagMessage}"`.text()
    console.log(tagOutput)

    const remote = `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`
    await $`git push ${remote} --follow-tags`
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

await run()
