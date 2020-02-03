"use strict";

const fs = require("fs");
const fetch = require("node-fetch");

(async () => {

    const baseUrl = 'https://www.bmpi.dev';
    
    // fetch the live data source
    const response = await fetch(baseUrl + "/feed/index.json");
    if (response.status !== 200) {
        throw new Error("Invalid response status: " + response.status);
    }

    const currentFeedPosts = await response.json();
    // console.log("Current feed post is ", currentFeedPosts['latest-post']);

    // read the locally built version of the data source
    const onlineFeedPosts = JSON.parse(fs.readFileSync("./public/feed/index.json", { encoding: "utf8" }));
    // console.log("Online feed post is ", onlineFeedPosts['latest-post']);

    // compare the two
    if (currentFeedPosts['latest-post']['url'] !== onlineFeedPosts['latest-post']['url']) {
        console.log("New post detected, start web push notify!");
        // start web push notify
        var request = require('request');

        var headers = {
            'webpushrKey': process.env.WEBPUSHRKEY,
            'webpushrAuthToken': process.env.WEBPUSHRAUTHTOKEN,
            'Content-Type': 'application/json'
        };

        console.log(headers);

        var postData = {
            'title': onlineFeedPosts['latest-post']['title'],
            'message': onlineFeedPosts['latest-post']['description'],
            'target_url': baseUrl + onlineFeedPosts['latest-post']['url']
        }

        var dataString = JSON.stringify(postData);

        // console.log(dataString);

        var options = {
            url: 'https://app.webpushr.com/api/v1/notification/send/all',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        function callback(error, response, body) {

            if (response.statusCode !== 200) {
                console.log(body);
            } else {
                console.log("Push new post success")
            }
        }

        await request(options, callback);

    } else {
        console.log("No New post detected!");
    }
})();