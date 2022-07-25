#!/usr/bin/env node

// Imports

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Paths

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const scaffoldPath = path.resolve(_dirname, "../scaffold");
const workingPath = process.cwd();
let outputPath = path.resolve(workingPath, "styles");

// Regex

const createOutputFlagRegex = /^-o$|^--output$|^--output=(?<output>.*)$/u;

// Functions

function error(...messages) {
    console.error(...messages);
    process.exit();
}

function help(err = false) {
    const text = `Usage:

    ${path.basename(_filename)} <command> [OPTION...]

  Commands:

    create             Create the scaffolding for a new project

  Options:

    -o, --output=PATH  Set the output directory for the scaffold creation,
                       PATH is relative to the current working directory.

    -h, --help         Print this help text
  `;

    if (err) {
        console.error(text);
    } else {
        console.log(text);
    }
}

function copyDir(src, dest) {
    if (!fs.existsSync(src)) {
        error(`Src dir "${src}" doesn't exist`);
    }

    if (fs.lstatSync(src).isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const child of fs.readdirSync(src)) {
            copyDir(path.resolve(src, child), path.resolve(dest, child));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Commands and flags

const commands = {
    create(args) {
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];

            const match = arg.match(createOutputFlagRegex);
            if (match !== null) {
                if (match.groups.output?.length < 1) {
                    error("No value given to --output flag. Exiting...");
                } else if (match.groups.output?.length > 0) {
                    outputPath = path.resolve(workingPath, match.groups.output);
                } else {
                    // If we've hit this branch, we need to check the next value.
                    i++;

                    if (i + 1 > args.length || args[i].startsWith("-")) {
                        error("No value given to --output flag. Exiting...");
                    }

                    outputPath = path.resolve(workingPath, args[i]);
                }
            }
        }

        copyDir(scaffoldPath, outputPath);
    },
};

const flags = {};

// Main program

const args = process.argv.slice(2);

if (args.includes("-h") || args.includes("--help")) {
    help();
    process.exit();
}

for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith("-") && flags.hasOwnProperty(arg)) {
        flags[arg]();
    } else if (commands.hasOwnProperty(arg)) {
        commands[arg](args.slice(i + 1));
        process.exit();
    }
}

// If we haven't executed any commands print the help message to STDERR and exit

help(true);
process.exit(1);
