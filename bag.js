const CONVENIENCE_FEES = 99;

let bagItemObjects;

onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemObjects() {
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}

function displayBagItems() {
  const item_div = document.querySelector(".item-div");
  let innerHTML = "";
  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateItemHtml(bagItem);
  });
  item_div.innerHTML = innerHTML;
}

function generateItemHtml(item) {
  return `
                <div class="item-card">
                    <div class="item-img-div">
                        <img src="${item.item_image}" alt="" class="item-img">
                    </div>
                    <div class="item-info-div">
                        <div id="company-name">
                            ${item.company_name}
                        </div>
                        <div id="item-name">
                            ${item.item_name}
                        </div>
                        <div id="price">
                            <span id="current-price">Rs. ${item.current_price}</span>
                            <span id="original-price">Rs. ${item.original_price}</span>
                            <span id="discount">(${item.discount_percentage}% OFF)</span>
                        </div>
                        <div id="return-div">
                            <span>${item.return_period} days</span> return available
                        </div>
                        <div id="delivery-div">
                            Delivery by <span>${item.delivery_date}</span>
                        </div>
                    </div>
                    <button id="cut-btn" onclick="remove_btn(${item.id})">X</button>
                </div>
    `;
}

function remove_btn(itemId) {
  let index = bagItems.indexOf(itemId);
  if (index !== -1) {
    bagItems.splice(index, 1);
  }
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagicon();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummary = document.querySelector(".total-price-div");
  let totalMRP = 0;
  let totalDiscount = 0;
  bagItemObjects.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });
  let totalAmount = totalMRP - totalDiscount + CONVENIENCE_FEES;
  bagSummary.innerHTML = `
                 <div class="price-card">
                    <div id="price-details">
                        Price Details (${bagItems.length} item)
                    </div>
                    <div class="price-breakup">
                        <span>Total MRP</span>
                        <span>Rs ${totalMRP}</span>
                    </div>
                    <div class="price-breakup">
                        <span>Discount on MRP</span>
                        <span style="color: teal;">-Rs ${totalDiscount}</span>
                    </div>
                    <div class="price-breakup">
                        <span>Convenience Fee</span>
                        <span>Rs 99</span>
                    </div>
                    <hr>
                    <div id="total-amount">
                        <span>Total Amount</span>
                        <span>Rs ${totalAmount}</span>
                    </div>
                    <button id="order-btn">PLACE ORDER</button>
                </div>
  `;
}
