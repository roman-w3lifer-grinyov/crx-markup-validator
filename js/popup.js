;'use strict';

/* global chrome */

window.addEventListener('DOMContentLoaded', () => {
  const options = document.querySelectorAll('.option');
  const textareas = document.querySelectorAll('textarea');
  const checkButtons = document.querySelectorAll('.check-button');

  chrome.storage.sync.get(storage => {
    options.forEach(option => {
      const id = option.getAttribute('data-id');
      option.checked = storage.options[id];
      option.addEventListener('change', event => {
        chrome.storage.sync.get(storage => {
          storage.options[id] = event.target.checked;
          chrome.storage.sync.set(storage);
        });
      });
    });
    textareas.forEach(textarea => {
      const id = textarea.getAttribute('data-id');
      textarea.value = storage.text[id];
      textarea.addEventListener('input', event => {
        chrome.storage.sync.get(storage => {
          storage.text[id] = event.target.value;
          chrome.storage.sync.set(storage);
        });
      })
    });
  });

  checkButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      let url = event.target.parentElement.querySelector('h2 a').getAttribute('href');
      let GETParams = '';
      options.forEach(option => {
        if (option.checked) {
          GETParams += '&' + option.name;
        }
      });
      const textarea = event.target.parentElement.querySelector('textarea');
      if (event.target.parentElement.querySelector('details').hasAttribute('open') && textarea.value) {
        url += '?doc=data:text/html;charset=utf-8,' + encodeURIComponent(textarea.value) + GETParams;
        open(url);
      } else {
        // https://stackoverflow.com/a/24072298/4223982
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          url += '?doc=' + encodeURIComponent(tabs[0].url) + GETParams;
          open(url);
        });
      }
    })
  });
});
