#!/usr/bin/env node

'use strict';

const dnode = require('dnode');
const http = require('http');
const daemon = dnode.connect(45015);
//Put here your token
var token = "Tokenid";//it depends on how you want to receive the data
var options;
daemon.on('remote', (rpc) => {
  rpc.status(function(err, shares) {
    shares.forEach((share) => {
      options ={
        host: 'www.site.me',
        path: '/apiNode.php?token='+token+'&node='+share.id+'&space='+share.meta.farmerState.spaceUsed+'&state='+share.state
      };
      /* Uncomment if you want to send requests
      
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
      
      */
      
      //Check here fot the complete share object https://pastebin.com/ppepiuiY , This is an example output of object share
      console.log(share.id+'\n'+JSON.stringify(share.meta, null, 4));// share.id for node id
    });
   daemon.end();
  });
});
