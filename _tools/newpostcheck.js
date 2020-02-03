"use strict";

const fs = require("fs");
const fetch = require("node-fetch");

(async () => {

    // fetch the live data source
    const response = await fetch("https://www.bmpi.dev/feed/index.json");
    if (response.status !== 200) {
        throw new Error("Invalid response status: " + response.status);
    }

    const currentFeedPosts = await response.json();
    console.log("Current feed post is ", currentFeedPosts.latest-post);

    // read the locally built version of the data source
    const onlineFeedPosts = JSON.parse(fs.readFileSync("./public/feed/index.json", { encoding: "utf8" }));
    console.log("Online feed post is ", onlineFeedPosts.latest-post);

    // compare the two
    if (currentFirstPost.url !== newFirstPost.url) {
        console.log("New post detected, start web push notify!");
        // start web push notify
    } else {
        console.log("No New post detected!");
    }
})();