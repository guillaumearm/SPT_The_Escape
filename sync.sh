#!/bin/bash
set -e

rsync -avz --delete --update --existing ../../user .
rsync -avz --delete --update --existing ../../BepInEx .

rsync -avz --delete --include="package.json" --include="*/" --exclude='*' ../../user/mods ./user/
