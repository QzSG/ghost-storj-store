var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var Storj = require('storj');
var options = {};
var util = require('util');
var BaseStore;
BaseStore = require('../../../core/server/storage/base');
var storj;
var bucketId;

function StorjStore(config) {
    console.dir(config)
    BaseStore.call(this);
    options.key = config.key;
    options.encryptionKey = config.encryptionKey;
    storj = new Storj(options);
    storj = Promise.promisifyAll(storj);
    bucketId = config.bucket_id;

}

util.inherits(StorjStore, BaseStore);


function getTargetName(image, targetDir) {
    var ext = path.extname(image.name);
    var name = path.basename(image.name, ext).replace(/\W/g, '_');

    return name + '-' + Date.now() + ext;
}

StorjStore.prototype.save = function (image) {
    var targetDir = this.getTargetDir();
    var targetFilename = getTargetName(image, targetDir);
    console.log("Target filename" + targetFilename);
    return new Promise(function (resolve, reject) {
        var createFile = storj.createFile(bucketId, targetFilename, fs.createReadStream(image.path));
        createFile.on('done', (file) => {
            console.dir(file);
            var fileId = file.id;
            var storjUrl = `/content/images/storj//${fileId}//${targetFilename}`;
            console.log(storjUrl);
            resolve(storjUrl);
        });
        createFile.on('error', (err) => {
            console.dir(err);
            reject(err);
        });
    });
};

StorjStore.prototype.serve = function () {
    return function (req, res) {
        console.log('given path : ' + req.path);
        var fileId = req.path.split('//')[1];
        console.log('replaced fileId : ' + fileId);
        var fullPath = req.path.split('//')[2];
        console.log('image path : ' + fullPath);

        var stream = storj.download(bucketId, fileId);
        stream.pipe(res)
            .on('end', function () {
                console.log('RES END');
                res.end();

            })
            .on('error', function (err) {
                console.log('RES ERROR');
            });
    };

};

StorjStore.prototype.exists = function (filename) {
    return new Promise(function (resolve) {
        // TODO: check file status                                            
        resolve(true);
    });
};

StorjStore.prototype.delete = function (fileName, targetDir) {
    // TODO: delete image by url                                            
    return new Promise(function (resolve) {
        resolve(false);
    });
};

module.exports = StorjStore;