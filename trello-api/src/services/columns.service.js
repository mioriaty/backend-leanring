import { boardsModel } from '~/models/boards.model';
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
    const insertedColumn = await columnsModel.createNew(reqBody);

    const column = await columnsModel.findOneById(insertedColumn.insertedId);

    if (column) {
      // transform data cho giống bên FE
      column.cards = [];

      // update mảng cardOrderIds trong collection boards
      await boardsModel.pushColumnOrderIds(column);
    }

    return column;
  } catch (error) {
    throw error;
  }
};

const findAll = async () => {
  try {
    const columns = await columnsModel.findAll();

    return columns;
  } catch (error) {
    throw error;
  }
};

const update = async (columnId, reqBody) => {
  try {
    // Xử lý logic đặc thù của dự án
    const updatedColumn = {
      ...reqBody,
      updatedAt: Date.now()
    };

    return await columnsModel.update(columnId, updatedColumn);
  } catch (error) {
    throw error;
  }
};

export const columnsService = {
  createNew,
  findAll,
  update
};