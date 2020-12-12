var express = require('express');
var router = express.Router();

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var root_path = path.resolve('./fs');
var cur_path = ""
var cors = require('cors');

const util = require('util');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-file-infos', function(req, res, next) {
  console.log(path.join(root_path,cur_path));
  fs.readdir(path.join(root_path,cur_path), function(err,data){

    lsinfo_li = "";
    lsinfo_li += "<li class=\"dir\">" +"<div" + " onclick='mvdir(this);'>" +".."+ "</div>"
        + "</li>";

    datas = [];

    data.forEach(function(element,index){
      const stat = fs.statSync(path.join(path.join(root_path,cur_path),element));
      let type;
      let element_onclick_content;
      let delete_onclick_content;
      let size;

      if(stat.isFile()){
        size = stat["size"].toString() + " B";
        type = "file";
        element_onclick_content = "'readfile(this);'";
        delete_onclick_content = "'rmfile(this.previousSibling)'";
      }
      else if(stat.isDirectory()){
        size = "-";
        type = "dir";
        element_onclick_content = "'mvdir(this);'";
        delete_onclick_content = "'rmdir(this.previousSibling)'";
      }
      data[index] ={
        name : element,
        modificationDate : stat.mtime.getFullYear().toString()
            + "-" + (stat.mtime.getMonth()+1).toString()
            + "-" + stat.mtime.getDate().toString(),
        size : size,
        type : type
      }
    });

    res.json(data);

    console.log(lsinfo_li);

  });
});

const readFile = util.promisify(fs.readFile);

function readFileFunction(file_name) {
  return readFile(file_name);
}



router.get('/get-file-contents-infos',  function(req, res, next) {
  console.log(path.join(root_path,cur_path));
  fs.readdir(path.join(root_path,cur_path), function(err,data){



    data.reverse();
    data.forEach(async function(element,index){
      const stat = fs.statSync(path.join(path.join(root_path,cur_path),element));
      let type;
      let size;
      let file_content = "-";

      if(stat.isFile()){
        size = stat["size"].toString() + " B";
        type = "file";

        file_content = await readFileFunction(path.join(path.join(root_path,cur_path),element));
        console.log(file_content.toString());
      }
      else if(stat.isDirectory()){
        size = "-";
        type = "dir";
      }
      data[index] ={
        name : element,
        content : file_content.toString(),
        modificationDate : stat.mtime.getFullYear().toString()
            + "-" + (stat.mtime.getMonth()+1).toString()
            + "-" + stat.mtime.getDate().toString(),
        size : size,
        type : type
      }
      if(index === data.length-1){
        console.log("lkajkljsld");
        res.json(data);
      }
    });

    //res.json(data);

  });
});

router.post('/cd', function(req, res, next) {
  const {dir_name} = req.body;

  console.log(path.join(path.join(root_path,cur_path),dir_name));
  cur_path = path.join(cur_path, dir_name);
  res.send();
});

router.post('/mkdir', function(req, res, next) {
  const {new_dir_name} = req.body;

  console.log(path.join(path.join(root_path,cur_path),new_dir_name));
  fs.mkdir(path.join(path.join(root_path,cur_path),new_dir_name), function(err){
    if(err){
      console.log("mkdir err");
    }
  });
  res.send();
});

router.post('/readfile', function(req, res, next) {
  const {file_name} = req.body;

  console.log(path.join(path.join(root_path,cur_path),file_name));
  fs.readFile(path.join(path.join(root_path,cur_path),file_name),{encoding:"utf-8",flag:"r"}, function(err, data){
    if(err){
      console.log("readFile err");
      console.log(err);
    }
    else{
      res.json({file_content: data});
    }
  });
});

router.post('/editfile', function(req, res, next) {
  const {file_name,file_data} = req.body;

  console.log(path.join(path.join(root_path,cur_path),file_name));
  fs.writeFile(path.join(path.join(root_path,cur_path),file_name),file_data, function(err){
    if(err){
      console.log("writefile err");
    }
  });
  res.send();
});

router.post('/rmdir', function(req, res, next) {
  const {dir_name} = req.body;

  console.log(path.join(path.join(root_path,cur_path),dir_name));
  fs.rmdir(path.join(path.join(root_path,cur_path),dir_name), function(err){
    if(err){
      console.log("rmdir err");
      console.log(err);
    }
  });
  res.send();
});


router.post('/rmFile', function(req, res, next) {
  const {file_name} = req.body;

  console.log(path.join(path.join(root_path,cur_path),file_name));
  fs.unlink(path.join(path.join(root_path,cur_path),file_name), function(err){
    if(err){
      console.log("rmFile err");
    }
  });
  res.send();
});

router.post('/rename', function(req, res, next) {
  const {new_name,old_name} = req.body;

  console.log(path.join(path.join(root_path,cur_path),new_name));
  fs.rename(path.join(path.join(root_path,cur_path),old_name),path.join(cur_path,new_name), function(err){
    if(err){
      console.log("rename err");
    }
  });
  res.send();
});

router.post('/api/login',cors(), function(req, res, next) {
  const {id,password} = req.body;

  console.log(id,password);
  res.send();
});

router.options('/api/login', function(req, res, next) {

  console.log(req.headers);
  res.send();
});

router.get('/pwd', function(req, res, next) {

  let data = {
    cur_path : cur_path
  }
  res.json(data);
});


router.post('/stt', function(req, res, next) {


  var fs = require('fs');
  var openApiURL = 'http://aiopen.etri.re.kr:8000/WiseASR/Recognition';
  var access_key = 'da4c3be0-2a46-4113-9afa-f1fcffcaf7e2';
  var languageCode = 'korean';
  var audioFilePath = path.join(root_path,"a2002011001-e02-16kHz-[AudioTrimmer.com].wav");
  var audioData;
  console.log(audioFilePath);
  audioData = fs.readFileSync(audioFilePath);

  console.log(audioData);
  console.log(audioData.toString('base64'));

  var requestJson = {
    'access_key': access_key,
    'argument': {
      'language_code': languageCode,
      'audio': audioData.toString('base64')
    }
  };

  var request = require('request');
  var options = {
    url: openApiURL,
    body: JSON.stringify(requestJson),
    headers: {'Content-Type':'application/json; charset=UTF-8'}
  };
  request.post(options, function (error, response, body) {
    console.log('responseCode = ' + response.statusCode);
    console.log('responseBody = ' + body);
  });

  //console.log(Buffer.from(audioData.toString('base64'), 'base64').toString('utf8'));

  res.send();
});


module.exports = router;
