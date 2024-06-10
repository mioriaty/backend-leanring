import { cardsModel } from '~/models/cards.model';
import { columnsModel } from '~/models/columns.model';

/**
 * @typedef {Object} ReqBody
 * @property {string} title
 * @property {string} boardId
 */
/**
 * @param {ReqBody} reqBody
 */

const createNew = async (reqBody) => {
  try {
    const insertedCard = await cardsModel.createNew(reqBody);

    const card = await cardsModel.findOneById(insertedCard.insertedId);

    if (card) {
      // update mảng cardOrderIds trong collection boards
      await columnsModel.pushCardOrderIds(card);
    }

    return card;
  } catch (error) {
    throw error;
  }
};

const findAll = async () => {
  try {
    const cards = await cardsModel.findAll();

    return cards;
  } catch (error) {
    throw error;
  }
};

export const cardsService = {
  createNew,
  findAll
};