export function hasClass(el, className) {
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
	return reg.test(el.className)
}

export function addClass(el, className) {
	if(hasClass(el, className)) {
		return
	}

	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}

export function removeClass(el, className) {
	if(!hasClass(el, className)) {
		return
	}

	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
	el.className = el.className.replace(reg, ' ')
}



export function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return false;
}

export function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

export function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

export function scrollLeft(element, endOffset) {
	var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(fun) {
		setTimeout(fun, 1000 / 60);
	};

	function scrollTo(element, endOffset, params) {
		var startOffset;
		var scrollProp;
		if(params.horizontal) {
			startOffset = element.scrollLeft;
			scrollProp = 'scrollLeft';
		} else if(params.vertical) {
			startOffset = element.scrollTop;
			scrollProp = 'scrollTop';
		}

		var distance = endOffset - startOffset;
		var forward = true;
		if(distance == 0) {
			return;
		}

		forward = (distance > 0);

		function scroll() {
			var speed = 2 + Math.abs(endOffset - startOffset) / 5;
			if(!forward) {
				speed = -speed;
			}
			startOffset += speed;
			element[scrollProp] = startOffset;
			if(startOffset < endOffset && speed > 0 || startOffset > endOffset && speed < 0) {
				raf(scroll);
			}
		}

		scroll();
	}
	scrollTo(element, endOffset, {
		horizontal: true
	});
}
