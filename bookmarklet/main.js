(function () {
  if (document.getElementById("bm-launcher")) return;

  const box = document.createElement("div");
  box.id = "bm-launcher";

  const fontawesome = document.createElement("link");
  fontawesome.rel = "stylesheet";
  fontawesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
  document.head.appendChild(fontawesome);

  Object.assign(box.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: "999999",
    width: "260px",
    backdropFilter: "blur(12px)",
    background: "rgba(20,20,30,0.75)",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
    fontFamily: "Segoe UI, system-ui, sans-serif",
    borderRadius: "14px",
    color: "white",
    userSelect: "none",
    transition: "transform .2s"
  });

  const logo = document.createElement("div");
  logo.innerHTML = '<i class="fa-solid fa-user-secret"></i>';
  Object.assign(logo.style, {
    position: "absolute",
    top: "12px",
    left: "12px",
    color: "rgba(255,255,255,0.7)",
    marginLeft: "70px",
  });
  box.appendChild(logo);

  const title = document.createElement("div");
  title.textContent = "MSTaums";

  Object.assign(title.style, {
    fontWeight: "600",
    fontSize: "16px",
    marginBottom: "10px",
    paddingBottom: "6px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    cursor: "move",
    textAlign: "center"
  });

  box.appendChild(title);

  const container = document.createElement("div");
  box.appendChild(container);

  const bookmarklets = {
    "IXLambda Loader": function () {
      var script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/Augtive85YT/PhiPiBeta@main/IXLambda/main.js";
      document.head.appendChild(script);
    },

    "Executor by X-Gui": function () {
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/gh/CidCaribou/Executor-Menu@main/menu.js";
      document.body.appendChild(s);
    },

    "Blooket Hacks by X-Gui": function () {
      var s = document.createElement("script");
      s.src = "https://gl.githack.com/CidCaribou/x-gui/-/raw/main/x-gui.js";
      document.body.appendChild(s);
    }
  };

  Object.keys(bookmarklets).forEach(name => {

    const btn = document.createElement("button");
    btn.textContent = name;

    Object.assign(btn.style, {
      width: "100%",
      margin: "6px 0",
      padding: "8px",
      borderRadius: "8px",
      border: "none",
      background: "linear-gradient(135deg,#4f8cff,#6e5cff)",
      color: "white",
      fontSize: "13px",
      cursor: "pointer",
      transition: "all .2s"
    });

    btn.onmouseenter = () => {
      btn.style.transform = "scale(1.05)";
      btn.style.boxShadow = "0 4px 12px rgba(0,0,0,.4)";
    };

    btn.onmouseleave = () => {
      btn.style.transform = "scale(1)";
      btn.style.boxShadow = "none";
    };

    btn.onclick = bookmarklets[name];

    container.appendChild(btn);

  });

  const close = document.createElement("button");
  close.textContent = "✕ Close";

  Object.assign(close.style, {
    marginTop: "10px",
    width: "100%",
    padding: "7px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    cursor: "pointer",
    transition: "all .2s"
  });

  close.onmouseenter = () => close.style.background = "rgba(255,255,255,0.2)";
  close.onmouseleave = () => close.style.background = "rgba(255,255,255,0.1)";
  close.onclick = () => box.remove();

  box.appendChild(close);

  document.body.appendChild(box);

  let isDragging = false;
  let offsetX, offsetY;

  title.onmousedown = e => {
    isDragging = true;
    offsetX = e.clientX - box.offsetLeft;
    offsetY = e.clientY - box.offsetTop;
  };

  document.onmousemove = e => {
    if (!isDragging) return;
    box.style.left = e.clientX - offsetX + "px";
    box.style.top = e.clientY - offsetY + "px";
    box.style.right = "auto";
  };

  document.onmouseup = () => {
    isDragging = false;
  };

})();