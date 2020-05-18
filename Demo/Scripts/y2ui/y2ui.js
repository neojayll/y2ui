/** y2ui MIT License By neojayll */
var y2ui = {

    /**版本号*/
    v: "0.01.0518",

    /**设置项*/
    config: {
        /**API调用基地址（未完成）*/
        baseUrl: "",
        /**是否启用$$快速操作*/
        query: true
    },

    /**所有已创建元素的上一个版本*/
    history: {
        element: {},
        show: {}
    },

    /**所有已创建的元素*/
    element: {},

    /**风格加载*/
    load: function (selector, framework) {
        selector = selector || "#y2ui";
        framework = framework || "";
        var html = "";
        switch (framework) {
            default:
                html = "<div group='breadcrumb'></div>"
                    + "<br /><br />"
                    + "<div class='layui-form' group='display'><div class='layui-form-item' group='control'></div><br /></div>"
                    + "<div id='div_modify' class='layui-form layui-form-modify' hidden style='padding: 30px 30px 0 30px' group='layer'><button id='btn_div_modify' lay-submit='' hidden></button></div>"
                    + "<div group='layer' id='layer'></div>"
                    + "<div group='hidden' hidden></div>";
                break;
        }
        document.querySelector(selector).innerHTML = html;
    },

    /**组合操作*/
    assy: {
        toForm: function (name, lines, position) {
            position = position || "div[group='hidden']";
            y2ui.new.element(name, "div");
            y2ui.element[name].setAttribute("class", "layui-form");
            y2ui.element[name].add = function (...line) {
                for (var i = 0; i < line.length; i++) {
                    y2ui.element[name].append(line[i]);
                }
            };
            for (var i = 0; i < lines.length; i++) {
                y2ui.element[name].append(lines[i]);
            };
            document.querySelector(position).append(y2ui.element[name]);
            return y2ui.element[name];
        },
        toLine: function (name, inputs, position) {
            position = position || "div[group='hidden']";
            y2ui.new.element(name, "div");
            y2ui.element[name].setAttribute("class", "layui-form-item");
            y2ui.element[name].add = function (...input) {
                for (var i = 0; i < input.length; i++) {
                    input[i].setAttribute("class", "layui-inline");
                    y2ui.element[name].append(input[i]);
                }
            };
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].setAttribute("class", "layui-inline");
                y2ui.element[name].append(inputs[i]);
            };
            document.querySelector(position).append(y2ui.element[name]);
            return y2ui.element[name];
        },
        toInput: function (name, label, input, position) {
            position = position || "div[group='hidden']";
            y2ui.new.element(name, "div");
            var dom_input = document.createElement("div");
            dom_input.append(input);
            dom_input.setAttribute("class", "layui-input-inline");
            dom_input.firstChild.setAttribute("type", "text");
            dom_input.firstChild.setAttribute("class", "layui-input");
            y2ui.element[name].append(label);
            y2ui.element[name].append(dom_input);
            y2ui.element[name]["label"] = label;
            y2ui.element[name]["input"] = dom_input.firstChild;
            y2ui.element[name]["val"] = function (data) {
                if (data === undefined) y2ui.element[name]["input"].getAttribute("value", data);
                else y2ui.element[name]["input"].setAttribute("value", data);
            };
            document.querySelector(position).append(y2ui.element[name]);
            return y2ui.element[name];
        }
    },

    /**生成操作*/
    new: {
        element: function (name, type, position) {
            type = type || "span";
            if (y2ui.element[name]) y2ui.history.element[name] = y2ui.element[name];
            y2ui.element[name] = document.createElement(type);
            y2ui.element[name]["slname"] = name;
            y2ui.element[name]["sltype"] = "";
            y2ui.element[name]['sldata'] = { all: {}, };
            if (position !== undefined) document.querySelector(position).append(y2ui.element[name]);
            return y2ui.element[name];
        },
        button: function (name, text, event, position) {
            text = text || "";
            event = event || function (e) { };
            position = position || "div[group='hidden']";
            y2ui.new.element(name, "button");
            y2ui.element[name].setAttribute("class", "layui-btn");
            y2ui.element[name].innerText = text;
            y2ui.element[name].addEventListener("click", event);
            y2ui.element[name]["on"] = function (type, event) {
                if (event === undefined) {
                    event = type;
                    type = "click";
                }
                y2ui.element[name].addEventListener(type, function (e) { event(e) });
            };
            document.querySelector(position).append(y2ui.element[name]);
            return y2ui.element[name];
        },
        list: function (name, text, options, position) {
            text = text || "";
            options = options || [new Option("请选择", "")];
            position = position || "div[group='hidden']";
            y2ui.new.element(name, "div");
            var dom_label = document.createElement("label");
            var dom_select = document.createElement("div");
            dom_label.innerText = text;
            dom_label.setAttribute("class", "layui-form-label");
            dom_select.append(document.createElement("select"));
            dom_select.setAttribute("class", "layui-input-inline");
            dom_select.firstChild.setAttribute("lay-filter", name);
            for (var i = 0; i < options.length; i++) {
                dom_select.firstChild.add(options[i]);
            }
            y2ui.element[name].append(dom_label);
            y2ui.element[name].append(dom_select);
            y2ui.element[name]["on"] = function (type, event) {
                if (event === undefined) {
                    event = type;
                    type = "select";
                }
                layui.form.on(type + '(' + name + ')', function (data) { event(data); });
            };
            document.querySelector(position).append(y2ui.element[name]);
            return y2ui.element[name];
        },
        input: function (name, text, position) {
            text = text || "";
            position = position || "div[group='hidden']";
            y2ui.new.element(name, "div");
            var dom_label = document.createElement("label");
            var dom_input = document.createElement("div");
            dom_label.innerText = text;
            dom_label.setAttribute("class", "layui-form-label");
            dom_input.append(document.createElement("input"));
            dom_input.setAttribute("class", "layui-input-inline");
            dom_input.firstChild.setAttribute("type", "text");
            dom_input.firstChild.setAttribute("class", "layui-input");
            y2ui.element[name].append(dom_label);
            y2ui.element[name].append(dom_input);
            y2ui.element[name]["label"] = dom_label;
            y2ui.element[name]["input"] = dom_input.firstChild;
            y2ui.element[name]["val"] = function (data) {
                if (data === undefined) return y2ui.element[name]["input"].value;
                else y2ui.element[name]["input"].setAttribute("value", data);
            };
            y2ui.element[name]["on"] = function (type, event) {
                if (event === undefined) {
                    event = type;
                    type = "change";
                }
                y2ui.element[name].addEventListener(type, function (e) { event(e) });
            };
            document.querySelector(position).append(y2ui.element[name]);
            return y2ui.element[name];
        },
        table: function (name, data, cols, position) {
            data = data || [];
            cols = cols || [[]];
            position = position || "div[group='hidden']";
            y2ui.new.element(name, "div");
            var dom = document.createElement("table");
            dom.id = "y2ui-table-" + name;
            dom.setAttribute("lay-filter", dom.id);
            y2ui.element[name].append(dom);
            y2ui.element[name]["sltype"] = "table";
            y2ui.element[name]["on"] = function (type, event) {
                if (event === undefined) {
                    event = type;
                    type = "tool";
                }
                layui.table.on(type + '(' + dom.id + ')', function (obj) { event(obj); });
            };
            y2ui.element[name]["sldata"]["id"] = dom.id;
            y2ui.element[name]['sldata'] = new Proxy(y2ui.element[name]['sldata'], {
                get(target, key) {
                    return target[key];
                },
                set(target, key, value) {
                    if (key === "all") {
                        if (value.elem !== undefined) {
                            target.elem = value.elem;
                            target.all.elem = target.elem;
                        }
                        if (value.data !== undefined) {
                            target.data = value.data;
                            target.all.data = target.data;
                            target.data = newProxy(target.data);
                        }
                        if (value.cols !== undefined) {
                            target.cols = value.cols;
                            target.all.cols = target.cols;
                            target.cols = newProxy(target.cols);
                            for (var i = 0; i < target.cols.length; i++) {
                                target.cols[i] = newProxy(target.cols[i]);
                            }
                        }
                        if (value.page !== undefined) {
                            target.page = value.page;
                            target.all.page = target.page;
                            target.page = newProxy(target.page);
                        }
                    }
                    else if (key == "cols") {
                        target.all[key] = value;
                        target[key] = value;
                        target[key] = newProxy(target[key]);
                        for (var i = 0; i < target[key].length; i++) {
                            target[key][i] = newProxy(target[key][i]);
                        }
                    }
                    else if (typeof value === "object") {
                        target.all[key] = value;
                        target[key] = value;
                        target[key] = newProxy(target[key]);
                    }
                    else {
                        target.all[key] = value;
                        target[key] = value;
                    }
                    layui.table.render(target.all);
                    return true;
                }
            });
            y2ui.element[name]['sldata'].elem = '#' + dom.id;
            y2ui.element[name]['sldata'].data = data;
            y2ui.element[name]['sldata'].cols = cols;
            y2ui.element[name]['sldata'].page = { limits: [10, 20, 50, 100], limit: 10, curr: 1 };
            document.querySelector(position).append(y2ui.element[name]);
            layui.table.render(y2ui.element[name]['sldata'].all);
            return y2ui.element[name];
            function newProxy(father) {
                return new Proxy(father, {
                    get(target, key) {
                        return target[key];
                    },
                    set(target, key, value) {
                        target[key] = value;
                        layui.table.render(y2ui.element[name].sldata.all);
                        return true;
                    }
                });
            }
        },
        label: function (name, text, position) {
            text = text || "";
            position = position || "div[group='hidden']";
            y2ui.new.element(name, "label");
            y2ui.element[name].innerText(text);
            document.querySelector(position).append(y2ui.element[name]);
            return y2ui.element[name];
        },
        breadcrumb: function (name, navs, position) {
            navs = navs || ["首页"];
            position = position || "div[group='hidden']";
            y2ui.new.element(name, "span");
            y2ui.element[name].setAttribute("class", "layui-breadcrumb");
            y2ui.element[name].setAttribute("style", "visibility: visible;");
            if (navs.length == 1) {
                y2ui.element[name].append(document.createElement("a"));
                y2ui.element[name].firstChild.append(document.createElement("cite"));
                y2ui.element[name].firstChild.firstChild.innerText = navs[0];
            }
            else if (navs.length > 1) {
                y2ui.element[name].append(document.createElement("a"));
                y2ui.element[name].children[0].innerText = navs[0];
                for (var i = 1; i < navs.length - 1; i++) {
                    y2ui.element[name].append(document.createElement("span"));
                    y2ui.element[name].append(document.createElement("a"));
                    y2ui.element[name].children[2 * i - 1].innerText = ">";
                    y2ui.element[name].children[2 * i - 1].setAttribute("lay-separator", "");
                    y2ui.element[name].children[2 * i].innerText = navs[i];
                }
                y2ui.element[name].append(document.createElement("span"));
                y2ui.element[name].append(document.createElement("a"));
                y2ui.element[name].children[2 * (navs.length - 1) - 1].innerText = ">";
                y2ui.element[name].children[2 * (navs.length - 1) - 1].setAttribute("lay-separator", "");
                y2ui.element[name].children[2 * (navs.length - 1)].append(document.createElement("cite"));
                y2ui.element[name].children[2 * (navs.length - 1)].firstChild.innerText = navs[i];
            }
            document.querySelector(position).append(y2ui.element[name]);
            return y2ui.element[name];
        }
    },

    /**显示操作*/
    show: function (group, ...arg) {
        y2ui.history.show[group] = y2ui.history.show[group] || [];
        if (typeof arg[0] === "number") {
            for (var i = 1; i < arg.length; i++) {
                var index = y2ui.history.show[group].indexOf(arg[i].slname);
                while (index >= 0) {
                    y2ui.history.show[group].splice(index, 1);
                    index = y2ui.history.show[group].indexOf(arg[i].slname);
                }
            }
            for (var i = 1; i < arg.length; i++) {
                y2ui.history.show[group].splice(arg[0] + i - 1, 0, arg[i].slname);
            }
            for (var i = 0; i < y2ui.history.show[group].length; i++) {
                document.querySelector('div[group=' + group + ']').append(y2ui.element[y2ui.history.show[group][i]]);
            }
        }
        else {
            for (var i = 0; i < arg.length; i++) {
                document.querySelector('div[group=' + group + ']').append(arg[i]);
                y2ui.history.show[group].push(arg[i].slname);
            }
        }
    },

    event: {},

    query: function (name, type) {
        if (type !== undefined && y2ui.element[name] === undefined) y2ui.new.element(name, type);
        return y2ui.element[name];
    },

    /**http请求*/
    http: {
        /**
         * 标准http请求（类ajax用法，如果改变了contentType，请确保data格式正确）
         * @param {Object} input
         */
        ajax: function (input) {
            if (input.async == undefined) input.async = true;
            input.data = input.data || "";
            input.success = input.success || function (a) { }
            input.error = input.error || function (a) { }
            input.complete = input.complete || function (a) { }
            input.url = input.url || "";
            input.type = input.type || "GET";
            if (input.contentType === undefined) {
                var newData = new FormData();
                for (let key in input.data) {
                    newData.append(key, input.data[key]);
                }
                input.data = newData;
            }
            else if (input.contentType.indexOf("application/x-www-form-urlencoded") != -1) {
                var newData = "";
                for (let key in input.data) {
                    newData += key + "=" + input.data[key] + "&"
                }
                input.data = encodeURI(newData.substring(0, newData.length - 1));
            }
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function (e) {
                if (e.srcElement.status === 200 || e.srcElement.status === 304) {
                    input.success(e.srcElement.response);
                }
                else {
                    input.error(e.srcElement);
                }
            });
            xhr.addEventListener('error', function (e) {
                input.error(e.srcElement);
            });
            xhr.addEventListener('loadend', function (e) {
                input.complete(e.srcElement);
            });
            xhr.open(input.type, input.url, input.async);
            if (input.contentType !== undefined) xhr.setRequestHeader("Content-type", input.contentType);
            xhr.send(input.data);
        }
    },

    /**内部功能*/
    fn: {
        proxy: function (obj, callbacks, location) {
            location = location || "obj";
            for (let prop in obj) {
                if (typeof obj[prop] === 'object') {
                    var pure = true;
                    for (let propson in obj[prop]) {
                        if (typeof obj[prop][propson] === 'object') {
                            pure = false;
                            break;
                        }
                    }
                    if (pure) obj[prop] = newProxy(obj[prop], callbacks, location);
                    else y2ui.fn.proxy(obj[prop], callbacks, location + "." + prop);
                }
            }
            obj = newProxy(obj, callbacks, location);

            function newProxy(obj, callbacks, location) {
                return new Proxy(obj, {
                    get(target, key) {
                        for (let index in callbacks) {
                            if (callbacks[index]["type"] == "get" && callbacks[index]["target"] == location) callbacks[index]["func"](target, key);
                        }
                        return target[key];
                    },
                    set(target, key, value) {
                        target[key] = value;
                        if (typeof value === 'object') y2ui.fn.proxy(value, callbacks, location);
                        for (let index in callbacks) {
                            if (callbacks[index]["type"] == "get" && callbacks[index]["target"] == location) callbacks[index]["func"](target, key, value);
                        }
                    }
                })
            };
        }
    }
}

/**初始化*/
if (y2ui.query) {
    var $$ = y2ui.query;
    for (let item in y2ui.new) {
        $$[item] = y2ui.new[item];
    }
    for (let item in y2ui.assy) {
        $$[item] = y2ui.assy[item];
    }
    $$.ajax = y2ui.http.ajax;
    $$.show = function (group, ...arg) {
        y2ui.show(group, ...arg);
        for (var i = 0; i < arg.length; i++) {
            if (arg[i].sltype === "table") layui.table.render(arg[i].sldata.all);
        }
        layui.form.render();
    }
    $$.load = y2ui.load;
}