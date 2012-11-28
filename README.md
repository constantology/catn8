# warning

This is a very early alpha release and as such I would not really recommend using catn8 until this message is no longer here.

Documentation and tests will also be available when a stable release is available.

# catn8
catn8 is a file concatenation and tool which currently also supports minification of JavaScript (using uglify-js) and CSS (using clean-css).

point catn8 at your top level projects directory and let it automatically concatenate – and minify – your source files whenever a change is made.

catn8 uses node's file watcher to listen to changes to any directory containing a `.catn8` json configuration file with instructions on how to concatenate files, where to created the concatenated file and whether or not to minify it.

# todo

- finish tests
- stability!
- documentation
- changes to .catn8 files don't trigger a build in the correct way
- add ability to execute scripts before and after concatenation – e.g. run tests, deployment, whatever...

# LICENSE

(The MIT License)

Copyright (c) 2011 christos "constantology" constandinou http://muigui.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

