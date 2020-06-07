const fs = require('fs');

const iconvLite = require('iconv-lite');

const readAndDecodeFile = (filePath) => {

    const data = fs.readFileSync(filePath, {
        encoding: 'utf-8'
    },(err, pdfData) => {
        if (!err) {
            return iconvLite.decode(data, 'base64');
        }
    });

    return data;    
}

const filePath = './text/Venezuela.txt';


const wordsArray = readAndDecodeFile(filePath)
    .split('\n')
    .map(line => {
        return line
        .split(' ');
    })
    .reduce((accumulator, current) => {
        return [
            ...accumulator,
            ...current
        ]
    })
    .map(word => {
        return word
            .replace(',', '')
            .replace('.', '')
            .replace('!', '')
            .replace('?', '')
            .toLocaleLowerCase()
            .trim();
    })
    .filter(cur => cur !== '');

console.log(wordsArray);


const wordCount = wordsArray.reduce((acummulator, current) => {

    if(acummulator[current]) {
        acummulator[current].quantity ++;
    } else {
        acummulator[current] = { quantity: 1 };
    } 

    return acummulator
}, []);

console.log(wordCount);
