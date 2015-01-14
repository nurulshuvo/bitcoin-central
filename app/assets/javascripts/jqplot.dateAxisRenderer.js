/**
 * Copyright (c) 2009 - 2010 Chris Leonello
 * jqPlot is currently available for use in all personal or commercial projects 
 * under both the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL 
 * version 2.0 (http://www.gnu.org/licenses/gpl-2.0.html) licenses. This means that you can 
 * choose the license that best suits your project and use it accordingly. 
 *
 * Although not required, the author would appreciate an email letting him 
 * know of any substantial use of jqPlot.  You can reach the author at: 
 * chris at jqplot  or see http://www.jqplot.com/info.php .
 *
 * If you are feeling kind and generous, consider supporting the project by
 * making a donation at: http://www.jqplot.com/donate.php .
 *
 * jqPlot includes date instance methods and printf/sprintf functions by other authors:
 *
 * Date instance methods contained in jqplot.dateMethods.js:
 *
 *     author Ken Snyder (ken d snyder at gmail dot com)
 *     date 2008-09-10
 *     version 2.0.2 (http://kendsnyder.com/sandbox/date/)     
 *     license Creative Commons Attribution License 3.0 (http://creativecommons.org/licenses/by/3.0/)
 *
 * JavaScript printf/sprintf functions contained in jqplot.sprintf.js:
 *
 *     version 2007.04.27
 *     author Ash Searle
 *     http://hexmen.com/blog/2007/03/printf-sprintf/
 *     http://hexmen.com/js/sprintf.js
 *     The author (Ash Searle) has placed this code in the public domain:
 *     "This code is unrestricted: you are free to use it however you like."
 * 
 */
(function(a){a.jqplot.DateAxisRenderer=function(){a.jqplot.LinearAxisRenderer.call(this)};a.jqplot.DateAxisRenderer.prototype=new a.jqplot.LinearAxisRenderer();a.jqplot.DateAxisRenderer.prototype.constructor=a.jqplot.DateAxisRenderer;a.jqplot.DateTickFormatter=function(b,c){if(!b){b="%Y/%m/%d"}return Date.create(c).strftime(b)};a.jqplot.DateAxisRenderer.prototype.init=function(f){this.tickOptions.formatter=a.jqplot.DateTickFormatter;this.daTickInterval=null;this._daTickInterval=null;a.extend(true,this,f);var c=this._dataBounds;for(var g=0;g<this._series.length;g++){var h=this._series[g];var l=h.data;var b=h._plotData;var k=h._stackData;for(var e=0;e<l.length;e++){if(this.name=="xaxis"||this.name=="x2axis"){l[e][0]=Date.create(l[e][0]).getTime();b[e][0]=Date.create(l[e][0]).getTime();k[e][0]=Date.create(l[e][0]).getTime();if(l[e][0]<c.min||c.min==null){c.min=l[e][0]}if(l[e][0]>c.max||c.max==null){c.max=l[e][0]}}else{l[e][1]=Date.create(l[e][1]).getTime();b[e][1]=Date.create(l[e][1]).getTime();k[e][1]=Date.create(l[e][1]).getTime();if(l[e][1]<c.min||c.min==null){c.min=l[e][1]}if(l[e][1]>c.max||c.max==null){c.max=l[e][1]}}}}};a.jqplot.DateAxisRenderer.prototype.reset=function(){this.min=this._min;this.max=this._max;this.tickInterval=this._tickInterval;this.numberTicks=this._numberTicks;this.daTickInterval=this._daTickInterval};a.jqplot.DateAxisRenderer.prototype.createTicks=function(){var v=this._ticks;var r=this.ticks;var w=this.name;var u=this._dataBounds;var o,s;var m,p;var d,c;var b,q;if(r.length){for(q=0;q<r.length;q++){var f=r[q];var h=new this.tickRenderer(this.tickOptions);if(f.constructor==Array){h.value=Date.create(f[0]).getTime();h.label=f[1];if(!this.showTicks){h.showLabel=false;h.showMark=false}else{if(!this.showTickMarks){h.showMark=false}}h.setTick(h.value,this.name);this._ticks.push(h)}else{h.value=Date.create(f).getTime();if(!this.showTicks){h.showLabel=false;h.showMark=false}else{if(!this.showTickMarks){h.showMark=false}}h.setTick(h.value,this.name);this._ticks.push(h)}}this.numberTicks=r.length;this.min=this._ticks[0].value;this.max=this._ticks[this.numberTicks-1].value;this.daTickInterval=[(this.max-this.min)/(this.numberTicks-1)/1000,"seconds"]}else{if(w=="xaxis"||w=="x2axis"){o=this._plotDimensions.width}else{o=this._plotDimensions.height}if(this.min!=null&&this.max!=null&&this.numberTicks!=null){this.tickInterval=null}if(this.tickInterval!=null){if(Number(this.tickInterval)){this.daTickInterval=[Number(this.tickInterval),"seconds"]}else{if(typeof this.tickInterval=="string"){var k=this.tickInterval.split(" ");if(k.length==1){this.daTickInterval=[1,k[0]]}else{if(k.length==2){this.daTickInterval=[k[0],k[1]]}}}}}m=((this.min!=null)?Date.create(this.min).getTime():u.min);p=((this.max!=null)?Date.create(this.max).getTime():u.max);if(m==p){var g=24*60*60*500;m-=g;p+=g}var j=p-m;var l,n;l=(this.min!=null)?Date.create(this.min).getTime():m-j/2*(this.padMin-1);n=(this.max!=null)?Date.create(this.max).getTime():p+j/2*(this.padMax-1);this.min=l;this.max=n;j=this.max-this.min;if(this.numberTicks==null){if(this.daTickInterval!=null){var e=Date.create(this.max).diff(this.min,this.daTickInterval[1],true);this.numberTicks=Math.ceil(e/this.daTickInterval[0])+1;this.max=Date.create(this.min).add((this.numberTicks-1)*this.daTickInterval[0],this.daTickInterval[1]).getTime()}else{if(o>200){this.numberTicks=parseInt(3+(o-200)/100,10)}else{this.numberTicks=2}}}if(this.daTickInterval==null){this.daTickInterval=[j/(this.numberTicks-1)/1000,"seconds"]}for(var q=0;q<this.numberTicks;q++){var m=Date.create(this.min);b=m.add(q*this.daTickInterval[0],this.daTickInterval[1]).getTime();var h=new this.tickRenderer(this.tickOptions);if(!this.showTicks){h.showLabel=false;h.showMark=false}else{if(!this.showTickMarks){h.showMark=false}}h.setTick(b,this.name);this._ticks.push(h)}}if(this._daTickInterval==null){this._daTickInterval=this.daTickInterval}}})(jQuery);