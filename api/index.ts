import * as aws from "@pulumi/aws";
import * as AWS from "aws-sdk";
import * as awsx from "@pulumi/awsx";

const hits = new aws.dynamodb.Table("bmpi-dev", {
    attributes: [{ name: "Site", type: "S" }],
    hashKey: "Site",
    billingMode: "PAY_PER_REQUEST",
});

const site = new awsx.apigateway.API("api-bmpi-dev-views", {
    routes: [{
        path: "/",
        method: "GET",
        eventHandler: async () => {
            const dc = new AWS.DynamoDB.DocumentClient();
            const result = await dc.update({
                TableName: hits.name.get(),
                Key: { "Site": "ACMECorp" },
                UpdateExpression: "SET Hits = if_not_exists(Hits, :zero) + :incr",
                ExpressionAttributeValues: { ":zero": 0, ":incr": 1 },
                ReturnValues:"UPDATED_NEW",
            }).promise();
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/html" },
                body: `<h1>Welcome to ACMECorp!</h1><p>${result.Attributes!.Hits} hits.</p>`,
            };
        },
    }],
});
export const url = site.url;