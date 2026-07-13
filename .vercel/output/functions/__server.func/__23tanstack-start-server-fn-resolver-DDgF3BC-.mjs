//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DDgF3BC-.js
var manifest = { "a09665e0a5ccb55e8be2ca52267403dc2b5094c9b6be00c64cbe098f9682d591": {
	functionName: "subscribeToWaitlist_createServerFn_handler",
	importer: () => import("./_ssr/waitlist-Bi-lE_my.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
