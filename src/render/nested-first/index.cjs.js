"use strict";
var require$$0$3 = require("events");
var fs = require("fs");
var sysPath = require("path");
var require$$0$1 = require("util");
var require$$0$2 = require("stream");
var require$$1 = require("os");
var require$$1$1 = require("fsevents");
var electron = require("electron");
var child_pross = require("child_process");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : {default: e};
}
var require$$0__default$2 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$3);
var fs__default = /* @__PURE__ */ _interopDefaultLegacy(fs);
var sysPath__default = /* @__PURE__ */ _interopDefaultLegacy(sysPath);
var require$$0__default = /* @__PURE__ */ _interopDefaultLegacy(require$$0$1);
var require$$0__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$2);
var require$$1__default = /* @__PURE__ */ _interopDefaultLegacy(require$$1);
var require$$1__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$1$1);
var child_pross__default = /* @__PURE__ */ _interopDefaultLegacy(child_pross);
function createCommonjsModule(fn) {
  var module = {exports: {}};
  return fn(module, module.exports), module.exports;
}
const WIN_SLASH = "\\\\/";
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
const DOT_LITERAL = "\\.";
const PLUS_LITERAL = "\\+";
const QMARK_LITERAL = "\\?";
const SLASH_LITERAL = "\\/";
const ONE_CHAR = "(?=.)";
const QMARK = "[^/]";
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;
const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};
const WINDOWS_CHARS = {
  ...POSIX_CHARS,
  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};
const POSIX_REGEX_SOURCE = {
  alnum: "a-zA-Z0-9",
  alpha: "a-zA-Z",
  ascii: "\\x00-\\x7F",
  blank: " \\t",
  cntrl: "\\x00-\\x1F\\x7F",
  digit: "0-9",
  graph: "\\x21-\\x7E",
  lower: "a-z",
  print: "\\x20-\\x7E ",
  punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
  space: " \\t\\r\\n\\v\\f",
  upper: "A-Z",
  word: "A-Za-z0-9_",
  xdigit: "A-Fa-f0-9"
};
var constants = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE,
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
  REPLACEMENTS: {
    "***": "*",
    "**/**": "**",
    "**/**/**": "**"
  },
  CHAR_0: 48,
  CHAR_9: 57,
  CHAR_UPPERCASE_A: 65,
  CHAR_LOWERCASE_A: 97,
  CHAR_UPPERCASE_Z: 90,
  CHAR_LOWERCASE_Z: 122,
  CHAR_LEFT_PARENTHESES: 40,
  CHAR_RIGHT_PARENTHESES: 41,
  CHAR_ASTERISK: 42,
  CHAR_AMPERSAND: 38,
  CHAR_AT: 64,
  CHAR_BACKWARD_SLASH: 92,
  CHAR_CARRIAGE_RETURN: 13,
  CHAR_CIRCUMFLEX_ACCENT: 94,
  CHAR_COLON: 58,
  CHAR_COMMA: 44,
  CHAR_DOT: 46,
  CHAR_DOUBLE_QUOTE: 34,
  CHAR_EQUAL: 61,
  CHAR_EXCLAMATION_MARK: 33,
  CHAR_FORM_FEED: 12,
  CHAR_FORWARD_SLASH: 47,
  CHAR_GRAVE_ACCENT: 96,
  CHAR_HASH: 35,
  CHAR_HYPHEN_MINUS: 45,
  CHAR_LEFT_ANGLE_BRACKET: 60,
  CHAR_LEFT_CURLY_BRACE: 123,
  CHAR_LEFT_SQUARE_BRACKET: 91,
  CHAR_LINE_FEED: 10,
  CHAR_NO_BREAK_SPACE: 160,
  CHAR_PERCENT: 37,
  CHAR_PLUS: 43,
  CHAR_QUESTION_MARK: 63,
  CHAR_RIGHT_ANGLE_BRACKET: 62,
  CHAR_RIGHT_CURLY_BRACE: 125,
  CHAR_RIGHT_SQUARE_BRACKET: 93,
  CHAR_SEMICOLON: 59,
  CHAR_SINGLE_QUOTE: 39,
  CHAR_SPACE: 32,
  CHAR_TAB: 9,
  CHAR_UNDERSCORE: 95,
  CHAR_VERTICAL_LINE: 124,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
  SEP: sysPath__default["default"].sep,
  extglobChars(chars2) {
    return {
      "!": {type: "negate", open: "(?:(?!(?:", close: `))${chars2.STAR})`},
      "?": {type: "qmark", open: "(?:", close: ")?"},
      "+": {type: "plus", open: "(?:", close: ")+"},
      "*": {type: "star", open: "(?:", close: ")*"},
      "@": {type: "at", open: "(?:", close: ")"}
    };
  },
  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};
