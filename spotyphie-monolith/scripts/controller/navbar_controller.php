<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['search'])) {
    $search_query = trim($_POST['search']);
    if (!empty($search_query)) {
        // Redirect to search_page.php
        header('Location: search_page.php');
        exit;
    }
}
?>
