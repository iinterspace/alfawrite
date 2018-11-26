<?php

function sanitize_output($buffer) {

    $search = array(
        '/\>[^\S ]+/s',     // strip whitespaces after tags, except space
        '/[^\S ]+\</s',     // strip whitespaces before tags, except space
        '/(\s)+/s',         // shorten multiple whitespace sequences
        '/<!--(.|\s)*?-->/' // Remove HTML comments
    );

    $replace = array(
        '>',
        '<',
        '\\1',
        ''
    );

    $buffer = preg_replace($search, $replace, $buffer);

    $userAgent =  $_SERVER['HTTP_USER_AGENT'];
    if(preg_match('/Chrome/', $userAgent)){
        $buffer = str_replace(['png', 'jpg'], 'webp', $buffer);
    }

    return $buffer;
}
ob_start("sanitize_output");
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <title>
    <?php if($title): ?>
        <?=$title ?>
    <?php else: ?>
    AlphaWrite
    <?php endif; ?>
    </title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <link rel="shortcut icon" href="favicon.ico"/>
    <style>
    <?php echo file_get_contents('css/style.css') ?>
    </style>
</head>