var utils = createCommonjsModule(function(module, exports) {
  const win32 = process.platform === "win32";
  const {
    REGEX_BACKSLASH,
    REGEX_REMOVE_BACKSLASH,
    REGEX_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_GLOBAL
  } = constants;
  exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
  exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
  exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
  exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
  exports.removeBackslashes = (str) => {
    return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
      return match === "\\" ? "" : match;
    });
  };
  exports.supportsLookbehinds = () => {
    const segs = process.version.slice(1).split(".").map(Number);
    if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
      return true;
    }
    return false;
  };
  exports.isWindows = (options) => {
    if (options && typeof options.windows === "boolean") {
      return options.windows;
    }
    return win32 === true || sysPath__default["default"].sep === "\\";
  };
  exports.escapeLast = (input, char, lastIdx) => {
    const idx = input.lastIndexOf(char, lastIdx);
    if (idx === -1)
      return input;
    if (input[idx - 1] === "\\")
      return exports.escapeLast(input, char, idx - 1);
    return `${input.slice(0, idx)}\\${input.slice(idx)}`;
  };
  exports.removePrefix = (input, state = {}) => {
    let output = input;
    if (output.startsWith("./")) {
      output = output.slice(2);
      state.prefix = "./";
    }
    return output;
  };
  exports.wrapOutput = (input, state = {}, options = {}) => {
    const prepend = options.contains ? "" : "^";
    const append2 = options.contains ? "" : "$";
    let output = `${prepend}(?:${input})${append2}`;
    if (state.negated === true) {
      output = `(?:^(?!${output}).*$)`;
    }
    return output;
  };
});
const {
  CHAR_ASTERISK,
  CHAR_AT,
  CHAR_BACKWARD_SLASH,
  CHAR_COMMA,
  CHAR_DOT,
  CHAR_EXCLAMATION_MARK,
  CHAR_FORWARD_SLASH,
  CHAR_LEFT_CURLY_BRACE,
  CHAR_LEFT_PARENTHESES,
  CHAR_LEFT_SQUARE_BRACKET,
  CHAR_PLUS,
  CHAR_QUESTION_MARK,
  CHAR_RIGHT_CURLY_BRACE,
  CHAR_RIGHT_PARENTHESES,
  CHAR_RIGHT_SQUARE_BRACKET
} = constants;
const isPathSeparator = (code) => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};
const depth = (token) => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};
const scan = (input, options) => {
  const opts = options || {};
  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];
  let str = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob2 = false;
  let isExtglob2 = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let finished = false;
  let braces2 = 0;
  let prev;
  let code;
  let token = {value: "", depth: 0, isGlob: false};
  const eos = () => index >= length;
  const peek = () => str.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str.charCodeAt(++index);
  };
  while (index < length) {
    code = advance();
    let next;
    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();
      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }
    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces2++;
      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }
        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces2++;
          continue;
        }
        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob2 = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (braceEscaped !== true && code === CHAR_COMMA) {
          isBrace = token.isBrace = true;
          isGlob2 = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces2--;
          if (braces2 === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = {value: "", depth: 0, isGlob: false};
      if (finished === true)
        continue;
      if (prev === CHAR_DOT && index === start + 1) {
        start += 2;
        continue;
      }
      lastIndex = index + 1;
      continue;
    }
    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob2 = token.isGlob = true;
        isExtglob2 = token.isExtglob = true;
        finished = true;
        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }
            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob2 = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }
    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK)
        isGlobstar = token.isGlobstar = true;
      isGlob2 = token.isGlob = true;
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_QUESTION_MARK) {
      isGlob2 = token.isGlob = true;
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }
        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isBracket = token.isBracket = true;
          isGlob2 = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
    }
    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }
    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob2 = token.isGlob = true;
      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }
          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }
    if (isGlob2 === true) {
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
  }
  if (opts.noext === true) {
    isExtglob2 = false;
    isGlob2 = false;
  }
  let base = str;
  let prefix = "";
  let glob = "";
  if (start > 0) {
    prefix = str.slice(0, start);
    str = str.slice(start);
    lastIndex -= start;
  }
  if (base && isGlob2 === true && lastIndex > 0) {
    base = str.slice(0, lastIndex);
    glob = str.slice(lastIndex);
  } else if (isGlob2 === true) {
    base = "";
    glob = str;
  } else {
    base = str;
  }
  if (base && base !== "" && base !== "/" && base !== str) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }
  if (opts.unescape === true) {
    if (glob)
      glob = utils.removeBackslashes(glob);
    if (base && backslashes === true) {
      base = utils.removeBackslashes(base);
    }
  }
  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob: isGlob2,
    isExtglob: isExtglob2,
    isGlobstar,
    negated
  };
  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }
  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;
    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== "") {
        parts.push(value);
      }
      prevIndex = i;
    }
    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);
      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }
    state.slashes = slashes;
    state.parts = parts;
  }
  return state;
};
var scan_1 = scan;
const {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants;
const expandRange = (args, options) => {
  if (typeof options.expandRange === "function") {
    return options.expandRange(...args, options);
  }
  args.sort();
  const value = `[${args.join("-")}]`;
  try {
    new RegExp(value);
  } catch (ex) {
    return args.map((v) => utils.escapeRegex(v)).join("..");
  }
  return value;
};
const syntaxError = (type, char) => {
  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};
const parse = (input, options) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected a string");
  }
  input = REPLACEMENTS[input] || input;
  const opts = {...options};
  const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }
  const bos = {type: "bos", value: "", output: opts.prepend || ""};
  const tokens = [bos];
  const capture = opts.capture ? "" : "?:";
  const win32 = utils.isWindows(options);
  const PLATFORM_CHARS = constants.globChars(win32);
  const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
  const {
    DOT_LITERAL: DOT_LITERAL2,
    PLUS_LITERAL: PLUS_LITERAL2,
    SLASH_LITERAL: SLASH_LITERAL2,
    ONE_CHAR: ONE_CHAR2,
    DOTS_SLASH: DOTS_SLASH2,
    NO_DOT: NO_DOT2,
    NO_DOT_SLASH: NO_DOT_SLASH2,
    NO_DOTS_SLASH: NO_DOTS_SLASH2,
    QMARK: QMARK2,
    QMARK_NO_DOT: QMARK_NO_DOT2,
    STAR: STAR2,
    START_ANCHOR: START_ANCHOR2
  } = PLATFORM_CHARS;
  const globstar = (opts2) => {
    return `(${capture}(?:(?!${START_ANCHOR2}${opts2.dot ? DOTS_SLASH2 : DOT_LITERAL2}).)*?)`;
  };
  const nodot = opts.dot ? "" : NO_DOT2;
  const qmarkNoDot = opts.dot ? QMARK2 : QMARK_NO_DOT2;
  let star = opts.bash === true ? globstar(opts) : STAR2;
  if (opts.capture) {
    star = `(${star})`;
  }
  if (typeof opts.noext === "boolean") {
    opts.noextglob = opts.noext;
  }
  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: "",
    output: "",
    prefix: "",
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };
  input = utils.removePrefix(input, state);
  len = input.length;
  const extglobs = [];
  const braces2 = [];
  const stack = [];
  let prev = bos;
  let value;
  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index];
  const remaining = () => input.slice(state.index + 1);
  const consume = (value2 = "", num = 0) => {
    state.consumed += value2;
    state.index += num;
  };
  const append2 = (token) => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };
  const negate = () => {
    let count = 1;
    while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
      advance();
      state.start++;
      count++;
    }
    if (count % 2 === 0) {
      return false;
    }
    state.negated = true;
    state.start++;
    return true;
  };
  const increment = (type) => {
    state[type]++;
    stack.push(type);
  };
  const decrement = (type) => {
    state[type]--;
    stack.pop();
  };
  const push = (tok) => {
    if (prev.type === "globstar") {
      const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
      const isExtglob2 = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
      if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob2) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = "star";
        prev.value = "*";
        prev.output = star;
        state.output += prev.output;
      }
    }
    if (extglobs.length && tok.type !== "paren" && !EXTGLOB_CHARS[tok.value]) {
      extglobs[extglobs.length - 1].inner += tok.value;
    }
    if (tok.value || tok.output)
      append2(tok);
    if (prev && prev.type === "text" && tok.type === "text") {
      prev.value += tok.value;
      prev.output = (prev.output || "") + tok.value;
      return;
    }
    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };
  const extglobOpen = (type, value2) => {
    const token = {...EXTGLOB_CHARS[value2], conditions: 1, inner: ""};
    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? "(" : "") + token.open;
    increment("parens");
    push({type, value: value2, output: state.output ? "" : ONE_CHAR2});
    push({type: "paren", extglob: true, value: advance(), output});
    extglobs.push(token);
  };
  const extglobClose = (token) => {
    let output = token.close + (opts.capture ? ")" : "");
    if (token.type === "negate") {
      let extglobStar = star;
      if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
        extglobStar = globstar(opts);
      }
      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }
      if (token.prev.type === "bos" && eos()) {
        state.negatedExtglob = true;
      }
    }
    push({type: "paren", extglob: true, value, output});
    decrement("parens");
  };
  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;
    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars2, first, rest, index) => {
      if (first === "\\") {
        backslashes = true;
        return m;
      }
      if (first === "?") {
        if (esc) {
          return esc + first + (rest ? QMARK2.repeat(rest.length) : "");
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK2.repeat(rest.length) : "");
        }
        return QMARK2.repeat(chars2.length);
      }
      if (first === ".") {
        return DOT_LITERAL2.repeat(chars2.length);
      }
      if (first === "*") {
        if (esc) {
          return esc + first + (rest ? star : "");
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });
    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, "");
      } else {
        output = output.replace(/\\+/g, (m) => {
          return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
        });
      }
    }
    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }
    state.output = utils.wrapOutput(output, state, options);
    return state;
  }
  while (!eos()) {
    value = advance();
    if (value === "\0") {
      continue;
    }
    if (value === "\\") {
      const next = peek();
      if (next === "/" && opts.bash !== true) {
        continue;
      }
      if (next === "." || next === ";") {
        continue;
      }
      if (!next) {
        value += "\\";
        push({type: "text", value});
        continue;
      }
      const match = /^\\+/.exec(remaining());
      let slashes = 0;
      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += "\\";
        }
      }
      if (opts.unescape === true) {
        value = advance() || "";
      } else {
        value += advance() || "";
      }
      if (state.brackets === 0) {
        push({type: "text", value});
        continue;
      }
    }
    if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
      if (opts.posix !== false && value === ":") {
        const inner = prev.value.slice(1);
        if (inner.includes("[")) {
          prev.posix = true;
          if (inner.includes(":")) {
            const idx = prev.value.lastIndexOf("[");
            const pre = prev.value.slice(0, idx);
            const rest2 = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE$1[rest2];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();
              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR2;
              }
              continue;
            }
          }
        }
      }
      if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
        value = `\\${value}`;
      }
      if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
        value = `\\${value}`;
      }
      if (opts.posix === true && value === "!" && prev.value === "[") {
        value = "^";
      }
      prev.value += value;
      append2({value});
      continue;
    }
    if (state.quotes === 1 && value !== '"') {
      value = utils.escapeRegex(value);
      prev.value += value;
      append2({value});
      continue;
    }
    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({type: "text", value});
      }
      continue;
    }
    if (value === "(") {
      increment("parens");
      push({type: "paren", value});
      continue;
    }
    if (value === ")") {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError("opening", "("));
      }
      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }
      push({type: "paren", value, output: state.parens ? ")" : "\\)"});
      decrement("parens");
      continue;
    }
    if (value === "[") {
      if (opts.nobracket === true || !remaining().includes("]")) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("closing", "]"));
        }
        value = `\\${value}`;
      } else {
        increment("brackets");
      }
      push({type: "bracket", value});
      continue;
    }
    if (value === "]") {
      if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
        push({type: "text", value, output: `\\${value}`});
        continue;
      }
      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("opening", "["));
        }
        push({type: "text", value, output: `\\${value}`});
        continue;
      }
      decrement("brackets");
      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
        value = `/${value}`;
      }
      prev.value += value;
      append2({value});
      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
        continue;
      }
      const escaped2 = utils.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);
      if (opts.literalBrackets === true) {
        state.output += escaped2;
        prev.value = escaped2;
        continue;
      }
      prev.value = `(${capture}${escaped2}|${prev.value})`;
      state.output += prev.value;
      continue;
    }
    if (value === "{" && opts.nobrace !== true) {
      increment("braces");
      const open2 = {
        type: "brace",
        value,
        output: "(",
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };
      braces2.push(open2);
      push(open2);
      continue;
    }
    if (value === "}") {
      const brace = braces2[braces2.length - 1];
      if (opts.nobrace === true || !brace) {
        push({type: "text", value, output: value});
        continue;
      }
      let output = ")";
      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];
        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === "brace") {
            break;
          }
          if (arr[i].type !== "dots") {
            range.unshift(arr[i].value);
          }
        }
        output = expandRange(range, opts);
        state.backtrack = true;
      }
      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = "\\{";
        value = output = "\\}";
        state.output = out;
        for (const t of toks) {
          state.output += t.output || t.value;
        }
      }
      push({type: "brace", value, output});
      decrement("braces");
      braces2.pop();
      continue;
    }
    if (value === "|") {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({type: "text", value});
      continue;
    }
    if (value === ",") {
      let output = value;
      const brace = braces2[braces2.length - 1];
      if (brace && stack[stack.length - 1] === "braces") {
        brace.comma = true;
        output = "|";
      }
      push({type: "comma", value, output});
      continue;
    }
    if (value === "/") {
      if (prev.type === "dot" && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = "";
        state.output = "";
        tokens.pop();
        prev = bos;
        continue;
      }
      push({type: "slash", value, output: SLASH_LITERAL2});
      continue;
    }
    if (value === ".") {
      if (state.braces > 0 && prev.type === "dot") {
        if (prev.value === ".")
          prev.output = DOT_LITERAL2;
        const brace = braces2[braces2.length - 1];
        prev.type = "dots";
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }
      if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
        push({type: "text", value, output: DOT_LITERAL2});
        continue;
      }
      push({type: "dot", value, output: DOT_LITERAL2});
      continue;
    }
    if (value === "?") {
      const isGroup = prev && prev.value === "(";
      if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        extglobOpen("qmark", value);
        continue;
      }
      if (prev && prev.type === "paren") {
        const next = peek();
        let output = value;
        if (next === "<" && !utils.supportsLookbehinds()) {
          throw new Error("Node.js v10 or higher is required for regex lookbehinds");
        }
        if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
          output = `\\${value}`;
        }
        push({type: "text", value, output});
        continue;
      }
      if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
        push({type: "qmark", value, output: QMARK_NO_DOT2});
        continue;
      }
      push({type: "qmark", value, output: QMARK2});
      continue;
    }
    if (value === "!") {
      if (opts.noextglob !== true && peek() === "(") {
        if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
          extglobOpen("negate", value);
          continue;
        }
      }
      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }
    if (value === "+") {
      if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        extglobOpen("plus", value);
        continue;
      }
      if (prev && prev.value === "(" || opts.regex === false) {
        push({type: "plus", value, output: PLUS_LITERAL2});
        continue;
      }
      if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
        push({type: "plus", value});
        continue;
      }
      push({type: "plus", value: PLUS_LITERAL2});
      continue;
    }
    if (value === "@") {
      if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        push({type: "at", extglob: true, value, output: ""});
        continue;
      }
      push({type: "text", value});
      continue;
    }
    if (value !== "*") {
      if (value === "$" || value === "^") {
        value = `\\${value}`;
      }
      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }
      push({type: "text", value});
      continue;
    }
    if (prev && (prev.type === "globstar" || prev.star === true)) {
      prev.type = "star";
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }
    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen("star", value);
      continue;
    }
    if (prev.type === "star") {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }
      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === "slash" || prior.type === "bos";
      const afterStar = before && (before.type === "star" || before.type === "globstar");
      if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
        push({type: "star", value, output: ""});
        continue;
      }
      const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
      const isExtglob2 = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
      if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob2) {
        push({type: "star", value, output: ""});
        continue;
      }
      while (rest.slice(0, 3) === "/**") {
        const after = input[state.index + 4];
        if (after && after !== "/") {
          break;
        }
        rest = rest.slice(3);
        consume("/**", 3);
      }
      if (prior.type === "bos" && eos()) {
        prev.type = "globstar";
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }
      if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;
        prev.type = "globstar";
        prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }
      if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
        const end = rest[1] !== void 0 ? "|$" : "";
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;
        prev.type = "globstar";
        prev.output = `${globstar(opts)}${SLASH_LITERAL2}|${SLASH_LITERAL2}${end})`;
        prev.value += value;
        state.output += prior.output + prev.output;
        state.globstar = true;
        consume(value + advance());
        push({type: "slash", value: "/", output: ""});
        continue;
      }
      if (prior.type === "bos" && rest[0] === "/") {
        prev.type = "globstar";
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL2}|${globstar(opts)}${SLASH_LITERAL2})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({type: "slash", value: "/", output: ""});
        continue;
      }
      state.output = state.output.slice(0, -prev.output.length);
      prev.type = "globstar";
      prev.output = globstar(opts);
      prev.value += value;
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }
    const token = {type: "star", value, output: star};
    if (opts.bash === true) {
      token.output = ".*?";
      if (prev.type === "bos" || prev.type === "slash") {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }
    if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }
    if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
      if (prev.type === "dot") {
        state.output += NO_DOT_SLASH2;
        prev.output += NO_DOT_SLASH2;
      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH2;
        prev.output += NO_DOTS_SLASH2;
      } else {
        state.output += nodot;
        prev.output += nodot;
      }
      if (peek() !== "*") {
        state.output += ONE_CHAR2;
        prev.output += ONE_CHAR2;
      }
    }
    push(token);
  }
  while (state.brackets > 0) {
    if (opts.strictBrackets === true)
      throw new SyntaxError(syntaxError("closing", "]"));
    state.output = utils.escapeLast(state.output, "[");
    decrement("brackets");
  }
  while (state.parens > 0) {
    if (opts.strictBrackets === true)
      throw new SyntaxError(syntaxError("closing", ")"));
    state.output = utils.escapeLast(state.output, "(");
    decrement("parens");
  }
  while (state.braces > 0) {
    if (opts.strictBrackets === true)
      throw new SyntaxError(syntaxError("closing", "}"));
    state.output = utils.escapeLast(state.output, "{");
    decrement("braces");
  }
  if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
    push({type: "maybe_slash", value: "", output: `${SLASH_LITERAL2}?`});
  }
  if (state.backtrack === true) {
    state.output = "";
    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;
      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }
  return state;
};
parse.fastpaths = (input, options) => {
  const opts = {...options};
  const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }
  input = REPLACEMENTS[input] || input;
  const win32 = utils.isWindows(options);
  const {
    DOT_LITERAL: DOT_LITERAL2,
    SLASH_LITERAL: SLASH_LITERAL2,
    ONE_CHAR: ONE_CHAR2,
    DOTS_SLASH: DOTS_SLASH2,
    NO_DOT: NO_DOT2,
    NO_DOTS: NO_DOTS2,
    NO_DOTS_SLASH: NO_DOTS_SLASH2,
    STAR: STAR2,
    START_ANCHOR: START_ANCHOR2
  } = constants.globChars(win32);
  const nodot = opts.dot ? NO_DOTS2 : NO_DOT2;
  const slashDot = opts.dot ? NO_DOTS_SLASH2 : NO_DOT2;
  const capture = opts.capture ? "" : "?:";
  const state = {negated: false, prefix: ""};
  let star = opts.bash === true ? ".*?" : STAR2;
  if (opts.capture) {
    star = `(${star})`;
  }
  const globstar = (opts2) => {
    if (opts2.noglobstar === true)
      return star;
    return `(${capture}(?:(?!${START_ANCHOR2}${opts2.dot ? DOTS_SLASH2 : DOT_LITERAL2}).)*?)`;
  };
  const create = (str) => {
    switch (str) {
      case "*":
        return `${nodot}${ONE_CHAR2}${star}`;
      case ".*":
        return `${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "*.*":
        return `${nodot}${star}${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "*/*":
        return `${nodot}${star}${SLASH_LITERAL2}${ONE_CHAR2}${slashDot}${star}`;
      case "**":
        return nodot + globstar(opts);
      case "**/*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${slashDot}${ONE_CHAR2}${star}`;
      case "**/*.*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${slashDot}${star}${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "**/.*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str);
        if (!match)
          return;
        const source2 = create(match[1]);
        if (!source2)
          return;
        return source2 + DOT_LITERAL2 + match[2];
      }
    }
  };
  const output = utils.removePrefix(input, state);
  let source = create(output);
  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL2}?`;
  }
  return source;
};
var parse_1 = parse;
const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
const picomatch = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map((input) => picomatch(input, options, returnState));
    const arrayMatcher = (str) => {
      for (const isMatch of fns) {
        const state2 = isMatch(str);
        if (state2)
          return state2;
      }
      return false;
    };
    return arrayMatcher;
  }
  const isState = isObject(glob) && glob.tokens && glob.input;
  if (glob === "" || typeof glob !== "string" && !isState) {
    throw new TypeError("Expected pattern to be a non-empty string");
  }
  const opts = options || {};
  const posix = utils.isWindows(options);
  const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
  const state = regex.state;
  delete regex.state;
  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = {...options, ignore: null, onMatch: null, onResult: null};
    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
  }
  const matcher = (input, returnObject = false) => {
    const {isMatch, match, output} = picomatch.test(input, regex, options, {glob, posix});
    const result = {glob, state, regex, posix, input, output, match, isMatch};
    if (typeof opts.onResult === "function") {
      opts.onResult(result);
    }
    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }
    if (isIgnored(input)) {
      if (typeof opts.onIgnore === "function") {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }
    if (typeof opts.onMatch === "function") {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };
  if (returnState) {
    matcher.state = state;
  }
  return matcher;
};
picomatch.test = (input, regex, options, {glob, posix} = {}) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected input to be a string");
  }
  if (input === "") {
    return {isMatch: false, output: ""};
  }
  const opts = options || {};
  const format = opts.format || (posix ? utils.toPosixSlashes : null);
  let match = input === glob;
  let output = match && format ? format(input) : input;
  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }
  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }
  return {isMatch: Boolean(match), match, output};
};
picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
  return regex.test(sysPath__default["default"].basename(input));
};
picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
picomatch.parse = (pattern, options) => {
  if (Array.isArray(pattern))
    return pattern.map((p) => picomatch.parse(p, options));
  return parse_1(pattern, {...options, fastpaths: false});
};
picomatch.scan = (input, options) => scan_1(input, options);
picomatch.compileRe = (parsed, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return parsed.output;
  }
  const opts = options || {};
  const prepend = opts.contains ? "" : "^";
  const append2 = opts.contains ? "" : "$";
  let source = `${prepend}(?:${parsed.output})${append2}`;
  if (parsed && parsed.negated === true) {
    source = `^(?!${source}).*$`;
  }
  const regex = picomatch.toRegex(source, options);
  if (returnState === true) {
    regex.state = parsed;
  }
  return regex;
};
picomatch.makeRe = (input, options, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== "string") {
    throw new TypeError("Expected a non-empty string");
  }
  const opts = options || {};
  let parsed = {negated: false, fastpaths: true};
  let prefix = "";
  let output;
  if (input.startsWith("./")) {
    input = input.slice(2);
    prefix = parsed.prefix = "./";
  }
  if (opts.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
    output = parse_1.fastpaths(input, options);
  }
  if (output === void 0) {
    parsed = parse_1(input, options);
    parsed.prefix = prefix + (parsed.prefix || "");
  } else {
    parsed.output = output;
  }
  return picomatch.compileRe(parsed, options, returnOutput, returnState);
};
picomatch.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
  } catch (err) {
    if (options && options.debug === true)
      throw err;
    return /$^/;
  }
};
picomatch.constants = constants;
var picomatch_1 = picomatch;
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_picomatch = picomatch_1;
const {Readable} = require$$0__default$1["default"];
const {promisify} = require$$0__default["default"];
const readdir = promisify(fs__default["default"].readdir);
const stat = promisify(fs__default["default"].stat);
const lstat = promisify(fs__default["default"].lstat);
const realpath = promisify(fs__default["default"].realpath);
const BANG = "!";
const NORMAL_FLOW_ERRORS = new Set(["ENOENT", "EPERM", "EACCES", "ELOOP"]);
const FILE_TYPE = "files";
const DIR_TYPE = "directories";
const FILE_DIR_TYPE = "files_directories";
const EVERYTHING_TYPE = "all";
const ALL_TYPES = [FILE_TYPE, DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE];
const isNormalFlowError = (error) => NORMAL_FLOW_ERRORS.has(error.code);
const normalizeFilter = (filter) => {
  if (filter === void 0)
    return;
  if (typeof filter === "function")
    return filter;
  if (typeof filter === "string") {
    const glob = H__ElectronProject_Electron_Vue_electronVueVite_node_modules_picomatch(filter.trim());
    return (entry) => glob(entry.basename);
  }
  if (Array.isArray(filter)) {
    const positive = [];
    const negative = [];
    for (const item of filter) {
      const trimmed = item.trim();
      if (trimmed.charAt(0) === BANG) {
        negative.push(H__ElectronProject_Electron_Vue_electronVueVite_node_modules_picomatch(trimmed.slice(1)));
      } else {
        positive.push(H__ElectronProject_Electron_Vue_electronVueVite_node_modules_picomatch(trimmed));
      }
    }
    if (negative.length > 0) {
      if (positive.length > 0) {
        return (entry) => positive.some((f) => f(entry.basename)) && !negative.some((f) => f(entry.basename));
      }
      return (entry) => !negative.some((f) => f(entry.basename));
    }
    return (entry) => positive.some((f) => f(entry.basename));
  }
};
class ReaddirpStream extends Readable {
  static get defaultOptions() {
    return {
      root: ".",
      fileFilter: (path) => true,
      directoryFilter: (path) => true,
      type: FILE_TYPE,
      lstat: false,
      depth: 2147483648,
      alwaysStat: false
    };
  }
  constructor(options = {}) {
    super({
      objectMode: true,
      autoDestroy: true,
      highWaterMark: options.highWaterMark || 4096
    });
    const opts = {...ReaddirpStream.defaultOptions, ...options};
    const {root, type} = opts;
    this._fileFilter = normalizeFilter(opts.fileFilter);
    this._directoryFilter = normalizeFilter(opts.directoryFilter);
    const statMethod = opts.lstat ? lstat : stat;
    if (process.platform === "win32" && stat.length === 3) {
      this._stat = (path) => statMethod(path, {bigint: true});
    } else {
      this._stat = statMethod;
    }
    this._maxDepth = opts.depth;
    this._wantsDir = [DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
    this._wantsFile = [FILE_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
    this._wantsEverything = type === EVERYTHING_TYPE;
    this._root = sysPath__default["default"].resolve(root);
    this._isDirent = "Dirent" in fs__default["default"] && !opts.alwaysStat;
    this._statsProp = this._isDirent ? "dirent" : "stats";
    this._rdOptions = {encoding: "utf8", withFileTypes: this._isDirent};
    this.parents = [this._exploreDir(root, 1)];
    this.reading = false;
    this.parent = void 0;
  }
  async _read(batch) {
    if (this.reading)
      return;
    this.reading = true;
    try {
      while (!this.destroyed && batch > 0) {
        const {path, depth: depth2, files = []} = this.parent || {};
        if (files.length > 0) {
          const slice = files.splice(0, batch).map((dirent) => this._formatEntry(dirent, path));
          for (const entry of await Promise.all(slice)) {
            if (this.destroyed)
              return;
            const entryType = await this._getEntryType(entry);
            if (entryType === "directory" && this._directoryFilter(entry)) {
              if (depth2 <= this._maxDepth) {
                this.parents.push(this._exploreDir(entry.fullPath, depth2 + 1));
              }
              if (this._wantsDir) {
                this.push(entry);
                batch--;
              }
            } else if ((entryType === "file" || this._includeAsFile(entry)) && this._fileFilter(entry)) {
              if (this._wantsFile) {
                this.push(entry);
                batch--;
              }
            }
          }
        } else {
          const parent = this.parents.pop();
          if (!parent) {
            this.push(null);
            break;
          }
          this.parent = await parent;
          if (this.destroyed)
            return;
        }
      }
    } catch (error) {
      this.destroy(error);
    } finally {
      this.reading = false;
    }
  }
  async _exploreDir(path, depth2) {
    let files;
    try {
      files = await readdir(path, this._rdOptions);
    } catch (error) {
      this._onError(error);
    }
    return {files, depth: depth2, path};
  }
  async _formatEntry(dirent, path) {
    let entry;
    try {
      const basename = this._isDirent ? dirent.name : dirent;
      const fullPath = sysPath__default["default"].resolve(sysPath__default["default"].join(path, basename));
      entry = {path: sysPath__default["default"].relative(this._root, fullPath), fullPath, basename};
      entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
    } catch (err) {
      this._onError(err);
    }
    return entry;
  }
  _onError(err) {
    if (isNormalFlowError(err) && !this.destroyed) {
      this.emit("warn", err);
    } else {
      this.destroy(err);
    }
  }
  async _getEntryType(entry) {
    const stats = entry && entry[this._statsProp];
    if (!stats) {
      return;
    }
    if (stats.isFile()) {
      return "file";
    }
    if (stats.isDirectory()) {
      return "directory";
    }
    if (stats && stats.isSymbolicLink()) {
      const full = entry.fullPath;
      try {
        const entryRealPath = await realpath(full);
        const entryRealPathStats = await lstat(entryRealPath);
        if (entryRealPathStats.isFile()) {
          return "file";
        }
        if (entryRealPathStats.isDirectory()) {
          const len = entryRealPath.length;
          if (full.startsWith(entryRealPath) && full.substr(len, 1) === sysPath__default["default"].sep) {
            return this._onError(new Error(`Circular symlink detected: "${full}" points to "${entryRealPath}"`));
          }
          return "directory";
        }
      } catch (error) {
        this._onError(error);
      }
    }
  }
  _includeAsFile(entry) {
    const stats = entry && entry[this._statsProp];
    return stats && this._wantsEverything && !stats.isDirectory();
  }
}
const readdirp = (root, options = {}) => {
  let type = options.entryType || options.type;
  if (type === "both")
    type = FILE_DIR_TYPE;
  if (type)
    options.type = type;
  if (!root) {
    throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
  } else if (typeof root !== "string") {
    throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
  } else if (type && !ALL_TYPES.includes(type)) {
    throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(", ")}`);
  }
  options.root = root;
  return new ReaddirpStream(options);
};
const readdirpPromise = (root, options = {}) => {
  return new Promise((resolve, reject) => {
    const files = [];
    readdirp(root, options).on("data", (entry) => files.push(entry)).on("end", () => resolve(files)).on("error", (error) => reject(error));
  });
};
readdirp.promise = readdirpPromise;
readdirp.ReaddirpStream = ReaddirpStream;
readdirp.default = readdirp;
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_readdirp = readdirp;
/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_normalizePath = function(path, stripTrailing) {
  if (typeof path !== "string") {
    throw new TypeError("expected path to be a string");
  }
  if (path === "\\" || path === "/")
    return "/";
  var len = path.length;
  if (len <= 1)
    return path;
  var prefix = "";
  if (len > 4 && path[3] === "\\") {
    var ch = path[2];
    if ((ch === "?" || ch === ".") && path.slice(0, 2) === "\\\\") {
      path = path.slice(2);
      prefix = "//";
    }
  }
  var segs = path.split(/[/\\]+/);
  if (stripTrailing !== false && segs[segs.length - 1] === "") {
    segs.pop();
  }
  return prefix + segs.join("/");
};
const BANG$1 = "!";
const DEFAULT_OPTIONS = {returnIndex: false};
const arrify = (item) => Array.isArray(item) ? item : [item];
const createPattern = (matcher, options) => {
  if (typeof matcher === "function") {
    return matcher;
  }
  if (typeof matcher === "string") {
    const glob = H__ElectronProject_Electron_Vue_electronVueVite_node_modules_picomatch(matcher, options);
    return (string) => matcher === string || glob(string);
  }
  if (matcher instanceof RegExp) {
    return (string) => matcher.test(string);
  }
  return (string) => false;
};
const matchPatterns = (patterns, negPatterns, args, returnIndex) => {
  const isList = Array.isArray(args);
  const _path = isList ? args[0] : args;
  if (!isList && typeof _path !== "string") {
    throw new TypeError("anymatch: second argument must be a string: got " + Object.prototype.toString.call(_path));
  }
  const path = H__ElectronProject_Electron_Vue_electronVueVite_node_modules_normalizePath(_path);
  for (let index = 0; index < negPatterns.length; index++) {
    const nglob = negPatterns[index];
    if (nglob(path)) {
      return returnIndex ? -1 : false;
    }
  }
  const applied = isList && [path].concat(args.slice(1));
  for (let index = 0; index < patterns.length; index++) {
    const pattern = patterns[index];
    if (isList ? pattern(...applied) : pattern(path)) {
      return returnIndex ? index : true;
    }
  }
  return returnIndex ? -1 : false;
};
const anymatch = (matchers, testString, options = DEFAULT_OPTIONS) => {
  if (matchers == null) {
    throw new TypeError("anymatch: specify first argument");
  }
  const opts = typeof options === "boolean" ? {returnIndex: options} : options;
  const returnIndex = opts.returnIndex || false;
  const mtchers = arrify(matchers);
  const negatedGlobs = mtchers.filter((item) => typeof item === "string" && item.charAt(0) === BANG$1).map((item) => item.slice(1)).map((item) => H__ElectronProject_Electron_Vue_electronVueVite_node_modules_picomatch(item, opts));
  const patterns = mtchers.map((matcher) => createPattern(matcher, opts));
  if (testString == null) {
    return (testString2, ri = false) => {
      const returnIndex2 = typeof ri === "boolean" ? ri : false;
      return matchPatterns(patterns, negatedGlobs, testString2, returnIndex2);
    };
  }
  return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
};
anymatch.default = anymatch;
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_anymatch = anymatch;
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isExtglob = function isExtglob(str) {
  if (typeof str !== "string" || str === "") {
    return false;
  }
  var match;
  while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
    if (match[2])
      return true;
    str = str.slice(match.index + match[0].length);
  }
  return false;
};
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var chars = {"{": "}", "(": ")", "[": "]"};
var strictRegex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
var relaxedRegex = /\\(.)|(^!|[*?{}()[\]]|\(\?)/;
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isGlob = function isGlob(str, options) {
  if (typeof str !== "string" || str === "") {
    return false;
  }
  if (H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isExtglob(str)) {
    return true;
  }
  var regex = strictRegex;
  var match;
  if (options && options.strict === false) {
    regex = relaxedRegex;
  }
  while (match = regex.exec(str)) {
    if (match[2])
      return true;
    var idx = match.index + match[0].length;
    var open2 = match[1];
    var close2 = open2 ? chars[open2] : null;
    if (open2 && close2) {
      var n = str.indexOf(close2, idx);
      if (n !== -1) {
        idx = n + 1;
      }
    }
    str = str.slice(idx);
  }
  return false;
};
var pathPosixDirname = sysPath__default["default"].posix.dirname;
var isWin32 = require$$1__default["default"].platform() === "win32";
var slash = "/";
var backslash = /\\/g;
var enclosure = /[\{\[].*[\/]*.*[\}\]]$/;
var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_globParent = function globParent(str, opts) {
  var options = Object.assign({flipBackslashes: true}, opts);
  if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
    str = str.replace(backslash, slash);
  }
  if (enclosure.test(str)) {
    str += slash;
  }
  str += "a";
  do {
    str = pathPosixDirname(str);
  } while (H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isGlob(str) || globby.test(str));
  return str.replace(escaped, "$1");
};
var utils$1 = createCommonjsModule(function(module, exports) {
  exports.isInteger = (num) => {
    if (typeof num === "number") {
      return Number.isInteger(num);
    }
    if (typeof num === "string" && num.trim() !== "") {
      return Number.isInteger(Number(num));
    }
    return false;
  };
  exports.find = (node, type) => node.nodes.find((node2) => node2.type === type);
  exports.exceedsLimit = (min, max, step = 1, limit) => {
    if (limit === false)
      return false;
    if (!exports.isInteger(min) || !exports.isInteger(max))
      return false;
    return (Number(max) - Number(min)) / Number(step) >= limit;
  };
  exports.escapeNode = (block, n = 0, type) => {
    let node = block.nodes[n];
    if (!node)
      return;
    if (type && node.type === type || node.type === "open" || node.type === "close") {
      if (node.escaped !== true) {
        node.value = "\\" + node.value;
        node.escaped = true;
      }
    }
  };
  exports.encloseBrace = (node) => {
    if (node.type !== "brace")
      return false;
    if (node.commas >> 0 + node.ranges >> 0 === 0) {
      node.invalid = true;
      return true;
    }
    return false;
  };
  exports.isInvalidBrace = (block) => {
    if (block.type !== "brace")
      return false;
    if (block.invalid === true || block.dollar)
      return true;
    if (block.commas >> 0 + block.ranges >> 0 === 0) {
      block.invalid = true;
      return true;
    }
    if (block.open !== true || block.close !== true) {
      block.invalid = true;
      return true;
    }
    return false;
  };
  exports.isOpenOrClose = (node) => {
    if (node.type === "open" || node.type === "close") {
      return true;
    }
    return node.open === true || node.close === true;
  };
  exports.reduce = (nodes) => nodes.reduce((acc, node) => {
    if (node.type === "text")
      acc.push(node.value);
    if (node.type === "range")
      node.type = "text";
    return acc;
  }, []);
  exports.flatten = (...args) => {
    const result = [];
    const flat = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        let ele = arr[i];
        Array.isArray(ele) ? flat(ele) : ele !== void 0 && result.push(ele);
      }
      return result;
    };
    flat(args);
    return result;
  };
});
var stringify = (ast, options = {}) => {
  let stringify2 = (node, parent = {}) => {
    let invalidBlock = options.escapeInvalid && utils$1.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let output = "";
    if (node.value) {
      if ((invalidBlock || invalidNode) && utils$1.isOpenOrClose(node)) {
        return "\\" + node.value;
      }
      return node.value;
    }
    if (node.value) {
      return node.value;
    }
    if (node.nodes) {
      for (let child of node.nodes) {
        output += stringify2(child);
      }
    }
    return output;
  };
  return stringify2(ast);
};
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isNumber = function(num) {
  if (typeof num === "number") {
    return num - num === 0;
  }
  if (typeof num === "string" && num.trim() !== "") {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const toRegexRange = (min, max, options) => {
  if (H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isNumber(min) === false) {
    throw new TypeError("toRegexRange: expected the first argument to be a number");
  }
  if (max === void 0 || min === max) {
    return String(min);
  }
  if (H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isNumber(max) === false) {
    throw new TypeError("toRegexRange: expected the second argument to be a number.");
  }
  let opts = {relaxZeros: true, ...options};
  if (typeof opts.strictZeros === "boolean") {
    opts.relaxZeros = opts.strictZeros === false;
  }
  let relax = String(opts.relaxZeros);
  let shorthand = String(opts.shorthand);
  let capture = String(opts.capture);
  let wrap = String(opts.wrap);
  let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
  if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
    return toRegexRange.cache[cacheKey].result;
  }
  let a = Math.min(min, max);
  let b = Math.max(min, max);
  if (Math.abs(a - b) === 1) {
    let result = min + "|" + max;
    if (opts.capture) {
      return `(${result})`;
    }
    if (opts.wrap === false) {
      return result;
    }
    return `(?:${result})`;
  }
  let isPadded = hasPadding(min) || hasPadding(max);
  let state = {min, max, a, b};
  let positives = [];
  let negatives = [];
  if (isPadded) {
    state.isPadded = isPadded;
    state.maxLen = String(state.max).length;
  }
  if (a < 0) {
    let newMin = b < 0 ? Math.abs(b) : 1;
    negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
    a = state.a = 0;
  }
  if (b >= 0) {
    positives = splitToPatterns(a, b, state, opts);
  }
  state.negatives = negatives;
  state.positives = positives;
  state.result = collatePatterns(negatives, positives);
  if (opts.capture === true) {
    state.result = `(${state.result})`;
  } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
    state.result = `(?:${state.result})`;
  }
  toRegexRange.cache[cacheKey] = state;
  return state.result;
};
function collatePatterns(neg, pos, options) {
  let onlyNegative = filterPatterns(neg, pos, "-", false) || [];
  let onlyPositive = filterPatterns(pos, neg, "", false) || [];
  let intersected = filterPatterns(neg, pos, "-?", true) || [];
  let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join("|");
}
function splitToRanges(min, max) {
  let nines = 1;
  let zeros2 = 1;
  let stop = countNines(min, nines);
  let stops = new Set([max]);
  while (min <= stop && stop <= max) {
    stops.add(stop);
    nines += 1;
    stop = countNines(min, nines);
  }
  stop = countZeros(max + 1, zeros2) - 1;
  while (min < stop && stop <= max) {
    stops.add(stop);
    zeros2 += 1;
    stop = countZeros(max + 1, zeros2) - 1;
  }
  stops = [...stops];
  stops.sort(compare);
  return stops;
}
function rangeToPattern(start, stop, options) {
  if (start === stop) {
    return {pattern: start, count: [], digits: 0};
  }
  let zipped = zip(start, stop);
  let digits = zipped.length;
  let pattern = "";
  let count = 0;
  for (let i = 0; i < digits; i++) {
    let [startDigit, stopDigit] = zipped[i];
    if (startDigit === stopDigit) {
      pattern += startDigit;
    } else if (startDigit !== "0" || stopDigit !== "9") {
      pattern += toCharacterClass(startDigit, stopDigit);
    } else {
      count++;
    }
  }
  if (count) {
    pattern += options.shorthand === true ? "\\d" : "[0-9]";
  }
  return {pattern, count: [count], digits};
}
function splitToPatterns(min, max, tok, options) {
  let ranges = splitToRanges(min, max);
  let tokens = [];
  let start = min;
  let prev;
  for (let i = 0; i < ranges.length; i++) {
    let max2 = ranges[i];
    let obj = rangeToPattern(String(start), String(max2), options);
    let zeros2 = "";
    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
      if (prev.count.length > 1) {
        prev.count.pop();
      }
      prev.count.push(obj.count[0]);
      prev.string = prev.pattern + toQuantifier(prev.count);
      start = max2 + 1;
      continue;
    }
    if (tok.isPadded) {
      zeros2 = padZeros(max2, tok, options);
    }
    obj.string = zeros2 + obj.pattern + toQuantifier(obj.count);
    tokens.push(obj);
    start = max2 + 1;
    prev = obj;
  }
  return tokens;
}
function filterPatterns(arr, comparison, prefix, intersection, options) {
  let result = [];
  for (let ele of arr) {
    let {string} = ele;
    if (!intersection && !contains(comparison, "string", string)) {
      result.push(prefix + string);
    }
    if (intersection && contains(comparison, "string", string)) {
      result.push(prefix + string);
    }
  }
  return result;
}
function zip(a, b) {
  let arr = [];
  for (let i = 0; i < a.length; i++)
    arr.push([a[i], b[i]]);
  return arr;
}
function compare(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}
function contains(arr, key, val) {
  return arr.some((ele) => ele[key] === val);
}
function countNines(min, len) {
  return Number(String(min).slice(0, -len) + "9".repeat(len));
}
function countZeros(integer, zeros2) {
  return integer - integer % Math.pow(10, zeros2);
}
function toQuantifier(digits) {
  let [start = 0, stop = ""] = digits;
  if (stop || start > 1) {
    return `{${start + (stop ? "," + stop : "")}}`;
  }
  return "";
}
function toCharacterClass(a, b, options) {
  return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
}
function hasPadding(str) {
  return /^-?(0+)\d/.test(str);
}
function padZeros(value, tok, options) {
  if (!tok.isPadded) {
    return value;
  }
  let diff = Math.abs(tok.maxLen - String(value).length);
  let relax = options.relaxZeros !== false;
  switch (diff) {
    case 0:
      return "";
    case 1:
      return relax ? "0?" : "0";
    case 2:
      return relax ? "0{0,2}" : "00";
    default: {
      return relax ? `0{0,${diff}}` : `0{${diff}}`;
    }
  }
}
toRegexRange.cache = {};
toRegexRange.clearCache = () => toRegexRange.cache = {};
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_toRegexRange = toRegexRange;
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
const isObject$1 = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
const transform = (toNumber) => {
  return (value) => toNumber === true ? Number(value) : String(value);
};
const isValidValue = (value) => {
  return typeof value === "number" || typeof value === "string" && value !== "";
};
const isNumber = (num) => Number.isInteger(+num);
const zeros = (input) => {
  let value = `${input}`;
  let index = -1;
  if (value[0] === "-")
    value = value.slice(1);
  if (value === "0")
    return false;
  while (value[++index] === "0")
    ;
  return index > 0;
};
const stringify$1 = (start, end, options) => {
  if (typeof start === "string" || typeof end === "string") {
    return true;
  }
  return options.stringify === true;
};
const pad = (input, maxLength, toNumber) => {
  if (maxLength > 0) {
    let dash = input[0] === "-" ? "-" : "";
    if (dash)
      input = input.slice(1);
    input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
  }
  if (toNumber === false) {
    return String(input);
  }
  return input;
};
const toMaxLen = (input, maxLength) => {
  let negative = input[0] === "-" ? "-" : "";
  if (negative) {
    input = input.slice(1);
    maxLength--;
  }
  while (input.length < maxLength)
    input = "0" + input;
  return negative ? "-" + input : input;
};
const toSequence = (parts, options) => {
  parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  let prefix = options.capture ? "" : "?:";
  let positives = "";
  let negatives = "";
  let result;
  if (parts.positives.length) {
    positives = parts.positives.join("|");
  }
  if (parts.negatives.length) {
    negatives = `-(${prefix}${parts.negatives.join("|")})`;
  }
  if (positives && negatives) {
    result = `${positives}|${negatives}`;
  } else {
    result = positives || negatives;
  }
  if (options.wrap) {
    return `(${prefix}${result})`;
  }
  return result;
};
const toRange = (a, b, isNumbers, options) => {
  if (isNumbers) {
    return H__ElectronProject_Electron_Vue_electronVueVite_node_modules_toRegexRange(a, b, {wrap: false, ...options});
  }
  let start = String.fromCharCode(a);
  if (a === b)
    return start;
  let stop = String.fromCharCode(b);
  return `[${start}-${stop}]`;
};
const toRegex = (start, end, options) => {
  if (Array.isArray(start)) {
    let wrap = options.wrap === true;
    let prefix = options.capture ? "" : "?:";
    return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
  }
  return H__ElectronProject_Electron_Vue_electronVueVite_node_modules_toRegexRange(start, end, options);
};
const rangeError = (...args) => {
  return new RangeError("Invalid range arguments: " + require$$0__default["default"].inspect(...args));
};
const invalidRange = (start, end, options) => {
  if (options.strictRanges === true)
    throw rangeError([start, end]);
  return [];
};
const invalidStep = (step, options) => {
  if (options.strictRanges === true) {
    throw new TypeError(`Expected step "${step}" to be a number`);
  }
  return [];
};
const fillNumbers = (start, end, step = 1, options = {}) => {
  let a = Number(start);
  let b = Number(end);
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    if (options.strictRanges === true)
      throw rangeError([start, end]);
    return [];
  }
  if (a === 0)
    a = 0;
  if (b === 0)
    b = 0;
  let descending = a > b;
  let startString = String(start);
  let endString = String(end);
  let stepString = String(step);
  step = Math.max(Math.abs(step), 1);
  let padded = zeros(startString) || zeros(endString) || zeros(stepString);
  let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
  let toNumber = padded === false && stringify$1(start, end, options) === false;
  let format = options.transform || transform(toNumber);
  if (options.toRegex && step === 1) {
    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
  }
  let parts = {negatives: [], positives: []};
  let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
  let range = [];
  let index = 0;
  while (descending ? a >= b : a <= b) {
    if (options.toRegex === true && step > 1) {
      push(a);
    } else {
      range.push(pad(format(a, index), maxLen, toNumber));
    }
    a = descending ? a - step : a + step;
    index++;
  }
  if (options.toRegex === true) {
    return step > 1 ? toSequence(parts, options) : toRegex(range, null, {wrap: false, ...options});
  }
  return range;
};
const fillLetters = (start, end, step = 1, options = {}) => {
  if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
    return invalidRange(start, end, options);
  }
  let format = options.transform || ((val) => String.fromCharCode(val));
  let a = `${start}`.charCodeAt(0);
  let b = `${end}`.charCodeAt(0);
  let descending = a > b;
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  if (options.toRegex && step === 1) {
    return toRange(min, max, false, options);
  }
  let range = [];
  let index = 0;
  while (descending ? a >= b : a <= b) {
    range.push(format(a, index));
    a = descending ? a - step : a + step;
    index++;
  }
  if (options.toRegex === true) {
    return toRegex(range, null, {wrap: false, options});
  }
  return range;
};
const fill = (start, end, step, options = {}) => {
  if (end == null && isValidValue(start)) {
    return [start];
  }
  if (!isValidValue(start) || !isValidValue(end)) {
    return invalidRange(start, end, options);
  }
  if (typeof step === "function") {
    return fill(start, end, 1, {transform: step});
  }
  if (isObject$1(step)) {
    return fill(start, end, 0, step);
  }
  let opts = {...options};
  if (opts.capture === true)
    opts.wrap = true;
  step = step || opts.step || 1;
  if (!isNumber(step)) {
    if (step != null && !isObject$1(step))
      return invalidStep(step, opts);
    return fill(start, end, 1, step);
  }
  if (isNumber(start) && isNumber(end)) {
    return fillNumbers(start, end, step, opts);
  }
  return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
};
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_fillRange = fill;
const compile = (ast, options = {}) => {
  let walk = (node, parent = {}) => {
    let invalidBlock = utils$1.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let invalid = invalidBlock === true || invalidNode === true;
    let prefix = options.escapeInvalid === true ? "\\" : "";
    let output = "";
    if (node.isOpen === true) {
      return prefix + node.value;
    }
    if (node.isClose === true) {
      return prefix + node.value;
    }
    if (node.type === "open") {
      return invalid ? prefix + node.value : "(";
    }
    if (node.type === "close") {
      return invalid ? prefix + node.value : ")";
    }
    if (node.type === "comma") {
      return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
    }
    if (node.value) {
      return node.value;
    }
    if (node.nodes && node.ranges > 0) {
      let args = utils$1.reduce(node.nodes);
      let range = H__ElectronProject_Electron_Vue_electronVueVite_node_modules_fillRange(...args, {...options, wrap: false, toRegex: true});
      if (range.length !== 0) {
        return args.length > 1 && range.length > 1 ? `(${range})` : range;
      }
    }
    if (node.nodes) {
      for (let child of node.nodes) {
        output += walk(child, node);
      }
    }
    return output;
  };
  return walk(ast);
};
var compile_1 = compile;
const append = (queue = "", stash = "", enclose = false) => {
  let result = [];
  queue = [].concat(queue);
  stash = [].concat(stash);
  if (!stash.length)
    return queue;
  if (!queue.length) {
    return enclose ? utils$1.flatten(stash).map((ele) => `{${ele}}`) : stash;
  }
  for (let item of queue) {
    if (Array.isArray(item)) {
      for (let value of item) {
        result.push(append(value, stash, enclose));
      }
    } else {
      for (let ele of stash) {
        if (enclose === true && typeof ele === "string")
          ele = `{${ele}}`;
        result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
      }
    }
  }
  return utils$1.flatten(result);
};
const expand = (ast, options = {}) => {
  let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
  let walk = (node, parent = {}) => {
    node.queue = [];
    let p = parent;
    let q = parent.queue;
    while (p.type !== "brace" && p.type !== "root" && p.parent) {
      p = p.parent;
      q = p.queue;
    }
    if (node.invalid || node.dollar) {
      q.push(append(q.pop(), stringify(node, options)));
      return;
    }
    if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
      q.push(append(q.pop(), ["{}"]));
      return;
    }
    if (node.nodes && node.ranges > 0) {
      let args = utils$1.reduce(node.nodes);
      if (utils$1.exceedsLimit(...args, options.step, rangeLimit)) {
        throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
      }
      let range = H__ElectronProject_Electron_Vue_electronVueVite_node_modules_fillRange(...args, options);
      if (range.length === 0) {
        range = stringify(node, options);
      }
      q.push(append(q.pop(), range));
      node.nodes = [];
      return;
    }
    let enclose = utils$1.encloseBrace(node);
    let queue = node.queue;
    let block = node;
    while (block.type !== "brace" && block.type !== "root" && block.parent) {
      block = block.parent;
      queue = block.queue;
    }
    for (let i = 0; i < node.nodes.length; i++) {
      let child = node.nodes[i];
      if (child.type === "comma" && node.type === "brace") {
        if (i === 1)
          queue.push("");
        queue.push("");
        continue;
      }
      if (child.type === "close") {
        q.push(append(q.pop(), queue, enclose));
        continue;
      }
      if (child.value && child.type !== "open") {
        queue.push(append(queue.pop(), child.value));
        continue;
      }
      if (child.nodes) {
        walk(child, node);
      }
    }
    return queue;
  };
  return utils$1.flatten(walk(ast));
};
var expand_1 = expand;
var constants$1 = {
  MAX_LENGTH: 1024 * 64,
  CHAR_0: "0",
  CHAR_9: "9",
  CHAR_UPPERCASE_A: "A",
  CHAR_LOWERCASE_A: "a",
  CHAR_UPPERCASE_Z: "Z",
  CHAR_LOWERCASE_Z: "z",
  CHAR_LEFT_PARENTHESES: "(",
  CHAR_RIGHT_PARENTHESES: ")",
  CHAR_ASTERISK: "*",
  CHAR_AMPERSAND: "&",
  CHAR_AT: "@",
  CHAR_BACKSLASH: "\\",
  CHAR_BACKTICK: "`",
  CHAR_CARRIAGE_RETURN: "\r",
  CHAR_CIRCUMFLEX_ACCENT: "^",
  CHAR_COLON: ":",
  CHAR_COMMA: ",",
  CHAR_DOLLAR: "$",
  CHAR_DOT: ".",
  CHAR_DOUBLE_QUOTE: '"',
  CHAR_EQUAL: "=",
  CHAR_EXCLAMATION_MARK: "!",
  CHAR_FORM_FEED: "\f",
  CHAR_FORWARD_SLASH: "/",
  CHAR_HASH: "#",
  CHAR_HYPHEN_MINUS: "-",
  CHAR_LEFT_ANGLE_BRACKET: "<",
  CHAR_LEFT_CURLY_BRACE: "{",
  CHAR_LEFT_SQUARE_BRACKET: "[",
  CHAR_LINE_FEED: "\n",
  CHAR_NO_BREAK_SPACE: "\xA0",
  CHAR_PERCENT: "%",
  CHAR_PLUS: "+",
  CHAR_QUESTION_MARK: "?",
  CHAR_RIGHT_ANGLE_BRACKET: ">",
  CHAR_RIGHT_CURLY_BRACE: "}",
  CHAR_RIGHT_SQUARE_BRACKET: "]",
  CHAR_SEMICOLON: ";",
  CHAR_SINGLE_QUOTE: "'",
  CHAR_SPACE: " ",
  CHAR_TAB: "	",
  CHAR_UNDERSCORE: "_",
  CHAR_VERTICAL_LINE: "|",
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
};
const {
  MAX_LENGTH: MAX_LENGTH$1,
  CHAR_BACKSLASH,
  CHAR_BACKTICK,
  CHAR_COMMA: CHAR_COMMA$1,
  CHAR_DOT: CHAR_DOT$1,
  CHAR_LEFT_PARENTHESES: CHAR_LEFT_PARENTHESES$1,
  CHAR_RIGHT_PARENTHESES: CHAR_RIGHT_PARENTHESES$1,
  CHAR_LEFT_CURLY_BRACE: CHAR_LEFT_CURLY_BRACE$1,
  CHAR_RIGHT_CURLY_BRACE: CHAR_RIGHT_CURLY_BRACE$1,
  CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET$1,
  CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET$1,
  CHAR_DOUBLE_QUOTE,
  CHAR_SINGLE_QUOTE,
  CHAR_NO_BREAK_SPACE,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE
} = constants$1;
const parse$1 = (input, options = {}) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected a string");
  }
  let opts = options || {};
  let max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH$1, opts.maxLength) : MAX_LENGTH$1;
  if (input.length > max) {
    throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
  }
  let ast = {type: "root", input, nodes: []};
  let stack = [ast];
  let block = ast;
  let prev = ast;
  let brackets = 0;
  let length = input.length;
  let index = 0;
  let depth2 = 0;
  let value;
  const advance = () => input[index++];
  const push = (node) => {
    if (node.type === "text" && prev.type === "dot") {
      prev.type = "text";
    }
    if (prev && prev.type === "text" && node.type === "text") {
      prev.value += node.value;
      return;
    }
    block.nodes.push(node);
    node.parent = block;
    node.prev = prev;
    prev = node;
    return node;
  };
  push({type: "bos"});
  while (index < length) {
    block = stack[stack.length - 1];
    value = advance();
    if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
      continue;
    }
    if (value === CHAR_BACKSLASH) {
      push({type: "text", value: (options.keepEscaping ? value : "") + advance()});
      continue;
    }
    if (value === CHAR_RIGHT_SQUARE_BRACKET$1) {
      push({type: "text", value: "\\" + value});
      continue;
    }
    if (value === CHAR_LEFT_SQUARE_BRACKET$1) {
      brackets++;
      let next;
      while (index < length && (next = advance())) {
        value += next;
        if (next === CHAR_LEFT_SQUARE_BRACKET$1) {
          brackets++;
          continue;
        }
        if (next === CHAR_BACKSLASH) {
          value += advance();
          continue;
        }
        if (next === CHAR_RIGHT_SQUARE_BRACKET$1) {
          brackets--;
          if (brackets === 0) {
            break;
          }
        }
      }
      push({type: "text", value});
      continue;
    }
    if (value === CHAR_LEFT_PARENTHESES$1) {
      block = push({type: "paren", nodes: []});
      stack.push(block);
      push({type: "text", value});
      continue;
    }
    if (value === CHAR_RIGHT_PARENTHESES$1) {
      if (block.type !== "paren") {
        push({type: "text", value});
        continue;
      }
      block = stack.pop();
      push({type: "text", value});
      block = stack[stack.length - 1];
      continue;
    }
    if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
      let open2 = value;
      let next;
      if (options.keepQuotes !== true) {
        value = "";
      }
      while (index < length && (next = advance())) {
        if (next === CHAR_BACKSLASH) {
          value += next + advance();
          continue;
        }
        if (next === open2) {
          if (options.keepQuotes === true)
            value += next;
          break;
        }
        value += next;
      }
      push({type: "text", value});
      continue;
    }
    if (value === CHAR_LEFT_CURLY_BRACE$1) {
      depth2++;
      let dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
      let brace = {
        type: "brace",
        open: true,
        close: false,
        dollar,
        depth: depth2,
        commas: 0,
        ranges: 0,
        nodes: []
      };
      block = push(brace);
      stack.push(block);
      push({type: "open", value});
      continue;
    }
    if (value === CHAR_RIGHT_CURLY_BRACE$1) {
      if (block.type !== "brace") {
        push({type: "text", value});
        continue;
      }
      let type = "close";
      block = stack.pop();
      block.close = true;
      push({type, value});
      depth2--;
      block = stack[stack.length - 1];
      continue;
    }
    if (value === CHAR_COMMA$1 && depth2 > 0) {
      if (block.ranges > 0) {
        block.ranges = 0;
        let open2 = block.nodes.shift();
        block.nodes = [open2, {type: "text", value: stringify(block)}];
      }
      push({type: "comma", value});
      block.commas++;
      continue;
    }
    if (value === CHAR_DOT$1 && depth2 > 0 && block.commas === 0) {
      let siblings = block.nodes;
      if (depth2 === 0 || siblings.length === 0) {
        push({type: "text", value});
        continue;
      }
      if (prev.type === "dot") {
        block.range = [];
        prev.value += value;
        prev.type = "range";
        if (block.nodes.length !== 3 && block.nodes.length !== 5) {
          block.invalid = true;
          block.ranges = 0;
          prev.type = "text";
          continue;
        }
        block.ranges++;
        block.args = [];
        continue;
      }
      if (prev.type === "range") {
        siblings.pop();
        let before = siblings[siblings.length - 1];
        before.value += prev.value + value;
        prev = before;
        block.ranges--;
        continue;
      }
      push({type: "dot", value});
      continue;
    }
    push({type: "text", value});
  }
  do {
    block = stack.pop();
    if (block.type !== "root") {
      block.nodes.forEach((node) => {
        if (!node.nodes) {
          if (node.type === "open")
            node.isOpen = true;
          if (node.type === "close")
            node.isClose = true;
          if (!node.nodes)
            node.type = "text";
          node.invalid = true;
        }
      });
      let parent = stack[stack.length - 1];
      let index2 = parent.nodes.indexOf(block);
      parent.nodes.splice(index2, 1, ...block.nodes);
    }
  } while (stack.length > 0);
  push({type: "eos"});
  return ast;
};
var parse_1$1 = parse$1;
const braces = (input, options = {}) => {
  let output = [];
  if (Array.isArray(input)) {
    for (let pattern of input) {
      let result = braces.create(pattern, options);
      if (Array.isArray(result)) {
        output.push(...result);
      } else {
        output.push(result);
      }
    }
  } else {
    output = [].concat(braces.create(input, options));
  }
  if (options && options.expand === true && options.nodupes === true) {
    output = [...new Set(output)];
  }
  return output;
};
braces.parse = (input, options = {}) => parse_1$1(input, options);
braces.stringify = (input, options = {}) => {
  if (typeof input === "string") {
    return stringify(braces.parse(input, options), options);
  }
  return stringify(input, options);
};
braces.compile = (input, options = {}) => {
  if (typeof input === "string") {
    input = braces.parse(input, options);
  }
  return compile_1(input, options);
};
braces.expand = (input, options = {}) => {
  if (typeof input === "string") {
    input = braces.parse(input, options);
  }
  let result = expand_1(input, options);
  if (options.noempty === true) {
    result = result.filter(Boolean);
  }
  if (options.nodupes === true) {
    result = [...new Set(result)];
  }
  return result;
};
braces.create = (input, options = {}) => {
  if (input === "" || input.length < 3) {
    return [input];
  }
  return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
};
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_braces = braces;
var require$$0 = [
  "3dm",
  "3ds",
  "3g2",
  "3gp",
  "7z",
  "a",
  "aac",
  "adp",
  "ai",
  "aif",
  "aiff",
  "alz",
  "ape",
  "apk",
  "appimage",
  "ar",
  "arj",
  "asf",
  "au",
  "avi",
  "bak",
  "baml",
  "bh",
  "bin",
  "bk",
  "bmp",
  "btif",
  "bz2",
  "bzip2",
  "cab",
  "caf",
  "cgm",
  "class",
  "cmx",
  "cpio",
  "cr2",
  "cur",
  "dat",
  "dcm",
  "deb",
  "dex",
  "djvu",
  "dll",
  "dmg",
  "dng",
  "doc",
  "docm",
  "docx",
  "dot",
  "dotm",
  "dra",
  "DS_Store",
  "dsk",
  "dts",
  "dtshd",
  "dvb",
  "dwg",
  "dxf",
  "ecelp4800",
  "ecelp7470",
  "ecelp9600",
  "egg",
  "eol",
  "eot",
  "epub",
  "exe",
  "f4v",
  "fbs",
  "fh",
  "fla",
  "flac",
  "flatpak",
  "fli",
  "flv",
  "fpx",
  "fst",
  "fvt",
  "g3",
  "gh",
  "gif",
  "graffle",
  "gz",
  "gzip",
  "h261",
  "h263",
  "h264",
  "icns",
  "ico",
  "ief",
  "img",
  "ipa",
  "iso",
  "jar",
  "jpeg",
  "jpg",
  "jpgv",
  "jpm",
  "jxr",
  "key",
  "ktx",
  "lha",
  "lib",
  "lvp",
  "lz",
  "lzh",
  "lzma",
  "lzo",
  "m3u",
  "m4a",
  "m4v",
  "mar",
  "mdi",
  "mht",
  "mid",
  "midi",
  "mj2",
  "mka",
  "mkv",
  "mmr",
  "mng",
  "mobi",
  "mov",
  "movie",
  "mp3",
  "mp4",
  "mp4a",
  "mpeg",
  "mpg",
  "mpga",
  "mxu",
  "nef",
  "npx",
  "numbers",
  "nupkg",
  "o",
  "oga",
  "ogg",
  "ogv",
  "otf",
  "pages",
  "pbm",
  "pcx",
  "pdb",
  "pdf",
  "pea",
  "pgm",
  "pic",
  "png",
  "pnm",
  "pot",
  "potm",
  "potx",
  "ppa",
  "ppam",
  "ppm",
  "pps",
  "ppsm",
  "ppsx",
  "ppt",
  "pptm",
  "pptx",
  "psd",
  "pya",
  "pyc",
  "pyo",
  "pyv",
  "qt",
  "rar",
  "ras",
  "raw",
  "resources",
  "rgb",
  "rip",
  "rlc",
  "rmf",
  "rmvb",
  "rpm",
  "rtf",
  "rz",
  "s3m",
  "s7z",
  "scpt",
  "sgi",
  "shar",
  "snap",
  "sil",
  "sketch",
  "slk",
  "smv",
  "snk",
  "so",
  "stl",
  "suo",
  "sub",
  "swf",
  "tar",
  "tbz",
  "tbz2",
  "tga",
  "tgz",
  "thmx",
  "tif",
  "tiff",
  "tlz",
  "ttc",
  "ttf",
  "txz",
  "udf",
  "uvh",
  "uvi",
  "uvm",
  "uvp",
  "uvs",
  "uvu",
  "viv",
  "vob",
  "war",
  "wav",
  "wax",
  "wbmp",
  "wdp",
  "weba",
  "webm",
  "webp",
  "whl",
  "wim",
  "wm",
  "wma",
  "wmv",
  "wmx",
  "woff",
  "woff2",
  "wrm",
  "wvx",
  "xbm",
  "xif",
  "xla",
  "xlam",
  "xls",
  "xlsb",
  "xlsm",
  "xlsx",
  "xlt",
  "xltm",
  "xltx",
  "xm",
  "xmind",
  "xpi",
  "xpm",
  "xwd",
  "xz",
  "z",
  "zip",
  "zipx"
];
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_binaryExtensions = require$$0;
const extensions = new Set(H__ElectronProject_Electron_Vue_electronVueVite_node_modules_binaryExtensions);
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isBinaryPath = (filePath) => extensions.has(sysPath__default["default"].extname(filePath).slice(1).toLowerCase());
var constants$2 = createCommonjsModule(function(module, exports) {
  const {sep} = sysPath__default["default"];
  const {platform} = process;
  exports.EV_ALL = "all";
  exports.EV_READY = "ready";
  exports.EV_ADD = "add";
  exports.EV_CHANGE = "change";
  exports.EV_ADD_DIR = "addDir";
  exports.EV_UNLINK = "unlink";
  exports.EV_UNLINK_DIR = "unlinkDir";
  exports.EV_RAW = "raw";
  exports.EV_ERROR = "error";
  exports.STR_DATA = "data";
  exports.STR_END = "end";
  exports.STR_CLOSE = "close";
  exports.FSEVENT_CREATED = "created";
  exports.FSEVENT_MODIFIED = "modified";
  exports.FSEVENT_DELETED = "deleted";
  exports.FSEVENT_MOVED = "moved";
  exports.FSEVENT_CLONED = "cloned";
  exports.FSEVENT_UNKNOWN = "unknown";
  exports.FSEVENT_TYPE_FILE = "file";
  exports.FSEVENT_TYPE_DIRECTORY = "directory";
  exports.FSEVENT_TYPE_SYMLINK = "symlink";
  exports.KEY_LISTENERS = "listeners";
  exports.KEY_ERR = "errHandlers";
  exports.KEY_RAW = "rawEmitters";
  exports.HANDLER_KEYS = [exports.KEY_LISTENERS, exports.KEY_ERR, exports.KEY_RAW];
  exports.DOT_SLASH = `.${sep}`;
  exports.BACK_SLASH_RE = /\\/g;
  exports.DOUBLE_SLASH_RE = /\/\//;
  exports.SLASH_OR_BACK_SLASH_RE = /[/\\]/;
  exports.DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
  exports.REPLACER_RE = /^\.[/\\]/;
  exports.SLASH = "/";
  exports.SLASH_SLASH = "//";
  exports.BRACE_START = "{";
  exports.BANG = "!";
  exports.ONE_DOT = ".";
  exports.TWO_DOTS = "..";
  exports.STAR = "*";
  exports.GLOBSTAR = "**";
  exports.ROOT_GLOBSTAR = "/**/*";
  exports.SLASH_GLOBSTAR = "/**";
  exports.DIR_SUFFIX = "Dir";
  exports.ANYMATCH_OPTS = {dot: true};
  exports.STRING_TYPE = "string";
  exports.FUNCTION_TYPE = "function";
  exports.EMPTY_STR = "";
  exports.EMPTY_FN = () => {
  };
  exports.IDENTITY_FN = (val) => val;
  exports.isWindows = platform === "win32";
  exports.isMacos = platform === "darwin";
  exports.isLinux = platform === "linux";
});
const {promisify: promisify$1} = require$$0__default["default"];
const {
  isWindows,
  isLinux,
  EMPTY_FN,
  EMPTY_STR,
  KEY_LISTENERS,
  KEY_ERR,
  KEY_RAW,
  HANDLER_KEYS,
  EV_CHANGE,
  EV_ADD,
  EV_ADD_DIR,
  EV_ERROR,
  STR_DATA,
  STR_END,
  BRACE_START,
  STAR: STAR$1
} = constants$2;
const THROTTLE_MODE_WATCH = "watch";
const open = promisify$1(fs__default["default"].open);
const stat$1 = promisify$1(fs__default["default"].stat);
const lstat$1 = promisify$1(fs__default["default"].lstat);
const close = promisify$1(fs__default["default"].close);
const fsrealpath = promisify$1(fs__default["default"].realpath);
const statMethods = {lstat: lstat$1, stat: stat$1};
const foreach = (val, fn) => {
  if (val instanceof Set) {
    val.forEach(fn);
  } else {
    fn(val);
  }
};
const addAndConvert = (main, prop, item) => {
  let container = main[prop];
  if (!(container instanceof Set)) {
    main[prop] = container = new Set([container]);
  }
  container.add(item);
};
const clearItem = (cont) => (key) => {
  const set = cont[key];
  if (set instanceof Set) {
    set.clear();
  } else {
    delete cont[key];
  }
};
const delFromSet = (main, prop, item) => {
  const container = main[prop];
  if (container instanceof Set) {
    container.delete(item);
  } else if (container === item) {
    delete main[prop];
  }
};
const isEmptySet = (val) => val instanceof Set ? val.size === 0 : !val;
const FsWatchInstances = new Map();
function createFsWatchInstance(path, options, listener, errHandler, emitRaw) {
  const handleEvent = (rawEvent, evPath) => {
    listener(path);
    emitRaw(rawEvent, evPath, {watchedPath: path});
    if (evPath && path !== evPath) {
      fsWatchBroadcast(sysPath__default["default"].resolve(path, evPath), KEY_LISTENERS, sysPath__default["default"].join(path, evPath));
    }
  };
  try {
    return fs__default["default"].watch(path, options, handleEvent);
  } catch (error) {
    errHandler(error);
  }
}
const fsWatchBroadcast = (fullPath, type, val1, val2, val3) => {
  const cont = FsWatchInstances.get(fullPath);
  if (!cont)
    return;
  foreach(cont[type], (listener) => {
    listener(val1, val2, val3);
  });
};
const setFsWatchListener = (path, fullPath, options, handlers) => {
  const {listener, errHandler, rawEmitter} = handlers;
  let cont = FsWatchInstances.get(fullPath);
  let watcher2;
  if (!options.persistent) {
    watcher2 = createFsWatchInstance(path, options, listener, errHandler, rawEmitter);
    return watcher2.close.bind(watcher2);
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_ERR, errHandler);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    watcher2 = createFsWatchInstance(path, options, fsWatchBroadcast.bind(null, fullPath, KEY_LISTENERS), errHandler, fsWatchBroadcast.bind(null, fullPath, KEY_RAW));
    if (!watcher2)
      return;
    watcher2.on(EV_ERROR, async (error) => {
      const broadcastErr = fsWatchBroadcast.bind(null, fullPath, KEY_ERR);
      cont.watcherUnusable = true;
      if (isWindows && error.code === "EPERM") {
        try {
          const fd = await open(path, "r");
          await close(fd);
          broadcastErr(error);
        } catch (err) {
        }
      } else {
        broadcastErr(error);
      }
    });
    cont = {
      listeners: listener,
      errHandlers: errHandler,
      rawEmitters: rawEmitter,
      watcher: watcher2
    };
    FsWatchInstances.set(fullPath, cont);
  }
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_ERR, errHandler);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      cont.watcher.close();
      FsWatchInstances.delete(fullPath);
      HANDLER_KEYS.forEach(clearItem(cont));
      cont.watcher = void 0;
      Object.freeze(cont);
    }
  };
};
const FsWatchFileInstances = new Map();
const setFsWatchFileListener = (path, fullPath, options, handlers) => {
  const {listener, rawEmitter} = handlers;
  let cont = FsWatchFileInstances.get(fullPath);
  const copts = cont && cont.options;
  if (copts && (copts.persistent < options.persistent || copts.interval > options.interval)) {
    cont.listeners;
    cont.rawEmitters;
    fs__default["default"].unwatchFile(fullPath);
    cont = void 0;
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    cont = {
      listeners: listener,
      rawEmitters: rawEmitter,
      options,
      watcher: fs__default["default"].watchFile(fullPath, options, (curr, prev) => {
        foreach(cont.rawEmitters, (rawEmitter2) => {
          rawEmitter2(EV_CHANGE, fullPath, {curr, prev});
        });
        const currmtime = curr.mtimeMs;
        if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
          foreach(cont.listeners, (listener2) => listener2(path, curr));
        }
      })
    };
    FsWatchFileInstances.set(fullPath, cont);
  }
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      FsWatchFileInstances.delete(fullPath);
      fs__default["default"].unwatchFile(fullPath);
      cont.options = cont.watcher = void 0;
      Object.freeze(cont);
    }
  };
};
class NodeFsHandler {
  constructor(fsW) {
    this.fsw = fsW;
    this._boundHandleError = (error) => fsW._handleError(error);
  }
  _watchWithNodeFs(path, listener) {
    const opts = this.fsw.options;
    const directory = sysPath__default["default"].dirname(path);
    const basename = sysPath__default["default"].basename(path);
    const parent = this.fsw._getWatchedDir(directory);
    parent.add(basename);
    const absolutePath = sysPath__default["default"].resolve(path);
    const options = {persistent: opts.persistent};
    if (!listener)
      listener = EMPTY_FN;
    let closer;
    if (opts.usePolling) {
      options.interval = opts.enableBinaryInterval && H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isBinaryPath(basename) ? opts.binaryInterval : opts.interval;
      closer = setFsWatchFileListener(path, absolutePath, options, {
        listener,
        rawEmitter: this.fsw._emitRaw
      });
    } else {
      closer = setFsWatchListener(path, absolutePath, options, {
        listener,
        errHandler: this._boundHandleError,
        rawEmitter: this.fsw._emitRaw
      });
    }
    return closer;
  }
  _handleFile(file, stats, initialAdd) {
    if (this.fsw.closed) {
      return;
    }
    const dirname = sysPath__default["default"].dirname(file);
    const basename = sysPath__default["default"].basename(file);
    const parent = this.fsw._getWatchedDir(dirname);
    let prevStats = stats;
    if (parent.has(basename))
      return;
    const listener = async (path, newStats) => {
      if (!this.fsw._throttle(THROTTLE_MODE_WATCH, file, 5))
        return;
      if (!newStats || newStats.mtimeMs === 0) {
        try {
          const newStats2 = await stat$1(file);
          if (this.fsw.closed)
            return;
          const at = newStats2.atimeMs;
          const mt = newStats2.mtimeMs;
          if (!at || at <= mt || mt !== prevStats.mtimeMs) {
            this.fsw._emit(EV_CHANGE, file, newStats2);
          }
          if (isLinux && prevStats.ino !== newStats2.ino) {
            this.fsw._closeFile(path);
            prevStats = newStats2;
            this.fsw._addPathCloser(path, this._watchWithNodeFs(file, listener));
          } else {
            prevStats = newStats2;
          }
        } catch (error) {
          this.fsw._remove(dirname, basename);
        }
      } else if (parent.has(basename)) {
        const at = newStats.atimeMs;
        const mt = newStats.mtimeMs;
        if (!at || at <= mt || mt !== prevStats.mtimeMs) {
          this.fsw._emit(EV_CHANGE, file, newStats);
        }
        prevStats = newStats;
      }
    };
    const closer = this._watchWithNodeFs(file, listener);
    if (!(initialAdd && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(file)) {
      if (!this.fsw._throttle(EV_ADD, file, 0))
        return;
      this.fsw._emit(EV_ADD, file, stats);
    }
    return closer;
  }
  async _handleSymlink(entry, directory, path, item) {
    if (this.fsw.closed) {
      return;
    }
    const full = entry.fullPath;
    const dir = this.fsw._getWatchedDir(directory);
    if (!this.fsw.options.followSymlinks) {
      this.fsw._incrReadyCount();
      const linkPath = await fsrealpath(path);
      if (this.fsw.closed)
        return;
      if (dir.has(item)) {
        if (this.fsw._symlinkPaths.get(full) !== linkPath) {
          this.fsw._symlinkPaths.set(full, linkPath);
          this.fsw._emit(EV_CHANGE, path, entry.stats);
        }
      } else {
        dir.add(item);
        this.fsw._symlinkPaths.set(full, linkPath);
        this.fsw._emit(EV_ADD, path, entry.stats);
      }
      this.fsw._emitReady();
      return true;
    }
    if (this.fsw._symlinkPaths.has(full)) {
      return true;
    }
    this.fsw._symlinkPaths.set(full, true);
  }
  _handleRead(directory, initialAdd, wh, target, dir, depth2, throttler) {
    directory = sysPath__default["default"].join(directory, EMPTY_STR);
    if (!wh.hasGlob) {
      throttler = this.fsw._throttle("readdir", directory, 1e3);
      if (!throttler)
        return;
    }
    const previous = this.fsw._getWatchedDir(wh.path);
    const current = new Set();
    let stream = this.fsw._readdirp(directory, {
      fileFilter: (entry) => wh.filterPath(entry),
      directoryFilter: (entry) => wh.filterDir(entry),
      depth: 0
    }).on(STR_DATA, async (entry) => {
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      const item = entry.path;
      let path = sysPath__default["default"].join(directory, item);
      current.add(item);
      if (entry.stats.isSymbolicLink() && await this._handleSymlink(entry, directory, path, item)) {
        return;
      }
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      if (item === target || !target && !previous.has(item)) {
        this.fsw._incrReadyCount();
        path = sysPath__default["default"].join(dir, sysPath__default["default"].relative(dir, path));
        this._addToNodeFs(path, initialAdd, wh, depth2 + 1);
      }
    }).on(EV_ERROR, this._boundHandleError);
    return new Promise((resolve) => stream.once(STR_END, () => {
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      const wasThrottled = throttler ? throttler.clear() : false;
      resolve();
      previous.getChildren().filter((item) => {
        return item !== directory && !current.has(item) && (!wh.hasGlob || wh.filterPath({
          fullPath: sysPath__default["default"].resolve(directory, item)
        }));
      }).forEach((item) => {
        this.fsw._remove(directory, item);
      });
      stream = void 0;
      if (wasThrottled)
        this._handleRead(directory, false, wh, target, dir, depth2, throttler);
    }));
  }
  async _handleDir(dir, stats, initialAdd, depth2, target, wh, realpath2) {
    const parentDir = this.fsw._getWatchedDir(sysPath__default["default"].dirname(dir));
    const tracked = parentDir.has(sysPath__default["default"].basename(dir));
    if (!(initialAdd && this.fsw.options.ignoreInitial) && !target && !tracked) {
      if (!wh.hasGlob || wh.globFilter(dir))
        this.fsw._emit(EV_ADD_DIR, dir, stats);
    }
    parentDir.add(sysPath__default["default"].basename(dir));
    this.fsw._getWatchedDir(dir);
    let throttler;
    let closer;
    const oDepth = this.fsw.options.depth;
    if ((oDepth == null || depth2 <= oDepth) && !this.fsw._symlinkPaths.has(realpath2)) {
      if (!target) {
        await this._handleRead(dir, initialAdd, wh, target, dir, depth2, throttler);
        if (this.fsw.closed)
          return;
      }
      closer = this._watchWithNodeFs(dir, (dirPath, stats2) => {
        if (stats2 && stats2.mtimeMs === 0)
          return;
        this._handleRead(dirPath, false, wh, target, dir, depth2, throttler);
      });
    }
    return closer;
  }
  async _addToNodeFs(path, initialAdd, priorWh, depth2, target) {
    const ready = this.fsw._emitReady;
    if (this.fsw._isIgnored(path) || this.fsw.closed) {
      ready();
      return false;
    }
    const wh = this.fsw._getWatchHelpers(path, depth2);
    if (!wh.hasGlob && priorWh) {
      wh.hasGlob = priorWh.hasGlob;
      wh.globFilter = priorWh.globFilter;
      wh.filterPath = (entry) => priorWh.filterPath(entry);
      wh.filterDir = (entry) => priorWh.filterDir(entry);
    }
    try {
      const stats = await statMethods[wh.statMethod](wh.watchPath);
      if (this.fsw.closed)
        return;
      if (this.fsw._isIgnored(wh.watchPath, stats)) {
        ready();
        return false;
      }
      const follow = this.fsw.options.followSymlinks && !path.includes(STAR$1) && !path.includes(BRACE_START);
      let closer;
      if (stats.isDirectory()) {
        const absPath = sysPath__default["default"].resolve(path);
        const targetPath = follow ? await fsrealpath(path) : path;
        if (this.fsw.closed)
          return;
        closer = await this._handleDir(wh.watchPath, stats, initialAdd, depth2, target, wh, targetPath);
        if (this.fsw.closed)
          return;
        if (absPath !== targetPath && targetPath !== void 0) {
          this.fsw._symlinkPaths.set(absPath, targetPath);
        }
      } else if (stats.isSymbolicLink()) {
        const targetPath = follow ? await fsrealpath(path) : path;
        if (this.fsw.closed)
          return;
        const parent = sysPath__default["default"].dirname(wh.watchPath);
        this.fsw._getWatchedDir(parent).add(wh.watchPath);
        this.fsw._emit(EV_ADD, wh.watchPath, stats);
        closer = await this._handleDir(parent, stats, initialAdd, depth2, path, wh, targetPath);
        if (this.fsw.closed)
          return;
        if (targetPath !== void 0) {
          this.fsw._symlinkPaths.set(sysPath__default["default"].resolve(path), targetPath);
        }
      } else {
        closer = this._handleFile(wh.watchPath, stats, initialAdd);
      }
      ready();
      this.fsw._addPathCloser(path, closer);
      return false;
    } catch (error) {
      if (this.fsw._handleError(error)) {
        ready();
        return path;
      }
    }
  }
}
var nodefsHandler = NodeFsHandler;
const {promisify: promisify$2} = require$$0__default["default"];
let fsevents;
try {
  fsevents = require$$1__default$1["default"];
} catch (error) {
}
if (fsevents) {
  const mtch = process.version.match(/v(\d+)\.(\d+)/);
  if (mtch && mtch[1] && mtch[2]) {
    const maj = Number.parseInt(mtch[1], 10);
    const min = Number.parseInt(mtch[2], 10);
    if (maj === 8 && min < 16) {
      fsevents = void 0;
    }
  }
}
const {
  EV_ADD: EV_ADD$1,
  EV_CHANGE: EV_CHANGE$1,
  EV_ADD_DIR: EV_ADD_DIR$1,
  EV_UNLINK,
  EV_ERROR: EV_ERROR$1,
  STR_DATA: STR_DATA$1,
  STR_END: STR_END$1,
  FSEVENT_CREATED,
  FSEVENT_MODIFIED,
  FSEVENT_DELETED,
  FSEVENT_MOVED,
  FSEVENT_UNKNOWN,
  FSEVENT_TYPE_FILE,
  FSEVENT_TYPE_DIRECTORY,
  FSEVENT_TYPE_SYMLINK,
  ROOT_GLOBSTAR,
  DIR_SUFFIX,
  DOT_SLASH,
  FUNCTION_TYPE,
  EMPTY_FN: EMPTY_FN$1,
  IDENTITY_FN
} = constants$2;
const Depth = (value) => isNaN(value) ? {} : {depth: value};
const stat$2 = promisify$2(fs__default["default"].stat);
const lstat$2 = promisify$2(fs__default["default"].lstat);
const realpath$1 = promisify$2(fs__default["default"].realpath);
const statMethods$1 = {stat: stat$2, lstat: lstat$2};
const FSEventsWatchers = new Map();
const consolidateThreshhold = 10;
const wrongEventFlags = new Set([
  69888,
  70400,
  71424,
  72704,
  73472,
  131328,
  131840,
  262912
]);
const createFSEventsInstance = (path, callback) => {
  const stop = fsevents.watch(path, callback);
  return {stop};
};
function setFSEventsListener(path, realPath, listener, rawEmitter) {
  let watchPath = sysPath__default["default"].extname(path) ? sysPath__default["default"].dirname(path) : path;
  const parentPath = sysPath__default["default"].dirname(watchPath);
  let cont = FSEventsWatchers.get(watchPath);
  if (couldConsolidate(parentPath)) {
    watchPath = parentPath;
  }
  const resolvedPath = sysPath__default["default"].resolve(path);
  const hasSymlink = resolvedPath !== realPath;
  const filteredListener = (fullPath, flags, info) => {
    if (hasSymlink)
      fullPath = fullPath.replace(realPath, resolvedPath);
    if (fullPath === resolvedPath || !fullPath.indexOf(resolvedPath + sysPath__default["default"].sep))
      listener(fullPath, flags, info);
  };
  let watchedParent = false;
  for (const watchedPath of FSEventsWatchers.keys()) {
    if (realPath.indexOf(sysPath__default["default"].resolve(watchedPath) + sysPath__default["default"].sep) === 0) {
      watchPath = watchedPath;
      cont = FSEventsWatchers.get(watchPath);
      watchedParent = true;
      break;
    }
  }
  if (cont || watchedParent) {
    cont.listeners.add(filteredListener);
  } else {
    cont = {
      listeners: new Set([filteredListener]),
      rawEmitter,
      watcher: createFSEventsInstance(watchPath, (fullPath, flags) => {
        if (!cont.listeners.size)
          return;
        const info = fsevents.getInfo(fullPath, flags);
        cont.listeners.forEach((list) => {
          list(fullPath, flags, info);
        });
        cont.rawEmitter(info.event, fullPath, info);
      })
    };
    FSEventsWatchers.set(watchPath, cont);
  }
  return () => {
    const lst = cont.listeners;
    lst.delete(filteredListener);
    if (!lst.size) {
      FSEventsWatchers.delete(watchPath);
      if (cont.watcher)
        return cont.watcher.stop().then(() => {
          cont.rawEmitter = cont.watcher = void 0;
          Object.freeze(cont);
        });
    }
  };
}
const couldConsolidate = (path) => {
  let count = 0;
  for (const watchPath of FSEventsWatchers.keys()) {
    if (watchPath.indexOf(path) === 0) {
      count++;
      if (count >= consolidateThreshhold) {
        return true;
      }
    }
  }
  return false;
};
const canUse = () => fsevents && FSEventsWatchers.size < 128;
const calcDepth = (path, root) => {
  let i = 0;
  while (!path.indexOf(root) && (path = sysPath__default["default"].dirname(path)) !== root)
    i++;
  return i;
};
const sameTypes = (info, stats) => info.type === FSEVENT_TYPE_DIRECTORY && stats.isDirectory() || info.type === FSEVENT_TYPE_SYMLINK && stats.isSymbolicLink() || info.type === FSEVENT_TYPE_FILE && stats.isFile();
class FsEventsHandler {
  constructor(fsw) {
    this.fsw = fsw;
  }
  checkIgnored(path, stats) {
    const ipaths = this.fsw._ignoredPaths;
    if (this.fsw._isIgnored(path, stats)) {
      ipaths.add(path);
      if (stats && stats.isDirectory()) {
        ipaths.add(path + ROOT_GLOBSTAR);
      }
      return true;
    }
    ipaths.delete(path);
    ipaths.delete(path + ROOT_GLOBSTAR);
  }
  addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts) {
    const event = watchedDir.has(item) ? EV_CHANGE$1 : EV_ADD$1;
    this.handleEvent(event, path, fullPath, realPath, parent, watchedDir, item, info, opts);
  }
  async checkExists(path, fullPath, realPath, parent, watchedDir, item, info, opts) {
    try {
      const stats = await stat$2(path);
      if (this.fsw.closed)
        return;
      if (sameTypes(info, stats)) {
        this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
      } else {
        this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info, opts);
      }
    } catch (error) {
      if (error.code === "EACCES") {
        this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
      } else {
        this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info, opts);
      }
    }
  }
  handleEvent(event, path, fullPath, realPath, parent, watchedDir, item, info, opts) {
    if (this.fsw.closed || this.checkIgnored(path))
      return;
    if (event === EV_UNLINK) {
      const isDirectory = info.type === FSEVENT_TYPE_DIRECTORY;
      if (isDirectory || watchedDir.has(item)) {
        this.fsw._remove(parent, item, isDirectory);
      }
    } else {
      if (event === EV_ADD$1) {
        if (info.type === FSEVENT_TYPE_DIRECTORY)
          this.fsw._getWatchedDir(path);
        if (info.type === FSEVENT_TYPE_SYMLINK && opts.followSymlinks) {
          const curDepth = opts.depth === void 0 ? void 0 : calcDepth(fullPath, realPath) + 1;
          return this._addToFsEvents(path, false, true, curDepth);
        }
        this.fsw._getWatchedDir(parent).add(item);
      }
      const eventName = info.type === FSEVENT_TYPE_DIRECTORY ? event + DIR_SUFFIX : event;
      this.fsw._emit(eventName, path);
      if (eventName === EV_ADD_DIR$1)
        this._addToFsEvents(path, false, true);
    }
  }
  _watchWithFsEvents(watchPath, realPath, transform2, globFilter) {
    if (this.fsw.closed || this.fsw._isIgnored(watchPath))
      return;
    const opts = this.fsw.options;
    const watchCallback = async (fullPath, flags, info) => {
      if (this.fsw.closed)
        return;
      if (opts.depth !== void 0 && calcDepth(fullPath, realPath) > opts.depth)
        return;
      const path = transform2(sysPath__default["default"].join(watchPath, sysPath__default["default"].relative(watchPath, fullPath)));
      if (globFilter && !globFilter(path))
        return;
      const parent = sysPath__default["default"].dirname(path);
      const item = sysPath__default["default"].basename(path);
      const watchedDir = this.fsw._getWatchedDir(info.type === FSEVENT_TYPE_DIRECTORY ? path : parent);
      if (wrongEventFlags.has(flags) || info.event === FSEVENT_UNKNOWN) {
        if (typeof opts.ignored === FUNCTION_TYPE) {
          let stats;
          try {
            stats = await stat$2(path);
          } catch (error) {
          }
          if (this.fsw.closed)
            return;
          if (this.checkIgnored(path, stats))
            return;
          if (sameTypes(info, stats)) {
            this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
          } else {
            this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info, opts);
          }
        } else {
          this.checkExists(path, fullPath, realPath, parent, watchedDir, item, info, opts);
        }
      } else {
        switch (info.event) {
          case FSEVENT_CREATED:
          case FSEVENT_MODIFIED:
            return this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
          case FSEVENT_DELETED:
          case FSEVENT_MOVED:
            return this.checkExists(path, fullPath, realPath, parent, watchedDir, item, info, opts);
        }
      }
    };
    const closer = setFSEventsListener(watchPath, realPath, watchCallback, this.fsw._emitRaw);
    this.fsw._emitReady();
    return closer;
  }
  async _handleFsEventsSymlink(linkPath, fullPath, transform2, curDepth) {
    if (this.fsw.closed || this.fsw._symlinkPaths.has(fullPath))
      return;
    this.fsw._symlinkPaths.set(fullPath, true);
    this.fsw._incrReadyCount();
    try {
      const linkTarget = await realpath$1(linkPath);
      if (this.fsw.closed)
        return;
      if (this.fsw._isIgnored(linkTarget)) {
        return this.fsw._emitReady();
      }
      this.fsw._incrReadyCount();
      this._addToFsEvents(linkTarget || linkPath, (path) => {
        let aliasedPath = linkPath;
        if (linkTarget && linkTarget !== DOT_SLASH) {
          aliasedPath = path.replace(linkTarget, linkPath);
        } else if (path !== DOT_SLASH) {
          aliasedPath = sysPath__default["default"].join(linkPath, path);
        }
        return transform2(aliasedPath);
      }, false, curDepth);
    } catch (error) {
      if (this.fsw._handleError(error)) {
        return this.fsw._emitReady();
      }
    }
  }
  emitAdd(newPath, stats, processPath, opts, forceAdd) {
    const pp = processPath(newPath);
    const isDir = stats.isDirectory();
    const dirObj = this.fsw._getWatchedDir(sysPath__default["default"].dirname(pp));
    const base = sysPath__default["default"].basename(pp);
    if (isDir)
      this.fsw._getWatchedDir(pp);
    if (dirObj.has(base))
      return;
    dirObj.add(base);
    if (!opts.ignoreInitial || forceAdd === true) {
      this.fsw._emit(isDir ? EV_ADD_DIR$1 : EV_ADD$1, pp, stats);
    }
  }
  initWatch(realPath, path, wh, processPath) {
    if (this.fsw.closed)
      return;
    const closer = this._watchWithFsEvents(wh.watchPath, sysPath__default["default"].resolve(realPath || wh.watchPath), processPath, wh.globFilter);
    this.fsw._addPathCloser(path, closer);
  }
  async _addToFsEvents(path, transform2, forceAdd, priorDepth) {
    if (this.fsw.closed) {
      return;
    }
    const opts = this.fsw.options;
    const processPath = typeof transform2 === FUNCTION_TYPE ? transform2 : IDENTITY_FN;
    const wh = this.fsw._getWatchHelpers(path);
    try {
      const stats = await statMethods$1[wh.statMethod](wh.watchPath);
      if (this.fsw.closed)
        return;
      if (this.fsw._isIgnored(wh.watchPath, stats)) {
        throw null;
      }
      if (stats.isDirectory()) {
        if (!wh.globFilter)
          this.emitAdd(processPath(path), stats, processPath, opts, forceAdd);
        if (priorDepth && priorDepth > opts.depth)
          return;
        this.fsw._readdirp(wh.watchPath, {
          fileFilter: (entry) => wh.filterPath(entry),
          directoryFilter: (entry) => wh.filterDir(entry),
          ...Depth(opts.depth - (priorDepth || 0))
        }).on(STR_DATA$1, (entry) => {
          if (this.fsw.closed) {
            return;
          }
          if (entry.stats.isDirectory() && !wh.filterPath(entry))
            return;
          const joinedPath = sysPath__default["default"].join(wh.watchPath, entry.path);
          const {fullPath} = entry;
          if (wh.followSymlinks && entry.stats.isSymbolicLink()) {
            const curDepth = opts.depth === void 0 ? void 0 : calcDepth(joinedPath, sysPath__default["default"].resolve(wh.watchPath)) + 1;
            this._handleFsEventsSymlink(joinedPath, fullPath, processPath, curDepth);
          } else {
            this.emitAdd(joinedPath, entry.stats, processPath, opts, forceAdd);
          }
        }).on(EV_ERROR$1, EMPTY_FN$1).on(STR_END$1, () => {
          this.fsw._emitReady();
        });
      } else {
        this.emitAdd(wh.watchPath, stats, processPath, opts, forceAdd);
        this.fsw._emitReady();
      }
    } catch (error) {
      if (!error || this.fsw._handleError(error)) {
        this.fsw._emitReady();
        this.fsw._emitReady();
      }
    }
    if (opts.persistent && forceAdd !== true) {
      if (typeof transform2 === FUNCTION_TYPE) {
        this.initWatch(void 0, path, wh, processPath);
      } else {
        let realPath;
        try {
          realPath = await realpath$1(wh.watchPath);
        } catch (e) {
        }
        this.initWatch(realPath, path, wh, processPath);
      }
    }
  }
}
var fseventsHandler = FsEventsHandler;
var canUse_1 = canUse;
fseventsHandler.canUse = canUse_1;
const {EventEmitter} = require$$0__default$2["default"];
const {promisify: promisify$3} = require$$0__default["default"];
const anymatch$1 = H__ElectronProject_Electron_Vue_electronVueVite_node_modules_anymatch.default;
const {
  EV_ALL,
  EV_READY,
  EV_ADD: EV_ADD$2,
  EV_CHANGE: EV_CHANGE$2,
  EV_UNLINK: EV_UNLINK$1,
  EV_ADD_DIR: EV_ADD_DIR$2,
  EV_UNLINK_DIR,
  EV_RAW,
  EV_ERROR: EV_ERROR$2,
  STR_CLOSE,
  STR_END: STR_END$2,
  BACK_SLASH_RE,
  DOUBLE_SLASH_RE,
  SLASH_OR_BACK_SLASH_RE,
  DOT_RE,
  REPLACER_RE,
  SLASH,
  SLASH_SLASH,
  BRACE_START: BRACE_START$1,
  BANG: BANG$2,
  ONE_DOT,
  TWO_DOTS,
  GLOBSTAR,
  SLASH_GLOBSTAR,
  ANYMATCH_OPTS,
  STRING_TYPE,
  FUNCTION_TYPE: FUNCTION_TYPE$1,
  EMPTY_STR: EMPTY_STR$1,
  EMPTY_FN: EMPTY_FN$2,
  isWindows: isWindows$1,
  isMacos
} = constants$2;
const stat$3 = promisify$3(fs__default["default"].stat);
const readdir$1 = promisify$3(fs__default["default"].readdir);
const arrify$1 = (value = []) => Array.isArray(value) ? value : [value];
const flatten = (list, result = []) => {
  list.forEach((item) => {
    if (Array.isArray(item)) {
      flatten(item, result);
    } else {
      result.push(item);
    }
  });
  return result;
};
const unifyPaths = (paths_) => {
  const paths = flatten(arrify$1(paths_));
  if (!paths.every((p) => typeof p === STRING_TYPE)) {
    throw new TypeError(`Non-string provided as watch path: ${paths}`);
  }
  return paths.map(normalizePathToUnix);
};
const toUnix = (string) => {
  let str = string.replace(BACK_SLASH_RE, SLASH);
  let prepend = false;
  if (str.startsWith(SLASH_SLASH)) {
    prepend = true;
  }
  while (str.match(DOUBLE_SLASH_RE)) {
    str = str.replace(DOUBLE_SLASH_RE, SLASH);
  }
  if (prepend) {
    str = SLASH + str;
  }
  return str;
};
const normalizePathToUnix = (path) => toUnix(sysPath__default["default"].normalize(toUnix(path)));
const normalizeIgnored = (cwd = EMPTY_STR$1) => (path) => {
  if (typeof path !== STRING_TYPE)
    return path;
  return normalizePathToUnix(sysPath__default["default"].isAbsolute(path) ? path : sysPath__default["default"].join(cwd, path));
};
const getAbsolutePath = (path, cwd) => {
  if (sysPath__default["default"].isAbsolute(path)) {
    return path;
  }
  if (path.startsWith(BANG$2)) {
    return BANG$2 + sysPath__default["default"].join(cwd, path.slice(1));
  }
  return sysPath__default["default"].join(cwd, path);
};
const undef = (opts, key) => opts[key] === void 0;
class DirEntry {
  constructor(dir, removeWatcher) {
    this.path = dir;
    this._removeWatcher = removeWatcher;
    this.items = new Set();
  }
  add(item) {
    const {items} = this;
    if (!items)
      return;
    if (item !== ONE_DOT && item !== TWO_DOTS)
      items.add(item);
  }
  async remove(item) {
    const {items} = this;
    if (!items)
      return;
    items.delete(item);
    if (items.size > 0)
      return;
    const dir = this.path;
    try {
      await readdir$1(dir);
    } catch (err) {
      if (this._removeWatcher) {
        this._removeWatcher(sysPath__default["default"].dirname(dir), sysPath__default["default"].basename(dir));
      }
    }
  }
  has(item) {
    const {items} = this;
    if (!items)
      return;
    return items.has(item);
  }
  getChildren() {
    const {items} = this;
    if (!items)
      return;
    return [...items.values()];
  }
  dispose() {
    this.items.clear();
    delete this.path;
    delete this._removeWatcher;
    delete this.items;
    Object.freeze(this);
  }
}
const STAT_METHOD_F = "stat";
const STAT_METHOD_L = "lstat";
class WatchHelper {
  constructor(path, watchPath, follow, fsw) {
    this.fsw = fsw;
    this.path = path = path.replace(REPLACER_RE, EMPTY_STR$1);
    this.watchPath = watchPath;
    this.fullWatchPath = sysPath__default["default"].resolve(watchPath);
    this.hasGlob = watchPath !== path;
    if (path === EMPTY_STR$1)
      this.hasGlob = false;
    this.globSymlink = this.hasGlob && follow ? void 0 : false;
    this.globFilter = this.hasGlob ? anymatch$1(path, void 0, ANYMATCH_OPTS) : false;
    this.dirParts = this.getDirParts(path);
    this.dirParts.forEach((parts) => {
      if (parts.length > 1)
        parts.pop();
    });
    this.followSymlinks = follow;
    this.statMethod = follow ? STAT_METHOD_F : STAT_METHOD_L;
  }
  checkGlobSymlink(entry) {
    if (this.globSymlink === void 0) {
      this.globSymlink = entry.fullParentDir === this.fullWatchPath ? false : {realPath: entry.fullParentDir, linkPath: this.fullWatchPath};
    }
    if (this.globSymlink) {
      return entry.fullPath.replace(this.globSymlink.realPath, this.globSymlink.linkPath);
    }
    return entry.fullPath;
  }
  entryPath(entry) {
    return sysPath__default["default"].join(this.watchPath, sysPath__default["default"].relative(this.watchPath, this.checkGlobSymlink(entry)));
  }
  filterPath(entry) {
    const {stats} = entry;
    if (stats && stats.isSymbolicLink())
      return this.filterDir(entry);
    const resolvedPath = this.entryPath(entry);
    const matchesGlob = this.hasGlob && typeof this.globFilter === FUNCTION_TYPE$1 ? this.globFilter(resolvedPath) : true;
    return matchesGlob && this.fsw._isntIgnored(resolvedPath, stats) && this.fsw._hasReadPermissions(stats);
  }
  getDirParts(path) {
    if (!this.hasGlob)
      return [];
    const parts = [];
    const expandedPath = path.includes(BRACE_START$1) ? H__ElectronProject_Electron_Vue_electronVueVite_node_modules_braces.expand(path) : [path];
    expandedPath.forEach((path2) => {
      parts.push(sysPath__default["default"].relative(this.watchPath, path2).split(SLASH_OR_BACK_SLASH_RE));
    });
    return parts;
  }
  filterDir(entry) {
    if (this.hasGlob) {
      const entryParts = this.getDirParts(this.checkGlobSymlink(entry));
      let globstar = false;
      this.unmatchedGlob = !this.dirParts.some((parts) => {
        return parts.every((part, i) => {
          if (part === GLOBSTAR)
            globstar = true;
          return globstar || !entryParts[0][i] || anymatch$1(part, entryParts[0][i], ANYMATCH_OPTS);
        });
      });
    }
    return !this.unmatchedGlob && this.fsw._isntIgnored(this.entryPath(entry), entry.stats);
  }
}
class FSWatcher extends EventEmitter {
  constructor(_opts) {
    super();
    const opts = {};
    if (_opts)
      Object.assign(opts, _opts);
    this._watched = new Map();
    this._closers = new Map();
    this._ignoredPaths = new Set();
    this._throttled = new Map();
    this._symlinkPaths = new Map();
    this._streams = new Set();
    this.closed = false;
    if (undef(opts, "persistent"))
      opts.persistent = true;
    if (undef(opts, "ignoreInitial"))
      opts.ignoreInitial = false;
    if (undef(opts, "ignorePermissionErrors"))
      opts.ignorePermissionErrors = false;
    if (undef(opts, "interval"))
      opts.interval = 100;
    if (undef(opts, "binaryInterval"))
      opts.binaryInterval = 300;
    if (undef(opts, "disableGlobbing"))
      opts.disableGlobbing = false;
    opts.enableBinaryInterval = opts.binaryInterval !== opts.interval;
    if (undef(opts, "useFsEvents"))
      opts.useFsEvents = !opts.usePolling;
    const canUseFsEvents = fseventsHandler.canUse();
    if (!canUseFsEvents)
      opts.useFsEvents = false;
    if (undef(opts, "usePolling") && !opts.useFsEvents) {
      opts.usePolling = isMacos;
    }
    if (undef(opts, "atomic"))
      opts.atomic = !opts.usePolling && !opts.useFsEvents;
    if (opts.atomic)
      this._pendingUnlinks = new Map();
    if (undef(opts, "followSymlinks"))
      opts.followSymlinks = true;
    if (undef(opts, "awaitWriteFinish"))
      opts.awaitWriteFinish = false;
    if (opts.awaitWriteFinish === true)
      opts.awaitWriteFinish = {};
    const awf = opts.awaitWriteFinish;
    if (awf) {
      if (!awf.stabilityThreshold)
        awf.stabilityThreshold = 2e3;
      if (!awf.pollInterval)
        awf.pollInterval = 100;
      this._pendingWrites = new Map();
    }
    if (opts.ignored)
      opts.ignored = arrify$1(opts.ignored);
    let readyCalls = 0;
    this._emitReady = () => {
      readyCalls++;
      if (readyCalls >= this._readyCount) {
        this._emitReady = EMPTY_FN$2;
        this._readyEmitted = true;
        process.nextTick(() => this.emit(EV_READY));
      }
    };
    this._emitRaw = (...args) => this.emit(EV_RAW, ...args);
    this._readyEmitted = false;
    this.options = opts;
    if (opts.useFsEvents) {
      this._fsEventsHandler = new fseventsHandler(this);
    } else {
      this._nodeFsHandler = new nodefsHandler(this);
    }
    Object.freeze(opts);
  }
  add(paths_, _origAdd, _internal) {
    const {cwd, disableGlobbing} = this.options;
    this.closed = false;
    let paths = unifyPaths(paths_);
    if (cwd) {
      paths = paths.map((path) => {
        const absPath = getAbsolutePath(path, cwd);
        if (disableGlobbing || !H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isGlob(path)) {
          return absPath;
        }
        return H__ElectronProject_Electron_Vue_electronVueVite_node_modules_normalizePath(absPath);
      });
    }
    paths = paths.filter((path) => {
      if (path.startsWith(BANG$2)) {
        this._ignoredPaths.add(path.slice(1));
        return false;
      }
      this._ignoredPaths.delete(path);
      this._ignoredPaths.delete(path + SLASH_GLOBSTAR);
      this._userIgnored = void 0;
      return true;
    });
    if (this.options.useFsEvents && this._fsEventsHandler) {
      if (!this._readyCount)
        this._readyCount = paths.length;
      if (this.options.persistent)
        this._readyCount *= 2;
      paths.forEach((path) => this._fsEventsHandler._addToFsEvents(path));
    } else {
      if (!this._readyCount)
        this._readyCount = 0;
      this._readyCount += paths.length;
      Promise.all(paths.map(async (path) => {
        const res = await this._nodeFsHandler._addToNodeFs(path, !_internal, 0, 0, _origAdd);
        if (res)
          this._emitReady();
        return res;
      })).then((results) => {
        if (this.closed)
          return;
        results.filter((item) => item).forEach((item) => {
          this.add(sysPath__default["default"].dirname(item), sysPath__default["default"].basename(_origAdd || item));
        });
      });
    }
    return this;
  }
  unwatch(paths_) {
    if (this.closed)
      return this;
    const paths = unifyPaths(paths_);
    const {cwd} = this.options;
    paths.forEach((path) => {
      if (!sysPath__default["default"].isAbsolute(path) && !this._closers.has(path)) {
        if (cwd)
          path = sysPath__default["default"].join(cwd, path);
        path = sysPath__default["default"].resolve(path);
      }
      this._closePath(path);
      this._ignoredPaths.add(path);
      if (this._watched.has(path)) {
        this._ignoredPaths.add(path + SLASH_GLOBSTAR);
      }
      this._userIgnored = void 0;
    });
    return this;
  }
  close() {
    if (this.closed)
      return this._closePromise;
    this.closed = true;
    this.removeAllListeners();
    const closers = [];
    this._closers.forEach((closerList) => closerList.forEach((closer) => {
      const promise = closer();
      if (promise instanceof Promise)
        closers.push(promise);
    }));
    this._streams.forEach((stream) => stream.destroy());
    this._userIgnored = void 0;
    this._readyCount = 0;
    this._readyEmitted = false;
    this._watched.forEach((dirent) => dirent.dispose());
    ["closers", "watched", "streams", "symlinkPaths", "throttled"].forEach((key) => {
      this[`_${key}`].clear();
    });
    this._closePromise = closers.length ? Promise.all(closers).then(() => void 0) : Promise.resolve();
    return this._closePromise;
  }
  getWatched() {
    const watchList = {};
    this._watched.forEach((entry, dir) => {
      const key = this.options.cwd ? sysPath__default["default"].relative(this.options.cwd, dir) : dir;
      watchList[key || ONE_DOT] = entry.getChildren().sort();
    });
    return watchList;
  }
  emitWithAll(event, args) {
    this.emit(...args);
    if (event !== EV_ERROR$2)
      this.emit(EV_ALL, ...args);
  }
  async _emit(event, path, val1, val2, val3) {
    if (this.closed)
      return;
    const opts = this.options;
    if (isWindows$1)
      path = sysPath__default["default"].normalize(path);
    if (opts.cwd)
      path = sysPath__default["default"].relative(opts.cwd, path);
    const args = [event, path];
    if (val3 !== void 0)
      args.push(val1, val2, val3);
    else if (val2 !== void 0)
      args.push(val1, val2);
    else if (val1 !== void 0)
      args.push(val1);
    const awf = opts.awaitWriteFinish;
    let pw;
    if (awf && (pw = this._pendingWrites.get(path))) {
      pw.lastChange = new Date();
      return this;
    }
    if (opts.atomic) {
      if (event === EV_UNLINK$1) {
        this._pendingUnlinks.set(path, args);
        setTimeout(() => {
          this._pendingUnlinks.forEach((entry, path2) => {
            this.emit(...entry);
            this.emit(EV_ALL, ...entry);
            this._pendingUnlinks.delete(path2);
          });
        }, typeof opts.atomic === "number" ? opts.atomic : 100);
        return this;
      }
      if (event === EV_ADD$2 && this._pendingUnlinks.has(path)) {
        event = args[0] = EV_CHANGE$2;
        this._pendingUnlinks.delete(path);
      }
    }
    if (awf && (event === EV_ADD$2 || event === EV_CHANGE$2) && this._readyEmitted) {
      const awfEmit = (err, stats) => {
        if (err) {
          event = args[0] = EV_ERROR$2;
          args[1] = err;
          this.emitWithAll(event, args);
        } else if (stats) {
          if (args.length > 2) {
            args[2] = stats;
          } else {
            args.push(stats);
          }
          this.emitWithAll(event, args);
        }
      };
      this._awaitWriteFinish(path, awf.stabilityThreshold, event, awfEmit);
      return this;
    }
    if (event === EV_CHANGE$2) {
      const isThrottled = !this._throttle(EV_CHANGE$2, path, 50);
      if (isThrottled)
        return this;
    }
    if (opts.alwaysStat && val1 === void 0 && (event === EV_ADD$2 || event === EV_ADD_DIR$2 || event === EV_CHANGE$2)) {
      const fullPath = opts.cwd ? sysPath__default["default"].join(opts.cwd, path) : path;
      let stats;
      try {
        stats = await stat$3(fullPath);
      } catch (err) {
      }
      if (!stats || this.closed)
        return;
      args.push(stats);
    }
    this.emitWithAll(event, args);
    return this;
  }
  _handleError(error) {
    const code = error && error.code;
    if (error && code !== "ENOENT" && code !== "ENOTDIR" && (!this.options.ignorePermissionErrors || code !== "EPERM" && code !== "EACCES")) {
      this.emit(EV_ERROR$2, error);
    }
    return error || this.closed;
  }
  _throttle(actionType, path, timeout) {
    if (!this._throttled.has(actionType)) {
      this._throttled.set(actionType, new Map());
    }
    const action = this._throttled.get(actionType);
    const actionPath = action.get(path);
    if (actionPath) {
      actionPath.count++;
      return false;
    }
    let timeoutObject;
    const clear = () => {
      const item = action.get(path);
      const count = item ? item.count : 0;
      action.delete(path);
      clearTimeout(timeoutObject);
      if (item)
        clearTimeout(item.timeoutObject);
      return count;
    };
    timeoutObject = setTimeout(clear, timeout);
    const thr = {timeoutObject, clear, count: 0};
    action.set(path, thr);
    return thr;
  }
  _incrReadyCount() {
    return this._readyCount++;
  }
  _awaitWriteFinish(path, threshold, event, awfEmit) {
    let timeoutHandler;
    let fullPath = path;
    if (this.options.cwd && !sysPath__default["default"].isAbsolute(path)) {
      fullPath = sysPath__default["default"].join(this.options.cwd, path);
    }
    const now = new Date();
    const awaitWriteFinish = (prevStat) => {
      fs__default["default"].stat(fullPath, (err, curStat) => {
        if (err || !this._pendingWrites.has(path)) {
          if (err && err.code !== "ENOENT")
            awfEmit(err);
          return;
        }
        const now2 = Number(new Date());
        if (prevStat && curStat.size !== prevStat.size) {
          this._pendingWrites.get(path).lastChange = now2;
        }
        const pw = this._pendingWrites.get(path);
        const df = now2 - pw.lastChange;
        if (df >= threshold) {
          this._pendingWrites.delete(path);
          awfEmit(void 0, curStat);
        } else {
          timeoutHandler = setTimeout(awaitWriteFinish, this.options.awaitWriteFinish.pollInterval, curStat);
        }
      });
    };
    if (!this._pendingWrites.has(path)) {
      this._pendingWrites.set(path, {
        lastChange: now,
        cancelWait: () => {
          this._pendingWrites.delete(path);
          clearTimeout(timeoutHandler);
          return event;
        }
      });
      timeoutHandler = setTimeout(awaitWriteFinish, this.options.awaitWriteFinish.pollInterval);
    }
  }
  _getGlobIgnored() {
    return [...this._ignoredPaths.values()];
  }
  _isIgnored(path, stats) {
    if (this.options.atomic && DOT_RE.test(path))
      return true;
    if (!this._userIgnored) {
      const {cwd} = this.options;
      const ign = this.options.ignored;
      const ignored = ign && ign.map(normalizeIgnored(cwd));
      const paths = arrify$1(ignored).filter((path2) => typeof path2 === STRING_TYPE && !H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isGlob(path2)).map((path2) => path2 + SLASH_GLOBSTAR);
      const list = this._getGlobIgnored().map(normalizeIgnored(cwd)).concat(ignored, paths);
      this._userIgnored = anymatch$1(list, void 0, ANYMATCH_OPTS);
    }
    return this._userIgnored([path, stats]);
  }
  _isntIgnored(path, stat2) {
    return !this._isIgnored(path, stat2);
  }
  _getWatchHelpers(path, depth2) {
    const watchPath = depth2 || this.options.disableGlobbing || !H__ElectronProject_Electron_Vue_electronVueVite_node_modules_isGlob(path) ? path : H__ElectronProject_Electron_Vue_electronVueVite_node_modules_globParent(path);
    const follow = this.options.followSymlinks;
    return new WatchHelper(path, watchPath, follow, this);
  }
  _getWatchedDir(directory) {
    if (!this._boundRemove)
      this._boundRemove = this._remove.bind(this);
    const dir = sysPath__default["default"].resolve(directory);
    if (!this._watched.has(dir))
      this._watched.set(dir, new DirEntry(dir, this._boundRemove));
    return this._watched.get(dir);
  }
  _hasReadPermissions(stats) {
    if (this.options.ignorePermissionErrors)
      return true;
    const md = stats && Number.parseInt(stats.mode, 10);
    const st = md & 511;
    const it = Number.parseInt(st.toString(8)[0], 10);
    return Boolean(4 & it);
  }
  _remove(directory, item, isDirectory) {
    const path = sysPath__default["default"].join(directory, item);
    const fullPath = sysPath__default["default"].resolve(path);
    isDirectory = isDirectory != null ? isDirectory : this._watched.has(path) || this._watched.has(fullPath);
    if (!this._throttle("remove", path, 100))
      return;
    if (!isDirectory && !this.options.useFsEvents && this._watched.size === 1) {
      this.add(directory, item, true);
    }
    const wp = this._getWatchedDir(path);
    const nestedDirectoryChildren = wp.getChildren();
    nestedDirectoryChildren.forEach((nested) => this._remove(path, nested));
    const parent = this._getWatchedDir(directory);
    const wasTracked = parent.has(item);
    parent.remove(item);
    if (this._symlinkPaths.has(fullPath)) {
      this._symlinkPaths.delete(fullPath);
    }
    let relPath = path;
    if (this.options.cwd)
      relPath = sysPath__default["default"].relative(this.options.cwd, path);
    if (this.options.awaitWriteFinish && this._pendingWrites.has(relPath)) {
      const event = this._pendingWrites.get(relPath).cancelWait();
      if (event === EV_ADD$2)
        return;
    }
    this._watched.delete(path);
    this._watched.delete(fullPath);
    const eventName = isDirectory ? EV_UNLINK_DIR : EV_UNLINK$1;
    if (wasTracked && !this._isIgnored(path))
      this._emit(eventName, path);
    if (!this.options.useFsEvents) {
      this._closePath(path);
    }
  }
  _closePath(path) {
    this._closeFile(path);
    const dir = sysPath__default["default"].dirname(path);
    this._getWatchedDir(dir).remove(sysPath__default["default"].basename(path));
  }
  _closeFile(path) {
    const closers = this._closers.get(path);
    if (!closers)
      return;
    closers.forEach((closer) => closer());
    this._closers.delete(path);
  }
  _addPathCloser(path, closer) {
    if (!closer)
      return;
    let list = this._closers.get(path);
    if (!list) {
      list = [];
      this._closers.set(path, list);
    }
    list.push(closer);
  }
  _readdirp(root, opts) {
    if (this.closed)
      return;
    const options = {type: EV_ALL, alwaysStat: true, lstat: true, ...opts};
    let stream = H__ElectronProject_Electron_Vue_electronVueVite_node_modules_readdirp(root, options);
    this._streams.add(stream);
    stream.once(STR_CLOSE, () => {
      stream = void 0;
    });
    stream.once(STR_END$2, () => {
      if (stream) {
        this._streams.delete(stream);
        stream = void 0;
      }
    });
    return stream;
  }
}
var FSWatcher_1 = FSWatcher;
const watch = (paths, options) => {
  const watcher2 = new FSWatcher(options);
  watcher2.add(paths);
  return watcher2;
};
var watch_1 = watch;
var H__ElectronProject_Electron_Vue_electronVueVite_node_modules_chokidar = {
  FSWatcher: FSWatcher_1,
  watch: watch_1
};
class Files {
  constructor() {
    this.addTimes = 0;
    this.addTimes1 = 0;
    this.times = 0;
  }
  static renamefile(oldName, newName) {
    return new Promise((resolve) => {
      fs__default["default"].rename(oldName, newName, (e) => {
        if (e)
          throw e;
      });
      resolve("suc");
    });
  }
  static fsReadDir(dir) {
    return new Promise((resolve, reject) => {
      fs__default["default"].readdir(dir, {withFileTypes: true}, (err, files) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    });
  }
  async *FileTree(level, dirPath, LinkedList2) {
    switch (level) {
      case 1: {
        let firstlayer = [];
        let paths = await Files.fsReadDir(dirPath);
        paths.sort(Files.compareFiles);
        let len = 0;
        while (++len < paths.length) {
          if (paths[len].isFile() && Files.getFileType(paths[len].name)) {
            firstlayer.push(sysPath__default["default"].join(dirPath, paths[len].name));
            this.addTimes1++;
            if (this.addTimes1 > 6) {
              this.addTimes1 = 0;
              LinkedList2.append(firstlayer);
              this.times++;
              yield;
              firstlayer = [];
            }
          }
        }
        if (firstlayer.length != 0) {
          LinkedList2.append(firstlayer);
          firstlayer = [];
          this.times++;
        }
        break;
      }
      case 2: {
        let secondlayer = [];
        let paths = await Files.fsReadDir(dirPath);
        paths.sort(Files.compareFiles);
        paths.reverse();
        let len = paths.length;
        while (len--) {
          if (paths[len].isDirectory()) {
            let abspath = sysPath__default["default"].join(dirPath, paths[len].name);
            let path2s = await Files.fsReadDir(abspath);
            path2s.sort(Files.compareFiles);
            path2s.reverse();
            let len2 = path2s.length;
            while (len2--) {
              const abspath2 = sysPath__default["default"].join(abspath, path2s[len2].name);
              if (path2s[len2].isFile() && Files.getFileType(path2s[len2].name)) {
                secondlayer.push(abspath2);
                if (this.addTimes > 30) {
                  this.addTimes = 0;
                  LinkedList2.append(secondlayer);
                  this.times++;
                  yield;
                  secondlayer = [];
                }
                this.addTimes++;
              }
            }
            if (secondlayer.length != 0) {
              LinkedList2.append(secondlayer);
              secondlayer = [];
            }
          }
        }
        if (secondlayer.length != 0) {
          LinkedList2.append(secondlayer);
          secondlayer = [];
          this.times++;
        }
        break;
      }
    }
  }
  static getFileType(name) {
    let videosuffix = [
      "3gp",
      "avi",
      "flv",
      "rm",
      "rmvb",
      "mov",
      "mkv",
      "mp4",
      "mpeg",
      "mpg",
      "wmv",
      "ts"
    ];
    return RegExp(".(" + videosuffix.join("|") + ")$", "i").test(name.toLowerCase()) ? true : false;
  }
  static compareFiles(a, b) {
    const LetterPrefixRegex = /[a-z]+/i;
    if (typeof a === "string" && typeof b === "string") {
      return Number(LetterPrefixRegex.test(a)) && !Number(LetterPrefixRegex.test(b)) ? 1 : !LetterPrefixRegex.test(a) && Number(LetterPrefixRegex.test(b)) ? -1 : a.localeCompare(b, "zh");
    } else if ("filename" in a && "filename" in b) {
      return Number(LetterPrefixRegex.test(a.filename)) && !Number(LetterPrefixRegex.test(b.filename)) ? 1 : !LetterPrefixRegex.test(a.filename) && Number(LetterPrefixRegex.test(b.filename)) ? -1 : a.filename.localeCompare(b.filename, "zh");
    } else {
      return Number(b.isDirectory()) - Number(a.isDirectory()) && (Number(LetterPrefixRegex.test(a.name)) && !Number(LetterPrefixRegex.test(b.name))) ? 1 : !LetterPrefixRegex.test(a.name) && Number(LetterPrefixRegex.test(b.name)) ? -1 : a.name.localeCompare(b.name, "zh");
    }
  }
}
class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  append(value) {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }
  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deleteNode = this.head;
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
    return deleteNode;
  }
  deleteTail() {
    const deleteTail = this.tail;
    if (!this.head) {
      return null;
    }
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
      return deleteTail;
    }
    let currentNode = this.head;
    while (currentNode.next.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = null;
    this.tail = currentNode;
    this.length--;
    return deleteTail;
  }
  delete(value) {
    if (!this.head) {
      return null;
    }
    let deleteNode = null;
    while (this.head && this.head.value === value) {
      deleteNode = this.head;
      this.head = this.head.next;
    }
    let currentNode = this.head;
    if (currentNode) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }
    this.tail = currentNode;
    return deleteNode;
  }
  deleteAt(index) {
    if (!this.head) {
      return this;
    }
    if (index < 0 || index > this.length) {
      return "\u7D22\u5F15\u8D85\u51FA";
    }
    if (index === 0) {
      let deleteNode = this.head;
      this.deleteHead();
      return deleteNode;
    }
    if (index === this.length - 1) {
      let deleteNode = this.tail;
      this.deleteTail();
      return deleteNode;
    }
    if (this.length === 3) {
      let deleteNode = this.head.next;
      this.head.next = this.tail;
      this.length--;
      return deleteNode;
    }
    let currentNode = this.head.next;
    let amounts = 0;
    while (currentNode) {
      if (index - 1 == amounts) {
        currentNode.next = currentNode.next.next;
        this.length--;
        return currentNode.next;
      }
      amounts++;
      currentNode = currentNode.next;
    }
  }
  reverse() {
    let curNode = this.head;
    let prevNode = null;
    let nextNode = null;
    while (curNode) {
      nextNode = curNode.next;
      curNode.next = prevNode;
      prevNode = curNode;
      curNode = nextNode;
    }
    this.tail = this.head;
    this.head = prevNode;
    return this;
  }
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
  fromArray(values) {
    values.forEach((value) => this.append(value));
    this.length = values.length;
    return this;
  }
  toValueArray() {
    const values = [];
    let currentNode = this.head;
    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return values;
  }
}
const Configs = {
  film: "G:\\Feature film",
  store: "G:\\test"
};
function generateimg(film, filename, ThumbnailPath, times) {
  let run = `E:\\python\\python3.8.1\\python.exe  .\\src\\render\\python\\picture.py "${film}" "${JSON.stringify(filename).replace(/\"/g, "'")}" "${ThumbnailPath}"`;
  let python = child_pross__default["default"].exec(run, {encoding: "buffer"});
  const decoder = new TextDecoder("gbk");
  python.stdout.on("data", function(data) {
    console.log(decoder.decode(data));
    if (decoder.decode(data).length === times) {
      electron.ipcRenderer.send("ipc:message", fmtpath(filename, Configs));
    }
  });
  python.stderr.on("data", function(data) {
    console.log(decoder.decode(data));
  });
  python.on("close", function(code) {
    if (code !== 0) {
      console.log(code);
    }
  });
}
function fmtpath(LinkedList2, Config2) {
  return LinkedList2.map((n) => {
    let img = Object.create(null);
    img.file = sysPath__default["default"].basename(n);
    img.lable = n.replace(Config2.film, "").replace(img.file, "");
    return img;
  });
}
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
let File = new Files();
let LinkedLists = new LinkedList();
let Proxy_Files = new Proxy(File, {
  set: function(target, propKey, value, receiver) {
    if (propKey === "times") {
      let filename = LinkedLists.toValueArray().flat();
      generateimg(Configs.film, filename, Configs.store, filename.length);
    }
    return Reflect.set(target, propKey, value, receiver);
  }
});
let gen = Proxy_Files.FileTree(1, Configs.film, LinkedLists);
gen.next();
electron.ipcRenderer.on("ipc:message", (event, ...arg) => {
  console.log("arg", arg);
  gen.next();
});
const watcher = H__ElectronProject_Electron_Vue_electronVueVite_node_modules_chokidar.watch(Configs.film, {
  ignored: /\.(^mp4|^mkv)/,
  persistent: true,
  depth: 1
});
watcher.on("add", (path) => console.log(path)).on("addDir", (path) => console.log(path)).on("unlink", (path) => console.log(path)).on("unlinkDir", (path) => console.log(path));
