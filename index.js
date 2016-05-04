var aws = require('aws-sdk');

exports.handler = function(event, context) {
    var dynamodb = new aws.DynamoDB();
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "BrightcoveCallBackEvents";
    var datetime = new Date().toISOString();

    if (event.entityType == "TITLE" && event.status == "SUCCESS" && event.action == "CREATE") {
        event.status = "MAYBE_SUCCESS";
        // I know but read this (from BC) --->
        //
        //Note: a "status": "SUCCESS" indicates that processing is complete, but does not necessarily mean that it
        // was successful. To determine whether Dynamic Ingest of videos was successful, see Get Status of
        // Dynamic Ingest Requests.

        // A Dynamo event and lambda will make another call as follows
        //
        // http://docs.brightcove.com/en/video-cloud/media-management/guides/get-status-di.html
    }

    console.log("Putting item into Dynamo");
    dynamodb.putItem({ "TableName": tableName,
        "Item": { "entityStatus": { "S": event.status },
            "notificationDateTime": {"S": datetime },
            "entity": { "S": event.entity },
            "entityType": { "S": event.entityType },
            "actionType": { "S": event.action },
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
