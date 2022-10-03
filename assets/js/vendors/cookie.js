import Cookies from 'js-cookie';

window.template = window.template || {};
window.template.cookieConsent = {
    init: function () {
        'use strict';
        this.cookieBanner = document.querySelector('.js-gdpr-cookie-consent');
        this.cookieConsentOkButton = document.querySelector('.js-gdpr-cookie-consent-btn-ok');
        this.cookieConsentKoButton = document.querySelector('.js-gdpr-cookie-consent-btn-ko');
        this.displayAgain = document.querySelector('.js-gdpr-cookie-consent-display-again');
        if (this.cookieBanner) {
            this.bindActions();
            this.manageBannerDisplay();
        }
    },

    bindActions: function () {
        'use strict';
        var that = this;
        if (this.cookieConsentOkButton) {
            this.cookieConsentOkButton.addEventListener('click', function () {
                that.setCookieAcceptance(true);
            });
        }
        if (this.cookieConsentKoButton) {
            this.cookieConsentKoButton.addEventListener('click', function () {
                that.setCookieAcceptance(false);
            });
        }
        if (this.displayAgain) {
            this.displayAgain.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                that.displayBanner(true);
            });
        }
    },

    manageBannerDisplay: function () {
        'use strict';
        var value;
        value = Cookies.get('gdpr.cookie_consent.ok');
        if (value === undefined) {
            this.displayBanner(true);
        }
    },

    displayBanner: function (display) {
        'use strict';
        if (display) {
            this.cookieBanner.style.display = 'block';
        } else {
            this.cookieBanner.style.display = 'none';
        }
    },

    setCookieAcceptance: function (accepted) {
        'use strict';
        Cookies.set('gdpr.cookie_consent.ok', accepted, { path: '/', expires: 365 });
        this.displayBanner(false);
        if (accepted) {
            if (typeof window.gtag !== 'undefined') {
                window.gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'analytics_storage': 'granted'
                });
            }
        }
    },

    invoke: function () {
        'use strict';
        return {
            init: this.init.bind(this)
        };
    }
}.invoke();

document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    window.template.cookieConsent.init();
});