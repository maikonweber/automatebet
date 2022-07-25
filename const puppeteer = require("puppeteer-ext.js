const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const redis = require("redis");
const axios = require('axios'); 
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379
});



class RoulleteBot {
    constructor(name, password, url) {
        this.name = name;
        this.password = password
        this.browser = null; 
    }  

    async function getBrowser() {
      
    }
}
