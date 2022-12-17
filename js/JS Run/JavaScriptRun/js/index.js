const show = document.querySelector("#show");
const codes = document.querySelector("#code");
const run = document.querySelector("#run");
const cleanbtn = document.querySelector("#clean");
const copybtn = document.querySelector("#copy");

function runCode() {
	show.innerHTML = "";
	const console = {};
	console.log = function(...args) {
		show.innerHTML += "> ";
		for (let i = 0; i < args.length; i++) {
			if (!(args[i] instanceof Error) && typeof args[i] === "object") {
				show.innerHTML += JSON.stringify(args[i]);
			} else {
				show.innerHTML += args[i];
			}
			show.innerHTML += " ";
		}
		show.innerHTML += "\n";
	};
	try {
		eval(codes.value);
	} catch (e) {
		console.log(e);
	}
}

function clean() {
	show.innerHTML = "";
	codes.value = "";
}

// 支持tab键
function tab(obj) {
	if (event.keyCode == 9) {
		const tab = "  ";
		const len = tab.length;
		let text = obj.value;
		let start = obj.selectionStart;
		let end = obj.selectionEnd;
		let selectionText = text.substring(start, end);

		if (start === end) {
			text = text.substring(0, start) + tab + text.substring(end);
			obj.value = text;
			// 防止光标跳到最后
			obj.selectionStart = start + len;
			obj.selectionEnd = start + len;
		} else if (selectionText.includes("\n")) {
			const arr = selectionText.split("\n");
			let str = text.substring(0, start);
			let count = 0;
			for (let i = 0; i < arr.length; i++) {
				str += tab + arr[i] + "\n";
				count++;
			}
			// 去掉最后一个换行
			str = str.substring(0, str.length - 1);
			str += text.substring(end);
			obj.value = str;
			obj.selectionStart = end + count * len;
			obj.selectionEnd = end + count * len;
		} else {
			text =
				text.substring(0, start) +
				tab +
				selectionText +
				text.substring(end);
			obj.value = text;
			obj.selectionStart = start + len;
			obj.selectionEnd = start + len;
		}

		event.preventDefault();
	}
}

function copy() {
	let code = codes.value;
	if (navigator.clipboard) {
		let theClipboard = navigator.clipboard;
		if (!code.trim()) {
			$Tip.info("无代码可复制!");
			return;
		}
		let promise = theClipboard.writeText(code);
		promise.then(
			() => {
				$Tip.success("复制成功!");
			},
			(err) => {
				$Tip.error("复制失败!", err);
			}
		);
	} else {
		// 兼容不支持clipboard
		let copyInput = document.createElement('input'); //创建input元素
		document.body.appendChild(copyInput); //向页面底部追加输入框
		copyInput.setAttribute('value', code); //添加属性，将url赋值给input元素的value属性
		copyInput.select(); //选择input元素
		document.execCommand("Copy"); //执行复制命令
		$Tip.success('复制成功！')
		copyInput.remove(); //删除动态创建的节点
	}
}

copybtn.addEventListener("click", () => {
	copy();
});

cleanbtn.addEventListener("click", () => {
	clean();
});
run.addEventListener("click", () => {
	runCode();
});


class Tip {
	constructor() {
		this.div = document.createElement('div')
		this.div.className = 'tipContainer'
		document.body.appendChild(this.div)
	}

	success(msg) {
		let span = document.createElement('div')
		span.classList.add('tip')
		span.classList.add('btn-success')
		span.innerText = msg
		this.div.appendChild(span)
		setTimeout(() => {
			span.remove()
		}, 2000)
	}

	error(msg) {
		let span = document.createElement('div')
		span.classList.add('tip')
		span.classList.add('btn-error')
		span.innerText = msg
		this.div.appendChild(span)
		setTimeout(() => {
			span.remove()
		}, 2000)
	}

	info(msg) {
		let span = document.createElement('div')
		span.classList.add('tip')
		span.innerText = msg
		this.div.appendChild(span)
		setTimeout(() => {
			span.remove()
		}, 2000)
	}
}

window.$Tip = new Tip()
