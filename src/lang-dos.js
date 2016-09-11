/**
 * @license
 * Copyright (C) 2009 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // Whitespace
         [PR['PR_PLAIN'], /^[\t\n\r \xA0\u2028\u2029]+/, null, '\t\n\r \xA0\u2028\u2029']
        ],
        [
         [PR['PR_KEYWORD'], /^(?:if|else|goto|for|in|do|call|exit|not|exist|errorlevel|defined|equ|neq|lss|leq|gtr|geq|prn|nul|lpt3|lpt2|lpt1|con|com4|com3|com2|com1|aux|shift|cd|dir|echo|setlocal|endlocal|set|pause|copy|append|assoc|at|attrib|break|cacls|cd|chcp|chdir|chkdsk|chkntfs|cls|cmd|color|comp|compact|convert|date|dir|diskcomp|diskcopy|doskey|erase|fs|find|findstr|format|ftype|graftabl|help|keyb|label|md|mkdir|mode|more|move|path|pause|print|popd|pushd|promt|rd|recover|rename|replace|restore|rmdir|shift|sort|start|subst|time|title|tree|type|ver|verify|vol|ping|net|ipconfig|taskkill|xcopy|ren|del)\b/i, null],
         // A line comment that starts with REM
         [PR['PR_COMMENT'], /^@?rem\b[^\r\n\u2028\u2029]*/i],
         // numeric
         [PR['PR_LITERAL'], /^\b0x[0-9a-f]+/i],
         [PR['PR_LITERAL'], /^\b-?\d+/],
         [PR['PR_LITERAL'], /^\b0[0-7]+/],
         [PR['PR_PUNCTUATION'], /^[()*+=/\-%]/]
        ]),
    ['bat', 'cmd']);
