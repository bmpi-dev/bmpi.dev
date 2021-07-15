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
    console.log("Current feed post is ", currentFeedPosts['latest-post']);

    // read the locally built version of the data source
    const onlineFeedPosts = JSON.parse(fs.readFileSync("./public/feed/index.json", { encoding: "utf8" }));
    console.log("Online feed post is ", onlineFeedPosts['latest-post']);

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

        console.log(dataString);

        var options = {
            url: 'https://api.webpushr.com/v1/notification/send/all',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        function callback(error, response, body) {

            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log(error);
            }
        }

        await request(options, callback);

        // submit url to Baidu
        console.log('start submit url to Baidu');

        var headers = {
            'Content-Type': 'text/plain'
        };

        var raw = baseUrl + onlineFeedPosts['latest-post']['url'];

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("http://data.zz.baidu.com/urls?site=" + baseUrl + "&token=" + process.env.BAIDU_TOKEN, requestOptions);
        if (response.status !== 200) {
            console.error("!!error!!");
            throw new Error(response);
        }
        const r = await response.json();
        console.log("submit url success!!");
        console.log(r);
    } else {
        console.log("No New post detected!");
    }
})();