import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { jsx, jsxs } from 'react/jsx-runtime';
import classNames from 'classnames';
import React, { createContext, useState, useContext, forwardRef, useEffect, useRef, useReducer, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Schema from 'async-validator';
import mapValues from 'lodash-es/mapValues';
import each from 'lodash-es/each';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Button = function (props) {
    var _a;
    var _b = props.btnType, btnType = _b === void 0 ? 'default' : _b, className = props.className, _c = props.disabled, disabled = _c === void 0 ? false : _c, size = props.size, children = props.children, href = props.href, restProps = __rest(props, ["btnType", "className", "disabled", "size", "children", "href"]);
    var classes = classNames('btn', className, (_a = {},
        _a["btn-".concat(btnType)] = btnType,
        _a["btn-".concat(size)] = size,
        _a['disabled'] = (btnType === 'link') && disabled,
        _a));
    if (btnType === 'link' && href) {
        return (jsx("a", __assign({ className: classes, href: href }, restProps, { children: children })));
    }
    else {
        return (jsx("button", __assign({ className: classes, disabled: disabled }, restProps, { children: children })));
    }
};

var MenuContext = createContext({ index: '0' });
var Menu = function (props) {
    var className = props.className, _a = props.mode, mode = _a === void 0 ? 'horizontal' : _a, style = props.style, children = props.children, _b = props.defaultIndex, defaultIndex = _b === void 0 ? '0' : _b; props.onSelect; var _c = props.defaultOpenSubMenus, defaultOpenSubMenus = _c === void 0 ? [] : _c;
    var _d = useState(defaultIndex), currentActive = _d[0], setActive = _d[1];
    var handleClick = function (index) {
        setActive(index);
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    //console.log(currentActive)
    var classes = classNames('may-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return jsx("ul", __assign({ className: classes, style: style, "data-testid": "test-menu" }, { children: jsx(MenuContext.Provider, __assign({ value: passedContext }, { children: renderChildren() })) }));
};

var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    var handleClick1 = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (jsx("li", __assign({ className: classes, style: style, onClick: handleClick1 }, { children: children })));
};
MenuItem.displayName = 'MenuItem';

var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    var _b = useState(true), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault(); //阻止浏览器执行事件的默认动作
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('may-submenu', {
            'menu-opened': menuOpen
        });
        var childrenCompontent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return (React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i)
                }));
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return (jsx("ul", __assign({ className: subMenuClasses }, { children: childrenCompontent })));
    };
    return (jsxs("ul", __assign({ className: classes }, hoverEvents, { children: [jsx("div", __assign({ className: "submenu-title" }, clickEvents, { children: title })), renderChildren()] }), index));
};
SubMenu.displayName = 'SubMenu';

var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

var Icon = function (props) {
    var _a;
    var className = props.className, theme = props.theme, restProps = __rest(props, ["className", "theme"]);
    var classes = classNames('may-icon', className, (_a = {},
        _a["icon-".concat(theme)] = theme,
        _a));
    return (jsx(FontAwesomeIcon, __assign({ className: classes }, restProps)));
};

var Input = forwardRef(function (props, ref) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
    var cnames = classNames('may-input-wrapper', (_a = {},
        _a["input-size-".concat(size)] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || typeof value === null) {
            return '';
        }
        else
            return value;
    }; //处理受控组件
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    } //处理受控组件
    return (jsxs("div", __assign({ className: cnames, style: style }, { children: [prepend && jsx("div", __assign({ className: "may-input-group-prepend" }, { children: prepend })), icon && jsx("div", __assign({ className: "icon-wrapper" }, { children: jsx(Icon, { icon: icon, title: "title-".concat(icon) }) })), jsx("input", __assign({}, restProps, { className: "may-input-inner", disabled: disabled, ref: ref })), append && jsx("div", __assign({ className: "may-input-group-append" }, { children: append }))] })));
});

function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

var Transition = function (props) {
    var children = props.children, classNames = props.classNames, animation = props.animation, wrapper = props.wrapper, restProps = __rest(props, ["children", "classNames", "animation", "wrapper"]);
    return (jsx(CSSTransition, __assign({ classNames: classNames ? classNames : animation }, restProps, { children: wrapper ? jsx("div", { children: children }) : children })));
};
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
};

