/**
 * 字符串模块
 */

export default(function() {

	var stringModule = {};

	/**
	 * 判断是否为空,为空返回true
	 */
	stringModule.isEmpty = function(target) {
		var typeoft = typeof(target);
		if(typeoft === "string") {
			target = target.trim();
			return target == "undefined" || target === "" || target == "\"\"" || target == "\'\'" || target == "null";
		}
		if(typeoft === "object") {
			var isEmptyObject = function(o) {
				for(var p in o) {
					if(p !== undefined) {
						return false;
					}
				}
				return true;
			};
			return isEmptyObject(target);
		}
		return target === null || target === undefined;
	};

	/**
	 * @param {Object} name,参数名
	 * @param {Object} findStr,要查找的字符串,默认为当前页面链接地址
	 */
	stringModule.getParameter = function(name, findStr) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

		if(!stringUtil.isEmpty(findStr)) {
			findStr = findStr.indexOf("?") != -1 ? findStr.substr(findStr.indexOf("?") + 1) : findStr;
		}

		var searchStr = findStr || window.location.search.substr(1);

		var r = searchStr.match(reg);
		if(r != null) return decodeURIComponent(r[2]);
		return "";
	}

	/**
	 * 对象更新扩展
	 */
	stringModule.extendObj = function() {
		var copy = function(oldObj) { //复制对象方法  
			var newObj = new Object();
			if(typeof(oldObj) != 'object' || oldObj == null) {
				return oldObj;
			}
			for(var i in oldObj) {
				newObj[i] = copy(oldObj[i]);
			}
			return newObj;
		}

		if(arguments.length < 2) {
			return;
		}
		var temp = copy(arguments[0]); //调用复制对象方法  
		for(var n = 1; n < arguments.length; n++) {
			for(var i in arguments[n]) {
				temp[i] = arguments[n][i];
			}
		}
		return temp;
	}

	/**
	 * 数组重排
	 * object[field]值应为数字
	 * order值为1时从大到小排，为-1时从小到大排
	 * sort的比较函数return值>=1时，此时互相比较的元素交换位置，反之不会(初步判断)
	 */
	stringModule.arrSort = function(arr, field, order) {
		var compareRule = function(_field, _order) {
			return function(o, t) {
				var oVal = parseInt(o[_field]);
				var tVal = parseInt(t[_field]);
				if(oVal < tVal) {
					return _order;
				} else if(oVal > tVal) {
					return -_order;
				} else {
					return 0;
				}
			}
		}
		return arr.sort(compareRule(field, order));
	}

	/**
	 * 密文代替字符串
	 */
	stringModule.infoProtectDeal = function(options) {
		var options = stringModule.extendObj({
			targetStr: "", //目标字符串
			keepStart: 0, //需保留前几位
			keepEnd: 0, //需保留后几位
			cipherLen: 0 //显示多少个*
		}, options);

		var returnStr = "";

		// 返回多个相同字符
		String.prototype.repeat = function(n) {
			return new Array(n + 1).join(this);
		}

		if(!stringModule.isEmpty(options.targetStr)) {
			if(options.keepStart > options.targetStr.length) {
				//前面要保留的数量已超过最大长度
				returnStr = options.targetStr;
			} else {

				var remainLen = options.targetStr.length - options.keepStart; //去掉前面保留的位数之后，还有多少位

				if(options.keepEnd > remainLen) {
					//后面要保留的位数已超过还剩余的位数
					returnStr = options.targetStr;
				} else {
					var remainCipherLen = options.targetStr.length - options.keepStart - options.keepEnd; //去掉前后保留之后，还有多少个字符需要*
					if(options.cipherLen >= 0) {
						//有自定义显示多个*
						remainCipherLen = options.cipherLen;
					}

					returnStr = options.targetStr.slice(0, options.keepStart).concat("*".repeat(remainCipherLen)).concat(options.targetStr.slice(-options.keepEnd));
				}

			}
		}
		return returnStr;
	};


	// 给指定元素的后面追加内容
	stringModule.insertAfter = function(newElement, targetElement) { // newElement是要追加的元素 targetElement 是指定元素的位置 
		var parent = targetElement.parentNode; // 找到指定元素的父节点 
		if(parent.lastChild == targetElement) { // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法 
			parent.appendChild(newElement, targetElement);
		} else {
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	};

	return stringModule;
})();