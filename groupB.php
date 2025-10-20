
<!DOCTYPE html>
<html>
    <head>
        <!DOCTYPE html>
<html>
<head>
	<title>佳音英語雲端學院</title>
  <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- preload 字體 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;700&display=swap" rel="stylesheet">

  <link rel="preload" as="font" href="fonts/2021/Balloon.woff2" type="font/woff2" crossorigin>
  <link rel="preload" as="font" href="fonts/2021/Lato-Light.woff2" type="font/woff2" crossorigin>
  <link rel="preload" as="font" href="fonts/fontawesome-free-5.15.3/fa-solid-900.woff2" type="font/woff2" crossorigin>
  <link rel="preload" as="font" href="fonts/2021/genJyuuGothic-formatted/GenJyuuGothic-Bold.woff2" type="font/woff2" crossorigin>
  <link rel="preload" as="font" href="fonts/2021/genJyuuGothic-formatted/GenJyuuGothic-Medium.woff2" type="font/woff2" crossorigin>
  <!-- <link rel="preload" as="font" href="fonts/2021/NotoSansTC-Bold.woff2" type="font/woff2" crossorigin>
  <link rel="preload" as="font" href="fonts/2021/NotoSansTC-Light.woff2" type="font/woff2" crossorigin>
  <link rel="preload" as="font" href="fonts/2021/NotoSansTC-Regular.woff2" type="font/woff2" crossorigin> -->

	<!-- 目前的主要 CSS，使用 SCSS -->
	<link rel="stylesheet" href="css/2021/css/vendors.min.css" as="style">
	<link rel="stylesheet" href="css/2021/css/all.min.css" as="style">
	<link rel="stylesheet" href="css/2025/css/custom.css" as="style">
  <link rel="stylesheet" href="css/2025/act/index.css" as="style">

  <!-- 已加入 vendors -->
  <!-- <link href="includes/jAlert/dist/jAlert.css" rel="stylesheet" type="text/css"> -->

	<!-- Owl Carousel Assets -->
  <!-- <link href="css/owl.css" rel="stylesheet" media="screen">
  <link href="css/owl-carousel/owl.carousel.css" rel="stylesheet">
  <link href="css/owl-carousel/owl.theme.css" rel="stylesheet">
  <link href="css/owl-carousel/owl.transitions.css" rel="stylesheet"> -->
  

  <!-- css3 動畫 - 已經進去 vendors--> 
	<!-- <link href="css/font/mixins/animate.css" rel="stylesheet" media="screen"> -->

	<!-- Icon -->
  <!-- <link href="css/font/icon/style.css" rel="stylesheet" media="screen"> -->
		

	<!-- Favicon -->
		<link rel="shortcut icon" href="images/favicon.ico">
	
	<!-- HTML5 shim 和 Respond.js 讓IE8支援HTML5元素和媒體查詢 -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->

	<script src='includes/jQuery/jquery-3.6.0.min.js'></script>
	<script src="includes/vue/vue.min.js"></script>
	<script src="includes/axios/axios.min.js"></script>

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-9ST8NHEFKD"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-9ST8NHEFKD');
  </script>

  <!-- Google 分析碼 -->
  <!-- <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-12366302-29', 'auto');
    ga('send', 'pageview');
  </script> -->
  <script>
    
    $(function() {

		$.jTimeout({
			'timeoutAfter': 7200,
			'secondsPrior': 300,
			'onClickExtend': false,
			'extendOnMouseMove': false,
			'loginUrl': '/index.php?option=user_login',
			'onPriorCallback': function(timeout, seconds) {
			  $.jAlert({
				  'id': 'jTimeoutAlert',
				  'title': '**WARNING**',
				  'size': 'md',
				  'content': '<b>閒置時間過久，距離系統強制登出剩餘 <span class="jTimeout_Countdown">' + seconds + '</span> 秒</b>',
				  'theme': 'red',
				  'closeBtn': true,
				  'onOpen': function(alert) {
					  timeout.startPriorCountdown(alert.find('.jTimeout_Countdown'));
				  }
			  });
			},
			onTimeout: function(timeout) {
				$.jAlert({
					'id': 'jTimedoutAlert',
					'title': '**WARNING**',
					'content': '<b>登入時間已過，您將被登出。</b>',
					'theme': 'red',
					'btns': {
					  'text': '請重新登入',
					  'href': timeout.options.loginUrl,
					  'theme': 'blue',
					  'closeAlert': false
					},
					'closeOnClick': false,
					'closeBtn': false,
					'closeOnEsc': false
				});
			},
		});
    });
  </script>
</head>	</head>

	<body class="overflow-x-hidden position-relative font-Lato font-md">

        <div class="min-vh-100 d-flex flex-column bg-blue-sky z-9">
			           

<!-- <div class="header_after_login_stuffing"></div> -->
<!-- body.header_after_login_theme--white 會強制讓 header 呈現背景白色 -->
<header class="header_after_login font-NotoSansTC backdrop-blur-sm z-10">
    <div class="container">
        <nav class="navbar navbar-expand-lg align-items-end">

            <a class="navbar-brand" href="index.php?option=index">
                <!-- 測試版 
                <img class="nav-logo-blue" src="images/2021/shop/joyschool_logo_test.png" alt="雲端學院">
                <img class="nav-logo-white" src="images/2021/shop/joyschool_logo-white_test.png" alt="雲端學院">-->

                <img class="nav-logo-blue" src="images/2021/joyschool_logo.svg" alt="雲端學院">
                <img class="nav-logo-white" src="images/2021/joyschool_logo-white.svg" alt="雲端學院">
            </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon navbar-menu-offset text-white">
                    <i class="fas fa-bars"></i>
                </span>
            </button>
    
            <div class="collapse navbar-collapse flex-column align-items-end justify-content-between ml-1 space-y-lg-3" id="navbarNavDropdown">
                <!-- bg-white px-3 shadow rounded-pill => In large screen -->
                <div class="nav-account">
                    <ul class="navbar-nav space-x-lg-2">
                        <li class="nav-item active">
                            <a class="nav-link font-xl-base font-sm d-flex align-items-center space-x-2"
                                href="index.php?option=index">
                                <img src="images/2021/icons/nav/icon_home.svg" alt="home icon">
                                <span>首頁</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link font-xl-base font-sm d-flex align-items-center space-x-2"
                                href="index.php?option=list_news">
                                <img src="images/2021/icons/nav/icon_news.svg" alt="news icon">
                                <span>最新消息</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link font-xl-base font-sm d-flex align-items-center space-x-2"
                                href="index.php?option=list_exam_score">
                                <img src="images/2021/icons/nav/icon_report.svg" alt="report icon">
                                <span>分析報告</span>
                            </a>
                        </li>
                                                    <li class="nav-item">
                                <a class="nav-link font-xl-base font-sm d-flex align-items-center space-x-2"
                                    href="index.php?option=update_userinfo">
                                    <img src="images/2021/icons/nav/icon_userList.svg" alt="account information icon">
                                    <span>帳號資料</span>
                                </a>
                            </li>
                                                <li class="nav-item">
                            <a class="nav-link font-xl-base font-sm d-flex align-items-center space-x-2"
                                href="index.php?option=FAQ">
                                <img src="images/2021/icons/nav/icon_faq.svg" alt="faq icon">
                                <span>FAQ</span>
                            </a>
                        </li>
                                                    <li class="nav-item">
                                <a class="nav-link font-xl-base font-sm d-flex align-items-center space-x-2" id="logout" href="#">
                                    <img src="images/2021/icons/nav/icon_logout.svg" alt="logout icon">
                                    <span>登出</span>
                                </a>
                            </li>
                                            </ul>
                </div>
                <ul class="nav-link--hover navbar-nav align-self-stretch justify-content-between">
                    <li class="nav-item header_after_login_nav-dropdown js-nav-hover-cover-trigger"
                        data-nav-hover-cover="exam">
                        <a class="nav-link font-xl-base font-sm" role="button" data-toggle="dropdown">
                            <span>線上測驗</span>
                            <i class="fas fa-caret-down"></i>
                        </a>
                        <div class="dropdown-menu font-xl-base font-sm" aria-labelledby="dropdownExam">
                            <a class="dropdown-item" href="index.php?option=list_exam_level">線上評量</a>
							<!--  -->
                            <a class="dropdown-item" href="index.php?option=list_reading_level">Reading +</a>
                            <a class="dropdown-item" href="index.php?option=spell_rule">拼字練習</a>
                            <a class="dropdown-item" href="index.php?option=spell_mock_rule">拼字模擬</a>
                            <a class="dropdown-item" href="index.php?option=junior_rule">國中英語練習</a>
                            <a class="dropdown-item" href="index.php?option=gept_exam_system">GEPT模擬測驗</a>
                            <a class="dropdown-item" href="index.php?option=junior_exam_system">國中會考</a>
                            <a class="dropdown-item" href="index.php?option=online_resources">線上資源</a>
                        </div>
                    </li>

                                        
                    <li class="nav-item js-nav-hover-cover-trigger" data-nav-hover-cover="listen">
                        <a class="nav-link font-xl-base font-sm" href="index.php?option=listening_select_book">
                            聽力練習
                        </a>
                    </li>
                    <li class="nav-item js-nav-hover-cover-trigger" data-nav-hover-cover="game">
                        <a class="nav-link font-xl-base font-sm" href="joySchool.php">
                            互動遊戲
                        </a>
                    </li>
                    <li class="nav-item header_after_login_nav-dropdown js-nav-hover-cover-trigger"
                        data-nav-hover-cover="shop">
                        <a class="nav-link font-xl-base font-sm" href="index.php?option=list_shopping">
                            雲端商城
                        </a>
                        <!-- <div class="dropdown-menu" aria-labelledby="dropdownExam">
                            <a class="dropdown-item" href="index.php?option=shopping_rule">商城說明</a>
                            <a class="dropdown-item" href="index.php?option=shopping_mall">每月精品商品</a>
                            <a class="dropdown-item" href="index.php?option=shopping_exchange">兌換J幣</a>
                            <a class="dropdown-item" href="index.php?option=shopping_record">兌換紀錄查詢</a>
                        </div> -->
                    </li>
                    <!-- <li class="nav-item header_after_login_nav-dropdown js-nav-hover-cover-trigger" data-nav-hover-cover="dressing">
                        <a class="nav-link font-base" role="button" data-toggle="dropdown">
                            變裝世界
                            <i class="fas fa-caret-down"></i>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="/dressing/" target="_blank">變裝世界</a>
                            <a class="dropdown-item" href="index.php?option=dressing_intro">獎勵機制介紹</a>
                        </div>
                    </li> -->
                    <li class="nav-item js-nav-hover-cover-trigger" data-nav-hover-cover="joyhome">
                        <a class="nav-link font-xl-base font-sm" href="index.php?option=list_joyhome">
                            Joy@home
                        </a>
                    </li>
                    <!-- <li class="nav-item js-nav-hover-cover-trigger" data-nav-hover-cover="joychats">
                        <a class="nav-link font-xl-base font-sm" href="http://joychats.joy.com.tw/" target="_blank">
                            JoyChats
                        </a>
                    </li> -->
                    <li class="nav-item js-nav-hover-cover-trigger" data-nav-hover-cover="talk">
                        <a class="nav-link font-xl-base font-sm" href="index.php?option=joytalk_web" target="_blank">
                            Joy Talk
                        </a>
                    </li>
                    <li class="nav-item header_after_login_nav-dropdown js-nav-hover-cover-trigger" data-nav-hover-cover="streaming">
                        <a class="nav-link font-xl-base font-sm" role="button" data-toggle="dropdown">
                            <span>Joy Streaming</span>
                            <i class="fas fa-caret-down"></i>
                        </a>
                        <div class="dropdown-menu font-xl-base font-sm" aria-labelledby="dropdownExam">
                            <a class="dropdown-item" href="index.php?option=list_classroom_video&tab=dist" id="joy-online">Joy Online Lessons</a>
                            <a class="dropdown-item" href="index.php?option=list_classroom_video&tab=other" id="ready-joy">Ready, Set, Joy</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</header>

