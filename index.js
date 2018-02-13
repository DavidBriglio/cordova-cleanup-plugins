#!/usr/bin/env node

var methods = require("./methods.js");
var messages = require("./messages.js");
var processes = require("./process.js");
var command = process.argv[2];

if (process.argv.indexOf("--noforce") >= 0) {
    console.log(messages.helpMessage);
    return;
}

var options = {
    noForce: (process.argv.indexOf("--noforce") >= 0 || process.argv.indexOf("--nf") >= 0),
    noRemove: (process.argv.indexOf("--noremove") >= 0 || process.argv.indexOf("--nr") >= 0),
    fetch: (process.argv.indexOf("--gitfetch") >= 0 || process.argv.indexOf("--gf") >= 0),
    noAdd: (process.argv.indexOf("--noadd") >= 0 || process.argv.indexOf("--na") >= 0),
    soft: (process.argv.indexOf("--soft") >= 0 || process.argv.indexOf("--s") >= 0)
};

console.log(messages.consoleMessages.intro);

// Display which cli options were included
messages.outputOptions(options);

// Extract the config.xml content
var config = methods.loadConfig();
if (!config) {
    console.log(messages.consoleMessages.done);
    return;
}

switch (command) {
    case "clean":
        processes.fullClean(config, options);
        break;
    case "plugins":
        processes.plugins(config, options);
        break;
    case "platforms":
        processes.platforms(config, options);
        break;
    case "sync":
        processes.sync(config, options);
        break;
    default:
        console.log(messages.helpMessage);
}

console.log(messages.consoleMessages.done);