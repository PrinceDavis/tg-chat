const expect = require('expect');
const {isRealString} = require('./validation');


describe('is real string', () => {
  it('should allow string with non-space characters', () => {
    let result = isRealString('hello');
    expect(result).toBe(true);
  });

  it('should reject non string values', function () {
    let result = isRealString(4);
    expect(result).toBe(false);
  });

  it('should reject empty string', function () {
    let result = isRealString('  ');
    expect(result).toBe(false);
  });
});
