const e = { arguments: ["storyfile"] };
var r,
  t = { dirname() {}, normalize() {}, randomBytes() {}, readFileSync() {} },
  n =
    ((function (e, r) {
      var n,
        o =
          ((n = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0),
          "undefined" != typeof __filename && (n = n || __filename),
          function (e) {
            var r, o;
            (e = void 0 !== (e = e || {}) ? e : {}).ready = new Promise(function (e, t) {
              (r = e), (o = t);
            });
            var i,
              a = {};
            for (i in e) e.hasOwnProperty(i) && (a[i] = e[i]);
            var s,
              u,
              c,
              l = [],
              f = "./this.program",
              d = function (e, r) {
                throw r;
              };
            (s = "object" == typeof window), (u = "function" == typeof importScripts), (c = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node);
            var m,
              p,
              h,
              w,
              g = "";
            c
              ? ((g = u ? t.dirname(g) + "/" : __dirname + "/"),
                (m = function (e, r) {
                  return h || (h = t), w || (w = t), (e = w.normalize(e)), h.readFileSync(e, r ? null : "utf8");
                }),
                (p = function (e) {
                  var r = m(e, !0);
                  return r.buffer || (r = new Uint8Array(r)), S(r.buffer), r;
                }),
                process.argv.length > 1 && (f = process.argv[1].replace(/\\/g, "/")),
                (l = process.argv.slice(2)),
                process.on("uncaughtException", function (e) {
                  if (!(e instanceof Ve)) throw e;
                }),
                process.on("unhandledRejection", re),
                (d = function (e) {
                  process.exit(e);
                }),
                (e.inspect = function () {
                  return "[Emscripten Module object]";
                }))
              : (s || u) &&
                (u ? (g = self.location.href) : document.currentScript && (g = document.currentScript.src),
                n && (g = n),
                (g = 0 !== g.indexOf("blob:") ? g.substr(0, g.lastIndexOf("/") + 1) : ""),
                (m = function (e) {
                  var r = new XMLHttpRequest();
                  return r.open("GET", e, !1), r.send(null), r.responseText;
                }),
                u &&
                  (p = function (e) {
                    var r = new XMLHttpRequest();
                    return r.open("GET", e, !1), (r.responseType = "arraybuffer"), r.send(null), new Uint8Array(r.response);
                  }));
            var v = e.print || console.log.bind(console),
              y = e.printErr || console.warn.bind(console);
            for (i in a) a.hasOwnProperty(i) && (e[i] = a[i]);
            (a = null), e.arguments && (l = e.arguments), e.thisProgram && (f = e.thisProgram), e.quit && (d = e.quit);
            var E,
              _,
              k,
              D = 0;
            e.wasmBinary && (E = e.wasmBinary), e.noExitRuntime && (_ = e.noExitRuntime), "object" != typeof WebAssembly && re("no native wasm support detected");
            var b = !1;
            function S(e, r) {
              e || re("Assertion failed: " + r);
            }
            var F,
              A,
              x,
              P,
              T,
              M,
              R = new TextDecoder("utf8");
            function C(e, r, t) {
              for (var n = r + t, o = r; e[o] && !(o >= n); ) ++o;
              return R.decode(e.subarray ? e.subarray(r, o) : new Uint8Array(e.slice(r, o)));
            }
            function z(e, r) {
              if (!e) return "";
              for (var t = e + r, n = e; !(n >= t) && x[n]; ) ++n;
              return R.decode(x.subarray(e, n));
            }
            function N(e, r, t, n) {
              if (!(n > 0)) return 0;
              for (var o = t, i = t + n - 1, a = 0; a < e.length; ++a) {
                var s = e.charCodeAt(a);
                if ((s >= 55296 && s <= 57343 && (s = (65536 + ((1023 & s) << 10)) | (1023 & e.charCodeAt(++a))), s <= 127)) {
                  if (t >= i) break;
                  r[t++] = s;
                } else if (s <= 2047) {
                  if (t + 1 >= i) break;
                  (r[t++] = 192 | (s >> 6)), (r[t++] = 128 | (63 & s));
                } else if (s <= 65535) {
                  if (t + 2 >= i) break;
                  (r[t++] = 224 | (s >> 12)), (r[t++] = 128 | ((s >> 6) & 63)), (r[t++] = 128 | (63 & s));
                } else {
                  if (t + 3 >= i) break;
                  (r[t++] = 240 | (s >> 18)), (r[t++] = 128 | ((s >> 12) & 63)), (r[t++] = 128 | ((s >> 6) & 63)), (r[t++] = 128 | (63 & s));
                }
              }
              return (r[t] = 0), t - o;
            }
            function B(e, r, t) {
              return N(e, x, r, t);
            }
            function O(e) {
              for (var r = 0, t = 0; t < e.length; ++t) {
                var n = e.charCodeAt(t);
                n >= 55296 && n <= 57343 && (n = (65536 + ((1023 & n) << 10)) | (1023 & e.charCodeAt(++t))), n <= 127 ? ++r : (r += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
              }
              return r;
            }
            function j(e) {
              var r = O(e) + 1,
                t = Me(r);
              return t && N(e, A, t, r), t;
            }
            function U(e) {
              var r = O(e) + 1,
                t = Ue(r);
              return N(e, A, t, r), t;
            }
            function I(r) {
              (F = r),
                (e.HEAP8 = A = new Int8Array(r)),
                (e.HEAP16 = P = new Int16Array(r)),
                (e.HEAP32 = T = new Int32Array(r)),
                (e.HEAPU8 = x = new Uint8Array(r)),
                (e.HEAPU16 = new Uint16Array(r)),
                (e.HEAPU32 = M = new Uint32Array(r)),
                (e.HEAPF32 = new Float32Array(r)),
                (e.HEAPF64 = new Float64Array(r));
            }
            var L = e.INITIAL_MEMORY || 16777216;
            (k = e.wasmMemory ? e.wasmMemory : new WebAssembly.Memory({ initial: L / 65536, maximum: 32768 })) && (F = k.buffer), (L = F.byteLength), I(F);
            var H = [],
              W = [],
              q = [],
              V = [],
              G = [],
              X = Math.abs,
              Y = Math.ceil,
              K = Math.floor,
              $ = Math.min,
              J = 0,
              Z = null;
            function Q(r) {
              J++, e.monitorRunDependencies && e.monitorRunDependencies(J);
            }
            function ee(r) {
              if ((J--, e.monitorRunDependencies && e.monitorRunDependencies(J), 0 == J && Z)) {
                var t = Z;
                (Z = null), t();
              }
            }
            function re(r) {
              e.onAbort && e.onAbort(r), y((r += "")), (b = !0), (r = "abort(" + r + "). Build with -s ASSERTIONS=1 for more info.");
              var t = new WebAssembly.RuntimeError(r);
              throw (o(t), t);
            }
            function te(e) {
              return (r = e), (t = "data:application/octet-stream;base64,"), String.prototype.startsWith ? r.startsWith(t) : 0 === r.indexOf(t);
              var r, t;
            }
            (e.preloadedImages = {}), (e.preloadedAudios = {});
            var ne,
              oe,
              ie,
              ae,
              se = "git-core.wasm";
            function ue() {
              try {
                if (E) return new Uint8Array(E);
                if (p) return p(se);
                throw "both async and sync fetching of the wasm failed";
              } catch (e) {
                re(e);
              }
            }
            function ce(e, r, t, n, o) {
              const i = e >> 2,
                a = M.subarray(i, i + t),
                s = n(o ? a : a.reduce((e, r) => e + String.fromCodePoint(r), "")),
                u = Uint32Array.from(s, (e) => e.codePointAt(0)),
                c = u.length;
              return M.set(u.subarray(0, Math.min(r, c)), i), c;
            }
            function le(r) {
              for (; r.length > 0; ) {
                var t = r.shift();
                if ("function" != typeof t) {
                  var n = t.func;
                  "number" == typeof n ? (void 0 === t.arg ? de("v", n)() : de("vi", n)(t.arg)) : n(void 0 === t.arg ? null : t.arg);
                } else t(e);
              }
            }
            function fe(r, t, n) {
              return (function (r, t, n) {
                return n && n.length ? e["dynCall_" + r].apply(null, [t].concat(n)) : e["dynCall_" + r].call(null, t);
              })(r, t, n);
            }
            function de(e, r) {
              var t = [];
              return function () {
                t.length = arguments.length;
                for (var n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return fe(e, r, t);
              };
            }
            function me() {
              var r = (function () {
                var e = new Error();
                if (!e.stack) {
                  try {
                    throw new Error();
                  } catch (r) {
                    e = r;
                  }
                  if (!e.stack) return "(no stack trace available)";
                }
                return e.stack.toString();
              })();
              return (
                e.extraStackTrace && (r += "\n" + e.extraStackTrace()),
                r.replace(/\b_Z[\w\d_]+/g, function (e) {
                  return e == e ? e : e + " [" + e + "]";
                })
              );
            }
            function pe(e) {
              return (T[Ce() >> 2] = e), e;
            }
            te(se) || ((ne = se), (se = e.locateFile ? e.locateFile(ne, g) : g + ne)),
              (ae = c
                ? function () {
                    var e = process.hrtime();
                    return 1e3 * e[0] + e[1] / 1e6;
                  }
                : function () {
                    return performance.now();
                  });
            var he = {
                splitPath: function (e) {
                  return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);
                },
                normalizeArray: function (e, r) {
                  for (var t = 0, n = e.length - 1; n >= 0; n--) {
                    var o = e[n];
                    "." === o ? e.splice(n, 1) : ".." === o ? (e.splice(n, 1), t++) : t && (e.splice(n, 1), t--);
                  }
                  if (r) for (; t; t--) e.unshift("..");
                  return e;
                },
                normalize: function (e) {
                  var r = "/" === e.charAt(0),
                    t = "/" === e.substr(-1);
                  return (
                    (e = he
                      .normalizeArray(
                        e.split("/").filter(function (e) {
                          return !!e;
                        }),
                        !r
                      )
                      .join("/")) ||
                      r ||
                      (e = "."),
                    e && t && (e += "/"),
                    (r ? "/" : "") + e
                  );
                },
                dirname: function (e) {
                  var r = he.splitPath(e),
                    t = r[0],
                    n = r[1];
                  return t || n ? (n && (n = n.substr(0, n.length - 1)), t + n) : ".";
                },
                basename: function (e) {
                  if ("/" === e) return "/";
                  var r = (e = (e = he.normalize(e)).replace(/\/$/, "")).lastIndexOf("/");
                  return -1 === r ? e : e.substr(r + 1);
                },
                extname: function (e) {
                  return he.splitPath(e)[3];
                },
                join: function () {
                  var e = Array.prototype.slice.call(arguments, 0);
                  return he.normalize(e.join("/"));
                },
                join2: function (e, r) {
                  return he.normalize(e + "/" + r);
                },
              },
              we = {
                resolve: function () {
                  for (var e = "", r = !1, t = arguments.length - 1; t >= -1 && !r; t--) {
                    var n = t >= 0 ? arguments[t] : Ee.cwd();
                    if ("string" != typeof n) throw new TypeError("Arguments to path.resolve must be strings");
                    if (!n) return "";
                    (e = n + "/" + e), (r = "/" === n.charAt(0));
                  }
                  return (
                    (r ? "/" : "") +
                      (e = he
                        .normalizeArray(
                          e.split("/").filter(function (e) {
                            return !!e;
                          }),
                          !r
                        )
                        .join("/")) || "."
                  );
                },
                relative: function (e, r) {
                  function t(e) {
                    for (var r = 0; r < e.length && "" === e[r]; r++);
                    for (var t = e.length - 1; t >= 0 && "" === e[t]; t--);
                    return r > t ? [] : e.slice(r, t - r + 1);
                  }
                  (e = we.resolve(e).substr(1)), (r = we.resolve(r).substr(1));
                  for (var n = t(e.split("/")), o = t(r.split("/")), i = Math.min(n.length, o.length), a = i, s = 0; s < i; s++)
                    if (n[s] !== o[s]) {
                      a = s;
                      break;
                    }
                  var u = [];
                  for (s = a; s < n.length; s++) u.push("..");
                  return (u = u.concat(o.slice(a))).join("/");
                },
              },
              ge = {
                ttys: [],
                init: function () {},
                shutdown: function () {},
                register: function (e, r) {
                  (ge.ttys[e] = { input: [], output: [], ops: r }), Ee.registerDevice(e, ge.stream_ops);
                },
                stream_ops: {
                  open: function (e) {
                    var r = ge.ttys[e.node.rdev];
                    if (!r) throw new Ee.ErrnoError(43);
                    (e.tty = r), (e.seekable = !1);
                  },
                  close: function (e) {
                    e.tty.ops.flush(e.tty);
                  },
                  flush: function (e) {
                    e.tty.ops.flush(e.tty);
                  },
                  read: function (e, r, t, n, o) {
                    if (!e.tty || !e.tty.ops.get_char) throw new Ee.ErrnoError(60);
                    for (var i = 0, a = 0; a < n; a++) {
                      var s;
                      try {
                        s = e.tty.ops.get_char(e.tty);
                      } catch (e) {
                        throw new Ee.ErrnoError(29);
                      }
                      if (void 0 === s && 0 === i) throw new Ee.ErrnoError(6);
                      if (null == s) break;
                      i++, (r[t + a] = s);
                    }
                    return i && (e.node.timestamp = Date.now()), i;
                  },
                  write: function (e, r, t, n, o) {
                    if (!e.tty || !e.tty.ops.put_char) throw new Ee.ErrnoError(60);
                    try {
                      for (var i = 0; i < n; i++) e.tty.ops.put_char(e.tty, r[t + i]);
                    } catch (e) {
                      throw new Ee.ErrnoError(29);
                    }
                    return n && (e.node.timestamp = Date.now()), i;
                  },
                },
                default_tty_ops: {
                  get_char: function (e) {
                    if (!e.input.length) {
                      var r = null;
                      if (c) {
                        var t = Buffer.alloc ? Buffer.alloc(256) : new Buffer(256),
                          n = 0;
                        try {
                          n = h.readSync(process.stdin.fd, t, 0, 256, null);
                        } catch (e) {
                          if (-1 == e.toString().indexOf("EOF")) throw e;
                          n = 0;
                        }
                        r = n > 0 ? t.slice(0, n).toString("utf-8") : null;
                      } else "undefined" != typeof window && "function" == typeof window.prompt ? null !== (r = window.prompt("Input: ")) && (r += "\n") : "function" == typeof readline && null !== (r = readline()) && (r += "\n");
                      if (!r) return null;
                      e.input = Ae(r, !0);
                    }
                    return e.input.shift();
                  },
                  put_char: function (e, r) {
                    null === r || 10 === r ? (v(C(e.output, 0)), (e.output = [])) : 0 != r && e.output.push(r);
                  },
                  flush: function (e) {
                    e.output && e.output.length > 0 && (v(C(e.output, 0)), (e.output = []));
                  },
                },
                default_tty1_ops: {
                  put_char: function (e, r) {
                    null === r || 10 === r ? (y(C(e.output, 0)), (e.output = [])) : 0 != r && e.output.push(r);
                  },
                  flush: function (e) {
                    e.output && e.output.length > 0 && (y(C(e.output, 0)), (e.output = []));
                  },
                },
              };
            function ve(e) {
              for (
                var r = (function (e, r) {
                    return r || (r = 16), Math.ceil(e / r) * r;
                  })(e, 16384),
                  t = Me(r);
                e < r;

              )
                A[t + e++] = 0;
              return t;
            }
            var ye = {
                ops_table: null,
                mount: function (e) {
                  return ye.createNode(null, "/", 16895, 0);
                },
                createNode: function (e, r, t, n) {
                  if (Ee.isBlkdev(t) || Ee.isFIFO(t)) throw new Ee.ErrnoError(63);
                  ye.ops_table ||
                    (ye.ops_table = {
                      dir: {
                        node: {
                          getattr: ye.node_ops.getattr,
                          setattr: ye.node_ops.setattr,
                          lookup: ye.node_ops.lookup,
                          mknod: ye.node_ops.mknod,
                          rename: ye.node_ops.rename,
                          unlink: ye.node_ops.unlink,
                          rmdir: ye.node_ops.rmdir,
                          readdir: ye.node_ops.readdir,
                          symlink: ye.node_ops.symlink,
                        },
                        stream: { llseek: ye.stream_ops.llseek },
                      },
                      file: {
                        node: { getattr: ye.node_ops.getattr, setattr: ye.node_ops.setattr },
                        stream: { llseek: ye.stream_ops.llseek, read: ye.stream_ops.read, write: ye.stream_ops.write, allocate: ye.stream_ops.allocate, mmap: ye.stream_ops.mmap, msync: ye.stream_ops.msync },
                      },
                      link: { node: { getattr: ye.node_ops.getattr, setattr: ye.node_ops.setattr, readlink: ye.node_ops.readlink }, stream: {} },
                      chrdev: { node: { getattr: ye.node_ops.getattr, setattr: ye.node_ops.setattr }, stream: Ee.chrdev_stream_ops },
                    });
                  var o = Ee.createNode(e, r, t, n);
                  return (
                    Ee.isDir(o.mode)
                      ? ((o.node_ops = ye.ops_table.dir.node), (o.stream_ops = ye.ops_table.dir.stream), (o.contents = {}))
                      : Ee.isFile(o.mode)
                      ? ((o.node_ops = ye.ops_table.file.node), (o.stream_ops = ye.ops_table.file.stream), (o.usedBytes = 0), (o.contents = null))
                      : Ee.isLink(o.mode)
                      ? ((o.node_ops = ye.ops_table.link.node), (o.stream_ops = ye.ops_table.link.stream))
                      : Ee.isChrdev(o.mode) && ((o.node_ops = ye.ops_table.chrdev.node), (o.stream_ops = ye.ops_table.chrdev.stream)),
                    (o.timestamp = Date.now()),
                    e && (e.contents[r] = o),
                    o
                  );
                },
                getFileDataAsRegularArray: function (e) {
                  if (e.contents && e.contents.subarray) {
                    for (var r = [], t = 0; t < e.usedBytes; ++t) r.push(e.contents[t]);
                    return r;
                  }
                  return e.contents;
                },
                getFileDataAsTypedArray: function (e) {
                  return e.contents ? (e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents)) : new Uint8Array(0);
                },
                expandFileStorage: function (e, r) {
                  var t = e.contents ? e.contents.length : 0;
                  if (!(t >= r)) {
                    (r = Math.max(r, (t * (t < 1048576 ? 2 : 1.125)) >>> 0)), 0 != t && (r = Math.max(r, 256));
                    var n = e.contents;
                    (e.contents = new Uint8Array(r)), e.usedBytes > 0 && e.contents.set(n.subarray(0, e.usedBytes), 0);
                  }
                },
                resizeFileStorage: function (e, r) {
                  if (e.usedBytes != r) {
                    if (0 == r) return (e.contents = null), void (e.usedBytes = 0);
                    if (!e.contents || e.contents.subarray) {
                      var t = e.contents;
                      return (e.contents = new Uint8Array(r)), t && e.contents.set(t.subarray(0, Math.min(r, e.usedBytes))), void (e.usedBytes = r);
                    }
                    if ((e.contents || (e.contents = []), e.contents.length > r)) e.contents.length = r;
                    else for (; e.contents.length < r; ) e.contents.push(0);
                    e.usedBytes = r;
                  }
                },
                node_ops: {
                  getattr: function (e) {
                    var r = {};
                    return (
                      (r.dev = Ee.isChrdev(e.mode) ? e.id : 1),
                      (r.ino = e.id),
                      (r.mode = e.mode),
                      (r.nlink = 1),
                      (r.uid = 0),
                      (r.gid = 0),
                      (r.rdev = e.rdev),
                      Ee.isDir(e.mode) ? (r.size = 4096) : Ee.isFile(e.mode) ? (r.size = e.usedBytes) : Ee.isLink(e.mode) ? (r.size = e.link.length) : (r.size = 0),
                      (r.atime = new Date(e.timestamp)),
                      (r.mtime = new Date(e.timestamp)),
                      (r.ctime = new Date(e.timestamp)),
                      (r.blksize = 4096),
                      (r.blocks = Math.ceil(r.size / r.blksize)),
                      r
                    );
                  },
                  setattr: function (e, r) {
                    void 0 !== r.mode && (e.mode = r.mode), void 0 !== r.timestamp && (e.timestamp = r.timestamp), void 0 !== r.size && ye.resizeFileStorage(e, r.size);
                  },
                  lookup: function (e, r) {
                    throw Ee.genericErrors[44];
                  },
                  mknod: function (e, r, t, n) {
                    return ye.createNode(e, r, t, n);
                  },
                  rename: function (e, r, t) {
                    if (Ee.isDir(e.mode)) {
                      var n;
                      try {
                        n = Ee.lookupNode(r, t);
                      } catch (e) {}
                      if (n) for (var o in n.contents) throw new Ee.ErrnoError(55);
                    }
                    delete e.parent.contents[e.name], (e.name = t), (r.contents[t] = e), (e.parent = r);
                  },
                  unlink: function (e, r) {
                    delete e.contents[r];
                  },
                  rmdir: function (e, r) {
                    var t = Ee.lookupNode(e, r);
                    for (var n in t.contents) throw new Ee.ErrnoError(55);
                    delete e.contents[r];
                  },
                  readdir: function (e) {
                    var r = [".", ".."];
                    for (var t in e.contents) e.contents.hasOwnProperty(t) && r.push(t);
                    return r;
                  },
                  symlink: function (e, r, t) {
                    var n = ye.createNode(e, r, 41471, 0);
                    return (n.link = t), n;
                  },
                  readlink: function (e) {
                    if (!Ee.isLink(e.mode)) throw new Ee.ErrnoError(28);
                    return e.link;
                  },
                },
                stream_ops: {
                  read: function (e, r, t, n, o) {
                    var i = e.node.contents;
                    if (o >= e.node.usedBytes) return 0;
                    var a = Math.min(e.node.usedBytes - o, n);
                    if (a > 8 && i.subarray) r.set(i.subarray(o, o + a), t);
                    else for (var s = 0; s < a; s++) r[t + s] = i[o + s];
                    return a;
                  },
                  write: function (e, r, t, n, o, i) {
                    if ((r.buffer === A.buffer && (i = !1), !n)) return 0;
                    var a = e.node;
                    if (((a.timestamp = Date.now()), r.subarray && (!a.contents || a.contents.subarray))) {
                      if (i) return (a.contents = r.subarray(t, t + n)), (a.usedBytes = n), n;
                      if (0 === a.usedBytes && 0 === o) return (a.contents = r.slice(t, t + n)), (a.usedBytes = n), n;
                      if (o + n <= a.usedBytes) return a.contents.set(r.subarray(t, t + n), o), n;
                    }
                    if ((ye.expandFileStorage(a, o + n), a.contents.subarray && r.subarray)) a.contents.set(r.subarray(t, t + n), o);
                    else for (var s = 0; s < n; s++) a.contents[o + s] = r[t + s];
                    return (a.usedBytes = Math.max(a.usedBytes, o + n)), n;
                  },
                  llseek: function (e, r, t) {
                    var n = r;
                    if ((1 === t ? (n += e.position) : 2 === t && Ee.isFile(e.node.mode) && (n += e.node.usedBytes), n < 0)) throw new Ee.ErrnoError(28);
                    return n;
                  },
                  allocate: function (e, r, t) {
                    ye.expandFileStorage(e.node, r + t), (e.node.usedBytes = Math.max(e.node.usedBytes, r + t));
                  },
                  mmap: function (e, r, t, n, o, i) {
                    if ((S(0 === r), !Ee.isFile(e.node.mode))) throw new Ee.ErrnoError(43);
                    var a,
                      s,
                      u = e.node.contents;
                    if (2 & i || u.buffer !== F) {
                      if (((n > 0 || n + t < u.length) && (u = u.subarray ? u.subarray(n, n + t) : Array.prototype.slice.call(u, n, n + t)), (s = !0), !(a = ve(t)))) throw new Ee.ErrnoError(48);
                      A.set(u, a);
                    } else (s = !1), (a = u.byteOffset);
                    return { ptr: a, allocated: s };
                  },
                  msync: function (e, r, t, n, o) {
                    if (!Ee.isFile(e.node.mode)) throw new Ee.ErrnoError(43);
                    return 2 & o || ye.stream_ops.write(e, r, 0, n, t, !1), 0;
                  },
                },
              },
              Ee = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: "/",
                initialized: !1,
                ignorePermissions: !0,
                trackingDelegate: {},
                tracking: { openFlags: { READ: 1, WRITE: 2 } },
                ErrnoError: null,
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                handleFSError: function (e) {
                  if (!(e instanceof Ee.ErrnoError)) throw e + " : " + me();
                  return pe(e.errno);
                },
                lookupPath: function (e, r) {
                  if (((r = r || {}), !(e = we.resolve(Ee.cwd(), e)))) return { path: "", node: null };
                  var t = { follow_mount: !0, recurse_count: 0 };
                  for (var n in t) void 0 === r[n] && (r[n] = t[n]);
                  if (r.recurse_count > 8) throw new Ee.ErrnoError(32);
                  for (
                    var o = he.normalizeArray(
                        e.split("/").filter(function (e) {
                          return !!e;
                        }),
                        !1
                      ),
                      i = Ee.root,
                      a = "/",
                      s = 0;
                    s < o.length;
                    s++
                  ) {
                    var u = s === o.length - 1;
                    if (u && r.parent) break;
                    if (((i = Ee.lookupNode(i, o[s])), (a = he.join2(a, o[s])), Ee.isMountpoint(i) && (!u || (u && r.follow_mount)) && (i = i.mounted.root), !u || r.follow))
                      for (var c = 0; Ee.isLink(i.mode); ) {
                        var l = Ee.readlink(a);
                        if (((a = we.resolve(he.dirname(a), l)), (i = Ee.lookupPath(a, { recurse_count: r.recurse_count }).node), c++ > 40)) throw new Ee.ErrnoError(32);
                      }
                  }
                  return { path: a, node: i };
                },
                getPath: function (e) {
                  for (var r; ; ) {
                    if (Ee.isRoot(e)) {
                      var t = e.mount.mountpoint;
                      return r ? ("/" !== t[t.length - 1] ? t + "/" + r : t + r) : t;
                    }
                    (r = r ? e.name + "/" + r : e.name), (e = e.parent);
                  }
                },
                hashName: function (e, r) {
                  for (var t = 0, n = 0; n < r.length; n++) t = ((t << 5) - t + r.charCodeAt(n)) | 0;
                  return ((e + t) >>> 0) % Ee.nameTable.length;
                },
                hashAddNode: function (e) {
                  var r = Ee.hashName(e.parent.id, e.name);
                  (e.name_next = Ee.nameTable[r]), (Ee.nameTable[r] = e);
                },
                hashRemoveNode: function (e) {
                  var r = Ee.hashName(e.parent.id, e.name);
                  if (Ee.nameTable[r] === e) Ee.nameTable[r] = e.name_next;
                  else
                    for (var t = Ee.nameTable[r]; t; ) {
                      if (t.name_next === e) {
                        t.name_next = e.name_next;
                        break;
                      }
                      t = t.name_next;
                    }
                },
                lookupNode: function (e, r) {
                  var t = Ee.mayLookup(e);
                  if (t) throw new Ee.ErrnoError(t, e);
                  for (var n = Ee.hashName(e.id, r), o = Ee.nameTable[n]; o; o = o.name_next) {
                    var i = o.name;
                    if (o.parent.id === e.id && i === r) return o;
                  }
                  return Ee.lookup(e, r);
                },
                createNode: function (e, r, t, n) {
                  var o = new Ee.FSNode(e, r, t, n);
                  return Ee.hashAddNode(o), o;
                },
                destroyNode: function (e) {
                  Ee.hashRemoveNode(e);
                },
                isRoot: function (e) {
                  return e === e.parent;
                },
                isMountpoint: function (e) {
                  return !!e.mounted;
                },
                isFile: function (e) {
                  return 32768 == (61440 & e);
                },
                isDir: function (e) {
                  return 16384 == (61440 & e);
                },
                isLink: function (e) {
                  return 40960 == (61440 & e);
                },
                isChrdev: function (e) {
                  return 8192 == (61440 & e);
                },
                isBlkdev: function (e) {
                  return 24576 == (61440 & e);
                },
                isFIFO: function (e) {
                  return 4096 == (61440 & e);
                },
                isSocket: function (e) {
                  return 49152 == (49152 & e);
                },
                flagModes: { r: 0, rs: 1052672, "r+": 2, w: 577, wx: 705, xw: 705, "w+": 578, "wx+": 706, "xw+": 706, a: 1089, ax: 1217, xa: 1217, "a+": 1090, "ax+": 1218, "xa+": 1218 },
                modeStringToFlags: function (e) {
                  var r = Ee.flagModes[e];
                  if (void 0 === r) throw new Error("Unknown file open mode: " + e);
                  return r;
                },
                flagsToPermissionString: function (e) {
                  var r = ["r", "w", "rw"][3 & e];
                  return 512 & e && (r += "w"), r;
                },
                nodePermissions: function (e, r) {
                  return Ee.ignorePermissions || ((-1 === r.indexOf("r") || 292 & e.mode) && (-1 === r.indexOf("w") || 146 & e.mode) && (-1 === r.indexOf("x") || 73 & e.mode)) ? 0 : 2;
                },
                mayLookup: function (e) {
                  var r = Ee.nodePermissions(e, "x");
                  return r || (e.node_ops.lookup ? 0 : 2);
                },
                mayCreate: function (e, r) {
                  try {
                    return Ee.lookupNode(e, r), 20;
                  } catch (e) {}
                  return Ee.nodePermissions(e, "wx");
                },
                mayDelete: function (e, r, t) {
                  var n;
                  try {
                    n = Ee.lookupNode(e, r);
                  } catch (e) {
                    return e.errno;
                  }
                  var o = Ee.nodePermissions(e, "wx");
                  if (o) return o;
                  if (t) {
                    if (!Ee.isDir(n.mode)) return 54;
                    if (Ee.isRoot(n) || Ee.getPath(n) === Ee.cwd()) return 10;
                  } else if (Ee.isDir(n.mode)) return 31;
                  return 0;
                },
                mayOpen: function (e, r) {
                  return e ? (Ee.isLink(e.mode) ? 32 : Ee.isDir(e.mode) && ("r" !== Ee.flagsToPermissionString(r) || 512 & r) ? 31 : Ee.nodePermissions(e, Ee.flagsToPermissionString(r))) : 44;
                },
                MAX_OPEN_FDS: 4096,
                nextfd: function (e, r) {
                  (e = e || 0), (r = r || Ee.MAX_OPEN_FDS);
                  for (var t = e; t <= r; t++) if (!Ee.streams[t]) return t;
                  throw new Ee.ErrnoError(33);
                },
                getStream: function (e) {
                  return Ee.streams[e];
                },
                createStream: function (e, r, t) {
                  Ee.FSStream ||
                    ((Ee.FSStream = function () {}),
                    (Ee.FSStream.prototype = {
                      object: {
                        get: function () {
                          return this.node;
                        },
                        set: function (e) {
                          this.node = e;
                        },
                      },
                      isRead: {
                        get: function () {
                          return 1 != (2097155 & this.flags);
                        },
                      },
                      isWrite: {
                        get: function () {
                          return 0 != (2097155 & this.flags);
                        },
                      },
                      isAppend: {
                        get: function () {
                          return 1024 & this.flags;
                        },
                      },
                    }));
                  var n = new Ee.FSStream();
                  for (var o in e) n[o] = e[o];
                  e = n;
                  var i = Ee.nextfd(r, t);
                  return (e.fd = i), (Ee.streams[i] = e), e;
                },
                closeStream: function (e) {
                  Ee.streams[e] = null;
                },
                chrdev_stream_ops: {
                  open: function (e) {
                    var r = Ee.getDevice(e.node.rdev);
                    (e.stream_ops = r.stream_ops), e.stream_ops.open && e.stream_ops.open(e);
                  },
                  llseek: function () {
                    throw new Ee.ErrnoError(70);
                  },
                },
                major: function (e) {
                  return e >> 8;
                },
                minor: function (e) {
                  return 255 & e;
                },
                makedev: function (e, r) {
                  return (e << 8) | r;
                },
                registerDevice: function (e, r) {
                  Ee.devices[e] = { stream_ops: r };
                },
                getDevice: function (e) {
                  return Ee.devices[e];
                },
                getMounts: function (e) {
                  for (var r = [], t = [e]; t.length; ) {
                    var n = t.pop();
                    r.push(n), t.push.apply(t, n.mounts);
                  }
                  return r;
                },
                syncfs: function (e, r) {
                  "function" == typeof e && ((r = e), (e = !1)), Ee.syncFSRequests++, Ee.syncFSRequests > 1 && y("warning: " + Ee.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
                  var t = Ee.getMounts(Ee.root.mount),
                    n = 0;
                  function o(e) {
                    return Ee.syncFSRequests--, r(e);
                  }
                  function i(e) {
                    if (e) return i.errored ? void 0 : ((i.errored = !0), o(e));
                    ++n >= t.length && o(null);
                  }
                  t.forEach(function (r) {
                    if (!r.type.syncfs) return i(null);
                    r.type.syncfs(r, e, i);
                  });
                },
                mount: function (e, r, t) {
                  var n,
                    o = "/" === t,
                    i = !t;
                  if (o && Ee.root) throw new Ee.ErrnoError(10);
                  if (!o && !i) {
                    var a = Ee.lookupPath(t, { follow_mount: !1 });
                    if (((t = a.path), (n = a.node), Ee.isMountpoint(n))) throw new Ee.ErrnoError(10);
                    if (!Ee.isDir(n.mode)) throw new Ee.ErrnoError(54);
                  }
                  var s = { type: e, opts: r, mountpoint: t, mounts: [] },
                    u = e.mount(s);
                  return (u.mount = s), (s.root = u), o ? (Ee.root = u) : n && ((n.mounted = s), n.mount && n.mount.mounts.push(s)), u;
                },
                unmount: function (e) {
                  var r = Ee.lookupPath(e, { follow_mount: !1 });
                  if (!Ee.isMountpoint(r.node)) throw new Ee.ErrnoError(28);
                  var t = r.node,
                    n = t.mounted,
                    o = Ee.getMounts(n);
                  Object.keys(Ee.nameTable).forEach(function (e) {
                    for (var r = Ee.nameTable[e]; r; ) {
                      var t = r.name_next;
                      -1 !== o.indexOf(r.mount) && Ee.destroyNode(r), (r = t);
                    }
                  }),
                    (t.mounted = null);
                  var i = t.mount.mounts.indexOf(n);
                  t.mount.mounts.splice(i, 1);
                },
                lookup: function (e, r) {
                  return e.node_ops.lookup(e, r);
                },
                mknod: function (e, r, t) {
                  var n = Ee.lookupPath(e, { parent: !0 }).node,
                    o = he.basename(e);
                  if (!o || "." === o || ".." === o) throw new Ee.ErrnoError(28);
                  var i = Ee.mayCreate(n, o);
                  if (i) throw new Ee.ErrnoError(i);
                  if (!n.node_ops.mknod) throw new Ee.ErrnoError(63);
                  return n.node_ops.mknod(n, o, r, t);
                },
                create: function (e, r) {
                  return (r = void 0 !== r ? r : 438), (r &= 4095), (r |= 32768), Ee.mknod(e, r, 0);
                },
                mkdir: function (e, r) {
                  return (r = void 0 !== r ? r : 511), (r &= 1023), (r |= 16384), Ee.mknod(e, r, 0);
                },
                mkdirTree: function (e, r) {
                  for (var t = e.split("/"), n = "", o = 0; o < t.length; ++o)
                    if (t[o]) {
                      n += "/" + t[o];
                      try {
                        Ee.mkdir(n, r);
                      } catch (e) {
                        if (20 != e.errno) throw e;
                      }
                    }
                },
                mkdev: function (e, r, t) {
                  return void 0 === t && ((t = r), (r = 438)), (r |= 8192), Ee.mknod(e, r, t);
                },
                symlink: function (e, r) {
                  if (!we.resolve(e)) throw new Ee.ErrnoError(44);
                  var t = Ee.lookupPath(r, { parent: !0 }).node;
                  if (!t) throw new Ee.ErrnoError(44);
                  var n = he.basename(r),
                    o = Ee.mayCreate(t, n);
                  if (o) throw new Ee.ErrnoError(o);
                  if (!t.node_ops.symlink) throw new Ee.ErrnoError(63);
                  return t.node_ops.symlink(t, n, e);
                },
                rename: function (e, r) {
                  var t,
                    n,
                    o = he.dirname(e),
                    i = he.dirname(r),
                    a = he.basename(e),
                    s = he.basename(r);
                  if (((t = Ee.lookupPath(e, { parent: !0 }).node), (n = Ee.lookupPath(r, { parent: !0 }).node), !t || !n)) throw new Ee.ErrnoError(44);
                  if (t.mount !== n.mount) throw new Ee.ErrnoError(75);
                  var u,
                    c = Ee.lookupNode(t, a),
                    l = we.relative(e, i);
                  if ("." !== l.charAt(0)) throw new Ee.ErrnoError(28);
                  if ("." !== (l = we.relative(r, o)).charAt(0)) throw new Ee.ErrnoError(55);
                  try {
                    u = Ee.lookupNode(n, s);
                  } catch (e) {}
                  if (c !== u) {
                    var f = Ee.isDir(c.mode),
                      d = Ee.mayDelete(t, a, f);
                    if (d) throw new Ee.ErrnoError(d);
                    if ((d = u ? Ee.mayDelete(n, s, f) : Ee.mayCreate(n, s))) throw new Ee.ErrnoError(d);
                    if (!t.node_ops.rename) throw new Ee.ErrnoError(63);
                    if (Ee.isMountpoint(c) || (u && Ee.isMountpoint(u))) throw new Ee.ErrnoError(10);
                    if (n !== t && (d = Ee.nodePermissions(t, "w"))) throw new Ee.ErrnoError(d);
                    try {
                      Ee.trackingDelegate.willMovePath && Ee.trackingDelegate.willMovePath(e, r);
                    } catch (t) {
                      y("FS.trackingDelegate['willMovePath']('" + e + "', '" + r + "') threw an exception: " + t.message);
                    }
                    Ee.hashRemoveNode(c);
                    try {
                      t.node_ops.rename(c, n, s);
                    } catch (e) {
                      throw e;
                    } finally {
                      Ee.hashAddNode(c);
                    }
                    try {
                      Ee.trackingDelegate.onMovePath && Ee.trackingDelegate.onMovePath(e, r);
                    } catch (t) {
                      y("FS.trackingDelegate['onMovePath']('" + e + "', '" + r + "') threw an exception: " + t.message);
                    }
                  }
                },
                rmdir: function (e) {
                  var r = Ee.lookupPath(e, { parent: !0 }).node,
                    t = he.basename(e),
                    n = Ee.lookupNode(r, t),
                    o = Ee.mayDelete(r, t, !0);
                  if (o) throw new Ee.ErrnoError(o);
                  if (!r.node_ops.rmdir) throw new Ee.ErrnoError(63);
                  if (Ee.isMountpoint(n)) throw new Ee.ErrnoError(10);
                  try {
                    Ee.trackingDelegate.willDeletePath && Ee.trackingDelegate.willDeletePath(e);
                  } catch (r) {
                    y("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + r.message);
                  }
                  r.node_ops.rmdir(r, t), Ee.destroyNode(n);
                  try {
                    Ee.trackingDelegate.onDeletePath && Ee.trackingDelegate.onDeletePath(e);
                  } catch (r) {
                    y("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + r.message);
                  }
                },
                readdir: function (e) {
                  var r = Ee.lookupPath(e, { follow: !0 }).node;
                  if (!r.node_ops.readdir) throw new Ee.ErrnoError(54);
                  return r.node_ops.readdir(r);
                },
                unlink: function (e) {
                  var r = Ee.lookupPath(e, { parent: !0 }).node,
                    t = he.basename(e),
                    n = Ee.lookupNode(r, t),
                    o = Ee.mayDelete(r, t, !1);
                  if (o) throw new Ee.ErrnoError(o);
                  if (!r.node_ops.unlink) throw new Ee.ErrnoError(63);
                  if (Ee.isMountpoint(n)) throw new Ee.ErrnoError(10);
                  try {
                    Ee.trackingDelegate.willDeletePath && Ee.trackingDelegate.willDeletePath(e);
                  } catch (r) {
                    y("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + r.message);
                  }
                  r.node_ops.unlink(r, t), Ee.destroyNode(n);
                  try {
                    Ee.trackingDelegate.onDeletePath && Ee.trackingDelegate.onDeletePath(e);
                  } catch (r) {
                    y("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + r.message);
                  }
                },
                readlink: function (e) {
                  var r = Ee.lookupPath(e).node;
                  if (!r) throw new Ee.ErrnoError(44);
                  if (!r.node_ops.readlink) throw new Ee.ErrnoError(28);
                  return we.resolve(Ee.getPath(r.parent), r.node_ops.readlink(r));
                },
                stat: function (e, r) {
                  var t = Ee.lookupPath(e, { follow: !r }).node;
                  if (!t) throw new Ee.ErrnoError(44);
                  if (!t.node_ops.getattr) throw new Ee.ErrnoError(63);
                  return t.node_ops.getattr(t);
                },
                lstat: function (e) {
                  return Ee.stat(e, !0);
                },
                chmod: function (e, r, t) {
                  var n;
                  if (!(n = "string" == typeof e ? Ee.lookupPath(e, { follow: !t }).node : e).node_ops.setattr) throw new Ee.ErrnoError(63);
                  n.node_ops.setattr(n, { mode: (4095 & r) | (-4096 & n.mode), timestamp: Date.now() });
                },
                lchmod: function (e, r) {
                  Ee.chmod(e, r, !0);
                },
                fchmod: function (e, r) {
                  var t = Ee.getStream(e);
                  if (!t) throw new Ee.ErrnoError(8);
                  Ee.chmod(t.node, r);
                },
                chown: function (e, r, t, n) {
                  var o;
                  if (!(o = "string" == typeof e ? Ee.lookupPath(e, { follow: !n }).node : e).node_ops.setattr) throw new Ee.ErrnoError(63);
                  o.node_ops.setattr(o, { timestamp: Date.now() });
                },
                lchown: function (e, r, t) {
                  Ee.chown(e, r, t, !0);
                },
                fchown: function (e, r, t) {
                  var n = Ee.getStream(e);
                  if (!n) throw new Ee.ErrnoError(8);
                  Ee.chown(n.node, r, t);
                },
                truncate: function (e, r) {
                  if (r < 0) throw new Ee.ErrnoError(28);
                  var t;
                  if (!(t = "string" == typeof e ? Ee.lookupPath(e, { follow: !0 }).node : e).node_ops.setattr) throw new Ee.ErrnoError(63);
                  if (Ee.isDir(t.mode)) throw new Ee.ErrnoError(31);
                  if (!Ee.isFile(t.mode)) throw new Ee.ErrnoError(28);
                  var n = Ee.nodePermissions(t, "w");
                  if (n) throw new Ee.ErrnoError(n);
                  t.node_ops.setattr(t, { size: r, timestamp: Date.now() });
                },
                ftruncate: function (e, r) {
                  var t = Ee.getStream(e);
                  if (!t) throw new Ee.ErrnoError(8);
                  if (0 == (2097155 & t.flags)) throw new Ee.ErrnoError(28);
                  Ee.truncate(t.node, r);
                },
                utime: function (e, r, t) {
                  var n = Ee.lookupPath(e, { follow: !0 }).node;
                  n.node_ops.setattr(n, { timestamp: Math.max(r, t) });
                },
                open: function (r, t, n, o, i) {
                  if ("" === r) throw new Ee.ErrnoError(44);
                  var a;
                  if (((n = void 0 === n ? 438 : n), (n = 64 & (t = "string" == typeof t ? Ee.modeStringToFlags(t) : t) ? (4095 & n) | 32768 : 0), "object" == typeof r)) a = r;
                  else {
                    r = he.normalize(r);
                    try {
                      a = Ee.lookupPath(r, { follow: !(131072 & t) }).node;
                    } catch (e) {}
                  }
                  var s = !1;
                  if (64 & t)
                    if (a) {
                      if (128 & t) throw new Ee.ErrnoError(20);
                    } else (a = Ee.mknod(r, n, 0)), (s = !0);
                  if (!a) throw new Ee.ErrnoError(44);
                  if ((Ee.isChrdev(a.mode) && (t &= -513), 65536 & t && !Ee.isDir(a.mode))) throw new Ee.ErrnoError(54);
                  if (!s) {
                    var u = Ee.mayOpen(a, t);
                    if (u) throw new Ee.ErrnoError(u);
                  }
                  512 & t && Ee.truncate(a, 0), (t &= -131713);
                  var c = Ee.createStream({ node: a, path: Ee.getPath(a), flags: t, seekable: !0, position: 0, stream_ops: a.stream_ops, ungotten: [], error: !1 }, o, i);
                  c.stream_ops.open && c.stream_ops.open(c), !e.logReadFiles || 1 & t || (Ee.readFiles || (Ee.readFiles = {}), r in Ee.readFiles || ((Ee.readFiles[r] = 1), y("FS.trackingDelegate error on read file: " + r)));
                  try {
                    if (Ee.trackingDelegate.onOpenFile) {
                      var l = 0;
                      1 != (2097155 & t) && (l |= Ee.tracking.openFlags.READ), 0 != (2097155 & t) && (l |= Ee.tracking.openFlags.WRITE), Ee.trackingDelegate.onOpenFile(r, l);
                    }
                  } catch (e) {
                    y("FS.trackingDelegate['onOpenFile']('" + r + "', flags) threw an exception: " + e.message);
                  }
                  return c;
                },
                close: function (e) {
                  if (Ee.isClosed(e)) throw new Ee.ErrnoError(8);
                  e.getdents && (e.getdents = null);
                  try {
                    e.stream_ops.close && e.stream_ops.close(e);
                  } catch (e) {
                    throw e;
                  } finally {
                    Ee.closeStream(e.fd);
                  }
                  e.fd = null;
                },
                isClosed: function (e) {
                  return null === e.fd;
                },
                llseek: function (e, r, t) {
                  if (Ee.isClosed(e)) throw new Ee.ErrnoError(8);
                  if (!e.seekable || !e.stream_ops.llseek) throw new Ee.ErrnoError(70);
                  if (0 != t && 1 != t && 2 != t) throw new Ee.ErrnoError(28);
                  return (e.position = e.stream_ops.llseek(e, r, t)), (e.ungotten = []), e.position;
                },
                read: function (e, r, t, n, o) {
                  if (n < 0 || o < 0) throw new Ee.ErrnoError(28);
                  if (Ee.isClosed(e)) throw new Ee.ErrnoError(8);
                  if (1 == (2097155 & e.flags)) throw new Ee.ErrnoError(8);
                  if (Ee.isDir(e.node.mode)) throw new Ee.ErrnoError(31);
                  if (!e.stream_ops.read) throw new Ee.ErrnoError(28);
                  var i = void 0 !== o;
                  if (i) {
                    if (!e.seekable) throw new Ee.ErrnoError(70);
                  } else o = e.position;
                  var a = e.stream_ops.read(e, r, t, n, o);
                  return i || (e.position += a), a;
                },
                write: function (e, r, t, n, o, i) {
                  if (n < 0 || o < 0) throw new Ee.ErrnoError(28);
                  if (Ee.isClosed(e)) throw new Ee.ErrnoError(8);
                  if (0 == (2097155 & e.flags)) throw new Ee.ErrnoError(8);
                  if (Ee.isDir(e.node.mode)) throw new Ee.ErrnoError(31);
                  if (!e.stream_ops.write) throw new Ee.ErrnoError(28);
                  e.seekable && 1024 & e.flags && Ee.llseek(e, 0, 2);
                  var a = void 0 !== o;
                  if (a) {
                    if (!e.seekable) throw new Ee.ErrnoError(70);
                  } else o = e.position;
                  var s = e.stream_ops.write(e, r, t, n, o, i);
                  a || (e.position += s);
                  try {
                    e.path && Ee.trackingDelegate.onWriteToFile && Ee.trackingDelegate.onWriteToFile(e.path);
                  } catch (r) {
                    y("FS.trackingDelegate['onWriteToFile']('" + e.path + "') threw an exception: " + r.message);
                  }
                  return s;
                },
                allocate: function (e, r, t) {
                  if (Ee.isClosed(e)) throw new Ee.ErrnoError(8);
                  if (r < 0 || t <= 0) throw new Ee.ErrnoError(28);
                  if (0 == (2097155 & e.flags)) throw new Ee.ErrnoError(8);
                  if (!Ee.isFile(e.node.mode) && !Ee.isDir(e.node.mode)) throw new Ee.ErrnoError(43);
                  if (!e.stream_ops.allocate) throw new Ee.ErrnoError(138);
                  e.stream_ops.allocate(e, r, t);
                },
                mmap: function (e, r, t, n, o, i) {
                  if (0 != (2 & o) && 0 == (2 & i) && 2 != (2097155 & e.flags)) throw new Ee.ErrnoError(2);
                  if (1 == (2097155 & e.flags)) throw new Ee.ErrnoError(2);
                  if (!e.stream_ops.mmap) throw new Ee.ErrnoError(43);
                  return e.stream_ops.mmap(e, r, t, n, o, i);
                },
                msync: function (e, r, t, n, o) {
                  return e && e.stream_ops.msync ? e.stream_ops.msync(e, r, t, n, o) : 0;
                },
                munmap: function (e) {
                  return 0;
                },
                ioctl: function (e, r, t) {
                  if (!e.stream_ops.ioctl) throw new Ee.ErrnoError(59);
                  return e.stream_ops.ioctl(e, r, t);
                },
                readFile: function (e, r) {
                  if ((((r = r || {}).flags = r.flags || "r"), (r.encoding = r.encoding || "binary"), "utf8" !== r.encoding && "binary" !== r.encoding)) throw new Error('Invalid encoding type "' + r.encoding + '"');
                  var t,
                    n = Ee.open(e, r.flags),
                    o = Ee.stat(e).size,
                    i = new Uint8Array(o);
                  return Ee.read(n, i, 0, o, 0), "utf8" === r.encoding ? (t = C(i, 0)) : "binary" === r.encoding && (t = i), Ee.close(n), t;
                },
                writeFile: function (e, r, t) {
                  (t = t || {}).flags = t.flags || "w";
                  var n = Ee.open(e, t.flags, t.mode);
                  if ("string" == typeof r) {
                    var o = new Uint8Array(O(r) + 1),
                      i = N(r, o, 0, o.length);
                    Ee.write(n, o, 0, i, void 0, t.canOwn);
                  } else {
                    if (!ArrayBuffer.isView(r)) throw new Error("Unsupported data type");
                    Ee.write(n, r, 0, r.byteLength, void 0, t.canOwn);
                  }
                  Ee.close(n);
                },
                cwd: function () {
                  return Ee.currentPath;
                },
                chdir: function (e) {
                  var r = Ee.lookupPath(e, { follow: !0 });
                  if (null === r.node) throw new Ee.ErrnoError(44);
                  if (!Ee.isDir(r.node.mode)) throw new Ee.ErrnoError(54);
                  var t = Ee.nodePermissions(r.node, "x");
                  if (t) throw new Ee.ErrnoError(t);
                  Ee.currentPath = r.path;
                },
                createDefaultDirectories: function () {
                  Ee.mkdir("/tmp"), Ee.mkdir("/home"), Ee.mkdir("/home/web_user");
                },
                createDefaultDevices: function () {
                  Ee.mkdir("/dev"),
                    Ee.registerDevice(Ee.makedev(1, 3), {
                      read: function () {
                        return 0;
                      },
                      write: function (e, r, t, n, o) {
                        return n;
                      },
                    }),
                    Ee.mkdev("/dev/null", Ee.makedev(1, 3)),
                    ge.register(Ee.makedev(5, 0), ge.default_tty_ops),
                    ge.register(Ee.makedev(6, 0), ge.default_tty1_ops),
                    Ee.mkdev("/dev/tty", Ee.makedev(5, 0)),
                    Ee.mkdev("/dev/tty1", Ee.makedev(6, 0));
                  var e = (function () {
                    if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
                      var e = new Uint8Array(1);
                      return function () {
                        return crypto.getRandomValues(e), e[0];
                      };
                    }
                    if (c)
                      try {
                        var r = t;
                        return function () {
                          return r.randomBytes(1)[0];
                        };
                      } catch (e) {}
                    return function () {
                      re("randomDevice");
                    };
                  })();
                  Ee.createDevice("/dev", "random", e), Ee.createDevice("/dev", "urandom", e), Ee.mkdir("/dev/shm"), Ee.mkdir("/dev/shm/tmp");
                },
                createSpecialDirectories: function () {
                  Ee.mkdir("/proc"),
                    Ee.mkdir("/proc/self"),
                    Ee.mkdir("/proc/self/fd"),
                    Ee.mount(
                      {
                        mount: function () {
                          var e = Ee.createNode("/proc/self", "fd", 16895, 73);
                          return (
                            (e.node_ops = {
                              lookup: function (e, r) {
                                var t = +r,
                                  n = Ee.getStream(t);
                                if (!n) throw new Ee.ErrnoError(8);
                                var o = {
                                  parent: null,
                                  mount: { mountpoint: "fake" },
                                  node_ops: {
                                    readlink: function () {
                                      return n.path;
                                    },
                                  },
                                };
                                return (o.parent = o), o;
                              },
                            }),
                            e
                          );
                        },
                      },
                      {},
                      "/proc/self/fd"
                    );
                },
                createStandardStreams: function () {
                  e.stdin ? Ee.createDevice("/dev", "stdin", e.stdin) : Ee.symlink("/dev/tty", "/dev/stdin"),
                    e.stdout ? Ee.createDevice("/dev", "stdout", null, e.stdout) : Ee.symlink("/dev/tty", "/dev/stdout"),
                    e.stderr ? Ee.createDevice("/dev", "stderr", null, e.stderr) : Ee.symlink("/dev/tty1", "/dev/stderr"),
                    Ee.open("/dev/stdin", "r"),
                    Ee.open("/dev/stdout", "w"),
                    Ee.open("/dev/stderr", "w");
                },
                ensureErrnoError: function () {
                  Ee.ErrnoError ||
                    ((Ee.ErrnoError = function (e, r) {
                      (this.node = r),
                        (this.setErrno = function (e) {
                          this.errno = e;
                        }),
                        this.setErrno(e),
                        (this.message = "FS error");
                    }),
                    (Ee.ErrnoError.prototype = new Error()),
                    (Ee.ErrnoError.prototype.constructor = Ee.ErrnoError),
                    [44].forEach(function (e) {
                      (Ee.genericErrors[e] = new Ee.ErrnoError(e)), (Ee.genericErrors[e].stack = "<generic error, no stack>");
                    }));
                },
                staticInit: function () {
                  Ee.ensureErrnoError(), (Ee.nameTable = new Array(4096)), Ee.mount(ye, {}, "/"), Ee.createDefaultDirectories(), Ee.createDefaultDevices(), Ee.createSpecialDirectories(), (Ee.filesystems = { MEMFS: ye });
                },
                init: function (r, t, n) {
                  (Ee.init.initialized = !0), Ee.ensureErrnoError(), (e.stdin = r || e.stdin), (e.stdout = t || e.stdout), (e.stderr = n || e.stderr), Ee.createStandardStreams();
                },
                quit: function () {
                  Ee.init.initialized = !1;
                  var r = e._fflush;
                  r && r(0);
                  for (var t = 0; t < Ee.streams.length; t++) {
                    var n = Ee.streams[t];
                    n && Ee.close(n);
                  }
                },
                getMode: function (e, r) {
                  var t = 0;
                  return e && (t |= 365), r && (t |= 146), t;
                },
                findObject: function (e, r) {
                  var t = Ee.analyzePath(e, r);
                  return t.exists ? t.object : (pe(t.error), null);
                },
                analyzePath: function (e, r) {
                  try {
                    e = (n = Ee.lookupPath(e, { follow: !r })).path;
                  } catch (e) {}
                  var t = { isRoot: !1, exists: !1, error: 0, name: null, path: null, object: null, parentExists: !1, parentPath: null, parentObject: null };
                  try {
                    var n = Ee.lookupPath(e, { parent: !0 });
                    (t.parentExists = !0),
                      (t.parentPath = n.path),
                      (t.parentObject = n.node),
                      (t.name = he.basename(e)),
                      (n = Ee.lookupPath(e, { follow: !r })),
                      (t.exists = !0),
                      (t.path = n.path),
                      (t.object = n.node),
                      (t.name = n.node.name),
                      (t.isRoot = "/" === n.path);
                  } catch (e) {
                    t.error = e.errno;
                  }
                  return t;
                },
                createPath: function (e, r, t, n) {
                  e = "string" == typeof e ? e : Ee.getPath(e);
                  for (var o = r.split("/").reverse(); o.length; ) {
                    var i = o.pop();
                    if (i) {
                      var a = he.join2(e, i);
                      try {
                        Ee.mkdir(a);
                      } catch (e) {}
                      e = a;
                    }
                  }
                  return a;
                },
                createFile: function (e, r, t, n, o) {
                  var i = he.join2("string" == typeof e ? e : Ee.getPath(e), r),
                    a = Ee.getMode(n, o);
                  return Ee.create(i, a);
                },
                createDataFile: function (e, r, t, n, o, i) {
                  var a = r ? he.join2("string" == typeof e ? e : Ee.getPath(e), r) : e,
                    s = Ee.getMode(n, o),
                    u = Ee.create(a, s);
                  if (t) {
                    if ("string" == typeof t) {
                      for (var c = new Array(t.length), l = 0, f = t.length; l < f; ++l) c[l] = t.charCodeAt(l);
                      t = c;
                    }
                    Ee.chmod(u, 146 | s);
                    var d = Ee.open(u, "w");
                    Ee.write(d, t, 0, t.length, 0, i), Ee.close(d), Ee.chmod(u, s);
                  }
                  return u;
                },
                createDevice: function (e, r, t, n) {
                  var o = he.join2("string" == typeof e ? e : Ee.getPath(e), r),
                    i = Ee.getMode(!!t, !!n);
                  Ee.createDevice.major || (Ee.createDevice.major = 64);
                  var a = Ee.makedev(Ee.createDevice.major++, 0);
                  return (
                    Ee.registerDevice(a, {
                      open: function (e) {
                        e.seekable = !1;
                      },
                      close: function (e) {
                        n && n.buffer && n.buffer.length && n(10);
                      },
                      read: function (e, r, n, o, i) {
                        for (var a = 0, s = 0; s < o; s++) {
                          var u;
                          try {
                            u = t();
                          } catch (e) {
                            throw new Ee.ErrnoError(29);
                          }
                          if (void 0 === u && 0 === a) throw new Ee.ErrnoError(6);
                          if (null == u) break;
                          a++, (r[n + s] = u);
                        }
                        return a && (e.node.timestamp = Date.now()), a;
                      },
                      write: function (e, r, t, o, i) {
                        for (var a = 0; a < o; a++)
                          try {
                            n(r[t + a]);
                          } catch (e) {
                            throw new Ee.ErrnoError(29);
                          }
                        return o && (e.node.timestamp = Date.now()), a;
                      },
                    }),
                    Ee.mkdev(o, i, a)
                  );
                },
                forceLoadFile: function (e) {
                  if (e.isDevice || e.isFolder || e.link || e.contents) return !0;
                  var r = !0;
                  if ("undefined" != typeof XMLHttpRequest)
                    throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
                  if (!m) throw new Error("Cannot load without read() or XMLHttpRequest.");
                  try {
                    (e.contents = Ae(m(e.url), !0)), (e.usedBytes = e.contents.length);
                  } catch (e) {
                    r = !1;
                  }
                  return r || pe(29), r;
                },
                createLazyFile: function (e, r, t, n, o) {
                  function i() {
                    (this.lengthKnown = !1), (this.chunks = []);
                  }
                  if (
                    ((i.prototype.get = function (e) {
                      if (!(e > this.length - 1 || e < 0)) {
                        var r = e % this.chunkSize,
                          t = (e / this.chunkSize) | 0;
                        return this.getter(t)[r];
                      }
                    }),
                    (i.prototype.setDataGetter = function (e) {
                      this.getter = e;
                    }),
                    (i.prototype.cacheLength = function () {
                      var e = new XMLHttpRequest();
                      if ((e.open("HEAD", t, !1), e.send(null), !((e.status >= 200 && e.status < 300) || 304 === e.status))) throw new Error("Couldn't load " + t + ". Status: " + e.status);
                      var r,
                        n = Number(e.getResponseHeader("Content-length")),
                        o = (r = e.getResponseHeader("Accept-Ranges")) && "bytes" === r,
                        i = (r = e.getResponseHeader("Content-Encoding")) && "gzip" === r,
                        a = 1048576;
                      o || (a = n);
                      var s = this;
                      s.setDataGetter(function (e) {
                        var r = e * a,
                          o = (e + 1) * a - 1;
                        if (
                          ((o = Math.min(o, n - 1)),
                          void 0 === s.chunks[e] &&
                            (s.chunks[e] = (function (e, r) {
                              if (e > r) throw new Error("invalid range (" + e + ", " + r + ") or no bytes requested!");
                              if (r > n - 1) throw new Error("only " + n + " bytes available! programmer error!");
                              var o = new XMLHttpRequest();
                              if (
                                (o.open("GET", t, !1),
                                n !== a && o.setRequestHeader("Range", "bytes=" + e + "-" + r),
                                "undefined" != typeof Uint8Array && (o.responseType = "arraybuffer"),
                                o.overrideMimeType && o.overrideMimeType("text/plain; charset=x-user-defined"),
                                o.send(null),
                                !((o.status >= 200 && o.status < 300) || 304 === o.status))
                              )
                                throw new Error("Couldn't load " + t + ". Status: " + o.status);
                              return void 0 !== o.response ? new Uint8Array(o.response || []) : Ae(o.responseText || "", !0);
                            })(r, o)),
                          void 0 === s.chunks[e])
                        )
                          throw new Error("doXHR failed!");
                        return s.chunks[e];
                      }),
                        (!i && n) || ((a = n = 1), (n = this.getter(0).length), (a = n), v("LazyFiles on gzip forces download of the whole file when length is accessed")),
                        (this._length = n),
                        (this._chunkSize = a),
                        (this.lengthKnown = !0);
                    }),
                    "undefined" != typeof XMLHttpRequest)
                  ) {
                    if (!u) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var a = new i();
                    Object.defineProperties(a, {
                      length: {
                        get: function () {
                          return this.lengthKnown || this.cacheLength(), this._length;
                        },
                      },
                      chunkSize: {
                        get: function () {
                          return this.lengthKnown || this.cacheLength(), this._chunkSize;
                        },
                      },
                    });
                    var s = { isDevice: !1, contents: a };
                  } else s = { isDevice: !1, url: t };
                  var c = Ee.createFile(e, r, s, n, o);
                  s.contents ? (c.contents = s.contents) : s.url && ((c.contents = null), (c.url = s.url)),
                    Object.defineProperties(c, {
                      usedBytes: {
                        get: function () {
                          return this.contents.length;
                        },
                      },
                    });
                  var l = {};
                  return (
                    Object.keys(c.stream_ops).forEach(function (e) {
                      var r = c.stream_ops[e];
                      l[e] = function () {
                        if (!Ee.forceLoadFile(c)) throw new Ee.ErrnoError(29);
                        return r.apply(null, arguments);
                      };
                    }),
                    (l.read = function (e, r, t, n, o) {
                      if (!Ee.forceLoadFile(c)) throw new Ee.ErrnoError(29);
                      var i = e.node.contents;
                      if (o >= i.length) return 0;
                      var a = Math.min(i.length - o, n);
                      if (i.slice) for (var s = 0; s < a; s++) r[t + s] = i[o + s];
                      else for (s = 0; s < a; s++) r[t + s] = i.get(o + s);
                      return a;
                    }),
                    (c.stream_ops = l),
                    c
                  );
                },
                createPreloadedFile: function (r, t, n, o, i, a, s, u, c, l) {
                  Browser.init();
                  var f = t ? we.resolve(he.join2(r, t)) : r;
                  function d(n) {
                    function d(e) {
                      l && l(), u || Ee.createDataFile(r, t, e, o, i, c), a && a(), ee();
                    }
                    var m = !1;
                    e.preloadPlugins.forEach(function (e) {
                      m ||
                        (e.canHandle(f) &&
                          (e.handle(n, f, d, function () {
                            s && s(), ee();
                          }),
                          (m = !0)));
                    }),
                      m || d(n);
                  }
                  Q(),
                    "string" == typeof n
                      ? Browser.asyncLoad(
                          n,
                          function (e) {
                            d(e);
                          },
                          s
                        )
                      : d(n);
                },
                indexedDB: function () {
                  return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                },
                DB_NAME: function () {
                  return "EM_FS_" + window.location.pathname;
                },
                DB_VERSION: 20,
                DB_STORE_NAME: "FILE_DATA",
                saveFilesToDB: function (e, r, t) {
                  (r = r || function () {}), (t = t || function () {});
                  var n = Ee.indexedDB();
                  try {
                    var o = n.open(Ee.DB_NAME(), Ee.DB_VERSION);
                  } catch (e) {
                    return t(e);
                  }
                  (o.onupgradeneeded = function () {
                    v("creating db"), o.result.createObjectStore(Ee.DB_STORE_NAME);
                  }),
                    (o.onsuccess = function () {
                      var n = o.result.transaction([Ee.DB_STORE_NAME], "readwrite"),
                        i = n.objectStore(Ee.DB_STORE_NAME),
                        a = 0,
                        s = 0,
                        u = e.length;
                      function c() {
                        0 == s ? r() : t();
                      }
                      e.forEach(function (e) {
                        var r = i.put(Ee.analyzePath(e).object.contents, e);
                        (r.onsuccess = function () {
                          ++a + s == u && c();
                        }),
                          (r.onerror = function () {
                            s++, a + s == u && c();
                          });
                      }),
                        (n.onerror = t);
                    }),
                    (o.onerror = t);
                },
                loadFilesFromDB: function (e, r, t) {
                  (r = r || function () {}), (t = t || function () {});
                  var n = Ee.indexedDB();
                  try {
                    var o = n.open(Ee.DB_NAME(), Ee.DB_VERSION);
                  } catch (e) {
                    return t(e);
                  }
                  (o.onupgradeneeded = t),
                    (o.onsuccess = function () {
                      var n = o.result;
                      try {
                        var i = n.transaction([Ee.DB_STORE_NAME], "readonly");
                      } catch (e) {
                        return void t(e);
                      }
                      var a = i.objectStore(Ee.DB_STORE_NAME),
                        s = 0,
                        u = 0,
                        c = e.length;
                      function l() {
                        0 == u ? r() : t();
                      }
                      e.forEach(function (e) {
                        var r = a.get(e);
                        (r.onsuccess = function () {
                          Ee.analyzePath(e).exists && Ee.unlink(e), Ee.createDataFile(he.dirname(e), he.basename(e), r.result, !0, !0, !0), ++s + u == c && l();
                        }),
                          (r.onerror = function () {
                            u++, s + u == c && l();
                          });
                      }),
                        (i.onerror = t);
                    }),
                    (o.onerror = t);
                },
              },
              _e = {
                mappings: {},
                DEFAULT_POLLMASK: 5,
                umask: 511,
                calculateAt: function (e, r) {
                  if ("/" !== r[0]) {
                    var t;
                    if (-100 === e) t = Ee.cwd();
                    else {
                      var n = Ee.getStream(e);
                      if (!n) throw new Ee.ErrnoError(8);
                      t = n.path;
                    }
                    r = he.join2(t, r);
                  }
                  return r;
                },
                doStat: function (e, r, t) {
                  try {
                    var n = e(r);
                  } catch (e) {
                    if (e && e.node && he.normalize(r) !== he.normalize(Ee.getPath(e.node))) return -54;
                    throw e;
                  }
                  return (
                    (T[t >> 2] = n.dev),
                    (T[(t + 4) >> 2] = 0),
                    (T[(t + 8) >> 2] = n.ino),
                    (T[(t + 12) >> 2] = n.mode),
                    (T[(t + 16) >> 2] = n.nlink),
                    (T[(t + 20) >> 2] = n.uid),
                    (T[(t + 24) >> 2] = n.gid),
                    (T[(t + 28) >> 2] = n.rdev),
                    (T[(t + 32) >> 2] = 0),
                    (ie = [n.size >>> 0, ((oe = n.size), +X(oe) >= 1 ? (oe > 0 ? (0 | $(+K(oe / 4294967296), 4294967295)) >>> 0 : ~~+Y((oe - +(~~oe >>> 0)) / 4294967296) >>> 0) : 0)]),
                    (T[(t + 40) >> 2] = ie[0]),
                    (T[(t + 44) >> 2] = ie[1]),
                    (T[(t + 48) >> 2] = 4096),
                    (T[(t + 52) >> 2] = n.blocks),
                    (T[(t + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                    (T[(t + 60) >> 2] = 0),
                    (T[(t + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                    (T[(t + 68) >> 2] = 0),
                    (T[(t + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                    (T[(t + 76) >> 2] = 0),
                    (ie = [n.ino >>> 0, ((oe = n.ino), +X(oe) >= 1 ? (oe > 0 ? (0 | $(+K(oe / 4294967296), 4294967295)) >>> 0 : ~~+Y((oe - +(~~oe >>> 0)) / 4294967296) >>> 0) : 0)]),
                    (T[(t + 80) >> 2] = ie[0]),
                    (T[(t + 84) >> 2] = ie[1]),
                    0
                  );
                },
                doMsync: function (e, r, t, n, o) {
                  var i = x.slice(e, e + t);
                  Ee.msync(r, i, o, t, n);
                },
                doMkdir: function (e, r) {
                  return "/" === (e = he.normalize(e))[e.length - 1] && (e = e.substr(0, e.length - 1)), Ee.mkdir(e, r, 0), 0;
                },
                doMknod: function (e, r, t) {
                  switch (61440 & r) {
                    case 32768:
                    case 8192:
                    case 24576:
                    case 4096:
                    case 49152:
                      break;
                    default:
                      return -28;
                  }
                  return Ee.mknod(e, r, t), 0;
                },
                doReadlink: function (e, r, t) {
                  if (t <= 0) return -28;
                  var n = Ee.readlink(e),
                    o = Math.min(t, O(n)),
                    i = A[r + o];
                  return B(n, r, t + 1), (A[r + o] = i), o;
                },
                doAccess: function (e, r) {
                  if (-8 & r) return -28;
                  var t;
                  if (!(t = Ee.lookupPath(e, { follow: !0 }).node)) return -44;
                  var n = "";
                  return 4 & r && (n += "r"), 2 & r && (n += "w"), 1 & r && (n += "x"), n && Ee.nodePermissions(t, n) ? -2 : 0;
                },
                doDup: function (e, r, t) {
                  var n = Ee.getStream(t);
                  return n && Ee.close(n), Ee.open(e, r, 0, t, t).fd;
                },
                doReadv: function (e, r, t, n) {
                  for (var o = 0, i = 0; i < t; i++) {
                    var a = T[(r + 8 * i) >> 2],
                      s = T[(r + (8 * i + 4)) >> 2],
                      u = Ee.read(e, A, a, s, n);
                    if (u < 0) return -1;
                    if (((o += u), u < s)) break;
                  }
                  return o;
                },
                doWritev: function (e, r, t, n) {
                  for (var o = 0, i = 0; i < t; i++) {
                    var a = T[(r + 8 * i) >> 2],
                      s = T[(r + (8 * i + 4)) >> 2],
                      u = Ee.write(e, A, a, s, n);
                    if (u < 0) return -1;
                    o += u;
                  }
                  return o;
                },
                varargs: void 0,
                get: function () {
                  return (_e.varargs += 4), T[(_e.varargs - 4) >> 2];
                },
                getStr: function (e) {
                  return z(e);
                },
                getStreamFromFD: function (e) {
                  var r = Ee.getStream(e);
                  if (!r) throw new Ee.ErrnoError(8);
                  return r;
                },
                get64: function (e, r) {
                  return e;
                },
              };
            function ke(e) {
              try {
                return k.grow((e - F.byteLength + 65535) >>> 16), I(k.buffer), 1;
              } catch (e) {}
            }
            function De() {
              if (!De.called) {
                (De.called = !0), (T[Be() >> 2] = 60 * new Date().getTimezoneOffset());
                var e = new Date().getFullYear(),
                  r = new Date(e, 0, 1),
                  t = new Date(e, 6, 1);
                T[Ne() >> 2] = Number(r.getTimezoneOffset() != t.getTimezoneOffset());
                var n = s(r),
                  o = s(t),
                  i = j(n),
                  a = j(o);
                t.getTimezoneOffset() < r.getTimezoneOffset() ? ((T[ze() >> 2] = i), (T[(ze() + 4) >> 2] = a)) : ((T[ze() >> 2] = a), (T[(ze() + 4) >> 2] = i));
              }
              function s(e) {
                var r = e.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                return r ? r[1] : "GMT";
              }
            }
            function be(e) {
              try {
                return e();
              } catch (e) {
                re(e);
              }
            }
            var Se = {
                State: { Normal: 0, Unwinding: 1, Rewinding: 2 },
                state: 0,
                StackSize: 4096,
                currData: null,
                handleSleepReturnValue: 0,
                exportCallStack: [],
                callStackNameToId: {},
                callStackIdToName: {},
                callStackId: 0,
                afterUnwind: null,
                asyncFinalizers: [],
                sleepCallbacks: [],
                getCallStackId: function (e) {
                  var r = Se.callStackNameToId[e];
                  return void 0 === r && ((r = Se.callStackId++), (Se.callStackNameToId[e] = r), (Se.callStackIdToName[r] = e)), r;
                },
                instrumentWasmExports: function (e) {
                  var r = {};
                  for (var t in e)
                    !(function (t) {
                      var n = e[t];
                      r[t] =
                        "function" == typeof n
                          ? function () {
                              Se.exportCallStack.push(t);
                              try {
                                return n.apply(null, arguments);
                              } finally {
                                if (b) return;
                                var e = Se.exportCallStack.pop();
                                S(e === t), Se.maybeStopUnwind();
                              }
                            }
                          : n;
                    })(t);
                  return r;
                },
                maybeStopUnwind: function () {
                  Se.currData &&
                    Se.state === Se.State.Unwinding &&
                    0 === Se.exportCallStack.length &&
                    ((Se.state = Se.State.Normal), be(e._asyncify_stop_unwind), "undefined" != typeof Fibers && Fibers.trampoline(), Se.afterUnwind && (Se.afterUnwind(), (Se.afterUnwind = null)));
                },
                allocateData: function () {
                  var e = Me(12 + Se.StackSize);
                  return Se.setDataHeader(e, e + 12, Se.StackSize), Se.setDataRewindFunc(e), e;
                },
                setDataHeader: function (e, r, t) {
                  (T[e >> 2] = r), (T[(e + 4) >> 2] = r + t);
                },
                setDataRewindFunc: function (e) {
                  var r = Se.exportCallStack[0],
                    t = Se.getCallStackId(r);
                  T[(e + 8) >> 2] = t;
                },
                getDataRewindFunc: function (r) {
                  var t = T[(r + 8) >> 2],
                    n = Se.callStackIdToName[t];
                  return e.asm[n];
                },
                handleSleep: function (r) {
                  if (!b) {
                    if (((_ = !0), Se.state === Se.State.Normal)) {
                      var t = !1,
                        n = !1;
                      r(function (r) {
                        if (!b && ((Se.handleSleepReturnValue = r || 0), (t = !0), n)) {
                          (Se.state = Se.State.Rewinding),
                            be(function () {
                              e._asyncify_start_rewind(Se.currData);
                            }),
                            "undefined" != typeof Browser && Browser.mainLoop.func && Browser.mainLoop.resume();
                          var o = Se.getDataRewindFunc(Se.currData)();
                          if (!Se.currData) {
                            var i = Se.asyncFinalizers;
                            (Se.asyncFinalizers = []),
                              i.forEach(function (e) {
                                e(o);
                              });
                          }
                        }
                      }),
                        (n = !0),
                        t ||
                          ((Se.state = Se.State.Unwinding),
                          (Se.currData = Se.allocateData()),
                          be(function () {
                            e._asyncify_start_unwind(Se.currData);
                          }),
                          "undefined" != typeof Browser && Browser.mainLoop.func && Browser.mainLoop.pause());
                    } else
                      Se.state === Se.State.Rewinding
                        ? ((Se.state = Se.State.Normal),
                          be(e._asyncify_stop_rewind),
                          Re(Se.currData),
                          (Se.currData = null),
                          Se.sleepCallbacks.forEach(function (e) {
                            e();
                          }))
                        : re("invalid state: " + Se.state);
                    return Se.handleSleepReturnValue;
                  }
                },
                handleAsync: function (e) {
                  return Se.handleSleep(function (r) {
                    e().then(r);
                  });
                },
              },
              Fe = function (e, r, t, n) {
                e || (e = this), (this.parent = e), (this.mount = e.mount), (this.mounted = null), (this.id = Ee.nextInode++), (this.name = r), (this.mode = t), (this.node_ops = {}), (this.stream_ops = {}), (this.rdev = n);
              };
            function Ae(e, r, t) {
              var n = t > 0 ? t : O(e) + 1,
                o = new Array(n),
                i = N(e, o, 0, o.length);
              return r && (o.length = i), o;
            }
            Object.defineProperties(Fe.prototype, {
              read: {
                get: function () {
                  return 365 == (365 & this.mode);
                },
                set: function (e) {
                  e ? (this.mode |= 365) : (this.mode &= -366);
                },
              },
              write: {
                get: function () {
                  return 146 == (146 & this.mode);
                },
                set: function (e) {
                  e ? (this.mode |= 146) : (this.mode &= -147);
                },
              },
              isFolder: {
                get: function () {
                  return Ee.isDir(this.mode);
                },
              },
              isDevice: {
                get: function () {
                  return Ee.isChrdev(this.mode);
                },
              },
            }),
              (Ee.FSNode = Fe),
              Ee.staticInit(),
              W.push({
                func: function () {
                  Te();
                },
              });
            var xe,
              Pe = {
                d: function (e, r, t, n) {
                  re("Assertion failed: " + z(e) + ", at: " + [r ? z(r) : "unknown filename", t, n ? z(n) : "unknown function"]);
                },
                J: function (e, r) {
                  return (function (e, r) {
                    var t;
                    if (0 === e) t = Date.now();
                    else {
                      if (1 !== e && 4 !== e) return pe(28), -1;
                      t = ae();
                    }
                    return (T[r >> 2] = (t / 1e3) | 0), (T[(r + 4) >> 2] = ((t % 1e3) * 1e3 * 1e3) | 0), 0;
                  })(e, r);
                },
                F: function (e, r) {
                  try {
                    return (e = _e.getStr(e)), _e.doAccess(e, r);
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), -e.errno;
                  }
                },
                w: function (e, r, t) {
                  _e.varargs = t;
                  try {
                    var n = _e.getStreamFromFD(e);
                    switch (r) {
                      case 0:
                        return (o = _e.get()) < 0 ? -28 : Ee.open(n.path, n.flags, 0, o).fd;
                      case 1:
                      case 2:
                        return 0;
                      case 3:
                        return n.flags;
                      case 4:
                        var o = _e.get();
                        return (n.flags |= o), 0;
                      case 12:
                        return (o = _e.get()), (P[(o + 0) >> 1] = 2), 0;
                      case 13:
                      case 14:
                        return 0;
                      case 16:
                      case 8:
                        return -28;
                      case 9:
                        return pe(28), -1;
                      default:
                        return -28;
                    }
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), -e.errno;
                  }
                },
                H: function (e, r) {
                  try {
                    if (0 === r) return -28;
                    var t = Ee.cwd();
                    return r < O(t) + 1 ? -68 : (B(t, e, r), e);
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), -e.errno;
                  }
                },
                D: function (e, r, t) {
                  _e.varargs = t;
                  try {
                    var n = _e.getStreamFromFD(e);
                    switch (r) {
                      case 21509:
                      case 21505:
                        return n.tty ? 0 : -59;
                      case 21510:
                      case 21511:
                      case 21512:
                      case 21506:
                      case 21507:
                      case 21508:
                        return n.tty ? 0 : -59;
                      case 21519:
                        if (!n.tty) return -59;
                        var o = _e.get();
                        return (T[o >> 2] = 0), 0;
                      case 21520:
                        return n.tty ? -28 : -59;
                      case 21531:
                        return (o = _e.get()), Ee.ioctl(n, r, o);
                      case 21523:
                      case 21524:
                        return n.tty ? 0 : -59;
                      default:
                        re("bad ioctl syscall " + r);
                    }
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), -e.errno;
                  }
                },
                E: function (e, r, t) {
                  _e.varargs = t;
                  try {
                    var n = _e.getStr(e),
                      o = _e.get();
                    return Ee.open(n, r, o).fd;
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), -e.errno;
                  }
                },
                G: function (e, r) {
                  try {
                    return (e = _e.getStr(e)), _e.doStat(Ee.stat, e, r);
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), -e.errno;
                  }
                },
                I: function (e) {
                  try {
                    return (e = _e.getStr(e)), Ee.unlink(e), 0;
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), -e.errno;
                  }
                },
                B: function (r, t) {
                  return Se.handleAsync(async () => {
                    e.emglken_stdin_buffers.length ||
                      (await new Promise((r) => {
                        e.emglken_stdin_ready = r;
                      }));
                    const n = e.emglken_stdin_buffers[0],
                      o = Math.min(n.length, t);
                    return x.set(n.subarray(0, o), r), o == n.length ? e.emglken_stdin_buffers.shift() : (e.emglken_stdin_buffers[0] = n.subarray(o)), o;
                  });
                },
                f: function (e, r) {
                  return (function (e, r) {
                    throw (Ie(e, r || 1), "longjmp");
                  })(e, r);
                },
                A: function (e, r, t) {
                  x.copyWithin(e, r, r + t);
                },
                z: function (e) {
                  e >>>= 0;
                  var r = x.length;
                  if (e > 2147483648) return !1;
                  for (var t, n, o = 1; o <= 4; o *= 2) {
                    var i = r * (1 + 0.2 / o);
                    if (((i = Math.min(i, e + 100663296)), ke(Math.min(2147483648, ((t = Math.max(16777216, e, i)) % (n = 65536) > 0 && (t += n - (t % n)), t))))) return !0;
                  }
                  return !1;
                },
                h: function (e) {
                  Xe(e);
                },
                v: function (e) {
                  try {
                    var r = _e.getStreamFromFD(e);
                    return Ee.close(r), 0;
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), e.errno;
                  }
                },
                C: function (e, r, t, n) {
                  try {
                    var o = _e.getStreamFromFD(e),
                      i = _e.doReadv(o, r, t);
                    return (T[n >> 2] = i), 0;
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), e.errno;
                  }
                },
                x: function (e, r, t, n, o) {
                  try {
                    var i = _e.getStreamFromFD(e),
                      a = 4294967296 * t + (r >>> 0);
                    return a <= -9007199254740992 || a >= 9007199254740992
                      ? -61
                      : (Ee.llseek(i, a, n),
                        (ie = [i.position >>> 0, ((oe = i.position), +X(oe) >= 1 ? (oe > 0 ? (0 | $(+K(oe / 4294967296), 4294967295)) >>> 0 : ~~+Y((oe - +(~~oe >>> 0)) / 4294967296) >>> 0) : 0)]),
                        (T[o >> 2] = ie[0]),
                        (T[(o + 4) >> 2] = ie[1]),
                        i.getdents && 0 === a && 0 === n && (i.getdents = null),
                        0);
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), e.errno;
                  }
                },
                u: function (e, r, t, n) {
                  try {
                    var o = _e.getStreamFromFD(e),
                      i = _e.doWritev(o, r, t);
                    return (T[n >> 2] = i), 0;
                  } catch (e) {
                    return (void 0 !== Ee && e instanceof Ee.ErrnoError) || re(e), e.errno;
                  }
                },
                c: function () {
                  return 0 | D;
                },
                e: function (e) {
                  var r = Date.now();
                  return (T[e >> 2] = (r / 1e3) | 0), (T[(e + 4) >> 2] = ((r % 1e3) * 1e3) | 0), 0;
                },
                t: function (e, r, t) {
                  return ce(e, r, t, (e) => e.normalize("NFD"));
                },
                s: function (e, r, t) {
                  return ce(e, r, t, (e) => e.normalize("NFC"));
                },
                r: function (e, r, t) {
                  return ce(e, r, t, (e) => e.toLowerCase());
                },
                q: function (e, r, t, n) {
                  return ce(
                    e,
                    r,
                    t,
                    (e) =>
                      e.reduce((e, r, t) => {
                        const o = {
                            ß: "Ss",
                            Ǆ: "ǅ",
                            ǅ: "ǅ",
                            ǆ: "ǅ",
                            Ǉ: "ǈ",
                            ǈ: "ǈ",
                            ǉ: "ǈ",
                            Ǌ: "ǋ",
                            ǋ: "ǋ",
                            ǌ: "ǋ",
                            Ǳ: "ǲ",
                            ǲ: "ǲ",
                            ǳ: "ǲ",
                            և: "Եւ",
                            ᾲ: "Ὰͅ",
                            ᾳ: "ᾼ",
                            ᾴ: "Άͅ",
                            ᾷ: "ᾼ͂",
                            ᾼ: "ᾼ",
                            ῂ: "Ὴͅ",
                            ῃ: "ῌ",
                            ῄ: "Ήͅ",
                            ῇ: "ῌ͂",
                            ῌ: "ῌ",
                            ῲ: "Ὼͅ",
                            ῳ: "ῼ",
                            ῴ: "Ώͅ",
                            ῷ: "ῼ͂",
                            ῼ: "ῼ",
                            ﬀ: "Ff",
                            ﬁ: "Fi",
                            ﬂ: "Fl",
                            ﬃ: "Ffi",
                            ﬄ: "Ffl",
                            ﬅ: "St",
                            ﬆ: "St",
                            ﬓ: "Մն",
                            ﬔ: "Մե",
                            ﬕ: "Մի",
                            ﬖ: "Վն",
                            ﬗ: "Մխ",
                          },
                          i = ["ᾈᾉᾊᾋᾌᾍᾎᾏ", "ᾘᾙᾚᾛᾜᾝᾞᾟ", "ᾨᾩᾪᾫᾬᾭᾮᾯ"];
                        let a = String.fromCodePoint(r);
                        return 0 === t ? (a = o[a] ? o[a] : r >= 8064 && r < 8112 ? i[((r - 8064) / 16) | 0][r % 8] : a.toUpperCase()) : n && (a = a.toLowerCase()), e + a;
                      }, ""),
                    1
                  );
                },
                p: function (e, r, t) {
                  return ce(e, r, t, (e) => e.toUpperCase());
                },
                o: function e(r, t) {
                  var n = new Date(1e3 * T[r >> 2]);
                  (T[t >> 2] = n.getUTCSeconds()),
                    (T[(t + 4) >> 2] = n.getUTCMinutes()),
                    (T[(t + 8) >> 2] = n.getUTCHours()),
                    (T[(t + 12) >> 2] = n.getUTCDate()),
                    (T[(t + 16) >> 2] = n.getUTCMonth()),
                    (T[(t + 20) >> 2] = n.getUTCFullYear() - 1900),
                    (T[(t + 24) >> 2] = n.getUTCDay()),
                    (T[(t + 36) >> 2] = 0),
                    (T[(t + 32) >> 2] = 0);
                  var o = Date.UTC(n.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
                    i = ((n.getTime() - o) / 864e5) | 0;
                  return (T[(t + 28) >> 2] = i), e.GMTString || (e.GMTString = j("GMT")), (T[(t + 40) >> 2] = e.GMTString), t;
                },
                n: function (e) {
                  var r = Oe();
                  try {
                    Le(e);
                  } catch (e) {
                    if ((je(r), e !== e + 0 && "longjmp" !== e)) throw e;
                    Ie(1, 0);
                  }
                },
                y: function (e, r) {
                  var t = Oe();
                  try {
                    He(e, r);
                  } catch (e) {
                    if ((je(t), e !== e + 0 && "longjmp" !== e)) throw e;
                    Ie(1, 0);
                  }
                },
                j: function (e, r, t) {
                  var n = Oe();
                  try {
                    We(e, r, t);
                  } catch (e) {
                    if ((je(n), e !== e + 0 && "longjmp" !== e)) throw e;
                    Ie(1, 0);
                  }
                },
                g: function (e, r, t, n, o) {
                  var i = Oe();
                  try {
                    qe(e, r, t, n, o);
                  } catch (e) {
                    if ((je(i), e !== e + 0 && "longjmp" !== e)) throw e;
                    Ie(1, 0);
                  }
                },
                m: function (e, r) {
                  De();
                  var t = new Date(1e3 * T[e >> 2]);
                  (T[r >> 2] = t.getSeconds()),
                    (T[(r + 4) >> 2] = t.getMinutes()),
                    (T[(r + 8) >> 2] = t.getHours()),
                    (T[(r + 12) >> 2] = t.getDate()),
                    (T[(r + 16) >> 2] = t.getMonth()),
                    (T[(r + 20) >> 2] = t.getFullYear() - 1900),
                    (T[(r + 24) >> 2] = t.getDay());
                  var n = new Date(t.getFullYear(), 0, 1),
                    o = ((t.getTime() - n.getTime()) / 864e5) | 0;
                  (T[(r + 28) >> 2] = o), (T[(r + 36) >> 2] = -60 * t.getTimezoneOffset());
                  var i = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(),
                    a = n.getTimezoneOffset(),
                    s = 0 | (i != a && t.getTimezoneOffset() == Math.min(a, i));
                  T[(r + 32) >> 2] = s;
                  var u = T[(ze() + (s ? 4 : 0)) >> 2];
                  return (T[(r + 40) >> 2] = u), r;
                },
                a: k,
                l: function (e) {
                  De();
                  var r = new Date(T[(e + 20) >> 2] + 1900, T[(e + 16) >> 2], T[(e + 12) >> 2], T[(e + 8) >> 2], T[(e + 4) >> 2], T[e >> 2], 0),
                    t = T[(e + 32) >> 2],
                    n = r.getTimezoneOffset(),
                    o = new Date(r.getFullYear(), 0, 1),
                    i = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(),
                    a = o.getTimezoneOffset(),
                    s = Math.min(a, i);
                  if (t < 0) T[(e + 32) >> 2] = Number(i != a && s == n);
                  else if (t > 0 != (s == n)) {
                    var u = Math.max(a, i),
                      c = t > 0 ? s : u;
                    r.setTime(r.getTime() + 6e4 * (c - n));
                  }
                  T[(e + 24) >> 2] = r.getDay();
                  var l = ((r.getTime() - o.getTime()) / 864e5) | 0;
                  return (T[(e + 28) >> 2] = l), (r.getTime() / 1e3) | 0;
                },
                b: function (e) {
                  D = 0 | e;
                },
                i: function (e) {
                  var r = (Date.now() / 1e3) | 0;
                  return e && (T[e >> 2] = r), r;
                },
                k: function (e) {
                  De();
                  var r = Date.UTC(T[(e + 20) >> 2] + 1900, T[(e + 16) >> 2], T[(e + 12) >> 2], T[(e + 8) >> 2], T[(e + 4) >> 2], T[e >> 2], 0),
                    t = new Date(r);
                  T[(e + 24) >> 2] = t.getUTCDay();
                  var n = Date.UTC(t.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
                    o = ((t.getTime() - n) / 864e5) | 0;
                  return (T[(e + 28) >> 2] = o), (t.getTime() / 1e3) | 0;
                },
              },
              Te =
                ((function () {
                  var r = { a: Pe };
                  function t(r, t) {
                    var n = r.exports;
                    (n = Se.instrumentWasmExports(n)), (e.asm = n), e.asm.K, ee();
                  }
                  function n(e) {
                    t(e.instance);
                  }
                  function o(e) {
                    return (E || (!s && !u) || "function" != typeof fetch
                      ? Promise.resolve().then(ue)
                      : fetch(se, { credentials: "same-origin" })
                          .then(function (e) {
                            if (!e.ok) throw "failed to load wasm binary file at '" + se + "'";
                            return e.arrayBuffer();
                          })
                          .catch(function () {
                            return ue();
                          })
                    )
                      .then(function (e) {
                        return WebAssembly.instantiate(e, r);
                      })
                      .then(e, function (e) {
                        y("failed to asynchronously prepare wasm: " + e), re(e);
                      });
                  }
                  if ((Q(), e.instantiateWasm))
                    try {
                      var i = e.instantiateWasm(r, t);
                      return (i = Se.instrumentWasmExports(i));
                    } catch (e) {
                      return y("Module.instantiateWasm callback failed with error: " + e), !1;
                    }
                  !(function () {
                    if (E || "function" != typeof WebAssembly.instantiateStreaming || te(se) || "function" != typeof fetch) return o(n);
                    fetch(se, { credentials: "same-origin" }).then(function (e) {
                      return WebAssembly.instantiateStreaming(e, r).then(n, function (e) {
                        return y("wasm streaming compile failed: " + e), y("falling back to ArrayBuffer instantiation"), o(n);
                      });
                    });
                  })();
                })(),
                (e.___wasm_call_ctors = function () {
                  return (Te = e.___wasm_call_ctors = e.asm.L).apply(null, arguments);
                })),
              Me = (e._malloc = function () {
                return (Me = e._malloc = e.asm.M).apply(null, arguments);
              }),
              Re = (e._free = function () {
                return (Re = e._free = e.asm.N).apply(null, arguments);
              }),
              Ce =
                ((e._main = function () {
                  return (e._main = e.asm.O).apply(null, arguments);
                }),
                (e._gidispatch_get_game_id = function () {
                  return (e._gidispatch_get_game_id = e.asm.P).apply(null, arguments);
                }),
                (e._fflush = function () {
                  return (e._fflush = e.asm.Q).apply(null, arguments);
                }),
                (e.___errno_location = function () {
                  return (Ce = e.___errno_location = e.asm.R).apply(null, arguments);
                })),
              ze = (e.__get_tzname = function () {
                return (ze = e.__get_tzname = e.asm.S).apply(null, arguments);
              }),
              Ne = (e.__get_daylight = function () {
                return (Ne = e.__get_daylight = e.asm.T).apply(null, arguments);
              }),
              Be = (e.__get_timezone = function () {
                return (Be = e.__get_timezone = e.asm.U).apply(null, arguments);
              }),
              Oe = (e.stackSave = function () {
                return (Oe = e.stackSave = e.asm.V).apply(null, arguments);
              }),
              je = (e.stackRestore = function () {
                return (je = e.stackRestore = e.asm.W).apply(null, arguments);
              }),
              Ue = (e.stackAlloc = function () {
                return (Ue = e.stackAlloc = e.asm.X).apply(null, arguments);
              }),
              Ie = (e._setThrew = function () {
                return (Ie = e._setThrew = e.asm.Y).apply(null, arguments);
              }),
              Le = (e.dynCall_v = function () {
                return (Le = e.dynCall_v = e.asm.Z).apply(null, arguments);
              }),
              He = (e.dynCall_vi = function () {
                return (He = e.dynCall_vi = e.asm._).apply(null, arguments);
              }),
              We = (e.dynCall_vii = function () {
                return (We = e.dynCall_vii = e.asm.$).apply(null, arguments);
              }),
              qe = (e.dynCall_viiii = function () {
                return (qe = e.dynCall_viiii = e.asm.aa).apply(null, arguments);
              });
            function Ve(e) {
              (this.name = "ExitStatus"), (this.message = "Program terminated with exit(" + e + ")"), (this.status = e);
            }
            function Ge(t) {
              function n() {
                xe ||
                  ((xe = !0),
                  (e.calledRun = !0),
                  b ||
                    (e.noFSInit || Ee.init.initialized || Ee.init(),
                    ge.init(),
                    le(W),
                    (Ee.ignorePermissions = !1),
                    le(q),
                    r(e),
                    e.onRuntimeInitialized && e.onRuntimeInitialized(),
                    Ye &&
                      (function (r) {
                        var t = e._main,
                          n = (r = r || []).length + 1,
                          o = Ue(4 * (n + 1));
                        T[o >> 2] = U(f);
                        for (var i = 1; i < n; i++) T[(o >> 2) + i] = U(r[i - 1]);
                        T[(o >> 2) + n] = 0;
                        try {
                          var a = t(n, o);
                          _ || Xe(a, !0);
                        } catch (e) {
                          if (e instanceof Ve) return;
                          if ("unwind" == e) return void (_ = !0);
                          var s = e;
                          e && "object" == typeof e && e.stack && (s = [e, e.stack]), y("exception thrown: " + s), d(1, e);
                        }
                      })(t),
                    (function () {
                      if (e.postRun) for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length; ) (r = e.postRun.shift()), G.unshift(r);
                      var r;
                      le(G);
                    })()));
              }
              (t = t || l),
                J > 0 ||
                  ((function () {
                    if (e.preRun) for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length; ) (r = e.preRun.shift()), H.unshift(r);
                    var r;
                    le(H);
                  })(),
                  J > 0 ||
                    (e.setStatus
                      ? (e.setStatus("Running..."),
                        setTimeout(function () {
                          setTimeout(function () {
                            e.setStatus("");
                          }, 1),
                            n();
                        }, 1))
                      : n()));
            }
            function Xe(r, t) {
              (t && _ && 0 === r) || (_ || (le(V), Ee.quit(), ge.shutdown(), e.onExit && e.onExit(r), (b = !0)), d(r, new Ve(r)));
            }
            if (
              ((e.dynCall_iii = function () {
                return (e.dynCall_iii = e.asm.ba).apply(null, arguments);
              }),
              (e.dynCall_i = function () {
                return (e.dynCall_i = e.asm.ca).apply(null, arguments);
              }),
              (e.dynCall_viii = function () {
                return (e.dynCall_viii = e.asm.da).apply(null, arguments);
              }),
              (e.dynCall_jiji = function () {
                return (e.dynCall_jiji = e.asm.ea).apply(null, arguments);
              }),
              (e.dynCall_iiii = function () {
                return (e.dynCall_iiii = e.asm.fa).apply(null, arguments);
              }),
              (e.dynCall_ii = function () {
                return (e.dynCall_ii = e.asm.ga).apply(null, arguments);
              }),
              (e.dynCall_iidiiii = function () {
                return (e.dynCall_iidiiii = e.asm.ha).apply(null, arguments);
              }),
              (e._asyncify_start_unwind = function () {
                return (e._asyncify_start_unwind = e.asm.ia).apply(null, arguments);
              }),
              (e._asyncify_stop_unwind = function () {
                return (e._asyncify_stop_unwind = e.asm.ja).apply(null, arguments);
              }),
              (e._asyncify_start_rewind = function () {
                return (e._asyncify_start_rewind = e.asm.ka).apply(null, arguments);
              }),
              (e._asyncify_stop_rewind = function () {
                return (e._asyncify_stop_rewind = e.asm.la).apply(null, arguments);
              }),
              (e.FS = Ee),
              (e.AsciiToString = function (e) {
                for (var r = ""; ; ) {
                  var t = x[e++ >> 0];
                  if (!t) return r;
                  r += String.fromCharCode(t);
                }
              }),
              (Z = function e() {
                xe || Ge(), xe || (Z = e);
              }),
              (e.run = Ge),
              e.preInit)
            )
              for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); e.preInit.length > 0; ) e.preInit.pop()();
            var Ye = !0;
            return e.noInitialRun && (Ye = !1), Ge(), e.ready;
          });
      e.exports = o;
    })((r = { exports: {} }), r.exports),
    r.exports);
