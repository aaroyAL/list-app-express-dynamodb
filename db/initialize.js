const TableName = process.env.TABLE_NAME;
const appId = parseInt(process.env.APP_ID);

const params = {
  TableName: TableName,
  Key: {
    id: appId
  }
};

exports.dropTable = dropTable = async (dynamoClient) => {
  await dynamoClient.delete(params).promise();
};

exports.initialize = initialize = async (dynamoClient) => {
  await dynamoClient
    .scan(params)
    .promise()
    .then((data) => {
      if (data.Items.length === 0) {
        params.Item = {
          id: appId,
          title: "List Title (click me to change!)",
          items: [],
        };
        return dynamoClient.put(params).promise();
      }
    })
    .catch((error) => {
      console.error("Error connecting to DynamoDB " + error);
    });
};
