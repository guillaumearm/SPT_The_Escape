#!/bin/bash
set -e

rsync -avz ./user ../..
rsync -avz ./BepInEx ../..
