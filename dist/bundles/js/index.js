!function(t){var e={};function r(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(s,i,function(e){return t[e]}.bind(null,i));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r(r.s=4)}([function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},function(t,e){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function r(t,e){for(var r=0;r<e.length;r++){var s=e[r];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}t.exports=function(t,e,s){return e&&r(t.prototype,e),s&&r(t,s),t}},function(t,e,r){r(9),t.exports=r(5)},function(t,e,r){"use strict";r.r(e);r(6)},function(t,e,r){var s=r(7);"string"==typeof s&&(s=[[t.i,s,""]]);var i={insert:"head",singleton:!1};r(8)(s,i);s.locals&&(t.exports=s.locals)},function(t,e,r){},function(t,e,r){"use strict";var s,i={},n=function(){return void 0===s&&(s=Boolean(window&&document&&document.all&&!window.atob)),s},o=function(){var t={};return function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}t[e]=r}return t[e]}}();function a(t,e){for(var r=[],s={},i=0;i<t.length;i++){var n=t[i],o=e.base?n[0]+e.base:n[0],a={css:n[1],media:n[2],sourceMap:n[3]};s[o]?s[o].parts.push(a):r.push(s[o]={id:o,parts:[a]})}return r}function p(t,e){for(var r=0;r<t.length;r++){var s=t[r],n=i[s.id],o=0;if(n){for(n.refs++;o<n.parts.length;o++)n.parts[o](s.parts[o]);for(;o<s.parts.length;o++)n.parts.push(b(s.parts[o],e))}else{for(var a=[];o<s.parts.length;o++)a.push(b(s.parts[o],e));i[s.id]={id:s.id,refs:1,parts:a}}}}function c(t){var e=document.createElement("style");if(void 0===t.attributes.nonce){var s=r.nc;s&&(t.attributes.nonce=s)}if(Object.keys(t.attributes).forEach((function(r){e.setAttribute(r,t.attributes[r])})),"function"==typeof t.insert)t.insert(e);else{var i=o(t.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(e)}return e}var u,h=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")});function g(t,e,r,s){var i=r?"":s.css;if(t.styleSheet)t.styleSheet.cssText=h(e,i);else{var n=document.createTextNode(i),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(n,o[e]):t.appendChild(n)}}function l(t,e,r){var s=r.css,i=r.media,n=r.sourceMap;if(i&&t.setAttribute("media",i),n&&btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n))))," */")),t.styleSheet)t.styleSheet.cssText=s;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(s))}}var d=null,f=0;function b(t,e){var r,s,i;if(e.singleton){var n=f++;r=d||(d=c(e)),s=g.bind(null,r,n,!1),i=g.bind(null,r,n,!0)}else r=c(e),s=l.bind(null,r,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(r)};return s(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;s(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).attributes="object"==typeof e.attributes?e.attributes:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=n());var r=a(t,e);return p(r,e),function(t){for(var s=[],n=0;n<r.length;n++){var o=r[n],c=i[o.id];c&&(c.refs--,s.push(c))}t&&p(a(t,e),e);for(var u=0;u<s.length;u++){var h=s[u];if(0===h.refs){for(var g=0;g<h.parts.length;g++)h.parts[g]();delete i[h.id]}}}}},function(t,e,r){"use strict";r.r(e);var s=r(1),i=r.n(s),n=r(0),o=r.n(n),a=r(2),p=r.n(a),c=r(3),u=r.n(c),h=function(t,e,r,s){var i,n=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(e=e||!1,r=r||!1,s=s||!1,i=n?document.createElementNS(n,t):document.createElement(t),!1!==r&&(r.forEach=[].forEach,r.forEach((function(t){!1!==t&&i.appendChild(t)}))),!1!==e)for(var o in e)""!==o&&i.setAttribute(o,e[o]);return s&&(i.innerHTML=s),i};function g(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?g(Object(r),!0).forEach((function(e){i()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d=function(){function t(e){p()(this,t),this.props=e,this.state={name:"",percent:0,type:"line",progress:null,progressPercent:null,progressBar:null,progressTag:{},progressPercentTag:{},progressBarTag:{},ring:null,ringFill:null,ringCircle:null,ringWidth:3,ringRadius:30,ringFillColor:"#F3F1F0",ringColor:"#A3A2A1"},"object"===o()(this.props)&&(this.state=l(l({},this.state),{},{progress:this.props.progress?this.props.progress:this.state.progress,progressPercent:this.props.progressPercent?this.props.progressPercent:this.state.progressPercent,progressBar:this.props.progressBar?this.props.progressBar:this.state.progressBar,percent:this.props.percent?this.props.percent:this.state.percent,name:this.props.name?this.props.name:this.state.name,height:this.props.height?this.props.height:this.state.height,type:this.props.type?this.props.type:this.state.type,ring:this.props.ring?this.props.ring:this.state.ring,ringFill:this.props.ringFill?this.props.ringFill:this.state.ringFill,ringCircle:this.props.ringCircle?this.props.ringCircle:this.state.ringCircle,ringWidth:this.props.ringWidth?this.props.ringWidth:this.state.ringWidth,ringRadius:this.props.ringRadius?this.props.ringRadius:this.state.ringRadius,ringColor:this.props.ringColor?this.props.ringColor:this.state.ringColor,ringFillColor:this.props.ringFillColor?this.props.ringFillColor:this.state.ringFillColor}),"progressTag"in this.props&&"object"===o()(this.props.progressTag)&&(this.state.progressTag=this.props.progressTag),"progressPercentTag"in this.props&&"object"===o()(this.props.progressPercentTag)&&(this.state.progressPercentTag=this.props.progressPercentTag),"progressBarTag"in this.props&&"object"===o()(this.props.progressBarTag)&&(this.state.progressBarTag=this.props.progressBarTag)),this.init()}return u()(t,[{key:"init",value:function(){if(this.state.progress){for(var t in this.state.progress.setAttribute("data-percent",this.state.percent),this.state.progress.setAttribute("am-progress",this.state.name),this.state.progressTag)this.state.progress.setAttribute(t,this.state.progressTag[t]);var e=this.state.progress.querySelector("[am-progress-bar]"),r=this.state.progress.querySelector("[am-progress-percent]");if(e)for(var s in this.state.progressBar=e,this.state.progressBar.setAttribute("style","width:".concat(this.state.percent,"%")),this.state.progressBarTag)this.state.progressBar.setAttribute(s,this.state.progressBarTag[s]);if(r)for(var i in this.state.progressPercent=r,this.state.progressPercent.innerText=this.state.percent+"%",this.state.progressPercentTag)this.state.progressPercent.setAttribute(i,this.state.progressPercentTag[i])}else if(this.state.ring){var n=this.state.ringRadius-2*this.state.ringWidth,o=2*n*Math.PI,a=o-this.state.percent/100*o,p=this.state.ringCircle||this.state.ring.querySelector("circle"),c=this.state.ringFill||this.state.ring.querySelector("> circle");this.state.ring.setAttribute("am-progress-ring",this.state.name),this.state.ring.setAttribute("width",2*this.state.ringRadius),this.state.ring.setAttribute("height",2*this.state.ringRadius),p.setAttribute("stroke",this.state.ringColor),p.setAttribute("stroke-dasharray",o),p.setAttribute("stroke-width",this.state.ringWidth),p.setAttribute("fill","transparent"),p.setAttribute("r",n),p.setAttribute("cx",this.state.ringRadius),p.setAttribute("cy",this.state.ringRadius),p.style.strokeDashoffset=a,c.setAttribute("stroke",this.state.ringFillColor),c.setAttribute("stroke-dasharray",o),c.setAttribute("stroke-width",this.state.ringWidth),c.setAttribute("fill","transparent"),c.setAttribute("r",n),c.setAttribute("cx",this.state.ringRadius),c.setAttribute("cy",this.state.ringRadius),c.style.strokeDashoffset=0}}},{key:"build",value:function(){if("line"===this.state.type){var t=h("div",l({"am-progress-bar":"",style:"width:".concat(this.state.percent,"%")},this.state.progressBarTag)),e=h("span",l({"am-progress-percent":""},this.state.progressPercentTag),[],"".concat(this.state.percent,"%")),r=h("div",l({"am-progress":this.state.name,"data-percent":this.state.percent},this.state.progressTag),[e,t]);return this.state.progress=r,this.state.progressBar=t,this.state.progressPercent=e,r}if("ring"===this.state.type){var s=this.state.ringRadius-2*this.state.ringWidth,i=2*s*Math.PI,n=i-this.state.percent/100*i,o=h("circle",{stroke:this.state.ringColor,"stroke-dasharray":i,style:"stroke-dashoffset: ".concat(n),"stroke-width":this.state.ringWidth,fill:"transparent",r:s,cx:this.state.ringRadius,cy:this.state.ringRadius},[],!1,"http://www.w3.org/2000/svg"),a=h("circle",{stroke:this.state.ringFillColor,"stroke-dasharray":i,style:"stroke-dashoffset: 0","stroke-width":this.state.ringWidth,fill:"transparent",r:s,cx:this.state.ringRadius,cy:this.state.ringRadius},[],!1,"http://www.w3.org/2000/svg"),p=h("svg",{"am-progress-ring":this.state.name,width:2*this.state.ringRadius,height:2*this.state.ringRadius},[a,o],!1,"http://www.w3.org/2000/svg");return this.state.ring=p,this.state.ringCircle=o,this.state.ringFill=a,p}return h("div",{hidden:!0})}},{key:"setPercent",value:function(t){this.state.percent=t>=100?100:t<=0?0:t,this.init()}},{key:"getPercent",value:function(){return this.state.percent}},{key:"setProgress",value:function(t){this.state.progress=t,this.init()}},{key:"setRing",value:function(t){this.state.progress=t,this.init()}},{key:"getProgress",value:function(){return this.state.progress}},{key:"getRing",value:function(){return this.state.ring}},{key:"hide",value:function(){this.state.ring&&this.state.ring.setAttribute("hidden",""),this.state.progress&&this.state.progress.setAttribute("hidden","")}},{key:"show",value:function(){this.state.ring&&this.state.ring.removeAttribute("hidden"),this.state.progress&&this.state.progress.removeAttribute("hidden")}}]),t}();function f(t){return{height:parseInt(t.getBoundingClientRect().bottom-t.getBoundingClientRect().top),width:parseInt(t.getBoundingClientRect().right-t.getBoundingClientRect().left),scrollHeight:t.scrollHeight,top:t.getBoundingClientRect().top,bottom:t.getBoundingClientRect().bottom,left:t.getBoundingClientRect().left,right:t.getBoundingClientRect().right,clientHeight:document.documentElement.clientHeight,clientWidth:document.documentElement.clientWidth}}document.addEventListener("click",(function(t){var e=document.querySelectorAll("[am-dropdown]");if(t.target.hasAttribute("am-dropdown-header")||t.target.closest("[am-dropdown-header]")||t.target.hasAttribute("am-dropdown-content")){var r=t.target.closest("[am-dropdown]"),s=r.querySelector("[am-dropdown-content]"),i=r.querySelector("[am-dropdown-wrapper]"),n=f(i);console.log(n),r.hasAttribute("active")||(s.hasAttribute("direction-old")&&(s.setAttribute("direction",s.getAttribute("direction-old")),n=f(i)),"left"===s.getAttribute("direction")||("top"===s.getAttribute("direction")?n.top<=5&&(s.setAttribute("direction","bottom"),s.setAttribute("direction-old","top")):"right"===s.getAttribute("direction")||"bottom"!==s.getAttribute("direction")&&s.hasAttribute("direction")||n.clientHeight-n.bottom<=5&&n.top-n.height>10&&(s.setAttribute("direction","top"),s.setAttribute("direction-old","bottom")))),e.forEach((function(t){t!==r&&t.removeAttribute("active")})),t.target.closest("[am-dropdown]").hasAttribute("active")?t.target.closest("[am-dropdown]").removeAttribute("active"):t.target.closest("[am-dropdown]").setAttribute("active","")}else t.target.closest("[am-dropdown-wrapper]"),e.forEach((function(t){t.removeAttribute("active")}))}));var b=new d({name:"progress",type:"ring",percent:50,ringColor:"red"});document.querySelector("#add").addEventListener("click",(function(){b.setPercent(b.getPercent()+10)})),document.querySelector("#remove").addEventListener("click",(function(){b.setPercent(b.getPercent()-10)})),document.querySelector("#app").append(b.build())}]);