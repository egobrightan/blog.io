app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('blog', {
      url: "/blog",
      abstract: true,
      templateUrl: "templates/sidebar-menu.html"
    })
	.state('blog.post', {
      url: "/post/:postIndex",
		cache: false,
      views: {
        'menuContent' :{
          	templateUrl: "templates/post.html",
		  		controller: "PostCtrl"
        }
      }
    })
	.state('blog.cat', {
      url: "/cat/:label",
      views: {
        'menuContent' :{
          	templateUrl: "templates/home-feed.html",
		  		controller: "CatCtrl"
        }
      }
    })
	.state('blog.contact', {
      url: "/contact",
      views: {
        'menuContent' :{
          	templateUrl: "templates/contact.html",
		  		controller: "ContactCtrl"
        }
      }
    })
	 .state('blog.about', {
      url: "/about",
      views: {
        'menuContent' :{
          	templateUrl: "templates/about.html",
		  		controller: "AboutCtrl"
        }
      }
    })
	.state('blog.homefeed', {
      url: "/homefeed",
      views: {
        'menuContent' :{
          	templateUrl: "templates/home-feed.html",
		  		controller: "HomeFeedCtrl"
        }
      }
    })
	 .state('blog.categories', {
      url: "/categories",
      views: {
        'menuContent' :{
          	templateUrl: "templates/categories.html",
		  		controller: "CategoriesCtrl"
        }
      }
    })
	 .state('blog.admob', {
      url: "/admob",
      views: {
        'menuContent' :{
          	templateUrl: "templates/categories.html",
		  		controller: "AdmobCtrl"
        }
      }
    })
	 .state('blog.allcategories', {
      url: "/allcategories",
      views: {
        'menuContent' :{
          	templateUrl: "templates/all-categories.html",
		  		controller: "AllCategoriesCtrl"
        }
      }
    })
	 .state('blog.search', {
      url: "/search/:query",
      views: {
        'menuContent' :{
          	templateUrl: "templates/search.html",
		  		controller: "SearchCtrl"
        }
      }
    })
  	$urlRouterProvider.otherwise("/blog/homefeed");
})