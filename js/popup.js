;'use strict';

/* global chrome */

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.option').forEach(option => {
    chrome.storage.sync.get(storage => {
      option.checked = !!(storage.options && storage.options[option.getAttribute('data-id')]);
    });

    option.addEventListener('change', event => {
      const checkbox = event.target;
      const key = checkbox.getAttribute('data-id');
      chrome.storage.sync.get('options', storage => {
        storage.options[key] = checkbox.checked;
        chrome.storage.sync.set(storage);
      })
    });
  });

  document.querySelectorAll('.check-button').forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      let url = event.target.parentElement.querySelector('[target="_blank"]').getAttribute('href');
      // https://stackoverflow.com/a/24072298/4223982
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        url += '?doc=' + encodeURIComponent(tabs[0].url);
        event.target.parentElement.querySelectorAll('.option').forEach(element => {
          if (element.checked) {
            url += '&' + element.name;
          }
        });
        window.open(url);
      });
    })
  });
});
