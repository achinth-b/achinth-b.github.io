(function(t){function e(e){for(var r,o,s=e[0],l=e[1],c=e[2],p=0,u=[];p<s.length;p++)o=s[p],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&u.push(n[o][0]),n[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);d&&d(e);while(u.length)u.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],r=!0,s=1;s<i.length;s++){var l=i[s];0!==n[l]&&(r=!1)}r&&(a.splice(e--,1),t=o(o.s=i[0]))}return t}var r={},n={app:0},a=[];function o(e){if(r[e])return r[e].exports;var i=r[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=r,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(i,r,function(e){return t[e]}.bind(null,r));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var d=l;a.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";i("85ec")},1292:function(t,e,i){t.exports=i.p+"img/linkedin-icon.d374b1a9.png"},1618:function(t,e,i){t.exports=i.p+"img/resume-icon.e8154063.png"},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var r=i("2b0e"),n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"background-color":"#d1dec3"},attrs:{id:"app"}},[i("HelloWorld")],1)},a=[],o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"hello"},[r("v-app",{staticStyle:{background:"#d1dec3"}},[r("br"),r("br"),r("div",{staticClass:"bigbox"},[r("div",[r("v-carousel",{staticClass:"me",attrs:{cycle:"",interval:"4000","show-arrows":!1}},t._l(t.items,(function(t,e){return r("v-carousel-item",{key:e,attrs:{src:t.src,transition:"fade-transition"}})})),1),r("div",{staticClass:"midboxgithub"},[r("a",{attrs:{href:"https://github.com/achinth-b"}},[r("img",{staticStyle:{height:"60%",position:"relative",top:"19%",left:"0%"},attrs:{src:i("b6be")}})])]),r("div",{staticClass:"midboxresume"},[r("a",{attrs:{href:"Achinth-Bharadwaj-Resume.pdf"}},[r("img",{staticStyle:{height:"60%",position:"relative",top:"20%",left:"0%"},attrs:{src:i("1618")}})])]),r("div",{staticClass:"midboxmedium"},[r("a",{attrs:{href:"/blog"}},[r("img",{staticStyle:{height:"70%",position:"relative",top:"15%",left:"5%"},attrs:{src:i("6f4b")}})])]),r("div",{staticClass:"midboxlinkedin"},[r("a",{attrs:{href:"https://linkedin.com/in/achinthb"}},[r("img",{staticStyle:{height:"55%",position:"relative",top:"20%",left:"0%"},attrs:{src:i("1292")}})])]),r("div",{staticClass:"midboxcall"},[r("a",{attrs:{href:"tel:+17783198140"}},[r("img",{staticStyle:{height:"60%",position:"relative",top:"20%",left:"0%"},attrs:{src:i("5efe")}})])]),r("div",{staticClass:"midboxemail"},[r("a",{attrs:{href:"mailto:achinth@student.ubc.ca?subject=Hey Achinth!"}},[r("img",{staticStyle:{height:"55%",position:"relative",top:"23%",left:"0%"},attrs:{src:i("fe09")}})])]),r("div",{staticClass:"whatido"},[r("div",{staticStyle:{position:"relative",width:"50%",padding:"14px",display:"inline-block"}},[t._v(" who am i? "),r("br"),t._v(" • i've lived in vancouver for too long now. "),r("br"),t._v(" • i speak kannada, a language with more speakers than there are canadians. "),r("br"),t._v(" • i've only lived in rainforests. ")]),r("div",{staticStyle:{position:"relative",width:"50%",padding:"14px",display:"inline-block"}},[t._v(" what do i do? "),r("br"),t._v(" • data "),r("br"),t._v(" • development "),r("br"),t._v(" • design "),r("br"),t._v(" • democracy "),r("br"),t._v(" • epicureanism "),r("br"),t._v(" • memes ")])]),r("div",{staticClass:"whatilove"},[r("br"),t._v(" here's the trailer. "),r("v-timeline",{staticStyle:{transform:"scale(0.9)",padding:"-315px"}},t._l(t.done,(function(e,i){return r("v-timeline-item",{key:i,staticStyle:{padding:"-105px"},attrs:{color:e.color,small:""},scopedSlots:t._u([{key:"opposite",fn:function(){return[r("span",{staticStyle:{"font-size":"20px"}},[t._v(t._s(e.year))])]},proxy:!0}],null,!0)},[r("span",{staticStyle:{"font-size":"20px"}},[t._v(t._s(e.did))])])})),1)],1),r("div",{staticClass:"typer"},[r("vue-typer",{attrs:{text:["software engineer.","machine learning gunner.","ultimate frisbee player.","food explorer.","pacific northwest bred.","hiker of many mountains."],repeat:1/0,shuffle:!0,"initial-action":"erasing","pre-type-delay":70,"type-delay":100,"pre-erase-delay":1500,"erase-delay":50,"erase-style":"backspace","erase-on-complete":!1,"caret-animation":"blink"}})],1)],1)]),r("div",{staticClass:"footer"},[r("footer",[t._v(" made with 💖, achinth © 2021. ")])])])],1)},s=[],l=i("b0df"),c=i.n(l),d=i("d0c3"),p=i.n(d),u=i("9ce3"),f=i.n(u),h=i("e956"),v={data:function(){return{me:c.a,sunset:p.a,mom:f.a,items:[{src:c.a},{src:p.a},{src:f.a}],done:[{color:"red lighten-2",icon:"mdi-star",year:2019,did:"UBC Launch Pad 🚀"},{color:"orange lighten-2",icon:"mdi-star",year:2020,did:"intern @boeing 🛩️"},{color:"yellow lighten-2",icon:"mdi-star",year:2021,did:"UBC Pandas 🐼"},{color:"green lighten-2",icon:"mdi-star",year:2021,did:"incoming @covalent ⚗️"},{color:"blue lighten-2",icon:"mdi-star",year:"2021++",did:"who knows?"}]}},name:"HelloWorld",components:{VueTyper:h["VueTyper"]},props:{msg:String}},A=v,g=(i("994f"),i("2877")),b=Object(g["a"])(A,o,s,!1,null,"b3ca9656",null),m=b.exports,y=i("ce5b"),I=i.n(y),E={name:"App",vuetify:new I.a,components:{HelloWorld:m}},x=E,O=(i("034f"),Object(g["a"])(x,n,a,!1,null,null,null)),w=O.exports;i("bf40");r["default"].use(I.a),r["default"].config.productionTip=!1,new r["default"]({render:function(t){return t(w)}}).$mount("#app")},"5efe":function(t,e,i){t.exports=i.p+"img/phone-icon.3bd3f8a9.png"},"6f4b":function(t,e){t.exports="data:image/png;base64,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"},"85ec":function(t,e,i){},"994f":function(t,e,i){"use strict";i("d7ab")},"9ce3":function(t,e,i){t.exports=i.p+"img/mom.fadf3203.jpg"},b0df:function(t,e,i){t.exports=i.p+"img/me.32d07b0b.jpg"},b6be:function(t,e,i){t.exports=i.p+"img/github-icon.ec3a60c8.png"},d0c3:function(t,e,i){t.exports=i.p+"img/sunset.36d53288.jpeg"},d7ab:function(t,e,i){},fe09:function(t,e,i){t.exports=i.p+"img/email-icon.86b0dc39.png"}});
//# sourceMappingURL=app.a9c16190.js.map