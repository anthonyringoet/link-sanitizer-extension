var extensionAPI = typeof browser !== 'undefined' ? browser : chrome;

extensionAPI.webRequest.onBeforeRequest.addListener(
    function(details) {
        let url = new URL(details.url);
        let cleaned = false;

        const unwantedParams = [
            // UTM parameters are used for Google Analytics
            'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',

            // 'fbclid' is used by Facebook for click identification
            'fbclid',

            // 'gclid' is used by Google Ads for click identification
            'gclid',

            // '_hsenc' is used by HubSpot for encoding the URL
            '_hsenc',

            // 'mc_cid' and 'mc_eid' are used by Mailchimp for campaign ID and email ID respectively
            'mc_cid', 'mc_eid',

            // 'igshid' is used by Instagram for sharing insights
            'igshid'
        ];

        unwantedParams.forEach((param) => {
            if (url.searchParams.has(param)) {
                url.searchParams.delete(param);
                cleaned = true;

                extensionAPI.storage.local.get([param], function(result) {
                    var count = result[param] ? result[param] + 1 : 1;
                    var obj = {};
                    obj[param] = count;
                    extensionAPI.storage.local.set(obj, function() {
                        console.log('Incremented count for ' + param);
                    });
                });
            }
        });

        if (cleaned) {
            extensionAPI.storage.local.get(['cleaned_urls_count'], function(result) {
                var count = result['cleaned_urls_count'] ? result['cleaned_urls_count'] + 1 : 1;
                extensionAPI.storage.local.set({cleaned_urls_count: count}, function() {
                    console.log('Incremented count for cleaned URLs');
                });
            });

            // Only redirect if a parameter was cleaned
            return { redirectUrl: url.href };
        }
    },
    { urls: ["<all_urls>"], types: ["main_frame"] },
    ["blocking"]
);
