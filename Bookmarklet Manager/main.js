(function () {

console.log("%cMSTaums v4 loaded", "font-size:20px;font-weight:bold;color:#8a5cff");
console.log("%cby T.E.D.A", "font-size:13px;font-weight:bold;color:#44aaa4");
console.log("%cThank you for using it!!!", "font-size:15px;font-weight:bold;color:#42c1a4");

function loadCSS(url){
const link=document.createElement("link");
link.rel="stylesheet";
link.href=url;
link.crossOrigin="anonymous";
document.head.appendChild(link);
}

loadCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");

if(document.getElementById("mstaums-ui")) return;

const style=document.createElement("style");

style.textContent=`

:root{
--ms-bg:rgba(30,30,46,.65);
--ms-bar:rgba(24,24,37,.75);
--ms-surface:rgba(49,50,68,.55);
--ms-hover:rgba(69,71,90,.7);
--ms-text:#cdd6f4;
--ms-accent:#b4befe;
}

#mstaums-ui{
position:fixed;
top:80px;
left:120px;
width:900px;
height:520px;
z-index:999999;
background:var(--ms-bg);
backdrop-filter:blur(18px);
border-radius:16px;
border:1px solid rgba(255,255,255,.08);
box-shadow:0 20px 60px rgba(0,0,0,.5);
font-family:"JetBrains Mono",monospace;
display:flex;
flex-direction:column;
overflow:hidden;
}

.ms-resizer{
position:absolute;
width:14px;
height:14px;
right:4px;
bottom:4px;
cursor:nwse-resize;
opacity:.5;
}

.ms-titlebar{
height:40px;
background:var(--ms-bar);
display:flex;
align-items:center;
padding:0 12px;
cursor:move;
user-select:none;
}

.ms-controls{
display:flex;
gap:8px;
}

.ms-btn{
width:12px;
height:12px;
border-radius:50%;
position:relative;
cursor:pointer;
}

.ms-close{background:#ff5f56;}
.ms-min{background:#ffbd2e;}

.ms-btn::after{
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
font-size:9px;
opacity:0;
color:black;
font-weight:bold;
}

.ms-close:hover::after{content:"×";opacity:1;}
.ms-min:hover::after{content:"–";opacity:1;}

p {
padding-top: none;
color: var(--ms-text);
}

.ms-title{
margin-left:12px;
color:var(--ms-text);
font-size:13px;
opacity:.9;
}

.ms-layout{
flex:1;
display:flex;
overflow:hidden;
}

.ms-sidebar{
width:180px;
background:rgba(0,0,0,.15);
border-right:1px solid rgba(255,255,255,.06);
display:flex;
flex-direction:column;
padding:12px 6px;
gap:4px;
}

.ms-side-item{
display:flex;
align-items:center;
gap:8px;
padding:10px 12px;
border-radius:8px;
color:var(--ms-text);
font-size:13px;
cursor:pointer;
transition:.15s;
}

.ms-side-item span{
transition:transform .18s ease;
}

.ms-side-item:hover{
background:var(--ms-hover);
}

.ms-side-item:hover span{
transform:translateY(-2px);
}

.ms-side-item.active{
background:var(--ms-accent);
color:#1e1e2e;
box-shadow:0 0 8px var(--ms-accent);
}

.ms-content{
flex:1;
position:relative;
overflow:hidden;
}

.ms-page{
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
display:none;
flex-direction:column;
gap:10px;
padding:18px;
box-sizing:border-box;
overflow-y:auto;
overflow-x:hidden;
opacity:0;
transition:opacity .18s ease;
}

.ms-page.active{
display:flex;
opacity:1;
}

.ms-header{
font-size:18px;
color:var(--ms-text);
}

.ms-button{
font-family:"JetBrains Mono",monospace;
width:100%;
box-sizing:border-box;
background:var(--ms-surface);
border:none;
color:var(--ms-text);
padding:10px;
border-radius:8px;
cursor:pointer;
font-size:13px;
transition:opacity .15s ease;
}

.ms-button:hover{
background:var(--ms-hover);
}

#theme-selector{
background:var(--ms-surface);
color:var(--ms-text);
border:none;
padding:10px;
border-radius:8px;
font-family:"JetBrains Mono",monospace;
cursor:pointer;
}

.ms-page::-webkit-scrollbar{
width:6px;
}

.ms-page::-webkit-scrollbar-thumb{
background:var(--ms-accent);
border-radius:6px;
}

#mstaums-mini{
position:fixed;
bottom:20px;
right:20px;
background:var(--ms-accent);
color:#1e1e2e;
padding:10px 16px;
border-radius:10px;
cursor:pointer;
font-family:"JetBrains Mono",monospace;
z-index:999999;
display:none;
}

`;

document.head.appendChild(style);

const ui=document.createElement("div");
ui.id="mstaums-ui";

ui.innerHTML=`

<link href="https://fonts.googleapis.com/css?family=JetBrains+Mono" rel="stylesheet">

<div class="ms-titlebar">
<div class="ms-controls">
<div class="ms-btn ms-close"></div>
<div class="ms-btn ms-min"></div>
</div>
<div class="ms-title">MSTaums v4</div>
</div>

<div class="ms-layout">

<div class="ms-sidebar">

<input id="mstaums-search" placeholder="Search Scripts.." style="
margin-bottom:12px;
padding:10px;
border-radius:8px;
border:none;
background:var(--ms-surface);
color:var(--ms-text);
font-family:'JetBrains Mono',monospace;
">
<div class="ms-side-item active" data-page="home"><span><i class="fa-solid fa-house"></i></span>Home</div>
<div class="ms-side-item" data-page="utilities"><span><i class="fa-solid fa-toolbox"></i></span>Utilities</div>
<div class="ms-side-item" data-page="scripts"><span><i class="fa-solid fa-code"></i></span>Scripts</div>
<div class="ms-side-item" data-page="cheats"><span><i class="fa-solid fa-gamepad"></i></span>Cheats</div>
<div class="ms-side-item" data-page="tools"><span><i class="fa-solid fa-screwdriver-wrench"></i></span>Tools</div>
<div class="ms-side-item" data-page="settings"><span><i class="fa-solid fa-gear"></i></span>Settings</div>

</div>

<div class="ms-content">

<div class="ms-page active" id="home">

<div class="ms-header">Welcome to MSTaums</div>

<div style="
background:var(--ms-surface);
padding:16px;
border-radius:10px;
line-height:1.6;
font-size:13px;
">

<p><b>MSTaums v4</b> is a modular bookmarklet toolkit built for running scripts, utilities, and developer tools directly inside your browser.</p>

<p>This interface works like a lightweight script hub with modules organized into categories.</p>

</div>

<div style="
display:grid;
grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
gap:12px;
margin-top:12px;
">

<div style="
background:var(--ms-surface);
padding:14px;
border-radius:10px;
">
<b><i class="fa-solid fa-toolbox"></i> Utilities</b>
<p style="font-size:12px;opacity:.8">
Page tools like color inverter, URL inspector, and helper scripts.
</p>
</div>

<div style="
background:var(--ms-surface);
padding:14px;
border-radius:10px;
">
<b><i class="fa-solid fa-code"></i> Scripts</b>
<p style="font-size:12px;opacity:.8">
Load external bookmarklet scripts such as IXLambda.
</p>
</div>

<div style="
background:var(--ms-surface);
padding:14px;
border-radius:10px;
">
<b><i class="fa-solid fa-gamepad"></i> Cheats</b>
<p style="font-size:12px;opacity:.8">
Game scripts and automation tools like Blooket and Prodigy helpers.
</p>
</div>

<div style="
background:var(--ms-surface);
padding:14px;
border-radius:10px;
">
<b><i class="fa-solid fa-screwdriver-wrench"></i> Tools</b>
<p style="font-size:12px;opacity:.8">
Developer utilities such as the floating Dev Console and Executor.
</p>
</div>

<div style="
background:var(--ms-surface);
padding:14px;
border-radius:10px;
">
<b><i class="fa-solid fa-gear"></i> Settings</b>
<p style="font-size:12px;opacity:.8">
Customize themes and preferences for MSTaums.
</p>
</div>

</div>

<div style="
margin-top:12px;
background:rgba(0,0,0,.2);
padding:10px;
border-radius:8px;
font-size:12px;
opacity:.8;
">

Tip: Use <b>Ctrl + K</b> to quickly focus the search bar.

</div>

</div>


<div class="ms-page" id="utilities">
<div class="ms-header">Utilities</div>

<button class="ms-button" data-action="invert">Invert Page Colors</button>
<button class="ms-button" data-action="url">Show Page URL</button>
<button class="ms-button" data-action="hello">Alert Hello</button>

</div>

<div class="ms-page" id="scripts">
<div class="ms-header">Scripts</div>
<button class="ms-button" data-action="ixlambda">IXlambda</button>
</div>

<div class="ms-page" id="cheats">
<div class="ms-header">Cheats</div>
<button class="ms-button" data-action="exe">Executor</button>
<button class="ms-button" data-action="bh">Blooket Hacks</button>
<button class="ms-button" data-action="pc">Prodigy Cheats</button>
<button class="ms-button" data-action="aclick">Auto Clicker</button>
</div>

<div class="ms-page" id="tools">
<div class="ms-header">Tools</div>
<button class="ms-button" data-action="devc">Dev Console</button>
</div>

<div class="ms-page" id="settings">
<div class="ms-header">Themes</div>

<select id="theme-selector">
<option value="mocha">Catppuccin Mocha</option>
<option value="dark">Dark</option>
<option value="light">Light</option>
<option value="hack">Hack</option>
</select>

</div>

</div>
</div>

<div class="ms-resizer"></div>

`;

document.body.appendChild(ui);

document.querySelectorAll(".ms-side-item").forEach(item=>{
item.onclick=()=>{

document.querySelectorAll(".ms-side-item").forEach(i=>i.classList.remove("active"));
item.classList.add("active");

document.querySelectorAll(".ms-page").forEach(p=>p.classList.remove("active"));

document.getElementById(item.dataset.page).classList.add("active");

};
});

document.addEventListener("click",e=>{

const btn=e.target.closest(".ms-button");
if(!btn) return;

const action=btn.dataset.action;

if(action==="hello") alert("Hello!");

if(action==="url") alert(location.href);

if(action==="invert"){
document.body.style.filter=
document.body.style.filter==="invert(1)"?"":"invert(1)";
}

if (action==="3d-page") {
const s=document.createElement("script");
s.src="https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/3Dpage.js";
document.head.appendChild(s);
}

if (action==="ixlambda"){
const s=document.createElement("script");
s.src="https://raw-githack-com.translate.goog/Augtive85YT/PhiPiBeta/main/IXLambda/main.js";
document.head.appendChild(s);
}

if (action==="bh") {
const s=document.createElement("script");
s.src="https://gl-githack-com.translate.goog/CidCaribou/x-gui/-/raw/main/x-gui.js?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp";
document.head.appendChild(s);
}

if (action==="exe") {
const s=document.createElement("script");
s.src="https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Menu@main/menu.js";
document.head.appendChild(s);
}

if (action==="pc") {
const s=document.createElement("script");
s.src="https://menu.pxi-fusion.com/pxi-2.0/main.js";
document.head.appendChild(s);
}

if (action==="devc") {
const s=document.createElement("script");
s.src="https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/DevConsole.js";
document.head.appendChild(s);
}

if (action==="aclick") {
const s=document.createElement("script");
s.src="https://cdn.jsdelivr.net/gh/MohanIShim47/AutoClickerBookmarklet3@master/AutoClicker.js"
document.head.appendChild(s);
}

});

const resizer=ui.querySelector(".ms-resizer");
let resizing=false;

resizer.onmousedown=()=>resizing=true;

document.onmousemove=e=>{
if(!resizing) return;

ui.style.width=Math.max(600,e.clientX-ui.offsetLeft)+"px";
ui.style.height=Math.max(400,e.clientY-ui.offsetTop)+"px";
};

document.onmouseup=()=>resizing=false;

let dragging=false,offsetX,offsetY;

const titlebar=ui.querySelector(".ms-titlebar");

titlebar.onmousedown=e=>{
dragging=true;
offsetX=e.clientX-ui.offsetLeft;
offsetY=e.clientY-ui.offsetTop;
};

document.onmousemove=e=>{
if(!dragging) return;

ui.style.left=(e.clientX-offsetX)+"px";
ui.style.top=(e.clientY-offsetY)+"px";
};

document.onmouseup=()=>dragging=false;

ui.querySelector(".ms-close").onclick=()=>ui.remove();

ui.querySelector(".ms-min").onclick=()=>{

ui.style.display="none";

const mini=document.createElement("div");
mini.id="mstaums-mini";
mini.textContent="Open MSTaums";

document.body.appendChild(mini);

mini.onclick=()=>{
ui.style.display="flex";
mini.remove();
};

};

function setTheme(theme){

const root=document.documentElement;

if(theme==="mocha"){
root.style.setProperty("--ms-bg","rgba(30,30,46,.65)");
root.style.setProperty("--ms-bar","rgba(24,24,37,.75)");
root.style.setProperty("--ms-surface","rgba(49,50,68,.55)");
root.style.setProperty("--ms-hover","rgba(69,71,90,.7)");
root.style.setProperty("--ms-text","#cdd6f4");
root.style.setProperty("--ms-accent","#b4befe");
}

if(theme==="dark"){
root.style.setProperty("--ms-bg","rgba(18,18,20,.7)");
root.style.setProperty("--ms-bar","rgba(30,30,32,.8)");
root.style.setProperty("--ms-surface","rgba(45,45,48,.6)");
root.style.setProperty("--ms-hover","rgba(70,70,75,.7)");
root.style.setProperty("--ms-text","#fff");
root.style.setProperty("--ms-accent","#4dabf7");
}

if(theme==="light"){
root.style.setProperty("--ms-bg","rgba(245,245,245,.8)");
root.style.setProperty("--ms-bar","rgba(225,225,225,.85)");
root.style.setProperty("--ms-surface","rgba(255,255,255,.7)");
root.style.setProperty("--ms-hover","rgba(210,210,210,.7)");
root.style.setProperty("--ms-text","#222");
root.style.setProperty("--ms-accent","#5c7cfa");
}

if(theme==="hack"){
root.style.setProperty("--ms-bg","rgba(0,0,0,.75)");
root.style.setProperty("--ms-bar","rgba(0,0,0,.9)");
root.style.setProperty("--ms-surface","rgba(0,0,0,.65)");
root.style.setProperty("--ms-hover","rgba(20,20,20,.9)");
root.style.setProperty("--ms-text","#15ff00");
root.style.setProperty("--ms-accent","#00ff88");
}

}

const selector=document.getElementById("theme-selector");

selector.onchange=()=>{
const theme=selector.value;
setTheme(theme);
localStorage.setItem("mstaums-theme",theme);
};

const saved=localStorage.getItem("mstaums-theme");

if(saved){
setTheme(saved);
selector.value=saved;
}

const search=document.getElementById("mstaums-search");

search.addEventListener("input",()=>{

const query=search.value.toLowerCase();

document.querySelectorAll(".ms-button").forEach(btn=>{

const text=btn.textContent.toLowerCase();

if(text.includes(query)){
btn.style.display="block";
}else{
btn.style.display="none";
}

});

});

document.addEventListener("keydown",e=>{

if(e.ctrlKey && e.key.toLowerCase()==="k"){
e.preventDefault();

const input=document.querySelector("#mstaums-search");

if(input){
input.focus();
input.select();
}

}

});

})();