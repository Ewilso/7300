const e = { arguments: ["storyfile"] };
var t,
  r,
  n = { dirname() {}, normalize() {}, randomBytes() {}, readFileSync() {} },
  o = ((t = Object.freeze({ __proto__: null, default: n })) && t.default) || t,
  a =
    ((function (e, t) {
      var r,
        n =
          ((r = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0),
          "undefined" != typeof __filename && (r = r || __filename),
          function (e) {
            var t, n;
            (e = void 0 !== (e = e || {}) ? e : {}).ready = new Promise(function (e, r) {
              (t = e), (n = r);
            });
            var a,
              i = {};
            for (a in e) e.hasOwnProperty(a) && (i[a] = e[a]);
            var s,
              u,
              c,
              l = [],
              f = "./this.program",
              d = function (e, t) {
                throw t;
              };
            (s = "object" == typeof window), (u = "function" == typeof importScripts), (c = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node);
            var m,
              h,
              p,
              w,
              g = "";
            c
              ? ((g = u ? o.dirname(g) + "/" : __dirname + "/"),
                (m = function (e, t) {
                  return p || (p = o), w || (w = o), (e = w.normalize(e)), p.readFileSync(e, t ? null : "utf8");
                }),
                (h = function (e) {
                  var t = m(e, !0);
                  return t.buffer || (t = new Uint8Array(t)), b(t.buffer), t;
                }),
                process.argv.length > 1 && (f = process.argv[1].replace(/\\/g, "/")),
                (l = process.argv.slice(2)),
                process.on("uncaughtException", function (e) {
                  if (!(e instanceof je)) throw e;
                }),
                process.on("unhandledRejection", Q),
                (d = function (e) {
                  process.exit(e);
                }),
                (e.inspect = function () {
                  return "[Emscripten Module object]";
                }))
              : (s || u) &&
                (u ? (g = self.location.href) : document.currentScript && (g = document.currentScript.src),
                r && (g = r),
                (g = 0 !== g.indexOf("blob:") ? g.substr(0, g.lastIndexOf("/") + 1) : ""),
                (m = function (e) {
                  var t = new XMLHttpRequest();
                  return t.open("GET", e, !1), t.send(null), t.responseText;
                }),
                u &&
                  (h = function (e) {
                    var t = new XMLHttpRequest();
                    return t.open("GET", e, !1), (t.responseType = "arraybuffer"), t.send(null), new Uint8Array(t.response);
                  }));
            var y,
              v,
              _,
              E = e.print || console.log.bind(console),
              k = e.printErr || console.warn.bind(console);
            for (a in i) i.hasOwnProperty(a) && (e[a] = i[a]);
            (i = null),
              e.arguments && (l = e.arguments),
              e.thisProgram && (f = e.thisProgram),
              e.quit && (d = e.quit),
              e.wasmBinary && (y = e.wasmBinary),
              e.noExitRuntime && (v = e.noExitRuntime),
              "object" != typeof WebAssembly && Q("no native wasm support detected");
            var D = !1;
            function b(e, t) {
              e || Q("Assertion failed: " + t);
            }
            var S,
              F,
              M,
              x,
              A,
              P = new TextDecoder("utf8");
            function R(e, t, r) {
              for (var n = t + r, o = t; e[o] && !(o >= n); ) ++o;
              return P.decode(e.subarray ? e.subarray(t, o) : new Uint8Array(e.slice(t, o)));
            }
            function O(e, t) {
              if (!e) return "";
              for (var r = e + t, n = e; !(n >= r) && M[n]; ) ++n;
              return P.decode(M.subarray(e, n));
            }
            function T(e, t, r, n) {
              if (!(n > 0)) return 0;
              for (var o = r, a = r + n - 1, i = 0; i < e.length; ++i) {
                var s = e.charCodeAt(i);
                if ((s >= 55296 && s <= 57343 && (s = (65536 + ((1023 & s) << 10)) | (1023 & e.charCodeAt(++i))), s <= 127)) {
                  if (r >= a) break;
                  t[r++] = s;
                } else if (s <= 2047) {
                  if (r + 1 >= a) break;
                  (t[r++] = 192 | (s >> 6)), (t[r++] = 128 | (63 & s));
                } else if (s <= 65535) {
                  if (r + 2 >= a) break;
                  (t[r++] = 224 | (s >> 12)), (t[r++] = 128 | ((s >> 6) & 63)), (t[r++] = 128 | (63 & s));
                } else {
                  if (r + 3 >= a) break;
                  (t[r++] = 240 | (s >> 18)), (t[r++] = 128 | ((s >> 12) & 63)), (t[r++] = 128 | ((s >> 6) & 63)), (t[r++] = 128 | (63 & s));
                }
              }
              return (t[r] = 0), r - o;
            }
            function z(e, t, r) {
              return T(e, M, t, r);
            }
            function B(e) {
              for (var t = 0, r = 0; r < e.length; ++r) {
                var n = e.charCodeAt(r);
                n >= 55296 && n <= 57343 && (n = (65536 + ((1023 & n) << 10)) | (1023 & e.charCodeAt(++r))), n <= 127 ? ++t : (t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
              }
              return t;
            }
            function N(e) {
              var t = B(e) + 1,
                r = Oe(t);
              return r && T(e, F, r, t), r;
            }
            function C(e) {
              var t = B(e) + 1,
                r = Ie(t);
              return T(e, F, r, t), r;
            }
            function I(t) {
              (S = t),
                (e.HEAP8 = F = new Int8Array(t)),
                (e.HEAP16 = x = new Int16Array(t)),
                (e.HEAP32 = A = new Int32Array(t)),
                (e.HEAPU8 = M = new Uint8Array(t)),
                (e.HEAPU16 = new Uint16Array(t)),
                (e.HEAPU32 = new Uint32Array(t)),
                (e.HEAPF32 = new Float32Array(t)),
                (e.HEAPF64 = new Float64Array(t));
            }
            var j = e.INITIAL_MEMORY || 16777216;
            (_ = e.wasmMemory ? e.wasmMemory : new WebAssembly.Memory({ initial: j / 65536, maximum: 32768 })) && (S = _.buffer), (j = S.byteLength), I(S);
            var L = [],
              U = [],
              H = [],
              W = [],
              Y = [],
              q = Math.abs,
              V = Math.ceil,
              X = Math.floor,
              G = Math.min,
              J = 0,
              K = null;
            function $(t) {
              J++, e.monitorRunDependencies && e.monitorRunDependencies(J);
            }
            function Z(t) {
              if ((J--, e.monitorRunDependencies && e.monitorRunDependencies(J), 0 == J && K)) {
                var r = K;
                (K = null), r();
              }
            }
            function Q(t) {
              e.onAbort && e.onAbort(t), k((t += "")), (D = !0), (t = "abort(" + t + "). Build with -s ASSERTIONS=1 for more info.");
              var r = new WebAssembly.RuntimeError(t);
              throw (n(r), r);
            }
            function ee(e) {
              return (t = e), (r = "data:application/octet-stream;base64,"), String.prototype.startsWith ? t.startsWith(r) : 0 === t.indexOf(r);
              var t, r;
            }
            (e.preloadedImages = {}), (e.preloadedAudios = {});
            var te,
              re,
              ne,
              oe = "hugo-core.wasm";
            function ae() {
              try {
                if (y) return new Uint8Array(y);
                if (h) return h(oe);
                throw "both async and sync fetching of the wasm failed";
              } catch (e) {
                Q(e);
              }
            }
            function ie(t) {
              for (; t.length > 0; ) {
                var r = t.shift();
                if ("function" != typeof r) {
                  var n = r.func;
                  "number" == typeof n ? (void 0 === r.arg ? ue("v", n)() : ue("vi", n)(r.arg)) : n(void 0 === r.arg ? null : r.arg);
                } else r(e);
              }
            }
            function se(t, r, n) {
              return (function (t, r, n) {
                return n && n.length ? e["dynCall_" + t].apply(null, [r].concat(n)) : e["dynCall_" + t].call(null, r);
              })(t, r, n);
            }
            function ue(e, t) {
              var r = [];
              return function () {
                r.length = arguments.length;
                for (var n = 0; n < arguments.length; n++) r[n] = arguments[n];
                return se(e, t, r);
              };
            }
            function ce() {
              var t = (function () {
                var e = new Error();
                if (!e.stack) {
                  try {
                    throw new Error();
                  } catch (t) {
                    e = t;
                  }
                  if (!e.stack) return "(no stack trace available)";
                }
                return e.stack.toString();
              })();
              return (
                e.extraStackTrace && (t += "\n" + e.extraStackTrace()),
                t.replace(/\b_Z[\w\d_]+/g, function (e) {
                  return e == e ? e : e + " [" + e + "]";
                })
              );
            }
            function le(e, t) {
              !(function e() {
                if (!e.called) {
                  (e.called = !0), (A[Ce() >> 2] = 60 * new Date().getTimezoneOffset());
                  var t = new Date().getFullYear(),
                    r = new Date(t, 0, 1),
                    n = new Date(t, 6, 1);
                  A[Ne() >> 2] = Number(r.getTimezoneOffset() != n.getTimezoneOffset());
                  var o = u(r),
                    a = u(n),
                    i = N(o),
                    s = N(a);
                  n.getTimezoneOffset() < r.getTimezoneOffset() ? ((A[Be() >> 2] = i), (A[(Be() + 4) >> 2] = s)) : ((A[Be() >> 2] = s), (A[(Be() + 4) >> 2] = i));
                }
                function u(e) {
                  var t = e.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                  return t ? t[1] : "GMT";
                }
              })();
              var r = new Date(1e3 * A[e >> 2]);
              (A[t >> 2] = r.getSeconds()),
                (A[(t + 4) >> 2] = r.getMinutes()),
                (A[(t + 8) >> 2] = r.getHours()),
                (A[(t + 12) >> 2] = r.getDate()),
                (A[(t + 16) >> 2] = r.getMonth()),
                (A[(t + 20) >> 2] = r.getFullYear() - 1900),
                (A[(t + 24) >> 2] = r.getDay());
              var n = new Date(r.getFullYear(), 0, 1),
                o = ((r.getTime() - n.getTime()) / 864e5) | 0;
              (A[(t + 28) >> 2] = o), (A[(t + 36) >> 2] = -60 * r.getTimezoneOffset());
              var a = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(),
                i = n.getTimezoneOffset(),
                s = 0 | (a != i && r.getTimezoneOffset() == Math.min(i, a));
              A[(t + 32) >> 2] = s;
              var u = A[(Be() + (s ? 4 : 0)) >> 2];
              return (A[(t + 40) >> 2] = u), t;
            }
            ee(oe) || ((te = oe), (oe = e.locateFile ? e.locateFile(te, g) : g + te));
            var fe = {
              splitPath: function (e) {
                return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);
              },
              normalizeArray: function (e, t) {
                for (var r = 0, n = e.length - 1; n >= 0; n--) {
                  var o = e[n];
                  "." === o ? e.splice(n, 1) : ".." === o ? (e.splice(n, 1), r++) : r && (e.splice(n, 1), r--);
                }
                if (t) for (; r; r--) e.unshift("..");
                return e;
              },
              normalize: function (e) {
                var t = "/" === e.charAt(0),
                  r = "/" === e.substr(-1);
                return (
                  (e = fe
                    .normalizeArray(
                      e.split("/").filter(function (e) {
                        return !!e;
                      }),
                      !t
                    )
                    .join("/")) ||
                    t ||
                    (e = "."),
                  e && r && (e += "/"),
                  (t ? "/" : "") + e
                );
              },
              dirname: function (e) {
                var t = fe.splitPath(e),
                  r = t[0],
                  n = t[1];
                return r || n ? (n && (n = n.substr(0, n.length - 1)), r + n) : ".";
              },
              basename: function (e) {
                if ("/" === e) return "/";
                var t = (e = (e = fe.normalize(e)).replace(/\/$/, "")).lastIndexOf("/");
                return -1 === t ? e : e.substr(t + 1);
              },
              extname: function (e) {
                return fe.splitPath(e)[3];
              },
              join: function () {
                var e = Array.prototype.slice.call(arguments, 0);
                return fe.normalize(e.join("/"));
              },
              join2: function (e, t) {
                return fe.normalize(e + "/" + t);
              },
            };
            function de(e) {
              return (A[ze() >> 2] = e), e;
            }
            var me = {
                resolve: function () {
                  for (var e = "", t = !1, r = arguments.length - 1; r >= -1 && !t; r--) {
                    var n = r >= 0 ? arguments[r] : ge.cwd();
                    if ("string" != typeof n) throw new TypeError("Arguments to path.resolve must be strings");
                    if (!n) return "";
                    (e = n + "/" + e), (t = "/" === n.charAt(0));
                  }
                  return (
                    (t ? "/" : "") +
                      (e = fe
                        .normalizeArray(
                          e.split("/").filter(function (e) {
                            return !!e;
                          }),
                          !t
                        )
                        .join("/")) || "."
                  );
                },
                relative: function (e, t) {
                  function r(e) {
                    for (var t = 0; t < e.length && "" === e[t]; t++);
                    for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
                    return t > r ? [] : e.slice(t, r - t + 1);
                  }
                  (e = me.resolve(e).substr(1)), (t = me.resolve(t).substr(1));
                  for (var n = r(e.split("/")), o = r(t.split("/")), a = Math.min(n.length, o.length), i = a, s = 0; s < a; s++)
                    if (n[s] !== o[s]) {
                      i = s;
                      break;
                    }
                  var u = [];
                  for (s = i; s < n.length; s++) u.push("..");
                  return (u = u.concat(o.slice(i))).join("/");
                },
              },
              he = {
                ttys: [],
                init: function () {},
                shutdown: function () {},
                register: function (e, t) {
                  (he.ttys[e] = { input: [], output: [], ops: t }), ge.registerDevice(e, he.stream_ops);
                },
                stream_ops: {
                  open: function (e) {
                    var t = he.ttys[e.node.rdev];
                    if (!t) throw new ge.ErrnoError(43);
                    (e.tty = t), (e.seekable = !1);
                  },
                  close: function (e) {
                    e.tty.ops.flush(e.tty);
                  },
                  flush: function (e) {
                    e.tty.ops.flush(e.tty);
                  },
                  read: function (e, t, r, n, o) {
                    if (!e.tty || !e.tty.ops.get_char) throw new ge.ErrnoError(60);
                    for (var a = 0, i = 0; i < n; i++) {
                      var s;
                      try {
                        s = e.tty.ops.get_char(e.tty);
                      } catch (e) {
                        throw new ge.ErrnoError(29);
                      }
                      if (void 0 === s && 0 === a) throw new ge.ErrnoError(6);
                      if (null == s) break;
                      a++, (t[r + i] = s);
                    }
                    return a && (e.node.timestamp = Date.now()), a;
                  },
                  write: function (e, t, r, n, o) {
                    if (!e.tty || !e.tty.ops.put_char) throw new ge.ErrnoError(60);
                    try {
                      for (var a = 0; a < n; a++) e.tty.ops.put_char(e.tty, t[r + a]);
                    } catch (e) {
                      throw new ge.ErrnoError(29);
                    }
                    return n && (e.node.timestamp = Date.now()), a;
                  },
                },
                default_tty_ops: {
                  get_char: function (e) {
                    if (!e.input.length) {
                      var t = null;
                      if (c) {
                        var r = Buffer.alloc ? Buffer.alloc(256) : new Buffer(256),
                          n = 0;
                        try {
                          n = p.readSync(process.stdin.fd, r, 0, 256, null);
                        } catch (e) {
                          if (-1 == e.toString().indexOf("EOF")) throw e;
                          n = 0;
                        }
                        t = n > 0 ? r.slice(0, n).toString("utf-8") : null;
                      } else "undefined" != typeof window && "function" == typeof window.prompt ? null !== (t = window.prompt("Input: ")) && (t += "\n") : "function" == typeof readline && null !== (t = readline()) && (t += "\n");
                      if (!t) return null;
                      e.input = xe(t, !0);
                    }
                    return e.input.shift();
                  },
                  put_char: function (e, t) {
                    null === t || 10 === t ? (E(R(e.output, 0)), (e.output = [])) : 0 != t && e.output.push(t);
                  },
                  flush: function (e) {
                    e.output && e.output.length > 0 && (E(R(e.output, 0)), (e.output = []));
                  },
                },
                default_tty1_ops: {
                  put_char: function (e, t) {
                    null === t || 10 === t ? (k(R(e.output, 0)), (e.output = [])) : 0 != t && e.output.push(t);
                  },
                  flush: function (e) {
                    e.output && e.output.length > 0 && (k(R(e.output, 0)), (e.output = []));
                  },
                },
              };
            function pe(e) {
              for (
                var t = (function (e, t) {
                    return t || (t = 16), Math.ceil(e / t) * t;
                  })(e, 16384),
                  r = Oe(t);
                e < t;

              )
                F[r + e++] = 0;
              return r;
            }
            var we = {
                ops_table: null,
                mount: function (e) {
                  return we.createNode(null, "/", 16895, 0);
                },
                createNode: function (e, t, r, n) {
                  if (ge.isBlkdev(r) || ge.isFIFO(r)) throw new ge.ErrnoError(63);
                  we.ops_table ||
                    (we.ops_table = {
                      dir: {
                        node: {
                          getattr: we.node_ops.getattr,
                          setattr: we.node_ops.setattr,
                          lookup: we.node_ops.lookup,
                          mknod: we.node_ops.mknod,
                          rename: we.node_ops.rename,
                          unlink: we.node_ops.unlink,
                          rmdir: we.node_ops.rmdir,
                          readdir: we.node_ops.readdir,
                          symlink: we.node_ops.symlink,
                        },
                        stream: { llseek: we.stream_ops.llseek },
                      },
                      file: {
                        node: { getattr: we.node_ops.getattr, setattr: we.node_ops.setattr },
                        stream: { llseek: we.stream_ops.llseek, read: we.stream_ops.read, write: we.stream_ops.write, allocate: we.stream_ops.allocate, mmap: we.stream_ops.mmap, msync: we.stream_ops.msync },
                      },
                      link: { node: { getattr: we.node_ops.getattr, setattr: we.node_ops.setattr, readlink: we.node_ops.readlink }, stream: {} },
                      chrdev: { node: { getattr: we.node_ops.getattr, setattr: we.node_ops.setattr }, stream: ge.chrdev_stream_ops },
                    });
                  var o = ge.createNode(e, t, r, n);
                  return (
                    ge.isDir(o.mode)
                      ? ((o.node_ops = we.ops_table.dir.node), (o.stream_ops = we.ops_table.dir.stream), (o.contents = {}))
                      : ge.isFile(o.mode)
                      ? ((o.node_ops = we.ops_table.file.node), (o.stream_ops = we.ops_table.file.stream), (o.usedBytes = 0), (o.contents = null))
                      : ge.isLink(o.mode)
                      ? ((o.node_ops = we.ops_table.link.node), (o.stream_ops = we.ops_table.link.stream))
                      : ge.isChrdev(o.mode) && ((o.node_ops = we.ops_table.chrdev.node), (o.stream_ops = we.ops_table.chrdev.stream)),
                    (o.timestamp = Date.now()),
                    e && (e.contents[t] = o),
                    o
                  );
                },
                getFileDataAsRegularArray: function (e) {
                  if (e.contents && e.contents.subarray) {
                    for (var t = [], r = 0; r < e.usedBytes; ++r) t.push(e.contents[r]);
                    return t;
                  }
                  return e.contents;
                },
                getFileDataAsTypedArray: function (e) {
                  return e.contents ? (e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents)) : new Uint8Array(0);
                },
                expandFileStorage: function (e, t) {
                  var r = e.contents ? e.contents.length : 0;
                  if (!(r >= t)) {
                    (t = Math.max(t, (r * (r < 1048576 ? 2 : 1.125)) >>> 0)), 0 != r && (t = Math.max(t, 256));
                    var n = e.contents;
                    (e.contents = new Uint8Array(t)), e.usedBytes > 0 && e.contents.set(n.subarray(0, e.usedBytes), 0);
                  }
                },
                resizeFileStorage: function (e, t) {
                  if (e.usedBytes != t) {
                    if (0 == t) return (e.contents = null), void (e.usedBytes = 0);
                    if (!e.contents || e.contents.subarray) {
                      var r = e.contents;
                      return (e.contents = new Uint8Array(t)), r && e.contents.set(r.subarray(0, Math.min(t, e.usedBytes))), void (e.usedBytes = t);
                    }
                    if ((e.contents || (e.contents = []), e.contents.length > t)) e.contents.length = t;
                    else for (; e.contents.length < t; ) e.contents.push(0);
                    e.usedBytes = t;
                  }
                },
                node_ops: {
                  getattr: function (e) {
                    var t = {};
                    return (
                      (t.dev = ge.isChrdev(e.mode) ? e.id : 1),
                      (t.ino = e.id),
                      (t.mode = e.mode),
                      (t.nlink = 1),
                      (t.uid = 0),
                      (t.gid = 0),
                      (t.rdev = e.rdev),
                      ge.isDir(e.mode) ? (t.size = 4096) : ge.isFile(e.mode) ? (t.size = e.usedBytes) : ge.isLink(e.mode) ? (t.size = e.link.length) : (t.size = 0),
                      (t.atime = new Date(e.timestamp)),
                      (t.mtime = new Date(e.timestamp)),
                      (t.ctime = new Date(e.timestamp)),
                      (t.blksize = 4096),
                      (t.blocks = Math.ceil(t.size / t.blksize)),
                      t
                    );
                  },
                  setattr: function (e, t) {
                    void 0 !== t.mode && (e.mode = t.mode), void 0 !== t.timestamp && (e.timestamp = t.timestamp), void 0 !== t.size && we.resizeFileStorage(e, t.size);
                  },
                  lookup: function (e, t) {
                    throw ge.genericErrors[44];
                  },
                  mknod: function (e, t, r, n) {
                    return we.createNode(e, t, r, n);
                  },
                  rename: function (e, t, r) {
                    if (ge.isDir(e.mode)) {
                      var n;
                      try {
                        n = ge.lookupNode(t, r);
                      } catch (e) {}
                      if (n) for (var o in n.contents) throw new ge.ErrnoError(55);
                    }
                    delete e.parent.contents[e.name], (e.name = r), (t.contents[r] = e), (e.parent = t);
                  },
                  unlink: function (e, t) {
                    delete e.contents[t];
                  },
                  rmdir: function (e, t) {
                    var r = ge.lookupNode(e, t);
                    for (var n in r.contents) throw new ge.ErrnoError(55);
                    delete e.contents[t];
                  },
                  readdir: function (e) {
                    var t = [".", ".."];
                    for (var r in e.contents) e.contents.hasOwnProperty(r) && t.push(r);
                    return t;
                  },
                  symlink: function (e, t, r) {
                    var n = we.createNode(e, t, 41471, 0);
                    return (n.link = r), n;
                  },
                  readlink: function (e) {
                    if (!ge.isLink(e.mode)) throw new ge.ErrnoError(28);
                    return e.link;
                  },
                },
                stream_ops: {
                  read: function (e, t, r, n, o) {
                    var a = e.node.contents;
                    if (o >= e.node.usedBytes) return 0;
                    var i = Math.min(e.node.usedBytes - o, n);
                    if (i > 8 && a.subarray) t.set(a.subarray(o, o + i), r);
                    else for (var s = 0; s < i; s++) t[r + s] = a[o + s];
                    return i;
                  },
                  write: function (e, t, r, n, o, a) {
                    if ((t.buffer === F.buffer && (a = !1), !n)) return 0;
                    var i = e.node;
                    if (((i.timestamp = Date.now()), t.subarray && (!i.contents || i.contents.subarray))) {
                      if (a) return (i.contents = t.subarray(r, r + n)), (i.usedBytes = n), n;
                      if (0 === i.usedBytes && 0 === o) return (i.contents = t.slice(r, r + n)), (i.usedBytes = n), n;
                      if (o + n <= i.usedBytes) return i.contents.set(t.subarray(r, r + n), o), n;
                    }
                    if ((we.expandFileStorage(i, o + n), i.contents.subarray && t.subarray)) i.contents.set(t.subarray(r, r + n), o);
                    else for (var s = 0; s < n; s++) i.contents[o + s] = t[r + s];
                    return (i.usedBytes = Math.max(i.usedBytes, o + n)), n;
                  },
                  llseek: function (e, t, r) {
                    var n = t;
                    if ((1 === r ? (n += e.position) : 2 === r && ge.isFile(e.node.mode) && (n += e.node.usedBytes), n < 0)) throw new ge.ErrnoError(28);
                    return n;
                  },
                  allocate: function (e, t, r) {
                    we.expandFileStorage(e.node, t + r), (e.node.usedBytes = Math.max(e.node.usedBytes, t + r));
                  },
                  mmap: function (e, t, r, n, o, a) {
                    if ((b(0 === t), !ge.isFile(e.node.mode))) throw new ge.ErrnoError(43);
                    var i,
                      s,
                      u = e.node.contents;
                    if (2 & a || u.buffer !== S) {
                      if (((n > 0 || n + r < u.length) && (u = u.subarray ? u.subarray(n, n + r) : Array.prototype.slice.call(u, n, n + r)), (s = !0), !(i = pe(r)))) throw new ge.ErrnoError(48);
                      F.set(u, i);
                    } else (s = !1), (i = u.byteOffset);
                    return { ptr: i, allocated: s };
                  },
                  msync: function (e, t, r, n, o) {
                    if (!ge.isFile(e.node.mode)) throw new ge.ErrnoError(43);
                    return 2 & o || we.stream_ops.write(e, t, 0, n, r, !1), 0;
                  },
                },
              },
              ge = {
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
                  if (!(e instanceof ge.ErrnoError)) throw e + " : " + ce();
                  return de(e.errno);
                },
                lookupPath: function (e, t) {
                  if (((t = t || {}), !(e = me.resolve(ge.cwd(), e)))) return { path: "", node: null };
                  var r = { follow_mount: !0, recurse_count: 0 };
                  for (var n in r) void 0 === t[n] && (t[n] = r[n]);
                  if (t.recurse_count > 8) throw new ge.ErrnoError(32);
                  for (
                    var o = fe.normalizeArray(
                        e.split("/").filter(function (e) {
                          return !!e;
                        }),
                        !1
                      ),
                      a = ge.root,
                      i = "/",
                      s = 0;
                    s < o.length;
                    s++
                  ) {
                    var u = s === o.length - 1;
                    if (u && t.parent) break;
                    if (((a = ge.lookupNode(a, o[s])), (i = fe.join2(i, o[s])), ge.isMountpoint(a) && (!u || (u && t.follow_mount)) && (a = a.mounted.root), !u || t.follow))
                      for (var c = 0; ge.isLink(a.mode); ) {
                        var l = ge.readlink(i);
                        if (((i = me.resolve(fe.dirname(i), l)), (a = ge.lookupPath(i, { recurse_count: t.recurse_count }).node), c++ > 40)) throw new ge.ErrnoError(32);
                      }
                  }
                  return { path: i, node: a };
                },
                getPath: function (e) {
                  for (var t; ; ) {
                    if (ge.isRoot(e)) {
                      var r = e.mount.mountpoint;
                      return t ? ("/" !== r[r.length - 1] ? r + "/" + t : r + t) : r;
                    }
                    (t = t ? e.name + "/" + t : e.name), (e = e.parent);
                  }
                },
                hashName: function (e, t) {
                  for (var r = 0, n = 0; n < t.length; n++) r = ((r << 5) - r + t.charCodeAt(n)) | 0;
                  return ((e + r) >>> 0) % ge.nameTable.length;
                },
                hashAddNode: function (e) {
                  var t = ge.hashName(e.parent.id, e.name);
                  (e.name_next = ge.nameTable[t]), (ge.nameTable[t] = e);
                },
                hashRemoveNode: function (e) {
                  var t = ge.hashName(e.parent.id, e.name);
                  if (ge.nameTable[t] === e) ge.nameTable[t] = e.name_next;
                  else
                    for (var r = ge.nameTable[t]; r; ) {
                      if (r.name_next === e) {
                        r.name_next = e.name_next;
                        break;
                      }
                      r = r.name_next;
                    }
                },
                lookupNode: function (e, t) {
                  var r = ge.mayLookup(e);
                  if (r) throw new ge.ErrnoError(r, e);
                  for (var n = ge.hashName(e.id, t), o = ge.nameTable[n]; o; o = o.name_next) {
                    var a = o.name;
                    if (o.parent.id === e.id && a === t) return o;
                  }
                  return ge.lookup(e, t);
                },
                createNode: function (e, t, r, n) {
                  var o = new ge.FSNode(e, t, r, n);
                  return ge.hashAddNode(o), o;
                },
                destroyNode: function (e) {
                  ge.hashRemoveNode(e);
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
                  var t = ge.flagModes[e];
                  if (void 0 === t) throw new Error("Unknown file open mode: " + e);
                  return t;
                },
                flagsToPermissionString: function (e) {
                  var t = ["r", "w", "rw"][3 & e];
                  return 512 & e && (t += "w"), t;
                },
                nodePermissions: function (e, t) {
                  return ge.ignorePermissions || ((-1 === t.indexOf("r") || 292 & e.mode) && (-1 === t.indexOf("w") || 146 & e.mode) && (-1 === t.indexOf("x") || 73 & e.mode)) ? 0 : 2;
                },
                mayLookup: function (e) {
                  var t = ge.nodePermissions(e, "x");
                  return t || (e.node_ops.lookup ? 0 : 2);
                },
                mayCreate: function (e, t) {
                  try {
                    return ge.lookupNode(e, t), 20;
                  } catch (e) {}
                  return ge.nodePermissions(e, "wx");
                },
                mayDelete: function (e, t, r) {
                  var n;
                  try {
                    n = ge.lookupNode(e, t);
                  } catch (e) {
                    return e.errno;
                  }
                  var o = ge.nodePermissions(e, "wx");
                  if (o) return o;
                  if (r) {
                    if (!ge.isDir(n.mode)) return 54;
                    if (ge.isRoot(n) || ge.getPath(n) === ge.cwd()) return 10;
                  } else if (ge.isDir(n.mode)) return 31;
                  return 0;
                },
                mayOpen: function (e, t) {
                  return e ? (ge.isLink(e.mode) ? 32 : ge.isDir(e.mode) && ("r" !== ge.flagsToPermissionString(t) || 512 & t) ? 31 : ge.nodePermissions(e, ge.flagsToPermissionString(t))) : 44;
                },
                MAX_OPEN_FDS: 4096,
                nextfd: function (e, t) {
                  (e = e || 0), (t = t || ge.MAX_OPEN_FDS);
                  for (var r = e; r <= t; r++) if (!ge.streams[r]) return r;
                  throw new ge.ErrnoError(33);
                },
                getStream: function (e) {
                  return ge.streams[e];
                },
                createStream: function (e, t, r) {
                  ge.FSStream ||
                    ((ge.FSStream = function () {}),
                    (ge.FSStream.prototype = {
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
                  var n = new ge.FSStream();
                  for (var o in e) n[o] = e[o];
                  e = n;
                  var a = ge.nextfd(t, r);
                  return (e.fd = a), (ge.streams[a] = e), e;
                },
                closeStream: function (e) {
                  ge.streams[e] = null;
                },
                chrdev_stream_ops: {
                  open: function (e) {
                    var t = ge.getDevice(e.node.rdev);
                    (e.stream_ops = t.stream_ops), e.stream_ops.open && e.stream_ops.open(e);
                  },
                  llseek: function () {
                    throw new ge.ErrnoError(70);
                  },
                },
                major: function (e) {
                  return e >> 8;
                },
                minor: function (e) {
                  return 255 & e;
                },
                makedev: function (e, t) {
                  return (e << 8) | t;
                },
                registerDevice: function (e, t) {
                  ge.devices[e] = { stream_ops: t };
                },
                getDevice: function (e) {
                  return ge.devices[e];
                },
                getMounts: function (e) {
                  for (var t = [], r = [e]; r.length; ) {
                    var n = r.pop();
                    t.push(n), r.push.apply(r, n.mounts);
                  }
                  return t;
                },
                syncfs: function (e, t) {
                  "function" == typeof e && ((t = e), (e = !1)), ge.syncFSRequests++, ge.syncFSRequests > 1 && k("warning: " + ge.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
                  var r = ge.getMounts(ge.root.mount),
                    n = 0;
                  function o(e) {
                    return ge.syncFSRequests--, t(e);
                  }
                  function a(e) {
                    if (e) return a.errored ? void 0 : ((a.errored = !0), o(e));
                    ++n >= r.length && o(null);
                  }
                  r.forEach(function (t) {
                    if (!t.type.syncfs) return a(null);
                    t.type.syncfs(t, e, a);
                  });
                },
                mount: function (e, t, r) {
                  var n,
                    o = "/" === r,
                    a = !r;
                  if (o && ge.root) throw new ge.ErrnoError(10);
                  if (!o && !a) {
                    var i = ge.lookupPath(r, { follow_mount: !1 });
                    if (((r = i.path), (n = i.node), ge.isMountpoint(n))) throw new ge.ErrnoError(10);
                    if (!ge.isDir(n.mode)) throw new ge.ErrnoError(54);
                  }
                  var s = { type: e, opts: t, mountpoint: r, mounts: [] },
                    u = e.mount(s);
                  return (u.mount = s), (s.root = u), o ? (ge.root = u) : n && ((n.mounted = s), n.mount && n.mount.mounts.push(s)), u;
                },
                unmount: function (e) {
                  var t = ge.lookupPath(e, { follow_mount: !1 });
                  if (!ge.isMountpoint(t.node)) throw new ge.ErrnoError(28);
                  var r = t.node,
                    n = r.mounted,
                    o = ge.getMounts(n);
                  Object.keys(ge.nameTable).forEach(function (e) {
                    for (var t = ge.nameTable[e]; t; ) {
                      var r = t.name_next;
                      -1 !== o.indexOf(t.mount) && ge.destroyNode(t), (t = r);
                    }
                  }),
                    (r.mounted = null);
                  var a = r.mount.mounts.indexOf(n);
                  r.mount.mounts.splice(a, 1);
                },
                lookup: function (e, t) {
                  return e.node_ops.lookup(e, t);
                },
                mknod: function (e, t, r) {
                  var n = ge.lookupPath(e, { parent: !0 }).node,
                    o = fe.basename(e);
                  if (!o || "." === o || ".." === o) throw new ge.ErrnoError(28);
                  var a = ge.mayCreate(n, o);
                  if (a) throw new ge.ErrnoError(a);
                  if (!n.node_ops.mknod) throw new ge.ErrnoError(63);
                  return n.node_ops.mknod(n, o, t, r);
                },
                create: function (e, t) {
                  return (t = void 0 !== t ? t : 438), (t &= 4095), (t |= 32768), ge.mknod(e, t, 0);
                },
                mkdir: function (e, t) {
                  return (t = void 0 !== t ? t : 511), (t &= 1023), (t |= 16384), ge.mknod(e, t, 0);
                },
                mkdirTree: function (e, t) {
                  for (var r = e.split("/"), n = "", o = 0; o < r.length; ++o)
                    if (r[o]) {
                      n += "/" + r[o];
                      try {
                        ge.mkdir(n, t);
                      } catch (e) {
                        if (20 != e.errno) throw e;
                      }
                    }
                },
                mkdev: function (e, t, r) {
                  return void 0 === r && ((r = t), (t = 438)), (t |= 8192), ge.mknod(e, t, r);
                },
                symlink: function (e, t) {
                  if (!me.resolve(e)) throw new ge.ErrnoError(44);
                  var r = ge.lookupPath(t, { parent: !0 }).node;
                  if (!r) throw new ge.ErrnoError(44);
                  var n = fe.basename(t),
                    o = ge.mayCreate(r, n);
                  if (o) throw new ge.ErrnoError(o);
                  if (!r.node_ops.symlink) throw new ge.ErrnoError(63);
                  return r.node_ops.symlink(r, n, e);
                },
                rename: function (e, t) {
                  var r,
                    n,
                    o = fe.dirname(e),
                    a = fe.dirname(t),
                    i = fe.basename(e),
                    s = fe.basename(t);
                  if (((r = ge.lookupPath(e, { parent: !0 }).node), (n = ge.lookupPath(t, { parent: !0 }).node), !r || !n)) throw new ge.ErrnoError(44);
                  if (r.mount !== n.mount) throw new ge.ErrnoError(75);
                  var u,
                    c = ge.lookupNode(r, i),
                    l = me.relative(e, a);
                  if ("." !== l.charAt(0)) throw new ge.ErrnoError(28);
                  if ("." !== (l = me.relative(t, o)).charAt(0)) throw new ge.ErrnoError(55);
                  try {
                    u = ge.lookupNode(n, s);
                  } catch (e) {}
                  if (c !== u) {
                    var f = ge.isDir(c.mode),
                      d = ge.mayDelete(r, i, f);
                    if (d) throw new ge.ErrnoError(d);
                    if ((d = u ? ge.mayDelete(n, s, f) : ge.mayCreate(n, s))) throw new ge.ErrnoError(d);
                    if (!r.node_ops.rename) throw new ge.ErrnoError(63);
                    if (ge.isMountpoint(c) || (u && ge.isMountpoint(u))) throw new ge.ErrnoError(10);
                    if (n !== r && (d = ge.nodePermissions(r, "w"))) throw new ge.ErrnoError(d);
                    try {
                      ge.trackingDelegate.willMovePath && ge.trackingDelegate.willMovePath(e, t);
                    } catch (r) {
                      k("FS.trackingDelegate['willMovePath']('" + e + "', '" + t + "') threw an exception: " + r.message);
                    }
                    ge.hashRemoveNode(c);
                    try {
                      r.node_ops.rename(c, n, s);
                    } catch (e) {
                      throw e;
                    } finally {
                      ge.hashAddNode(c);
                    }
                    try {
                      ge.trackingDelegate.onMovePath && ge.trackingDelegate.onMovePath(e, t);
                    } catch (r) {
                      k("FS.trackingDelegate['onMovePath']('" + e + "', '" + t + "') threw an exception: " + r.message);
                    }
                  }
                },
                rmdir: function (e) {
                  var t = ge.lookupPath(e, { parent: !0 }).node,
                    r = fe.basename(e),
                    n = ge.lookupNode(t, r),
                    o = ge.mayDelete(t, r, !0);
                  if (o) throw new ge.ErrnoError(o);
                  if (!t.node_ops.rmdir) throw new ge.ErrnoError(63);
                  if (ge.isMountpoint(n)) throw new ge.ErrnoError(10);
                  try {
                    ge.trackingDelegate.willDeletePath && ge.trackingDelegate.willDeletePath(e);
                  } catch (t) {
                    k("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + t.message);
                  }
                  t.node_ops.rmdir(t, r), ge.destroyNode(n);
                  try {
                    ge.trackingDelegate.onDeletePath && ge.trackingDelegate.onDeletePath(e);
                  } catch (t) {
                    k("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + t.message);
                  }
                },
                readdir: function (e) {
                  var t = ge.lookupPath(e, { follow: !0 }).node;
                  if (!t.node_ops.readdir) throw new ge.ErrnoError(54);
                  return t.node_ops.readdir(t);
                },
                unlink: function (e) {
                  var t = ge.lookupPath(e, { parent: !0 }).node,
                    r = fe.basename(e),
                    n = ge.lookupNode(t, r),
                    o = ge.mayDelete(t, r, !1);
                  if (o) throw new ge.ErrnoError(o);
                  if (!t.node_ops.unlink) throw new ge.ErrnoError(63);
                  if (ge.isMountpoint(n)) throw new ge.ErrnoError(10);
                  try {
                    ge.trackingDelegate.willDeletePath && ge.trackingDelegate.willDeletePath(e);
                  } catch (t) {
                    k("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + t.message);
                  }
                  t.node_ops.unlink(t, r), ge.destroyNode(n);
                  try {
                    ge.trackingDelegate.onDeletePath && ge.trackingDelegate.onDeletePath(e);
                  } catch (t) {
                    k("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + t.message);
                  }
                },
                readlink: function (e) {
                  var t = ge.lookupPath(e).node;
                  if (!t) throw new ge.ErrnoError(44);
                  if (!t.node_ops.readlink) throw new ge.ErrnoError(28);
                  return me.resolve(ge.getPath(t.parent), t.node_ops.readlink(t));
                },
                stat: function (e, t) {
                  var r = ge.lookupPath(e, { follow: !t }).node;
                  if (!r) throw new ge.ErrnoError(44);
                  if (!r.node_ops.getattr) throw new ge.ErrnoError(63);
                  return r.node_ops.getattr(r);
                },
                lstat: function (e) {
                  return ge.stat(e, !0);
                },
                chmod: function (e, t, r) {
                  var n;
                  if (!(n = "string" == typeof e ? ge.lookupPath(e, { follow: !r }).node : e).node_ops.setattr) throw new ge.ErrnoError(63);
                  n.node_ops.setattr(n, { mode: (4095 & t) | (-4096 & n.mode), timestamp: Date.now() });
                },
                lchmod: function (e, t) {
                  ge.chmod(e, t, !0);
                },
                fchmod: function (e, t) {
                  var r = ge.getStream(e);
                  if (!r) throw new ge.ErrnoError(8);
                  ge.chmod(r.node, t);
                },
                chown: function (e, t, r, n) {
                  var o;
                  if (!(o = "string" == typeof e ? ge.lookupPath(e, { follow: !n }).node : e).node_ops.setattr) throw new ge.ErrnoError(63);
                  o.node_ops.setattr(o, { timestamp: Date.now() });
                },
                lchown: function (e, t, r) {
                  ge.chown(e, t, r, !0);
                },
                fchown: function (e, t, r) {
                  var n = ge.getStream(e);
                  if (!n) throw new ge.ErrnoError(8);
                  ge.chown(n.node, t, r);
                },
                truncate: function (e, t) {
                  if (t < 0) throw new ge.ErrnoError(28);
                  var r;
                  if (!(r = "string" == typeof e ? ge.lookupPath(e, { follow: !0 }).node : e).node_ops.setattr) throw new ge.ErrnoError(63);
                  if (ge.isDir(r.mode)) throw new ge.ErrnoError(31);
                  if (!ge.isFile(r.mode)) throw new ge.ErrnoError(28);
                  var n = ge.nodePermissions(r, "w");
                  if (n) throw new ge.ErrnoError(n);
                  r.node_ops.setattr(r, { size: t, timestamp: Date.now() });
                },
                ftruncate: function (e, t) {
                  var r = ge.getStream(e);
                  if (!r) throw new ge.ErrnoError(8);
                  if (0 == (2097155 & r.flags)) throw new ge.ErrnoError(28);
                  ge.truncate(r.node, t);
                },
                utime: function (e, t, r) {
                  var n = ge.lookupPath(e, { follow: !0 }).node;
                  n.node_ops.setattr(n, { timestamp: Math.max(t, r) });
                },
                open: function (t, r, n, o, a) {
                  if ("" === t) throw new ge.ErrnoError(44);
                  var i;
                  if (((n = void 0 === n ? 438 : n), (n = 64 & (r = "string" == typeof r ? ge.modeStringToFlags(r) : r) ? (4095 & n) | 32768 : 0), "object" == typeof t)) i = t;
                  else {
                    t = fe.normalize(t);
                    try {
                      i = ge.lookupPath(t, { follow: !(131072 & r) }).node;
                    } catch (e) {}
                  }
                  var s = !1;
                  if (64 & r)
                    if (i) {
                      if (128 & r) throw new ge.ErrnoError(20);
                    } else (i = ge.mknod(t, n, 0)), (s = !0);
                  if (!i) throw new ge.ErrnoError(44);
                  if ((ge.isChrdev(i.mode) && (r &= -513), 65536 & r && !ge.isDir(i.mode))) throw new ge.ErrnoError(54);
                  if (!s) {
                    var u = ge.mayOpen(i, r);
                    if (u) throw new ge.ErrnoError(u);
                  }
                  512 & r && ge.truncate(i, 0), (r &= -131713);
                  var c = ge.createStream({ node: i, path: ge.getPath(i), flags: r, seekable: !0, position: 0, stream_ops: i.stream_ops, ungotten: [], error: !1 }, o, a);
                  c.stream_ops.open && c.stream_ops.open(c), !e.logReadFiles || 1 & r || (ge.readFiles || (ge.readFiles = {}), t in ge.readFiles || ((ge.readFiles[t] = 1), k("FS.trackingDelegate error on read file: " + t)));
                  try {
                    if (ge.trackingDelegate.onOpenFile) {
                      var l = 0;
                      1 != (2097155 & r) && (l |= ge.tracking.openFlags.READ), 0 != (2097155 & r) && (l |= ge.tracking.openFlags.WRITE), ge.trackingDelegate.onOpenFile(t, l);
                    }
                  } catch (e) {
                    k("FS.trackingDelegate['onOpenFile']('" + t + "', flags) threw an exception: " + e.message);
                  }
                  return c;
                },
                close: function (e) {
                  if (ge.isClosed(e)) throw new ge.ErrnoError(8);
                  e.getdents && (e.getdents = null);
                  try {
                    e.stream_ops.close && e.stream_ops.close(e);
                  } catch (e) {
                    throw e;
                  } finally {
                    ge.closeStream(e.fd);
                  }
                  e.fd = null;
                },
                isClosed: function (e) {
                  return null === e.fd;
                },
                llseek: function (e, t, r) {
                  if (ge.isClosed(e)) throw new ge.ErrnoError(8);
                  if (!e.seekable || !e.stream_ops.llseek) throw new ge.ErrnoError(70);
                  if (0 != r && 1 != r && 2 != r) throw new ge.ErrnoError(28);
                  return (e.position = e.stream_ops.llseek(e, t, r)), (e.ungotten = []), e.position;
                },
                read: function (e, t, r, n, o) {
                  if (n < 0 || o < 0) throw new ge.ErrnoError(28);
                  if (ge.isClosed(e)) throw new ge.ErrnoError(8);
                  if (1 == (2097155 & e.flags)) throw new ge.ErrnoError(8);
                  if (ge.isDir(e.node.mode)) throw new ge.ErrnoError(31);
                  if (!e.stream_ops.read) throw new ge.ErrnoError(28);
                  var a = void 0 !== o;
                  if (a) {
                    if (!e.seekable) throw new ge.ErrnoError(70);
                  } else o = e.position;
                  var i = e.stream_ops.read(e, t, r, n, o);
                  return a || (e.position += i), i;
                },
                write: function (e, t, r, n, o, a) {
                  if (n < 0 || o < 0) throw new ge.ErrnoError(28);
                  if (ge.isClosed(e)) throw new ge.ErrnoError(8);
                  if (0 == (2097155 & e.flags)) throw new ge.ErrnoError(8);
                  if (ge.isDir(e.node.mode)) throw new ge.ErrnoError(31);
                  if (!e.stream_ops.write) throw new ge.ErrnoError(28);
                  e.seekable && 1024 & e.flags && ge.llseek(e, 0, 2);
                  var i = void 0 !== o;
                  if (i) {
                    if (!e.seekable) throw new ge.ErrnoError(70);
                  } else o = e.position;
                  var s = e.stream_ops.write(e, t, r, n, o, a);
                  i || (e.position += s);
                  try {
                    e.path && ge.trackingDelegate.onWriteToFile && ge.trackingDelegate.onWriteToFile(e.path);
                  } catch (t) {
                    k("FS.trackingDelegate['onWriteToFile']('" + e.path + "') threw an exception: " + t.message);
                  }
                  return s;
                },
                allocate: function (e, t, r) {
                  if (ge.isClosed(e)) throw new ge.ErrnoError(8);
                  if (t < 0 || r <= 0) throw new ge.ErrnoError(28);
                  if (0 == (2097155 & e.flags)) throw new ge.ErrnoError(8);
                  if (!ge.isFile(e.node.mode) && !ge.isDir(e.node.mode)) throw new ge.ErrnoError(43);
                  if (!e.stream_ops.allocate) throw new ge.ErrnoError(138);
                  e.stream_ops.allocate(e, t, r);
                },
                mmap: function (e, t, r, n, o, a) {
                  if (0 != (2 & o) && 0 == (2 & a) && 2 != (2097155 & e.flags)) throw new ge.ErrnoError(2);
                  if (1 == (2097155 & e.flags)) throw new ge.ErrnoError(2);
                  if (!e.stream_ops.mmap) throw new ge.ErrnoError(43);
                  return e.stream_ops.mmap(e, t, r, n, o, a);
                },
                msync: function (e, t, r, n, o) {
                  return e && e.stream_ops.msync ? e.stream_ops.msync(e, t, r, n, o) : 0;
                },
                munmap: function (e) {
                  return 0;
                },
                ioctl: function (e, t, r) {
                  if (!e.stream_ops.ioctl) throw new ge.ErrnoError(59);
                  return e.stream_ops.ioctl(e, t, r);
                },
                readFile: function (e, t) {
                  if ((((t = t || {}).flags = t.flags || "r"), (t.encoding = t.encoding || "binary"), "utf8" !== t.encoding && "binary" !== t.encoding)) throw new Error('Invalid encoding type "' + t.encoding + '"');
                  var r,
                    n = ge.open(e, t.flags),
                    o = ge.stat(e).size,
                    a = new Uint8Array(o);
                  return ge.read(n, a, 0, o, 0), "utf8" === t.encoding ? (r = R(a, 0)) : "binary" === t.encoding && (r = a), ge.close(n), r;
                },
                writeFile: function (e, t, r) {
                  (r = r || {}).flags = r.flags || "w";
                  var n = ge.open(e, r.flags, r.mode);
                  if ("string" == typeof t) {
                    var o = new Uint8Array(B(t) + 1),
                      a = T(t, o, 0, o.length);
                    ge.write(n, o, 0, a, void 0, r.canOwn);
                  } else {
                    if (!ArrayBuffer.isView(t)) throw new Error("Unsupported data type");
                    ge.write(n, t, 0, t.byteLength, void 0, r.canOwn);
                  }
                  ge.close(n);
                },
                cwd: function () {
                  return ge.currentPath;
                },
                chdir: function (e) {
                  var t = ge.lookupPath(e, { follow: !0 });
                  if (null === t.node) throw new ge.ErrnoError(44);
                  if (!ge.isDir(t.node.mode)) throw new ge.ErrnoError(54);
                  var r = ge.nodePermissions(t.node, "x");
                  if (r) throw new ge.ErrnoError(r);
                  ge.currentPath = t.path;
                },
                createDefaultDirectories: function () {
                  ge.mkdir("/tmp"), ge.mkdir("/home"), ge.mkdir("/home/web_user");
                },
                createDefaultDevices: function () {
                  ge.mkdir("/dev"),
                    ge.registerDevice(ge.makedev(1, 3), {
                      read: function () {
                        return 0;
                      },
                      write: function (e, t, r, n, o) {
                        return n;
                      },
                    }),
                    ge.mkdev("/dev/null", ge.makedev(1, 3)),
                    he.register(ge.makedev(5, 0), he.default_tty_ops),
                    he.register(ge.makedev(6, 0), he.default_tty1_ops),
                    ge.mkdev("/dev/tty", ge.makedev(5, 0)),
                    ge.mkdev("/dev/tty1", ge.makedev(6, 0));
                  var e = (function () {
                    if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
                      var e = new Uint8Array(1);
                      return function () {
                        return crypto.getRandomValues(e), e[0];
                      };
                    }
                    if (c)
                      try {
                        var t = o;
                        return function () {
                          return t.randomBytes(1)[0];
                        };
                      } catch (e) {}
                    return function () {
                      Q("randomDevice");
                    };
                  })();
                  ge.createDevice("/dev", "random", e), ge.createDevice("/dev", "urandom", e), ge.mkdir("/dev/shm"), ge.mkdir("/dev/shm/tmp");
                },
                createSpecialDirectories: function () {
                  ge.mkdir("/proc"),
                    ge.mkdir("/proc/self"),
                    ge.mkdir("/proc/self/fd"),
                    ge.mount(
                      {
                        mount: function () {
                          var e = ge.createNode("/proc/self", "fd", 16895, 73);
                          return (
                            (e.node_ops = {
                              lookup: function (e, t) {
                                var r = +t,
                                  n = ge.getStream(r);
                                if (!n) throw new ge.ErrnoError(8);
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
                  e.stdin ? ge.createDevice("/dev", "stdin", e.stdin) : ge.symlink("/dev/tty", "/dev/stdin"),
                    e.stdout ? ge.createDevice("/dev", "stdout", null, e.stdout) : ge.symlink("/dev/tty", "/dev/stdout"),
                    e.stderr ? ge.createDevice("/dev", "stderr", null, e.stderr) : ge.symlink("/dev/tty1", "/dev/stderr"),
                    ge.open("/dev/stdin", "r"),
                    ge.open("/dev/stdout", "w"),
                    ge.open("/dev/stderr", "w");
                },
                ensureErrnoError: function () {
                  ge.ErrnoError ||
                    ((ge.ErrnoError = function (e, t) {
                      (this.node = t),
                        (this.setErrno = function (e) {
                          this.errno = e;
                        }),
                        this.setErrno(e),
                        (this.message = "FS error");
                    }),
                    (ge.ErrnoError.prototype = new Error()),
                    (ge.ErrnoError.prototype.constructor = ge.ErrnoError),
                    [44].forEach(function (e) {
                      (ge.genericErrors[e] = new ge.ErrnoError(e)), (ge.genericErrors[e].stack = "<generic error, no stack>");
                    }));
                },
                staticInit: function () {
                  ge.ensureErrnoError(), (ge.nameTable = new Array(4096)), ge.mount(we, {}, "/"), ge.createDefaultDirectories(), ge.createDefaultDevices(), ge.createSpecialDirectories(), (ge.filesystems = { MEMFS: we });
                },
                init: function (t, r, n) {
                  (ge.init.initialized = !0), ge.ensureErrnoError(), (e.stdin = t || e.stdin), (e.stdout = r || e.stdout), (e.stderr = n || e.stderr), ge.createStandardStreams();
                },
                quit: function () {
                  ge.init.initialized = !1;
                  var t = e._fflush;
                  t && t(0);
                  for (var r = 0; r < ge.streams.length; r++) {
                    var n = ge.streams[r];
                    n && ge.close(n);
                  }
                },
                getMode: function (e, t) {
                  var r = 0;
                  return e && (r |= 365), t && (r |= 146), r;
                },
                findObject: function (e, t) {
                  var r = ge.analyzePath(e, t);
                  return r.exists ? r.object : (de(r.error), null);
                },
                analyzePath: function (e, t) {
                  try {
                    e = (n = ge.lookupPath(e, { follow: !t })).path;
                  } catch (e) {}
                  var r = { isRoot: !1, exists: !1, error: 0, name: null, path: null, object: null, parentExists: !1, parentPath: null, parentObject: null };
                  try {
                    var n = ge.lookupPath(e, { parent: !0 });
                    (r.parentExists = !0),
                      (r.parentPath = n.path),
                      (r.parentObject = n.node),
                      (r.name = fe.basename(e)),
                      (n = ge.lookupPath(e, { follow: !t })),
                      (r.exists = !0),
                      (r.path = n.path),
                      (r.object = n.node),
                      (r.name = n.node.name),
                      (r.isRoot = "/" === n.path);
                  } catch (e) {
                    r.error = e.errno;
                  }
                  return r;
                },
                createPath: function (e, t, r, n) {
                  e = "string" == typeof e ? e : ge.getPath(e);
                  for (var o = t.split("/").reverse(); o.length; ) {
                    var a = o.pop();
                    if (a) {
                      var i = fe.join2(e, a);
                      try {
                        ge.mkdir(i);
                      } catch (e) {}
                      e = i;
                    }
                  }
                  return i;
                },
                createFile: function (e, t, r, n, o) {
                  var a = fe.join2("string" == typeof e ? e : ge.getPath(e), t),
                    i = ge.getMode(n, o);
                  return ge.create(a, i);
                },
                createDataFile: function (e, t, r, n, o, a) {
                  var i = t ? fe.join2("string" == typeof e ? e : ge.getPath(e), t) : e,
                    s = ge.getMode(n, o),
                    u = ge.create(i, s);
                  if (r) {
                    if ("string" == typeof r) {
                      for (var c = new Array(r.length), l = 0, f = r.length; l < f; ++l) c[l] = r.charCodeAt(l);
                      r = c;
                    }
                    ge.chmod(u, 146 | s);
                    var d = ge.open(u, "w");
                    ge.write(d, r, 0, r.length, 0, a), ge.close(d), ge.chmod(u, s);
                  }
                  return u;
                },
                createDevice: function (e, t, r, n) {
                  var o = fe.join2("string" == typeof e ? e : ge.getPath(e), t),
                    a = ge.getMode(!!r, !!n);
                  ge.createDevice.major || (ge.createDevice.major = 64);
                  var i = ge.makedev(ge.createDevice.major++, 0);
                  return (
                    ge.registerDevice(i, {
                      open: function (e) {
                        e.seekable = !1;
                      },
                      close: function (e) {
                        n && n.buffer && n.buffer.length && n(10);
                      },
                      read: function (e, t, n, o, a) {
                        for (var i = 0, s = 0; s < o; s++) {
                          var u;
                          try {
                            u = r();
                          } catch (e) {
                            throw new ge.ErrnoError(29);
                          }
                          if (void 0 === u && 0 === i) throw new ge.ErrnoError(6);
                          if (null == u) break;
                          i++, (t[n + s] = u);
                        }
                        return i && (e.node.timestamp = Date.now()), i;
                      },
                      write: function (e, t, r, o, a) {
                        for (var i = 0; i < o; i++)
                          try {
                            n(t[r + i]);
                          } catch (e) {
                            throw new ge.ErrnoError(29);
                          }
                        return o && (e.node.timestamp = Date.now()), i;
                      },
                    }),
                    ge.mkdev(o, a, i)
                  );
                },
                forceLoadFile: function (e) {
                  if (e.isDevice || e.isFolder || e.link || e.contents) return !0;
                  var t = !0;
                  if ("undefined" != typeof XMLHttpRequest)
                    throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
                  if (!m) throw new Error("Cannot load without read() or XMLHttpRequest.");
                  try {
                    (e.contents = xe(m(e.url), !0)), (e.usedBytes = e.contents.length);
                  } catch (e) {
                    t = !1;
                  }
                  return t || de(29), t;
                },
                createLazyFile: function (e, t, r, n, o) {
                  function a() {
                    (this.lengthKnown = !1), (this.chunks = []);
                  }
                  if (
                    ((a.prototype.get = function (e) {
                      if (!(e > this.length - 1 || e < 0)) {
                        var t = e % this.chunkSize,
                          r = (e / this.chunkSize) | 0;
                        return this.getter(r)[t];
                      }
                    }),
                    (a.prototype.setDataGetter = function (e) {
                      this.getter = e;
                    }),
                    (a.prototype.cacheLength = function () {
                      var e = new XMLHttpRequest();
                      if ((e.open("HEAD", r, !1), e.send(null), !((e.status >= 200 && e.status < 300) || 304 === e.status))) throw new Error("Couldn't load " + r + ". Status: " + e.status);
                      var t,
                        n = Number(e.getResponseHeader("Content-length")),
                        o = (t = e.getResponseHeader("Accept-Ranges")) && "bytes" === t,
                        a = (t = e.getResponseHeader("Content-Encoding")) && "gzip" === t,
                        i = 1048576;
                      o || (i = n);
                      var s = this;
                      s.setDataGetter(function (e) {
                        var t = e * i,
                          o = (e + 1) * i - 1;
                        if (
                          ((o = Math.min(o, n - 1)),
                          void 0 === s.chunks[e] &&
                            (s.chunks[e] = (function (e, t) {
                              if (e > t) throw new Error("invalid range (" + e + ", " + t + ") or no bytes requested!");
                              if (t > n - 1) throw new Error("only " + n + " bytes available! programmer error!");
                              var o = new XMLHttpRequest();
                              if (
                                (o.open("GET", r, !1),
                                n !== i && o.setRequestHeader("Range", "bytes=" + e + "-" + t),
                                "undefined" != typeof Uint8Array && (o.responseType = "arraybuffer"),
                                o.overrideMimeType && o.overrideMimeType("text/plain; charset=x-user-defined"),
                                o.send(null),
                                !((o.status >= 200 && o.status < 300) || 304 === o.status))
                              )
                                throw new Error("Couldn't load " + r + ". Status: " + o.status);
                              return void 0 !== o.response ? new Uint8Array(o.response || []) : xe(o.responseText || "", !0);
                            })(t, o)),
                          void 0 === s.chunks[e])
                        )
                          throw new Error("doXHR failed!");
                        return s.chunks[e];
                      }),
                        (!a && n) || ((i = n = 1), (n = this.getter(0).length), (i = n), E("LazyFiles on gzip forces download of the whole file when length is accessed")),
                        (this._length = n),
                        (this._chunkSize = i),
                        (this.lengthKnown = !0);
                    }),
                    "undefined" != typeof XMLHttpRequest)
                  ) {
                    if (!u) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var i = new a();
                    Object.defineProperties(i, {
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
                    var s = { isDevice: !1, contents: i };
                  } else s = { isDevice: !1, url: r };
                  var c = ge.createFile(e, t, s, n, o);
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
                      var t = c.stream_ops[e];
                      l[e] = function () {
                        if (!ge.forceLoadFile(c)) throw new ge.ErrnoError(29);
                        return t.apply(null, arguments);
                      };
                    }),
                    (l.read = function (e, t, r, n, o) {
                      if (!ge.forceLoadFile(c)) throw new ge.ErrnoError(29);
                      var a = e.node.contents;
                      if (o >= a.length) return 0;
                      var i = Math.min(a.length - o, n);
                      if (a.slice) for (var s = 0; s < i; s++) t[r + s] = a[o + s];
                      else for (s = 0; s < i; s++) t[r + s] = a.get(o + s);
                      return i;
                    }),
                    (c.stream_ops = l),
                    c
                  );
                },
                createPreloadedFile: function (t, r, n, o, a, i, s, u, c, l) {
                  Browser.init();
                  var f = r ? me.resolve(fe.join2(t, r)) : t;
                  function d(n) {
                    function d(e) {
                      l && l(), u || ge.createDataFile(t, r, e, o, a, c), i && i(), Z();
                    }
                    var m = !1;
                    e.preloadPlugins.forEach(function (e) {
                      m ||
                        (e.canHandle(f) &&
                          (e.handle(n, f, d, function () {
                            s && s(), Z();
                          }),
                          (m = !0)));
                    }),
                      m || d(n);
                  }
                  $(),
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
                saveFilesToDB: function (e, t, r) {
                  (t = t || function () {}), (r = r || function () {});
                  var n = ge.indexedDB();
                  try {
                    var o = n.open(ge.DB_NAME(), ge.DB_VERSION);
                  } catch (e) {
                    return r(e);
                  }
                  (o.onupgradeneeded = function () {
                    E("creating db"), o.result.createObjectStore(ge.DB_STORE_NAME);
                  }),
                    (o.onsuccess = function () {
                      var n = o.result.transaction([ge.DB_STORE_NAME], "readwrite"),
                        a = n.objectStore(ge.DB_STORE_NAME),
                        i = 0,
                        s = 0,
                        u = e.length;
                      function c() {
                        0 == s ? t() : r();
                      }
                      e.forEach(function (e) {
                        var t = a.put(ge.analyzePath(e).object.contents, e);
                        (t.onsuccess = function () {
                          ++i + s == u && c();
                        }),
                          (t.onerror = function () {
                            s++, i + s == u && c();
                          });
                      }),
                        (n.onerror = r);
                    }),
                    (o.onerror = r);
                },
                loadFilesFromDB: function (e, t, r) {
                  (t = t || function () {}), (r = r || function () {});
                  var n = ge.indexedDB();
                  try {
                    var o = n.open(ge.DB_NAME(), ge.DB_VERSION);
                  } catch (e) {
                    return r(e);
                  }
                  (o.onupgradeneeded = r),
                    (o.onsuccess = function () {
                      var n = o.result;
                      try {
                        var a = n.transaction([ge.DB_STORE_NAME], "readonly");
                      } catch (e) {
                        return void r(e);
                      }
                      var i = a.objectStore(ge.DB_STORE_NAME),
                        s = 0,
                        u = 0,
                        c = e.length;
                      function l() {
                        0 == u ? t() : r();
                      }
                      e.forEach(function (e) {
                        var t = i.get(e);
                        (t.onsuccess = function () {
                          ge.analyzePath(e).exists && ge.unlink(e), ge.createDataFile(fe.dirname(e), fe.basename(e), t.result, !0, !0, !0), ++s + u == c && l();
                        }),
                          (t.onerror = function () {
                            u++, s + u == c && l();
                          });
                      }),
                        (a.onerror = r);
                    }),
                    (o.onerror = r);
                },
              },
              ye = {
                mappings: {},
                DEFAULT_POLLMASK: 5,
                umask: 511,
                calculateAt: function (e, t) {
                  if ("/" !== t[0]) {
                    var r;
                    if (-100 === e) r = ge.cwd();
                    else {
                      var n = ge.getStream(e);
                      if (!n) throw new ge.ErrnoError(8);
                      r = n.path;
                    }
                    t = fe.join2(r, t);
                  }
                  return t;
                },
                doStat: function (e, t, r) {
                  try {
                    var n = e(t);
                  } catch (e) {
                    if (e && e.node && fe.normalize(t) !== fe.normalize(ge.getPath(e.node))) return -54;
                    throw e;
                  }
                  return (
                    (A[r >> 2] = n.dev),
                    (A[(r + 4) >> 2] = 0),
                    (A[(r + 8) >> 2] = n.ino),
                    (A[(r + 12) >> 2] = n.mode),
                    (A[(r + 16) >> 2] = n.nlink),
                    (A[(r + 20) >> 2] = n.uid),
                    (A[(r + 24) >> 2] = n.gid),
                    (A[(r + 28) >> 2] = n.rdev),
                    (A[(r + 32) >> 2] = 0),
                    (ne = [n.size >>> 0, ((re = n.size), +q(re) >= 1 ? (re > 0 ? (0 | G(+X(re / 4294967296), 4294967295)) >>> 0 : ~~+V((re - +(~~re >>> 0)) / 4294967296) >>> 0) : 0)]),
                    (A[(r + 40) >> 2] = ne[0]),
                    (A[(r + 44) >> 2] = ne[1]),
                    (A[(r + 48) >> 2] = 4096),
                    (A[(r + 52) >> 2] = n.blocks),
                    (A[(r + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                    (A[(r + 60) >> 2] = 0),
                    (A[(r + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                    (A[(r + 68) >> 2] = 0),
                    (A[(r + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                    (A[(r + 76) >> 2] = 0),
                    (ne = [n.ino >>> 0, ((re = n.ino), +q(re) >= 1 ? (re > 0 ? (0 | G(+X(re / 4294967296), 4294967295)) >>> 0 : ~~+V((re - +(~~re >>> 0)) / 4294967296) >>> 0) : 0)]),
                    (A[(r + 80) >> 2] = ne[0]),
                    (A[(r + 84) >> 2] = ne[1]),
                    0
                  );
                },
                doMsync: function (e, t, r, n, o) {
                  var a = M.slice(e, e + r);
                  ge.msync(t, a, o, r, n);
                },
                doMkdir: function (e, t) {
                  return "/" === (e = fe.normalize(e))[e.length - 1] && (e = e.substr(0, e.length - 1)), ge.mkdir(e, t, 0), 0;
                },
                doMknod: function (e, t, r) {
                  switch (61440 & t) {
                    case 32768:
                    case 8192:
                    case 24576:
                    case 4096:
                    case 49152:
                      break;
                    default:
                      return -28;
                  }
                  return ge.mknod(e, t, r), 0;
                },
                doReadlink: function (e, t, r) {
                  if (r <= 0) return -28;
                  var n = ge.readlink(e),
                    o = Math.min(r, B(n)),
                    a = F[t + o];
                  return z(n, t, r + 1), (F[t + o] = a), o;
                },
                doAccess: function (e, t) {
                  if (-8 & t) return -28;
                  var r;
                  if (!(r = ge.lookupPath(e, { follow: !0 }).node)) return -44;
                  var n = "";
                  return 4 & t && (n += "r"), 2 & t && (n += "w"), 1 & t && (n += "x"), n && ge.nodePermissions(r, n) ? -2 : 0;
                },
                doDup: function (e, t, r) {
                  var n = ge.getStream(r);
                  return n && ge.close(n), ge.open(e, t, 0, r, r).fd;
                },
                doReadv: function (e, t, r, n) {
                  for (var o = 0, a = 0; a < r; a++) {
                    var i = A[(t + 8 * a) >> 2],
                      s = A[(t + (8 * a + 4)) >> 2],
                      u = ge.read(e, F, i, s, n);
                    if (u < 0) return -1;
                    if (((o += u), u < s)) break;
                  }
                  return o;
                },
                doWritev: function (e, t, r, n) {
                  for (var o = 0, a = 0; a < r; a++) {
                    var i = A[(t + 8 * a) >> 2],
                      s = A[(t + (8 * a + 4)) >> 2],
                      u = ge.write(e, F, i, s, n);
                    if (u < 0) return -1;
                    o += u;
                  }
                  return o;
                },
                varargs: void 0,
                get: function () {
                  return (ye.varargs += 4), A[(ye.varargs - 4) >> 2];
                },
                getStr: function (e) {
                  return O(e);
                },
                getStreamFromFD: function (e) {
                  var t = ge.getStream(e);
                  if (!t) throw new ge.ErrnoError(8);
                  return t;
                },
                get64: function (e, t) {
                  return e;
                },
              };
            function ve(e) {
              try {
                return _.grow((e - S.byteLength + 65535) >>> 16), I(_.buffer), 1;
              } catch (e) {}
            }
            function _e(e) {
              return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
            }
            function Ee(e, t) {
              for (var r = 0, n = 0; n <= t; r += e[n++]);
              return r;
            }
            var ke = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
              De = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            function be(e, t) {
              for (var r = new Date(e.getTime()); t > 0; ) {
                var n = _e(r.getFullYear()),
                  o = r.getMonth(),
                  a = (n ? ke : De)[o];
                if (!(t > a - r.getDate())) return r.setDate(r.getDate() + t), r;
                (t -= a - r.getDate() + 1), r.setDate(1), o < 11 ? r.setMonth(o + 1) : (r.setMonth(0), r.setFullYear(r.getFullYear() + 1));
              }
              return r;
            }
            function Se(e) {
              try {
                return e();
              } catch (e) {
                Q(e);
              }
            }
            var Fe = {
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
                  var t = Fe.callStackNameToId[e];
                  return void 0 === t && ((t = Fe.callStackId++), (Fe.callStackNameToId[e] = t), (Fe.callStackIdToName[t] = e)), t;
                },
                instrumentWasmExports: function (e) {
                  var t = {};
                  for (var r in e)
                    !(function (r) {
                      var n = e[r];
                      t[r] =
                        "function" == typeof n
                          ? function () {
                              Fe.exportCallStack.push(r);
                              try {
                                return n.apply(null, arguments);
                              } finally {
                                if (D) return;
                                var e = Fe.exportCallStack.pop();
                                b(e === r), Fe.maybeStopUnwind();
                              }
                            }
                          : n;
                    })(r);
                  return t;
                },
                maybeStopUnwind: function () {
                  Fe.currData &&
                    Fe.state === Fe.State.Unwinding &&
                    0 === Fe.exportCallStack.length &&
                    ((Fe.state = Fe.State.Normal), Se(e._asyncify_stop_unwind), "undefined" != typeof Fibers && Fibers.trampoline(), Fe.afterUnwind && (Fe.afterUnwind(), (Fe.afterUnwind = null)));
                },
                allocateData: function () {
                  var e = Oe(12 + Fe.StackSize);
                  return Fe.setDataHeader(e, e + 12, Fe.StackSize), Fe.setDataRewindFunc(e), e;
                },
                setDataHeader: function (e, t, r) {
                  (A[e >> 2] = t), (A[(e + 4) >> 2] = t + r);
                },
                setDataRewindFunc: function (e) {
                  var t = Fe.exportCallStack[0],
                    r = Fe.getCallStackId(t);
                  A[(e + 8) >> 2] = r;
                },
                getDataRewindFunc: function (t) {
                  var r = A[(t + 8) >> 2],
                    n = Fe.callStackIdToName[r];
                  return e.asm[n];
                },
                handleSleep: function (t) {
                  if (!D) {
                    if (((v = !0), Fe.state === Fe.State.Normal)) {
                      var r = !1,
                        n = !1;
                      t(function (t) {
                        if (!D && ((Fe.handleSleepReturnValue = t || 0), (r = !0), n)) {
                          (Fe.state = Fe.State.Rewinding),
                            Se(function () {
                              e._asyncify_start_rewind(Fe.currData);
                            }),
                            "undefined" != typeof Browser && Browser.mainLoop.func && Browser.mainLoop.resume();
                          var o = Fe.getDataRewindFunc(Fe.currData)();
                          if (!Fe.currData) {
                            var a = Fe.asyncFinalizers;
                            (Fe.asyncFinalizers = []),
                              a.forEach(function (e) {
                                e(o);
                              });
                          }
                        }
                      }),
                        (n = !0),
                        r ||
                          ((Fe.state = Fe.State.Unwinding),
                          (Fe.currData = Fe.allocateData()),
                          Se(function () {
                            e._asyncify_start_unwind(Fe.currData);
                          }),
                          "undefined" != typeof Browser && Browser.mainLoop.func && Browser.mainLoop.pause());
                    } else
                      Fe.state === Fe.State.Rewinding
                        ? ((Fe.state = Fe.State.Normal),
                          Se(e._asyncify_stop_rewind),
                          Te(Fe.currData),
                          (Fe.currData = null),
                          Fe.sleepCallbacks.forEach(function (e) {
                            e();
                          }))
                        : Q("invalid state: " + Fe.state);
                    return Fe.handleSleepReturnValue;
                  }
                },
                handleAsync: function (e) {
                  return Fe.handleSleep(function (t) {
                    e().then(t);
                  });
                },
              },
              Me = function (e, t, r, n) {
                e || (e = this), (this.parent = e), (this.mount = e.mount), (this.mounted = null), (this.id = ge.nextInode++), (this.name = t), (this.mode = r), (this.node_ops = {}), (this.stream_ops = {}), (this.rdev = n);
              };
            function xe(e, t, r) {
              var n = r > 0 ? r : B(e) + 1,
                o = new Array(n),
                a = T(e, o, 0, o.length);
              return t && (o.length = a), o;
            }
            Object.defineProperties(Me.prototype, {
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
                  return ge.isDir(this.mode);
                },
              },
              isDevice: {
                get: function () {
                  return ge.isChrdev(this.mode);
                },
              },
            }),
              (ge.FSNode = Me),
              ge.staticInit(),
              U.push({
                func: function () {
                  Re();
                },
              });
            var Ae,
              Pe = {
                t: function (e, t) {
                  return le(e, t);
                },
                q: function (e, t) {
                  try {
                    return (e = ye.getStr(e)), ye.doAccess(e, t);
                  } catch (e) {
                    return (void 0 !== ge && e instanceof ge.ErrnoError) || Q(e), -e.errno;
                  }
                },
                g: function (e, t, r) {
                  ye.varargs = r;
                  try {
                    var n = ye.getStreamFromFD(e);
                    switch (t) {
                      case 0:
                        return (o = ye.get()) < 0 ? -28 : ge.open(n.path, n.flags, 0, o).fd;
                      case 1:
                      case 2:
                        return 0;
                      case 3:
                        return n.flags;
                      case 4:
                        var o = ye.get();
                        return (n.flags |= o), 0;
                      case 12:
                        return (o = ye.get()), (x[(o + 0) >> 1] = 2), 0;
                      case 13:
                      case 14:
                        return 0;
                      case 16:
                      case 8:
                        return -28;
                      case 9:
                        return de(28), -1;
                      default:
                        return -28;
                    }
                  } catch (e) {
                    return (void 0 !== ge && e instanceof ge.ErrnoError) || Q(e), -e.errno;
                  }
                },
                s: function (e, t) {
                  try {
                    if (0 === t) return -28;
                    var r = ge.cwd();
                    return t < B(r) + 1 ? -68 : (z(r, e, t), e);
                  } catch (e) {
                    return (void 0 !== ge && e instanceof ge.ErrnoError) || Q(e), -e.errno;
                  }
                },
                o: function (e, t, r) {
                  ye.varargs = r;
                  try {
                    var n = ye.getStreamFromFD(e);
                    switch (t) {
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
                        var o = ye.get();
                        return (A[o >> 2] = 0), 0;
                      case 21520:
                        return n.tty ? -28 : -59;
                      case 21531:
                        return (o = ye.get()), ge.ioctl(n, t, o);
                      case 21523:
                      case 21524:
                        return n.tty ? 0 : -59;
                      default:
                        Q("bad ioctl syscall " + t);
                    }
                  } catch (e) {
                    return (void 0 !== ge && e instanceof ge.ErrnoError) || Q(e), -e.errno;
                  }
                },
                p: function (e, t, r) {
                  ye.varargs = r;
                  try {
                    var n = ye.getStr(e),
                      o = ye.get();
                    return ge.open(n, t, o).fd;
                  } catch (e) {
                    return (void 0 !== ge && e instanceof ge.ErrnoError) || Q(e), -e.errno;
                  }
                },
                r: function (e, t) {
                  try {
                    return (e = ye.getStr(e)), ye.doStat(ge.stat, e, t);
                  } catch (e) {
                    return (void 0 !== ge && e instanceof ge.ErrnoError) || Q(e), -e.errno;
                  }
                },
                m: function (t, r) {
                  return Fe.handleAsync(async () => {
                    e.emglken_stdin_buffers.length ||
                      (await new Promise((t) => {
                        e.emglken_stdin_ready = t;
                      }));
                    const n = e.emglken_stdin_buffers[0],
                      o = Math.min(n.length, r);
                    return M.set(n.subarray(0, o), t), o == n.length ? e.emglken_stdin_buffers.shift() : (e.emglken_stdin_buffers[0] = n.subarray(o)), o;
                  });
                },
                l: function (e, t, r) {
                  M.copyWithin(e, t, t + r);
                },
                k: function (e) {
                  e >>>= 0;
                  var t = M.length;
                  if (e > 2147483648) return !1;
                  for (var r, n, o = 1; o <= 4; o *= 2) {
                    var a = t * (1 + 0.2 / o);
                    if (((a = Math.min(a, e + 100663296)), ve(Math.min(2147483648, ((r = Math.max(16777216, e, a)) % (n = 65536) > 0 && (r += n - (r % n)), r))))) return !0;
                  }
                  return !1;
                },
                c: function (e) {
                  Ue(e);
                },
                f: function (e) {
                  try {
                    var t = ye.getStreamFromFD(e);
                    return ge.close(t), 0;
                  } catch (e) {
                    return (void 0 !== ge && e instanceof ge.ErrnoError) || Q(e), e.errno;
                  }
                },
                n: function (e, t, r, n) {
                  try {
                    var o = ye.getStreamFromFD(e),
                      a = ye.doReadv(o, t, r);
                    return (A[n >> 2] = a), 0;
                  } catch (e) {
                    return (void 0 !== ge && e instanceof ge.ErrnoError) || Q(e), e.errno;
                  }
                },
                j: function (e, t, r, n, o) {
                  try {
                    var a = ye.getStreamFromFD(e),
                      i = 4294967296 * r + (t >>> 0);
                    return i <= -9007199254740992 || i >= 9007199254740992
                      ? -61
                      : (ge.llseek(a, i, n),
                        (ne = [a.position >>> 0, ((re = a.position), +q(re) >= 1 ? (re > 0 ? (0 | G(+X(re / 4294967296), 4294967295)) >>> 0 : ~~+V((re - +(~~re >>> 0)) / 4294967296) >>> 0) : 0)]),
                        (A[o >> 2] = ne[0]),
                        (A[(o + 4) >> 2] = ne[1]),
                        a.getdents && 0 === i && 0 === n && (a.getdents = null),
                        0);
                  } catch (e) {
                    return (void 0 !== ge && e instanceof ge.ErrnoError) || Q(e), e.errno;
                  }
                },
                e: function (e, t, r, n) {
                  try {
                    var o = ye.getStreamFromFD(e),
                      a = ye.doWritev(o, t, r);
                    return (A[n >> 2] = a), 0;
                  } catch (e) {
                    return (void 0 !== ge && e instanceof ge.ErrnoError) || Q(e), e.errno;
                  }
                },
                d: function (e) {
                  var t = Date.now();
                  return (A[e >> 2] = (t / 1e3) | 0), (A[(e + 4) >> 2] = ((t % 1e3) * 1e3) | 0), 0;
                },
                a: _,
                i: function (e) {},
                h: function (e, t, r, n) {
                  var o = A[(n + 40) >> 2],
                    a = {
                      tm_sec: A[n >> 2],
                      tm_min: A[(n + 4) >> 2],
                      tm_hour: A[(n + 8) >> 2],
                      tm_mday: A[(n + 12) >> 2],
                      tm_mon: A[(n + 16) >> 2],
                      tm_year: A[(n + 20) >> 2],
                      tm_wday: A[(n + 24) >> 2],
                      tm_yday: A[(n + 28) >> 2],
                      tm_isdst: A[(n + 32) >> 2],
                      tm_gmtoff: A[(n + 36) >> 2],
                      tm_zone: o ? O(o) : "",
                    },
                    i = O(r),
                    s = {
                      "%c": "%a %b %d %H:%M:%S %Y",
                      "%D": "%m/%d/%y",
                      "%F": "%Y-%m-%d",
                      "%h": "%b",
                      "%r": "%I:%M:%S %p",
                      "%R": "%H:%M",
                      "%T": "%H:%M:%S",
                      "%x": "%m/%d/%y",
                      "%X": "%H:%M:%S",
                      "%Ec": "%c",
                      "%EC": "%C",
                      "%Ex": "%m/%d/%y",
                      "%EX": "%H:%M:%S",
                      "%Ey": "%y",
                      "%EY": "%Y",
                      "%Od": "%d",
                      "%Oe": "%e",
                      "%OH": "%H",
                      "%OI": "%I",
                      "%Om": "%m",
                      "%OM": "%M",
                      "%OS": "%S",
                      "%Ou": "%u",
                      "%OU": "%U",
                      "%OV": "%V",
                      "%Ow": "%w",
                      "%OW": "%W",
                      "%Oy": "%y",
                    };
                  for (var u in s) i = i.replace(new RegExp(u, "g"), s[u]);
                  var c = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    l = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                  function f(e, t, r) {
                    for (var n = "number" == typeof e ? e.toString() : e || ""; n.length < t; ) n = r[0] + n;
                    return n;
                  }
                  function d(e, t) {
                    return f(e, t, "0");
                  }
                  function m(e, t) {
                    function r(e) {
                      return e < 0 ? -1 : e > 0 ? 1 : 0;
                    }
                    var n;
                    return 0 === (n = r(e.getFullYear() - t.getFullYear())) && 0 === (n = r(e.getMonth() - t.getMonth())) && (n = r(e.getDate() - t.getDate())), n;
                  }
                  function h(e) {
                    switch (e.getDay()) {
                      case 0:
                        return new Date(e.getFullYear() - 1, 11, 29);
                      case 1:
                        return e;
                      case 2:
                        return new Date(e.getFullYear(), 0, 3);
                      case 3:
                        return new Date(e.getFullYear(), 0, 2);
                      case 4:
                        return new Date(e.getFullYear(), 0, 1);
                      case 5:
                        return new Date(e.getFullYear() - 1, 11, 31);
                      case 6:
                        return new Date(e.getFullYear() - 1, 11, 30);
                    }
                  }
                  function p(e) {
                    var t = be(new Date(e.tm_year + 1900, 0, 1), e.tm_yday),
                      r = new Date(t.getFullYear(), 0, 4),
                      n = new Date(t.getFullYear() + 1, 0, 4),
                      o = h(r),
                      a = h(n);
                    return m(o, t) <= 0 ? (m(a, t) <= 0 ? t.getFullYear() + 1 : t.getFullYear()) : t.getFullYear() - 1;
                  }
                  var w = {
                    "%a": function (e) {
                      return c[e.tm_wday].substring(0, 3);
                    },
                    "%A": function (e) {
                      return c[e.tm_wday];
                    },
                    "%b": function (e) {
                      return l[e.tm_mon].substring(0, 3);
                    },
                    "%B": function (e) {
                      return l[e.tm_mon];
                    },
                    "%C": function (e) {
                      return d(((e.tm_year + 1900) / 100) | 0, 2);
                    },
                    "%d": function (e) {
                      return d(e.tm_mday, 2);
                    },
                    "%e": function (e) {
                      return f(e.tm_mday, 2, " ");
                    },
                    "%g": function (e) {
                      return p(e).toString().substring(2);
                    },
                    "%G": function (e) {
                      return p(e);
                    },
                    "%H": function (e) {
                      return d(e.tm_hour, 2);
                    },
                    "%I": function (e) {
                      var t = e.tm_hour;
                      return 0 == t ? (t = 12) : t > 12 && (t -= 12), d(t, 2);
                    },
                    "%j": function (e) {
                      return d(e.tm_mday + Ee(_e(e.tm_year + 1900) ? ke : De, e.tm_mon - 1), 3);
                    },
                    "%m": function (e) {
                      return d(e.tm_mon + 1, 2);
                    },
                    "%M": function (e) {
                      return d(e.tm_min, 2);
                    },
                    "%n": function () {
                      return "\n";
                    },
                    "%p": function (e) {
                      return e.tm_hour >= 0 && e.tm_hour < 12 ? "AM" : "PM";
                    },
                    "%S": function (e) {
                      return d(e.tm_sec, 2);
                    },
                    "%t": function () {
                      return "\t";
                    },
                    "%u": function (e) {
                      return e.tm_wday || 7;
                    },
                    "%U": function (e) {
                      var t = new Date(e.tm_year + 1900, 0, 1),
                        r = 0 === t.getDay() ? t : be(t, 7 - t.getDay()),
                        n = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday);
                      if (m(r, n) < 0) {
                        var o = Ee(_e(n.getFullYear()) ? ke : De, n.getMonth() - 1) - 31,
                          a = 31 - r.getDate() + o + n.getDate();
                        return d(Math.ceil(a / 7), 2);
                      }
                      return 0 === m(r, t) ? "01" : "00";
                    },
                    "%V": function (e) {
                      var t,
                        r = new Date(e.tm_year + 1900, 0, 4),
                        n = new Date(e.tm_year + 1901, 0, 4),
                        o = h(r),
                        a = h(n),
                        i = be(new Date(e.tm_year + 1900, 0, 1), e.tm_yday);
                      return m(i, o) < 0 ? "53" : m(a, i) <= 0 ? "01" : ((t = o.getFullYear() < e.tm_year + 1900 ? e.tm_yday + 32 - o.getDate() : e.tm_yday + 1 - o.getDate()), d(Math.ceil(t / 7), 2));
                    },
                    "%w": function (e) {
                      return e.tm_wday;
                    },
                    "%W": function (e) {
                      var t = new Date(e.tm_year, 0, 1),
                        r = 1 === t.getDay() ? t : be(t, 0 === t.getDay() ? 1 : 7 - t.getDay() + 1),
                        n = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday);
                      if (m(r, n) < 0) {
                        var o = Ee(_e(n.getFullYear()) ? ke : De, n.getMonth() - 1) - 31,
                          a = 31 - r.getDate() + o + n.getDate();
                        return d(Math.ceil(a / 7), 2);
                      }
                      return 0 === m(r, t) ? "01" : "00";
                    },
                    "%y": function (e) {
                      return (e.tm_year + 1900).toString().substring(2);
                    },
                    "%Y": function (e) {
                      return e.tm_year + 1900;
                    },
                    "%z": function (e) {
                      var t = e.tm_gmtoff,
                        r = t >= 0;
                      return (t = ((t = Math.abs(t) / 60) / 60) * 100 + (t % 60)), (r ? "+" : "-") + String("0000" + t).slice(-4);
                    },
                    "%Z": function (e) {
                      return e.tm_zone;
                    },
                    "%%": function () {
                      return "%";
                    },
                  };
                  for (var u in w) i.indexOf(u) >= 0 && (i = i.replace(new RegExp(u, "g"), w[u](a)));
                  var g = xe(i, !1);
                  return g.length > t
                    ? 0
                    : ((function (e, t) {
                        F.set(e, t);
                      })(g, e),
                      g.length - 1);
                },
                b: function (e) {
                  var t = (Date.now() / 1e3) | 0;
                  return e && (A[e >> 2] = t), t;
                },
              },
              Re =
                ((function () {
                  var t = { a: Pe };
                  function r(t, r) {
                    var n = t.exports;
                    (n = Fe.instrumentWasmExports(n)), (e.asm = n), e.asm.u, Z();
                  }
                  function n(e) {
                    r(e.instance);
                  }
                  function o(e) {
                    return (y || (!s && !u) || "function" != typeof fetch
                      ? Promise.resolve().then(ae)
                      : fetch(oe, { credentials: "same-origin" })
                          .then(function (e) {
                            if (!e.ok) throw "failed to load wasm binary file at '" + oe + "'";
                            return e.arrayBuffer();
                          })
                          .catch(function () {
                            return ae();
                          })
                    )
                      .then(function (e) {
                        return WebAssembly.instantiate(e, t);
                      })
                      .then(e, function (e) {
                        k("failed to asynchronously prepare wasm: " + e), Q(e);
                      });
                  }
                  if (($(), e.instantiateWasm))
                    try {
                      var a = e.instantiateWasm(t, r);
                      return (a = Fe.instrumentWasmExports(a));
                    } catch (e) {
                      return k("Module.instantiateWasm callback failed with error: " + e), !1;
                    }
                  !(function () {
                    if (y || "function" != typeof WebAssembly.instantiateStreaming || ee(oe) || "function" != typeof fetch) return o(n);
                    fetch(oe, { credentials: "same-origin" }).then(function (e) {
                      return WebAssembly.instantiateStreaming(e, t).then(n, function (e) {
                        return k("wasm streaming compile failed: " + e), k("falling back to ArrayBuffer instantiation"), o(n);
                      });
                    });
                  })();
                })(),
                (e.___wasm_call_ctors = function () {
                  return (Re = e.___wasm_call_ctors = e.asm.v).apply(null, arguments);
                })),
              Oe = (e._malloc = function () {
                return (Oe = e._malloc = e.asm.w).apply(null, arguments);
              }),
              Te = (e._free = function () {
                return (Te = e._free = e.asm.x).apply(null, arguments);
              }),
              ze =
                ((e._main = function () {
                  return (e._main = e.asm.y).apply(null, arguments);
                }),
                (e._gidispatch_get_game_id = function () {
                  return (e._gidispatch_get_game_id = e.asm.z).apply(null, arguments);
                }),
                (e._fflush = function () {
                  return (e._fflush = e.asm.A).apply(null, arguments);
                }),
                (e.___errno_location = function () {
                  return (ze = e.___errno_location = e.asm.B).apply(null, arguments);
                })),
              Be = (e.__get_tzname = function () {
                return (Be = e.__get_tzname = e.asm.C).apply(null, arguments);
              }),
              Ne = (e.__get_daylight = function () {
                return (Ne = e.__get_daylight = e.asm.D).apply(null, arguments);
              }),
              Ce = (e.__get_timezone = function () {
                return (Ce = e.__get_timezone = e.asm.E).apply(null, arguments);
              }),
              Ie = (e.stackAlloc = function () {
                return (Ie = e.stackAlloc = e.asm.F).apply(null, arguments);
              });
            function je(e) {
              (this.name = "ExitStatus"), (this.message = "Program terminated with exit(" + e + ")"), (this.status = e);
            }
            function Le(r) {
              function n() {
                Ae ||
                  ((Ae = !0),
                  (e.calledRun = !0),
                  D ||
                    (e.noFSInit || ge.init.initialized || ge.init(),
                    he.init(),
                    ie(U),
                    (ge.ignorePermissions = !1),
                    ie(H),
                    t(e),
                    e.onRuntimeInitialized && e.onRuntimeInitialized(),
                    He &&
                      (function (t) {
                        var r = e._main,
                          n = (t = t || []).length + 1,
                          o = Ie(4 * (n + 1));
                        A[o >> 2] = C(f);
                        for (var a = 1; a < n; a++) A[(o >> 2) + a] = C(t[a - 1]);
                        A[(o >> 2) + n] = 0;
                        try {
                          var i = r(n, o);
                          v || Ue(i, !0);
                        } catch (e) {
                          if (e instanceof je) return;
                          if ("unwind" == e) return void (v = !0);
                          var s = e;
                          e && "object" == typeof e && e.stack && (s = [e, e.stack]), k("exception thrown: " + s), d(1, e);
                        }
                      })(r),
                    (function () {
                      if (e.postRun) for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length; ) (t = e.postRun.shift()), Y.unshift(t);
                      var t;
                      ie(Y);
                    })()));
              }
              (r = r || l),
                J > 0 ||
                  ((function () {
                    if (e.preRun) for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length; ) (t = e.preRun.shift()), L.unshift(t);
                    var t;
                    ie(L);
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
            function Ue(t, r) {
              (r && v && 0 === t) || (v || (ie(W), ge.quit(), he.shutdown(), e.onExit && e.onExit(t), (D = !0)), d(t, new je(t)));
            }
            if (
              ((e.dynCall_jiji = function () {
                return (e.dynCall_jiji = e.asm.G).apply(null, arguments);
              }),
              (e.dynCall_iiii = function () {
                return (e.dynCall_iiii = e.asm.H).apply(null, arguments);
              }),
              (e.dynCall_ii = function () {
                return (e.dynCall_ii = e.asm.I).apply(null, arguments);
              }),
              (e.dynCall_iidiiii = function () {
                return (e.dynCall_iidiiii = e.asm.J).apply(null, arguments);
              }),
              (e.dynCall_vii = function () {
                return (e.dynCall_vii = e.asm.K).apply(null, arguments);
              }),
              (e._asyncify_start_unwind = function () {
                return (e._asyncify_start_unwind = e.asm.L).apply(null, arguments);
              }),
              (e._asyncify_stop_unwind = function () {
                return (e._asyncify_stop_unwind = e.asm.M).apply(null, arguments);
              }),
              (e._asyncify_start_rewind = function () {
                return (e._asyncify_start_rewind = e.asm.N).apply(null, arguments);
              }),
              (e._asyncify_stop_rewind = function () {
                return (e._asyncify_stop_rewind = e.asm.O).apply(null, arguments);
              }),
              (e.FS = ge),
              (e.AsciiToString = function (e) {
                for (var t = ""; ; ) {
                  var r = M[e++ >> 0];
                  if (!r) return t;
                  t += String.fromCharCode(r);
                }
              }),
              (K = function e() {
                Ae || Le(), Ae || (K = e);
              }),
              (e.run = Le),
              e.preInit)
            )
              for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); e.preInit.length > 0; ) e.preInit.pop()();
            var He = !0;
            return e.noInitialRun && (He = !1), Le(), e.ready;
          });
      e.exports = n;
    })((r = { exports: {} }), r.exports),
    r.exports);
export default class extends class {
  prepare(t, r) {
    (this.data = t), (this.options = Object.assign({}, e, this.default_options(), r));
  }
  async start() {
    const e = new TextEncoder();
    let t = "";
    const r = {
      arguments: this.options.show_help ? ["-help"] : this.options.arguments,
      emglken_stdin_buffers: [],
      emglken_stdin_ready() {},
      print: (e) => {
        if ("" !== t || "" === e || e.startsWith("{")) {
          if (((t += e), e.endsWith("}")))
            try {
              const e = JSON.parse(t);
              (t = ""), this.options.GlkOte.update(e);
            } catch (e) {}
        } else console.log(e);
      },
      preRun: () => {
        const e = r.FS;
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
                    e.data.reduce((e, t) => e + String.fromCharCode(t), ""),
                    !0
                  ));
          }
          createNode(e, t, r) {
            const n = this.FS;
            if (!n.isDir(r) && !n.isFile(r)) throw new n.ErrnoError(28);
            const o = n.createNode(e, t, r);
            return (o.node_ops = this), (o.stream_ops = this), (o.timestamp = Date.now()), o;
          }
          getattr(e) {
            return { atime: new Date(e.timestamp), ctime: new Date(e.timestamp), dev: 1, gid: 0, ino: e.id, mode: e.mode, mtime: new Date(e.timestamp), nlink: 1, rdev: e.rdev, uid: 0 };
          }
          get_dialog_ref(e) {
            let [t, r] = e.split(".");
            r = r.replace("glk", "");
            let n = "";
            return "save" === r && (n = this.VM.Module.AsciiToString(this.VM.Module._gidispatch_get_game_id())), this.dialog.file_construct_ref(t, r, n);
          }
          llseek(e, t, r) {
            let n = t;
            if (1 === r) n += e.position;
            else if (2 === r)
              if ("storyfile" === e.name) n += e.data.length;
              else if (this.streaming) {
                const t = e.fstream.ftell();
                e.fstream.fseek(0, 2), (n += e.fstream.ftell()), e.fstream.fseek(t, 0);
              } else n += e.data.length;
            if (n < 0) throw new this.FS.ErrnoError(28);
            return n;
          }
          lookup(e, t) {
            if ("storyfile" !== t) {
              const e = this.filename_map[t] || t;
              if (!this.dialog.file_ref_exists(this.streaming ? { filename: e } : this.get_dialog_ref(e))) throw new this.FS.ErrnoError(44);
            }
            return this.createNode(e, t, 33206);
          }
          mknod(e, t, r) {
            return this.createNode(e, t, r);
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
              const n = 1024 & (r = e.flags) ? 5 : 1 & r ? 1 : 2 & r ? 3 : 2,
                o = this.filename_map[e.name] || e.name;
              if (this.streaming) e.fstream = this.dialog.file_fopen(n, { filename: o });
              else {
                (e.fref = this.get_dialog_ref(o)), (e.fmode = n);
                let r = null;
                1 !== n && (r = this.dialog.file_read(e.fref, !0)), null == r ? ((e.data = new Uint8Array(0)), 2 !== n && this.dialog.file_write(e.fref, "", !0)) : (e.data = ((t = r), Uint8Array.from(t, (e) => e.charCodeAt(0))));
              }
            }
            var t, r;
          }
          read(e, t, r, n, o) {
            if (0 === n) return 0;
            if ("storyfile" === e.name) {
              const a = Math.min(e.data.length - o, n);
              return t.set(e.data.subarray(o, o + a), r), a;
            }
            if (this.streaming) {
              e.fstream.fseek(o, 0);
              const a = e.fstream.BufferClass.from(t.buffer, r, n);
              return e.fstream.fread(a, n);
            }
            {
              const a = Math.min(e.data.length - o, n);
              return t.set(e.data.subarray(o, o + a), r), a;
            }
          }
          readdir() {
            throw new Error("EmglkenFS.readdir");
          }
          readlink() {
            throw new Error("EmglkenFS.readlink");
          }
          register_filename(e, t) {
            const r = "save" === t ? ".glksave" : "data" === t ? ".glkdata" : ".txt";
            if ((/\.(glkdata|glksave|txt)$/.test(e) || (e += r), this.filename_map[e])) return this.filename_map[e];
            const n = "emglken_fake_file_" + this.filename_counter++;
            return (this.filename_map[e] = n), (this.filename_map[n + r] = e), n;
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
          unlink(e, t) {
            const r = this.filename_map[t] || t;
            this.dialog.file_remove_ref(this.get_dialog_ref(r));
          }
          write(e, t, r, n, o) {
            if ("storyfile" === e.name) throw new Error("EmglkenFS.write: cannot write to storyfile");
            if (this.streaming) {
              e.fstream.fseek(o, 0);
              const a = e.fstream.BufferClass.from(t).subarray(r, r + n);
              return e.fstream.fwrite(a, n);
            }
            {
              const a = n + (o = o || e.position);
              if (a > e.data.length) {
                const t = e.data;
                (e.data = new Uint8Array(a)), e.data.set(t);
              }
              return e.data.set(t.subarray(r, r + n), o), n;
            }
          }
        })(this)),
          e.mkdir("/emglken"),
          e.mount(this.EFS, {}, "/emglken"),
          e.chdir("/emglken");
      },
      wasmBinary: this.options.wasmBinary,
    };
    (this.Module = r),
      (this.options.accept = (t) => {
        "specialresponse" === t.type && "fileref_prompt" === t.response && t.value && (this.EFS.streaming ? (t.value = this.EFS.register_filename(t.value.filename, t.value.usage)) : (t.value = t.value.filename));
        const n = JSON.stringify(t),
          o = e.encode(n);
        r.emglken_stdin_buffers.push(o), r.emglken_stdin_ready();
      }),
      await this.options.vmcore(r),
      this.options.GlkOte.init(this.options);
  }
} {
  default_options() {
    return { vmcore: a };
  }
}
