const fs = require('fs');
const {calculateCommissionFees} = require('./calculations')
const arguments = process.argv
const fileAddress = arguments[2];

fs.readFile(fileAddress, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    calculateCommissionFees(
        JSON.parse(data)).then(
            result => console.log(result.join('\n')
        )
    )
})