#!/bin/bash
set -e

rsync -avz --update --existing ../../user .
rsync -avz --update --existing ../../BepInEx .
