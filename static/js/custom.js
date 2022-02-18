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

// toast
function launch_toast(text) {
    var x = document.getElementById("toast")
    x.textContent = text;
    x.className = "show";
    setTimeout(function(){ 
        x.className = x.className.replace("show", ""); 
    }, 5000);
}

// web share text
function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}

function addDatePart(html) {
    let date = new Date();
    let p = document.createElement('p');
    p.textContent = '摘录于 ' + date.toISOString().split('T')[0].replace(/-/g, '/');
    html.insertBefore(p, html.firstChild);
}

function addAuthorPart(html) {
    let div = document.createElement('div');
    div.setAttribute('style', 'padding: 5px; word-break: break-all;');
    let p1 = document.createElement('p');
    p1.textContent = '/ ' + document.title;
    p1.setAttribute('style', 'font-size: 0.8em;color: #eee;margin-bottom: 0px;padding-top: 0px;margin-top: 0px;');
    div.appendChild(p1);
    let p2 = document.createElement('p');
    p2.textContent = '/ 马大伟';
    p2.setAttribute('style', 'font-size: 0.8em;color: #eee;margin-top: -3px;margin-bottom: -3px;padding-bottom: -3px;padding-bottom: -3px;');
    div.appendChild(p2);
    let p3 = document.createElement('p');
    p3.textContent = '/ ' + window.location.href;
    p3.setAttribute('style', 'font-size: 0.8em;color: #eee;margin-top: 5px;line-height: 15px;');
    div.appendChild(p3);
    html.appendChild(div);
}

function addQRPart(html) {
    let div = document.createElement('div');
    let qr = document.createElement('img');
    qr.setAttribute('src', 'https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=' + window.location.href);
    qr.setAttribute('style', 'width: 70px; height: 70px; max-width: none !important;');
    div.appendChild(qr);
    html.appendChild(div);
}

async function html2Img(html) {
    let div = document.createElement('div');
    div.id = 'capture';
    div.setAttribute('style', 'padding: 30px 20px;background: #000;color: #f7f4cb;font-family: "LXGW WenKai";');
    div.innerHTML = html;
    addDatePart(div);
    let footer = document.createElement('div');
    footer.setAttribute('style', 'display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin-top: 20px;padding-top: -20px;padding-top: -20px;border-top-style: dashed;border-top-width: 1px;padding-top: 10px;');
    addAuthorPart(footer);
    addQRPart(footer);
    div.appendChild(footer);
    document.body.appendChild(div);
    let canvas = await html2canvas(div, {allowTaint: true, useCORS: true});
    let dataURL = canvas.toDataURL("image/png");
    const blob = dataURItoBlob(dataURL);
    const data = {
        files: [
            new File([blob], document.querySelector('.title').textContent + '.png', {
            type: blob.type,
            }),
        ],
        // title: document.title,
        // text: text,
    };
    if (navigator.canShare && navigator.canShare(data)) {
        try {
            await navigator.share(data);
            ga('gtag_UA_154678195_1.send', {
                hitType: 'event',
                eventCategory: 'bookmark',
                eventAction: 'bookmark_success',
                eventLabel: window.location.href
            });
        } catch(error) {
            console.log('Sharing failed: ', error);
            if (error.name !== 'AbortError') {
                launch_toast("失败，请多试几次，建议用 Chrome 浏览器");
            }
            ga('gtag_UA_154678195_1.send', {
                hitType: 'event',
                eventCategory: 'bookmark',
                eventAction: 'bookmark_fail',
                eventLabel: error.name
            });
        }
    } else {
        launch_toast("浏览器不支持此功能");
        console.log(`Your system doesn't support sharing files.`);
    }
    document.body.removeChild(div);
}

async function oncontroldown(event) {
    await html2Img(this.html);
	this.remove();
	document.getSelection().removeAllRanges();
	event.stopPropagation();
}

document.onpointerdown = ()=>{	
	let control = document.querySelector('#control');
	if (control !== null) {control.remove();document.getSelection().removeAllRanges();}
}

function webShare() {
    console.log('start init web share feature');

    var control = document.importNode(document.querySelector('template').content, true).childNodes[0];
    control.addEventListener('pointerdown', oncontroldown);

    let elements = [...document.querySelectorAll('.article p'), ...document.querySelectorAll('.article li'), 
                    ...document.querySelectorAll('.article code')];

    elements.forEach(i => {
        i.onpointerup = ()=>{
            if (navigator.canShare) {
                let selection = document.getSelection(), text = selection.toString();
                if (text !== "") {
                    let rect = selection.getRangeAt(0).getBoundingClientRect();
                    let articleY =  document.body.getBoundingClientRect().top;
                    control.style.top = `calc(${rect.bottom}px - ${articleY}px + 20px)`;
                    control.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) - 30px)`;
                    control['html']= getSelectionHtml(); 
                    document.body.appendChild(control);
                }
            }
        }
    });
}

if( document.readyState !== 'loading' ) {
    webShare();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        webShare();
    });
}

// remove dashboard iframe on mobile

// window.mobileCheck = function() {
//     let check = false;
//     (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
//     return check;
// };

// var dashboard = document.getElementById("dashboard_iframe");

// if (window.mobileCheck()) {
//     dashboard.remove();
//     document.getElementById("dashboard").remove();
// }

// (function() {
// 	var lazyImages = document.querySelectorAll('.article img');
//     for (var img of lazyImages) {
//         var parent = img.parentNode;
//         var wrapper = document.createElement('div');
//         wrapper.setAttribute('data-aos', "zoom-in");
//         wrapper.appendChild(img);
//         parent.appendChild(wrapper);
//         img.addEventListener('load', () =>
//             AOS.refresh()
//         );
//     }
// })();
