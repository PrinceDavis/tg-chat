const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');


describe('generate message', () => {
  it('should generate the current message object', () => {
    let from = 'ossaijaD';
    let text = 'Hello all';
    let result = generateMessage(from, text)
    expect(result).toInclude({from, text});
    expect(result.createAt).toBeA('number');
  })
});

describe('generate location message', () => {
  it('it should generate correct location object', () => {
    let from = 'ossaijaD';
    let coords = {latitude: 1, longitude: 2}
    let message = generateLocationMessage(from, coords);
    expect(message).toInclude({from});
    expect(message.url).toBe('https://www.google.com/maps?q=1,2');
    expect(message.createAt).toBeA('number');
  });
});
