/*** 
Denna fil ritar ut varukorgen utifrån vår array i LS.
Här finns även småfunktioner för att modifiera varukorgen
på olika sätt och samtidigt uppdatera localstorage.
***/

//Hämta produktarray från Localstorage
let myProducts = JSON.parse(localStorage.getItem("products"));

//Skapa variabler för DOM-elementen som ska användas nedan
const emptyCartText = document.querySelector("#emptyCartText");
const shoppingCartContainer = document.querySelector("#shoppingCartContainer");
const cartItems = document.querySelector("#cartItems");
const emptyCartBtn = document.querySelector("#empty-cart");
const productValue = document.querySelector("#productValue");
const freightValue = document.querySelector("#freightValue");
const orderValue = document.querySelector("#orderValue");

//Kontrollera ifall myProducts är tom eller om den ska ritas ut
if (myProducts.length !== null) {
  console.log("det finns varor");
  shoppingCartContainer.classList.remove("hideCart");
  emptyCartText.classList.add("hideCart");
} else {
  console.log("inga varor");
  emptyCartText.classList.remove("hideCart");
  shoppingCartContainer.classList.add("hideCart");
}

drawCart();
//Rita ut produktinfo samt knappar, dvs taggen tbody
function drawCart() {
  //Kontrollera ifall myProducts är tom eller om den ska ritas ut
  if (myProducts.length !== 0) {
    console.log("det finns varor");
    shoppingCartContainer.classList.remove("hideCart");
    emptyCartText.classList.add("hideCart");
  } else {
    console.log("inga varor");
    emptyCartText.classList.remove("hideCart");
    shoppingCartContainer.classList.add("hideCart");
  }
  //Börja med att rensa gammalt innehåll i varukorgen
  cartItems.innerHTML = "";

  myProducts.forEach(function (item) {
    const productRow = document.createElement("tr");
    productRow.classList.add("table_orders-row");

    const title = document.createElement("td");
    title.classList.add("table_orders-cell");
    title.textContent = item.title;

    const price = document.createElement("td");
    price.classList.add("table_orders-cell");
    //Kontrollera ifall produkten är på rea eller inte
    if (item.hasOwnProperty("outletprice")) {
      price.textContent = `${item.outletprice} kr (ord. ${item.price} kr)`;
    } else {
      price.textContent = `${item.price} kr`;
    }

    const deleteCell = document.createElement("td");
    deleteCell.classList.add("table_orders-cell");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Radera";
    deleteButton.classList.add("delete");
    deleteButton.dataset.productID = item.productid;
    deleteButton.addEventListener("click", removeProduct);

    const minusCell = document.createElement("td");
    minusCell.classList.add("table_orders-cell");
    const minusButton = document.createElement("button");
    minusButton.textContent = "➖";
    minusButton.classList.add("minusQty");
    minusButton.dataset.productID = item.productid;
    minusButton.addEventListener("click", changeQty);

    const quantity = document.createElement("td");
    quantity.textContent = item.cartQty;

    const plusCell = document.createElement("td");
    plusCell.classList.add("table_orders-cell");
    const plusButton = document.createElement("button");
    plusButton.textContent = "➕";
    plusButton.classList.add("plusQty");
    plusButton.dataset.productID = item.productid;
    plusButton.addEventListener("click", changeQty);

    //Stoppa in alla element på rätt ställe i DOM-strukturen för tbody
    productRow.appendChild(title);
    productRow.appendChild(price);
    deleteCell.appendChild(deleteButton);
    productRow.appendChild(deleteCell);
    minusCell.appendChild(minusButton);
    productRow.appendChild(minusCell);
    productRow.appendChild(quantity);
    plusCell.appendChild(plusButton);
    productRow.appendChild(plusCell);

    cartItems.appendChild(productRow);
  });

  //Räkna ut totalt produktvärde, fraktkostnad samt totalt ordervärde
  let total = totalPrice(myProducts);
  productValue.textContent = `Produktvärde totalt: ${total} kr `;
  let freight = calculateFreight(total);
  freightValue.textContent = `Frakt: ${freight} kr `;
  let orderTotal = total + freight;
  orderValue.textContent = `Ordervärde totalt: ${orderTotal} kr `;
}

//Lyssnare till Töm varukorg som ropar på emptyCart
emptyCartBtn.addEventListener("click", emptyCart);

//Funktion för att ta bort produkt
function removeProduct(event) {
  const productID = parseInt(event.currentTarget.dataset.productID);
  const removedProducts = myProducts.filter(function (item) {
    const itemID = parseInt(item.productid);
    return itemID !== productID;
  });
  myProducts = removedProducts;
  updateLocalStorage();
  drawCart();
}

//Funktion för att ändra antal på produkt
function changeQty(event) {
  let productID = parseInt(event.currentTarget.dataset.productID);
  let currentButton = event.currentTarget;

  //Loopa igenom produktarrayen för att hitta det id som matchar
  //med eventets id
  for (let i = 0; i < myProducts.length; i++) {
    const currentProductID = myProducts[i].productid;
    //If-sats som matchar array-objektets id mot eventets id
    if (currentProductID == productID) {
      let qty = parseInt(myProducts[i].cartQty);
      let stockQty = parseInt(myProducts[i].quantity);

      //När vi får match kollar vi om knappen är minus eller plus
      if (currentButton.classList.contains("plusQty")) {
        //Får ej överstiga lagersaldo, annars öka produktens antal med 1
        if (qty === stockQty) {
          alert("Du kan inte lägga till fler produkter än som finns i lager.");
          break;
        } else {
          qty++;
          myProducts[i].cartQty = qty;
        }
      } else if (currentButton.classList.contains("minusQty")) {
        //Får ej understiga 1, annars minska produktens antal med 1
        if (qty === 1) {
          alert(
            "Produkten måste ha minst antal 1, vill du ta bort produkten, tryck på det röda krysset."
          );
          break;
        } else {
          qty--;
          myProducts[i].cartQty = qty;
        }
        //extrakoll - kanske onödigt?
      } else {
        alert("something wrong with quantity changing buttons");
      }
    }
    updateLocalStorage();
    drawCart();
  }
}

//Töm varukorgen
function emptyCart() {
  myProducts = [];
  localStorage.clear();
  drawCart();
}

function updateLocalStorage() {
  localStorage.clear(); //Töm LS, sedan lägger vi in uppdaterad myProducts.
  localStorage.setItem("products", JSON.stringify(myProducts));
}

//Räkna ut totalpris, görs varje gång varukorgen ritas ut
//Får in aktuell myProducts-array som argument
function totalPrice(arr) {
  let outputPrice = 0;

  for (let i = 0; i < arr.length; i++) {
    const qty = parseInt(arr[i].cartQty);
    let price = 0;
    if (arr[i].hasOwnProperty("outletprice")) {
      price = parseInt(arr[i].outletprice);
    } else {
      price = parseInt(arr[i].price);
    }
    outputPrice += qty * price;
  }
  return outputPrice;
}

function calculateFreight(productPrice) {
  let outputFreight = 50;
  //Kontrollera om ordervärde överstiger 500kr
  //Eller om input postnummer börjar på '1'
  if (productPrice >= 500) {
    outputFreight = 0;
  }
  return outputFreight;
}
