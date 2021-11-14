;'use strict';

/* global chrome */

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    options: {
      'validator-w3-org_show-image-report': true,
      'validator-w3-org_show-outline': true,
      'validator-w3-org_show-source': true,

      'validator-nu_show-image-report': true,
      'validator-nu_show-outline': true,
      'validator-nu_show-source': true,
    },
    text: {
      'validator-w3-org_text': '',
      'validator-nu_text': '',
    },
  });
});
