// unit.test.js

import {
  isPhoneNumber,
  isEmail,
  isStrongPassword,
  isDate,
  isHexColor,
} from '../code-to-unit-test/unit-test-me';

// isPhoneNumber Test
describe('isPhoneNumber', () => {
  test('recognizes a valid phone number with dashes', () => {
    expect(isPhoneNumber('123-456-7890')).toBe(true);
  });

  test('recognizes a valid phone number with spaces and parentheses', () => {
    expect(isPhoneNumber('(123) 456 7890')).toBe(true);
  });

  test('rejects a phone number with too many digits', () => {
    expect(isPhoneNumber('123-456-78901')).toBe(false);
  });

  test('rejects a phone number with alphabets', () => {
    expect(isPhoneNumber('abc-def-ghij')).toBe(false);
  });
});
// isEmail Test
 describe('isEmail', () => {
  test('validates a correctly formatted email', () => {
    expect(isEmail('email@example.com')).toBe(true);
  });

  test('validates an email with subdomains', () => {
    expect(isEmail('email@sub.example.com')).toBe(true);
  });

  test('fails an email without an "@" symbol', () => {
    expect(isEmail('emailexample.com')).toBe(false);
  });

  test('fails an email without a top-level domain', () => {
    expect(isEmail('email@example')).toBe(false);
  });
});

// isStrongPassword Test
describe('isStrongPassword', () => {
  test('validates a strong password with mixed characters', () => {
    expect(isStrongPassword('Abc123')).toBe(true);
  });

  test('validates a strong password with underscores', () => {
    expect(isStrongPassword('A_bc123')).toBe(true);
  });

  test('rejects a password too short', () => {
    expect(isStrongPassword('Ab1')).toBe(false);
  });

  test('rejects a password starting with a number', () => {
    expect(isStrongPassword('1abcd')).toBe(false);
  });
});

// isDate Test
describe('isDate', () => {
  test('validates a correctly formatted date', () => {
    expect(isDate('12/31/2020')).toBe(true);
  });

  test('validates a date with one-digit day and month', () => {
    expect(isDate('1/1/2020')).toBe(true);
  });

  test('rejects a date formatted with dashes', () => {
    expect(isDate('12-31-2020')).toBe(false);
  });

  test('rejects a date with incorrect year', () => {
    expect(isDate('12/31/20')).toBe(false);
  });
});

// isHexColor Test
describe('isHexColor', () => {
  test('validates a correct 3-character hex code', () => {
    expect(isHexColor('#fff')).toBe(true);
  });

  test('validates a correct 6-character hex code', () => {
    expect(isHexColor('#ff00ff')).toBe(true);
  });

  test('rejects a hex code without the hash', () => {
    expect(isHexColor('fff')).toBe(false);
  });

  test('rejects a hex code with invalid characters', () => {
    expect(isHexColor('#gghhii')).toBe(false);
  });
});

