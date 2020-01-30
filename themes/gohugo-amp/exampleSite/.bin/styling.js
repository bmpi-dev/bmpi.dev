var sass = require('node-sass');
var postcss = require('postcss');
var fs = require('fs');

const inputFile = './layouts/src/styles.scss';
const outputFile = './layouts/partials/stylesheet.html';

sass.render({
    file: inputFile,
    outputStyle: 'compressed'
}, function(error, result) {
    if (error) {
        console.log(error.status);
        console.log(error.column);
        console.log(error.message);
        console.log(error.line);
    }
    else {
        let cssOutput = result.css.toString();
        postcss([ require('autoprefixer'), require('cssnano') ])
            .process(cssOutput)
            .then((result) => {
                fs.writeFile(outputFile, result.css, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log('\u2611 file '+outputFile+' updated with current styling from '+ inputFile);
                });
            });
    }
});

