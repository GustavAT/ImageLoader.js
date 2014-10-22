/**
 * The MIT License (MIT)
 * Copyright (c) 2014 Andreas Tscheinig
 * See LICENSE file in ImageLoaderJS repository for the full text of license.
 */
ImageLoader=(function(){var a=null;var b=(function(){var i=[],f=[];var c=function(){};function h(){var k,j,l=true;for(k=0;k<i.length;k++){j=i[k];if(!j.ready){l=false}}return l}function g(l){var j,k;if(e(l.key)){return}j=document.createElement("img");l.ready=false;i.push({key:l.key,ready:false});j.onload=function(){d(l.key,j,false)};j.onerror=function(){d(l.key,j,true)};j.src=l.url}function d(m,j,k){res=e(m);if(res){res.ready=true;res.image=k?null:j}if(h()){for(var l=0;l<f.length;l++){f[l]()}}}function e(l){var m=null,k;for(var j=0;j<i.length;j++){k=i[j];if(k.key===l){m=k;break}}return m}c.prototype.startQueue=function(j){if(j instanceof Array){for(var k=0;k<j.length;k++){g(j[k])}}else{g(j)}};c.prototype.onReady=function(j){f.push(j)};c.prototype.get=function(j){return e(j)};return c})();return{getInstance:function(){if(!a){a=new b()}return a},destroy:function(){a=null}}})();
