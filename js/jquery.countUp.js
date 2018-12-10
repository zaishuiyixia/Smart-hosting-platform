(function($) {
    $.fn.countTo = function(opts) {
                // 鍚堝苟鑷畾涔夌殑鏂规硶
        var options = $.extend({}, $.fn.countTo.defaults, opts);

        return $(this).each(function() {
                // 璁剧疆鎬绘洿鏂版鏁颁粠鑰屽緱鍒版瘡娆＄疮鍔犵殑鍊�
            var _this = this,
                originalData = $(this).text(),//鍒濆鍊�
                loops = Math.ceil(options.speed / options.refreshInterval),//鎬绘洿鏂版鏁�
                increment = ($(this).text() - options.from) / loops,//姣忔绱姞鐨勫€�
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);
            //console.log(Number(originalData).toFixed(options.decimals));
            function updateTimer() {
                value += increment;
                loopCount++;
                var str=value.toFixed(options.decimals);

                //杩愮畻鍒版鏃剁殑瀛楃涓叉€婚暱搴�
                this.sizeNum=str.length; 

                //杩愮畻鍒版鏃剁殑灏忔暟鐐瑰墠鐨勫瓧绗﹂暱搴�
                this.sizeNumBefore=this.sizeNum-options.decimals-1;

                //鍒ゆ柇 姝ゆ椂鐨勫皬鏁扮偣鍓嶇殑瀛楃涓查暱搴︽槸鍚�>=闇€瑕佺殑瀛楃涓插皬鏁扮偣鍓嶇殑闀垮害
                if(this.sizeNumBefore>=options.beforeSize)  {

               		$(_this).html(str+options.lastSymbol);

                } else{
                    //鍦�<鐨勬椂鍊� 鍓嶉潰瑕佽ˉ0 鍐嶆樉绀�
                    this._str = Array(options.beforeSize-this.sizeNumBefore + 1).join('0') + str;
                	$(_this).html(this._str+options.lastSymbol);
                }          


                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value, loopCount);
                    //鐢╟all鏂规硶 鎶� options.onUndate=='function'(鏄竴涓柟娉�), 鏇挎崲鎺塤this锛屽苟鎶妚alue浣滀负鍜岃繖涓嚱鏁扮殑鍙傛暟   
                }
                if (loopCount >= loops) {//over
                    clearInterval(interval);
                    $(_this).html(originalData+options.lastSymbol);
                    value = $(_this).text();

                    if (typeof(options.onComplete) == 'function') {
                        //options.onComplete.call(_this, value, loopCount);
                        options.onComplete(value,loopCount,_this);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
    	lastSymbol:"%", //鏄剧ず鍦ㄦ渶鍚庣殑瀛楃
        from: 0,  // 寮€濮嬫椂鐨勬暟瀛�
        speed: 1000,  // 鎬绘椂闂�
        refreshInterval: 100,  // 鍒锋柊涓€娆＄殑鏃堕棿
        beforeSize:0, //灏忔暟鐐瑰墠鏈€灏忔樉绀轰綅鏁帮紝涓嶈冻鐨勮瘽鐢�0浠ｆ浛
        decimals: 0,  // 灏忔暟鐐瑰悗鐨勪綅鏁�
        onUpdate: null,  // 鏇存柊鏃跺洖璋冨嚱鏁�
        onComplete: null  // 缁撴潫鍚庡洖璋冨嚱鏁�
    };
})(jQuery);