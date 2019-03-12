const fs = require('fs');
const path = require('path');
const faker = require('faker');
const {nameOptions, short_descOptions, typeOptions} = require('./Options.js');

const totalShoes = 10000000;
let i = 1;

const shoeStream = fs.createWriteStream('./database/utils/shoeDataTest.csv');

console.time('runtime');

function writeTenMillionShoes() {
  while (i <= totalShoes) {
    let id = i;
    let name = nameOptions[Math.floor(Math.random() * nameOptions.length)];
    let img_url = 'https://loremflickr.com/295/295/shoes?random=';
    let short_desc = short_descOptions[Math.floor(Math.random() * short_descOptions.length)];
    let long_desc = faker.lorem.sentence();
    let type = typeOptions[Math.floor(Math.random() * typeOptions.length)];
    let price = (Math.floor(Math.random() * 300) + 15).toString();
    let review_count = (Math.floor(Math.random() * 400) + 25).toString();
    let rating = (Math.floor(Math.random() * 5) + 1).toString();
    let details = faker.lorem.sentence();

    let shoeStr = id + ',' + name + ',' + img_url + ',' + short_desc + ',' + long_desc + ',' + type + ',' + price + ',' + review_count + ',' + rating + ',' + details;

    i += 1;

    if (!shoeStream.write(shoeStr + '\n')){
      return;
    }
  }
  shoeStream.end();
}

shoeStream.on('finish', () => {
  console.log('writing completed')
  console.timeEnd('runtime')
});

shoeStream.on ('drain', () => {
  writeTenMillionShoes();
});

writeTenMillionShoes();





