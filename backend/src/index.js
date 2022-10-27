// Node.js에서 esm으로 ES 모듈 import/export 문법 사용하기
// 이 파일에서만 no-global-assign ESLint 옵션을 비활성화합니다.
/* eslint-disable no-global-assign */

require = require('esm')(module /*, options*/);
module.exports = require('./main.js');
