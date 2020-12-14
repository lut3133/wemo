var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var root_path = path.resolve('./fs');
var cur_path = ""

var multer           = require ( 'multer' );
var processMultipart = multer ( { storage : multer.memoryStorage () } );

var FileHistory = require('../models/fileHistory');
var File = require('../models/file');

const util = require('util');


router.get('/get-file-infos', function(req, res, next) {
  fs.readdir(path.join(root_path,cur_path), function(err,data){

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
            + "-" + stat.mtime.getDate().toString()
            + " " + stat.mtime.getHours()
            + ":" + stat.mtime.getMinutes()
            + ":" + stat.mtime.getSeconds(),
        size : size,
        type : type
      }
    });

    res.json(data);

  });
});

const readFile = util.promisify(fs.readFile);

function readFileFunction(file_name) {
  return readFile(file_name);
}



router.get('/get-file-contents-infos',  function(req, res, next) {
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
            + "-" + stat.mtime.getDate().toString()
            + " " + stat.mtime.getHours()
            + ":" + stat.mtime.getMinutes()
            + ":" + stat.mtime.getSeconds(),
        size : size,
        type : type
      }
      if(index === data.length-1){
        res.json(data);
      }
    });

    //res.json(data);

  });
});

router.post('/cd', function(req, res, next) {
  const {dir_name} = req.body;

  cur_path = path.join(cur_path, dir_name);
  res.send();
});

router.post('/mkdir', function(req, res, next) {
  const {new_dir_name} = req.body;

  fs.mkdir(path.join(path.join(root_path,cur_path),new_dir_name), function(err){
    if(err){
      console.log("mkdir err");
    }
  });
  res.send();
});

router.post('/readfile', function(req, res, next) {
  const {file_name} = req.body;

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

  File.findOne({path: path.join(cur_path,file_name)}).then((file)=>{
    const fileHistory = new FileHistory({
      fileId : file._id,
      date : new Date(),
      type : "update"
    })
    fileHistory.save().then(()=>{
      res.send();
    })
  }).catch(()=>{
    const stat = fs.statSync(path.join(path.join(root_path,cur_path),file_name));
    stat.mtime;
    const file = new File({
      path : path.join(cur_path,file_name),
      date : new Date(),
      type : "text"
    })

    file.save().then(()=>{
      File.findOne({ path : path.join(cur_path,file_name)}).then((file)=>{
        const fileHistory = new FileHistory({
          fileId : file._id,
          date : new Date(),
          type : "create"
        })
        fileHistory.save().then(()=>{
          res.send();
        })
      })
    })
  })
});

router.post('/rmdir', function(req, res, next) {
  const {dir_name} = req.body;

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

  fs.unlink(path.join(path.join(root_path,cur_path),file_name), function(err){
    if(err){
      console.log("rmFile err");
    }
  });
  File.findOne({path: path.join(cur_path,file_name)}).then((file)=>{
    const fileHistory = new FileHistory({
      fileId : file._id,
      date : new Date(),
      type : "delete"
    })
    fileHistory.save().then(()=>{
      res.send();
    })
  })
});

router.post('/rename', function(req, res, next) {
  const {new_name,old_name} = req.body;

  fs.rename(path.join(path.join(root_path,cur_path),old_name),path.join(path.join(root_path,cur_path),new_name), function(err){
    if(err){
      console.log("rename err");
    }
  });
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

  const stat = fs.statSync(path.join(path.join(root_path,cur_path),req.file.originalname));
  stat.mtime;
  console.log(stat.mtime);
  const file = new File({
    path : path.join(cur_path,req.file.originalname),
    date : new Date(),
    type : "audio"
  })

  file.save().then(()=>{
    File.findOne({ path : path.join(cur_path,req.file.originalname)}).then((file)=>{
      console.log(file);
      const fileHistory = new FileHistory({
        fileId : file._id,
        date : new Date(),
        type : "create"
      })
      console.log(fileHistory);
      fileHistory.save().then(()=>{
        res.send();
      })
    })
  })


});

router.get('/audioUrl/:name',function(req, res, next) {
  console.log(path.join(root_path,cur_path));
  res.download(path.join(path.join(root_path,cur_path),req.params.name));
});


var saveFile = (file_name,type) => {
  const stat = fs.statSync(path.join(path.join(root_path,cur_path),file_name));
  stat.mtime;
  const file = new File({
    path : path.join(cur_path,file_name),
    date : new Date(),
    type : type
  })
  return file;
}


var saveHistory = (file_name,type) => {
  File.findOne({ path : path.join(cur_path,file_name)}).then((file)=>{
    const fileHistory = new FileHistory({
      fileId : file._id,
      date : new Date(),
      type : type
    })
    return fileHistory;
  })

}

router.post('/file-history',function(req, res, next) {
  const {file_name} = req.body;
  File.findOne({ path : path.join(cur_path,file_name)}).then((file)=>{
    FileHistory.find({fileId : file._id}, function(err, datas){
      datas.map((data) =>{
        if(data.type === "create"){
          data.type = "생성";
        }
        else if(data.type ==="update"){
          data.type = "수정";
        }

      })
      if(err){
        res.send(err);
      }
      else{
        if(datas.length !==0){
          res.json(datas.reverse());
        }
      }
    })
  })
});

module.exports = router;
