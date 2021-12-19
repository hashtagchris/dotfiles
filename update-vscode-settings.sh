#!/bin/sh

if ! command -v node
then
  echo "node not installed, skipping vscode setting.json updates"
  exit 0
fi

SELFDIR=$(cd "$(dirname "$0")"; pwd)

SETTINGS_PATH=$CODESPACE_VSCODE_FOLDER/.vscode/settings.json
PETNAME="$(cat ~/.petname)"
CODESPACE_SHORT_NAME="$(echo $CODESPACE_NAME | cut -d- -f4)"

git update-index --skip-worktree $SETTINGS_PATH

$SELFDIR/update-vscode-settings.js $SETTINGS_PATH $PETNAME $CODESPACE_SHORT_NAME
