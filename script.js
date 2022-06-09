function copybtc() {
    var text = document.getElementById("btcaddress");
    copy(text);
}
function copyeth() {
    var text = document.getElementById("ethaddress");
    copy(text);
}
function copydoge() {
    var text = document.getElementById("dogeaddress");
    copy(text);
}
function copyltc() {
    var text = document.getElementById("ltcaddress");
    copy(text);
}
function copyxrp() {
    var text = document.getElementById("xrpaddress");
    copy(text);
}
function copy(text) {
    text.select();
    document.execCommand("copy");
    document.getElementById("title").innerHTML="Copied!";
}