"use strict";

// const { password } = require("../config");
// const mongoose = require("mongoose");
// const uriUtil = require("mongodb-uri");

// const MongoClient = require("mongodb").MongoClient;
// //const ObjectID = require("mongodb").ObjectID;
// //const client = ;
// const uri = password;
// const dbName = "cluster0";
// const dbCollection = "users";

exports.list = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "this returns a list of users"
    })
  };
};

exports.get = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "this returns an individual user"
    })
  };
};

exports.add = async (event, context) => {
  return { statusCode: 200, body: "this adds a user" };
};

exports.update = async (event, context) => {
  return { statusCode: 200, body: "this updates a user" };
};

exports.remove = async (event, context) => {
  return { statusCode: 200, body: "this removes a user" };
};
