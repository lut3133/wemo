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

var multer           = require ( 'multer' );
var processMultipart = multer ( { storage : multer.memoryStorage () } );

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
      let size;

      if(stat.isFile()){
        size = stat["size"].toString() + " B";
        let chunks = element.split(".");
        if(chunks.length >=2){
          if(chunks[chunks.length-1]==="txt"){
            type = "text";
          }
          else if(chunks[chunks.length-1]==="webm" ){
            type = "audio";
          }
        }
      }
      else if(stat.isDirectory()){
        size = "-";
        type = "dir";
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
        let chunks = element.split(".");
        if(chunks.length >=2){
          if(chunks[chunks.length-1]==="txt"){
            type = "text";
          }
          else if(chunks[chunks.length-1]==="webm" ){
            file_content = "";
            type = "audio";
          }
          else{
            file_content = "-";
            type = "dir";
          }
        }

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
  fs.rename(path.join(path.join(root_path,cur_path),old_name),path.join(path.join(root_path,cur_path),new_name), function(err){
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


router.post('/saveAudioFile', processMultipart.single( "blob" ),function(req, res, next) {

  fs.writeFileSync(path.join(path.join(root_path,cur_path),req.file.originalname), req.file.buffer);
  res.send();
});


module.exports = router;
