/**
 * The MIT License (MIT)
 * Copyright (c) 2014 Andreas Tscheinig
 * See LICENSE file in ImageLoaderJS repository for the full text of license.
 */
ImageLoader=(function(){var g=[],d=[];var a=function(){};function f(){var j,h,k=true;for(j=0;j<g.length;j++){h=g[j];if(!h.ready){k=false}}return k}function e(j){var h,i;if(c(j.key)){return}h=document.createElement("img");j.ready=false;g.push({key:j.key,ready:false});h.onload=function(){b(j.key,h,false)};h.onerror=function(){b(j.key,h,true)};h.src=j.url}function b(l,h,j){res=c(l);if(res){res.ready=true;res.image=j?null:h}if(f()){for(var k=0;k<d.length;k++){d[k]()}}}function c(k){var l=null,j;for(var h=0;h<g.length;h++){j=g[h];if(j.key===k){l=j;break}}return l}a.prototype.startQueue=function(h){if(h instanceof Array){for(var j=0;j<h.length;j++){e(h[j])}}else{e(h)}};a.prototype.onReady=function(h){d.push(h)};a.prototype.get=function(h){return c(h)};return a})();
