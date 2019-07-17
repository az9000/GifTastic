$(document).ready(function () {
    var topics = [
        {
            searchQuery: 'animals',
            buttonLabel: 'Add new animal',
            limit: '10',
            pagination: {
                count: 0,
                offset: 0,
                total_count: 0
            },
            rating: [],
            list: [
                'kitten',
                'puppy',
                'bird',
                'turtle',
                'guinea pig',
                'snake',
                'skunk',
                'rabbit',
                'sloth',
                'monkey'
            ],
            title: [],
            still_image: [],
            motion_image: []
        },
        {
            searchQuery: 'simpsons',
            buttonLabel: 'Add new character',
            limit: '10',
            pagination: {
                count: 0,
                offset: 0,
                total_count: 0
            },
            rating: [],
            list: [
                'homer simpson',
                'bart simpson',
                'marge simpson',
                'lisa simpson',
                'Mr Burns',
                'Milhouse Van Houten',
                'Ned Flanders',
                'Barney Gumble',
                'Chief Wiggum',
                'Mayor Quimby'
            ],
            title: [],
            still_image: [],
            motion_image: []
        },
        {
            searchQuery: 'sports',
            buttonLabel: 'Add new sports',
            limit: '10',
            pagination: {
                count: 0,
                offset: 0,
                total_count: 0
            },
            rating: [],
            list: [
                'football',
                'baseball',
                'basketball',
                'soccer',
                'tennis',
                'golf',
                'rugby',
                'hocky',
                'volleyball',
                'cycling'
            ],
            title: [],
            still_image: [],
            motion_image: []
        },
        {
            searchQuery: 'random',
            buttonLabel: 'Add anything',
            limit: '10',
            pagination: {
                count: 0,
                offset: 0,
                total_count: 0
            },
            rating: [],
            rating: [],
            title: [],
            list: [],
            still_image: [],
            motion_image: []
        },
        {
            searchQuery: 'favorites',
            buttonLabel: 'favorites',
            limit: '',
            pagination: {
                count: 0,
                offset: 0,
                total_count: 0
            },
            rating: [],
            list: [],
            title: [],
            still_image: [],
            motion_image: []
        }
    ];

    var favorites = [];

    const TOPIC_ANIMALS = 0;
    const TOPIC_SIMPSONS = 1;
    const TOPIC_SPORTS = 2;
    const TOPIC_RANDOM = 3;
    const TOPIC_FAVORITES = 4;

    /**
     * Load localStorage data
     */
    function checkLocalStorage() {
        var myStorage = window.localStorage;
        if(myStorage.getItem('animals-topic')) {
            topics[TOPIC_ANIMALS] = JSON.parse(myStorage.getItem('animals-topic'));
        }

        if(myStorage.getItem('simpsons-topic')) {
            topics[TOPIC_SIMPSONS] = JSON.parse(myStorage.getItem('simpsons-topic'));
        }

        if(myStorage.getItem('sports-topic')) {
            topics[TOPIC_SPORTS] = JSON.parse(myStorage.getItem('sports-topic'));
        }

        if(myStorage.getItem('random-topic')) {
            topics[TOPIC_RANDOM] = JSON.parse(myStorage.getItem('random-topic'));
        }

        if(myStorage.getItem('favorites')) {
            topics[TOPIC_FAVORITES] = JSON.parse(myStorage.getItem('favorites'));
        }

    }

    const api_key = 'sz9sZ9GkpOBOy9MuI4iOb00oL1AdFAAk';
    var current_topic = TOPIC_ANIMALS;

    /**
     * Load 10 GIFS for each topic
     * @param {*} topic 
     */
    function loadData(topic) {

        
        $('#add-button').text(topic.buttonLabel);
        $('#pills-animals-tab, #pills-simpsons-tab, #pills-sports-tab, #pills-anything-tab, #pills-favorites-tab').removeClass('active');        

        // display buttons
        $('#button-row').empty();

        $('.card-deck').empty();

        $('#topic').text(topic.searchQuery);

        var col_count = 0;
        for (var i = 0; i < topic.list.length; i++) {
            var btn = $('<button>');
            btn.attr('type', 'button');
            btn.addClass('btn btn-primary btn-block');
            btn.addClass('entries');
            btn.attr('data-name', topic.list[i]);
            btn.html(topic.list[i]);
            var column = $('<div>');
            column.addClass('col-sm-3');
            column.append(btn);
            $('#button-row').append(column);
            col_count++;
            if (col_count === 4) {
                $('#button-row').append('<div class="w-100"></div>');
                $('#button-row').append('<hr>');
                col_count = 0;
            }
        }

        switch (topic.searchQuery) {            
            case 'animals': {
                current_topic = TOPIC_ANIMALS;
                $('.form-inline').css('display' , 'flex');
                $('#pills-animals-tab').addClass('active');
                break;
            }
            case 'simpsons': {
                current_topic = TOPIC_SIMPSONS;
                $('.form-inline').css('display' , 'flex');
                $('#pills-simpsons-tab').addClass('active');
                break;
            }
            case 'sports': {
                current_topic = TOPIC_SPORTS;
                $('.form-inline').css('display' , 'flex');
                $('#pills-sports-tab').addClass('active');
                break;
            }
            case 'random': {
                current_topic = TOPIC_RANDOM;
                $('.form-inline').css('display' , 'flex');
                $('#pills-anything-tab').addClass('active');
                break;
            }
        }
    }

    /**
     * Select a menu item
     */
    $('li').click(function (event) {

        event.preventDefault();

        current_topic = parseInt($(this).attr('data-index'));
        $('#inputEntry').val('');
        if (current_topic !== TOPIC_FAVORITES) {
            loadData(topics[current_topic]);
        } else {
            $('#add-button').text(topic.buttonLabel);
            $('#pills-animals-tab, #pills-simpsons-tab, #pills-sports-tab, #pills-anything-tab, #pills-favorites-tab').removeClass('active');        

            // display buttons
            $('#button-row').empty();

            $('.card-deck').empty();

            $('#topic').text(favorites);

            // load favorites
            if (localStorage.getItem('favorites')) {
                favorites = JSON.parse(localStorage.getItem('favorites'));
                current_topic = TOPIC_FAVORITES;
                $('.form-inline').css('display' , 'none');
                $('#pills-favorites-tab').addClass('active');
                for (var i=0; i<favorites.length; i++) {
                    showImage(i, favorites[i].still_image, favorites[i].rating, favorites[i].title);
                }
            }
        }
    });
    

    /**
     * Add a new button
     */
    $('#add-button').click(function(event) {

        event.preventDefault();

        var searchText = $('#inputEntry').val();
        if (searchText.length !== 0) {

            var found = false;
            for (var i=0; i<topics[current_topic].list.length; i++) {
                if (topics[current_topic].list[i].toLowerCase() === searchText.toLowerCase()) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                topics[current_topic].list.push(searchText);
                loadData(topics[current_topic]);

                // Save to local storage
                var myStorage = window.localStorage;
                var label = topics[current_topic].searchQuery + '-topic';
                myStorage.setItem(label, JSON.stringify(topics[current_topic]));
            }
        }
    });


    /**
     * Load GIFs
     */
    function getEntryGifs() {

        var data_name = $(this).attr('data-name');
        $('.card-deck').empty();
        var queryUrl = 'https://api.giphy.com/v1/gifs/search';
        
        $.ajax({
            url: queryUrl,
            method: 'get',
            data: {
                q: data_name,
                limit: topics[current_topic].limit,
                rating: 'G',
                api_key: api_key,
                lang: 'en',
                offset: topics[current_topic].pagination.offset
            }
        }).done(function (response) {
            
            var card_count = 0;
            topics[current_topic].pagination = response.pagination;            
            for (var i = 0; i < response.data.length; i++) {

                topics[current_topic].still_image[i] = response.data[i].images.original_still.url;
                topics[current_topic].motion_image[i] = response.data[i].images.original.url;
                topics[current_topic].rating[i] = response.data[i].rating.toUpperCase();
                topics[current_topic].title[i] = response.data[i].title;

                showImage(i, topics[current_topic].still_image[i], topics[current_topic].rating[i], topics[current_topic].title[i]);
                card_count++;
                if (card_count == 5) {
                    $('.card-deck').append('<div class="w-100"></div>');
                    $('.card-deck').append('<hr>');
                    card_count = 0;
                }
            }
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    }

    function showImage(index, still_image, rating, title) {
        var src = still_image;
        var img = $('<img>');
        img.attr('src', src);
        img.addClass('card-img-top');
        img.css('cursor', 'pointer');
        img.attr('data-index', index);
        img.attr('data-state', 'still');

        var card = $('<div>');
        card.addClass('card');
        card.append(img);

        var cardBody = $('<div>');
        cardBody.addClass('card-body');

        var h5 = $('<h5>');
        h5.addClass('card-title');
        h5.text('Rating: ' + rating.toUpperCase());
        
        cardBody.append(h5);
        var h7 = $('<h7>');
        h7.addClass('card-text');
        h7.text(title);                
        cardBody.append(h7);

        var cardFooter = $('<div>');
        cardFooter.addClass('card-footer');                
        var btn = $('<button>');
        btn.attr('type', 'button');        
        if (current_topic === TOPIC_FAVORITES) {
            btn.addClass('btn btn-block unfav');
        } else {
            btn.addClass('btn btn-block fav');
        }        
        btn.attr('data-index', index);
        /**
         * For Favorites, show thumbs down icon
         */
        if (current_topic === TOPIC_FAVORITES) {
            btn.html('<i class="fa fa-thumbs-down" style="font-size:1em"></i>');
        } else {
            btn.html('<i class="fa fa-thumbs-up" style="font-size:1em"></i>');
        }
        
        cardFooter.append(btn);

        card.append(cardBody);
        card.append(cardFooter);
        $('.card-deck').append(card);        
    }

    /**
     * Click on each entry
     */
    $(document).on("click", ".entries", getEntryGifs);

    /**
     * go from still image to animated image
     */
    function toggleMotion() {
        var index = parseInt($(this).attr('data-index'));
        var imageState = $(this).attr('data-state');
        var src;
        if (current_topic < TOPIC_FAVORITES) {
            if (imageState === 'still') {
                src = topics[current_topic].motion_image[index];
                imageState = 'motion';
            } else {
                src = topics[current_topic].still_image[index];                
                imageState = 'still';
            }
        } else {
            // favorites
            if (imageState === 'still') {
                src = favorites[index].motion_image;
                imageState = 'motion';
            } else {
                src = favorites[index].still_image;
                imageState = 'still';
            }
        }
        $(this).attr('data-state',imageState);
        $(this).attr('src', src);
    }

    /**
     * toggle image (still <-> animation)
     */
    $(document).on("click", "img", toggleMotion);

    /**
     * Favorites - add
     */
    function addToFavs() {
        var index = parseInt($(this).attr('data-index'));
        var isFav = $(this).css('color');
        if (isFav === 'rgb(33, 37, 41)') {
            $(this).css('color', 'green');
            favorites.splice(index, 0, {
                still_image: topics[current_topic].still_image[index],
                motion_image: topics[current_topic].motion_image[index],
                rating: topics[current_topic].rating[index],
                title: topics[current_topic].title[index]
            });
        } else {
            $(this).css('color', 'rgb(33, 37, 41)');
            favorites[index] = {};
        }     
        
        localStorage.setItem('favorites' , JSON.stringify(favorites));
    }

    

    /**
     * Favorites - remove
     */
    function removeFromFavs(event) {
        var index = parseInt($(this).attr('data-index'));
        var removed = favorites.splice(index, 1);            
        localStorage.setItem('favorites' , JSON.stringify(favorites));
        $('.card-deck').empty();
        for (var i=0; i<favorites.length; i++) {
            showImage(i, favorites[i].still_image, favorites[i].rating, favorites[i].title);
        }
    }

    $(document).on("click", ".fav", addToFavs);

    $(document).on("click", ".unfav", removeFromFavs);

    checkLocalStorage();
    loadData(topics[TOPIC_ANIMALS]);

});
