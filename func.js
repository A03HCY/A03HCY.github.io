var ColorTheme = matchMedia('(prefers-color-scheme: dark)').matches;

function DeviceIden() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		return "phone";
	} else {
		return "computer";
	}
}

function ActiveMenu(id) {
    var oli = document.getElementsByTagName("li");
    for(var i=0; i<oli.length; i++){
        if (oli[i].id == "d-bran"){
            continue;
        }
        oli[i].setAttribute("class","mdui-list-item mdui-ripple");
        if (oli[i].id == id){
            oli[i].setAttribute("class","mdui-list-item mdui-ripple mdui-list-item-active");
            mdui.mutation();
        }
    };
}