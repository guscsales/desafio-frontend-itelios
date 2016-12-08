/*!
 * hbx Carousel
 * Author: Gustavo Sales (http://github.com/hebsix)
 * Created in: 12/2016
 */

(function(window){

    /***
     * MAIN VARIABLES
     ***/
    var wrapper,
        wrapperWidth,
        element,
        items,
        itemsCount,
        itemsViewCount,
        bulletsCount,
        divOverflow,
        currentIndex,
        _opts;


    var defineActiveBullet = function(index){
        var counter = wrapper.getElementsByClassName('counter')[0],
            items = counter.getElementsByTagName('span');

        for(var i = 0; i < items.length; i++){
            if(i == index) 
                items[i].className = 'active';
            else
                items[i].className = '';
        }
    }

    var movimentation = function(index){
        var itemWidth = items[0].offsetWidth,
            translateValue = (_opts.itemsToMove * index);

        if(itemsCount - translateValue < _opts.itemsToMove)
            translateValue -= (_opts.itemsToMove - (itemsCount - translateValue));

        translateValue *= itemWidth;
        translateValue -= index;

        if(translateValue > 0)
            translateValue = -translateValue;
        else
            translateValue = 0;
        
        element.style.transform = 'translateX(' + translateValue + 'px)';
    }

    /***
     * General functions of carousel 
     ***/

    //  Movimentation
    var goTo = function(index){
        currentIndex = index;

        movimentation(index);
        defineActiveBullet(index);
    }

    /***
     * General Events 
     ***/


    //  Event for click on bullet
    var defineBulletItemClick = function(){

        var counter = wrapper.getElementsByClassName('counter')[0],
            items = counter.getElementsByTagName('span');

        for(var i = 0; i < items.length; i++){
            items[i].addEventListener('click', listener.bind(null, i));
        }

        function listener(index){
            goTo(index);
        }

    }


    var defineEvents = function(){
        defineBulletItemClick();
    }
    

    /***
     * Reset width of each element
     ***/
    var resetSizes = function(){
        divOverflow.style.width = '';

        for(var i = 0; i < items.length; i++)
            items[i].style.width = '';
        
        element.style.width = '';
    }


    /***
     * Define width for each element, like wrapper container, the full wrapper list
     * and each items of carousel 
     ***/
    var defineSizes = function(){
        wrapperWidth = element.offsetWidth;

        divOverflow.style.width = wrapperWidth + 'px';

        for(var i = 0; i < items.length; i++)
            items[i].style.width = items[i].offsetWidth + 'px';
        
        element.style.width = (items[0].offsetWidth * itemsCount) + 'px';
    }


    /***
     * Create the bullets to move the carousel
     ***/
    var createCounters = function(){
        var width = 0,
            count = 0;

        for(var i = 0; i < items.length; i++){
            width += items[i].offsetWidth;

            if(width >= wrapperWidth){            
                count++;

                width = 0;
            }
                
        }

        if(width > 0)
            count++;

        bulletsCount = count;

        if(bulletsCount > 0){
            var divCounter = document.createElement('div');

            divCounter.className = 'counter';
            
            for(var i = 0; i < bulletsCount; i++)
                divCounter.innerHTML += '<span></span>';

            element.parentNode.insertBefore(divCounter, element.nextSibling);

        }

    }

    /***
     * Get the number of items which can be visible on screen
     ***/
    var getCountViewItems = function(){
        var width = 0,
            count = 0;

        for(var i = 0; i < items.length; i++){
            width += items[i].offsetWidth;

            if(width <= wrapperWidth){            
                count++;
            } else {
                if(width != wrapperWidth)
                    count++;

                break;
            }
                
                
        }

        itemsViewCount = count;
    }


    /***
     * Build the elements to use all functions
     * Define sizes and the overflow wrapper element 
     ***/
    var construct = function(_element){
        divOverflow = document.createElement('div');
        
        divOverflow.style.overflowX = 'hidden';


        if(divOverflow.className != '')
            divOverflow.className += ' ';

        divOverflow.className += 'hbx-wrapper';

        if(_element.className != '')
            _element.className += ' ';

        _element.className += 'hbx-carousel';

        _element.parentNode.insertBefore(divOverflow, _element.nextSibling);

        divOverflow.appendChild(_element);

        wrapper = divOverflow;
        element = _element;
        items = element.getElementsByTagName('li');
        itemsCount = items.length;
        
        for(var i = 0; i < items.length; i++){
            if(items[i].className != '')
                items[i].className += ' ';

            items[i].className += 'hbx-item';
        }

        defineSizes();
        createCounters();
        getCountViewItems();
        goTo(_opts.startIn);
    }


    /***
     * Assign to each element before start the construct 
     ***/
    var initialize = function(opts){
        _opts = opts;

        if(_opts.startIn == undefined)
            _opts.startIn = 0;

        if(_opts.itemsToMove == undefined)
            _opts.itemsToMove = 4;

        currentIndex = 0;

        if(opts.id != undefined){
            construct(document.getElementById(opts.id));
        }
        else if (opts.class != undefined){
            var elements = document.getElementsByClassName(opts.class);

            for(var i = 0; i < elements.length; i++)
                construct(elements[i]);            
        }

        defineEvents();
    };

    window.onresize = function(){
        resetSizes();
        defineSizes();
    }


    /***
     * Constructor for initialize on any part of code 
     ***/
    this.HbxCarousel = function(opts){
        initialize(opts);
    };

    
    /***
     * Public Events 
     ***/
    HbxCarousel.prototype.goTo = function(index){
        goTo(index);
    }

})(window);
