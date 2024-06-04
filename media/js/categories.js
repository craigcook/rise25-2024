/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

(function () {
    'use strict';

    var categoryToggles = document.querySelectorAll('.r25-c-category-toggle');

    for (var i = 0; i < categoryToggles.length; i++) {
        var toggle = categoryToggles[i];

        toggle.addEventListener('click', function () {
            var detail = this.parentNode.querySelector('p.r25-c-category-expand');

            detail.classList.toggle('is-open');

            if (detail.classList.contains('is-open')) {
                this.innerText = 'Close -';
                detail.focus();
            } else {
                this.innerText = 'Read more +';
            }
        });

        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (this === document.activeElement) this.click();
            }
        });
    }

})();
