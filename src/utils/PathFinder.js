"use strict";

var util = {

  /**
   * 获取指定范围内的素数
   * @param num 最大值
   * @returns {Array} 素数数组
   */
  getPrime: function (num) {
    var i, k;
    var arr = [];

    for (i = 2; i <= num; i++) {
      arr.push(i);
    }

    for (i = 0; i < arr.length; i++) {
      for (k = i + 1; k < arr.length; k++) {
        if (arr[k] % arr[i] === 0) {
          arr.splice(k, 1);
        }
      }
    }

    return arr;
  },

  /**
   * 获取素数的二维数组,用来替代规格属性id
   * @param {array} arrCd [4, 4, 5, 6, 3]
   * @param {number} opt_nums
   * @return {array} array of condition
   */
  getMaps: function (arrCd, opt_nums) {
    var i, j = 0, ret = [];
    opt_nums = opt_nums || 500;
    var opt_primes = this.getPrime(opt_nums);

    for (i = 0; i < arrCd.length; i++) {
      var n = 0;
      ret.push([]);
      while (n < arrCd[i]) {
        ret[i].push(opt_primes[j]);
        j++;
        n++;
      }
    }

    return ret;
  },

  /**
   * 数组克隆,支持二维数组
   */
  cloneTwo: function (o) {
    var ret = [];
    for (var j = 0; j < o.length; j++) {
      var i = o[j];
      ret.push(i.slice ? i.slice() : i);
    }
    return ret;
  }
};

/**
 * 计算哪些point可选;
 var maps = [
 [ 2, 3, 5, 7, 11 ],
 [ 13, 17, 19, 23, 29 ],
 [ 31, 37, 41, 43, 47 ],
 [ 53, 59, 61, 67, 71 ],
 [ 73, 79, 83, 89, 97 ]
 ];

 var ways = [
 [ 2, 19, 31, 53, 79 ],
 [ 5, 17, 47, 59, 83 ]
 ];

 var a = new PathFinder(maps, ways); // 初始化对象
 a.add([0, 0]); // 添加选择项
 console.log(a.light);
 a.remove([0, 0]); //取消选择项
 console.log(a.light);

 * @param specs 规格属性二维数组
 * @param skus 有货的sku数组
 * @constructor
 */
//noinspection SpellCheckingInspection,JSUnresolvedVariable
export default function PathFinder(specs, skus) {
  specs = specs || [];
  skus = skus || [];
  this._mapping = {}; // 属性值与素数的映射对象,key是属性值,value是素数
  this._reverseMapping = {}; // 属性值与素数的反转映射对象,key是素数,value是属性值

  var arr = [];
  specs.map((attrs)=> {
    arr.push(attrs.length);
  });

  //根据规格属性值,创建素数集合
  this.maps = util.getMaps(arr) || [];

  // 映射规格属性与素数, 每一个属性值与素数一一对应
  var i, j = 0;
  for (i = 0; i < this.maps.length; i++) {
    for (j = 0; j < this.maps[i].length; j++) {
      this._mapping[specs[i][j]] = this.maps[i][j];
      this._reverseMapping[this.maps[i][j]] = specs[i][j];
    }
  }
  var openway = [];
  skus.map((sku)=> {
    var tmpArr = [];
    sku.map((attr)=> {
      tmpArr.push(this._mapping[attr]);
    });
    openway.push(tmpArr)
  });

  this.openway = openway;

  this._way = {};
  //light of array, 0 mean not availabe, 1 mean availabe, map to the this.maps
  this.light = [];
  this.selected = [];
  //计数器
  this.count = 0;

  this.init();
}

//noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
PathFinder.prototype = {
  constructor: PathFinder,

  init: function () {
    this.light = util.cloneTwo(this.maps);
    var light = this.light;

    for (var i = 0; i < light.length; i++) {
      var l = light[i];
      for (var j = 0; j < l.length; j++) {
        this._way[l[j]] = [i, j];
        l[j] = 1;
      }
    }

    for (i = 0; i < this.openway.length; i++) {
      this.openway[i] = eval(this.openway[i].join('*'));
    }

    this._check();
  },

  /**
   * 添加选择的点
   * @param point 可以是坐标数组[x, y], 也可以是属性值
   */
  add: function (point) {
    point = (point instanceof Array) ? point : this._way[this._mapping[point]];
    var val = this.maps[point[0]][point[1]];

    if (!this.light[point[0]][point[1]]) {
      if (__DEV__) {
        console.warn('this point [' + point + '] is no availabe, place choose an other');
      }
      return;
    }

    if (this.selected.indexOf(val) != -1) return;

    var isAdd = this._dealChange(point, val);
    this.selected.push(val);
    this.light[point[0]][point[1]] = 2;
    this._check(!isAdd);

    if (__DEV__) {
      console.log('共进行' + this.count + '次运算, 耗时' + this.time + 'ms');
    }
  },

  /**
   * 删除选择的点
   * @param {array} point [x, y]
   */
  remove: function (point) {
    point = (point instanceof Array) ? point : this._way[this._mapping[point]];

    try {
      var val = this.maps[point[0]][point[1]];
    } catch (e) {
    }

    if (val) {
      for (var i = 0; i < this.selected.length; i++) {
        if (this.selected[i] == val) {
          var line = this._way[this.selected[i]];
          this.light[line[0]][line[1]] = 1;
          this.selected.splice(i, 1);
        }
      }

      this._check();
      if (__DEV__) {
        console.log('共进行' + this.count + '次运算, 耗时' + this.time + 'ms');
      }
    }
  },

  getWay: function () {
    var light = this.light;
    var way = util.cloneTwo(light);
    for (var i = 0; i < light.length; i++) {
      var line = light[i];
      for (var j = 0; j < line.length; j++) {
        if (line[j]) way[i][j] = this._reverseMapping[this.maps[i][j]];
      }
    }

    return way;
  },

  /**
   * 获取已选择的属性值
   * @returns {Array} 属性值数组
   */
  getCheckedAttr: function () {
    var checkedAttr = [];
    this.selected.map((val) => {
      checkedAttr.push(this._reverseMapping[val]);
    });
    return checkedAttr;
  },


  _check: function (isAdd) {
    var light = this.light;
    var maps = this.maps;
    //noinspection JSUnresolvedVariable
    this.count = 0;
    var time = Date.now();
    this.time = time;

    for (var i = 0; i < light.length; i++) {

      var li = light[i];
      var selected = this._getSelected(i);

      for (var j = 0; j < li.length; j++) {
        if (li[j] !== 2) {
          //如果是加一个条件，只在是light值为1的点进行选择
          if (isAdd) {
            if (li[j]) {
              light[i][j] = this._checkItem(maps[i][j], selected);
              this.count++;
            }
          } else {
            light[i][j] = this._checkItem(maps[i][j], selected);
            this.count++;
          }
        }
      }

    }

    this.time = Date.now() - time;
    return this.light;
  },

  _checkItem: function (item, selected) {
    var openway = this.openway;
    var val = item * selected;
    for (var i = 0; i < openway.length; i++) {
      this.count++;
      if (openway[i] % val === 0) {
        return 1;
      }
    }

    return 0;
  },

  _getSelected: function (xpath) {
    var selected = this.selected;
    var _way = this._way;
    // var x = 0;
    var ret = 1;

    if (selected.length) {
      for (var j = 0; j < selected.length; j++) {
        var s = selected[j];
        //xpath表示同一行，当已经被选择的和当前检测的项目在同一行的时候需要忽略。
        //必须选择了 [1, 2],检测的项目是[1, 3]，不可能存在[1, 2]和[1, 3]的组合，他们在同一行
        if (_way[s][0] !== xpath) ret = ret * s;
      }
    }

    return ret;
  },

  _dealChange: function (point, val) {
    var selected = this.selected;
    // var maps = this.maps;
    for (var i = 0; i < selected.length; i++) {
      var line = this._way[selected[i]];
      if (line[0] === point[0]) {
        this.light[line[0]][line[1]] = 1;
        selected.splice(i, 1);
        return true;
      }
    }
    return false;
  }

};


