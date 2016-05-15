## TODAY I LEARNED CHAT BOT
TIL.LY (Today I Learned) is an experiment in encouraging daily presence, reflection, and documentation of the everyday. Using text analysis (with <a href="http://alchemy.com">Alchemy's</a> Natural Language Processing) it resurfaces your past memories over time with animated GIFs from <a href="http://giphy.com">Giphy<a>.

This repo has the packaged code for a node.js web worker that will text a phone number with:
<ol>
<li>Prompts to add entries:</li>
<ul>
<li>What do you want to remember about today?</li>
<li>What was the best part of your day</li>
<li>What is something new that you noticed today?</li>
<li>What did you learn today?</li>
</ul>
<li>Surface memories from the past along with animated GIFs</li>
</ol>

This is a boilerplate based off <a href-"https://github.com/rickyrobinett/dailysms">Ricky Robinett's code for DailySMS with Twilio</a>. His post <a href="https://www.twilio.com/blog/2014/09/send-daily-sms-reminders-using-firebase-node-js-and-twilio.html">is here</a>.

###SET UP
1) Set up the Today I Learned Web App. [the repo](https://github.com/SongHia/tilly-app-boilerplate)

2) Download this repo (do not clone it) and unzip it. [the repo](https://github.com/SongHia/tilly-app-bot-boilerplate)

3) Update the api keys (alchemy and twilio from step 1) in app.js 

4) Update the phone numbers (add the from numnber (your twilio number from 1) and the recipient number). By default this is set up to send daily promots at 11:10pm and surface memories from the past daily at 8:10am. More on the <a href="http://www.nncron.ru/help/EN/working/cron-format.htm">cron format</a>. 

5) CD into this directory and 'npm install' to get all the required libraries.

6) Set Up Heroku App:
<ol>
<li>git init</li>
<li>git add . </li>
<li>git commit -am "init commit"</li>
<li>heroku create</li>
<li>heroku rename *your name*</li>
<li>git push heroku master</li>
<li>log into your heroku account on the web.</li>
<li>find the app and turn on worker node app.js</li>
<li>upgrade the dynamo to "hobby" (otherwise the worker will fall asleep)</li>
</ol>

7) Customize your timezone
ex: heroku config:add TZ="America/New_York"
<a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">List of tz database time zones</a>