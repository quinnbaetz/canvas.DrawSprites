define(function() {
    //Spriting object template that currently always uses vertical sprites
    return function(imgFuncs, numParts, options){
        if(typeof(numParts) !== "integer"){
            options = numParts;
            numParts = imgFuncs.length;
        }
        if(typeof(options) === "undefined"){
            options = {};
        }
        
        //private variables
        var pos = 0;
        options.__proto = {scale: 1, x: 0, y: 0, alpha: 1};
        //public variables
        this.numParts = numParts;
        
        //setters
        this.setNumParts = function(numParts){
            this.numParts = numParts;
        };
        
        //getters
        this.getNumParts = function(){
            return this.numParts;
        };
        this.setPos = function(posTemp){
            if(posTemp<0 || posTemp>numParts){
                return;
            }
            pos = posTemp;
        };
        this.getPos = function(){
            return pos;
        };
        
        this.draw = function(opts){
            if(typeof(opts) === "undefined"){
                opts = {};
            }
            opts.__proto__ = options;
            var ctx = opts.ctx;
            ctx.save();
            ctx.globalAlpha = opts.alpha;
            ctx.translate(opts.x,opts.y);
            ctx.scale(opts.scale,opts.scale);
            imgFuncs[pos](ctx);
            ctx.globalAlpha = 1;
            ctx.restore();
            
        };
        this.advance = function(){
            pos = (pos+1)%numParts;
        }
        
    }
});