var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions; props.onSelect; var onChange = props.onChange; props.value; var renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "onChange", "value", "renderOption"]);
    var _a = useState(), inputValue = _a[0], setInputValue = _a[1]; //文本框内容
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1]; //下拉框
    var _c = useState(false), loading = _c[0], setLoading = _c[1]; //加载缓冲
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1]; //是否显示
    var debounceValue = useDebounce(inputValue, 500);
    var triggerSearch = useRef(true); //是否select的标志
    useEffect(function () {
        if (debounceValue) {
            if (!triggerSearch.current) {
                triggerSearch.current = true;
                return;
            } //非常重要，避免无限循环
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(results);
                setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
    }, [debounceValue]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        if (onChange) {
            onChange(value);
        }
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        setSuggestions([]);
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (jsx(Transition, __assign({ in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () { setSuggestions([]); } }, { children: jsx("ul", __assign({ className: "may-suggestion-list" }, { children: suggestions.map(function (item, index) {
                    return (jsx("li", __assign({ className: "suggestion-item", onClick: function () { handleSelect(item); } }, { children: renderTemplate(item) }), index));
                }) })) })));
    };
    return (jsxs("div", __assign({ className: "may-auto-complete" }, { children: [jsx(Input, __assign({ value: inputValue, onChange: handleChange }, restProps)), loading && jsx("ul", { children: jsx(Icon, { icon: "spinner", spin: true }) }), suggestions.length > 0 && generateDropdown()] })));
};

var Progress = function (props) {
    var percent = props.percent, _a = props.strokeHeight, strokeHeight = _a === void 0 ? 15 : _a, _b = props.showText, showText = _b === void 0 ? true : _b, styles = props.styles, _c = props.theme, theme = _c === void 0 ? 'primary' : _c;
    return (jsx("div", __assign({ className: "may-progress-bar", style: styles }, { children: jsx("div", __assign({ className: "may-progress-bar-outer", style: { height: "".concat(strokeHeight, "px") } }, { children: jsx("div", __assign({ className: "may-progress-bar-inner color-".concat(theme), style: { width: "".concat(percent, "%") } }, { children: showText && jsx("span", __assign({ className: "inner-text" }, { children: "".concat(percent, "%") })) })) })) })));
};

var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (jsx("ul", { children: fileList.map(function (item) {
            return (jsxs("li", __assign({ className: "may-upload-list-item" }, { children: [jsxs("span", __assign({ className: "file-name file-name-".concat(item.status) }, { children: [jsx(Icon, { icon: "file-alt", theme: "secondary" }), item.name] })), jsxs("span", __assign({ className: "file-status" }, { children: [(item.status === "uploading" || item.status === "ready") && (jsx(Icon, { icon: "spinner", spin: true, theme: "primary" })), item.status === "success" && (jsx(Icon, { icon: "check-circle", theme: "success" })), item.status === "error" && (jsx(Icon, { icon: "times-circle", theme: "danger" }))] })), jsx("span", __assign({ className: "file-actions" }, { children: jsx(Icon, { icon: "times", onClick: function () {
                                onRemove(item);
                            } }) })), item.status == 'uploading' && jsx(Progress, { percent: item.percent || 0 })] }), item.uid));
        }) }));
};

var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var kclass = classNames('may-uploader-dragger', {
        'is-dragover': dragOver
    });
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    return (jsx("div", __assign({ className: kclass, onDrop: handleDrop, onDragOver: function (e) { handleDrag(e, true); }, onDragLeave: function (e) { handleDrag(e, false); } }, { children: children })));
};

var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, _a = props.drag, drag = _a === void 0 ? true : _a;
    var fileInput = useRef(null);
    var _b = useState(defaultFileList || []), fileList = _b[0], setFileList = _b[1];
    var handleClick = function () {
        var _a;
        if (fileInput) {
            (_a = fileInput.current) === null || _a === void 0 ? void 0 : _a.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = "";
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result === true) {
                    post(file);
                }
            }
        });
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid == updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        } //用户传入data
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    _file.status = 'uploading';
                    _file.percent = percentage;
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            },
        })
            .then(function (resp) {
            console.log(resp.data);
            updateFileList(_file, { status: 'success', response: resp.data });
            _file.status = 'success';
            _file.response = resp.data;
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        })
            .catch(function (err) {
            console.log(err);
            updateFileList(_file, { status: 'error', error: err });
            _file.status = 'error';
            _file.error = err;
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    }; //封装请求函数便于复用
    return (jsxs("div", __assign({ className: "may-upload-compontent" }, { children: [jsxs("div", __assign({ className: "may-upload-input", style: { display: 'inline-block' }, onClick: handleClick }, { children: [drag ? jsx(Dragger, __assign({ onFile: function (files) { uploadFiles(files); } }, { children: children })) : children, jsx("input", { className: "may-file-input", style: { display: "none" }, onChange: handleFileChange, ref: fileInput, type: "file", accept: accept, multiple: multiple })] })), jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] })));
};

