// "use strict";
const wrapper = document.querySelector(".wrapper");
//Header section

// document.body.appendChild(wrapper);

const header = document.createElement("div");
const fragmentHead = new DocumentFragment();
header.classList.add("header");
const imgHeader = document.createElement("img");
imgHeader.setAttribute(
  "src",
  "https://media.wired.com/photos/5fd2c29c2a4ddaf3b6389694/191:100/w_2580,c_limit/Gear-Books-Roundup-671406905.jpg"
);
imgHeader.classList.add("img-header");
const titleHeader = document.createElement("div");
titleHeader.innerText = "World Amazing  Books library";
titleHeader.classList.add("title-header");
fragmentHead.appendChild(imgHeader);
fragmentHead.appendChild(titleHeader);

header.appendChild(fragmentHead);
wrapper.appendChild(header);
console.log(fragmentHead);
//*Header section

//Main section
const mainFragment = new DocumentFragment();
const main = document.createElement("div");
main.classList.add("main");
const divBookCatalog = document.createElement("div");
divBookCatalog.classList.add("book-catalog");
const titleBookCatalog = document.createElement("h2")
titleBookCatalog.classList.add("title-book")
titleBookCatalog.innerText = "Book Catalog"
const divOrderBooks = document.createElement("div");
divOrderBooks.classList.add("order-books");
//Section-part
fetch("./books.json") //path to the file with json data
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let item of data) {
      const section = document.createElement("section");
      const imgSection = document.createElement(`img`);
      imgSection.classList.add("book-img");
      imgSection.setAttribute("src", `${item.imageLink}`);
      const divDescr = document.createElement("div");
      divDescr.classList.add("book-descr");
      const titleDescr = document.createElement("h3");
      titleDescr.innerText = `${item.title}`;
      const authorDescr = document.createElement("p");
      authorDescr.innerText = `Author:${item.author}`;
      const priceDescr = document.createElement("p");
      priceDescr.innerText = `${item.price}$`;
      const showMoreBtn = document.createElement("button");
      showMoreBtn.classList.add("show-more");
      showMoreBtn.innerHTML = "show more";
      const addToBag = document.createElement("button");
      addToBag.classList.add("add-btn");
      addToBag.innerText = "add to bag";
      divDescr.append(
        titleDescr,
        authorDescr,
        priceDescr,
        showMoreBtn,
        addToBag
      );
      section.appendChild(imgSection);
      section.appendChild(divDescr);
      divBookCatalog.append( section);
      main.appendChild(divBookCatalog);
      mainFragment.appendChild(main);
      wrapper.appendChild(titleBookCatalog);
      wrapper.appendChild(mainFragment);

      //Modal-part
      showMoreBtn.setAttribute("id", "myBtn");
      const theModalDiv = document.createElement("div");
      theModalDiv.classList.add("modal");
      theModalDiv.setAttribute("id", "myModal");
      //Modal-content
      const modalContentDiv = document.createElement("div");
      modalContentDiv.classList.add("modal-content");
      const spanEl = document.createElement("button");
      spanEl.classList.add("close");
      spanEl.innerText = "close";
      const titleModal = document.createElement("h4")
      titleModal.innerText = `${item.title}`
      const textModal = document.createElement("p");
      textModal.innerText = `${item.description}`;
      modalContentDiv.append(spanEl,titleModal, textModal);
      theModalDiv.append(modalContentDiv);

      showMoreBtn.addEventListener("click", () => {
        theModalDiv.style.display = "block";
      });

      spanEl.addEventListener("click", () => {
        theModalDiv.style.display = "none";
      });

      window.addEventListener("click", (event) => {
        if (event.target == theModalDiv) {
          theModalDiv.style.display = "none";
        }
      });
      wrapper.append(theModalDiv);
      //----------------------------------
      //*Modal-part
      //Order-books
      const articleOrderBooks = document.createElement("article");
      articleOrderBooks.classList.add("article");
      const articleOrderImg = document.createElement("img");
      articleOrderImg.classList.add("order-img");
      const articleDescr = document.createElement("div");
      articleDescr.classList.add("article-descr");
      const articleTitle = document.createElement("h4");
      const articleAuthor = document.createElement("p");
      const articleTotal = document.createElement("p")
      //x-btn
      const xBtn = document.createElement("button");
      xBtn.classList.add("x-btn");
      xBtn.innerText = "X";
      const confirmLink = document.createElement("a");
      confirmLink.classList.add("confirm-link");
      confirmLink.innerText = "Confirm Order";
      confirmLink.setAttribute("href", "./form/form.html");
      const articlePrice = document.createElement("p");

      articleOrderBooks.append(
        articleOrderImg,
        articleDescr,
        xBtn,
        confirmLink
      );
      articleOrderImg.setAttribute("src", `${item.imageLink}`);

      articleTitle.innerText = `${item.title}`;

      articleAuthor.innerText = `${item.author}`;
      articlePrice.innerText = `Total: $ ${item.price}`;
      articleDescr.append(articleTitle, articleAuthor, articlePrice);

      addToBag.addEventListener("click", () => {
        divOrderBooks.append(articleOrderBooks);
        // store.push(item);
      });
      main.appendChild(divOrderBooks);
      mainFragment.appendChild(main);
      wrapper.appendChild(mainFragment);
      xBtn.addEventListener("click", () => {
        divOrderBooks.removeChild(articleOrderBooks);
      });
      main.appendChild(divOrderBooks);
      mainFragment.appendChild(main);
      wrapper.appendChild(mainFragment);
    }
  });
