/******************************
tvsource-input 为 textarea 的 ID
inputBrow    上传按钮id
*******************************/
	// 支持文件拖放
	function importTxt() {

	}
	// 支持文件拖放
	function dragenter(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	function dragover(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	function drop(e) {
		e.stopPropagation();
		e.preventDefault();
		var dt = e.dataTransfer;
		var files = dt.files;
		if (files.length) {
			var file = files[0];
			var reader = new FileReader();
			reader.onload = function () {
				document.getElementById("tvsource-input").value = this.result;
			};
			reader.readAsText(file, document.getElementById("encoding").value);
			reader = null;
		}
	}
	var dropbox = document.getElementById("tvsource-input");
	dropbox.addEventListener("dragenter", dragenter, false);
	dropbox.addEventListener("dragover", dragover, false);
	dropbox.addEventListener("drop", drop, false);

	(function () {
		var input = document.querySelector('#inputBrow');
		var span = document.querySelector('#tvsource-input');
		input.addEventListener('change', function (e) {
			handFile(e.target.files[0]);
		});

		function handFile(file) {
			console.log('hand');
			var reader = new FileReader();
			reader.onload = function (e) {
				span.value = e.target.result;
			};
			reader.readAsText(file, document.getElementById("encoding").value);
			reader = null;
		}
	})();
    /////====
function copy(){
    var content=document.getElementById("contents");
    content.select();
    document.execCommand("Copy"); 
}

/////====
 function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}     

function downloadmitv() {
    //从输出框contents获取文本内容。
    var textmitv = document.getElementById('contents').value;
    var filename;
    
    //检查文本内容，判断它属于哪种播放列表格式，并决定下载的文件名
    if (textmitv.indexOf("playUrl") != -1 && textmitv.indexOf("genre") != -1) {
        filename = "mitv.txt";
    } else if(textmitv.indexOf("EXTM3U") != -1 && textmitv.indexOf("EXTINF") != -1) {
        filename = "tvlist.m3u";
    } else if(textmitv.indexOf("DAUMPLAYLIST") != -1 && textmitv.indexOf("file") != -1) {
        filename = "tvlist.dpl";
    } else {
        filename = "tvlist.txt";
    }
    
    // 使用 FileSaver.js 库下载
    var blob = new Blob([textmitv], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
}