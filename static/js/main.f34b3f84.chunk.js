(this["webpackJsonpgame-of-life"]=this["webpackJsonpgame-of-life"]||[]).push([[0],{258:function(e,t,n){"use strict";n.r(t);var a,r=n(0),c=n.n(r),o=n(84),i=n.n(o),l=(n(92),n(10)),u=n(48),s=n(85),m=n(86),d=Math.min(Math.floor(.7*window.innerHeight/20-1),500),p=Math.min(Math.floor(.9*window.innerWidth/20),500),b=18,f=115,v=222,g=1,h=function(e){var t=[];if(e)for(var n=0;n<d;n++)t.push(Array.from(Array(p),(function(){return Math.random()>=1-e?1:0})));else for(var a=0;a<d;a++)t.push(Array.from(Array(p),(function(){return 0})));return t},E=[[0,1],[0,-1],[1,0],[-1,0],[1,-1],[1,1],[-1,-1],[-1,1]];!function(e){e[e.Stopped=0]="Stopped",e[e.Paused=1]="Paused",e[e.Running=2]="Running"}(a||(a={}));var j=function(){var e=Object(r.useState)((function(){return h()})),t=Object(l.a)(e,2),n=t[0],o=t[1],i=Object(r.useState)(a.Stopped),j=Object(l.a)(i,2),O=j[0],S=j[1],k=Object(r.useState)(0),C=Object(l.a)(k,2),y=C[0],w=C[1],R=Object(r.useState)(250),P=Object(l.a)(R,2),N=P[0],x=P[1],M=Object(r.useState)(.5),A=Object(l.a)(M,2),T=A[0],W=A[1],z=Object(r.useState)(!1),B=Object(l.a)(z,2),I=B[0],J=B[1],F=Object(r.useState)(!1),G=Object(l.a)(F,2),H=G[0],$=G[1],q=Object(r.useState)("rgba(".concat(b,", ").concat(f,", ").concat(v,", ").concat(g,")")),D=Object(l.a)(q,2),K=D[0],L=D[1],Q=Object(r.useRef)(O);Q.current=O;var U=Object(r.useRef)(y);U.current=y;var V=Object(r.useRef)(N);V.current=N,Object(r.useEffect)((function(){O===a.Stopped?Y():O===a.Running&&X()}),[O]);var X=Object(r.useCallback)((function(){Q.current===a.Running&&(o((function(e){return Object(u.a)(e,(function(t){for(var n=function(n){for(var a=function(a){var r=0;E.forEach((function(t){var c=n+t[0],o=a+t[1];c>=0&&c<d&&o>=0&&o<p&&(r+=e[c][o])})),r<2||r>3?t[n][a]=0:0===e[n][a]&&3===r&&(t[n][a]=1)},r=0;r<p;r++)a(r)},a=0;a<d;a++)n(a)}))})),w(U.current+=1),setTimeout(X,V.current))}),[]),Y=Object(r.useCallback)((function(){o(h()),w(0)}),[]);return c.a.createElement("div",{id:"main"},c.a.createElement("div",{className:"upper"},c.a.createElement("div",{className:"controls"},c.a.createElement("div",{className:"form-group"},c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){O===a.Stopped?S(a.Running):S(a.Stopped)}},O===a.Stopped?"Start":"Stop"),c.a.createElement("button",{disabled:O===a.Stopped,onClick:function(){O!==a.Paused?S(a.Paused):S(a.Running)}},O===a.Paused?"Resume":"Pause")),c.a.createElement("div",null,c.a.createElement("button",{disabled:O!==a.Stopped,onClick:function(){return o(h(T))}},"Randomize"),c.a.createElement("button",{disabled:O===a.Running,onClick:function(){return o(h())}},"Clear")),c.a.createElement("label",null,c.a.createElement("input",{type:"checkbox",name:"advanced-controls",checked:I,onChange:function(){return J(!I)}}),"Show advanced controls")),I&&c.a.createElement("div",{className:"form-group"},c.a.createElement("div",null,c.a.createElement("div",{className:"form-color-picker"},c.a.createElement("button",{onClick:function(){return $(!H)}},"Change cell color",H&&c.a.createElement("div",{className:"color-picker"},c.a.createElement(s.GithubPicker,{onChangeComplete:function(e){var t=e.rgb;return L("rgba(".concat(t.r,", ").concat(t.g,", ").concat(t.b,", ").concat(t.a,")"))}})))),c.a.createElement("div",null,c.a.createElement("label",null,"Step interval (ms):",c.a.createElement("input",{type:"number",min:100,max:2e4,step:50,value:N,onChange:function(e){var t=parseInt(e.target.value);x(t>2e4?2e4:t<100?100:t)}}))),c.a.createElement("div",null,c.a.createElement("label",{"data-tip":!0,"data-for":"probabilityTip"},"Alive probability:",c.a.createElement("input",{type:"number",min:0,max:1,step:.1,value:T,onChange:function(e){var t=parseFloat(e.target.value);W(t>1?1:t<0?0:t)}})),c.a.createElement(m.a,{id:"probabilityTip",place:"bottom",effect:"solid"},"Probability of generating alive cells when randomizing the grid"))))),c.a.createElement("div",{className:"data"},c.a.createElement("p",null,"Current step: ",y))),c.a.createElement("div",{id:"grid",style:{display:"grid",gridTemplateColumns:"repeat(".concat(p,", ").concat(20,"px)")}},n.map((function(e,t){return e.map((function(e,r){return c.a.createElement("div",{key:"".concat(t,"-").concat(r),onClick:function(){if(O!==a.Running){var e=Object(u.a)(n,(function(e){e[t][r]=n[t][r]?0:1}));o(e)}},style:{width:20,height:20,backgroundColor:1===n[t][r]?K:"white",border:"solid 1px black"}})}))}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},87:function(e,t,n){e.exports=n(258)},92:function(e,t,n){}},[[87,1,2]]]);
//# sourceMappingURL=main.f34b3f84.chunk.js.map