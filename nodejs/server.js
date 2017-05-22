var http = require("http");
var url = require("url");

function start(router,handle){
  function reSponse(request, response){
    var pathname = url.parse(request.url).pathname;
    console.log('ssss');
    // var postData = "";
    // // router(pathname,handle,response);

    // request.setEncoding('utf8');
    // request.addListener("data", function(postDataChunk) {
    //   postData += postDataChunk;
    //   console.log("Received POST data chunk '"+
    //   postDataChunk + "'.");
    // });
    // request.addListener("end", function() {
      router(pathname,handle,response,request);
    // });
  }
  http.createServer(reSponse).listen(8888);
}

exports.start = start;