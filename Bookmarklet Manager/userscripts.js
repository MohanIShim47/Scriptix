if(window.MSUserScriptManagerLoaded) return;
window.MSUserScriptManagerLoaded = true;

function getScripts(){
  return JSON.parse(localStorage.getItem("MS_USERSCRIPTS") || "[]");
}

function saveScripts(s){
  localStorage.setItem("MS_USERSCRIPTS", JSON.stringify(s));
}

function match(pattern, url){

  const regex = new RegExp(
    pattern
      .replace(/[.+?^${}()|[\]\\]/g,"\\$&")
      .replace(/\*/g,".*")
  );

  return regex.test(url);
}

function runScripts(){

  const scripts = getScripts();

  scripts.forEach(s => {

    if(!s.enabled) return;

    if(match(s.match, location.href)){

      try{

        console.log("[Userscript]", s.name);
        new Function(s.code)();

      }catch(e){

        console.error("Userscript Error:", e);

      }

    }

  });

}

const style = document.createElement("style");

style.textContent = `
#ms-userscripts{
  position:fixed;
  top:80px;
  left:120px;
  width:600px;
  height:420px;
  background:#1e1e2e;
  color:#cdd6f4;
  font-family:monospace;
  border-radius:12px;
  z-index:9999999;
  display:flex;
  flex-direction:column;
  box-shadow:0 5px 20px #b4befe;
}

#ms-userscripts header{
  height:38px;
  display:flex;
  align-items:center;
  padding:0 10px;
  background:#181825;
  cursor:move;
}

#ms-userscripts header button{
background:#313244;
border:none;
color:#cdd6f4;
width:28px;
height:22px;
margin-left:6px;
border-radius:4px;
cursor:pointer;
}

#ms-userscripts header button:hover{
background:#45475a;
}

#ms-userscripts main{
  flex:1;
  display:flex;
}

#ms-script-list{
  width:180px;
  background:#11111b;
  overflow:auto;
}

.ms-script-item{
  padding:8px;
  border-bottom:1px solid #222;
  cursor:pointer;
}

.ms-script-item:hover{
  background:#313244;
}

#ms-editor{
  flex:1;
  display:flex;
  flex-direction:column;
  padding:8px;
  gap:6px;
}

#ms-editor input,
#ms-editor textarea{
  background:#11111b;
  color:#cdd6f4;
  border:none;
  border-radius:6px;
  padding:6px;
  font-family:monospace;
}

#ms-editor textarea{
  flex:1;
  resize:none;
}

#ms-buttons{
  display:flex;
  gap:6px;
}

#ms-buttons button{
  flex:1;
  background:#313244;
  border:none;
  color:#cdd6f4;
  padding:6px;
  border-radius:6px;
  cursor:pointer;
}

#ms-buttons button:hover{
  background:#45475a;
}
`;

document.head.appendChild(style);

const ui = document.createElement("div");
ui.id = "ms-userscripts";

ui.innerHTML = `
<header>
  <span style="flex:1">MST UserScripts Manger</span>
  <button id="ms-min">-</button>
  <button id="ms-close">×</button>
</header>

<main>

<div id="ms-script-list">

<div id="ms-buttons">
<button id="ms-taums-launch">MSTaums</button>
</div>
</div>

<div id="ms-editor">

<input id="ms-name" placeholder="Script name">
<input id="ms-match" placeholder="Match pattern (*://*/*)">
<textarea id="ms-code" placeholder="Userscript code"></textarea>

<div id="ms-buttons">
<button id="ms-save">Save</button>
<button id="ms-run">Run</button>
<button id="ms-delete">Delete</button>
<button id="ms-toggle">Enable/Disable</button>
</div>

</div>

</main>
`;

document.body.appendChild(ui);

function refresh(){

  const list = document.getElementById("ms-script-list");
  list.innerHTML = "";

  const scripts = getScripts();

  scripts.forEach((s,i)=>{

    const div = document.createElement("div");

    div.className = "ms-script-item";

    div.textContent = s.name + (s.enabled ? "" : " (disabled)");

    div.onclick = ()=>{
      document.getElementById("ms-name").value = s.name;
      document.getElementById("ms-match").value = s.match;
      document.getElementById("ms-code").value = s.code;
    };

    list.appendChild(div);

  });

}

let minimized=false;

document.getElementById("ms-close").onclick = ()=>{
  ui.remove();
  window.MSUserScriptManagerLoaded=false;
};

document.getElementById("ms-min").onclick = ()=>{

  const main = ui.querySelector("main");

  minimized = !minimized;

  if(minimized){
    main.style.display="none";
    ui.style.height="38px";
  }else{
    main.style.display="flex";
    ui.style.height="420px";
  }

};

document.getElementById("ms-save").onclick = ()=>{

  const name = document.getElementById("ms-name").value;
  const match = document.getElementById("ms-match").value;
  const code = document.getElementById("ms-code").value;

  if(!name || !match || !code) return alert("Fill fields");

  let scripts = getScripts();

  const existing = scripts.find(s=>s.name===name);

  if(existing){
    existing.match = match;
    existing.code = code;
  }else{
    scripts.push({
      name,
      match,
      code,
      enabled:true
    });
  }

  saveScripts(scripts);

  refresh();

};

document.getElementById("ms-delete").onclick = ()=>{

  const name = document.getElementById("ms-name").value;

  let scripts = getScripts();

  scripts = scripts.filter(s=>s.name!==name);

  saveScripts(scripts);

  refresh();

};

document.getElementById("ms-run").onclick = ()=>{

  try{
    new Function(document.getElementById("ms-code").value)();
  }catch(e){
    console.error(e);
  }

};

document.getElementById("ms-toggle").onclick = ()=>{

  const name = document.getElementById("ms-name").value;

  let scripts = getScripts();

  scripts.forEach(s=>{
    if(s.name===name){
      s.enabled = !s.enabled;
    }
  });

  saveScripts(scripts);

  refresh();

};

let dragging=false;
let offsetX,offsetY;

ui.querySelector("header").onmousedown=e=>{
  dragging=true;
  offsetX=e.clientX-ui.offsetLeft;
  offsetY=e.clientY-ui.offsetTop;
};

document.addEventListener("mousemove",e=>{

  if(!dragging) return;

  ui.style.left=(e.clientX-offsetX)+"px";
  ui.style.top=(e.clientY-offsetY)+"px";

});

document.addEventListener("mouseup",()=>dragging=false);

refresh();
runScripts();