<div id="js-hover-cover-wrap" style="display: none" class="hover-cover bg-white fixed-top w-100 vh-100 z-9">
    <div class="d-flex flex-column w-100 h-100">
        <div class="header_after_login_stuffing"></div>
        <div class="w-100 h-100 flex-grow-1 position-relative">
            <!-- 聽力練習 -->
            <div id="js-hover-cover--listen" class="js-hover-cover-target position-absolute w-100 h-100 left-0" style="top: 50%; transform: translateY(-50%);display:none">
                <div class="container position-relative d-flex align-items-center h-100">
                    <div class="row position-relative z-5 w-100">
                        <div class="offset-md-1 offset-2xl-0 col-4">
                            <div class="font-genJyuuGothic bg-white-opacity-30 rounded-lg p-3">
                                <h2 class="font-4xl font-weight-bold mb-3">
                                    <span class="hover-cover__title--border-b--blue-sky">
                                        聽力練習
                                    </span>
                                </h2>
                                <div class="text-gray-normal space-y-1 pr-1">
                                    <p class="mb-0">音檔上雲端</p>
                                    <p class="mb-0">選擇想預習或複習的單元</p>
                                    <p class="mb-0">打開英語耳朵，跨越時空輕鬆學習</p>
                                    <p class="mb-0">開開心心學英語！</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute z-1 left-0 top-0 w-100 h-100 py-5 text-center d-flex justify-content-center">
                    <!-- <img class="h-100 w-auto" src="images/2021/shop/hover-cover_listen_test.jpg"  style="max-width:inherit;" alt=""> -->
                        <img class="h-100 w-auto" src="images/2021/nav-hover-cover/hover-cover_listen.jpg"  style="max-width:inherit;" alt="">
                    </div>
                </div>
            </div>
            <!-- 線上測驗 -->
            <div id="js-hover-cover--exam" class="js-hover-cover-target position-absolute w-100 h-100 left-0" style="top: 50%; transform: translateY(-50%);display:none">
                <div class="container position-relative d-flex align-items-center h-100">
                    <div class="row position-relative z-5 w-100">
                        <div class="offset-md-1 offset-2xl-0 col-4">
                            <div class="font-genJyuuGothic bg-white-opacity-30 rounded-lg p-3">
                                <h2 class="font-4xl font-weight-bold mb-3">
                                    <span class="hover-cover__title--border-b--pink">
                                        線上測驗
                                    </span>
                                </h2>
                                <div class="text-gray-normal space-y-1 pr-1">
                                    <p class="mb-0">內含多元豐富題型的題庫</p>
                                    <p class="mb-0">練習後可即時獲得回饋，加強學習弱點</p>
                                    <p class="mb-0">數位資源讓學習更智慧！</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute z-1 left-0 top-0 w-100 h-100 py-5 text-center d-flex justify-content-center">
                        <!-- <img class="h-100 w-auto" style="max-width:inherit;" src="images/2021/shop/hover-cover_exam_test.jpg" alt=""> -->
                        <img class="h-100 w-auto" style="max-width:inherit;" src="images/2021/nav-hover-cover/hover-cover_exam.jpg" alt="">
                    </div>
                </div>
            </div>
            <!-- 互動遊戲 -->
            <div id="js-hover-cover--game" class="js-hover-cover-target position-absolute w-100 h-100 left-0" style="top: 50%; transform: translateY(-50%);display:none">
                <div class="container position-relative d-flex align-items-center h-100">
                    <div class="row position-relative z-5 w-100">
                        <div class="offset-md-1 offset-2xl-0 col-4">
                            <div class="font-genJyuuGothic bg-white-opacity-30 rounded-lg p-3">
                                <h2 class="font-4xl font-weight-bold mb-3">
                                    <span class="hover-cover__title--border-b--blue-dark">
                                        互動遊戲
                                    </span>
                                </h2>
                                <div class="text-gray-normal space-y-1 pr-1">
                                    <p class="mb-0">當英語融入闖關挑戰</p>
                                    <p class="mb-0">用玩遊戲的精神創造活潑的情境</p>
                                    <p class="mb-0">在遊戲過程中，加深對題目的記憶</p>
                                    <p class="mb-0">還有金幣獎勵等你來拿唷！</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute z-1 left-0 top-0 w-100 h-100 py-5 text-center d-flex justify-content-center">
                        <!-- <img class="h-100 w-auto" src="images/2021/shop/hover-cover_game_test.jpg"  style="max-width:inherit;" alt=""> -->
                        <img class="h-100 w-auto" src="images/2021/nav-hover-cover/hover-cover_game.jpg"  style="max-width:inherit;" alt="">
                    </div>
                </div>
            </div>
			<!-- 雲端商城 -->
			<div id="js-hover-cover--shop" class="js-hover-cover-target position-absolute w-100 h-100 left-0" style="top: 50%; transform: translateY(-50%);display:none">
                <div class="container position-relative d-flex align-items-center h-100">
                    <div class="row position-relative z-5 w-100">
                        <div class="offset-md-1 offset-2xl-0 col-4">
                            <div class="font-genJyuuGothic bg-white-opacity-30 rounded-lg p-3">
                                <h2 class="font-4xl font-weight-bold mb-3">
                                    <span class="hover-cover__title--border-b--yellow-light">
                                        雲端商城
                                    </span>
                                </h2>
                                <div class="text-gray-normal space-y-1 pr-1">
                                    <p class="mb-0"></p>
                                    <p class="mb-0"></p>
                                    <p class="mb-0"></p>
                                    <p class="mb-0"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute z-1 left-0 top-0 w-100 h-100 py-5 text-center d-flex justify-content-center">
                        <!-- <img class="h-100 w-auto" src="images/2021/shop/hover-cover_shop_test.jpg"  style="max-width:inherit;" alt=""> -->
                        <img class="h-100 w-auto" src="images/2021/nav-hover-cover/hover-cover_shop.jpg"  style="max-width:inherit;" alt="">
                    </div>
                </div>
            </div>
			<!-- 變裝世界 -->
            <div id="js-hover-cover--dressing" class="js-hover-cover-target position-absolute w-100 h-100 left-0" style="top: 50%; transform: translateY(-50%);display:none">
                <div class="container position-relative d-flex align-items-center h-100">
                    <div class="row position-relative z-5 w-100">
                        <div class="offset-md-1 offset-2xl-0 col-4">
                            <div class="font-genJyuuGothic bg-white-opacity-30 rounded-lg p-3">
                                <h2 class="font-4xl font-weight-bold mb-3">
                                    <span class="hover-cover__title--border-b--yellow-light">
                                        變裝世界
                                    </span>
                                </h2>
                                <div class="text-gray-normal space-y-1 pr-1">
                                    <p class="mb-0">每月獨家限定佳音寶寶動態造型</p>
                                    <p class="mb-0">透過互動遊戲或線上評量</p>
                                    <p class="mb-0">來獲得金幣獎勵</p>
                                    <p class="mb-0">創造出屬於自己的佳音寶寶！</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute z-1 left-0 top-0 w-100 h-100 py-5 text-center d-flex justify-content-center">
                        <img class="h-100 w-auto" src="images/2021/nav-hover-cover/hover-cover_dressing.jpg"  style="max-width:inherit;" alt="">
                    </div>
                </div>
            </div>
            <!-- Joy home -->
            <div id="js-hover-cover--joyhome" class="js-hover-cover-target position-absolute w-100 h-100 left-0" style="top: 50%; transform: translateY(-50%);display:none">
                <div class="container position-relative d-flex align-items-center h-100">
                    <div class="row position-relative z-5 w-100">
                        <div class="offset-md-1 offset-2xl-0 col-4">
                            <div class="font-genJyuuGothic space-y-3 bg-white-opacity-30 rounded-lg p-3">
                                <img class="img-fluid" style="max-width:250px" src="images/2021/hover-cover_joyhome-logo.svg" alt="">
                                <div class="text-gray-normal space-y-0 pr-1">
                                    <p class="mb-0">課前預習、課後複習</p>
                                    <p class="mb-0">雲端學習無國界</p>
                                    <p class="mb-0">即時繳交作業，線上追蹤與掌握進度</p>
                                    <p class="mb-0">讓你擁有在家學習的超能力！</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute z-1 left-0 top-0 w-100 h-100 py-5 text-center d-flex justify-content-center">
                        <!-- <img class="h-100 w-auto" src="images/2021/shop/hover-cover_joyhome_test.jpg"  style="max-width:inherit;" alt=""> -->
                        <img class="h-100 w-auto" src="images/2021/nav-hover-cover/hover-cover_joyhome.jpg"  style="max-width:inherit;" alt="">
                    </div>
                </div>
            </div>
            <!-- joy chats -->
            <div id="js-hover-cover--joychats" class="js-hover-cover-target position-absolute w-100 h-100 left-0" style="top: 50%; transform: translateY(-50%);display:none">
                <div class="container position-relative d-flex align-items-center h-100">
                    <div class="row position-relative z-5 w-100">
                        <div class="offset-md-1 offset-2xl-0 col-5 col-xl-4">
                            <div class="font-genJyuuGothic space-y-3 bg-white-opacity-30 rounded-lg p-3">
                                <img class="img-fluid" style="max-width:250px" src="images/2021/hover-cover_joychats-logo.svg" alt="">
                                <div class="text-gray-normal space-y-0 pr-1">
                                    <p class="mb-0">透過 1 對 1 個人化練習</p>
                                    <p class="mb-0">涵蓋聽力、口說、字彙、文法及閱讀</p>
                                    <p class="mb-0">聊天同時培養英語力</p>
                                    <p class="mb-0">輕鬆掌握口說技巧</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute z-1 left-0 top-0 w-100 h-100 py-5 text-center d-flex justify-content-center">
                        <!-- <img class="h-100 w-auto" src="images/2021/shop/hover-cover_joychats_test.jpg"  style="max-width:inherit;" alt=""> -->
                        <img class="h-100 w-auto" src="images/2021/nav-hover-cover/hover-cover_joychats.jpg"  style="max-width:inherit;" alt="">
                    </div>
                </div>
            </div>

            <!-- Joy Talk -->
            <div id="js-hover-cover--talk" class="js-hover-cover-target position-absolute w-100 h-100 left-0" style="top: 50%; transform: translateY(-50%);display:none">
                <div class="container position-relative d-flex align-items-center h-100">
                    <div class="row position-relative z-5 w-100">
                        <div class="offset-md-1 offset-2xl-0 col-4">
                            <div class="font-genJyuuGothic bg-white-opacity-30 rounded-lg p-3">
                                <h2 class="font-4xl font-weight-bold mb-3">
                                    <span class="hover-cover__title--border-b--blue-sky">
                                        Joy Talk
                                    </span>
                                </h2>
                                <!-- <div class="text-gray-normal space-y-1 pr-1">
                                    <p class="mb-0">音檔上雲端</p>
                                    <p class="mb-0">選擇想預習或複習的單元</p>
                                    <p class="mb-0">打開英語耳朵，跨越時空輕鬆學習</p>
                                    <p class="mb-0">開開心心學英語！</p>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute z-1 left-0 top-0 w-100 h-100 py-5 text-center d-flex justify-content-center">
                    <!-- <img class="h-100 w-auto" src="images/2021/shop/hover-cover_listen_test.jpg"  style="max-width:inherit;" alt=""> -->
                        <img class="h-100 w-auto" src="images/2021/nav-hover-cover/hover-cover_JoyTalk.jpg"  style="max-width:inherit;" alt="">
                    </div>
                </div>
            </div>

            <!-- Joy Streaming -->
            <div id="js-hover-cover--streaming" class="js-hover-cover-target position-absolute w-100 h-100 left-0" style="top: 50%; transform: translateY(-50%);display:none">
                <div class="container position-relative d-flex align-items-center h-100">
                    <div class="row position-relative z-5 w-100">
                        <div class="offset-md-1 offset-2xl-0 col-4">
                            <div class="font-genJyuuGothic bg-white-opacity-30 rounded-lg p-3">
                                <h2 class="font-4xl font-weight-bold mb-3">
                                    <span class="hover-cover__title--border-b--blue-sky">
                                        Joy Streaming
                                    </span>
                                </h2>
                                <!-- <div class="text-gray-normal space-y-1 pr-1">
                                    <p class="mb-0">內含多元豐富題型的題庫</p>
                                    <p class="mb-0">練習後可即時獲得回饋，加強學習弱點</p>
                                    <p class="mb-0">數位資源讓學習更智慧！</p>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute z-1 left-0 top-0 w-100 h-100 py-5 text-center d-flex justify-content-center">
                    <!-- <img class="h-100 w-auto" src="images/2021/shop/hover-cover_listen_test.jpg"  style="max-width:inherit;" alt=""> -->
                        <img class="h-100 w-auto" src="images/2021/nav-hover-cover/hover-cover_joyStreaming.jpg"  style="max-width:inherit;" alt="">
                    </div>
                </div>
            </div>

            <!-- 數位 ACT -->
            <div id="js-hover-cover--act" class="js-hover-cover-target position-absolute w-100 h-100 left-0" style="top: 50%; transform: translateY(-50%);display:none">
                <div class="container position-relative d-flex align-items-center h-100">
                    <div class="row position-relative z-5 w-100">
                        <div class="offset-md-1 offset-2xl-0 col-4">
                            <div class="font-genJyuuGothic bg-white-opacity-30 rounded-lg p-3">
                                <h2 class="font-4xl font-weight-bold mb-3">
                                    <span class="hover-cover__title--border-b--blue-sky">
                                        數位 ACT
                                    </span>
                                </h2>
                                <div class="text-gray-normal space-y-1 pr-1">
                                    <p class="mb-0">透過數位互動作業練習</p>
                                    <p class="mb-0">訓練思考力、邏輯力與表達力</p>
                                    <p class="mb-0">輕鬆累積英語實力！</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute z-1 left-0 top-0 w-100 h-100 py-5 text-center d-flex justify-content-center">
                        <img class="h-100 w-auto" src="images/2021/nav-hover-cover/hover-cover_act.jpg"  style="max-width:inherit;" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    (function () {
        $(function () {

            $("#logout").on("click", function (e) {
                e.preventDefault();
                userLogout();
            });

            function userLogout() {
                $.ajax({
                    url: 'session.php',
                    type: 'POST',
                    data: { 'option': 'user_logout' },
                    success: function (response) {
                        if (response) {
                            alert(response);
                            return;
                        }
                        sessionStorage.removeItem('joyQuiz');
                        window.location.href = 'login.php';
                    }
                });
            };

            $('#navbarNavDropdown').on('show.bs.collapse', function () {
                bodyAddOverflow()
            })

            $('#navbarNavDropdown').on('hide.bs.collapse', function () {
                bodyRemoveOverflow()
            })


            // * Trigger `resizeEnd()` only after resizing finally
            var rtime;
            var timeout = false;
            var delta = 200;
            $(window).resize(function () {
                rtime = new Date();
                if (timeout === false) {
                    timeout = true;
                    setTimeout(resizeEnd, delta);
                }
            });

            function resizeEnd() {
                if (new Date() - rtime < delta) {
                    setTimeout(resizeEnd, delta);
                } else {
                    timeout = false;
                    bodyRemoveOverflow()
                }
            }
            function bodyAddOverflow() {
                if (!$('body').hasClass('overflow-hidden')) {
                    $('body').addClass('overflow-hidden')
                    $('.header_after_login').attr('style', 'overflow-y: auto')
                }
            }
            function bodyRemoveOverflow() {
                if ($('body').hasClass('overflow-hidden')) {
                    $('body').removeClass('overflow-hidden')
                    $('.header_after_login').attr('style', 'overflow-y: unset')
                }
            }
        })
    })();
    (function () {
        // * handle with Nav hover state
        $(function () {
            var hoverTargetElement = {
                exam: '#js-hover-cover--exam',
                listen: '#js-hover-cover--listen',
                game: '#js-hover-cover--game',
                dressing: '#js-hover-cover--dressing',
                shop: '#js-hover-cover--shop',
                joyhome: '#js-hover-cover--joyhome',
                joychats: '#js-hover-cover--joychats',
                talk: '#js-hover-cover--talk',
                streaming: '#js-hover-cover--streaming',
                act: '#js-hover-cover--act'
            }

            var hoverCover_Delay = 500,
                hoverCover_setTimeout,
                checkMouseenter_Delay = 300,
                checkMouseenter_setTimeout;

            // 預設 hover 會出現 cover，如果頁面上的 `$isActive_header_hover_action` 變數為 falsy 則會取消此 hover 功能
            var is_active_hover_action = true;
            is_active_hover_action = false;            if (is_active_hover_action) {
                hoverAction()
            }
            function hoverAction() {
                $('.js-nav-hover-cover-trigger').hover(
                    // * Mouseenter
                    function () {
                        // * do nothing while window width is below 768px
                        var targetId = $(this).attr('data-nav-hover-cover')
                        if (window.innerWidth > 768) {
                            clearTimeout(hoverCover_setTimeout)
                            checkMouseenter_setTimeout = setTimeout(function () {
                                header_nav_mouseenter(targetId)
                            }, checkMouseenter_Delay)
                        }
                    },
                    // * Mouseleave
                    function () {
                        // * do nothing while window width is below 768px
                        if (window.innerWidth > 768) {
                            clearTimeout(checkMouseenter_setTimeout)
                            hoverCover_setTimeout = setTimeout(header_nav_mouseLeave, hoverCover_Delay)
                        }
                    }
                )
            }

            function header_nav_mouseenter(targetId) {
                $('.js-hover-cover-target:not(' + hoverTargetElement[targetId] + ')').stop().fadeOut()
                $(hoverTargetElement[targetId]).stop().fadeIn()
                $('#js-hover-cover-wrap').stop().fadeIn(300)
                $('.header_after_login').addClass('theme--white')
            }

            function header_nav_mouseLeave() {
                $('.js-hover-cover-target').stop().fadeOut()
                $('#js-hover-cover-wrap').stop().fadeOut(300)
                $('.header_after_login').removeClass('theme--white')
            }
        })
    })();
    (function() {
        const linkJoyOnline = document.getElementById("joy-online");
        const linkReadySetJoy = document.getElementById("ready-joy");

        if (linkJoyOnline && linkReadySetJoy) {
            const originalTextJoyOnline = "Joy Online Lessons";
            const hoverTextJoyOnline = "外師教學頻道";

            const originalTextReadySetJoy = "Ready, Set, Joy";
            const hoverTextReadySetJoy = "佳音新生成長營";

            linkJoyOnline.addEventListener("mouseenter", function() {
                linkJoyOnline.textContent = hoverTextJoyOnline;
            });

            linkJoyOnline.addEventListener("mouseleave", function() {
                linkJoyOnline.textContent = originalTextJoyOnline;
            });

            linkReadySetJoy.addEventListener("mouseenter", function() {
                linkReadySetJoy.textContent = hoverTextReadySetJoy;
            });

            linkReadySetJoy.addEventListener("mouseleave", function() {
                linkReadySetJoy.textContent = originalTextReadySetJoy;
            });
        }
    })();
