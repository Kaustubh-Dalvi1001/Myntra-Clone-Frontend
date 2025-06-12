let bagItems;
onLoad();
function onLoad() {
  bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
  displayItemsOnHomePage();
  displayBagicon();
}

function displayItemsOnHomePage() {
  let items_container = document.querySelector(".items-container");
  if (!items_container) {
    return;
  }
  let innerHTML = "";
  items.forEach((item) => {
    let discountHtml = "";
    if (item.discount_percentage > 0) {
      discountHtml = `<span class="discount">(${item.discount_percentage}% OFF)</span>`;
    }
    let equalRate = "";
    if (item.original_price > item.current_price) {
      equalRate = `<span class="original-price">Rs ${item.original_price}</span>`;
    }
    let ratingHtml = "";
    if (item.rating.stars && item.rating.count > 0) {
      ratingHtml = `
                    <div class="rating">
                        ${item.rating.stars} ⭐ | ${item.rating.count}
                    </div>
      `;
    }
    innerHTML += `
                <div class="item-container">
                    <img src="${item.item_image}" alt="item image" class="item-image">
                    ${ratingHtml}
                    <div class="company-name">
                        ${item.company_name}
                    </div>
                    <div class="item-name">
                        ${item.item_name}
                    </div>
                    <div class="price">
                        <span class="current-price">Rs ${item.current_price}</span>
                        ${equalRate}
                        ${discountHtml}
                    </div>
                    <button class="add-btn" onclick="addToBag(${item.id})">Add to Bag</button>
                </div>
    `;
  });
  items_container.innerHTML = innerHTML;
}

function addToBag(itemId) {
  bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagicon();
  console.log(bagItems);
}

function displayBagicon() {
  let bagItemCountElement = document.querySelector("#bag-item-count");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerHTML = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden  ";
  }
}

let bars = document.querySelector("#bars");
let nav_bar = document.querySelector("#nav-bar");
bars.addEventListener("click", () => {
  nav_bar.classList.toggle("action");
});
