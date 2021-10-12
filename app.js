const fs = require('fs');
const calculations = require('./calculations')
const arguments = process.argv
const fileAddress = arguments[2];

fs.readFile(fileAddress, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    calculations.calculateCommissionFees(
        JSON.parse(data)).then(
            result => console.log(result.join('\n')
        )
    )
})