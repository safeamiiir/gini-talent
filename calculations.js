const { fetch, RoundUp, isInWeekRange } = require('./helpers');
const { OPERATION_TYPES, USER_TYPES } = require('./constants');

// requests
const fetchCashIn = () => fetch('cash-in').then((response) => response.data);
const fetchCashOutNatural = () =>
  fetch('cash-out-natural').then((response) => response.data);
const fetchCashOutJuridical = () =>
  fetch('cash-out-juridical').then((response) => response.data);

function fetchRules() {
  return Promise.all([
    fetchCashIn(),
    fetchCashOutNatural(),
    fetchCashOutJuridical(),
  ]);
}

//calculate Commission Fees
function calculateCommissionFees(data) {
  return fetchRules().then(
    ([
      cash_in_response,
      cash_out_natural_response,
      cash_out_juridical_response,
    ]) => {
      // variable
      let withBonusList = {};
      const cash_in_percentage = cash_in_response.percents;
      const cash_in_min = cash_in_response.max.amount;
      const cash_out_natural_percentage = cash_out_natural_response.percents;
      const cash_out_natural_discharge =
        cash_out_natural_response.week_limit.amount;
      const cash_out_juridical_percentage =
        cash_out_juridical_response.percents;
      const cash_out_juridical_min = cash_out_juridical_response.min.amount;

      // calculation
      const calculated = data.map((operation) => {
        if (operation.type === OPERATION_TYPES.CASH_IN) {
          // 1- For Cash In
          return CalculateCashInCommissionFee(
            operation,
            cash_in_percentage,
            cash_in_min
          );
        } else if (operation.type === OPERATION_TYPES.CASH_OUT) {
          // 2- For Cash Out
          if (operation.user_type === USER_TYPES.NATURAL) {
            // 2/1- Natural Persons
            return CalculateCashOutNaturalCommissionFee(
              handleBonus(operation, withBonusList),
              cash_out_natural_percentage,
              cash_out_natural_discharge
            );
          } else if (operation.user_type === USER_TYPES.JURIDICAL) {
            // 2/2- Legal persons
            return CalculateCashOutJuridicalCommissionFee(
              operation,
              cash_out_juridical_percentage,
              cash_out_juridical_min
            );
          }
        }
      });
      return calculated;
    }
  );
}

function CalculateCashInCommissionFee(data, cash_in_percentage, cash_in_min) {
  const fee = data.operation.amount * cash_in_percentage * 0.01;
  return fee > cash_in_min ? RoundUp(cash_in_min, 2) : RoundUp(fee, 2);
}

function CalculateCashOutNaturalCommissionFee(
  data,
  cash_out_percentage,
  cash_out_natural_discharge
) {
  const fee =
    (data.operation.amount - (data.hasBonus ? cash_out_natural_discharge : 0)) *
    cash_out_percentage *
    0.01;
  return fee > 0 ? RoundUp(fee, 2) : RoundUp(0, 2);
}

function CalculateCashOutJuridicalCommissionFee(
  data,
  cash_out_percentage,
  cash_out_juridical_min
) {
  const fee = data.operation.amount * cash_out_percentage * 0.01;
  return cash_out_juridical_min > fee
    ? RoundUp(cash_out_juridical_min, 2)
    : RoundUp(fee, 2);
}

function handleBonus(operation, withBonusList) {
  if (
    // in the week but bonus is gained!
    withBonusList[operation.user_id] &&
    isInWeekRange(operation.date, withBonusList[operation.user_id])
  ) {
    return operation;
  } else {
    // no bonus gained
    // or new week and should reset bonus
    withBonusList[operation.user_id] = [operation.date];
    return { ...operation, hasBonus: true };
  }
}

module.exports = { calculateCommissionFees };
