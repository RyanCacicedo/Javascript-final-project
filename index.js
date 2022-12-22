const searchRes = document.querySelector('.anime__results')
const animeHTML = document.querySelector(".anime__container");



const scaleFactor = 1 / 12
function moveBackground(event){
    const shapes = document.querySelectorAll('.shapes')
    const x = event.clientX * scaleFactor
    const y = event.clientY * scaleFactor
    const rot = event.clientX / 3

    for (let i = 0; i < shapes.length; ++i){
        const isOdd = i % 2 !== 0
        const boolInt = isOdd ? -1 : 1
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${rot}deg)`
    }
}

async function renderAnime(title) {
    animeHTML.innerHTML = '<i class="fa-solid fa-spinner"></i>'
    const animes = await getData(title)
    animes["data"].sort((a, b) => (b.score) - (a.score))
    const anime = animes["data"].slice(0, 8).map((anime) => {
        return `<div class="anime__info--container">
        <figure class="anime__img--wrapper">
        <img src="${anime.images.jpg.large_image_url}" alt="" class="anime__img">
        <a href="${anime.url}" class="img__link" target="_blank"></a>
        </figure>
        <div class= "anime__organizer">
        <h3 class="anime__title">${anime.title} ${animeYear(anime.year)}<br> <a href="${anime.url}" class="anime__link" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></h3>
        <div class="anime__rating">
        ${animeRating(anime.score)}${ratingremainder(anime.score)}
        </div>
        </div>
        </div>`
    }).join('')
    setTimeout(() => {
        searchRes.innerHTML = `<h2 class="anime__results">Search Results For: <br> <br> <span class="text__orange">${title.replace(/(?<= )[^\s]|^./g, a => a.toUpperCase())}</span></h2>`
        animeHTML.innerHTML = anime;
    }, 1000);
}

function animeYear (year){
    if (year === null){
        return ``
    }
    return `(${year})`
}


function animeRating (rating){
    let ratingHTML = ""
    for (let i = 0; i < rating; ++i)
    if (i < Math.floor(rating)){
        ratingHTML += '<i class="fa-solid fa-star"></i>'
    }
    if (!Number.isInteger(rating)){
        ratingHTML += '<i class="fa-regular fa-star-half-stroke"></i>'
    }
    if (rating === null){
        return ''
    }
    return ratingHTML
}
function ratingremainder (rating){
    let ratingHTML10 = ""
    for (let i = 1; i < rating; ++i)
    if (i < 10-rating) {
        ratingHTML10 += '<i class="fa-regular fa-star"></i>'
    }
    return ratingHTML10
}

async function getData(title) {
    const fetchAnime = await fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
    const animeData = await fetchAnime.json()
        return animeData
}


// https://api.jikan.moe/v4/anime

