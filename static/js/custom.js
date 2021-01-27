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

function set_home_page_site_run_days() {
    var dateStart = new Date("2019-12-17");
    var dateEnd = new Date();
    var difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
    document.getElementById("site-run-days").textContent = Math.ceil(difValue);
}

let allPageViewsAPI = "https://api.bmpi.dev/page-views/bmpi-dev-all-page-views/";
let singlePageViewsAPI = "https://api.bmpi.dev/page-views/bmpi.dev" + window.location.pathname;

function get_post_views(url, callback) {
    httpGetAsync(url, callback);
}

function main() {
    if (window.location.pathname === "/") {
        set_home_page_site_run_days();
        get_post_views(allPageViewsAPI, res => {
            set_home_page_all_views(JSON.parse(res).count);
        });
        get_post_views(singlePageViewsAPI, res => {});
    } else {
        postViews = document.getElementById("post-views");
        if (postViews != undefined) {
            get_post_views(allPageViewsAPI, res => {});
            get_post_views(singlePageViewsAPI, res => {
                postViews.textContent = JSON.parse(res).count;
            });
        } else {
            get_post_views(allPageViewsAPI, res => {});
            get_post_views(singlePageViewsAPI, res => {});
        }
    }
}

main();