/* Toolbox by Harmno | github.com/harmno */
/* Double-click the Toolbox logo anywhere → opens the hidden Vault (secret/index.html) */
(function () {
  'use strict';
  var brand = document.querySelector('.brand');
  if (!brand) return;

  var isToolPage = /\/tools\//.test(location.pathname);
  var vaultUrl = isToolPage ? '../../../secret/index.html' : 'secret/index.html';

  var clicks = 0;
  var timer = null;

  brand.addEventListener('click', function (e) {
    e.preventDefault();
    clicks += 1;

    if (clicks === 1) {
      var home = brand.getAttribute('href') || 'index.html';
      timer = setTimeout(function () {
        clicks = 0;
        location.href = home;
      }, 260);
      return;
    }

    // Second click within 260ms → double-click gesture → open the vault
    clearTimeout(timer);
    clicks = 0;
    location.href = vaultUrl;
  });
})();
