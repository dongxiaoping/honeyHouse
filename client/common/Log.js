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
            if(typeof (v)==="string"){
                console.log("log:e("+v+")");
            }else{
                console.log("log:e("+JSON.stringify(v)+")");
            }
        }
    };

    w(v) {
        if (this.level<=this.levels.w) {
            if(typeof (v)==="string"){
                console.log("log:w("+v+")");
            }else{
                console.log("log:w("+JSON.stringify(v)+")");
            }
        }
    };

    i(v) {
        if (this.level<=this.levels.i) {
            if(typeof (v)==="string"){
                console.log("log:i("+v+")");
            }else{
                console.log("log:i("+JSON.stringify(v)+")");
            }
        }
    };

    d(v) {
        if (this.level<=this.levels.d) {
            if(typeof (v)==="string"){
                console.log("log:d("+v+")");
            }else{
                console.log("log:d("+JSON.stringify(v)+")");
            }
        }
    };
}
module.exports = new LogManage();