function fieldsReducer(state, action) {
    var _a, _b, _c;
    switch (action.type) {
        case 'addField':
            return __assign(__assign({}, state), (_a = {}, _a[action.name] = __assign({}, action.value), _a));
        case 'updateValue':
            return __assign(__assign({}, state), (_b = {}, _b[action.name] = __assign(__assign({}, state[action.name]), { value: action.value }), _b));
        case 'updateValidateResult':
            var _d = action.value, isValid = _d.isValid, errors = _d.errors;
            return __assign(__assign({}, state), (_c = {}, _c[action.name] = __assign(__assign({}, state[action.name]), { isValid: isValid, errors: errors }), _c));
        default:
            return state;
    }
}
function useStore(initialValues) {
    var _this = this;
    var _a = useState({ isValid: true, isSubmitting: false, errors: {} }), form = _a[0], setForm = _a[1];
    var _b = useReducer(fieldsReducer, {}), fields = _b[0], dispatch = _b[1];
    var getFiledValue = function (key) {
        return fields[key] && fields[key].value;
    }; //拿到单个值
    var transfromRules = function (rules) {
        return (rules.map(function (rule) {
            if (typeof rule === 'function') {
                var calledRule = rule({ getFiledValue: getFiledValue });
                return calledRule;
            }
            else {
                return rule;
            }
        }));
    }; //更改rules，用户传入自定义fun和RuleItem都变成RuleItem，再传入下方descriptor
    var validateField = function (name) { return __awaiter(_this, void 0, void 0, function () {
        var _a, value, rules, afterRules, descriptor, valueMap, validator, isValid, errors, e_1;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = fields[name], value = _a.value, rules = _a.rules;
                    afterRules = transfromRules(rules);
                    descriptor = (_b = {},
                        _b[name] = afterRules,
                        _b);
                    valueMap = (_c = {},
                        _c[name] = value,
                        _c);
                    validator = new Schema(descriptor);
                    isValid = true;
                    errors = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _d.sent();
                    isValid = false;
                    errors = e_1.errors;
                    return [3 /*break*/, 5];
                case 4:
                    dispatch({ type: 'updateValidateResult', name: name, value: { isValid: isValid, errors: errors } });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }; //单个input检验
    var validateAllFields = function () { return __awaiter(_this, void 0, void 0, function () {
        var isValid, errors, valueMap, descriptor, validator, e_2, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isValid = true;
                    errors = {};
                    valueMap = mapValues(fields, function (item) { return item.value; });
                    descriptor = mapValues(fields, function (item) { return transfromRules(item.rules); });
                    validator = new Schema(descriptor);
                    setForm(__assign(__assign({}, form), { isSubmitting: true }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    isValid = false;
                    err = e_2;
                    errors = err.fields;
                    each(fields, function (value, name) {
                        // errors 中有对应的 key
                        if (errors[name]) {
                            var itemErrors = errors[name];
                            dispatch({ type: 'updateValidateResult', name: name, value: { isValid: false, errors: itemErrors } });
                        }
                        else if (value.rules.length > 0 && !errors[name]) {
                            dispatch({ type: 'updateValidateResult', name: name, value: { isValid: true, errors: [] } });
                        }
                        //  有对应的 rules，并且没有 errors
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setForm(__assign(__assign({}, form), { isSubmitting: false, isValid: isValid, errors: errors }));
                    return [2 /*return*/, {
                            isValid: isValid,
                            errors: errors,
                            values: valueMap
                        }];
                case 5: return [2 /*return*/];
            }
        });
    }); }; //表单检验
    var resetFields = function () {
        if (initialValues) {
            each(initialValues, function (value, name) {
                if (fields[name]) {
                    dispatch({ type: 'updateValue', name: name, value: value });
                }
            });
        }
    }; //重置
    var getFieldsValue = function () {
        return mapValues(fields, function (item) { return item.value; });
    }; //拿到所有
    var setFieldValue = function (name, value) {
        if (fields[name]) {
            dispatch({ type: 'updateValue', name: name, value: value });
        }
    };
    return {
        fields: fields,
        dispatch: dispatch,
        form: form,
        validateField: validateField,
        validateAllFields: validateAllFields,
        setFieldValue: setFieldValue,
        resetFields: resetFields,
        getFieldsValue: getFieldsValue
    };
}

var FormContext = createContext({});
var Form = forwardRef(function (props, ref) {
    var name = props.name, children = props.children, initialValues = props.initialValues, onFinish = props.onFinish, onFinishFailed = props.onFinishFailed;
    var _a = useStore(initialValues), form = _a.form, fields = _a.fields, dispatch = _a.dispatch, restProps = __rest(_a, ["form", "fields", "dispatch"]);
    var validateAllFields = restProps.validateAllFields, validateField = restProps.validateField;
    useImperativeHandle(ref, function () {
        return __assign({}, restProps);
    });
    var passedContext = {
        dispatch: dispatch,
        fields: fields,
        initialValues: initialValues,
        validateField: validateField,
    };
    var submitForm = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, isValid, errors, values;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    e.stopPropagation();
                    return [4 /*yield*/, validateAllFields()];
                case 1:
                    _a = _b.sent(), isValid = _a.isValid, errors = _a.errors, values = _a.values;
                    if (isValid && onFinish) {
                        onFinish(values);
                    }
                    else if (!isValid && onFinishFailed) {
                        onFinishFailed(values, errors);
                    }
                    return [2 /*return*/];
            }
        });
    }); }; //提交表单的回调和
    var childrenNode;
    if (typeof children === 'function') {
        childrenNode = children(form);
    }
    else {
        childrenNode = children;
    }
    return (jsx("form", __assign({ name: name, className: "may-form", onSubmit: submitForm }, { children: jsx(FormContext.Provider, __assign({ value: passedContext }, { children: childrenNode })) })));
});

