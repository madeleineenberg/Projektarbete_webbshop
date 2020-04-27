<?php
require_once "../header_extern.php";
require_once "send-order.php";

//HÄMTA KUNDUPPGIFTER FRÅN DATABASEN 
//ELLER är det bättre att hämta från formuläret med eventlistener? (Se filen show-order-details.js)

// Hämta orderid (hur då??)
//$id = htmlspecialchars($_GET['id']);

// Hämtar alla kolumner från tabellen "webshop_orders" i db
// $stmt = $db->prepare("SELECT  
//                     `orderid`,
//                     `orderdate`,
//                     `name`, 
//                     `email`, 
//                     `phone`, 
//                     `street`,
//                     `zip`
//                     `city`
//                     FROM `webshop_order` 
//                     WHERE orderid=:orderid");
// $stmt->bindParam(':orderid', $id);
// $stmt->execute();

// echo "<div class='product-info'>";

// // Hämtar raderna som finns i varje kolumn
// $row = $stmt->fetch(PDO::FETCH_ASSOC);

// $orderid = htmlspecialchars($row['orderid']);
// $orderdate = htmlspecialchars($row['orderdate']);
// $name = htmlspecialchars($row['name']);
// $email = htmlspecialchars($row['email']);
// $phone = htmlspecialchars($row['phone']);
// $street = htmlspecialchars($row['street']);
// $zip = htmlspecialchars($row['zip']);
// $city = htmlspecialchars($row['city']);

?>


<h1>Orderbekräftelse</h1>
<br>

<section class="order-info">
  <h2>Din beställning</h2>
  <br>
  <!--Här kanske vi hellre vill rita ut ordernr, datum och totalpris som en tabell?
Likt den för produkterna? -->
  <h3>Ditt ordernummer: </h3>
  <br>
  <h3>Beställningsdatum: </h3>
  <br>
  <h3 id="order-total-price"></h3>
  <br>
  <table>
    <thead>
      <th>Produkt</th>
      <th>Antal</th>
      <th>Pris</th>
    </thead>
    <tbody id="product-container" class="">
      <!--här hämtas beställda produkter från localstorage 
    och ritas ut med hjälp av funktionen drawOrderedProducts()-->
    </tbody>
  </table>

  <br>
</section>

<section id="contact-container">
  <h2>Dina kontaktuppgifter</h2>
  <br>
  <!--här hämtas kund/kontaktdetaljer från orderformuläret-->
  <div id="customer-info"></div>
</section>


<?php
require_once "../footer.php"
?>