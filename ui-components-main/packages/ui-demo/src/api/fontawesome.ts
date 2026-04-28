/* eslint-disable no-console */
/**
 * FontAwesome GraphQL API client
 *
 * This module provides utilities to query the FontAwesome GraphQL API
 * for icon metadata including labels, styles, and search terms.
 *
 * @see https://docs.fontawesome.com/apis/graphql
 */

const FONTAWESOME_API_URL = 'https://api.fontawesome.com'
const FONTAWESOME_TOKEN_URL = 'https://api.fontawesome.com/token'
const FONTAWESOME_API_KEY = import.meta.env.VITE_FONTAWESOME_API_KEY

/**
 * Get an access token from the API token
 */
async function getAccessToken(): Promise<string> {
  if (!FONTAWESOME_API_KEY) {
    throw new Error('VITE_FONTAWESOME_API_KEY not found in environment variables')
  }

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

/**
 * Icon data structure returned from the FontAwesome API
 */
export interface FontAwesomeIcon {
  id: string
  label: string
  families: Record<string, string[]>
}

/**
 * Raw icon data from the API
 */
interface RawIcon {
  id: string
  label: string
  familyStylesByLicense: {
    pro: Array<{ family: string; style: string }>
  }
}

/**
 * Fetch all icons from FontAwesome GraphQL API for a specific version
 *
 * @param version - FontAwesome version (e.g., "7.x", "6.x", "7.0.0")
 * @param license - License type: "free" or "pro" (default: "free")
 * @returns Promise resolving to an object mapping icon IDs to icon data
 *
 * @example
 * ```ts
 * const icons = await fetchFontAwesomeIcons('7.x', 'free')
 * console.log(icons['star']) // { id: 'star', label: 'Star', styles: ['solid', 'regular'], ... }
 * ```
 */
/**
 * Fetch a batch of icons using the search API
 */
async function fetchSearchBatch(version: string, accessToken: string, searchQuery: string, first: number = 500): Promise<RawIcon[]> {
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
    console.error('GraphQL errors:', result.errors)
    throw new Error(`GraphQL errors: ${result.errors.map((e: { message: string }) => e.message).join(', ')}`)
  }

  if (!result.data?.search) {
    return []
  }

  return result.data.search
}

export async function fetchFontAwesomeIcons(version: string = '7.x', license: 'free' | 'pro' = 'pro'): Promise<Record<string, FontAwesomeIcon>> {
  try {
    console.log(`Fetching FontAwesome icons for version ${version} (${license})...`)

    // Get access token
    const accessToken = await getAccessToken()

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
    const allIconsMap = new Map<string, RawIcon>()

    for (const searchQuery of searchQueries) {
      console.log(`Searching for icons matching "${searchQuery}"...`)
      try {
        const icons = await fetchSearchBatch(version, accessToken, searchQuery, 500)

        for (const icon of icons) {
          if (!allIconsMap.has(icon.id)) {
            allIconsMap.set(icon.id, icon)
          }
        }

        console.log(`Found ${icons.length} icons (${allIconsMap.size} unique total)`)
      } catch (error) {
        console.error(`Error searching for "${searchQuery}":`, error)
      }
    }

    const rawIcons = Array.from(allIconsMap.values())

    console.log(`Successfully fetched ${rawIcons.length} icons`)

    // Convert array to object keyed by icon ID with proper family-style structure
    // Only include these standard FontAwesome families
    const allowedFamilies = ['classic', 'sharp', 'duotone', 'sharp-duotone']

    const iconsMap: Record<string, FontAwesomeIcon> = {}
    for (const rawIcon of rawIcons) {
      // Group by family, then collect styles
      const familyStylesMap: Record<string, string[]> = {}

      for (const fs of rawIcon.familyStylesByLicense.pro) {
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
        iconsMap[rawIcon.id] = {
          id: rawIcon.id,
          label: rawIcon.label,
          families: familyStylesMap,
        }
      }
    }

    return iconsMap
  } catch (error) {
    console.error('Failed to fetch FontAwesome icons:', error)
    throw error
  }
}

/**
 * Fetch icons and save them to a JSON file
 * This is a utility function for updating the local icon data
 *
 * @param version - FontAwesome version (e.g., "7.x", "6.x")
 * @param license - License type: "free" or "pro"
 * @returns Promise resolving to the icon data
 */
export async function fetchAndSaveIcons(version: string = '7.x', license: 'free' | 'pro' = 'pro'): Promise<Record<string, FontAwesomeIcon>> {
  const icons = await fetchFontAwesomeIcons(version, license)

  // Log the JSON to console so it can be copied
  console.log('Icon data fetched successfully. Copy the following JSON:')
  console.log(JSON.stringify(icons, null, 2))

  return icons
}
