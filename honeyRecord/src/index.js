// +----------------------------------------------------------------------
// | Copyright (js), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/7/24
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------
import _ from 'lodash';
function component() {
    var element = document.createElement('div');

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());

/*
*
*  created() {
    console.log(window.location.search.substr(1))
    this.id = this.getQueryString("id") || "0";
    this.token = this.getQueryString("token") || "";
    this.member = this.getQueryString("member") || "true";
    this.paused = this.getQueryString("paused") || "true"; //是否暂停
  }

  getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      }
      return null;
    }
* */