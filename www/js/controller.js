angular.module('randomuser.controllers', [])
.controller('RandomUsrCntrl', function ($scope, $http, $cordovaEmailComposer, $ionicPopup) {

	$scope.users = [];

	function loadProfile(callback){
		$http.get('https://randomuser.me/api/?results=5')
		.success(function(response){
			var profiles = [];
			angular.forEach(response.results, function(result){
				profiles.push(result.user);
				
			});
			callback(profiles);
		});
	}
	
	$scope.loadMoreProfile = function(){
		loadProfile(function(extraProfile){
			$scope.users = $scope.users.concat(extraProfile);
			$scope.$broadcast('scroll.infiniteScrollComplete');	
		});
	};
	
	$scope.reloadProfile = function(){
		loadProfile(function(newProfile){
			$scope.users = newProfile;
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	
	$scope.sendEmail = function(userEmail) {
		
		$cordovaEmailComposer.isAvailable().then(function() {
		   // is available
			console.log(userEmail);
			var email = {
			    to: userEmail,
			    subject: 'You got a match from RandomUser app',
			    isHtml: true
			  };
		  
			 $cordovaEmailComposer.open(email).then(null, function () {
			   // user cancelled email

			 });
			 
		 }, function () {
		   // not available
 		    var alertPopup = $ionicPopup.alert({
 		      title: 'Email not available',
 		      template: 'Email not available'
 		    });
		 });
	}
});
