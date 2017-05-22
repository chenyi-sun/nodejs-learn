var exec = require("child_process").exec;
var querystring = require("querystring"), fs = require("fs");
var formidable = require("formidable");


function start(response, request){
    exec("find/", function (error, stdout, stderr) {
         var body = '<html>'+
            '<head>'+
            '<meta http-equiv="Content-Type" content="text/html; '+
            'charset=UTF-8" />'+
            '</head>'+
            '<body>'+
            '<form action="/upload" method="post" enctype="multipart/form-data">'+
            // '<textarea name="text" rows="20" cols="60"></textarea>'+
            '<input type="file" name="upload">'+
            '<input type="submit" value="Upload file" />'+
            '</form>'+'啦啦啦啦'
            '</body>'+
            '</html>';
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('<head><meta charset="utf-8"/></head>'); 
        response.write(body);
        response.end();
     });
}

function upload(response,request){
//    response.writeHead(200,{'Content-Type':'text/html'});
//    response.write('<head><meta charset="utf-8"/></head>'); 
//    response.write('response'+ querystring.parse(postData).text);
//    response.end();
    console.log("Request handle 'upload' was called");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "./tmp/test2.jpg");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });

}
function show(response,postData){
    console.log('Request handle show was called');
    fs.readFile("./tmp/test2.jpg",'binary', function(error,file){
        if(error){
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end(); 
        }
        else{
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}


exports.start = start;
exports.upload = upload;
exports.show = show;