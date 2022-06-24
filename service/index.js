const TableName = process.env.TABLE_NAME;
const appId = parseInt(process.env.APP_ID);
// You'll need to call dynamoClient methods to envoke CRUD operations on the DynamoDB table
const dynamoClient = require("../db");

// The apps routes will uses these service methods to interact with our DynamoDB Table
module.exports = class ListAppService {
  generateParams = () => {
    return {
      TableName,
      Key: { id: appId },
    };
  };
  
  async getListData() {
    try {
      const listData = await dynamoClient
        .get(this.generateParams())
        .promise();
      return listData.Item;
    } catch (error) {
      return error;
    }
  }

  async getTitle() {
    try {
      const listData = await dynamoClient
        .get(this.generateParams())
        .promise();
      return listData.Item.title;
    } catch (error) {
      return error;
    }
  }

  async changeTitle(title) {
    try {

    } catch (error) {
      return error;
    }
  }

  async getList() {
    try {
      const listData = await dynamoClient
        .get(this.generateParams())
        .promise();
      return listData.Item.items;
    } catch (error) {
      return error;
    }
  }

  async addToList(item) {
    try {

    } catch (error) {
      return error;
    }
  }

  async updateItem(index, name) {
    try {

    } catch (error) {
      return error;
    }
  }

  async deleteItem(index) {
    try {

    } catch (error) {
      return error;
    }
  }
};
