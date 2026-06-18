const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./zK29E8tH.js","./CzXwPFZS.js","./DurwJ2wh.js"])))=>i.map(i=>d[i]);
import{_ as nc,a as ic,b as rc}from"./DAy6MnyP.js";import{e as Ft,o as De,c as Ge,a as N,F as Bt,r as kt,f as Ai,_ as li,u as sc,g as rn,h as xn,n as Hr,b as Qe,T as eo,w as Rt,i as Ye,d as ti,t as $e,j as Dr,k as Re,l as ac,m as oc,p as un,q as ni,s as lc,v as ii,x as Wr,y as ri,z as Yi,A as Ds,B as cc,C as uc}from"./CzXwPFZS.js";import{u as Ln,g as xt}from"./zK29E8tH.js";import{S as to,_ as dc}from"./DurwJ2wh.js";import{_ as fc}from"./C2Rv5gaB.js";import{_ as hc}from"./Dw2mLYD-.js";import{u as pc}from"./BfemVl_K.js";const mc={class:"constellation-poster",viewBox:"0 0 360 360",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},gc={stroke:"#6366f1","stroke-opacity":"0.22","stroke-width":"1"},_c=["x1","y1","x2","y2"],xc=["cx","cy","fill"],vc=["cx","cy","fill"],Mc=180,Sc=182,no=46,yc=Ft({__name:"ConstellationPoster",props:{projects:{}},setup(i){const e=i;function t(s,a){const o=[],c=Math.PI*(3-Math.sqrt(5));for(let l=0;l<s;l++){const d=1-l/Math.max(1,s-1)*2,h=Math.sqrt(Math.max(0,1-d*d)),u=c*l;o.push([Math.cos(u)*h*a,d*a,Math.sin(u)*h*a])}return o}const n=Ai(()=>t(e.projects.length,1).map((a,o)=>{const c=Mc+(a[0]*.92+a[2]*.38)*no,l=Sc+(-a[1]+a[2]*.22)*no;return{x:c,y:l,color:e.projects[o]?.colorHex||"#6366f1"}})),r=Ai(()=>{const s=n.value,a=[];return s.forEach((o,c)=>{const d=s.map((h,u)=>c===u?1/0:Math.hypot(o.x-h.x,o.y-h.y)).map((h,u)=>[h,u]).sort((h,u)=>h[0]-u[0]);for(let h=0;h<2;h++){const u=d[h][1];u>c&&a.push({x1:o.x,y1:o.y,x2:s[u].x,y2:s[u].y})}}),a});return(s,a)=>(De(),Ge("svg",mc,[a[0]||(a[0]=N("defs",null,[N("radialGradient",{id:"cp-bg",cx:"50%",cy:"42%",r:"62%"},[N("stop",{offset:"0%","stop-color":"#1a2036","stop-opacity":"0.55"}),N("stop",{offset:"100%","stop-color":"#0b0d12","stop-opacity":"0"})])],-1)),a[1]||(a[1]=N("rect",{x:"0",y:"0",width:"360",height:"360",fill:"url(#cp-bg)"},null,-1)),N("g",gc,[(De(!0),Ge(Bt,null,kt(r.value,(o,c)=>(De(),Ge("line",{key:"l"+c,x1:o.x1,y1:o.y1,x2:o.x2,y2:o.y2},null,8,_c))),128))]),(De(!0),Ge(Bt,null,kt(n.value,(o,c)=>(De(),Ge("g",{key:"n"+c},[N("circle",{cx:o.x,cy:o.y,r:"10",fill:o.color,"fill-opacity":"0.12"},null,8,xc),N("circle",{cx:o.x,cy:o.y,r:"3.6",fill:o.color},null,8,vc)]))),128))]))}}),cl=li(yc,[["__scopeId","data-v-1d9d1ae4"]]);const Aa="184",Ec=0,io=1,bc=2,Ar=1,Tc=2,Wi=3,Hn=0,zt=1,Tn=2,wn=0,wi=1,Is=2,ro=3,so=4,Ac=5,Zn=100,wc=101,Rc=102,Cc=103,Pc=104,Lc=200,Dc=201,Ic=202,Uc=203,Us=204,Ns=205,Nc=206,Fc=207,Oc=208,Bc=209,kc=210,zc=211,Gc=212,Vc=213,Hc=214,Fs=0,Os=1,Bs=2,Ci=3,ks=4,zs=5,Gs=6,Vs=7,ul=0,Wc=1,Xc=2,hn=0,dl=1,fl=2,hl=3,pl=4,ml=5,gl=6,_l=7,xl=300,si=301,Pi=302,Jr=303,Qr=304,Xr=306,Hs=1e3,An=1001,Ws=1002,Ct=1003,qc=1004,nr=1005,It=1006,es=1007,Qn=1008,Kt=1009,vl=1010,Ml=1011,$i=1012,wa=1013,gn=1014,dn=1015,Cn=1016,Ra=1017,Ca=1018,ji=1020,Sl=35902,yl=35899,El=1021,bl=1022,tn=1023,Pn=1026,ei=1027,Tl=1028,Pa=1029,ai=1030,La=1031,Da=1033,wr=33776,Rr=33777,Cr=33778,Pr=33779,Xs=35840,qs=35841,Ys=35842,$s=35843,js=36196,Ks=37492,Zs=37496,Js=37488,Qs=37489,Ir=37490,ea=37491,ta=37808,na=37809,ia=37810,ra=37811,sa=37812,aa=37813,oa=37814,la=37815,ca=37816,ua=37817,da=37818,fa=37819,ha=37820,pa=37821,ma=36492,ga=36494,_a=36495,xa=36283,va=36284,Ur=36285,Ma=36286,Yc=3200,ao=0,$c=1,Gn="",$t="srgb",Nr="srgb-linear",Fr="linear",st="srgb",fi=7680,oo=519,jc=512,Kc=513,Zc=514,Ia=515,Jc=516,Qc=517,Ua=518,eu=519,lo=35044,co="300 es",fn=2e3,Or=2001;function tu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function nu(){const i=Br("canvas");return i.style.display="block",i}const uo={};function fo(...i){const e="THREE."+i.shift();console.log(e,...i)}function Al(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Le(...i){i=Al(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Je(...i){i=Al(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Sa(...i){const e=i.join(" ");e in uo||(uo[e]=!0,Le(...i))}function iu(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const ru={[Fs]:Os,[Bs]:Gs,[ks]:Vs,[Ci]:zs,[Os]:Fs,[Gs]:Bs,[Vs]:ks,[zs]:Ci};class ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ts=Math.PI/180,ya=180/Math.PI;function Ki(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]).toLowerCase()}function Ke(i,e,t){return Math.max(e,Math.min(t,i))}function su(i,e){return(i%e+e)%e}function ns(i,e,t){return(1-t)*i+t*e}function Ni(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ot(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ga=class Ga{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ga.prototype.isVector2=!0;let it=Ga;class Ii{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],d=n[r+2],h=n[r+3],u=s[a+0],p=s[a+1],_=s[a+2],S=s[a+3];if(h!==S||c!==u||l!==p||d!==_){let m=c*u+l*p+d*_+h*S;m<0&&(u=-u,p=-p,_=-_,S=-S,m=-m);let f=1-o;if(m<.9995){const v=Math.acos(m),y=Math.sin(v);f=Math.sin(f*v)/y,o=Math.sin(o*v)/y,c=c*f+u*o,l=l*f+p*o,d=d*f+_*o,h=h*f+S*o}else{c=c*f+u*o,l=l*f+p*o,d=d*f+_*o,h=h*f+S*o;const v=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=v,l*=v,d*=v,h*=v}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],d=n[r+3],h=s[a],u=s[a+1],p=s[a+2],_=s[a+3];return e[t]=o*_+d*h+c*p-l*u,e[t+1]=c*_+d*u+l*h-o*p,e[t+2]=l*_+d*p+o*u-c*h,e[t+3]=d*_-o*h-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(r/2),h=o(s/2),u=c(n/2),p=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=u*d*h+l*p*_,this._y=l*p*h-u*d*_,this._z=l*d*_+u*p*h,this._w=l*d*h-u*p*_;break;case"YXZ":this._x=u*d*h+l*p*_,this._y=l*p*h-u*d*_,this._z=l*d*_-u*p*h,this._w=l*d*h+u*p*_;break;case"ZXY":this._x=u*d*h-l*p*_,this._y=l*p*h+u*d*_,this._z=l*d*_+u*p*h,this._w=l*d*h-u*p*_;break;case"ZYX":this._x=u*d*h-l*p*_,this._y=l*p*h+u*d*_,this._z=l*d*_-u*p*h,this._w=l*d*h+u*p*_;break;case"YZX":this._x=u*d*h+l*p*_,this._y=l*p*h+u*d*_,this._z=l*d*_-u*p*h,this._w=l*d*h-u*p*_;break;case"XZY":this._x=u*d*h-l*p*_,this._y=l*p*h-u*d*_,this._z=l*d*_+u*p*h,this._w=l*d*h+u*p*_;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],u=n+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(d-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+d)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=n*d+a*o+r*l-s*c,this._y=r*d+a*c+s*o-n*l,this._z=s*d+a*l+n*c-r*o,this._w=a*d-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,t=Math.sin(t*l)/d,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Va=class Va{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ho.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ho.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),d=2*(o*t-s*r),h=2*(s*n-a*t);return this.x=t+c*l+a*h-o*d,this.y=n+c*d+o*l-s*h,this.z=r+c*h+s*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return is.copy(this).projectOnVector(e),this.sub(is)}reflect(e){return this.sub(is.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Va.prototype.isVector3=!0;let F=Va;const is=new F,ho=new Ii,Ha=class Ha{constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=c,d[6]=n,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],d=n[4],h=n[7],u=n[2],p=n[5],_=n[8],S=r[0],m=r[3],f=r[6],v=r[1],y=r[4],E=r[7],w=r[2],T=r[5],P=r[8];return s[0]=a*S+o*v+c*w,s[3]=a*m+o*y+c*T,s[6]=a*f+o*E+c*P,s[1]=l*S+d*v+h*w,s[4]=l*m+d*y+h*T,s[7]=l*f+d*E+h*P,s[2]=u*S+p*v+_*w,s[5]=u*m+p*y+_*T,s[8]=u*f+p*E+_*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-n*s*d+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*a-o*l,u=o*c-d*s,p=l*s-a*c,_=t*h+n*u+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/_;return e[0]=h*S,e[1]=(r*l-d*n)*S,e[2]=(o*n-r*a)*S,e[3]=u*S,e[4]=(d*t-r*c)*S,e[5]=(r*s-o*t)*S,e[6]=p*S,e[7]=(n*c-l*t)*S,e[8]=(a*t-n*s)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(rs.makeScale(e,t)),this}rotate(e){return this.premultiply(rs.makeRotation(-e)),this}translate(e,t){return this.premultiply(rs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ha.prototype.isMatrix3=!0;let Fe=Ha;const rs=new Fe,po=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mo=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function au(){const i={enabled:!0,workingColorSpace:Nr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===st&&(r.r=Rn(r.r),r.g=Rn(r.g),r.b=Rn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(r.r=Ri(r.r),r.g=Ri(r.g),r.b=Ri(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Gn?Fr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Sa("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Sa("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Nr]:{primaries:e,whitePoint:n,transfer:Fr,toXYZ:po,fromXYZ:mo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:n,transfer:st,toXYZ:po,fromXYZ:mo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),i}const je=au();function Rn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ri(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let hi;class ou{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{hi===void 0&&(hi=Br("canvas")),hi.width=e.width,hi.height=e.height;const r=hi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=hi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Br("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Rn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Rn(t[n]/255)*255):t[n]=Rn(t[n]);return{data:t,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let lu=0;class Na{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=Ki(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ss(r[a].image)):s.push(ss(r[a]))}else s=ss(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ss(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ou.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}let cu=0;const as=new F;class Nt extends ci{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,n=An,r=An,s=It,a=Qn,o=tn,c=Kt,l=Nt.DEFAULT_ANISOTROPY,d=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=Ki(),this.name="",this.source=new Na(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(as).x}get height(){return this.source.getSize(as).y}get depth(){return this.source.getSize(as).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Le(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Le(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Hs:e.x=e.x-Math.floor(e.x);break;case An:e.x=e.x<0?0:1;break;case Ws:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Hs:e.y=e.y-Math.floor(e.y);break;case An:e.y=e.y<0?0:1;break;case Ws:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=xl;Nt.DEFAULT_ANISOTROPY=1;const Wa=class Wa{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],d=c[4],h=c[8],u=c[1],p=c[5],_=c[9],S=c[2],m=c[6],f=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-S)<.01&&Math.abs(_-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+S)<.1&&Math.abs(_+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,E=(p+1)/2,w=(f+1)/2,T=(d+u)/4,P=(h+S)/4,x=(_+m)/4;return y>E&&y>w?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=T/n,s=P/n):E>w?E<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),n=T/r,s=x/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=P/s,r=x/s),this.set(n,r,s,t),this}let v=Math.sqrt((m-_)*(m-_)+(h-S)*(h-S)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(h-S)/v,this.z=(u-d)/v,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Wa.prototype.isVector4=!0;let vt=Wa;class uu extends ci{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Nt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Na(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pn extends uu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class wl extends Nt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class du extends Nt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Vr=class Vr{constructor(e,t,n,r,s,a,o,c,l,d,h,u,p,_,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,d,h,u,p,_,S,m)}set(e,t,n,r,s,a,o,c,l,d,h,u,p,_,S,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=_,f[11]=S,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Vr().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/pi.setFromMatrixColumn(e,0).length(),s=1/pi.setFromMatrixColumn(e,1).length(),a=1/pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=a*d,p=a*h,_=o*d,S=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=p+_*l,t[5]=u-S*l,t[9]=-o*c,t[2]=S-u*l,t[6]=_+p*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*d,p=c*h,_=l*d,S=l*h;t[0]=u+S*o,t[4]=_*o-p,t[8]=a*l,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=p*o-_,t[6]=S+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*d,p=c*h,_=l*d,S=l*h;t[0]=u-S*o,t[4]=-a*h,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*d,t[9]=S-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*d,p=a*h,_=o*d,S=o*h;t[0]=c*d,t[4]=_*l-p,t[8]=u*l+S,t[1]=c*h,t[5]=S*l+u,t[9]=p*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,p=a*l,_=o*c,S=o*l;t[0]=c*d,t[4]=S-u*h,t[8]=_*h+p,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=p*h+_,t[10]=u-S*h}else if(e.order==="XZY"){const u=a*c,p=a*l,_=o*c,S=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=u*h+S,t[5]=a*d,t[9]=p*h-_,t[2]=_*h-p,t[6]=o*d,t[10]=S*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fu,e,hu)}lookAt(e,t,n){const r=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),Nn.crossVectors(n,Ht),Nn.lengthSq()===0&&(Math.abs(n.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),Nn.crossVectors(n,Ht)),Nn.normalize(),ir.crossVectors(Ht,Nn),r[0]=Nn.x,r[4]=ir.x,r[8]=Ht.x,r[1]=Nn.y,r[5]=ir.y,r[9]=Ht.y,r[2]=Nn.z,r[6]=ir.z,r[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],d=n[1],h=n[5],u=n[9],p=n[13],_=n[2],S=n[6],m=n[10],f=n[14],v=n[3],y=n[7],E=n[11],w=n[15],T=r[0],P=r[4],x=r[8],A=r[12],D=r[1],C=r[5],B=r[9],q=r[13],W=r[2],R=r[6],k=r[10],V=r[14],Z=r[3],Q=r[7],J=r[11],ue=r[15];return s[0]=a*T+o*D+c*W+l*Z,s[4]=a*P+o*C+c*R+l*Q,s[8]=a*x+o*B+c*k+l*J,s[12]=a*A+o*q+c*V+l*ue,s[1]=d*T+h*D+u*W+p*Z,s[5]=d*P+h*C+u*R+p*Q,s[9]=d*x+h*B+u*k+p*J,s[13]=d*A+h*q+u*V+p*ue,s[2]=_*T+S*D+m*W+f*Z,s[6]=_*P+S*C+m*R+f*Q,s[10]=_*x+S*B+m*k+f*J,s[14]=_*A+S*q+m*V+f*ue,s[3]=v*T+y*D+E*W+w*Z,s[7]=v*P+y*C+E*R+w*Q,s[11]=v*x+y*B+E*k+w*J,s[15]=v*A+y*q+E*V+w*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],u=e[10],p=e[14],_=e[3],S=e[7],m=e[11],f=e[15],v=c*p-l*u,y=o*p-l*h,E=o*u-c*h,w=a*p-l*d,T=a*u-c*d,P=a*h-o*d;return t*(S*v-m*y+f*E)-n*(_*v-m*w+f*T)+r*(_*y-S*w+f*P)-s*(_*E-S*T+m*P)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],u=e[10],p=e[11],_=e[12],S=e[13],m=e[14],f=e[15],v=t*o-n*a,y=t*c-r*a,E=t*l-s*a,w=n*c-r*o,T=n*l-s*o,P=r*l-s*c,x=d*S-h*_,A=d*m-u*_,D=d*f-p*_,C=h*m-u*S,B=h*f-p*S,q=u*f-p*m,W=v*q-y*B+E*C+w*D-T*A+P*x;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/W;return e[0]=(o*q-c*B+l*C)*R,e[1]=(r*B-n*q-s*C)*R,e[2]=(S*P-m*T+f*w)*R,e[3]=(u*T-h*P-p*w)*R,e[4]=(c*D-a*q-l*A)*R,e[5]=(t*q-r*D+s*A)*R,e[6]=(m*E-_*P-f*y)*R,e[7]=(d*P-u*E+p*y)*R,e[8]=(a*B-o*D+l*x)*R,e[9]=(n*D-t*B-s*x)*R,e[10]=(_*T-S*E+f*v)*R,e[11]=(h*E-d*T-p*v)*R,e[12]=(o*A-a*C-c*x)*R,e[13]=(t*C-n*A+r*x)*R,e[14]=(S*y-_*w-m*v)*R,e[15]=(d*w-h*y+u*v)*R,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,d=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,d*o+n,d*c-r*a,0,l*c-r*o,d*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,d=a+a,h=o+o,u=s*l,p=s*d,_=s*h,S=a*d,m=a*h,f=o*h,v=c*l,y=c*d,E=c*h,w=n.x,T=n.y,P=n.z;return r[0]=(1-(S+f))*w,r[1]=(p+E)*w,r[2]=(_-y)*w,r[3]=0,r[4]=(p-E)*T,r[5]=(1-(u+f))*T,r[6]=(m+v)*T,r[7]=0,r[8]=(_+y)*P,r[9]=(m-v)*P,r[10]=(1-(u+S))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=pi.set(r[0],r[1],r[2]).length();const o=pi.set(r[4],r[5],r[6]).length(),c=pi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Zt.copy(this);const l=1/a,d=1/o,h=1/c;return Zt.elements[0]*=l,Zt.elements[1]*=l,Zt.elements[2]*=l,Zt.elements[4]*=d,Zt.elements[5]*=d,Zt.elements[6]*=d,Zt.elements[8]*=h,Zt.elements[9]*=h,Zt.elements[10]*=h,t.setFromRotationMatrix(Zt),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=fn,c=!1){const l=this.elements,d=2*s/(t-e),h=2*s/(n-r),u=(t+e)/(t-e),p=(n+r)/(n-r);let _,S;if(c)_=s/(a-s),S=a*s/(a-s);else if(o===fn)_=-(a+s)/(a-s),S=-2*a*s/(a-s);else if(o===Or)_=-a/(a-s),S=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=fn,c=!1){const l=this.elements,d=2/(t-e),h=2/(n-r),u=-(t+e)/(t-e),p=-(n+r)/(n-r);let _,S;if(c)_=1/(a-s),S=a/(a-s);else if(o===fn)_=-2/(a-s),S=-(a+s)/(a-s);else if(o===Or)_=-1/(a-s),S=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=h,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Vr.prototype.isMatrix4=!0;let Mt=Vr;const pi=new F,Zt=new Mt,fu=new F(0,0,0),hu=new F(1,1,1),Nn=new F,ir=new F,Ht=new F,go=new Mt,_o=new Ii;class oi{constructor(e=0,t=0,n=0,r=oi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],d=r[9],h=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return go.makeRotationFromQuaternion(e),this.setFromRotationMatrix(go,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _o.setFromEuler(this),this.setFromQuaternion(_o,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oi.DEFAULT_ORDER="XYZ";class Fa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let pu=0;const xo=new F,mi=new Ii,Mn=new Mt,rr=new F,Fi=new F,mu=new F,gu=new Ii,vo=new F(1,0,0),Mo=new F(0,1,0),So=new F(0,0,1),yo={type:"added"},_u={type:"removed"},gi={type:"childadded",child:null},os={type:"childremoved",child:null};class Gt extends ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=Ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gt.DEFAULT_UP.clone();const e=new F,t=new oi,n=new Ii,r=new F(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Mt},normalMatrix:{value:new Fe}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=Gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.multiply(mi),this}rotateOnWorldAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.premultiply(mi),this}rotateX(e){return this.rotateOnAxis(vo,e)}rotateY(e){return this.rotateOnAxis(Mo,e)}rotateZ(e){return this.rotateOnAxis(So,e)}translateOnAxis(e,t){return xo.copy(e).applyQuaternion(this.quaternion),this.position.add(xo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vo,e)}translateY(e){return this.translateOnAxis(Mo,e)}translateZ(e){return this.translateOnAxis(So,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?rr.copy(e):rr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Fi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(Fi,rr,this.up):Mn.lookAt(rr,Fi,this.up),this.quaternion.setFromRotationMatrix(Mn),r&&(Mn.extractRotation(r.matrixWorld),mi.setFromRotationMatrix(Mn),this.quaternion.premultiply(mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yo),gi.child=e,this.dispatchEvent(gi),gi.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_u),os.child=e,this.dispatchEvent(os),os.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yo),gi.child=e,this.dispatchEvent(gi),gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,e,mu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,gu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=r,n;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Gt.DEFAULT_UP=new F(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Xi extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xu={type:"move"};class ls{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const S of e.hand.values()){const m=t.getJointPose(S,n),f=this._getHandJoint(l,S);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,_=.005;l.inputState.pinching&&u>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xu)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Xi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Rl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},sr={h:0,s:0,l:0};function cs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class rt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=je.workingColorSpace){if(e=su(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=cs(a,s,e+1/3),this.g=cs(a,s,e),this.b=cs(a,s,e-1/3)}return je.colorSpaceToWorking(this,r),this}setStyle(e,t=$t){function n(s){s!==void 0&&parseFloat(s)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){const n=Rl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rn(e.r),this.g=Rn(e.g),this.b=Rn(e.b),this}copyLinearToSRGB(e){return this.r=Ri(e.r),this.g=Ri(e.g),this.b=Ri(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return je.workingToColorSpace(Dt.copy(this),e),Math.round(Ke(Dt.r*255,0,255))*65536+Math.round(Ke(Dt.g*255,0,255))*256+Math.round(Ke(Dt.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(Dt.copy(this),t);const n=Dt.r,r=Dt.g,s=Dt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=d<=.5?h/(a+o):h/(2-a-o),a){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=$t){je.workingToColorSpace(Dt.copy(this),e);const t=Dt.r,n=Dt.g,r=Dt.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Fn),this.setHSL(Fn.h+e,Fn.s+t,Fn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Fn),e.getHSL(sr);const n=ns(Fn.h,sr.h,t),r=ns(Fn.s,sr.s,t),s=ns(Fn.l,sr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new rt;rt.NAMES=Rl;class vu extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Jt=new F,Sn=new F,us=new F,yn=new F,_i=new F,xi=new F,Eo=new F,ds=new F,fs=new F,hs=new F,ps=new vt,ms=new vt,gs=new vt;class en{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Jt.subVectors(e,t),r.cross(Jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Jt.subVectors(r,t),Sn.subVectors(n,t),us.subVectors(e,t);const a=Jt.dot(Jt),o=Jt.dot(Sn),c=Jt.dot(us),l=Sn.dot(Sn),d=Sn.dot(us),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(l*c-o*d)*u,_=(a*d-o*c)*u;return s.set(1-p-_,_,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,yn.x),c.addScaledVector(a,yn.y),c.addScaledVector(o,yn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return ps.setScalar(0),ms.setScalar(0),gs.setScalar(0),ps.fromBufferAttribute(e,t),ms.fromBufferAttribute(e,n),gs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ps,s.x),a.addScaledVector(ms,s.y),a.addScaledVector(gs,s.z),a}static isFrontFacing(e,t,n,r){return Jt.subVectors(n,t),Sn.subVectors(e,t),Jt.cross(Sn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),Jt.cross(Sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return en.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return en.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return en.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return en.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return en.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;_i.subVectors(r,n),xi.subVectors(s,n),ds.subVectors(e,n);const c=_i.dot(ds),l=xi.dot(ds);if(c<=0&&l<=0)return t.copy(n);fs.subVectors(e,r);const d=_i.dot(fs),h=xi.dot(fs);if(d>=0&&h<=d)return t.copy(r);const u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(n).addScaledVector(_i,a);hs.subVectors(e,s);const p=_i.dot(hs),_=xi.dot(hs);if(_>=0&&p<=_)return t.copy(s);const S=p*l-c*_;if(S<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(n).addScaledVector(xi,o);const m=d*_-p*h;if(m<=0&&h-d>=0&&p-_>=0)return Eo.subVectors(s,r),o=(h-d)/(h-d+(p-_)),t.copy(r).addScaledVector(Eo,o);const f=1/(m+S+u);return a=S*f,o=u*f,t.copy(n).addScaledVector(_i,a).addScaledVector(xi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Zi{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qt):Qt.fromBufferAttribute(s,a),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ar.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ar.copy(n.boundingBox)),ar.applyMatrix4(e.matrixWorld),this.union(ar)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oi),or.subVectors(this.max,Oi),vi.subVectors(e.a,Oi),Mi.subVectors(e.b,Oi),Si.subVectors(e.c,Oi),On.subVectors(Mi,vi),Bn.subVectors(Si,Mi),qn.subVectors(vi,Si);let t=[0,-On.z,On.y,0,-Bn.z,Bn.y,0,-qn.z,qn.y,On.z,0,-On.x,Bn.z,0,-Bn.x,qn.z,0,-qn.x,-On.y,On.x,0,-Bn.y,Bn.x,0,-qn.y,qn.x,0];return!_s(t,vi,Mi,Si,or)||(t=[1,0,0,0,1,0,0,0,1],!_s(t,vi,Mi,Si,or))?!1:(lr.crossVectors(On,Bn),t=[lr.x,lr.y,lr.z],_s(t,vi,Mi,Si,or))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(En),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const En=[new F,new F,new F,new F,new F,new F,new F,new F],Qt=new F,ar=new Zi,vi=new F,Mi=new F,Si=new F,On=new F,Bn=new F,qn=new F,Oi=new F,or=new F,lr=new F,Yn=new F;function _s(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Yn.fromArray(i,s);const o=r.x*Math.abs(Yn.x)+r.y*Math.abs(Yn.y)+r.z*Math.abs(Yn.z),c=e.dot(Yn),l=t.dot(Yn),d=n.dot(Yn);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const St=new F,cr=new it;let Mu=0;class mn extends ci{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Mu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=lo,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.applyMatrix3(e),this.setXY(t,cr.x,cr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array),s=Ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==lo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Cl extends mn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Pl extends mn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class At extends mn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Su=new Zi,Bi=new F,xs=new F;class qr{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Su.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bi.subVectors(e,this.center);const t=Bi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Bi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bi.copy(e.center).add(xs)),this.expandByPoint(Bi.copy(e.center).sub(xs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let yu=0;const Yt=new Mt,vs=new Gt,yi=new F,Wt=new Zi,ki=new Zi,Tt=new F;class Xt extends ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=Ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tu(e)?Pl:Cl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Fe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,n){return Yt.makeTranslation(e,t,n),this.applyMatrix4(Yt),this}scale(e,t,n){return Yt.makeScale(e,t,n),this.applyMatrix4(Yt),this}lookAt(e){return vs.lookAt(e),vs.updateMatrix(),this.applyMatrix4(vs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yi).negate(),this.translate(yi.x,yi.y,yi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new At(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Wt.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ki.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(Wt.min,ki.min),Wt.expandByPoint(Tt),Tt.addVectors(Wt.max,ki.max),Wt.expandByPoint(Tt)):(Wt.expandByPoint(ki.min),Wt.expandByPoint(ki.max))}Wt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Tt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Tt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Tt.fromBufferAttribute(o,l),c&&(yi.fromBufferAttribute(e,l),Tt.add(yi)),r=Math.max(r,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new F,c[x]=new F;const l=new F,d=new F,h=new F,u=new it,p=new it,_=new it,S=new F,m=new F;function f(x,A,D){l.fromBufferAttribute(n,x),d.fromBufferAttribute(n,A),h.fromBufferAttribute(n,D),u.fromBufferAttribute(s,x),p.fromBufferAttribute(s,A),_.fromBufferAttribute(s,D),d.sub(l),h.sub(l),p.sub(u),_.sub(u);const C=1/(p.x*_.y-_.x*p.y);isFinite(C)&&(S.copy(d).multiplyScalar(_.y).addScaledVector(h,-p.y).multiplyScalar(C),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-_.x).multiplyScalar(C),o[x].add(S),o[A].add(S),o[D].add(S),c[x].add(m),c[A].add(m),c[D].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let x=0,A=v.length;x<A;++x){const D=v[x],C=D.start,B=D.count;for(let q=C,W=C+B;q<W;q+=3)f(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const y=new F,E=new F,w=new F,T=new F;function P(x){w.fromBufferAttribute(r,x),T.copy(w);const A=o[x];y.copy(A),y.sub(w.multiplyScalar(w.dot(A))).normalize(),E.crossVectors(T,A);const C=E.dot(c[x])<0?-1:1;a.setXYZW(x,y.x,y.y,y.z,C)}for(let x=0,A=v.length;x<A;++x){const D=v[x],C=D.start,B=D.count;for(let q=C,W=C+B;q<W;q+=3)P(e.getX(q+0)),P(e.getX(q+1)),P(e.getX(q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new mn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const r=new F,s=new F,a=new F,o=new F,c=new F,l=new F,d=new F,h=new F;if(e)for(let u=0,p=e.count;u<p;u+=3){const _=e.getX(u+0),S=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,S),a.fromBufferAttribute(t,m),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,S),l.fromBufferAttribute(n,m),o.add(d),c.add(d),l.add(d),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(S,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,h=o.normalized,u=new l.constructor(c.length*d);let p=0,_=0;for(let S=0,m=c.length;S<m;S++){o.isInterleavedBufferAttribute?p=c[S]*o.data.stride+o.offset:p=c[S]*d;for(let f=0;f<d;f++)u[_++]=l[p++]}return new mn(u,d,h)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let d=0,h=l.length;d<h;d++){const u=l[d],p=e(u,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){const p=l[h];d.push(p.toJSON(e.data))}d.length>0&&(r[c]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(t))}const s=e.morphAttributes;for(const l in s){const d=[],h=s[l];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Eu=0;class Ji extends ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=Ki(),this.name="",this.type="Material",this.blending=wi,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Us,this.blendDst=Ns,this.blendEquation=Zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=oo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fi,this.stencilZFail=fi,this.stencilZPass=fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Le(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(n.blending=this.blending),this.side!==Hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Us&&(n.blendSrc=this.blendSrc),this.blendDst!==Ns&&(n.blendDst=this.blendDst),this.blendEquation!==Zn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==oo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const bn=new F,Ms=new F,ur=new F,kn=new F,Ss=new F,dr=new F,ys=new F;class Oa{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bn.copy(this.origin).addScaledVector(this.direction,t),bn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ms.copy(e).add(t).multiplyScalar(.5),ur.copy(t).sub(e).normalize(),kn.copy(this.origin).sub(Ms);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ur),o=kn.dot(this.direction),c=-kn.dot(ur),l=kn.lengthSq(),d=Math.abs(1-a*a);let h,u,p,_;if(d>0)if(h=a*c-o,u=a*o-c,_=s*d,h>=0)if(u>=-_)if(u<=_){const S=1/d;h*=S,u*=S,p=h*(h+a*u+2*o)+u*(a*h+u+2*c)+l}else u=s,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*c)+l;else u=-s,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*c)+l;else u<=-_?(h=Math.max(0,-(-a*s+o)),u=h>0?-s:Math.min(Math.max(-s,-c),s),p=-h*h+u*(u+2*c)+l):u<=_?(h=0,u=Math.min(Math.max(-s,-c),s),p=u*(u+2*c)+l):(h=Math.max(0,-(a*s+o)),u=h>0?s:Math.min(Math.max(-s,-c),s),p=-h*h+u*(u+2*c)+l);else u=a>0?-s:s,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ms).addScaledVector(ur,u),p}intersectSphere(e,t){bn.subVectors(e.center,this.origin);const n=bn.dot(this.direction),r=bn.dot(bn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),d>=0?(s=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-u.z)*h,c=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,c=(e.min.z-u.z)*h),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,bn)!==null}intersectTriangle(e,t,n,r,s){Ss.subVectors(t,e),dr.subVectors(n,e),ys.crossVectors(Ss,dr);let a=this.direction.dot(ys),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;kn.subVectors(this.origin,e);const c=o*this.direction.dot(dr.crossVectors(kn,dr));if(c<0)return null;const l=o*this.direction.dot(Ss.cross(kn));if(l<0||c+l>a)return null;const d=-o*kn.dot(ys);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kr extends Ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=ul,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bo=new Mt,$n=new Oa,fr=new qr,To=new F,hr=new F,pr=new F,mr=new F,Es=new F,gr=new F,Ao=new F,_r=new F;class nn extends Gt{constructor(e=new Xt,t=new kr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){gr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=o[c],h=s[c];d!==0&&(Es.fromBufferAttribute(h,e),a?gr.addScaledVector(Es,d):gr.addScaledVector(Es.sub(t),d))}t.add(gr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(s),$n.copy(e.ray).recast(e.near),!(fr.containsPoint($n.origin)===!1&&($n.intersectSphere(fr,To)===null||$n.origin.distanceToSquared(To)>(e.far-e.near)**2))&&(bo.copy(s).invert(),$n.copy(e.ray).applyMatrix4(bo),!(n.boundingBox!==null&&$n.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,$n)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,S=u.length;_<S;_++){const m=u[_],f=a[m.materialIndex],v=Math.max(m.start,p.start),y=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=v,w=y;E<w;E+=3){const T=o.getX(E),P=o.getX(E+1),x=o.getX(E+2);r=xr(this,f,e,n,l,d,h,T,P,x),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let m=_,f=S;m<f;m+=3){const v=o.getX(m),y=o.getX(m+1),E=o.getX(m+2);r=xr(this,a,e,n,l,d,h,v,y,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,S=u.length;_<S;_++){const m=u[_],f=a[m.materialIndex],v=Math.max(m.start,p.start),y=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let E=v,w=y;E<w;E+=3){const T=E,P=E+1,x=E+2;r=xr(this,f,e,n,l,d,h,T,P,x),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),S=Math.min(c.count,p.start+p.count);for(let m=_,f=S;m<f;m+=3){const v=m,y=m+1,E=m+2;r=xr(this,a,e,n,l,d,h,v,y,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function bu(i,e,t,n,r,s,a,o){let c;if(e.side===zt?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Hn,o),c===null)return null;_r.copy(o),_r.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(_r);return l<t.near||l>t.far?null:{distance:l,point:_r.clone(),object:i}}function xr(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,hr),i.getVertexPosition(c,pr),i.getVertexPosition(l,mr);const d=bu(i,e,t,n,hr,pr,mr,Ao);if(d){const h=new F;en.getBarycoord(Ao,hr,pr,mr,h),r&&(d.uv=en.getInterpolatedAttribute(r,o,c,l,h,new it)),s&&(d.uv1=en.getInterpolatedAttribute(s,o,c,l,h,new it)),a&&(d.normal=en.getInterpolatedAttribute(a,o,c,l,h,new F),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new F,materialIndex:0};en.getNormal(hr,pr,mr,u.normal),d.face=u,d.barycoord=h}return d}class Tu extends Nt{constructor(e=null,t=1,n=1,r,s,a,o,c,l=Ct,d=Ct,h,u){super(null,a,o,c,l,d,r,s,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const bs=new F,Au=new F,wu=new Fe;class Kn{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=bs.subVectors(n,t).cross(Au.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(bs),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||wu.getNormalMatrix(e),r=this.coplanarPoint(bs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new qr,Ru=new it(.5,.5),vr=new F;class Ll{constructor(e=new Kn,t=new Kn,n=new Kn,r=new Kn,s=new Kn,a=new Kn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=fn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],d=s[4],h=s[5],u=s[6],p=s[7],_=s[8],S=s[9],m=s[10],f=s[11],v=s[12],y=s[13],E=s[14],w=s[15];if(r[0].setComponents(l-a,p-d,f-_,w-v).normalize(),r[1].setComponents(l+a,p+d,f+_,w+v).normalize(),r[2].setComponents(l+o,p+h,f+S,w+y).normalize(),r[3].setComponents(l-o,p-h,f-S,w-y).normalize(),n)r[4].setComponents(c,u,m,E).normalize(),r[5].setComponents(l-c,p-u,f-m,w-E).normalize();else if(r[4].setComponents(l-c,p-u,f-m,w-E).normalize(),t===fn)r[5].setComponents(l+c,p+u,f+m,w+E).normalize();else if(t===Or)r[5].setComponents(c,u,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(e){jn.center.set(0,0,0);const t=Ru.distanceTo(e.center);return jn.radius=.7071067811865476+t,jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(vr.x=r.normal.x>0?e.max.x:e.min.x,vr.y=r.normal.y>0?e.max.y:e.min.y,vr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(vr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Dl extends Ji{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const zr=new F,Gr=new F,wo=new Mt,zi=new Oa,Mr=new qr,Ts=new F,Ro=new F;class Cu extends Gt{constructor(e=new Xt,t=new Dl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)zr.fromBufferAttribute(t,r-1),Gr.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=zr.distanceTo(Gr);e.setAttribute("lineDistance",new At(n,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere),Mr.applyMatrix4(r),Mr.radius+=s,e.ray.intersectsSphere(Mr)===!1)return;wo.copy(r).invert(),zi.copy(e.ray).applyMatrix4(wo);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){const p=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let S=p,m=_-1;S<m;S+=l){const f=d.getX(S),v=d.getX(S+1),y=Sr(this,e,zi,c,f,v,S);y&&t.push(y)}if(this.isLineLoop){const S=d.getX(_-1),m=d.getX(p),f=Sr(this,e,zi,c,S,m,_-1);f&&t.push(f)}}else{const p=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let S=p,m=_-1;S<m;S+=l){const f=Sr(this,e,zi,c,S,S+1,S);f&&t.push(f)}if(this.isLineLoop){const S=Sr(this,e,zi,c,_-1,p,_-1);S&&t.push(S)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Sr(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(zr.fromBufferAttribute(o,r),Gr.fromBufferAttribute(o,s),t.distanceSqToSegment(zr,Gr,Ts,Ro)>n)return;Ts.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ts);if(!(l<e.near||l>e.far))return{distance:l,point:Ro.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Co=new F,Po=new F;class Pu extends Cu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Co.fromBufferAttribute(t,r),Po.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Co.distanceTo(Po);e.setAttribute("lineDistance",new At(n,1))}else Le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Il extends Nt{constructor(e=[],t=si,n,r,s,a,o,c,l,d){super(e,t,n,r,s,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Li extends Nt{constructor(e,t,n=gn,r,s,a,o=Ct,c=Ct,l,d=Pn,h=1){if(d!==Pn&&d!==ei)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,r,s,a,o,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Na(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Lu extends Li{constructor(e,t=gn,n=si,r,s,a=Ct,o=Ct,c,l=Pn){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,n,r,s,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ul extends Nt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Qi extends Xt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],d=[],h=[];let u=0,p=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,r,a,2),_("x","z","y",1,-1,e,n,-t,r,a,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new At(l,3)),this.setAttribute("normal",new At(d,3)),this.setAttribute("uv",new At(h,2));function _(S,m,f,v,y,E,w,T,P,x,A){const D=E/P,C=w/x,B=E/2,q=w/2,W=T/2,R=P+1,k=x+1;let V=0,Z=0;const Q=new F;for(let J=0;J<k;J++){const ue=J*C-q;for(let ge=0;ge<R;ge++){const Oe=ge*D-B;Q[S]=Oe*v,Q[m]=ue*y,Q[f]=W,l.push(Q.x,Q.y,Q.z),Q[S]=0,Q[m]=0,Q[f]=T>0?1:-1,d.push(Q.x,Q.y,Q.z),h.push(ge/P),h.push(1-J/x),V+=1}}for(let J=0;J<x;J++)for(let ue=0;ue<P;ue++){const ge=u+ue+R*J,Oe=u+ue+R*(J+1),Se=u+(ue+1)+R*(J+1),Ee=u+(ue+1)+R*J;c.push(ge,Oe,Ee),c.push(Oe,Se,Ee),Z+=6}o.addGroup(p,Z,A),p+=Z,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ba extends Xt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],a=[];o(r),l(n),d(),this.setAttribute("position",new At(s,3)),this.setAttribute("normal",new At(s.slice(),3)),this.setAttribute("uv",new At(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const y=new F,E=new F,w=new F;for(let T=0;T<t.length;T+=3)p(t[T+0],y),p(t[T+1],E),p(t[T+2],w),c(y,E,w,v)}function c(v,y,E,w){const T=w+1,P=[];for(let x=0;x<=T;x++){P[x]=[];const A=v.clone().lerp(E,x/T),D=y.clone().lerp(E,x/T),C=T-x;for(let B=0;B<=C;B++)B===0&&x===T?P[x][B]=A:P[x][B]=A.clone().lerp(D,B/C)}for(let x=0;x<T;x++)for(let A=0;A<2*(T-x)-1;A++){const D=Math.floor(A/2);A%2===0?(u(P[x][D+1]),u(P[x+1][D]),u(P[x][D])):(u(P[x][D+1]),u(P[x+1][D+1]),u(P[x+1][D]))}}function l(v){const y=new F;for(let E=0;E<s.length;E+=3)y.x=s[E+0],y.y=s[E+1],y.z=s[E+2],y.normalize().multiplyScalar(v),s[E+0]=y.x,s[E+1]=y.y,s[E+2]=y.z}function d(){const v=new F;for(let y=0;y<s.length;y+=3){v.x=s[y+0],v.y=s[y+1],v.z=s[y+2];const E=m(v)/2/Math.PI+.5,w=f(v)/Math.PI+.5;a.push(E,1-w)}_(),h()}function h(){for(let v=0;v<a.length;v+=6){const y=a[v+0],E=a[v+2],w=a[v+4],T=Math.max(y,E,w),P=Math.min(y,E,w);T>.9&&P<.1&&(y<.2&&(a[v+0]+=1),E<.2&&(a[v+2]+=1),w<.2&&(a[v+4]+=1))}}function u(v){s.push(v.x,v.y,v.z)}function p(v,y){const E=v*3;y.x=e[E+0],y.y=e[E+1],y.z=e[E+2]}function _(){const v=new F,y=new F,E=new F,w=new F,T=new it,P=new it,x=new it;for(let A=0,D=0;A<s.length;A+=9,D+=6){v.set(s[A+0],s[A+1],s[A+2]),y.set(s[A+3],s[A+4],s[A+5]),E.set(s[A+6],s[A+7],s[A+8]),T.set(a[D+0],a[D+1]),P.set(a[D+2],a[D+3]),x.set(a[D+4],a[D+5]),w.copy(v).add(y).add(E).divideScalar(3);const C=m(w);S(T,D+0,v,C),S(P,D+2,y,C),S(x,D+4,E,C)}}function S(v,y,E,w){w<0&&v.x===1&&(a[y]=v.x-1),E.x===0&&E.z===0&&(a[y]=w/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function f(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ba(e.vertices,e.indices,e.radius,e.detail)}}class ka extends Ba{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ka(e.radius,e.detail)}}class Yr extends Xt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,d=c+1,h=e/o,u=t/c,p=[],_=[],S=[],m=[];for(let f=0;f<d;f++){const v=f*u-a;for(let y=0;y<l;y++){const E=y*h-s;_.push(E,-v,0),S.push(0,0,1),m.push(y/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let v=0;v<o;v++){const y=v+l*f,E=v+l*(f+1),w=v+1+l*(f+1),T=v+1+l*f;p.push(y,E,T),p.push(E,w,T)}this.setIndex(p),this.setAttribute("position",new At(_,3)),this.setAttribute("normal",new At(S,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yr(e.width,e.height,e.widthSegments,e.heightSegments)}}class za extends Xt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const d=[],h=new F,u=new F,p=[],_=[],S=[],m=[];for(let f=0;f<=n;f++){const v=[],y=f/n;let E=0;f===0&&a===0?E=.5/t:f===n&&c===Math.PI&&(E=-.5/t);for(let w=0;w<=t;w++){const T=w/t;h.x=-e*Math.cos(r+T*s)*Math.sin(a+y*o),h.y=e*Math.cos(a+y*o),h.z=e*Math.sin(r+T*s)*Math.sin(a+y*o),_.push(h.x,h.y,h.z),u.copy(h).normalize(),S.push(u.x,u.y,u.z),m.push(T+E,1-y),v.push(l++)}d.push(v)}for(let f=0;f<n;f++)for(let v=0;v<t;v++){const y=d[f][v+1],E=d[f][v],w=d[f+1][v],T=d[f+1][v+1];(f!==0||a>0)&&p.push(y,E,T),(f!==n-1||c<Math.PI)&&p.push(E,w,T)}this.setIndex(p),this.setAttribute("position",new At(_,3)),this.setAttribute("normal",new At(S,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new za(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Di(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(Lo(r))r.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Lo(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Ut(i){const e={};for(let t=0;t<i.length;t++){const n=Di(i[t]);for(const r in n)e[r]=n[r]}return e}function Lo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Du(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Nl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const Iu={clone:Di,merge:Ut};var Uu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _n extends Ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uu,this.fragmentShader=Nu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=Du(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Fu extends _n{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ou extends Ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Bu extends Ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const yr=new F,Er=new Ii,on=new F;class Fl extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(yr,Er,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yr,Er,on.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(yr,Er,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yr,Er,on.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const zn=new F,Do=new it,Io=new it;class jt extends Fl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ya*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ts*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ya*2*Math.atan(Math.tan(ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zn.x,zn.y).multiplyScalar(-e/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-e/zn.z)}getViewSize(e,t){return this.getViewBounds(e,Do,Io),t.subVectors(Io,Do)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ts*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ol extends Fl{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ei=-90,bi=1;class ku extends Gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new jt(Ei,bi,e,t);r.layers=this.layers,this.add(r);const s=new jt(Ei,bi,e,t);s.layers=this.layers,this.add(s);const a=new jt(Ei,bi,e,t);a.layers=this.layers,this.add(a);const o=new jt(Ei,bi,e,t);o.layers=this.layers,this.add(o);const c=new jt(Ei,bi,e,t);c.layers=this.layers,this.add(c);const l=new jt(Ei,bi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===fn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Or)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class zu extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Uo=new Mt;class Gu{constructor(e,t,n=0,r=1/0){this.ray=new Oa(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Fa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Uo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Uo),this}intersectObject(e,t=!0,n=[]){return Ea(e,this,n,t),n.sort(No),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Ea(e[r],this,n,t);return n.sort(No),n}}function No(i,e){return i.distance-e.distance}function Ea(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Ea(s[a],e,t,!0)}}const Xa=class Xa{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};Xa.prototype.isMatrix2=!0;let Fo=Xa;function Oo(i,e,t,n){const r=Vu(n);switch(t){case El:return i*e;case Tl:return i*e/r.components*r.byteLength;case Pa:return i*e/r.components*r.byteLength;case ai:return i*e*2/r.components*r.byteLength;case La:return i*e*2/r.components*r.byteLength;case bl:return i*e*3/r.components*r.byteLength;case tn:return i*e*4/r.components*r.byteLength;case Da:return i*e*4/r.components*r.byteLength;case wr:case Rr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Cr:case Pr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qs:case $s:return Math.max(i,16)*Math.max(e,8)/4;case Xs:case Ys:return Math.max(i,8)*Math.max(e,8)/2;case js:case Ks:case Js:case Qs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Zs:case Ir:case ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case na:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ia:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ra:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case sa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case aa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case oa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case la:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ca:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ua:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case da:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case fa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ha:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case pa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ma:case ga:case _a:return Math.ceil(i/4)*Math.ceil(e/4)*16;case xa:case va:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ur:case Ma:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Vu(i){switch(i){case Kt:case vl:return{byteLength:1,components:1};case $i:case Ml:case Cn:return{byteLength:2,components:1};case Ra:case Ca:return{byteLength:2,components:4};case gn:case wa:case dn:return{byteLength:4,components:1};case Sl:case yl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);function Bl(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Hu(i){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,h=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,d),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const d=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,d);else{h.sort((p,_)=>p.start-_.start);let u=0;for(let p=1;p<h.length;p++){const _=h[u],S=h[p];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++u,h[u]=S)}h.length=u+1;for(let p=0,_=h.length;p<_;p++){const S=h[p];i.bufferSubData(l,S.start*d.BYTES_PER_ELEMENT,d,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Wu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$u=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ju=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ku=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Zu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ju=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Qu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ed=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,td=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,id=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,rd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ad=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ud=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,dd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,hd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,md=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_d=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Md="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Ed=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,bd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Td=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ad=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ld=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Dd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Id=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ud=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Fd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Od=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Vd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Hd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qd=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Yd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$d=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ef=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,af=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,of=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,lf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,uf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,mf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_f=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Sf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Af=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Cf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Pf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Df=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,If=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Uf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Nf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ff=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Of=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Wf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$f=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Jf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Qf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,eh=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,th=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ih=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rh=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ah=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oh=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lh=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ch=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,uh=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dh=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,hh=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ph=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mh=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,gh=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_h=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vh=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Mh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sh=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yh=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Eh=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:Wu,alphahash_pars_fragment:Xu,alphamap_fragment:qu,alphamap_pars_fragment:Yu,alphatest_fragment:$u,alphatest_pars_fragment:ju,aomap_fragment:Ku,aomap_pars_fragment:Zu,batching_pars_vertex:Ju,batching_vertex:Qu,begin_vertex:ed,beginnormal_vertex:td,bsdfs:nd,iridescence_fragment:id,bumpmap_pars_fragment:rd,clipping_planes_fragment:sd,clipping_planes_pars_fragment:ad,clipping_planes_pars_vertex:od,clipping_planes_vertex:ld,color_fragment:cd,color_pars_fragment:ud,color_pars_vertex:dd,color_vertex:fd,common:hd,cube_uv_reflection_fragment:pd,defaultnormal_vertex:md,displacementmap_pars_vertex:gd,displacementmap_vertex:_d,emissivemap_fragment:xd,emissivemap_pars_fragment:vd,colorspace_fragment:Md,colorspace_pars_fragment:Sd,envmap_fragment:yd,envmap_common_pars_fragment:Ed,envmap_pars_fragment:bd,envmap_pars_vertex:Td,envmap_physical_pars_fragment:Fd,envmap_vertex:Ad,fog_vertex:wd,fog_pars_vertex:Rd,fog_fragment:Cd,fog_pars_fragment:Pd,gradientmap_pars_fragment:Ld,lightmap_pars_fragment:Dd,lights_lambert_fragment:Id,lights_lambert_pars_fragment:Ud,lights_pars_begin:Nd,lights_toon_fragment:Od,lights_toon_pars_fragment:Bd,lights_phong_fragment:kd,lights_phong_pars_fragment:zd,lights_physical_fragment:Gd,lights_physical_pars_fragment:Vd,lights_fragment_begin:Hd,lights_fragment_maps:Wd,lights_fragment_end:Xd,lightprobes_pars_fragment:qd,logdepthbuf_fragment:Yd,logdepthbuf_pars_fragment:$d,logdepthbuf_pars_vertex:jd,logdepthbuf_vertex:Kd,map_fragment:Zd,map_pars_fragment:Jd,map_particle_fragment:Qd,map_particle_pars_fragment:ef,metalnessmap_fragment:tf,metalnessmap_pars_fragment:nf,morphinstance_vertex:rf,morphcolor_vertex:sf,morphnormal_vertex:af,morphtarget_pars_vertex:of,morphtarget_vertex:lf,normal_fragment_begin:cf,normal_fragment_maps:uf,normal_pars_fragment:df,normal_pars_vertex:ff,normal_vertex:hf,normalmap_pars_fragment:pf,clearcoat_normal_fragment_begin:mf,clearcoat_normal_fragment_maps:gf,clearcoat_pars_fragment:_f,iridescence_pars_fragment:xf,opaque_fragment:vf,packing:Mf,premultiplied_alpha_fragment:Sf,project_vertex:yf,dithering_fragment:Ef,dithering_pars_fragment:bf,roughnessmap_fragment:Tf,roughnessmap_pars_fragment:Af,shadowmap_pars_fragment:wf,shadowmap_pars_vertex:Rf,shadowmap_vertex:Cf,shadowmask_pars_fragment:Pf,skinbase_vertex:Lf,skinning_pars_vertex:Df,skinning_vertex:If,skinnormal_vertex:Uf,specularmap_fragment:Nf,specularmap_pars_fragment:Ff,tonemapping_fragment:Of,tonemapping_pars_fragment:Bf,transmission_fragment:kf,transmission_pars_fragment:zf,uv_pars_fragment:Gf,uv_pars_vertex:Vf,uv_vertex:Hf,worldpos_vertex:Wf,background_vert:Xf,background_frag:qf,backgroundCube_vert:Yf,backgroundCube_frag:$f,cube_vert:jf,cube_frag:Kf,depth_vert:Zf,depth_frag:Jf,distance_vert:Qf,distance_frag:eh,equirect_vert:th,equirect_frag:nh,linedashed_vert:ih,linedashed_frag:rh,meshbasic_vert:sh,meshbasic_frag:ah,meshlambert_vert:oh,meshlambert_frag:lh,meshmatcap_vert:ch,meshmatcap_frag:uh,meshnormal_vert:dh,meshnormal_frag:fh,meshphong_vert:hh,meshphong_frag:ph,meshphysical_vert:mh,meshphysical_frag:gh,meshtoon_vert:_h,meshtoon_frag:xh,points_vert:vh,points_frag:Mh,shadow_vert:Sh,shadow_frag:yh,sprite_vert:Eh,sprite_frag:bh},fe={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},cn={basic:{uniforms:Ut([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Ut([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new rt(0)},envMapIntensity:{value:1}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Ut([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Ut([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Ut([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new rt(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Ut([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Ut([fe.points,fe.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Ut([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Ut([fe.common,fe.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Ut([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Ut([fe.sprite,fe.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distance:{uniforms:Ut([fe.common,fe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distance_vert,fragmentShader:He.distance_frag},shadow:{uniforms:Ut([fe.lights,fe.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};cn.physical={uniforms:Ut([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const br={r:0,b:0,g:0},Th=new Mt,kl=new Fe;kl.set(-1,0,0,0,1,0,0,0,1);function Ah(i,e,t,n,r,s){const a=new rt(0);let o=r===!0?0:1,c,l,d=null,h=0,u=null;function p(v){let y=v.isScene===!0?v.background:null;if(y&&y.isTexture){const E=v.backgroundBlurriness>0;y=e.get(y,E)}return y}function _(v){let y=!1;const E=p(v);E===null?m(a,o):E&&E.isColor&&(m(E,1),y=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(v,y){const E=p(y);E&&(E.isCubeTexture||E.mapping===Xr)?(l===void 0&&(l=new nn(new Qi(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Di(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Th.makeRotationFromEuler(y.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(kl),l.material.toneMapped=je.getTransfer(E.colorSpace)!==st,(d!==E||h!==E.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,d=E,h=E.version,u=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new nn(new Yr(2,2),new _n({name:"BackgroundMaterial",uniforms:Di(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=je.getTransfer(E.colorSpace)!==st,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||h!==E.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=E,h=E.version,u=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,y){v.getRGB(br,Nl(i)),t.buffers.color.setClear(br.r,br.g,br.b,y,s)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),o=y,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:_,addToRenderList:S,dispose:f}}function wh(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=u(null);let s=r,a=!1;function o(C,B,q,W,R){let k=!1;const V=h(C,W,q,B);s!==V&&(s=V,l(s.object)),k=p(C,W,q,R),k&&_(C,W,q,R),R!==null&&e.update(R,i.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,E(C,B,q,W),R!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(R).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function d(C){return i.deleteVertexArray(C)}function h(C,B,q,W){const R=W.wireframe===!0;let k=n[B.id];k===void 0&&(k={},n[B.id]=k);const V=C.isInstancedMesh===!0?C.id:0;let Z=k[V];Z===void 0&&(Z={},k[V]=Z);let Q=Z[q.id];Q===void 0&&(Q={},Z[q.id]=Q);let J=Q[R];return J===void 0&&(J=u(c()),Q[R]=J),J}function u(C){const B=[],q=[],W=[];for(let R=0;R<t;R++)B[R]=0,q[R]=0,W[R]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:q,attributeDivisors:W,object:C,attributes:{},index:null}}function p(C,B,q,W){const R=s.attributes,k=B.attributes;let V=0;const Z=q.getAttributes();for(const Q in Z)if(Z[Q].location>=0){const ue=R[Q];let ge=k[Q];if(ge===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(ge=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(ge=C.instanceColor)),ue===void 0||ue.attribute!==ge||ge&&ue.data!==ge.data)return!0;V++}return s.attributesNum!==V||s.index!==W}function _(C,B,q,W){const R={},k=B.attributes;let V=0;const Z=q.getAttributes();for(const Q in Z)if(Z[Q].location>=0){let ue=k[Q];ue===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(ue=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(ue=C.instanceColor));const ge={};ge.attribute=ue,ue&&ue.data&&(ge.data=ue.data),R[Q]=ge,V++}s.attributes=R,s.attributesNum=V,s.index=W}function S(){const C=s.newAttributes;for(let B=0,q=C.length;B<q;B++)C[B]=0}function m(C){f(C,0)}function f(C,B){const q=s.newAttributes,W=s.enabledAttributes,R=s.attributeDivisors;q[C]=1,W[C]===0&&(i.enableVertexAttribArray(C),W[C]=1),R[C]!==B&&(i.vertexAttribDivisor(C,B),R[C]=B)}function v(){const C=s.newAttributes,B=s.enabledAttributes;for(let q=0,W=B.length;q<W;q++)B[q]!==C[q]&&(i.disableVertexAttribArray(q),B[q]=0)}function y(C,B,q,W,R,k,V){V===!0?i.vertexAttribIPointer(C,B,q,R,k):i.vertexAttribPointer(C,B,q,W,R,k)}function E(C,B,q,W){S();const R=W.attributes,k=q.getAttributes(),V=B.defaultAttributeValues;for(const Z in k){const Q=k[Z];if(Q.location>=0){let J=R[Z];if(J===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(J=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(J=C.instanceColor)),J!==void 0){const ue=J.normalized,ge=J.itemSize,Oe=e.get(J);if(Oe===void 0)continue;const Se=Oe.buffer,Ee=Oe.type,Y=Oe.bytesPerElement,ae=Ee===i.INT||Ee===i.UNSIGNED_INT||J.gpuType===wa;if(J.isInterleavedBufferAttribute){const ne=J.data,we=ne.stride,Ue=J.offset;if(ne.isInstancedInterleavedBuffer){for(let Ce=0;Ce<Q.locationSize;Ce++)f(Q.location+Ce,ne.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Ce=0;Ce<Q.locationSize;Ce++)m(Q.location+Ce);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let Ce=0;Ce<Q.locationSize;Ce++)y(Q.location+Ce,ge/Q.locationSize,Ee,ue,we*Y,(Ue+ge/Q.locationSize*Ce)*Y,ae)}else{if(J.isInstancedBufferAttribute){for(let ne=0;ne<Q.locationSize;ne++)f(Q.location+ne,J.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ne=0;ne<Q.locationSize;ne++)m(Q.location+ne);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let ne=0;ne<Q.locationSize;ne++)y(Q.location+ne,ge/Q.locationSize,Ee,ue,ge*Y,ge/Q.locationSize*ne*Y,ae)}}else if(V!==void 0){const ue=V[Z];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(Q.location,ue);break;case 3:i.vertexAttrib3fv(Q.location,ue);break;case 4:i.vertexAttrib4fv(Q.location,ue);break;default:i.vertexAttrib1fv(Q.location,ue)}}}}v()}function w(){A();for(const C in n){const B=n[C];for(const q in B){const W=B[q];for(const R in W){const k=W[R];for(const V in k)d(k[V].object),delete k[V];delete W[R]}}delete n[C]}}function T(C){if(n[C.id]===void 0)return;const B=n[C.id];for(const q in B){const W=B[q];for(const R in W){const k=W[R];for(const V in k)d(k[V].object),delete k[V];delete W[R]}}delete n[C.id]}function P(C){for(const B in n){const q=n[B];for(const W in q){const R=q[W];if(R[C.id]===void 0)continue;const k=R[C.id];for(const V in k)d(k[V].object),delete k[V];delete R[C.id]}}}function x(C){for(const B in n){const q=n[B],W=C.isInstancedMesh===!0?C.id:0,R=q[W];if(R!==void 0){for(const k in R){const V=R[k];for(const Z in V)d(V[Z].object),delete V[Z];delete R[k]}delete q[W],Object.keys(q).length===0&&delete n[B]}}}function A(){D(),a=!0,s!==r&&(s=r,l(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:P,initAttributes:S,enableAttribute:m,disableUnusedAttributes:v}}function Rh(i,e,t){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,d){d!==0&&(i.drawArraysInstanced(n,c,l,d),t.update(l,n,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,d);let u=0;for(let p=0;p<d;p++)u+=l[p];t.update(u,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Ch(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==tn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const x=P===Cn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Kt&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==dn&&!x)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(Le("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:E,maxSamples:w,samples:T}}function Ph(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Kn,o=new Fe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||n!==0||r;return r=u,n=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,p){const _=h.clippingPlanes,S=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!r||_===null||_.length===0||s&&!m)s?d(null):l();else{const v=s?0:n,y=v*4;let E=f.clippingState||null;c.value=E,E=d(_,u,y,p);for(let w=0;w!==y;++w)E[w]=t[w];f.clippingState=E,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,p,_){const S=h!==null?h.length:0;let m=null;if(S!==0){if(m=c.value,_!==!0||m===null){const f=p+S*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,E=p;y!==S;++y,E+=4)a.copy(h[y]).applyMatrix4(v,o),a.normal.toArray(m,E),m[E+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}const Vn=4,Bo=[.125,.215,.35,.446,.526,.582],Jn=20,Lh=256,Gi=new Ol,ko=new rt;let As=null,ws=0,Rs=0,Cs=!1;const Dh=new F;class zo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=Dh}=s;As=this._renderer.getRenderTarget(),ws=this._renderer.getActiveCubeFace(),Rs=this._renderer.getActiveMipmapLevel(),Cs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ho(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(As,ws,Rs),this._renderer.xr.enabled=Cs,e.scissorTest=!1,Ti(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===si||e.mapping===Pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),As=this._renderer.getRenderTarget(),ws=this._renderer.getActiveCubeFace(),Rs=this._renderer.getActiveMipmapLevel(),Cs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:Cn,format:tn,colorSpace:Nr,depthBuffer:!1},r=Go(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Go(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ih(s)),this._blurMaterial=Nh(s,e,t),this._ggxMaterial=Uh(s,e,t)}return r}_compileMaterial(e){const t=new nn(new Xt,e);this._renderer.compile(t,Gi)}_sceneToCubeUV(e,t,n,r,s){const c=new jt(90,1,t,n),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(ko),h.toneMapping=hn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new nn(new Qi,new kr({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let f=!1;const v=e.background;v?v.isColor&&(m.color.copy(v),e.background=null,f=!0):(m.color.copy(ko),f=!0);for(let y=0;y<6;y++){const E=y%3;E===0?(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+d[y],s.y,s.z)):E===1?(c.up.set(0,0,l[y]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+d[y],s.z)):(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+d[y]));const w=this._cubeSize;Ti(r,E*w,y>2?w:0,w,w),h.setRenderTarget(r),f&&h.render(S,c),h.render(e,c)}h.toneMapping=p,h.autoClear=u,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===si||e.mapping===Pi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ho()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vo());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Ti(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Gi)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-d*d),u=0+l*1.25,p=h*u,{_lodMax:_}=this,S=this._sizeLods[n],m=3*S*(n>_-Vn?n-_+Vn:0),f=4*(this._cubeSize-S);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=_-t,Ti(s,m,f,3*S,2*S),r.setRenderTarget(s),r.render(o,Gi),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=_-n,Ti(e,m,f,3*S,2*S),r.setRenderTarget(e),r.render(o,Gi)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Je("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[r];h.material=l;const u=l.uniforms,p=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Jn-1),S=s/_,m=isFinite(s)?1+Math.floor(d*S):Jn;m>Jn&&Le(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Jn}`);const f=[];let v=0;for(let P=0;P<Jn;++P){const x=P/S,A=Math.exp(-x*x/2);f.push(A),P===0?v+=A:P<m&&(v+=2*A)}for(let P=0;P<f.length;P++)f[P]=f[P]/v;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:y}=this;u.dTheta.value=_,u.mipInt.value=y-n;const E=this._sizeLods[r],w=3*E*(r>y-Vn?r-y+Vn:0),T=4*(this._cubeSize-E);Ti(t,w,T,3*E,2*E),c.setRenderTarget(t),c.render(h,Gi)}}function Ih(i){const e=[],t=[],n=[];let r=i;const s=i-Vn+1+Bo.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>i-Vn?c=Bo[a-i+Vn-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,_=6,S=3,m=2,f=1,v=new Float32Array(S*_*p),y=new Float32Array(m*_*p),E=new Float32Array(f*_*p);for(let T=0;T<p;T++){const P=T%3*2/3-1,x=T>2?0:-1,A=[P,x,0,P+2/3,x,0,P+2/3,x+1,0,P,x,0,P+2/3,x+1,0,P,x+1,0];v.set(A,S*_*T),y.set(u,m*_*T);const D=[T,T,T,T,T,T];E.set(D,f*_*T)}const w=new Xt;w.setAttribute("position",new mn(v,S)),w.setAttribute("uv",new mn(y,m)),w.setAttribute("faceIndex",new mn(E,f)),n.push(new nn(w,null)),r>Vn&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Go(i,e,t){const n=new pn(i,e,t);return n.texture.mapping=Xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ti(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Uh(i,e,t){return new _n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Lh,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$r(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Nh(i,e,t){const n=new Float32Array(Jn),r=new F(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:Jn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:$r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Vo(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Ho(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function $r(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class zl extends pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Il(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Qi(5,5,5),s=new _n({name:"CubemapFromEquirect",uniforms:Di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zt,blending:wn});s.uniforms.tEquirect.value=t;const a=new nn(r,s),o=t.minFilter;return t.minFilter===Qn&&(t.minFilter=It),new ku(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function Fh(i){let e=new WeakMap,t=new WeakMap,n=null;function r(u,p=!1){return u==null?null:p?a(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===Jr||p===Qr)if(e.has(u)){const _=e.get(u).texture;return o(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const S=new zl(_.height);return S.fromEquirectangularTexture(i,u),e.set(u,S),u.addEventListener("dispose",l),o(S.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,_=p===Jr||p===Qr,S=p===si||p===Pi;if(_||S){let m=t.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new zo(i)),m=_?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const v=u.image;return _&&v&&v.height>0||S&&v&&c(v)?(n===null&&(n=new zo(i)),m=_?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,p){return p===Jr?u.mapping=si:p===Qr&&(u.mapping=Pi),u}function c(u){let p=0;const _=6;for(let S=0;S<_;S++)u[S]!==void 0&&p++;return p===_}function l(u){const p=u.target;p.removeEventListener("dispose",l);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:h}}function Oh(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Sa("WebGLRenderer: "+n+" extension not supported."),r}}}function Bh(i,e,t,n){const r={},s=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",a),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function c(h){const u=h.attributes;for(const p in u)e.update(u[p],i.ARRAY_BUFFER)}function l(h){const u=[],p=h.index,_=h.attributes.position;let S=0;if(_===void 0)return;if(p!==null){const v=p.array;S=p.version;for(let y=0,E=v.length;y<E;y+=3){const w=v[y+0],T=v[y+1],P=v[y+2];u.push(w,T,T,P,P,w)}}else{const v=_.array;S=_.version;for(let y=0,E=v.length/3-1;y<E;y+=3){const w=y+0,T=y+1,P=y+2;u.push(w,T,T,P,P,w)}}const m=new(_.count>=65535?Pl:Cl)(u,1);m.version=S;const f=s.get(h);f&&e.remove(f),s.set(h,m)}function d(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function kh(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,u){i.drawElements(n,u,s,h*a),t.update(u,n,1)}function l(h,u,p){p!==0&&(i.drawElementsInstanced(n,u,s,h*a,p),t.update(u,n,p))}function d(h,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,h,0,p);let S=0;for(let m=0;m<p;m++)S+=u[m];t.update(S,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function zh(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Gh(i,e,t){const n=new WeakMap,r=new vt;function s(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=n.get(o);if(u===void 0||u.count!==h){let A=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let y=0;p===!0&&(y=1),_===!0&&(y=2),S===!0&&(y=3);let E=o.attributes.position.count*y,w=1;E>e.maxTextureSize&&(w=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const T=new Float32Array(E*w*4*h),P=new wl(T,E,w,h);P.type=dn,P.needsUpdate=!0;const x=y*4;for(let D=0;D<h;D++){const C=m[D],B=f[D],q=v[D],W=E*w*4*D;for(let R=0;R<C.count;R++){const k=R*x;p===!0&&(r.fromBufferAttribute(C,R),T[W+k+0]=r.x,T[W+k+1]=r.y,T[W+k+2]=r.z,T[W+k+3]=0),_===!0&&(r.fromBufferAttribute(B,R),T[W+k+4]=r.x,T[W+k+5]=r.y,T[W+k+6]=r.z,T[W+k+7]=0),S===!0&&(r.fromBufferAttribute(q,R),T[W+k+8]=r.x,T[W+k+9]=r.y,T[W+k+10]=r.z,T[W+k+11]=q.itemSize===4?r.w:1)}}u={count:h,texture:P,size:new it(E,w)},n.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let S=0;S<l.length;S++)p+=l[S];const _=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:s}}function Vh(i,e,t,n,r){let s=new WeakMap;function a(l){const d=r.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==d&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,d))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==d&&(p.update(),s.set(p,d))}return u}function o(){s=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const Hh={[dl]:"LINEAR_TONE_MAPPING",[fl]:"REINHARD_TONE_MAPPING",[hl]:"CINEON_TONE_MAPPING",[pl]:"ACES_FILMIC_TONE_MAPPING",[gl]:"AGX_TONE_MAPPING",[_l]:"NEUTRAL_TONE_MAPPING",[ml]:"CUSTOM_TONE_MAPPING"};function Wh(i,e,t,n,r){const s=new pn(e,t,{type:i,depthBuffer:n,stencilBuffer:r,depthTexture:n?new Li(e,t):void 0}),a=new pn(e,t,{type:Cn,depthBuffer:!1,stencilBuffer:!1}),o=new Xt;o.setAttribute("position",new At([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new At([0,2,0,0,2,0],2));const c=new Fu({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new nn(o,c),d=new Ol(-1,1,1,-1,0,1);let h=null,u=null,p=!1,_,S=null,m=[],f=!1;this.setSize=function(v,y){s.setSize(v,y),a.setSize(v,y);for(let E=0;E<m.length;E++){const w=m[E];w.setSize&&w.setSize(v,y)}},this.setEffects=function(v){m=v,f=m.length>0&&m[0].isRenderPass===!0;const y=s.width,E=s.height;for(let w=0;w<m.length;w++){const T=m[w];T.setSize&&T.setSize(y,E)}},this.begin=function(v,y){if(p||v.toneMapping===hn&&m.length===0)return!1;if(S=y,y!==null){const E=y.width,w=y.height;(s.width!==E||s.height!==w)&&this.setSize(E,w)}return f===!1&&v.setRenderTarget(s),_=v.toneMapping,v.toneMapping=hn,!0},this.hasRenderPass=function(){return f},this.end=function(v,y){v.toneMapping=_,p=!0;let E=s,w=a;for(let T=0;T<m.length;T++){const P=m[T];if(P.enabled!==!1&&(P.render(v,w,E,y),P.needsSwap!==!1)){const x=E;E=w,w=x}}if(h!==v.outputColorSpace||u!==v.toneMapping){h=v.outputColorSpace,u=v.toneMapping,c.defines={},je.getTransfer(h)===st&&(c.defines.SRGB_TRANSFER="");const T=Hh[u];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=E.texture,v.setRenderTarget(S),v.render(l,d),S=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Gl=new Nt,ba=new Li(1,1),Vl=new wl,Hl=new du,Wl=new Il,Wo=[],Xo=[],qo=new Float32Array(16),Yo=new Float32Array(9),$o=new Float32Array(4);function Ui(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Wo[r];if(s===void 0&&(s=new Float32Array(r),Wo[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function bt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function jr(i,e){let t=Xo[e];t===void 0&&(t=new Int32Array(e),Xo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Xh(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function qh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),bt(t,e)}}function Yh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),bt(t,e)}}function $h(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),bt(t,e)}}function jh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(Et(t,n))return;$o.set(n),i.uniformMatrix2fv(this.addr,!1,$o),bt(t,n)}}function Kh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(Et(t,n))return;Yo.set(n),i.uniformMatrix3fv(this.addr,!1,Yo),bt(t,n)}}function Zh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(Et(t,n))return;qo.set(n),i.uniformMatrix4fv(this.addr,!1,qo),bt(t,n)}}function Jh(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Qh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),bt(t,e)}}function ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),bt(t,e)}}function tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),bt(t,e)}}function np(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),bt(t,e)}}function rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),bt(t,e)}}function sp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),bt(t,e)}}function ap(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(ba.compareFunction=t.isReversedDepthBuffer()?Ua:Ia,s=ba):s=Gl,t.setTexture2D(e||s,r)}function op(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Hl,r)}function lp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Wl,r)}function cp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Vl,r)}function up(i){switch(i){case 5126:return Xh;case 35664:return qh;case 35665:return Yh;case 35666:return $h;case 35674:return jh;case 35675:return Kh;case 35676:return Zh;case 5124:case 35670:return Jh;case 35667:case 35671:return Qh;case 35668:case 35672:return ep;case 35669:case 35673:return tp;case 5125:return np;case 36294:return ip;case 36295:return rp;case 36296:return sp;case 35678:case 36198:case 36298:case 36306:case 35682:return ap;case 35679:case 36299:case 36307:return op;case 35680:case 36300:case 36308:case 36293:return lp;case 36289:case 36303:case 36311:case 36292:return cp}}function dp(i,e){i.uniform1fv(this.addr,e)}function fp(i,e){const t=Ui(e,this.size,2);i.uniform2fv(this.addr,t)}function hp(i,e){const t=Ui(e,this.size,3);i.uniform3fv(this.addr,t)}function pp(i,e){const t=Ui(e,this.size,4);i.uniform4fv(this.addr,t)}function mp(i,e){const t=Ui(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function gp(i,e){const t=Ui(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function _p(i,e){const t=Ui(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function xp(i,e){i.uniform1iv(this.addr,e)}function vp(i,e){i.uniform2iv(this.addr,e)}function Mp(i,e){i.uniform3iv(this.addr,e)}function Sp(i,e){i.uniform4iv(this.addr,e)}function yp(i,e){i.uniform1uiv(this.addr,e)}function Ep(i,e){i.uniform2uiv(this.addr,e)}function bp(i,e){i.uniform3uiv(this.addr,e)}function Tp(i,e){i.uniform4uiv(this.addr,e)}function Ap(i,e,t){const n=this.cache,r=e.length,s=jr(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),bt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=ba:a=Gl;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function wp(i,e,t){const n=this.cache,r=e.length,s=jr(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),bt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Hl,s[a])}function Rp(i,e,t){const n=this.cache,r=e.length,s=jr(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),bt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Wl,s[a])}function Cp(i,e,t){const n=this.cache,r=e.length,s=jr(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),bt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Vl,s[a])}function Pp(i){switch(i){case 5126:return dp;case 35664:return fp;case 35665:return hp;case 35666:return pp;case 35674:return mp;case 35675:return gp;case 35676:return _p;case 5124:case 35670:return xp;case 35667:case 35671:return vp;case 35668:case 35672:return Mp;case 35669:case 35673:return Sp;case 5125:return yp;case 36294:return Ep;case 36295:return bp;case 36296:return Tp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ap;case 35679:case 36299:case 36307:return wp;case 35680:case 36300:case 36308:case 36293:return Rp;case 36289:case 36303:case 36311:case 36292:return Cp}}class Lp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=up(t.type)}}class Dp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Pp(t.type)}}class Ip{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Ps=/(\w+)(\])?(\[|\.)?/g;function jo(i,e){i.seq.push(e),i.map[e.id]=e}function Up(i,e,t){const n=i.name,r=n.length;for(Ps.lastIndex=0;;){const s=Ps.exec(n),a=Ps.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){jo(t,l===void 0?new Lp(o,i,e):new Dp(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new Ip(o),jo(t,h)),t=h}}}class Lr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Up(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Ko(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Np=37297;let Fp=0;function Op(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Zo=new Fe;function Bp(i){je._getMatrix(Zo,je.workingColorSpace,i);const e=`mat3( ${Zo.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(i)){case Fr:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Jo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Op(i.getShaderSource(e),o)}else return s}function kp(i,e){const t=Bp(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const zp={[dl]:"Linear",[fl]:"Reinhard",[hl]:"Cineon",[pl]:"ACESFilmic",[gl]:"AgX",[_l]:"Neutral",[ml]:"Custom"};function Gp(i,e){const t=zp[e];return t===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Tr=new F;function Vp(){je.getLuminanceCoefficients(Tr);const i=Tr.x.toFixed(4),e=Tr.y.toFixed(4),t=Tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Hp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qi).join(`
`)}function Wp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function qi(i){return i!==""}function Qo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function el(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const qp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ta(i){return i.replace(qp,$p)}const Yp=new Map;function $p(i,e){let t=He[e];if(t===void 0){const n=Yp.get(e);if(n!==void 0)t=He[n],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ta(t)}const jp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tl(i){return i.replace(jp,Kp)}function Kp(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function nl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Zp={[Ar]:"SHADOWMAP_TYPE_PCF",[Wi]:"SHADOWMAP_TYPE_VSM"};function Jp(i){return Zp[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Qp={[si]:"ENVMAP_TYPE_CUBE",[Pi]:"ENVMAP_TYPE_CUBE",[Xr]:"ENVMAP_TYPE_CUBE_UV"};function em(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Qp[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const tm={[Pi]:"ENVMAP_MODE_REFRACTION"};function nm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":tm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const im={[ul]:"ENVMAP_BLENDING_MULTIPLY",[Wc]:"ENVMAP_BLENDING_MIX",[Xc]:"ENVMAP_BLENDING_ADD"};function rm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":im[i.combine]||"ENVMAP_BLENDING_NONE"}function sm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function am(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Jp(t),l=em(t),d=nm(t),h=rm(t),u=sm(t),p=Hp(t),_=Wp(s),S=r.createProgram();let m,f,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(qi).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(qi).join(`
`),f.length>0&&(f+=`
`)):(m=[nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qi).join(`
`),f=[nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hn?"#define TONE_MAPPING":"",t.toneMapping!==hn?He.tonemapping_pars_fragment:"",t.toneMapping!==hn?Gp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,kp("linearToOutputTexel",t.outputColorSpace),Vp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qi).join(`
`)),a=Ta(a),a=Qo(a,t),a=el(a,t),o=Ta(o),o=Qo(o,t),o=el(o,t),a=tl(a),o=tl(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===co?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===co?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=v+m+a,E=v+f+o,w=Ko(r,r.VERTEX_SHADER,y),T=Ko(r,r.FRAGMENT_SHADER,E);r.attachShader(S,w),r.attachShader(S,T),t.index0AttributeName!==void 0?r.bindAttribLocation(S,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function P(C){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(S)||"",q=r.getShaderInfoLog(w)||"",W=r.getShaderInfoLog(T)||"",R=B.trim(),k=q.trim(),V=W.trim();let Z=!0,Q=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,S,w,T);else{const J=Jo(r,w,"vertex"),ue=Jo(r,T,"fragment");Je("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+R+`
`+J+`
`+ue)}else R!==""?Le("WebGLProgram: Program Info Log:",R):(k===""||V==="")&&(Q=!1);Q&&(C.diagnostics={runnable:Z,programLog:R,vertexShader:{log:k,prefix:m},fragmentShader:{log:V,prefix:f}})}r.deleteShader(w),r.deleteShader(T),x=new Lr(r,S),A=Xp(r,S)}let x;this.getUniforms=function(){return x===void 0&&P(this),x};let A;this.getAttributes=function(){return A===void 0&&P(this),A};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(S,Np)),D},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fp++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=w,this.fragmentShader=T,this}let om=0;class lm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new cm(e),t.set(e,n)),n}}class cm{constructor(e){this.id=om++,this.code=e,this.usedTimes=0}}function um(i){return i===ai||i===Ir||i===Ur}function dm(i,e,t,n,r,s){const a=new Fa,o=new lm,c=new Set,l=[],d=new Map,h=n.logarithmicDepthBuffer;let u=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function S(x,A,D,C,B,q){const W=C.fog,R=B.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Z=e.get(x.envMap||k,V),Q=Z&&Z.mapping===Xr?Z.image.height:null,J=p[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Le("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const ue=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,ge=ue!==void 0?ue.length:0;let Oe=0;R.morphAttributes.position!==void 0&&(Oe=1),R.morphAttributes.normal!==void 0&&(Oe=2),R.morphAttributes.color!==void 0&&(Oe=3);let Se,Ee,Y,ae;if(J){const Be=cn[J];Se=Be.vertexShader,Ee=Be.fragmentShader}else Se=x.vertexShader,Ee=x.fragmentShader,o.update(x),Y=o.getVertexShaderID(x),ae=o.getFragmentShaderID(x);const ne=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),Ue=B.isInstancedMesh===!0,Ce=B.isBatchedMesh===!0,lt=!!x.map,Pe=!!x.matcap,Xe=!!Z,tt=!!x.aoMap,Ie=!!x.lightMap,Ze=!!x.bumpMap,Ve=!!x.normalMap,wt=!!x.displacementMap,I=!!x.emissiveMap,yt=!!x.metalnessMap,qe=!!x.roughnessMap,dt=x.anisotropy>0,de=x.clearcoat>0,ht=x.dispersion>0,b=x.iridescence>0,g=x.sheen>0,O=x.transmission>0,j=dt&&!!x.anisotropyMap,te=de&&!!x.clearcoatMap,ie=de&&!!x.clearcoatNormalMap,ce=de&&!!x.clearcoatRoughnessMap,X=b&&!!x.iridescenceMap,K=b&&!!x.iridescenceThicknessMap,me=g&&!!x.sheenColorMap,ve=g&&!!x.sheenRoughnessMap,oe=!!x.specularMap,re=!!x.specularColorMap,Ne=!!x.specularIntensityMap,ze=O&&!!x.transmissionMap,nt=O&&!!x.thicknessMap,L=!!x.gradientMap,se=!!x.alphaMap,$=x.alphaTest>0,_e=!!x.alphaHash,le=!!x.extensions;let ee=hn;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(ee=i.toneMapping);const be={shaderID:J,shaderType:x.type,shaderName:x.name,vertexShader:Se,fragmentShader:Ee,defines:x.defines,customVertexShaderID:Y,customFragmentShaderID:ae,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:Ce,batchingColor:Ce&&B._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&B.instanceColor!==null,instancingMorph:Ue&&B.morphTexture!==null,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:lt,matcap:Pe,envMap:Xe,envMapMode:Xe&&Z.mapping,envMapCubeUVHeight:Q,aoMap:tt,lightMap:Ie,bumpMap:Ze,normalMap:Ve,displacementMap:wt,emissiveMap:I,normalMapObjectSpace:Ve&&x.normalMapType===$c,normalMapTangentSpace:Ve&&x.normalMapType===ao,packedNormalMap:Ve&&x.normalMapType===ao&&um(x.normalMap.format),metalnessMap:yt,roughnessMap:qe,anisotropy:dt,anisotropyMap:j,clearcoat:de,clearcoatMap:te,clearcoatNormalMap:ie,clearcoatRoughnessMap:ce,dispersion:ht,iridescence:b,iridescenceMap:X,iridescenceThicknessMap:K,sheen:g,sheenColorMap:me,sheenRoughnessMap:ve,specularMap:oe,specularColorMap:re,specularIntensityMap:Ne,transmission:O,transmissionMap:ze,thicknessMap:nt,gradientMap:L,opaque:x.transparent===!1&&x.blending===wi&&x.alphaToCoverage===!1,alphaMap:se,alphaTest:$,alphaHash:_e,combine:x.combine,mapUv:lt&&_(x.map.channel),aoMapUv:tt&&_(x.aoMap.channel),lightMapUv:Ie&&_(x.lightMap.channel),bumpMapUv:Ze&&_(x.bumpMap.channel),normalMapUv:Ve&&_(x.normalMap.channel),displacementMapUv:wt&&_(x.displacementMap.channel),emissiveMapUv:I&&_(x.emissiveMap.channel),metalnessMapUv:yt&&_(x.metalnessMap.channel),roughnessMapUv:qe&&_(x.roughnessMap.channel),anisotropyMapUv:j&&_(x.anisotropyMap.channel),clearcoatMapUv:te&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:ie&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:K&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:me&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:ve&&_(x.sheenRoughnessMap.channel),specularMapUv:oe&&_(x.specularMap.channel),specularColorMapUv:re&&_(x.specularColorMap.channel),specularIntensityMapUv:Ne&&_(x.specularIntensityMap.channel),transmissionMapUv:ze&&_(x.transmissionMap.channel),thicknessMapUv:nt&&_(x.thicknessMap.channel),alphaMapUv:se&&_(x.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(Ve||dt),vertexNormals:!!R.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!R.attributes.uv&&(lt||se),fog:!!W,useFog:x.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||R.attributes.normal===void 0&&Ve===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:we,skinning:B.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:Oe,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:ee,decodeVideoTexture:lt&&x.map.isVideoTexture===!0&&je.getTransfer(x.map.colorSpace)===st,decodeVideoTextureEmissive:I&&x.emissiveMap.isVideoTexture===!0&&je.getTransfer(x.emissiveMap.colorSpace)===st,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Tn,flipSided:x.side===zt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:le&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&x.extensions.multiDraw===!0||Ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return be.vertexUv1s=c.has(1),be.vertexUv2s=c.has(2),be.vertexUv3s=c.has(3),c.clear(),be}function m(x){const A=[];if(x.shaderID?A.push(x.shaderID):(A.push(x.customVertexShaderID),A.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)A.push(D),A.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(f(A,x),v(A,x),A.push(i.outputColorSpace)),A.push(x.customProgramCacheKey),A.join()}function f(x,A){x.push(A.precision),x.push(A.outputColorSpace),x.push(A.envMapMode),x.push(A.envMapCubeUVHeight),x.push(A.mapUv),x.push(A.alphaMapUv),x.push(A.lightMapUv),x.push(A.aoMapUv),x.push(A.bumpMapUv),x.push(A.normalMapUv),x.push(A.displacementMapUv),x.push(A.emissiveMapUv),x.push(A.metalnessMapUv),x.push(A.roughnessMapUv),x.push(A.anisotropyMapUv),x.push(A.clearcoatMapUv),x.push(A.clearcoatNormalMapUv),x.push(A.clearcoatRoughnessMapUv),x.push(A.iridescenceMapUv),x.push(A.iridescenceThicknessMapUv),x.push(A.sheenColorMapUv),x.push(A.sheenRoughnessMapUv),x.push(A.specularMapUv),x.push(A.specularColorMapUv),x.push(A.specularIntensityMapUv),x.push(A.transmissionMapUv),x.push(A.thicknessMapUv),x.push(A.combine),x.push(A.fogExp2),x.push(A.sizeAttenuation),x.push(A.morphTargetsCount),x.push(A.morphAttributeCount),x.push(A.numDirLights),x.push(A.numPointLights),x.push(A.numSpotLights),x.push(A.numSpotLightMaps),x.push(A.numHemiLights),x.push(A.numRectAreaLights),x.push(A.numDirLightShadows),x.push(A.numPointLightShadows),x.push(A.numSpotLightShadows),x.push(A.numSpotLightShadowsWithMaps),x.push(A.numLightProbes),x.push(A.shadowMapType),x.push(A.toneMapping),x.push(A.numClippingPlanes),x.push(A.numClipIntersection),x.push(A.depthPacking)}function v(x,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),x.push(a.mask)}function y(x){const A=p[x.type];let D;if(A){const C=cn[A];D=Iu.clone(C.uniforms)}else D=x.uniforms;return D}function E(x,A){let D=d.get(A);return D!==void 0?++D.usedTimes:(D=new am(i,A,x,r),l.push(D),d.set(A,D)),D}function w(x){if(--x.usedTimes===0){const A=l.indexOf(x);l[A]=l[l.length-1],l.pop(),d.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function P(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:y,acquireProgram:E,releaseProgram:w,releaseShaderCache:T,programs:l,dispose:P}}function fm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function hm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function il(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function rl(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,_,S,m,f){let v=i[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:_,materialVariant:a(u),groupOrder:S,renderOrder:u.renderOrder,z:m,group:f},i[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=_,v.materialVariant=a(u),v.groupOrder=S,v.renderOrder=u.renderOrder,v.z=m,v.group=f),e++,v}function c(u,p,_,S,m,f){const v=o(u,p,_,S,m,f);_.transmission>0?n.push(v):_.transparent===!0?r.push(v):t.push(v)}function l(u,p,_,S,m,f){const v=o(u,p,_,S,m,f);_.transmission>0?n.unshift(v):_.transparent===!0?r.unshift(v):t.unshift(v)}function d(u,p){t.length>1&&t.sort(u||hm),n.length>1&&n.sort(p||il),r.length>1&&r.sort(p||il)}function h(){for(let u=e,p=i.length;u<p;u++){const _=i[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:h,sort:d}}function pm(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new rl,i.set(n,[a])):r>=s.length?(a=new rl,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function mm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new rt};break;case"SpotLight":t={position:new F,direction:new F,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new rt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":t={color:new rt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function gm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let _m=0;function xm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function vm(i){const e=new mm,t=gm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const r=new F,s=new Mt,a=new Mt;function o(l){let d=0,h=0,u=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let p=0,_=0,S=0,m=0,f=0,v=0,y=0,E=0,w=0,T=0,P=0;l.sort(xm);for(let A=0,D=l.length;A<D;A++){const C=l[A],B=C.color,q=C.intensity,W=C.distance;let R=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===ai?R=C.shadow.map.texture:R=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)d+=B.r*q,h+=B.g*q,u+=B.b*q;else if(C.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(C.sh.coefficients[k],q);P++}else if(C.isDirectionalLight){const k=e.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const V=C.shadow,Z=t.get(C);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,n.directionalShadow[p]=Z,n.directionalShadowMap[p]=R,n.directionalShadowMatrix[p]=C.shadow.matrix,v++}n.directional[p]=k,p++}else if(C.isSpotLight){const k=e.get(C);k.position.setFromMatrixPosition(C.matrixWorld),k.color.copy(B).multiplyScalar(q),k.distance=W,k.coneCos=Math.cos(C.angle),k.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),k.decay=C.decay,n.spot[S]=k;const V=C.shadow;if(C.map&&(n.spotLightMap[w]=C.map,w++,V.updateMatrices(C),C.castShadow&&T++),n.spotLightMatrix[S]=V.matrix,C.castShadow){const Z=t.get(C);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,n.spotShadow[S]=Z,n.spotShadowMap[S]=R,E++}S++}else if(C.isRectAreaLight){const k=e.get(C);k.color.copy(B).multiplyScalar(q),k.halfWidth.set(C.width*.5,0,0),k.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=k,m++}else if(C.isPointLight){const k=e.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),k.distance=C.distance,k.decay=C.decay,C.castShadow){const V=C.shadow,Z=t.get(C);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,Z.shadowCameraNear=V.camera.near,Z.shadowCameraFar=V.camera.far,n.pointShadow[_]=Z,n.pointShadowMap[_]=R,n.pointShadowMatrix[_]=C.shadow.matrix,y++}n.point[_]=k,_++}else if(C.isHemisphereLight){const k=e.get(C);k.skyColor.copy(C.color).multiplyScalar(q),k.groundColor.copy(C.groundColor).multiplyScalar(q),n.hemi[f]=k,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;const x=n.hash;(x.directionalLength!==p||x.pointLength!==_||x.spotLength!==S||x.rectAreaLength!==m||x.hemiLength!==f||x.numDirectionalShadows!==v||x.numPointShadows!==y||x.numSpotShadows!==E||x.numSpotMaps!==w||x.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=S,n.rectArea.length=m,n.point.length=_,n.hemi.length=f,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=E+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,x.directionalLength=p,x.pointLength=_,x.spotLength=S,x.rectAreaLength=m,x.hemiLength=f,x.numDirectionalShadows=v,x.numPointShadows=y,x.numSpotShadows=E,x.numSpotMaps=w,x.numLightProbes=P,n.version=_m++)}function c(l,d){let h=0,u=0,p=0,_=0,S=0;const m=d.matrixWorldInverse;for(let f=0,v=l.length;f<v;f++){const y=l[f];if(y.isDirectionalLight){const E=n.directional[h];E.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),h++}else if(y.isSpotLight){const E=n.spot[p];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),p++}else if(y.isRectAreaLight){const E=n.rectArea[_];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),a.identity(),s.copy(y.matrixWorld),s.premultiply(m),a.extractRotation(s),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const E=n.point[u];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),u++}else if(y.isHemisphereLight){const E=n.hemi[S];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(m),S++}}}return{setup:o,setupView:c,state:n}}function sl(i){const e=new vm(i),t=[],n=[],r=[];function s(u){h.camera=u,t.length=0,n.length=0,r.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function c(u){r.push(u)}function l(){e.setup(t)}function d(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Mm(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new sl(i),e.set(r,[o])):s>=a.length?(o=new sl(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Sm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ym=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Em=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],bm=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],al=new Mt,Vi=new F,Ls=new F;function Tm(i,e,t){let n=new Ll;const r=new it,s=new it,a=new vt,o=new Ou,c=new Bu,l={},d=t.maxTextureSize,h={[Hn]:zt,[zt]:Hn,[Tn]:Tn},u=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:Sm,fragmentShader:ym}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const _=new Xt;_.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new nn(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ar;let f=this.type;this.render=function(T,P,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===Tc&&(Le("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ar);const A=i.getRenderTarget(),D=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),B=i.state;B.setBlending(wn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const q=f!==this.type;q&&P.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(R=>R.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,R=T.length;W<R;W++){const k=T[W],V=k.shadow;if(V===void 0){Le("WebGLShadowMap:",k,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const Z=V.getFrameExtents();r.multiply(Z),s.copy(V.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/Z.x),r.x=s.x*Z.x,V.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/Z.y),r.y=s.y*Z.y,V.mapSize.y=s.y));const Q=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=Q,V.map===null||q===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Wi){if(k.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new pn(r.x,r.y,{format:ai,type:Cn,minFilter:It,magFilter:It,generateMipmaps:!1}),V.map.texture.name=k.name+".shadowMap",V.map.depthTexture=new Li(r.x,r.y,dn),V.map.depthTexture.name=k.name+".shadowMapDepth",V.map.depthTexture.format=Pn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ct,V.map.depthTexture.magFilter=Ct}else k.isPointLight?(V.map=new zl(r.x),V.map.depthTexture=new Lu(r.x,gn)):(V.map=new pn(r.x,r.y),V.map.depthTexture=new Li(r.x,r.y,gn)),V.map.depthTexture.name=k.name+".shadowMap",V.map.depthTexture.format=Pn,this.type===Ar?(V.map.depthTexture.compareFunction=Q?Ua:Ia,V.map.depthTexture.minFilter=It,V.map.depthTexture.magFilter=It):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ct,V.map.depthTexture.magFilter=Ct);V.camera.updateProjectionMatrix()}const J=V.map.isWebGLCubeRenderTarget?6:1;for(let ue=0;ue<J;ue++){if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,ue),i.clear();else{ue===0&&(i.setRenderTarget(V.map),i.clear());const ge=V.getViewport(ue);a.set(s.x*ge.x,s.y*ge.y,s.x*ge.z,s.y*ge.w),B.viewport(a)}if(k.isPointLight){const ge=V.camera,Oe=V.matrix,Se=k.distance||ge.far;Se!==ge.far&&(ge.far=Se,ge.updateProjectionMatrix()),Vi.setFromMatrixPosition(k.matrixWorld),ge.position.copy(Vi),Ls.copy(ge.position),Ls.add(Em[ue]),ge.up.copy(bm[ue]),ge.lookAt(Ls),ge.updateMatrixWorld(),Oe.makeTranslation(-Vi.x,-Vi.y,-Vi.z),al.multiplyMatrices(ge.projectionMatrix,ge.matrixWorldInverse),V._frustum.setFromProjectionMatrix(al,ge.coordinateSystem,ge.reversedDepth)}else V.updateMatrices(k);n=V.getFrustum(),E(P,x,V.camera,k,this.type)}V.isPointLightShadow!==!0&&this.type===Wi&&v(V,x),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(A,D,C)};function v(T,P){const x=e.update(S);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new pn(r.x,r.y,{format:ai,type:Cn})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(P,null,x,u,S,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(P,null,x,p,S,null)}function y(T,P,x,A){let D=null;const C=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)D=C;else if(D=x.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=D.uuid,q=P.uuid;let W=l[B];W===void 0&&(W={},l[B]=W);let R=W[q];R===void 0&&(R=D.clone(),W[q]=R,P.addEventListener("dispose",w)),D=R}if(D.visible=P.visible,D.wireframe=P.wireframe,A===Wi?D.side=P.shadowSide!==null?P.shadowSide:P.side:D.side=P.shadowSide!==null?P.shadowSide:h[P.side],D.alphaMap=P.alphaMap,D.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,D.map=P.map,D.clipShadows=P.clipShadows,D.clippingPlanes=P.clippingPlanes,D.clipIntersection=P.clipIntersection,D.displacementMap=P.displacementMap,D.displacementScale=P.displacementScale,D.displacementBias=P.displacementBias,D.wireframeLinewidth=P.wireframeLinewidth,D.linewidth=P.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const B=i.properties.get(D);B.light=x}return D}function E(T,P,x,A,D){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===Wi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);const q=e.update(T),W=T.material;if(Array.isArray(W)){const R=q.groups;for(let k=0,V=R.length;k<V;k++){const Z=R[k],Q=W[Z.materialIndex];if(Q&&Q.visible){const J=y(T,Q,A,D);T.onBeforeShadow(i,T,P,x,q,J,Z),i.renderBufferDirect(x,null,q,J,T,Z),T.onAfterShadow(i,T,P,x,q,J,Z)}}}else if(W.visible){const R=y(T,W,A,D);T.onBeforeShadow(i,T,P,x,q,R,null),i.renderBufferDirect(x,null,q,R,T,null),T.onAfterShadow(i,T,P,x,q,R,null)}}const B=T.children;for(let q=0,W=B.length;q<W;q++)E(B[q],P,x,A,D)}function w(T){T.target.removeEventListener("dispose",w);for(const x in l){const A=l[x],D=T.target.uuid;D in A&&(A[D].dispose(),delete A[D])}}}function Am(i,e){function t(){let L=!1;const se=new vt;let $=null;const _e=new vt(0,0,0,0);return{setMask:function(le){$!==le&&!L&&(i.colorMask(le,le,le,le),$=le)},setLocked:function(le){L=le},setClear:function(le,ee,be,Be,mt){mt===!0&&(le*=Be,ee*=Be,be*=Be),se.set(le,ee,be,Be),_e.equals(se)===!1&&(i.clearColor(le,ee,be,Be),_e.copy(se))},reset:function(){L=!1,$=null,_e.set(-1,0,0,0)}}}function n(){let L=!1,se=!1,$=null,_e=null,le=null;return{setReversed:function(ee){if(se!==ee){const be=e.get("EXT_clip_control");ee?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),se=ee;const Be=le;le=null,this.setClear(Be)}},getReversed:function(){return se},setTest:function(ee){ee?ne(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(ee){$!==ee&&!L&&(i.depthMask(ee),$=ee)},setFunc:function(ee){if(se&&(ee=ru[ee]),_e!==ee){switch(ee){case Fs:i.depthFunc(i.NEVER);break;case Os:i.depthFunc(i.ALWAYS);break;case Bs:i.depthFunc(i.LESS);break;case Ci:i.depthFunc(i.LEQUAL);break;case ks:i.depthFunc(i.EQUAL);break;case zs:i.depthFunc(i.GEQUAL);break;case Gs:i.depthFunc(i.GREATER);break;case Vs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_e=ee}},setLocked:function(ee){L=ee},setClear:function(ee){le!==ee&&(le=ee,se&&(ee=1-ee),i.clearDepth(ee))},reset:function(){L=!1,$=null,_e=null,le=null,se=!1}}}function r(){let L=!1,se=null,$=null,_e=null,le=null,ee=null,be=null,Be=null,mt=null;return{setTest:function(at){L||(at?ne(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(at){se!==at&&!L&&(i.stencilMask(at),se=at)},setFunc:function(at,vn,sn){($!==at||_e!==vn||le!==sn)&&(i.stencilFunc(at,vn,sn),$=at,_e=vn,le=sn)},setOp:function(at,vn,sn){(ee!==at||be!==vn||Be!==sn)&&(i.stencilOp(at,vn,sn),ee=at,be=vn,Be=sn)},setLocked:function(at){L=at},setClear:function(at){mt!==at&&(i.clearStencil(at),mt=at)},reset:function(){L=!1,se=null,$=null,_e=null,le=null,ee=null,be=null,Be=null,mt=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let d={},h={},u={},p=new WeakMap,_=[],S=null,m=!1,f=null,v=null,y=null,E=null,w=null,T=null,P=null,x=new rt(0,0,0),A=0,D=!1,C=null,B=null,q=null,W=null,R=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Z=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(Q)[1]),V=Z>=1):Q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),V=Z>=2);let J=null,ue={};const ge=i.getParameter(i.SCISSOR_BOX),Oe=i.getParameter(i.VIEWPORT),Se=new vt().fromArray(ge),Ee=new vt().fromArray(Oe);function Y(L,se,$,_e){const le=new Uint8Array(4),ee=i.createTexture();i.bindTexture(L,ee),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let be=0;be<$;be++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,_e,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(se+be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return ee}const ae={};ae[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),ae[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ae[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(i.DEPTH_TEST),a.setFunc(Ci),Ze(!1),Ve(io),ne(i.CULL_FACE),tt(wn);function ne(L){d[L]!==!0&&(i.enable(L),d[L]=!0)}function we(L){d[L]!==!1&&(i.disable(L),d[L]=!1)}function Ue(L,se){return u[L]!==se?(i.bindFramebuffer(L,se),u[L]=se,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Ce(L,se){let $=_,_e=!1;if(L){$=p.get(se),$===void 0&&($=[],p.set(se,$));const le=L.textures;if($.length!==le.length||$[0]!==i.COLOR_ATTACHMENT0){for(let ee=0,be=le.length;ee<be;ee++)$[ee]=i.COLOR_ATTACHMENT0+ee;$.length=le.length,_e=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,_e=!0);_e&&i.drawBuffers($)}function lt(L){return S!==L?(i.useProgram(L),S=L,!0):!1}const Pe={[Zn]:i.FUNC_ADD,[wc]:i.FUNC_SUBTRACT,[Rc]:i.FUNC_REVERSE_SUBTRACT};Pe[Cc]=i.MIN,Pe[Pc]=i.MAX;const Xe={[Lc]:i.ZERO,[Dc]:i.ONE,[Ic]:i.SRC_COLOR,[Us]:i.SRC_ALPHA,[kc]:i.SRC_ALPHA_SATURATE,[Oc]:i.DST_COLOR,[Nc]:i.DST_ALPHA,[Uc]:i.ONE_MINUS_SRC_COLOR,[Ns]:i.ONE_MINUS_SRC_ALPHA,[Bc]:i.ONE_MINUS_DST_COLOR,[Fc]:i.ONE_MINUS_DST_ALPHA,[zc]:i.CONSTANT_COLOR,[Gc]:i.ONE_MINUS_CONSTANT_COLOR,[Vc]:i.CONSTANT_ALPHA,[Hc]:i.ONE_MINUS_CONSTANT_ALPHA};function tt(L,se,$,_e,le,ee,be,Be,mt,at){if(L===wn){m===!0&&(we(i.BLEND),m=!1);return}if(m===!1&&(ne(i.BLEND),m=!0),L!==Ac){if(L!==f||at!==D){if((v!==Zn||w!==Zn)&&(i.blendEquation(i.FUNC_ADD),v=Zn,w=Zn),at)switch(L){case wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Is:i.blendFunc(i.ONE,i.ONE);break;case ro:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case so:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Je("WebGLState: Invalid blending: ",L);break}else switch(L){case wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ro:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case so:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",L);break}y=null,E=null,T=null,P=null,x.set(0,0,0),A=0,f=L,D=at}return}le=le||se,ee=ee||$,be=be||_e,(se!==v||le!==w)&&(i.blendEquationSeparate(Pe[se],Pe[le]),v=se,w=le),($!==y||_e!==E||ee!==T||be!==P)&&(i.blendFuncSeparate(Xe[$],Xe[_e],Xe[ee],Xe[be]),y=$,E=_e,T=ee,P=be),(Be.equals(x)===!1||mt!==A)&&(i.blendColor(Be.r,Be.g,Be.b,mt),x.copy(Be),A=mt),f=L,D=!1}function Ie(L,se){L.side===Tn?we(i.CULL_FACE):ne(i.CULL_FACE);let $=L.side===zt;se&&($=!$),Ze($),L.blending===wi&&L.transparent===!1?tt(wn):tt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const _e=L.stencilWrite;o.setTest(_e),_e&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),I(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(L){C!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),C=L)}function Ve(L){L!==Ec?(ne(i.CULL_FACE),L!==B&&(L===io?i.cullFace(i.BACK):L===bc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),B=L}function wt(L){L!==q&&(V&&i.lineWidth(L),q=L)}function I(L,se,$){L?(ne(i.POLYGON_OFFSET_FILL),(W!==se||R!==$)&&(W=se,R=$,a.getReversed()&&(se=-se),i.polygonOffset(se,$))):we(i.POLYGON_OFFSET_FILL)}function yt(L){L?ne(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function qe(L){L===void 0&&(L=i.TEXTURE0+k-1),J!==L&&(i.activeTexture(L),J=L)}function dt(L,se,$){$===void 0&&(J===null?$=i.TEXTURE0+k-1:$=J);let _e=ue[$];_e===void 0&&(_e={type:void 0,texture:void 0},ue[$]=_e),(_e.type!==L||_e.texture!==se)&&(J!==$&&(i.activeTexture($),J=$),i.bindTexture(L,se||ae[L]),_e.type=L,_e.texture=se)}function de(){const L=ue[J];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ht(){try{i.compressedTexImage2D(...arguments)}catch(L){Je("WebGLState:",L)}}function b(){try{i.compressedTexImage3D(...arguments)}catch(L){Je("WebGLState:",L)}}function g(){try{i.texSubImage2D(...arguments)}catch(L){Je("WebGLState:",L)}}function O(){try{i.texSubImage3D(...arguments)}catch(L){Je("WebGLState:",L)}}function j(){try{i.compressedTexSubImage2D(...arguments)}catch(L){Je("WebGLState:",L)}}function te(){try{i.compressedTexSubImage3D(...arguments)}catch(L){Je("WebGLState:",L)}}function ie(){try{i.texStorage2D(...arguments)}catch(L){Je("WebGLState:",L)}}function ce(){try{i.texStorage3D(...arguments)}catch(L){Je("WebGLState:",L)}}function X(){try{i.texImage2D(...arguments)}catch(L){Je("WebGLState:",L)}}function K(){try{i.texImage3D(...arguments)}catch(L){Je("WebGLState:",L)}}function me(L){return h[L]!==void 0?h[L]:i.getParameter(L)}function ve(L,se){h[L]!==se&&(i.pixelStorei(L,se),h[L]=se)}function oe(L){Se.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Se.copy(L))}function re(L){Ee.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Ee.copy(L))}function Ne(L,se){let $=l.get(se);$===void 0&&($=new WeakMap,l.set(se,$));let _e=$.get(L);_e===void 0&&(_e=i.getUniformBlockIndex(se,L.name),$.set(L,_e))}function ze(L,se){const _e=l.get(se).get(L);c.get(se)!==_e&&(i.uniformBlockBinding(se,_e,L.__bindingPointIndex),c.set(se,_e))}function nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},h={},J=null,ue={},u={},p=new WeakMap,_=[],S=null,m=!1,f=null,v=null,y=null,E=null,w=null,T=null,P=null,x=new rt(0,0,0),A=0,D=!1,C=null,B=null,q=null,W=null,R=null,Se.set(0,0,i.canvas.width,i.canvas.height),Ee.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:we,bindFramebuffer:Ue,drawBuffers:Ce,useProgram:lt,setBlending:tt,setMaterial:Ie,setFlipSided:Ze,setCullFace:Ve,setLineWidth:wt,setPolygonOffset:I,setScissorTest:yt,activeTexture:qe,bindTexture:dt,unbindTexture:de,compressedTexImage2D:ht,compressedTexImage3D:b,texImage2D:X,texImage3D:K,pixelStorei:ve,getParameter:me,updateUBOMapping:Ne,uniformBlockBinding:ze,texStorage2D:ie,texStorage3D:ce,texSubImage2D:g,texSubImage3D:O,compressedTexSubImage2D:j,compressedTexSubImage3D:te,scissor:oe,viewport:re,reset:nt}}function wm(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new it,d=new WeakMap,h=new Set;let u;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(b,g){return _?new OffscreenCanvas(b,g):Br("canvas")}function m(b,g,O){let j=1;const te=ht(b);if((te.width>O||te.height>O)&&(j=O/Math.max(te.width,te.height)),j<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const ie=Math.floor(j*te.width),ce=Math.floor(j*te.height);u===void 0&&(u=S(ie,ce));const X=g?S(ie,ce):u;return X.width=ie,X.height=ce,X.getContext("2d").drawImage(b,0,0,ie,ce),Le("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ie+"x"+ce+")."),X}else return"data"in b&&Le("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),b;return b}function f(b){return b.generateMipmaps}function v(b){i.generateMipmap(b)}function y(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(b,g,O,j,te,ie=!1){if(b!==null){if(i[b]!==void 0)return i[b];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ce;j&&(ce=e.get("EXT_texture_norm16"),ce||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=g;if(g===i.RED&&(O===i.FLOAT&&(X=i.R32F),O===i.HALF_FLOAT&&(X=i.R16F),O===i.UNSIGNED_BYTE&&(X=i.R8),O===i.UNSIGNED_SHORT&&ce&&(X=ce.R16_EXT),O===i.SHORT&&ce&&(X=ce.R16_SNORM_EXT)),g===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.R8UI),O===i.UNSIGNED_SHORT&&(X=i.R16UI),O===i.UNSIGNED_INT&&(X=i.R32UI),O===i.BYTE&&(X=i.R8I),O===i.SHORT&&(X=i.R16I),O===i.INT&&(X=i.R32I)),g===i.RG&&(O===i.FLOAT&&(X=i.RG32F),O===i.HALF_FLOAT&&(X=i.RG16F),O===i.UNSIGNED_BYTE&&(X=i.RG8),O===i.UNSIGNED_SHORT&&ce&&(X=ce.RG16_EXT),O===i.SHORT&&ce&&(X=ce.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RG8UI),O===i.UNSIGNED_SHORT&&(X=i.RG16UI),O===i.UNSIGNED_INT&&(X=i.RG32UI),O===i.BYTE&&(X=i.RG8I),O===i.SHORT&&(X=i.RG16I),O===i.INT&&(X=i.RG32I)),g===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGB8UI),O===i.UNSIGNED_SHORT&&(X=i.RGB16UI),O===i.UNSIGNED_INT&&(X=i.RGB32UI),O===i.BYTE&&(X=i.RGB8I),O===i.SHORT&&(X=i.RGB16I),O===i.INT&&(X=i.RGB32I)),g===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),O===i.UNSIGNED_INT&&(X=i.RGBA32UI),O===i.BYTE&&(X=i.RGBA8I),O===i.SHORT&&(X=i.RGBA16I),O===i.INT&&(X=i.RGBA32I)),g===i.RGB&&(O===i.UNSIGNED_SHORT&&ce&&(X=ce.RGB16_EXT),O===i.SHORT&&ce&&(X=ce.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),g===i.RGBA){const K=ie?Fr:je.getTransfer(te);O===i.FLOAT&&(X=i.RGBA32F),O===i.HALF_FLOAT&&(X=i.RGBA16F),O===i.UNSIGNED_BYTE&&(X=K===st?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&ce&&(X=ce.RGBA16_EXT),O===i.SHORT&&ce&&(X=ce.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function w(b,g){let O;return b?g===null||g===gn||g===ji?O=i.DEPTH24_STENCIL8:g===dn?O=i.DEPTH32F_STENCIL8:g===$i&&(O=i.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===gn||g===ji?O=i.DEPTH_COMPONENT24:g===dn?O=i.DEPTH_COMPONENT32F:g===$i&&(O=i.DEPTH_COMPONENT16),O}function T(b,g){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ct&&b.minFilter!==It?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function P(b){const g=b.target;g.removeEventListener("dispose",P),A(g),g.isVideoTexture&&d.delete(g),g.isHTMLTexture&&h.delete(g)}function x(b){const g=b.target;g.removeEventListener("dispose",x),C(g)}function A(b){const g=n.get(b);if(g.__webglInit===void 0)return;const O=b.source,j=p.get(O);if(j){const te=j[g.__cacheKey];te.usedTimes--,te.usedTimes===0&&D(b),Object.keys(j).length===0&&p.delete(O)}n.remove(b)}function D(b){const g=n.get(b);i.deleteTexture(g.__webglTexture);const O=b.source,j=p.get(O);delete j[g.__cacheKey],a.memory.textures--}function C(b){const g=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(g.__webglFramebuffer[j]))for(let te=0;te<g.__webglFramebuffer[j].length;te++)i.deleteFramebuffer(g.__webglFramebuffer[j][te]);else i.deleteFramebuffer(g.__webglFramebuffer[j]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[j])}else{if(Array.isArray(g.__webglFramebuffer))for(let j=0;j<g.__webglFramebuffer.length;j++)i.deleteFramebuffer(g.__webglFramebuffer[j]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let j=0;j<g.__webglColorRenderbuffer.length;j++)g.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[j]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const O=b.textures;for(let j=0,te=O.length;j<te;j++){const ie=n.get(O[j]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),a.memory.textures--),n.remove(O[j])}n.remove(b)}let B=0;function q(){B=0}function W(){return B}function R(b){B=b}function k(){const b=B;return b>=r.maxTextures&&Le("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),B+=1,b}function V(b){const g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.colorSpace),g.join()}function Z(b,g){const O=n.get(b);if(b.isVideoTexture&&dt(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&O.__version!==b.version){const j=b.image;if(j===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{we(O,b,g);return}}else b.isExternalTexture&&(O.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+g)}function Q(b,g){const O=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){we(O,b,g);return}else b.isExternalTexture&&(O.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+g)}function J(b,g){const O=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){we(O,b,g);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+g)}function ue(b,g){const O=n.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&O.__version!==b.version){Ue(O,b,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+g)}const ge={[Hs]:i.REPEAT,[An]:i.CLAMP_TO_EDGE,[Ws]:i.MIRRORED_REPEAT},Oe={[Ct]:i.NEAREST,[qc]:i.NEAREST_MIPMAP_NEAREST,[nr]:i.NEAREST_MIPMAP_LINEAR,[It]:i.LINEAR,[es]:i.LINEAR_MIPMAP_NEAREST,[Qn]:i.LINEAR_MIPMAP_LINEAR},Se={[jc]:i.NEVER,[eu]:i.ALWAYS,[Kc]:i.LESS,[Ia]:i.LEQUAL,[Zc]:i.EQUAL,[Ua]:i.GEQUAL,[Jc]:i.GREATER,[Qc]:i.NOTEQUAL};function Ee(b,g){if(g.type===dn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===It||g.magFilter===es||g.magFilter===nr||g.magFilter===Qn||g.minFilter===It||g.minFilter===es||g.minFilter===nr||g.minFilter===Qn)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,ge[g.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,ge[g.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,ge[g.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,Oe[g.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,Oe[g.minFilter]),g.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,Se[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ct||g.minFilter!==nr&&g.minFilter!==Qn||g.type===dn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Y(b,g){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",P));const j=g.source;let te=p.get(j);te===void 0&&(te={},p.set(j,te));const ie=V(g);if(ie!==b.__cacheKey){te[ie]===void 0&&(te[ie]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),te[ie].usedTimes++;const ce=te[b.__cacheKey];ce!==void 0&&(te[b.__cacheKey].usedTimes--,ce.usedTimes===0&&D(g)),b.__cacheKey=ie,b.__webglTexture=te[ie].texture}return O}function ae(b,g,O){return Math.floor(Math.floor(b/O)/g)}function ne(b,g,O,j){const ie=b.updateRanges;if(ie.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,O,j,g.data);else{ie.sort((ve,oe)=>ve.start-oe.start);let ce=0;for(let ve=1;ve<ie.length;ve++){const oe=ie[ce],re=ie[ve],Ne=oe.start+oe.count,ze=ae(re.start,g.width,4),nt=ae(oe.start,g.width,4);re.start<=Ne+1&&ze===nt&&ae(re.start+re.count-1,g.width,4)===ze?oe.count=Math.max(oe.count,re.start+re.count-oe.start):(++ce,ie[ce]=re)}ie.length=ce+1;const X=t.getParameter(i.UNPACK_ROW_LENGTH),K=t.getParameter(i.UNPACK_SKIP_PIXELS),me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let ve=0,oe=ie.length;ve<oe;ve++){const re=ie[ve],Ne=Math.floor(re.start/4),ze=Math.ceil(re.count/4),nt=Ne%g.width,L=Math.floor(Ne/g.width),se=ze,$=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),t.pixelStorei(i.UNPACK_SKIP_ROWS,L),t.texSubImage2D(i.TEXTURE_2D,0,nt,L,se,$,O,j,g.data)}b.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,X),t.pixelStorei(i.UNPACK_SKIP_PIXELS,K),t.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function we(b,g,O){let j=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(j=i.TEXTURE_3D);const te=Y(b,g),ie=g.source;t.bindTexture(j,b.__webglTexture,i.TEXTURE0+O);const ce=n.get(ie);if(ie.version!==ce.__version||te===!0){if(t.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const $=je.getPrimaries(je.workingColorSpace),_e=g.colorSpace===Gn?null:je.getPrimaries(g.colorSpace),le=g.colorSpace===Gn||$===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,le)}t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let K=m(g.image,!1,r.maxTextureSize);K=de(g,K);const me=s.convert(g.format,g.colorSpace),ve=s.convert(g.type);let oe=E(g.internalFormat,me,ve,g.normalized,g.colorSpace,g.isVideoTexture);Ee(j,g);let re;const Ne=g.mipmaps,ze=g.isVideoTexture!==!0,nt=ce.__version===void 0||te===!0,L=ie.dataReady,se=T(g,K);if(g.isDepthTexture)oe=w(g.format===ei,g.type),nt&&(ze?t.texStorage2D(i.TEXTURE_2D,1,oe,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,oe,K.width,K.height,0,me,ve,null));else if(g.isDataTexture)if(Ne.length>0){ze&&nt&&t.texStorage2D(i.TEXTURE_2D,se,oe,Ne[0].width,Ne[0].height);for(let $=0,_e=Ne.length;$<_e;$++)re=Ne[$],ze?L&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,re.width,re.height,me,ve,re.data):t.texImage2D(i.TEXTURE_2D,$,oe,re.width,re.height,0,me,ve,re.data);g.generateMipmaps=!1}else ze?(nt&&t.texStorage2D(i.TEXTURE_2D,se,oe,K.width,K.height),L&&ne(g,K,me,ve)):t.texImage2D(i.TEXTURE_2D,0,oe,K.width,K.height,0,me,ve,K.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){ze&&nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,oe,Ne[0].width,Ne[0].height,K.depth);for(let $=0,_e=Ne.length;$<_e;$++)if(re=Ne[$],g.format!==tn)if(me!==null)if(ze){if(L)if(g.layerUpdates.size>0){const le=Oo(re.width,re.height,g.format,g.type);for(const ee of g.layerUpdates){const be=re.data.subarray(ee*le/re.data.BYTES_PER_ELEMENT,(ee+1)*le/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,ee,re.width,re.height,1,me,be)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,re.width,re.height,K.depth,me,re.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,oe,re.width,re.height,K.depth,0,re.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,re.width,re.height,K.depth,me,ve,re.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,oe,re.width,re.height,K.depth,0,me,ve,re.data)}else{ze&&nt&&t.texStorage2D(i.TEXTURE_2D,se,oe,Ne[0].width,Ne[0].height);for(let $=0,_e=Ne.length;$<_e;$++)re=Ne[$],g.format!==tn?me!==null?ze?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,re.width,re.height,me,re.data):t.compressedTexImage2D(i.TEXTURE_2D,$,oe,re.width,re.height,0,re.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?L&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,re.width,re.height,me,ve,re.data):t.texImage2D(i.TEXTURE_2D,$,oe,re.width,re.height,0,me,ve,re.data)}else if(g.isDataArrayTexture)if(ze){if(nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,oe,K.width,K.height,K.depth),L)if(g.layerUpdates.size>0){const $=Oo(K.width,K.height,g.format,g.type);for(const _e of g.layerUpdates){const le=K.data.subarray(_e*$/K.data.BYTES_PER_ELEMENT,(_e+1)*$/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,_e,K.width,K.height,1,me,ve,le)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,me,ve,K.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,oe,K.width,K.height,K.depth,0,me,ve,K.data);else if(g.isData3DTexture)ze?(nt&&t.texStorage3D(i.TEXTURE_3D,se,oe,K.width,K.height,K.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,me,ve,K.data)):t.texImage3D(i.TEXTURE_3D,0,oe,K.width,K.height,K.depth,0,me,ve,K.data);else if(g.isFramebufferTexture){if(nt)if(ze)t.texStorage2D(i.TEXTURE_2D,se,oe,K.width,K.height);else{let $=K.width,_e=K.height;for(let le=0;le<se;le++)t.texImage2D(i.TEXTURE_2D,le,oe,$,_e,0,me,ve,null),$>>=1,_e>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){const $=i.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),K.parentNode!==$){$.appendChild(K),h.add(g),$.onpaint=Be=>{const mt=Be.changedElements;for(const at of h)mt.includes(at.image)&&(at.needsUpdate=!0)},$.requestPaint();return}const _e=0,le=i.RGBA,ee=i.RGBA,be=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,_e,le,ee,be,K),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(ze&&nt){const $=ht(Ne[0]);t.texStorage2D(i.TEXTURE_2D,se,oe,$.width,$.height)}for(let $=0,_e=Ne.length;$<_e;$++)re=Ne[$],ze?L&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,me,ve,re):t.texImage2D(i.TEXTURE_2D,$,oe,me,ve,re);g.generateMipmaps=!1}else if(ze){if(nt){const $=ht(K);t.texStorage2D(i.TEXTURE_2D,se,oe,$.width,$.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,ve,K)}else t.texImage2D(i.TEXTURE_2D,0,oe,me,ve,K);f(g)&&v(j),ce.__version=ie.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function Ue(b,g,O){if(g.image.length!==6)return;const j=Y(b,g),te=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+O);const ie=n.get(te);if(te.version!==ie.__version||j===!0){t.activeTexture(i.TEXTURE0+O);const ce=je.getPrimaries(je.workingColorSpace),X=g.colorSpace===Gn?null:je.getPrimaries(g.colorSpace),K=g.colorSpace===Gn||ce===X?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const me=g.isCompressedTexture||g.image[0].isCompressedTexture,ve=g.image[0]&&g.image[0].isDataTexture,oe=[];for(let ee=0;ee<6;ee++)!me&&!ve?oe[ee]=m(g.image[ee],!0,r.maxCubemapSize):oe[ee]=ve?g.image[ee].image:g.image[ee],oe[ee]=de(g,oe[ee]);const re=oe[0],Ne=s.convert(g.format,g.colorSpace),ze=s.convert(g.type),nt=E(g.internalFormat,Ne,ze,g.normalized,g.colorSpace),L=g.isVideoTexture!==!0,se=ie.__version===void 0||j===!0,$=te.dataReady;let _e=T(g,re);Ee(i.TEXTURE_CUBE_MAP,g);let le;if(me){L&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,nt,re.width,re.height);for(let ee=0;ee<6;ee++){le=oe[ee].mipmaps;for(let be=0;be<le.length;be++){const Be=le[be];g.format!==tn?Ne!==null?L?$&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,0,0,Be.width,Be.height,Ne,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,nt,Be.width,Be.height,0,Be.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,0,0,Be.width,Be.height,Ne,ze,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,nt,Be.width,Be.height,0,Ne,ze,Be.data)}}}else{if(le=g.mipmaps,L&&se){le.length>0&&_e++;const ee=ht(oe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,nt,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(ve){L?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,oe[ee].width,oe[ee].height,Ne,ze,oe[ee].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,nt,oe[ee].width,oe[ee].height,0,Ne,ze,oe[ee].data);for(let be=0;be<le.length;be++){const mt=le[be].image[ee].image;L?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,0,0,mt.width,mt.height,Ne,ze,mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,nt,mt.width,mt.height,0,Ne,ze,mt.data)}}else{L?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ne,ze,oe[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,nt,Ne,ze,oe[ee]);for(let be=0;be<le.length;be++){const Be=le[be];L?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,0,0,Ne,ze,Be.image[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,nt,Ne,ze,Be.image[ee])}}}f(g)&&v(i.TEXTURE_CUBE_MAP),ie.__version=te.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function Ce(b,g,O,j,te,ie){const ce=s.convert(O.format,O.colorSpace),X=s.convert(O.type),K=E(O.internalFormat,ce,X,O.normalized,O.colorSpace),me=n.get(g),ve=n.get(O);if(ve.__renderTarget=g,!me.__hasExternalTextures){const oe=Math.max(1,g.width>>ie),re=Math.max(1,g.height>>ie);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,ie,K,oe,re,g.depth,0,ce,X,null):t.texImage2D(te,ie,K,oe,re,0,ce,X,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),qe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,te,ve.__webglTexture,0,yt(g)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,te,ve.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(b,g,O){if(i.bindRenderbuffer(i.RENDERBUFFER,b),g.depthBuffer){const j=g.depthTexture,te=j&&j.isDepthTexture?j.type:null,ie=w(g.stencilBuffer,te),ce=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;qe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(g),ie,g.width,g.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(g),ie,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,ie,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,b)}else{const j=g.textures;for(let te=0;te<j.length;te++){const ie=j[te],ce=s.convert(ie.format,ie.colorSpace),X=s.convert(ie.type),K=E(ie.internalFormat,ce,X,ie.normalized,ie.colorSpace);qe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(g),K,g.width,g.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(g),K,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,K,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pe(b,g,O){const j=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(g.depthTexture);if(te.__renderTarget=g,(!te.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),j){if(te.__webglInit===void 0&&(te.__webglInit=!0,g.depthTexture.addEventListener("dispose",P)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),Ee(i.TEXTURE_CUBE_MAP,g.depthTexture);const me=s.convert(g.depthTexture.format),ve=s.convert(g.depthTexture.type);let oe;g.depthTexture.format===Pn?oe=i.DEPTH_COMPONENT24:g.depthTexture.format===ei&&(oe=i.DEPTH24_STENCIL8);for(let re=0;re<6;re++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,oe,g.width,g.height,0,me,ve,null)}}else Z(g.depthTexture,0);const ie=te.__webglTexture,ce=yt(g),X=j?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,K=g.depthTexture.format===ei?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===Pn)qe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,X,ie,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,K,X,ie,0);else if(g.depthTexture.format===ei)qe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,X,ie,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,K,X,ie,0);else throw new Error("Unknown depthTexture format")}function Xe(b){const g=n.get(b),O=b.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==b.depthTexture){const j=b.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),j){const te=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,j.removeEventListener("dispose",te)};j.addEventListener("dispose",te),g.__depthDisposeCallback=te}g.__boundDepthTexture=j}if(b.depthTexture&&!g.__autoAllocateDepthBuffer)if(O)for(let j=0;j<6;j++)Pe(g.__webglFramebuffer[j],b,j);else{const j=b.texture.mipmaps;j&&j.length>0?Pe(g.__webglFramebuffer[0],b,0):Pe(g.__webglFramebuffer,b,0)}else if(O){g.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[j]),g.__webglDepthbuffer[j]===void 0)g.__webglDepthbuffer[j]=i.createRenderbuffer(),lt(g.__webglDepthbuffer[j],b,!1);else{const te=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=g.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ie)}}else{const j=b.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),lt(g.__webglDepthbuffer,b,!1);else{const te=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ie)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function tt(b,g,O){const j=n.get(b);g!==void 0&&Ce(j.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Xe(b)}function Ie(b){const g=b.texture,O=n.get(b),j=n.get(g);b.addEventListener("dispose",x);const te=b.textures,ie=b.isWebGLCubeRenderTarget===!0,ce=te.length>1;if(ce||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=g.version,a.memory.textures++),ie){O.__webglFramebuffer=[];for(let X=0;X<6;X++)if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer[X]=[];for(let K=0;K<g.mipmaps.length;K++)O.__webglFramebuffer[X][K]=i.createFramebuffer()}else O.__webglFramebuffer[X]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer=[];for(let X=0;X<g.mipmaps.length;X++)O.__webglFramebuffer[X]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ce)for(let X=0,K=te.length;X<K;X++){const me=n.get(te[X]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&qe(b)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let X=0;X<te.length;X++){const K=te[X];O.__webglColorRenderbuffer[X]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[X]);const me=s.convert(K.format,K.colorSpace),ve=s.convert(K.type),oe=E(K.internalFormat,me,ve,K.normalized,K.colorSpace,b.isXRRenderTarget===!0),re=yt(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,re,oe,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+X,i.RENDERBUFFER,O.__webglColorRenderbuffer[X])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),lt(O.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Ee(i.TEXTURE_CUBE_MAP,g);for(let X=0;X<6;X++)if(g.mipmaps&&g.mipmaps.length>0)for(let K=0;K<g.mipmaps.length;K++)Ce(O.__webglFramebuffer[X][K],b,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,K);else Ce(O.__webglFramebuffer[X],b,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);f(g)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let X=0,K=te.length;X<K;X++){const me=te[X],ve=n.get(me);let oe=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(oe=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,ve.__webglTexture),Ee(oe,me),Ce(O.__webglFramebuffer,b,me,i.COLOR_ATTACHMENT0+X,oe,0),f(me)&&v(oe)}t.unbindTexture()}else{let X=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(X=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(X,j.__webglTexture),Ee(X,g),g.mipmaps&&g.mipmaps.length>0)for(let K=0;K<g.mipmaps.length;K++)Ce(O.__webglFramebuffer[K],b,g,i.COLOR_ATTACHMENT0,X,K);else Ce(O.__webglFramebuffer,b,g,i.COLOR_ATTACHMENT0,X,0);f(g)&&v(X),t.unbindTexture()}b.depthBuffer&&Xe(b)}function Ze(b){const g=b.textures;for(let O=0,j=g.length;O<j;O++){const te=g[O];if(f(te)){const ie=y(b),ce=n.get(te).__webglTexture;t.bindTexture(ie,ce),v(ie),t.unbindTexture()}}}const Ve=[],wt=[];function I(b){if(b.samples>0){if(qe(b)===!1){const g=b.textures,O=b.width,j=b.height;let te=i.COLOR_BUFFER_BIT;const ie=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(b),X=g.length>1;if(X)for(let me=0;me<g.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const K=b.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let me=0;me<g.length;me++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),X){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[me]);const ve=n.get(g[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ve,0)}i.blitFramebuffer(0,0,O,j,0,0,O,j,te,i.NEAREST),c===!0&&(Ve.length=0,wt.length=0,Ve.push(i.COLOR_ATTACHMENT0+me),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Ve.push(ie),wt.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,wt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ve))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),X)for(let me=0;me<g.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,ce.__webglColorRenderbuffer[me]);const ve=n.get(g[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const g=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function yt(b){return Math.min(r.maxSamples,b.samples)}function qe(b){const g=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function dt(b){const g=a.render.frame;d.get(b)!==g&&(d.set(b,g),b.update())}function de(b,g){const O=b.colorSpace,j=b.format,te=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||O!==Nr&&O!==Gn&&(je.getTransfer(O)===st?(j!==tn||te!==Kt)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",O)),g}function ht(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=q,this.getTextureUnits=W,this.setTextureUnits=R,this.setTexture2D=Z,this.setTexture2DArray=Q,this.setTexture3D=J,this.setTextureCube=ue,this.rebindTextures=tt,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=I,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=qe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Rm(i,e){function t(n,r=Gn){let s;const a=je.getTransfer(r);if(n===Kt)return i.UNSIGNED_BYTE;if(n===Ra)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ca)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Sl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===vl)return i.BYTE;if(n===Ml)return i.SHORT;if(n===$i)return i.UNSIGNED_SHORT;if(n===wa)return i.INT;if(n===gn)return i.UNSIGNED_INT;if(n===dn)return i.FLOAT;if(n===Cn)return i.HALF_FLOAT;if(n===El)return i.ALPHA;if(n===bl)return i.RGB;if(n===tn)return i.RGBA;if(n===Pn)return i.DEPTH_COMPONENT;if(n===ei)return i.DEPTH_STENCIL;if(n===Tl)return i.RED;if(n===Pa)return i.RED_INTEGER;if(n===ai)return i.RG;if(n===La)return i.RG_INTEGER;if(n===Da)return i.RGBA_INTEGER;if(n===wr||n===Rr||n===Cr||n===Pr)if(a===st)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===wr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Cr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Pr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===wr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Cr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Pr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xs||n===qs||n===Ys||n===$s)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Xs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ys)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===$s)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===js||n===Ks||n===Zs||n===Js||n===Qs||n===Ir||n===ea)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===js||n===Ks)return a===st?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Zs)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Js)return s.COMPRESSED_R11_EAC;if(n===Qs)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Ir)return s.COMPRESSED_RG11_EAC;if(n===ea)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ta||n===na||n===ia||n===ra||n===sa||n===aa||n===oa||n===la||n===ca||n===ua||n===da||n===fa||n===ha||n===pa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ta)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===na)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ia)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ra)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sa)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===aa)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===oa)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===la)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ca)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ua)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===da)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fa)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ha)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===pa)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ma||n===ga||n===_a)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ma)return a===st?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ga)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_a)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xa||n===va||n===Ur||n===Ma)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===xa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===va)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ur)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ma)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ji?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Cm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Lm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ul(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new _n({vertexShader:Cm,fragmentShader:Pm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nn(new Yr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Dm extends ci{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,p=null,_=null;const S=typeof XRWebGLBinding<"u",m=new Lm,f={},v=t.getContextAttributes();let y=null,E=null;const w=[],T=[],P=new it;let x=null;const A=new jt;A.viewport=new vt;const D=new jt;D.viewport=new vt;const C=[A,D],B=new zu;let q=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ae=w[Y];return ae===void 0&&(ae=new ls,w[Y]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(Y){let ae=w[Y];return ae===void 0&&(ae=new ls,w[Y]=ae),ae.getGripSpace()},this.getHand=function(Y){let ae=w[Y];return ae===void 0&&(ae=new ls,w[Y]=ae),ae.getHandSpace()};function R(Y){const ae=T.indexOf(Y.inputSource);if(ae===-1)return;const ne=w[ae];ne!==void 0&&(ne.update(Y.inputSource,Y.frame,l||a),ne.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){r.removeEventListener("select",R),r.removeEventListener("selectstart",R),r.removeEventListener("selectend",R),r.removeEventListener("squeeze",R),r.removeEventListener("squeezestart",R),r.removeEventListener("squeezeend",R),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",V);for(let Y=0;Y<w.length;Y++){const ae=T[Y];ae!==null&&(T[Y]=null,w[Y].disconnect(ae))}q=null,W=null,m.reset();for(const Y in f)delete f[Y];e.setRenderTarget(y),p=null,u=null,h=null,r=null,E=null,Ee.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&S&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",R),r.addEventListener("selectstart",R),r.addEventListener("selectend",R),r.addEventListener("squeeze",R),r.addEventListener("squeezestart",R),r.addEventListener("squeezeend",R),r.addEventListener("end",k),r.addEventListener("inputsourceschange",V),v.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(P),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,we=null,Ue=null;v.depth&&(Ue=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=v.stencil?ei:Pn,we=v.stencil?ji:gn);const Ce={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(Ce),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),E=new pn(u.textureWidth,u.textureHeight,{format:tn,type:Kt,depthTexture:new Li(u.textureWidth,u.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ne={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new pn(p.framebufferWidth,p.framebufferHeight,{format:tn,type:Kt,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Ee.setContext(r),Ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(Y){for(let ae=0;ae<Y.removed.length;ae++){const ne=Y.removed[ae],we=T.indexOf(ne);we>=0&&(T[we]=null,w[we].disconnect(ne))}for(let ae=0;ae<Y.added.length;ae++){const ne=Y.added[ae];let we=T.indexOf(ne);if(we===-1){for(let Ce=0;Ce<w.length;Ce++)if(Ce>=T.length){T.push(ne),we=Ce;break}else if(T[Ce]===null){T[Ce]=ne,we=Ce;break}if(we===-1)break}const Ue=w[we];Ue&&Ue.connect(ne)}}const Z=new F,Q=new F;function J(Y,ae,ne){Z.setFromMatrixPosition(ae.matrixWorld),Q.setFromMatrixPosition(ne.matrixWorld);const we=Z.distanceTo(Q),Ue=ae.projectionMatrix.elements,Ce=ne.projectionMatrix.elements,lt=Ue[14]/(Ue[10]-1),Pe=Ue[14]/(Ue[10]+1),Xe=(Ue[9]+1)/Ue[5],tt=(Ue[9]-1)/Ue[5],Ie=(Ue[8]-1)/Ue[0],Ze=(Ce[8]+1)/Ce[0],Ve=lt*Ie,wt=lt*Ze,I=we/(-Ie+Ze),yt=I*-Ie;if(ae.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(yt),Y.translateZ(I),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ue[10]===-1)Y.projectionMatrix.copy(ae.projectionMatrix),Y.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const qe=lt+I,dt=Pe+I,de=Ve-yt,ht=wt+(we-yt),b=Xe*Pe/dt*qe,g=tt*Pe/dt*qe;Y.projectionMatrix.makePerspective(de,ht,b,g,qe,dt),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ue(Y,ae){ae===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ae.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let ae=Y.near,ne=Y.far;m.texture!==null&&(m.depthNear>0&&(ae=m.depthNear),m.depthFar>0&&(ne=m.depthFar)),B.near=D.near=A.near=ae,B.far=D.far=A.far=ne,(q!==B.near||W!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),q=B.near,W=B.far),B.layers.mask=Y.layers.mask|6,A.layers.mask=B.layers.mask&-5,D.layers.mask=B.layers.mask&-3;const we=Y.parent,Ue=B.cameras;ue(B,we);for(let Ce=0;Ce<Ue.length;Ce++)ue(Ue[Ce],we);Ue.length===2?J(B,A,D):B.projectionMatrix.copy(A.projectionMatrix),ge(Y,B,we)};function ge(Y,ae,ne){ne===null?Y.matrix.copy(ae.matrixWorld):(Y.matrix.copy(ne.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ae.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ae.projectionMatrix),Y.projectionMatrixInverse.copy(ae.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ya*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(Y){c=Y,u!==null&&(u.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(Y){return f[Y]};let Oe=null;function Se(Y,ae){if(d=ae.getViewerPose(l||a),_=ae,d!==null){const ne=d.views;p!==null&&(e.setRenderTargetFramebuffer(E,p.framebuffer),e.setRenderTarget(E));let we=!1;ne.length!==B.cameras.length&&(B.cameras.length=0,we=!0);for(let Pe=0;Pe<ne.length;Pe++){const Xe=ne[Pe];let tt=null;if(p!==null)tt=p.getViewport(Xe);else{const Ze=h.getViewSubImage(u,Xe);tt=Ze.viewport,Pe===0&&(e.setRenderTargetTextures(E,Ze.colorTexture,Ze.depthStencilTexture),e.setRenderTarget(E))}let Ie=C[Pe];Ie===void 0&&(Ie=new jt,Ie.layers.enable(Pe),Ie.viewport=new vt,C[Pe]=Ie),Ie.matrix.fromArray(Xe.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(Xe.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(tt.x,tt.y,tt.width,tt.height),Pe===0&&(B.matrix.copy(Ie.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),we===!0&&B.cameras.push(Ie)}const Ue=r.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&S){h=n.getBinding();const Pe=h.getDepthInformation(ne[0]);Pe&&Pe.isValid&&Pe.texture&&m.init(Pe,r.renderState)}if(Ue&&Ue.includes("camera-access")&&S){e.state.unbindTexture(),h=n.getBinding();for(let Pe=0;Pe<ne.length;Pe++){const Xe=ne[Pe].camera;if(Xe){let tt=f[Xe];tt||(tt=new Ul,f[Xe]=tt);const Ie=h.getCameraImage(Xe);tt.sourceTexture=Ie}}}}for(let ne=0;ne<w.length;ne++){const we=T[ne],Ue=w[ne];we!==null&&Ue!==void 0&&Ue.update(we,ae,l||a)}Oe&&Oe(Y,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),_=null}const Ee=new Bl;Ee.setAnimationLoop(Se),this.setAnimationLoop=function(Y){Oe=Y},this.dispose=function(){}}}const Im=new Mt,Xl=new Fe;Xl.set(-1,0,0,0,1,0,0,0,1);function Um(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Nl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,v,y,E){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),d(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,E)):f.isMeshMatcapMaterial?(s(m,f),_(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),S(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,v,y):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===zt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===zt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const v=e.get(f),y=v.envMap,E=v.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(Im.makeRotationFromEuler(E)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Xl),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,v,y){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=y*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===zt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function S(m,f){const v=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Nm(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){const E=y.program;n.uniformBlockBinding(v,E)}function l(v,y){let E=r[v.id];E===void 0&&(_(v),E=d(v),r[v.id]=E,v.addEventListener("dispose",m));const w=y.program;n.updateUBOMapping(v,w);const T=e.render.frame;s[v.id]!==T&&(u(v),s[v.id]=T)}function d(v){const y=h();v.__bindingPointIndex=y;const E=i.createBuffer(),w=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,w,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,E),E}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const y=r[v.id],E=v.uniforms,w=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,P=E.length;T<P;T++){const x=Array.isArray(E[T])?E[T]:[E[T]];for(let A=0,D=x.length;A<D;A++){const C=x[A];if(p(C,T,A,w)===!0){const B=C.__offset,q=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let R=0;R<q.length;R++){const k=q[R],V=S(k);typeof k=="number"||typeof k=="boolean"?(C.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,B+W,C.__data)):k.isMatrix3?(C.__data[0]=k.elements[0],C.__data[1]=k.elements[1],C.__data[2]=k.elements[2],C.__data[3]=0,C.__data[4]=k.elements[3],C.__data[5]=k.elements[4],C.__data[6]=k.elements[5],C.__data[7]=0,C.__data[8]=k.elements[6],C.__data[9]=k.elements[7],C.__data[10]=k.elements[8],C.__data[11]=0):ArrayBuffer.isView(k)?C.__data.set(new k.constructor(k.buffer,k.byteOffset,C.__data.length)):(k.toArray(C.__data,W),W+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,y,E,w){const T=v.value,P=y+"_"+E;if(w[P]===void 0)return typeof T=="number"||typeof T=="boolean"?w[P]=T:ArrayBuffer.isView(T)?w[P]=T.slice():w[P]=T.clone(),!0;{const x=w[P];if(typeof T=="number"||typeof T=="boolean"){if(x!==T)return w[P]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(x.equals(T)===!1)return x.copy(T),!0}}return!1}function _(v){const y=v.uniforms;let E=0;const w=16;for(let P=0,x=y.length;P<x;P++){const A=Array.isArray(y[P])?y[P]:[y[P]];for(let D=0,C=A.length;D<C;D++){const B=A[D],q=Array.isArray(B.value)?B.value:[B.value];for(let W=0,R=q.length;W<R;W++){const k=q[W],V=S(k),Z=E%w,Q=Z%V.boundary,J=Z+Q;E+=Q,J!==0&&w-J<V.storage&&(E+=w-J),B.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=E,E+=V.storage}}}const T=E%w;return T>0&&(E+=w-T),v.__size=E,v.__cache={},this}function S(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){const y=v.target;y.removeEventListener("dispose",m);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function f(){for(const v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:l,dispose:f}}const Fm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ln=null;function Om(){return ln===null&&(ln=new Tu(Fm,16,16,ai,Cn),ln.name="DFG_LUT",ln.minFilter=It,ln.magFilter=It,ln.wrapS=An,ln.wrapT=An,ln.generateMipmaps=!1,ln.needsUpdate=!0),ln}class Bm{constructor(e={}){const{canvas:t=nu(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Kt}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const S=p,m=new Set([Da,La,Pa]),f=new Set([Kt,gn,$i,ji,Ra,Ca]),v=new Uint32Array(4),y=new Int32Array(4),E=new F;let w=null,T=null;const P=[],x=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let C=!1,B=null;this._outputColorSpace=$t;let q=0,W=0,R=null,k=-1,V=null;const Z=new vt,Q=new vt;let J=null;const ue=new rt(0);let ge=0,Oe=t.width,Se=t.height,Ee=1,Y=null,ae=null;const ne=new vt(0,0,Oe,Se),we=new vt(0,0,Oe,Se);let Ue=!1;const Ce=new Ll;let lt=!1,Pe=!1;const Xe=new Mt,tt=new F,Ie=new vt,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function wt(){return R===null?Ee:1}let I=n;function yt(M,U){return t.getContext(M,U)}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Aa}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",Be,!1),I===null){const U="webgl2";if(I=yt(U,M),I===null)throw yt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Je("WebGLRenderer: "+M.message),M}let qe,dt,de,ht,b,g,O,j,te,ie,ce,X,K,me,ve,oe,re,Ne,ze,nt,L,se,$;function _e(){qe=new Oh(I),qe.init(),L=new Rm(I,qe),dt=new Ch(I,qe,e,L),de=new Am(I,qe),dt.reversedDepthBuffer&&u&&de.buffers.depth.setReversed(!0),ht=new zh(I),b=new fm,g=new wm(I,qe,de,b,dt,L,ht),O=new Fh(D),j=new Hu(I),se=new wh(I,j),te=new Bh(I,j,ht,se),ie=new Vh(I,te,j,se,ht),Ne=new Gh(I,dt,g),ve=new Ph(b),ce=new dm(D,O,qe,dt,se,ve),X=new Um(D,b),K=new pm,me=new Mm(qe),re=new Ah(D,O,de,ie,_,c),oe=new Tm(D,ie,dt),$=new Nm(I,ht,dt,de),ze=new Rh(I,qe,ht),nt=new kh(I,qe,ht),ht.programs=ce.programs,D.capabilities=dt,D.extensions=qe,D.properties=b,D.renderLists=K,D.shadowMap=oe,D.state=de,D.info=ht}_e(),S!==Kt&&(A=new Wh(S,t.width,t.height,r,s));const le=new Dm(D,I);this.xr=le,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const M=qe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=qe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Ee},this.setPixelRatio=function(M){M!==void 0&&(Ee=M,this.setSize(Oe,Se,!1))},this.getSize=function(M){return M.set(Oe,Se)},this.setSize=function(M,U,H=!0){if(le.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}Oe=M,Se=U,t.width=Math.floor(M*Ee),t.height=Math.floor(U*Ee),H===!0&&(t.style.width=M+"px",t.style.height=U+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(Oe*Ee,Se*Ee).floor()},this.setDrawingBufferSize=function(M,U,H){Oe=M,Se=U,Ee=H,t.width=Math.floor(M*H),t.height=Math.floor(U*H),this.setViewport(0,0,M,U)},this.setEffects=function(M){if(S===Kt){Je("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let U=0;U<M.length;U++)if(M[U].isOutputPass===!0){Le("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(Z)},this.getViewport=function(M){return M.copy(ne)},this.setViewport=function(M,U,H,z){M.isVector4?ne.set(M.x,M.y,M.z,M.w):ne.set(M,U,H,z),de.viewport(Z.copy(ne).multiplyScalar(Ee).round())},this.getScissor=function(M){return M.copy(we)},this.setScissor=function(M,U,H,z){M.isVector4?we.set(M.x,M.y,M.z,M.w):we.set(M,U,H,z),de.scissor(Q.copy(we).multiplyScalar(Ee).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(M){de.setScissorTest(Ue=M)},this.setOpaqueSort=function(M){Y=M},this.setTransparentSort=function(M){ae=M},this.getClearColor=function(M){return M.copy(re.getClearColor())},this.setClearColor=function(){re.setClearColor(...arguments)},this.getClearAlpha=function(){return re.getClearAlpha()},this.setClearAlpha=function(){re.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,H=!0){let z=0;if(M){let G=!1;if(R!==null){const pe=R.texture.format;G=m.has(pe)}if(G){const pe=R.texture.type,Me=f.has(pe),he=re.getClearColor(),ye=re.getClearAlpha(),Te=he.r,ke=he.g,We=he.b;Me?(v[0]=Te,v[1]=ke,v[2]=We,v[3]=ye,I.clearBufferuiv(I.COLOR,0,v)):(y[0]=Te,y[1]=ke,y[2]=We,y[3]=ye,I.clearBufferiv(I.COLOR,0,y))}else z|=I.COLOR_BUFFER_BIT}U&&(z|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&I.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),B=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",Be,!1),re.dispose(),K.dispose(),me.dispose(),b.dispose(),O.dispose(),ie.dispose(),se.dispose(),$.dispose(),ce.dispose(),le.dispose(),le.removeEventListener("sessionstart",qa),le.removeEventListener("sessionend",Ya),Xn.stop()};function ee(M){M.preventDefault(),fo("WebGLRenderer: Context Lost."),C=!0}function be(){fo("WebGLRenderer: Context Restored."),C=!1;const M=ht.autoReset,U=oe.enabled,H=oe.autoUpdate,z=oe.needsUpdate,G=oe.type;_e(),ht.autoReset=M,oe.enabled=U,oe.autoUpdate=H,oe.needsUpdate=z,oe.type=G}function Be(M){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function mt(M){const U=M.target;U.removeEventListener("dispose",mt),at(U)}function at(M){vn(M),b.remove(M)}function vn(M){const U=b.get(M).programs;U!==void 0&&(U.forEach(function(H){ce.releaseProgram(H)}),M.isShaderMaterial&&ce.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,H,z,G,pe){U===null&&(U=Ze);const Me=G.isMesh&&G.matrixWorld.determinant()<0,he=Kl(M,U,H,z,G);de.setMaterial(z,Me);let ye=H.index,Te=1;if(z.wireframe===!0){if(ye=te.getWireframeAttribute(H),ye===void 0)return;Te=2}const ke=H.drawRange,We=H.attributes.position;let Ae=ke.start*Te,ot=(ke.start+ke.count)*Te;pe!==null&&(Ae=Math.max(Ae,pe.start*Te),ot=Math.min(ot,(pe.start+pe.count)*Te)),ye!==null?(Ae=Math.max(Ae,0),ot=Math.min(ot,ye.count)):We!=null&&(Ae=Math.max(Ae,0),ot=Math.min(ot,We.count));const gt=ot-Ae;if(gt<0||gt===1/0)return;se.setup(G,z,he,H,ye);let pt,ct=ze;if(ye!==null&&(pt=j.get(ye),ct=nt,ct.setIndex(pt)),G.isMesh)z.wireframe===!0?(de.setLineWidth(z.wireframeLinewidth*wt()),ct.setMode(I.LINES)):ct.setMode(I.TRIANGLES);else if(G.isLine){let Pt=z.linewidth;Pt===void 0&&(Pt=1),de.setLineWidth(Pt*wt()),G.isLineSegments?ct.setMode(I.LINES):G.isLineLoop?ct.setMode(I.LINE_LOOP):ct.setMode(I.LINE_STRIP)}else G.isPoints?ct.setMode(I.POINTS):G.isSprite&&ct.setMode(I.TRIANGLES);if(G.isBatchedMesh)if(qe.get("WEBGL_multi_draw"))ct.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Pt=G._multiDrawStarts,xe=G._multiDrawCounts,Vt=G._multiDrawCount,et=ye?j.get(ye).bytesPerElement:1,qt=b.get(z).currentProgram.getUniforms();for(let an=0;an<Vt;an++)qt.setValue(I,"_gl_DrawID",an),ct.render(Pt[an]/et,xe[an])}else if(G.isInstancedMesh)ct.renderInstances(Ae,gt,G.count);else if(H.isInstancedBufferGeometry){const Pt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,xe=Math.min(H.instanceCount,Pt);ct.renderInstances(Ae,gt,xe)}else ct.render(Ae,gt)};function sn(M,U,H){M.transparent===!0&&M.side===Tn&&M.forceSinglePass===!1?(M.side=zt,M.needsUpdate=!0,tr(M,U,H),M.side=Hn,M.needsUpdate=!0,tr(M,U,H),M.side=Tn):tr(M,U,H)}this.compile=function(M,U,H=null){H===null&&(H=M),T=me.get(H),T.init(U),x.push(T),H.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),M!==H&&M.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),T.setupLights();const z=new Set;return M.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const pe=G.material;if(pe)if(Array.isArray(pe))for(let Me=0;Me<pe.length;Me++){const he=pe[Me];sn(he,H,G),z.add(he)}else sn(pe,H,G),z.add(pe)}),T=x.pop(),z},this.compileAsync=function(M,U,H=null){const z=this.compile(M,U,H);return new Promise(G=>{function pe(){if(z.forEach(function(Me){b.get(Me).currentProgram.isReady()&&z.delete(Me)}),z.size===0){G(M);return}setTimeout(pe,10)}qe.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Kr=null;function $l(M){Kr&&Kr(M)}function qa(){Xn.stop()}function Ya(){Xn.start()}const Xn=new Bl;Xn.setAnimationLoop($l),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(M){Kr=M,le.setAnimationLoop(M),M===null?Xn.stop():Xn.start()},le.addEventListener("sessionstart",qa),le.addEventListener("sessionend",Ya),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;B!==null&&B.renderStart(M,U);const H=le.enabled===!0&&le.isPresenting===!0,z=A!==null&&(R===null||H)&&A.begin(D,R);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(U),U=le.getCamera()),M.isScene===!0&&M.onBeforeRender(D,M,U,R),T=me.get(M,x.length),T.init(U),T.state.textureUnits=g.getTextureUnits(),x.push(T),Xe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Ce.setFromProjectionMatrix(Xe,fn,U.reversedDepth),Pe=this.localClippingEnabled,lt=ve.init(this.clippingPlanes,Pe),w=K.get(M,P.length),w.init(),P.push(w),le.enabled===!0&&le.isPresenting===!0){const Me=D.xr.getDepthSensingMesh();Me!==null&&Zr(Me,U,-1/0,D.sortObjects)}Zr(M,U,0,D.sortObjects),w.finish(),D.sortObjects===!0&&w.sort(Y,ae),Ve=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Ve&&re.addToRenderList(w,M),this.info.render.frame++,lt===!0&&ve.beginShadows();const G=T.state.shadowsArray;if(oe.render(G,M,U),lt===!0&&ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&A.hasRenderPass())===!1){const Me=w.opaque,he=w.transmissive;if(T.setupLights(),U.isArrayCamera){const ye=U.cameras;if(he.length>0)for(let Te=0,ke=ye.length;Te<ke;Te++){const We=ye[Te];ja(Me,he,M,We)}Ve&&re.render(M);for(let Te=0,ke=ye.length;Te<ke;Te++){const We=ye[Te];$a(w,M,We,We.viewport)}}else he.length>0&&ja(Me,he,M,U),Ve&&re.render(M),$a(w,M,U)}R!==null&&W===0&&(g.updateMultisampleRenderTarget(R),g.updateRenderTargetMipmap(R)),z&&A.end(D),M.isScene===!0&&M.onAfterRender(D,M,U),se.resetDefaultState(),k=-1,V=null,x.pop(),x.length>0?(T=x[x.length-1],g.setTextureUnits(T.state.textureUnits),lt===!0&&ve.setGlobalState(D.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?w=P[P.length-1]:w=null,B!==null&&B.renderEnd()};function Zr(M,U,H,z){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)H=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Ce.intersectsSprite(M)){z&&Ie.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Xe);const Me=ie.update(M),he=M.material;he.visible&&w.push(M,Me,he,H,Ie.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Ce.intersectsObject(M))){const Me=ie.update(M),he=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ie.copy(M.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ie.copy(Me.boundingSphere.center)),Ie.applyMatrix4(M.matrixWorld).applyMatrix4(Xe)),Array.isArray(he)){const ye=Me.groups;for(let Te=0,ke=ye.length;Te<ke;Te++){const We=ye[Te],Ae=he[We.materialIndex];Ae&&Ae.visible&&w.push(M,Me,Ae,H,Ie.z,We)}}else he.visible&&w.push(M,Me,he,H,Ie.z,null)}}const pe=M.children;for(let Me=0,he=pe.length;Me<he;Me++)Zr(pe[Me],U,H,z)}function $a(M,U,H,z){const{opaque:G,transmissive:pe,transparent:Me}=M;T.setupLightsView(H),lt===!0&&ve.setGlobalState(D.clippingPlanes,H),z&&de.viewport(Z.copy(z)),G.length>0&&er(G,U,H),pe.length>0&&er(pe,U,H),Me.length>0&&er(Me,U,H),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function ja(M,U,H,z){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){const Ae=qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new pn(1,1,{generateMipmaps:!0,type:Ae?Cn:Kt,minFilter:Qn,samples:Math.max(4,dt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace})}const pe=T.state.transmissionRenderTarget[z.id],Me=z.viewport||Z;pe.setSize(Me.z*D.transmissionResolutionScale,Me.w*D.transmissionResolutionScale);const he=D.getRenderTarget(),ye=D.getActiveCubeFace(),Te=D.getActiveMipmapLevel();D.setRenderTarget(pe),D.getClearColor(ue),ge=D.getClearAlpha(),ge<1&&D.setClearColor(16777215,.5),D.clear(),Ve&&re.render(H);const ke=D.toneMapping;D.toneMapping=hn;const We=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),lt===!0&&ve.setGlobalState(D.clippingPlanes,z),er(M,H,z),g.updateMultisampleRenderTarget(pe),g.updateRenderTargetMipmap(pe),qe.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let ot=0,gt=U.length;ot<gt;ot++){const pt=U[ot],{object:ct,geometry:Pt,material:xe,group:Vt}=pt;if(xe.side===Tn&&ct.layers.test(z.layers)){const et=xe.side;xe.side=zt,xe.needsUpdate=!0,Ka(ct,H,z,Pt,xe,Vt),xe.side=et,xe.needsUpdate=!0,Ae=!0}}Ae===!0&&(g.updateMultisampleRenderTarget(pe),g.updateRenderTargetMipmap(pe))}D.setRenderTarget(he,ye,Te),D.setClearColor(ue,ge),We!==void 0&&(z.viewport=We),D.toneMapping=ke}function er(M,U,H){const z=U.isScene===!0?U.overrideMaterial:null;for(let G=0,pe=M.length;G<pe;G++){const Me=M[G],{object:he,geometry:ye,group:Te}=Me;let ke=Me.material;ke.allowOverride===!0&&z!==null&&(ke=z),he.layers.test(H.layers)&&Ka(he,U,H,ye,ke,Te)}}function Ka(M,U,H,z,G,pe){M.onBeforeRender(D,U,H,z,G,pe),M.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),G.onBeforeRender(D,U,H,z,M,pe),G.transparent===!0&&G.side===Tn&&G.forceSinglePass===!1?(G.side=zt,G.needsUpdate=!0,D.renderBufferDirect(H,U,z,G,M,pe),G.side=Hn,G.needsUpdate=!0,D.renderBufferDirect(H,U,z,G,M,pe),G.side=Tn):D.renderBufferDirect(H,U,z,G,M,pe),M.onAfterRender(D,U,H,z,G,pe)}function tr(M,U,H){U.isScene!==!0&&(U=Ze);const z=b.get(M),G=T.state.lights,pe=T.state.shadowsArray,Me=G.state.version,he=ce.getParameters(M,G.state,pe,U,H,T.state.lightProbeGridArray),ye=ce.getProgramCacheKey(he);let Te=z.programs;z.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;const ke=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;z.envMap=O.get(M.envMap||z.environment,ke),z.envMapRotation=z.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Te===void 0&&(M.addEventListener("dispose",mt),Te=new Map,z.programs=Te);let We=Te.get(ye);if(We!==void 0){if(z.currentProgram===We&&z.lightsStateVersion===Me)return Ja(M,he),We}else he.uniforms=ce.getUniforms(M),B!==null&&M.isNodeMaterial&&B.build(M,H,he),M.onBeforeCompile(he,D),We=ce.acquireProgram(he,ye),Te.set(ye,We),z.uniforms=he.uniforms;const Ae=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ae.clippingPlanes=ve.uniform),Ja(M,he),z.needsLights=Jl(M),z.lightsStateVersion=Me,z.needsLights&&(Ae.ambientLightColor.value=G.state.ambient,Ae.lightProbe.value=G.state.probe,Ae.directionalLights.value=G.state.directional,Ae.directionalLightShadows.value=G.state.directionalShadow,Ae.spotLights.value=G.state.spot,Ae.spotLightShadows.value=G.state.spotShadow,Ae.rectAreaLights.value=G.state.rectArea,Ae.ltc_1.value=G.state.rectAreaLTC1,Ae.ltc_2.value=G.state.rectAreaLTC2,Ae.pointLights.value=G.state.point,Ae.pointLightShadows.value=G.state.pointShadow,Ae.hemisphereLights.value=G.state.hemi,Ae.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ae.spotLightMatrix.value=G.state.spotLightMatrix,Ae.spotLightMap.value=G.state.spotLightMap,Ae.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=T.state.lightProbeGridArray.length>0,z.currentProgram=We,z.uniformsList=null,We}function Za(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=Lr.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function Ja(M,U){const H=b.get(M);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.batchingColor=U.batchingColor,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.instancingMorph=U.instancingMorph,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function jl(M,U){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;E.setFromMatrixPosition(U.matrixWorld);for(let H=0,z=M.length;H<z;H++){const G=M[H];if(G.texture!==null&&G.boundingBox.containsPoint(E))return G}return null}function Kl(M,U,H,z,G){U.isScene!==!0&&(U=Ze),g.resetTextureUnits();const pe=U.fog,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,he=R===null?D.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:je.workingColorSpace,ye=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Te=O.get(z.envMap||Me,ye),ke=z.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,We=!!H.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ae=!!H.morphAttributes.position,ot=!!H.morphAttributes.normal,gt=!!H.morphAttributes.color;let pt=hn;z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(pt=D.toneMapping);const ct=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Pt=ct!==void 0?ct.length:0,xe=b.get(z),Vt=T.state.lights;if(lt===!0&&(Pe===!0||M!==V)){const ft=M===V&&z.id===k;ve.setState(z,M,ft)}let et=!1;z.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Vt.state.version||xe.outputColorSpace!==he||G.isBatchedMesh&&xe.batching===!1||!G.isBatchedMesh&&xe.batching===!0||G.isBatchedMesh&&xe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&xe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&xe.instancing===!1||!G.isInstancedMesh&&xe.instancing===!0||G.isSkinnedMesh&&xe.skinning===!1||!G.isSkinnedMesh&&xe.skinning===!0||G.isInstancedMesh&&xe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&xe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&xe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&xe.instancingMorph===!1&&G.morphTexture!==null||xe.envMap!==Te||z.fog===!0&&xe.fog!==pe||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==ve.numPlanes||xe.numIntersection!==ve.numIntersection)||xe.vertexAlphas!==ke||xe.vertexTangents!==We||xe.morphTargets!==Ae||xe.morphNormals!==ot||xe.morphColors!==gt||xe.toneMapping!==pt||xe.morphTargetsCount!==Pt||!!xe.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(et=!0):(et=!0,xe.__version=z.version);let qt=xe.currentProgram;et===!0&&(qt=tr(z,U,G),B&&z.isNodeMaterial&&B.onUpdateProgram(z,qt,xe));let an=!1,Dn=!1,ui=!1;const ut=qt.getUniforms(),_t=xe.uniforms;if(de.useProgram(qt.program)&&(an=!0,Dn=!0,ui=!0),z.id!==k&&(k=z.id,Dn=!0),xe.needsLights){const ft=jl(T.state.lightProbeGridArray,G);xe.lightProbeGrid!==ft&&(xe.lightProbeGrid=ft,Dn=!0)}if(an||V!==M){de.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ut.setValue(I,"projectionMatrix",M.projectionMatrix),ut.setValue(I,"viewMatrix",M.matrixWorldInverse);const Un=ut.map.cameraPosition;Un!==void 0&&Un.setValue(I,tt.setFromMatrixPosition(M.matrixWorld)),dt.logarithmicDepthBuffer&&ut.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ut.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),V!==M&&(V=M,Dn=!0,ui=!0)}if(xe.needsLights&&(Vt.state.directionalShadowMap.length>0&&ut.setValue(I,"directionalShadowMap",Vt.state.directionalShadowMap,g),Vt.state.spotShadowMap.length>0&&ut.setValue(I,"spotShadowMap",Vt.state.spotShadowMap,g),Vt.state.pointShadowMap.length>0&&ut.setValue(I,"pointShadowMap",Vt.state.pointShadowMap,g)),G.isSkinnedMesh){ut.setOptional(I,G,"bindMatrix"),ut.setOptional(I,G,"bindMatrixInverse");const ft=G.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),ut.setValue(I,"boneTexture",ft.boneTexture,g))}G.isBatchedMesh&&(ut.setOptional(I,G,"batchingTexture"),ut.setValue(I,"batchingTexture",G._matricesTexture,g),ut.setOptional(I,G,"batchingIdTexture"),ut.setValue(I,"batchingIdTexture",G._indirectTexture,g),ut.setOptional(I,G,"batchingColorTexture"),G._colorsTexture!==null&&ut.setValue(I,"batchingColorTexture",G._colorsTexture,g));const In=H.morphAttributes;if((In.position!==void 0||In.normal!==void 0||In.color!==void 0)&&Ne.update(G,H,qt),(Dn||xe.receiveShadow!==G.receiveShadow)&&(xe.receiveShadow=G.receiveShadow,ut.setValue(I,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(_t.envMapIntensity.value=U.environmentIntensity),_t.dfgLUT!==void 0&&(_t.dfgLUT.value=Om()),Dn){if(ut.setValue(I,"toneMappingExposure",D.toneMappingExposure),xe.needsLights&&Zl(_t,ui),pe&&z.fog===!0&&X.refreshFogUniforms(_t,pe),X.refreshMaterialUniforms(_t,z,Ee,Se,T.state.transmissionRenderTarget[M.id]),xe.needsLights&&xe.lightProbeGrid){const ft=xe.lightProbeGrid;_t.probesSH.value=ft.texture,_t.probesMin.value.copy(ft.boundingBox.min),_t.probesMax.value.copy(ft.boundingBox.max),_t.probesResolution.value.copy(ft.resolution)}Lr.upload(I,Za(xe),_t,g)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Lr.upload(I,Za(xe),_t,g),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ut.setValue(I,"center",G.center),ut.setValue(I,"modelViewMatrix",G.modelViewMatrix),ut.setValue(I,"normalMatrix",G.normalMatrix),ut.setValue(I,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){const ft=z.uniformsGroups;for(let Un=0,di=ft.length;Un<di;Un++){const Qa=ft[Un];$.update(Qa,qt),$.bind(Qa,qt)}}return qt}function Zl(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function Jl(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(M,U,H){const z=b.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),b.get(M.texture).__webglTexture=U,b.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:H,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const H=b.get(M);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0};const Ql=I.createFramebuffer();this.setRenderTarget=function(M,U=0,H=0){R=M,q=U,W=H;let z=null,G=!1,pe=!1;if(M){const he=b.get(M);if(he.__useDefaultFramebuffer!==void 0){de.bindFramebuffer(I.FRAMEBUFFER,he.__webglFramebuffer),Z.copy(M.viewport),Q.copy(M.scissor),J=M.scissorTest,de.viewport(Z),de.scissor(Q),de.setScissorTest(J),k=-1;return}else if(he.__webglFramebuffer===void 0)g.setupRenderTarget(M);else if(he.__hasExternalTextures)g.rebindTextures(M,b.get(M.texture).__webglTexture,b.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const ke=M.depthTexture;if(he.__boundDepthTexture!==ke){if(ke!==null&&b.has(ke)&&(M.width!==ke.image.width||M.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");g.setupDepthRenderbuffer(M)}}const ye=M.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(pe=!0);const Te=b.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Te[U])?z=Te[U][H]:z=Te[U],G=!0):M.samples>0&&g.useMultisampledRTT(M)===!1?z=b.get(M).__webglMultisampledFramebuffer:Array.isArray(Te)?z=Te[H]:z=Te,Z.copy(M.viewport),Q.copy(M.scissor),J=M.scissorTest}else Z.copy(ne).multiplyScalar(Ee).floor(),Q.copy(we).multiplyScalar(Ee).floor(),J=Ue;if(H!==0&&(z=Ql),de.bindFramebuffer(I.FRAMEBUFFER,z)&&de.drawBuffers(M,z),de.viewport(Z),de.scissor(Q),de.setScissorTest(J),G){const he=b.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,he.__webglTexture,H)}else if(pe){const he=U;for(let ye=0;ye<M.textures.length;ye++){const Te=b.get(M.textures[ye]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+ye,Te.__webglTexture,H,he)}}else if(M!==null&&H!==0){const he=b.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,he.__webglTexture,H)}k=-1},this.readRenderTargetPixels=function(M,U,H,z,G,pe,Me,he=0){if(!(M&&M.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=b.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Me!==void 0&&(ye=ye[Me]),ye){de.bindFramebuffer(I.FRAMEBUFFER,ye);try{const Te=M.textures[he],ke=Te.format,We=Te.type;if(M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+he),!dt.textureFormatReadable(ke)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!dt.textureTypeReadable(We)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-z&&H>=0&&H<=M.height-G&&I.readPixels(U,H,z,G,L.convert(ke),L.convert(We),pe)}finally{const Te=R!==null?b.get(R).__webglFramebuffer:null;de.bindFramebuffer(I.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(M,U,H,z,G,pe,Me,he=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=b.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Me!==void 0&&(ye=ye[Me]),ye)if(U>=0&&U<=M.width-z&&H>=0&&H<=M.height-G){de.bindFramebuffer(I.FRAMEBUFFER,ye);const Te=M.textures[he],ke=Te.format,We=Te.type;if(M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+he),!dt.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!dt.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ae=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ae),I.bufferData(I.PIXEL_PACK_BUFFER,pe.byteLength,I.STREAM_READ),I.readPixels(U,H,z,G,L.convert(ke),L.convert(We),0);const ot=R!==null?b.get(R).__webglFramebuffer:null;de.bindFramebuffer(I.FRAMEBUFFER,ot);const gt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await iu(I,gt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ae),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,pe),I.deleteBuffer(Ae),I.deleteSync(gt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,H=0){const z=Math.pow(2,-H),G=Math.floor(M.image.width*z),pe=Math.floor(M.image.height*z),Me=U!==null?U.x:0,he=U!==null?U.y:0;g.setTexture2D(M,0),I.copyTexSubImage2D(I.TEXTURE_2D,H,0,0,Me,he,G,pe),de.unbindTexture()};const ec=I.createFramebuffer(),tc=I.createFramebuffer();this.copyTextureToTexture=function(M,U,H=null,z=null,G=0,pe=0){let Me,he,ye,Te,ke,We,Ae,ot,gt;const pt=M.isCompressedTexture?M.mipmaps[pe]:M.image;if(H!==null)Me=H.max.x-H.min.x,he=H.max.y-H.min.y,ye=H.isBox3?H.max.z-H.min.z:1,Te=H.min.x,ke=H.min.y,We=H.isBox3?H.min.z:0;else{const _t=Math.pow(2,-G);Me=Math.floor(pt.width*_t),he=Math.floor(pt.height*_t),M.isDataArrayTexture?ye=pt.depth:M.isData3DTexture?ye=Math.floor(pt.depth*_t):ye=1,Te=0,ke=0,We=0}z!==null?(Ae=z.x,ot=z.y,gt=z.z):(Ae=0,ot=0,gt=0);const ct=L.convert(U.format),Pt=L.convert(U.type);let xe;U.isData3DTexture?(g.setTexture3D(U,0),xe=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(g.setTexture2DArray(U,0),xe=I.TEXTURE_2D_ARRAY):(g.setTexture2D(U,0),xe=I.TEXTURE_2D),de.activeTexture(I.TEXTURE0),de.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),de.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),de.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const Vt=de.getParameter(I.UNPACK_ROW_LENGTH),et=de.getParameter(I.UNPACK_IMAGE_HEIGHT),qt=de.getParameter(I.UNPACK_SKIP_PIXELS),an=de.getParameter(I.UNPACK_SKIP_ROWS),Dn=de.getParameter(I.UNPACK_SKIP_IMAGES);de.pixelStorei(I.UNPACK_ROW_LENGTH,pt.width),de.pixelStorei(I.UNPACK_IMAGE_HEIGHT,pt.height),de.pixelStorei(I.UNPACK_SKIP_PIXELS,Te),de.pixelStorei(I.UNPACK_SKIP_ROWS,ke),de.pixelStorei(I.UNPACK_SKIP_IMAGES,We);const ui=M.isDataArrayTexture||M.isData3DTexture,ut=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const _t=b.get(M),In=b.get(U),ft=b.get(_t.__renderTarget),Un=b.get(In.__renderTarget);de.bindFramebuffer(I.READ_FRAMEBUFFER,ft.__webglFramebuffer),de.bindFramebuffer(I.DRAW_FRAMEBUFFER,Un.__webglFramebuffer);for(let di=0;di<ye;di++)ui&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,b.get(M).__webglTexture,G,We+di),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,b.get(U).__webglTexture,pe,gt+di)),I.blitFramebuffer(Te,ke,Me,he,Ae,ot,Me,he,I.DEPTH_BUFFER_BIT,I.NEAREST);de.bindFramebuffer(I.READ_FRAMEBUFFER,null),de.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(G!==0||M.isRenderTargetTexture||b.has(M)){const _t=b.get(M),In=b.get(U);de.bindFramebuffer(I.READ_FRAMEBUFFER,ec),de.bindFramebuffer(I.DRAW_FRAMEBUFFER,tc);for(let ft=0;ft<ye;ft++)ui?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,_t.__webglTexture,G,We+ft):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,_t.__webglTexture,G),ut?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,In.__webglTexture,pe,gt+ft):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,In.__webglTexture,pe),G!==0?I.blitFramebuffer(Te,ke,Me,he,Ae,ot,Me,he,I.COLOR_BUFFER_BIT,I.NEAREST):ut?I.copyTexSubImage3D(xe,pe,Ae,ot,gt+ft,Te,ke,Me,he):I.copyTexSubImage2D(xe,pe,Ae,ot,Te,ke,Me,he);de.bindFramebuffer(I.READ_FRAMEBUFFER,null),de.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ut?M.isDataTexture||M.isData3DTexture?I.texSubImage3D(xe,pe,Ae,ot,gt,Me,he,ye,ct,Pt,pt.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(xe,pe,Ae,ot,gt,Me,he,ye,ct,pt.data):I.texSubImage3D(xe,pe,Ae,ot,gt,Me,he,ye,ct,Pt,pt):M.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,pe,Ae,ot,Me,he,ct,Pt,pt.data):M.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,pe,Ae,ot,pt.width,pt.height,ct,pt.data):I.texSubImage2D(I.TEXTURE_2D,pe,Ae,ot,Me,he,ct,Pt,pt);de.pixelStorei(I.UNPACK_ROW_LENGTH,Vt),de.pixelStorei(I.UNPACK_IMAGE_HEIGHT,et),de.pixelStorei(I.UNPACK_SKIP_PIXELS,qt),de.pixelStorei(I.UNPACK_SKIP_ROWS,an),de.pixelStorei(I.UNPACK_SKIP_IMAGES,Dn),pe===0&&U.generateMipmaps&&I.generateMipmap(xe),de.unbindTexture()},this.initRenderTarget=function(M){b.get(M).__webglFramebuffer===void 0&&g.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?g.setTextureCube(M,0):M.isData3DTexture?g.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?g.setTexture2DArray(M,0):g.setTexture2D(M,0),de.unbindTexture()},this.resetState=function(){q=0,W=0,R=null,de.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const km={key:0,class:"artifact-hint"},zm=Ft({__name:"HeroArtifact",props:{projects:{}},setup(i){const e=i,t=sc(),n=Re(null),r=Re(null),s=Ln(),a=Re(!1),o=Re(null);let c=null,l=null,d=null,h=null,u=null;const p=new it(-2,-2);let _=[],S=[],m=[];const f=[];let v=null,y=null,E=!1,w=!1,T=0,P=-1;const x={x:-.16,y:.42},A={x:-.16,y:.42};function D(J,ue){const ge=[],Oe=Math.PI*(3-Math.sqrt(5));for(let Se=0;Se<J;Se++){const Ee=1-Se/Math.max(1,J-1)*2,Y=Math.sqrt(Math.max(0,1-Ee*Ee)),ae=Oe*Se;ge.push([Math.cos(ae)*Y*ue,Ee*ue,Math.sin(ae)*Y*ue])}return ge}function C(){if(s.value||typeof window>"u"||window.matchMedia("(pointer: coarse)").matches&&window.matchMedia("(max-width: 820px)").matches)return!1;try{const J=document.createElement("canvas");return!!(J.getContext("webgl")||J.getContext("experimental-webgl"))}catch{return!1}}function B(){const J=n.value,ue=r.value;if(!J||!ue||!C())return;const ge=Math.max(1,J.clientWidth),Oe=Math.max(1,J.clientHeight);c=new Bm({canvas:ue,alpha:!0,antialias:!0,powerPreference:"high-performance"}),c.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),c.setSize(ge,Oe,!1),c.setClearColor(0,0),l=new vu,d=new jt(48,ge/Oe,.1,100),d.position.set(0,0,9),h=new Xi,h.rotation.set(A.x,A.y,0),l.add(h);const Se=D(e.projects.length,3.1),Ee=new ka(.17,1),Y=new za(.36,18,18);f.push(Ee,Y);const ae=[],ne=[],we=[];e.projects.forEach((Pe,Xe)=>{const tt=new rt(Pe.colorHex),Ie=new kr({color:tt}),Ze=new kr({color:tt,transparent:!0,opacity:.16,blending:Is,depthWrite:!1});f.push(Ie,Ze);const Ve=new nn(Ee,Ie);Ve.position.set(Se[Xe][0],Se[Xe][1],Se[Xe][2]),Ve.userData.index=Xe;const wt=new nn(Y,Ze);wt.position.copy(Ve.position),h.add(Ve),h.add(wt),ae.push(Ve),ne.push(wt),we.push({project:Pe,cur:0})}),_=ae,S=ne,m=we;const Ue=new Dl({color:6514417,transparent:!0,opacity:.22});f.push(Ue);const Ce=[];Se.forEach((Pe,Xe)=>{const Ie=Se.map((Ze,Ve)=>Xe===Ve?1/0:Math.hypot(Pe[0]-Ze[0],Pe[1]-Ze[1],Pe[2]-Ze[2])).map((Ze,Ve)=>[Ze,Ve]).sort((Ze,Ve)=>Ze[0]-Ve[0]);for(let Ze=0;Ze<2;Ze++){const Ve=Ie[Ze][1];Ve>Xe&&Ce.push(Pe[0],Pe[1],Pe[2],Se[Ve][0],Se[Ve][1],Se[Ve][2])}});const lt=new Xt;lt.setAttribute("position",new At(Ce,3)),f.push(lt),h.add(new Pu(lt,Ue)),u=new Gu,T=performance.now(),a.value=!0,new URLSearchParams(window.location.search).get("probe")==="1"&&(J.__getNodes=()=>_.map((Pe,Xe)=>{const tt=Pe.getWorldPosition(new F).project(d),Ie=J.getBoundingClientRect();return{x:Ie.left+(tt.x*.5+.5)*Ie.width,y:Ie.top+(-tt.y*.5+.5)*Ie.height,slug:m[Xe].project.slug}})),y=new IntersectionObserver(Pe=>{E=Pe[0]?.isIntersecting??!1,E&&v===null?q():!E&&v!==null&&W()},{threshold:.02}),y.observe(J),window.addEventListener("resize",k,{passive:!0}),window.addEventListener("pointermove",V,{passive:!0}),J.addEventListener("click",Q),J.addEventListener("pointerleave",Z),E=!0,q()}function q(){w||v!==null||(v=requestAnimationFrame(R))}function W(){v!==null&&(cancelAnimationFrame(v),v=null)}function R(){if(w||(v=requestAnimationFrame(R),!E||!c||!l||!d||!h))return;const J=performance.now(),ue=Math.min((J-T)/1100,1);A.x+=(x.x-A.x)*.05,A.y+=(x.y-A.y)*.05,h.rotation.x=A.x,h.rotation.y=A.y;const ge=Math.max(1,window.innerHeight),Oe=Math.min(window.scrollY/ge,1);d.position.z=9-Oe*2.6,d.lookAt(0,0,0);for(let Se=0;Se<_.length;Se++){const Ee=Se*.05,Y=Math.max(0,Math.min(1,(ue-Ee)/Math.max(1e-4,1-Ee))),ae=1-Math.pow(1-Y,3),ne=Se===P?1.5:1;m[Se].cur+=(ne-m[Se].cur)*.15;const we=Math.max(1e-4,ae*m[Se].cur);_[Se].scale.setScalar(we),S[Se].scale.setScalar(we*(Se===P?1.3:1)),S[Se].material.opacity=(Se===P?.32:.16)*ae}if(u&&d){u.setFromCamera(p,d);const Se=u.intersectObjects(_,!1),Ee=Se.length?Se[0].object.userData.index:-1;if(Ee!==P&&(P=Ee,n.value&&(n.value.style.cursor=Ee>=0?"pointer":"")),Ee>=0){const Y=_[Ee].getWorldPosition(new F).project(d),ae=n.value.getBoundingClientRect();o.value={title:m[Ee].project.titleZh,color:m[Ee].project.colorHex,x:(Y.x*.5+.5)*ae.width,y:(-Y.y*.5+.5)*ae.height}}else o.value&&(o.value=null)}c.render(l,d)}function k(){if(!c||!d||!n.value)return;const J=Math.max(1,n.value.clientWidth),ue=Math.max(1,n.value.clientHeight);c.setSize(J,ue,!1),d.aspect=J/ue,d.updateProjectionMatrix()}function V(J){const ue=n.value;if(!ue)return;const ge=ue.getBoundingClientRect();p.x=(J.clientX-ge.left)/ge.width*2-1,p.y=-((J.clientY-ge.top)/ge.height)*2+1;const Oe=J.clientX/window.innerWidth-.5,Se=J.clientY/window.innerHeight-.5;x.y=.42+Oe*.7,x.x=-.16+Se*.5}function Z(){p.set(-2,-2),x.x=-.16,x.y=.42}function Q(){if(!u||!d||P<0)return;u.setFromCamera(p,d);const J=u.intersectObjects(_,!1);if(J.length){const ue=J[0].object.userData.index;t.push("/projects/"+m[ue].project.slug)}}return rn(()=>{B()}),xn(()=>{w=!0,W(),y?.disconnect(),y=null,window.removeEventListener("resize",k),window.removeEventListener("pointermove",V),n.value?.removeEventListener("click",Q),n.value?.removeEventListener("pointerleave",Z),f.forEach(J=>{try{J.dispose()}catch{}}),f.length=0,c?.dispose(),c=null,l=null,d=null,h=null,_=[],S=[],m=[]}),(J,ue)=>{const ge=cl;return De(),Ge("div",{ref_key:"rootRef",ref:n,class:Hr(["hero-artifact",{"is-3d":a.value}]),role:"img","aria-label":"9 个硬件项目组成的 3D 星座图，悬停或点击节点可进入对应项目"},[Qe(ge,{projects:i.projects,class:"poster"},null,8,["projects"]),N("canvas",{ref_key:"canvasRef",ref:r,class:"canvas"},null,512),Qe(eo,{name:"tip"},{default:Rt(()=>[o.value?(De(),Ge("div",{key:0,class:"artifact-tooltip",style:Ye({left:o.value.x+"px",top:o.value.y+"px"})},[N("span",{class:"dot",style:Ye({background:o.value.color})},null,4),ti(" "+$e(o.value.title),1)],4)):Dr("",!0)]),_:1}),Qe(eo,{name:"hint"},{default:Rt(()=>[a.value?(De(),Ge("div",km,"移动鼠标探索 · 点击节点进入")):Dr("",!0)]),_:1})],2)}}}),Gm=li(zm,[["__scopeId","data-v-6ae69e76"]]);function Vm(i=.12){const e=typeof window<"u"?window.innerWidth/2:0,t=typeof window<"u"?window.innerHeight/2:0,n=Re(e),r=Re(t),s=Re(e),a=Re(t),o=Re(!1);let c=0,l=!1;function d(p,_,S){return p+(_-p)*S}function h(){s.value=d(s.value,n.value,i),a.value=d(a.value,r.value,i),Math.abs(s.value-n.value)>.4||Math.abs(a.value-r.value)>.4?c=requestAnimationFrame(h):(s.value=n.value,a.value=r.value,l=!1,c=0)}function u(p){o.value&&(n.value=p.clientX,r.value=p.clientY,l||(l=!0,c=requestAnimationFrame(h)))}return rn(()=>{if(typeof window>"u")return;const p=window.matchMedia("(prefers-reduced-motion: reduce)").matches,_=window.matchMedia("(pointer: coarse)").matches;o.value=!p&&!_,o.value&&(n.value=s.value=window.innerWidth/2,r.value=a.value=window.innerHeight/2,window.addEventListener("mousemove",u,{passive:!0}))}),xn(()=>{c&&cancelAnimationFrame(c),typeof window<"u"&&window.removeEventListener("mousemove",u)}),{x:s,y:a,targetX:n,targetY:r,enabled:ac(o)}}const Hm={class:"relative z-10 mx-auto w-full max-w-6xl px-6"},Wm={class:"grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center"},Xm={class:"lg:col-span-7 text-left"},qm={class:"mt-6 flex items-center justify-center gap-7 lg:justify-start"},Ym={class:"flex items-baseline gap-2"},$m={class:"text-3xl font-bold tabular-nums font-mono tracking-tight text-text-primary"},jm=Ft({__name:"HeroSection",setup(i){xt.registerPlugin(to);const e=["从零开始","亲手打造 9 个真实硬件项目"],t=Re(null),n=Re(null),r=Re(null),s=Re(null),a=Re(null),o=Re(null),c=Re(null),l=Re(null),d=Re(null),h=Re(null),u=Re(null),p=Re(null),_=Re(null),S=Re(null),m=Re(null),f=Re(null),v=lc({projects:0});let y=null;const E=Re({x:0,y:0}),w=Ln(),{x:T,y:P,enabled:x}=Vm(.12);function A(W){if(!p.value||w.value)return;const R=p.value.getBoundingClientRect(),k=R.left+R.width/2,V=R.top+R.height/2;E.value.x=(W.clientX-k)*.25,E.value.y=(W.clientY-V)*.25,xt.to(p.value,{x:E.value.x,y:E.value.y,duration:.4,ease:"power2.out"})}function D(){!p.value||w.value||xt.to(p.value,{x:0,y:0,duration:.6,ease:"elastic.out(1, 0.4)"})}function C(W){if(!_.value||!p.value||w.value)return;const R=p.value.getBoundingClientRect(),k=W.clientX-R.left,V=W.clientY-R.top,Z=Math.max(R.width,R.height)*2,Q=document.createElement("span");Q.style.cssText=`
    position: absolute;
    left: ${k-Z/2}px;
    top: ${V-Z/2}px;
    width: ${Z}px;
    height: ${Z}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.28);
    transform: scale(0);
    pointer-events: none;
  `,_.value.appendChild(Q),xt.to(Q,{scale:1,opacity:0,duration:.6,ease:"power2.out",onComplete:()=>Q.remove()})}let B=null;rn(()=>{const W=l.value?.querySelectorAll("[data-split-line]")||[];if(w.value){xt.set([o.value,c.value,l.value,h.value,u.value,S.value].filter(Boolean),{opacity:1,y:0}),xt.set(f.value,{opacity:.3}),xt.set(m.value,{rotateX:0}),v.projects=9;return}B=xt.timeline({delay:.08,defaults:{ease:"power3.out"}}),B.from(c.value,{opacity:0,y:14,duration:.5}).from(W,{opacity:0,y:24,duration:.7,stagger:.09},"-=0.15").from(o.value,{opacity:0,y:14,duration:.5},"-=0.55").from(h.value,{opacity:0,y:16,duration:.6},"-=0.3").from(u.value,{opacity:0,y:16,duration:.6},"-=0.3").from(S.value,{y:22,duration:.7,onStart:q},"-=0.45").from(f.value,{opacity:0,duration:.8},"-=0.3");const R={trigger:t.value,start:"top top",end:"bottom top",scrub:.8};xt.to(d.value,{y:-70,opacity:0,ease:"none",scrollTrigger:{...R}}),xt.to(r.value,{y:45,ease:"none",scrollTrigger:{...R}}),xt.to(s.value,{y:70,ease:"none",scrollTrigger:{...R}}),p.value?.addEventListener("mousemove",A),p.value?.addEventListener("mouseleave",D)}),oc([T,P],()=>{if(!x.value||!t.value)return;const W=t.value.getBoundingClientRect(),R=T.value-W.left,k=P.value-W.top;a.value&&xt.set(a.value,{x:R-250,y:k-250,opacity:.08})});function q(){if(w.value){v.projects=9;return}const W=2200,R=performance.now();function k(V){const Z=Math.min((V-R)/W,1);if(Z>=1){v.projects=9;return}const Q=1-Math.pow(2,-10*Z);v.projects=Math.floor(Q*9),y=requestAnimationFrame(k)}y=requestAnimationFrame(k)}return xn(()=>{B?.kill(),y!==null&&cancelAnimationFrame(y),p.value?.removeEventListener("mousemove",A),p.value?.removeEventListener("mouseleave",D),to.getAll().forEach(W=>{W.trigger===t.value&&W.kill()})}),(W,R)=>{const k=Gm,V=cl,Z=dc;return De(),Ge("section",{ref_key:"sectionRef",ref:t,class:"relative flex min-h-screen items-center overflow-hidden"},[N("div",{ref_key:"bgLayer1",ref:n,class:"absolute inset-0 bg-background"},null,512),N("div",{ref_key:"bgLayer2",ref:r,class:"absolute inset-0",style:{background:"radial-gradient(ellipse 55% 65% at 14% 6%, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.05) 35%, transparent 60%), linear-gradient(125deg, rgba(99,102,241,0.06) 0%, transparent 45%)"}},null,512),N("div",{ref_key:"bgLayer3",ref:s,class:"absolute inset-0 opacity-[0.018]",style:{"background-image":"linear-gradient(rgba(120,130,180,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(120,130,180,0.18) 1px, transparent 1px)","background-size":"80px 80px"}},null,512),R[9]||(R[9]=N("div",{class:"ambient-orb",style:{width:"420px",height:"420px",background:"#3b82f6",top:"-90px",right:"8%",opacity:"0.05"}},null,-1)),R[10]||(R[10]=N("div",{class:"ambient-orb",style:{width:"600px",height:"600px",background:"#8b5cf6",bottom:"-200px",left:"4%",opacity:"0.045"}},null,-1)),N("div",{ref_key:"orbRef",ref:a,class:"pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full",style:{background:"radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0.04) 38%, transparent 66%)",filter:"blur(40px)",opacity:"0","will-change":"transform"}},null,512),N("div",Hm,[N("div",Wm,[N("div",Xm,[N("div",{ref_key:"logoRef",ref:o,class:"mb-8 md:mb-10"},[...R[0]||(R[0]=[N("img",{src:nc,alt:"暑期硬件实践课程",class:"h-14 md:h-20 w-auto object-contain"},null,-1)])],512),N("div",{ref_key:"eyebrowRef",ref:c,class:"mb-6"},[...R[1]||(R[1]=[N("span",{class:"eyebrow inline-flex items-center rounded-full px-4 py-1.5",style:{background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.16)"}},"2026 暑期",-1)])],512),N("div",{ref_key:"titleParallaxRef",ref:d},[N("h1",{ref_key:"titleRef",ref:l,class:"text-hero font-black tracking-tight"},[(De(),Ge(Bt,null,kt(e,(Q,J)=>N("span",{key:J,class:"hero-heading block","data-split-line":""},$e(Q),1)),64))],512)],512),N("p",{ref_key:"subtitleRef",ref:h,class:"mt-8 text-xl sm:text-2xl text-text-secondary font-normal max-w-xl leading-relaxed"}," 高中生暑期硬件实践课程 ",512),N("div",{ref_key:"ctaRef",ref:u,class:"mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5"},[N("a",{ref_key:"ctaBtnRef",ref:p,href:"#projects",onClick:C,class:"magnetic-btn cta-btn group relative inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-[15px] font-semibold text-white overflow-hidden"},[R[2]||(R[2]=N("span",{class:"relative z-10"},"查看项目",-1)),R[3]||(R[3]=N("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5","stroke-linecap":"round","stroke-linejoin":"round",class:"relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"},[N("path",{d:"m9 18 6-6-6-6"})],-1)),N("span",{ref_key:"rippleRef",ref:_,class:"pointer-events-none absolute inset-0 overflow-hidden rounded-full"},null,512)],512),R[4]||(R[4]=N("a",{href:"#value-props",class:"text-[15px] font-medium text-text-secondary/80 transition-colors duration-300 hover:text-text-primary hover:underline underline-offset-4 decoration-cool-indigo/40"}," 了解更多 ",-1))],512)]),N("div",{ref_key:"specsRef",ref:S,class:"lg:col-span-5 lg:pl-4",style:{perspective:"1000px"}},[N("div",{ref_key:"specsGridRef",ref:m,class:"relative mx-auto h-[340px] w-full sm:h-[420px] lg:h-[520px] lg:max-w-[440px]",style:{"transform-origin":"center top","will-change":"transform"}},[Qe(Z,null,{fallback:Rt(()=>[Qe(V,{projects:un(ni)},null,8,["projects"])]),default:Rt(()=>[Qe(k,{projects:un(ni)},null,8,["projects"])]),_:1})],512),N("div",qm,[N("div",Ym,[N("span",$m,$e(v.projects),1),R[5]||(R[5]=N("span",{class:"text-[11px] uppercase tracking-[0.2em] text-text-tertiary font-semibold"},"个项目节点",-1))]),R[6]||(R[6]=N("div",{class:"h-7 w-px bg-white/[0.08]"},null,-1)),R[7]||(R[7]=N("div",{class:"flex items-baseline gap-2"},[N("span",{class:"text-3xl font-bold tabular-nums font-mono tracking-tight text-text-primary"},"12–15"),N("span",{class:"text-[11px] uppercase tracking-[0.2em] text-text-tertiary font-semibold"},"天完成")],-1))])],512)])]),N("div",{ref_key:"scrollIndicatorRef",ref:f,class:"absolute bottom-10 left-1/2 -translate-x-1/2"},[...R[8]||(R[8]=[N("div",{class:"flex flex-col items-center gap-2.5"},[N("div",{class:"scroll-line h-10 w-px bg-gradient-to-b from-text-tertiary/50 to-transparent"})],-1)])],512)],512)}}}),Km={class:"overflow-hidden"},Zm={class:"overflow-hidden mt-3"},Jm=Ft({__name:"JackMarquee",setup(i){const e=Ln(),t=Re(null),n=Re(null),r=Re(null),s=ni.slice(0,5),a=ni.slice(5),o=[...s,...s,...s],c=[...a,...a,...a];let l=0,d=null,h=null;return rn(()=>{if(e.value||!t.value||!n.value||!r.value)return;let u=t.value.getBoundingClientRect().top+window.scrollY,p=!1;const _=()=>{const S=(window.scrollY-u+window.innerHeight)*.3;n.value.style.transform=`translateX(${S-200}px)`,r.value.style.transform=`translateX(${-(S-200)}px)`,p=!1};d=()=>{p||(p=!0,l=requestAnimationFrame(_))},h=()=>{t.value&&(u=t.value.getBoundingClientRect().top+window.scrollY)},window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("resize",h,{passive:!0})}),xn(()=>{d&&window.removeEventListener("scroll",d),h&&window.removeEventListener("resize",h),l&&cancelAnimationFrame(l)}),(u,p)=>{const _=fc;return De(),Ge("section",{ref_key:"sectionRef",ref:t,class:"bg-background pt-24 sm:pt-32 md:pt-40 pb-10"},[N("div",Km,[N("div",{ref_key:"row1Ref",ref:n,class:"flex gap-3 will-change-transform"},[(De(),Ge(Bt,null,kt(o,(S,m)=>N("div",{key:"r1-"+m,class:"relative w-[420px] h-[270px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/[0.06]"},[Qe(_,{project:S},null,8,["project"])])),64))],512)]),N("div",Zm,[N("div",{ref_key:"row2Ref",ref:r,class:"flex gap-3 will-change-transform"},[(De(),Ge(Bt,null,kt(c,(S,m)=>N("div",{key:"r2-"+m,class:"relative w-[420px] h-[270px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/[0.06]"},[Qe(_,{project:S},null,8,["project"])])),64))],512)])],512)}}}),Qm={key:1,class:"sb-lip-wrap"},eg={class:"sb-lip-tag"},tg={key:4,class:"sb-tight"},ng={class:"sb-tight-num font-mono"},ig={class:"sb-tight-text"},rg=Ft({__name:"SectionBridge",props:{variant:{},from:{default:"#0b0d12"},to:{default:"#11141b"},tag:{default:""},glow:{default:"rgba(99,102,241,0.16)"},number:{default:""}},setup(i){const e=i,t=Ln(),n=Re(null),r=Re(0),s=ni.map(o=>o.colorHex);let a=null;return rn(async()=>{if(e.variant!=="dots"||t.value||!n.value)return;const o=(await ii(async()=>{const{default:d}=await import("./zK29E8tH.js").then(h=>h.i);return{default:d}},__vite__mapDeps([0,1]),import.meta.url)).default,{ScrollTrigger:c}=await ii(async()=>{const{ScrollTrigger:d}=await import("./DurwJ2wh.js").then(h=>h.a);return{ScrollTrigger:d}},__vite__mapDeps([2,1]),import.meta.url);o.registerPlugin(c);const l=o.to(n.value.querySelector(".sb-dots-track"),{x:-120,ease:"none",scrollTrigger:{trigger:n.value,start:"top bottom",end:"bottom top",scrub:1}});a=()=>l.scrollTrigger?.kill()}),xn(()=>{a?.()}),(o,c)=>(De(),Ge("div",{class:Hr(["section-bridge","sb-"+i.variant]),"aria-hidden":"true"},[i.variant==="color-shift"?(De(),Ge("div",{key:0,class:"sb-colorshift",style:Ye({"--from":i.from,"--to":i.to})},null,4)):i.variant==="overlap-lip"?(De(),Ge("div",Qm,[c[0]||(c[0]=N("span",{class:"sb-lip-rule"},null,-1)),N("span",eg,$e(i.tag),1)])):i.variant==="dots"?(De(),Ge("div",{key:2,ref_key:"dotsRef",ref:n,class:"sb-dots"},[N("div",{class:"sb-dots-track",style:Ye({transform:`translateX(${r.value}px)`})},[(De(!0),Ge(Bt,null,kt(un(s),(l,d)=>(De(),Ge("span",{key:d,class:"sb-dot",style:Ye({color:l,background:l})},null,4))),128))],4)],512)):i.variant==="glow-merge"?(De(),Ge("div",{key:3,class:"sb-glow",style:Ye({"--glow":i.glow})},null,4)):i.variant==="tight"?(De(),Ge("div",tg,[N("span",ng,$e(i.number),1),c[1]||(c[1]=N("span",{class:"sb-tight-rule"},null,-1)),N("span",ig,[Wr(o.$slots,"default",{},void 0,!0)])])):Dr("",!0)],2))}}),sg=li(rg,[["__scopeId","data-v-633c199c"]]),ql=Ft({__name:"JackFadeIn",props:{tag:{default:"div"},delay:{default:0},duration:{default:.7},x:{default:0},y:{default:30}},setup(i){const e=i,t=Re(null),n=Ln();let r=null,s=null;return rn(()=>{const a=t.value;if(a){if(n.value){xt.set(a,{opacity:1,x:0,y:0});return}requestAnimationFrame(()=>{t.value&&xt.set(t.value,{opacity:0,x:e.x,y:e.y})}),r=new IntersectionObserver(([o])=>{o?.isIntersecting&&t.value&&(s=xt.to(t.value,{opacity:1,x:0,y:0,duration:e.duration,delay:e.delay,ease:"power3.out"}),r?.disconnect(),r=null)},{threshold:0,rootMargin:"0px 0px 50px 0px"}),r.observe(a)}}),xn(()=>{r?.disconnect(),r=null,s?.kill(),s=null}),(a,o)=>(De(),ri(Yi(i.tag),{ref_key:"elRef",ref:t,class:"jack-fade-in"},{default:Rt(()=>[Wr(a.$slots,"default")]),_:3},512))}}),ag=Ft({__name:"JackAnimatedText",props:{text:{},tag:{default:"p"}},setup(i){const e=i,t=Ln(),n=Re(null),r=Array.from(e.text),s=[];let a=null;return rn(()=>{const o=n.value;!o||t.value||(s.forEach(c=>{c.style.opacity="0.2"}),(async()=>{const c=(await ii(async()=>{const{default:h}=await import("./zK29E8tH.js").then(u=>u.i);return{default:h}},__vite__mapDeps([0,1]),import.meta.url)).default,{ScrollTrigger:l}=await ii(async()=>{const{ScrollTrigger:h}=await import("./DurwJ2wh.js").then(u=>u.a);return{ScrollTrigger:h}},__vite__mapDeps([2,1]),import.meta.url);c.registerPlugin(l);const d=s.length;a=l.create({trigger:o,start:"top 80%",end:"bottom 20%",scrub:!0,onUpdate:h=>{const u=h.progress;for(let p=0;p<d;p++){const _=.2+.8*Math.max(0,Math.min(1,u*d-p));s[p].style.opacity=String(_)}}})})())}),xn(()=>{a?.kill(),a=null}),(o,c)=>(De(),ri(Yi(i.tag),{ref_key:"elRef",ref:n,class:Hr(["jack-animated-text",{"is-reduced":un(t)}])},{default:Rt(()=>[(De(!0),Ge(Bt,null,kt(un(r),(l,d)=>(De(),Ge("span",{key:d,class:"jack-animated-text__char",ref_for:!0,ref:h=>{h&&(s[d]=h)}},$e(l===" "?" ":l),1))),128))]),_:1},8,["class"]))}}),og=li(ag,[["__scopeId","data-v-c2fbac7e"]]),lg=Ft({__name:"JackContactButton",props:{as:{default:"a"},to:{default:void 0},href:{default:void 0},label:{default:"Contact Me"}},setup(i){return(e,t)=>(De(),ri(Yi(i.as),{class:"jack-contact-btn",to:i.to,href:i.href},{default:Rt(()=>[Wr(e.$slots,"default",{},()=>[ti($e(i.label),1)],!0)]),_:3},8,["to","href"]))}}),cg=li(lg,[["__scopeId","data-v-0fbaebef"]]);const ug=i=>{for(const e in i)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};const ol=i=>i==="";const dg=(...i)=>i.filter((e,t,n)=>!!e&&e.trim()!==""&&n.indexOf(e)===t).join(" ").trim();const ll=i=>i.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();const fg=i=>i.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase());const hg=i=>{const e=fg(i);return e.charAt(0).toUpperCase()+e.slice(1)};var Hi={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};const pg=({name:i,iconNode:e,absoluteStrokeWidth:t,"absolute-stroke-width":n,strokeWidth:r,"stroke-width":s,size:a=Hi.width,color:o=Hi.stroke,...c},{slots:l})=>Ds("svg",{...Hi,...c,width:a,height:a,stroke:o,"stroke-width":ol(t)||ol(n)||t===!0||n===!0?Number(r||s||Hi["stroke-width"])*24/Number(a):r||s||Hi["stroke-width"],class:dg("lucide",c.class,...i?[`lucide-${ll(hg(i))}-icon`,`lucide-${ll(i)}`]:["lucide-icon"]),...!l.default&&!ug(c)&&{"aria-hidden":"true"}},[...e.map(d=>Ds(...d)),...l.default?[l.default()]:[]]);const Wn=(i,e)=>(t,{slots:n,attrs:r})=>Ds(pg,{...r,...t,iconNode:e,name:i},n);const mg=Wn("bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);const gg=Wn("circuit-board",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M11 9h4a2 2 0 0 0 2-2V3",key:"1ve2rv"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"M7 21v-4a2 2 0 0 1 2-2h4",key:"1fwkro"}],["circle",{cx:"15",cy:"15",r:"2",key:"3i40o0"}]]);const _g=Wn("code-xml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]);const Yl=Wn("cpu",[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]);const xg=Wn("presentation",[["path",{d:"M2 3h20",key:"91anmk"}],["path",{d:"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",key:"2k9sn8"}],["path",{d:"m7 21 5-5 5 5",key:"bip4we"}]]);const vg=Wn("satellite",[["path",{d:"m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5",key:"dzhfyz"}],["path",{d:"M16.5 7.5 19 5",key:"1ltcjm"}],["path",{d:"m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5",key:"nfoymv"}],["path",{d:"M9 21a6 6 0 0 0-6-6",key:"1iajcf"}],["path",{d:"M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",key:"nv9zqy"}]]);const Mg=Wn("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);const Sg=Wn("sparkles",[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]]),yg={id:"about",class:"relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"},Eg={class:"flex flex-col items-center gap-10 sm:gap-14 md:gap-16"},bg={class:"flex flex-col items-center gap-6"},Tg={class:"text-text-secondary font-medium text-center leading-relaxed max-w-[560px]",style:{"font-size":"clamp(1rem, 2vw, 1.35rem)"}},Ag={class:"mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full"},wg={class:"text-text-primary font-semibold block mb-1"},Rg={class:"text-text-tertiary text-sm leading-relaxed"},Cg="这是一个为高中生设计的暑期硬件实践课程。12–15 天，从第一次焊接到最后一次答辩，亲手打造 9 个真实开源硬件项目。不只是夏令营，是真正的工程训练。",Pg="A summer hardware practicum for high school students. In 12–15 days, from your first solder joint to your final defense, you will build 9 real open-source hardware projects hands-on. Not just a summer camp — real engineering training.",Lg=Ft({__name:"JackAbout",setup(i){const e=[{value:"9+",label:"真实项目",desc:"社区验证的开源硬件项目改编，非玩具示例",accent:"#9aa3d4"},{value:"5",label:"完整工程",desc:"大学级课程体系：提案、评分、Git 工作流",accent:"#6366f1"},{value:"∞",label:"社区支持",desc:"活跃开源社区 + 论坛资源，遇到问题不孤立",accent:"#8b5cf6"}];return(t,n)=>{const r=ql,s=og,a=cg;return De(),Ge("section",yg,[Qe(r,{tag:"div",delay:.1,x:-80,y:0,duration:.9,class:"pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]"},{default:Rt(()=>[Qe(un(Yl),{class:"w-[120px] sm:w-[160px] md:w-[210px] h-auto opacity-15 text-indigo-400/60","aria-hidden":"true"})]),_:1}),Qe(r,{tag:"div",delay:.25,x:-80,y:0,duration:.9,class:"pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]"},{default:Rt(()=>[Qe(un(gg),{class:"w-[100px] sm:w-[140px] md:w-[180px] h-auto opacity-15 text-indigo-400/60","aria-hidden":"true"})]),_:1}),Qe(r,{tag:"div",delay:.15,x:80,y:0,duration:.9,class:"pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]"},{default:Rt(()=>[Qe(un(mg),{class:"w-[120px] sm:w-[160px] md:w-[210px] h-auto opacity-15 text-indigo-400/60","aria-hidden":"true"})]),_:1}),Qe(r,{tag:"div",delay:.3,x:80,y:0,duration:.9,class:"pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]"},{default:Rt(()=>[Qe(un(vg),{class:"w-[130px] sm:w-[170px] md:w-[220px] h-auto opacity-15 text-indigo-400/60","aria-hidden":"true"})]),_:1}),Qe(r,{tag:"div",y:40,duration:.9},{default:Rt(()=>[...n[0]||(n[0]=[N("h2",{class:"hero-heading font-black uppercase tracking-tight leading-none text-center",style:{"font-size":"clamp(3rem, 12vw, 160px)"}}," 关于课程 ",-1)])]),_:1}),N("div",Eg,[N("div",bg,[N("div",Tg,[Qe(s,{text:Cg,tag:"p"})]),N("p",{class:"text-text-tertiary text-center max-w-[560px] text-sm leading-relaxed"},$e(Pg))]),Qe(a,{as:"a",href:"#contact",label:"联系我们"},{default:Rt(()=>[...n[1]||(n[1]=[ti("联系我们",-1)])]),_:1})]),N("div",Ag,[(De(),Ge(Bt,null,kt(e,(o,c)=>Qe(r,{key:c,tag:"div",delay:.1+c*.12,y:24,duration:.7},{default:Rt(()=>[N("div",{class:"glass-card rounded-2xl p-6 text-center transition-all duration-500 hover:scale-[1.02]",style:Ye({borderTop:`2px solid ${o.accent}40`})},[N("span",{class:"text-4xl md:text-5xl font-bold font-mono tracking-tight block mb-2",style:Ye({color:o.accent})},$e(o.value),5),N("span",wg,$e(o.label),1),N("span",Rg,$e(o.desc),1)],4)]),_:2},1032,["delay"])),64))])])}}}),Dg={id:"services",class:"relative z-0 bg-white text-[#0b0d12] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"},Ig={class:"max-w-5xl mx-auto relative"},Ug={class:"hidden md:flex items-start gap-8"},Ng={class:"relative flex-shrink-0 w-[70px] flex flex-col items-center"},Fg={class:"flex items-center gap-3 mb-4"},Og={class:"flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3"},Bg={class:"font-semibold text-[#0b0d12]",style:{"font-size":"clamp(1.1rem, 2vw, 1.5rem)"}},kg={class:"font-medium opacity-40",style:{"font-size":"clamp(0.75rem, 1.2vw, 0.95rem)"}},zg={class:"leading-relaxed text-[#0b0d12] opacity-60 mb-1",style:{"font-size":"clamp(0.85rem, 1.4vw, 1.1rem)"}},Gg={class:"leading-relaxed text-[#0b0d12] opacity-35 mb-5",style:{"font-size":"clamp(0.8rem, 1.2vw, 0.95rem)"}},Vg={class:"space-y-2.5"},Hg={class:"text-[#0b0d12] opacity-55",style:{"font-size":"clamp(0.8rem, 1.2vw, 0.95rem)"}},Wg={class:"md:hidden flex items-start gap-4"},Xg={class:"relative flex-shrink-0 w-[38px] flex flex-col items-center"},qg={class:"flex items-center gap-2 mb-2.5"},Yg={class:"font-semibold text-sm text-[#0b0d12] mb-1"},$g={class:"font-medium opacity-40 text-xs ml-1.5"},jg={class:"text-xs leading-relaxed text-[#0b0d12] opacity-55 mb-3"},Kg={class:"space-y-1.5"},Zg={class:"text-[11px] text-[#0b0d12] opacity-50"},Jg=Ft({__name:"JackServices",setup(i){const e=[{days:"Day 1-3",title:"项目调研与选型",titleEn:"Research & Selection",description:"研究开源项目，评估可行性，选择最适合的技术方案与硬件平台",descriptionEn:"Research open-source projects, evaluate feasibility, and select the optimal technical approach and hardware platform",color:"#6366f1",icon:Mg,bullets:["开源项目调研","可行性评估","技术方案确定"]},{days:"Day 4-6",title:"硬件搭建与调试",titleEn:"Hardware Build",description:"元器件选型、电路搭建、接线调试，让硬件跑起来",descriptionEn:"Component selection, circuit assembly, and wiring debug — get the hardware running",color:"#3b82f6",icon:Yl,bullets:["元器件选型","电路搭建","接线调试"]},{days:"Day 7-9",title:"软件开发与集成",titleEn:"Software Dev",description:"固件编写、传感器集成、模块调试，让系统联动起来",descriptionEn:"Firmware coding, sensor integration, and module debug — make the system work as a whole",color:"#8b5cf6",icon:_g,bullets:["固件编写","传感器集成","模块调试"]},{days:"Day 10-12",title:"系统优化与完善",titleEn:"System Optimize",description:"性能调优、边界测试、细节打磨，让产品稳定可靠",descriptionEn:"Performance tuning, edge-case testing, and polish — make the product stable and reliable",color:"#9aa3d4",icon:Sg,bullets:["性能调优","边界测试","细节打磨"]},{days:"Day 13-15",title:"文档撰写与展示",titleEn:"Docs & Demo",description:"技术文档、最终演示、项目答辩，完成从做到讲的全闭环",descriptionEn:"Technical documentation, final demo, and project defense — close the loop from doing to presenting",color:"#a5aceb",icon:xg,bullets:["技术文档","最终演示","项目答辩"]}];return(t,n)=>{const r=ql;return De(),Ge("section",Dg,[n[2]||(n[2]=N("h2",{class:"font-black uppercase tracking-tight text-center text-[#0b0d12] mb-16 sm:mb-20 md:mb-28",style:{"font-size":"clamp(3rem, 12vw, 160px)"}}," 课程阶段 ",-1)),N("div",Ig,[n[0]||(n[0]=N("div",{class:"hidden md:block absolute left-[35px] top-0 bottom-0 w-px",style:{background:"linear-gradient(to bottom, rgba(99,102,241,0.25), rgba(165,172,235,0.15), rgba(12,12,12,0.06))"}},null,-1)),n[1]||(n[1]=N("div",{class:"md:hidden absolute left-[19px] top-0 bottom-0 w-px",style:{background:"linear-gradient(to bottom, rgba(99,102,241,0.25), rgba(165,172,235,0.15), rgba(12,12,12,0.06))"}},null,-1)),(De(),Ge(Bt,null,kt(e,(s,a)=>N("div",{key:a,class:"relative mb-12 md:mb-16 last:mb-0"},[Qe(r,{delay:a*.12,duration:.7,y:30},{default:Rt(()=>[N("div",Ug,[N("div",Ng,[N("div",{class:"w-3.5 h-3.5 rounded-full border-[2.5px] border-white shadow-sm z-10",style:Ye({backgroundColor:s.color})},null,4),N("span",{class:"font-black font-mono leading-none mt-3 select-none",style:Ye({color:s.color,fontSize:"clamp(2rem, 4vw, 3.5rem)",opacity:.7})},$e(String(a+1).padStart(2,"0")),5)]),N("div",{class:"flex-1 min-w-0 rounded-2xl border p-6 lg:p-8 transition-all duration-300 hover:shadow-lg group",style:Ye({borderColor:s.color+"20",backgroundColor:s.color+"06","--accent":s.color})},[N("div",{class:"absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl",style:Ye({backgroundColor:s.color+"30"})},null,4),N("div",Fg,[N("span",{class:"flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110",style:Ye({backgroundColor:s.color+"15",color:s.color})},[(De(),ri(Yi(s.icon),{class:"h-5 w-5"}))],4),N("span",{class:"font-mono text-xs font-medium px-2.5 py-1 rounded-full",style:Ye({backgroundColor:s.color+"12",color:s.color})},$e(s.days),5)]),N("div",Og,[N("h3",Bg,$e(s.title),1),N("span",kg,$e(s.titleEn),1)]),N("p",zg,$e(s.description),1),N("p",Gg,$e(s.descriptionEn),1),N("div",Vg,[(De(!0),Ge(Bt,null,kt(s.bullets,o=>(De(),Ge("div",{key:o,class:"flex items-center gap-2.5"},[N("span",{class:"mt-0.5 h-2 w-2 shrink-0 rounded-full",style:Ye({backgroundColor:s.color+"40"})},null,4),N("span",Hg,$e(o),1)]))),128))])],4)]),N("div",Wg,[N("div",Xg,[N("div",{class:"w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm z-10",style:Ye({backgroundColor:s.color})},null,4),N("span",{class:"font-black font-mono leading-none mt-2 select-none",style:Ye({color:s.color,fontSize:"1.25rem",opacity:.6})},$e(String(a+1).padStart(2,"0")),5)]),N("div",{class:"flex-1 min-w-0 rounded-xl border p-4 transition-shadow duration-300",style:Ye({borderColor:s.color+"20",backgroundColor:s.color+"06"})},[N("div",qg,[N("span",{class:"flex h-7 w-7 items-center justify-center rounded-lg",style:Ye({backgroundColor:s.color+"15",color:s.color})},[(De(),ri(Yi(s.icon),{class:"h-3.5 w-3.5"}))],4),N("span",{class:"font-mono text-[10px] font-medium px-2 py-0.5 rounded-full",style:Ye({backgroundColor:s.color+"12",color:s.color})},$e(s.days),5)]),N("h3",Yg,[ti($e(s.title)+" ",1),N("span",$g,$e(s.titleEn),1)]),N("p",jg,$e(s.description),1),N("div",Kg,[(De(!0),Ge(Bt,null,kt(s.bullets,o=>(De(),Ge("div",{key:o,class:"flex items-center gap-2"},[N("span",{class:"mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full",style:Ye({backgroundColor:s.color+"40"})},null,4),N("span",Zg,$e(o),1)]))),128))])],4)])]),_:2},1032,["delay"])])),64))])])}}}),Qg=["data-glow"],e0=Ft({__name:"TiltCard",props:{maxTilt:{default:15},perspective:{default:1e3},hoverScale:{default:1.04},glareIntensity:{default:.08},duration:{default:.4},ease:{default:"power2.out"},glare:{type:Boolean,default:!0},glow:{default:"cool"}},setup(i){const e=i,t=Re(null),n=Re(null),r=Re(null),s=Ln(),a=Re(!1);let o=null,c=null;const l=e.glow==="warm"?"255,107,107":"99,102,241";function d(p){if(s.value||a.value||!t.value)return;const _=t.value.getBoundingClientRect(),S=_.left+_.width/2,m=_.top+_.height/2,f=p.clientX-S,v=p.clientY-m,y=f/(_.width/2),E=v/(_.height/2),w=.35*e.maxTilt;Math.abs(y)>=Math.abs(E)?c={rotateX:0,rotateY:-y*w}:c={rotateX:E*w,rotateY:0},o?.kill(),o=xt.to(t.value,{rotateX:c.rotateX,rotateY:c.rotateY,scale:e.hoverScale,duration:.28,ease:e.ease})}function h(p){if(!t.value||s.value||a.value)return;const _=t.value.getBoundingClientRect(),S=(p.clientX-_.left)/_.width,m=(p.clientY-_.top)/_.height,f=(.5-m)*e.maxTilt*2,v=(S-.5)*e.maxTilt*2,y=c?.3:e.duration;c=null,o?.kill(),o=xt.to(t.value,{rotateX:f,rotateY:v,duration:y,ease:e.ease}),e.glare&&r.value&&xt.to(r.value,{opacity:e.glareIntensity,background:`radial-gradient(circle at ${S*100}% ${m*100}%, rgba(${l},0.45) 0%, rgba(${l},0) 60%)`,duration:.3,ease:"power1.out"})}function u(){!t.value||s.value||a.value||(c=null,o?.kill(),o=xt.to(t.value,{rotateX:0,rotateY:0,scale:1,duration:e.duration*1.5,ease:"elastic.out(1, 0.5)"}),e.glare&&r.value&&xt.to(r.value,{opacity:0,duration:.5,ease:"power2.out"}))}return rn(()=>{typeof window<"u"&&(a.value=window.matchMedia("(pointer: coarse)").matches),t.value?.parentElement&&xt.set(t.value.parentElement,{perspective:e.perspective})}),xn(()=>{o?.kill(),o=null}),(p,_)=>(De(),Ge("div",{ref_key:"cardRef",ref:t,class:"tilt-card","data-glow":i.glow,onMouseenter:d,onMousemove:h,onMouseleave:u},[N("div",{class:"tilt-card__content",ref_key:"contentRef",ref:n},[Wr(p.$slots,"default",{},void 0,!0)],512),N("div",{class:"tilt-card__glare",ref_key:"glareRef",ref:r},null,512)],40,Qg))}}),t0=li(e0,[["__scopeId","data-v-d6131e37"]]);function n0(i,e={}){const{glow:t="cool",setAttribute:n=!0}=e,r=Re(!1);let s=!0,a=0,o=null;function c(){a=0;const u=i.value;!u||!o||(u.style.setProperty("--mx",`${o.x}px`),u.style.setProperty("--my",`${o.y}px`))}function l(u){const p=i.value;if(!p||!s)return;const _=p.getBoundingClientRect();o={x:u.clientX-_.left,y:u.clientY-_.top},a||(a=requestAnimationFrame(c))}function d(){s&&(r.value=!0)}function h(){r.value=!1,o=null}return rn(()=>{if(typeof window>"u")return;const u=window.matchMedia("(prefers-reduced-motion: reduce)").matches,p=window.matchMedia("(pointer: coarse)").matches;s=!u&&!p;const _=i.value;_&&(n&&_.setAttribute("data-glow",t),s&&(_.addEventListener("mousemove",l,{passive:!0}),_.addEventListener("mouseenter",d),_.addEventListener("mouseleave",h)))}),xn(()=>{a&&cancelAnimationFrame(a);const u=i.value;u&&(u.removeEventListener("mousemove",l),u.removeEventListener("mouseenter",d),u.removeEventListener("mouseleave",h))}),{active:r}}const i0={class:"relative aspect-[4/3] flex items-center justify-center overflow-hidden px-6 pt-6"},r0={class:"absolute top-5 left-5 z-[2]"},s0={class:"absolute top-5 right-5 z-[2]"},a0={class:"relative z-[1] flex flex-col items-center gap-3 text-center"},o0={class:"text-[12px] font-mono text-text-tertiary tracking-wider"},l0={class:"relative px-6 pb-6 pt-2"},c0={class:"text-[18px] font-semibold tracking-tight text-text-primary transition-all duration-500 group-hover:text-text-primary group-hover:-translate-y-0.5"},u0={class:"mt-1.5 text-[13px] text-text-secondary leading-relaxed line-clamp-2"},d0={class:"mt-4 flex items-center gap-5 text-[12px] text-text-tertiary bg-white/[0.02] rounded-xl px-3 py-1.5 -mx-3"},f0={class:"flex items-center gap-1.5"},h0={class:"mt-4 flex flex-wrap gap-1.5"},p0={class:"mt-5 flex items-center justify-between"},m0=Ft({__name:"ProjectCard",props:{project:{}},setup(i){const e=i,t=Re(!1),n=Re(null);n0(n,{glow:"cool"});function r(c){const l=c.replace("#",""),d=parseInt(l.slice(0,2),16),h=parseInt(l.slice(2,4),16),u=parseInt(l.slice(4,6),16);return`${d}, ${h}, ${u}`}const s=Ai(()=>({1:"#3d8b5e",2:"#3d8b5e",3:"#c9944a",4:"#ff9a76",5:"#ff6b6b"})[e.project.difficulty]||"#c9944a"),a=Ai(()=>{const c=e.project.difficulty,l=e.project.colorHex,d={1:`0 12px 40px -16px rgba(0,0,0,0.4), 0 0 0 1px ${l}40`,2:`0 12px 40px -16px rgba(0,0,0,0.4), 0 0 0 1px ${l}40`,3:`0 18px 60px -12px rgba(0,0,0,0.45), 0 0 0 1px ${l}55`,4:`0 22px 68px -14px rgba(0,0,0,0.5), 0 0 0 1px ${l}55`,5:`0 28px 80px -14px rgba(0,0,0,0.55), 0 0 0 1px ${l}55`},h={1:{maxTilt:4,duration:.32},2:{maxTilt:4,duration:.32},3:{maxTilt:6,duration:.4},4:{maxTilt:8,duration:.46},5:{maxTilt:10,duration:.5}},u=h[c]||h[3];return{maxTilt:u.maxTilt,duration:u.duration,hoverShadow:d[c]||d[3]}}),o=Ai(()=>{const c=e.project.colorHex;return`linear-gradient(160deg, ${c}22 0%, ${c}0a 35%, #0b0d12 100%)`});return(c,l)=>{const d=hc;return De(),ri(t0,{"max-tilt":a.value.maxTilt,duration:a.value.duration,glow:"cool"},{default:Rt(()=>[Qe(d,{to:`/projects/${i.project.slug}`,class:"block group"},{default:Rt(()=>[N("div",{ref_key:"cardRef",ref:n,class:"spotlight relative w-[320px] sm:w-[360px] rounded-[1.75rem] overflow-hidden transition-all duration-500",style:Ye({background:o.value,"--glow-cool":r(i.project.colorHex),boxShadow:t.value?a.value.hoverShadow:"0 2px 8px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.22)",border:"1px solid "+i.project.colorHex+"20"}),onMouseenter:l[0]||(l[0]=h=>t.value=!0),onMouseleave:l[1]||(l[1]=h=>t.value=!1)},[N("div",i0,[N("div",{class:"absolute inset-0",style:Ye({background:`linear-gradient(180deg, ${i.project.colorHex}18 0%, ${i.project.colorHex}06 50%, transparent 100%)`})},null,4),N("span",{class:"absolute font-mono font-bold leading-none select-none pointer-events-none transition-transform duration-700",style:Ye({color:i.project.colorHex,opacity:.13,fontSize:"clamp(7rem, 14vw, 10rem)",letterSpacing:"-0.06em",top:"-0.1em",right:"-0.05em",transform:t.value?"scale(1.05) translateX(2px)":"scale(1)"})},$e(i.project.id),5),N("div",r0,[N("span",{class:"inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold font-mono tracking-wide backdrop-blur-md",style:Ye({backgroundColor:`${i.project.colorHex}20`,color:i.project.colorHex})},[N("span",{class:"h-1.5 w-1.5 rounded-full",style:Ye({backgroundColor:i.project.colorHex})},null,4),ti(" P"+$e(i.project.id),1)],4)]),N("div",s0,[N("span",{class:"rounded-full px-3 py-1.5 text-[11px] font-semibold backdrop-blur-md",style:Ye({backgroundColor:`${s.value}20`,color:s.value})},$e(i.project.difficultyLabel),5)]),N("div",a0,[N("div",{class:"flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5",style:Ye({background:`linear-gradient(145deg, ${i.project.colorHex}30, ${i.project.colorHex}10)`,backdropFilter:"blur(12px)",border:`1px solid ${i.project.colorHex}20`})},[N("span",{class:"text-lg font-bold font-mono",style:Ye({color:i.project.colorHex})},$e(i.project.mcu.split("-")[0]),5)],4),N("span",o0,$e(i.project.coreTech),1)])]),N("div",l0,[N("div",{class:"absolute top-0 left-6 right-6 h-px",style:Ye({background:`linear-gradient(90deg, transparent, ${i.project.colorHex}25, transparent)`})},null,4),N("h3",c0,$e(i.project.titleZh),1),N("p",u0,$e(i.project.subtitle),1),N("div",d0,[N("span",f0,[l[2]||(l[2]=N("svg",{xmlns:"http://www.w3.org/2000/svg",width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2",class:"opacity-60"},[N("circle",{cx:"12",cy:"12",r:"10"}),N("polyline",{points:"12 6 12 12 16 14"})],-1)),ti(" "+$e(i.project.duration)+$e(i.project.durationUnit),1)])]),N("div",h0,[(De(!0),Ge(Bt,null,kt(i.project.tags.slice(0,3),h=>(De(),Ge("span",{key:h.label,class:"rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors duration-300",style:Ye({backgroundColor:`${i.project.colorHex}20`,color:i.project.colorHex,border:`1px solid ${i.project.colorHex}25`})},$e(h.label),5))),128))]),N("div",p0,[l[4]||(l[4]=N("span",{class:"text-[11px] text-text-faint transition-colors duration-300 group-hover:text-text-tertiary"},"查看详情",-1)),N("div",{class:"flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 text-text-tertiary group-hover:text-white group-hover:scale-110",style:Ye({backgroundColor:t.value?i.project.colorHex:"rgba(255,255,255,0.04)"})},[...l[3]||(l[3]=[N("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[N("path",{d:"M7 7h10v10"}),N("path",{d:"M7 17 17 7"})],-1)])],4)])])],36)]),_:1},8,["to"])]),_:1},8,["max-tilt","duration"])}}}),g0={id:"projects",class:"relative overflow-hidden bg-background"},_0={class:"relative mx-auto max-w-6xl px-6 pt-28 md:pt-40 pb-12 md:pb-16"},x0={class:"relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end"},v0={class:"md:col-span-7"},M0={class:"md:col-span-5 md:text-right"},S0={class:"mx-auto max-w-6xl px-6 pb-10 md:pb-14"},y0={class:"flex flex-wrap items-center gap-2"},E0=["onClick"],b0={class:"relative"},T0={key:0,class:"absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-cool-indigo/60 text-[12px] select-none"},A0=Ft({__name:"ProjectsSection",setup(i){const e=Re(0),t=Ai(()=>e.value===0?ni:ni.filter(h=>h.difficulty===e.value)),n=Re(null),r=Re(null),s=Re(!1),a=Re(!1),o=Re(!1),c=Ln();function l(h){n.value?.scrollBy({left:h,behavior:"smooth"})}function d(){!o.value&&n.value&&n.value.scrollLeft>10&&(o.value=!0)}return rn(async()=>{const h=(await ii(async()=>{const{default:p}=await import("./zK29E8tH.js").then(_=>_.i);return{default:p}},__vite__mapDeps([0,1]),import.meta.url)).default,{ScrollTrigger:u}=await ii(async()=>{const{ScrollTrigger:p}=await import("./DurwJ2wh.js").then(_=>_.a);return{ScrollTrigger:p}},__vite__mapDeps([2,1]),import.meta.url);if(h.registerPlugin(u),s.value=!0,c.value){a.value=!0;return}r.value&&u.create({trigger:r.value,start:"top 85%",once:!0,onEnter:()=>{a.value=!0}})}),(h,u)=>(De(),Ge("section",g0,[N("div",_0,[u[3]||(u[3]=N("span",{class:"pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono font-bold leading-none select-none text-text-primary",style:{"font-size":"clamp(8rem, 22vw, 18rem)",opacity:"0.05","letter-spacing":"-0.06em","z-index":"0",top:"-2.5rem"},"aria-hidden":"true"},"02",-1)),N("div",x0,[N("div",v0,[N("h2",{class:"text-section font-semibold tracking-tight text-text-primary",ref:"headingRef",style:Ye({opacity:s.value?1:0,transform:s.value?"translateY(0)":"translateY(24px)",transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)"})}," 选择你的项目 ",4)]),N("div",M0,[u[2]||(u[2]=N("span",{class:"inline-block mb-3 rounded-full px-3 py-1 text-[12px] font-medium",style:{background:"rgba(99,102,241,0.10)",color:"#a5aceb",border:"1px solid rgba(99,102,241,0.20)"}},"9 个项目 · 5 级难度",-1)),N("p",{class:"text-body-lg text-text-secondary",ref:"subRef",style:Ye({opacity:s.value?1:0,transform:s.value?"translateY(0)":"translateY(20px)",transition:"all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s"})}," 从入门到专家，每个都基于真实开源项目改编 ",4)])])]),N("div",S0,[N("div",y0,[(De(!0),Ge(Bt,null,kt(un(cc),p=>(De(),Ge("button",{key:p.value,onClick:_=>e.value=p.value,class:Hr(["rounded-full px-5 py-2 text-[14px] font-semibold transition-all duration-300",e.value===p.value?"text-white shadow-glow scale-105":"bg-white/[0.04] text-text-secondary hover:bg-white/[0.08] hover:text-text-primary"]),style:Ye(e.value===p.value?{background:"linear-gradient(135deg, #6366f1, #8b5cf6)",boxShadow:"inset 0 1px 1px rgba(255,255,255,0.15), 0 0 16px rgba(99,102,241,0.28)"}:{})},$e(p.label),15,E0))),128))])]),N("div",b0,[u[7]||(u[7]=N("div",{class:"pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-background to-transparent"},null,-1)),N("button",{onClick:u[0]||(u[0]=p=>l(-380)),class:"absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] text-text-secondary hover:text-text-primary hover:bg-white/[0.14] hover:border-white/[0.2] hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all duration-300","aria-label":"向左滚动"},[...u[4]||(u[4]=[N("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[N("path",{d:"m15 18-6-6 6-6"})],-1)])]),u[8]||(u[8]=N("div",{class:"pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-background to-transparent"},null,-1)),N("button",{onClick:u[1]||(u[1]=p=>l(380)),class:"absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] text-text-secondary hover:text-text-primary hover:bg-white/[0.14] hover:border-white/[0.2] hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all duration-300","aria-label":"向右滚动"},[...u[5]||(u[5]=[N("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[N("path",{d:"m9 18 6-6-6-6"})],-1)])]),o.value?Dr("",!0):(De(),Ge("div",T0,[...u[6]||(u[6]=[N("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[N("path",{d:"M5 12h14"}),N("path",{d:"m12 5 7 7-7 7"})],-1),ti(" 左右滑动浏览 ",-1)])])),N("div",{ref_key:"scrollContainer",ref:n,onScroll:d,class:"overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"},[N("div",{ref_key:"trackRef",ref:r,class:"flex gap-6 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]",style:{"min-width":"max-content"}},[(De(!0),Ge(Bt,null,kt(t.value,(p,_)=>(De(),ri(m0,{key:p.id,project:p,style:Ye({opacity:a.value?1:0,transform:a.value?"translateY(0)":"translateY(40px)",transition:`all 0.8s cubic-bezier(0.16,1,0.3,1) ${_*.08}s`})},null,8,["project","style"]))),128))],512)],544)]),u[9]||(u[9]=N("div",{class:"h-20 md:h-28"},null,-1))]))}}),w0=li(A0,[["__scopeId","data-v-d4f12ad4"]]),R0={id:"contact",class:"relative overflow-hidden py-24 md:py-36",style:{background:"linear-gradient(180deg, #0b0d12 0%, #0f1118 50%, #0b0d12 100%)"}},C0={class:"mx-auto max-w-4xl px-6"},P0={class:"relative z-10 px-8 py-20 sm:px-16 sm:py-28 md:py-32 text-center"},L0=Ft({__name:"CtaSection",setup(i){const e=Re(null),t=Re(null),n=Re(null),r=Re(null),s=Re(null),a=Re(null),o=Re(null),c=Ln();let l=null,d=null,h=!1;function u(){!l||!s.value||c.value||l.to(s.value,{scale:1.05,duration:.3,ease:"power2.out"})}function p(m){if(!l||!s.value||c.value)return;const f=s.value.getBoundingClientRect(),v=f.left+f.width/2,y=f.top+f.height/2,E=(m.clientX-v)*.25,w=(m.clientY-y)*.25;l.to(s.value,{x:E,y:w,duration:.4,ease:"power2.out"})}function _(){!l||!s.value||c.value||l.to(s.value,{x:0,y:0,scale:1,duration:.6,ease:"elastic.out(1, 0.3)"})}function S(m){if(!l||!a.value||!s.value||c.value)return;const f=s.value.getBoundingClientRect(),v=m.clientX-f.left,y=m.clientY-f.top,E=Math.max(f.width,f.height)*2,w=document.createElement("span");w.style.cssText=`
    position: absolute;
    left: ${v-E/2}px;
    top: ${y-E/2}px;
    width: ${E}px;
    height: ${E}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transform: scale(0);
    pointer-events: none;
  `,a.value.appendChild(w),l.to(w,{scale:1,opacity:0,duration:.7,ease:"power2.out",onComplete:()=>w.remove()})}return rn(async()=>{const m=(await ii(async()=>{const{default:v}=await import("./zK29E8tH.js").then(y=>y.i);return{default:v}},__vite__mapDeps([0,1]),import.meta.url)).default;l=m;const f=[t.value,n.value,r.value].filter(Boolean);if(f.length){if(c.value){m.set(f,{opacity:1,y:0});return}const v=new IntersectionObserver(y=>{y[0]?.isIntersecting&&(m.to(f,{opacity:1,y:0,duration:.9,stagger:.1,ease:"expo.out"}),v.disconnect())},{threshold:.3});e.value&&v.observe(e.value)}if(!c.value&&o.value){const v=document.getElementById("contact");d=()=>{h||(h=!0,requestAnimationFrame(()=>{if(h=!1,!o.value||!v)return;const y=v.getBoundingClientRect(),E=(y.top+y.height/2-window.innerHeight/2)*-.04,w=Math.max(-20,Math.min(20,E));o.value.style.transform=`translate(-50%, calc(-50% + ${w}px))`}))},window.addEventListener("scroll",d,{passive:!0}),d()}}),xn(()=>{l=null,d&&window.removeEventListener("scroll",d)}),(m,f)=>(De(),Ge("section",R0,[f[2]||(f[2]=N("div",{class:"pointer-events-none absolute inset-0",style:{background:"radial-gradient(ellipse 75% 55% at 50% 0%, rgba(99,102,241,0.14) 0%, transparent 60%)"}},null,-1)),N("div",{ref_key:"orbRef",ref:o,class:"pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] max-w-5xl h-[40rem]",style:{background:"radial-gradient(ellipse 50% 60% at 50% 42%, rgba(99,102,241,0.26) 0%, rgba(99,102,241,0.07) 45%, transparent 72%)",filter:"blur(48px)"}},null,512),N("div",C0,[N("div",{ref_key:"cardRef",ref:e,class:"relative rounded-[2rem] overflow-hidden glass-card"},[f[1]||(f[1]=N("div",{class:"absolute inset-x-0 top-0 h-px",style:{background:"linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)"}},null,-1)),N("div",P0,[N("h2",{ref_key:"headingRef",ref:t,class:"text-[2.5rem] md:text-[3.75rem] font-semibold tracking-[-0.04em] text-text-primary opacity-0 translate-y-8 leading-[1.05]"}," 准备好开始了吗？ ",512),N("p",{ref_key:"subRef",ref:n,class:"mx-auto mt-6 max-w-md text-body-lg text-text-secondary opacity-0 translate-y-6"}," 12–15 天，9 个真实项目，从第一次焊接到最终答辩 ",512),N("div",{ref_key:"ctaWrapperRef",ref:r,class:"mt-14 md:mt-16 opacity-0 translate-y-6"},[N("button",{ref_key:"ctaBtnRef",ref:s,onMouseenter:u,onMousemove:p,onMouseleave:_,onClick:S,class:"group cta-btn relative inline-flex items-center justify-center gap-3 rounded-full text-[16px] font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-coral/50 overflow-hidden",style:{padding:"20px 48px"}},[f[0]||(f[0]=uc('<span class="absolute inset-0 rounded-full opacity-15" style="background:linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%);"></span><span class="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 tracking-wide">立即报名</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>',3)),N("span",{ref_key:"rippleRef",ref:a,class:"pointer-events-none absolute inset-0 overflow-hidden rounded-full"},null,512)],544)],512)])],512)])]))}}),k0=Ft({__name:"index",setup(i){return pc({title:"高中生暑期硬件实践课程 — 9 个真实开源硬件项目"}),(e,t)=>{const n=ic,r=jm,s=Jm,a=sg,o=Lg,c=Jg,l=w0,d=L0,h=rc;return De(),Ge("main",null,[Qe(n),Qe(r),Qe(s),Qe(a,{variant:"overlap-lip",tag:"01 — 关于"}),Qe(o),Qe(a,{variant:"dots"}),Qe(c),Qe(a,{variant:"color-shift",from:"#ffffff",to:"#0b0d12"}),Qe(l),Qe(a,{variant:"glow-merge"}),Qe(d),Qe(h)])}}});export{k0 as default};
