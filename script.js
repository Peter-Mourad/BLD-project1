const url = 'http://localhost:3000/courses';
const loadData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

function rateHtmlFormatting(rate){
    let html = `<span class="rate"><strong>${rate}</strong></span>\n`
    while (rate >= 0) {
        html += `\t\t\t\t\t\t\t<span class="material-symbols-outlined">${rate >= 1 ? 'star' : 'star_half'}</span>\n`;
        rate -= 1;
    }
    return html;
}

const getCourse = (data) => {
    let html = ``;
    html += `<li class="course-item">
                <a href="${data.link}" target="_blank" class="course">
                    <img src="${data.image}">
                    <p><strong>${data.title}</strong></p>
                    <p class="author">${data.author}</p>
                    <div class="rate-section">
                        ${rateHtmlFormatting(data.rate)}
                    </div>
                    <p class="price">E£${data.price}</p>
                </a>
            </li>\n`;
    return html;
}

window.onload = async () => {
    const data = await loadData();
    let html = ``;
    for (let i = 0; data[i]; i++) 
        html += getCourse(data[i]);

    const coursesList = document.querySelector('.courses-list');
    coursesList.insertAdjacentHTML('afterbegin', html);

    let searchButton = document.getElementById('search-button');
    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        coursesList.innerHTML = '';
        const searchText = document.getElementById("input-bar").value.trim().toLowerCase();
        html = ``;
        for (let i = 0; data[i]; i++){
            if(data[i].title.toLowerCase().includes(searchText))
                html += getCourse(data[i]);
        }
        coursesList.insertAdjacentHTML('afterbegin', html);
    });
};