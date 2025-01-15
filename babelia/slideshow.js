var landscape = true;
var endless = true;
var forward = true;
var subtraction = false;
var compatible = false;
var flipped = false;
var restore;
var postdata = String(Math.floor(Math.random() * 9007199250000000));
var imgSrc;
var ewig;

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

function initialise() {
    var beggin = document.getElementById("data").value;
    if (beggin) {postdata=beggin;}
    var flipid = document.getElementById("orienter").value;
    if (flipid==="portrait") {
        landscape=false;
       document.getElementById("rot").src = "/img/revflip.png";
    }
}

function babel() {
var filepath = "/babelia.cgi";
xmlhttp=new XMLHttpRequest();

    xmlhttp.onload = function(oEvent) {
        clearInterval(ewig);
            var blob = xmlhttp.response;
        if (!compatible) {
        if (!blob) {
            document.getElementById("navigator").style.width = "600px";
            document.getElementById("loc").innerHTML = "Your browser may not be able to display these images because it does not support the XMLHttpRequest responseType blob. The following browser versions should be compatible: Firefox 6+, Chrome 19+, IE 10+, Safari 6+, Opera 15+. You can view the current image by using the download button above (second from right).";
        }
        else {compatible = true;}
        }
            if (endless) {
                if (!flipped) {
                if (imgSrc) {window.URL.revokeObjectURL( imgSrc );}
            imgSrc = (window.URL ? URL : webkitURL).createObjectURL( blob );
            document.getElementById("palette").src = imgSrc;
                if (postdata.length>21) {
            var name = "babelia #" + postdata.substring(0,10) + "..." + postdata.substring(postdata.length-10,postdata.length);
            document.getElementById("loc").innerHTML = name;
                }
                else {document.getElementById("loc").innerHTML = "babelia #" + postdata;}
            
            babel();
                }
                else {
                    if (!subtraction) {
                        while(end>-1) {
                            var last = postdata.charAt(end);
                            if (last>0) {postdata = postdata.substring(0,end) + --last + trim; break;}
                            else {trim +="9"; postdata =  postdata.substring(0,end); end--;}
                        }
                        if (end === -1) {postdata = trim.substring(1,trim.length);}
                        if (postdata<=1) {endless=false; document.getElementById("back").style = "cursor:default";}
                        while(end>-1) {
                            var last = postdata.charAt(end);
                            if (last>0) {postdata = postdata.substring(0,end) + --last + trim; break;}
                            else {trim +="9"; postdata =  postdata.substring(0,end); end--;}
                        }
                        if (end === -1) {postdata = trim.substring(1,trim.length);}
                        if (postdata<=1) {endless=false; document.getElementById("back").style = "cursor:default";}
                    }
                    else {
                        while(end>-1) {
                            var last = postdata.charAt(end);
                            if (last<9) {postdata = postdata.substring(0,end) + ++last + trim; break;}
                            else {trim += "0"; postdata =  postdata.substring(0,end); end--;}
                        }
                        if (end === -1) {postdata = "1" + trim;}
                        while(end>-1) {
                            var last = postdata.charAt(end);
                            if (last<9) {postdata = postdata.substring(0,end) + ++last + trim; break;}
                            else {trim += "0"; postdata =  postdata.substring(0,end); end--;}
                        }
                        if (end === -1) {postdata = "1" + trim;}
                    }
                    flipped=false;
                    babel();
                }
            }
        }
    xmlhttp.open("POST",filepath,true);
    xmlhttp.responseType = "blob";
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var end = postdata.length - 1;
    var trim = "";
    if (!subtraction) {
        while(end>-1) {
            var last = postdata.charAt(end);
            if (last<9) {postdata = postdata.substring(0,end) + ++last + trim; break;}
            else {trim += "0"; postdata =  postdata.substring(0,end); end--;}
        }
        if (end === -1) {postdata = "1" + trim;}
    }
    else {
        while(end>-1) {
            var last = postdata.charAt(end);
            if (last>0) {postdata = postdata.substring(0,end) + --last + trim; break;}
            else {trim +="9"; postdata =  postdata.substring(0,end); end--;}
        }
        if (end === -1) {postdata = trim.substring(1,trim.length);}
        if (postdata<=1) {endless=false; document.getElementById("back").style = "cursor:default";}
    }
    var info = "location=" + postdata;
    if (!landscape) {info += "&flip=portrait";}
    xmlhttp.send(info);
}

