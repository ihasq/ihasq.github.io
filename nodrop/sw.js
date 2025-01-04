globalThis.addEventListener("fetch", e => {
	
});

let source = new EventSource("");

source.onmessage = e => {

}

let source;

globalThis.addEventListener("online", e => {
	source = new EventSource("");
	source.onmessage = ({ data }) => {
		const { title, type, description, sdp } = JSON.parse(data);
	}
});

globalThis.addEventListener("offline", e => {
	source.close?.()
});

https://dash.cloudflare.com/oauth2/auth?response_type=code&client_id=54d11594-84e4-41aa-b438-e81b8fa78ee7&redirect_uri=http%3A%2F%2Flocalhost%3A8976%2Foauth%2Fcallback&scope=account%3Aread%20user%3Aread%20workers%3Awrite%20workers_kv%3Awrite%20workers_routes%3Awrite%20workers_scripts%3Awrite%20workers_tail%3Aread%20d1%3Awrite%20pages%3Awrite%20zone%3Aread%20ssl_certs%3Awrite%20ai%3Awrite%20queues%3Awrite%20pipelines%3Awrite%20offline_access&state=vtvZrwCIXgkFIUfrAjvuTIRNeACHzKU5&code_challenge=zxitK7icbCVavflb4kqVvmtgPh-kGgZL7stfNyg2d8M&code_challenge_method=S256