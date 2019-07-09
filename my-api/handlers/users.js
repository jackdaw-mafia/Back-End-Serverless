"use strict";

const { password } = require("../config");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
//const client = ;
const uri = password;
const dbName = "cluster0";
const dbCollection = "users";

exports.list = async (event, context) => {
  var dbClient;
  try {
    dbClient = await new MongoClient(uri, { useNewUrlParser: true });
    if (!dbClient) throw new Error("Failed to connect to the database");
    const dbUsers = dbClient.db(dbName).collection(dbCollection);

    const users = await dbUsers.find().toArray();
    dbClient.close();
    return {
      statusCode: 200,
      body: JSON.stringify(users)
    };
  } catch (err) {
    if (dbClient) dbClient.close();
    console.log(err);
    return {
      statusCode: 500,
      body: err.message
    };
  }
};

exports.get = async (event, context) => {
  var dbClient;

  if (!event || !event.pathParameters || !event.pathParameters.id) {
    return { statusCode: 404, body: "" };
  } else if (!ObjectID.isValid(event.pathParameters.id)) {
    return { statusCode: 404, body: "" };
  }

  try {
    dbClient = await MongoClient.connect(uri);
    if (!dbClient) throw new Error("Failed to connect to the database");
    const dbUsers = dbClient.db(dbName).collection(dbCollection);

    const user = await dbUsers.findOne({
      _id: ObjectID(event.pathParameters.id)
    });

    dbClient.close();
    if (!user) {
      return { statusCode: 404, body: "" };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify(user)
      };
    }
  } catch (err) {
    if (dbClient) dbClient.close();
    return {
      statusCode: 500,
      body: err.message
    };
  }
};

exports.add = async (event, context) => {
  var dbClient, body;

  if (!event || !event.body) {
    return { statusCode: 404, body: "" };
  }

  try {
    body = JSON.parse(event.body);
    dbClient = await MongoClient.connect(uri);
    if (!dbClient) throw new Error("Failed to connect to the database");
    const dbUsers = dbClient.db(dbName).collection(dbCollection);

    const result = await dbUsers.insert(body);
    dbClient.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ _id: result.insertedIds[0] })
    };
  } catch (err) {
    if (dbClient) dbClient.close();
    return {
      statusCode: 500,
      body: err.message
    };
  }
};

exports.update = async (event, context) => {
  var dbClient, body;
  if (!event || !event.pathParameters || !event.pathParameters.id) {
    return { statusCode: 404, body: "" };
  } else if (!ObjectID.isValid(event.pathParameters.id)) {
    return { statusCode: 404, body: "" };
  }

  try {
    body = JSON.parse(event.body);
    dbClient = await MongoClient.connect(uri);
    if (!dbClient) throw new Error("Failed to connect to the database");
    const dbUsers = dbClient.db(dbName).collection(dbCollection);

    const result = await dbUsers.findOneAndUpdate(
      { _id: ObjectID(event.pathParameters.id) },
      { $set: body }
    );
    dbClient.close();
    if (!result) {
      return { statusCode: 404, body: "" };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ _id: result.value._id })
      };
    }
  } catch (err) {
    if (dbClient) dbClient.close();
    return {
      statusCode: 500,
      body: err.message
    };
  }
};

exports.remove = async (event, context) => {
  var dbClient;
  if (!event || !event.pathParameters || !event.pathParameters.id) {
    return { statusCode: 404, body: "" };
  } else if (!ObjectID.isValid(event.pathParameters.id)) {
    return { statusCode: 404, body: "" };
  }

  try {
    dbClient = await MongoClient.connect(uri);
    if (!dbClient) throw new Error("Failed to connect to the database");
    const dbUsers = dbClient.db(dbName).collection(dbCollection);

    const result = await dbUsers.findOneAndDelete({
      _id: ObjectID(event.pathParameters.id)
    });
    dbClient.close();
    if (!result || !result.value) {
      return { statusCode: 404, body: "" };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ _id: result.value._id })
      };
    }
  } catch (err) {
    if (dbClient) dbClient.close();
    return {
      statusCode: 500,
      body: err.message
    };
  }
};
