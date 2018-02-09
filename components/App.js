App = React.createClass({

    getInitialState() {

        return {

            loading: false,
            searchingText: '',
            gif: {}

        };

    },

    handleSearch: function(searchingText) {  // 1.

        this.setState({

            loading: true  // 2.

        });

        // -------------- wersja z promise ----------------

        this.getGif(searchingText).then (  // 3.

            gif => this.setState({  // 4

                loading: false,  // a
                gif: gif,  // b
                searchingText: searchingText  // c

            })

        )

        // -------------- wersja bez promise ----------------

        // this.getGif(searchingText, function(gif) {  // 3.

        //     this.setState({  // 4

        //         loading: false,  // a
        //         gif: gif,  // b
        //         searchingText: searchingText  // c

        //     });

        // }.bind(this));

    },

    // -------------- wersja z promise ----------------

    getGif: function(searchingText) {  // 1.

        return new Promise (

            function (resolve, reject) {

                var GIPHY_API_URL = 'http://api.giphy.com';
                var GIPHY_PUB_KEY = 'yiyfh3SNykDaUmo4rjYFIqbQrrXvKSai';

                var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
                var xhr = new XMLHttpRequest();  // 3.
                
                xhr.onload = function() {

                    if (this.status === 200) {

                        var data = JSON.parse(this.responseText).data;  // 4.
                        var gif = {  // 5.

                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url

                        };

                        resolve(gif);  // 6.

                    } else {

                        reject(new Error(this.statusText));

                    }

                };

                xhr.onerror = function () {

                    reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));

                };

                xhr.open('GET', url);
                xhr.send();

            }

        );

    },

    // -------------- wersja bez promise ----------------
    
    // getGif: function(searchingText, callback) {
        
    //     var GIPHY_API_URL = 'http://api.giphy.com';
    //     var GIPHY_PUB_KEY = 'yiyfh3SNykDaUmo4rjYFIqbQrrXvKSai';

    //     var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('GET', url);
        
    //     xhr.onload = function () {
            
    //         if (xhr.status === 200) {
                
    //             var data = JSON.parse(xhr.responseText).data;
    //             var gif = {
                    
    //                 url: data.fixed_width_downsampled_url,
    //                 sourceUrl: data.url
            
    //             };
            
    //             callback(gif);
        
    //         }
    //     };
    
    //     xhr.send();
  
    // },

    render: function() {

        var styles = {

            margin: '0 auto',
            textAlign: 'center',
            width: '90%'

        };

        return (

            <div style={styles}>

                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>

                <Search onSearch={this.handleSearch}/>

                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />

            </div>

        );

    }

});