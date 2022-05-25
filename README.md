# RemarkableWeb

## Approach

Given a URL, fetch the raw HTML. Then, using [Readability](https://github.com/mozilla/readability) and [JSDOM](https://github.com/jsdom/jsdom), strip out all of the webjunk. Then, using the power of CSS stylesheets and pandoc, convert the file into an ePub or PDF.

## Usage

```
node main.js run move_fast.epub https://launchdarkly.com/blog/the-fallacy-of-move-fast-and-break-things/
```
