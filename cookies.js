function SetCookie(c_name, value, expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/;domain=acdp.top";
}

function GetCookie(c_key){
    if(IsCookie(c_key)){
        for(var i=0;i<arr.length;i++){
            var temp = arr[i].split("=");
            if(tmp[0].trim() === c_key){
                return tmp[1];
            }
        }
    } else {
        return null;
    }
}

function deleteCookieWithKey(c_key){
    setCookieWithKey(c_key,"",-1);
}

function IsCookie(c_key){
    var arr = document.cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        var temp = arr[i].split("=");
        if(tmp[0].trim() === c_key){
            return true;
        }
    }
    return false; 
}