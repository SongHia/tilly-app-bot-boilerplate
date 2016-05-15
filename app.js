//API
var tilURL = "add here";
var giphyKey = "&api_key=dc6zaTOxFJmzC"; //Giphy
var alchemyKey = "add here";
var TwilioSID = "add here";
var TwilioToken = "add here";
var toNumber = "add here";
var fromNumber = "add here";

//objects
var tilRecord; //for TIL API object
var alchemyResponse;
var keywords; //for Alchemy Keywords objects
var giphyRecord; //for Giphy search object

//global variables
var tilText; //for keyword extratcted gif search
var searchTerm;
var resultsArray;
var payload;
var imageURL;
var readableDate;
var p1 = "What do you want to remember about today?";
var p2 = "What was the best part of today?";
var p3 = "What is something new that you noticed today?";
var p4 = "What did you learn today?";
var promptArray = [p1,p2,p3,p4];


//npm
var twilio = require('twilio');
var client = twilio(TwilioSID, TwilioToken);
var cronJob = require('cron').CronJob;
var request = require('request');
var http = require('http');
http.post = require('http-post');

//cron formats http://www.nncron.ru/help/EN/working/cron-format.htm
//11:10pm reminder to add TIL // 10 23 * * * 
var textPrompt = new cronJob('10 23 * * * ', function() {  
    var message = promptArray[Math.floor(Math.random() * promptArray.length)];

    client.sendMessage({
            to: toNumber,
            from: fromNumber,
            body: message
        },
        function(err, data) {});
},  null, true);


// 8:10am reminder to remember past record // 10 8 * * *  / */20 * * * * * every 20
var textMemory = new cronJob('10 8 * * *', function() {
    getTILJSON();  
},  null, true);

function getTILJSON() {
    request({
        url: tilURL,
        json: true
    }, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            tilRecord = body.record;
            loadEntry(tilRecord);
        }
    })
}

function loadEntry(tilRecord) {
    var i = tilRecord[Math.floor(Math.random() * tilRecord.length)]; //get random entry
    var date = new Date(i.dateAdded); //convert entry date into a date object
    readableDate = date.toDateString();
    payload = i.til;

    // searchGiphy(); //path for using trending gifs instead of alchemy
    tilText = i.til; //Alchemy input text
    getKeywords(tilText);
}

//https://www.npmjs.com/package/request#examples
function getKeywords(tilText) {
    var keywordsArray = []; //for randomizing, declaring this as an array is important
    alchemyURL = 'http://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords';
    var data = {
        text: tilText,
        apikey: alchemyKey,
        outputMode: 'json'
    }
    http.post(alchemyURL, data, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(response) {
            alchemyResponse = JSON.parse(response); // turns into JSON
            keywords = alchemyResponse.keywords; //gets keywords
            for (var i = 0; i < keywords.length; i++) {
                // console.log(keywords[i].text);
                keywordsArray.push(keywords[i].text);
            }
            // console.log("keywords array: " + keywordsArray);
            var j = keywordsArray[Math.floor(Math.random() * keywordsArray.length)];
            searchTerm = j;
            searchGiphy(searchTerm);
        });
    });
}

function searchGiphy(searchTerm) {
    var api = "https://api.giphy.com";
    var searchGif = "/v1/gifs/search?";
    var query = "&q=";

    request({
        url: api + searchGif + query + searchTerm + giphyKey,
        // url: api + trendingGif + giphyKey, // trending gif
        json: true
    }, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            giphyRecord = body.data;
            var i = giphyRecord[Math.floor(Math.random() * giphyRecord.length)]; //random giphy from results
            imageURL = i.images.downsized.url;
            console.log("image url: " + imageURL);
            sendMemory(imageURL);
        }
    })
}

function sendMemory(imageURL) {
    client.sendMessage({
            to: toNumber,
            from: fromNumber,
            body: 'Good morning! Do you remember ' + readableDate + "? " + payload,
            mediaUrl: imageURL
        },
        function(err, data) {});
}
