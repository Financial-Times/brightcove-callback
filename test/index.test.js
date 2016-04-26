var aws = require('aws-sdk-mock');
var brightcoveCallbackLambda = require('../index.js')
const context = require('aws-lambda-mock-context');
const ctx = context();

var event = { "entity": "4857638665001",
    "action": "CREATE",
    "version": "1",
    "status": "FAILED",
    "entityType": "TITLE" }

exports.testBrightCoveStoreCallback = function(test) {
    aws.mock('DynamoDB', 'putItem', function (params, callback){
        callback(null, "successfully put item in database");
    });

    brightcoveCallbackLambda.handler(event, ctx);

    test.ok(ctx.Promise.then(), "Brightcove putItem passed OK");

    aws.restore();
    test.done();
};
