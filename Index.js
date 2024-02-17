'use strict'; 

const fs = require('fs'); 
const readline = require('readline'); 

const file = readline.createInterface({ 
    input: fs.createReadStream('logGame.txt'), 
    output: process.stdout, 
    terminal: false
}); 
let arr;  
let statistic = {'numberGames': 0, 'numberWins':0 };

file.on('line', (line) => { 
    
    arr = line.split('.');
    if (!arr[2]) return;

    if (arr[2].includes('Пользователь угадал')) {
        statistic['numberWins']  += 1;
        statistic['numberGames'] += 1;
    }
    if (arr[2].includes('Пользователь не угадал')) {
        statistic['numberGames'] += 1;
    }
});

file.on('close', () => {
    const wins = statistic['numberWins'] / statistic['numberGames'] * 100
    console.log(`Количество игр: ${statistic['numberGames']}.  Побед: ${Math.round(wins)}%`);
});