function loader() {
    document.getElementById("loc").innerHTML = "loading";
    var x = 1;
    ewig = setInterval(function() {if (x==0) {document.getElementById("loc").innerHTML = "loading";}
                       else if (x==1) {document.getElementById("loc").innerHTML = "loading.";}
                       else if (x==2) {document.getElementById("loc").innerHTML = "loading..";}
                       else if (x==3) {document.getElementById("loc").innerHTML = "loading...";}
                       if (x<3) {x++;}
                       else {x=0;}
                       },500);
    
}
$(document).ready(function() {
                  loader();
                  });

function flipper() {
    loader();
    var wide = document.getElementById("palette").width;
    document.getElementById("palette").width = document.getElementById("palette").height;
    document.getElementById("palette").height = wide;
    if (landscape) {
        document.getElementById("palette").src = "/img/monolith.jpg";
        document.getElementById("bord").className = "portrait";
        document.getElementById("rot").src = "/img/revflip.png";
    }
    else {
        document.getElementById("palette").src = "/img/white.jpg";
        document.getElementById("bord").className = "searchresult";
        document.getElementById("rot").src = "/img/undo3.png";
    }
    
    landscape = !landscape;
    
    if (!endless) {
        var filepath = "/babelia.cgi";
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                if (imgSrc) {window.URL.revokeObjectURL(imgSrc);}
                var blob = xmlhttp.response;
                var imgSrc = (window.URL ? URL : webkitURL).createObjectURL( blob );
                document.getElementById("palette").src = imgSrc;
                        clearInterval(ewig);
                if (postdata.length>21) {
                    var name = "babelia #" + postdata.substring(0,10) + "..." + postdata.substring(postdata.length-10,postdata.length);
                    document.getElementById("loc").innerHTML = name;
                }
                else {document.getElementById("loc").innerHTML = "babelia #" + postdata;}
            }
        }
        xmlhttp.open("POST",filepath,true);
        xmlhttp.responseType = "blob";
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        var info = "location=" + postdata;
        if (!landscape) {info += "&flip=portrait";}
        xmlhttp.send(info);
           }
    else {flipped=true;}
    
}

function stopstart() {
    if (endless) {
        endless = false;
        var middle = document.getElementById("pauseplay");
        middle.src = "/img/playbut.png";
        middle.title = "Play";
        var end = postdata.length - 1;
        var trim = "";
        if (subtraction) {
            while(end>-1) {
                var last = postdata.charAt(end);
                if (last<9) {postdata = postdata.substring(0,end) + ++last + trim; break;}
                else {trim += "0"; postdata =  postdata.substring(0,end); end--;}
            }
            if (end === -1) {postdata = "1" + trim;}
        }
        else {
            while(end>-1) {
                var last = postdata.charAt(end);
                if (last>0) {postdata = postdata.substring(0,end) + --last + trim; break;}
                else {trim +="9"; postdata =  postdata.substring(0,end); end--;}
            }
            if (end === -1) {postdata = trim.substring(1,trim.length);}
        }
    }
    else {
        loader();
        endless = true;
        babel();
        var middle = document.getElementById("pauseplay");
        middle.src = "/img/pausew.png";
        middle.title = "Pause";
    }
}

function zoomin() {
    var divver = document.getElementById("palette");
    divver.width = divver.width*(1.1);
    divver.height = divver.height*(1.1);
}

function zoomout() {
    var divver = document.getElementById("palette");
    divver.width = divver.width*(.909090909);
    divver.height = divver.height*(.909090909);
}

function rollreversal() {
    subtraction = true;
    if (!endless) {
        image(false);
        if (postdata<=1) {document.getElementById("back").style = "cursor:default";}
    }
}
function roll() {
    subtraction = false;
    if (!endless) {image(true);}
}

