import { Router } from "express";
import {
  getCardList,
  createCard,
  validateCardDetails,
  isCardExist,
} from "./card.controller";

const cardRoutes = Router();

cardRoutes.get("/", async (request: any, response) => {
  try {
    let page: number = parseInt(request.query.page || 1);
    let limit: number = parseInt(request.query.limit || 1);

    const cardList = await getCardList(page, limit);

    return response.status(200).send({
      data: cardList,
      count: cardList.length,
      totalPages: Math.ceil(cardList.length / limit),
      currentPage: page,
      meta: {},
    });
  } catch (error) {
    return response.status(error.status).send(error);
  }
});

cardRoutes.post("/", async (request, response) => {
  try {
    const { creditCardNumber, creditCardHolderName } = request.body;

    validateCardDetails(creditCardNumber, creditCardHolderName);
    await isCardExist(creditCardNumber, creditCardHolderName);

    await createCard(creditCardNumber, creditCardHolderName);

    return response.status(201).end();
  } catch (error) {
    return response.status(error.status).send(error);
  }
});

export default cardRoutes;
