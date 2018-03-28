<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Главная</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">

    <script>
      window.addEventListener('load', function () {
        document.body.className = document.body.className.replace('loading', '');
      });
      if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
        const html = document.querySelector('html');
        html.classList.add('iphone');
      }
      /* PubSub */
      window.PS = (function () {
        var topics = {};
        var hOP = topics.hasOwnProperty;
        return {
          subscribe: function (topic, listener) {
            if (!hOP.call(topics, topic)) topics[topic] = [];
            var index = topics[topic].push(listener) - 1;
            return {
              remove: function () {
                delete topics[topic][index];
              }
            };
          }, publish: function (topic, info) {
            if (!hOP.call(topics, topic))return;
            topics[topic].forEach(function (item) {
              item(info !== undefined ? info : {});
            });
          }
        };
      })();
    </script>
    <style>
        /*! normalize.css v6.0.0 | MIT License | github.com/necolas/normalize.css */button,input,ol,optgroup,p,select,textarea,ul{margin:0}dd,li{margin-left:0}button,hr,input{overflow:visible}audio,canvas,progress,video{display:inline-block}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}[hidden],template{display:none}ol,ul{padding-left:0}li{padding:0}

        html {
            min-height: 100%;
            height: 100%;
            font-size: 62.5%;
            background: #F8F8F8;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
        }

        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            font-size: 1.6rem;
            line-height: 2.4rem;
            min-width: 125.6rem;
            color: #605F5D;
            font-family: Arial, sans-serif;
        }

        .wrapper-outer {
            width: 125.6rem;
            margin-left: auto;
            margin-right: auto;
            box-sizing: border-box;
            padding-left: 2rem;
            padding-right: 2rem;
        }

        .wrapper-inner {
            width: 107.2rem;
            margin-left: auto;
            margin-right: auto;
            box-sizing: border-box;
            padding-left: 3.2rem;
            padding-right: 3.2rem;
        }
    </style>
    <link rel="stylesheet" href="/dist/app.css">
    <script>
      window.PAGE_DATA = window.PAGE_DATA || {};
      window.PAGE_DATA = {
        develop: true
      }
    </script>
</head>
<body data-page="<?=$page?>" class="<?=$page?> loading">
<div style="display:none;">
    <svg xmlns="http://www.w3.org/2000/svg">
    
    </svg>
</div>
<div id="app">
    <div class="global-page">
        <header class="site-header"></header>

