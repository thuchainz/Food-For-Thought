/*! For license information please see 186.741b4ef0.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkfood_for_thought=self.webpackChunkfood_for_thought||[]).push([[186],{186:(e,t,n)=>{n.r(t),n.d(t,{startInputShims:()=>g});var o=n(344),r=n(811);const i=new WeakMap,a=function(e,t,n){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=arguments.length>4&&void 0!==arguments[4]&&arguments[4];i.has(e)!==n&&(n?l(e,t,o,r):d(e,t))},s=e=>e===e.getRootNode().activeElement,l=function(e,t,n){let o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const r=t.parentNode,a=t.cloneNode(!1);a.classList.add("cloned-input"),a.tabIndex=-1,o&&(a.disabled=!0),r.appendChild(a),i.set(e,a);const s="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform=`translate3d(${s}px,${n}px,0) scale(0)`},d=(e,t)=>{const n=i.get(e);n&&(i.delete(e),n.remove()),e.style.pointerEvents="",t.style.transform=""},c="input, textarea, [no-blur], [contenteditable]",u=(e,t,n)=>{var o;const r=null!==(o=e.closest("ion-item,[ion-item]"))&&void 0!==o?o:e;return f(r.getBoundingClientRect(),t.getBoundingClientRect(),n,e.ownerDocument.defaultView.innerHeight)},f=(e,t,n,o)=>{const r=e.top,i=e.bottom,a=t.top,s=a+15,l=.75*Math.min(t.bottom,o-n)-i,d=s-r,c=Math.round(l<0?-l:d>0?-d:0),u=Math.min(c,r-a),f=Math.abs(u)/.3;return{scrollAmount:u,scrollDuration:Math.min(400,Math.max(150,f)),scrollPadding:n,inputSafeY:4-(r-s)}},m=async function(e,t,n,i,s){let l=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(!n&&!i)return;const d=u(e,n||i,s);if(n&&Math.abs(d.scrollAmount)<4)t.focus();else if(a(e,t,!0,d.inputSafeY,l),t.focus(),(0,r.r)((()=>e.click())),"undefined"!==typeof window){let r;const i=async()=>{void 0!==r&&clearTimeout(r),window.removeEventListener("ionKeyboardDidShow",s),window.removeEventListener("ionKeyboardDidShow",i),n&&await(0,o.c)(n,0,d.scrollAmount,d.scrollDuration),a(e,t,!1,d.inputSafeY),t.focus()},s=()=>{window.removeEventListener("ionKeyboardDidShow",s),window.addEventListener("ionKeyboardDidShow",i)};if(n){const e=await(0,o.g)(n),a=e.scrollHeight-e.clientHeight;if(d.scrollAmount>a-e.scrollTop)return"password"===t.type?(d.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",s)):window.addEventListener("ionKeyboardDidShow",i),void(r=setTimeout(i,1e3))}i()}},v=(e,t,n)=>{if(t&&n){const o=t.x-n.x,r=t.y-n.y;return o*o+r*r>e*e}return!1},p="$ionPaddingTimer",h=(e,t)=>{var n,r;if("INPUT"!==e.tagName)return;if(e.parentElement&&"ION-INPUT"===e.parentElement.tagName)return;if("ION-SEARCHBAR"===(null===(r=null===(n=e.parentElement)||void 0===n?void 0:n.parentElement)||void 0===r?void 0:r.tagName))return;const i=(0,o.a)(e);if(null===i)return;const a=i[p];a&&clearTimeout(a),t>0?i.style.setProperty("--keyboard-offset",`${t}px`):i[p]=setTimeout((()=>{i.style.setProperty("--keyboard-offset","0px")}),120)},g=(e,t)=>{const n=document,i="ios"===t,l="android"===t,d=e.getNumber("keyboardHeight",290),u=e.getBoolean("scrollAssist",!0),f=e.getBoolean("hideCaretOnScroll",i),p=e.getBoolean("inputBlurring",i),g=e.getBoolean("scrollPadding",!0),w=Array.from(n.querySelectorAll("ion-input, ion-textarea")),y=new WeakMap,E=new WeakMap,b=async e=>{await new Promise((t=>(0,r.c)(e,t)));const t=e.shadowRoot||e,n=t.querySelector("input")||t.querySelector("textarea"),i=(0,o.a)(e),c=i?null:e.closest("ion-footer");if(!n)return;if(i&&f&&!y.has(e)){const t=((e,t,n)=>{if(!n||!t)return()=>{};const o=n=>{s(t)&&a(e,t,n)},i=()=>a(e,t,!1),l=()=>o(!0),d=()=>o(!1);return(0,r.a)(n,"ionScrollStart",l),(0,r.a)(n,"ionScrollEnd",d),t.addEventListener("blur",i),()=>{(0,r.b)(n,"ionScrollStart",l),(0,r.b)(n,"ionScrollEnd",d),t.removeEventListener("blur",i)}})(e,n,i);y.set(e,t)}if(!("date"===n.type||"datetime-local"===n.type)&&(i||c)&&u&&!E.has(e)){const t=function(e,t,n,o,i){let a,l=arguments.length>5&&void 0!==arguments[5]&&arguments[5];const d=e=>{a=(0,r.p)(e)},c=d=>{if(!a)return;const c=(0,r.p)(d);v(6,a,c)||s(t)||m(e,t,n,o,i,l)};return e.addEventListener("touchstart",d,{capture:!0,passive:!0}),e.addEventListener("touchend",c,!0),()=>{e.removeEventListener("touchstart",d,!0),e.removeEventListener("touchend",c,!0)}}(e,n,i,c,d,l);E.set(e,t)}};p&&(()=>{let e=!0,t=!1;const n=document,o=()=>{t=!0},i=()=>{e=!0},a=o=>{if(t)return void(t=!1);const r=n.activeElement;if(!r)return;if(r.matches(c))return;const i=o.target;i!==r&&(i.matches(c)||i.closest(c)||(e=!1,setTimeout((()=>{e||r.blur()}),50)))};(0,r.a)(n,"ionScrollStart",o),n.addEventListener("focusin",i,!0),n.addEventListener("touchend",a,!1)})(),g&&(e=>{const t=document,n=t=>{h(t.target,e)},o=e=>{h(e.target,0)};t.addEventListener("focusin",n),t.addEventListener("focusout",o)})(d);for(const o of w)b(o);n.addEventListener("ionInputDidLoad",(e=>{b(e.detail)})),n.addEventListener("ionInputDidUnload",(e=>{(e=>{if(f){const t=y.get(e);t&&t(),y.delete(e)}if(u){const t=E.get(e);t&&t(),E.delete(e)}})(e.detail)}))}}}]);
//# sourceMappingURL=186.741b4ef0.chunk.js.map