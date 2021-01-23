import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

// Create a mapping from 'route' to a count
const counterTable = new aws.dynamodb.Table("api-bmpi-dev", {
    attributes: [{
        name: "id",
        type: "S",
    }],
    hashKey: "id",
    readCapacity: 5,
    writeCapacity: 5,
});

// let bmpiAllPageViewsRoute = "bmpi-dev-all-page-views"; // all page views key

// Create an views API endpoint
const viewsEndpoint = new awsx.apigateway.API("bmpi-dev-post-views", {
    routes: [{
        path: "/{route+}",
        method: "GET",
        eventHandler: async (event) => {
            const route = event.pathParameters!["route"];

            console.log(`Getting count for '${route}'`);

            const client = new aws.sdk.DynamoDB.DocumentClient();

            const result = await client.update({
                TableName: counterTable.name.get(),
                Key: { id: route },
                UpdateExpression: "SET hit = if_not_exists(hit, :zero) + :incr",
                ExpressionAttributeValues: { ":zero": 0, ":incr": 1 },
                ReturnValues:"UPDATED_NEW",
            }).promise();

            let count = result.Attributes!.hit;
            
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "https://www.bmpi.dev",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                body: JSON.stringify({ route, count }),
            };
        },
    }],
});

// We have registered a domain, and a cert already (we could do most of this with Pulumi as well if we wanted!)
let domainName = "api.bmpi.dev"; // `bmpi.dev` is regitered with Route53 
let route53DomainZoneId = "Z3D746J1ZFXBYQ"; // The Hosted Zone I got when I registered `lukestestapp.net`
let certARN = "arn:aws:acm:us-east-1:745121664662:certificate/6e610430-46c8-4884-a1f7-471be45decf4"; // ACM cert for `*.bmpi.dev`

// API Gateway requires we register the Domain with it first
const domain = new aws.apigateway.DomainName("domain", {
    certificateArn: certARN,
    domainName: domainName,
});

// Then we can map a REST API to a domain with a BasePathMapping
const mapping = new aws.apigateway.BasePathMapping("mapping", {
    restApi: viewsEndpoint.restAPI,
    basePath: "page-views", // We map our API into the "/page-views" base path
    stageName: viewsEndpoint.stage.stageName, // We map the stage we got for free with `.x.API` above
    domainName: domain.domainName, // We map it into the domain we registered above
});

// Finally, we need a DNS reocrd to point at our API Gateway
const record = new aws.route53.Record("record", {
    type: "A",
    zoneId: route53DomainZoneId,
    name: domainName, // Write a record for `api.bmpi.dev` into the zone for `bmpi.dev`
    aliases: [{
        name: domain.cloudfrontDomainName, // APIGateway provides it's own CloudFront distribution we can point at...
        zoneId: domain.cloudfrontZoneId,
        evaluateTargetHealth: true,
    }],
});

// It might take a while after we deploy the record above before the DNS propagates and allows us to resolve these URLs...
export let endpoint = pulumi.interpolate`https://${record.name}/page-views`;