var FormItem = function (props) {
    var _a = props, label = _a.label, children = _a.children, name = _a.name, _b = _a.valuePropName, valuePropName = _b === void 0 ? "value" : _b, _c = _a.trigger, trigger = _c === void 0 ? "onChange" : _c, _d = _a.getValueFromEvent, getValueFromEvent = _d === void 0 ? function (e) { return e.target.value; } : _d, rules = _a.rules, _e = _a.validateTrigger, validateTrigger = _e === void 0 ? "onBlur" : _e;
    var _f = useContext(FormContext), dispatch = _f.dispatch, fields = _f.fields, initialValues = _f.initialValues, validateField = _f.validateField;
    var rowClass = classNames("may-row", {
        "may-row-no-label": !label,
    });
    useEffect(function () {
        var value = (initialValues && initialValues[name]) || "";
        dispatch({ type: "addField", name: name, value: { label: label, name: name, value: value, rules: rules || [], errors: [], isValid: true } });
    }, []);
    var onValueUpdate = function (e) {
        var value = getValueFromEvent(e);
        console.log("new value", value);
        dispatch({ type: "updateValue", name: name, value: value });
    };
    var onValueValidate = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateField(name)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var fieldsState = fields[name];
    var value = fieldsState && fieldsState.value; //一开始可能不存在
    var errors = fieldsState && fieldsState.errors;
    var isRequired = rules === null || rules === void 0 ? void 0 : rules.some(function (rule) { return typeof rule !== "function" && rule.required; });
    var hasError = errors && errors.length > 0;
    var labelClass = classNames({
        "may-form-item-required": isRequired,
    });
    var itemClass = classNames("may-form-item-control", {
        "may-form-item-has-error": hasError,
    });
    //手动的创建一个属性列表，需要有 value 以及 onChange 属性
    var controlProps = {};
    controlProps[valuePropName] = value;
    controlProps[trigger] = onValueUpdate;
    if (rules) {
        controlProps[validateTrigger] = onValueValidate;
    }
    var childList = React.Children.toArray(children);
    // 没有子组件
    if (childList.length === 0) {
        console.error("No child element found in Form.Item, please provide one form component");
    }
    // 子组件大于一个
    if (childList.length > 1) {
        console.warn("Only support one child element in Form.Item, others will be omitted");
    }
    // 不是 ReactElement 的子组件
    if (!React.isValidElement(childList[0])) {
        console.error("Child component is not a valid React Element");
    }
    var child = childList[0];
    var returnChildNode = React.cloneElement(child, __assign(__assign({}, child.props), controlProps));
    return (jsxs("div", __assign({ className: rowClass }, { children: [label &&
                jsx("div", __assign({ className: "may-form-item-label" }, { children: jsx("label", __assign({ title: label, className: labelClass }, { children: label })) })), jsxs("div", __assign({ className: "may-form-item" }, { children: [jsx("div", __assign({ className: itemClass }, { children: returnChildNode })), hasError && (jsx("div", __assign({ className: "may-form-item-explain" }, { children: jsx("span", { children: errors[0].message }) })))] }))] })));
};

var TransForm = Form;
TransForm.Item = FormItem;

// import React from 'react';
library.add(fas);

export { AutoComplete, Button, TransForm as Form, Icon, Input, TransMenu as Menu, Progress, Transition, Upload };
