export const isLuhn = (cardNumber: string) => {
  cardNumber = cardNumber.toString().replace(/ /g, "");

  if (!cardNumber || /[^0-9-\s]+/.test(cardNumber)) {
    return false;
  }
  
  if (cardNumber.length > 19) {
    return false;
  }


  let sum = 0;
  let notSkip = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let current = parseInt(cardNumber[i]);

    if (notSkip) {
      if (current * 2 > 9) {
        sum += current * 2 - 9;
      } else {
        sum += current * 2;
      }
    } else {
      sum += current;
    }
    notSkip = !notSkip;
  }

  return sum % 10 == 0 ? true : false;
};
