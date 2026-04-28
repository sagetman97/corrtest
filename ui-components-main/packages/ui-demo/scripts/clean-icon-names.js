#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Script to clean up iconNames.json by removing unnecessary fields:
 * - svg (all SVG data)
 * - ligatures
 * - unicode
 * - voted
 * - changes
 * - free
 *
 * Keeps only: label, styles, and search terms
 */
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const iconNamesPath = join(__dirname, '../src/assets/iconNames.json')

console.log('Reading iconNames.json...')
const rawData = readFileSync(iconNamesPath, 'utf8')
const iconData = JSON.parse(rawData)

console.log('Cleaning icon data...')
const cleanedData = {}

for (const [key, value] of Object.entries(iconData)) {
  cleanedData[key] = {
    label: value.label,
    styles: value.styles,
    search: value.search,
  }
}

console.log('Writing cleaned data back to file...')
writeFileSync(iconNamesPath, JSON.stringify(cleanedData, null, 2), 'utf8')

console.log('✅ Done! Removed svg, ligatures, unicode, voted, changes, and free fields.')
console.log(`   Processed ${Object.keys(cleanedData).length} icons.`)