</script>
			<section id="list-exam-record"  class="card-exam bg-blue-sky flex-grow-1 pt-3">
				<div class="container-fluid position-relative z-2">
					<div class="row">
						<div class="col-12 col-lg-11 mx-auto">
							<div id="app" class="card shadow">
								<vue-template></vue-template>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- background images -->
<div class="cloud-background z-1">
    <div class="cloud-background__main">
        <img class="img-fluid" src="images/2021/bg_cloud_after_login.png">
    </div>
</div><section id="footer-login" class="position-relative z-3 py-3">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<p class="text-center mb-0 font-Lato font-weight-light">COPYRIGHT <span onClick="clearStorage()">©</span> JOY CORPORATION. ALL RIGHTS RESERVED.</p>           
			</div>
		</div> <!-- /.row -->
	</div> <!-- /.container -->
</section>

<script src="includes/bs-4.6/js/bootstrap.bundle.min.js"></script>
<script src="includes/extension/respond.js"></script>  <!-- 自適應圖片 -->
<script src='includes/jAlert/dist/jAlert.min.js'></script>
<script src='includes/jTimeout/dist/jTimeout.min.js'></script>
<script src='includes/countdown/dist/jquery.countdown.min.js'></script>

<script>
	// 自訂選項
	var botmanWidget = {
		frameEndpoint: 'https://digitalservice.joy.com.tw/botman/chat',
		title: '雲端學院 FAQ',
		introMessage: '打聲招呼 "hi" 開始互動吧！',
		aboutLink: 'https://testcloud.joy.com.tw/FAQ.php',
		aboutText: 'FAQ by TestCloud',
		mainColor: '#669dbd',
		bubbleBackground: '#669dbd',
		bubbleAvatarUrl: '/images/digitalservice/pudding.png',
		userId: 139501,
		desktopHeight: 550,
		desktopWidth: 450,
		placeholderText: '請輸入文字',
		mobileHeight: 550,
		mobileWidth: 350,
	};

  function clearStorage() {
    localStorage.removeItem('joy-streaming');
  }