function image(forwards) {
    loader();
    var filepath = "/babelia.cgi";
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            if (imgSrc) {window.URL.revokeObjectURL(imgSrc);}
            var blob = xmlhttp.response;
            var imgSrc = (window.URL ? URL : webkitURL).createObjectURL( blob );
            document.getElementById("palette").src = imgSrc;
            clearInterval(ewig);
            if (postdata.length>21) {
                var name = "babelia #" + postdata.substring(0,10) + "..." + postdata.substring(postdata.length-10,postdata.length);
                document.getElementById("loc").innerHTML = name;
            }
            else {document.getElementById("loc").innerHTML = "babelia #" + postdata;}
        }
    }
    xmlhttp.open("POST",filepath,true);
    xmlhttp.responseType = "blob";
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var end = postdata.length - 1;
    var trim = "";
    if (forwards) {
        while(end>-1) {
            var last = postdata.charAt(end);
            if (last<9) {postdata = postdata.substring(0,end) + ++last + trim; break;}
            else {trim += "0"; postdata =  postdata.substring(0,end); end--;}
        }
        if (end === -1) {postdata = "1" + trim;}
    }
    else {
        while(end>-1) {
            var last = postdata.charAt(end);
            if (last>0) {postdata = postdata.substring(0,end) + --last + trim; break;}
            else {trim +="9"; postdata =  postdata.substring(0,end); end--;}
        }
        if (end === -1) {postdata = trim.substring(1,trim.length);}
    }
    var info = "location=" + postdata;
    if (!landscape) {info += "&flip=portrait";}
    xmlhttp.send(info);
}

function postdl() {
    if (endless) {
    var end = postdata.length - 1;
    var trim = "";
    if (subtraction) {
        while(end>-1) {
            var last = postdata.charAt(end);
            if (last<9) {postdata = postdata.substring(0,end) + ++last + trim; break;}
            else {trim += "0"; postdata =  postdata.substring(0,end); end--;}
        }
        if (end === -1) {postdata = "1" + trim;}
    }
    else {
        while(end>-1) {
            var last = postdata.charAt(end);
            if (last>0) {postdata = postdata.substring(0,end) + --last + trim; break;}
            else {trim +="9"; postdata =  postdata.substring(0,end); end--;}
        }
        if (end === -1) {postdata = trim.substring(1,trim.length);}
    }
    }
    document.getElementById("data").value = postdata;
    var title;
    if (postdata.length>20) {title = "babelia" + postdata.substr(0,7) + "..." + postdata.substring(postdata.length-8,postdata.length);}
        else {title= "babelia " + postdata;}
    title = prompt("Enter a title for your photo (A-Z, a-z, 0-9, space, hyphen, and period - limit 80 characters)",title);
    title=title.replace(/[^a-z0-9A-Z .-]/g,"");
    if (title.length>80) {title = title.substring(0,80);}
    document.getElementById("tile").value = title;
    if (!landscape) {document.getElementById("orienter").value = "portrait";}
        document.getElementById("post").action = "/imagedl.cgi";
     document.getElementById("post").submit();

    
    if (!window.chrome) {
        endless=false;
        var middle = document.getElementById("pauseplay");
        middle.src = "/img/playbut.png";
        middle.title = "Play";
    }
}

function postbm() {
    if (endless) {
        var end = postdata.length - 1;
        var trim = "";
        if (subtraction) {
            while(end>-1) {
                var last = postdata.charAt(end);
                if (last<9) {postdata = postdata.substring(0,end) + ++last + trim; break;}
                else {trim += "0"; postdata =  postdata.substring(0,end); end--;}
            }
            if (end === -1) {postdata = "1" + trim;}
        }
        else {
            while(end>-1) {
                var last = postdata.charAt(end);
                if (last>0) {postdata = postdata.substring(0,end) + --last + trim; break;}
                else {trim +="9"; postdata =  postdata.substring(0,end); end--;}
            }
            if (end === -1) {postdata = trim.substring(1,trim.length);}
        }
    }
    document.getElementById("data").value = postdata;
    var title;
    if (postdata.length>20) {title = "babelia " + postdata.substr(0,7) + "..." + postdata.substring(postdata.length-8,postdata.length);}
    else {title= "babelia " + postdata;}
    title = prompt("Enter a title/caption for your bookmark (A-Z, a-z, 0-9, space, comma, and period - limit 200 characters)",title);
    title=title.replace(/[^a-z0-9A-Z ,.]/g,"");
    if (title.length>200) {title = title.substring(0,200);}
    document.getElementById("tile").value = title;
    if (!landscape) {document.getElementById("orienter").value = "portrait";}
    document.getElementById("post").action = "/imagebookmarker2.cgi";
   document.getElementById("post").submit();
}

