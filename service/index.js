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
      let params = this.generateParams();
      params.UpdateExpression = "SET title = :t";
      params.ExpressionAttributeValues = {":t": title};
      params.ReturnValues = "UPDATED_NEW";
      const listData = await dynamoClient.update(params).promise();
      return listData.Attributes.title;
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
      let itemArray = [];
      itemArray.push(item);
      let params = this.generateParams();
      params.UpdateExpression = "SET #i = list_append(#i, :o)";
      params.ExpressionAttributeNames = {"#i": "items"};
      params.ExpressionAttributeValues = {":o": itemArray};
      const listData = await dynamoClient.update(params).promise();
      const returnedItem = await dynamoClient.get(this.generateParams()).promise();
      return returnedItem.Item.items;
    } catch (error) {
      return error;
    }
  }

  async updateItem(index, name) {
    try {
      const getParams = this.generateParams();
      const listData = await dynamoClient.get(getParams).promise();
      let itemsList = listData.Item.items;
      itemsList[index].name = name;
      const updateParams = this.generateParams();
      updateParams.UpdateExpression = "set #i = :d";
      updateParams.ExpressionAttributeNames = {"#i": "items"};
      updateParams.ExpressionAttributeValues = {":d": itemsList};
      updateParams.ReturnValues = "UPDATED_NEW";

      let response = await dynamoClient.update(updateParams).promise();
      return response;
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
