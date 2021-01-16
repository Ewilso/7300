async function fetch_storyfile(e) {
  const t = await fetch(e);
  if (!t.ok) throw new Error("Could not fetch storyfile, got " + t.status);
  const i = await t.arrayBuffer();
  return new Uint8Array(i);
}
async function fetch_vm_resource(e, t) {
  if (t.endsWith(".js")) return import(t);
  const i = await fetch(e.lib_path + t);
  if (!i.ok) throw new Error(`Could not fetch ${t}, got ${i.status}`);
  return i.arrayBuffer();
}
var Dialog = (function () {
    var dialog_el_id = "dialog",
      is_open = !1,
      dialog_callback = null,
      will_save,
      confirming,
      editing,
      editing_dirent,
      cur_usage,
      cur_usage_name,
      cur_gameid,
      cur_filelist;
    function dialog_open(e, t, i, r) {
      if (is_open) throw new Error("Dialog: dialog box is already open.");
      if (!Storage) throw new Error("Dialog: no storage API is available.");
      (dialog_callback = r), (will_save = e), (confirming = !1), (editing = !1), (editing_dirent = null), (cur_gameid = i), (cur_usage_name = label_for_usage((cur_usage = t)));
      var n = "windowport",
        l = window.Game;
      window.GlkOte && (l = window.GlkOte.getinterface()), l && l.windowport && (n = l.windowport);
      var a = $("#" + n);
      if (!a.length) throw new Error("Dialog: unable to find root element #" + n + ".");
      var o = $("#" + dialog_el_id + "_screen");
      o.length || ((o = $("<div>", { id: dialog_el_id + "_screen" })), a.append(o));
      var s = $("#" + dialog_el_id + "_frame");
      s.length || ((s = $("<div>", { id: dialog_el_id + "_frame" })), a.append(s));
      var u,
        f,
        c,
        d = $("#" + dialog_el_id);
      d.length && d.remove(),
        (d = $("<div>", { id: dialog_el_id })),
        (u = $("<form>")).on("submit", will_save ? evhan_accept_save_button : evhan_accept_load_button),
        d.append(u),
        (c = $("<div>", { class: "DiaButtonsFloat" })),
        (f = $("<button>", { id: dialog_el_id + "_edit", type: "button" })).append("Edit"),
        f.on("click", evhan_edit_button),
        c.append(f),
        u.append(c),
        (c = $("<div>", { id: dialog_el_id + "_cap", class: "DiaCaption" })).append("XXX"),
        u.append(c),
        will_save &&
          ((c = $("<div>", { id: dialog_el_id + "_input", class: "DiaInput" })),
          u.append(c),
          (f = $("<input>", { id: dialog_el_id + "_infield", type: "text", name: "filename" })),
          c.append(f),
          (c = $("<div>", { id: dialog_el_id + "_warning", class: "DiaWarning" })).text("Warning: data may be erased by clearing cookies or browser privacy policies."),
          u.append(c)),
        (c = $("<div>", { id: dialog_el_id + "_body", class: "DiaBody" })),
        u.append(c),
        (c = $("<div>", { id: dialog_el_id + "_cap2", class: "DiaCaption" })).hide(),
        u.append(c),
        (c = $("<div>", { id: dialog_el_id + "_buttonrow", class: "DiaButtons" })),
        (f = $("<button>", { id: dialog_el_id + "_cancel", type: "button" })).append("Cancel"),
        f.on("click", evhan_cancel_button),
        c.append(f),
        (f = $("<button>", { id: dialog_el_id + "_delete", type: "button" })).append("Delete"),
        f.on("click", evhan_delete_button),
        f.hide(),
        c.append(f),
        (f = $("<button>", { id: dialog_el_id + "_display", type: "button" })).append("Display"),
        f.on("click", evhan_display_button),
        f.hide(),
        c.append(f),
        (f = $("<button>", { id: dialog_el_id + "_accept", type: "submit" })).append(will_save ? "Save" : "Load"),
        f.on("click", will_save ? evhan_accept_save_button : evhan_accept_load_button),
        c.append(f),
        u.append(c),
        s.append(d),
        (is_open = !0),
        evhan_storage_changed(),
        defer_func(
          will_save
            ? function () {
                var e = $("#" + dialog_el_id + "_infield");
                e.length && e.focus();
              }
            : function () {
                var e = $("#" + dialog_el_id + "_select");
                e.length && e.focus();
              }
        );
    }
    function dialog_close() {
      var e = $("#" + dialog_el_id);
      e.length && e.remove();
      var t = $("#" + dialog_el_id + "_frame");
      t.length && t.remove();
      var i = $("#" + dialog_el_id + "_screen");
      i.length && i.remove(), (is_open = !1), (dialog_callback = null), (cur_filelist = null), (editing = !1), (editing_dirent = null);
    }
    function set_caption(e, t) {
      var i = $("#" + (t ? dialog_el_id + "_cap" : dialog_el_id + "_cap2"));
      i.length && (e ? (i.text(e), i.show()) : i.hide());
    }
    function label_for_usage(e) {
      switch (e) {
        case "data":
          return "data file";
        case "save":
          return "save file";
        case "transcript":
          return "transcript";
        case "command":
          return "command script";
        default:
          return "file";
      }
    }
    function usage_is_textual(e) {
      return "transcript" == e || "command" == e;
    }
    function defer_func(e) {
      return window.setTimeout(e, 10);
    }
    function evhan_select_change() {
      if (!is_open) return !1;
      if (confirming) return !1;
      var e = $("#" + dialog_el_id + "_select");
      if (!e.length) return !1;
      var t = e.prop("selectedIndex");
      if (!cur_filelist || t < 0 || t >= cur_filelist.length) return !1;
      var i = cur_filelist[t],
        r = $("#" + dialog_el_id + "_infield");
      return !!r.length && (r.val(i.dirent.filename), !1);
    }
    function evhan_select_change_editing() {
      if (!is_open) return !1;
      if (!editing || editing_dirent) return !1;
      var e = $("#" + dialog_el_id + "_delete");
      e.prop("disabled", !0), (e = $("#" + dialog_el_id + "_display")).prop("disabled", !0);
      var t = $("#" + dialog_el_id + "_select");
      if (!t.length) return !1;
      var i = t.prop("selectedIndex");
      if (!cur_filelist || i < 0 || i >= cur_filelist.length) return !1;
      var r = cur_filelist[i];
      if (!r || !r.dirent || !file_ref_exists(r.dirent)) return !1;
      (e = $("#" + dialog_el_id + "_delete")).prop("disabled", !1), (e = $("#" + dialog_el_id + "_display")).prop("disabled", !1);
    }
    function evhan_accept_load_button(e) {
      if ((e.preventDefault(), !is_open)) return !1;
      if (editing) return !1;
      var t = $("#" + dialog_el_id + "_select");
      if (!t.length) return !1;
      var i = t.prop("selectedIndex");
      if (!cur_filelist || i < 0 || i >= cur_filelist.length) return !1;
      var r = cur_filelist[i];
      if (!r || !r.dirent || !file_ref_exists(r.dirent)) return !1;
      var n = dialog_callback;
      return dialog_close(), n && n(r.dirent), !1;
    }
    function evhan_accept_save_button(e) {
      if ((e.preventDefault(), !is_open)) return !1;
      if (editing) return !1;
      var t = $("#" + dialog_el_id + "_infield");
      if (!t.length) return !1;
      var i = t.val();
      if (!(i = jQuery.trim(i)).length) return !1;
      var r = file_construct_ref(i, cur_usage, cur_gameid);
      if (file_ref_exists(r) && !confirming)
        return (confirming = !0), set_caption("You already have a " + cur_usage_name + ' "' + r.filename + '". Do you want to replace it?', !1), t.prop("disabled", !0), $("#" + dialog_el_id + "_accept").text("Replace"), !1;
      var n = dialog_callback;
      return dialog_close(), n && n(r), !1;
    }
    function evhan_edit_button(e) {
      if ((e.preventDefault(), !is_open)) return !1;
      if (editing) {
        if (editing_dirent) {
          (editing = !0), (editing_dirent = null), $("#" + dialog_el_id + "_buttonrow").show();
          return $("#" + dialog_el_id + "_edit").text("Done"), evhan_storage_changed(), !1;
        }
        {
          (editing = !1), (editing_dirent = null);
          const e = $("#" + dialog_el_id + "_input");
          e.length && e.show();
          let t = $("#" + dialog_el_id + "_edit");
          return t.text("Edit"), (t = $("#" + dialog_el_id + "_delete")), t.hide(), (t = $("#" + dialog_el_id + "_display")), t.hide(), (t = $("#" + dialog_el_id + "_accept")), t.show(), evhan_storage_changed(), !1;
        }
      }
      {
        if (((editing = !0), (editing_dirent = null), confirming)) {
          (confirming = !1), set_caption(null, !1);
          $("#" + dialog_el_id + "_infield").prop("disabled", !1);
          const e = $("#" + dialog_el_id + "_accept");
          e.prop("disabled", !1), e.text("Save");
        }
        const e = $("#" + dialog_el_id + "_input");
        e.length && e.hide();
        let t = $("#" + dialog_el_id + "_edit");
        return t.text("Done"), (t = $("#" + dialog_el_id + "_delete")), t.show(), (t = $("#" + dialog_el_id + "_display")), t.show(), (t = $("#" + dialog_el_id + "_accept")), t.hide(), evhan_storage_changed(), !1;
      }
    }
    function evhan_delete_button(e) {
      if ((e.preventDefault(), !is_open)) return !1;
      if (!editing || editing_dirent) return !1;
      var t = $("#" + dialog_el_id + "_select");
      if (!t.length) return !1;
      var i = t.prop("selectedIndex");
      if (!cur_filelist || i < 0 || i >= cur_filelist.length) return !1;
      var r = cur_filelist[i];
      return !(!r || !r.dirent) && (file_remove_ref(r.dirent), evhan_storage_changed(), !1);
    }
    function evhan_display_button(e) {
      if ((e.preventDefault(), !is_open)) return !1;
      if (!editing || editing_dirent) return !1;
      var t = $("#" + dialog_el_id + "_select");
      if (!t.length) return !1;
      var i = t.prop("selectedIndex");
      if (!cur_filelist || i < 0 || i >= cur_filelist.length) return !1;
      var r = cur_filelist[i];
      return !!(r && r.dirent && file_ref_exists(r.dirent)) && ($("#" + dialog_el_id + "_buttonrow").hide(), $("#" + dialog_el_id + "_edit").text("Close"), (editing_dirent = r.dirent), evhan_storage_changed(), !1);
    }
    function evhan_cancel_button(e) {
      if ((e.preventDefault(), !is_open)) return !1;
      if (confirming) {
        (confirming = !1), set_caption(null, !1), $("#" + dialog_el_id + "_infield").prop("disabled", !1);
        var t = $("#" + dialog_el_id + "_accept");
        return t.prop("disabled", !1), t.text("Save"), !1;
      }
      var i = dialog_callback;
      return dialog_close(), i && i(null), !1;
    }
    function evhan_storage_changed() {
      if (!is_open) return !1;
      var e, t, i, r;
      if (!(t = $("#" + dialog_el_id + "_body")).length) return !1;
      if ((editing && editing_dirent && (file_ref_exists(editing_dirent) || ((editing_dirent = null), $("#" + dialog_el_id + "_buttonrow").show(), $("#" + dialog_el_id + "_edit").text("Done"))), editing && editing_dirent)) {
        t.empty();
        var n = file_read(editing_dirent);
        if (((n = String.fromCharCode.apply(this, n)), usage_is_textual(editing_dirent.usage))) {
          var l = $("<pre>", { class: "DiaDisplayText" });
          l.text(n), t.append(l), set_caption("Displaying file contents...", !0);
        } else {
          var a = window.btoa(n),
            o = $("<a>", { href: "data:application/octet-stream;base64," + a, target: "_blank", download: "data" });
          o.text(editing_dirent.filename), t.append(o), set_caption('Use "Save As" option in your browser to download this link.', !0);
        }
        return !1;
      }
      if (editing) {
        if (
          ((i = files_list(null, cur_gameid)),
          "" != cur_gameid && (i = i.concat(files_list(null, ""))),
          i.sort(function (e, t) {
            return e.dirent.usage < t.dirent.usage ? -1 : e.dirent.usage > t.dirent.usage ? 1 : t.modified.getTime() - e.modified.getTime();
          }),
          0 == i.length)
        )
          return t.empty(), $("#" + dialog_el_id + "_delete").prop("disabled", !0), $("#" + dialog_el_id + "_display").prop("disabled", !0), set_caption("You have no stored files. Press Done to continue.", !0), !1;
        (cur_filelist = []), (r = "");
        for (let e = 0; e < i.length; e++) (l = i[e]), l.dirent.usage != r && ((r = l.dirent.usage), cur_filelist.push({ label: r })), cur_filelist.push(l);
        (i = cur_filelist), t.empty();
        const n = $("<select>", { id: dialog_el_id + "_select", name: "files" });
        let l, a;
        n.prop("size", "5");
        var s = !1;
        for (let t = 0; t < i.length; t++)
          (l = i[t]),
            l.dirent
              ? ((e = $("<option>", { name: "f" + t })), s || ((s = !0), (e.selected = !0)), (a = format_date(l.modified)), e.text(l.dirent.filename + " -- " + a), n.append(e))
              : ((e = $("<option>", { name: "f" + t })).prop("disabled", !0), e.text("-- " + label_for_usage(l.label) + "s --"), n.append(e));
        return (
          t.append(n), n.on("change", evhan_select_change_editing), evhan_select_change_editing(), set_caption("All stored files are now visible. You may delete them, and display files containing text. Press Done when finished.", !0), !1
        );
      }
      if (
        ((i = files_list(cur_usage, cur_gameid)).sort(function (e, t) {
          return t.modified.getTime() - e.modified.getTime();
        }),
        (cur_filelist = i),
        0 == i.length)
      )
        t.empty();
      else {
        t.empty();
        const r = $("<select>", { id: dialog_el_id + "_select", name: "files" });
        let n, l;
        r.prop("size", "5");
        for (let t = 0; t < i.length; t++) (n = i[t]), (e = $("<option>", { name: "f" + t })), 0 == t && (e.selected = !0), (l = format_date(n.modified)), e.text(n.dirent.filename + " -- " + l), r.append(e);
        t.append(r), will_save && r.on("change", evhan_select_change);
      }
      will_save
        ? (set_caption("Name this " + cur_usage_name + ".", !0), (e = $("#" + dialog_el_id + "_accept")).prop("disabled", !1))
        : 0 == i.length
        ? (set_caption("You have no " + cur_usage_name + "s for this game.", !0), (e = $("#" + dialog_el_id + "_accept")).prop("disabled", !0))
        : (set_caption("Select a " + cur_usage_name + " to load.", !0), (e = $("#" + dialog_el_id + "_accept")).prop("disabled", !1));
    }
    function file_clean_fixed_name(e) {
      return e;
    }
    function file_construct_ref(e, t, i) {
      e || (e = ""), t || (t = ""), i || (i = "");
      var r = t + ":" + i + ":" + e;
      return { dirent: "dirent:" + r, content: "content:" + r, filename: e, usage: t, gameid: i };
    }
    function file_construct_temp_ref(e) {
      var t = "_temp_" + new Date().getTime() + "_" + Math.random();
      return file_construct_ref((t = t.replace(".", "")), e);
    }
    function file_decode_ref(e) {
      if ("dirent:" != e.slice(0, 7)) return null;
      var t = 7,
        i = e.indexOf(":", t);
      if (i < 0) return null;
      var r = e.slice(t, i);
      if (((t = i + 1), (i = e.indexOf(":", t)) < 0)) return null;
      var n = e.slice(t, i);
      t = i + 1;
      var l = e.slice(t),
        a = "cont" + e.slice(3);
      return { dirent: e, content: a, filename: l, usage: r, gameid: n };
    }
    function file_load_dirent(e) {
      if ("object" != typeof e && !(e = file_decode_ref(e))) return null;
      var t = Storage.getItem(e.dirent);
      if (!t) return null;
      var i,
        r,
        n,
        l,
        a = { dirent: e },
        o = t.toString().split(",");
      for (i = 0; i < o.length; i++)
        if (!((r = (l = o[i]).indexOf(":")) < 0))
          switch (((n = l.slice(0, r)), (l = l.slice(r + 1)), n)) {
            case "created":
              a.created = new Date(Number(l));
              break;
            case "modified":
              a.modified = new Date(Number(l));
          }
      return a;
    }
    function file_ref_exists(e) {
      return !!Storage.getItem(e.dirent);
    }
    function file_remove_ref(e) {
      Storage.removeItem(e.dirent), Storage.removeItem(e.content);
    }
    function file_write(e, t, i) {
      var r,
        n,
        l,
        a,
        o = file_load_dirent(e);
      return (
        o || (o = { dirent: e, created: new Date() }),
        (o.modified = new Date()),
        i || (t = encode_array(t)),
        (n = []),
        o.created && n.push("created:" + o.created.getTime()),
        o.modified && n.push("modified:" + o.modified.getTime()),
        (r = n.join(",")),
        (l = Storage.setItem(o.dirent.dirent, r)),
        (a = Storage.setItem(o.dirent.content, t)),
        !l && !a
      );
    }
    function file_read(e, t) {
      if (!file_load_dirent(e)) return null;
      var i = Storage.getItem(e.content);
      return null == i ? null : (i = i.toString()) ? (t ? i : decode_array(i)) : t ? "" : [];
    }
    function file_notimplemented() {
      throw new Error("streaming function not implemented in Dialog");
    }
    function file_ref_matches(e, t, i) {
      return (null == t || e.usage == t) && (null == i || e.gameid == i);
    }
    function files_list(e, t) {
      var i,
        r = [];
      if (!Storage) return r;
      var n = Storage.getKeys();
      for (i = 0; i < n.length; i++) {
        var l = n[i];
        if (l) {
          var a = file_decode_ref(l.toString());
          if (a && file_ref_matches(a, e, t)) {
            var o = file_load_dirent(a);
            r.push(o);
          }
        }
      }
      return r;
    }
    function format_date(e) {
      return e ? e.getMonth() + 1 + "/" + e.getDate() + " " + (e.getHours() + ":" + (e.getMinutes() < 10 ? "0" : "") + e.getMinutes()) : "???";
    }
    function autosave_write(e, t) {
      var i = "autosave:" + e;
      t ? Storage.setItem(i, JSON.stringify(t)) : Storage.removeItem(i);
    }
    function autosave_read(e) {
      var t = "autosave:" + e,
        i = Storage.getItem(t);
      if (i)
        try {
          return JSON.parse(i);
        } catch (e) {
          return null;
        }
      return null;
    }
    var encode_array = null,
      decode_array = null;
    window.JSON
      ? ((encode_array = function (e) {
          var t = JSON.stringify(e),
            i = t.length;
          return '"' == t[0] && '"' == t[i - 1] && (t = t.slice(1, i - 1)), t;
        }),
        (decode_array = function (e) {
          return JSON.parse(e);
        }))
      : ((encode_array = function (e) {
          return "[" + e + "]";
        }),
        (decode_array = function (val) {
          return eval(val);
        }));
    var Storage = null;
    try {
      var htmlLocalStorage = null;
      if ((null != window.localStorage ? (htmlLocalStorage = window.localStorage) : null != window.globalStorage && (htmlLocalStorage = window.globalStorage[location.hostname]), htmlLocalStorage))
        try {
          if ((htmlLocalStorage.setItem("_dialogtest", "xyzzy"), "xyzzy" != htmlLocalStorage.getItem("_dialogtest"))) throw new Error("localStorage test did not match");
          htmlLocalStorage.removeItem("_dialogtest"),
            (Storage = {
              getItem: function (e) {
                try {
                  return htmlLocalStorage.getItem(e);
                } catch (e) {
                  return null;
                }
              },
              removeItem: function (e) {
                try {
                  htmlLocalStorage.removeItem(e);
                } catch (e) {
                  return null;
                }
              },
              setItem: function (e, t) {
                try {
                  htmlLocalStorage.setItem(e, t);
                } catch (e) {
                  return !0;
                }
              },
              getKeys: function () {
                for (var e = [], t = 0; t < htmlLocalStorage.length; t++) e.push(htmlLocalStorage.key(t));
                return e;
              },
            });
        } catch (e) {}
    } catch (e) {}
    return (
      null == Storage &&
        (Storage = {
          data: {},
          keys: [],
          getItem: function (e) {
            return Storage.data[e];
          },
          setItem: function (e, t) {
            Storage.keys.indexOf(e) < 0 && Storage.keys.push(e), (Storage.data[e] = t);
          },
          removeItem: function (e) {
            var t = Storage.keys.indexOf(e);
            t >= 0 && (Storage.keys.splice(t, 1), delete Storage.data[e]);
          },
          getKeys: function () {
            return Storage.keys.slice(0);
          },
        }),
      $(window).on("storage", evhan_storage_changed),
      {
        streaming: !1,
        open: dialog_open,
        file_clean_fixed_name: file_clean_fixed_name,
        file_construct_ref: file_construct_ref,
        file_construct_temp_ref: file_construct_temp_ref,
        file_ref_exists: file_ref_exists,
        file_remove_ref: file_remove_ref,
        file_write: file_write,
        file_read: file_read,
        file_fopen: file_notimplemented,
        autosave_write: autosave_write,
        autosave_read: autosave_read,
      }
    );
  })(),
  Glk = (function () {
    var e = null;
    let t = null,
      i = null,
      r = null,
      n = null;
    const l = {};
    var a,
      o,
      s,
      u,
      f,
      c = !1,
      d = !1,
      _ = null,
      p = null,
      g = 0,
      h = null,
      m = null;
    function w(t) {
      var r, a;
      if (d) return (a = "### ui is disabled, ignoring event"), void (window.console && console.log && console.log(a));
      if (t.gen == g)
        switch (((g += 1), (h = t.partial), t.type)) {
          case "init":
            (O = t.metrics), t.support && t.support.forEach((e) => (l[e] = 1)), e.init();
            break;
          case "external": {
            let e = null;
            u && (e = u(t.value)), e || "timer" != t.value || ((X = Date.now()), (e = { type: b.evtype_Timer })), e && e.type && y(e);
            break;
          }
          case "timer":
            X = Date.now();
            y({ type: b.evtype_Timer });
            break;
          case "hyperlink":
            !(function (t, r) {
              if (!J) return;
              var n = null;
              for (n = F; n && n.disprock != t; n = n.next);
              if (!n || !n.hyperlink_request) return;
              J.set_field(0, b.evtype_Hyperlink), J.set_field(1, n), J.set_field(2, r), J.set_field(3, 0), (n.hyperlink_request = !1), i && i.prepare_resume(J);
              (J = null), e.resume();
            })(t.window, t.value);
            break;
          case "mouse":
            !(function (t, r, n) {
              if (!J) return;
              var l = null;
              for (l = F; l && l.disprock != t; l = l.next);
              if (!l || !l.mouse_request) return;
              J.set_field(0, b.evtype_MouseInput), J.set_field(1, l), J.set_field(2, r), J.set_field(3, n), (l.mouse_request = !1), i && i.prepare_resume(J);
              (J = null), e.resume();
            })(t.window, t.x, t.y);
            break;
          case "char":
            !(function (t, r) {
              var n;
              if (!J) return;
              var l = null;
              for (l = F; l && l.disprock != t; l = l.next);
              if (!l || !l.char_request) return;
              1 == r.length ? ((n = r.charCodeAt(0)), l.char_request_uni || (n &= 255)) : (n = v[r]) || (n = b.keycode_Unknown);
              J.set_field(0, b.evtype_CharInput), J.set_field(1, l), J.set_field(2, n), J.set_field(3, 0), (l.char_request = !1), (l.char_request_uni = !1), (l.input_generation = null), i && i.prepare_resume(J);
              (J = null), e.resume();
            })(t.window, t.value);
            break;
          case "line":
            !(function (t, r, n) {
              var l;
              if (!J) return;
              var a = null;
              for (a = F; a && a.disprock != t; a = a.next);
              if (!a || !a.line_request) return;
              r.length > a.linebuf.length && (r = r.slice(0, a.linebuf.length));
              a.request_echo_line_input && ((l = a.style), be(a.str, b.style_Input), ie(a, r), a.echostr && ye(a.echostr, r), be(a.str, l), ie(a, "\n"), a.echostr && ye(a.echostr, "\n"));
              for (l = 0; l < r.length; l++) a.linebuf[l] = r.charCodeAt(l);
              var o = 0;
              n && v[n] && (o = v[n]);
              J.set_field(0, b.evtype_LineInput), J.set_field(1, a), J.set_field(2, r.length), J.set_field(3, o), i && i.unretain_array(a.linebuf);
              (a.line_request = !1), (a.line_request_uni = !1), (a.request_echo_line_input = null), (a.input_generation = null), (a.linebuf = null), i && i.prepare_resume(J);
              (J = null), e.resume();
            })(t.window, t.value, t.terminator);
            break;
          case "arrange":
            (r = { left: (O = t.metrics).outspacingx, top: O.outspacingy, right: O.width - O.outspacingx, bottom: O.height - O.outspacingy }),
              P && oe(P, r),
              (function () {
                if (!J) return;
                J.set_field(0, b.evtype_Arrange), J.set_field(1, null), J.set_field(2, 0), J.set_field(3, 0), i && i.prepare_resume(J);
                (J = null), e.resume();
              })();
            break;
          case "redraw":
            !(function () {
              if (!J) return;
              J.set_field(0, b.evtype_Redraw), J.set_field(1, null), J.set_field(2, 0), J.set_field(3, 0), i && i.prepare_resume(J);
              (J = null), e.resume();
            })();
            break;
          case "specialresponse":
            "fileref_prompt" == t.response &&
              (function (t) {
                var r = t.value,
                  n = p.usage,
                  l = p.rock,
                  a = null;
                r && (a = de(r.filename, n, l, r));
                (_ = null), (p = null), i && i.prepare_resume(a);
                e.resume(a);
              })(t);
        }
      else n.log("Input event had wrong generation number: got " + t.gen + ", currently at " + g);
    }
    function y(t) {
      if (J) {
        var r = 0,
          n = 0;
        t.val1 && (r = t.val1), t.val2 && (n = t.val2), J.set_field(0, t.type), J.set_field(1, null), J.set_field(2, r), J.set_field(3, n), i && i.prepare_resume(J), (J = null), e.resume();
      }
    }
    var b = {
        gestalt_Version: 0,
        gestalt_CharInput: 1,
        gestalt_LineInput: 2,
        gestalt_CharOutput: 3,
        gestalt_CharOutput_CannotPrint: 0,
        gestalt_CharOutput_ApproxPrint: 1,
        gestalt_CharOutput_ExactPrint: 2,
        gestalt_MouseInput: 4,
        gestalt_Timer: 5,
        gestalt_Graphics: 6,
        gestalt_DrawImage: 7,
        gestalt_Sound: 8,
        gestalt_SoundVolume: 9,
        gestalt_SoundNotify: 10,
        gestalt_Hyperlinks: 11,
        gestalt_HyperlinkInput: 12,
        gestalt_SoundMusic: 13,
        gestalt_GraphicsTransparency: 14,
        gestalt_Unicode: 15,
        gestalt_UnicodeNorm: 16,
        gestalt_LineInputEcho: 17,
        gestalt_LineTerminators: 18,
        gestalt_LineTerminatorKey: 19,
        gestalt_DateTime: 20,
        gestalt_Sound2: 21,
        gestalt_ResourceStream: 22,
        gestalt_GraphicsCharInput: 23,
        gestalt_GarglkText: 4352,
        keycode_Unknown: 4294967295,
        keycode_Left: 4294967294,
        keycode_Right: 4294967293,
        keycode_Up: 4294967292,
        keycode_Down: 4294967291,
        keycode_Return: 4294967290,
        keycode_Delete: 4294967289,
        keycode_Escape: 4294967288,
        keycode_Tab: 4294967287,
        keycode_PageUp: 4294967286,
        keycode_PageDown: 4294967285,
        keycode_Home: 4294967284,
        keycode_End: 4294967283,
        keycode_Func1: 4294967279,
        keycode_Func2: 4294967278,
        keycode_Func3: 4294967277,
        keycode_Func4: 4294967276,
        keycode_Func5: 4294967275,
        keycode_Func6: 4294967274,
        keycode_Func7: 4294967273,
        keycode_Func8: 4294967272,
        keycode_Func9: 4294967271,
        keycode_Func10: 4294967270,
        keycode_Func11: 4294967269,
        keycode_Func12: 4294967268,
        keycode_MAXVAL: 28,
        evtype_None: 0,
        evtype_Timer: 1,
        evtype_CharInput: 2,
        evtype_LineInput: 3,
        evtype_MouseInput: 4,
        evtype_Arrange: 5,
        evtype_Redraw: 6,
        evtype_SoundNotify: 7,
        evtype_Hyperlink: 8,
        evtype_VolumeNotify: 9,
        style_Normal: 0,
        style_Emphasized: 1,
        style_Preformatted: 2,
        style_Header: 3,
        style_Subheader: 4,
        style_Alert: 5,
        style_Note: 6,
        style_BlockQuote: 7,
        style_Input: 8,
        style_User1: 9,
        style_User2: 10,
        style_NUMSTYLES: 11,
        wintype_AllTypes: 0,
        wintype_Pair: 1,
        wintype_Blank: 2,
        wintype_TextBuffer: 3,
        wintype_TextGrid: 4,
        wintype_Graphics: 5,
        winmethod_Left: 0,
        winmethod_Right: 1,
        winmethod_Above: 2,
        winmethod_Below: 3,
        winmethod_DirMask: 15,
        winmethod_Fixed: 16,
        winmethod_Proportional: 32,
        winmethod_DivisionMask: 240,
        winmethod_Border: 0,
        winmethod_NoBorder: 256,
        winmethod_BorderMask: 256,
        fileusage_Data: 0,
        fileusage_SavedGame: 1,
        fileusage_Transcript: 2,
        fileusage_InputRecord: 3,
        fileusage_TypeMask: 15,
        fileusage_TextMode: 256,
        fileusage_BinaryMode: 0,
        filemode_Write: 1,
        filemode_Read: 2,
        filemode_ReadWrite: 3,
        filemode_WriteAppend: 5,
        seekmode_Start: 0,
        seekmode_Current: 1,
        seekmode_End: 2,
        stylehint_Indentation: 0,
        stylehint_ParaIndentation: 1,
        stylehint_Justification: 2,
        stylehint_Size: 3,
        stylehint_Weight: 4,
        stylehint_Oblique: 5,
        stylehint_Proportional: 6,
        stylehint_TextColor: 7,
        stylehint_BackColor: 8,
        stylehint_ReverseColor: 9,
        stylehint_NUMHINTS: 10,
        stylehint_just_LeftFlush: 0,
        stylehint_just_LeftRight: 1,
        stylehint_just_Centered: 2,
        stylehint_just_RightFlush: 3,
        imagealign_InlineUp: 1,
        imagealign_InlineDown: 2,
        imagealign_InlineCenter: 3,
        imagealign_MarginLeft: 4,
        imagealign_MarginRight: 5,
        zcolor_Default: -1,
        zcolor_Current: -2,
      },
      v = {
        left: b.keycode_Left,
        right: b.keycode_Right,
        up: b.keycode_Up,
        down: b.keycode_Down,
        return: b.keycode_Return,
        delete: b.keycode_Delete,
        escape: b.keycode_Escape,
        tab: b.keycode_Tab,
        pageup: b.keycode_PageUp,
        pagedown: b.keycode_PageDown,
        home: b.keycode_Home,
        end: b.keycode_End,
        func1: b.keycode_Func1,
        func2: b.keycode_Func2,
        func3: b.keycode_Func3,
        func4: b.keycode_Func4,
        func5: b.keycode_Func5,
        func6: b.keycode_Func6,
        func7: b.keycode_Func7,
        func8: b.keycode_Func8,
        func9: b.keycode_Func9,
        func10: b.keycode_Func10,
        func11: b.keycode_Func11,
        func12: b.keycode_Func12,
      },
      k = null,
      x = { 0: "normal", 1: "emphasized", 2: "preformatted", 3: "header", 4: "subheader", 5: "alert", 6: "note", 7: "blockquote", 8: "input", 9: "user1", 10: "user2" },
      T = { 0: "data", 1: "save", 2: "transcript", 3: "command" },
      $ = {
        181: 924,
        223: [83, 83],
        255: 376,
        305: 73,
        329: [700, 78],
        383: 83,
        405: 502,
        414: 544,
        447: 503,
        454: 452,
        457: 455,
        460: 458,
        477: 398,
        496: [74, 780],
        499: 497,
        595: 385,
        596: 390,
        598: 393,
        599: 394,
        601: 399,
        603: 400,
        608: 403,
        611: 404,
        616: 407,
        617: 406,
        623: 412,
        626: 413,
        629: 415,
        640: 422,
        643: 425,
        648: 430,
        650: 433,
        651: 434,
        658: 439,
        837: 921,
        912: [921, 776, 769],
        940: 902,
        941: 904,
        942: 905,
        943: 906,
        944: [933, 776, 769],
        962: 931,
        972: 908,
        973: 910,
        974: 911,
        976: 914,
        977: 920,
        981: 934,
        982: 928,
        1008: 922,
        1010: 1017,
        1013: 917,
        1415: [1333, 1362],
        7830: [72, 817],
        7831: [84, 776],
        7832: [87, 778],
        7833: [89, 778],
        7834: [65, 702],
        7835: 7776,
        8016: [933, 787],
        8018: [933, 787, 768],
        8020: [933, 787, 769],
        8022: [933, 787, 834],
        8048: 8122,
        8049: 8123,
        8050: 8136,
        8051: 8137,
        8052: 8138,
        8053: 8139,
        8054: 8154,
        8055: 8155,
        8056: 8184,
        8057: 8185,
        8058: 8170,
        8059: 8171,
        8060: 8186,
        8061: 8187,
        8064: [7944, 921],
        8065: [7945, 921],
        8066: [7946, 921],
        8067: [7947, 921],
        8068: [7948, 921],
        8069: [7949, 921],
        8070: [7950, 921],
        8071: [7951, 921],
        8072: [7944, 921],
        8073: [7945, 921],
        8074: [7946, 921],
        8075: [7947, 921],
        8076: [7948, 921],
        8077: [7949, 921],
        8078: [7950, 921],
        8079: [7951, 921],
        8080: [7976, 921],
        8081: [7977, 921],
        8082: [7978, 921],
        8083: [7979, 921],
        8084: [7980, 921],
        8085: [7981, 921],
        8086: [7982, 921],
        8087: [7983, 921],
        8088: [7976, 921],
        8089: [7977, 921],
        8090: [7978, 921],
        8091: [7979, 921],
        8092: [7980, 921],
        8093: [7981, 921],
        8094: [7982, 921],
        8095: [7983, 921],
        8096: [8040, 921],
        8097: [8041, 921],
        8098: [8042, 921],
        8099: [8043, 921],
        8100: [8044, 921],
        8101: [8045, 921],
        8102: [8046, 921],
        8103: [8047, 921],
        8104: [8040, 921],
        8105: [8041, 921],
        8106: [8042, 921],
        8107: [8043, 921],
        8108: [8044, 921],
        8109: [8045, 921],
        8110: [8046, 921],
        8111: [8047, 921],
        8114: [8122, 921],
        8115: [913, 921],
        8116: [902, 921],
        8118: [913, 834],
        8119: [913, 834, 921],
        8124: [913, 921],
        8126: 921,
        8130: [8138, 921],
        8131: [919, 921],
        8132: [905, 921],
        8134: [919, 834],
        8135: [919, 834, 921],
        8140: [919, 921],
        8146: [921, 776, 768],
        8147: [921, 776, 769],
        8150: [921, 834],
        8151: [921, 776, 834],
        8162: [933, 776, 768],
        8163: [933, 776, 769],
        8164: [929, 787],
        8165: 8172,
        8166: [933, 834],
        8167: [933, 776, 834],
        8178: [8186, 921],
        8179: [937, 921],
        8180: [911, 921],
        8182: [937, 834],
        8183: [937, 834, 921],
        8188: [937, 921],
        64256: [70, 70],
        64257: [70, 73],
        64258: [70, 76],
        64259: [70, 70, 73],
        64260: [70, 70, 76],
        64261: [83, 84],
        64262: [83, 84],
        64275: [1348, 1350],
        64276: [1348, 1333],
        64277: [1348, 1339],
        64278: [1358, 1350],
        64279: [1348, 1341],
      };
    !(function () {
      var e,
        t,
        i,
        r = $;
      for (
        e = [
          7936,
          7937,
          7938,
          7939,
          7940,
          7941,
          7942,
          7943,
          7952,
          7953,
          7954,
          7955,
          7956,
          7957,
          7968,
          7969,
          7970,
          7971,
          7972,
          7973,
          7974,
          7975,
          7984,
          7985,
          7986,
          7987,
          7988,
          7989,
          7990,
          7991,
          8e3,
          8001,
          8002,
          8003,
          8004,
          8005,
          8017,
          8019,
          8021,
          8023,
          8032,
          8033,
          8034,
          8035,
          8036,
          8037,
          8038,
          8039,
          8112,
          8113,
          8144,
          8145,
          8160,
          8161,
        ],
          t = 0;
        t < 54;
        t++
      )
        r[(i = e[t])] = i + 8;
      for (i = 257; i <= 303; i += 2) r[i] = i - 1;
      for (i = 331; i <= 375; i += 2) r[i] = i - 1;
      for (i = 505; i <= 543; i += 2) r[i] = i - 1;
      for (i = 1121; i <= 1153; i += 2) r[i] = i - 1;
      for (i = 1163; i <= 1215; i += 2) r[i] = i - 1;
      for (i = 1233; i <= 1269; i += 2) r[i] = i - 1;
      for (i = 7681; i <= 7829; i += 2) r[i] = i - 1;
      for (i = 7841; i <= 7929; i += 2) r[i] = i - 1;
      for (
        e = [
          307,
          309,
          311,
          314,
          316,
          318,
          320,
          322,
          324,
          326,
          328,
          378,
          380,
          382,
          387,
          389,
          392,
          396,
          402,
          409,
          417,
          419,
          421,
          424,
          429,
          432,
          436,
          438,
          441,
          445,
          453,
          456,
          459,
          462,
          464,
          466,
          468,
          470,
          472,
          474,
          476,
          479,
          481,
          483,
          485,
          487,
          489,
          491,
          493,
          495,
          498,
          501,
          547,
          549,
          551,
          553,
          555,
          557,
          559,
          561,
          563,
          985,
          987,
          989,
          991,
          993,
          995,
          997,
          999,
          1001,
          1003,
          1005,
          1007,
          1016,
          1019,
          1218,
          1220,
          1222,
          1224,
          1226,
          1228,
          1230,
          1273,
          1281,
          1283,
          1285,
          1287,
          1289,
          1291,
          1293,
          1295,
        ],
          t = 0;
        t < 91;
        t++
      )
        r[(i = e[t])] = i - 1;
      for (i = 8560; i <= 8575; i += 1) r[i] = i - 16;
      for (i = 9424; i <= 9449; i += 1) r[i] = i - 26;
      for (i = 97; i <= 122; i += 1) r[i] = i - 32;
      for (i = 224; i <= 246; i += 1) r[i] = i - 32;
      for (i = 945; i <= 961; i += 1) r[i] = i - 32;
      for (i = 1072; i <= 1103; i += 1) r[i] = i - 32;
      for (i = 65345; i <= 65370; i += 1) r[i] = i - 32;
      for (e = [248, 249, 250, 251, 252, 253, 254, 963, 964, 965, 966, 967, 968, 969, 970, 971], t = 0; t < 16; t++) r[(i = e[t])] = i - 32;
      for (i = 66600; i <= 66639; i += 1) r[i] = i - 40;
      for (i = 1377; i <= 1414; i += 1) r[i] = i - 48;
      for (i = 1104; i <= 1119; i += 1) r[i] = i - 80;
      r[1009] = 929;
    })();
    var q = {
      304: [105, 775],
      376: 255,
      385: 595,
      390: 596,
      393: 598,
      394: 599,
      398: 477,
      399: 601,
      400: 603,
      403: 608,
      404: 611,
      406: 617,
      407: 616,
      412: 623,
      413: 626,
      415: 629,
      422: 640,
      425: 643,
      430: 648,
      433: 650,
      434: 651,
      439: 658,
      452: 454,
      455: 457,
      458: 460,
      497: 499,
      502: 405,
      503: 447,
      544: 414,
      902: 940,
      904: 941,
      905: 942,
      906: 943,
      908: 972,
      910: 973,
      911: 974,
      1012: 952,
      1017: 1010,
      8122: 8048,
      8123: 8049,
      8124: 8115,
      8136: 8050,
      8137: 8051,
      8138: 8052,
      8139: 8053,
      8140: 8131,
      8154: 8054,
      8155: 8055,
      8170: 8058,
      8171: 8059,
      8172: 8165,
      8184: 8056,
      8185: 8057,
      8186: 8060,
      8187: 8061,
      8188: 8179,
      8486: 969,
      8490: 107,
      8491: 229,
    };
    !(function () {
      var e,
        t,
        i,
        r = q;
      for (i = 1024; i <= 1039; i += 1) r[i] = i + 80;
      for (i = 1329; i <= 1366; i += 1) r[i] = i + 48;
      for (i = 66560; i <= 66599; i += 1) r[i] = i + 40;
      for (i = 65; i <= 90; i += 1) r[i] = i + 32;
      for (i = 192; i <= 214; i += 1) r[i] = i + 32;
      for (i = 913; i <= 929; i += 1) r[i] = i + 32;
      for (i = 1040; i <= 1071; i += 1) r[i] = i + 32;
      for (i = 65313; i <= 65338; i += 1) r[i] = i + 32;
      for (e = [216, 217, 218, 219, 220, 221, 222, 931, 932, 933, 934, 935, 936, 937, 938, 939], t = 0; t < 16; t++) r[(i = e[t])] = i + 32;
      for (i = 9398; i <= 9423; i += 1) r[i] = i + 26;
      for (i = 8544; i <= 8559; i += 1) r[i] = i + 16;
      for (i = 256; i <= 302; i += 2) r[i] = i + 1;
      for (i = 330; i <= 374; i += 2) r[i] = i + 1;
      for (i = 504; i <= 542; i += 2) r[i] = i + 1;
      for (i = 1120; i <= 1152; i += 2) r[i] = i + 1;
      for (i = 1162; i <= 1214; i += 2) r[i] = i + 1;
      for (i = 1232; i <= 1268; i += 2) r[i] = i + 1;
      for (i = 7680; i <= 7828; i += 2) r[i] = i + 1;
      for (i = 7840; i <= 7928; i += 2) r[i] = i + 1;
      for (
        e = [
          306,
          308,
          310,
          313,
          315,
          317,
          319,
          321,
          323,
          325,
          327,
          377,
          379,
          381,
          386,
          388,
          391,
          395,
          401,
          408,
          416,
          418,
          420,
          423,
          428,
          431,
          435,
          437,
          440,
          444,
          453,
          456,
          459,
          461,
          463,
          465,
          467,
          469,
          471,
          473,
          475,
          478,
          480,
          482,
          484,
          486,
          488,
          490,
          492,
          494,
          498,
          500,
          546,
          548,
          550,
          552,
          554,
          556,
          558,
          560,
          562,
          984,
          986,
          988,
          990,
          992,
          994,
          996,
          998,
          1e3,
          1002,
          1004,
          1006,
          1015,
          1018,
          1217,
          1219,
          1221,
          1223,
          1225,
          1227,
          1229,
          1272,
          1280,
          1282,
          1284,
          1286,
          1288,
          1290,
          1292,
          1294,
        ],
          t = 0;
        t < 91;
        t++
      )
        r[(i = e[t])] = i + 1;
      for (
        e = [
          7944,
          7945,
          7946,
          7947,
          7948,
          7949,
          7950,
          7951,
          7960,
          7961,
          7962,
          7963,
          7964,
          7965,
          7976,
          7977,
          7978,
          7979,
          7980,
          7981,
          7982,
          7983,
          7992,
          7993,
          7994,
          7995,
          7996,
          7997,
          7998,
          7999,
          8008,
          8009,
          8010,
          8011,
          8012,
          8013,
          8025,
          8027,
          8029,
          8031,
          8040,
          8041,
          8042,
          8043,
          8044,
          8045,
          8046,
          8047,
          8072,
          8073,
          8074,
          8075,
          8076,
          8077,
          8078,
          8079,
          8088,
          8089,
          8090,
          8091,
          8092,
          8093,
          8094,
          8095,
          8104,
          8105,
          8106,
          8107,
          8108,
          8109,
          8110,
          8111,
          8120,
          8121,
          8152,
          8153,
          8168,
          8169,
        ],
          t = 0;
        t < 78;
        t++
      )
        r[(i = e[t])] = i - 8;
    })();
    var C = {
      223: [83, 115],
      452: 453,
      453: 453,
      454: 453,
      455: 456,
      456: 456,
      457: 456,
      458: 459,
      459: 459,
      460: 459,
      497: 498,
      498: 498,
      499: 498,
      1415: [1333, 1410],
      8114: [8122, 837],
      8115: 8124,
      8116: [902, 837],
      8119: [913, 834, 837],
      8124: 8124,
      8130: [8138, 837],
      8131: 8140,
      8132: [905, 837],
      8135: [919, 834, 837],
      8140: 8140,
      8178: [8186, 837],
      8179: 8188,
      8180: [911, 837],
      8183: [937, 834, 837],
      8188: 8188,
      64256: [70, 102],
      64257: [70, 105],
      64258: [70, 108],
      64259: [70, 102, 105],
      64260: [70, 102, 108],
      64261: [83, 116],
      64262: [83, 116],
      64275: [1348, 1398],
      64276: [1348, 1381],
      64277: [1348, 1387],
      64278: [1358, 1398],
      64279: [1348, 1389],
    };
    !(function () {
      var e,
        t,
        i,
        r = C;
      for (
        e = [
          8072,
          8073,
          8074,
          8075,
          8076,
          8077,
          8078,
          8079,
          8072,
          8073,
          8074,
          8075,
          8076,
          8077,
          8078,
          8079,
          8088,
          8089,
          8090,
          8091,
          8092,
          8093,
          8094,
          8095,
          8088,
          8089,
          8090,
          8091,
          8092,
          8093,
          8094,
          8095,
          8104,
          8105,
          8106,
          8107,
          8108,
          8109,
          8110,
          8111,
          8104,
          8105,
          8106,
          8107,
          8108,
          8109,
          8110,
          8111,
        ],
          t = 0;
        t < 48;
        t++
      )
        (i = e[t]), (r[t + 8064] = i);
    })();
    var S = {
      192: [65, 768],
      193: [65, 769],
      194: [65, 770],
      195: [65, 771],
      196: [65, 776],
      197: [65, 778],
      199: [67, 807],
      200: [69, 768],
      201: [69, 769],
      202: [69, 770],
      203: [69, 776],
      204: [73, 768],
      205: [73, 769],
      206: [73, 770],
      207: [73, 776],
      209: [78, 771],
      210: [79, 768],
      211: [79, 769],
      212: [79, 770],
      213: [79, 771],
      214: [79, 776],
      217: [85, 768],
      218: [85, 769],
      219: [85, 770],
      220: [85, 776],
      221: [89, 769],
      224: [97, 768],
      225: [97, 769],
      226: [97, 770],
      227: [97, 771],
      228: [97, 776],
      229: [97, 778],
      231: [99, 807],
      232: [101, 768],
      233: [101, 769],
      234: [101, 770],
      235: [101, 776],
      236: [105, 768],
      237: [105, 769],
      238: [105, 770],
      239: [105, 776],
      241: [110, 771],
      242: [111, 768],
      243: [111, 769],
      244: [111, 770],
      245: [111, 771],
      246: [111, 776],
      249: [117, 768],
      250: [117, 769],
      251: [117, 770],
      252: [117, 776],
      253: [121, 769],
      296: [73, 771],
      297: [105, 771],
      298: [73, 772],
      299: [105, 772],
      300: [73, 774],
      301: [105, 774],
      302: [73, 808],
      303: [105, 808],
      304: [73, 775],
      308: [74, 770],
      309: [106, 770],
      310: [75, 807],
      311: [107, 807],
      313: [76, 769],
      314: [108, 769],
      315: [76, 807],
      316: [108, 807],
      317: [76, 780],
      318: [108, 780],
      323: [78, 769],
      324: [110, 769],
      325: [78, 807],
      326: [110, 807],
      327: [78, 780],
      328: [110, 780],
      332: [79, 772],
      333: [111, 772],
      334: [79, 774],
      335: [111, 774],
      336: [79, 779],
      337: [111, 779],
      416: [79, 795],
      417: [111, 795],
      431: [85, 795],
      432: [117, 795],
      478: [65, 776, 772],
      479: [97, 776, 772],
      480: [65, 775, 772],
      481: [97, 775, 772],
      482: [198, 772],
      483: [230, 772],
      486: [71, 780],
      487: [103, 780],
      488: [75, 780],
      489: [107, 780],
      490: [79, 808],
      491: [111, 808],
      492: [79, 808, 772],
      493: [111, 808, 772],
      494: [439, 780],
      495: [658, 780],
      496: [106, 780],
      500: [71, 769],
      501: [103, 769],
      542: [72, 780],
      543: [104, 780],
      550: [65, 775],
      551: [97, 775],
      552: [69, 807],
      553: [101, 807],
      554: [79, 776, 772],
      555: [111, 776, 772],
      556: [79, 771, 772],
      557: [111, 771, 772],
      558: [79, 775],
      559: [111, 775],
      560: [79, 775, 772],
      561: [111, 775, 772],
      562: [89, 772],
      563: [121, 772],
      832: 768,
      833: 769,
      835: 787,
      836: [776, 769],
      884: 697,
      894: 59,
      901: [168, 769],
      902: [913, 769],
      903: 183,
      904: [917, 769],
      905: [919, 769],
      906: [921, 769],
      908: [927, 769],
      910: [933, 769],
      911: [937, 769],
      912: [953, 776, 769],
      938: [921, 776],
      939: [933, 776],
      940: [945, 769],
      941: [949, 769],
      942: [951, 769],
      943: [953, 769],
      944: [965, 776, 769],
      970: [953, 776],
      971: [965, 776],
      972: [959, 769],
      973: [965, 769],
      974: [969, 769],
      979: [978, 769],
      980: [978, 776],
      1024: [1045, 768],
      1025: [1045, 776],
      1027: [1043, 769],
      1031: [1030, 776],
      1036: [1050, 769],
      1037: [1048, 768],
      1038: [1059, 774],
      1049: [1048, 774],
      1081: [1080, 774],
      1104: [1077, 768],
      1105: [1077, 776],
      1107: [1075, 769],
      1111: [1110, 776],
      1116: [1082, 769],
      1117: [1080, 768],
      1118: [1091, 774],
      1142: [1140, 783],
      1143: [1141, 783],
      1217: [1046, 774],
      1218: [1078, 774],
      1232: [1040, 774],
      1233: [1072, 774],
      1234: [1040, 776],
      1235: [1072, 776],
      1238: [1045, 774],
      1239: [1077, 774],
      1242: [1240, 776],
      1243: [1241, 776],
      1244: [1046, 776],
      1245: [1078, 776],
      1246: [1047, 776],
      1247: [1079, 776],
      1250: [1048, 772],
      1251: [1080, 772],
      1252: [1048, 776],
      1253: [1080, 776],
      1254: [1054, 776],
      1255: [1086, 776],
      1258: [1256, 776],
      1259: [1257, 776],
      1260: [1069, 776],
      1261: [1101, 776],
      1262: [1059, 772],
      1263: [1091, 772],
      1264: [1059, 776],
      1265: [1091, 776],
      1266: [1059, 779],
      1267: [1091, 779],
      1268: [1063, 776],
      1269: [1095, 776],
      1272: [1067, 776],
      1273: [1099, 776],
      1570: [1575, 1619],
      1571: [1575, 1620],
      1572: [1608, 1620],
      1573: [1575, 1621],
      1574: [1610, 1620],
      1728: [1749, 1620],
      1730: [1729, 1620],
      1747: [1746, 1620],
      2345: [2344, 2364],
      2353: [2352, 2364],
      2356: [2355, 2364],
      2392: [2325, 2364],
      2393: [2326, 2364],
      2394: [2327, 2364],
      2395: [2332, 2364],
      2396: [2337, 2364],
      2397: [2338, 2364],
      2398: [2347, 2364],
      2399: [2351, 2364],
      2507: [2503, 2494],
      2508: [2503, 2519],
      2524: [2465, 2492],
      2525: [2466, 2492],
      2527: [2479, 2492],
      2611: [2610, 2620],
      2614: [2616, 2620],
      2649: [2582, 2620],
      2650: [2583, 2620],
      2651: [2588, 2620],
      2654: [2603, 2620],
      2888: [2887, 2902],
      2891: [2887, 2878],
      2892: [2887, 2903],
      2908: [2849, 2876],
      2909: [2850, 2876],
      2964: [2962, 3031],
      3018: [3014, 3006],
      3019: [3015, 3006],
      3020: [3014, 3031],
      3144: [3142, 3158],
      3264: [3263, 3285],
      3271: [3270, 3285],
      3272: [3270, 3286],
      3274: [3270, 3266],
      3275: [3270, 3266, 3285],
      3402: [3398, 3390],
      3403: [3399, 3390],
      3404: [3398, 3415],
      3546: [3545, 3530],
      3548: [3545, 3535],
      3549: [3545, 3535, 3530],
      3550: [3545, 3551],
      3907: [3906, 4023],
      3917: [3916, 4023],
      3922: [3921, 4023],
      3927: [3926, 4023],
      3932: [3931, 4023],
      3945: [3904, 4021],
      3955: [3953, 3954],
      3957: [3953, 3956],
      3958: [4018, 3968],
      3960: [4019, 3968],
      3969: [3953, 3968],
      3987: [3986, 4023],
      3997: [3996, 4023],
      4002: [4001, 4023],
      4007: [4006, 4023],
      4012: [4011, 4023],
      4025: [3984, 4021],
      4134: [4133, 4142],
      7835: [383, 775],
      7960: [917, 787],
      7961: [917, 788],
      7962: [917, 787, 768],
      7963: [917, 788, 768],
      7964: [917, 787, 769],
      7965: [917, 788, 769],
      8008: [927, 787],
      8009: [927, 788],
      8010: [927, 787, 768],
      8011: [927, 788, 768],
      8012: [927, 787, 769],
      8013: [927, 788, 769],
      8016: [965, 787],
      8017: [965, 788],
      8018: [965, 787, 768],
      8019: [965, 788, 768],
      8020: [965, 787, 769],
      8021: [965, 788, 769],
      8022: [965, 787, 834],
      8023: [965, 788, 834],
      8025: [933, 788],
      8027: [933, 788, 768],
      8029: [933, 788, 769],
      8118: [945, 834],
      8119: [945, 834, 837],
      8120: [913, 774],
      8121: [913, 772],
      8122: [913, 768],
      8123: [913, 769],
      8124: [913, 837],
      8126: 953,
      8129: [168, 834],
      8130: [951, 768, 837],
      8131: [951, 837],
      8132: [951, 769, 837],
      8134: [951, 834],
      8135: [951, 834, 837],
      8136: [917, 768],
      8137: [917, 769],
      8138: [919, 768],
      8139: [919, 769],
      8140: [919, 837],
      8141: [8127, 768],
      8142: [8127, 769],
      8143: [8127, 834],
      8144: [953, 774],
      8145: [953, 772],
      8146: [953, 776, 768],
      8147: [953, 776, 769],
      8150: [953, 834],
      8151: [953, 776, 834],
      8152: [921, 774],
      8153: [921, 772],
      8154: [921, 768],
      8155: [921, 769],
      8178: [969, 768, 837],
      8179: [969, 837],
      8180: [969, 769, 837],
      8182: [969, 834],
      8183: [969, 834, 837],
      8184: [927, 768],
      8185: [927, 769],
      8186: [937, 768],
      8187: [937, 769],
      8188: [937, 837],
      8189: 180,
      8192: 8194,
      8193: 8195,
      8486: 937,
      8490: 75,
      8491: [65, 778],
      8602: [8592, 824],
      8603: [8594, 824],
      8622: [8596, 824],
      8653: [8656, 824],
      8654: [8660, 824],
      8655: [8658, 824],
      8708: [8707, 824],
      8713: [8712, 824],
      8716: [8715, 824],
      8740: [8739, 824],
      8742: [8741, 824],
      8769: [8764, 824],
      8772: [8771, 824],
      8775: [8773, 824],
      8777: [8776, 824],
      8800: [61, 824],
      8802: [8801, 824],
      8813: [8781, 824],
      8814: [60, 824],
      8815: [62, 824],
      8816: [8804, 824],
      8817: [8805, 824],
      8820: [8818, 824],
      8821: [8819, 824],
      8824: [8822, 824],
      8825: [8823, 824],
      8832: [8826, 824],
      8833: [8827, 824],
      8836: [8834, 824],
      8837: [8835, 824],
      8840: [8838, 824],
      8841: [8839, 824],
      8876: [8866, 824],
      8877: [8872, 824],
      8878: [8873, 824],
      8879: [8875, 824],
      8928: [8828, 824],
      8929: [8829, 824],
      8930: [8849, 824],
      8931: [8850, 824],
      8938: [8882, 824],
      8939: [8883, 824],
      8940: [8884, 824],
      8941: [8885, 824],
      9001: 12296,
      9002: 12297,
      10972: [10973, 824],
      12364: [12363, 12441],
      12366: [12365, 12441],
      12368: [12367, 12441],
      12370: [12369, 12441],
      12372: [12371, 12441],
      12374: [12373, 12441],
      12376: [12375, 12441],
      12378: [12377, 12441],
      12380: [12379, 12441],
      12382: [12381, 12441],
      12384: [12383, 12441],
      12386: [12385, 12441],
      12389: [12388, 12441],
      12391: [12390, 12441],
      12393: [12392, 12441],
      12400: [12399, 12441],
      12401: [12399, 12442],
      12403: [12402, 12441],
      12404: [12402, 12442],
      12406: [12405, 12441],
      12407: [12405, 12442],
      12409: [12408, 12441],
      12410: [12408, 12442],
      12412: [12411, 12441],
      12413: [12411, 12442],
      12436: [12358, 12441],
      12446: [12445, 12441],
      12460: [12459, 12441],
      12462: [12461, 12441],
      12464: [12463, 12441],
      12466: [12465, 12441],
      12468: [12467, 12441],
      12470: [12469, 12441],
      12472: [12471, 12441],
      12474: [12473, 12441],
      12476: [12475, 12441],
      12478: [12477, 12441],
      12480: [12479, 12441],
      12482: [12481, 12441],
      12485: [12484, 12441],
      12487: [12486, 12441],
      12489: [12488, 12441],
      12496: [12495, 12441],
      12497: [12495, 12442],
      12499: [12498, 12441],
      12500: [12498, 12442],
      12502: [12501, 12441],
      12503: [12501, 12442],
      12505: [12504, 12441],
      12506: [12504, 12442],
      12508: [12507, 12441],
      12509: [12507, 12442],
      12532: [12454, 12441],
      12535: [12527, 12441],
      12536: [12528, 12441],
      12537: [12529, 12441],
      12538: [12530, 12441],
      12542: [12541, 12441],
      64016: 22618,
      64018: 26228,
      64021: 20958,
      64022: 29482,
      64023: 30410,
      64024: 31036,
      64025: 31070,
      64026: 31077,
      64027: 31119,
      64028: 38742,
      64029: 31934,
      64030: 32701,
      64032: 34322,
      64034: 35576,
      64037: 36920,
      64038: 37117,
      64042: 39151,
      64043: 39164,
      64044: 39208,
      64045: 40372,
      64285: [1497, 1460],
      64287: [1522, 1463],
      64298: [1513, 1473],
      64299: [1513, 1474],
      64300: [1513, 1468, 1473],
      64301: [1513, 1468, 1474],
      64302: [1488, 1463],
      64303: [1488, 1464],
      64304: [1488, 1468],
      64305: [1489, 1468],
      64306: [1490, 1468],
      64307: [1491, 1468],
      64308: [1492, 1468],
      64309: [1493, 1468],
      64310: [1494, 1468],
      64312: [1496, 1468],
      64313: [1497, 1468],
      64314: [1498, 1468],
      64315: [1499, 1468],
      64316: [1500, 1468],
      64318: [1502, 1468],
      64320: [1504, 1468],
      64321: [1505, 1468],
      64323: [1507, 1468],
      64324: [1508, 1468],
      64326: [1510, 1468],
      64327: [1511, 1468],
      64328: [1512, 1468],
      64329: [1513, 1468],
      64330: [1514, 1468],
      64331: [1493, 1465],
      64332: [1489, 1471],
      64333: [1499, 1471],
      64334: [1508, 1471],
      119134: [119127, 119141],
      119135: [119128, 119141],
      119136: [119128, 119141, 119150],
      119137: [119128, 119141, 119151],
      119138: [119128, 119141, 119152],
      119139: [119128, 119141, 119153],
      119140: [119128, 119141, 119154],
      119227: [119225, 119141],
      119228: [119226, 119141],
      119229: [119225, 119141, 119150],
      119230: [119226, 119141, 119150],
      119231: [119225, 119141, 119151],
      119232: [119226, 119141, 119151],
    };
    !(function () {
      var e,
        t,
        i,
        r = S;
      for (
        e = [
          [121, 776],
          [65, 772],
          [97, 772],
          [65, 774],
          [97, 774],
          [65, 808],
          [97, 808],
          [67, 769],
          [99, 769],
          [67, 770],
          [99, 770],
          [67, 775],
          [99, 775],
          [67, 780],
          [99, 780],
          [68, 780],
          [100, 780],
        ],
          t = 0;
        t < 17;
        t++
      )
        (i = e[t]), (r[t + 255] = i);
      for (
        e = [
          [69, 772],
          [101, 772],
          [69, 774],
          [101, 774],
          [69, 775],
          [101, 775],
          [69, 808],
          [101, 808],
          [69, 780],
          [101, 780],
          [71, 770],
          [103, 770],
          [71, 774],
          [103, 774],
          [71, 775],
          [103, 775],
          [71, 807],
          [103, 807],
          [72, 770],
          [104, 770],
        ],
          t = 0;
        t < 20;
        t++
      )
        (i = e[t]), (r[t + 274] = i);
      for (
        e = [
          [82, 769],
          [114, 769],
          [82, 807],
          [114, 807],
          [82, 780],
          [114, 780],
          [83, 769],
          [115, 769],
          [83, 770],
          [115, 770],
          [83, 807],
          [115, 807],
          [83, 780],
          [115, 780],
          [84, 807],
          [116, 807],
          [84, 780],
          [116, 780],
        ],
          t = 0;
        t < 18;
        t++
      )
        (i = e[t]), (r[t + 340] = i);
      for (
        e = [
          [85, 771],
          [117, 771],
          [85, 772],
          [117, 772],
          [85, 774],
          [117, 774],
          [85, 778],
          [117, 778],
          [85, 779],
          [117, 779],
          [85, 808],
          [117, 808],
          [87, 770],
          [119, 770],
          [89, 770],
          [121, 770],
          [89, 776],
          [90, 769],
          [122, 769],
          [90, 775],
          [122, 775],
          [90, 780],
          [122, 780],
        ],
          t = 0;
        t < 23;
        t++
      )
        (i = e[t]), (r[t + 360] = i);
      for (
        e = [
          [65, 780],
          [97, 780],
          [73, 780],
          [105, 780],
          [79, 780],
          [111, 780],
          [85, 780],
          [117, 780],
          [85, 776, 772],
          [117, 776, 772],
          [85, 776, 769],
          [117, 776, 769],
          [85, 776, 780],
          [117, 776, 780],
          [85, 776, 768],
          [117, 776, 768],
        ],
          t = 0;
        t < 16;
        t++
      )
        (i = e[t]), (r[t + 461] = i);
      for (
        e = [
          [78, 768],
          [110, 768],
          [65, 778, 769],
          [97, 778, 769],
          [198, 769],
          [230, 769],
          [216, 769],
          [248, 769],
          [65, 783],
          [97, 783],
          [65, 785],
          [97, 785],
          [69, 783],
          [101, 783],
          [69, 785],
          [101, 785],
          [73, 783],
          [105, 783],
          [73, 785],
          [105, 785],
          [79, 783],
          [111, 783],
          [79, 785],
          [111, 785],
          [82, 783],
          [114, 783],
          [82, 785],
          [114, 785],
          [85, 783],
          [117, 783],
          [85, 785],
          [117, 785],
          [83, 806],
          [115, 806],
          [84, 806],
          [116, 806],
        ],
          t = 0;
        t < 36;
        t++
      )
        (i = e[t]), (r[t + 504] = i);
      for (
        e = [
          [65, 805],
          [97, 805],
          [66, 775],
          [98, 775],
          [66, 803],
          [98, 803],
          [66, 817],
          [98, 817],
          [67, 807, 769],
          [99, 807, 769],
          [68, 775],
          [100, 775],
          [68, 803],
          [100, 803],
          [68, 817],
          [100, 817],
          [68, 807],
          [100, 807],
          [68, 813],
          [100, 813],
          [69, 772, 768],
          [101, 772, 768],
          [69, 772, 769],
          [101, 772, 769],
          [69, 813],
          [101, 813],
          [69, 816],
          [101, 816],
          [69, 807, 774],
          [101, 807, 774],
          [70, 775],
          [102, 775],
          [71, 772],
          [103, 772],
          [72, 775],
          [104, 775],
          [72, 803],
          [104, 803],
          [72, 776],
          [104, 776],
          [72, 807],
          [104, 807],
          [72, 814],
          [104, 814],
          [73, 816],
          [105, 816],
          [73, 776, 769],
          [105, 776, 769],
          [75, 769],
          [107, 769],
          [75, 803],
          [107, 803],
          [75, 817],
          [107, 817],
          [76, 803],
          [108, 803],
          [76, 803, 772],
          [108, 803, 772],
          [76, 817],
          [108, 817],
          [76, 813],
          [108, 813],
          [77, 769],
          [109, 769],
          [77, 775],
          [109, 775],
          [77, 803],
          [109, 803],
          [78, 775],
          [110, 775],
          [78, 803],
          [110, 803],
          [78, 817],
          [110, 817],
          [78, 813],
          [110, 813],
          [79, 771, 769],
          [111, 771, 769],
          [79, 771, 776],
          [111, 771, 776],
          [79, 772, 768],
          [111, 772, 768],
          [79, 772, 769],
          [111, 772, 769],
          [80, 769],
          [112, 769],
          [80, 775],
          [112, 775],
          [82, 775],
          [114, 775],
          [82, 803],
          [114, 803],
          [82, 803, 772],
          [114, 803, 772],
          [82, 817],
          [114, 817],
          [83, 775],
          [115, 775],
          [83, 803],
          [115, 803],
          [83, 769, 775],
          [115, 769, 775],
          [83, 780, 775],
          [115, 780, 775],
          [83, 803, 775],
          [115, 803, 775],
          [84, 775],
          [116, 775],
          [84, 803],
          [116, 803],
          [84, 817],
          [116, 817],
          [84, 813],
          [116, 813],
          [85, 804],
          [117, 804],
          [85, 816],
          [117, 816],
          [85, 813],
          [117, 813],
          [85, 771, 769],
          [117, 771, 769],
          [85, 772, 776],
          [117, 772, 776],
          [86, 771],
          [118, 771],
          [86, 803],
          [118, 803],
          [87, 768],
          [119, 768],
          [87, 769],
          [119, 769],
          [87, 776],
          [119, 776],
          [87, 775],
          [119, 775],
          [87, 803],
          [119, 803],
          [88, 775],
          [120, 775],
          [88, 776],
          [120, 776],
          [89, 775],
          [121, 775],
          [90, 770],
          [122, 770],
          [90, 803],
          [122, 803],
          [90, 817],
          [122, 817],
          [104, 817],
          [116, 776],
          [119, 778],
          [121, 778],
        ],
          t = 0;
        t < 154;
        t++
      )
        (i = e[t]), (r[t + 7680] = i);
      for (
        e = [
          [65, 803],
          [97, 803],
          [65, 777],
          [97, 777],
          [65, 770, 769],
          [97, 770, 769],
          [65, 770, 768],
          [97, 770, 768],
          [65, 770, 777],
          [97, 770, 777],
          [65, 770, 771],
          [97, 770, 771],
          [65, 803, 770],
          [97, 803, 770],
          [65, 774, 769],
          [97, 774, 769],
          [65, 774, 768],
          [97, 774, 768],
          [65, 774, 777],
          [97, 774, 777],
          [65, 774, 771],
          [97, 774, 771],
          [65, 803, 774],
          [97, 803, 774],
          [69, 803],
          [101, 803],
          [69, 777],
          [101, 777],
          [69, 771],
          [101, 771],
          [69, 770, 769],
          [101, 770, 769],
          [69, 770, 768],
          [101, 770, 768],
          [69, 770, 777],
          [101, 770, 777],
          [69, 770, 771],
          [101, 770, 771],
          [69, 803, 770],
          [101, 803, 770],
          [73, 777],
          [105, 777],
          [73, 803],
          [105, 803],
          [79, 803],
          [111, 803],
          [79, 777],
          [111, 777],
          [79, 770, 769],
          [111, 770, 769],
          [79, 770, 768],
          [111, 770, 768],
          [79, 770, 777],
          [111, 770, 777],
          [79, 770, 771],
          [111, 770, 771],
          [79, 803, 770],
          [111, 803, 770],
          [79, 795, 769],
          [111, 795, 769],
          [79, 795, 768],
          [111, 795, 768],
          [79, 795, 777],
          [111, 795, 777],
          [79, 795, 771],
          [111, 795, 771],
          [79, 795, 803],
          [111, 795, 803],
          [85, 803],
          [117, 803],
          [85, 777],
          [117, 777],
          [85, 795, 769],
          [117, 795, 769],
          [85, 795, 768],
          [117, 795, 768],
          [85, 795, 777],
          [117, 795, 777],
          [85, 795, 771],
          [117, 795, 771],
          [85, 795, 803],
          [117, 795, 803],
          [89, 768],
          [121, 768],
          [89, 803],
          [121, 803],
          [89, 777],
          [121, 777],
          [89, 771],
          [121, 771],
        ],
          t = 0;
        t < 90;
        t++
      )
        (i = e[t]), (r[t + 7840] = i);
      for (
        e = [
          [945, 787],
          [945, 788],
          [945, 787, 768],
          [945, 788, 768],
          [945, 787, 769],
          [945, 788, 769],
          [945, 787, 834],
          [945, 788, 834],
          [913, 787],
          [913, 788],
          [913, 787, 768],
          [913, 788, 768],
          [913, 787, 769],
          [913, 788, 769],
          [913, 787, 834],
          [913, 788, 834],
          [949, 787],
          [949, 788],
          [949, 787, 768],
          [949, 788, 768],
          [949, 787, 769],
          [949, 788, 769],
        ],
          t = 0;
        t < 22;
        t++
      )
        (i = e[t]), (r[t + 7936] = i);
      for (
        e = [
          [951, 787],
          [951, 788],
          [951, 787, 768],
          [951, 788, 768],
          [951, 787, 769],
          [951, 788, 769],
          [951, 787, 834],
          [951, 788, 834],
          [919, 787],
          [919, 788],
          [919, 787, 768],
          [919, 788, 768],
          [919, 787, 769],
          [919, 788, 769],
          [919, 787, 834],
          [919, 788, 834],
          [953, 787],
          [953, 788],
          [953, 787, 768],
          [953, 788, 768],
          [953, 787, 769],
          [953, 788, 769],
          [953, 787, 834],
          [953, 788, 834],
          [921, 787],
          [921, 788],
          [921, 787, 768],
          [921, 788, 768],
          [921, 787, 769],
          [921, 788, 769],
          [921, 787, 834],
          [921, 788, 834],
          [959, 787],
          [959, 788],
          [959, 787, 768],
          [959, 788, 768],
          [959, 787, 769],
          [959, 788, 769],
        ],
          t = 0;
        t < 38;
        t++
      )
        (i = e[t]), (r[t + 7968] = i);
      for (
        e = [
          [933, 788, 834],
          [969, 787],
          [969, 788],
          [969, 787, 768],
          [969, 788, 768],
          [969, 787, 769],
          [969, 788, 769],
          [969, 787, 834],
          [969, 788, 834],
          [937, 787],
          [937, 788],
          [937, 787, 768],
          [937, 788, 768],
          [937, 787, 769],
          [937, 788, 769],
          [937, 787, 834],
          [937, 788, 834],
          [945, 768],
          [945, 769],
          [949, 768],
          [949, 769],
          [951, 768],
          [951, 769],
          [953, 768],
          [953, 769],
          [959, 768],
          [959, 769],
          [965, 768],
          [965, 769],
          [969, 768],
          [969, 769],
        ],
          t = 0;
        t < 31;
        t++
      )
        (i = e[t]), (r[t + 8031] = i);
      for (
        e = [
          [945, 787, 837],
          [945, 788, 837],
          [945, 787, 768, 837],
          [945, 788, 768, 837],
          [945, 787, 769, 837],
          [945, 788, 769, 837],
          [945, 787, 834, 837],
          [945, 788, 834, 837],
          [913, 787, 837],
          [913, 788, 837],
          [913, 787, 768, 837],
          [913, 788, 768, 837],
          [913, 787, 769, 837],
          [913, 788, 769, 837],
          [913, 787, 834, 837],
          [913, 788, 834, 837],
          [951, 787, 837],
          [951, 788, 837],
          [951, 787, 768, 837],
          [951, 788, 768, 837],
          [951, 787, 769, 837],
          [951, 788, 769, 837],
          [951, 787, 834, 837],
          [951, 788, 834, 837],
          [919, 787, 837],
          [919, 788, 837],
          [919, 787, 768, 837],
          [919, 788, 768, 837],
          [919, 787, 769, 837],
          [919, 788, 769, 837],
          [919, 787, 834, 837],
          [919, 788, 834, 837],
          [969, 787, 837],
          [969, 788, 837],
          [969, 787, 768, 837],
          [969, 788, 768, 837],
          [969, 787, 769, 837],
          [969, 788, 769, 837],
          [969, 787, 834, 837],
          [969, 788, 834, 837],
          [937, 787, 837],
          [937, 788, 837],
          [937, 787, 768, 837],
          [937, 788, 768, 837],
          [937, 787, 769, 837],
          [937, 788, 769, 837],
          [937, 787, 834, 837],
          [937, 788, 834, 837],
          [945, 774],
          [945, 772],
          [945, 768, 837],
          [945, 837],
          [945, 769, 837],
        ],
          t = 0;
        t < 53;
        t++
      )
        (i = e[t]), (r[t + 8064] = i);
      for (
        e = [
          [8190, 768],
          [8190, 769],
          [8190, 834],
          [965, 774],
          [965, 772],
          [965, 776, 768],
          [965, 776, 769],
          [961, 787],
          [961, 788],
          [965, 834],
          [965, 776, 834],
          [933, 774],
          [933, 772],
          [933, 768],
          [933, 769],
          [929, 788],
          [168, 768],
          [168, 769],
          96,
        ],
          t = 0;
        t < 19;
        t++
      )
        (i = e[t]), (r[t + 8157] = i);
      for (
        e = [
          35912,
          26356,
          36554,
          36040,
          28369,
          20018,
          21477,
          40860,
          40860,
          22865,
          37329,
          21895,
          22856,
          25078,
          30313,
          32645,
          34367,
          34746,
          35064,
          37007,
          27138,
          27931,
          28889,
          29662,
          33853,
          37226,
          39409,
          20098,
          21365,
          27396,
          29211,
          34349,
          40478,
          23888,
          28651,
          34253,
          35172,
          25289,
          33240,
          34847,
          24266,
          26391,
          28010,
          29436,
          37070,
          20358,
          20919,
          21214,
          25796,
          27347,
          29200,
          30439,
          32769,
          34310,
          34396,
          36335,
          38706,
          39791,
          40442,
          30860,
          31103,
          32160,
          33737,
          37636,
          40575,
          35542,
          22751,
          24324,
          31840,
          32894,
          29282,
          30922,
          36034,
          38647,
          22744,
          23650,
          27155,
          28122,
          28431,
          32047,
          32311,
          38475,
          21202,
          32907,
          20956,
          20940,
          31260,
          32190,
          33777,
          38517,
          35712,
          25295,
          27138,
          35582,
          20025,
          23527,
          24594,
          29575,
          30064,
          21271,
          30971,
          20415,
          24489,
          19981,
          27852,
          25976,
          32034,
          21443,
          22622,
          30465,
          33865,
          35498,
          27578,
          36784,
          27784,
          25342,
          33509,
          25504,
          30053,
          20142,
          20841,
          20937,
          26753,
          31975,
          33391,
          35538,
          37327,
          21237,
          21570,
          22899,
          24300,
          26053,
          28670,
          31018,
          38317,
          39530,
          40599,
          40654,
          21147,
          26310,
          27511,
          36706,
          24180,
          24976,
          25088,
          25754,
          28451,
          29001,
          29833,
          31178,
          32244,
          32879,
          36646,
          34030,
          36899,
          37706,
          21015,
          21155,
          21693,
          28872,
          35010,
          35498,
          24265,
          24565,
          25467,
          27566,
          31806,
          29557,
          20196,
          22265,
          23527,
          23994,
          24604,
          29618,
          29801,
          32666,
          32838,
          37428,
          38646,
          38728,
          38936,
          20363,
          31150,
          37300,
          38584,
          24801,
          20102,
          20698,
          23534,
          23615,
          26009,
          27138,
          29134,
          30274,
          34044,
          36988,
          40845,
          26248,
          38446,
          21129,
          26491,
          26611,
          27969,
          28316,
          29705,
          30041,
          30827,
          32016,
          39006,
          20845,
          25134,
          38520,
          20523,
          23833,
          28138,
          36650,
          24459,
          24900,
          26647,
          29575,
          38534,
          21033,
          21519,
          23653,
          26131,
          26446,
          26792,
          27877,
          29702,
          30178,
          32633,
          35023,
          35041,
          37324,
          38626,
          21311,
          28346,
          21533,
          29136,
          29848,
          34298,
          38563,
          40023,
          40607,
          26519,
          28107,
          33256,
          31435,
          31520,
          31890,
          29376,
          28825,
          35672,
          20160,
          33590,
          21050,
          20999,
          24230,
          25299,
          31958,
          23429,
          27934,
          26292,
          36667,
          34892,
          38477,
          35211,
          24275,
          20800,
          21952,
        ],
          t = 0;
        t < 270;
        t++
      )
        (i = e[t]), (r[t + 63744] = i);
      for (
        e = [
          20398,
          20711,
          20813,
          21193,
          21220,
          21329,
          21917,
          22022,
          22120,
          22592,
          22696,
          23652,
          23662,
          24724,
          24936,
          24974,
          25074,
          25935,
          26082,
          26257,
          26757,
          28023,
          28186,
          28450,
          29038,
          29227,
          29730,
          30865,
          31038,
          31049,
          31048,
          31056,
          31062,
          31069,
          31117,
          31118,
          31296,
          31361,
          31680,
          32244,
          32265,
          32321,
          32626,
          32773,
          33261,
          33401,
          33401,
          33879,
          35088,
          35222,
          35585,
          35641,
          36051,
          36104,
          36790,
          36920,
          38627,
          38911,
          38971,
        ],
          t = 0;
        t < 59;
        t++
      )
        (i = e[t]), (r[t + 64048] = i);
      for (
        e = [
          20029,
          20024,
          20033,
          131362,
          20320,
          20398,
          20411,
          20482,
          20602,
          20633,
          20711,
          20687,
          13470,
          132666,
          20813,
          20820,
          20836,
          20855,
          132380,
          13497,
          20839,
          20877,
          132427,
          20887,
          20900,
          20172,
          20908,
          20917,
          168415,
          20981,
          20995,
          13535,
          21051,
          21062,
          21106,
          21111,
          13589,
          21191,
          21193,
          21220,
          21242,
          21253,
          21254,
          21271,
          21321,
          21329,
          21338,
          21363,
          21373,
          21375,
          21375,
          21375,
          133676,
          28784,
          21450,
          21471,
          133987,
          21483,
          21489,
          21510,
          21662,
          21560,
          21576,
          21608,
          21666,
          21750,
          21776,
          21843,
          21859,
          21892,
          21892,
          21913,
          21931,
          21939,
          21954,
          22294,
          22022,
          22295,
          22097,
          22132,
          20999,
          22766,
          22478,
          22516,
          22541,
          22411,
          22578,
          22577,
          22700,
          136420,
          22770,
          22775,
          22790,
          22810,
          22818,
          22882,
          136872,
          136938,
          23020,
          23067,
          23079,
          23e3,
          23142,
          14062,
          14076,
          23304,
          23358,
          23358,
          137672,
          23491,
          23512,
          23527,
          23539,
          138008,
          23551,
          23558,
          24403,
          23586,
          14209,
          23648,
          23662,
          23744,
          23693,
          138724,
          23875,
          138726,
          23918,
          23915,
          23932,
          24033,
          24034,
          14383,
          24061,
          24104,
          24125,
          24169,
          14434,
          139651,
          14460,
          24240,
          24243,
          24246,
          24266,
          172946,
          24318,
          140081,
          140081,
          33281,
          24354,
          24354,
          14535,
          144056,
          156122,
          24418,
          24427,
          14563,
          24474,
          24525,
          24535,
          24569,
          24705,
          14650,
          14620,
          24724,
          141012,
          24775,
          24904,
          24908,
          24910,
          24908,
          24954,
          24974,
          25010,
          24996,
          25007,
          25054,
          25074,
          25078,
          25104,
          25115,
          25181,
          25265,
          25300,
          25424,
          142092,
          25405,
          25340,
          25448,
          25475,
          25572,
          142321,
          25634,
          25541,
          25513,
          14894,
          25705,
          25726,
          25757,
          25719,
          14956,
          25935,
          25964,
          143370,
          26083,
          26360,
          26185,
          15129,
          26257,
          15112,
          15076,
          20882,
          20885,
          26368,
          26268,
          32941,
          17369,
          26391,
          26395,
          26401,
          26462,
          26451,
          144323,
          15177,
          26618,
          26501,
          26706,
          26757,
          144493,
          26766,
          26655,
          26900,
          15261,
          26946,
          27043,
          27114,
          27304,
          145059,
          27355,
          15384,
          27425,
          145575,
          27476,
          15438,
          27506,
          27551,
          27578,
          27579,
          146061,
          138507,
          146170,
          27726,
          146620,
          27839,
          27853,
          27751,
          27926,
          27966,
          28023,
          27969,
          28009,
          28024,
          28037,
          146718,
          27956,
          28207,
          28270,
          15667,
          28363,
          28359,
          147153,
          28153,
          28526,
          147294,
          147342,
          28614,
          28729,
          28702,
          28699,
          15766,
          28746,
          28797,
          28791,
          28845,
          132389,
          28997,
          148067,
          29084,
          148395,
          29224,
          29237,
          29264,
          149e3,
          29312,
          29333,
          149301,
          149524,
          29562,
          29579,
          16044,
          29605,
          16056,
          16056,
          29767,
          29788,
          29809,
          29829,
          29898,
          16155,
          29988,
          150582,
          30014,
          150674,
          30064,
          139679,
          30224,
          151457,
          151480,
          151620,
          16380,
          16392,
          30452,
          151795,
          151794,
          151833,
          151859,
          30494,
          30495,
          30495,
          30538,
          16441,
          30603,
          16454,
          16534,
          152605,
          30798,
          30860,
          30924,
          16611,
          153126,
          31062,
          153242,
          153285,
          31119,
          31211,
          16687,
          31296,
          31306,
          31311,
          153980,
          154279,
          154279,
          31470,
          16898,
          154539,
          31686,
          31689,
          16935,
          154752,
          31954,
          17056,
          31976,
          31971,
          32e3,
          155526,
          32099,
          17153,
          32199,
          32258,
          32325,
          17204,
          156200,
          156231,
          17241,
          156377,
          32634,
          156478,
          32661,
          32762,
          32773,
          156890,
          156963,
          32864,
          157096,
          32880,
          144223,
          17365,
          32946,
          33027,
          17419,
          33086,
          23221,
          157607,
          157621,
          144275,
          144284,
          33281,
          33284,
          36766,
          17515,
          33425,
          33419,
          33437,
          21171,
          33457,
          33459,
          33469,
          33510,
          158524,
          33509,
          33565,
          33635,
          33709,
          33571,
          33725,
          33767,
          33879,
          33619,
          33738,
          33740,
          33756,
          158774,
          159083,
          158933,
          17707,
          34033,
          34035,
          34070,
          160714,
          34148,
          159532,
          17757,
          17761,
          159665,
          159954,
          17771,
          34384,
          34396,
          34407,
          34409,
          34473,
          34440,
          34574,
          34530,
          34681,
          34600,
          34667,
          34694,
          17879,
          34785,
          34817,
          17913,
          34912,
          34915,
          161383,
          35031,
          35038,
          17973,
          35066,
          13499,
          161966,
          162150,
          18110,
          18119,
          35488,
          35565,
          35722,
          35925,
          162984,
          36011,
          36033,
          36123,
          36215,
          163631,
          133124,
          36299,
          36284,
          36336,
          133342,
          36564,
          36664,
          165330,
          165357,
          37012,
          37105,
          37137,
          165678,
          37147,
          37432,
          37591,
          37592,
          37500,
          37881,
          37909,
          166906,
          38283,
          18837,
          38327,
          167287,
          18918,
          38595,
          23986,
          38691,
          168261,
          168474,
          19054,
          19062,
          38880,
          168970,
          19122,
          169110,
          38923,
          38923,
          38953,
          169398,
          39138,
          19251,
          39209,
          39335,
          39362,
          39422,
          19406,
          170800,
          39698,
          4e4,
          40189,
          19662,
          19693,
          40295,
          172238,
          19704,
          172293,
          172558,
          172689,
          40635,
          19798,
          40697,
          40702,
          40709,
          40719,
          40726,
          40763,
          173568,
        ],
          t = 0;
        t < 542;
        t++
      )
        (i = e[t]), (r[t + 194560] = i);
    })();
    var D = {
        768: 230,
        769: 230,
        770: 230,
        771: 230,
        772: 230,
        773: 230,
        774: 230,
        775: 230,
        776: 230,
        777: 230,
        778: 230,
        779: 230,
        780: 230,
        781: 230,
        782: 230,
        783: 230,
        784: 230,
        785: 230,
        786: 230,
        787: 230,
        788: 230,
        789: 232,
        790: 220,
        791: 220,
        792: 220,
        793: 220,
        794: 232,
        795: 216,
        796: 220,
        797: 220,
        798: 220,
        799: 220,
        800: 220,
        801: 202,
        802: 202,
        803: 220,
        804: 220,
        805: 220,
        806: 220,
        807: 202,
        808: 202,
        809: 220,
        810: 220,
        811: 220,
        812: 220,
        813: 220,
        814: 220,
        815: 220,
        816: 220,
        817: 220,
        818: 220,
        819: 220,
        820: 1,
        821: 1,
        822: 1,
        823: 1,
        824: 1,
        825: 220,
        826: 220,
        827: 220,
        828: 220,
        829: 230,
        830: 230,
        831: 230,
        832: 230,
        833: 230,
        834: 230,
        835: 230,
        836: 230,
        837: 240,
        838: 230,
        839: 220,
        840: 220,
        841: 220,
        842: 230,
        843: 230,
        844: 230,
        845: 220,
        846: 220,
        848: 230,
        849: 230,
        850: 230,
        851: 220,
        852: 220,
        853: 220,
        854: 220,
        855: 230,
        861: 234,
        862: 234,
        863: 233,
        864: 234,
        865: 234,
        866: 233,
        867: 230,
        868: 230,
        869: 230,
        870: 230,
        871: 230,
        872: 230,
        873: 230,
        874: 230,
        875: 230,
        876: 230,
        877: 230,
        878: 230,
        879: 230,
        1155: 230,
        1156: 230,
        1157: 230,
        1158: 230,
        1425: 220,
        1426: 230,
        1427: 230,
        1428: 230,
        1429: 230,
        1430: 220,
        1431: 230,
        1432: 230,
        1433: 230,
        1434: 222,
        1435: 220,
        1436: 230,
        1437: 230,
        1438: 230,
        1439: 230,
        1440: 230,
        1441: 230,
        1443: 220,
        1444: 220,
        1445: 220,
        1446: 220,
        1447: 220,
        1448: 230,
        1449: 230,
        1450: 220,
        1451: 230,
        1452: 230,
        1453: 222,
        1454: 228,
        1455: 230,
        1456: 10,
        1457: 11,
        1458: 12,
        1459: 13,
        1460: 14,
        1461: 15,
        1462: 16,
        1463: 17,
        1464: 18,
        1465: 19,
        1467: 20,
        1468: 21,
        1469: 22,
        1471: 23,
        1473: 24,
        1474: 25,
        1476: 230,
        1552: 230,
        1553: 230,
        1554: 230,
        1555: 230,
        1556: 230,
        1557: 230,
        1611: 27,
        1612: 28,
        1613: 29,
        1614: 30,
        1615: 31,
        1616: 32,
        1617: 33,
        1618: 34,
        1619: 230,
        1620: 230,
        1621: 220,
        1622: 220,
        1623: 230,
        1624: 230,
        1648: 35,
        1750: 230,
        1751: 230,
        1752: 230,
        1753: 230,
        1754: 230,
        1755: 230,
        1756: 230,
        1759: 230,
        1760: 230,
        1761: 230,
        1762: 230,
        1763: 220,
        1764: 230,
        1767: 230,
        1768: 230,
        1770: 220,
        1771: 230,
        1772: 230,
        1773: 220,
        1809: 36,
        1840: 230,
        1841: 220,
        1842: 230,
        1843: 230,
        1844: 220,
        1845: 230,
        1846: 230,
        1847: 220,
        1848: 220,
        1849: 220,
        1850: 230,
        1851: 220,
        1852: 220,
        1853: 230,
        1854: 220,
        1855: 230,
        1856: 230,
        1857: 230,
        1858: 220,
        1859: 230,
        1860: 220,
        1861: 230,
        1862: 220,
        1863: 230,
        1864: 220,
        1865: 230,
        1866: 230,
        2364: 7,
        2381: 9,
        2385: 230,
        2386: 220,
        2387: 230,
        2388: 230,
        2492: 7,
        2509: 9,
        2620: 7,
        2637: 9,
        2748: 7,
        2765: 9,
        2876: 7,
        2893: 9,
        3021: 9,
        3149: 9,
        3157: 84,
        3158: 91,
        3260: 7,
        3277: 9,
        3405: 9,
        3530: 9,
        3640: 103,
        3641: 103,
        3642: 9,
        3656: 107,
        3657: 107,
        3658: 107,
        3659: 107,
        3768: 118,
        3769: 118,
        3784: 122,
        3785: 122,
        3786: 122,
        3787: 122,
        3864: 220,
        3865: 220,
        3893: 220,
        3895: 220,
        3897: 216,
        3953: 129,
        3954: 130,
        3956: 132,
        3962: 130,
        3963: 130,
        3964: 130,
        3965: 130,
        3968: 130,
        3970: 230,
        3971: 230,
        3972: 9,
        3974: 230,
        3975: 230,
        4038: 220,
        4151: 7,
        4153: 9,
        5908: 9,
        5940: 9,
        6098: 9,
        6109: 230,
        6313: 228,
        6457: 222,
        6458: 230,
        6459: 220,
        8400: 230,
        8401: 230,
        8402: 1,
        8403: 1,
        8404: 230,
        8405: 230,
        8406: 230,
        8407: 230,
        8408: 1,
        8409: 1,
        8410: 1,
        8411: 230,
        8412: 230,
        8417: 230,
        8421: 1,
        8422: 1,
        8423: 230,
        8424: 220,
        8425: 230,
        8426: 1,
        12330: 218,
        12331: 228,
        12332: 232,
        12333: 222,
        12334: 224,
        12335: 224,
        12441: 8,
        12442: 8,
        64286: 26,
        65056: 230,
        65057: 230,
        65058: 230,
        65059: 230,
        119141: 216,
        119142: 216,
        119143: 1,
        119144: 1,
        119145: 1,
        119149: 226,
        119150: 216,
        119151: 216,
        119152: 216,
        119153: 216,
        119154: 216,
        119163: 220,
        119164: 220,
        119165: 220,
        119166: 220,
        119167: 220,
        119168: 220,
        119169: 220,
        119170: 220,
        119173: 230,
        119174: 230,
        119175: 230,
        119176: 230,
        119177: 230,
        119178: 220,
        119179: 220,
        119210: 230,
        119211: 230,
        119212: 230,
        119213: 230,
      },
      G = {
        60: { 824: 8814 },
        61: { 824: 8800 },
        62: { 824: 8815 },
        65: { 768: 192, 769: 193, 770: 194, 771: 195, 772: 256, 774: 258, 775: 550, 776: 196, 777: 7842, 778: 197, 780: 461, 783: 512, 785: 514, 803: 7840, 805: 7680, 808: 260 },
        66: { 775: 7682, 803: 7684, 817: 7686 },
        67: { 769: 262, 770: 264, 775: 266, 780: 268, 807: 199 },
        68: { 775: 7690, 780: 270, 803: 7692, 807: 7696, 813: 7698, 817: 7694 },
        69: { 768: 200, 769: 201, 770: 202, 771: 7868, 772: 274, 774: 276, 775: 278, 776: 203, 777: 7866, 780: 282, 783: 516, 785: 518, 803: 7864, 807: 552, 808: 280, 813: 7704, 816: 7706 },
        70: { 775: 7710 },
        71: { 769: 500, 770: 284, 772: 7712, 774: 286, 775: 288, 780: 486, 807: 290 },
        72: { 770: 292, 775: 7714, 776: 7718, 780: 542, 803: 7716, 807: 7720, 814: 7722 },
        73: { 768: 204, 769: 205, 770: 206, 771: 296, 772: 298, 774: 300, 775: 304, 776: 207, 777: 7880, 780: 463, 783: 520, 785: 522, 803: 7882, 808: 302, 816: 7724 },
        74: { 770: 308 },
        75: { 769: 7728, 780: 488, 803: 7730, 807: 310, 817: 7732 },
        76: { 769: 313, 780: 317, 803: 7734, 807: 315, 813: 7740, 817: 7738 },
        77: { 769: 7742, 775: 7744, 803: 7746 },
        78: { 768: 504, 769: 323, 771: 209, 775: 7748, 780: 327, 803: 7750, 807: 325, 813: 7754, 817: 7752 },
        79: { 768: 210, 769: 211, 770: 212, 771: 213, 772: 332, 774: 334, 775: 558, 776: 214, 777: 7886, 779: 336, 780: 465, 783: 524, 785: 526, 795: 416, 803: 7884, 808: 490 },
        80: { 769: 7764, 775: 7766 },
        82: { 769: 340, 775: 7768, 780: 344, 783: 528, 785: 530, 803: 7770, 807: 342, 817: 7774 },
        83: { 769: 346, 770: 348, 775: 7776, 780: 352, 803: 7778, 806: 536, 807: 350 },
        84: { 775: 7786, 780: 356, 803: 7788, 806: 538, 807: 354, 813: 7792, 817: 7790 },
        85: { 768: 217, 769: 218, 770: 219, 771: 360, 772: 362, 774: 364, 776: 220, 777: 7910, 778: 366, 779: 368, 780: 467, 783: 532, 785: 534, 795: 431, 803: 7908, 804: 7794, 808: 370, 813: 7798, 816: 7796 },
        86: { 771: 7804, 803: 7806 },
        87: { 768: 7808, 769: 7810, 770: 372, 775: 7814, 776: 7812, 803: 7816 },
        88: { 775: 7818, 776: 7820 },
        89: { 768: 7922, 769: 221, 770: 374, 771: 7928, 772: 562, 775: 7822, 776: 376, 777: 7926, 803: 7924 },
        90: { 769: 377, 770: 7824, 775: 379, 780: 381, 803: 7826, 817: 7828 },
        97: { 768: 224, 769: 225, 770: 226, 771: 227, 772: 257, 774: 259, 775: 551, 776: 228, 777: 7843, 778: 229, 780: 462, 783: 513, 785: 515, 803: 7841, 805: 7681, 808: 261 },
        98: { 775: 7683, 803: 7685, 817: 7687 },
        99: { 769: 263, 770: 265, 775: 267, 780: 269, 807: 231 },
        100: { 775: 7691, 780: 271, 803: 7693, 807: 7697, 813: 7699, 817: 7695 },
        101: { 768: 232, 769: 233, 770: 234, 771: 7869, 772: 275, 774: 277, 775: 279, 776: 235, 777: 7867, 780: 283, 783: 517, 785: 519, 803: 7865, 807: 553, 808: 281, 813: 7705, 816: 7707 },
        102: { 775: 7711 },
        103: { 769: 501, 770: 285, 772: 7713, 774: 287, 775: 289, 780: 487, 807: 291 },
        104: { 770: 293, 775: 7715, 776: 7719, 780: 543, 803: 7717, 807: 7721, 814: 7723, 817: 7830 },
        105: { 768: 236, 769: 237, 770: 238, 771: 297, 772: 299, 774: 301, 776: 239, 777: 7881, 780: 464, 783: 521, 785: 523, 803: 7883, 808: 303, 816: 7725 },
        106: { 770: 309, 780: 496 },
        107: { 769: 7729, 780: 489, 803: 7731, 807: 311, 817: 7733 },
        108: { 769: 314, 780: 318, 803: 7735, 807: 316, 813: 7741, 817: 7739 },
        109: { 769: 7743, 775: 7745, 803: 7747 },
        110: { 768: 505, 769: 324, 771: 241, 775: 7749, 780: 328, 803: 7751, 807: 326, 813: 7755, 817: 7753 },
        111: { 768: 242, 769: 243, 770: 244, 771: 245, 772: 333, 774: 335, 775: 559, 776: 246, 777: 7887, 779: 337, 780: 466, 783: 525, 785: 527, 795: 417, 803: 7885, 808: 491 },
        112: { 769: 7765, 775: 7767 },
        114: { 769: 341, 775: 7769, 780: 345, 783: 529, 785: 531, 803: 7771, 807: 343, 817: 7775 },
        115: { 769: 347, 770: 349, 775: 7777, 780: 353, 803: 7779, 806: 537, 807: 351 },
        116: { 775: 7787, 776: 7831, 780: 357, 803: 7789, 806: 539, 807: 355, 813: 7793, 817: 7791 },
        117: { 768: 249, 769: 250, 770: 251, 771: 361, 772: 363, 774: 365, 776: 252, 777: 7911, 778: 367, 779: 369, 780: 468, 783: 533, 785: 535, 795: 432, 803: 7909, 804: 7795, 808: 371, 813: 7799, 816: 7797 },
        118: { 771: 7805, 803: 7807 },
        119: { 768: 7809, 769: 7811, 770: 373, 775: 7815, 776: 7813, 778: 7832, 803: 7817 },
        120: { 775: 7819, 776: 7821 },
        121: { 768: 7923, 769: 253, 770: 375, 771: 7929, 772: 563, 775: 7823, 776: 255, 777: 7927, 778: 7833, 803: 7925 },
        122: { 769: 378, 770: 7825, 775: 380, 780: 382, 803: 7827, 817: 7829 },
        168: { 768: 8173, 769: 901, 834: 8129 },
        194: { 768: 7846, 769: 7844, 771: 7850, 777: 7848 },
        196: { 772: 478 },
        197: { 769: 506 },
        198: { 769: 508, 772: 482 },
        199: { 769: 7688 },
        202: { 768: 7872, 769: 7870, 771: 7876, 777: 7874 },
        207: { 769: 7726 },
        212: { 768: 7890, 769: 7888, 771: 7894, 777: 7892 },
        213: { 769: 7756, 772: 556, 776: 7758 },
        214: { 772: 554 },
        216: { 769: 510 },
        220: { 768: 475, 769: 471, 772: 469, 780: 473 },
        226: { 768: 7847, 769: 7845, 771: 7851, 777: 7849 },
        228: { 772: 479 },
        229: { 769: 507 },
        230: { 769: 509, 772: 483 },
        231: { 769: 7689 },
        234: { 768: 7873, 769: 7871, 771: 7877, 777: 7875 },
        239: { 769: 7727 },
        244: { 768: 7891, 769: 7889, 771: 7895, 777: 7893 },
        245: { 769: 7757, 772: 557, 776: 7759 },
        246: { 772: 555 },
        248: { 769: 511 },
        252: { 768: 476, 769: 472, 772: 470, 780: 474 },
        258: { 768: 7856, 769: 7854, 771: 7860, 777: 7858 },
        259: { 768: 7857, 769: 7855, 771: 7861, 777: 7859 },
        274: { 768: 7700, 769: 7702 },
        275: { 768: 7701, 769: 7703 },
        332: { 768: 7760, 769: 7762 },
        333: { 768: 7761, 769: 7763 },
        346: { 775: 7780 },
        347: { 775: 7781 },
        352: { 775: 7782 },
        353: { 775: 7783 },
        360: { 769: 7800 },
        361: { 769: 7801 },
        362: { 776: 7802 },
        363: { 776: 7803 },
        383: { 775: 7835 },
        416: { 768: 7900, 769: 7898, 771: 7904, 777: 7902, 803: 7906 },
        417: { 768: 7901, 769: 7899, 771: 7905, 777: 7903, 803: 7907 },
        431: { 768: 7914, 769: 7912, 771: 7918, 777: 7916, 803: 7920 },
        432: { 768: 7915, 769: 7913, 771: 7919, 777: 7917, 803: 7921 },
        439: { 780: 494 },
        490: { 772: 492 },
        491: { 772: 493 },
        550: { 772: 480 },
        551: { 772: 481 },
        552: { 774: 7708 },
        553: { 774: 7709 },
        558: { 772: 560 },
        559: { 772: 561 },
        658: { 780: 495 },
        776: { 769: 836 },
        913: { 768: 8122, 769: 902, 772: 8121, 774: 8120, 787: 7944, 788: 7945, 837: 8124 },
        917: { 768: 8136, 769: 904, 787: 7960, 788: 7961 },
        919: { 768: 8138, 769: 905, 787: 7976, 788: 7977, 837: 8140 },
        921: { 768: 8154, 769: 906, 772: 8153, 774: 8152, 776: 938, 787: 7992, 788: 7993 },
        927: { 768: 8184, 769: 908, 787: 8008, 788: 8009 },
        929: { 788: 8172 },
        933: { 768: 8170, 769: 910, 772: 8169, 774: 8168, 776: 939, 788: 8025 },
        937: { 768: 8186, 769: 911, 787: 8040, 788: 8041, 837: 8188 },
        940: { 837: 8116 },
        942: { 837: 8132 },
        945: { 768: 8048, 769: 940, 772: 8113, 774: 8112, 787: 7936, 788: 7937, 834: 8118, 837: 8115 },
        949: { 768: 8050, 769: 941, 787: 7952, 788: 7953 },
        951: { 768: 8052, 769: 942, 787: 7968, 788: 7969, 834: 8134, 837: 8131 },
        953: { 768: 8054, 769: 943, 772: 8145, 774: 8144, 776: 970, 787: 7984, 788: 7985, 834: 8150 },
        959: { 768: 8056, 769: 972, 787: 8e3, 788: 8001 },
        961: { 787: 8164, 788: 8165 },
        965: { 768: 8058, 769: 973, 772: 8161, 774: 8160, 776: 971, 787: 8016, 788: 8017, 834: 8166 },
        969: { 768: 8060, 769: 974, 787: 8032, 788: 8033, 834: 8182, 837: 8179 },
        970: { 768: 8146, 769: 912, 834: 8151 },
        971: { 768: 8162, 769: 944, 834: 8167 },
        974: { 837: 8180 },
        978: { 769: 979, 776: 980 },
        1030: { 776: 1031 },
        1040: { 774: 1232, 776: 1234 },
        1043: { 769: 1027 },
        1045: { 768: 1024, 774: 1238, 776: 1025 },
        1046: { 774: 1217, 776: 1244 },
        1047: { 776: 1246 },
        1048: { 768: 1037, 772: 1250, 774: 1049, 776: 1252 },
        1050: { 769: 1036 },
        1054: { 776: 1254 },
        1059: { 772: 1262, 774: 1038, 776: 1264, 779: 1266 },
        1063: { 776: 1268 },
        1067: { 776: 1272 },
        1069: { 776: 1260 },
        1072: { 774: 1233, 776: 1235 },
        1075: { 769: 1107 },
        1077: { 768: 1104, 774: 1239, 776: 1105 },
        1078: { 774: 1218, 776: 1245 },
        1079: { 776: 1247 },
        1080: { 768: 1117, 772: 1251, 774: 1081, 776: 1253 },
        1082: { 769: 1116 },
        1086: { 776: 1255 },
        1091: { 772: 1263, 774: 1118, 776: 1265, 779: 1267 },
        1095: { 776: 1269 },
        1099: { 776: 1273 },
        1101: { 776: 1261 },
        1110: { 776: 1111 },
        1140: { 783: 1142 },
        1141: { 783: 1143 },
        1240: { 776: 1242 },
        1241: { 776: 1243 },
        1256: { 776: 1258 },
        1257: { 776: 1259 },
        1488: { 1463: 64302, 1464: 64303, 1468: 64304 },
        1489: { 1468: 64305, 1471: 64332 },
        1490: { 1468: 64306 },
        1491: { 1468: 64307 },
        1492: { 1468: 64308 },
        1493: { 1465: 64331, 1468: 64309 },
        1494: { 1468: 64310 },
        1496: { 1468: 64312 },
        1497: { 1460: 64285, 1468: 64313 },
        1498: { 1468: 64314 },
        1499: { 1468: 64315, 1471: 64333 },
        1500: { 1468: 64316 },
        1502: { 1468: 64318 },
        1504: { 1468: 64320 },
        1505: { 1468: 64321 },
        1507: { 1468: 64323 },
        1508: { 1468: 64324, 1471: 64334 },
        1510: { 1468: 64326 },
        1511: { 1468: 64327 },
        1512: { 1468: 64328 },
        1513: { 1468: 64329, 1473: 64298, 1474: 64299 },
        1514: { 1468: 64330 },
        1522: { 1463: 64287 },
        1575: { 1619: 1570, 1620: 1571, 1621: 1573 },
        1608: { 1620: 1572 },
        1610: { 1620: 1574 },
        1729: { 1620: 1730 },
        1746: { 1620: 1747 },
        1749: { 1620: 1728 },
        2325: { 2364: 2392 },
        2326: { 2364: 2393 },
        2327: { 2364: 2394 },
        2332: { 2364: 2395 },
        2337: { 2364: 2396 },
        2338: { 2364: 2397 },
        2344: { 2364: 2345 },
        2347: { 2364: 2398 },
        2351: { 2364: 2399 },
        2352: { 2364: 2353 },
        2355: { 2364: 2356 },
        2465: { 2492: 2524 },
        2466: { 2492: 2525 },
        2479: { 2492: 2527 },
        2503: { 2494: 2507, 2519: 2508 },
        2582: { 2620: 2649 },
        2583: { 2620: 2650 },
        2588: { 2620: 2651 },
        2603: { 2620: 2654 },
        2610: { 2620: 2611 },
        2616: { 2620: 2614 },
        2849: { 2876: 2908 },
        2850: { 2876: 2909 },
        2887: { 2878: 2891, 2902: 2888, 2903: 2892 },
        2962: { 3031: 2964 },
        3014: { 3006: 3018, 3031: 3020 },
        3015: { 3006: 3019 },
        3142: { 3158: 3144 },
        3263: { 3285: 3264 },
        3270: { 3266: 3274, 3285: 3271, 3286: 3272 },
        3274: { 3285: 3275 },
        3398: { 3390: 3402, 3415: 3404 },
        3399: { 3390: 3403 },
        3545: { 3530: 3546, 3535: 3548, 3551: 3550 },
        3548: { 3530: 3549 },
        3904: { 4021: 3945 },
        3906: { 4023: 3907 },
        3916: { 4023: 3917 },
        3921: { 4023: 3922 },
        3926: { 4023: 3927 },
        3931: { 4023: 3932 },
        3953: { 3954: 3955, 3956: 3957, 3968: 3969 },
        3984: { 4021: 4025 },
        3986: { 4023: 3987 },
        3996: { 4023: 3997 },
        4001: { 4023: 4002 },
        4006: { 4023: 4007 },
        4011: { 4023: 4012 },
        4018: { 3968: 3958 },
        4019: { 3968: 3960 },
        4133: { 4142: 4134 },
        7734: { 772: 7736 },
        7735: { 772: 7737 },
        7770: { 772: 7772 },
        7771: { 772: 7773 },
        7778: { 775: 7784 },
        7779: { 775: 7785 },
        7840: { 770: 7852, 774: 7862 },
        7841: { 770: 7853, 774: 7863 },
        7864: { 770: 7878 },
        7865: { 770: 7879 },
        7884: { 770: 7896 },
        7885: { 770: 7897 },
        7936: { 768: 7938, 769: 7940, 834: 7942, 837: 8064 },
        7937: { 768: 7939, 769: 7941, 834: 7943, 837: 8065 },
        7938: { 837: 8066 },
        7939: { 837: 8067 },
        7940: { 837: 8068 },
        7941: { 837: 8069 },
        7942: { 837: 8070 },
        7943: { 837: 8071 },
        7944: { 768: 7946, 769: 7948, 834: 7950, 837: 8072 },
        7945: { 768: 7947, 769: 7949, 834: 7951, 837: 8073 },
        7946: { 837: 8074 },
        7947: { 837: 8075 },
        7948: { 837: 8076 },
        7949: { 837: 8077 },
        7950: { 837: 8078 },
        7951: { 837: 8079 },
        7952: { 768: 7954, 769: 7956 },
        7953: { 768: 7955, 769: 7957 },
        7960: { 768: 7962, 769: 7964 },
        7961: { 768: 7963, 769: 7965 },
        7968: { 768: 7970, 769: 7972, 834: 7974, 837: 8080 },
        7969: { 768: 7971, 769: 7973, 834: 7975, 837: 8081 },
        7970: { 837: 8082 },
        7971: { 837: 8083 },
        7972: { 837: 8084 },
        7973: { 837: 8085 },
        7974: { 837: 8086 },
        7975: { 837: 8087 },
        7976: { 768: 7978, 769: 7980, 834: 7982, 837: 8088 },
        7977: { 768: 7979, 769: 7981, 834: 7983, 837: 8089 },
        7978: { 837: 8090 },
        7979: { 837: 8091 },
        7980: { 837: 8092 },
        7981: { 837: 8093 },
        7982: { 837: 8094 },
        7983: { 837: 8095 },
        7984: { 768: 7986, 769: 7988, 834: 7990 },
        7985: { 768: 7987, 769: 7989, 834: 7991 },
        7992: { 768: 7994, 769: 7996, 834: 7998 },
        7993: { 768: 7995, 769: 7997, 834: 7999 },
        8e3: { 768: 8002, 769: 8004 },
        8001: { 768: 8003, 769: 8005 },
        8008: { 768: 8010, 769: 8012 },
        8009: { 768: 8011, 769: 8013 },
        8016: { 768: 8018, 769: 8020, 834: 8022 },
        8017: { 768: 8019, 769: 8021, 834: 8023 },
        8025: { 768: 8027, 769: 8029, 834: 8031 },
        8032: { 768: 8034, 769: 8036, 834: 8038, 837: 8096 },
        8033: { 768: 8035, 769: 8037, 834: 8039, 837: 8097 },
        8034: { 837: 8098 },
        8035: { 837: 8099 },
        8036: { 837: 8100 },
        8037: { 837: 8101 },
        8038: { 837: 8102 },
        8039: { 837: 8103 },
        8040: { 768: 8042, 769: 8044, 834: 8046, 837: 8104 },
        8041: { 768: 8043, 769: 8045, 834: 8047, 837: 8105 },
        8042: { 837: 8106 },
        8043: { 837: 8107 },
        8044: { 837: 8108 },
        8045: { 837: 8109 },
        8046: { 837: 8110 },
        8047: { 837: 8111 },
        8048: { 837: 8114 },
        8052: { 837: 8130 },
        8060: { 837: 8178 },
        8118: { 837: 8119 },
        8127: { 768: 8141, 769: 8142, 834: 8143 },
        8134: { 837: 8135 },
        8182: { 837: 8183 },
        8190: { 768: 8157, 769: 8158, 834: 8159 },
        8592: { 824: 8602 },
        8594: { 824: 8603 },
        8596: { 824: 8622 },
        8656: { 824: 8653 },
        8658: { 824: 8655 },
        8660: { 824: 8654 },
        8707: { 824: 8708 },
        8712: { 824: 8713 },
        8715: { 824: 8716 },
        8739: { 824: 8740 },
        8741: { 824: 8742 },
        8764: { 824: 8769 },
        8771: { 824: 8772 },
        8773: { 824: 8775 },
        8776: { 824: 8777 },
        8781: { 824: 8813 },
        8801: { 824: 8802 },
        8804: { 824: 8816 },
        8805: { 824: 8817 },
        8818: { 824: 8820 },
        8819: { 824: 8821 },
        8822: { 824: 8824 },
        8823: { 824: 8825 },
        8826: { 824: 8832 },
        8827: { 824: 8833 },
        8828: { 824: 8928 },
        8829: { 824: 8929 },
        8834: { 824: 8836 },
        8835: { 824: 8837 },
        8838: { 824: 8840 },
        8839: { 824: 8841 },
        8849: { 824: 8930 },
        8850: { 824: 8931 },
        8866: { 824: 8876 },
        8872: { 824: 8877 },
        8873: { 824: 8878 },
        8875: { 824: 8879 },
        8882: { 824: 8938 },
        8883: { 824: 8939 },
        8884: { 824: 8940 },
        8885: { 824: 8941 },
        10973: { 824: 10972 },
        12358: { 12441: 12436 },
        12363: { 12441: 12364 },
        12365: { 12441: 12366 },
        12367: { 12441: 12368 },
        12369: { 12441: 12370 },
        12371: { 12441: 12372 },
        12373: { 12441: 12374 },
        12375: { 12441: 12376 },
        12377: { 12441: 12378 },
        12379: { 12441: 12380 },
        12381: { 12441: 12382 },
        12383: { 12441: 12384 },
        12385: { 12441: 12386 },
        12388: { 12441: 12389 },
        12390: { 12441: 12391 },
        12392: { 12441: 12393 },
        12399: { 12441: 12400, 12442: 12401 },
        12402: { 12441: 12403, 12442: 12404 },
        12405: { 12441: 12406, 12442: 12407 },
        12408: { 12441: 12409, 12442: 12410 },
        12411: { 12441: 12412, 12442: 12413 },
        12445: { 12441: 12446 },
        12454: { 12441: 12532 },
        12459: { 12441: 12460 },
        12461: { 12441: 12462 },
        12463: { 12441: 12464 },
        12465: { 12441: 12466 },
        12467: { 12441: 12468 },
        12469: { 12441: 12470 },
        12471: { 12441: 12472 },
        12473: { 12441: 12474 },
        12475: { 12441: 12476 },
        12477: { 12441: 12478 },
        12479: { 12441: 12480 },
        12481: { 12441: 12482 },
        12484: { 12441: 12485 },
        12486: { 12441: 12487 },
        12488: { 12441: 12489 },
        12495: { 12441: 12496, 12442: 12497 },
        12498: { 12441: 12499, 12442: 12500 },
        12501: { 12441: 12502, 12442: 12503 },
        12504: { 12441: 12505, 12442: 12506 },
        12507: { 12441: 12508, 12442: 12509 },
        12527: { 12441: 12535 },
        12528: { 12441: 12536 },
        12529: { 12441: 12537 },
        12530: { 12441: 12538 },
        12541: { 12441: 12542 },
        64329: { 1473: 64300, 1474: 64301 },
        119127: { 119141: 119134 },
        119128: { 119141: 119135 },
        119135: { 119150: 119136, 119151: 119137, 119152: 119138, 119153: 119139, 119154: 119140 },
        119225: { 119141: 119227 },
        119226: { 119141: 119228 },
        119227: { 119150: 119229, 119151: 119231 },
        119228: { 119150: 119230, 119151: 119232 },
      };
    function M(e) {
      var t,
        i,
        r = e.length;
      for (t = 0; t < r && !(e[t] < 0 || e[t] >= 256); t++);
      if (t == r) return e;
      for (i = Array(r), t = 0; t < r; t++) e[t] < 0 || e[t] >= 256 ? (i[t] = 63) : (i[t] = e[t]);
      return i;
    }
    function I(e) {
      var t,
        i,
        r = e.length;
      if (0 == r) return "";
      for (t = 0; t < r && !(e[t] < 0 || e[t] >= 256); t++);
      if (t == r) return String.fromCharCode.apply(this, e);
      for (i = Array(r), t = 0; t < r; t++) i[t] = String.fromCharCode(255 & e[t]);
      return i.join("");
    }
    function j(e) {
      var t,
        i,
        r,
        n = e.length;
      if (0 == n) return "";
      for (t = 0; t < n && !(e[t] >= 65536); t++);
      if (t == n) return String.fromCharCode.apply(this, e);
      for (r = Array(n), t = 0; t < n; t++) (i = e[t]) < 65536 ? (r[t] = String.fromCharCode(i)) : ((i -= 65536), (r[t] = String.fromCharCode(55296 + (i >> 10), 56320 + (1023 & i))));
      return r.join("");
    }
    function B(e) {
      var t = 0;
      for (let i = 0; i < e.length; i++) {
        const r = e[i];
        t += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : r < 2097152 ? 4 : 1;
      }
      if (t == e.length) return e;
      const i = [];
      for (let t = 0; t < e.length; t++) {
        const r = e[t];
        r < 128
          ? i.push(r)
          : r < 2048
          ? (i.push(192 | ((1984 & r) >> 6)), i.push(128 | (63 & r)))
          : r < 65536
          ? (i.push(224 | ((61440 & r) >> 12)), i.push(128 | ((4032 & r) >> 6)), i.push(128 | (63 & r)))
          : r < 2097152
          ? (i.push(240 | ((1835008 & r) >> 18)), i.push(128 | ((258048 & r) >> 12)), i.push(128 | ((4032 & r) >> 6)), i.push(128 | (63 & r)))
          : i.push(63);
      }
      return i;
    }
    function L(e) {
      for (var t = new Array(4 * e.length), i = 0; i < e.length; i++) {
        var r = e[i];
        (t[4 * i] = (r >> 24) & 255), (t[4 * i + 1] = (r >> 16) & 255), (t[4 * i + 2] = (r >> 8) & 255), (t[4 * i + 3] = 255 & r);
      }
      return t;
    }
    var U = { dummy: "Glk call has not yet returned" };
    var R = 1,
      z = 2,
      W = 3,
      A = 4,
      N = null,
      F = null,
      P = null,
      E = !0,
      O = null,
      Q = null,
      H = null,
      Y = null,
      J = null,
      V = 1,
      K = null,
      X = null,
      Z = null;
    function ee(e, t) {
      var r = {};
      return (
        (r.type = e),
        (r.rock = t),
        (r.disprock = void 0),
        (r.parent = null),
        (r.str = (function (e) {
          var t;
          return ((t = se(z, !1, !0, 0)).unicode = !0), (t.win = e), t;
        })(r)),
        (r.echostr = null),
        (r.style = b.style_Normal),
        (r.hyperlink = 0),
        (r.input_generation = null),
        (r.linebuf = null),
        (r.char_request = !1),
        (r.line_request = !1),
        (r.char_request_uni = !1),
        (r.line_request_uni = !1),
        (r.hyperlink_request = !1),
        (r.mouse_request = !1),
        (r.echo_line_input = !0),
        (r.line_input_terminators = []),
        (r.request_echo_line_input = null),
        (r.prev = null),
        (r.next = F),
        (F = r),
        r.next && (r.next.prev = r),
        i ? i.class_register("window", r) : (r.disprock = V++),
        (E = !0),
        r
      );
    }
    function te(e) {
      var t, r;
      i && i.class_unregister("window", e),
        (E = !0),
        (e.echostr = null),
        e.str && (ue(e.str), (e.str = null)),
        (t = e.prev),
        (r = e.next),
        (e.prev = null),
        (e.next = null),
        t ? (t.next = r) : (F = r),
        r && (r.prev = t),
        (e.parent = null),
        (e.rock = null),
        (e.disprock = null);
    }
    function ie(e, t) {
      var i, r;
      switch (e.type) {
        case b.wintype_TextBuffer:
          (e.style == e.accumstyle && e.hyperlink == e.accumhyperlink && e.fg == e.accum_fg && e.bg == e.accum_bg && e.reverse == e.accum_reverse) || ne(e), e.accum.push(t);
          break;
        case b.wintype_TextGrid:
          for (i = 0; i < t.length; i++) {
            if (((r = t.charAt(i)), e.cursorx < 0 ? (e.cursorx = 0) : e.cursorx >= e.gridwidth && ((e.cursorx = 0), e.cursory++), e.cursory < 0)) e.cursory = 0;
            else if (e.cursory >= e.gridheight) break;
            if ("\n" != r) {
              var n = e.lines[e.cursory];
              (n.dirty = !0), (n.chars[e.cursorx] = r), (n.styles[e.cursorx] = e.style), (n.hyperlinks[e.cursorx] = e.hyperlink), (n.fgs[e.cursorx] = e.fg), (n.bgs[e.cursorx] = e.bg), (n.reverses[e.cursorx] = e.reverse), e.cursorx++;
            } else e.cursory++, (e.cursorx = 0);
          }
      }
    }
    function re(e) {
      if ((e.cursorx < 0 ? (e.cursorx = 0) : e.cursorx >= e.gridwidth && ((e.cursorx = 0), e.cursory++), e.cursory < 0)) e.cursory = 0;
      else if (e.cursory >= e.gridheight) return !0;
      return !1;
    }
    function ne(e) {
      var t,
        i,
        r,
        n,
        l = e.content,
        a = x[e.accumstyle];
      if (e.accum.length)
        for (t = e.accum.join("").split("\n"), i = 0; i < t.length; i++)
          if (
            ((n = void 0),
            0 == i ? t[i] && (0 == l.length ? ((n = []), l.push({ content: n, append: !0 })) : (r = l[l.length - 1]).content ? (n = r.content) : ((n = []), (r.content = n))) : t[i] ? ((n = []), l.push({ content: n })) : l.push({}),
            void 0 !== n)
          )
            if (e.accumhyperlink || e.accum_fg || e.accum_bg || e.accum_reverse) {
              const r = { style: a, text: t[i] };
              e.accumhyperlink && (r.hyperlink = e.accumhyperlink), e.accum_fg && (r.fg = e.accum_fg), e.accum_bg && (r.bg = e.accum_bg), e.accum_reverse && (r.reverse = 1), n.push(r);
            } else n.push(a), n.push(t[i]);
      (e.accum.length = 0), (e.accumstyle = e.style), (e.accumhyperlink = e.hyperlink), (e.accum_fg = e.fg), (e.accum_bg = e.bg), (e.accum_reverse = e.reverse);
    }
    function le(e, t, i) {
      ne(e);
      var r,
        n = e.content,
        l = void 0;
      0 == n.length ? ((r = { content: (l = []), append: !0 }), i && (r.flowbreak = !0), n.push(r)) : ((r = n[n.length - 1]), i && (r.flowbreak = !0), r.content ? (l = r.content) : ((l = []), (r.content = l))),
        void 0 !== l && void 0 !== t && l.push(t);
    }
    function ae(e, t) {
      var r;
      for (r = e.parent; r; r = r.parent) r.type == b.wintype_Pair && r.pair_key === e && ((r.pair_key = null), (r.pair_keydamage = !0));
      switch ((i && e.linebuf && (i.unretain_array(e.linebuf), (e.linebuf = null)), e.type)) {
        case b.wintype_Pair:
          t && (e.child1 && ae(e.child1, !0), e.child2 && ae(e.child2, !0)), (e.child1 = null), (e.child2 = null), (e.pair_key = null);
          break;
        case b.wintype_TextBuffer:
          (e.accum = null), (e.content = null), (e.reserve = null);
          break;
        case b.wintype_TextGrid:
          e.lines = null;
          break;
        case b.wintype_Graphics:
          (e.content = null), (e.reserve = null);
      }
      te(e);
    }
    function oe(e, t) {
      var i, r, n, l, a, o, s, u, f, c, d, _, p, g, h, m;
      switch (((E = !0), (e.bbox = t), e.type)) {
        case b.wintype_TextGrid:
          if (
            ((i = t.right - t.left),
            (r = t.bottom - t.top),
            (l = e.gridheight),
            (e.gridwidth = Math.max(0, Math.floor((i - O.gridmarginx) / O.gridcharwidth))),
            (e.gridheight = Math.max(0, Math.floor((r - O.gridmarginy) / O.gridcharheight))),
            l > e.gridheight)
          )
            e.lines.length = e.gridheight;
          else if (l < e.gridheight) for (c = l; c < e.gridheight; c++) e.lines[c] = { chars: [], styles: [], hyperlinks: [], fgs: [], bgs: [], reverses: [], dirty: !0 };
          for (c = 0; c < e.gridheight; c++)
            if ((n = (_ = e.lines[c]).chars.length) > e.gridwidth)
              (_.dirty = !0), (_.chars.length = e.gridwidth), (_.styles.length = e.gridwidth), (_.hyperlinks.length = e.gridwidth), (_.fgs.length = e.gridwidth), (_.bgs.length = e.gridwidth), (_.reverses.length = e.gridwidth);
            else if (n < e.gridwidth) for (_.dirty = !0, d = n; d < e.gridwidth; d++) (_.chars[d] = " "), (_.styles[d] = b.style_Normal), (_.hyperlinks[d] = 0), (_.fgs[d] = null), (_.bgs[d] = null), (_.reverses[d] = 0);
          break;
        case b.wintype_Graphics:
          (i = t.right - t.left), (r = t.bottom - t.top), (e.graphwidth = Math.max(0, i - O.graphicsmarginx)), (e.graphheight = Math.max(0, r - O.graphicsmarginy));
          break;
        case b.wintype_Pair:
          e.pair_vertical ? ((a = e.bbox.left), (o = e.bbox.right), (f = O.inspacingx)) : ((a = e.bbox.top), (o = e.bbox.bottom), (f = O.inspacingy)),
            e.pair_hasborder || (f = 0),
            (s = o - a),
            e.pair_division == b.winmethod_Proportional
              ? (u = Math.floor((s * e.pair_size) / 100))
              : e.pair_division == b.winmethod_Fixed
              ? ((u = 0),
                e.pair_key && e.pair_key.type == b.wintype_TextBuffer && (u = e.pair_vertical ? e.pair_size * O.buffercharwidth + O.buffermarginx : e.pair_size * O.buffercharheight + O.buffermarginy),
                e.pair_key && e.pair_key.type == b.wintype_TextGrid && (u = e.pair_vertical ? e.pair_size * O.gridcharwidth + O.gridmarginx : e.pair_size * O.gridcharheight + O.gridmarginy),
                e.pair_key && e.pair_key.type == b.wintype_Graphics && (u = e.pair_vertical ? e.pair_size + O.graphicsmarginx : e.pair_size + O.graphicsmarginy),
                (u = Math.ceil(u)))
              : (u = Math.floor(s / 2)),
            (u = e.pair_backward ? a + u : o - u - f),
            (u = a >= o ? a : Math.min(Math.max(u, a), o - f)),
            (e.pair_splitpos = u),
            (e.pair_splitwidth = f),
            (g = e.pair_vertical
              ? { left: (p = { left: e.bbox.left, right: e.pair_splitpos, top: e.bbox.top, bottom: e.bbox.bottom }).right + e.pair_splitwidth, right: e.bbox.right, top: e.bbox.top, bottom: e.bbox.bottom }
              : { top: (p = { top: e.bbox.top, bottom: e.pair_splitpos, left: e.bbox.left, right: e.bbox.right }).bottom + e.pair_splitwidth, bottom: e.bbox.bottom, left: e.bbox.left, right: e.bbox.right }),
            e.pair_backward ? ((h = e.child2), (m = e.child1)) : ((h = e.child1), (m = e.child2)),
            oe(h, p),
            oe(m, g);
      }
    }
    function se(e, t, r, n) {
      var l = {};
      return (
        (l.type = e),
        (l.rock = n),
        (l.disprock = void 0),
        (l.unicode = !1),
        (l.isbinary = !1),
        (l.streaming = !1),
        (l.ref = null),
        (l.win = null),
        (l.file = null),
        (l.buf = null),
        (l.bufpos = 0),
        (l.buflen = 0),
        (l.bufeof = 0),
        (l.timer_id = null),
        (l.flush_func = null),
        (l.fstream = null),
        (l.readcount = 0),
        (l.writecount = 0),
        (l.readable = t),
        (l.writable = r),
        (l.prev = null),
        (l.next = Q),
        (Q = l),
        l.next && (l.next.prev = l),
        i && i.class_register("stream", l),
        l
      );
    }
    function ue(e) {
      var t, r;
      e === Y && (Y = null),
        (function (e) {
          var t;
          for (t = F; t; t = t.next) t.echostr === e && (t.echostr = null);
        })(e),
        e.type == W ? i && i.unretain_array(e.buf) : e.type == R && e.fstream && (e.fstream.fclose(), (e.fstream = null)),
        i && i.class_unregister("stream", e),
        (t = e.prev),
        (r = e.next),
        (e.prev = null),
        (e.next = null),
        t ? (t.next = r) : (Q = r),
        r && (r.prev = t),
        (e.fstream = null),
        (e.buf = null),
        (e.readable = !1),
        (e.writable = !1),
        (e.ref = null),
        (e.win = null),
        (e.file = null),
        (e.rock = null),
        (e.disprock = null);
    }
    function fe(e) {
      e.streaming && n.log("### gli_stream_dirty_file called for streaming file!"),
        null === e.timer_id &&
          (null === e.flush_func &&
            (e.flush_func = function () {
              ce(e);
            }),
          (e.timer_id = setTimeout(e.flush_func, 1e4)));
    }
    function ce(e) {
      e.streaming && n.log("### gli_stream_flush_file called for streaming file!"), null !== e.timer_id && clearTimeout(e.timer_id), (e.timer_id = null), t.file_write(e.ref, e.buf);
    }
    function de(r, n, l, a) {
      var o = {};
      if (((o.filename = r), (o.rock = l), (o.disprock = void 0), (o.textmode = 0 != (n & b.fileusage_TextMode)), (o.filetype = n & b.fileusage_TypeMask), (o.filetypename = T[o.filetype]), o.filetypename || (o.filetypename = "xxx"), !a)) {
        var s = "";
        o.filetype == b.fileusage_SavedGame && (s = e.get_signature()), (a = t.file_construct_ref(o.filename, o.filetypename, s));
      }
      return (o.ref = a), (o.prev = null), (o.next = H), (H = o), o.next && (o.next.prev = o), i && i.class_register("fileref", o), o;
    }
    function _e(e, t) {
      if (!e || !e.writable) throw "gli_put_char: invalid stream";
      switch ((e.unicode || ((t < 0 || t >= 256) && (t = 63)), (e.writecount += 1), e.type)) {
        case R:
          var i;
          if (e.streaming)
            if (e.unicode)
              if (e.isbinary) e.buffer4.writeUInt32BE(t, 0, !0), e.fstream.fwrite(e.buffer4, 4);
              else if (t < 65536) (i = e.buffer4.write(String.fromCharCode(t))), e.fstream.fwrite(e.buffer4, i);
              else {
                var r = B([t]),
                  n = e.fstream.BufferClass.from(r);
                e.fstream.fwrite(n);
              }
            else (e.buffer4[0] = t), e.fstream.fwrite(e.buffer4, 1);
          else if ((fe(e), !e.unicode || (t < 128 && !e.isbinary))) e.bufpos < e.buflen && ((e.buf[e.bufpos] = t), (e.bufpos += 1), e.bufpos > e.bufeof && (e.bufeof = e.bufpos));
          else {
            let i;
            i = e.isbinary ? L([t]) : B([t]);
            let r = i.length;
            r > e.buflen - e.bufpos && (r = e.buflen - e.bufpos);
            for (let t = 0; t < r; t++) e.buf[e.bufpos + t] = i[t];
            (e.bufpos += r), e.bufpos > e.bufeof && (e.bufeof = e.bufpos);
          }
          break;
        case W:
          e.bufpos < e.buflen && ((e.buf[e.bufpos] = t), (e.bufpos += 1), e.bufpos > e.bufeof && (e.bufeof = e.bufpos));
          break;
        case z:
          if (e.win.line_request) throw "gli_put_char: window has pending line request";
          ie(e.win, (l = t) < 65536 ? String.fromCharCode(l) : ((l -= 65536), String.fromCharCode(55296 + (l >> 10), 56320 + (1023 & l)))), e.win.echostr && _e(e.win.echostr, t);
      }
      var l;
    }
    function pe(e, t, i) {
      var r, n;
      if (!e || !e.writable) throw "gli_put_array: invalid stream";
      switch ((e.unicode || i || ((t = M(t)), (i = !0)), (e.writecount += t.length), e.type)) {
        case R:
          if (e.streaming)
            if (e.unicode)
              if (e.isbinary) {
                const i = e.fstream.BufferClass.alloc(4 * t.length);
                for (let e = 0; e < t.length; e++) i.writeUInt32BE(t[e], 4 * e, !0);
                e.fstream.fwrite(i);
              } else {
                const i = B(t),
                  r = e.fstream.BufferClass.from(i);
                e.fstream.fwrite(r);
              }
            else {
              const i = e.fstream.BufferClass.from(t);
              e.fstream.fwrite(i);
            }
          else {
            var l;
            fe(e);
            let i = (l = e.unicode ? (e.isbinary ? L(t) : B(t)) : t).length;
            i > e.buflen - e.bufpos && (i = e.buflen - e.bufpos);
            for (let t = 0; t < i; t++) e.buf[e.bufpos + t] = l[t];
            (e.bufpos += i), e.bufpos > e.bufeof && (e.bufeof = e.bufpos);
          }
          break;
        case W:
          (r = t.length) > e.buflen - e.bufpos && (r = e.buflen - e.bufpos);
          for (let i = 0; i < r; i++) e.buf[e.bufpos + i] = t[i];
          (e.bufpos += r), e.bufpos > e.bufeof && (e.bufeof = e.bufpos);
          break;
        case z:
          if (e.win.line_request) throw "gli_put_array: window has pending line request";
          (n = i ? String.fromCharCode.apply(this, t) : j(t)), ie(e.win, n), e.win.echostr && pe(e.win.echostr, t, i);
      }
    }
    function ge(e, t) {
      var i;
      if (!e || !e.readable) return -1;
      switch (e.type) {
        case R:
          if (e.streaming) {
            if (e.unicode) {
              if (e.isbinary) {
                if (e.fstream.fread(e.buffer4, 4) < 4) return -1;
                (i = e.buffer4[0] << 24), (i |= e.buffer4[1] << 16), (i |= e.buffer4[2] << 8), (i |= e.buffer4[3]);
              } else {
                let t, r, n, l;
                if (!e.fstream.fread(e.buffer4, 1)) return -1;
                if (((t = e.buffer4[0]), t < 128)) i = t;
                else {
                  if (!e.fstream.fread(e.buffer4, 1)) return -1;
                  if (((r = e.buffer4[0]), 128 != (192 & r))) return -1;
                  if (192 == (224 & t)) (i = (31 & t) << 6), (i |= 63 & r);
                  else {
                    if (!e.fstream.fread(e.buffer4, 1)) return -1;
                    if (((n = e.buffer4[0]), 128 != (192 & n))) return -1;
                    if (224 == (240 & t)) (i = ((15 & t) << 12) & 61440), (i |= ((63 & r) << 6) & 4032), (i |= 63 & n);
                    else {
                      if (240 != (240 & t)) return -1;
                      if (!e.fstream.fread(e.buffer4, 1)) return -1;
                      if (((l = e.buffer4[0]), 128 != (192 & l))) return -1;
                      (i = ((7 & t) << 18) & 1835008), (i |= ((63 & r) << 12) & 258048), (i |= ((63 & n) << 6) & 4032), (i |= 63 & l);
                    }
                  }
                }
              }
              return e.readcount++, (i >>>= 0), !t && i >= 256 ? 63 : i;
            }
            return e.fstream.fread(e.buffer4, 1) ? (e.readcount++, e.buffer4[0]) : -1;
          }
        case A:
          if (e.unicode) {
            if (e.isbinary) {
              if (e.bufpos >= e.bufeof) return -1;
              if (((i = e.buf[e.bufpos]), e.bufpos++, e.bufpos >= e.bufeof)) return -1;
              if (((i = (i << 8) | (255 & e.buf[e.bufpos])), e.bufpos++, e.bufpos >= e.bufeof)) return -1;
              if (((i = (i << 8) | (255 & e.buf[e.bufpos])), e.bufpos++, e.bufpos >= e.bufeof)) return -1;
              (i = (i << 8) | (255 & e.buf[e.bufpos])), e.bufpos++;
            } else {
              let t, r, n, l;
              if (e.bufpos >= e.bufeof) return -1;
              if (((t = e.buf[e.bufpos]), e.bufpos++, t < 128)) i = t;
              else {
                if (e.bufpos >= e.bufeof) return -1;
                if (((r = e.buf[e.bufpos]), e.bufpos++, 128 != (192 & r))) return -1;
                if (192 == (224 & t)) (i = (31 & t) << 6), (i |= 63 & r);
                else {
                  if (e.bufpos >= e.bufeof) return -1;
                  if (((n = e.buf[e.bufpos]), e.bufpos++, 128 != (192 & n))) return -1;
                  if (224 == (240 & t)) (i = ((15 & t) << 12) & 61440), (i |= ((63 & r) << 6) & 4032), (i |= 63 & n);
                  else {
                    if (240 != (240 & t)) return -1;
                    if (e.bufpos >= e.bufeof) return -1;
                    if (((l = e.buf[e.bufpos]), e.bufpos++, 128 != (192 & l))) return -1;
                    (i = ((7 & t) << 18) & 1835008), (i |= ((63 & r) << 12) & 258048), (i |= ((63 & n) << 6) & 4032), (i |= 63 & l);
                  }
                }
              }
            }
            return e.readcount++, (i >>>= 0), !t && i >= 256 ? 63 : i;
          }
        case W:
          return e.bufpos < e.bufeof ? ((i = e.buf[e.bufpos]), e.bufpos++, e.readcount++, !t && i >= 256 ? 63 : i) : -1;
        default:
          return -1;
      }
    }
    function he(e, t, i) {
      if (!e || !e.readable) return 0;
      var r,
        n,
        l,
        a = t.length;
      switch (e.type) {
        case R:
          if (e.streaming) {
            if (0 == a) return 0;
            for (a -= 1, l = !1, r = 0; r < a && !l && -1 != (n = ge(e, i)); r++) (t[r] = n), (l = 10 == n);
            return r;
          }
        case A:
          if (e.unicode) {
            if (0 == a) return 0;
            for (a -= 1, l = !1, r = 0; r < a && !l && -1 != (n = ge(e, i)); r++) (t[r] = n), (l = 10 == n);
            return r;
          }
        case W:
          if (0 == a) return 0;
          if (((a -= 1), e.bufpos >= e.bufeof ? (a = 0) : e.bufpos + a > e.bufeof && (a = e.bufeof - e.bufpos), (l = !1), i)) for (r = 0; r < a && !l; r++) (n = e.buf[e.bufpos++]), (t[r] = n), (l = 10 == n);
          else for (r = 0; r < a && !l; r++) (n = e.buf[e.bufpos++]), !i && n >= 256 && (n = 63), (t[r] = n), (l = 10 == n);
          return (e.readcount += r), r;
        default:
          return 0;
      }
    }
    function me(e, t, i) {
      if (!e || !e.readable) return 0;
      var r,
        n,
        l = t.length;
      switch (e.type) {
        case R:
          if (e.streaming) {
            for (r = 0; r < l && -1 != (n = ge(e, i)); r++) t[r] = n;
            return r;
          }
        case A:
          if (e.unicode) {
            for (r = 0; r < l && -1 != (n = ge(e, i)); r++) t[r] = n;
            return r;
          }
        case W:
          if ((e.bufpos >= e.bufeof ? (l = 0) : e.bufpos + l > e.bufeof && (l = e.bufeof - e.bufpos), i)) for (r = 0; r < l; r++) t[r] = e.buf[e.bufpos++];
          else for (r = 0; r < l; r++) (n = e.buf[e.bufpos++]), !i && n >= 256 && (n = 63), (t[r] = n);
          return (e.readcount += l), l;
        default:
          return 0;
      }
    }
    function we(e, t) {
      t && (t.set_field(0, e.readcount), t.set_field(1, e.writecount));
    }
    function ye(e, t, i) {
      var r;
      if (!e || !e.writable) throw "glk_put_jstring: invalid stream";
      switch (((e.writecount += t.length), e.type)) {
        case R:
          if (e.streaming)
            if (e.unicode)
              if (e.isbinary) {
                const i = e.fstream.BufferClass.alloc(4 * t.length);
                for (let e = 0; e < t.length; e++) i.writeUInt32BE(t.charCodeAt(e), 4 * e, !0);
                e.fstream.fwrite(i);
              } else {
                const i = e.fstream.BufferClass.from(t);
                e.fstream.fwrite(i);
              }
            else {
              const i = e.fstream.BufferClass.from(t, "binary");
              e.fstream.fwrite(i);
            }
          else {
            fe(e);
            const i = [];
            for (let e = 0; e < t.length; e++) i.push(t.charCodeAt(e));
            let r;
            r = e.unicode ? (e.isbinary ? L(i) : B(i)) : i;
            let n = r.length;
            n > e.buflen - e.bufpos && (n = e.buflen - e.bufpos);
            for (let t = 0; t < n; t++) e.buf[e.bufpos + t] = r[t];
            (e.bufpos += n), e.bufpos > e.bufeof && (e.bufeof = e.bufpos);
          }
          break;
        case W:
          if (((r = t.length) > e.buflen - e.bufpos && (r = e.buflen - e.bufpos), e.unicode || i)) for (let i = 0; i < r; i++) e.buf[e.bufpos + i] = t.charCodeAt(i);
          else
            for (let i = 0; i < r; i++) {
              var n = t.charCodeAt(i);
              (n < 0 || n >= 256) && (n = 63), (e.buf[e.bufpos + i] = n);
            }
          (e.bufpos += r), e.bufpos > e.bufeof && (e.bufeof = e.bufpos);
          break;
        case z:
          if (e.win.line_request) throw "glk_put_jstring: window has pending line request";
          ie(e.win, t), e.win.echostr && ye(e.win.echostr, t, i);
      }
    }
    function be(e, t) {
      if (!e || !e.writable) throw "gli_set_style: invalid stream";
      t >= b.style_NUMSTYLES && (t = 0), e.type == z && ((e.win.style = t), e.win.echostr && be(e.win.echostr, t));
    }
    function ve(e, t) {
      if (!e || !e.writable) throw "gli_set_hyperlink: invalid stream";
      e.type == z && ((e.win.hyperlink = t), e.win.echostr && ve(e.win.echostr, t));
    }
    function ke(e, t, i) {
      switch (e) {
        case 0:
          return 1796;
        case 1:
          return t <= b.keycode_Left && t >= b.keycode_End ? 1 : t >= 4294967296 - b.keycode_MAXVAL || t > 1114111 || (t >= 0 && t < 32) || (t >= 127 && t < 160) ? 0 : 1;
        case 2:
          return t > 1114111 || (t >= 0 && t < 32) || (t >= 127 && t < 160) ? 0 : 1;
        case 3:
          return t > 1114111 || (t >= 0 && t < 32) || (t >= 127 && t < 160) ? (i && (i[0] = 1), 0) : (i && (i[0] = 1), 2);
        case 4:
          return t == b.wintype_TextGrid || (l.graphics && t == b.wintype_Graphics) ? 1 : 0;
        case 5:
          return l.timer || 0;
        case 6:
          return l.graphics || 0;
        case 7:
          return !l.graphics || (t !== b.wintype_TextBuffer && t !== b.wintype_Graphics) ? 0 : 1;
        case 8:
        case 9:
        case 10:
          return 0;
        case 11:
          return l.hyperlinks || 0;
        case 12:
          return !l.hyperlinks || (t !== b.wintype_TextBuffer && t !== b.wintype_TextGrid) ? 0 : 1;
        case 13:
          return 0;
        case 14:
          return l.graphics || 0;
        case 15:
        case 16:
        case 17:
        case 18:
          return 1;
        case 19:
          return t == b.keycode_Escape || (t >= b.keycode_Func12 && t <= b.keycode_Func1) ? 1 : 0;
        case 20:
          return 1;
        case 21:
          return 0;
        case 22:
          return 1;
        case 23:
          return 0;
        case 4352:
          return l.garglktext || 0;
      }
      if (f) {
        var r = f(e, t, i);
        if (void 0 !== r) return r;
      }
      return 0;
    }
    var xe = null,
      Te = { buffer: [], grid: [] };
    for (let e = 0; e < b.style_NUMSTYLES; e++) Te.buffer.push({}), Te.grid.push({});
    function $e(e) {
      const t = [];
      for (let i = 0; i < b.style_NUMSTYLES; i++) t.push(Object.assign({}, e[i]));
      return t;
    }
    var qe = ["margin-left", "text-indent", "text-align", "font-size", "font-weight", "font-style", "font-family", "color", "background-color", "reverse"];
    function Ce(e, t, i) {
      if (!e || !e.writable) throw "garglk_set_zcolors: invalid stream";
      (t >>= 0),
        (i >>= 0),
        e.type == z &&
          (-2 !== t && (e.win.fg = -1 === t ? null : "#" + ("000000" + t.toString(16)).slice(-6)), -2 !== i && (e.win.bg = -1 === i ? null : "#" + ("000000" + i.toString(16)).slice(-6)), e.win.echostr && Ce(e.win.echostr, t, i));
    }
    function Se(e, t) {
      if (!e || !e.writable) throw "garglk_set_reversevideo: invalid stream";
      e.type == z && ((e.win.reverse = t || null), e.win.echostr && Se(e.win.echostr, t));
    }
    function De(e) {
      e ? ((K = e), (X = Date.now())) : ((K = null), (X = null));
    }
    function Ge(e) {
      for (var t = (16777215 & e).toString(16); t.length < 6; ) t = "0" + t;
      return "#" + t.toUpperCase();
    }
    function Me(e, t) {
      var i,
        r,
        n,
        l,
        a,
        o,
        s,
        u,
        f,
        c = e.slice(0, t);
      for (i = 0, r = 0; r < t; r++)
        if (((l = c[r]), void 0 === (a = S[l]))) (e[i] = l), i++;
        else if (a instanceof Array) for (n = 0; n < a.length; n++) (e[i] = a[n]), i++;
        else (e[i] = a), i++;
      for (r = 0; r < i; )
        if (D[e[r]]) {
          if (r >= i) break;
          for (o = r; r < i && D[e[r]]; ) r++;
          if ((s = r) - o >= 2) for (n = s - 1; n > o; n--) for (u = o; u < n; u++) D[e[u]] > D[e[u + 1]] && ((f = e[u]), (e[u] = e[u + 1]), (e[u + 1] = f));
        } else r++;
      return i;
    }
    return {
      version: "2.2.5",
      init: function (l) {
        if (!l.Dialog) throw new Error("No reference to Dialog");
        if (((t = l.Dialog), l.GiDispa && (i = l.GiDispa), l.GiLoad && (r = l.GiLoad), !l.GlkOte)) throw new Error("No reference to GlkOte");
        (n = l.GlkOte), (e = l.vm), i && i.set_vm(e), (l.accept = w), n.init(l), (a = l.exit_warning), (o = l.do_vm_autosave), (s = l.before_select_hook), (u = l.extevent_hook), (f = l.glk_gestalt_hook), s && s();
      },
      update: function () {
        var t,
          r,
          l,
          a,
          u,
          f,
          p,
          h,
          w,
          y,
          v,
          k = { type: "update", gen: g },
          T = null,
          $ = null,
          q = null;
        if (E)
          for (E = !1, T = [], t = F; t; t = t.next)
            if (t.type != b.wintype_Pair) {
              switch (((r = { id: t.disprock, rock: t.rock }), T.push(r), t.type)) {
                case b.wintype_TextBuffer:
                  (r.type = "buffer"), (r.stylehints = $e(t.stylehints)), (r.bg = t.cleared_bg), (r.fg = t.cleared_fg);
                  break;
                case b.wintype_TextGrid:
                  (r.type = "grid"), (r.gridwidth = t.gridwidth), (r.gridheight = t.gridheight), (r.stylehints = $e(t.stylehints)), (r.bg = t.cleared_bg), (r.fg = t.cleared_fg);
                  break;
                case b.wintype_Graphics:
                  (r.type = "graphics"), (r.graphwidth = t.graphwidth), (r.graphheight = t.graphheight);
              }
              (r.left = t.bbox.left), (r.top = t.bbox.top), (r.width = t.bbox.right - t.bbox.left), (r.height = t.bbox.bottom - t.bbox.top);
            }
        for (t = F; t; t = t.next) {
          switch (((a = !1), (r = { id: t.disprock }), null == $ && ($ = []), t.type)) {
            case b.wintype_TextBuffer:
              if (
                (ne(t),
                t.content.length && ((r.text = t.content.slice(0)), (t.content.length = 0), (a = !0)),
                t.clearcontent && ((r.clear = !0), (r.bg = t.cleared_bg), (r.fg = t.cleared_fg), (t.clearcontent = !1), (a = !0), r.text || (r.text = []), (t.reserve.length = 0)),
                r.text && r.text.length)
              )
                for (h = 0; h < r.text.length; h++) t.reserve.push(r.text[h]);
              t.reserve.length > 100 && t.reserve.splice(0, t.reserve.length - 100);
              break;
            case b.wintype_TextGrid:
              if (0 == t.gridwidth || 0 == t.gridheight) break;
              for (r.lines = [], h = 0; h < t.gridheight; h++)
                if ((u = t.lines[h]).dirty) {
                  for (u.dirty = !1, f = [], v = 0, w = 0; w < t.gridwidth; ) {
                    const e = u.styles[w],
                      i = u.hyperlinks[w],
                      r = u.fgs[w],
                      n = u.bgs[w],
                      a = u.reverses[w];
                    for (; w < t.gridwidth && u.styles[w] === e && u.hyperlinks[w] === i && u.fgs[w] === r && u.bgs[w] === n && u.reverses[w] === a; w++);
                    v < w &&
                      (i || null != r || null != n || a ? ((l = { style: x[e], text: u.chars.slice(v, w).join(""), hyperlink: i, fg: r, bg: n, reverse: a }), f.push(l)) : (f.push(x[e]), f.push(u.chars.slice(v, w).join(""))), (v = w));
                  }
                  r.lines.push({ line: h, content: f });
                }
              t.clearcontent && ((r.clear = !0), (r.bg = t.cleared_bg), (r.fg = t.cleared_fg), (t.clearcontent = !1)), (a = r.lines.length);
              break;
            case b.wintype_Graphics:
              t.content.length && ((r.draw = t.content.slice(0)), (t.content.length = 0), (a = !0));
              var C = -1;
              if (r.draw && r.draw.length)
                for (h = 0; h < r.draw.length; h++) {
                  var S = r.draw[h];
                  "fill" == S.special && void 0 === S.x && void 0 === S.y && void 0 === S.width && void 0 === S.height && (C = t.reserve.length), t.reserve.push(S);
                }
              if (C >= 0) {
                var D = null;
                for (let e = 0; e < t.reserve.length && e < C; e++) {
                  const i = t.reserve[e];
                  "setcolor" == i.special && (D = i);
                }
                t.reserve.splice(0, C), D && t.reserve.unshift(D);
              }
          }
          a && $.push(r);
        }
        for (q = [], t = F; t; t = t.next)
          (r = null),
            t.char_request && ((r = { id: t.disprock, type: "char", gen: t.input_generation }), t.type == b.wintype_TextGrid && (re(t) ? ((r.xpos = t.gridwidth), (r.ypos = t.gridheight - 1)) : ((r.xpos = t.cursorx), (r.ypos = t.cursory)))),
            t.line_request &&
              ((y = ""),
              m && (p = m[t.disprock]) && (y = p),
              (r = { id: t.disprock, type: "line", gen: t.input_generation, maxlen: t.linebuf.length, initial: y }),
              t.line_input_terminators.length && (r.terminators = t.line_input_terminators),
              t.type == b.wintype_TextGrid && (re(t) ? ((r.xpos = t.gridwidth), (r.ypos = t.gridheight - 1)) : ((r.xpos = t.cursorx), (r.ypos = t.cursory)))),
            t.hyperlink_request && (r || (r = { id: t.disprock }), (r.hyperlink = !0)),
            t.mouse_request && (r || (r = { id: t.disprock }), (r.mouse = !0)),
            r && q.push(r);
        if (
          ((k.windows = T),
          (k.content = $),
          (k.input = q),
          Z != K && ((k.timer = K), (Z = K)),
          _ && (k.specialinput = _),
          d && (k.disable = !0),
          xe != Te.buffer[0]["background-color"] && ((xe = Te.buffer[0]["background-color"]), (k.page_bg = Te.buffer[0]["background-color"] || "")),
          (m = null),
          N && (k.autorestore = N),
          (N = null),
          n.update(k, N),
          s && s(),
          o)
        )
          if (c) e.do_autosave(-1);
          else if (i) {
            var G = i.check_autosave();
            G && e.do_autosave(G);
          }
      },
      save_allstate: function () {
        var e = {};
        P && (e.rootwin = P.disprock), Y && (e.currentstr = Y.disprock), K && (e.timer_interval = K), (e.windows = []);
        for (var r = F; r; r = r.next) {
          var l = { type: r.type, rock: r.rock, disprock: r.disprock, style: r.style, hyperlink: r.hyperlink, bg: r.bg, fg: r.fg, reverse: r.reverse, cleared_bg: r.cleared_bg, cleared_fg: r.cleared_fg };
          if (
            (r.parent && (l.parent = r.parent.disprock),
            (l.str = r.str.disprock),
            r.echostr && (l.echostr = r.echostr.disprock),
            (l.bbox = { left: r.bbox.left, right: r.bbox.right, top: r.bbox.top, bottom: r.bbox.bottom }),
            null !== r.linebuf)
          ) {
            var a = i.get_retained_array(r.linebuf);
            l.linebuf = { addr: a.addr, len: a.len, arr: a.arr.slice(0), arg: a.arg.serialize() };
          }
          switch (
            ((l.char_request = r.char_request),
            (l.line_request = r.line_request),
            (l.char_request_uni = r.char_request_uni),
            (l.line_request_uni = r.line_request_uni),
            (l.hyperlink_request = r.hyperlink_request),
            (l.mouse_request = r.mouse_request),
            (l.echo_line_input = r.echo_line_input),
            (l.request_echo_line_input = r.request_echo_line_input),
            (l.line_input_terminators = r.line_input_terminators.slice(0)),
            r.type)
          ) {
            case b.wintype_TextBuffer:
              (l.reserve = r.reserve.slice(0)), (l.stylehints = r.stylehints);
              break;
            case b.wintype_TextGrid:
              (l.gridwidth = r.gridwidth), (l.gridheight = r.gridheight), (l.lines = []);
              for (var o = 0; o < r.lines.length; o++) {
                var s = r.lines[o];
                l.lines.push({ chars: s.chars.slice(0), styles: s.styles.slice(0), hyperlinks: s.hyperlinks.slice(0), fgs: s.fgs.slice(0), bgs: s.bgs.slice(0), reverses: s.reverses.slice(0) });
              }
              (l.cursorx = r.cursorx), (l.cursory = r.cursory), (l.stylehints = r.stylehints);
              break;
            case b.wintype_Graphics:
              (l.graphwidth = r.graphwidth), (l.graphheight = r.graphheight), (l.reserve = r.reserve.slice(0));
              break;
            case b.wintype_Pair:
              (l.pair_dir = r.pair_dir),
                (l.pair_division = r.pair_division),
                (l.pair_key = r.pair_key.disprock),
                (l.pair_keydamage = !1),
                (l.pair_size = r.pair_size),
                (l.pair_hasborder = r.pair_hasborder),
                (l.pair_vertical = r.pair_vertical),
                (l.pair_backward = r.pair_backward),
                (l.child1 = r.child1.disprock),
                (l.child2 = r.child2.disprock);
          }
          e.windows.push(l);
        }
        e.streams = [];
        for (let r = Q; r; r = r.next) {
          const n = { type: r.type, rock: r.rock, disprock: r.disprock, unicode: r.unicode, isbinary: r.isbinary, readcount: r.readcount, writecount: r.writecount, readable: r.readable, writable: r.writable, streaming: r.streaming };
          switch (r.type) {
            case z:
              r.win && (n.win = r.win.disprock);
              break;
            case W:
              if (null !== r.buf) {
                const e = i.get_retained_array(r.buf);
                n.buf = { addr: e.addr, len: e.len, arr: e.arr.slice(0), arg: e.arg.serialize() };
              }
              (n.buflen = r.buflen), (n.bufpos = r.bufpos), (n.bufeof = r.bufeof);
              break;
            case A:
              (n.resfilenum = r.resfilenum), (n.buflen = r.buflen), (n.bufpos = r.bufpos), (n.bufeof = r.bufeof);
              break;
            case R:
              (n.origfmode = r.origfmode), t.streaming ? (r.fstream.fflush(), (n.ref = r.ref), (n.filepos = r.fstream.ftell())) : ((n.ref = r.ref), ce(r), (n.buflen = r.buflen), (n.bufpos = r.bufpos), (n.bufeof = r.bufeof));
          }
          e.streams.push(n);
        }
        e.filerefs = [];
        for (let t = H; t; t = t.next) {
          const i = { type: t.type, rock: t.rock, disprock: t.disprock, filename: t.filename, textmode: t.textmode, filetype: t.filetype, filetypename: t.filetypename };
          (i.ref = t.ref), e.filerefs.push(i);
        }
        return (e.stylehints = Te), (e.glkote = n.save_allstate()), e;
      },
      restore_allstate: function (e) {
        if (F || Q || H) throw "restore_allstate: glkapi module has already been launched";
        for (let t = e.windows.length - 1; t >= 0; t--) {
          const r = e.windows[t],
            n = { type: r.type, rock: r.rock, disprock: r.disprock, style: r.style, hyperlink: r.hyperlink, bg: r.bg, fg: r.fg, reverse: r.reverse, cleared_bg: r.cleared_bg, cleared_fg: r.cleared_fg };
          i.class_register("window", n, n.disprock), (n.prev = null), (n.next = F), (F = n), n.next && (n.next.prev = n);
        }
        for (let t = e.streams.length - 1; t >= 0; t--) {
          const r = e.streams[t],
            n = { type: r.type, rock: r.rock, disprock: r.disprock, unicode: r.unicode, isbinary: r.isbinary, readcount: r.readcount, writecount: r.writecount, readable: r.readable, writable: r.writable, streaming: r.streaming };
          i.class_register("stream", n, n.disprock), (n.prev = null), (n.next = Q), (Q = n), n.next && (n.next.prev = n);
        }
        for (let t = e.filerefs.length - 1; t >= 0; t--) {
          const r = e.filerefs[t],
            n = { type: r.type, rock: r.rock, disprock: r.disprock, filename: r.filename, textmode: r.textmode, filetype: r.filetype, filetypename: r.filetypename };
          i.class_register("fileref", n, n.disprock), (n.prev = null), (n.next = H), (H = n), n.next && (n.next.prev = n);
        }
        for (let t = 0; t < e.windows.length; t++) {
          const r = e.windows[t],
            a = i.class_obj_from_id("window", r.disprock);
          switch (
            ((a.parent = i.class_obj_from_id("window", r.parent)),
            (a.str = i.class_obj_from_id("stream", r.str)),
            (a.echostr = i.class_obj_from_id("stream", r.echostr)),
            (a.bbox = { left: r.bbox.left, right: r.bbox.right, top: r.bbox.top, bottom: r.bbox.bottom }),
            (a.input_generation = null),
            (r.char_request || r.line_request) && (a.input_generation = g),
            (a.linebuf = null),
            void 0 !== r.linebuf && ((a.linebuf = r.linebuf.arr), i.retain_array(a.linebuf, r.linebuf)),
            (a.char_request = r.char_request),
            (a.line_request = r.line_request),
            (a.char_request_uni = r.char_request_uni),
            (a.line_request_uni = r.line_request_uni),
            (a.hyperlink_request = r.hyperlink_request),
            (a.mouse_request = r.mouse_request),
            (a.echo_line_input = r.echo_line_input),
            (a.request_echo_line_input = r.request_echo_line_input),
            (a.line_input_terminators = r.line_input_terminators.slice(0)),
            a.type)
          ) {
            case b.wintype_TextBuffer:
              (a.accum = []),
                (a.accumstyle = a.style),
                (a.accumhyperlink = a.hyperlink),
                (a.accum_fg = a.fg),
                (a.accum_bg = a.bg),
                (a.accum_reverse = a.reverse),
                (a.content = r.reserve.slice(0)),
                (a.clearcontent = !1),
                (a.reserve = []),
                (a.stylehints = r.stylehints);
              break;
            case b.wintype_TextGrid:
              (a.gridwidth = r.gridwidth), (a.gridheight = r.gridheight), (a.lines = []);
              for (var n = 0; n < r.lines.length; n++) {
                var l = r.lines[n];
                a.lines.push({ dirty: !0, chars: l.chars.slice(0), styles: l.styles.slice(0), hyperlinks: l.hyperlinks.slice(0), fgs: l.fgs.slice(0), bgs: l.bgs.slice(0), reverses: l.reverses.slice(0) });
              }
              (a.cursorx = r.cursorx), (a.cursory = r.cursory), (a.clearcontent = !1), (a.stylehints = r.stylehints);
              break;
            case b.wintype_Graphics:
              (a.graphwidth = r.graphwidth), (a.graphheight = r.graphheight), (a.content = r.reserve.slice(0)), (a.reserve = []);
              break;
            case b.wintype_Pair:
              (a.pair_dir = r.pair_dir),
                (a.pair_division = r.pair_division),
                (a.pair_key = i.class_obj_from_id("window", r.pair_key)),
                (a.pair_keydamage = !1),
                (a.pair_size = r.pair_size),
                (a.pair_hasborder = r.pair_hasborder),
                (a.pair_vertical = r.pair_vertical),
                (a.pair_backward = r.pair_backward),
                (a.child1 = i.class_obj_from_id("window", r.child1)),
                (a.child2 = i.class_obj_from_id("window", r.child2));
          }
        }
        for (let n = 0; n < e.streams.length; n++) {
          const l = e.streams[n],
            u = i.class_obj_from_id("stream", l.disprock);
          switch (((u.win = null), (u.ref = null), (u.file = null), (u.buf = null), (u.bufpos = 0), (u.buflen = 0), (u.bufeof = 0), (u.timer_id = null), (u.flush_func = null), (u.fstream = null), u.type)) {
            case z:
              u.win = i.class_obj_from_id("window", l.win);
              break;
            case W:
              void 0 !== l.buf && ((u.buf = l.buf.arr), i.retain_array(u.buf, l.buf)), (u.buflen = l.buflen), (u.bufpos = l.bufpos), (u.bufeof = l.bufeof);
              break;
            case A:
              u.resfilenum = l.resfilenum;
              var a = r.find_data_chunk(u.resfilenum);
              a && (u.buf = a.data), (u.buflen = l.buflen), (u.bufpos = l.bufpos), (u.bufeof = l.bufeof);
              break;
            case R:
              if (((u.origfmode = l.origfmode), t.streaming)) {
                if (((u.ref = l.ref), (u.fstream = t.file_fopen(u.origfmode, u.ref)), !u.fstream)) {
                  var o = t.file_construct_temp_ref(u.ref.usage);
                  if (((u.fstream = t.file_fopen(u.origfmode, o)), !u.fstream)) throw "restore_allstate: could not reopen even a temp stream for: " + u.ref.filename;
                }
                u.origfmode != b.filemode_WriteAppend && u.fstream.fseek(l.filepos, b.seekmode_Start), (u.buffer4 = u.fstream.BufferClass.alloc(4));
              } else {
                (u.ref = l.ref), (u.buflen = l.buflen), (u.bufpos = l.bufpos), (u.bufeof = l.bufeof);
                var s = t.file_read(u.ref);
                null == s && ((s = []), t.file_write(u.ref, "", !0)), (u.buf = s), (u.bufeof = s.length), u.bufpos > u.bufeof && (u.bufpos = u.bufeof);
              }
          }
        }
        for (let t = 0; t < e.filerefs.length; t++) {
          const r = e.filerefs[t];
          i.class_obj_from_id("fileref", r.disprock).ref = r.ref;
        }
        (P = i.class_obj_from_id("window", e.rootwin)), (Y = i.class_obj_from_id("stream", e.currentstr)), e.timer_interval && De(e.timer_interval), (Te = e.stylehints), (N = e.glkote);
      },
      fatal_error: function (e) {
        (c = !0), (d = !0), n.error(e);
        var t = { type: "update", gen: g, disable: !0, input: [] };
        n.update(t);
      },
      byte_array_to_string: I,
      uni_array_to_string: j,
      Const: b,
      RefBox: function () {
        (this.value = void 0),
          (this.set_value = function (e) {
            this.value = e;
          }),
          (this.get_value = function () {
            return this.value;
          });
      },
      RefStruct: function () {
        (this.fields = []),
          (this.push_field = function (e) {
            this.fields.push(e);
          }),
          (this.set_field = function (e, t) {
            this.fields[e] = t;
          }),
          (this.get_field = function (e) {
            return this.fields[e];
          }),
          (this.get_fields = function () {
            return this.fields;
          });
      },
      DidNotReturn: U,
      call_may_not_return: function (e) {
        return 1 == e || 192 == e || 98 == e;
      },
      glk_put_jstring: function (e, t) {
        ye(Y, e, t);
      },
      glk_put_jstring_stream: ye,
      glk_exit: function () {
        return (c = !0), (d = !0), (J = null), a && n.warning(a), U;
      },
      glk_tick: function () {},
      glk_gestalt: function (e, t) {
        return ke(e, t, null);
      },
      glk_gestalt_ext: ke,
      glk_window_iterate: function (e, t) {
        return (e = e ? e.next : F) ? (t && t.set_value(e.rock), e) : (t && t.set_value(0), null);
      },
      glk_window_get_rock: function (e) {
        if (!e) throw "glk_window_get_rock: invalid window";
        return e.rock;
      },
      glk_window_get_root: function () {
        return P;
      },
      glk_window_open: function (e, t, i, r, n) {
        var a, o, s, u, f;
        if (P) {
          if (!e) throw "glk_window_open: splitwin must not be null";
          if ((s = t & b.winmethod_DivisionMask) != b.winmethod_Fixed && s != b.winmethod_Proportional) throw "glk_window_open: invalid method (not fixed or proportional)";
          if ((s = t & b.winmethod_DirMask) != b.winmethod_Above && s != b.winmethod_Below && s != b.winmethod_Left && s != b.winmethod_Right) throw "glk_window_open: invalid method (bad direction)";
          if (((o = e.bbox), (a = e.parent) && a.type != b.wintype_Pair)) throw "glk_window_open: parent window is not Pair";
        } else {
          if (e) throw "glk_window_open: splitwin must be null for first window";
          (a = null), (o = { left: O.outspacingx, top: O.outspacingy, right: O.width - O.outspacingx, bottom: O.height - O.outspacingy });
        }
        switch ((f = ee(r, n)).type) {
          case b.wintype_TextBuffer:
            (f.accum = []), (f.accumstyle = null), (f.accumhyperlink = 0), (f.accum_fg = null), (f.accum_bg = null), (f.accum_reverse = null), (f.content = []), (f.clearcontent = !1), (f.reserve = []), (f.stylehints = $e(Te.buffer));
            break;
          case b.wintype_TextGrid:
            (f.gridwidth = 0), (f.gridheight = 0), (f.lines = []), (f.cursorx = 0), (f.cursory = 0), (f.clearcontent = !1), (f.stylehints = $e(Te.grid));
            break;
          case b.wintype_Graphics:
            if (!l.graphics) return te(f), null;
            (f.content = []), (f.reserve = []);
            break;
          case b.wintype_Blank:
            break;
          case b.wintype_Pair:
            throw "glk_window_open: cannot open pair window directly";
          default:
            return te(f), null;
        }
        return (
          e
            ? (((u = ee(b.wintype_Pair, 0)).pair_dir = t & b.winmethod_DirMask),
              (u.pair_division = t & b.winmethod_DivisionMask),
              (u.pair_key = f),
              (u.pair_keydamage = !1),
              (u.pair_size = i),
              (u.pair_hasborder = (t & b.winmethod_BorderMask) == b.winmethod_Border),
              (u.pair_vertical = u.pair_dir == b.winmethod_Left || u.pair_dir == b.winmethod_Right),
              (u.pair_backward = u.pair_dir == b.winmethod_Left || u.pair_dir == b.winmethod_Above),
              (u.child1 = e),
              (u.child2 = f),
              (e.parent = u),
              (f.parent = u),
              (u.parent = a),
              a ? (a.child1 == e ? (a.child1 = u) : (a.child2 = u)) : (P = u),
              oe(u, o))
            : ((P = f), oe(f, o)),
          f
        );
      },
      glk_window_close: function (e, t) {
        if (!e) throw "glk_window_close: invalid window";
        if (e !== P && e.parent) {
          var i, r, n, l, a, o;
          if (e === (i = e.parent).child1) n = i.child2;
          else {
            if (e !== i.child2) throw "glk_window_close: window tree is corrupted";
            n = i.child1;
          }
          for (
            l = i.bbox,
              (r = i.parent) ? (r.child1 === i ? (r.child1 = n) : (r.child2 = n), (n.parent = r)) : ((P = n), (n.parent = null)),
              we(e.str, t),
              ae(e, !0),
              e === i.child1 ? (i.child1 = null) : e === i.child2 && (i.child2 = null),
              ae(i, !1),
              o = !1,
              a = n;
            a;
            a = a.parent
          )
            a.type == b.wintype_Pair && a.pair_keydamage && ((o = !0), (a.pair_keydamage = !1));
          oe(o ? P : n, l);
        } else (P = null), we(e.str, t), ae(e, !0);
      },
      glk_window_get_size: function (e, t, i) {
        if (!e) throw "glk_window_get_size: invalid window";
        var r,
          n,
          l = 0,
          a = 0;
        switch (e.type) {
          case b.wintype_TextGrid:
            (r = e.bbox.right - e.bbox.left), (n = e.bbox.bottom - e.bbox.top), (l = Math.max(0, Math.floor((r - O.gridmarginx) / O.gridcharwidth))), (a = Math.max(0, Math.floor((n - O.gridmarginy) / O.gridcharheight)));
            break;
          case b.wintype_TextBuffer:
            (r = e.bbox.right - e.bbox.left), (n = e.bbox.bottom - e.bbox.top), (l = Math.max(0, Math.floor((r - O.buffermarginx) / O.buffercharwidth))), (a = Math.max(0, Math.floor((n - O.buffermarginy) / O.buffercharheight)));
            break;
          case b.wintype_Graphics:
            (r = e.bbox.right - e.bbox.left), (n = e.bbox.bottom - e.bbox.top), (l = r - O.graphicsmarginx), (a = n - O.graphicsmarginy);
        }
        t && t.set_value(l), i && i.set_value(a);
      },
      glk_window_set_arrangement: function (e, t, i, r) {
        var n, l, a, o;
        if (!e) throw "glk_window_set_arrangement: invalid window";
        if (e.type != b.wintype_Pair) throw "glk_window_set_arrangement: not a pair window";
        if (r) {
          if (r.type == b.wintype_Pair) throw "glk_window_set_arrangement: keywin cannot be a pair window";
          for (n = r; n && n != e; n = n.parent);
          if (!n) throw "glk_window_set_arrangement: keywin must be a descendant";
        }
        if (((a = (l = t & b.winmethod_DirMask) == b.winmethod_Left || l == b.winmethod_Right), (o = l == b.winmethod_Left || l == b.winmethod_Above), r || (r = e.pair_key), a && !e.pair_vertical))
          throw "glk_window_set_arrangement: split must stay horizontal";
        if (!a && e.pair_vertical) throw "glk_window_set_arrangement: split must stay vertical";
        if (r && r.type == b.wintype_Blank && (t & b.winmethod_DivisionMask) == b.winmethod_Fixed) throw "glk_window_set_arrangement: a blank window cannot have a fixed size";
        ((o && !e.pair_backward) || (!o && e.pair_backward)) && ((n = e.child1), (e.child1 = e.child2), (e.child2 = n)),
          (e.pair_dir = l),
          (e.pair_division = t & b.winmethod_DivisionMask),
          (e.pair_key = r),
          (e.pair_size = i),
          (e.pair_hasborder = (t & b.winmethod_BorderMask) == b.winmethod_Border),
          (e.pair_vertical = e.pair_dir == b.winmethod_Left || e.pair_dir == b.winmethod_Right),
          (e.pair_backward = e.pair_dir == b.winmethod_Left || e.pair_dir == b.winmethod_Above),
          oe(e, e.bbox);
      },
      glk_window_get_arrangement: function (e, t, i, r) {
        if (!e) throw "glk_window_get_arrangement: invalid window";
        if (e.type != b.wintype_Pair) throw "glk_window_get_arrangement: not a pair window";
        i && i.set_value(e.pair_size), r && r.set_value(e.pair_key), t && t.set_value(e.pair_dir | e.pair_division | (e.pair_hasborder ? b.winmethod_Border : b.winmethod_NoBorder));
      },
      glk_window_get_type: function (e) {
        if (!e) throw "glk_window_get_type: invalid window";
        return e.type;
      },
      glk_window_get_parent: function (e) {
        if (!e) throw "glk_window_get_parent: invalid window";
        return e.parent;
      },
      glk_window_clear: function (e) {
        if (!e) throw "glk_window_clear: invalid window";
        if (e.line_request) throw "glk_window_clear: window has pending line request";
        let t = null;
        switch (e.type) {
          case b.wintype_TextBuffer:
            (e.accum.length = 0),
              (e.accumstyle = null),
              (e.accumhyperlink = 0),
              (e.accum_fg = null),
              (e.accum_bg = null),
              (e.accum_reverse = null),
              (e.content.length = 0),
              (e.clearcontent = !0),
              (e.cleared_bg = e.bg),
              (e.cleared_fg = e.fg);
            break;
          case b.wintype_TextGrid:
            (e.cursorx = 0), (e.cursory = 0);
            for (let t = 0; t < e.gridheight; t++) {
              const i = e.lines[t];
              i.dirty = !0;
              for (let t = 0; t < e.gridwidth; t++) (i.chars[t] = " "), (i.styles[t] = b.style_Normal), (i.hyperlinks[t] = 0), (i.fgs[t] = e.fg), (i.bgs[t] = e.bg), (i.reverses[t] = e.reverse);
            }
            (e.clearcontent = !0), (e.cleared_bg = e.bg), (e.cleared_fg = e.fg);
            break;
          case b.wintype_Graphics:
            for (let i = 0; i < e.content.length; i++) "setcolor" == e.content[i].special && (t = e.content[i]);
            (e.content.length = 0), null !== t && e.content.push(t), e.content.push({ special: "fill" });
        }
      },
      glk_window_move_cursor: function (e, t, i) {
        if (!e) throw "glk_window_move_cursor: invalid window";
        if (e.type != b.wintype_TextGrid) throw "glk_window_move_cursor: not a grid window";
        (e.cursorx = t), (e.cursory = i);
      },
      glk_window_get_stream: function (e) {
        if (!e) throw "glk_window_get_stream: invalid window";
        return e.str;
      },
      glk_window_set_echo_stream: function (e, t) {
        if (!e) throw "glk_window_set_echo_stream: invalid window";
        e.echostr = t;
      },
      glk_window_get_echo_stream: function (e) {
        if (!e) throw "glk_window_get_echo_stream: invalid window";
        return e.echostr;
      },
      glk_set_window: function (e) {
        Y = e ? e.str : null;
      },
      glk_window_get_sibling: function (e) {
        if (!e) throw "glk_window_get_sibling: invalid window";
        const t = e.parent;
        if (!t) return null;
        if (e === t.child1) return t.child2;
        if (e === t.child2) return t.child1;
        throw "glk_window_get_sibling: window tree is corrupted";
      },
      glk_stream_iterate: function (e, t) {
        return (e = e ? e.next : Q) ? (t && t.set_value(e.rock), e) : (t && t.set_value(0), null);
      },
      glk_stream_get_rock: function (e) {
        if (!e) throw "glk_stream_get_rock: invalid stream";
        return e.rock;
      },
      glk_stream_open_file: function (e, i, r) {
        if (!e) throw "glk_stream_open_file: invalid fileref";
        var n, l;
        if (i != b.filemode_Read && i != b.filemode_Write && i != b.filemode_ReadWrite && i != b.filemode_WriteAppend) throw "glk_stream_open_file: illegal filemode";
        if (i == b.filemode_Read && !t.file_ref_exists(e.ref)) return null;
        if (t.streaming) {
          if (!(l = t.file_fopen(i, e.ref))) return null;
        } else {
          var a = null;
          if ((i != b.filemode_Write && (a = t.file_read(e.ref)), null == a && ((a = []), i != b.filemode_Read && t.file_write(e.ref, "", !0)), null == a.length)) throw "glk_stream_open_file: data read had no length";
        }
        return (
          ((n = se(R, i != b.filemode_Write, i != b.filemode_Read, r)).unicode = !1),
          (n.isbinary = !e.textmode),
          (n.ref = e.ref),
          (n.origfmode = i),
          t.streaming
            ? ((n.streaming = !0), (n.fstream = l), (n.buffer4 = l.BufferClass.alloc(4)))
            : ((n.streaming = !1), (n.buf = a), (n.buflen = 4294967295), i == b.filemode_Write ? (n.bufeof = 0) : (n.bufeof = a.length), i == b.filemode_WriteAppend ? (n.bufpos = n.bufeof) : (n.bufpos = 0)),
          n
        );
      },
      glk_stream_open_memory: function (e, t, r) {
        var n;
        if (t != b.filemode_Read && t != b.filemode_Write && t != b.filemode_ReadWrite) throw "glk_stream_open_memory: illegal filemode";
        return ((n = se(W, t != b.filemode_Write, t != b.filemode_Read, r)).unicode = !1), e && ((n.buf = e), (n.buflen = e.length), (n.bufpos = 0), t == b.filemode_Write ? (n.bufeof = 0) : (n.bufeof = n.buflen), i && i.retain_array(e)), n;
      },
      glk_stream_close: function (e, i) {
        if (!e) throw "glk_stream_close: invalid stream";
        if (e.type == z) throw "glk_stream_close: cannot close window stream";
        e.type == R && e.writable && (e.streaming || (null !== e.timer_id && (clearTimeout(e.timer_id), (e.timer_id = null)), t.file_write(e.ref, e.buf))), we(e, i), ue(e);
      },
      glk_stream_set_position: function (e, t, i) {
        if (!e) throw "glk_stream_set_position: invalid stream";
        switch (e.type) {
          case R:
            if (e.streaming) {
              e.fstream.fseek(t, i);
              break;
            }
          case A:
          case W:
            i == b.seekmode_Current ? (t = e.bufpos + t) : i == b.seekmode_End && (t = e.bufeof + t), t < 0 && (t = 0), t > e.bufeof && (t = e.bufeof), (e.bufpos = t);
        }
      },
      glk_stream_get_position: function (e) {
        if (!e) throw "glk_stream_get_position: invalid stream";
        switch (e.type) {
          case R:
            if (e.streaming) return e.fstream.ftell();
          case A:
          case W:
            return e.bufpos;
          default:
            return 0;
        }
      },
      glk_stream_set_current: function (e) {
        Y = e;
      },
      glk_stream_get_current: function () {
        return Y;
      },
      glk_fileref_create_temp: function (e, i) {
        var r = e & b.fileusage_TypeMask,
          n = T[r],
          l = t.file_construct_temp_ref(n);
        return de(l.filename, e, i, l);
      },
      glk_fileref_create_by_name: function (e, i, r) {
        return de((i = t.file_clean_fixed_name(i, e & b.fileusage_TypeMask)), e, r, null);
      },
      glk_fileref_create_by_prompt: function (t, i, r) {
        var n,
          l = t & b.fileusage_TypeMask,
          a = T[l];
        switch ((a || (a = "xxx"), i)) {
          case b.filemode_Write:
            n = "write";
            break;
          case b.filemode_ReadWrite:
            n = "readwrite";
            break;
          case b.filemode_WriteAppend:
            n = "writeappend";
            break;
          case b.filemode_Read:
          default:
            n = "read";
        }
        var o = { type: "fileref_prompt", filetype: a, filemode: n },
          s = { usage: t, rock: r };
        return l == b.fileusage_SavedGame && (o.gameid = e.get_signature()), (_ = o), (p = s), (J = null), U;
      },
      glk_fileref_destroy: function (e) {
        if (!e) throw "glk_fileref_destroy: invalid fileref";
        !(function (e) {
          var t, r;
          i && i.class_unregister("fileref", e), (t = e.prev), (r = e.next), (e.prev = null), (e.next = null), t ? (t.next = r) : (H = r), r && (r.prev = t), (e.filename = null), (e.ref = null), (e.rock = null), (e.disprock = null);
        })(e);
      },
      glk_fileref_iterate: function (e, t) {
        return (e = e ? e.next : H) ? (t && t.set_value(e.rock), e) : (t && t.set_value(0), null);
      },
      glk_fileref_get_rock: function (e) {
        if (!e) throw "glk_fileref_get_rock: invalid fileref";
        return e.rock;
      },
      glk_fileref_delete_file: function (e) {
        if (!e) throw "glk_fileref_delete_file: invalid fileref";
        t.file_remove_ref(e.ref);
      },
      glk_fileref_does_file_exist: function (e) {
        if (!e) throw "glk_fileref_does_file_exist: invalid fileref";
        return t.file_ref_exists(e.ref) ? 1 : 0;
      },
      glk_fileref_create_from_fileref: function (e, t, i) {
        if (!t) throw "glk_fileref_create_from_fileref: invalid fileref";
        return de(t.filename, e, i, null);
      },
      glk_put_char: function (e) {
        _e(Y, 255 & e);
      },
      glk_put_char_stream: function (e, t) {
        _e(e, 255 & t);
      },
      glk_put_string: function (e) {
        ye(Y, e, !0);
      },
      glk_put_string_stream: function (e, t) {
        ye(e, t, !0);
      },
      glk_put_buffer: function (e) {
        (e = M(e)), pe(Y, e, !0);
      },
      glk_put_buffer_stream: function (e, t) {
        pe(e, (t = M(t)), !0);
      },
      glk_set_style: function (e) {
        be(Y, e);
      },
      glk_set_style_stream: function (e, t) {
        be(e, t);
      },
      glk_get_char_stream: function (e) {
        if (!e) throw "glk_get_char_stream: invalid stream";
        return ge(e, !1);
      },
      glk_get_line_stream: function (e, t) {
        if (!e) throw "glk_get_line_stream: invalid stream";
        return he(e, t, !1);
      },
      glk_get_buffer_stream: function (e, t) {
        if (!e) throw "glk_get_buffer_stream: invalid stream";
        return me(e, t, !1);
      },
      glk_char_to_lower: function (e) {
        return (e >= 65 && e <= 90) || (e >= 192 && e <= 222 && 215 != e) ? e + 32 : e;
      },
      glk_char_to_upper: function (e) {
        return (e >= 97 && e <= 122) || (e >= 224 && e <= 254 && 247 != e) ? e - 32 : e;
      },
      glk_stylehint_set: function (e, t, i, r) {
        var n;
        i === b.stylehint_Indentation && (n = r + "em"),
          i === b.stylehint_ParaIndentation && (n = r + "em"),
          i === b.stylehint_Justification && (n = ["left", "justify", "center", "right"][r]),
          i === b.stylehint_Size && (n = 1 + 0.1 * r + "em"),
          i === b.stylehint_Weight && (n = ["lighter", "normal", "bold"][r + 1]),
          i === b.stylehint_Oblique && (n = r ? "italic" : "normal"),
          i === b.stylehint_Proportional && (n = r ? "var(--glkote-prop-family)" : "var(--glkote-mono-family)"),
          i === b.stylehint_TextColor && (n = "#" + ("000000" + r.toString(16)).slice(-6)),
          i === b.stylehint_BackColor && (n = "#" + ("000000" + r.toString(16)).slice(-6)),
          i === b.stylehint_ReverseColor && (n = r),
          (e !== b.wintype_AllTypes && e !== b.wintype_TextBuffer) || (Te.buffer[t][qe[i]] = n),
          (e !== b.wintype_AllTypes && e !== b.wintype_TextGrid) || (Te.grid[t][qe[i]] = n);
      },
      glk_stylehint_clear: function (e, t, i) {
        (e !== b.wintype_AllTypes && e !== b.wintype_TextBuffer) || delete Te.buffer[t][qe[i]], (e !== b.wintype_AllTypes && e !== b.wintype_TextGrid) || delete Te.grid[t][qe[i]];
      },
      glk_style_distinguish: function () {
        return 0;
      },
      glk_style_measure: function (e, t, i, r) {
        return r && r.set_value(0), 0;
      },
      glk_select: function (e) {
        return (J = e), U;
      },
      glk_select_poll: function (e) {
        e.set_field(0, b.evtype_None), e.set_field(1, null), e.set_field(2, 0), e.set_field(3, 0), K && Date.now() - X > K && ((X = Date.now()), (Z = null), e.set_field(0, b.evtype_Timer));
      },
      glk_request_line_event: function (e, t, r) {
        if (!e) throw "glk_request_line_event: invalid window";
        if (e.char_request || e.line_request) throw "glk_request_line_event: window already has keyboard request";
        if (e.type != b.wintype_TextBuffer && e.type != b.wintype_TextGrid) throw "glk_request_line_event: window does not support keyboard input";
        if (r) {
          var n = t.slice(0, r);
          m || (m = {}), (m[e.disprock] = I(n));
        }
        (e.line_request = !0),
          (e.line_request_uni = !1),
          e.type == b.wintype_TextBuffer ? (e.request_echo_line_input = e.echo_line_input) : (e.request_echo_line_input = !0),
          (e.input_generation = g),
          (e.linebuf = t),
          i && i.retain_array(t);
      },
      glk_cancel_line_event: function (e, t) {
        if (!e) throw "glk_cancel_line_event: invalid window";
        if (e.line_request) {
          var r,
            n,
            l = "";
          for (
            h && (n = h[e.disprock]) && (l = n),
              l.length > e.linebuf.length && (l = l.slice(0, e.linebuf.length)),
              e.request_echo_line_input && ((r = e.style), be(e.str, b.style_Input), ie(e, l), e.echostr && ye(e.echostr, l), be(e.str, r), ie(e, "\n"), e.echostr && ye(e.echostr, "\n")),
              r = 0;
            r < l.length;
            r++
          )
            e.linebuf[r] = l.charCodeAt(r);
          t && (t.set_field(0, b.evtype_LineInput), t.set_field(1, e), t.set_field(2, l.length), t.set_field(3, 0)),
            i && i.unretain_array(e.linebuf),
            (e.line_request = !1),
            (e.line_request_uni = !1),
            (e.request_echo_line_input = null),
            (e.input_generation = null),
            (e.linebuf = null);
        } else t && (t.set_field(0, b.evtype_None), t.set_field(1, null), t.set_field(2, 0), t.set_field(3, 0));
      },
      glk_request_char_event: function (e) {
        if (!e) throw "glk_request_char_event: invalid window";
        if (e.char_request || e.line_request) throw "glk_request_char_event: window already has keyboard request";
        if (e.type != b.wintype_TextBuffer && e.type != b.wintype_TextGrid) throw "glk_request_char_event: window does not support keyboard input";
        (e.char_request = !0), (e.char_request_uni = !1), (e.input_generation = g);
      },
      glk_cancel_char_event: function (e) {
        if (!e) throw "glk_cancel_char_event: invalid window";
        (e.char_request = !1), (e.char_request_uni = !1);
      },
      glk_request_mouse_event: function (e) {
        if (!e) throw "glk_request_mouse_event: invalid window";
        (e.type != b.wintype_TextGrid && e.type != b.wintype_Graphics) || (e.mouse_request = !0);
      },
      glk_cancel_mouse_event: function (e) {
        if (!e) throw "glk_cancel_mouse_event: invalid window";
        e.mouse_request = !1;
      },
      glk_request_timer_events: De,
      glk_image_get_info: function (e, t, i) {
        if (!r || !r.get_image_info) return null;
        var n = r.get_image_info(e);
        return n ? (t && t.set_value(n.width), i && i.set_value(n.height), 1) : (t && t.set_value(0), i && i.set_value(0), 0);
      },
      glk_image_draw: function (e, t, i, n) {
        if (!e) throw "glk_image_draw: invalid window";
        if (!r || !r.get_image_info) return 0;
        var l = r.get_image_info(t);
        if (!l) return 0;
        var a = { special: "image", image: t, url: l.url, alttext: l.alttext, width: l.width, height: l.height };
        switch (e.type) {
          case b.wintype_TextBuffer:
            var o = "inlineup";
            switch (i) {
              case b.imagealign_InlineUp:
                o = "inlineup";
                break;
              case b.imagealign_InlineDown:
                o = "inlinedown";
                break;
              case b.imagealign_InlineCenter:
                o = "inlinecenter";
                break;
              case b.imagealign_MarginLeft:
                o = "marginleft";
                break;
              case b.imagealign_MarginRight:
                o = "marginright";
            }
            return (a.alignment = o), e.hyperlink && (a.hyperlink = e.hyperlink), le(e, a), 1;
          case b.wintype_Graphics:
            return (a.x = i), (a.y = n), e.content.push(a), 1;
        }
        return 0;
      },
      glk_image_draw_scaled: function (e, t, i, n, l, a) {
        if (!e) throw "glk_image_draw_scaled: invalid window";
        if (!r || !r.get_image_info) return 0;
        var o = r.get_image_info(t);
        if (!o) return 0;
        var s = { special: "image", image: t, url: o.url, alttext: o.alttext, width: l, height: a };
        switch (e.type) {
          case b.wintype_TextBuffer:
            var u = "inlineup";
            switch (i) {
              case b.imagealign_InlineUp:
                u = "inlineup";
                break;
              case b.imagealign_InlineDown:
                u = "inlinedown";
                break;
              case b.imagealign_InlineCenter:
                u = "inlinecenter";
                break;
              case b.imagealign_MarginLeft:
                u = "marginleft";
                break;
              case b.imagealign_MarginRight:
                u = "marginright";
            }
            return (s.alignment = u), e.hyperlink && (s.hyperlink = e.hyperlink), le(e, s), 1;
          case b.wintype_Graphics:
            return (s.x = i), (s.y = n), e.content.push(s), 1;
        }
        return 0;
      },
      glk_window_flow_break: function (e) {
        if (!e) throw "glk_window_flow_break: invalid window";
        e.type == b.wintype_TextBuffer && le(e, void 0, !0);
      },
      glk_window_erase_rect: function (e, t, i, r, n) {
        if (!e) throw "glk_window_erase_rect: invalid window";
        if (e.type != b.wintype_Graphics) throw "glk_window_erase_rect: not a graphics window";
        e.content.push({ special: "fill", x: t, y: i, width: r, height: n });
      },
      glk_window_fill_rect: function (e, t, i, r, n, l) {
        if (!e) throw "glk_window_fill_rect: invalid window";
        if (e.type != b.wintype_Graphics) throw "glk_window_fill_rect: not a graphics window";
        var a = Ge(t);
        e.content.push({ special: "fill", color: a, x: i, y: r, width: n, height: l });
      },
      glk_window_set_background_color: function (e, t) {
        if (!e) throw "glk_window_set_background_color: invalid window";
        if (e.type != b.wintype_Graphics) throw "glk_window_set_background_color: not a graphics window";
        var i = Ge(t);
        e.content.push({ special: "setcolor", color: i });
      },
      glk_schannel_iterate: function (e, t) {
        return (e = e ? e.next : null) ? (t && t.set_value(e.rock), e) : (t && t.set_value(0), null);
      },
      glk_schannel_get_rock: function (e) {
        if (!e) throw "glk_schannel_get_rock: invalid schannel";
        return e.rock;
      },
      glk_schannel_create: function () {
        return null;
      },
      glk_schannel_destroy: function () {
        throw "glk_schannel_destroy: invalid schannel";
      },
      glk_schannel_play: function () {
        throw "glk_schannel_play: invalid schannel";
      },
      glk_schannel_play_ext: function () {
        throw "glk_schannel_play_ext: invalid schannel";
      },
      glk_schannel_stop: function () {
        throw "glk_schannel_stop: invalid schannel";
      },
      glk_schannel_set_volume: function () {
        throw "glk_schannel_set_volume: invalid schannel";
      },
      glk_schannel_create_ext: function () {
        return null;
      },
      glk_schannel_play_multi: function () {
        throw "glk_schannel_play_multi: invalid schannel";
      },
      glk_schannel_pause: function () {
        throw "glk_schannel_pause: invalid schannel";
      },
      glk_schannel_unpause: function () {
        throw "glk_schannel_unpause: invalid schannel";
      },
      glk_schannel_set_volume_ext: function () {
        throw "glk_schannel_set_volume_ext: invalid schannel";
      },
      glk_sound_load_hint: function () {},
      glk_set_hyperlink: function (e) {
        ve(Y, e);
      },
      glk_set_hyperlink_stream: function (e, t) {
        ve(e, t);
      },
      glk_request_hyperlink_event: function (e) {
        if (!e) throw "glk_request_hyperlink_event: invalid window";
        (e.type != b.wintype_TextBuffer && e.type != b.wintype_TextGrid) || (e.hyperlink_request = !0);
      },
      glk_cancel_hyperlink_event: function (e) {
        if (!e) throw "glk_cancel_hyperlink_event: invalid window";
        (e.type != b.wintype_TextBuffer && e.type != b.wintype_TextGrid) || (e.hyperlink_request = !1);
      },
      glk_buffer_to_lower_case_uni: function (e, t) {
        var i,
          r,
          n,
          l,
          a,
          o = e.length,
          s = e.slice(0, t);
        if (o < t) throw "buffer_to_lower_case_uni: numchars exceeds array length";
        for (n = 0, i = 0; i < t; i++)
          if (((a = s[i]), void 0 === (l = q[a]))) (e[n] = a), n++;
          else if (l instanceof Array) for (r = 0; r < l.length; r++) (e[n] = l[r]), n++;
          else (e[n] = l), n++;
        return (e.length = o), n;
      },
      glk_buffer_to_upper_case_uni: function (e, t) {
        var i,
          r,
          n,
          l,
          a,
          o = e.length,
          s = e.slice(0, t);
        if (o < t) throw "buffer_to_upper_case_uni: numchars exceeds array length";
        for (n = 0, i = 0; i < t; i++)
          if (((a = s[i]), void 0 === (l = $[a]))) (e[n] = a), n++;
          else if (l instanceof Array) for (r = 0; r < l.length; r++) (e[n] = l[r]), n++;
          else (e[n] = l), n++;
        return (e.length = o), n;
      },
      glk_buffer_to_title_case_uni: function (e, t, i) {
        var r,
          n,
          l,
          a,
          o,
          s = e.length,
          u = e.slice(0, t);
        if (s < t) throw "buffer_to_title_case_uni: numchars exceeds array length";
        if (((l = 0), 0 == t)) return 0;
        if (((o = u[(r = 0)]), void 0 === (a = C[o]) && (a = $[o]), void 0 === a)) (e[l] = o), l++;
        else if (a instanceof Array) for (n = 0; n < a.length; n++) (e[l] = a[n]), l++;
        else (e[l] = a), l++;
        if (i)
          for (r = 1; r < t; r++)
            if (((o = u[r]), void 0 === (a = q[o]))) (e[l] = o), l++;
            else if (a instanceof Array) for (n = 0; n < a.length; n++) (e[l] = a[n]), l++;
            else (e[l] = a), l++;
        else for (r = 1; r < t; r++) (o = u[r]), (e[l] = o), l++;
        return (e.length = s), l;
      },
      glk_buffer_canon_decompose_uni: function (e, t) {
        var i,
          r = e.length;
        return (i = Me(e, t)), (e.length = r), i;
      },
      glk_buffer_canon_normalize_uni: function (e, t) {
        var i,
          r = e.length;
        return (
          (i = (function (e, t) {
            var i, r, n, l, a, o, s, u;
            if (0 == t) return 0;
            for (u = 0, n = e[0], (a = D[n]) && (a = 999), r = i = 1; ; ) {
              if (r >= t) {
                (e[u] = n), (u = i);
                break;
              }
              (l = e[r]), (o = D[l]), void 0 !== (s = G[n]) && void 0 !== s[l] && (!a || (o && a < o)) ? ((n = s[l]), (e[u] = n)) : (o || ((u = i), (n = l)), (a = o), (e[i] = l), i++), r++;
            }
            return u;
          })(e, (i = Me(e, t)))),
          (e.length = r),
          i
        );
      },
      glk_put_char_uni: function (e) {
        _e(Y, e);
      },
      glk_put_string_uni: function (e) {
        ye(Y, e, !1);
      },
      glk_put_buffer_uni: function (e) {
        pe(Y, e, !1);
      },
      glk_put_char_stream_uni: function (e, t) {
        _e(e, t);
      },
      glk_put_string_stream_uni: function (e, t) {
        ye(e, t, !1);
      },
      glk_put_buffer_stream_uni: function (e, t) {
        pe(e, t, !1);
      },
      glk_get_char_stream_uni: function (e) {
        if (!e) throw "glk_get_char_stream_uni: invalid stream";
        return ge(e, !0);
      },
      glk_get_buffer_stream_uni: function (e, t) {
        if (!e) throw "glk_get_buffer_stream_uni: invalid stream";
        return me(e, t, !0);
      },
      glk_get_line_stream_uni: function (e, t) {
        if (!e) throw "glk_get_line_stream_uni: invalid stream";
        return he(e, t, !0);
      },
      glk_stream_open_file_uni: function (e, i, r) {
        if (!e) throw "glk_stream_open_file_uni: invalid fileref";
        var n, l;
        if (i != b.filemode_Read && i != b.filemode_Write && i != b.filemode_ReadWrite && i != b.filemode_WriteAppend) throw "glk_stream_open_file_uni: illegal filemode";
        if (i == b.filemode_Read && !t.file_ref_exists(e.ref)) return null;
        if (t.streaming) {
          if (!(l = t.file_fopen(i, e.ref))) return null;
        } else {
          var a = null;
          if ((i != b.filemode_Write && (a = t.file_read(e.ref)), null == a && ((a = []), i != b.filemode_Read && t.file_write(e.ref, "", !0)), null == a.length)) throw "glk_stream_open_file_uni: data read had no length";
        }
        return (
          ((n = se(R, i != b.filemode_Write, i != b.filemode_Read, r)).unicode = !0),
          (n.isbinary = !e.textmode),
          (n.ref = e.ref),
          (n.origfmode = i),
          t.streaming
            ? ((n.streaming = !0), (n.fstream = l), (n.buffer4 = l.BufferClass.alloc(4)))
            : ((n.streaming = !1), (n.buf = a), (n.buflen = 4294967295), i == b.filemode_Write ? (n.bufeof = 0) : (n.bufeof = a.length), i == b.filemode_WriteAppend ? (n.bufpos = n.bufeof) : (n.bufpos = 0)),
          n
        );
      },
      glk_stream_open_memory_uni: function (e, t, r) {
        var n;
        if (t != b.filemode_Read && t != b.filemode_Write && t != b.filemode_ReadWrite) throw "glk_stream_open_memory: illegal filemode";
        return ((n = se(W, t != b.filemode_Write, t != b.filemode_Read, r)).unicode = !0), e && ((n.buf = e), (n.buflen = e.length), (n.bufpos = 0), t == b.filemode_Write ? (n.bufeof = 0) : (n.bufeof = n.buflen), i && i.retain_array(e)), n;
      },
      glk_request_char_event_uni: function (e) {
        if (!e) throw "glk_request_char_event: invalid window";
        if (e.char_request || e.line_request) throw "glk_request_char_event: window already has keyboard request";
        if (e.type != b.wintype_TextBuffer && e.type != b.wintype_TextGrid) throw "glk_request_char_event: window does not support keyboard input";
        (e.char_request = !0), (e.char_request_uni = !0), (e.input_generation = g);
      },
      glk_request_line_event_uni: function (e, t, r) {
        if (!e) throw "glk_request_line_event: invalid window";
        if (e.char_request || e.line_request) throw "glk_request_line_event: window already has keyboard request";
        if (e.type != b.wintype_TextBuffer && e.type != b.wintype_TextGrid) throw "glk_request_line_event: window does not support keyboard input";
        if (r) {
          var n = t.slice(0, r);
          m || (m = {}), (m[e.disprock] = j(n));
        }
        (e.line_request = !0),
          (e.line_request_uni = !0),
          e.type == b.wintype_TextBuffer ? (e.request_echo_line_input = e.echo_line_input) : (e.request_echo_line_input = !0),
          (e.input_generation = g),
          (e.linebuf = t),
          i && i.retain_array(t);
      },
      glk_set_echo_line_event: function (e, t) {
        if (!e) throw "glk_set_echo_line_event: invalid window";
        e.echo_line_input = 0 != t;
      },
      glk_set_terminators_line_event: function (e, t) {
        if (!e) throw "glk_set_terminators_line_event: invalid window";
        if (null === k) {
          k = {};
          for (let e in v) k[v[e]] = e;
        }
        const i = [];
        if (t)
          for (let e = 0; e < t.length; e++) {
            const r = k[t[e]];
            r && i.push(r);
          }
        e.line_input_terminators = i;
      },
      glk_current_time: function (e) {
        var t,
          i = new Date().getTime();
        e.set_field(0, Math.floor(i / 4294967296e3)), e.set_field(1, Math.floor(i / 1e3) >>> 0), (t = Math.floor((i % 1e3) * 1e3)) < 0 && (t = 1e6 + t), e.set_field(2, t);
      },
      glk_current_simple_time: function (e) {
        var t = new Date().getTime();
        return Math.floor(t / (1e3 * e));
      },
      glk_time_to_date_utc: function (e, t) {
        var i = 4294967296e3 * e.get_field(0) + 1e3 * e.get_field(1) + e.get_field(2) / 1e3,
          r = new Date(i);
        t.set_field(0, r.getUTCFullYear()),
          t.set_field(1, 1 + r.getUTCMonth()),
          t.set_field(2, r.getUTCDate()),
          t.set_field(3, r.getUTCDay()),
          t.set_field(4, r.getUTCHours()),
          t.set_field(5, r.getUTCMinutes()),
          t.set_field(6, r.getUTCSeconds()),
          t.set_field(7, 1e3 * r.getUTCMilliseconds());
      },
      glk_time_to_date_local: function (e, t) {
        var i = 4294967296e3 * e.get_field(0) + 1e3 * e.get_field(1) + e.get_field(2) / 1e3,
          r = new Date(i);
        t.set_field(0, r.getFullYear()),
          t.set_field(1, 1 + r.getMonth()),
          t.set_field(2, r.getDate()),
          t.set_field(3, r.getDay()),
          t.set_field(4, r.getHours()),
          t.set_field(5, r.getMinutes()),
          t.set_field(6, r.getSeconds()),
          t.set_field(7, 1e3 * r.getMilliseconds());
      },
      glk_simple_time_to_date_utc: function (e, t, i) {
        var r = new Date(e * (1e3 * t));
        i.set_field(0, r.getUTCFullYear()),
          i.set_field(1, 1 + r.getUTCMonth()),
          i.set_field(2, r.getUTCDate()),
          i.set_field(3, r.getUTCDay()),
          i.set_field(4, r.getUTCHours()),
          i.set_field(5, r.getUTCMinutes()),
          i.set_field(6, r.getUTCSeconds()),
          i.set_field(7, 1e3 * r.getUTCMilliseconds());
      },
      glk_simple_time_to_date_local: function (e, t, i) {
        var r = new Date(e * (1e3 * t));
        i.set_field(0, r.getFullYear()),
          i.set_field(1, 1 + r.getMonth()),
          i.set_field(2, r.getDate()),
          i.set_field(3, r.getDay()),
          i.set_field(4, r.getHours()),
          i.set_field(5, r.getMinutes()),
          i.set_field(6, r.getSeconds()),
          i.set_field(7, 1e3 * r.getMilliseconds());
      },
      glk_date_to_time_utc: function (e, t) {
        var i = new Date(0);
        i.setUTCFullYear(e.get_field(0)),
          i.setUTCMonth(e.get_field(1) - 1),
          i.setUTCDate(e.get_field(2)),
          i.setUTCHours(e.get_field(4)),
          i.setUTCMinutes(e.get_field(5)),
          i.setUTCSeconds(e.get_field(6)),
          i.setUTCMilliseconds(e.get_field(7) / 1e3);
        var r,
          n = i.getTime();
        t.set_field(0, Math.floor(n / 4294967296e3)), t.set_field(1, Math.floor(n / 1e3) >>> 0), (r = Math.floor((n % 1e3) * 1e3)) < 0 && (r = 1e6 + r), t.set_field(2, r);
      },
      glk_date_to_time_local: function (e, t) {
        var i,
          r = new Date(e.get_field(0), e.get_field(1) - 1, e.get_field(2), e.get_field(4), e.get_field(5), e.get_field(6), e.get_field(7) / 1e3).getTime();
        t.set_field(0, Math.floor(r / 4294967296e3)), t.set_field(1, Math.floor(r / 1e3) >>> 0), (i = Math.floor((r % 1e3) * 1e3)) < 0 && (i = 1e6 + i), t.set_field(2, i);
      },
      glk_date_to_simple_time_utc: function (e, t) {
        var i = new Date(0);
        i.setUTCFullYear(e.get_field(0)),
          i.setUTCMonth(e.get_field(1) - 1),
          i.setUTCDate(e.get_field(2)),
          i.setUTCHours(e.get_field(4)),
          i.setUTCMinutes(e.get_field(5)),
          i.setUTCSeconds(e.get_field(6)),
          i.setUTCMilliseconds(e.get_field(7) / 1e3);
        var r = i.getTime();
        return Math.floor(r / (1e3 * t));
      },
      glk_date_to_simple_time_local: function (e, t) {
        var i = new Date(e.get_field(0), e.get_field(1) - 1, e.get_field(2), e.get_field(4), e.get_field(5), e.get_field(6), e.get_field(7) / 1e3).getTime();
        return Math.floor(i / (1e3 * t));
      },
      glk_stream_open_resource: function (e, t) {
        var i;
        if (!r || !r.find_data_chunk) return null;
        var n = r.find_data_chunk(e);
        if (!n) return null;
        var l = n.data,
          a = "BINA" == n.type;
        return ((i = se(A, !0, !1, t)).unicode = !1), (i.isbinary = a), (i.resfilenum = e), (i.streaming = !1), l && ((i.buf = l), (i.buflen = l.length), (i.bufpos = 0), (i.bufeof = i.buflen)), i;
      },
      glk_stream_open_resource_uni: function (e, t) {
        var i;
        if (!r || !r.find_data_chunk) return null;
        var n = r.find_data_chunk(e);
        if (!n) return null;
        var l = n.data,
          a = "BINA" == n.type;
        return ((i = se(A, !0, !1, t)).unicode = !0), (i.isbinary = a), (i.resfilenum = e), (i.streaming = !1), l && ((i.buf = l), (i.buflen = l.length), (i.bufpos = 0), (i.bufeof = i.buflen)), i;
      },
      garglk_set_zcolors: function (e, t) {
        Ce(Y, e, t);
      },
      garglk_set_zcolors_stream: Ce,
      garglk_set_reversevideo: function (e) {
        Se(Y, e);
      },
      garglk_set_reversevideo_stream: Se,
    };
  })(),
  GlkOte = (function () {
    let e = null,
      t = null;
    var i = null,
      r = void 0,
      n = "windowport",
      l = "gameport",
      a = 0,
      o = -1,
      s = !1,
      u = null,
      f = !1,
      c = null,
      d = null,
      _ = null,
      p = 0,
      g = 0,
      h = 0,
      m = [],
      w = null,
      y = null,
      b = null,
      v = null,
      k = !1,
      x = null,
      T = null,
      q = 8,
      C = 9,
      S = 27,
      D = 37,
      G = 38,
      M = 39,
      I = 40,
      j = 36,
      B = 35,
      L = 33,
      U = 34,
      R = { escape: S, func1: 112, func2: 113, func3: 114, func4: 115, func5: 116, func6: 117, func7: 118, func8: 119, func9: 120, func10: 121, func11: 122, func12: 123 },
      z = {},
      W = !1,
      A = null,
      N = null,
      F = null,
      P = {},
      E = {};
    const O = ["normal", "emphasized", "preformatted", "header", "subheader", "alert", "note", "blockquote", "input", "user1", "user2"],
      Q = { normal: 0, emphasized: 1, preformatted: 2, header: 3, subheader: 4, alert: 5, note: 6, blockquote: 7, input: 8, user1: 9, user2: 10 },
      H = $("body");
    function Y() {
      var e,
        t,
        n,
        a,
        o,
        s = {},
        u = $("#" + l, r);
      if (!u.length) return "Cannot find gameport element #" + l + " in this document.";
      $("#layouttestpane", r).remove(), (s.width = u.width()), (s.height = u.height()), (s.width = u.width()), (s.height = u.height());
      var f = $("<div>", { id: "layout_test_pane" });
      f.text("This should not be visible"), f.css({ position: "absolute", visibility: "hidden", left: "-1000px" });
      var c = $("<div>");
      c.append($("<span>", { class: "Style_normal" }).text("12345678"));
      var d = $("<div>", { class: "WindowFrame GridWindow" }),
        _ = c.clone().addClass("GridLine").appendTo(d),
        p = c.clone().addClass("GridLine").appendTo(d),
        g = _.children("span");
      f.append(d);
      var h = $("<div>", { class: "WindowFrame BufferWindow" }),
        m = c.clone().addClass("BufferLine").appendTo(h),
        w = c.clone().addClass("BufferLine").appendTo(h),
        y = m.children("span");
      f.append(h);
      var b = $("<div>", { class: "WindowFrame GraphicsWindow" }),
        v = $("<canvas>");
      v.attr("width", 64), v.attr("height", 32), b.append(v), f.append(b), u.append(f);
      var k = function (e) {
        return { width: e.outerWidth(), height: e.outerHeight() };
      };
      return (
        (e = k(d)),
        (a = k(g)),
        (t = k(_)),
        (n = k(p)),
        (s.gridcharheight = p.position().top - _.position().top),
        (s.gridcharwidth = g.width() / 8),
        (s.gridmarginx = e.width - a.width),
        (s.gridmarginy = e.height - (t.height + n.height)),
        (e = k(h)),
        (a = k(y)),
        (t = k(m)),
        (n = k(w)),
        (s.buffercharheight = w.position().top - m.position().top),
        (s.buffercharwidth = y.width() / 8),
        (s.buffermarginx = e.width - a.width),
        (s.buffermarginy = e.height - (t.height + n.height)),
        (e = k(b)),
        (o = k(v)),
        (s.graphicsmarginx = e.width - o.width),
        (s.graphicsmarginy = e.height - o.height),
        f.remove(),
        (s.outspacingx = 0),
        (s.outspacingy = 0),
        (s.inspacingx = 0),
        (s.inspacingy = 0),
        null != i.spacing && ((s.outspacingx = i.spacing), (s.outspacingy = i.spacing), (s.inspacingx = i.spacing), (s.inspacingy = i.spacing)),
        null != i.outspacing && ((s.outspacingx = i.outspacing), (s.outspacingy = i.outspacing)),
        null != i.inspacing && ((s.inspacingx = i.inspacing), (s.inspacingy = i.inspacing)),
        null != i.inspacingx && (s.inspacingx = i.inspacingx),
        null != i.inspacingy && (s.inspacingy = i.inspacingy),
        null != i.outspacingx && (s.outspacingx = i.outspacingx),
        null != i.outspacingy && (s.outspacingy = i.outspacingy),
        s
      );
    }
    function J(e) {
      var t, i;
      if (e) {
        if (null == (i = c[e.id])) {
          const o = "window" + e.id;
          var l;
          (i = { id: e.id, type: e.type, rock: e.rock }), (c[e.id] = i), "grid" == i.type && (l = "GridWindow"), "buffer" == i.type && (l = "BufferWindow"), "graphics" == i.type && (l = "GraphicsWindow");
          var a = "WindowRock_" + e.rock;
          (t = $("<div>", { id: o, class: "WindowFrame " + l + " " + a })).data("winid", e.id),
            t.on("mousedown", e.id, be),
            "buffer" == i.type && t.on("scroll", e.id, Se),
            ("grid" != i.type && "graphics" != i.type) || t.on("click", i.id, ve),
            "buffer" == i.type && t.attr({ "aria-live": "polite", "aria-atomic": "false", "aria-relevant": "additions" }),
            (i.frameel = t),
            (i.gridheight = 0),
            (i.gridwidth = 0),
            (i.input = null),
            (i.inputel = null),
            (i.terminators = {}),
            (i.reqhyperlink = !1),
            (i.reqmouse = !1),
            (i.needscroll = !1),
            (i.needspaging = !1),
            (i.topunseen = 0),
            (i.pagefrommark = 0),
            (i.coords = { left: null, top: null, right: null, bottom: null }),
            (i.history = new Array()),
            (i.historypos = 0),
            e.stylehints && ((i.stylehints = e.stylehints), te(i, t)),
            $("#" + n, r).append(t);
        } else (t = i.frameel), i.type != e.type && ne("Window " + e.id + " was created with type " + i.type + ", but now is described as type " + e.type);
        if (((i.inplace = !0), "grid" == i.type)) {
          if (e.gridheight > i.gridheight)
            for (let t = i.gridheight; t < e.gridheight; t++) {
              const e = $("<div>", { id: "win" + i.id + "_ln" + t, class: "GridLine" });
              e.append(" "), i.frameel.append(e);
            }
          if (e.gridheight < i.gridheight)
            for (let t = e.gridheight; t < i.gridheight; t++) {
              const e = $("#win" + i.id + "_ln" + t, r);
              e.length && e.remove();
            }
          (i.gridheight = e.gridheight), (i.gridwidth = e.gridwidth);
        }
        if ((i.type, "graphics" == i.type)) {
          var o = $("#win" + i.id + "_canvas", r);
          if (o.length) {
            if (i.graphwidth != e.graphwidth || i.graphheight != e.graphheight) {
              (i.graphwidth = e.graphwidth),
                (i.graphheight = e.graphheight),
                o.attr("width", i.graphwidth * i.scaleratio),
                o.attr("height", i.graphheight * i.scaleratio),
                o.css("width", i.graphwidth + "px"),
                o.css("height", i.graphheight + "px");
              let t = ue(o);
              t && (t.setTransform(i.scaleratio, 0, 0, i.scaleratio, 0, 0), (t.fillStyle = i.defcolor), t.fillRect(0, 0, i.graphwidth, i.graphheight), (t.fillStyle = "#000000")), i.frameel.css("background-color", i.defcolor);
              var s = i.id;
              ce(function () {
                me(s);
              });
            }
          } else {
            (i.graphwidth = e.graphwidth), (i.graphheight = e.graphheight), (i.defcolor = "#FFF"), (o = $("<canvas>", { id: "win" + i.id + "_canvas" })), (i.backpixelratio = 1);
            let t = ue(o);
            t && (i.backpixelratio = t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1),
              (i.scaleratio = _ / i.backpixelratio),
              o.attr("width", i.graphwidth * i.scaleratio),
              o.attr("height", i.graphheight * i.scaleratio),
              o.css("width", i.graphwidth + "px"),
              o.css("height", i.graphheight + "px"),
              i.frameel.css("background-color", i.defcolor),
              t && t.setTransform(i.scaleratio, 0, 0, i.scaleratio, 0, 0),
              i.frameel.append(o);
          }
        }
        var u;
        ie(i, e.bg, e.fg);
        var f = d.width - (e.left + e.width),
          p = d.height - (e.top + e.height);
        (u = { left: e.left + "px", top: e.top + "px", right: f + "px", bottom: p + "px" }), (i.coords.left = e.left), (i.coords.top = e.top), (i.coords.right = f), (i.coords.bottom = p), t.css(u);
      }
    }
    function V(e) {
      e.frameel.remove(), delete c[e.id], (e.frameel = null);
      var t = $("#win" + e.id + "_moreprompt", r);
      t.length && t.remove();
    }
    function K(e) {
      var i = c[e.id];
      if (null != i)
        if (i.input && "line" == i.input.type) ne("Got content update for window " + e.id + ", which is awaiting line input.");
        else {
          if (((i.needscroll = !0), "grid" == i.type)) {
            e.clear && ie(i, e.bg, e.fg);
            var n = e.lines;
            for (let t = 0; t < n.length; t++) {
              var l = n[t],
                a = l.line,
                o = l.content,
                s = $("#win" + i.id + "_ln" + a, r);
              if (s.length)
                if (o && o.length) {
                  s.empty();
                  for (let e = 0; e < o.length; e++) {
                    var u,
                      f,
                      _,
                      p = o[e],
                      g = null,
                      h = null,
                      w = 0;
                    if ("object" === jQuery.type(p)) {
                      if (((i.lastrdesc = p), void 0 !== p.special)) continue;
                      (u = p.style), (f = p.text), (_ = p.hyperlink), (g = p.fg), (h = p.bg), (w = p.reverse);
                    } else (u = p), e++, (f = o[e]), (_ = void 0);
                    let t = "Style_" + u;
                    (w = w || (i.stylehints && i.stylehints[Q[u]].reverse)) && (t += " reverse");
                    var y = $("<span>", { class: t });
                    if (g || h) {
                      const e = {};
                      g && (e[w ? "background-color" : "color"] = g), h && (e[w ? "color" : "background-color"] = h), y.css(e);
                    }
                    if (_) {
                      var b = $("<a>", { href: "#", class: "Internal" });
                      b.text(f), b.on("click", De(i.id, _)), y.append(b);
                    } else se(y, f);
                    s.append(y);
                  }
                } else s.text(" ");
              else ne("Got content for nonexistent line " + a + " of window " + e.id + ".");
            }
            $("#window" + i.id).toggleClass("reverse", 0 === $(`#window${i.id} span:not(.reverse)`).length);
          }
          if ("buffer" == i.type) {
            var v = e.text;
            i.inputel && i.inputel.detach();
            var k = $("#win" + i.id + "_cursor", r);
            k.length && k.remove(), (k = null), e.clear && (i.frameel.empty(), (i.topunseen = 0), (i.pagefrommark = 0), (i.lastrdesc = null), ie(i, e.bg, e.fg)), void 0 === v && (v = []);
            for (let e = 0; e < v.length; e++) {
              var x = v[e];
              const r = x.content;
              let n = null;
              if (x.append) {
                if (!r || !r.length) continue;
                n = X(i);
              }
              if (
                (null == n && ((n = $("<div>", { class: "BufferLine" })), n.data("blankpara", !0), r && r[0] && n.addClass("Style_" + ("string" == typeof r[0] ? r[0] : r[0].style)), i.frameel.append(n)),
                x.flowbreak && n.addClass("FlowBreak"),
                r && r.length)
              ) {
                n.data("blankpara") && (n.data("blankpara", !1), n.empty());
                for (let e = 0; e < r.length; e++) {
                  const l = r[e];
                  let a,
                    o,
                    s,
                    u = null,
                    f = null,
                    c = 0;
                  if ("object" === jQuery.type(l)) {
                    if (((i.lastrdesc = l), void 0 !== l.special)) {
                      if ("image" == l.special) {
                        var T = l.url;
                        if (t && t.get_image_url) {
                          var q = t.get_image_url(l.image);
                          q && (T = q);
                        }
                        let e = $("<img>", { src: T, width: "" + l.width, height: "" + l.height });
                        switch ((l.alttext ? e.attr("alt", l.alttext) : e.attr("alt", "Image " + l.image), l.alignment)) {
                          case "inlineup":
                            e.addClass("ImageInlineUp");
                            break;
                          case "inlinedown":
                            e.addClass("ImageInlineDown");
                            break;
                          case "inlinecenter":
                            e.addClass("ImageInlineCenter");
                            break;
                          case "marginleft":
                            e.addClass("ImageMarginLeft");
                            break;
                          case "marginright":
                            e.addClass("ImageMarginRight");
                            break;
                          default:
                            e.addClass("ImageInlineUp");
                        }
                        if (null != l.hyperlink) {
                          const t = $("<a>", { href: "#", class: "Internal" });
                          t.append(e), t.on("click", De(i.id, l.hyperlink)), (e = t);
                        }
                        n.append(e);
                        continue;
                      }
                      re("Unknown special entry in line data: " + l.special);
                      continue;
                    }
                    (a = l.style), (o = l.text), (s = l.hyperlink), (u = l.fg), (f = l.bg), (c = l.reverse);
                  } else (a = l), e++, (o = r[e]), (s = void 0);
                  c = c || (i.stylehints && i.stylehints[Q[a]].reverse);
                  let d = "Style_" + a;
                  c && (d += " reverse");
                  let _ = $("<span>", { class: d });
                  if (u || f) {
                    const e = {};
                    u && (e[c ? "background-color" : "color"] = u), f && (e[c ? "color" : "background-color"] = f), _.css(e);
                  }
                  if (s) {
                    const e = $("<a>", { href: "#", class: "Internal" });
                    e.text(o), e.on("click", De(i.id, s)), _.append(e);
                  } else se(_, o);
                  n.append(_);
                }
              } else n.data("blankpara") && n.append($("<span>", { class: "BlankLineSpan" }).text(" "));
            }
            var C = i.frameel.children();
            if (C.length) {
              var S = C.length - 200;
              if (S > 0) {
                var D = C.get(S).offsetTop;
                (i.topunseen -= D), i.topunseen < 0 && (i.topunseen = 0), (i.pagefrommark -= D), i.pagefrommark < 0 && (i.pagefrommark = 0);
                for (let e = 0; e < S; e++) {
                  const t = C[e];
                  "STYLE" !== t.tagName && $(t).remove();
                }
              }
            }
            const n = X(i);
            if (n && ((k = $("<span>", { id: "win" + i.id + "_cursor", class: "InvisibleCursor" })).append(" "), n.append(k), i.inputel)) {
              var G = i.inputel,
                M = k.position(),
                I = i.frameel.width() - (d.buffermarginx + M.left + 2);
              if ((I < 1 && (I = 1), G.css({ position: "absolute", left: "0px", top: "0px", width: I + "px" }), i.lastrdesc && "line" === i.input.type)) {
                const e = i.lastrdesc;
                if ((G.toggleClass("reverse", !!e.reverse), e.fg || e.bg)) {
                  const t = {};
                  (t[e.reverse ? "background-color" : "color"] = e.fg || ""), (t[e.reverse ? "color" : "background-color"] = e.bg || ""), G.css(t);
                }
              }
              k.append(G);
            }
          }
          if ("graphics" == i.type) {
            var j = e.draw;
            void 0 === j && (j = []);
            var B = 0 == m.length;
            for (let e = 0; e < j.length; e++) {
              var L = j[e],
                U = { winid: i.id };
              jQuery.extend(U, L), m.push(U);
            }
            B &&
              m.length > 0 &&
              (function e(i, n) {
                if (0 == m.length) return void re("perform_graphics_ops called with no queued ops" + (i ? " (plus image!)" : ""));
                for (; m.length; ) {
                  var l = m[0],
                    a = c[l.winid];
                  if (a) {
                    var o = ue($("#win" + a.id + "_canvas", r));
                    if (o) {
                      var s = l.special;
                      switch (s) {
                        case "setcolor":
                          a.defcolor = l.color;
                          break;
                        case "fill":
                          void 0 === l.color ? (o.fillStyle = a.defcolor) : (o.fillStyle = l.color),
                            void 0 === l.x ? (o.fillRect(0, 0, a.graphwidth, a.graphheight), a.frameel.css("background-color", o.fillStyle)) : o.fillRect(l.x, l.y, l.width, l.height),
                            (o.fillStyle = "#000000");
                          break;
                        case "image":
                          if (!i) {
                            var u = E[l.image];
                            u && u.width > 0 && u.height > 0 ? ((i = u), (n = !0)) : delete E[l.image];
                          }
                          if (!i) {
                            var f = l.url;
                            if (t && t.get_image_url) {
                              var d = t.get_image_url(l.image);
                              d && (f = d);
                            }
                            var _ = new Image();
                            return (
                              $(_).on("load", function (t) {
                                e(_, t);
                              }),
                              $(_).on("error", function () {
                                e(_, null);
                              }),
                              void (_.src = f)
                            );
                          }
                          n && ((E[l.image] = i), o.drawImage(i, l.x, l.y, l.width, l.height)), (n = null), (i = null);
                          break;
                        default:
                          re("Unknown special entry in graphics content: " + s);
                      }
                      m.shift();
                    } else re("perform_graphics_ops: op for nonexistent canvas " + a.id), m.shift();
                  } else re("perform_graphics_ops: op for nonexistent window " + l.winid), m.shift();
                }
              })(null);
          }
        }
      else ne("Got content update for window " + e.id + ", which does not exist.");
    }
    function X(e) {
      var t,
        i,
        r = $(((t = e.frameel), (i = t.children()) && i.length ? i.get(i.length - 1) : null));
      return r.length && r.hasClass("BufferLine") ? r : null;
    }
    function Z(e) {
      var t = X(e);
      return t && t.length ? t.get(0).offsetTop : 0;
    }
    function ee(e) {
      h = 0;
      var t = 0;
      if (
        (jQuery.each(c, function (e, i) {
          i.needspaging && ((h += 1), (t && i.id != g) || (t = i.id));
        }),
        h && (g = t),
        !h && e)
      ) {
        var i = 0;
        if (
          (s ||
            h ||
            jQuery.each(c, function (e, t) {
              t.input && ((i && t.id != p) || (i = t.id));
            }),
          i)
        ) {
          var r = c[i];
          r.inputel && r.inputel.focus();
        }
      }
    }
    function te(e, t) {
      const i = "window" + e.id,
        r = [];
      for (let t = 0; t < 11; t++) {
        const n = e.stylehints[t],
          l = [],
          a = [];
        for (const t in n)
          if ("reverse" !== t && ("font-family" !== t || "buffer" === e.type))
            if ("margin-left" === t || "text-align" === t || "text-indent" === t) l.push(`${t}: ${n[t]}`);
            else {
              if (("color" === t || "background-color" === t) && n.reverse) continue;
              a.push(`${t}: ${n[t]}`);
            }
        if (
          (l.length && r.push(`#${i} div.Style_${O[t]} {${l.join("; ")}}`), a.length && (r.push(`#${i} span.Style_${O[t]} {${a.join("; ")}}`), 8 === t && r.push(`#${i} input.LineInput {${a.join("; ")}}`)), n.color || n["background-color"])
        ) {
          let e = [];
          n.color && e.push("background-color: " + n.color), n["background-color"] && e.push("color: " + n["background-color"]), r.push(`#${i} span.Style_${O[t]}.reverse {${e.join("; ")}}`);
        }
      }
      (e.stylehints.win_bg || e.stylehints.win_fg || e.stylehints[0]["background-color"]) &&
        r.push(
          `#${i} {background-color: ${e.stylehints.win_bg || e.stylehints[0]["background-color"] || `var(--glkote-${e.type}-bg)`}}`,
          `#${i}.reverse {background-color: ${e.stylehints.win_fg || e.stylehints[0].color || `var(--glkote-${e.type}-reverse-bg)`}}`
        ),
        r.length && (t.children("style").remove(), t.prepend(`<style>${r.join("\n")}</style>`));
    }
    function ie(e, t, i) {
      if (e.stylehints) {
        let r;
        void 0 !== typeof t && ((e.stylehints.win_bg = t), (r = 1)), void 0 !== typeof i && ((e.stylehints.win_fg = i), (r = 1)), r && te(e, e.frameel);
      }
    }
    function re(e) {
      window.console && console.log && console.log(e);
    }
    function ne(e) {
      e || (e = "???");
      var t = document.getElementById("errorcontent");
      oe(t), t.appendChild(document.createTextNode(e)), "WarningPane" == (t = document.getElementById("errorpane")).className && (t.className = null), (t.style.display = ""), (f = !0), ae();
    }
    function le() {
      (v = null), re("Retrying update..."), _e("refresh", null, null);
    }
    function ae() {
      if (0 != u) {
        u = !1;
        var e = document.getElementById("loadingpane");
        e && (e.style.display = "none");
      }
    }
    function oe(e) {
      var t, i;
      for (i = e.childNodes; i.length > 0; ) (t = i.item(0)), e.removeChild(t);
    }
    function se(e, t) {
      if (k) {
        if ("match" == k) {
          if (x.test(t)) {
            var i = $("<a>", { href: t, class: "External", target: "_blank" });
            return i.text(t), void e.append(i);
          }
        } else if ("search" == k) {
          for (;;) {
            var r = x.exec(t);
            if (!r) break;
            if (r.index > 0) {
              var n = t.substring(0, r.index);
              e.append(document.createTextNode(n));
            }
            const i = $("<a>", { href: r[0], class: "External", target: "_blank" });
            i.text(r[0]), e.append(i), (t = t.substring(r.index + r[0].length));
          }
          if (!t.length) return;
        }
        e.append(document.createTextNode(t));
      } else e.append(document.createTextNode(t));
    }
    function ue(e) {
      if (e && e.length) {
        var t = e.get(0);
        return t && t.getContext ? t.getContext("2d") : void 0;
      }
    }
    function fe(e, t) {
      return window.setTimeout(t, 1e3 * e);
    }
    function ce(e) {
      return window.setTimeout(e, 10);
    }
    function de(e, t, i) {
      var r = null;
      e.history.length && (r = e.history[e.history.length - 1]), t && t != r && (e.history.push(t), e.history.length > 20 && e.history.shift()), _e("line", e, t, i);
    }
    function _e(e, t, r, n) {
      if (!s || "specialresponse" == e)
        if (a <= o && "init" != e && "refresh" != e) re("Not sending repeated generation number: " + a);
        else {
          var l = 0;
          t && (l = t.id);
          var u = { type: e, gen: a };
          (o = a),
            "line" == e
              ? ((u.window = t.id), (u.value = r), n && (u.terminator = n))
              : "char" == e || "hyperlink" == e
              ? ((u.window = t.id), (u.value = r))
              : "mouse" == e
              ? ((u.window = t.id), (u.x = r), (u.y = n))
              : "external" == e
              ? (u.value = r)
              : "specialresponse" == e
              ? ((u.response = r), (u.value = n))
              : "debuginput" == e
              ? (u.value = r)
              : "redraw" == e
              ? (u.window = t.id)
              : "init" == e
              ? ((u.metrics = r), (u.support = ["timer", "graphics", "graphicswin", "hyperlinks", "garglktext"]))
              : "arrange" == e && (u.metrics = r),
            "init" != e &&
              "refresh" != e &&
              "specialresponse" != e &&
              "debuginput" != e &&
              jQuery.each(c, function (t, i) {
                if ((("line" != e && "char" != e) || i.id != l) && i.input && "line" == i.input.type && i.inputel && i.inputel.val()) {
                  var r = u.partial;
                  r || ((r = {}), (u.partial = r)), (r[i.id] = i.inputel.val());
                }
              }),
            W && ((A.input = u), (A.timestamp = new Date().getTime())),
            i.accept(u);
        }
    }
    function pe(e) {
      jQuery.ajax(F, {
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(e),
        error: function (e, t, i) {
          re("Transcript recording failed; deactivating. Error " + t + ": " + i), (W = !1);
        },
      });
    }
    function ge() {
      null != b && (window.clearTimeout(b), (b = null)), (b = fe(0.2, he));
    }
    function he() {
      if (((b = null), s)) b = fe(0.2, he);
      else {
        var e,
          t,
          i = Y();
        if (((t = d), (e = i).width != t.width || e.height != t.height || e.gridcharwidth != t.gridcharwidth || e.gridcharheight != t.gridcharheight || e.buffercharwidth != t.buffercharwidth || e.buffercharheight != t.buffercharheight))
          _e("arrange", null, (d = i));
      }
    }
    function me(e) {
      var t = c[e];
      t && "graphics" == t.type && _e("redraw", t, null);
    }
    function we() {
      var e = window.devicePixelRatio || 1;
      e != _ &&
        (re("### devicePixelRatio changed to " + (_ = e)),
        jQuery.each(c, function (e, t) {
          if ("graphics" == t.type) {
            var i = $("#win" + t.id + "_canvas", r);
            t.scaleratio = _ / t.backpixelratio;
            var n = ue(i);
            i.attr("width", t.graphwidth * t.scaleratio),
              i.attr("height", t.graphheight * t.scaleratio),
              i.css("width", t.graphwidth + "px"),
              i.css("height", t.graphheight + "px"),
              n && (n.setTransform(t.scaleratio, 0, 0, t.scaleratio, 0, 0), (n.fillStyle = t.defcolor), n.fillRect(0, 0, t.graphwidth, t.graphheight), (n.fillStyle = "#000000")),
              t.frameel.css("background-color", t.defcolor),
              ce(function () {
                me(e);
              });
          }
        }));
    }
    function ye(e) {
      if (!s) {
        var t,
          i = 0;
        if ((e && (i = e.which), "INPUT" != e.target.tagName.toUpperCase()))
          if (!(e.target.className.indexOf("CanHaveInputFocus") >= 0))
            if (!(e.altKey || e.metaKey || e.ctrlKey))
              if (h && (t = c[g])) {
                if (!((i >= 32 && i <= 126) || 13 == i)) return;
                e.preventDefault();
                var n = t.frameel;
                n.scrollTop(t.topunseen - d.buffercharheight);
                var l = n.outerHeight(),
                  a = Z(t),
                  o = n.scrollTop() + l;
                if ((o > a && (o = a), t.topunseen < o && (t.topunseen = o), t.needspaging && n.scrollTop() + l + 2 >= n.get(0).scrollHeight)) {
                  t.needspaging = !1;
                  var u = $("#win" + t.id + "_moreprompt", r);
                  u.length && u.remove(), ee(!0);
                }
              } else if ((t = c[p]) && t.inputel) {
                if ((t.inputel.focus(), "line" != t.input.type)) {
                  var f = null;
                  return 13 == i ? (f = "return") : i == q ? (f = "delete") : i && (f = String.fromCharCode(i)), f && _e("char", t, f), void e.preventDefault();
                }
                if (13 == i) return de(t, t.inputel.val(), null), void e.preventDefault();
                if (i) {
                  if (i >= 32) {
                    var _ = String.fromCharCode(i);
                    t.inputel.val(t.inputel.val() + _);
                  }
                  e.preventDefault();
                } else;
              }
      }
    }
    function be(e) {
      var t = e.data,
        i = c[t];
      i && (i.inputel && (p = i.id), i.needspaging ? (g = i.id) : i.inputel && (g = 0));
    }
    function ve(e) {
      var t = e.data,
        i = c[t];
      if (i && 0 == e.button && i.reqmouse) {
        var n = 0,
          l = 0;
        if ("grid" == i.type) {
          var a = $("#win" + i.id + "_ln0", r);
          if (a.length) {
            var o = a.offset();
            (n = Math.floor((e.clientX - o.left) / d.gridcharwidth)), (l = Math.floor((e.clientY - o.top) / d.gridcharheight));
          }
          n >= i.gridwidth && (n = i.gridwidth - 1), n < 0 && (n = 0), l >= i.gridheight && (l = i.gridheight - 1), l < 0 && (l = 0);
        } else {
          if ("graphics" != i.type) return;
          var s = $("#win" + i.id + "_canvas", r);
          if (s.length) {
            var u = s.offset();
            (n = e.clientX - u.left), (l = e.clientY - u.top);
          }
          n >= i.graphwidth && (n = i.graphwidth - 1), n < 0 && (n = 0), l >= i.graphheight && (l = i.graphheight - 1), l < 0 && (l = 0);
        }
        e.preventDefault(), _e("mouse", i, n, l);
      }
    }
    function ke(e) {
      var t = 0;
      if ((e && (t = e.keyCode), !t)) return !0;
      var i = null;
      switch (t) {
        case D:
          i = "left";
          break;
        case M:
          i = "right";
          break;
        case G:
          i = "up";
          break;
        case I:
          i = "down";
          break;
        case q:
          i = "delete";
          break;
        case S:
          i = "escape";
          break;
        case C:
          i = "tab";
          break;
        case L:
          i = "pageup";
          break;
        case U:
          i = "pagedown";
          break;
        case j:
          i = "home";
          break;
        case B:
          i = "end";
          break;
        case 112:
          i = "func1";
          break;
        case 113:
          i = "func2";
          break;
        case 114:
          i = "func3";
          break;
        case 115:
          i = "func4";
          break;
        case 116:
          i = "func5";
          break;
        case 117:
          i = "func6";
          break;
        case 118:
          i = "func7";
          break;
        case 119:
          i = "func8";
          break;
        case 120:
          i = "func9";
          break;
        case 121:
          i = "func10";
          break;
        case 122:
          i = "func11";
          break;
        case 123:
          i = "func12";
      }
      if (i) {
        var r = $(this).data("winid"),
          n = c[r];
        return !n || !n.input || (_e("char", n, i), !1);
      }
      return !0;
    }
    function xe(e) {
      var t,
        i = 0;
      if ((e && (i = e.which), !i)) return !1;
      t = 13 == i ? "return" : String.fromCharCode(i);
      var r = $(this).data("winid"),
        n = c[r];
      return !n || !n.input || (_e("char", n, t), !1);
    }
    function Te(e) {
      var t = 0;
      if ((e && (t = e.keyCode), !t)) return !0;
      if (t == G || t == I) {
        var i = $(this).data("winid"),
          r = c[i];
        return (
          !r ||
          !r.input ||
          (t == G && r.historypos > 0 && ((r.historypos -= 1), r.historypos < r.history.length ? (this.value = r.history[r.historypos]) : (this.value = "")),
          t == I && r.historypos < r.history.length && ((r.historypos += 1), r.historypos < r.history.length ? (this.value = r.history[r.historypos]) : (this.value = "")),
          !1)
        );
      }
      if (z[t]) {
        const e = $(this).data("winid"),
          i = c[e];
        if (!i || !i.input) return !0;
        if (i.terminators[z[t]]) return de(i, i.inputel.val(), z[t]), !1;
      }
      return !0;
    }
    function $e(e) {
      var t = 0;
      if ((e && (t = e.which), !t)) return !0;
      if (13 == t) {
        var i = $(this).data("winid"),
          r = c[i];
        return !r || !r.input || (de(r, this.value, null), !1);
      }
      return !0;
    }
    function qe(e) {
      var t = e.data;
      c[t] && ((p = t), (g = t));
    }
    function Ce(e) {
      var t = e.data;
      c[t];
    }
    function Se(e) {
      var t = e.data,
        i = c[t];
      if (i && i.needspaging) {
        var n = i.frameel,
          l = n.outerHeight(),
          a = Z(i),
          o = n.scrollTop() + l;
        if ((o > a && (o = a), i.topunseen < o && (i.topunseen = o), n.scrollTop() + l + 2 >= n.get(0).scrollHeight)) {
          i.needspaging = !1;
          var s = $("#win" + i.id + "_moreprompt", r);
          return s.length && s.remove(), void ee(!0);
        }
      }
    }
    function De(e, t) {
      return function () {
        var i = c[e];
        return !!i && !!i.reqhyperlink && (_e("hyperlink", i, t), !1);
      };
    }
    function Ge() {
      w && y && ((w = window.setTimeout(Ge, y)), s || _e("timer"));
    }
    function Me(e) {
      _e("debuginput", null, e);
    }
    return {
      version: "2.2.5",
      init: function (a) {
        if ((!a && window.Game && (a = window.Game), a))
          if (a.accept)
            if (((i = a), a.Dialog && (e = a.Dialog), a.GiLoad && (t = a.GiLoad), window.jQuery && jQuery.fn.jquery)) {
              var o = jQuery.fn.jquery.split(".");
              if (o.length < 2 || o[0] < 1 || (1 == o[0] && o[1] < 9)) ne("This version of the jQuery library is too old. (Version " + jQuery.fn.jquery + " found; 1.9.0 required.)");
              else {
                for (var u in R) z[R[u]] = u;
                (c = {}), a.windowport && (n = a.windowport), a.gameport && (l = a.gameport);
                var f = $("#" + n, r);
                if (f.length) {
                  f.empty(),
                    $(document).on("keypress", ye),
                    $(window).on("resize", ge),
                    (_ = window.devicePixelRatio || 1),
                    window.matchMedia &&
                      (window.matchMedia("screen and (min-resolution: 1.5dppx)").addListener(we),
                      window.matchMedia("screen and (min-resolution: 2dppx)").addListener(we),
                      window.matchMedia("screen and (min-resolution: 3dppx)").addListener(we),
                      window.matchMedia("screen and (min-resolution: 4dppx)").addListener(we));
                  var p = Y();
                  if ("string" !== jQuery.type(p)) {
                    if (
                      ((d = p),
                      (function () {
                        var e = $("#" + l, r);
                        if (!e.length) return "Cannot find gameport element #" + l + " in this document.";
                        var t = $("<div>", { id: "resize-sensor-shrink" }).css({ position: "absolute", left: "0", right: "0", top: "0", bottom: "0", overflow: "hidden", visibility: "hidden", "z-index": "-1" });
                        t.append($("<div>", { id: "resize-sensor-shrink-child" }).css({ position: "absolute", left: "0", right: "0", width: "200%", height: "200%" }));
                        var i = $("<div>", { id: "resize-sensor-expand" }).css({ position: "absolute", left: "0", right: "0", top: "0", bottom: "0", overflow: "hidden", visibility: "hidden", "z-index": "-1" });
                        i.append($("<div>", { id: "resize-sensor-expand-child" }).css({ position: "absolute", left: "0", right: "0" }));
                        var n = t.get(0),
                          a = i.get(0),
                          o = a.childNodes[0],
                          s = function () {
                            (n.scrollLeft = 1e5), (n.scrollTop = 1e5), (o.style.width = "100000px"), (o.style.height = "100000px"), (a.scrollLeft = 1e5), (a.scrollTop = 1e5);
                          };
                        e.append(t), e.append(i), s();
                        var u = function (e) {
                          ge(), s();
                        };
                        t.on("scroll", u), i.on("scroll", u);
                      })(),
                      (k = a.detect_external_links) &&
                        ((x = a.regex_external_links) ||
                          (x =
                            "search" == k
                              ? RegExp("\\b((?:https?://)(?:[^\\s()<>]+|\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\))+(?:\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:'\".,<>?«»“”‘’]))", "i")
                              : RegExp("^https?:", "i"))),
                      a.recording_url && ((W = !0), (N = pe), (F = a.recording_url)),
                      a.recording_handler && ((W = !0), (N = a.recording_handler), (F = "(custom handler)")),
                      W)
                    ) {
                      var g = (function () {
                        var e = {},
                          t = location.search.substring(1, location.search.length);
                        if (t.length) {
                          var i = t.split("&");
                          t = t.replace(/\+/g, " ");
                          for (var r = 0; r < i.length; r++) {
                            var n = i[r].split("="),
                              l = decodeURIComponent(n[0]),
                              a = 2 == n.length ? decodeURIComponent(n[1]) : l;
                            e[l] = a;
                          }
                        }
                        return e;
                      })().feedback;
                      "undefined" != jQuery.type(g) && "1" != g
                        ? ((W = !1), re("User has opted out of transcript recording."))
                        : ((A = { sessionId: new Date().getTime() + "" + Math.ceil(1e4 * Math.random()), input: null, output: null, timestamp: 0, outtimestamp: 0 }),
                          a.recording_label && (A.label = a.recording_label),
                          "simple" == a.recording_format ? (A.format = "simple") : (A.format = "glkote"),
                          re("Transcript recording active: session " + A.sessionId + ' "' + A.label + '", destination ' + F));
                    }
                    if (a.debug_commands) {
                      var h = window.GiDebug;
                      1 != a.debug_commands && (h = a.debug_commands), h ? (h.init(Me), (T = h.output), a.debug_console_open && h.open()) : re("The debug_commands option is set, but there is no GiDebug module.");
                    }
                    a.font_load_delay
                      ? ((s = !0),
                        ce(function () {
                          (s = !1), _e("init", null, (d = Y()));
                        }))
                      : _e("init", null, d);
                  } else ne(p);
                } else ne("Cannot find windowport element #" + n + " in this document.");
              }
            } else ne("The jQuery library has not been loaded.");
          else ne("The game interface object must have an accept() function.");
        else ne("No game interface object has been provided.");
      },
      update: function (t) {
        ae();
        var i = null;
        if (
          (t.autorestore && 0 == a && (i = t.autorestore),
          delete t.autorestore,
          W &&
            (function (e) {
              (A.output = e), (A.outtimestamp = new Date().getTime());
              var t = !0;
              if ("simple" == A.format) {
                var i = A.input,
                  r = A.output,
                  n = null;
                if ((i && (n = i.type), "line" == n || "char" == n ? (A.input = i.value) : "init" != n && "external" != n && "specialresponse" != n && n ? (t = !1) : (A.input = ""), r.windows)) {
                  P.bufferwins = {};
                  for (var l = 0; l < r.windows.length; l++) "buffer" == r.windows[l].type && (P.bufferwins[r.windows[l].id] = !0);
                }
                let e = "";
                if (r.content)
                  for (let t = 0; t < r.content.length; t++) {
                    var a = r.content[t];
                    if (P.bufferwins && P.bufferwins[a.id] && a.text)
                      for (var o = 0; o < a.text.length; o++) {
                        var s = a.text[o];
                        if ((s.append || (e += "\n"), s.content))
                          for (var u = 0; u < s.content.length; u++) {
                            var f = s.content[u];
                            "string" == jQuery.type(f) ? (u++, (e += s.content[u])) : f.text && (e += f.text);
                          }
                      }
                  }
                A.output = e;
              }
              t && N(A);
              (A.input = null), (A.output = null), (A.timestamp = 0), (A.outtimestamp = 0);
            })(t),
          t.debugoutput && T && T(t.debugoutput),
          "error" != t.type)
        ) {
          if ("pass" != t.type)
            if ("retry" != t.type)
              if ("update" == t.type)
                if (t.gen != a)
                  if (t.gen < a) re("Ignoring out-of-order generation number: got " + t.gen + ", currently at " + a);
                  else {
                    (a = t.gen),
                      s &&
                        (jQuery.each(c, function (e, t) {
                          t.inputel && t.inputel.prop("disabled", !1);
                        }),
                        (s = !1)),
                      null != t.input &&
                        (function (e) {
                          var t = {};
                          jQuery.map(e, function (e) {
                            e.type && (t[e.id] = e);
                          }),
                            jQuery.each(c, function (e, i) {
                              if (i.input) {
                                var r = t[i.id];
                                (null == r || r.gen > i.input.gen) && ((i.input = null), i.inputel && (i.inputel.remove(), (i.inputel = null)));
                              }
                            });
                        })(t.input),
                      null != t.windows &&
                        (function (e) {
                          jQuery.each(c, function (e, t) {
                            t.inplace = !1;
                          }),
                            jQuery.map(e, J);
                          var t = jQuery.map(c, function (e) {
                            if (!e.inplace) return e;
                          });
                          jQuery.map(t, V);
                        })(t.windows),
                      null != t.content &&
                        (function (e) {
                          jQuery.map(e, K);
                        })(t.content),
                      null != t.input &&
                        (function (e) {
                          var t = {},
                            i = {},
                            n = {};
                          jQuery.map(e, function (e) {
                            e.type && (t[e.id] = e), e.hyperlink && (i[e.id] = !0), e.mouse && (n[e.id] = !0);
                          }),
                            jQuery.each(c, function (e, l) {
                              (l.reqhyperlink = i[l.id]), (l.reqmouse = n[l.id]);
                              var a = t[l.id];
                              if (null != a) {
                                l.input = a;
                                var o = 1;
                                "line" == a.type && (o = a.maxlen);
                                var s = !1,
                                  u = l.inputel;
                                if (null == u) {
                                  s = !0;
                                  var f = "Input";
                                  if (
                                    ("line" == a.type ? (f += " LineInput") : "char" == a.type ? (f += " CharInput") : ne("Window " + l.id + " has requested unrecognized input type " + a.type + "."),
                                    (u = $("<input>", { id: "win" + l.id + "_input", class: f, type: "text", maxlength: o })).attr("autocapitalize", "off"),
                                    u.attr({ "aria-live": "off" }),
                                    "line" == a.type)
                                  ) {
                                    if ((u.on("keypress", $e), u.on("keydown", Te), a.initial && u.val(a.initial), (l.terminators = {}), a.terminators)) for (var c = 0; c < a.terminators.length; c++) l.terminators[a.terminators[c]] = !0;
                                  } else "char" == a.type && (u.on("keypress", xe), u.on("keydown", ke));
                                  if ((u.on("focus", l.id, qe), u.on("blur", l.id, Ce), u.data("winid", l.id), (l.inputel = u), (l.historypos = l.history.length), (l.needscroll = !0), l.lastrdesc && "line" === l.input.type)) {
                                    const e = l.lastrdesc;
                                    if ((u.toggleClass("reverse", !!e.reverse), e.fg || e.bg)) {
                                      const t = {};
                                      (t[e.reverse ? "background-color" : "color"] = e.fg || ""), (t[e.reverse ? "color" : "background-color"] = e.bg || ""), u.css(t);
                                    }
                                  }
                                }
                                if ("grid" == l.type) {
                                  var _ = $("#win" + l.id + "_ln" + a.ypos, r);
                                  if (!_.length) return void ne("Window " + l.id + " has requested input at unknown line " + a.ypos + ".");
                                  var p = _.position(),
                                    g = p.left + Math.round(a.xpos * d.gridcharwidth),
                                    h = Math.round(o * d.gridcharwidth),
                                    m = l.frameel.width() - (d.buffermarginx + g + 2);
                                  h > m && (h = m), u.css({ position: "absolute", left: g + "px", top: p.top + "px", width: h + "px" }), s && l.frameel.append(u);
                                }
                                if ("buffer" == l.type) {
                                  var w = $("#win" + l.id + "_cursor", r);
                                  w.length || ((w = $("<span>", { id: "win" + l.id + "_cursor", class: "InvisibleCursor" })).append(" "), l.frameel.append(w));
                                  const e = w.position();
                                  let t = l.frameel.width() - (d.buffermarginx + e.left + 2);
                                  t < 1 && (t = 1), u.css({ position: "absolute", left: "0px", top: "0px", width: t + "px" }), s && w.append(u);
                                }
                              }
                            });
                        })(t.input),
                      void 0 !== t.timer &&
                        (function (e) {
                          w && (window.clearTimeout(w), (w = null), (y = null));
                          e && ((y = e), (w = window.setTimeout(Ge, y)));
                        })(t.timer),
                      null != t.specialinput &&
                        (function (t) {
                          if ("fileref_prompt" == t.type) {
                            var i = function (e) {
                              _e("specialresponse", null, "fileref_prompt", e);
                            };
                            try {
                              var r = "read" != t.filemode;
                              e.open(r, t.filetype, t.gameid, i);
                            } catch (e) {
                              GlkOte.log("Unable to open file dialog: " + e),
                                ce(
                                  (i = function () {
                                    _e("specialresponse", null, "fileref_prompt", null);
                                  })
                                );
                            }
                          } else ne("Request for unknown special input type: " + t.type);
                        })(t.specialinput),
                      jQuery.each(c, function (e, t) {
                        if ("buffer" == t.type && t.needscroll && ((t.needscroll = !1), !t.needspaging)) {
                          var i = t.frameel;
                          i.scrollTop(t.topunseen - d.buffercharheight), (t.pagefrommark = t.topunseen);
                          var l = i.outerHeight(),
                            a = Z(t),
                            o = i.scrollTop() + l;
                          o > a && (o = a), t.topunseen < o && (t.topunseen = o), i.scrollTop() + l + 2 >= i.get(0).scrollHeight ? (t.needspaging = !1) : (t.needspaging = !0);
                          var s = $("#win" + t.id + "_moreprompt", r),
                            u = $("#win" + t.id + "_prevmark", r);
                          if (t.needspaging) {
                            if (!s.length) {
                              (s = $("<div>", { id: "win" + t.id + "_moreprompt", class: "MorePrompt" })).append("More");
                              var f = t.coords.right + 20,
                                c = t.coords.bottom;
                              s.css({ bottom: c + "px", right: f + "px" }), $("#" + n, r).append(s);
                            }
                            u.length || ((u = $("<div>", { id: "win" + t.id + "_prevmark", class: "PreviousMark" })), i.prepend(u)), u.css("top", t.pagefrommark + "px");
                          } else s.length && s.remove(), u.length && u.remove();
                        }
                      }),
                      ee(!1),
                      (s = !1),
                      (t.disable || t.specialinput) &&
                        ((s = !0),
                        jQuery.each(c, function (e, t) {
                          t.inputel && t.inputel.prop("disabled", !0);
                        }));
                    var l = 0;
                    if (
                      (s ||
                        h ||
                        jQuery.each(c, function (e, t) {
                          t.input && ((l && t.id != p) || (l = t.id));
                        }),
                      l)
                    ) {
                      ce(function () {
                        var e = c[l];
                        e.inputel && e.inputel.focus();
                      });
                    }
                    i &&
                      (i.history &&
                        jQuery.each(i.history, function (e, t) {
                          const i = c[e];
                          null != i && ((i.history = t.slice(0)), (i.historypos = i.history.length));
                        }),
                      i.defcolor &&
                        jQuery.each(i.defcolor, function (e, t) {
                          const i = c[e];
                          null != i && (i.defcolor = t);
                        }),
                      jQuery.each(c, function (e, t) {
                        "buffer" == t.type &&
                          (function (e) {
                            var t = e.frameel,
                              i = t.outerHeight();
                            t.scrollTop(t.get(0).scrollHeight - i);
                            var n = Z(e),
                              l = t.scrollTop() + i;
                            l > n && (l = n);
                            e.topunseen < l && (e.topunseen = l);
                            if (e.needspaging && t.scrollTop() + i + 2 >= t.get(0).scrollHeight) {
                              e.needspaging = !1;
                              var a = $("#win" + e.id + "_moreprompt", r);
                              a.length && a.remove(), ee(!0);
                            }
                          })(t);
                      }),
                      (i.metrics && i.metrics.width == d.width && i.metrics.height == d.height) || ((d.width += 2), ge())),
                      void 0 !== t.page_bg && H.css("background-color", t.page_bg);
                  }
                else re("Ignoring repeated generation number: " + a);
              else re("Ignoring unknown message type " + t.type + ".");
            else
              v
                ? re("Event has timed out, but a retry is already queued!")
                : (re("Event has timed out; will retry..."),
                  (function () {
                    if (1 == u) return;
                    u = !0;
                    var e = document.getElementById("loadingpane");
                    e && (e.style.display = "");
                  })(),
                  (v = fe(2, le)));
        } else ne(t.message);
      },
      extevent: function (e) {
        _e("external", null, e);
      },
      getinterface: function () {
        return i;
      },
      getdomcontext: function () {
        return r;
      },
      setdomcontext: function (e) {
        r = e;
      },
      save_allstate: function () {
        var e = { metrics: { width: d.width, height: d.height }, history: {} };
        return (
          jQuery.each(c, function (t, i) {
            i.history && i.history.length && (e.history[t] = i.history.slice(0)), i.defcolor && (void 0 === e.defcolor && (e.defcolor = {}), (e.defcolor[t] = i.defcolor));
          }),
          e
        );
      },
      log: re,
      warning: function (e) {
        if (!f)
          if (e) {
            var t = document.getElementById("errorcontent");
            oe(t), t.appendChild(document.createTextNode(e)), $("#errorpane").addClass("WarningPane"), $("#errorpane").show(), ae();
          } else $("#errorpane").hide();
      },
      error: ne,
    };
  })();
