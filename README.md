Audible Exporter
================

Javascript to export a TSV or JSON file of your audible library.

Prerequisites
-------------

1. A Chromium-based web-browser (such as Google Chrome), or any other browser
   with a developer tool suite.
2. A basic familiarity with the
   [Javascript Console](https://developer.chrome.com/docs/devtools/console/javascript/).

Usage
-----

1. Copy the code from [](downloadAudibleLibrary.js).
1. Open [audible.com](http://audible.com) and log into your account.
1. Open your browser developer tools. (⌃⇧J on Windows/Linux, or ⌘⌥J on Mac) and
   navigate to the Console tab.
1. Paste the Javascript code and hit enter to run.
1. Do not close the browser window or navigate away from the page while the script is running!

   It will take anywhere from a few minutes to an hour or more to run. For my
   library with just over 1,000 titles, it took about an hour.
1. When it is finished, a dialog will pop to save the exported TSV file.
1. If you prefer JSON, right click on the response in the console and select
   "Copy object" then paste it into a new `.json` file.

Credits
-------

* Originally forked from [andrebradshaw/audible](https://github.com/andrebradshaw/audible)
* Fix merged from [jakubbares/audible-library-export](https://github.com/jakubbares/audible-library-export)

Meta
----

* Repo: [alissa-huskey/audible-exporter](https://github.com/alissa-huskey/audible-exporter)
* License: MIT
