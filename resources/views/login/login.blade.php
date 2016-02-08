<!DOCTYPE html>
<html>
<head>
    <title>Laravel</title>

    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
    <script type="text/javascript" src="/lib/angular/angular.min.js"></script>
    <script src="https://cdn.jsdelivr.net/ngstorage/0.3.6/ngStorage.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-strap/2.3.5/angular-strap.compat.min.js"></script>
    <script src="/lib/lodash/lodash.js"></script>
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/restangular/1.3.1/restangular.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js"></script>
    <script type="text/javascript" src="/app/app.js"></script>
    <script type="text/javascript" src="/app/home/app.js"></script>
    <script type="text/javascript" src="/app/main/app.js"></script>
    <script type="text/javascript" src="/app/registration/app.js"></script>
    <script type="text/javascript" src="/app/registration/controllers/RegistrationCtrl.js"></script>
    <script type="text/javascript" src="/app/login/app.js"></script>
    <script type="text/javascript" src="/app/login/controllers/LoginCtrl.js"></script>
    <script type="text/javascript" src="/app/home/controllers/HomeCtrl.js"></script>
    <base href="/">
</head>
<body ng-app="login">
<div class="container">
    <div class="content">
        <div ui-view></div>
    </div>
</div>
</body>
</html>
