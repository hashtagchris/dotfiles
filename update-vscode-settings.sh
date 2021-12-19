#!/bin/sh

SELFDIR=$(cd "$(dirname "$0")"; pwd)

SETTINGS_PATH=/workspaces/github/.vscode/settings.json

git update-index --skip-worktree $SETTINGS_PATH

PETNAME="$(cat ~/.petname)"
CODESPACE_SHORT_NAME="$(echo $CODESPACE_NAME | cut -d- -f4)"

$SELFDIR/update-vscode-settings.js $SETTINGS_PATH $PETNAME $CODESPACE_SHORT_NAME