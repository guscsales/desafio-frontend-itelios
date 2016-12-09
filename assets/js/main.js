(function(){

    var createItemsOnList = function(){
        var itemHtml = `<li>
                            <a href="{{url}}" class="wrapper-image" style="background-image:url('{{image}}');"></a>    
                            <div class="desc">
                                <a href="{{url}}" class="name">{{name}}</a>
                                <span class="price">
                                    Por: <strong>{{price}}</strong>
                                </span>
                                <span class="split-price">
                                    ou <strong>12x de {{splitPrice}}</strong> sem juros
                                </span>
                            </div>
                            <a href="{{url}}" class="btn">adicionar ao carrinho</a>
                        </li>`;

        httpRequest('/assets/data/products.json', 'GET', function(data){
            var allItemsHtml = '';


            //  Create items of list  
            for(var i = 0; i < data[0].data.recommendation.length; i++){
                var product = data[0].data.recommendation[i];

                var arrProduct = product.price.replace('R$ ', '').split(',');
                arrProduct[0] = arrProduct[0].replace(/\./g, '');

                product.splitPrice = 'R$ ' + ((parseFloat(arrProduct[0] + '.' + arrProduct[1]) / 12).toFixed(2)).replace('.', ',');
                
                allItemsHtml += itemHtml
                                    .replace(/{{image}}/g, product.imageName)
                                    .replace(/{{url}}/g, product.detailUrl)
                                    .replace(/{{name}}/g, product.name)
                                    .replace(/{{price}}/g, product.price)
                                    .replace(/{{splitPrice}}/g, product.splitPrice);
            }

            document.getElementById('related-products-list').innerHTML = allItemsHtml;


            //  Initialize the Carousel
            var hbxCarousel = new HbxCarousel({
                class: 'products-list-horizontal',
                aditionalWidthWrapper: 1
            });
        });
    }

    var httpRequest = function(url, type, callback){
        var xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.send(null);

        xhr.onreadystatechange = function () {
            var DONE = 4,
                OK = 200;

            if (xhr.readyState === DONE) {
                if (xhr.status === OK){
                    var data = JSON.parse(xhr.responseText);

                    callback(data);
                }
            }
        };
    }

    this.Main = function(){
        createItemsOnList();       
    }

})();