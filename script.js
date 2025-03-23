let movies = [], searchMovies = [], casts = {}, castImages = {}, videoJSList = [];

fetch("data.json").then(res => res.json()).then(res => {
    movies = res.movies;
    searchMovies = [...movies];
    casts = res.casts;
    castImages = res.castImages;
    const castEl = document.querySelector("#casts");
    for (let key in casts) {
        const div = document.createElement("div");
        div.id = key;
        div.classList.add("cast");
        div.addEventListener("click", searchActorEvent);
        div.innerHTML += `<img src="${castImages[key]}" />
                <div>
                <p>${casts[key][0]}</p>
                </div>`;
        castEl.appendChild(div);
    }
    renderMovies(movies);
});

function searchActorEvent(e) {
    searchActor(e.currentTarget.id);
}

function searchActor(id) {
    searchMovies = [];
    movies.forEach(movie => {
        movie.casts.forEach(cast => {
            if (cast === id) {
                searchMovies.push(movie);
            }
        });
    });
    renderMovies(searchMovies);
}

function renderMovies(movies) {
    const moviesEl = document.querySelector("#movies");
    while (moviesEl.firstChild) {
        moviesEl.removeChild(moviesEl.firstChild);
    }
    movies.forEach(movie => {
        const divEl = document.createElement("div");
        const videoEl = document.createElement("video");
        videoEl.id = movie.id;
        videoEl.preload = "none";
        videoEl.poster = movie.thumbnail;
        videoEl.classList.add("video-js", "vjs-theme-dt");
        videoEl.controls = true;
        const sourceEl = document.createElement("source");
        sourceEl.type = "application/x-mpegURL";
        sourceEl.src = movie.video_url;
        divEl.appendChild(videoEl);
        videoEl.appendChild(sourceEl);
        const p = document.createElement("p");
        p.innerText = movie.name;
        const summary = document.createElement("summary");
        summary.innerText = movie.description;
        var player = videojs(videoEl, { fluid: true, preload: "none" });
        player.qualityMenu();
        divEl.appendChild(p);
        divEl.appendChild(summary);
        moviesEl.appendChild(divEl);
        moviesEl.appendChild(createAdElement());
    });
    (adsbygoogle = window.adsbygoogle || []).push({});
}

function createAdElement() {

    const adElement = document.createElement("ins");

    // Set attributes
    adElement.className = "adsbygoogle";
    adElement.style.display = "block";
    adElement.setAttribute("data-ad-client", "ca-pub-1252205320574492");
    adElement.setAttribute("data-ad-slot", "7640995918");
    adElement.setAttribute("data-ad-format", "auto");
    adElement.setAttribute("data-full-width-responsive", "true");
    return adElement;
}


document.querySelector("form[role='search']").addEventListener("submit", function (e) {
    const formData = new FormData(e.target);
    console.log(formData.get("search"));
    e.preventDefault();
});