</script>
<script src='includes/botman/widget.js'></script>

<div id="reminder">
    <div
      class="modal fade"
      ref="quizModal"
      tabindex="-1"
      aria-labelledby="quizModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-yellow-light">
          <div class="modal-body">
            <h3
              class="font-genJyuuGothic bg-gradient-pink-normal rounded-top rounded-3 text-white text-center py-2 mb-2"
              id="quizModalLabel"
            >
              Hi, {{ ename }}
            </h3>
            <p class="px-2">您有未進行的線上測驗/未觀看的課程影片，點擊以下連結前往</p>

            <div class="accordion" id="act-accordion">
              <div class="card" v-if="actList.length > 0">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button class="btn btn-link d-flex align-items-center" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <div style="width: 100px;">數位 ACT</div>
                      <i class="fas fa-caret-down" style="margin-left: 8px;"></i>
                      <span class="badge badge-danger" style="margin-left: 16px;">{{ actList.length }}</span>
                    </button>
                  </h2>
                </div>
                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#act-accordion">
                  <div class="card-body">
                    <ul>
                      <li v-for="(item, index) in actList" :key="'act-' + index" class="d-flex">
                        <div class="text-secondary" style="cursor: pointer; display: inline-flex; justify-content: flex-start;" @click="navigateTo(`index.php?option=start_act_exam&score_id=${item.score_id}&correct_status=1&system_type=${item.system_type}&book_level=${item.book_level}&unit=${item.unit}`)">
                          <div style="width: 60px;">{{ `${item.system_type} ${item.book_level}` }}</div>
                          <div style="width: 80px;">{{ `Unit ${item.unit}` }}</div>
                          <div>未訂正<i class="fas fa-external-link-alt text-secondary" style="margin-left: 0.5rem;"></i></div>
                        </div>
                        <!-- <a
                          class="text-secondary"
                          style="display: inline-flex; justify-content: flex-start;"
                          :href="`index.php?option=start_act_exam&score_id=${item.score_id}&correct_status=1&system_type=${item.system_type}&book_level=${item.book_level}&unit=${item.unit}`"
                        >
                          <div style="width: 60px;">{{ `${item.system_type} ${item.book_level}` }}</div>
                          <div style="width: 80px;">{{ `Unit ${item.unit}` }}</div>
                          <div>未訂正<i class="fas fa-external-link-alt text-secondary" style="margin-left: 0.5rem;"></i></div>
                        </a> -->
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="card" v-if="quizLinks && quizLinks.length > 0">
                <div class="card-header" id="headingTwo">
                  <h2 class="mb-0">
                    <button class="d-flex align-items-center btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <div style="width: 100px;">線上考試</div>
                      <i class="fas fa-caret-down" style="margin-left: 8px;"></i>
                      <span class="badge badge-danger" style="margin-left: 16px;">{{ quizLinks && quizLinks.length }}</span>
                    </button>
                  </h2>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#act-accordion">
                  <div class="card-body">
                    <ul>
                      <li v-for="link in quizLinks" :key="link.url" class="d-flex">
                        <div class="text-secondary" style="cursor: pointer; display: inline-flex; justify-content: flex-start;" @click="navigateTo(link.url)">{{ link.text }}</div>
                        <!-- <a
                          class="text-secondary"
                          style="display: inline-flex; justify-content: flex-start;"
                          :href="link.url"
                        >
                          {{ link.text }}
                        </a> -->
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="card" v-if="distList.length > 0">
                <div class="card-header" id="headingThree">
                  <h2 class="mb-0">
                    <button class="d-flex align-items-center btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      <div style="width: 150px;">Joy Streaming</div>
                      <i class="fas fa-caret-down" style="margin-left: 8px;"></i>
                      <span class="badge badge-danger" style="margin-left: 16px;">{{ distList.length }}</span>
                    </button>
                  </h2>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#act-accordion">
                  <div class="card-body">
                    <ul>
                      <li v-if="distList.length > 0">
                        <div style="color: #6ebb52; cursor: pointer;" @click="navigateTo('index.php?option=list_classroom_video&tab=dist')">Joy Online Lessons</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-primary text-white px-4 rounded-pill" @click="navigateTo()">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

            <script>
          new Vue({
            el: '#reminder',
            data() {
              return {
                userId: "139501",
                ename: "Xi Hu",
                exam: null,
                distList: [],
                actList: []
              }
            },
            computed: {
              quizLinks() {
                if (!this.exam) return [];
                
                return this.exam.map(assign => {
                  const cat = assign.EXAM_CAT.charAt(0);
                  const sys = assign.SYSTEM_TYPE;
                  const lvl = assign.LEVEL;
                  const seq = assign.ASSIGN_SEQ;
                  let url = '', text = '';

                  if (cat === 'F') {
                    // 期末考
                    const exam   = assign.EXAM_CAT.slice(0,2);
                    const paper  = assign.EXAM_CAT.charAt(1);
                    const type   = assign.EXAM_CAT.length === 3 ? assign.EXAM_CAT.slice(-1) : '';
                    const paperTxt = paper + '卷';
                    const typeTxt  = type === 'L' ? '聽力' : '讀寫';
                    url  = `index.php?option=final_start_exam&exam=${exam}&type=${type}&sys_type=${sys}&level=${lvl}&assign=${seq}`;
                    text = `期末考筆試 ${paperTxt} (${typeTxt})`;
                  }
                  else if (cat === 'R') {
                    // 指定小考
                    const review  = assign.EXAM_CAT.slice(0,2);
                    const around  = assign.EXAM_CAT.charAt(1);
                    const paper   = assign.EXAM_CAT.slice(-1);
                    const aroundTxt = `第${around}回`;
                    const paperTxt  = paper + '卷';
                    url  = `index.php?option=review_start_exam&sys_type=${sys}&level=${lvl}&exam=${paper}&review=${review}&assign=${seq}`;
                    text = `指定小考${aroundTxt} (${paperTxt})`;
                  }
                  else if (cat === 'U') {
                    // 單元小考
                    const unit   = assign.EXAM_CAT.slice(1,3);
                    url  = `index.php?option=unit_start_exam&sys_type=${sys}&level=${lvl}&unit=${unit}&exam=${cat}&assign=${seq}`;
                    text = `單元小考 Unit ${unit}`;
                  }
                  else if (cat === 'V') {
                    // 單字檢定
                    url  = `index.php?option=vocab_start_exam&sys_type=${sys}&level=${lvl}&exam=${cat}&assign=${seq}`;
                    text = '單字檢定';
                  }

                  return { url, text };
                });
              }
            },
            async mounted() {
              const el = this.$refs.quizModal;
              document.body.appendChild(el);

              const hidePopupToday = JSON.parse(localStorage.getItem('hide-popup-today'));
              if (!hidePopupToday || hidePopupToday < Date.now()) {
                await Promise.all([
                  this.getQuizList(),
                  this.getACTList(),
                  this.getDistList()
                ]);
                if ((this.exam && this.exam.length > 0) || (this.distList && this.distList.length > 0) || (this.actList && this.actList.length > 0)) {
                  this.$nextTick(() => {
                    $(this.$refs.quizModal).modal('show');
                  });
                }
              }
            },
            methods: {
              async getQuizList() {
                let params = new URLSearchParams();
                params.append('option', 'Quiz@getAssignExam');
                params.append('usr_seq', this.userId);

                try {
                  const { data } = await axios.post('/api.php', params);
                  this.exam = data.exam;
                } catch (err) {
                  console.log(err);
                }
              },
              async getDistList() {
                let params = new URLSearchParams();
                params.append('option', 'Distribution@getDistribution_Stream');
                params.append('userId', this.userId);
                params.append('is_reminder', 'Y');

                try {
                  const { data } = await axios.post('/api.php', params);

                  this.distList = data.data;
                } catch (err) {
                  console.log(err);
                }
              },
              async getACTList() {
                let params = new URLSearchParams();
                params.append('option', 'Activity@remindAct');
                params.append('user_id', this.userId);

                try {
                  const { data } = await axios.post('/api.php', params);

                  this.actList = data.data;
                } catch (err) {
                  console.log(err);
                }
              },
              navigateTo(url) {
                // this.saveToLocalStorage();
                const now = new Date();
                const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

                localStorage.setItem('hide-popup-today', endOfDay.getTime());

                if (url) {
                  window.location.href = url;
                } else {
                  $(this.$refs.quizModal).modal('hide');
                }
              },
              saveToLocalStorage() {
                // localStorage.setItem('exam', JSON.stringify(this.exam));
                // localStorage.setItem('distList', JSON.stringify(this.distList));
                // localStorage.setItem('actList', JSON.stringify(this.actList));
              }
            }
          })
        </script>		</div>

		<template id="vue-template">
			<div class="card-body d-flex flex-wrap p-4">
				<template v-for="(item, index) in list_spell">
					<div class="w-100" :key="index" v-if="compare_result[index + 1]">
						<div :id="`question_number_${index + 1}`" class="list_questions">
						
							<!-- 題號 -->
							<div class="row d-flex align-items-center m-0 p-0">
								<p class="question-num text-white rounded mr-2 mb-0">Q</p>
								<p class="mb-0">{{ `${index + 1}${item['QUESTION_TYPE']}` }}</p>
							</div>
							
							<!-- 題目文字 -->
							<div class="row m-0 p-0">
								<p v-if="item['QUESTION_TEXT']" v-html="item['QUESTION_TEXT']" class='question-text font-xl text-left py-2'></p>
							</div>
							
							<!-- 題目圖檔 -->
							<div class="row d-flex justify-content-center m-0 p-0">
								<img v-if="item['QUESTION_PIC']" class='card-body-photo img-fluid mb-5 lazyload' :src="item['QUESTION_PIC']" loading="lazy">
							</div>

							<!-- 看圖拼字顯示提示 -->
							<div class="row d-flex justify-content-center m-0 p-0">
								<p v-if="item['QUESTION_TYPE']" class="font-2xl mb-6">{{`${item['QUESTION_HEAD']}_____________${item['QUESTION_FOOT']}`}}</p>
							</div>
								
							<!-- 答案訂正區 -->
							<div class="card-body__answer-wrap border border-gray-100 shadow-sm pb-2">
								<p class="text-white pt-1 pl-2">{{item['GRP_SORTING'] > 0 ? item['GRP_SORTING'] : 'A'}} .</p>

								<div class="exam-answer-group__report d-flex flex-wrap justify-content-between align-self-stretch">
									<div class="junior-group">
										<span class='badge check_badge right'><i class='fas fa-lg fa-check'></i></span>
										<label class="answer"><span class="line">{{item['CORRECT_ANSWER']}}</span></label>
									</div>
									
									<div class="junior-group">							
										<span class="badge check_badge error"><i class="fas fa-lg fa-times"></i>
										</span>

										<label class="answer">
											{{ answer_record[index + 1] ? answer_record[index + 1] : calculate_line(item['CORRECT_ANSWER'].length) }}
										</label>
									</div>
								</div>
							</div>

							<!-- 題目編號 -->  
							<div class="row m-0 p-0">
								<p class="question-id text-right mb-0 py-2">ID:{{item['EXAM_SEQ']}}</p>
							</div>    

						</div>
					</div>
				</template>
			</div>
		</template>

		<script>
			(() => {
				const list_spell = [{"EXAM_SEQ":"2644","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_141.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=1f61dcd2375fe54c306beeedb8e1dfee287eedb15dcafcf570eff6f4d3c88de3","QUESTION_HEAD":"l","QUESTION_FOOT":"n","CORRECT_ANSWER":"lemon","GRP_SORTING":"0"},{"EXAM_SEQ":"921","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_047.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=a336d140927f0c0f10636e5de4a79047613a112af76844ff59428352ddb45ee7","QUESTION_HEAD":"c","QUESTION_FOOT":"ks","CORRECT_ANSWER":"chopsticks","GRP_SORTING":"0"},{"EXAM_SEQ":"3745","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/2023\/MJA\/mja_022.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=bf6d0e20c807179ebdf5e178358909195e297955310bfb84fd5f5d111a9726b7","QUESTION_HEAD":"f","QUESTION_FOOT":"r","CORRECT_ANSWER":"farmer","GRP_SORTING":"0"},{"EXAM_SEQ":"3126","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_153.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=86942a8f85a6a309822e36260dcedfb3309d2620dcf343605679fe1c3a9801c8","QUESTION_HEAD":"b","QUESTION_FOOT":"y","CORRECT_ANSWER":"butterfly","GRP_SORTING":"0"},{"EXAM_SEQ":"2004","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_101.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=4fe8952483a0cfe2f95aaa8f6e271ed79fe30a61ca75b6813eaf167d028d4654","QUESTION_HEAD":"k","QUESTION_FOOT":"e","CORRECT_ANSWER":"kite","GRP_SORTING":"0"},{"EXAM_SEQ":"2632","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_129.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=1e3ea8d845ffb48103ccda54d2e3fbcbaf221f14a543c06eddb47370391f249b","QUESTION_HEAD":"s","QUESTION_FOOT":"n","CORRECT_ANSWER":"seven","GRP_SORTING":"0"},{"EXAM_SEQ":"934","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_060.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=d4a974610afb9e1c54d2a7c127005e4fca503a50e0ad802c0f8dd041c16dbca4","QUESTION_HEAD":"r","QUESTION_FOOT":"d","CORRECT_ANSWER":"read","GRP_SORTING":"0"},{"EXAM_SEQ":"2011","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_108.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=9585bc785f4cd4b3ea27229caf1f8821bf9863ba083a5e5c90aa26f604cc3503","QUESTION_HEAD":"d","QUESTION_FOOT":"r","CORRECT_ANSWER":"doctor","GRP_SORTING":"0"},{"EXAM_SEQ":"3750","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/2023\/MJA\/mja_027.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=e4a2a17cc4a4a140f723ac848b45d32d9c6d5485c493a382da37e98fa272049c","QUESTION_HEAD":"s","QUESTION_FOOT":"i","CORRECT_ANSWER":"sushi","GRP_SORTING":"0"},{"EXAM_SEQ":"186","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_015.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=1d0aaf2d6928f739759079b628f74410e56c348099e90bbc36ce6332a7ae3416","QUESTION_HEAD":"s","QUESTION_FOOT":"r","CORRECT_ANSWER":"sticker","GRP_SORTING":"0"},{"EXAM_SEQ":"1304","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_069.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=1bd437d78e7954e2cc28468f9bba9e9c92454d9e6568933f8825f3b612734023","QUESTION_HEAD":"u","QUESTION_FOOT":"r","CORRECT_ANSWER":"under","GRP_SORTING":"0"},{"EXAM_SEQ":"3135","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_162.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=162555deab324261ed79525caf465941a19e287eeef0951949262931c8b1283a","QUESTION_HEAD":"s","QUESTION_FOOT":"h","CORRECT_ANSWER":"sandwich","GRP_SORTING":"0"},{"EXAM_SEQ":"2646","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_143.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=dceac90cc0c7f46d182860ebf3025c0af169810a7f39f1b4912cf254b9b503ec","QUESTION_HEAD":"w","QUESTION_FOOT":"y","CORRECT_ANSWER":"windy","GRP_SORTING":"0"},{"EXAM_SEQ":"2641","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_138.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=35ead3e5915ff279560f7f8101d9cb8283baf0f40f7913e3cf44f7439b6591e9","QUESTION_HEAD":"T","QUESTION_FOOT":"n","CORRECT_ANSWER":"Taiwan","GRP_SORTING":"0"},{"EXAM_SEQ":"3733","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/2023\/MJA\/mja_010.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=aa67b70b4661e319df4edfb33aeedf16a26ed0aa4ea1ea23cc1deaaa99bf02b9","QUESTION_HEAD":"w","QUESTION_FOOT":"h","CORRECT_ANSWER":"watch","GRP_SORTING":"0"},{"EXAM_SEQ":"3753","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/2023\/MJA\/mja_030.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=17444ee01ca75a357bc54e765f19a993f5a02dfc4ef216cc9bd819ab4f7b51e6","QUESTION_HEAD":"d","QUESTION_FOOT":"r","CORRECT_ANSWER":"door","GRP_SORTING":"0"},{"EXAM_SEQ":"2642","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_139.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=f208038fd9c3196faf7bb6ba15530d87e3004816991956b924a08e76cc52b1ff","QUESTION_HEAD":"f","QUESTION_FOOT":"r","CORRECT_ANSWER":"flower","GRP_SORTING":"0"},{"EXAM_SEQ":"3148","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_175.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=028584f25597e5515338841ab599131ceb54860f409563d0139eeb17d5833737","QUESTION_HEAD":"b","QUESTION_FOOT":"r","CORRECT_ANSWER":"bear","GRP_SORTING":"0"},{"EXAM_SEQ":"3726","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/2023\/MJA\/mja_003.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=e75e4b12132c615d86a479106cc67011a054aecf7829cb4f2d7ee21bc56a8a48","QUESTION_HEAD":"c","QUESTION_FOOT":"n","CORRECT_ANSWER":"crayon","GRP_SORTING":"0"},{"EXAM_SEQ":"930","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_056.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=a3782962eccf599e1c39b0d6da21fc597aa1768a7c678273dd96e384eefb0b00","QUESTION_HEAD":"p","QUESTION_FOOT":"a","CORRECT_ANSWER":"papaya","GRP_SORTING":"0"},{"EXAM_SEQ":"2010","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_107.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=c3ce4905b7f5e77d0a93909a80dda315f16c6b79085d27d1916c3f3772b99ec5","QUESTION_HEAD":"d","QUESTION_FOOT":"k","CORRECT_ANSWER":"desk","GRP_SORTING":"0"},{"EXAM_SEQ":"1321","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_086.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=9ff355fc1bf031b5643a0242065ea4469093fd9ac0c4008138c3bcdd4d31f684","QUESTION_HEAD":"j","QUESTION_FOOT":"e","CORRECT_ANSWER":"juice","GRP_SORTING":"0"},{"EXAM_SEQ":"929","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_055.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=afb579e44a3f77f8e5d441c575e1542fc28278fe2806fcc37177ff2eeac72773","QUESTION_HEAD":"s","QUESTION_FOOT":"r","CORRECT_ANSWER":"sugar","GRP_SORTING":"0"},{"EXAM_SEQ":"1999","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_096.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=c994ce325d38f07371c4c2449bb7a356d9b724ab322a8019ad5ac2f9b734d1df","QUESTION_HEAD":"m","QUESTION_FOOT":"y","CORRECT_ANSWER":"monkey","GRP_SORTING":"0"},{"EXAM_SEQ":"188","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_017.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=b2764e038ec09409d45fc0e7b80256bee04cd13828724c920b9bca1e22cf6c58","QUESTION_HEAD":"f","QUESTION_FOOT":"t","CORRECT_ANSWER":"feet","GRP_SORTING":"0"},{"EXAM_SEQ":"2633","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_130.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=498f6c37d5a86abe900fcfb96db0f8dedeabbeea428cf6e975c4799ee79bc5f9","QUESTION_HEAD":"c","QUESTION_FOOT":"p","CORRECT_ANSWER":"cap","GRP_SORTING":"0"},{"EXAM_SEQ":"1315","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_080.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=1148e21df4872337ab2e9ee8a977dd1320fc6d219a941641c6d38128b56c100c","QUESTION_HEAD":"m","QUESTION_FOOT":"n","CORRECT_ANSWER":"magician","GRP_SORTING":"0"},{"EXAM_SEQ":"1317","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_082.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=76434261f103bd7f8847435fb2378dbb3f66b0c8886ce4875818a3e71edfcf2e","QUESTION_HEAD":"s","QUESTION_FOOT":"k","CORRECT_ANSWER":"sick","GRP_SORTING":"0"},{"EXAM_SEQ":"928","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_054.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=30c57bf34471a8db63744f3cec42ddc5aa2c1d5f789222e5b518e1478fe957ca","QUESTION_HEAD":"tape r","QUESTION_FOOT":"r","CORRECT_ANSWER":"recorder","GRP_SORTING":"0"},{"EXAM_SEQ":"3152","QUESTION_TYPE":"\u770b\u5716\u62fc\u5b57","QUESTION_TEXT":"","QUESTION_PIC":"https:\/\/joytscloud.s3.ap-northeast-1.amazonaws.com\/files\/albums\/spell\/MJA\/mja_179.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHZXP3JBXL2C4CT5%2F20251007%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T143539Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=a0fb3d278f001830f72f27a36dc901931d5cf3a05b4645707454e6d8b8239af4","QUESTION_HEAD":"j","QUESTION_FOOT":"t","CORRECT_ANSWER":"jacket","GRP_SORTING":"0"},{"EXAM_SEQ":"3183","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"I want two h_____ers and three hot dogs.","QUESTION_PIC":"","QUESTION_HEAD":"h","QUESTION_FOOT":"ers","CORRECT_ANSWER":"hamburgers","GRP_SORTING":"0"},{"EXAM_SEQ":"2679","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Amy is riding a s_____d at the park.","QUESTION_PIC":"","QUESTION_HEAD":"s","QUESTION_FOOT":"d","CORRECT_ANSWER":"skateboard","GRP_SORTING":"0"},{"EXAM_SEQ":"3790","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"I'm hungry. I want a h_____r.","QUESTION_PIC":"","QUESTION_HEAD":"h","QUESTION_FOOT":"r","CORRECT_ANSWER":"hamburger","GRP_SORTING":"0"},{"EXAM_SEQ":"947","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"There are two pencils and one e_____r in my bag.","QUESTION_PIC":"","QUESTION_HEAD":"e","QUESTION_FOOT":"r","CORRECT_ANSWER":"eraser","GRP_SORTING":"0"},{"EXAM_SEQ":"3791","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Meggie has a fruit s_____d and an ice cream for dinner (\u665a\u9910).","QUESTION_PIC":"","QUESTION_HEAD":"s","QUESTION_FOOT":"d","CORRECT_ANSWER":"salad","GRP_SORTING":"0"},{"EXAM_SEQ":"2684","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Peter is riding a s_____r to school.","QUESTION_PIC":"","QUESTION_HEAD":"s","QUESTION_FOOT":"r","CORRECT_ANSWER":"scooter","GRP_SORTING":"0"},{"EXAM_SEQ":"1349","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"S_____ks are sea (\u6d77\u6d0b) animals.","QUESTION_PIC":"","QUESTION_HEAD":"S","QUESTION_FOOT":"ks","CORRECT_ANSWER":"Sharks","GRP_SORTING":"0"},{"EXAM_SEQ":"2025","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"My brother is 7 years old.  He is a cute b_____y.","QUESTION_PIC":"","QUESTION_HEAD":"b","QUESTION_FOOT":"y","CORRECT_ANSWER":"boy","GRP_SORTING":"0"},{"EXAM_SEQ":"3155","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Billy is my c_____n. His father and my father are brothers.","QUESTION_PIC":"","QUESTION_HEAD":"c","QUESTION_FOOT":"n","CORRECT_ANSWER":"cousin","GRP_SORTING":"0"},{"EXAM_SEQ":"1347","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Kenny has five pets: a dog, two cats, and two r_____its.","QUESTION_PIC":"","QUESTION_HEAD":"r","QUESTION_FOOT":"its","CORRECT_ANSWER":"rabbits","GRP_SORTING":"0"},{"EXAM_SEQ":"23","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"The pig is fat. It's not t_____n.","QUESTION_PIC":"","QUESTION_HEAD":"t","QUESTION_FOOT":"n","CORRECT_ANSWER":"thin","GRP_SORTING":"0"},{"EXAM_SEQ":"231","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"I'm b_____ed. Can you play games with me?","QUESTION_PIC":"","QUESTION_HEAD":"b","QUESTION_FOOT":"ed","CORRECT_ANSWER":"bored","GRP_SORTING":"0"},{"EXAM_SEQ":"3192","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Andy is tired. He is sl_____y.","QUESTION_PIC":"","QUESTION_HEAD":"sl","QUESTION_FOOT":"y","CORRECT_ANSWER":"sleepy","GRP_SORTING":"0"},{"EXAM_SEQ":"2050","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Good morning! Let's go to s_____l.","QUESTION_PIC":"","QUESTION_HEAD":"s","QUESTION_FOOT":"l","CORRECT_ANSWER":"school","GRP_SORTING":"0"},{"EXAM_SEQ":"2036","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Those boxes are full. They're h_____y.","QUESTION_PIC":"","QUESTION_HEAD":"h","QUESTION_FOOT":"y","CORRECT_ANSWER":"heavy","GRP_SORTING":"0"},{"EXAM_SEQ":"3792","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Mom is t_____ed. She is sleepy.","QUESTION_PIC":"","QUESTION_HEAD":"t","QUESTION_FOOT":"ed","CORRECT_ANSWER":"tired","GRP_SORTING":"0"},{"EXAM_SEQ":"2687","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Put some cookies in the p_____e, not in the bowl.","QUESTION_PIC":"","QUESTION_HEAD":"p","QUESTION_FOOT":"e","CORRECT_ANSWER":"plate","GRP_SORTING":"0"},{"EXAM_SEQ":"203","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"The boy is weak. He's not s_____g.","QUESTION_PIC":"","QUESTION_HEAD":"s","QUESTION_FOOT":"g","CORRECT_ANSWER":"strong","GRP_SORTING":"0"},{"EXAM_SEQ":"2683","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"There are many b_____lies and bees at the park.","QUESTION_PIC":"","QUESTION_HEAD":"b","QUESTION_FOOT":"lies","CORRECT_ANSWER":"butterflies","GRP_SORTING":"0"},{"EXAM_SEQ":"3182","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"We can see many famous (\u6709\u540d\u7684) pictures in this m_____m.","QUESTION_PIC":"","QUESTION_HEAD":"m","QUESTION_FOOT":"m","CORRECT_ANSWER":"museum","GRP_SORTING":"0"},{"EXAM_SEQ":"215","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"It is not sunny. It's r_____y.","QUESTION_PIC":"","QUESTION_HEAD":"r","QUESTION_FOOT":"y","CORRECT_ANSWER":"rainy","GRP_SORTING":"0"},{"EXAM_SEQ":"1343","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"They don't like cookies. They like c_____e bars.","QUESTION_PIC":"","QUESTION_HEAD":"c","QUESTION_FOOT":"e","CORRECT_ANSWER":"chocolate","GRP_SORTING":"0"},{"EXAM_SEQ":"2062","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"I have a lunchbox and a banana in my b_____k.","QUESTION_PIC":"","QUESTION_HEAD":"b","QUESTION_FOOT":"k","CORRECT_ANSWER":"backpack","GRP_SORTING":"0"},{"EXAM_SEQ":"936","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"It's raining(\u4e0b\u96e8) now. Take an u_____a.","QUESTION_PIC":"","QUESTION_HEAD":"u","QUESTION_FOOT":"a","CORRECT_ANSWER":"umbrella","GRP_SORTING":"0"},{"EXAM_SEQ":"2059","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Eric likes g_____es, but he doesn\u2019t like lemons.","QUESTION_PIC":"","QUESTION_HEAD":"g","QUESTION_FOOT":"es","CORRECT_ANSWER":"grapes","GRP_SORTING":"0"},{"EXAM_SEQ":"3191","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Sam has a cool r_____ot. It can talk and walk.","QUESTION_PIC":"","QUESTION_HEAD":"r","QUESTION_FOOT":"ot","CORRECT_ANSWER":"robot","GRP_SORTING":"0"},{"EXAM_SEQ":"2682","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Meg likes s_____ries. They are red and sweet (\u751c\u7684).","QUESTION_PIC":"","QUESTION_HEAD":"s","QUESTION_FOOT":"ries","CORRECT_ANSWER":"strawberries","GRP_SORTING":"0"},{"EXAM_SEQ":"3196","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"I want l_____ps and chocolate bars. They are sweet (\u751c\u7684).","QUESTION_PIC":"","QUESTION_HEAD":"l","QUESTION_FOOT":"ps","CORRECT_ANSWER":"lollipops","GRP_SORTING":"0"},{"EXAM_SEQ":"1330","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Don't talk with your m_____h full.","QUESTION_PIC":"","QUESTION_HEAD":"m","QUESTION_FOOT":"h","CORRECT_ANSWER":"mouth","GRP_SORTING":"0"},{"EXAM_SEQ":"204","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"The cat is in f_____t of the door.","QUESTION_PIC":"","QUESTION_HEAD":"f","QUESTION_FOOT":"t","CORRECT_ANSWER":"front","GRP_SORTING":"0"},{"EXAM_SEQ":"2658","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Twelve is b_____n eleven and thirteen.","QUESTION_PIC":"","QUESTION_HEAD":"b","QUESTION_FOOT":"n","CORRECT_ANSWER":"between","GRP_SORTING":"0"},{"EXAM_SEQ":"3181","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"There are some bees and bugs around the f_____rs.","QUESTION_PIC":"","QUESTION_HEAD":"f","QUESTION_FOOT":"rs","CORRECT_ANSWER":"flowers","GRP_SORTING":"0"},{"EXAM_SEQ":"973","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"John can speak English(\u8aaa\u82f1\u8a9e). He is from E_____d.","QUESTION_PIC":"","QUESTION_HEAD":"E","QUESTION_FOOT":"d","CORRECT_ANSWER":"England","GRP_SORTING":"0"},{"EXAM_SEQ":"1358","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"There are many p_____e at the park.  Why?","QUESTION_PIC":"","QUESTION_HEAD":"p","QUESTION_FOOT":"e","CORRECT_ANSWER":"people","GRP_SORTING":"0"},{"EXAM_SEQ":"3763","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Kevin has three pens in his p_____l case.","QUESTION_PIC":"","QUESTION_HEAD":"p","QUESTION_FOOT":"l","CORRECT_ANSWER":"pencil","GRP_SORTING":"0"},{"EXAM_SEQ":"3781","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Gary is not from England. He is from F_____e. ","QUESTION_PIC":"","QUESTION_HEAD":"F","QUESTION_FOOT":"e","CORRECT_ANSWER":"France","GRP_SORTING":"0"},{"EXAM_SEQ":"967","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"The box is e_____y. There is nothing(\u6c92\u6709\u6771\u897f) in it.","QUESTION_PIC":"","QUESTION_HEAD":"e","QUESTION_FOOT":"y","CORRECT_ANSWER":"empty","GRP_SORTING":"0"},{"EXAM_SEQ":"2690","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"David is eating with a knife and f_____k.","QUESTION_PIC":"","QUESTION_HEAD":"f","QUESTION_FOOT":"k","CORRECT_ANSWER":"fork","GRP_SORTING":"0"},{"EXAM_SEQ":"2052","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"I have a fork, but I don't have a k_____e.  Can you pass it to me?","QUESTION_PIC":"","QUESTION_HEAD":"k","QUESTION_FOOT":"e","CORRECT_ANSWER":"knife","GRP_SORTING":"0"},{"EXAM_SEQ":"3180","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Tina is a s_____r. She can sing very well.","QUESTION_PIC":"","QUESTION_HEAD":"s","QUESTION_FOOT":"r","CORRECT_ANSWER":"singer","GRP_SORTING":"0"},{"EXAM_SEQ":"2676","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"There is a dog b_____d the door.","QUESTION_PIC":"","QUESTION_HEAD":"b","QUESTION_FOOT":"d","CORRECT_ANSWER":"behind","GRP_SORTING":"0"},{"EXAM_SEQ":"225","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Let's sing and d_____e together.","QUESTION_PIC":"","QUESTION_HEAD":"d","QUESTION_FOOT":"e","CORRECT_ANSWER":"dance","GRP_SORTING":"0"},{"EXAM_SEQ":"3793","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"The jump rope is two h_____d dollars.","QUESTION_PIC":"","QUESTION_HEAD":"h","QUESTION_FOOT":"d","CORRECT_ANSWER":"hundred","GRP_SORTING":"0"},{"EXAM_SEQ":"1351","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"Sam is hungry.  He wants some sushi r_____ls.","QUESTION_PIC":"","QUESTION_HEAD":"r","QUESTION_FOOT":"ls","CORRECT_ANSWER":"rolls","GRP_SORTING":"0"},{"EXAM_SEQ":"2664","QUESTION_TYPE":"\u6587\u610f\u5b57\u5f59","QUESTION_TEXT":"The puzzle is one t_____d dollars.","QUESTION_PIC":"","QUESTION_HEAD":"t","QUESTION_FOOT":"d","CORRECT_ANSWER":"thousand","GRP_SORTING":"0"},{"EXAM_SEQ":"983","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: What's your t______ne number?<br\/>B: 2701-6769.","QUESTION_PIC":"","QUESTION_HEAD":"t","QUESTION_FOOT":"ne","CORRECT_ANSWER":"telephone","GRP_SORTING":"0"},{"EXAM_SEQ":"28","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Are there any b_____gs at the park?<br\/>B: Yes, there are. There are some bees.","QUESTION_PIC":"","QUESTION_HEAD":"b","QUESTION_FOOT":"gs","CORRECT_ANSWER":"bugs","GRP_SORTING":"0"},{"EXAM_SEQ":"248","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Look! There are some birthday c_____ds on the desk.<br\/>B: They are for Andy. It's his birthday.","QUESTION_PIC":"","QUESTION_HEAD":"c","QUESTION_FOOT":"ds","CORRECT_ANSWER":"cards","GRP_SORTING":"0"},{"EXAM_SEQ":"1384","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Where is the playground?.<br\/>B: It's n_____r the park","QUESTION_PIC":"","QUESTION_HEAD":"n","QUESTION_FOOT":"r","CORRECT_ANSWER":"near","GRP_SORTING":"0"},{"EXAM_SEQ":"3817","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: What does Iris want?<\/br>B: She wants a c_____er. She can play games on it.","QUESTION_PIC":"","QUESTION_HEAD":"c","QUESTION_FOOT":"er","CORRECT_ANSWER":"computer","GRP_SORTING":"0"},{"EXAM_SEQ":"1004","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Is your sister t_____l?<br\/>B: Yes. She is 185 centimeters.","QUESTION_PIC":"","QUESTION_HEAD":"t","QUESTION_FOOT":"l","CORRECT_ANSWER":"tall","GRP_SORTING":"0"},{"EXAM_SEQ":"987","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Do you want some pizza?<br\/>B: No, I don't. I am not h_____y.","QUESTION_PIC":"","QUESTION_HEAD":"h","QUESTION_FOOT":"y","CORRECT_ANSWER":"hungry","GRP_SORTING":"0"},{"EXAM_SEQ":"3209","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: How much are the p_____rs?<\/br>B: They are eighty dollars, and the oranges are fifty dollars.","QUESTION_PIC":"","QUESTION_HEAD":"p","QUESTION_FOOT":"rs","CORRECT_ANSWER":"pears","GRP_SORTING":"0"},{"EXAM_SEQ":"1388","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Where's Billy?<br\/>B: He's e_____ting in the dining room.","QUESTION_PIC":"","QUESTION_HEAD":"e","QUESTION_FOOT":"ting","CORRECT_ANSWER":"eating","GRP_SORTING":"0"},{"EXAM_SEQ":"998","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: How is the w_____r?<br\/>B: It is sunny.","QUESTION_PIC":"","QUESTION_HEAD":"w","QUESTION_FOOT":"r","CORRECT_ANSWER":"weather","GRP_SORTING":"0"},{"EXAM_SEQ":"1373","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: What t_____e is it?<br\/>B: It's ten o'clock.","QUESTION_PIC":"","QUESTION_HEAD":"t","QUESTION_FOOT":"e","CORRECT_ANSWER":"time","GRP_SORTING":"0"},{"EXAM_SEQ":"3218","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: What is your c_____e number?<\/br>B: It's 0952-606-111.","QUESTION_PIC":"","QUESTION_HEAD":"c","QUESTION_FOOT":"e","CORRECT_ANSWER":"cellphone","GRP_SORTING":"0"},{"EXAM_SEQ":"3212","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Where is Anna?<\/br>B: She is at the o_____e. She is working.","QUESTION_PIC":"","QUESTION_HEAD":"o","QUESTION_FOOT":"e","CORRECT_ANSWER":"office","GRP_SORTING":"0"},{"EXAM_SEQ":"990","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Oh, no. We're lost(\u8ff7\u8def).<br\/>B: Let's look at(\u770b) the m_____p.","QUESTION_PIC":"","QUESTION_HEAD":"m","QUESTION_FOOT":"p","CORRECT_ANSWER":"map","GRP_SORTING":"0"},{"EXAM_SEQ":"1378","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: What color is your helmet?<br\/>B: It's g____n and blue.","QUESTION_PIC":"","QUESTION_HEAD":"g","QUESTION_FOOT":"n","CORRECT_ANSWER":"green","GRP_SORTING":"0"},{"EXAM_SEQ":"993","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Do you have a c_____a?<br\/>B: Yes. We can take a picture.","QUESTION_PIC":"","QUESTION_HEAD":"c","QUESTION_FOOT":"a","CORRECT_ANSWER":"camera","GRP_SORTING":"0"},{"EXAM_SEQ":"1395","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Are they going to school?<br\/>B: No, they're not. They're going to the p_____d.","QUESTION_PIC":"","QUESTION_HEAD":"p","QUESTION_FOOT":"d","CORRECT_ANSWER":"playground","GRP_SORTING":"0"},{"EXAM_SEQ":"3215","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: I don't know this word (\u5b57). Do you have a d_____y?<br\/>B: Yes. Here it is.","QUESTION_PIC":"","QUESTION_HEAD":"d","QUESTION_FOOT":"y","CORRECT_ANSWER":"dictionary","GRP_SORTING":"0"},{"EXAM_SEQ":"985","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: How much is the pen?<br\/>B: It is five d_____rs.","QUESTION_PIC":"","QUESTION_HEAD":"d","QUESTION_FOOT":"rs","CORRECT_ANSWER":"dollars","GRP_SORTING":"0"},{"EXAM_SEQ":"3220","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Do you want sugar in your c_____ee?<\/br>B: Yes, please.","QUESTION_PIC":"","QUESTION_HEAD":"c","QUESTION_FOOT":"ee","CORRECT_ANSWER":"coffee","GRP_SORTING":"0"},{"EXAM_SEQ":"2700","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: What c_____r is the chair?<br\/>B: It's red.","QUESTION_PIC":"","QUESTION_HEAD":"c","QUESTION_FOOT":"r","CORRECT_ANSWER":"color","GRP_SORTING":"0"},{"EXAM_SEQ":"980","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: How m_____y balls are there?<br\/>B: Let's count. One, two, three\u2026","QUESTION_PIC":"","QUESTION_HEAD":"m","QUESTION_FOOT":"y","CORRECT_ANSWER":"many","GRP_SORTING":"0"},{"EXAM_SEQ":"245","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Can they sing?<br\/>B: Of course. They are s_____rs.","QUESTION_PIC":"","QUESTION_HEAD":"s","QUESTION_FOOT":"rs","CORRECT_ANSWER":"singers","GRP_SORTING":"0"},{"EXAM_SEQ":"3801","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: Gina and Gillian study and play together.<\/br>B: Yes. They are good f______ds.","QUESTION_PIC":"","QUESTION_HEAD":"f","QUESTION_FOOT":"ds","CORRECT_ANSWER":"friends","GRP_SORTING":"0"},{"EXAM_SEQ":"994","QUESTION_TYPE":"\u5c0d\u8a71\u586b\u7a7a","QUESTION_TEXT":"A: What do you want?<br\/>B: It's hot. I want ice c_____m.","QUESTION_PIC":"","QUESTION_HEAD":"c","QUESTION_FOOT":"m","CORRECT_ANSWER":"cream","GRP_SORTING":"0"}];
				const answer_record = {"1":"","2":"","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":"","16":"","17":"","18":"","19":"","20":"","21":"","22":"","23":"","24":"","25":"","26":"","27":"","28":"","29":"","30":"","31":"","32":"","33":"","34":"","35":"","36":"","37":"","38":"","39":"","40":"","41":"","42":"","43":"","44":"","45":"","46":"","47":"","48":"","49":"","50":"","51":"","52":"","53":"","54":"","55":"","56":"","57":"","58":"","59":"","60":"","61":"","62":"","63":"","64":"","65":"","66":"","67":"","68":"","69":"","70":"","71":"","72":"","73":"","74":"","75":"","76":"","77":"","78":"","79":"","80":"","81":"","82":"","83":"","84":"","85":"","86":"","87":"","88":"","89":"","90":"","91":"","92":"","93":"","94":"","95":"","96":"","97":"","98":"","99":"","100":""};
				const compare_result = {"1":"lemon","2":"chopsticks","3":"farmer","4":"butterfly","5":"kite","6":"seven","7":"read","8":"doctor","9":"sushi","10":"sticker","11":"under","12":"sandwich","13":"windy","14":"Taiwan","15":"watch","16":"door","17":"flower","18":"bear","19":"crayon","20":"papaya","21":"desk","22":"juice","23":"sugar","24":"monkey","25":"feet","26":"cap","27":"magician","28":"sick","29":"recorder","30":"jacket","31":"hamburgers","32":"skateboard","33":"hamburger","34":"eraser","35":"salad","36":"scooter","37":"Sharks","38":"boy","39":"cousin","40":"rabbits","41":"thin","42":"bored","43":"sleepy","44":"school","45":"heavy","46":"tired","47":"plate","48":"strong","49":"butterflies","50":"museum","51":"rainy","52":"chocolate","53":"backpack","54":"umbrella","55":"grapes","56":"robot","57":"strawberries","58":"lollipops","59":"mouth","60":"front","61":"between","62":"flowers","63":"England","64":"people","65":"pencil","66":"France","67":"empty","68":"fork","69":"knife","70":"singer","71":"behind","72":"dance","73":"hundred","74":"rolls","75":"thousand","76":"telephone","77":"bugs","78":"cards","79":"near","80":"computer","81":"tall","82":"hungry","83":"pears","84":"eating","85":"weather","86":"time","87":"cellphone","88":"office","89":"map","90":"green","91":"camera","92":"playground","93":"dictionary","94":"dollars","95":"coffee","96":"color","97":"many","98":"singers","99":"friends","100":"cream"};

				const vComponent = {
					name: 'vue-template',
					template: '#vue-template',
					data(){
						return {
							list_spell,
							compare_result,
							answer_record
						}
					},
					methods: {
						calculate_line($num) {
							let $line = ''
							if ($num == 1) {
								$line = '__'
							} else if ($num == 2) {
								$line = '__'
							} else if($num == 3) {
								$line = '___'
							} else if ($num == 4) {
								$line = '____'
							} else if ($num == 5) {
								$line = '_____'
							} else if ($num == 6) {
								$line = '______'
							} else if ($num == 7) {
								$line = '_______'
							} else if ($num == 8) {
								$line = '________'
							} else if ($num == 9) {
								$line = '_________'
							} else if ($num == 10) {
								$line = '__________'
							} else {
								$line = '___________'
							}
							return $line
						}
					},
				}
				
				const app = new Vue({
					el: '#app',
					components: {
						'vue-template': vComponent
					},
				})
			})()
		</script>
	</body>
</html>