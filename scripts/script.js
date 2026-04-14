import * as handle_FBInstants from "./handle_FBInstants_js.js";

////////////////////////////////////////////////////////////////////////
window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

window.__GA_CONFIG = {
	GAME_NAME: 'SnakeEscape',
	GA_MEASUREMENT_ID: 'G-',//////////////////////////////////////
	BUILD_VERSION: '100',////////////////////////////////////
}
		
function initGoogleAnalytics(n, t) {
	console.log("initGoogleAnalytics()");
	console.log(n);
	console.log(t);
	window.__GA_CONFIG.GAME_NAME;
	var a = window.__GA_CONFIG.BUILD_VERSION,
		i = window.__GA_CONFIG.GA_MEASUREMENT_ID,
		e = (FBInstant.getEntryPointData() || {}),
		s = e.fb_instant_game_ad_id,/////////////////////////////
		o = e.fb_instant_game_adset_id,////////////////////////
		c = e.fb_instant_game_campaign_id;////////////////////
	if ("null" != i) {
		var _ = document.createElement("script");
		_.async = !0, _.src = "https://www.googletagmanager.com/gtag/js?id=" + i, document.head.appendChild(_),
			gtag("set", "client_id", "100." + n), gtag("set", "user_id", n), gtag("js", new Date), gtag(
			"config", i, {
				
				cookie_flags: "SameSite=None;Secure",
				build: a,
				medium: t,
				campaign: c
			}), gtag("set", "user_properties", {
			user_id: n,
			traffic_source: t,
			campaign_id: c,
			adset_id: o,
			ad_id: s
		});
		try {
			FBInstant.getTournamentAsync().then((function (n) {
				var t = n.getID();
				gtag("set", "user_properties", {
					tournament_id: t
				})
			})).catch((function (n) {}))
		} catch (r) {}
		gtag("event", "app_launch", {
		})
	}
}