async function generic_emglken_vm(e, t) {
  const [i, r, n] = t,
    l = Object.assign({}, e, { Dialog: Dialog, do_vm_autosave: 1, Glk: {}, GlkOte: GlkOte, wasmBinary: n }),
    a = new r.default();
  a.prepare(i, l), await a.start();
}
const formats = [
    { id: "hugo", extensions: /hex/, engines: [{ id: "hugo", load: ["./hugo.js", "./hugo-core.wasm"], start: generic_emglken_vm }] },
    {
      id: "glulx",
      extensions: /gblorb|ulx/,
      engines: [
        {
          id: "quixe",
          load: ["./quixe.js"],
          start: (e, t) => {
            const [i, r] = t,
              n = Array.from(i);
            (window.Dialog = Dialog), (window.GiDispa = r.GiDispa), (window.GiLoad = r.GiLoad), (window.Glk = Glk), (window.GlkOte = GlkOte);
            const l = Object.assign({}, e, {
              blorb_gamechunk_type: "GLUL",
              Dialog: Dialog,
              do_vm_autosave: 1,
              GiDispa: r.GiDispa,
              GiLoad: r.GiLoad,
              GlkOte: GlkOte,
              image_info_map: "StaticImageInfo",
              io: Glk,
              set_page_title: !1,
              spacing: 0,
              vm: r.Quixe,
            });
            r.GiLoad.load_run(l, n, "array");
          },
        },
        { id: "glulxe", load: ["./glulxe.js", "./glulxe-core.wasm"], start: generic_emglken_vm },
      ],
    },
    { id: "tads", extensions: /gam|t3/, engines: [{ id: "tads", load: ["./tads.js", "./tads-core.wasm"], start: generic_emglken_vm }] },
    {
      id: "zcode",
      extensions: /zblorb|z3|z4|z5|z8/,
      engines: [
        {
          id: "zvm",
          load: ["./zvm.js"],
          start: (e, t) => {
            const [i, r] = t,
              n = new r.ZVM(),
              l = Object.assign({}, e, { vm: n, Dialog: Dialog, do_vm_autosave: 1, GiDispa: new r.ZVMDispatch(), Glk: Glk, GlkOte: GlkOte });
            n.prepare(i, l), Glk.init(l);
          },
        },
      ],
    },
  ],
  default_options = { lib_path: "dist/web/" };
async function launch() {
  const e = Object.assign(default_options, window.parchment_options);
  if (!e || !e.default_story) return GlkOte.error("No storyfile specified");
  const t = e.default_story[0];
  let i;
  for (const e of formats)
    if (e.extensions.test(t)) {
      i = e;
      break;
    }
  if (!i) return GlkOte.error("Unknown storyfile format");
  const r = i.engines[0];
  try {
    const i = await Promise.all([fetch_storyfile(t), ...r.load.map((t) => fetch_vm_resource(e, t))]);
    await r.start(e, i);
  } catch (e) {
    throw (GlkOte.error(e), e);
  }
}
$(launch);
