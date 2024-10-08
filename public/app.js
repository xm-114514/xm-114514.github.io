let words = [];
let currentIndex = 0;

function removeword() {
  words.splice(currentIndex, 1);
  currentIndex = (currentIndex + 1) % words.length;
  resetPages('next');
  updatePages(true);
  localStorage.setItem("words",JSON.stringify(words));
}

function formatData() {
  localStorage.clear();
}

const frontPage = document.getElementById('page-front');
const backPage = document.getElementById('page-back');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
// APIから単語データを取得
const APIdata = JSON.parse(JSON.stringify(localStorage.getItem("words")));
if (APIdata != null) {
  console.log("localStorage参照")
  words = JSON.parse(APIdata);
  updatePages(true);
} else {
  console.log("raw")
  fetch('https://raw.githubusercontent.com/xm-114514/xm-114514.github.io/main/words.json')
    .then(response => response.json())
    .then(data => {
        words = data;
        updatePages(true);
        localStorage.setItem("words",JSON.stringify(data));
    })
    .catch(error => console.error('Error fetching words:', error));
}
function updatePages(e) {
  if (e) {
    setCardContent(frontPage, currentIndex);
    setCardContent(backPage, (currentIndex + 1) % words.length);
  } else {
    setCardContent(frontPage, currentIndex);
    setCardContent(backPage, (currentIndex - 1 + words.length) % words.length);
  }
}
function setCardContent(pageElement, index) {
    pageElement.innerHTML = `<h2>${words[index].name}</h2>`;
    const description = document.createElement('p');
    description.innerHTML = `<h3><span style="color:red;">${words[index].a}</span>  <span class="hov">${words[index].description}</sapn></h3>`;
    pageElement.appendChild(description);
}
nextButton.addEventListener('click', () => {
    frontPage.style.transform = 'rotateY(-180deg)';
    backPage.style.transform = 'rotateY(0deg)';
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        resetPages('next');
        updatePages(true);
    }, 500);
});
prevButton.addEventListener('click', () => {
    frontPage.style.transform = 'rotateY(180deg)';
    backPage.style.transform = 'rotateY(0deg)';
    currentIndex = (currentIndex - 1 + words.length) % words.length;
    updatePages(false);
    setTimeout(() => {
        resetPages('prev');
    }, 0);
});
function resetPages(direction) {
    if (direction === 'next') {
        frontPage.style.transform = 'rotateY(0deg)';
        backPage.style.transform = 'rotateY(180deg)';
    } else if (direction === 'prev') {
        frontPage.style.transform = 'rotateY(0deg)';
        backPage.style.transform = 'rotateY(-180deg)';
    }
    frontPage.style.transition = 'none';
    backPage.style.transition = 'none';
    setTimeout(() => {
        frontPage.style.transition = '';
        backPage.style.transition = '';
    }, 50);
}
