Audible Exporter
================

Javascript to export a TSV or JSON file of your audible library.

Prerequisites
-------------

1. A Chromium-based web-browser (such as Google Chrome) or any other browser
   with a developer tool suite.
2. A basic familiarity with the
   [Javascript Console](https://developer.chrome.com/docs/devtools/console/javascript/).

Usage
-----

1. Copy the code from [audible-exporter.js](dist/audible-exporter.js).
1. Open [audible.com](http://audible.com) and log into your account.
1. Open your browser developer tools. (usually ⌃⇧J or ⌃⇧C on Windows/Linux, or
   ⌘⌥J or ⌘⌥C on Mac) and navigate to the Console tab.
1. Paste the Javascript code and hit enter.
1. Your browser may warn you about pasting untrusted code into the console and
   prompt you to type `allow pasting`. If so, do as it says then paste the code again.
1. Click the Start button.
1. Do not close the browser window or navigate away from the page while the script is running!

   It will take anywhere from a few minutes to an hour or more to run. For my
   library with just over 1,000 titles, it takes about 20 minutes.
1. When it is finished a dialog will pop up where you can choose your download format.

Browser Support
---------------

Tested successfully in:

| OS                | Browser                                     |
|-------------------|---------------------------------------------|
| Windows 10        | Edge     105, 127                           |
| MacOS Sonoma 14.6 | Chrome   133.0                              |
| MacOS Sonoma 14.6 | Firefox  136                                |
| MacOS Sonoma 14.6 | Brave    1.75, 1.76 (Chromium 133.0, 134.0) |
| MacOS Sonoma 14.6 | Safari   17.6                               |

Known to be broken in:

| OS                | Browser          |
|-------------------|------------------|
| Windows 10        | Edge     100-104 |

Credits
-------

* Originally forked from [andrebradshaw/audible](https://github.com/andrebradshaw/audible)
* Fix merged from [jakubbares/audible-library-export](https://github.com/jakubbares/audible-library-export)

Meta
----

* Repo: [alissa-huskey/audible-exporter](https://github.com/alissa-huskey/audible-exporter)
* License: MIT
