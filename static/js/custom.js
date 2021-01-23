function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function set_home_page_all_views(hit) {
    document.getElementById("all-page-views").textContent = hit;
}

let allPageViewsAPI = "https://api.bmpi.dev/page-views/bmpi-dev-all-page-views/";
let singlePageViewsAPI = "https://api.bmpi.dev/page-views/bmpi.dev" + window.location.pathname;

function get_post_views(url, callback) {
    httpGetAsync(url, callback);
}

function main() {
    if (window.location.pathname === "/") {
        get_post_views(allPageViewsAPI, res => {
            set_home_page_all_views(JSON.parse(res).count);
        });
        get_post_views(singlePageViewsAPI, res => {});
    }
}

main();