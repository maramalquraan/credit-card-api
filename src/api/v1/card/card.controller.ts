import CardModel from "../../../models/cardModel/card.model";
import { isLuhn } from "./card.helper";
import { errorResponse } from "../../../middleware/error";

export const getCardList = async (page: number = 1, limit: number = 10) => {
  const cardList = await CardModel.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  return cardList;
};

export const createCard = async (cardNumber: string, name: string) => {
  return await CardModel.create({
    cc_number: cardNumber,
    name: name,
  });
};

export const validateCardDetails = (cardNumber: string, name: string) => {
  if (!cardNumber) {
    throw errorResponse("Card Number Is Mandatory", 422);
  }
  if (!name) {
    throw errorResponse("Card Holder Name Is Mandatory", 422);
  }

  if (!isLuhn(cardNumber)) {
    throw errorResponse("Invalid Card Number", 422);
  }
};

export const isCardExist = async (cardNumber: string, name: string) => {
  const card = await CardModel.findOne({
    cc_number: cardNumber,
    name: name,
  });
  if (card) {
    throw errorResponse("Card With Same Details Already Added", 422);
  }
};
