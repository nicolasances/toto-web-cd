var auth2 = null;
var googleUser;
var googleIdToken = null;
var appAuthorizationLoaded = false;

var initGoogleSignIn = function(callback, go, http) {

	gapi.load('auth2', function() {

		gapi.auth2.init({client_id: '209706877536-4h516ud369nuaakag4gbtlvq4d735ag9.apps.googleusercontent.com'}).then(function() {

			auth2 = gapi.auth2.getAuthInstance();

			if (!auth2.isSignedIn.get()) {
				go('/login');

				callback();
			}
			else {
				googleUser = auth2.currentUser.get();
				googleIdToken = googleUser.getAuthResponse().id_token;

				if (!appAuthorizationLoaded) {

					appAuthorizationLoaded = true;

					callback();

				}
				else callback();
			}

		});
	});
}
