var aws = require('aws-sdk');

exports.handler = function(event, context) {
    var dynamodb = new aws.DynamoDB();
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "BrightcoveCallBackEvents";
    var datetime = new Date().toISOString();


    console.log("Putting item into Dynamo");
    dynamodb.putItem({ "TableName": tableName,
                   "Item": { "status": { "S": event.status },
                             "notificationDateTime": {"S": datetime },
                             "entity": { "S": event.entity },
                             "entityType": { "S": event.entityType },
                             "action": { "S": event.action },
                             "versionNumber": { "N": event.version }
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
