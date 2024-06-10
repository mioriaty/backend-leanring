
import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { mongoDBConnection } from '~/configs/mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';


// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns';
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
});

// Chỉ ra những field không được update
const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt'];

const _validateBeforeCreate = async (data) => {
  try {
    return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const validData = await _validateBeforeCreate(data);

    const createdBoard = {
      ...validData,
      boardId: new ObjectId(validData.boardId)
    };

    return await mongoDBConnection.getDb().collection(COLUMN_COLLECTION_NAME).insertOne(createdBoard);
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const board = await mongoDBConnection.getDb().collection(COLUMN_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });

    return board;
  } catch (error) {
    throw new Error(error);
  }
};

// Push id của card vào card order ids trong collection columns
const pushCardOrderIds = async (card) => {
  try {
    const result = await mongoDBConnection.getDb().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      {
        // Tìm column theo columnId của card
        _id: new ObjectId(card.columnId)
      },
      {
        // Thêm cardId vào cuối mảng cardOrderIds
        $push: {
          cardOrderIds: new ObjectId(card._id)
        }
      },
      {
        // Trả về dữ liệu mới sau khi update, mặc định là trả về dữ liệu cũ
        returnDocument: 'after'
      }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findAll = async () => {
  try {
    const columns = await mongoDBConnection.getDb().collection(COLUMN_COLLECTION_NAME).find().toArray();

    return columns;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (columnId, data) => {
  try {

    // Xóa những field không được update
    Object.keys(data).forEach((key) => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete data[key];
      }
    });

    const updatedBoard = await mongoDBConnection.getDb().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(columnId) },
      { $set: data },
      { returnDocument: 'after' }
    );

    return updatedBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const columnsModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  findAll,
  pushCardOrderIds,
  update
};