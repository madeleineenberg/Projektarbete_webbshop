<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles/main.css">
    <title>Adminpanelen</title>
</head>

<body>

    <button id="toggle-menu">Meny</button>
 
    <div id="admin-menu-wraper" class="hide">
        <nav>
            <ul class="admin-menu-wraper__link-list"> 
                <li class="admin-menu-wraper__link"><a href="index.php">Admin - Hem</a></li>
                <li class="admin-menu-wraper__link"><a href="admin-category.php">Kategorier</a></li>
                <li class="admin-menu-wraper__link"><a href="admin-products.php">Produkter</a></li>
                <li class="admin-menu-wraper__link"><a href="">Beställningar</a></li>
                <li class="admin-menu-wraper__link"><a href="../index.php">WEBBSHOPPEN</a></li>
            </ul>
        </nav>
    </div>

<script>

let toggleMenuBtn = document.querySelector("#toggle-menu");
let menu = document.querySelector("#admin-menu-wraper");

toggleMenuBtn.addEventListener('click', function(event) {
  if (menu.classList.contains('hide')) {
    menu.classList.remove('hide')
    toggleMenuBtn.textContent = 'Göm meny'
  } else {
    menu.classList.add('hide')
    toggleMenuBtn.textContent = 'Meny'
  }
})

</script>