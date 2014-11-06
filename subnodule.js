/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const fs = require('fs');
const path = require('path');

subnodule(process.argv[2], process.argv[3]);

// copies all source files from subnodule pkg to dir
function subnodule(dir, pkg) {
  let source = path.dirname(require.resolve(pkg));
  let target = process.cwd() + '/' + dir + '/';
  let files = fs.readdirSync(source);

  if (!fs.existsSync(target))
    fs.mkdirSync(target);

  files.forEach(function(f) {
    let s = source + '/' + f;
    if (fs.statSync(s).isFile())
      fs.writeFileSync(target + f, fs.readFileSync(s));
  })
}
