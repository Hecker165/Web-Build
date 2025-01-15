$(document).ready(function(){
    $("#img").on("submit", function() { return check();});
    $("#options").hide();
    $("#first").click(function(){
                      $("#options").fadeToggle();});
                       });

function check() {
if (!document.getElementById("filename").value && !document.getElementById("address").value) {alert("Upload an image file or enter an image's URL."); return false;}
}