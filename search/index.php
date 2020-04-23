<?php
require_once '../config/db.php';
require_once '../header_extern.php';

$search = $_GET['id'];
//$searchItems = implode(',', $search);

  $sql = "SELECT * 
          FROM webshop_products
          WHERE productid IN ({$search})";
  $stmt = $db->prepare($sql);
  $stmt->execute();
?>

<h1>Sök</h1>
<br><br>
<!--<h2><?//php echo $search ?></h2>-->

<!--i nedan div mha php rita ut produktkort-->
<div id="searched-result" class="search-result">
<?php
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) :
      $title = htmlspecialchars($row['title']);
      $price = htmlspecialchars($row['price']);
      $productid = htmlspecialchars($row['productid']);
      $quantity = htmlspecialchars($row['quantity']);

      if ($quantity == "0") {
        $any_items = "<span>Finns EJ i lager</span>";
      } else {
        $any_items = "I lager: " . $quantity . " st";
      }

      echo
        "<div class='product_card'>
              <a href= '../product/product_info.php? id=$productid' 
              class='product_title'>$title</a>
              <p class='product_price'>Pris: $price kr</p>
              <p class='any-items'>$any_items</p>

            <button class='cart-btn product_card-btn'><a href= '../order/orderpage.php? id=$productid' </a>Lägg i varukorg</button>
          </div>";

    endwhile;
    ?>

</div>

<button class="btn-back"><a href="../index.php">Tillbaka till startsidan</a></button>


<?php
require_once "../footer.php"
?>