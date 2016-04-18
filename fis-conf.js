/*fis.set('project.files',['index.html','redirect.html','img*','page/**.html',
'page/car/css/**','page/car/img/**','page/car/**.html',
'page/me/css/**','page/me/img/**','page/me/**.html',
'page/service/css/**','page/service/img/**','page/service/**.html',
'page/user/img/**','page/user/**.html',
'page/shopping/css/**','page/shopping/img/**','page/shopping/Product-Catagory.html','page/shopping/product-detail.html','page/shopping/product-list.html','page/shopping/searchProduct.html',
'page/shopping/aaa.html','page/shopping/tab-shopping.html'
])*/
fis.media("aaa")
    .match('::package', {
        postpackager: fis.plugin('loader')
    }).match('*.{js,css,png}', {
        useHash: true
    }).match('::image', {
        useHash: true
    }).match('**.js', {
        // fis-optimizer-uglify-js 插件进行压缩，已内置
        optimizer: fis.plugin('uglify-js')
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    })

//css
.match('css/style.css',{packTo: 'style.css'})
.match('css/adScroller.css',{packTo: 'style.css'})

//car 
.match('page/car/css/car.css',{packTo: 'style.css'})

//me
.match('page/me/css/addressAdm.css',{packTo: 'style.css'})
.match('page/me/css/me.css',{packTo: 'style.css'})
.match('page/me/css/newAddress.css',{packTo: 'style.css'})
.match('page/me/css/personalData.css',{packTo: 'style.css'})

//service
.match('page/service/css/service.css',{packTo: 'style.css'})

//shopping
.match('page/shopping/css/category.css',{packTo: 'style.css'})
.match('page/shopping/css/shopping.css',{packTo: 'style.css'})

//js
.match('js/route.js',{packTo: 'main.js'})
.match('js/directive.js',{packTo: 'main.js'})
.match('js/ionicConfigProvider.js',{packTo: 'main.js'})
    .match('js/timeFilter.js',{packTo: 'main.js'})

//service js
.match('js/service/AuthService.js',{packTo: 'main.js'})
.match('js/service/carBuyService.js',{packTo: 'main.js'})
.match('js/service/cartservice.js',{packTo: 'main.js'})
.match('js/service/orderService.js',{packTo: 'main.js'})
.match('js/service/repository.js',{packTo: 'main.js'})
.match('js/service/wcservice.js',{packTo: 'main.js'})

//car---controller
.match('page/car/controller/submitOrderController.js',{packTo: 'main.js'})
.match('page/car/controller/tabCarController.js',{packTo: 'main.js'})


//me controller
.match('page/me/controller/AdressController.js',{packTo: 'main.js'})
.match('page/me/controller/comment.js',{packTo: 'main.js'})
.match('page/me/controller/myOrder.js',{packTo: 'main.js'})
.match('page/me/controller/selectAddress.js',{packTo: 'main.js'})
.match('page/me/controller/selectPrivinceController.js',{packTo: 'main.js'})
.match('page/me/controller/tabMeController.js',{packTo: 'main.js'})

//server controller
.match('page/service/controller/serviceIndex.js',{packTo: 'main.js'})
.match('page/service/controller/tabServiceController.js',{packTo: 'main.js'})

//shopping controller
.match('page/shopping/controller/CategoryController.js',{packTo: 'main.js'})
.match('page/shopping/controller/productController.js',{packTo: 'main.js'})
.match('page/shopping/controller/tabShoppingController.js',{packTo: 'main.js'})

//user controller
.match('page/user/controller/login.js',{packTo: 'main.js'})
.match('page/user/controller/register.js',{packTo: 'main.js'})

//lib
/*.match('lib/angular/angular.js',{packTo: 'lib_js.js'})
.match('lib/angular/index.js',{packTo: 'lib_js.js'})
.match('lib/angular/angular-csp.css',{packTo: 'lib_css.css'})

.match('lib/angular-animate/angular-animate.js',{packTo: 'lib_js.js'})
.match('lib/angular-sanitize/angular-sanitize.js',{packTo: 'lib_js.js'})

.match('lib/angular-ui-router/src/resolve.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/state.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/stateDirectives.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/stateFilters.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/templateFactory.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/urlMatcherFactory.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/urlRouter.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/view.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/viewDirective.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/viewScroll.js',{packTo: 'lib_js.js'})

.match('lib/angular-ui-router/src/urlMatcherFactory.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/urlMatcherFactory.js',{packTo: 'lib_js.js'})
.match('lib/angular-ui-router/src/urlMatcherFactory.js',{packTo: 'lib_js.js'})

.match('lib/ionic/css/ionic.css',{packTo: 'lib_css.css'})
.match('lib/ionic/js/ionic.bundle.js',{packTo: 'lib_js.js'})
.match('lib/ionic/js/ionic.js',{packTo: 'lib_js.js'})
.match('lib/ionic/js/ionic-angular.js',{packTo: 'lib_js.js'})

.match('lib/jquery/dist/jquery.js',{packTo: 'lib_js.js'})
.match('lib/jquery/dist/jquery.js',{packTo: 'lib_js.js'})

.match('lib/ngCordova/dist/ng-cordova.js',{packTo: 'lib_js.js'})
.match('lib/ngCordova/dist/ng-cordova-mocks',{packTo: 'lib_js.js'})

.match('lib/ngstorage/ngStorage.js',{packTo: 'lib_js.js'})
*/