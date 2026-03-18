(function(){

  if (document.getElementById("scriptix-shadow")) return;

  console.log("%cScriptix Loaded!!","font-size:20px;font-weight:bold;color:#8a5cff");
  console.log("%cby T.E.D.A","font-size:13px;font-weight:bold;color:#44aaa4");
  console.log("%c")

  // Shawdow Div Stuff

  const host = document.createElement("div");
  host.id = "scriptix-shadow";
  host.style.position = "fixed";
  host.style.top = "0";
  host.style.left = "0";
  host.style.zIndex = "999999";

  const shadow = host.attachShadow({ mode: "open" });
  document.body.appendChild(host);

  // Font Stuff
  const fontStyle = document.createElement("style");
  fontStyle.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Iosevka+Charon+Mono&display=swap');
  `;
  shadow.appendChild(fontStyle);

  // Styles

  const style = document.createElement("style");
  style.textContent = `

  #scriptix-ui{
    /* Root Styles */
    --ms-bg: rgba(30,30,46,.65);
    --ms-bar: rgba(24,24,37,.75);
    --ms-surface: rgba(49,50,68,.55);
    --ms-hover: rgba(69,71,90,.7);
    --ms-text: #cdd6f4;
    --ms-accent: #b4befe;
    --ms-font: "Iosevka Charon Mono", monospace;

    /* Main Styles from now on */
    position:fixed;
    top:80px;
    left:120px;
    width:1000px;
    height:600px;
    z-index:999999;
    background:var(--ms-bg);
    backdrop-filter:blur(20px) saturate(140%);
    -webkit-backdrop-filter:blur(20px) saturate(140%);
    border-radius:16px;
    border:1px solid rgba(255,255,255,.08);
    box-shadow:none;
    transition: box-shadow .25s ease;
    font-family: var(--ms-font);
    display:flex;
    flex-direction:column;
    overflow:hidden;
    transition:
      width .35s cubic-bezier(.22,1,.36,1),
      height .35s cubic-bezier(.22,1,.36,1),
      transform .25s cubic-bezier(.22,1,.36,1),
      opacity .2s ease;
  }

  #scriptix-ui.minimized {
    height: 40px !important;
    overflow: hidden;
  }

  #scriptix-ui.minimized .ms-layout,
  #scriptix-ui.minimized .ms-resizer {
    display: none;
  }

  #scriptix-ui.closing {
    width: 220px !important;
    height: 40px !important;
    transition: all .25s cubic-bezier(.4,0,.2,1);
  }

  #scriptix-ui.restoring {
    transition: all .25s cubic-bezier(.4,0,.2,1);
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

  .ms-icon{
    width:18px;
    height:18px;
    margin-left:10px;
    margin-right:6px;
  }

  .ms-title{
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
    transition: transform .15s ease, background .2s ease;
  }

  .ms-side-item span{
    transition:transform .18s ease;
  }

  .ms-side-item:hover{
    transform: translateX(4px);
    background:var(--ms-hover);
  }

  .ms-side-item:hover span{
    transform:translateY(-2px);
  }

  .ms-side-item.active{
    background:var(--ms-accent);
    color:#1e1e2e;
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
    font-family: var(--ms-font);
    width:100%;
    background:var(--ms-surface);
    border:none;
    color:var(--ms-text);
    padding:10px;
    border-radius:8px;
    cursor:pointer;
    font-size:13px;
    transition: transform .15s ease, background .2s ease;
  }

  .ms-button:hover{
    background:var(--ms-hover);
    transform: translateY(-2px) scale(1.02);
  }

  #theme-selector{
    background:var(--ms-surface);
    color:var(--ms-text);
    border:none;
    padding:10px;
    border-radius:8px;
    font-family: var(--ms-font);
    cursor:pointer;
  }

  #font-selector{
    background:var(--ms-surface);
    color:var(--ms-text);
    border:none;
    padding:10px;
    border-radius:8px;
    font-family: var(--ms-font);
    cursor:pointer;
  }

  #theme-selector:hover, 
  #font-selector:hover {
    background:var(--ms-hover);
  }

  #scriptix-search {
    margin-bottom:12px;
    padding:10px;
    border-radius:8px;
    border:none;
    background:var(--ms-surface);
    color:var(--ms-text);
    font-family: var(--ms-font);
  }

  .ms-toggle {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }

  .ms-toggle-track {
    width: 52px;
    height: 28px;
    background: var(--ms-surface);
    border-radius: 999px;
    display: flex;
    align-items: center;
    padding: 3px;
    transition: background .25s ease;
  }

  .ms-toggle-thumb {
    width: 22px;
    height: 22px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform .25s cubic-bezier(.22,1,.36,1);
  }

  .ms-toggle.active .ms-toggle-track {
    background: var(--ms-accent);
  }

  .ms-toggle.active .ms-toggle-thumb {
    transform: translateX(24px);
  }

  .ms-toggle i {
    width: 14px;
    height: 14px;
    color: #000;
  }

  ${document.querySelector("style")?.textContent || ""}
  `;
  shadow.appendChild(style);

  // My GUI
      
  const ui = document.createElement("div");
  ui.id = "scriptix-ui";

  ui.innerHTML = `
      <div class="ms-titlebar">
        <div class="ms-controls">
            <div class="ms-btn ms-close"></div>
            <div class="ms-btn ms-min"></div>
        </div>
        <img class="ms-icon" src="https://raw-githubusercontent-com.translate.goog/MohanIShim47/Scriptix/main/icon.png">
        <div class="ms-title">Scriptix v4.5</div>
      </div>

      <div class="ms-layout">
        <div class="ms-sidebar">
            <input id="scriptix-search" placeholder="Search Scripts...">

            <div class="ms-side-item active" data-page="home">
            <span><i data-lucide="house"></i></span>Home
            </div>
            <div class="ms-side-item" data-page="utilities">
            <span><i data-lucide="toolbox"></i></span>Utilities
            </div>
            <div class="ms-side-item" data-page="scripts">
            <span><i data-lucide="scroll-text"></i></span>Scripts
            </div>
            <div class="ms-side-item" data-page="cheats">
            <span><i data-lucide="gamepad-2"></i></span>Cheats
            </div>
            <div class="ms-side-item" data-page="tools">
            <span><i data-lucide="hammer"></i></span>Tools
            </div>
            <div class="ms-side-item" data-page="settings">
            <span><i data-lucide="cog"></i></span>Settings
            </div>
        </div>

        <div class="ms-content">
            <div class="ms-page active" id="home">
            <div class="ms-header">Welcome to Scriptix v4.5</div>

            <div style="background:var(--ms-surface); padding:16px; border-radius:10px; line-height:1.6; font-size:13px; color:var(--ms-text);">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <img style="height:100px;"src="https://raw-githubusercontent-com.translate.goog/MohanIShim47/Scriptix/main/icon.png">
                <div>
                    <p>
                    <b>Scriptix v4.5</b> is a modular bookmarklet toolkit built for running scripts,
                    utilities, and developer tools directly inside your browser.
                    </p>
                    <p>
                    This interface works like a lightweight script hub with modules organized into categories.
                    </p>
                </div>
                </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; margin-top:12px; color:var(--ms-text);">
                  <div style=" background:var(--ms-surface); padding:14px; border-radius:10px; ">
                    <b><i class="fa-solid fa-toolbox"></i> Utilities</b>
                    <p style="font-size:12px;opacity:.8;">
                        Page tools like color inverter, URL inspector, and helper scripts.
                    </p>
                  </div>

                  <div style="background:var(--ms-surface); padding:14px; border-radius:10px;">
                    <b><i class="fa-solid fa-code"></i> Scripts</b>
                    <p style="font-size:12px;opacity:.8;">
                        Load external bookmarklet scripts such as IXLambda.
                    </p>
                  </div>

                  <div style="background:var(--ms-surface); padding:14px; border-radius:10px;">
                    <b><i class="fa-solid fa-gamepad"></i> Cheats</b>
                    <p style="font-size:12px;opacity:.8;">
                        Game scripts and automation tools like Blooket and Prodigy helpers.
                    </p>
                  </div>

                  <div style="background:var(--ms-surface); padding:14px;  border-radius:10px;">
                    <b><i class="fa-solid fa-screwdriver-wrench"></i> Tools</b>
                    <p style="font-size:12px;opacity:.8;">
                        Developer utilities such as the floating Dev Console and Executor.
                    </p>
                  </div>

                  <div style="background:var(--ms-surface); padding:14px; border-radius:10px;">
                    <b><i class="fa-solid fa-gear"></i> Settings</b>
                    <p style="font-size:12px;opacity:.8;">
                        Customize themes and preferences for Scriptix v4.5.
                    </p>
                  </div>
              </div>

              <div style="margin-top:12px; background:rgba(0,0,0,.2); padding:10px; border-radius:8px; font-size:12px; opacity:.8; color:var(--ms-text);">
                  Tip: Use <b>Ctrl + K</b> to quickly focus the search bar.
              </div>
            </div>

            <div class="ms-page" id="utilities">
              <div class="ms-header">Utilities</div>
              <button class="ms-button" data-action="invert">Invert Page Colors</button>
              <button class="ms-button" data-action="url">Show Page URL</button>
              <button class="ms-button" data-action="hello">Alert Hello</button>
              <button class="ms-button" data-action="3d-page">3d Pagifier</button>
            </div>

            <div class="ms-page" id="scripts">
              <div class="ms-header">Scripts</div>
              <button class="ms-button" data-action="ixlambda">IXlambda</button>
              <button class="ms-button" data-action="tab">Tab Disguise</button>
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
              <button class="ms-button" data-action="users">Scriptix Userscript Loader</button>
            </div>

            <div class="ms-page" id="settings">
              <div class="ms-header">Themes</div>
              <select id="theme-selector">
                  <option value="macchiato">Catppuccin Macchiato (default)</option>
                  <option value="mocha">Catppuccin Mocha</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="hack">Hack</option>
              </select>
              <div style="margin-top:14px;">
                <div style="color:var(--ms-text); font-size:13px; margin-bottom:6px;">
                  Glow Effect
                </div>
                <button class="ms-toggle" id="glow-toggle">
                  <span class="ms-toggle-track">
                    <span class="ms-toggle-thumb">
                      <i data-lucide="zap"></i>
                    </span>
                  </span>
                </button>
              </div>
            </div>
      </div>

      <div class="ms-resizer"></div>
  `;

  shadow.appendChild(ui);

  const slucide = document.createElement("script");
  slucide.src = "https://unpkg.com/lucide@latest";
  slucide.onload = () => {
    if (window.lucide) lucide.createIcons({ root: shadow });
  };
  document.head.appendChild(slucide);

  const $ = sel => shadow.querySelector(sel);
  const $$ = sel => shadow.querySelectorAll(sel);

  $$(".ms-side-item").forEach(item=>{
    item.onclick=()=>{
      $$(".ms-side-item").forEach(i=>i.classList.remove("active"));
      item.classList.add("active");

      $$(".ms-page").forEach(p=>p.classList.remove("active"));
      $("#"+item.dataset.page).classList.add("active");
    };
  });

  const glowToggle = $("#glow-toggle");
  function applyGlow(enabled) {
    ui.style.boxShadow = enabled
      ? "0 0 25px var(--ms-accent), 0 5px 15px rgba(0,0,0,.3)"
      : "none";
  }
  const savedGlow = localStorage.getItem("scriptix-glow") === "true";
  applyGlow(savedGlow);
  if (glowToggle) {
    if (savedGlow) {
      glowToggle.classList.add("active");
    }
    glowToggle.onclick = () => {
      const isOn = !glowToggle.classList.contains("active");
      glowToggle.classList.toggle("active", isOn);
      localStorage.setItem("scriptix-glow", isOn);
      applyGlow(isOn);
    };
  }
      
// reusable script loader (prevents duplicates)
function loadScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return;

  const s = document.createElement("script");
  s.src = src;
  document.head.appendChild(s);
}

  const actions = {
    hello: () => alert("Hello!"),

    url: () => alert(location.href),

    invert: () => {
      document.body.style.filter =
        document.body.style.filter === "invert(1)" ? "" : "invert(1)";
    },

    "3d-page": () => loadScript("https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@main/3Dpage.js"),

    ixlambda: () => loadScript("https://raw-githack-com.translate.goog/Augtive85YT/PhiPiBeta/main/IXLambda/main.js"),

    bh: () => loadScript("https://gl-githack-com.translate.goog/CidCaribou/x-gui/-/raw/main/x-gui.js?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp"),

    exe: () => loadScript("https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Menu@main/menu.js"),

    pc: () => loadScript("https://menu.pxi-fusion.com/pxi-2.0/main.js"),

    devc: () => loadScript("https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Scripts@refs/heads/main/DevConsole.js"),

    aclick: () => loadScript("https://cdn.jsdelivr.net/gh/MohanIShim47/AutoClickerBookmarklet3@master/AutoClicker.js"),

    users: () => loadScript("https://raw-githack-com.translate.goog/MohanIShim47/Scriptix/main/Bookmarklet%20Manager/userscripts.js"),

    tab: () => loadScript("https://raw-githack-com.translate.goog/MohanIShim47/Scriptix/main/scripts/tabdisguise.js")
  };

  shadow.addEventListener("click", (e) => {
    const btn = e.target.closest(".ms-button");
    if (!btn) return;

    const action = btn.dataset.action;

    const handler = actions[action];
    if (handler) {
      handler();
    } else {
      console.warn("Unknown action:", action);
    }
  });

  const search = $("#scriptix-search");
  if(search){
    search.addEventListener("input", () => {
      const q = search.value.toLowerCase();
      $$(".ms-button").forEach(btn=>{
        btn.style.display = btn.textContent.toLowerCase().includes(q) ? "flex" : "none";
      });
    });
  }

  function setTheme(theme){
    const root=$("#scriptix-ui");
    const a=(r,g,b,o)=>`rgba(${r},${g},${b},${o})`;

    if(theme==="macchiato"){
      root.style.setProperty("--ms-bg", a(36,39,58,.65));
      root.style.setProperty("--ms-text","#cad3f5");
    }

    if(theme==="mocha"){
      root.style.setProperty("--ms-bg", a(30,30,46,.65));
      root.style.setProperty("--ms-text","#cdd6f4");
    }

    if(theme==="dark"){
      root.style.setProperty("--ms-bg", a(18,18,20,.65));
      root.style.setProperty("--ms-text","#fff");
    }

    if(theme==="light"){
      root.style.setProperty("--ms-bg", a(245,245,245,.6));
      root.style.setProperty("--ms-text","#222");
    }

    if(theme==="hack"){
      root.style.setProperty("--ms-bg", a(0,0,0,.7));
      root.style.setProperty("--ms-text","#15ff00");
    }
  }

  const selector=$("#theme-selector");
  if(selector){
    selector.onchange=()=>{
      const t=selector.value;
      setTheme(t);
      localStorage.setItem("scriptix-theme",t);
    };
    const saved=localStorage.getItem("scriptix-theme");
    if(saved){
      setTheme(saved);
      selector.value=saved;
    }
  }

  let dragging=false,resizing=false,ox=0,oy=0;

  const bar=$(".ms-titlebar");
  const resizer=$(".ms-resizer");

  bar.onpointerdown=e=>{
    dragging=true;
    ox=e.clientX-ui.offsetLeft;
    oy=e.clientY-ui.offsetTop;
  };

  resizer.onpointerdown=()=>resizing=true;

  document.addEventListener("pointermove",e=>{
    if(dragging){
      ui.style.left=(e.clientX-ox)+"px";
      ui.style.top=(e.clientY-oy)+"px";
    }
    if(resizing){
      ui.style.width=Math.max(600,e.clientX-ui.offsetLeft)+"px";
      ui.style.height=Math.max(400,e.clientY-ui.offsetTop)+"px";
    }
  });

  document.addEventListener("pointerup",()=>{
    dragging=false;
    resizing=false;
  });

  let minimized = false;

  $(".ms-close").onclick = () => {
    ui.style.transform = "scale(0.92)";
    ui.style.opacity = "0";

    setTimeout(() => {
      host.remove();
    }, 220);
  };

  $(".ms-min").onclick = () => {
    if (!minimized) {
      ui.dataset.prevWidth = ui.offsetWidth + "px";
      ui.dataset.prevHeight = ui.offsetHeight + "px";
      ui.classList.add("minimized");
      ui.style.transform = "scale(0.98)";
      ui.style.width = "220px";
      ui.style.height = "40px";

      minimized = true;
    } else {

      ui.classList.remove("minimized");
      ui.style.width = ui.dataset.prevWidth;
      ui.style.height = ui.dataset.prevHeight;
      ui.style.transform = "scale(1.03)";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ui.style.transform = "scale(1)";
        });
      });

      minimized = false;
    }
  };
})();
