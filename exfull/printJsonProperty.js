var filename = process.argv[2]
var jsonObject = require(filename);
var propName = process.argv[3];
eval('process.stdout.write(jsonObject.' + propName + ')');