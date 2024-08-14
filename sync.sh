#!/bin/bash
set -e

rsync -avz --update --existing ../../user .
rsync -avz --update --existing ../../BepInEx .

rsync -avz --include="package.json" --include="*/" --exclude='*' ../../user/mods ./user/
