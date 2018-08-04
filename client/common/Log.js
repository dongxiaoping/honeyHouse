// +----------------------------------------------------------------------
// | Copyright (js), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/4
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

let logLevel = "DEBUG";
class LogManage {
    constructor() {
        this.levels = {e:4,w:3,i:2,d:1};
        this.level = this.getLevel();
    }

    getLevel(){
        switch(logLevel){
            case "ERROR":
                return this.levels.e;
            case "WARN":
                return this.levels.w;
            case "INFO":
                return this.levels.i;
            case "DEBUG":
                return this.levels.d;
            default:
                return this.levels.i;
        }
    }

    e(v) {
        if (this.level<=this.levels.e) {
           // console.log("flash:e("+v+")");
            console.log("honey:e");
            console.log(v);
        }
    };

    w(v) {
        if (this.level<=this.levels.w) {
            //console.log("flash:w("+v+")");
            console.log("honey:w");
            console.log(v);
        }
    };

    i(v) {
        if (this.level<=this.levels.i) {
            //console.log("flash:i("+v+")");
            console.log("honey:i");
            console.log(v);
        }
    };

    d(v) {
        if (this.level<=this.levels.d) {
           // console.log("flash:d("+v+")");
            console.log("honey:d");
            console.log(v);
        }
    };
}
module.exports = new LogManage();