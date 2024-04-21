//Here by default - auto generated
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path');
module.exports = {
  //outputDir: path.resolve(__dirname, '../server/public'),   //path where the build will go when we build the project
  devServer: {
    //I believe this is basically saying for anything trying to route to /api, go to http://localhost:5000 first - reconfiguring path to find backend
    //NOTE: a proxy sits between client and internet, and intercepts requests from client before sending them out
    proxy: {           
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  }
}