#!/usr/bin/env node

'use strict';

const dnode = require('dnode');
const http = require('http');
const daemon = dnode.connect(45015);
//Put here your token
var token = "Tokenid";
var options;
daemon.on('remote', (rpc) => {
  rpc.status(function(err, shares) {
    shares.forEach((share) => {
      options ={
        host: 'www.site.me',
        path: '/apiNode.php?token='+token+'&node='+share.id+'&space='+share.meta.farmerState.spaceUsed+'&state='+share.state
      };
      http.request(options, function(response) {
        var str = '';
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
          str += chunk;
        });
        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
          console.log(str);
        });
      }).end();
      console.log(JSON.stringify(share, null, 4));
    });
   daemon.end();
  });
});
