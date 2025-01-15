var polygon = [0,0,0]
var ewig;

function colorperm() {
    var permuda = "0123456789ABCDEF";
    if (polygon[2]<15) {polygon[2]++;}
    else {
        polygon[2]=0;
        if (polygon[1]<15) {polygon[1]++;}
        else {
            polygon[1]=0;
            if (polygon[0]<15) {polygon[0]++;}
            else {polygon[0]=0;}
        }
    }
      var color = "#" + permuda.charAt(polygon[0]) + permuda.charAt(polygon[1]) + permuda.charAt(polygon[2]);
    return color;
}
function permuter(changer) {
    ewig = setInterval(function() {changer.style.color = colorperm();}, 1);
}
function unpermute() {
    clearInterval(ewig);
}
$(document).ready(function() {
                  $("a").on("mouseenter", function() {permuter(this)});
                  $("a").on("mouseleave", function() {unpermute()});
                  $("a").on("click", function() {unpermute()});
                  });