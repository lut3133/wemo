var express = require('express');
var router = express.Router();

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var cur_path = path.resolve('./fs');

var cors = require('cors');

const util = require('util');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-file-infos', function(req, res, next) {
  console.log(cur_path);
  fs.readdir(cur_path, function(err,data){

    lsinfo_li = "";
    lsinfo_li += "<li class=\"dir\">" +"<div" + " onclick='mvdir(this);'>" +".."+ "</div>"
        + "</li>";

    datas = [];

    data.forEach(function(element,index){
      const stat = fs.statSync(path.join(cur_path,element));
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
  console.log(cur_path);
  fs.readdir(cur_path, function(err,data){



    data.reverse();
    data.forEach(async function(element,index){
      const stat = fs.statSync(path.join(cur_path,element));
      let type;
      let size;
      let file_content = "-";

      if(stat.isFile()){
        size = stat["size"].toString() + " B";
        type = "file";

        file_content = await readFileFunction(path.join(cur_path,element));
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

  console.log(path.join(cur_path,dir_name));
  cur_path = path.join(cur_path, dir_name);
  res.send();
});

router.post('/mkdir', function(req, res, next) {
  const {new_dir_name} = req.body;

  console.log(path.join(cur_path,new_dir_name));
  fs.mkdir(path.join(cur_path,new_dir_name), function(err){
    if(err){
      console.log("mkdir err");
    }
  });
  res.send();
});

router.post('/readfile', function(req, res, next) {
  const {file_name} = req.body;

  console.log(path.join(cur_path,file_name));
  fs.readFile(path.join(cur_path,file_name),{encoding:"utf-8",flag:"r"}, function(err, data){
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

  console.log(path.join(cur_path,file_name));
  fs.writeFile(path.join(cur_path,file_name),file_data, function(err){
    if(err){
      console.log("writefile err");
    }
  });
  res.send();
});

router.post('/rmdir', function(req, res, next) {
  const {dir_name} = req.body;

  console.log(path.join(cur_path,dir_name));
  fs.rmdir(path.join(cur_path,dir_name), function(err){
    if(err){
      console.log("rmdir err");
      console.log(err);
    }
  });
  res.send();
});


router.post('/rmFile', function(req, res, next) {
  const {file_name} = req.body;

  console.log(path.join(cur_path,file_name));
  fs.unlink(path.join(cur_path,file_name), function(err){
    if(err){
      console.log("rmFile err");
    }
  });
  res.send();
});

router.post('/rename', function(req, res, next) {
  const {new_name,old_name} = req.body;

  console.log(path.join(cur_path,new_name));
  fs.rename(path.join(cur_path,old_name),path.join(cur_path,new_name), function(err){
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

module.exports = router;
