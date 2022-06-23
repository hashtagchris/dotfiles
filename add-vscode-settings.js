#!/usr/bin/env node
const fs = require('fs')
const process = require('process')

if (process.argv.length !== 4) {
  console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <additions.json> <vscode-settings.json>`)
  return
}

const additionsFile = process.argv[2]
const settingsFile = process.argv[3]

const additionsJson = fs.readFileSync(additionsFile, 'utf8').trim()
const additions = JSON.parse(additionsJson)

const json = fs
  .readFileSync(settingsFile, 'utf8')
  // remove comments in the "json"
  .replace(new RegExp(/(\/\/.*)/, 'gi'), '')
  // remove any trailing commas in the "json"
  .replace(new RegExp(/(,)(\s*)(\})/, 'g'), '$3')
  .trim()

const config = JSON.parse(json)

const replacementConfig = Object.assign(config, additions)
const replacementJson = JSON.stringify(replacementConfig, null, 2)

fs.writeFileSync(settingsFile, replacementJson, 'utf8')

console.log(`vscode settings updated.`)
