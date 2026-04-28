/* eslint-disable no-console */
/**
 * Script to fetch icon metadata from FontAwesome GraphQL API
 * and update the local iconNames.json file
 *
 * Usage:
 *   bun run packages/ui-demo/scripts/fetch-icons.js [version] [license]
 *
 * Examples:
 *   bun run packages/ui-demo/scripts/fetch-icons.js
 *   bun run packages/ui-demo/scripts/fetch-icons.js 7.x free
 *   bun run packages/ui-demo/scripts/fetch-icons.js 6.x pro
 */

import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env.local manually
const envPath = join(__dirname, '../.env.local')
const envContent = readFileSync(envPath, 'utf8')
const envVars = {}
envContent.split('\n').forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const FONTAWESOME_API_URL = 'https://api.fontawesome.com'
const FONTAWESOME_TOKEN_URL = 'https://api.fontawesome.com/token'
const FONTAWESOME_API_KEY = envVars.VITE_FONTAWESOME_API_KEY

if (!FONTAWESOME_API_KEY) {
  console.error('❌ Error: VITE_FONTAWESOME_API_KEY not found in .env.local')
  process.exit(1)
}

/**
 * Get an access token from the API token
 */
async function getAccessToken() {
  const response = await fetch(FONTAWESOME_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${FONTAWESOME_API_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to get access token! status: ${response.status}`)
  }

  const result = await response.json()
  return result.access_token
}

// Get version and license from command line args, or use defaults
const version = process.argv[2] || '7.x'
const license = process.argv[3] || 'pro'

console.log(`\n📦 Fetching FontAwesome icons...`)
console.log(`   Version: ${version}`)
console.log(`   License: ${license}\n`)

/**
 * Fetch a batch of icons using the search API
 */
async function fetchSearchBatch(version, accessToken, searchQuery, first = 500) {
  const query = `
    query {
      search(version: "${version}", query: "${searchQuery}", first: ${first}) {
        id
        label
        familyStylesByLicense {
          pro {
            family
            style
          }
        }
      }
    }
  `

  const response = await fetch(FONTAWESOME_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()

  if (result.errors) {
    console.error('❌ GraphQL errors:', result.errors)
    throw new Error(`GraphQL errors: ${result.errors.map((e) => e.message).join(', ')}`)
  }

  if (!result.data?.search) {
    return []
  }

  return result.data.search
}

/**
 * Fetch all icons from FontAwesome GraphQL API using search batches
 */
async function fetchIcons(version, license, accessToken) {
  // Use alphabet batches to get all icons via search
  const searchQueries = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]
  const allIconsMap = new Map()

  for (const searchQuery of searchQueries) {
    console.log(`   Searching for icons matching "${searchQuery}"...`)
    try {
      const icons = await fetchSearchBatch(version, accessToken, searchQuery, 500)

      for (const icon of icons) {
        if (!allIconsMap.has(icon.id)) {
          allIconsMap.set(icon.id, {
            id: icon.id,
            label: icon.label,
            familyStyles: icon.familyStylesByLicense.pro,
          })
        }
      }

      console.log(`      Found ${icons.length} icons (${allIconsMap.size} unique total)`)
    } catch (error) {
      console.log(`      Error: ${error.message}`)
    }
  }

  return Array.from(allIconsMap.values())
}

/**
 * Convert icon array to object keyed by icon ID with proper family-style structure
 */
function convertToObject(icons) {
  // Only include these standard FontAwesome families
  const allowedFamilies = ['classic', 'sharp', 'duotone', 'sharp-duotone']

  const iconsMap = {}
  for (const icon of icons) {
    // Group by family, then collect styles
    const familyStylesMap = {}

    for (const fs of icon.familyStyles) {
      // Skip semibold style
      if (fs.style === 'semibold') {
        continue
      }

      // Skip non-standard families
      if (!allowedFamilies.includes(fs.family)) {
        continue
      }

      if (!familyStylesMap[fs.family]) {
        familyStylesMap[fs.family] = []
      }
      if (!familyStylesMap[fs.family].includes(fs.style)) {
        familyStylesMap[fs.family].push(fs.style)
      }
    }

    // Only include icons that have at least one family-style combination
    if (Object.keys(familyStylesMap).length > 0) {
      iconsMap[icon.id] = {
        label: icon.label,
        families: familyStylesMap,
      }
    }
  }
  return iconsMap
}

/**
 * Main execution
 */
async function main() {
  try {
    // Get access token
    console.log('🔑 Getting access token...')
    const accessToken = await getAccessToken()
    console.log('✅ Access token obtained\n')

    // Fetch icons from API
    const icons = await fetchIcons(version, license, accessToken)
    console.log(`✅ Fetched ${icons.length} icons from FontAwesome API\n`)

    // Convert to object format
    const iconsMap = convertToObject(icons)

    // Write to file
    const outputPath = join(__dirname, '../src/assets/iconNames.json')
    writeFileSync(outputPath, JSON.stringify(iconsMap, null, 2), 'utf8')

    console.log(`✅ Successfully wrote ${Object.keys(iconsMap).length} icons to iconNames.json\n`)

    // Print summary by family-style combinations
    const familyStyleCount = {}
    Object.values(iconsMap).forEach((icon) => {
      Object.entries(icon.families).forEach(([family, styles]) => {
        styles.forEach((style) => {
          const key = `${family}:${style}`
          familyStyleCount[key] = (familyStyleCount[key] || 0) + 1
        })
      })
    })

    console.log('📊 Icons by family-style:')
    Object.entries(familyStyleCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([familyStyle, count]) => {
        console.log(`   ${familyStyle.padEnd(25)} ${count}`)
      })

    console.log('\n✨ Done!\n')
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
