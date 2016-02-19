 /*
 * Authors: Ivar Borthen
 * https://github.com/wearecolours/animatewheninview
 * License: MIT license
 */

var AnimateWhenInView = (function () {

  function animatewheninview() {

    this.allElements = [];

    this.init = function(){
      this.getElements();
      this.updateClasses();
    }

    this.getElements = function(){
      var _all = document.querySelectorAll('[data-animatewheninview]');
      this.allElements = [];
      for(i=0; i<_all.length; i++){
        this.allElements[i] = [_all[i], false];
      }
    }

    this.update = function(){
      this.init();
    }

    this.activateElement = function(){
      this.setAttribute('data-inview', true);
      console.log(this.getAttribute('data-animatecallback'));
      if(this.getAttribute('data-animatecallback')){
        try {
          eval(this.getAttribute('data-animatecallback'))(this);
        } catch(e){
          console.log('failed on calling function data-animatecallback on element '+this);
        }
      }
    }

    this.updateClasses = function(){

      var windowScrollPos = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0),
      viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      for(i=0; i<this.allElements.length; i++){
        if(!this.allElements[i][1]){
          var _this = this.allElements[i][0];
          console.log(_this.getAttribute('data-animateoffset'));
          console.log(_this.offsetTop + ' vs ' + (_this.offsetTop + Number(_this.getAttribute('data-animateoffset'))));
          if(_this.offsetTop + (_this.getAttribute('data-animateoffset') ? Number(_this.getAttribute('data-animateoffset')) : 0) < windowScrollPos + viewportHeight){
            this.allElements[i][1] = true;
            var _timout = setTimeout(this.activateElement.bind(_this), _this.getAttribute('data-animatedelay') ? _this.getAttribute('data-animatedelay') : 0);
          }
        }
      }
      
    }

    document.addEventListener("DOMContentLoaded", this.init.bind(this));
    window.addEventListener("resize", this.updateClasses.bind(this));
    window.addEventListener("scroll", this.updateClasses.bind(this));

    return this.prototype;

  }
  
  return new animatewheninview();

}());

