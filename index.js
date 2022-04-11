const yargs = require('yargs');
const https = require('https');
const fs = require('fs');
const FormData = require('form-data');
const concat = require('concat-stream')
const axios = require('axios').default;

let argv = yargs.argv;
let method = argv.method;
let file = argv.file;
let url = `https://localhost:7097/Issue`;
const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});
if(method === "read") {
  instance.get(url)
  .then((response) => {
      console.log(response.data);
  })
  .catch(err => {
      console.log(err);
  })
} else if(method === "create") {
  if (!file) {
    console.log('Please choose file with create method.');
    process.exit();
  }
  const fd = new FormData()
  fd.append("file", fs.createReadStream(file));
  fd.pipe(concat(data => {
    instance.post(url, data, {
      headers: fd.getHeaders()
    }).then((response) => {
      console.log(response.data);
    })
    .catch(err => {
        console.log(err);
    })
  }))
} else if(method === "update") {
  if (!file) {
    console.log('Please choose file with update method.');
    process.exit();
  }
  const fd = new FormData()
  fd.append("file", fs.createReadStream(file));
  fd.pipe(concat(data => {
    instance.put(url, data, {
      headers: fd.getHeaders()
    }).then((response) => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }))
} else if(method === "delete") {
  instance.delete(url)
  .then((response) => {
      console.log(response.data);
  })
  .catch(err => {
      console.log(err);
  })
} else {
  console.log('Please use 4 method: read, create, update, delete.');
}