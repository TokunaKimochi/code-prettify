(function () {
    "use strict";

    var doc = document;
    var root = doc.documentElement;
    var head = doc['head'] || doc.getElementsByTagName("head")[0] || root;

    var myselfJsUri = (function () {
        // Look for the <script> node that loads this script to get its parameters.
        // This starts looking at the end instead of just considering the last
        // because deferred and async scripts run out of order.
        // If the script is loaded twice, then this will run in reverse order.
        var scripts = doc.getElementsByTagName('script');
        for (var i = scripts.length; --i >= 0;) {
            var script = scripts[i];
            var match = script.src.match(
                    /^[^?#]*\/prettify(\.min)?\.js(\?[^#]*)?(?:#.*)?$/);
            if (match) {
                return script.src;
            }
        }
        return false;
    }());

    var LOADER_BASE_URL = (function (path) {
        // Copyright (c) 2013 Kevin van Zonneveld (http://kvz.io)
        // and Contributors (http://phpjs.org/authors)

        // Permission is hereby granted, free of charge, to any person obtaining a copy of
        // this software and associated documentation files (the "Software"), to deal in
        // the Software without restriction, including without limitation the rights to
        // use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
        // of the Software, and to permit persons to whom the Software is furnished to do
        // so, subject to the following conditions:

        // The above copyright notice and this permission notice shall be included in all
        // copies or substantial portions of the Software.

        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        // SOFTWARE.
        ////  discuss at: http://phpjs.org/functions/dirname/
        //// original by: Ozh
        //// improved by: XoraX (http://www.xorax.info)
        return path.replace(/\\/g, '/')
            .replace(/\/[^\/]*\/?$/, '');
    }(myselfJsUri));

    // Given a list of URLs to stylesheets, loads the first that loads without
    // triggering an error event.
    function loadStylesheetsFallingBack(stylesheets) {
        var n = stylesheets.length;
        function load(i) {
            if (i === n) { return; }
            var link = doc.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            if (i + 1 < n) {
                // http://pieisgood.org/test/script-link-events/ indicates that many
                // versions of IE do not support onerror on <link>s, though
                // http://msdn.microsoft.com/en-us/library/ie/ms535848(v=vs.85).aspx
                // indicates that recent IEs do support error.
                link.error = link.onerror = function () { load(i + 1); };
            }
            link.href = stylesheets[i];
            head.appendChild(link);
        }
        load(0);
    }

    var skinUrls = [];

    if (/\.min\.js/.test(myselfJsUri)) {
        skinUrls[0] = LOADER_BASE_URL + '/prettify.min.css';
    }
    else if (/\.js/.test(myselfJsUri)) {
        skinUrls[0] = LOADER_BASE_URL + '/prettify.css';
    }

    loadStylesheetsFallingBack(skinUrls);
}());
