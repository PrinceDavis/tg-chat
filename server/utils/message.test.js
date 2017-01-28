const expect = require('expect');
const {generateMessage} = require('./message');


describe('generate message', () => {
  it('should generate the current message object', () => {
    let from = 'ossaijaD';
    let text = 'Hello all';
    let result = generateMessage(from, text)
    expect(result).toInclude({from, text});
    expect(result.createAt).toBeA('number');
  })
});
