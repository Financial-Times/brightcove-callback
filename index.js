var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "BrightcoveCallbacks";
    var datetime = new Date().getTime().toString();

    dynamodb.putItem({ "TableName": tableName,
                   "Item": { "status": { "S": event.status },
                             "notificationTimeDate": {"N": datetime },
                             "entity": { "S": event.entity },
                             "entityType": { "S": event.entityType },
                             "action": { "S": event.action },
                             "version": { "N": event.version }
                            }
                    }, function(err, data) {
                        if (err) {
                           context.fail('ERROR: Failed to record notification: ' + err);
                        } else {
                           console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
                           context.succeed('SUCCESS');
                        }
                    });
}
