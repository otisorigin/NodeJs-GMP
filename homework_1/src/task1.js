import { stdin, stdout } from 'process';

stdin.setEncoding('utf8');

stdin.on('readable', () => {
  let chunk;
  while ((chunk = stdin.read()) !== null) {
    stdout.write(`${chunk.split('').reverse().join('')} \n`);
  }
});

stdin.on('end', () => {
  stdout.write('end');
});