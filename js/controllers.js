// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('BloggerApp', ['ionic','ngSanitize']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});
/* 
another cool app function -- so we can call it directly from view page
*/
app.run(function($rootScope, globalFactory) {
	$rootScope.globalFunction = globalFactory;
});
/* 
main controller function
*/
app.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $ionicHistory, Color) {
	
	$scope.contentColor = Color.AppColor;
  	// Toggle left function for app sidebar
  	$scope.toggleLeft = function() {
    	$ionicSideMenuDelegate.toggleLeft();
  	};
  	// go back to previous page
  	$scope.goBackOne = function(){
		$ionicHistory.goBack();
	}
	// social meadi sharing common button
	$scope.shareMain = function(title,url){
		window.plugins.socialsharing.share(title, null, null, url)
	}
	
})

/* 
About us Controller
*/
app.controller('AboutCtrl', function($scope, CatData, ConfigHeading) {
	//setting heading here
	$scope.MainHeading = ConfigHeading.AboutHeading;
})
/* 
contact form widget for your blogger blog android app
ConfigContact in app.js
ConfigHeading in app.js
de.appplant.cordova.plugin.email-composer plugin to send contact requests
*/
app.controller('ContactCtrl', function($scope, ConfigContact, ConfigHeading) {
	//setting heading here
	$scope.MainHeading = ConfigHeading.ContactHeading;
	$scope.user = [];
	// contact form submit event
	$scope.submitForm = function(isValid) {
		if (isValid) {
			cordova.plugins.email.isAvailable(
				function (isAvailable) {
					window.plugin.email.open({
						to:      [ConfigContact.EmailId],
						subject: ConfigContact.ContactSubject,
						body:    '<h1>'+$scope.user.email+'</h1><br><h2>'+$scope.user.name+'</h2><br><p>'+$scope.user.details+'</p>',
						isHtml:  true
					});
				}
			);
		}
	}
})
app.controller('HomeFeedCtrl', function($scope, $ionicLoading, HomeFeeds, $sce, ConfigHeading, ConfigAdmob) {
	
	//setting heading here
	$scope.MainHeading = ConfigHeading.HomeHeading;
	// posts
	$scope.posts = [];
	// initial page token
	$scope.pageToken = 1;
	$scope.postsCompleted = false;
	//get posts function
	$scope.getPosts = function(){
		HomeFeeds.getPosts($scope.pageToken)
		.success(function (posts) {
			if(posts.feed.entry){
				$scope.posts = $scope.posts.concat(posts.feed.entry);
				HomeFeeds.posts = $scope.posts
				$scope.pageToken = $scope.pageToken + 6;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.postsCompleted = true;
			}
		})
		.error(function (error) {
			$scope.posts = [];
		});
	}
	//if admob ready show ads
	$scope.doRefresh = function(){
		$scope.pageToken = 1;
		$scope.posts = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
})
/* 
category controller it also works perfectly with blogger feed
*/
app.controller('CatCtrl', function($stateParams, $scope, category, HomeFeeds, $sce) {
	// getting label from params
  	label = $stateParams.label;
	$scope.label = label;
	// setting header same as label
	$scope.MainHeading = $sce.trustAsHtml($scope.label);
	$scope.posts = [];
	$scope.pageToken = 1;
	$scope.postsCompleted = false;
	$scope.type = true;
	// get posts function
	$scope.getPosts = function(){
		category.getPosts(label,$scope.pageToken)
		.success(function (posts) {
			if(posts.feed.entry){
				$scope.posts = $scope.posts.concat(posts.feed.entry);
				HomeFeeds.posts = $scope.posts
				$scope.pageToken = $scope.pageToken + 6;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.postsCompleted = true;
			}
		})
		.error(function (error) {
			$scope.posts = [];
		});
	}
	//if admob ready show ads
	$scope.doRefresh = function(){
		$scope.pageToken = 1;
		$scope.posts = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
})
/* 
search controller
*/
app.controller('SearchCtrl', function($stateParams, $scope, SearchBlog, HomeFeeds, $sce, ConfigAdmob) {
	// getting label from params
  	$scope.query = $stateParams.query;
	// setting header same as label
	$scope.MainHeading = $sce.trustAsHtml($scope.query);
	$scope.posts = [];
	$scope.searchQuery = [];
	$scope.pageToken = 1;
	$scope.postsCompleted = false;
	// get posts function
	$scope.getPosts = function(){
		SearchBlog.getPosts($scope.query,$scope.pageToken)
		.success(function (posts) {
			if(posts.feed.entry){
				$scope.posts = $scope.posts.concat(posts.feed.entry);
				HomeFeeds.posts = $scope.posts
				$scope.pageToken = $scope.pageToken + 6;
				$scope.postsCompleted = false;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.postsCompleted = true;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
		})
		.error(function (error) {
			$scope.posts = [];
		});
	}
	$scope.searchSubmitFunction = function(){
		$scope.pageToken = 1;
		$scope.posts = [];
		$scope.query = $scope.searchQuery.query;
		$scope.getPosts();
		$scope.MainHeading = $sce.trustAsHtml($scope.query);
	}
})
/* 
categories listing page -- completely static -- can be modifies in CatData[data][items]
*/
app.controller('CategoriesCtrl', function($scope, CatData, ConfigHeading) {
	//setting heading here
	$scope.MainHeading = ConfigHeading.CatHeading;
	$scope.Cats = CatData;
})
/* 
categories listing page -- completely static -- can be modifies in CatData[data][items]
*/
app.controller('AdmobCtrl', function($scope, CatData, ConfigHeading, ConfigAdmob) {
	//setting heading here
	$scope.MainHeading = ConfigHeading.CatHeading;
	$scope.Cats = CatData;
	$scope.showInterstitial = function(){
		if(AdMob) AdMob.showInterstitial();
	}
	document.addEventListener("deviceready", function(){
		if(AdMob) {
			// show admob banner
			if(ConfigAdmob.banner) {
				AdMob.createBanner( {
					adId: ConfigAdmob.banner, 
					position: AdMob.AD_POSITION.BOTTOM_CENTER, 
					autoShow: true 
				} );
			}
			// preparing admob interstitial ad
			if(ConfigAdmob.interstitial) {
				AdMob.prepareInterstitial( {
					adId:ConfigAdmob.interstitial, 
					autoShow:false
				} );
			}
		}
		if(ConfigAdmob.interstitial) {
			$scope.showInterstitial();
		}
	});
})
/* 
categories listing page -- completely dynamic -- data from all cats
*/
app.controller('AllCategoriesCtrl', function($scope, ConfigHeading, HomeFeeds) {
	//setting heading here
	$scope.MainHeading = ConfigHeading.AllCatHeading;
	$scope.pageToken = 1;
	$scope.catCompleted = false;
	$scope.getPosts = function(){
		HomeFeeds.getPosts($scope.pageToken)
		.success(function (posts) {
			$scope.cats = posts.feed.category;
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.catCompleted = true;
		})
		.error(function (error) {
			$scope.cats = [];
			$scope.catCompleted = true;
		});
	}
})
app.controller('PostCtrl', function($scope, $stateParams, HomeFeeds, $sce, $state, $ionicNavBarDelegate, globalFactory, Comments) {
	var postIndex = $stateParams.postIndex;
	var postId = $stateParams.postId;
	var from = $stateParams.from;
	
	$scope.comments = [];
	$scope.getPosts = function(url){
		Comments.getPosts(url)
		.success(function (comments) {
			$scope.comments = comments.feed.entry;
		})
		.error(function (error) {
			$scope.comments = [];
		});
	}
	$scope.getCommentFeed = function(post){
		var links = post.link;
		if(links[0]){
			$scope.commentFeedUrl = links[0].href;
			$scope.getPosts($scope.commentFeedUrl);
		}
	}
	if(HomeFeeds.posts){
		$scope.post = HomeFeeds.posts[postIndex];
		var pContent = HomeFeeds.posts[postIndex].content.$t;
		var div = document.createElement('div');
			div.innerHTML = pContent;
		var links = div.getElementsByTagName("a");
		for(i=0; i < links.length; i++) {
			links[i].url = links[i].href;
			links[i].setAttribute("onClick","linkOpen('"+links[i].url+"')")
			links[i].setAttribute("style","margin:0px;")
			links[i].removeAttribute("href");
		}
		$scope.youtube = $sce.trustAsHtml(div.innerHTML);
		$scope.getCommentFeed($scope.post);
	}
	// link open function // here a simple link open function
	linkOpen = function(url){
		var ref = cordova.InAppBrowser.open(url, '_system', 'location=yes');
	}
})