function whereis() {
    var ua = navigator.userAgent.toLowerCase();
    
    if ((ua.indexOf('safari') != -1) && ua.indexOf('chrome')==-1) {
        var locate;
        if (postdata.length>32000) {
         locate = prompt("Note: only the first 32,000 characters are selected below. Use cmd+a or double-click to highlight the entire image location and cmd+c to copy. Enter a new value to visit a new location in the library", postdata);
        }
        else {
            locate = prompt("Use ctrl+c or Cmd+c to copy this image's location. Enter a new value to visit a new location in the library", postdata);
        }
        locate = locate.replace(/[^0-9]/g,"");
        while(locate.charAt(0) === '0') {
            locate = locate.substr(1);
        }
        if (locate) {
            endless=false;
            loader();
            var middle = document.getElementById("pauseplay");
            middle.src = "/img/playbut.png";
            middle.title = "Play";
            var filepath = "/babelia.cgi";
            xmlhttp=new XMLHttpRequest();
            xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                    if (imgSrc) {window.URL.revokeObjectURL(imgSrc);}
                    var blob = xmlhttp.response;
                    var imgSrc = (window.URL ? URL : webkitURL).createObjectURL( blob );
                    document.getElementById("palette").src = imgSrc;
                    var len = postdata.length;
                    clearInterval(ewig);
                    if (len>21) {
                        var name = "babelia #" + postdata.substring(0,10) + "..." + postdata.substring(len-10,len);
                        document.getElementById("loc").innerHTML = name;
                    }
                    else {document.getElementById("loc").innerHTML = "babelia #" + postdata;}
                }
            }
            xmlhttp.open("POST",filepath,true);
            xmlhttp.responseType = "blob";
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            postdata=locate;
            var info = "location=" + postdata;
            if (!landscape) {info += "&flip=portrait";}
            xmlhttp.send(info);
        }
    }
    else {
    var appear = $("#outer");
    if (appear) {appear.remove();}
    var cla = document.getElementById("bord").className;
    var tp;
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {tp="0";}
    else {tp="-2px";}
    var y;
    if (cla==="portrait") {
        y="208px";
    }
    else {y="96px";}
    var $ta = $("<div id ='outer' style = 'position:absolute;top:" + y +"; left:50%; margin-left:-175px; z-index:10;background-color:#DDD;font-family:\"Vollkorn\"; color:#222; width:350px; border-width:1px;border-color:#222;border-style:solid'><div style = 'width:325px;margin-left:auto;margin-right:auto;'>Ctrl+a/cmd+A or double-click/triple-click to select Image Location. Ctrl+c/cmd+c to copy. Enter any number to visit that location in the Babel Image Archives.</div><textarea onkeypress = 'submitter(event)' id = 'values' style = 'width:200px; height:100px'>" + postdata + "</textarea><br><div style = 'position:relative;top:" + tp + "'><button type = 'button' style = 'width:7em;' onclick = 'blurry()'>Close</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' onclick='submiss()' style = 'width:7em;'>Seek</button></div></div>");
    $("#bord").append($ta);
    $("#values").focus();
    }
}

function blurry() {
    $("#outer").remove();
}

function submitter(event) {
    event = event || window.event;
    var x = event.which || event.keyCode;
    if (x ===10 || x === 13) {
        event.preventDefault();
        var restart;
        submiss();
    }
}

function submiss() {
    var locate = $("#values").val();
    locate = locate.replace(/[^0-9]/g,"");
    while(locate.charAt(0) === '0') {
        locate = locate.substr(1);
    }
    $("#outer").remove();
    if (locate) {
        endless=false;
        loader();
        var middle = document.getElementById("pauseplay");
        middle.src = "/img/playbut.png";
        middle.title = "Play";
        var filepath = "/babelia.cgi";
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                if (imgSrc) {window.URL.revokeObjectURL(imgSrc);}
                var blob = xmlhttp.response;
                var imgSrc = (window.URL ? URL : webkitURL).createObjectURL( blob );
                document.getElementById("palette").src = imgSrc;
                var len = postdata.length;
                clearInterval(ewig);
                if (len>21) {
                    var name = "babelia #" + postdata.substring(0,10) + "..." + postdata.substring(len-10,len);
                    document.getElementById("loc").innerHTML = name;
                }
                else {document.getElementById("loc").innerHTML = "babelia #" + postdata;}
            }
        }
        xmlhttp.open("POST",filepath,true);
        xmlhttp.responseType = "blob";
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        postdata=locate;
        var info = "location=" + postdata;
        if (!landscape) {info += "&flip=portrait";}
        xmlhttp.send(info);
    }
}

function hider() {
    if (document[hidden]) {
        if (endless) {restore = true;}
        else {restore = false;}
        endless = false;
    }
    else {
        if (restore) {endless=true; babel();}
    }
}

document.addEventListener(visibilityChange, hider, false);