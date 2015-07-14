app.factory('HomeFeeds', function($http, Config) {
	var data = {};
	data.getPosts = function (postToken) {
		if(postToken){
			return $http(
				{
					method: 'GET', url:Config.BloggerUrl+'/feeds/posts/default?max-results=6&orderby=published&alt=json&start-index='+postToken
					//method: 'GET', url:'templates/sample-data.html'
				}
			);
		}
	}
  	return data;
});
app.factory('category', function($http, Config) {
	var data = {};
	data.getPosts = function (label,postToken) {
		if(postToken){
			return $http(
				{
					method: 'GET', url:Config.BloggerUrl+'/feeds/posts/default/-/'+label+'?max-results=6&orderby=published&alt=json&start-index='+postToken
				}
			);
		}
	}
  	return data;
});
// search blog feeds
app.factory('SearchBlog', function($http, Config) {
	var data = {};
	data.getPosts = function (query,postToken) {
		if(postToken){
			return $http(
				{
					method: 'GET', url:Config.BloggerUrl+'/feeds/posts/default?q='+query+'&max-results=6&orderby=published&alt=json&start-index='+postToken
				}
			);
		}
	}
  	return data;
});
// comments blog feeds
app.factory('Comments', function($http, Config) {
	var data = {};
	data.getPosts = function (url) {
		return $http(
			{
				method: 'GET', url:url+'?alt=json&orderby=published'
			}
		);
	}
  	return data;
});
// a global factory to use it from every where
app.factory('globalFactory', function() {
	return {
		// get post url from blog feed
		getPostUrlFeed: function( posts,index ) {
			var urls = posts[index].link;
			for (var k = 0; k < urls.length; k++) {
			  if (urls[k].rel == 'alternate') {
					posturl = urls[k].href;
					return posturl;
			  }
			}
		},
		getPostUrlFeedSingle: function( post ) {
			var urls = post.link;
			for (var k = 0; k < urls.length; k++) {
			  if (urls[k].rel == 'alternate') {
					posturl = urls[k].href;
					return posturl;
			  }
			}
		},
		getCommentFeedUrl: function( post ) {
			var urls = post.link;
			for (var k = 0; k < urls.length; k++) {
			  if (urls[k].rel == 'replies' && urls[k].type == 'application/atom+xml') {
					posturl = urls[k].href;
					return posturl;
			  }
			}
		},  
		// get first image or feed
		getPostImageFeed: function( posts,index ) {
			var postContent = posts[index].content.$t;
			var div = document.createElement('div');
			div.innerHTML = postContent;
			var img = div.getElementsByTagName("img");
			var iframe = div.getElementsByTagName("iframe");
			if (img.length >= 1) {
				imgthumb = img[0].src;
				newimgthumb = imgthumb.replace(/\/s[0-9]+(\-c)?\//, "/s220-h160-c/");
				return newimgthumb;
			} else if (iframe.length >= 1){
				iframeVideo = iframe[0].src;
				var re = /(\?v=|\/\d\/|\/embed\/)([a-zA-Z0-9\-\_]+)/;
				videokeynum = iframeVideo.match(re);
				if(videokeynum) {
					videokey = iframeVideo.match(re)[2];
					imageurl = 'http://i2.ytimg.com/vi/'+videokey+'/0.jpg';
					return imageurl;	              
			  }
			}
		}
	};
});
// categories
app.factory('CatData', function(){
    var data = {};
    data.items = [
        { 
            label: 'Movies',
            name: 'Popular Movies',
        },
        { 
            label: 'Cute Girls',
            name: 'Cute Girls',
        },
        { 
            label: 'Cars',
            name: 'Favourite Cars',
        },
        { 
            label: 'BWW',
            name: 'Bmw Cars',
        },
        { 
            label: 'Love',
            name: 'Love Quotes',
        }

    ]; 
    
    return data;
});
