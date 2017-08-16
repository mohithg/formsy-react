!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.Formsy=e(require("react")):t.Formsy=e(t.react)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){(function(e){"use strict";function r(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=function(){function t(t,e){var n=[],r=!0,i=!1,o=void 0;try{for(var s,a=t[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);r=!0);}catch(t){i=!0,o=t}finally{try{!r&&a.return&&a.return()}finally{if(i)throw o}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=n(10),u=e.React||n(2),c=n(5),l={},p=n(13),f=n(16),d=n(9),h=n(4),m=n(12),y=n(11),v={},F=[];l.Mixin=h,l.HOC=m,l.Decorator=y,l.defaults=function(t){v=t},l.addValidationRule=function(t,e){p[t]=e},l.Form=c({displayName:"Formsy",getInitialState:function(){return{isValid:!0,isSubmitting:!1,canChange:!1}},getDefaultProps:function(){return{onSuccess:function(){},onError:function(){},onSubmit:function(){},onValidSubmit:function(){},onInvalidSubmit:function(){},onValid:function(){},onInvalid:function(){},onChange:function(){},validationErrors:null,preventExternalInvalidation:!1}},childContextTypes:{formsy:a.object},getChildContext:function(){var t=this;return{formsy:{attachToForm:this.attachToForm,detachFromForm:this.detachFromForm,validate:this.validate,isFormDisabled:this.isFormDisabled,isValidValue:function(e,n){return t.runValidation(e,n).then(function(t){return t.isValid})}}}},componentWillMount:function(){this.inputs=[],this.cachedValues={}},componentDidMount:function(){this.validateForm()},componentWillUpdate:function(){this.prevInputNames=this.inputs.map(function(t){return t.props.name})},componentDidUpdate:function(){this.props.validationErrors&&"object"===s(this.props.validationErrors)&&Object.keys(this.props.validationErrors).length>0&&this.setInputValidationErrors(this.props.validationErrors);var t=this.inputs.map(function(t){return t.props.name});d.arraysDiffer(this.prevInputNames,t)&&this.validateForm()},reset:function(t){this.setFormPristine(!0),this.resetModel(t)},submit:function(t){t&&t.preventDefault(),this.setFormPristine(!1);var e=this.getModel();this.props.onSubmit(e,this.resetModel,this.updateInputsWithError),this.state.isValid?this.props.onValidSubmit(e,this.resetModel,this.updateInputsWithError):this.props.onInvalidSubmit(e,this.resetModel,this.updateInputsWithError)},mapModel:function(t){return this.props.mapping?this.props.mapping(t):f.toObj(Object.keys(t).reduce(function(e,n){for(var r=n.split("."),i=e;r.length;){var o=r.shift();i=i[o]=r.length?i[o]||{}:t[n]}return e},{}))},getModel:function(){var t=this.getCurrentValues();return this.mapModel(t)},resetModel:function(t){this.inputs.forEach(function(e){var n=e.props.name;t&&t.hasOwnProperty(n)?e.setValue(t[n]):e.resetValue()}),this.validateForm()},setInputValidationErrors:function(t){this.inputs.forEach(function(e){var n=e.props.name;if(n in t){var r=[{_isValid:null===t[n],_validationError:"string"==typeof t[n]?[t[n]]:t[n]}];e.setState.apply(e,r)}})},isChanged:function(){return!d.isSame(this.getPristineValues(),this.getCurrentValues())},getPristineValues:function(){return this.inputs.reduce(function(t,e){var n=e.props.name;return t[n]=e.props.value,t},{})},updateInputsWithError:function(t){var e=this;Object.keys(t).forEach(function(n,r){var i=d.find(e.inputs,function(t){return t.props.name===n});if(!i)throw new Error("You are trying to update an input that does not exist. Verify errors object with input names. "+JSON.stringify(t));var o=[{_isValid:e.props.preventExternalInvalidation||!1,_externalError:"string"==typeof t[n]?[t[n]]:t[n]}];i.setState.apply(i,o)})},isFormDisabled:function(){return this.props.disabled},getCurrentValues:function(){return this.inputs.reduce(function(t,e){var n=e.props.name;return t[n]=e.state._value,t},{})},setFormPristine:function(t){this.setState({_formSubmitted:!t}),this.inputs.forEach(function(e,n){e.setState({_formSubmitted:!t,_isPristine:t})})},validate:function(t){var e=this;this.state.canChange&&this.props.onChange(this.getModel(),this.isChanged()),this.runValidation(t).then(function(n){n&&t.setState({_isValid:n.isValid,_isRequired:n.isRequired,_validationError:n.error,_externalError:null},e.validateForm)})},runValidation:function(t,e){var n=this,r=this.getCurrentValues(),i=t.props.validationErrors,s=t.props.validationError;if(e=2===arguments.length?e:t.state._value,this.cachedValues[t.props.name]===e){var a=t.isValid(),u=t.showRequired(),c=[t.getErrorMessage()];return new Promise(function(t,e){t({isValid:a,isRequired:u,error:c})})}return this.cachedValues[t.props.name]=e,Promise.all([this.runRules(e,r,t._validations),this.runRules(e,r,t._requiredValidations)]).then(function(e){var r=o(e,2),a=r[0],u=r[1],c=Promise.resolve();return"function"==typeof t.validate&&(c=Promise.resolve(t.validate()).then(function(t){a.failed=t?[]:["failed"]})),c.then(function(){if(!(n.inputs.indexOf(t)<0)){var e=!!Object.keys(t._requiredValidations).length&&!!u.success.length,r=!(a.failed.length||n.props.validationErrors&&n.props.validationErrors[t.props.name]);return{isRequired:e,isValid:!e&&r,error:function(){if(r&&!e)return F;if(a.errors.length)return a.errors;if(this.props.validationErrors&&this.props.validationErrors[t.props.name])return"string"==typeof this.props.validationErrors[t.props.name]?[this.props.validationErrors[t.props.name]]:this.props.validationErrors[t.props.name];if(e){var n=i[u.success[0]];return n?[n]:null}return a.failed.length?a.failed.map(function(t){return i[t]?i[t]:s}).filter(function(t,e,n){return n.indexOf(t)===e}):void 0}.call(n)}}})})},runRules:function(t,e,n){var r={errors:[],failed:[],success:[]};return Promise.all(Object.keys(n).map(function(i){if(p[i]&&"function"==typeof n[i])throw new Error("Formsy does not allow you to override default validations: "+i);if(!p[i]&&"function"!=typeof n[i])throw new Error("Formsy does not have the validation rule: "+i);return"function"==typeof n[i]?Promise.resolve(n[i](e,t)).then(function(t){"string"==typeof t?(r.errors.push(t),r.failed.push(i)):t||r.failed.push(i)}):"function"!=typeof n[i]?Promise.resolve(p[i](e,t,n[i])).then(function(t){"string"==typeof t?(r.errors.push(t),r.failed.push(i)):t?r.success.push(i):r.failed.push(i)}):r.success.push(i)})).then(function(){return r})},validateForm:function(){var t=this,e=function(){var t=this.inputs.every(function(t){return t.state._isValid});this.setState({isValid:t}),t?this.props.onValid():this.props.onInvalid(),this.setState({canChange:!0})}.bind(this);this.inputs.forEach(function(n,r){t.runValidation(n).then(function(i){i&&(i.isValid&&n.state._externalError&&(i.isValid=!1),n.setState({_isValid:i.isValid,_isRequired:i.isRequired,_validationError:i.error,_externalError:!i.isValid&&n.state._externalError?n.state._externalError:null},r===t.inputs.length-1?e:null))})}),this.inputs.length||this.setState({canChange:!0})},attachToForm:function(t){this.inputs.indexOf(t)===-1&&this.inputs.push(t),this.validate(t)},detachFromForm:function(t){var e=this.inputs.indexOf(t);e!==-1&&(this.inputs=this.inputs.slice(0,e).concat(this.inputs.slice(e+1))),this.validateForm()},render:function(){var t=this.props,e=(t.mapping,t.validationErrors,t.onSubmit,t.onValid,t.onValidSubmit,t.onInvalid,t.onInvalidSubmit,t.onChange,t.reset,t.preventExternalInvalidation,t.onSuccess,t.onError,r(t,["mapping","validationErrors","onSubmit","onValid","onValidSubmit","onInvalid","onInvalidSubmit","onChange","reset","preventExternalInvalidation","onSuccess","onError"]));return u.createElement("form",i({},e,{onSubmit:this.submit}),this.props.children)}}),e.exports||e.module||e.define&&e.define.amd||(e.Formsy=l),t.exports=l}).call(e,function(){return this}())},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(t){if(l===setTimeout)return setTimeout(t,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(t,0);try{return l(t,0)}catch(e){try{return l.call(null,t,0)}catch(e){return l.call(this,t,0)}}}function o(t){if(p===clearTimeout)return clearTimeout(t);if((p===r||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(t);try{return p(t)}catch(e){try{return p.call(null,t)}catch(e){return p.call(this,t)}}}function s(){m&&d&&(m=!1,d.length?h=d.concat(h):y=-1,h.length&&a())}function a(){if(!m){var t=i(s);m=!0;for(var e=h.length;e;){for(d=h,h=[];++y<e;)d&&d[y].run();y=-1,e=h.length}d=null,m=!1,o(t)}}function u(t,e){this.fun=t,this.array=e}function c(){}var l,p,f=t.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(t){l=n}try{p="function"==typeof clearTimeout?clearTimeout:r}catch(t){p=r}}();var d,h=[],m=!1,y=-1;f.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];h.push(new u(t,e)),1!==h.length||m||i(a)},u.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=c,f.addListener=c,f.once=c,f.off=c,f.removeListener=c,f.removeAllListeners=c,f.emit=c,f.prependListener=c,f.prependOnceListener=c,f.listeners=function(t){return[]},f.binding=function(t){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(t){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(e,n){e.exports=t},function(t,e,n){(function(e){"use strict";function n(t,e,n,i,o,s,a,u){if(r(e),!t){var c;if(void 0===e)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,i,o,s,a,u],p=0;c=new Error(e.replace(/%s/g,function(){return l[p++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}}var r=function(t){};"production"!==e.env.NODE_ENV&&(r=function(t){if(void 0===t)throw new Error("invariant requires an error message argument")}),t.exports=n}).call(e,n(1))},function(t,e,n){(function(e){"use strict";var r=n(10),i=n(9),o=(e.React||n(2),function(t){return"string"==typeof t?t.split(/\,(?![^{\[]*[}\]])/g).reduce(function(t,e){var n=e.split(":"),r=n.shift();if(n=n.map(function(t){try{return JSON.parse(t)}catch(e){return t}}),n.length>1)throw new Error("Formsy does not support multiple args on string validations. Use object format of validations instead.");return t[r]=!n.length||n[0],t},{}):t||{}});t.exports={getInitialState:function(){return{_value:this.props.value,_isRequired:!1,_isValid:!this.props.required,_isPristine:!0,_pristineValue:this.props.value,_validationError:[],_externalError:null,_formSubmitted:!1}},contextTypes:{formsy:r.object},getDefaultProps:function(){return{validationError:"",validationErrors:{}}},componentWillMount:function(){this.canSetValue=!0;var t=function(){this.setValidations(this.props.validations,this.props.required),this.context.formsy.attachToForm(this)}.bind(this);if(!this.props.name)throw new Error("Form Input requires a name property when used");t()},componentWillReceiveProps:function(t){this.setValidations(t.validations,t.required)},componentDidUpdate:function(t){i.isSame(this.props.value,t.value)||this.setValue(this.props.value),i.isSame(this.props.validations,t.validations)&&i.isSame(this.props.required,t.required)||this.context.formsy.validate(this)},componentWillUnmount:function(){this.canSetValue=!1,this.context.formsy.detachFromForm(this)},setValidations:function(t,e){this._validations=o(t)||{},this._requiredValidations=e===!0?{isDefaultRequiredValue:!0}:o(e)},setValue:function(t){this.canSetValue&&this.setState({_value:t,_isPristine:!1},function(){this.context.formsy.validate(this)}.bind(this))},resetValue:function(){this.setState({_value:this.state._pristineValue,_isPristine:!0},function(){this.context.formsy.validate(this)})},getValue:function(){return this.state._value},hasValue:function(){return""!==this.state._value},getErrorMessage:function(){var t=this.getErrorMessages();return t.length?t[0]:null},getErrorMessages:function(){return!this.isValid()||this.showRequired()?this.state._externalError||this.state._validationError||[]:[]},isFormDisabled:function(){return this.context.formsy.isFormDisabled()},isValid:function(){return this.state._isValid},isPristine:function(){return this.state._isPristine},isFormSubmitted:function(){return this.state._formSubmitted},isRequired:function(){return!!this.props.required},showRequired:function(){return this.state._isRequired},showError:function(){return!this.showRequired()&&!this.isValid()},isValidValue:function(t){return this.context.formsy.isValidValue.call(null,this,t)}}}).call(e,function(){return this}())},function(t,e,n){"use strict";var r=n(2),i=n(14);if("undefined"==typeof r)throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");var o=(new r.Component).updater;t.exports=i(r.Component,r.isValidElement,o)},function(t,e){"use strict";function n(t){return function(){return t}}var r=function(){};r.thatReturns=n,r.thatReturnsFalse=n(!1),r.thatReturnsTrue=n(!0),r.thatReturnsNull=n(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(t){return t},t.exports=r},function(t,e,n){(function(e){"use strict";var r=n(6),i=r;if("production"!==e.env.NODE_ENV){var o=function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var i=0,o="Warning: "+t.replace(/%s/g,function(){return n[i++]});"undefined"!=typeof console&&console.error(o);try{throw new Error(o)}catch(t){}};i=function(t,e){if(void 0===e)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==e.indexOf("Failed Composite propType: ")&&!t){for(var n=arguments.length,r=Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];o.apply(void 0,[e].concat(r))}}}t.exports=i}).call(e,n(1))},function(t,e){"use strict";var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";t.exports=n},function(t,e){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports={arraysDiffer:function(t,e){var n=!1;return t.length!==e.length?n=!0:t.forEach(function(t,r){this.isSame(t,e[r])||(n=!0)},this),n},objectsDiffer:function(t,e){var n=!1;return Object.keys(t).length!==Object.keys(e).length?n=!0:Object.keys(t).forEach(function(r){this.isSame(t[r],e[r])||(n=!0)},this),n},isSame:function(t,e){return("undefined"==typeof t?"undefined":n(t))===("undefined"==typeof e?"undefined":n(e))&&(Array.isArray(t)&&Array.isArray(e)?!this.arraysDiffer(t,e):"function"==typeof t?t.toString()===e.toString():"object"===("undefined"==typeof t?"undefined":n(t))&&null!==t&&null!==e?!this.objectsDiffer(t,e):t===e)},find:function(t,e){for(var n=0,r=t.length;n<r;n++){var i=t[n];if(e(i))return i}return null}}},function(t,e,n){(function(e){if("production"!==e.env.NODE_ENV){var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,i=function(t){return"object"==typeof t&&null!==t&&t.$$typeof===r},o=!0;t.exports=n(20)(i,o)}else t.exports=n(19)()}).call(e,n(1))},function(t,e,n){(function(e){"use strict";var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=e.React||n(2),o=n(5),s=n(4);t.exports=function(){return function(t){return o({mixins:[s],render:function(){return i.createElement(t,r({setValidations:this.setValidations,setValue:this.setValue,resetValue:this.resetValue,getValue:this.getValue,hasValue:this.hasValue,getErrorMessage:this.getErrorMessage,getErrorMessages:this.getErrorMessages,isFormDisabled:this.isFormDisabled,isValid:this.isValid,isPristine:this.isPristine,isFormSubmitted:this.isFormSubmitted,isRequired:this.isRequired,showRequired:this.showRequired,showError:this.showError,isValidValue:this.isValidValue},this.props))}})}}}).call(e,function(){return this}())},function(t,e,n){(function(e){"use strict";function r(t){return t.displayName||t.name||("string"==typeof t?t:"Component")}var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=e.React||n(2),s=n(5),a=n(4);t.exports=function(t){return s({displayName:"Formsy("+r(t)+")",mixins:[a],render:function(){var e=this.props.innerRef,n=i({setValidations:this.setValidations,setValue:this.setValue,resetValue:this.resetValue,getValue:this.getValue,hasValue:this.hasValue,getErrorMessage:this.getErrorMessage,getErrorMessages:this.getErrorMessages,isFormDisabled:this.isFormDisabled,isValid:this.isValid,isPristine:this.isPristine,isFormSubmitted:this.isFormSubmitted,isRequired:this.isRequired,showRequired:this.showRequired,showError:this.showError,isValidValue:this.isValidValue},this.props);return e&&(n.ref=e),o.createElement(t,n)}})}}).call(e,function(){return this}())},function(t,e){"use strict";var n=function(t){return null!==t&&void 0!==t},r=function(t){return""===t},i={isDefaultRequiredValue:function(t,e){return void 0===e||""===e},isExisty:function(t,e){return n(e)},matchRegexp:function(t,e,i){return!n(e)||r(e)||i.test(e)},isUndefined:function(t,e){return void 0===e},isEmptyString:function(t,e){return r(e)},isEmail:function(t,e){return i.matchRegexp(t,e,/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i)},isUrl:function(t,e){return i.matchRegexp(t,e,/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i)},isTrue:function(t,e){return e===!0},isFalse:function(t,e){return e===!1},isNumeric:function(t,e){return"number"==typeof e||i.matchRegexp(t,e,/^[-+]?(?:\d*[.])?\d+$/)},isAlpha:function(t,e){return i.matchRegexp(t,e,/^[A-Z]+$/i)},isAlphanumeric:function(t,e){return i.matchRegexp(t,e,/^[0-9A-Z]+$/i)},isInt:function(t,e){return i.matchRegexp(t,e,/^(?:[-+]?(?:0|[1-9]\d*))$/)},isFloat:function(t,e){return i.matchRegexp(t,e,/^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][\+\-]?(?:\d+))?$/)},isWords:function(t,e){return i.matchRegexp(t,e,/^[A-Z\s]+$/i)},isSpecialWords:function(t,e){return i.matchRegexp(t,e,/^[A-Z\s\u00C0-\u017F]+$/i)},isLength:function(t,e,i){return!n(e)||r(e)||e.length===i},equals:function(t,e,i){return!n(e)||r(e)||e==i},equalsField:function(t,e,n){return e==t[n]},maxLength:function(t,e,r){return!n(e)||e.length<=r},minLength:function(t,e,i){return!n(e)||r(e)||e.length>=i}};t.exports=i},function(t,e,n){(function(e){"use strict";function r(t){return t}function i(t,n,i){function p(t,n,r){for(var i in n)n.hasOwnProperty(i)&&"production"!==e.env.NODE_ENV&&u("function"==typeof n[i],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",t.displayName||"ReactClass",c[r],i)}function f(t,e){var n=D.hasOwnProperty(e)?D[e]:null;N.hasOwnProperty(e)&&a("OVERRIDE_BASE"===n,"ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.",e),t&&a("DEFINE_MANY"===n||"DEFINE_MANY_MERGED"===n,"ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",e)}function d(t,r){if(r){a("function"!=typeof r,"ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."),a(!n(r),"ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");var i=t.prototype,o=i.__reactAutoBindPairs;r.hasOwnProperty(l)&&x.mixins(t,r.mixins);for(var s in r)if(r.hasOwnProperty(s)&&s!==l){var c=r[s],p=i.hasOwnProperty(s);if(f(p,s),x.hasOwnProperty(s))x[s](t,c);else{var d=D.hasOwnProperty(s),h="function"==typeof c,m=h&&!d&&!p&&r.autobind!==!1;if(m)o.push(s,c),i[s]=c;else if(p){var F=D[s];a(d&&("DEFINE_MANY_MERGED"===F||"DEFINE_MANY"===F),"ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.",F,s),"DEFINE_MANY_MERGED"===F?i[s]=y(i[s],c):"DEFINE_MANY"===F&&(i[s]=v(i[s],c))}else i[s]=c,"production"!==e.env.NODE_ENV&&"function"==typeof c&&r.displayName&&(i[s].displayName=r.displayName+"_"+s)}}}else if("production"!==e.env.NODE_ENV){var E=typeof r,g="object"===E&&null!==r;"production"!==e.env.NODE_ENV&&u(g,"%s: You're attempting to include a mixin that is either null or not an object. Check the mixins included by the component, as well as any mixins they include themselves. Expected object but got %s.",t.displayName||"ReactClass",null===r?null:E)}}function h(t,e){if(e)for(var n in e){var r=e[n];if(e.hasOwnProperty(n)){var i=n in x;a(!i,'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',n);var o=n in t;a(!o,"ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",n),t[n]=r}}}function m(t,e){a(t&&e&&"object"==typeof t&&"object"==typeof e,"mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.");for(var n in e)e.hasOwnProperty(n)&&(a(void 0===t[n],"mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.",n),t[n]=e[n]);return t}function y(t,e){return function(){var n=t.apply(this,arguments),r=e.apply(this,arguments);if(null==n)return r;if(null==r)return n;var i={};return m(i,n),m(i,r),i}}function v(t,e){return function(){t.apply(this,arguments),e.apply(this,arguments)}}function F(t,n){var r=n.bind(t);if("production"!==e.env.NODE_ENV){r.__reactBoundContext=t,r.__reactBoundMethod=n,r.__reactBoundArguments=null;var i=t.constructor.displayName,o=r.bind;r.bind=function(s){for(var a=arguments.length,c=Array(a>1?a-1:0),l=1;l<a;l++)c[l-1]=arguments[l];if(s!==t&&null!==s)"production"!==e.env.NODE_ENV&&u(!1,"bind(): React component methods may only be bound to the component instance. See %s",i);else if(!c.length)return"production"!==e.env.NODE_ENV&&u(!1,"bind(): You are binding a component method to the component. React does this for you automatically in a high-performance way, so you can safely remove this call. See %s",i),r;var p=o.apply(r,arguments);return p.__reactBoundContext=t,p.__reactBoundMethod=n,p.__reactBoundArguments=c,p}}return r}function E(t){for(var e=t.__reactAutoBindPairs,n=0;n<e.length;n+=2){var r=e[n],i=e[n+1];t[r]=F(t,i)}}function g(t){var n=r(function(t,r,o){"production"!==e.env.NODE_ENV&&u(this instanceof n,"Something is calling a React component directly. Use a factory or JSX instead. See: https://fb.me/react-legacyfactory"),this.__reactAutoBindPairs.length&&E(this),this.props=t,this.context=r,this.refs=s,this.updater=o||i,this.state=null;var c=this.getInitialState?this.getInitialState():null;"production"!==e.env.NODE_ENV&&void 0===c&&this.getInitialState._isMockFunction&&(c=null),a("object"==typeof c&&!Array.isArray(c),"%s.getInitialState(): must return an object or null",n.displayName||"ReactCompositeComponent"),this.state=c});n.prototype=new O,n.prototype.constructor=n,n.prototype.__reactAutoBindPairs=[],b.forEach(d.bind(null,n)),d(n,_),d(n,t),d(n,V),n.getDefaultProps&&(n.defaultProps=n.getDefaultProps()),"production"!==e.env.NODE_ENV&&(n.getDefaultProps&&(n.getDefaultProps.isReactClassApproved={}),n.prototype.getInitialState&&(n.prototype.getInitialState.isReactClassApproved={})),a(n.prototype.render,"createClass(...): Class specification must implement a `render` method."),"production"!==e.env.NODE_ENV&&(u(!n.prototype.componentShouldUpdate,"%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",t.displayName||"A component"),u(!n.prototype.componentWillRecieveProps,"%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",t.displayName||"A component"));for(var o in D)n.prototype[o]||(n.prototype[o]=null);return n}var b=[],D={mixins:"DEFINE_MANY",statics:"DEFINE_MANY",propTypes:"DEFINE_MANY",contextTypes:"DEFINE_MANY",childContextTypes:"DEFINE_MANY",getDefaultProps:"DEFINE_MANY_MERGED",getInitialState:"DEFINE_MANY_MERGED",getChildContext:"DEFINE_MANY_MERGED",render:"DEFINE_ONCE",componentWillMount:"DEFINE_MANY",componentDidMount:"DEFINE_MANY",componentWillReceiveProps:"DEFINE_MANY",shouldComponentUpdate:"DEFINE_ONCE",componentWillUpdate:"DEFINE_MANY",componentDidUpdate:"DEFINE_MANY",componentWillUnmount:"DEFINE_MANY",updateComponent:"OVERRIDE_BASE"},x={displayName:function(t,e){t.displayName=e},mixins:function(t,e){if(e)for(var n=0;n<e.length;n++)d(t,e[n])},childContextTypes:function(t,n){"production"!==e.env.NODE_ENV&&p(t,n,"childContext"),t.childContextTypes=o({},t.childContextTypes,n)},contextTypes:function(t,n){"production"!==e.env.NODE_ENV&&p(t,n,"context"),t.contextTypes=o({},t.contextTypes,n)},getDefaultProps:function(t,e){t.getDefaultProps?t.getDefaultProps=y(t.getDefaultProps,e):t.getDefaultProps=e},propTypes:function(t,n){"production"!==e.env.NODE_ENV&&p(t,n,"prop"),t.propTypes=o({},t.propTypes,n)},statics:function(t,e){h(t,e)},autobind:function(){}},_={componentDidMount:function(){this.__isMounted=!0}},V={componentWillUnmount:function(){this.__isMounted=!1}},N={replaceState:function(t,e){this.updater.enqueueReplaceState(this,t,e)},isMounted:function(){return"production"!==e.env.NODE_ENV&&(u(this.__didWarnIsMounted,"%s: isMounted is deprecated. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.",this.constructor&&this.constructor.displayName||this.name||"Component"),this.__didWarnIsMounted=!0),!!this.__isMounted}},O=function(){};return o(O.prototype,t.prototype,N),g}var o=n(17),s=n(15),a=n(3);if("production"!==e.env.NODE_ENV)var u=n(7);var c,l="mixins";c="production"!==e.env.NODE_ENV?{prop:"prop",context:"context",childContext:"child context"}:{},t.exports=i}).call(e,n(1))},function(t,e,n){(function(e){"use strict";var n={};"production"!==e.env.NODE_ENV&&Object.freeze(n),t.exports=n}).call(e,n(1))},function(t,e){function n(t){return Object.keys(t).reduce(function(e,n){var r=n.match(/[^\[]*/i),i=n.match(/\[.*?\]/g)||[];i=[r[0]].concat(i).map(function(t){return t.replace(/\[|\]/g,"")});for(var o=e;i.length;){var s=i.shift();s in o?o=o[s]:(o[s]=i.length?isNaN(i[0])?{}:[]:t[n],o=o[s])}return e},{})}function r(t){function e(t,n,r){return Array.isArray(r)||"[object Object]"===Object.prototype.toString.call(r)?(Object.keys(r).forEach(function(i){e(t,n+"["+i+"]",r[i])}),t):(t[n]=r,t)}var n=Object.keys(t);return n.reduce(function(n,r){return e(n,r,t[r])},{})}t.exports={fromObj:r,toObj:n}},function(t,e){/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
"use strict";function n(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function r(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;var r=Object.getOwnPropertyNames(e).map(function(t){return e[t]});if("0123456789"!==r.join(""))return!1;var i={};return"abcdefghijklmnopqrst".split("").forEach(function(t){i[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},i)).join("")}catch(t){return!1}}var i=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;t.exports=r()?Object.assign:function(t,e){for(var r,a,u=n(t),c=1;c<arguments.length;c++){r=Object(arguments[c]);for(var l in r)o.call(r,l)&&(u[l]=r[l]);if(i){a=i(r);for(var p=0;p<a.length;p++)s.call(r,a[p])&&(u[a[p]]=r[a[p]])}}return u}},function(t,e,n){(function(e){"use strict";function r(t,n,r,u,c){if("production"!==e.env.NODE_ENV)for(var l in t)if(t.hasOwnProperty(l)){var p;try{i("function"==typeof t[l],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",u||"React class",r,l),p=t[l](n,l,u,r,null,s)}catch(t){p=t}if(o(!p||p instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",u||"React class",r,l,typeof p),p instanceof Error&&!(p.message in a)){a[p.message]=!0;var f=c?c():"";o(!1,"Failed %s type: %s%s",r,p.message,null!=f?f:"")}}}if("production"!==e.env.NODE_ENV)var i=n(3),o=n(7),s=n(8),a={};t.exports=r}).call(e,n(1))},function(t,e,n){"use strict";var r=n(6),i=n(3),o=n(8);t.exports=function(){function t(t,e,n,r,s,a){a!==o&&i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e};return n.checkPropTypes=r,n.PropTypes=n,n}},function(t,e,n){(function(e){"use strict";var r=n(6),i=n(3),o=n(7),s=n(8),a=n(18);t.exports=function(t,n){function u(t){var e=t&&(w&&t[w]||t[S]);if("function"==typeof e)return e}function c(t,e){return t===e?0!==t||1/t===1/e:t!==t&&e!==e}function l(t){this.message=t,this.stack=""}function p(t){function r(r,c,p,f,d,h,m){if(f=f||R,h=h||p,m!==s)if(n)i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if("production"!==e.env.NODE_ENV&&"undefined"!=typeof console){var y=f+":"+p;!a[y]&&u<3&&(o(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",h,f),a[y]=!0,u++)}return null==c[p]?r?new l(null===c[p]?"The "+d+" `"+h+"` is marked as required "+("in `"+f+"`, but its value is `null`."):"The "+d+" `"+h+"` is marked as required in "+("`"+f+"`, but its value is `undefined`.")):null:t(c,p,f,d,h)}if("production"!==e.env.NODE_ENV)var a={},u=0;var c=r.bind(null,!1);return c.isRequired=r.bind(null,!0),c}function f(t){function e(e,n,r,i,o,s){var a=e[n],u=_(a);if(u!==t){var c=V(a);return new l("Invalid "+i+" `"+o+"` of type "+("`"+c+"` supplied to `"+r+"`, expected ")+("`"+t+"`."))}return null}return p(e)}function d(){return p(r.thatReturnsNull)}function h(t){function e(e,n,r,i,o){if("function"!=typeof t)return new l("Property `"+o+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var a=e[n];if(!Array.isArray(a)){var u=_(a);return new l("Invalid "+i+" `"+o+"` of type "+("`"+u+"` supplied to `"+r+"`, expected an array."))}for(var c=0;c<a.length;c++){var p=t(a,c,r,i,o+"["+c+"]",s);if(p instanceof Error)return p}return null}return p(e)}function m(){function e(e,n,r,i,o){var s=e[n];if(!t(s)){var a=_(s);return new l("Invalid "+i+" `"+o+"` of type "+("`"+a+"` supplied to `"+r+"`, expected a single ReactElement."))}return null}return p(e)}function y(t){function e(e,n,r,i,o){if(!(e[n]instanceof t)){var s=t.name||R,a=O(e[n]);return new l("Invalid "+i+" `"+o+"` of type "+("`"+a+"` supplied to `"+r+"`, expected ")+("instance of `"+s+"`."))}return null}return p(e)}function v(t){function n(e,n,r,i,o){for(var s=e[n],a=0;a<t.length;a++)if(c(s,t[a]))return null;var u=JSON.stringify(t);return new l("Invalid "+i+" `"+o+"` of value `"+s+"` "+("supplied to `"+r+"`, expected one of "+u+"."))}return Array.isArray(t)?p(n):("production"!==e.env.NODE_ENV?o(!1,"Invalid argument supplied to oneOf, expected an instance of array."):void 0,r.thatReturnsNull)}function F(t){function e(e,n,r,i,o){if("function"!=typeof t)return new l("Property `"+o+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var a=e[n],u=_(a);if("object"!==u)return new l("Invalid "+i+" `"+o+"` of type "+("`"+u+"` supplied to `"+r+"`, expected an object."));for(var c in a)if(a.hasOwnProperty(c)){var p=t(a,c,r,i,o+"."+c,s);if(p instanceof Error)return p}return null}return p(e)}function E(t){function n(e,n,r,i,o){for(var a=0;a<t.length;a++){var u=t[a];if(null==u(e,n,r,i,o,s))return null}return new l("Invalid "+i+" `"+o+"` supplied to "+("`"+r+"`."))}if(!Array.isArray(t))return"production"!==e.env.NODE_ENV?o(!1,"Invalid argument supplied to oneOfType, expected an instance of array."):void 0,r.thatReturnsNull;for(var i=0;i<t.length;i++){var a=t[i];if("function"!=typeof a)return o(!1,"Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.",N(a),i),r.thatReturnsNull}return p(n)}function g(){function t(t,e,n,r,i){return D(t[e])?null:new l("Invalid "+r+" `"+i+"` supplied to "+("`"+n+"`, expected a ReactNode."))}return p(t)}function b(t){function e(e,n,r,i,o){var a=e[n],u=_(a);if("object"!==u)return new l("Invalid "+i+" `"+o+"` of type `"+u+"` "+("supplied to `"+r+"`, expected `object`."));for(var c in t){var p=t[c];if(p){var f=p(a,c,r,i,o+"."+c,s);if(f)return f}}return null}return p(e)}function D(e){switch(typeof e){case"number":case"string":case"undefined":return!0;case"boolean":return!e;case"object":if(Array.isArray(e))return e.every(D);if(null===e||t(e))return!0;var n=u(e);if(!n)return!1;var r,i=n.call(e);if(n!==e.entries){for(;!(r=i.next()).done;)if(!D(r.value))return!1}else for(;!(r=i.next()).done;){var o=r.value;if(o&&!D(o[1]))return!1}return!0;default:return!1}}function x(t,e){return"symbol"===t||("Symbol"===e["@@toStringTag"]||"function"==typeof Symbol&&e instanceof Symbol)}function _(t){var e=typeof t;return Array.isArray(t)?"array":t instanceof RegExp?"object":x(e,t)?"symbol":e}function V(t){if("undefined"==typeof t||null===t)return""+t;var e=_(t);if("object"===e){if(t instanceof Date)return"date";if(t instanceof RegExp)return"regexp"}return e}function N(t){var e=V(t);switch(e){case"array":case"object":return"an "+e;case"boolean":case"date":case"regexp":return"a "+e;default:return e}}function O(t){return t.constructor&&t.constructor.name?t.constructor.name:R}var w="function"==typeof Symbol&&Symbol.iterator,S="@@iterator",R="<<anonymous>>",A={array:f("array"),bool:f("boolean"),func:f("function"),number:f("number"),object:f("object"),string:f("string"),symbol:f("symbol"),any:d(),arrayOf:h,element:m(),instanceOf:y,node:g(),objectOf:F,oneOf:v,oneOfType:E,shape:b};return l.prototype=Error.prototype,A.checkPropTypes=a,A.PropTypes=A,A}}).call(e,n(1))}])});
//# sourceMappingURL=formsy-react.js.map