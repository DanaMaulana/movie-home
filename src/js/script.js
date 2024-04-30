function searchMovie() {
  // html cleared
  $('#movie-list').html('');
  
  $.ajax({
    url: 'http://www.omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': '99690cdd',
      's': $('#search-input').val()
    },
    success: function(result) {
      if(result.Response == "True") {
        let movies = result.Search;
        // looping
        $.each(movies, function(i, data) {
          $('#movie-list').append(`
            <div class="col-md-3">
              <div class="card h-100">
                <img src="`+ data.Poster +`" class="card-img-top" alt="`+ data.Title +`">
                <div class="card-body">
                  <h5 class="card-title">`+ data.Title +`</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">`+ data.Year +`</h6>
                  <a href="" class="card-link lihat-detail" data-bs-toggle="modal" data-bs-target="#movieDetail" data-id="`+ data.imdbID +`">Lihat detail</a>
                </div>
              </div>
            </div>  
          `);
        });
        // clear form input after search data
        $('#search-input').val('');
      } else {
        $('#movie-list').html(`<h1 class="text-center text-white">`+ result.Error +`</h1>`);
      }
    }
  });
}

$('#search-button').on('click', function() {
  searchMovie();
});

$('#search-input').on('keyup', function(e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
})

$('#movie-list').on('click', '.lihat-detail', function() {
  $.ajax({
    url: 'http://www.omdbapi.com',
    dataType: 'json',
    type: 'get',
    data: {
      'apikey': '99690cdd',
      'i': $(this).data('id')
    },
    success: function(movie) {
      if (movie.Response === "True") {
        $('.modal-body').html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="`+ movie.Poster +`" class="img-fluid">
              </div>
              
              <div class="col-md-8">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                  <li class="list-group-item">Rating: `+ movie.Ratings[0].Value +`</li>
                  <li class="list-group-item">Tahun: `+ movie.Year +`</li>
                  <li class="list-group-item">Release: `+ movie.Released +`</li>
                  <li class="list-group-item">Genre: `+ movie.Genre +`</li>
                  <li class="list-group-item">Isi cerita: `+ movie.Plot +`</li>
                  <li class="list-group-item">Bahasa: `+ movie.Language +`</li>
                </ul>
              </div>
            </div>
          </div>
        `);
      }
    }
  })

})