# 💲[paysera](https://www.paysera.com/)

## 💫 Summary

This is a test for ***paysera*** company.

This project calculates the **transaction-fee calculator** for list of transactions based on some criteria.

## 🛠 How to run project?

If you have a list of transactions in a JSON file, you can run project and see the results.
(you can use `input.json` file as input)

**1.** first you should have `node.js` installed on your system.
you can check it and see its version command below:
```
node --version
```

use this [link](https://nodejs.org/en/download/) to install it on your machine.

**2.** second you should install packages, on this project it's only `axios` and `jest`.
use command below to install using `yarn`:
```
yarn
```
or using `npm`
```
npm install
```

**3.** and now run below command to calculate *transaction-fee* per each operation:
```
node app.js input.json
```
## 🧪 Run tests
you can run all the tests at once or run them individually.

use command below to run all the test:
```
yarn test
```

 If you want to test special test file you can add name of the file at the end. for example to test `helpers.js` functions you can use:
```
yarn test helpers.test.js
```

----
complete requirement and description of the task:
https://gist.github.com/PayseraGithub/ef12dabace4c00a3f450f9a9f259d3cd
