(function () {
    console.log(
        "%cMSTaums loaded",
        "font-family: 'Segoe UI', monospace; font-size:16px; font-weight:bold; color:#00e0ff; background:#111; padding:6px 10px; border-radius:6px;"
    );

    if (document.getElementById("bm-ui-launcher")) return;

    function loadScript(src) {
        return new Promise(r => {
            let s = document.createElement("script");
            s.src = src;
            s.onload = r;
            document.head.appendChild(s);
        });
    }

    function loadCSS(src) {
        let l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = src;
        document.head.appendChild(l);
    }

    (async function () {

        if (!window.jQuery) {
            await loadScript("https://code.jquery.com/jquery-3.7.1.min.js");
        }

        await loadScript("https://code.jquery.com/ui/1.13.2/jquery-ui.min.js");
        loadCSS("https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css");
        loadCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css");

        const style = document.createElement("style");
        style.textContent = `

            #bm-ui-launcher{
            position:fixed;
            top:80px;
            right:40px;
            width:360px;
            height:440px;
            z-index:999999;
            border-radius:14px;
            overflow:hidden;
            font-family:Segoe UI,system-ui;
            box-shadow:0 20px 60px rgba(0,0,0,.4);
            display:flex;
            flex-direction:column;
            }

            .bm-dark{background:#121218;color:white;}
            .bm-light{background:#ffffff;color:#111;}

            .bm-header{
            padding:10px 14px;
            font-weight:600;
            display:flex;
            justify-content:space-between;
            align-items:center;
            cursor:move;
            border-bottom:1px solid rgba(0,0,0,.15);
            }

            .bm-controls button{
            border:none;
            margin-left:6px;
            border-radius:6px;
            padding:4px 8px;
            cursor:pointer;
            }

            .bm-search{
            padding:10px;
            border-bottom:1px solid rgba(0,0,0,.1);
            }

            .bm-search input{
            width:100%;
            padding:6px;
            border-radius:8px;
            border:1px solid rgba(0,0,0,.2);
            outline:none;
            }

            .bm-content{
            flex:1;
            overflow:auto;
            padding:10px;
            }

            .bm-category-title{
            font-weight:600;
            margin-bottom:6px;
            cursor:pointer;
            opacity:.85;
            }

            .bm-card{
            display:flex;
            align-items:center;
            padding:10px;
            border-radius:10px;
            margin:6px 0;
            cursor:pointer;
            transition:.15s;
            box-shadow:0 2px 8px rgba(0,0,0,.15);
            }

            .bm-dark .bm-card{background:#1e1e28;}
            .bm-light .bm-card{background:#f3f4f8;}

            .bm-card:hover{
            transform:scale(1.04);
            box-shadow:0 8px 20px rgba(0,0,0,.25);
            }

            .bm-minimized{
            height:42px !important;
            overflow:hidden;
            }

            .bm-footer{
            text-align:center;
            font-size:11px;
            opacity:.6;
            padding:6px;
            border-top:1px solid rgba(0,0,0,.15);
            user-select:none;
            }

        `;
        document.head.appendChild(style);

        $("body").append(`
            <div id="bm-ui-launcher" class="bm-dark">

            <div class="bm-header">
            <span><i class="fa-solid fa-user-secret"></i> MSTaums</span>

            <div class="bm-controls">
            <button id="bm-theme">🌙</button>
            <button id="bm-min">➖</button>
            <button id="bm-close">✕</button>
            </div>
            </div>

            <div class="bm-search">
            <input id="bm-search" placeholder="Search bookmarklets...">
            </div>

            <div class="bm-content"></div>

            <div class="bm-footer">
            MSTaums by T.E.D.A
            </div>

            </div>
        `);

        $("#bm-ui-launcher").draggable({
            handle: ".bm-header"
        });

        const bookmarklets = {

            Utilities: [
                {
                    name: "Alert Hello",
                    run() { alert("Hello!"); }
                },

                {
                    name: "Show Page URL",
                    run() { alert(location.href); }
                },

                {
                    name: "Invert Page Colors",
                    run() {
                        document.body.style.filter =
                            document.body.style.filter === "invert(1)" ? "" : "invert(1)";
                    }
                }

            ],

            Scripts: [
                {
                    name: "Load External Script",
                    run() {
                        var script = document.createElement("script");
                        script.src = "https://cdn.jsdelivr.net/gh/Augtive85YT/PhiPiBeta@main/IXLambda/main.js";
                        document.head.appendChild(script);
                    }
                }
            ]

        };

        function render(filter = "") {

            const content = $(".bm-content");
            content.empty();

            Object.entries(bookmarklets).forEach(([cat, items]) => {

                const section = $(`<div></div>`);
                const title = $(`<div class="bm-category-title">📂 ${cat}</div>`);
                const list = $(`<div></div>`);

                items.forEach(b => {

                    if (!b.name.toLowerCase().includes(filter.toLowerCase())) return;

                    const card = $(`
                        <div class="bm-card">
                        <span>${b.name}</span>
                        </div>
                    `);

                    card.click(b.run);

                    list.append(card);

                });

                title.click(() => list.slideToggle(120));

                section.append(title);
                section.append(list);

                content.append(section);

            });

        }

        render();

        $("#bm-search").on("input", function () {
            render(this.value);
        });

        $("#bm-close").click(() => {
            $("#bm-ui-launcher").fadeOut(150, function () {
                this.remove();
            });
        });

        $("#bm-min").click(() => {
            $("#bm-ui-launcher").toggleClass("bm-minimized");
        });

        $("#bm-theme").click(() => {
            $("#bm-ui-launcher").toggleClass("bm-dark bm-light");
        });
    })();
})();