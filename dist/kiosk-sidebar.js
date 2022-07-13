/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,o=null)=>{for(;t!==o;){const o=t.nextSibling;e.removeChild(t),t=o}},o=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${o}--\x3e`,n=new RegExp(`${o}|${i}`);class s{constructor(e,t){this.parts=[],this.element=t;const i=[],s=[],a=document.createTreeWalker(t.content,133,null,!1);let d=0,h=-1,u=0;const{strings:p,values:{length:m}}=e;for(;u<m;){const e=a.nextNode();if(null!==e){if(h++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:o}=t;let i=0;for(let e=0;e<o;e++)r(t[e].name,"$lit$")&&i++;for(;i-- >0;){const t=p[u],o=c.exec(t)[2],i=o.toLowerCase()+"$lit$",s=e.getAttribute(i);e.removeAttribute(i);const r=s.split(n);this.parts.push({type:"attribute",index:h,name:o,strings:r}),u+=r.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),a.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(o)>=0){const o=e.parentNode,s=t.split(n),a=s.length-1;for(let t=0;t<a;t++){let i,n=s[t];if(""===n)i=l();else{const e=c.exec(n);null!==e&&r(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(n)}o.insertBefore(i,e),this.parts.push({type:"node",index:++h})}""===s[a]?(o.insertBefore(l(),e),i.push(e)):e.data=s[a],u+=a}}else if(8===e.nodeType)if(e.data===o){const t=e.parentNode;null!==e.previousSibling&&h!==d||(h++,t.insertBefore(l(),e)),d=h,this.parts.push({type:"node",index:h}),null===e.nextSibling?e.data="":(i.push(e),h--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(o,t+1));)this.parts.push({type:"node",index:-1}),u++}}else a.currentNode=s.pop()}for(const e of i)e.parentNode.removeChild(e)}}const r=(e,t)=>{const o=e.length-t.length;return o>=0&&e.slice(o)===t},a=e=>-1!==e.index,l=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(e,t){const{element:{content:o},parts:i}=e,n=document.createTreeWalker(o,133,null,!1);let s=u(i),r=i[s],a=-1,l=0;const c=[];let d=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-l,s=u(i,s),r=i[s]}c.forEach((e=>e.parentNode.removeChild(e)))}const h=e=>{let t=11===e.nodeType?0:1;const o=document.createTreeWalker(e,133,null,!1);for(;o.nextNode();)t++;return t},u=(e,t=-1)=>{for(let o=t+1;o<e.length;o++){const t=e[o];if(a(t))return o}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const p=new WeakMap,m=e=>"function"==typeof e&&p.has(e),f={},y={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class g{constructor(e,t,o){this.__parts=[],this.template=e,this.processor=t,this.options=o}update(e){let t=0;for(const o of this.__parts)void 0!==o&&o.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),o=[],i=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let s,r=0,l=0,c=n.nextNode();for(;r<i.length;)if(s=i[r],a(s)){for(;l<s.index;)l++,"TEMPLATE"===c.nodeName&&(o.push(c),n.currentNode=c.content),null===(c=n.nextNode())&&(n.currentNode=o.pop(),c=n.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,s.name,s.strings,this.options));r++}else this.__parts.push(void 0),r++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),b=` ${o} `;class S{constructor(e,t,o,i){this.strings=e,this.values=t,this.type=o,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let s=0;s<e;s++){const e=this.strings[s],r=e.lastIndexOf("\x3c!--");n=(r>-1||n)&&-1===e.indexOf("--\x3e",r+1);const a=c.exec(e);t+=null===a?e+(n?b:i):e.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+o}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==w&&(t=w.createHTML(t)),e.innerHTML=t,e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const _=e=>null===e||!("object"==typeof e||"function"==typeof e),v=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class x{constructor(e,t,o){this.dirty=!0,this.element=e,this.name=t,this.strings=o,this.parts=[];for(let e=0;e<o.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new C(this)}_getValue(){const e=this.strings,t=e.length-1,o=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=o[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!v(e))return e}let i="";for(let n=0;n<t;n++){i+=e[n];const t=o[n];if(void 0!==t){const e=t.value;if(_(e)||!v(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||_(e)&&e===this.value||(this.value=e,m(e)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class P{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}const e=this.__pendingValue;e!==f&&(_(e)?e!==this.value&&this.__commitText(e):e instanceof S?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):v(e)?this.__commitIterable(e):e===y?(this.value=y,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,o="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=o:this.__commitNode(document.createTextNode(o)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof g&&this.value.template===t)this.value.update(e.values);else{const o=new g(t,e.processor,this.options),i=o._clone();o.update(e.values),this.__commitNode(i),this.value=o}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let o,i=0;for(const n of e)o=t[i],void 0===o&&(o=new P(this.options),t.push(o),0===i?o.appendIntoPart(this):o.insertAfterPart(t[i-1])),o.setValue(n),o.commit(),i++;i<t.length&&(t.length=i,this.clear(o&&o.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class E{constructor(e,t,o){if(this.value=void 0,this.__pendingValue=void 0,2!==o.length||""!==o[0]||""!==o[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=o}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}}class k extends x{constructor(e,t,o){super(e,t,o),this.single=2===o.length&&""===o[0]&&""===o[1]}_createPart(){return new R(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class R extends C{}let A=!1;(()=>{try{const e={get capture(){return A=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class q{constructor(e,t,o){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=o,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=this.__pendingValue,t=this.value,o=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||o);o&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=N(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const N=e=>e&&(A?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function T(e){let t=M.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},M.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(o);return i=t.keyString.get(n),void 0===i&&(i=new s(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const M=new Map,O=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const $=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(e,t,o,i){const n=t[0];if("."===n){return new k(e,t.slice(1),o).parts}if("@"===n)return[new q(e,t.slice(1),i.eventContext)];if("?"===n)return[new E(e,t.slice(1),o)];return new x(e,t,o).parts}handleTextExpression(e){return new P(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const V=(e,...t)=>new S(e,t,"html",$)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,U=(e,t)=>`${e}--${t}`;let H=!0;void 0===window.ShadyCSS?H=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),H=!1);const I=e=>t=>{const i=U(t.type,e);let n=M.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},M.set(i,n));let r=n.stringsArray.get(t.strings);if(void 0!==r)return r;const a=t.strings.join(o);if(r=n.keyString.get(a),void 0===r){const o=t.getTemplateElement();H&&window.ShadyCSS.prepareTemplateDom(o,e),r=new s(t,o),n.keyString.set(a,r)}return n.stringsArray.set(t.strings,r),r},L=["html","svg"],F=new Set,z=(e,t,o)=>{F.add(e);const i=o?o.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:s}=n;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(i,e);const r=document.createElement("style");for(let e=0;e<s;e++){const t=n[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{L.forEach((t=>{const o=M.get(U(t,e));void 0!==o&&o.keyString.forEach((e=>{const{element:{content:t}}=e,o=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{o.add(e)})),d(e,o)}))}))})(e);const a=i.content;o?function(e,t,o=null){const{element:{content:i},parts:n}=e;if(null==o)return void i.appendChild(t);const s=document.createTreeWalker(i,133,null,!1);let r=u(n),a=0,l=-1;for(;s.nextNode();)for(l++,s.currentNode===o&&(a=h(t),o.parentNode.insertBefore(t,o));-1!==r&&n[r].index===l;){if(a>0){for(;-1!==r;)n[r].index+=a,r=u(n,r);return}r=u(n,r)}}(o,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(o){a.insertBefore(r,a.firstChild);const e=new Set;e.add(r),d(o,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const j={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},B=(e,t)=>t!==e&&(t==t||e==e),D={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:B};class W extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,o)=>{const i=this._attributeNameForProperty(o,t);void 0!==i&&(this._attributeToPropertyMap.set(i,o),e.push(i))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=D){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const o="symbol"==typeof e?Symbol():`__${e}`,i=this.getPropertyDescriptor(e,o,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,o){return{get(){return this[t]},set(i){const n=this[e];this[t]=i,this.requestUpdateInternal(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||D}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const o of t)this.createProperty(o,e[o])}}static _attributeNameForProperty(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,o=B){return o(e,t)}static _propertyValueFromAttribute(e,t){const o=t.type,i=t.converter||j,n="function"==typeof i?i:i.fromAttribute;return n?n(e,o):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const o=t.type,i=t.converter;return(i&&i.toAttribute||j.toAttribute)(e,o)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,o){t!==o&&this._attributeToProperty(e,o)}_propertyToAttribute(e,t,o=D){const i=this.constructor,n=i._attributeNameForProperty(e,o);if(void 0!==n){const e=i._propertyValueToAttribute(t,o);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const o=this.constructor,i=o._attributeToPropertyMap.get(e);if(void 0!==i){const e=o.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=o._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,o){let i=!0;if(void 0!==e){const n=this.constructor;o=o||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,o.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==o.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,o))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}W.finalized=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const J=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol();class X{constructor(e,t){if(t!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(J?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Y=(e,...t)=>{const o=t.reduce(((t,o,i)=>t+(e=>{if(e instanceof X)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(o)+e[i+1]),e[0]);return new X(o,K)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const G={};class Q extends W{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,o)=>e.reduceRight(((e,o)=>Array.isArray(o)?t(o,e):(e.add(o),e)),o),o=t(e,new Set),i=[];o.forEach((e=>i.unshift(e))),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!J){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new X(String(t),K)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?J?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==G&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return G}}function Z(){return document.querySelector("hc-main")?document.querySelector("hc-main").hass:document.querySelector("home-assistant")?document.querySelector("home-assistant").hass:void 0}function ee(e){return document.querySelector("hc-main")?document.querySelector("hc-main").provideHass(e):document.querySelector("home-assistant")?document.querySelector("home-assistant").provideHass(e):void 0}function te(e,t,o=null){if((e=new Event(e,{bubbles:!0,cancelable:!1,composed:!0})).detail=t||{},o)o.dispatchEvent(e);else{var i=function(){var e=document.querySelector("hc-main");return e?(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("hc-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-view")||e.querySelector("hui-panel-view"):(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=document.querySelector("home-assistant"))&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))&&e.shadowRoot)&&e.querySelector("ha-app-layout"))&&e.querySelector("#view"))&&e.firstElementChild}();i&&i.dispatchEvent(e)}}async function oe(e,t,o=!1){let i=e;"string"==typeof t&&(t=t.split(/(\$| )/)),""===t[t.length-1]&&t.pop();for(const[e,n]of t.entries())if(n.trim().length){if(!i)return null;i.localName&&i.localName.includes("-")&&await customElements.whenDefined(i.localName),i.updateComplete&&await i.updateComplete,i="$"===n?o&&e==t.length-1?[i.shadowRoot]:i.shadowRoot:o&&e==t.length-1?i.querySelectorAll(n):i.querySelector(n)}return i}async function ie(e,t=!1){const o=document.querySelector("hc-main")||document.querySelector("home-assistant");te("hass-more-info",{entityId:e},o);const i=await async function(e,t,o=!1,i=1e4){return Promise.race([oe(e,t,o),new Promise(((e,t)=>setTimeout((()=>t(new Error("timeout"))),i)))]).catch((e=>{if(!e.message||"timeout"!==e.message)throw e;return null}))}(o,"$ ha-more-info-dialog");return i&&(i.large=t),i}Q.finalized=!0,Q.render=(e,o,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,s=O.has(o),r=H&&11===o.nodeType&&!!o.host,a=r&&!F.has(n),l=a?document.createDocumentFragment():o;if(((e,o,i)=>{let n=O.get(o);void 0===n&&(t(o,o.firstChild),O.set(o,n=new P(Object.assign({templateFactory:T},i))),n.appendInto(o)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:I(n)},i)),a){const e=O.get(l);O.delete(l);const i=e.value instanceof g?e.value.template:void 0;z(n,l,i),t(o,o.firstChild),o.appendChild(l),O.set(o,e)}!s&&r&&window.ShadyCSS.styleElement(o.host)},Q.shadowRootOptions={mode:"open"};const ne="lovelace-player-device-id";function se(){if(!localStorage[ne]){const e=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);window.fully&&"function"==typeof fully.getDeviceId?localStorage[ne]=fully.getDeviceId():localStorage[ne]=`${e()}${e()}-${e()}${e()}`}return localStorage[ne]}let re=se();const ae=new URLSearchParams(window.location.search);var le;ae.get("deviceID")&&null!==(le=ae.get("deviceID"))&&("clear"===le?localStorage.removeItem(ne):localStorage[ne]=le,re=se());["angle-degree","area-acre","area-hectare","concentr-percent","digital-bit","digital-byte","digital-gigabit","digital-gigabyte","digital-kilobit","digital-kilobyte","digital-megabit","digital-megabyte","digital-petabyte","digital-terabit","digital-terabyte","duration-day","duration-hour","duration-millisecond","duration-minute","duration-month","duration-second","duration-week","duration-year","length-centimeter","length-foot","length-inch","length-kilometer","length-meter","length-mile-scandinavian","length-mile","length-millimeter","length-yard","mass-gram","mass-kilogram","mass-ounce","mass-pound","mass-stone","temperature-celsius","temperature-fahrenheit","volume-fluid-ounce","volume-gallon","volume-liter","volume-milliliter"].map((function(e){return e.replace(/^(.*?)-/,"")}));var ce,de,he,ue,pe=(ce=function(e,t){return ce=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])},ce(e,t)},function(e,t){function o(){this.constructor=e}ce(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});!function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="MISSING_LOCALE_DATA",t}pe(t,e)}(Error),(ue=de||(de={})).language="language",ue.system="system",ue.comma_decimal="comma_decimal",ue.decimal_comma="decimal_comma",ue.space_comma="space_comma",ue.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(he||(he={}));var me=["closed","locked","off"],fe=function(e,t,o,i){i=i||{},o=null==o?{}:o;var n=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return n.detail=o,e.dispatchEvent(n),n},ye=function(e){fe(window,"haptic",e)},ge=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null};function we(e,t){let o=25,i=75,n=!1;e.width&&("number"==typeof e.width?(o=e.width,i=100-o):"object"==typeof e.width&&(o=e.desktop,i=100-o,n=!0));let s="\n    #customSidebarWrapper { \n      display:flex;\n      flex-direction:row;\n      overflow:hidden;\n    }\n    #customSidebar.hide {\n      display:none!important;\n      width:0!important;\n    }\n    #contentContainer.hideSidebar {\n      width:100%!important;\n    }\n    ";return n?t<=e.breakpoints.mobile?0==e.width.mobile?s+="\n          #customSidebar {\n            width:"+e.width.mobile+"%;\n            overflow:hidden;\n            display:none;\n          } \n          #contentContainer {\n            width:"+(100-e.width.mobile)+"%;\n          }\n        ":s+="\n          #customSidebar {\n            width:"+e.width.mobile+"%;\n            overflow:hidden;\n          } \n          #contentContainer {\n            width:"+(100-e.width.mobile)+"%;\n          }\n        ":t<=e.breakpoints.tablet?0==e.width.tablet?s+="\n          #customSidebar {\n            width:"+e.width.tablet+"%;\n            overflow:hidden;\n            display:none;\n          } \n          #contentContainer {\n            width:"+(100-e.width.tablet)+"%;\n          }\n        ":s+="\n          #customSidebar {\n            width:"+e.width.tablet+"%;\n            overflow:hidden;\n          } \n          #contentContainer {\n            width:"+(100-e.width.tablet)+"%;\n          }\n        ":0==e.width.tablet?s+="\n          #customSidebar {\n            width:"+e.width.desktop+"%;\n            overflow:hidden;\n            display:none;\n          } \n          #contentContainer {\n            width:"+(100-e.width.desktop)+"%;\n          }\n        ":s+="\n          #customSidebar {\n            width:"+e.width.desktop+"%;\n            overflow:hidden;\n          } \n          #contentContainer {\n            width:"+(100-e.width.desktop)+"%;\n          }\n        ":s+="\n      #customSidebar {\n        width:"+o+"%;\n        overflow:hidden;\n      } \n      #contentContainer {\n        width:"+i+"%;\n      }\n    ",s}async function be(e,t,o){const i=await Pe();if(i.config.sidebar){!0===Object.assign({},i.config.sidebar).debug&&console.info(`%cKIOSK-SIDEBAR: %c ${e.padEnd(24)} -> %c ${t}`,"color: chartreuse; background: black; font-weight: 700;","color: yellow; background: black; font-weight: 700;","",o)}}async function Se(e,t,o){const i=await Pe();if(i.config.sidebar){!0===Object.assign({},i.config.sidebar).debug&&console.error(`%cKIOSK-SIDEBAR: %c ${e.padEnd(24)} -> %c ${t}`,"color: red; background: black; font-weight: 700;","color: white; background: black; font-weight: 700;","color:red",o)}}function _e(){let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("app-drawer-layout partial-panel-resolver"),e=e&&e.shadowRoot||e,e=e&&e.querySelector("ha-panel-lovelace"),e=e&&e.shadowRoot,e=e&&e.querySelector("hui-root"),e}function ve(e,t=window.location.href){const o=e.replace(/[\[\]]/g,"\\$&"),i=new RegExp("[?&]"+o+"(=([^&#]*)|&|#|$)").exec(t);return i?i[2]?decodeURIComponent(i[2].replace(/\+/g," ")):"":null}function xe(e,t){const o=document.body.clientWidth;e.shadowRoot.querySelector("#customSidebarStyle").textContent=we(t,o);const i=_e(),n=i.shadowRoot.querySelector("ch-header")||i.shadowRoot.querySelector("app-header");be("updateStyling",n?"Home Assistant header found!":"Home Assistant header not found!");const s=i.shadowRoot.querySelector("ch-footer");be("updateStyling",s?"Home Assistant footer found!":"Home Assistant footer not found!");const r=ve("sidebarOff"),a=i.shadowRoot.getElementById("view");t.hideTopMenu&&!0===t.hideTopMenu&&t.showTopMenuOnMobile&&!0===t.showTopMenuOnMobile&&o<=t.breakpoints.mobile&&null==r?(n&&(be("updateStyling","Action: Show Home Assistant header!"),n.style.display="block"),a&&(a.style.minHeight="calc(100vh - var(--header-height))"),s&&(be("updateStyling","Action: Show Home Assistant footer!"),s.style.display="flex")):t.hideTopMenu&&!0===t.hideTopMenu&&null==r&&(n&&(be("updateStyling","Action: Hide Home Assistant header!"),n.style.display="none"),s&&(be("updateStyling","Action: Hide Home Assistant footer!"),s.style.display="none"),a&&(a.style.minHeight="calc(100vh)"))}function Ce(e){return new Promise((t=>setTimeout(t,e)))}async function Pe(){let e;for(;!e;)e=ge(),e||await Ce(500);return e}async function Ee(){const e=await Pe();if(e.config.sidebar){const t=Object.assign({},e.config.sidebar);if(!t.width||t.width&&"number"==typeof t.width&&t.width>0&&t.width<100||t.width&&"object"==typeof t.width){const e=_e(),o=function(){let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("app-drawer-layout app-drawer ha-sidebar"),e}(),i=function(){let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("app-drawer-layout"),e=e&&e.shadowRoot,e=e&&e.querySelector("#contentContainer"),e}(),n=function(){let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("app-drawer-layout app-drawer"),e=e&&e.shadowRoot,e=e&&e.querySelector("#contentContainer"),e}(),s=ve("sidebarOff");t.hideTopMenu&&!0===t.hideTopMenu&&null==s&&(e.shadowRoot.querySelector("ch-header")&&(e.shadowRoot.querySelector("ch-header").style.display="none"),e.shadowRoot.querySelector("app-header")&&(e.shadowRoot.querySelector("app-header").style.display="none"),e.shadowRoot.querySelector("ch-footer")&&(e.shadowRoot.querySelector("ch-footer").style.display="none"),e.shadowRoot.getElementById("view")&&(e.shadowRoot.getElementById("view").style.minHeight="calc(100vh)")),t.hideHassSidebar&&!0===t.hideHassSidebar&&null==s&&(o&&(o.style.display="none"),i&&(i.style.marginLeft="0"),n&&(n.style.display="none")),t.breakpoints?t.breakpoints&&(t.breakpoints.mobile||(t.breakpoints.mobile=768),t.breakpoints.tablet||(t.breakpoints.tablet=1024)):t.breakpoints={tablet:1024,mobile:768};let r=e.shadowRoot.querySelector("ha-app-layout"),a=we(t,document.body.clientWidth),l=document.createElement("style");l.setAttribute("id","customSidebarStyle"),r.shadowRoot.appendChild(l),l.type="text/css",l.styleSheet?l.styleSheet.cssText=a:l.appendChild(document.createTextNode(a));let c=r.shadowRoot.querySelector("#contentContainer");const d=document.createElement("div");d.setAttribute("id","customSidebarWrapper"),c.parentNode.insertBefore(d,c);let h=document.createElement("div");h.setAttribute("id","customSidebar"),d.appendChild(h),d.appendChild(c),await async function(e,t){const o=document.createElement("kiosk-sidebar");o.setConfig(t),o.hass=Z(),e.appendChild(o)}(h,t),function(e,t,o,i){window.addEventListener("resize",(function(){xe(e,t)}),!0),"hideOnPath"in t&&(window.addEventListener("location-changed",(()=>{t.hideOnPath.includes(window.location.pathname)?(o.classList.add("hideSidebar"),i.classList.add("hide")):(o.classList.remove("hideSidebar"),i.classList.remove("hide"))})),t.hideOnPath.includes(window.location.pathname)&&(be("subscribeEvents","Disable sidebar for this path"),o.classList.add("hideSidebar"),i.classList.add("hide")))}(r,t,c,h),setTimeout((function(){xe(r,t)}),1)}else Se("buildSidebar","Error sidebar in width config!")}else be("buildSidebar","No sidebar in config found!")}customElements.define("kiosk-sidebar",class extends Q{constructor(){super(),this.templateLines=[],this.twelveHourVersion=!1,this.period=!1,this.dateFormat="DD MMMM",this.bottomCard=null,this.cards={},this.CUSTOM_TYPE_PREFIX="custom:"}static get properties(){return{hass:{},config:{},active:{}}}render(){this.config.sidebarMenu;const e="style"in this.config;return this.twelveHourVersion=!!this.config.twelveHourVersion&&this.config.twelveHourVersion,this.period=!!this.config.period&&this.config.period,this.dateFormat=this.config.dateFormat?this.config.dateFormat:"DD MMMM",this.bottomCard=this.config.bottomCard?this.config.bottomCard:null,this.cards=this.config.cards&&this.config.cards.length>0?this.config.cards:null,V`
            ${e?V`<style>${this.config.style}</style>`:V``}
            
            <div class="sidebar-inner">
            
            </div>`}updateSidebarSize(e){const t=this.shadowRoot.querySelector(".sidebar-inner"),o=e.shadowRoot.querySelector("ch-header")||e.shadowRoot.querySelector("app-header"),i=ve("sidebarOff");if(t){t.style.width=this.offsetWidth+"px";let e=this.config.hideTopMenu&&null==i?0:o.offsetHeight;be("updateSidebarSize","headerHeight",e),t.style.height=`calc(${window.innerHeight}px - ${e}px)`,t.style.top=e+"px"}}_buildHtmlMenu(e){return V`
            <ul class="sidebarMenu">
                ${e.map((e=>V`
                    <li @click="${e=>this._menuAction(e)}" class="${e.state&&"off"!=this.hass.states[e.state].state&&"unavailable"!=this.hass.states[e.state].state?"active":""}" data-type="${e.action}" data-path="${e.navigation_path?e.navigation_path:""}" data-menuitem="${JSON.stringify(e)}">
                    <span>${e.name}</span>
                    ${e.icon?V`
                            <ha-icon @click="${e=>this._menuAction(e)}" icon="${e.icon}"></ha-icon>
                        `:V``}
                    </li>
                `))}
            </ul>
            `}_renderMenu(e){if(e&&e.menu&&e.menu.length>0){const t=this._buildHtmlMenu(e.menu),o=document.createElement("div");o.innerHTML=t.getHTML(),this.shadowRoot.querySelector(".sidebar-inner").appendChild(o)}}_renderCard(e){if(be("firstUpdated","Card: ",e),e&&"object"==typeof e&&e.type){let t=e.type;t=t.startsWith(this.CUSTOM_TYPE_PREFIX)?t.substr(this.CUSTOM_TYPE_PREFIX.length):`hui-${t}-card`;const o=document.createElement(t);o.setConfig(e),o.hass=Z(),this.shadowRoot.querySelector(".sidebar-inner").appendChild(o),ee(o)}else Se("firstUpdated","Card config error!")}firstUpdated(){ee(this);let e=_e();e.shadowRoot.querySelectorAll("paper-tab").forEach((e=>{be("firstUpdated","Menu item found"),e.addEventListener("click",(()=>{this._updateActiveMenu()}))}));const t=this;setTimeout((()=>{t.updateSidebarSize(e),t._updateActiveMenu()}),1),window.addEventListener("resize",(()=>{t.updateSidebarSize(e)}),!0),this.cards&&this.cards.length>0&&this.cards.map((e=>{"sidebarMenu"==e.type?this._renderMenu(e):setTimeout((()=>this._renderCard(e)),2)}))}_updateActiveMenu(){this.shadowRoot.querySelectorAll('ul.sidebarMenu li[data-type="navigate"]').forEach((e=>{e.classList.remove("active")}));let e=this.shadowRoot.querySelector('ul.sidebarMenu li[data-path="'+document.location.pathname+'"]');e&&e.classList.add("active")}_menuAction(e){if(e.target.dataset&&e.target.dataset.menuitem||e.target.parentNode.dataset&&e.target.parentNode.dataset.menuitem){const t=JSON.parse(e.target.dataset.menuitem||e.target.parentNode.dataset.menuitem);this._customAction(t),this._updateActiveMenu()}}_customAction(e){switch(e.action){case"more-info":(e.entity||e.camera_image)&&ie(e.entity?e.entity:e.camera_image);break;case"navigate":e.navigation_path&&function(e,t,o){void 0===o&&(o=!1),o?history.replaceState(null,"",t):history.pushState(null,"",t),fe(window,"location-changed",{replace:o})}(window,e.navigation_path);break;case"url":e.url_path&&window.open(e.url_path);break;case"toggle":e.entity&&(!function(e,t){(function(e,t,o){void 0===o&&(o=!0);var i,n=function(e){return e.substr(0,e.indexOf("."))}(t),s="group"===n?"homeassistant":n;switch(n){case"lock":i=o?"unlock":"lock";break;case"cover":i=o?"open_cover":"close_cover";break;default:i=o?"turn_on":"turn_off"}e.callService(s,i,{entity_id:t})})(e,t,me.includes(e.states[t].state))}(this.hass,e.entity),ye("success"));break;case"call-service":{if(!e.service)return void ye("failure");const[t,o]=e.service.split(".",2);this.hass.callService(t,o,e.service_data),ye("success")}}}setConfig(e){this.config=e,this.config.template&&function(e,t,o,i=!0){e||(e=Z().connection);let n={user:Z().user.name,browser:re,hash:location.hash.substr(1)||" ",...o.variables},s=o.template,r=o.entity_ids;e.subscribeMessage((e=>{if(i){let o=String(e.result);const i=/_\([^)]*\)/g;o=o.replace(i,(e=>Z().localize(e.substring(2,e.length-1))||e)),t(o)}else t(e.result)}),{type:"render_template",template:s,variables:n,entity_ids:r})}(null,(e=>{this.templateLines=e.match(/<li>([^]*?)<\/li>/g).map((function(e){return e.replace(/<\/?li>/g,"")})),this.requestUpdate()}),{template:this.config.template,variables:{config:this.config},entity_ids:this.config.entity_ids})}getCardSize(){return 1}static get styles(){return Y`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // --face-color: #FFF;
        // --face-border-color: #FFF;
        // --clock-hands-color: #000;
        // --clock-seconds-hand-color: #FF4B3E;
        // --clock-middle-background: #FFF;
        // --clock-middle-border: #000;
        // --sidebar-background: #FFF;
        // --sidebar-text-color: #000;
        // --sidebar-icon-color: #000;
        // --sidebar-selected-text-color: #000;
        // --sidebar-selected-icon-color: #000;
        background-color:  var(--sidebar-background, var(--paper-listbox-background-color, var(--primary-background-color, #fff)));
      }
      .sidebar-inner {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        position: fixed;
        width: 0;
      }
      .sidebarMenu {
        list-style: none;
        margin: 20px 0;
        padding: 20px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
      .sidebarMenu li {
        color: var(--sidebar-text-color, #000);
        position: relative;
        padding: 10px 20px;
        border-radius: 12px;
        font-size: 18px;
        line-height: 24px;
        font-weight: 300;
        white-space: normal;
        display: block;
        cursor: pointer;
      }
      .sidebarMenu li ha-icon {
        float: right;
        color: var(--sidebar-icon-color, #000);
      }
      .sidebarMenu li.active {
        color: var(--sidebar-selected-text-color);
      }
      .sidebarMenu li.active ha-icon {
        color: var(--sidebar-selected-icon-color, rgb(247, 217, 89));
      }
      .sidebarMenu li.active::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--sidebar-selected-icon-color, #000);
        opacity: 0.12;
        border-radius: 12px;
      }
      h1 {
        margin-top: 0;
        margin-bottom: 20px;
        font-size: 32px;
        line-height: 32px;
        font-weight: 200;
        color: var(--sidebar-text-color, #000);
        cursor: default;
      }
      h1.digitalClock {
        font-size: 60px;
        line-height: 60px;
        cursor: default;
      }
      h1.digitalClock.with-seconds {
        font-size: 48px;
        line-height: 48px;
        cursor: default;
      }
      h1.digitalClock.with-title {
        margin-bottom: 0;
        cursor: default;
      }
      h2 {
        margin: 0;
        font-size: 26px;
        line-height: 26px;
        font-weight: 200;
        color: var(--sidebar-text-color, #000);
        cursor: default;
      }
      .template {
        margin: 0;
        padding: 0;
        list-style: none;
        color: var(--sidebar-text-color, #000);
      }

      .template li {
        display: block;
        color: inherit;
        font-size: 18px;
        line-height: 24px;
        font-weight: 300;
        white-space: normal;
      }
    `}}),console.info(`%c  ${"KIOSK-SIDEBAR".padEnd(24)}%c Version: ${"1.0.0.0".padEnd(9)}`,"color: chartreuse; background: black; font-weight: 700;","color: white; background: dimgrey; font-weight: 700;"),Ee(),setTimeout((()=>{window.addEventListener("location-changed",(()=>{const e=_e();if(!e)return;const t=e.shadowRoot.querySelector("ha-app-layout").shadowRoot.querySelector("#wrapper");if(t){const e=t.querySelector("#customSidebarWrapper");e&&e.querySelector("#customSidebar")||Ee()}else Ee()}))}),1e3);
