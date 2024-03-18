

// fetch adalah method pada API js untuk mengambil resource dan mengembalikan promise
const searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", function () {
  const inputValue = document.querySelector(".input-keyword");
  fetch(
    "http://www.omdbapi.com/?i=tt3896198&apikey=af94e808&s=" + inputValue.value
  )
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let card = "";
      movies.forEach((m) => {
        card += showCard(m);
      });
      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = card;

      // ketika show details di klik
      const btnDetail = document.querySelectorAll(".modal-detail-button");
      btnDetail.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=af94e808&i=" + imdbid)
            .then((response) => response.json())
            .then((response) => {
              const movieDetail = showMovieDetails(response);
              document.querySelector(".modal-body").innerHTML = movieDetail;
            });
        });
      });
    })
    .catch((response) => console.log(response));
});

function showCard(m) {
  return `<div class="col-md-4 my-3 w-25 p-3 h-40 d-inline-block">
                                    <div class="card">
                                        <img src="${m.Poster}" class="card-img-top"  alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">${m.Title}</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movie-detail-model" data-imdbid="${m.imdbID}">Show Details </a>
                                        </div>
                                    </div> 
                                </div>`;
}

function showMovieDetails(m) {
  return `<div class="container-fluid">
                        <div class="row">
                         <div class="col-md-3">
                          <img src="${m.Poster}" class="img-fluid" alt="">
                             </div>
                            <div class="col-md">
                              <ul class="list-group">
                               <li class="list-group-item">
                                 <h4>${m.Title} ${m.Year}</h4>
                                 </li>
                                    <li class="list-group-item"><strong>Director :</strong>${m.Director}</li>
                                    <li class="list-group-item"><strong>Writer:</strong>${m.Writer}</li>
                                    <li class="list-group-item"><strong>Actors:</strong>${m.Actors}</li>
                                    <li class="list-group-item"><strong>Plot:</strong>${m.Plot} <br></li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
}
