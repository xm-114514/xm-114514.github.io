(async function() {
  const hamburger_menu = document.querySelector('[aria-label="「開く」メニュー"]');
  hamburger_menu && hamburger_menu.addEventListener('click', function() {
    const hidemenu = document.querySelector('.hidemenu');
    hidemenu.classList.toggle("move");
  });

  const page = 0;

  async function bodyFetch(id) {
    const res = await fetch(`/.netlify/functions/main?id=${id}`);
    const body = res.json();
    console.log(body)
    return body;
  }
  
  async function contentrequest(page) {
    const res = await fetch(`/.netlify/functions/main?page=${page}`);
    console.log(res);
    const titlelist = res.json();
    console.log(titlelist)
    titlelist.then(titlelist => {
      const contents = titlelist.contents;
      const cwd = document.querySelector("#glid-list");
      console.log(contents)
      for (let x=0; x<contents.length ;x++) {
        const div = document.createElement("strong");
        const tags = () => {
          let text = "";
          for (const tag of contents[x].tag) {
            text += tag + ",";
          }
          return text.slice(0, text.length - 1);
        }
        div.innerHTML = "<a href=#a>" + contents[x].title + "</a>" +  `<p id="${contents[x].id}">` + contents[x].description + "</p>" + "<h3 id='tag'>" + tags() + "</h3>";
        const listener = () => {
          console.log(contents[x].id, "click");
          const full = document.getElementById(contents[x].id);
          bodyFetch(x).then(body => {
            full.innerHTML = body.data;
          });
          div.removeEventListener("click", listener);
        };
        div.addEventListener("click", listener);
        cwd.appendChild(div);
      }
    })
  
  }

  window.addEventListener("DOMContentLoaded", function() {
    console.log("load");
    const home = document.createElement("div");
    contentrequest(page);
    home.id = "glid-list";
    const div = document.querySelector("#logo_bottom");
    div.appendChild(home);
  });
})();
