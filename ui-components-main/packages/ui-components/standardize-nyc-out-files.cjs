const path = require('path')
const { readdirSync, readFileSync, writeFileSync } = require('node:fs')

/**
 * This script renames paths in `.nyc_output/out.json` files, which are used by nyc/istanbul code coverage tools,
 * to correctly reflect the full base path of this repository. Without running this script, running `nyc merge`
 * on files with different base paths or `nyc report` will create incorrect coverage metrics as it
 * cannot appropriately associate the code coverage on the current system.
 *
 * It is meant to be run in GitHub Actions, after it collects all out-*.json files collected from code coverage.
 * It will rename the paths so it will read correctly, but needs to happen before using the command for `nyc merge ./out`.
 *
 * Steps in the `test.yml` job:
 * - Let all jobs run in GitHub Actions that produce `.nyc_output/out.json` files from nyc/istanbul code coverage,
 *  and upload them as artifacts with unique names (out-*.json)
 * - In a downstream job, collect all `out.json` files in a temp directory of "./out"
 * - Run this script: `node ./standardize-nyc-out-files.cjs` or `bun run coverage:standardize-nyc-out-files`
 * - run `bunx nyc merge ./out .nyc_output/out.json`
 * - run `bunx nyc report --check-coverage=false -r=text -r=html > report.txt`
 * - The report will contain all code coverage metrics properly.
 *
 * Parameters:
 * * @param [INPUT_FILE_DIR=process.env.INPUT_FILE_DIR  or `./out`] {string} The directory containing all unique `out-*.json` files
 */
function main() {
  /* eslint-disable @typescript-eslint/no-var-requires */
  const { readFileSync, writeFileSync, readdirSync } = require('node:fs')
  const path = require('path')
  const GITHUB_ACTIONS_RUNNER_GENERIC_REGEX = new RegExp('/.+runner/.+/ui-components/', 'g')
  const INPUT_FILE_DIR = process.env.INPUT_FILE_DIR || path.resolve(process.cwd(), './out')

  const unformattedFiles = readdirSync(INPUT_FILE_DIR)
  for (const fileName of unformattedFiles) {
    const filePath = path.join(INPUT_FILE_DIR, fileName)
    const data = readFileSync(filePath).toString()
    const out = JSON.parse(data)

    Object.entries(out).map(([k, v]) => {
      const replacedKey = k.replace(GITHUB_ACTIONS_RUNNER_GENERIC_REGEX, path.join(process.cwd(), '/'))
      v.path = v.path.replace(GITHUB_ACTIONS_RUNNER_GENERIC_REGEX, path.join(process.cwd(), '/'))
      if (v?.inputSourceMap?.sources?.length > 0) {
        v.inputSourceMap.sources = v.inputSourceMap.sources.map((s) => {
          return s.replace(GITHUB_ACTIONS_RUNNER_GENERIC_REGEX, path.join(process.cwd(), '/'))
        })
      }

      out[replacedKey] = v
      delete out[k]
    })

    writeFileSync(filePath, JSON.stringify(out))
    console.log('Updated file: ' + filePath)
  }
  console.log('Completed for all files')
}

main()
