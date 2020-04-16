<?php
require_once '../header_extern.php';
require_once '../config/db.php';
require_once '../footer_extern.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $currentCategory = htmlspecialchars($_GET['id']);
}

//måste även lägga till ett WHERE-villkor som matchar den aktuella kategorin, variabeln ovan
$stmt = $db->prepare("SELECT * FROM webshop_products WHERE categoryid = $currentCategory");
$stmt->execute();

?>

<!--hero-sektion och sektion för produkter-->
<section class="hero">
  <div class="shoppingcart">
  </div>
  <div class="categorypage_logo img-container">
    <img class="img-container__img" src="category.jpg" alt="Kategoribild">
  </div>
</section>
<section>
  <h1 class="category_name">Kategorinamn</h1>
  <br>
  <br>
  <!--här hämtas kategoriens produkter från databas-->
  <div class="categorypage_products">
    <?php
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) :
      $title = htmlspecialchars($row['title']);
      $price = htmlspecialchars($row['price']);
      $productid = htmlspecialchars($row['productid']);
      $quantity = htmlspecialchars($row['quantity']);

      if ($quantity == "0") {
        $any_items = "Finns EJ i lager";
    } else {
        $any_items = "Finns i lager";
    }

      echo
        "<div class='product_card'>
                  <a href= '../product/product_info.php? id=$productid' 
            class='category_title'>$title</a>
            <p>Pris: $price kr</p>
            <p>$any_items</p>

            <button class='cart-btn product_card-btn'>Lägg i varukorgen</button>
          </div>";

    endwhile;
    ?>
  </div>
  <br>
  <br>
  <button> <a href="../index.php">Tillbaka till startsidan</a></button>
</section>