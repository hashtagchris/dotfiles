#!/usr/bin/node
const fs = require('fs')
const process = require('process')

if (process.argv.length !== 5) {
  console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <settings.json> <petName> <machineName>`)
  return
}

const settingsFile = process.argv[2]
const petName = process.argv[3]
const machineName = process.argv[4]

const json = fs
  .readFileSync(settingsFile, 'utf8')
  .replace(new RegExp(/(\/\/.*)/, 'gi'), '')
  .trim()

const settings = JSON.parse(json)

let backgroundColor
if (settings['workbench.colorCustomizations'] && settings['workbench.colorCustomizations']['activityBar.background']) {
    backgroundColor = settings['workbench.colorCustomizations']['activityBar.background']
} else {
    // Assign a random background color
    backgroundColor = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

settings['window.title'] = `\${activeEditorShort}\${separator}\${rootName}\${separator}${petName} ${machineName}`
settings['workbench.colorCustomizations'] = {}
settings['workbench.colorCustomizations']['activityBar.background'] = backgroundColor
settings['workbench.colorCustomizations']['titleBar.activeBackground'] = backgroundColor

const replacementJson = JSON.stringify(settings, null, 2)

// console.log(replacementJson)
fs.writeFileSync(settingsFile, replacementJson, 'utf8')

console.log(`vscode settings updated. Background color: ${backgroundColor}`)