export default class extends class {
  prepare(r, t) {
    (this.data = r), (this.options = Object.assign({}, e, this.default_options(), t));
  }
  async start() {
    const e = new TextEncoder();
    let r = "";
    const t = {
      arguments: this.options.show_help ? ["-help"] : this.options.arguments,
      emglken_stdin_buffers: [],
      emglken_stdin_ready() {},
      print: (e) => {
        if ("" !== r || "" === e || e.startsWith("{")) {
          if (((r += e), e.endsWith("}")))
            try {
              const e = JSON.parse(r);
              (r = ""), this.options.GlkOte.update(e);
            } catch (e) {}
        } else console.log(e);
      },
      preRun: () => {
        const e = t.FS;
        (this.EFS = new (class {
          constructor(e) {
            (this.dialog = e.options.Dialog), (this.streaming = this.dialog.streaming), (this.FS = e.Module.FS), (this.VM = e), (this.filename_map = {}), (this.filename_counter = 0);
          }
          close(e) {
            "storyfile" === e.name ||
              (this.streaming
                ? e.fstream.fclose()
                : 2 !== e.fmode &&
                  this.dialog.file_write(
                    e.fref,
                    e.data.reduce((e, r) => e + String.fromCharCode(r), ""),
                    !0
                  ));
          }
          createNode(e, r, t) {
            const n = this.FS;
            if (!n.isDir(t) && !n.isFile(t)) throw new n.ErrnoError(28);
            const o = n.createNode(e, r, t);
            return (o.node_ops = this), (o.stream_ops = this), (o.timestamp = Date.now()), o;
          }
          getattr(e) {
            return { atime: new Date(e.timestamp), ctime: new Date(e.timestamp), dev: 1, gid: 0, ino: e.id, mode: e.mode, mtime: new Date(e.timestamp), nlink: 1, rdev: e.rdev, uid: 0 };
          }
          get_dialog_ref(e) {
            let [r, t] = e.split(".");
            t = t.replace("glk", "");
            let n = "";
            return "save" === t && (n = this.VM.Module.AsciiToString(this.VM.Module._gidispatch_get_game_id())), this.dialog.file_construct_ref(r, t, n);
          }
          llseek(e, r, t) {
            let n = r;
            if (1 === t) n += e.position;
            else if (2 === t)
              if ("storyfile" === e.name) n += e.data.length;
              else if (this.streaming) {
                const r = e.fstream.ftell();
                e.fstream.fseek(0, 2), (n += e.fstream.ftell()), e.fstream.fseek(r, 0);
              } else n += e.data.length;
            if (n < 0) throw new this.FS.ErrnoError(28);
            return n;
          }
          lookup(e, r) {
            if ("storyfile" !== r) {
              const e = this.filename_map[r] || r;
              if (!this.dialog.file_ref_exists(this.streaming ? { filename: e } : this.get_dialog_ref(e))) throw new this.FS.ErrnoError(44);
            }
            return this.createNode(e, r, 33206);
          }
          mknod(e, r, t) {
            return this.createNode(e, r, t);
          }
          mmap() {
            throw new Error("EmglkenFS.mmap");
          }
          mount() {
            return this.createNode(null, "/", 16895, 0);
          }
          msync() {
            throw new Error("EmglkenFS.msync");
          }
          open(e) {
            if (((e.name = e.node.name), "storyfile" === e.name)) e.data = this.VM.data;
            else {
              const n = 1024 & (t = e.flags) ? 5 : 1 & t ? 1 : 2 & t ? 3 : 2,
                o = this.filename_map[e.name] || e.name;
              if (this.streaming) e.fstream = this.dialog.file_fopen(n, { filename: o });
              else {
                (e.fref = this.get_dialog_ref(o)), (e.fmode = n);
                let t = null;
                1 !== n && (t = this.dialog.file_read(e.fref, !0)), null == t ? ((e.data = new Uint8Array(0)), 2 !== n && this.dialog.file_write(e.fref, "", !0)) : (e.data = ((r = t), Uint8Array.from(r, (e) => e.charCodeAt(0))));
              }
            }
            var r, t;
          }
          read(e, r, t, n, o) {
            if (0 === n) return 0;
            if ("storyfile" === e.name) {
              const i = Math.min(e.data.length - o, n);
              return r.set(e.data.subarray(o, o + i), t), i;
            }
            if (this.streaming) {
              e.fstream.fseek(o, 0);
              const i = e.fstream.BufferClass.from(r.buffer, t, n);
              return e.fstream.fread(i, n);
            }
            {
              const i = Math.min(e.data.length - o, n);
              return r.set(e.data.subarray(o, o + i), t), i;
            }
          }
          readdir() {
            throw new Error("EmglkenFS.readdir");
          }
          readlink() {
            throw new Error("EmglkenFS.readlink");
          }
          register_filename(e, r) {
            const t = "save" === r ? ".glksave" : "data" === r ? ".glkdata" : ".txt";
            if ((/\.(glkdata|glksave|txt)$/.test(e) || (e += t), this.filename_map[e])) return this.filename_map[e];
            const n = "emglken_fake_file_" + this.filename_counter++;
            return (this.filename_map[e] = n), (this.filename_map[n + t] = e), n;
          }
          rename() {
            throw new Error("EmglkenFS.rename");
          }
          rmdir() {
            throw new Error("EmglkenFS.rmdir");
          }
          setattr() {}
          symlink() {
            throw new Error("EmglkenFS.symlink");
          }
          unlink(e, r) {
            const t = this.filename_map[r] || r;
            this.dialog.file_remove_ref(this.get_dialog_ref(t));
          }
          write(e, r, t, n, o) {
            if ("storyfile" === e.name) throw new Error("EmglkenFS.write: cannot write to storyfile");
            if (this.streaming) {
              e.fstream.fseek(o, 0);
              const i = e.fstream.BufferClass.from(r).subarray(t, t + n);
              return e.fstream.fwrite(i, n);
            }
            {
              const i = n + (o = o || e.position);
              if (i > e.data.length) {
                const r = e.data;
                (e.data = new Uint8Array(i)), e.data.set(r);
              }
              return e.data.set(r.subarray(t, t + n), o), n;
            }
          }
        })(this)),
          e.mkdir("/emglken"),
          e.mount(this.EFS, {}, "/emglken"),
          e.chdir("/emglken");
      },
      wasmBinary: this.options.wasmBinary,
    };
    (this.Module = t),
      (this.options.accept = (r) => {
        "specialresponse" === r.type && "fileref_prompt" === r.response && r.value && (this.EFS.streaming ? (r.value = this.EFS.register_filename(r.value.filename, r.value.usage)) : (r.value = r.value.filename));
        const n = JSON.stringify(r),
          o = e.encode(n);
        t.emglken_stdin_buffers.push(o), t.emglken_stdin_ready();
      }),
      await this.options.vmcore(t),
      this.options.GlkOte.init(this.options);
  }
} {
  default_options() {
    return { vmcore: n };
  }
}
