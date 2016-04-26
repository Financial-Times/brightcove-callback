var aws = require('aws-sdk');

exports.handler = function(event, context) {
    var dynamodb = new aws.DynamoDB();
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "BrightcoveCallBackJSON";
    var datetime = new Date().getTime().toString();

    console.log("Putting item into Dynamo");
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
