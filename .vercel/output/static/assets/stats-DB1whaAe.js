import{a as e,i as t,n,o as r,r as i,s as a,u as o}from"./index--bxZvs07.js";function s(n){let r=e({warn:n?.router===void 0}),a=n?.router||r;return t(a.stores.__store,i(n,a))}function c(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=c(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function l(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=c(e))&&(r&&(r+=` `),r+=t);return r}var u=(e,t)=>{let n=Array(e.length+t.length);for(let t=0;t<e.length;t++)n[t]=e[t];for(let r=0;r<t.length;r++)n[e.length+r]=t[r];return n},d=(e,t)=>({classGroupId:e,validator:t}),f=(e=new Map,t=null,n)=>({nextPart:e,validators:t,classGroupId:n}),p=`-`,m=[],h=`arbitrary..`,g=e=>{let t=y(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:e=>{if(e.startsWith(`[`)&&e.endsWith(`]`))return v(e);let n=e.split(p);return _(n,+(n[0]===``&&n.length>1),t)},getConflictingClassGroupIds:(e,t)=>{if(t){let t=r[e],i=n[e];return t?i?u(i,t):t:i||m}return n[e]||m}}},_=(e,t,n)=>{if(e.length-t===0)return n.classGroupId;let r=e[t],i=n.nextPart.get(r);if(i){let n=_(e,t+1,i);if(n)return n}let a=n.validators;if(a===null)return;let o=t===0?e.join(p):e.slice(t).join(p),s=a.length;for(let e=0;e<s;e++){let t=a[e];if(t.validator(o))return t.classGroupId}},v=e=>e.slice(1,-1).indexOf(`:`)===-1?void 0:(()=>{let t=e.slice(1,-1),n=t.indexOf(`:`),r=t.slice(0,n);return r?h+r:void 0})(),y=e=>{let{theme:t,classGroups:n}=e;return b(n,t)},b=(e,t)=>{let n=f();for(let r in e){let i=e[r];x(i,n,r,t)}return n},x=(e,t,n,r)=>{let i=e.length;for(let a=0;a<i;a++){let i=e[a];ee(i,t,n,r)}},ee=(e,t,n,r)=>{typeof e==`string`?te(e,t,n):typeof e==`function`?S(e,t,n,r):C(e,t,n,r)},te=(e,t,n)=>{let r=e===``?t:ne(t,e);r.classGroupId=n},S=(e,t,n,r)=>{re(e)?x(e(r),t,n,r):(t.validators===null&&(t.validators=[]),t.validators.push(d(n,e)))},C=(e,t,n,r)=>{let i=Object.entries(e),a=i.length;for(let e=0;e<a;e++){let[a,o]=i[e];x(o,ne(t,a),n,r)}},ne=(e,t)=>{let n=e,r=t.split(p),i=r.length;for(let e=0;e<i;e++){let t=r[e],i=n.nextPart.get(t);i||(i=f(),n.nextPart.set(t,i)),n=i}return n},re=e=>`isThemeGetter`in e&&e.isThemeGetter===!0,w=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let t=0,n=Object.create(null),r=Object.create(null),i=(i,a)=>{n[i]=a,t++,t>e&&(t=0,r=n,n=Object.create(null))};return{get(e){let t=n[e];if(t!==void 0)return t;if((t=r[e])!==void 0)return i(e,t),t},set(e,t){e in n?n[e]=t:i(e,t)}}},T=`!`,E=`:`,D=[],O=(e,t,n,r,i)=>({modifiers:e,hasImportantModifier:t,baseClassName:n,maybePostfixModifierPosition:r,isExternal:i}),k=e=>{let{prefix:t,experimentalParseClassName:n}=e,r=e=>{let t=[],n=0,r=0,i=0,a,o=e.length;for(let s=0;s<o;s++){let o=e[s];if(n===0&&r===0){if(o===E){t.push(e.slice(i,s)),i=s+1;continue}if(o===`/`){a=s;continue}}o===`[`?n++:o===`]`?n--:o===`(`?r++:o===`)`&&r--}let s=t.length===0?e:e.slice(i),c=s,l=!1;s.endsWith(T)?(c=s.slice(0,-1),l=!0):s.startsWith(T)&&(c=s.slice(1),l=!0);let u=a&&a>i?a-i:void 0;return O(t,l,c,u)};if(t){let e=t+E,n=r;r=t=>t.startsWith(e)?n(t.slice(e.length)):O(D,!1,t,void 0,!0)}if(n){let e=r;r=t=>n({className:t,parseClassName:e})}return r},ie=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((e,n)=>{t.set(e,1e6+n)}),e=>{let n=[],r=[];for(let i=0;i<e.length;i++){let a=e[i],o=a[0]===`[`,s=t.has(a);o||s?(r.length>0&&(r.sort(),n.push(...r),r=[]),n.push(a)):r.push(a)}return r.length>0&&(r.sort(),n.push(...r)),n}},ae=e=>({cache:w(e.cacheSize),parseClassName:k(e),sortModifiers:ie(e),postfixLookupClassGroupIds:A(e),...g(e)}),A=e=>{let t=Object.create(null),n=e.postfixLookupClassGroups;if(n)for(let e=0;e<n.length;e++)t[n[e]]=!0;return t},oe=/\s+/,se=(e,t)=>{let{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:i,sortModifiers:a,postfixLookupClassGroupIds:o}=t,s=[],c=e.trim().split(oe),l=``;for(let e=c.length-1;e>=0;--e){let t=c[e],{isExternal:u,modifiers:d,hasImportantModifier:f,baseClassName:p,maybePostfixModifierPosition:m}=n(t);if(u){l=t+(l.length>0?` `+l:l);continue}let h=!!m,g;if(h){g=r(p.substring(0,m));let e=g&&o[g]?r(p):void 0;e&&e!==g&&(g=e,h=!1)}else g=r(p);if(!g){if(!h||(g=r(p),!g)){l=t+(l.length>0?` `+l:l);continue}h=!1}let _=d.length===0?``:d.length===1?d[0]:a(d).join(`:`),v=f?_+T:_,y=v+g;if(s.indexOf(y)>-1)continue;s.push(y);let b=i(g,h);for(let e=0;e<b.length;++e){let t=b[e];s.push(v+t)}l=t+(l.length>0?` `+l:l)}return l},ce=(...e)=>{let t=0,n,r,i=``;for(;t<e.length;)(n=e[t++])&&(r=j(n))&&(i&&(i+=` `),i+=r);return i},j=e=>{if(typeof e==`string`)return e;let t,n=``;for(let r=0;r<e.length;r++)e[r]&&(t=j(e[r]))&&(n&&(n+=` `),n+=t);return n},M=(e,...t)=>{let n,r,i,a,o=o=>(n=ae(t.reduce((e,t)=>t(e),e())),r=n.cache.get,i=n.cache.set,a=s,s(o)),s=e=>{let t=r(e);if(t)return t;let a=se(e,n);return i(e,a),a};return a=o,(...e)=>a(ce(...e))},N=[],P=e=>{let t=t=>t[e]||N;return t.isThemeGetter=!0,t.themeKey=e,t},F=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,le=/^\((?:(\w[\w-]*):)?(.+)\)$/i,I=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,ue=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,L=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,R=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/,de=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,z=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,B=e=>I.test(e),V=e=>!!e&&!Number.isNaN(Number(e)),H=e=>!!e&&Number.isInteger(Number(e)),fe=e=>e.endsWith(`%`)&&V(e.slice(0,-1)),U=e=>ue.test(e),pe=()=>!0,me=e=>L.test(e)&&!R.test(e),he=()=>!1,ge=e=>de.test(e),_e=e=>z.test(e),ve=e=>!W(e)&&!K(e),ye=e=>e.startsWith(`@container`)&&(e[10]===`/`&&e[11]!==void 0||e[11]===`s`&&e[16]!==void 0&&e.startsWith(`-size/`,10)||e[11]===`n`&&e[18]!==void 0&&e.startsWith(`-normal/`,10)),be=e=>q(e,Ie,he),W=e=>F.test(e),G=e=>q(e,Le,me),xe=e=>q(e,Re,V),Se=e=>q(e,Be,pe),Ce=e=>q(e,ze,he),we=e=>q(e,Pe,he),Te=e=>q(e,Fe,_e),Ee=e=>q(e,Ve,ge),K=e=>le.test(e),De=e=>J(e,Le),Oe=e=>J(e,ze),ke=e=>J(e,Pe),Ae=e=>J(e,Ie),je=e=>J(e,Fe),Me=e=>J(e,Ve,!0),Ne=e=>J(e,Be,!0),q=(e,t,n)=>{let r=F.exec(e);return r?r[1]?t(r[1]):n(r[2]):!1},J=(e,t,n=!1)=>{let r=le.exec(e);return r?r[1]?t(r[1]):n:!1},Pe=e=>e===`position`||e===`percentage`,Fe=e=>e===`image`||e===`url`,Ie=e=>e===`length`||e===`size`||e===`bg-size`,Le=e=>e===`length`,Re=e=>e===`number`,ze=e=>e===`family-name`,Be=e=>e===`number`||e===`weight`,Ve=e=>e===`shadow`,He=M(()=>{let e=P(`color`),t=P(`font`),n=P(`text`),r=P(`font-weight`),i=P(`tracking`),a=P(`leading`),o=P(`breakpoint`),s=P(`container`),c=P(`spacing`),l=P(`radius`),u=P(`shadow`),d=P(`inset-shadow`),f=P(`text-shadow`),p=P(`drop-shadow`),m=P(`blur`),h=P(`perspective`),g=P(`aspect`),_=P(`ease`),v=P(`animate`),y=()=>[`auto`,`avoid`,`all`,`avoid-page`,`page`,`left`,`right`,`column`],b=()=>[`center`,`top`,`bottom`,`left`,`right`,`top-left`,`left-top`,`top-right`,`right-top`,`bottom-right`,`right-bottom`,`bottom-left`,`left-bottom`],x=()=>[...b(),K,W],ee=()=>[`auto`,`hidden`,`clip`,`visible`,`scroll`],te=()=>[`auto`,`contain`,`none`],S=()=>[K,W,c],C=()=>[B,`full`,`auto`,...S()],ne=()=>[H,`none`,`subgrid`,K,W],re=()=>[`auto`,{span:[`full`,H,K,W]},H,K,W],w=()=>[H,`auto`,K,W],T=()=>[`auto`,`min`,`max`,`fr`,K,W],E=()=>[`start`,`end`,`center`,`between`,`around`,`evenly`,`stretch`,`baseline`,`center-safe`,`end-safe`],D=()=>[`start`,`end`,`center`,`stretch`,`center-safe`,`end-safe`],O=()=>[`auto`,...S()],k=()=>[B,`auto`,`full`,`dvw`,`dvh`,`lvw`,`lvh`,`svw`,`svh`,`min`,`max`,`fit`,...S()],ie=()=>[s,B,`screen`,`full`,`dvw`,`lvw`,`svw`,`min`,`max`,`fit`,...S()],ae=()=>[B,`screen`,`full`,`lh`,`dvh`,`lvh`,`svh`,`min`,`max`,`fit`,...S()],A=()=>[e,K,W],oe=()=>[...b(),ke,we,{position:[K,W]}],se=()=>[`no-repeat`,{repeat:[``,`x`,`y`,`space`,`round`]}],ce=()=>[`auto`,`cover`,`contain`,Ae,be,{size:[K,W]}],j=()=>[fe,De,G],M=()=>[``,`none`,`full`,l,K,W],N=()=>[``,V,De,G],F=()=>[`solid`,`dashed`,`dotted`,`double`],le=()=>[`normal`,`multiply`,`screen`,`overlay`,`darken`,`lighten`,`color-dodge`,`color-burn`,`hard-light`,`soft-light`,`difference`,`exclusion`,`hue`,`saturation`,`color`,`luminosity`],I=()=>[V,fe,ke,we],ue=()=>[``,`none`,m,K,W],L=()=>[`none`,V,K,W],R=()=>[`none`,V,K,W],de=()=>[V,K,W],z=()=>[B,`full`,...S()];return{cacheSize:500,theme:{animate:[`spin`,`ping`,`pulse`,`bounce`],aspect:[`video`],blur:[U],breakpoint:[U],color:[pe],container:[U],"drop-shadow":[U],ease:[`in`,`out`,`in-out`],font:[ve],"font-weight":[`thin`,`extralight`,`light`,`normal`,`medium`,`semibold`,`bold`,`extrabold`,`black`],"inset-shadow":[U],leading:[`none`,`tight`,`snug`,`normal`,`relaxed`,`loose`],perspective:[`dramatic`,`near`,`normal`,`midrange`,`distant`,`none`],radius:[U],shadow:[U],spacing:[`px`,V],text:[U],"text-shadow":[U],tracking:[`tighter`,`tight`,`normal`,`wide`,`wider`,`widest`]},classGroups:{aspect:[{aspect:[`auto`,`square`,B,W,K,g]}],container:[`container`],"container-type":[{"@container":[``,`normal`,`size`,K,W]}],"container-named":[ye],columns:[{columns:[V,`auto`,W,K,s]}],"break-after":[{"break-after":y()}],"break-before":[{"break-before":y()}],"break-inside":[{"break-inside":[`auto`,`avoid`,`avoid-page`,`avoid-column`]}],"box-decoration":[{"box-decoration":[`slice`,`clone`]}],box:[{box:[`border`,`content`]}],display:[`block`,`inline-block`,`inline`,`flex`,`inline-flex`,`table`,`inline-table`,`table-caption`,`table-cell`,`table-column`,`table-column-group`,`table-footer-group`,`table-header-group`,`table-row-group`,`table-row`,`flow-root`,`grid`,`inline-grid`,`contents`,`list-item`,`hidden`],sr:[`sr-only`,`not-sr-only`],float:[{float:[`right`,`left`,`none`,`start`,`end`]}],clear:[{clear:[`left`,`right`,`both`,`none`,`start`,`end`]}],isolation:[`isolate`,`isolation-auto`],"object-fit":[{object:[`contain`,`cover`,`fill`,`none`,`scale-down`]}],"object-position":[{object:x()}],overflow:[{overflow:ee()}],"overflow-x":[{"overflow-x":ee()}],"overflow-y":[{"overflow-y":ee()}],overscroll:[{overscroll:te()}],"overscroll-x":[{"overscroll-x":te()}],"overscroll-y":[{"overscroll-y":te()}],position:[`static`,`fixed`,`absolute`,`relative`,`sticky`],inset:[{inset:C()}],"inset-x":[{"inset-x":C()}],"inset-y":[{"inset-y":C()}],start:[{"inset-s":C(),start:C()}],end:[{"inset-e":C(),end:C()}],"inset-bs":[{"inset-bs":C()}],"inset-be":[{"inset-be":C()}],top:[{top:C()}],right:[{right:C()}],bottom:[{bottom:C()}],left:[{left:C()}],visibility:[`visible`,`invisible`,`collapse`],z:[{z:[H,`auto`,K,W]}],basis:[{basis:[B,`full`,`auto`,s,...S()]}],"flex-direction":[{flex:[`row`,`row-reverse`,`col`,`col-reverse`]}],"flex-wrap":[{flex:[`nowrap`,`wrap`,`wrap-reverse`]}],flex:[{flex:[V,B,`auto`,`initial`,`none`,W]}],grow:[{grow:[``,V,K,W]}],shrink:[{shrink:[``,V,K,W]}],order:[{order:[H,`first`,`last`,`none`,K,W]}],"grid-cols":[{"grid-cols":ne()}],"col-start-end":[{col:re()}],"col-start":[{"col-start":w()}],"col-end":[{"col-end":w()}],"grid-rows":[{"grid-rows":ne()}],"row-start-end":[{row:re()}],"row-start":[{"row-start":w()}],"row-end":[{"row-end":w()}],"grid-flow":[{"grid-flow":[`row`,`col`,`dense`,`row-dense`,`col-dense`]}],"auto-cols":[{"auto-cols":T()}],"auto-rows":[{"auto-rows":T()}],gap:[{gap:S()}],"gap-x":[{"gap-x":S()}],"gap-y":[{"gap-y":S()}],"justify-content":[{justify:[...E(),`normal`]}],"justify-items":[{"justify-items":[...D(),`normal`]}],"justify-self":[{"justify-self":[`auto`,...D()]}],"align-content":[{content:[`normal`,...E()]}],"align-items":[{items:[...D(),{baseline:[``,`last`]}]}],"align-self":[{self:[`auto`,...D(),{baseline:[``,`last`]}]}],"place-content":[{"place-content":E()}],"place-items":[{"place-items":[...D(),`baseline`]}],"place-self":[{"place-self":[`auto`,...D()]}],p:[{p:S()}],px:[{px:S()}],py:[{py:S()}],ps:[{ps:S()}],pe:[{pe:S()}],pbs:[{pbs:S()}],pbe:[{pbe:S()}],pt:[{pt:S()}],pr:[{pr:S()}],pb:[{pb:S()}],pl:[{pl:S()}],m:[{m:O()}],mx:[{mx:O()}],my:[{my:O()}],ms:[{ms:O()}],me:[{me:O()}],mbs:[{mbs:O()}],mbe:[{mbe:O()}],mt:[{mt:O()}],mr:[{mr:O()}],mb:[{mb:O()}],ml:[{ml:O()}],"space-x":[{"space-x":S()}],"space-x-reverse":[`space-x-reverse`],"space-y":[{"space-y":S()}],"space-y-reverse":[`space-y-reverse`],size:[{size:k()}],"inline-size":[{inline:[`auto`,...ie()]}],"min-inline-size":[{"min-inline":[`auto`,...ie()]}],"max-inline-size":[{"max-inline":[`none`,...ie()]}],"block-size":[{block:[`auto`,...ae()]}],"min-block-size":[{"min-block":[`auto`,...ae()]}],"max-block-size":[{"max-block":[`none`,...ae()]}],w:[{w:[s,`screen`,...k()]}],"min-w":[{"min-w":[s,`screen`,`none`,...k()]}],"max-w":[{"max-w":[s,`screen`,`none`,`prose`,{screen:[o]},...k()]}],h:[{h:[`screen`,`lh`,...k()]}],"min-h":[{"min-h":[`screen`,`lh`,`none`,...k()]}],"max-h":[{"max-h":[`screen`,`lh`,`none`,...k()]}],"font-size":[{text:[`base`,n,De,G]}],"font-smoothing":[`antialiased`,`subpixel-antialiased`],"font-style":[`italic`,`not-italic`],"font-weight":[{font:[r,Ne,Se]}],"font-stretch":[{"font-stretch":[`ultra-condensed`,`extra-condensed`,`condensed`,`semi-condensed`,`normal`,`semi-expanded`,`expanded`,`extra-expanded`,`ultra-expanded`,fe,W]}],"font-family":[{font:[Oe,Ce,t]}],"font-features":[{"font-features":[W]}],"fvn-normal":[`normal-nums`],"fvn-ordinal":[`ordinal`],"fvn-slashed-zero":[`slashed-zero`],"fvn-figure":[`lining-nums`,`oldstyle-nums`],"fvn-spacing":[`proportional-nums`,`tabular-nums`],"fvn-fraction":[`diagonal-fractions`,`stacked-fractions`],tracking:[{tracking:[i,K,W]}],"line-clamp":[{"line-clamp":[V,`none`,K,xe]}],leading:[{leading:[`none`,a,...S()]}],"list-image":[{"list-image":[`none`,K,W]}],"list-style-position":[{list:[`inside`,`outside`]}],"list-style-type":[{list:[`disc`,`decimal`,`none`,K,W]}],"text-alignment":[{text:[`left`,`center`,`right`,`justify`,`start`,`end`]}],"placeholder-color":[{placeholder:A()}],"text-color":[{text:A()}],"text-decoration":[`underline`,`overline`,`line-through`,`no-underline`],"text-decoration-style":[{decoration:[...F(),`wavy`]}],"text-decoration-thickness":[{decoration:[V,`from-font`,`auto`,K,G]}],"text-decoration-color":[{decoration:A()}],"underline-offset":[{"underline-offset":[V,`auto`,K,W]}],"text-transform":[`uppercase`,`lowercase`,`capitalize`,`normal-case`],"text-overflow":[`truncate`,`text-ellipsis`,`text-clip`],"text-wrap":[{text:[`wrap`,`nowrap`,`balance`,`pretty`]}],indent:[{indent:S()}],"tab-size":[{tab:[H,K,W]}],"vertical-align":[{align:[`baseline`,`top`,`middle`,`bottom`,`text-top`,`text-bottom`,`sub`,`super`,K,W]}],whitespace:[{whitespace:[`normal`,`nowrap`,`pre`,`pre-line`,`pre-wrap`,`break-spaces`]}],break:[{break:[`normal`,`words`,`all`,`keep`]}],wrap:[{wrap:[`break-word`,`anywhere`,`normal`]}],hyphens:[{hyphens:[`none`,`manual`,`auto`]}],content:[{content:[`none`,K,W]}],"bg-attachment":[{bg:[`fixed`,`local`,`scroll`]}],"bg-clip":[{"bg-clip":[`border`,`padding`,`content`,`text`]}],"bg-origin":[{"bg-origin":[`border`,`padding`,`content`]}],"bg-position":[{bg:oe()}],"bg-repeat":[{bg:se()}],"bg-size":[{bg:ce()}],"bg-image":[{bg:[`none`,{linear:[{to:[`t`,`tr`,`r`,`br`,`b`,`bl`,`l`,`tl`]},H,K,W],radial:[``,K,W],conic:[``,H,K,W]},je,Te]}],"bg-color":[{bg:A()}],"gradient-from-pos":[{from:j()}],"gradient-via-pos":[{via:j()}],"gradient-to-pos":[{to:j()}],"gradient-from":[{from:A()}],"gradient-via":[{via:A()}],"gradient-to":[{to:A()}],rounded:[{rounded:M()}],"rounded-s":[{"rounded-s":M()}],"rounded-e":[{"rounded-e":M()}],"rounded-t":[{"rounded-t":M()}],"rounded-r":[{"rounded-r":M()}],"rounded-b":[{"rounded-b":M()}],"rounded-l":[{"rounded-l":M()}],"rounded-ss":[{"rounded-ss":M()}],"rounded-se":[{"rounded-se":M()}],"rounded-ee":[{"rounded-ee":M()}],"rounded-es":[{"rounded-es":M()}],"rounded-tl":[{"rounded-tl":M()}],"rounded-tr":[{"rounded-tr":M()}],"rounded-br":[{"rounded-br":M()}],"rounded-bl":[{"rounded-bl":M()}],"border-w":[{border:N()}],"border-w-x":[{"border-x":N()}],"border-w-y":[{"border-y":N()}],"border-w-s":[{"border-s":N()}],"border-w-e":[{"border-e":N()}],"border-w-bs":[{"border-bs":N()}],"border-w-be":[{"border-be":N()}],"border-w-t":[{"border-t":N()}],"border-w-r":[{"border-r":N()}],"border-w-b":[{"border-b":N()}],"border-w-l":[{"border-l":N()}],"divide-x":[{"divide-x":N()}],"divide-x-reverse":[`divide-x-reverse`],"divide-y":[{"divide-y":N()}],"divide-y-reverse":[`divide-y-reverse`],"border-style":[{border:[...F(),`hidden`,`none`]}],"divide-style":[{divide:[...F(),`hidden`,`none`]}],"border-color":[{border:A()}],"border-color-x":[{"border-x":A()}],"border-color-y":[{"border-y":A()}],"border-color-s":[{"border-s":A()}],"border-color-e":[{"border-e":A()}],"border-color-bs":[{"border-bs":A()}],"border-color-be":[{"border-be":A()}],"border-color-t":[{"border-t":A()}],"border-color-r":[{"border-r":A()}],"border-color-b":[{"border-b":A()}],"border-color-l":[{"border-l":A()}],"divide-color":[{divide:A()}],"outline-style":[{outline:[...F(),`none`,`hidden`]}],"outline-offset":[{"outline-offset":[V,K,W]}],"outline-w":[{outline:[``,V,De,G]}],"outline-color":[{outline:A()}],shadow:[{shadow:[``,`inner`,`none`,u,Me,Ee]}],"shadow-color":[{shadow:A()}],"inset-shadow":[{"inset-shadow":[`none`,d,Me,Ee]}],"inset-shadow-color":[{"inset-shadow":A()}],"ring-w":[{ring:N()}],"ring-w-inset":[`ring-inset`],"ring-color":[{ring:A()}],"ring-offset-w":[{"ring-offset":[V,G]}],"ring-offset-color":[{"ring-offset":A()}],"inset-ring-w":[{"inset-ring":N()}],"inset-ring-color":[{"inset-ring":A()}],"text-shadow":[{"text-shadow":[`none`,f,Me,Ee]}],"text-shadow-color":[{"text-shadow":A()}],opacity:[{opacity:[V,K,W]}],"mix-blend":[{"mix-blend":[...le(),`plus-darker`,`plus-lighter`]}],"bg-blend":[{"bg-blend":le()}],"mask-clip":[{"mask-clip":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]},`mask-no-clip`],"mask-composite":[{mask:[`add`,`subtract`,`intersect`,`exclude`]}],"mask-image-linear-pos":[{"mask-linear":[V]}],"mask-image-linear-from-pos":[{"mask-linear-from":I()}],"mask-image-linear-to-pos":[{"mask-linear-to":I()}],"mask-image-linear-from-color":[{"mask-linear-from":A()}],"mask-image-linear-to-color":[{"mask-linear-to":A()}],"mask-image-t-from-pos":[{"mask-t-from":I()}],"mask-image-t-to-pos":[{"mask-t-to":I()}],"mask-image-t-from-color":[{"mask-t-from":A()}],"mask-image-t-to-color":[{"mask-t-to":A()}],"mask-image-r-from-pos":[{"mask-r-from":I()}],"mask-image-r-to-pos":[{"mask-r-to":I()}],"mask-image-r-from-color":[{"mask-r-from":A()}],"mask-image-r-to-color":[{"mask-r-to":A()}],"mask-image-b-from-pos":[{"mask-b-from":I()}],"mask-image-b-to-pos":[{"mask-b-to":I()}],"mask-image-b-from-color":[{"mask-b-from":A()}],"mask-image-b-to-color":[{"mask-b-to":A()}],"mask-image-l-from-pos":[{"mask-l-from":I()}],"mask-image-l-to-pos":[{"mask-l-to":I()}],"mask-image-l-from-color":[{"mask-l-from":A()}],"mask-image-l-to-color":[{"mask-l-to":A()}],"mask-image-x-from-pos":[{"mask-x-from":I()}],"mask-image-x-to-pos":[{"mask-x-to":I()}],"mask-image-x-from-color":[{"mask-x-from":A()}],"mask-image-x-to-color":[{"mask-x-to":A()}],"mask-image-y-from-pos":[{"mask-y-from":I()}],"mask-image-y-to-pos":[{"mask-y-to":I()}],"mask-image-y-from-color":[{"mask-y-from":A()}],"mask-image-y-to-color":[{"mask-y-to":A()}],"mask-image-radial":[{"mask-radial":[K,W]}],"mask-image-radial-from-pos":[{"mask-radial-from":I()}],"mask-image-radial-to-pos":[{"mask-radial-to":I()}],"mask-image-radial-from-color":[{"mask-radial-from":A()}],"mask-image-radial-to-color":[{"mask-radial-to":A()}],"mask-image-radial-shape":[{"mask-radial":[`circle`,`ellipse`]}],"mask-image-radial-size":[{"mask-radial":[{closest:[`side`,`corner`],farthest:[`side`,`corner`]}]}],"mask-image-radial-pos":[{"mask-radial-at":b()}],"mask-image-conic-pos":[{"mask-conic":[V]}],"mask-image-conic-from-pos":[{"mask-conic-from":I()}],"mask-image-conic-to-pos":[{"mask-conic-to":I()}],"mask-image-conic-from-color":[{"mask-conic-from":A()}],"mask-image-conic-to-color":[{"mask-conic-to":A()}],"mask-mode":[{mask:[`alpha`,`luminance`,`match`]}],"mask-origin":[{"mask-origin":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]}],"mask-position":[{mask:oe()}],"mask-repeat":[{mask:se()}],"mask-size":[{mask:ce()}],"mask-type":[{"mask-type":[`alpha`,`luminance`]}],"mask-image":[{mask:[`none`,K,W]}],filter:[{filter:[``,`none`,K,W]}],blur:[{blur:ue()}],brightness:[{brightness:[V,K,W]}],contrast:[{contrast:[V,K,W]}],"drop-shadow":[{"drop-shadow":[``,`none`,p,Me,Ee]}],"drop-shadow-color":[{"drop-shadow":A()}],grayscale:[{grayscale:[``,V,K,W]}],"hue-rotate":[{"hue-rotate":[V,K,W]}],invert:[{invert:[``,V,K,W]}],saturate:[{saturate:[V,K,W]}],sepia:[{sepia:[``,V,K,W]}],"backdrop-filter":[{"backdrop-filter":[``,`none`,K,W]}],"backdrop-blur":[{"backdrop-blur":ue()}],"backdrop-brightness":[{"backdrop-brightness":[V,K,W]}],"backdrop-contrast":[{"backdrop-contrast":[V,K,W]}],"backdrop-grayscale":[{"backdrop-grayscale":[``,V,K,W]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[V,K,W]}],"backdrop-invert":[{"backdrop-invert":[``,V,K,W]}],"backdrop-opacity":[{"backdrop-opacity":[V,K,W]}],"backdrop-saturate":[{"backdrop-saturate":[V,K,W]}],"backdrop-sepia":[{"backdrop-sepia":[``,V,K,W]}],"border-collapse":[{border:[`collapse`,`separate`]}],"border-spacing":[{"border-spacing":S()}],"border-spacing-x":[{"border-spacing-x":S()}],"border-spacing-y":[{"border-spacing-y":S()}],"table-layout":[{table:[`auto`,`fixed`]}],caption:[{caption:[`top`,`bottom`]}],transition:[{transition:[``,`all`,`colors`,`opacity`,`shadow`,`transform`,`none`,K,W]}],"transition-behavior":[{transition:[`normal`,`discrete`]}],duration:[{duration:[V,`initial`,K,W]}],ease:[{ease:[`linear`,`initial`,_,K,W]}],delay:[{delay:[V,K,W]}],animate:[{animate:[`none`,v,K,W]}],backface:[{backface:[`hidden`,`visible`]}],perspective:[{perspective:[h,K,W]}],"perspective-origin":[{"perspective-origin":x()}],rotate:[{rotate:L()}],"rotate-x":[{"rotate-x":L()}],"rotate-y":[{"rotate-y":L()}],"rotate-z":[{"rotate-z":L()}],scale:[{scale:R()}],"scale-x":[{"scale-x":R()}],"scale-y":[{"scale-y":R()}],"scale-z":[{"scale-z":R()}],"scale-3d":[`scale-3d`],skew:[{skew:de()}],"skew-x":[{"skew-x":de()}],"skew-y":[{"skew-y":de()}],transform:[{transform:[K,W,``,`none`,`gpu`,`cpu`]}],"transform-origin":[{origin:x()}],"transform-style":[{transform:[`3d`,`flat`]}],translate:[{translate:z()}],"translate-x":[{"translate-x":z()}],"translate-y":[{"translate-y":z()}],"translate-z":[{"translate-z":z()}],"translate-none":[`translate-none`],zoom:[{zoom:[H,K,W]}],accent:[{accent:A()}],appearance:[{appearance:[`none`,`auto`]}],"caret-color":[{caret:A()}],"color-scheme":[{scheme:[`normal`,`dark`,`light`,`light-dark`,`only-dark`,`only-light`]}],cursor:[{cursor:[`auto`,`default`,`pointer`,`wait`,`text`,`move`,`help`,`not-allowed`,`none`,`context-menu`,`progress`,`cell`,`crosshair`,`vertical-text`,`alias`,`copy`,`no-drop`,`grab`,`grabbing`,`all-scroll`,`col-resize`,`row-resize`,`n-resize`,`e-resize`,`s-resize`,`w-resize`,`ne-resize`,`nw-resize`,`se-resize`,`sw-resize`,`ew-resize`,`ns-resize`,`nesw-resize`,`nwse-resize`,`zoom-in`,`zoom-out`,K,W]}],"field-sizing":[{"field-sizing":[`fixed`,`content`]}],"pointer-events":[{"pointer-events":[`auto`,`none`]}],resize:[{resize:[`none`,``,`y`,`x`]}],"scroll-behavior":[{scroll:[`auto`,`smooth`]}],"scrollbar-thumb-color":[{"scrollbar-thumb":A()}],"scrollbar-track-color":[{"scrollbar-track":A()}],"scrollbar-gutter":[{"scrollbar-gutter":[`auto`,`stable`,`both`]}],"scrollbar-w":[{scrollbar:[`auto`,`thin`,`none`]}],"scroll-m":[{"scroll-m":S()}],"scroll-mx":[{"scroll-mx":S()}],"scroll-my":[{"scroll-my":S()}],"scroll-ms":[{"scroll-ms":S()}],"scroll-me":[{"scroll-me":S()}],"scroll-mbs":[{"scroll-mbs":S()}],"scroll-mbe":[{"scroll-mbe":S()}],"scroll-mt":[{"scroll-mt":S()}],"scroll-mr":[{"scroll-mr":S()}],"scroll-mb":[{"scroll-mb":S()}],"scroll-ml":[{"scroll-ml":S()}],"scroll-p":[{"scroll-p":S()}],"scroll-px":[{"scroll-px":S()}],"scroll-py":[{"scroll-py":S()}],"scroll-ps":[{"scroll-ps":S()}],"scroll-pe":[{"scroll-pe":S()}],"scroll-pbs":[{"scroll-pbs":S()}],"scroll-pbe":[{"scroll-pbe":S()}],"scroll-pt":[{"scroll-pt":S()}],"scroll-pr":[{"scroll-pr":S()}],"scroll-pb":[{"scroll-pb":S()}],"scroll-pl":[{"scroll-pl":S()}],"snap-align":[{snap:[`start`,`end`,`center`,`align-none`]}],"snap-stop":[{snap:[`normal`,`always`]}],"snap-type":[{snap:[`none`,`x`,`y`,`both`]}],"snap-strictness":[{snap:[`mandatory`,`proximity`]}],touch:[{touch:[`auto`,`none`,`manipulation`]}],"touch-x":[{"touch-pan":[`x`,`left`,`right`]}],"touch-y":[{"touch-pan":[`y`,`up`,`down`]}],"touch-pz":[`touch-pinch-zoom`],select:[{select:[`none`,`text`,`all`,`auto`]}],"will-change":[{"will-change":[`auto`,`scroll`,`contents`,`transform`,K,W]}],fill:[{fill:[`none`,...A()]}],"stroke-w":[{stroke:[V,De,G,xe]}],stroke:[{stroke:[`none`,...A()]}],"forced-color-adjust":[{"forced-color-adjust":[`auto`,`none`]}]},conflictingClassGroups:{"container-named":[`container-type`],overflow:[`overflow-x`,`overflow-y`],overscroll:[`overscroll-x`,`overscroll-y`],inset:[`inset-x`,`inset-y`,`inset-bs`,`inset-be`,`start`,`end`,`top`,`right`,`bottom`,`left`],"inset-x":[`start`,`end`,`right`,`left`],"inset-y":[`inset-bs`,`inset-be`,`top`,`bottom`],flex:[`basis`,`grow`,`shrink`],gap:[`gap-x`,`gap-y`],p:[`px`,`py`,`ps`,`pe`,`pbs`,`pbe`,`pt`,`pr`,`pb`,`pl`],px:[`ps`,`pe`,`pr`,`pl`],py:[`pbs`,`pbe`,`pt`,`pb`],m:[`mx`,`my`,`ms`,`me`,`mbs`,`mbe`,`mt`,`mr`,`mb`,`ml`],mx:[`ms`,`me`,`mr`,`ml`],my:[`mbs`,`mbe`,`mt`,`mb`],size:[`w`,`h`],"font-size":[`leading`],"fvn-normal":[`fvn-ordinal`,`fvn-slashed-zero`,`fvn-figure`,`fvn-spacing`,`fvn-fraction`],"fvn-ordinal":[`fvn-normal`],"fvn-slashed-zero":[`fvn-normal`],"fvn-figure":[`fvn-normal`],"fvn-spacing":[`fvn-normal`],"fvn-fraction":[`fvn-normal`],"line-clamp":[`display`,`overflow`],rounded:[`rounded-s`,`rounded-e`,`rounded-t`,`rounded-r`,`rounded-b`,`rounded-l`,`rounded-ss`,`rounded-se`,`rounded-ee`,`rounded-es`,`rounded-tl`,`rounded-tr`,`rounded-br`,`rounded-bl`],"rounded-s":[`rounded-ss`,`rounded-es`],"rounded-e":[`rounded-se`,`rounded-ee`],"rounded-t":[`rounded-tl`,`rounded-tr`],"rounded-r":[`rounded-tr`,`rounded-br`],"rounded-b":[`rounded-br`,`rounded-bl`],"rounded-l":[`rounded-tl`,`rounded-bl`],"border-spacing":[`border-spacing-x`,`border-spacing-y`],"border-w":[`border-w-x`,`border-w-y`,`border-w-s`,`border-w-e`,`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-r`,`border-w-b`,`border-w-l`],"border-w-x":[`border-w-s`,`border-w-e`,`border-w-r`,`border-w-l`],"border-w-y":[`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-b`],"border-color":[`border-color-x`,`border-color-y`,`border-color-s`,`border-color-e`,`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-r`,`border-color-b`,`border-color-l`],"border-color-x":[`border-color-s`,`border-color-e`,`border-color-r`,`border-color-l`],"border-color-y":[`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-b`],translate:[`translate-x`,`translate-y`,`translate-none`],"translate-none":[`translate`,`translate-x`,`translate-y`,`translate-z`],"scroll-m":[`scroll-mx`,`scroll-my`,`scroll-ms`,`scroll-me`,`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mr`,`scroll-mb`,`scroll-ml`],"scroll-mx":[`scroll-ms`,`scroll-me`,`scroll-mr`,`scroll-ml`],"scroll-my":[`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mb`],"scroll-p":[`scroll-px`,`scroll-py`,`scroll-ps`,`scroll-pe`,`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pr`,`scroll-pb`,`scroll-pl`],"scroll-px":[`scroll-ps`,`scroll-pe`,`scroll-pr`,`scroll-pl`],"scroll-py":[`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pb`],touch:[`touch-x`,`touch-y`,`touch-pz`],"touch-x":[`touch`],"touch-y":[`touch`],"touch-pz":[`touch`]},conflictingClassGroupModifiers:{"font-size":[`leading`]},postfixLookupClassGroups:[`container-type`],orderSensitiveModifiers:[`*`,`**`,`after`,`backdrop`,`before`,`details-content`,`file`,`first-letter`,`first-line`,`marker`,`placeholder`,`selection`]}});function Y(...e){return He(l(e))}var X=r(),Ue={human:`text-human`,"ai-assisted":`text-ai`,mixed:`text-mixed`,unknown:`text-unknown`},We={HIGH:`text-alert`,MEDIUM:`text-brass`,LOW:`text-muted`,INFO:`text-muted`};function Ge({label:e}){return(0,X.jsxs)(`span`,{className:Y(`inline-flex items-center gap-1.5 font-mono text-xs`,Ue[e]),children:[(0,X.jsx)(`span`,{className:`size-1.5 rounded-full bg-current`,"aria-hidden":!0}),e]})}function Ke({severity:e}){return(0,X.jsx)(`span`,{className:Y(`font-mono text-xs`,We[e]),children:e})}function qe({children:e,className:t}){return(0,X.jsx)(`section`,{className:Y(`rounded-lg border border-line bg-surface p-4`,t),children:e})}function Je({children:e,className:t}){return(0,X.jsx)(`p`,{className:Y(`font-mono text-xs tracking-widest text-brass uppercase`,t),children:e})}var Ye={HIGH:0,MEDIUM:1,LOW:2,INFO:3};function Xe({findings:e}){if(e.length===0)return(0,X.jsx)(`p`,{className:`text-sm text-muted`,children:`No findings on the lines this patch added.`});let t=[...e].sort((e,t)=>Ye[e.severity]-Ye[t.severity]);return(0,X.jsx)(`ul`,{className:`flex flex-col gap-3`,children:t.map((e,t)=>(0,X.jsxs)(`li`,{className:`border-b border-line pb-3 last:border-b-0`,children:[(0,X.jsxs)(`div`,{className:`flex flex-wrap items-baseline gap-x-3 gap-y-1`,children:[(0,X.jsx)(Ke,{severity:e.severity}),(0,X.jsx)(`span`,{className:`font-mono text-xs text-fg`,children:e.ruleId}),(0,X.jsxs)(`span`,{className:`font-mono text-xs text-muted`,children:[e.file||`patch`,e.line?`:${e.line}`:``]})]}),(0,X.jsx)(`p`,{className:`mt-1 text-sm`,children:e.message})]},`${e.ruleId}-${e.file}-${e.line}-${t}`))})}function Ze({diff:e}){let t=e.split(`
`),n=t.length>160,r=n?t.slice(0,160):t;return(0,X.jsxs)(`div`,{className:`overflow-hidden rounded-lg border border-line`,children:[(0,X.jsx)(`pre`,{className:`max-h-96 overflow-auto p-3 font-mono text-xs leading-5`,children:r.map((e,t)=>{let n=e.startsWith(`+`)&&!e.startsWith(`+++`)?`text-human`:e.startsWith(`-`)&&!e.startsWith(`---`)?`text-alert`:e.startsWith(`@@`)?`text-brass`:`text-muted`;return(0,X.jsx)(`div`,{className:n,children:e||` `},`${t}-${e.slice(0,12)}`)})}),n?(0,X.jsx)(`p`,{className:`border-t border-line px-3 py-2 text-xs text-muted`,children:`Truncated to 160 lines.`}):null]})}function Qe({label:e,value:t,hint:n}){return(0,X.jsxs)(`div`,{className:`rounded-lg border border-line bg-surface px-3 py-3`,children:[(0,X.jsx)(`p`,{className:`font-mono text-xs text-muted`,children:e}),(0,X.jsx)(`p`,{className:`mt-1 font-mono text-2xl tabular-nums text-fg`,children:t}),n?(0,X.jsx)(`p`,{className:`mt-1 text-xs text-muted`,children:n}):null]})}var $e=o(a(),1),et=[`human`,`ai-assisted`,`mixed`,`unknown`],tt=[`vendor/**`,`node_modules/**`,`dist/**`,`build/**`,`**/*.min.js`,`**/*.min.css`,`**/*.{png,jpg,jpeg,gif,webp,pyc,whl}`],nt=[`**/test_*.py`,`**/*_test.py`,`**/*Test.java`,`**/*.spec.ts`,`**/tests/**`,`**/test/**`],rt=`patchgauge-model-v1`,Z={raterId:`researcher`,threshold:10,analyzedAt:`2026-09-06T10:30:00.000Z`,replayCount:0,labels:{}},Q=Z,it=new Set;function at(){for(let e of it)e()}function ot(){try{localStorage.setItem(rt,JSON.stringify(Q))}catch{}}function st(e){return e===`human`||e===`ai-assisted`||e===`mixed`||e===`unknown`}function ct(e){if(!e||typeof e!=`object`)return Z;let t=e,n=typeof t.threshold==`number`&&t.threshold>=1&&t.threshold<=50?Math.round(t.threshold):Z.threshold,r=typeof t.raterId==`string`&&t.raterId.trim()?t.raterId.trim().slice(0,40):Z.raterId,i=typeof t.analyzedAt==`string`?t.analyzedAt:Z.analyzedAt,a=typeof t.replayCount==`number`&&t.replayCount>=0?Math.floor(t.replayCount):0,o={};if(t.labels&&typeof t.labels==`object`)for(let[e,n]of Object.entries(t.labels)){if(!n||typeof n!=`object`)continue;let t=n.label;if(!st(t))continue;let r=n.notes;o[e]={label:t,notes:typeof r==`string`?r.slice(0,500):``}}return{raterId:r,threshold:n,analyzedAt:i,replayCount:a,labels:o}}var lt=!1;function ut(){if(!(lt||typeof localStorage>`u`)){lt=!0;try{let e=localStorage.getItem(rt);if(!e)return;Q=ct(JSON.parse(e)),at()}catch{}}}function dt(e){Q=e,ot(),at()}function ft(){return Q}function pt(e){return it.add(e),()=>it.delete(e)}function mt(){return(0,$e.useSyncExternalStore)(pt,ft,()=>Z)}function ht(e,t,n){dt({...Q,labels:{...Q.labels,[e]:{label:t,notes:n.slice(0,500)}}})}function gt(e){dt({...Q,raterId:e.slice(0,40)})}function _t(e){Number.isFinite(e)&&dt({...Q,threshold:Math.min(50,Math.max(1,Math.round(e)))})}function vt(){dt({...Q,replayCount:Q.replayCount+1,analyzedAt:new Date().toISOString()})}function yt(e){let t={...Q.labels};for(let n of e)t[n.id]={label:n.label,notes:n.notes.slice(0,500)};dt({...Q,labels:t})}function bt(){Q={...Z,labels:{}};try{localStorage.removeItem(rt)}catch{}at()}var xt=[{to:`/`,label:`Study`},{to:`/patches`,label:`Patches`},{to:`/compare`,label:`Compare`},{to:`/workbench`,label:`Bench`},{to:`/export`,label:`Export`}];function St(){return(0,X.jsxs)(`svg`,{viewBox:`0 0 32 32`,className:`size-8 shrink-0`,"aria-hidden":`true`,children:[(0,X.jsx)(`rect`,{width:`32`,height:`32`,rx:`6`,className:`fill-surface-2`}),(0,X.jsx)(`path`,{d:`M6 22a10 10 0 0 1 20 0`,className:`stroke-brass`,fill:`none`,strokeWidth:`2`}),(0,X.jsx)(`path`,{d:`M16 22 23 11`,className:`stroke-fg`,fill:`none`,strokeWidth:`1.6`,strokeLinecap:`round`}),(0,X.jsx)(`circle`,{cx:`16`,cy:`22`,r:`1.7`,className:`fill-brass`})]})}function Ct({children:e}){let t=s({select:e=>e.location.pathname});return(0,$e.useEffect)(()=>{ut()},[]),(0,X.jsxs)(`div`,{className:`min-h-screen bg-bg text-fg`,children:[(0,X.jsx)(`header`,{className:`border-b border-line`,children:(0,X.jsxs)(`div`,{className:`mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4`,children:[(0,X.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,X.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,X.jsx)(St,{}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`p`,{className:`font-mono text-sm tracking-wide`,children:`PatchGauge`}),(0,X.jsx)(`p`,{className:`font-mono text-xs text-muted`,children:`Research instrument · model 1.0`})]})]}),(0,X.jsxs)(`div`,{className:`text-right`,children:[(0,X.jsx)(`p`,{className:`font-mono text-xs text-brass`,children:`fixture-py-2026`}),(0,X.jsx)(`p`,{className:`text-xs text-muted`,children:`Python · offline replay`})]})]}),(0,X.jsx)(`nav`,{className:`-mx-4 flex gap-1 overflow-x-auto px-4`,"aria-label":`Sections`,children:xt.map(e=>{let r=e.to===`/`?t===`/`:t===e.to||t.startsWith(`${e.to}/`);return(0,X.jsx)(n,{to:e.to,"aria-current":r?`page`:void 0,className:Y(`inline-flex min-h-11 shrink-0 items-center rounded-md px-3 font-mono text-xs tracking-wide`,r?`bg-surface-2 text-fg`:`text-muted`),children:e.label},e.to)})})]})}),(0,X.jsx)(`main`,{className:`mx-auto w-full max-w-6xl px-4 py-6`,children:e})]})}var wt=3;function Tt(e){return e===``?[]:e.split(`
`)}function Et(e){return e.replace(/'''[\s\S]*?'''|"""[\s\S]*?"""|'(?:\\.|[^'\n])*'|"(?:\\.|[^"\n])*"/g,`''`)}function Dt(e){return/(^|\/)(vendor|node_modules|dist|build)\//.test(e)||/\.min\.(js|css)$/.test(e)||/\.(png|jpg|jpeg|gif|webp|pyc|whl|so|dll)$/.test(e)}function Ot(e){let t=e.split(`/`).pop()??e;return/^test_.*\.py$/.test(t)||/_test\.py$/.test(t)||/Test\.java$/.test(t)||/\.spec\.ts$/.test(t)||/(^|\/)tests?\//.test(e)}function kt(e){if(e.includes(`\0`))return`binary or NUL byte`;let t=Et(e),n=0,r=0,i=0;for(let e of t)if(e===`(`?n+=1:e===`)`?--n:e===`[`?r+=1:e===`]`?--r:e===`{`?i+=1:e===`}`&&--i,n<0||r<0||i<0)return`unbalanced brackets`;if(n!==0||r!==0||i!==0)return`unbalanced brackets`;for(let t of e.split(`
`))if(/^\s*def\s+/.test(t)&&!/:\s*(#.*)?$/.test(t))return`def is missing a colon`;return null}function At(e){let t=Et(e).replace(/#.*$/gm,``),n=1,r=/\b(if|elif|for|while|except|and|or|case)\b/g;for(;r.exec(t);)n+=1;return n}function jt(e){let t=e.split(`
`),n=[];return t.forEach((e,t)=>{let r=e.match(/^(\s*)def\s+([A-Za-z_]\w*)\s*\(/);r&&/:\s*(#.*)?$/.test(e)&&n.push({name:r[2],indent:r[1].length,start:t})}),n.map(e=>{let n=t.length-1;for(let r=e.start+1;r<t.length;r+=1)if(!(t[r].trim()===``||t[r].trim().startsWith(`#`))&&(t[r].match(/^ */)?.[0].length??0)<=e.indent){n=r-1;break}return{name:e.name,start:e.start+1,end:n+1,text:t.slice(e.start,n+1).join(`
`)}})}function Mt(e){let t=e.split(`
`),n=[];for(let e=0;e<t.length;e+=1){if(!/^\s*except\b.*:\s*(#.*)?$/.test(t[e]))continue;let r=t[e].match(/^ */)?.[0].length??0,i=[],a=e+1;for(;a<t.length;)if(t[a].trim()===``)i.push(t[a]),a+=1;else{if((t[a].match(/^ */)?.[0].length??0)<=r)break;i.push(t[a]),a+=1}let o=i.map(e=>e.trim()).filter(Boolean);(o.length===0||o.every(e=>e===`pass`||e===`...`||e.startsWith(`#`)))&&n.push(e+1)}return n}function Nt(e,t,n){let r=Tt(t),i=Tt(n),a=r.length,o=i.length,s=Array.from({length:a+1},()=>Array(o+1).fill(0));for(let e=a-1;e>=0;--e)for(let t=o-1;t>=0;--t)s[e][t]=r[e]===i[t]?s[e+1][t+1]+1:Math.max(s[e+1][t],s[e][t+1]);let c=[],l=new Set,u=0,d=0;for(;u<a&&d<o;)r[u]===i[d]?(c.push({t:` `,line:r[u],bLine:d+1}),u+=1,d+=1):s[u+1][d]>=s[u][d+1]?(c.push({t:`-`,line:r[u]}),u+=1):(c.push({t:`+`,line:i[d],bLine:d+1}),l.add(d+1),d+=1);for(;u<a;)c.push({t:`-`,line:r[u]}),u+=1;for(;d<o;)c.push({t:`+`,line:i[d],bLine:d+1}),l.add(d+1),d+=1;let f=c.filter(e=>e.t===`+`).length,p=c.filter(e=>e.t===`-`).length;if(f===0&&p===0)return{text:`--- a/${e}\n+++ b/${e}\n(no textual change)`,additions:f,deletions:p,hunks:0,addedLineNos:l};let m=c.map(()=>!1);c.forEach((e,t)=>{if(e.t!==` `)for(let e=Math.max(0,t-wt);e<=Math.min(c.length-1,t+wt);e+=1)m[e]=!0});let h=[],g=1,_=1,v=0;for(;v<c.length;){if(!m[v]){c[v].t!==`+`&&(g+=1),c[v].t!==`-`&&(_+=1),v+=1;continue}let e={oldStart:g,newStart:_,lines:[]};for(;v<c.length&&m[v];)e.lines.push(`${c[v].t}${c[v].line}`),c[v].t!==`+`&&(g+=1),c[v].t!==`-`&&(_+=1),v+=1;h.push(e)}return{text:`--- a/${e}\n+++ b/${e}\n${h.map(e=>{let t=e.lines.filter(e=>!e.startsWith(`+`)).length,n=e.lines.filter(e=>!e.startsWith(`-`)).length;return`@@ -${t===0?0:e.oldStart},${t} +${n===0?0:e.newStart},${n} @@\n${e.lines.join(`
`)}`}).join(`
`)}`,additions:f,deletions:p,hunks:h.length,addedLineNos:l}}function Pt(e){let t=e.trim();if(!t||t.startsWith(`#`))return[];let n=Et(e),r=[];return/\beval\s*\(/.test(n)&&r.push({ruleId:`PGSEC001`,severity:`HIGH`,message:`eval() on a dynamic string can execute attacker-controlled code.`}),/\bexec\s*\(/.test(n)&&r.push({ruleId:`PGSEC002`,severity:`HIGH`,message:`exec() runs a dynamic string as code.`}),/pickle\.loads\s*\(/.test(n)&&r.push({ruleId:`PGSEC003`,severity:`HIGH`,message:`pickle.loads can execute arbitrary code from its input.`}),/yaml\.load\s*\(/.test(n)&&!/SafeLoader|safe_load/.test(n)&&r.push({ruleId:`PGSEC004`,severity:`HIGH`,message:`yaml.load without SafeLoader can construct unexpected objects.`}),/shell\s*=\s*True/.test(n)&&r.push({ruleId:`PGSEC005`,severity:`HIGH`,message:`subprocess with shell=True is open to command injection.`}),/(?:password|secret|api_key|apikey|token)\s*=\s*["'][^"']{6,}["']/i.test(e)&&!/os\.environ|getenv/.test(e)&&r.push({ruleId:`PGSEC006`,severity:`HIGH`,message:`Possible hardcoded secret assigned in source.`}),(/(execute|executemany)\s*\(\s*f["']/.test(e)||/\b(SELECT|INSERT|UPDATE|DELETE)\b/.test(e)&&/f["']/.test(e)&&/\{/.test(e))&&r.push({ruleId:`PGSEC007`,severity:`HIGH`,message:`SQL is built with an f-string. Bind parameters instead.`}),/verify\s*=\s*False/.test(n)&&r.push({ruleId:`PGSEC008`,severity:`MEDIUM`,message:`TLS verification is disabled (verify=False).`}),/hashlib\.(md5|sha1)\s*\(/.test(n)&&r.push({ruleId:`PGSEC009`,severity:`MEDIUM`,message:`MD5 or SHA1 is used. Weak where a cryptographic guarantee is needed; may be a false positive for cache keys.`}),/requests\.(get|post|put|patch|delete)\s*\(/.test(n)&&!/timeout\s*=/.test(n)&&r.push({ruleId:`PGSEC010`,severity:`LOW`,message:`HTTP call has no explicit timeout.`}),/tempfile\.mktemp\s*\(/.test(n)&&r.push({ruleId:`PGSEC011`,severity:`MEDIUM`,message:`tempfile.mktemp is insecure. Use mkstemp.`}),r}function Ft(e,t){let n=[],r=[],i=[],a=[],o=[],s=0,c=0,l=0,u=0,d=0,f=0,p=!1,m=[];for(let h of e){let e=Nt(h.path,h.before,h.after);if(o.push(`diff --git a/${h.path} b/${h.path}\n${e.text}`),l+=e.hunks,Ot(h.path)&&h.before!==h.after&&(p=!0),Dt(h.path)){i.push(h.path);continue}s+=e.additions,c+=e.deletions;let g=Tt(h.after),_=[];for(let t of e.addedLineNos){let e=g[t-1]??``;_.push(e),/\b(TODO|FIXME)\b/.test(e)&&(u+=1,n.push({analyser:`quality`,severity:`INFO`,ruleId:`PGQA-TODO`,file:h.path,line:t,message:`TODO or FIXME introduced by the patch.`}));for(let r of Pt(e))n.push({analyser:`security`,severity:r.severity,ruleId:r.ruleId,file:h.path,line:t,message:r.message})}let v=new Map;for(let e of _){let t=e.trim();t.length<12||t.startsWith(`#`)||v.set(t,(v.get(t)??0)+1)}for(let e of v.values())e>=4&&(f+=1);let y=kt(h.after);if(y&&/\.py$/.test(h.path))r.push({file:h.path,message:y}),n.push({analyser:`quality`,severity:`INFO`,ruleId:`PGQA-PARSE`,file:h.path,line:null,message:`Could not parse ${h.path}: ${y}. Complexity was skipped for this file.`});else if(/\.py$/.test(h.path)){for(let t of Mt(h.after))e.addedLineNos.has(t)&&(d+=1,n.push({analyser:`quality`,severity:`LOW`,ruleId:`PGQA-EXCEPT`,file:h.path,line:t,message:`Empty except block introduced by the patch (pass, ellipsis, or no body).`}));for(let r of jt(h.after)){let i=!1;for(let t=r.start;t<=r.end;t+=1)if(e.addedLineNos.has(t)){i=!0;break}if(!i)continue;let o=At(r.text);m.push(o),o>t&&(a.push({name:r.name,file:h.path,complexity:o}),n.push({analyser:`quality`,severity:`MEDIUM`,ruleId:`PGQA-CC`,file:h.path,line:r.start,message:`${r.name} has cyclomatic complexity ${o}, above the threshold of ${t}.`}))}}}f>0&&n.push({analyser:`quality`,severity:`LOW`,ruleId:`PGQA-REPEAT`,file:``,line:null,message:`${f} repeated identical added line${f===1?``:`s`} (4 or more copies).`});let h=n.filter(e=>e.analyser===`security`).length,g=n.filter(e=>e.severity===`HIGH`).length,_=m.length===0?null:m.reduce((e,t)=>e+t,0)/m.length,v=m.length===0?null:Math.max(...m),y=r.length===0,b=[{name:`quality-heuristic`,status:y?`ok`:`error`,detail:y?`${m.length} functions measured`:r.map(e=>e.message).join(`; `)},{name:`security-heuristic`,status:`ok`,detail:`${h} findings on added lines`},{name:`test-presence`,status:`ok`,detail:p?`test file changed`:`no test file changed`}];return{linesAdded:s,linesDeleted:c,filesTouched:e.length,hunks:l,functionsMeasured:m.length,meanComplexity:_,maxComplexity:v,complexFunctions:a,todoFixme:u,emptyExcept:d,repeatedBlocks:f,securityFindings:h,highSeverity:g,findingsPerThousand:s===0?null:h*1e3/s,hasTestChange:p,parseErrors:r,ignoredFiles:i,findings:n,diff:o.join(`
`),state:r.length>0?`partial`:`complete`,analysers:b}}function It(e,t){return Ft(e.files,t)}function Lt(e){let t=e.replace(/\r\n/g,`
`);if(!/(^|\n)(\+\+\+|diff |@@ )/.test(t))return null;let n=[],r={file:null},i=e=>{if(r.file&&r.file.path===e)return r.file;let t={path:e,before:[],after:[]};return n.push(t),r.file=t,t};for(let e of t.split(`
`)){if(e.startsWith(`diff `)||e.startsWith(`index `)||e.startsWith(`@@`)||e.startsWith(`--- `)){let t=e.match(/^diff --git a\/(.+?) b\/(.+)$/);t&&i(t[2]);continue}if(e.startsWith(`+++ `)){let t=e.slice(4).trim();i(t===`/dev/null`?r.file?.path??`deleted`:t.replace(/^b\//,``));continue}let t=r.file;if(t){if(e.startsWith(`+`))t.after.push(e.slice(1));else if(e.startsWith(`-`))t.before.push(e.slice(1));else if(e.startsWith(`\\`))continue;else{let n=e.startsWith(` `)?e.slice(1):e;t.before.push(n),t.after.push(n)}}}return n.length===0?null:n.map(e=>({path:e.path,before:e.before.join(`
`),after:e.after.join(`
`)}))}function Rt(e){let t=e.replace(/^\n/,``).replace(/\s+$/,``).split(`
`),n=t.filter(e=>e.trim().length>0).map(e=>e.match(/^ */)?.[0].length??0),r=n.length?Math.min(...n):0;return t.map(e=>e.trim().length===0?``:e.slice(r)).join(`
`)}function $(e){return e.map(([e,t,n])=>({path:e,before:Rt(t),after:Rt(n)}))}var zt={id:`fixture-py-2026`,title:`AI-assisted vs human patches (Python pilot)`,creator:`student researcher`,createdAt:`2026-09-06T09:00:00.000Z`,language:`python`,dateWindow:[`2026-01-01`,`2026-08-31`],sampleCap:200,notes:`Bundled offline-replay fixture. Metrics are computed in the browser from these diffs.`,toolVersion:`1.0.0-model`,analysers:[{name:`quality-heuristic`,version:`1.0.0`},{name:`security-heuristic`,version:`1.0.0`},{name:`test-presence`,version:`1.0.0`}]},Bt=[`cache hit: github/pulls for 6 public repositories (offline replay of cache/)`,`accepted public repositories in owner/name form`,`filter: language=python, date window 2026-01-01..2026-08-31, files touched 1..12`,`skipped acme/internal-billing — private or inaccessible (HTTP 404)`,`sample cap 200 not reached; stored 23 pull requests`,`collection log written; a later audit can read it without the network`],Vt=[{id:`harbor--auth-helpers--184`,repo:`harbor/auth-helpers`,source:`pr`,externalId:`184`,title:`Compare tokens in constant time`,author:`mira`,createdAt:`2026-02-03T11:12:00.000Z`,seedLabel:`human`,seedNotes:`Author describes a review comment about == on secrets. Test added.`,rater2:`human`,files:$([[`auth_helpers/tokens.py`,`
        def tokens_match(given, expected):
            return given == expected
        `,`
        import hmac


        def tokens_match(given: str, expected: str) -> bool:
            if not given or not expected:
                return False
            return hmac.compare_digest(given.encode(), expected.encode())
        `],[`tests/test_tokens.py`,``,`
        from auth_helpers.tokens import tokens_match


        def test_mismatch():
            assert tokens_match("a", "b") is False


        def test_match():
            assert tokens_match("same", "same") is True
        `]])},{id:`harbor--auth-helpers--191`,repo:`harbor/auth-helpers`,source:`pr`,externalId:`191`,title:`Add an admin token fallback`,author:`devpatil`,createdAt:`2026-02-18T08:04:00.000Z`,seedLabel:`ai-assisted`,seedNotes:`PR body says the snippet was drafted with Copilot and then lightly edited.`,rater2:`mixed`,hint:`PR body mentions Copilot.`,files:$([[`auth_helpers/fallback.py`,`
        import os


        def admin_token() -> str:
            return os.environ["ADMIN_TOKEN"]
        `,`
        import os


        def admin_token() -> str:
            api_key = "sk-live-please-rotate"
            return os.environ.get("ADMIN_TOKEN", api_key)
        `]])},{id:`harbor--auth-helpers--203`,repo:`harbor/auth-helpers`,source:`pr`,externalId:`203`,title:`Split session expiry into a helper`,author:`sora`,createdAt:`2026-03-02T15:40:00.000Z`,seedLabel:`mixed`,seedNotes:`Refactor looks hand-written. The TODO reads like an assistant leftover.`,rater2:`human`,files:$([[`auth_helpers/session.py`,`
        def session_open(now: int, exp: int) -> bool:
            return now < exp
        `,`
        def session_open(now: int, exp: int, skew: int = 30) -> bool:
            # TODO: confirm the skew default with the auth reviewer
            if exp <= 0:
                return False
            return now + skew < exp
        `],[`tests/test_session.py`,``,`
        from auth_helpers.session import session_open


        def test_expired():
            assert session_open(100, 90) is False
        `]])},{id:`kiln--config-kit--42`,repo:`kiln/config-kit`,source:`pr`,externalId:`42`,title:`Read typed environment values`,author:`nayak`,createdAt:`2026-01-21T09:18:00.000Z`,seedLabel:`human`,seedNotes:`Small parser with a test. No assistant mention.`,rater2:`human`,files:$([[`configkit/env.py`,`
        import os
        `,`
        import os


        def read_int(name: str, default: int) -> int:
            raw = os.environ.get(name)
            if raw is None or raw == "":
                return default
            return int(raw)
        `],[`tests/test_env.py`,``,`
        from configkit.env import read_int


        def test_default_when_missing(monkeypatch):
            monkeypatch.delenv("PORT", raising=False)
            assert read_int("PORT", 8000) == 8000
        `]])},{id:`kiln--config-kit--55`,repo:`kiln/config-kit`,source:`pr`,externalId:`55`,title:`Load YAML config and evaluate expressions`,author:`leung`,createdAt:`2026-03-11T12:01:00.000Z`,seedLabel:`ai-assisted`,seedNotes:`Commit message: 'chatgpt wrote the loader, I only renamed the function'.`,rater2:`ai-assisted`,hint:`Commit message mentions ChatGPT.`,files:$([[`configkit/load.py`,`
        def load_settings(text: str) -> dict:
            return {"raw": text}
        `,`
        import yaml


        def load_settings(text: str) -> dict:
            data = yaml.load(text)
            expr = data.get("expr")
            if expr:
                data["value"] = eval(expr, {}, {})
            return data
        `]])},{id:`kiln--config-kit--61`,repo:`kiln/config-kit`,source:`pr`,externalId:`61`,title:`Clarify the loader comment`,author:`berg`,createdAt:`2026-03-19T16:22:00.000Z`,seedLabel:`unknown`,seedNotes:`Comment-only. No provenance signal either way.`,rater2:`unknown`,files:$([[`configkit/load.py`,`
        # read settings from a string
        def load_settings(text: str) -> dict:
            return {"raw": text}
        `,`
        # Read settings from a caller-supplied string. Does not touch the network.
        def load_settings(text: str) -> dict:
            return {"raw": text}
        `]])},{id:`northwind--ledger-core--310`,repo:`northwind/ledger-core`,source:`pr`,externalId:`310`,title:`Round invoice totals half away from zero`,author:`okonkwo`,createdAt:`2026-04-02T10:11:00.000Z`,seedLabel:`human`,seedNotes:`Decimal change with a regression test. Review thread is ordinary.`,rater2:`human`,files:$([[`ledger/money.py`,`
        def round_total(value: float) -> int:
            return int(value)
        `,`
        from decimal import Decimal, ROUND_HALF_UP


        def round_total(value: str) -> Decimal:
            amount = Decimal(value)
            if amount.is_nan():
                raise ValueError("amount is not a number")
            return amount.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        `],[`tests/test_money.py`,``,`
        from ledger.money import round_total


        def test_half_up():
            assert str(round_total("1.225")) == "1.23"
        `]])},{id:`northwind--ledger-core--318`,repo:`northwind/ledger-core`,source:`pr`,externalId:`318`,title:`Look up an invoice by id`,author:`iqubal`,createdAt:`2026-04-09T13:47:00.000Z`,seedLabel:`ai-assisted`,seedNotes:`Cursor transcript linked in the PR. Query is interpolated.`,rater2:`human`,hint:`PR links a Cursor transcript.`,files:$([[`ledger/queries.py`,`
        def find_invoice(cur, invoice_id: str):
            return cur.execute("SELECT id FROM invoices WHERE id = ?", (invoice_id,))
        `,`
        def find_invoice(cur, invoice_id: str):
            query = f"SELECT * FROM invoices WHERE id = '{invoice_id}'"
            return cur.execute(query)
        `]])},{id:`northwind--ledger-core--322`,repo:`northwind/ledger-core`,source:`pr`,externalId:`322`,title:`Extract a tax label helper`,author:`mira`,createdAt:`2026-04-16T07:33:00.000Z`,seedLabel:`human`,seedNotes:`Mechanical extract. No new branches beyond the old code.`,files:$([[`ledger/tax.py`,`
        def format_row(rate: float) -> str:
            return "tax:" + str(rate)
        `,`
        def tax_label(rate: float) -> str:
            return "tax:" + format(rate, ".2f")


        def format_row(rate: float) -> str:
            return tax_label(rate)
        `]])},{id:`northwind--ledger-core--330`,repo:`northwind/ledger-core`,source:`pr`,externalId:`330`,title:`Classify ledger rows for the export feed`,author:`devpatil`,createdAt:`2026-05-01T18:05:00.000Z`,seedLabel:`ai-assisted`,seedNotes:`Large generated function. Author says Claude drafted classify_row.`,rater2:`mixed`,hint:`PR body says Claude drafted the classifier.`,files:$([[`ledger/classify.py`,`
        def classify_row(row):
            return "ok"
        `,`
        def classify_row(row):
            # FIXME: this nest was generated and not simplified
            if row.status == "open" and row.total > 0:
                if row.region == "east" or row.region == "west":
                    for item in row.lines:
                        if item.qty > 10 and item.qty < 100:
                            while item.qty > 10:
                                if item.qty % 2 == 0 or item.flag:
                                    item.qty -= 1
                                else:
                                    item.qty -= 2
                        elif item.qty >= 100 and item.taxable:
                            item.note = "review"
                elif row.region == "north":
                    if row.rush or row.manual:
                        return "hold"
            elif row.status == "draft":
                if row.owner == "ops" or row.total == 0:
                    return "skip"
            return "ok"


        def emit_audit(row, audit):
            audit.append({"status": "ok", "source": "generated", "row": row.id})
            audit.append({"status": "ok", "source": "generated", "row": row.id})
            audit.append({"status": "ok", "source": "generated", "row": row.id})
            audit.append({"status": "ok", "source": "generated", "row": row.id})
        `]])},{id:`papertrail--logfmt--77`,repo:`papertrail/logfmt`,source:`pr`,externalId:`77`,title:`Unescape quoted log values`,author:`sora`,createdAt:`2026-02-27T06:50:00.000Z`,seedLabel:`human`,seedNotes:`Bugfix plus a unit test. Diff is short.`,rater2:`human`,files:$([[`logfmt/parse.py`,`
        def unescape(value: str) -> str:
            return value
        `,`
        def unescape(value: str) -> str:
            if "\\\\" not in value and '\\"' not in value:
                return value
            return value.replace("\\\\", "\\").replace('\\"', '"')
        `],[`tests/test_parse.py`,``,`
        from logfmt.parse import unescape


        def test_quotes():
            assert unescape('a\\\\"b') == 'a"b'
        `]])},{id:`papertrail--logfmt--88`,repo:`papertrail/logfmt`,source:`pr`,externalId:`88`,title:`Tail a log file from the reader`,author:`leung`,createdAt:`2026-05-14T11:26:00.000Z`,seedLabel:`ai-assisted`,seedNotes:`Copilot suggestion committed with the shell flag left on.`,rater2:`ai-assisted`,hint:`PR body mentions Copilot.`,files:$([[`logfmt/tail.py`,`
        def tail_file(path: str) -> str:
            with open(path) as handle:
                return handle.read()[-2000:]
        `,`
        import subprocess


        def tail_file(path: str) -> str:
            return subprocess.check_output(f"tail -n 50 {path}", shell=True, text=True)
        `]])},{id:`papertrail--logfmt--90`,repo:`papertrail/logfmt`,source:`pr`,externalId:`90`,title:`Cache parsed records between runs`,author:`nayak`,createdAt:`2026-05-20T09:14:00.000Z`,seedLabel:`mixed`,seedNotes:`Cache idea is the author's. The pickle call matches an assistant snippet they pasted.`,rater2:`ai-assisted`,files:$([[`logfmt/cache.py`,`
        def load_cache(blob: bytes) -> dict:
            return {}
        `,`
        import pickle


        def load_cache(blob: bytes) -> dict:
            if not blob:
                return {}
            return pickle.loads(blob)
        `]])},{id:`acme--httpx-utils--12`,repo:`acme/httpx-utils`,source:`pr`,externalId:`12`,title:`Set a timeout on status fetches`,author:`berg`,createdAt:`2026-01-15T14:02:00.000Z`,seedLabel:`human`,seedNotes:`Adds the timeout the reviewer asked for. No assistant mention.`,rater2:`human`,files:$([[`httpx_utils/status.py`,`
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url)
            return response.status_code
        `,`
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url, timeout=5)
            return response.status_code
        `]])},{id:`acme--httpx-utils--19`,repo:`acme/httpx-utils`,source:`pr`,externalId:`19`,title:`Allow insecure status checks`,author:`iqubal`,createdAt:`2026-06-02T17:44:00.000Z`,seedLabel:`ai-assisted`,seedNotes:`Description contains the phrase 'generated by' an assistant.`,rater2:`ai-assisted`,hint:`PR body contains “generated by”.`,files:$([[`httpx_utils/status.py`,`
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url, timeout=5)
            return response.status_code
        `,`
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url, verify=False)
            return response.status_code
        `]])},{id:`acme--httpx-utils--21`,repo:`acme/httpx-utils`,source:`pr`,externalId:`21`,title:`Add a bounded retry and a weak etag`,author:`okonkwo`,createdAt:`2026-06-08T08:19:00.000Z`,seedLabel:`human`,seedNotes:`Hand-written retry. MD5 is a cache key, not a password — expect a medium smell.`,rater2:`human`,files:$([[`httpx_utils/retry.py`,`
        import requests


        def fetch_once(url: str) -> int:
            response = requests.get(url, timeout=5)
            return response.status_code
        `,`
        import hashlib
        import time

        import requests


        def etag_for(body: bytes) -> str:
            return hashlib.md5(body).hexdigest()


        def fetch_with_retry(url: str, attempts: int = 3) -> int:
            last = 0
            for _ in range(attempts):
                response = requests.get(url, timeout=5)
                last = response.status_code
                if last < 500:
                    return last
                time.sleep(0.2)
            return last
        `]])},{id:`fieldnote--csv-clean--8`,repo:`fieldnote/csv-clean`,source:`pr`,externalId:`8`,title:`Drop NUL bytes before parsing`,author:`mira`,createdAt:`2026-03-28T12:36:00.000Z`,seedLabel:`human`,seedNotes:`Defensive cleaner with a test. Ordinary review.`,files:$([[`csv_clean/rows.py`,`
        def clean_cell(value: str) -> str:
            return value.strip()
        `,`
        def clean_cell(value: str) -> str:
            if "\\0" in value:
                value = value.replace("\\0", "")
            return value.strip()
        `],[`tests/test_rows.py`,``,`
        from csv_clean.rows import clean_cell


        def test_nul():
            assert clean_cell("a\\0b") == "ab"
        `]])},{id:`fieldnote--csv-clean--14`,repo:`fieldnote/csv-clean`,source:`pr`,externalId:`14`,title:`Evaluate a user formula column`,author:`devpatil`,createdAt:`2026-06-19T19:08:00.000Z`,seedLabel:`ai-assisted`,seedNotes:`ChatGPT transcript pasted under the fold of the PR.`,rater2:`ai-assisted`,hint:`PR body mentions ChatGPT.`,files:$([[`csv_clean/formula.py`,`
        def apply_formula(row: dict, expr: str):
            return row.get("value")
        `,`
        def apply_formula(row: dict, expr: str):
            if not expr:
                return None
            return eval(expr, {}, row)
        `]])},{id:`fieldnote--csv-clean--16`,repo:`fieldnote/csv-clean`,source:`pr`,externalId:`16`,title:`Rename the cleaner entry point`,author:`berg`,createdAt:`2026-07-01T10:27:00.000Z`,seedLabel:`unknown`,seedNotes:`Rename only. A reviewer guessed an assistant; the author did not confirm.`,rater2:`ai-assisted`,hint:`Reviewer guessed an assistant. Not confirmed — do not auto-label.`,files:$([[`csv_clean/rows.py`,`
        def clean_cell(value: str) -> str:
            return value.strip()
        `,`
        def clean_row_cell(value: str) -> str:
            return value.strip()
        `]])},{id:`fieldnote--csv-clean--20`,repo:`fieldnote/csv-clean`,source:`pr`,externalId:`20`,title:`Keep going when a row fails`,author:`leung`,createdAt:`2026-07-12T21:16:00.000Z`,seedLabel:`ai-assisted`,seedNotes:`Cursor tab-complete. Swallows errors and hashes the password with MD5.`,rater2:`mixed`,hint:`PR body mentions Cursor.`,files:$([[`csv_clean/safe.py`,`
        import json


        def load_row(raw: str) -> dict:
            return json.loads(raw)
        `,`
        import hashlib
        import json


        def pin(password: str) -> str:
            return hashlib.md5(password.encode()).hexdigest()


        def load_row(raw: str) -> dict:
            try:
                return json.loads(raw)
            except Exception:
                pass
            return {}
        `]])},{id:`harbor--auth-helpers--210`,repo:`harbor/auth-helpers`,source:`pr`,externalId:`210`,title:`Reject expired session windows`,author:`nayak`,createdAt:`2026-07-22T05:41:00.000Z`,seedLabel:`human`,seedNotes:`Boundary check only. No assistant language in the thread.`,files:$([[`auth_helpers/window.py`,`
        def inside(now: int, start: int, end: int) -> bool:
            return start <= now <= end
        `,`
        def inside(now: int, start: int, end: int) -> bool:
            if end < start:
                return False
            return start <= now <= end
        `]])},{id:`papertrail--logfmt--99`,repo:`papertrail/logfmt`,source:`pr`,externalId:`99`,title:`Streaming decoder draft`,author:`sora`,createdAt:`2026-08-03T13:55:00.000Z`,seedLabel:`human`,seedNotes:`Left unfinished on purpose. The quality analyser should record a parse error and continue.`,files:$([[`logfmt/stream.py`,`
        def decode(chunk: str) -> str:
            return chunk
        `,`
        def broken(
            value = (
            return value
        `]])},{id:`acme--httpx-utils--30`,repo:`acme/httpx-utils`,source:`pr`,externalId:`30`,title:`Refresh the vendored helper`,author:`okonkwo`,createdAt:`2026-08-18T09:09:00.000Z`,seedLabel:`human`,seedNotes:`Only a vendored minified file changes. The ignore list should drop it from line metrics.`,files:$([[`vendor/legacy.min.js`,`
        /*! v1.0 */ function v(){return 1}
        `,`
        /*! v1.1 */ function v(){return 2}
        `]])}];function Ht(e,t){return`${e}#${t}`}function Ut(){let e=mt();return{study:e,analyses:(0,$e.useMemo)(()=>{let t=new Map;for(let n of Vt)t.set(n.id,It(n,e.threshold));return t},[e.threshold])}}function Wt(e){if(e.length===0)return{count:0,mean:null,median:null,min:null,max:null};let t=[...e].sort((e,t)=>e-t),n=Math.floor(t.length/2),r=t.length%2==1?t[n]:(t[n-1]+t[n])/2;return{count:e.length,mean:e.reduce((e,t)=>e+t,0)/e.length,median:r,min:t[0],max:t[t.length-1]}}function Gt(e){let t=e<0?-1:1,n=Math.abs(e)/Math.SQRT2,r=1/(1+.3275911*n);return .5*(1+t*(1-((((1.061405429*r-1.453152027)*r+1.421413741)*r-.284496736)*r+.254829592)*r*Math.exp(-n*n)))}function Kt(e,t){let n=e.length,r=t.length;if(n<3||r<3)return null;let i=[...e.map(e=>({v:e,g:0})),...t.map(e=>({v:e,g:1}))].sort((e,t)=>e.v-t.v),a=Array(i.length),o=0,s=0;for(;s<i.length;){let e=s;for(;e<i.length&&i[e].v===i[s].v;)e+=1;let t=e-s,n=(s+1+e)/2;for(let t=s;t<e;t+=1)a[t]=n;t>1&&(o+=t*t*t-t),s=e}let c=0;for(let e=0;e<i.length;e+=1)i[e].g===0&&(c+=a[e]);let l=c-n*(n+1)/2,u=n*r-l,d=n+r,f=Math.sqrt(n*r*(d+1-o/(d*(d-1)))/12);if(!Number.isFinite(f)||f===0)return{n1:n,n2:r,u:Math.min(l,u),z:0,p:1};let p=(Math.abs(l-n*r/2)-.5)/f,m=Math.min(1,Math.max(0,2*(1-Gt(p))));return{n1:n,n2:r,u:Math.min(l,u),z:p,p:m}}function qt(e){if(e.length===0)return null;let t=Array.from(new Set(e.flatMap(e=>[e.a,e.b]))),n=e.length,r=new Map;for(let e of t)r.set(e,new Map(t.map(e=>[e,0])));let i=0;for(let t of e)r.get(t.a).set(t.b,(r.get(t.a).get(t.b)??0)+1),t.a===t.b&&(i+=1);let a=i/n,o=0;for(let e of t){let i=0,a=0;for(let n of t)i+=r.get(e).get(n)??0,a+=r.get(n).get(e)??0;o+=i/n*(a/n)}let s=o===1?1:(a-o)/(1-o);return{n,agree:i,po:a,kappa:s}}function Jt(e){let t=Math.abs(e);return t<.2?`slight`:t<.4?`fair`:t<.6?`moderate`:t<.8?`substantial`:`almost perfect`}function Yt(e,t){let n=t.labels[e.id];return n?{label:n.label,notes:n.notes,edited:!0}:{label:e.seedLabel,notes:e.seedNotes,edited:!1}}function Xt(e,t=2){return e===null||Number.isNaN(e)?`—`:e.toFixed(t)}function Zt(e){return e<.001?`< 0.001`:e.toFixed(3)}function Qt(e,t,n){return e.map(e=>{let r=Yt(e,n);return{patch:e,metrics:t.get(e.id),label:r.label,notes:r.notes,edited:r.edited}})}export{qe as A,tt as C,Je as D,Ze as E,Y as M,l as N,Xe as O,_t as S,nt as T,yt as _,Jt as a,ht as b,Wt as c,zt as d,Vt as f,Ct as g,Lt as h,Qt as i,Qe as j,Ge as k,Ut as l,Ft as m,Xt as n,Yt as o,Ht as p,Zt as r,Kt as s,qt as t,Bt as u,vt as v,et as w,gt as x,bt as y};