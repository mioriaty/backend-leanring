

import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { mongoDBConnection } from '~/configs/mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards';
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
});


const _validateBeforeCreate = async (data) => {
  try {
    return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const validData = await _validateBeforeCreate(data);

    const createdCard = {
      ...validData,
      boardId: new ObjectId(validData.boardId),
      columnId: new ObjectId(validData.columnId)
    };

    return await mongoDBConnection.getDb().collection(CARD_COLLECTION_NAME).insertOne(createdCard);
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const card = await mongoDBConnection.getDb().collection(CARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });

    return card;
  } catch (error) {
    throw new Error(error);
  }
};

const findAll = async () => {
  try {
    const cards = await mongoDBConnection.getDb().collection(CARD_COLLECTION_NAME).find().toArray();

    return cards;
  } catch (error) {
    throw new Error(error);
  }
};

export const cardsModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  findAll
};