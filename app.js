const fs = require('fs');

const iconvLite = require('iconv-lite');

const readAndDecodeFile = (filePath) => {

    const data = fs.readFileSync(filePath, {
        encoding: 'utf-8'
    });

    return data;    
}

const filePath = './text/text.txt';


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
            .toLocaleLowerCase()
            .replace(new RegExp(/\s/g),"")
            .replace(new RegExp(/[àáâãäå]/g),"a")
            .replace(new RegExp(/æ/g),"ae")
            .replace(new RegExp(/ç/g),"c")
            .replace(new RegExp(/[èéêë]/g),"e")
            .replace(new RegExp(/[ìíîï]/g),"i")
            .replace(new RegExp(/ñ/g),"n")                
            .replace(new RegExp(/[òóôõö]/g),"o")
            .replace(new RegExp(/œ/g),"oe")
            .replace(new RegExp(/[ùúûü]/g),"u")
            .replace(new RegExp(/[ýÿ]/g),"y")
            .replace(new RegExp(/\W/g),"")
            .trim();
    })
    .filter(cur => cur !== '');

// console.log(wordsArray);


const wordCount = wordsArray.reduce((accumulator, current) => {

    const wordIndex = accumulator.findIndex(cur => {
        return cur.word === current
    });

    if(wordIndex !== -1) {
        accumulator[wordIndex].quantity ++;
    } else {
        accumulator.push({
            word: current,
            quantity: 1
        });
    } 

    return accumulator
}, []);

// console.log(wordCount);


const orderedWordCount = wordCount.reduce((accumulator, current) => {
    if(accumulator.length === 0) {
        accumulator.push(current);
    } else {
        const newWordIndex = accumulator.findIndex((arrayItem) => {
            return current.quantity > arrayItem.quantity;
        });

        accumulator.splice(newWordIndex, 0, current);
    }

    return accumulator;
}, []);

console.log(orderedWordCount);
