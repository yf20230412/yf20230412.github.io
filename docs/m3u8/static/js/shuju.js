//后端处理 https://龙伊.top/整理/
// 文件选择反馈
const fileInput = document.getElementById('fileUpload') const fileList = document.getElementById('fileList') const uploadWrapper = document.querySelector('.upload-wrapper')

// 显示已选文件
fileInput.addEventListener('change', () = >{
	const files = Array.from(fileInput.files) if (files.length === 0) return

	const fileNames = files.map(f = >f.name).join(', ') fileList.textContent = `已选择$ {
		files.length
	}个文件：$ {
		fileNames
	}`
})

// 拖拽交互
uploadWrapper.addEventListener('dragover', (e) = >{
	e.preventDefault() uploadWrapper.classList.add('dragover')
})

uploadWrapper.addEventListener('dragleave', () = >{
	uploadWrapper.classList.remove('dragover')
})

uploadWrapper.addEventListener('drop', (e) = >{
	e.preventDefault() uploadWrapper.classList.remove('dragover')
}) < /script>
    <script>
        / / 添加动画控制变量let dotInterval = null;

// 修改显示函数
function showProcessing() {
	document.getElementById('processingModal').style.display = 'block';
	// 启动点动画
	let count = 0;
	const dotsElement = document.getElementById('processingDots');
	dotInterval = setInterval(() = >{
		count = (count + 1) % 4;
		dotsElement.textContent = '.'.repeat(count);
	},
	500);
}

// 修改隐藏函数
function hideProcessing() {
	document.getElementById('processingModal').style.display = 'none';
	// 清除动画
	if (dotInterval) {
		clearInterval(dotInterval);
		document.getElementById('processingDots').textContent = ''; // 清空残留
	}
}
// 交互逻辑
async
function handleSubmit(e) {
	e.preventDefault();
	const form = e.target;
	if (document.querySelector('[name="saveToFile"]').checked) {
		showModal();
	} else {
		e.target.submit();
		showProcessing();
		await submitForm(form);
	}
}
// 新增强化版表单提交
async
function submitForm(form) {
	try {
		const response = await fetch(form.action, {
			method: form.method,
			body: new FormData(form)
		});

		if (!response.ok) throw new Error('请求失败');

		// 关键修改：插入服务器返回的内容
		const html = await response.text();
		document.documentElement.innerHTML = html;

	} catch(error) {
		showAlert(`错误：$ {
			error.message
		}`, 'error');
	} finally {
		hideProcessing();
	}
}

function showModal() {
	document.getElementById('passwordModal').style.display = 'flex';
}

function closeModal() {
	document.getElementById('passwordModal').style.display = 'none';
}

// 修改密码提交逻辑
async
function submitPassword() {
	showProcessing();
	closeModal();
	await submitForm(document.querySelector('form'));

}

function copyProcessedData() {
	const items = document.querySelectorAll('.data-item');
	const text = Array.from(items).map(item = >item.textContent).join('\n');

	navigator.clipboard.writeText(text).then(() = >{
		showAlert('✅ 复制成功！数据已存入剪贴板', 'success');
	}).
	catch(() = >{
		showAlert('❌ 自动复制失败，请手动选择内容', 'error');
	});
}

function showAlert(message, type = 'success') {
	const alert = document.getElementById('alert');
	alert.textContent = message;
	alert.className = `alert alert - $ {
		type
	}`;
	alert.style.display = 'block';
	setTimeout(() = >alert.style.display = 'none', 3000);
}  // 自动显示服务器消息
