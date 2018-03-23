"use strict";
(function() {
    function $(id) {
        return document.getElementById(id);
    }
    function qs(name) {
        return document.querySelector(name);
    }
    function qsa(name) {
        return document.querySelectorAll(name);
    }

    let editor;

    // Set up the page when it is loaded
    window.onload = function() {
        editor = CKEDITOR.replace('main');
        $("generate").onclick = generateImg;
        $("preview").onclick = preview;
        $("back").onclick = back;
    };

    function preview() {
        $("edit").classList.add("hidden");
        $("sheet").classList.remove("hidden");
        let content = editor.document.getBody().getHtml();
        let title = $("input_title").value;
        let author = $("input_author").value;
        let year = $("input_year").value;
        let month = $("input_month").value;
        let date = $("input_date").value;
        let day = $("input_day").value;
        $("yearmonth").innerHTML = year + "/" + month;
        $("dd1").innerHTML = date;
        $("dd2").innerHTML = day;
        $("author").innerHTML = author;
        $("entrytitle").innerHTML = title;
        $("entry").innerHTML = content;
        // Images2Base64();
    }

    function back() {
        $("edit").classList.remove("hidden");
        $("sheet").classList.add("hidden");
    }

    function generateImg() {
        html2canvas($("preview_content"))
            .then(function(canvas) {
                console.log(canvas.height);
                Canvas2Image.saveAsPNG(canvas);
            });
    }

    function Images2Base64() {
        let images = qsa("#sheet img");
        for (let i = 0; i < images.length; i++) {
            let image = images[i];
            let url = image.src;
            let canvas = document.createElement("canvas");
            canvas.height = image.height;
            canvas.width = image.width;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            let ext = image.src.substring(image.src.lastIndexOf(".")+1).toLowerCase();  
            let dataURL = canvas.toDataURL("image/"+ext);  
            image.src = dataURL;
            canvas = null;
        }
    }
})()