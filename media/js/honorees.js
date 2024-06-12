/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

var MzpModal = require('@mozilla-protocol/core/protocol/js/modal');

// create namespace
if (typeof window.Mozilla === 'undefined') {
    window.Mozilla = {};
}

(function () {
    'use strict';

    var people = document.getElementsByClassName('r25-c-person');
    var content = document.querySelector('.mzp-u-modal-content');

    for (var i = 0; i < people.length; i++) {
        var person = people[i];
        var personLink = person.querySelector('.r25-js-person');

        // Clone the person and put them in a modal
        personLink.addEventListener('click', function (e) {
            e.preventDefault();
            var modalContent = this.closest('.r25-c-person').cloneNode(true);
            modalContent.removeAttribute('id');
            modalContent.setAttribute('aria-role', 'article');

            MzpModal.createModal(e.target, content, {
                closeText: 'Close',
                onCreate: function () {
                    content.appendChild(modalContent);
                    var copyButton = modalContent.querySelector('button.copy-text');
                    copyButton.addEventListener('click', handleCopyLink);
                    modalContent.focus();
                },
                onDestroy: function () {
                    modalContent.parentNode.removeChild(modalContent);
                }
            });
        });

        // Make enter act like a click
        personLink.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (this === document.activeElement) this.click();
            }
        });
    }

    // Get the fragment identifier from URL hash
    function getHash() {
        var hash = window.location.hash;
        if (hash.indexOf('#') > -1) {
            hash = hash.split('#')[1];
        }

        return hash;
    }

    // Trigger modal on page load if hash is present and matches a person
    if (window.location.hash) {
        var hash = getHash();
        var target = document.getElementById(hash).querySelector('.r25-js-person');

        if (target) {
            target.click();
        }
    }

    var url = window.location.href;
    var timeout;

    // Generate a Tweet link
    function generateTweet(person) {
        var personId = person.id;
        var personName = person.dataset.personName;
        var tweetUrl = encodeURIComponent(
            url + '#' + personId + '?utm_campaign=rise25&utm_medium=organicsocial&utm_source=twitter&utm_content=rise25-share'
        );
        var tweetText = encodeURIComponent(
            personName + ' is one of Mozilla’s Rise25 honorees! \n\nWinners will be honored at the upcoming Rise25 awards in Dublin, Ireland. Check it out! \n\n'
        );
        return (
            'https://www.twitter.com/intent/tweet?url=' +
            tweetUrl +
            '&text=' +
            tweetText
        );
    }

    // Generate a Facebook share link
    function generateFacebookShare(person) {
        var personId = person.id;
        var personName = person.dataset.personName;
        var shareUrl = encodeURIComponent(
            url + '#' + personId + '?utm_campaign=rise25&utm_medium=organicsocial&utm_source=twitter&utm_content=rise25-share'
        );
        var shareText = encodeURIComponent(
            personName + ' is one of Mozilla’s Rise25 honorees! \n\nWinners will be honored at the upcoming Rise25 awards in Dublin, Ireland. Check it out! \n\n'
        );
        return (
            'https://facebook.com/sharer.php?u=' +
            shareUrl +
            '&quote=' +
            shareText
        );
    }

    // Copy the person's direct link to the clip board
    function handleCopyLink(e) {
        var personId = e.currentTarget.getAttribute('data-person-id');

        e.preventDefault;

        if (window.location.hash) {
            url = window.location.href.split('#')[0];
        }

        navigator.clipboard.writeText(
            url + '#' + personId
        );

        var copyText = e.currentTarget.querySelector('.social-share-copy');
        var copiedText = e.currentTarget.querySelector('.social-share-copied');

        clearTimeout(timeout);

        copiedText.style.display = 'block';
        copyText.style.display = 'none';

        timeout = setTimeout(function () {
            copiedText.style.display = 'none';
            copyText.style.display = 'block';
        }, 2000);
    }

    // Populate all the Twitter links
    (function () {
        for (var index = 0; index < people.length; index++) {
            var person = people[index];
            var twitterButton = person.querySelector('a.twitter');
            twitterButton.href = generateTweet(person);
        }
    })();

    // Populate all the Facebook links
    (function () {
        for (var index = 0; index < people.length; index++) {
            var person = people[index];
            var facebookButton = person.querySelector('a.facebook');
            facebookButton.href = generateFacebookShare(person);
        }
    })();

    // Populate all the email links
    (function () {
        for (var index = 0; index < people.length; index++) {
            var person = people[index];
            var personId = person.id;
            var personName = person.dataset.personName;
            var subject = encodeURIComponent(personName + ' is one of Mozilla’s Rise25 honorees!');
            var body = encodeURIComponent(
                personName + ' is one of Mozilla’s Rise25 honorees! \n\nWinners will be honored at the upcoming Rise25 awards in Dublin, Ireland. Check it out! \n\n' + url + '#' + personId
            );
            var emailButton = person.querySelector('a.email');
            emailButton.href = 'mailto:?subject=' + subject + '&body=' + body;
        }
    })();

    // Set up the all the copy buttons
    (function () {
        for (var index = 0; index < people.length; index++) {
            var person = people[index];
            var copyButton = person.querySelector('button.copy-text');
            copyButton.addEventListener('click', handleCopyLink);
        }
    })();

})(window.Mozilla);
