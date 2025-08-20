function httpGetAsync(url,resolve,reject) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange =function() {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            resolve(xmlHttp);
            xmlHttp.open("GET", url, true);
            xmlHttp.send(null);
        }
    }
}