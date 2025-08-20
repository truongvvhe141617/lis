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
const promise1 = new Promise((resolve, reject) => {
  httpGetAsync("https://picsum.photos/200/300", resolve);
});

const promise2 = new Promise((resolve, reject) => {
  httpGetAsync("https://picsum.photos/200/300", resolve);
});

const promise3 = new Promise((resolve, reject) => {
  httpGetAsync("https://picsum.photos/200/300", resolve);
});

const int = async () => {
    try
    {
        const res1 = await promise1;
        document.getElementById("img_1").setAttribute("src", res1.responseURL);
        const res2 = await promise2;
        document.getElementById("img_2").setAttribute("src", res2.responseURL);
        const res3 = await promise3;
        document.getElementById("img_3").setAttribute("src", res3.responseURL);
        console.log(res1.responseURL);
        console.log(res2.responseURL);
        console.log(res3.responseURL);
    } catch (error) {        
    }
}

int();