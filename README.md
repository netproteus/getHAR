# getHAR
Chrome Extension to Facilitate getting HAR dump from chrome

The initial purpose of this plugin was an attempt to automate the extraction of har file from chrome devtools when driving chrome from selenium webdriver
Unfortunately this proved to be impossible because chrome dev tools can not be opened when using webdriver because of limitations in the artictecture of the remote deugging protocol

This plugin does work if you have another basis for automatically extracting har file, however this was really a proof of concept rather than anything polished.
I hope you can improve it for something useful.

Steps
* Ensure dev tools are open (the data lives within dev tools it can't be recreated for data fetched before opening it)
  * There is a chrome command line flag for opening devtool by default
* `document.dispatchEvent(new Event('getHAR'))`
* `document.getElementById('har_dump').innerHTML`

