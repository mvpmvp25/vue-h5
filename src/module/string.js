/**
 * 字符串模块
 * created by LittleYellow/441980627@qq.com
 */

export default (function() {

	var stringModule = {};

	/**
	 * 获取url参数
	 * 有参数返回该参数值，否则返回"";
	 */
	stringModule.getUrlString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return decodeURI(r[2]);
		} else {
			return "";
		}
	}

	/**
	 * 判断值是否为空
	 * 有值返回ture，否则返回false
	 */
	stringModule.checkEmpty = function(str) {
		if(str instanceof Array) {
			if(str.length == 0) {
				return false;
			} else {
				return true;
			}
		} else if(str instanceof Object) {
			if(JSON.stringify(str) == "{}") {
				return false;
			} else {
				return true;
			}
		} else {
			if(str != "" && str != null && str != undefined) {
				return true;

			} else if(str == 0 && typeof(str) == "number") {
				return true;

			} else {
				return false;

			}
		}
	}

	/**
	 * 对Date的扩展，将Date转化为指定格式的String
	 * 年(y)可以用 1-4 个占位符，月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q)可以用 1-2 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	 * var timeA = new Date().format("yyyy-MM-dd hh:mm:ss.S") ==> 2017-07-02 08:09:04.423
	 * var timeB = new Date().format("yyyy-M-d h:m:s.S") ==> 2017-7-2 8:9:4.18
	 * var timeC = new Date().format("yyyyMMddhhmmss") ==> 20170816184602
	 */
	Date.prototype.format = function(tpl) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if(/(y+)/.test(tpl)) {
			tpl = tpl.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
		};
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(tpl)) {
				tpl = tpl.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return tpl;
	}

	//字符串转成日期对象，dateStr格式如：20170823183943
	stringModule.convertDate = function(dateStr) {
		var dateDetail = dateStr.substr(4);
		var theDate = "";
		for(var t = 0; t < dateDetail.length / 2; t++) {
			if(t == 0) {
				theDate += "," + (parseInt(dateDetail.substr(t * 2, 2)) - 1).toString();
			} else {
				theDate += "," + dateDetail.substr(t * 2, 2);
			}
		}
		theDate = "new Date(" + dateStr.substr(0, 4) + theDate + ")";
		return eval(theDate);
	};

	/**
	 * 返回未来或过去n年时的时间对象
	 * 过去时n为负数
	 */
	stringModule.futureDate = function(n) {
		var now = new Date;
		now.setFullYear(now.getFullYear() + n);
		return now;
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

		if(stringModule.checkEmpty(options.targetStr)) {
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

	// 字符串格式化
	stringModule.formatDeal = function(str, type) {
		var t = "";
		switch(type) {
			case "mobile":
				for(var n = 0; n < str.length; ++n) {
					n == 3 || n == 7 ? t += " " + str[n] : t += str[n];
				}
				break;
			case "jstcard":
				for(var n = 0; n < str.length; ++n) {
					n == 6 ? t += " " + str[n] : t += str[n];
				}
				break;
		}
		return t;
	}

	// 判断数组是否包含某元素 true-包含 false-不包含
	stringModule.isInArray = function(arr, str) {
		var t = false;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == str) {
				t = true;
				break;
			}
		}
		return t;
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