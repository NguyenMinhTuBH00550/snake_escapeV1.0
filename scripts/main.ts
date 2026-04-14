
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.

	const googleAnalytics = document.createElement("script");
	googleAnalytics.src = "https://www.googletagmanager.com/gtag/js?id=G-TKQ8889B4C";/////////////////////////
	googleAnalytics.async = true;
	document.head.appendChild(googleAnalytics);
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime : IRuntime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime : IRuntime)
{
	// Code to run every tick
}
