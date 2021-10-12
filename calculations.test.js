const { calculateCommissionFees } = require('./calculations');

const mockData = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 200.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 30000, currency: 'EUR' },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000.0, currency: 'EUR' },
  },
  {
    date: '2016-02-15',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
];

describe('testing calculations helper', () => {
  test('natural cash_in', () => {
    calculateCommissionFees([mockData[0]]).then((result) =>
      expect(result).toStrictEqual(['0.06'])
    );
  });
  test('juridical cash_out', () => {
    calculateCommissionFees([mockData[1]]).then((result) =>
      expect(result).toStrictEqual(['0.90'])
    );
  });
  test('natural cash_out', () => {
    calculateCommissionFees([mockData[2]]).then((result) =>
      expect(result).toStrictEqual(['87.00'])
    );
  });
  test('two natural cash_out in a week', () => {
    calculateCommissionFees([mockData[2], mockData[3]]).then((result) => {
      expect(result).toStrictEqual(['87.00', '3.00']);
    });
  });
  test('three natural cash_out with one in a week', () => {
    calculateCommissionFees([mockData[2], mockData[3], mockData[4]]).then(
      (result) => {
        expect(result).toStrictEqual(['87.00', '3.00', '0.00']);
      }
    );
  });
});
