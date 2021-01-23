import * as aws from "@pulumi/aws";
import * as AWS from "aws-sdk";
import * as awsx from "@pulumi/awsx";

const hits = new aws.dynamodb.Table("bmpi-dev", {
    attributes: [{ name: "BMPI", type: "S" }],
    hashKey: "BMPI",
    billingMode: "PAY_PER_REQUEST",
});

const site = new awsx.apigateway.API("api-bmpi-dev-views", {
    routes: [{
        path: "/{route+}",
        method: "GET",
        eventHandler: async (event) => {
            const route = event.pathParameters!["route"];
            console.log(`Getting count for '${route}'`);
            const dc = new AWS.DynamoDB.DocumentClient();
            const result = await dc.update({
                TableName: hits.name.get(),
                Key: { id: route },
                UpdateExpression: "SET Hits = if_not_exists(Hits, :zero) + :incr",
                ExpressionAttributeValues: { ":zero": 0, ":incr": 1 },
                ReturnValues:"UPDATED_NEW",
            }).promise();
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: `{"hits":${result.Attributes!.Hits}}`,
            };
        },
    }],
});
export const url = site.url;