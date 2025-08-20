function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp);
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  };
  httpGetAsync("https://picsum.photos/200/300", (data) => {
    document.getElementById("img_1").setAttribute("src", data.responseURL);
    httpGetAsync("https://picsum.photos/200/300", (data) => {
      document.getElementById("img_2").setAttribute("src", data.responseURL);
      httpGetAsync("https://picsum.photos/200/300", (data) => {
        document.getElementById("img_3").setAttribute("src", data.responseURL);
      });
    });
  });
}
