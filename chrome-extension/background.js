// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {urlMatches: 'www.smdailyjournal.com|www.nytimes.com|www.latimes.com|www.chicagotribune.com|www.thedailybeast.com|www.washingtonpost.com|www.sandiegouniontribune.com|theatlantic.com|foreignpolicy.com|theguardian.com'},
          })
		      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
  });
});

// block certain urls for wapo

chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
	    return {cancel: (details.url.indexOf("9af97774e9.js") != -1)
		        || (details.url.indexOf("head.min.js") != -1)
//                || (details.url.indexOf("get-paywall") != -1)
//		    || (details.url.indexOf("react.js") != -1)
		   } ;
        },
       {urls: ["*://www.washingtonpost.com/*"
              //  , "*://subscribe.washingtonpost.com/*"
              ]},
        ["blocking"]
);

// block certain urls for nytimes

chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
	    return {cancel: (details.url.indexOf("*") != -1)
                || (details.url.indexOf("adsbygoogle.js") != -1)
//		    || (details.url.indexOf("react.js") != -1)
		   } ;
        },
       {urls: ["*://cdn.optimizely.com/*", "*://cdn3.optimizely.com/*", "*://errors.client.optimizely.com/*",
               "*://nytimes.com/ads/*", "*://www.nytimes.com/ads/*",
               "*://www.googletagmanager.com/*"
              ]},
        ["blocking"]
);
