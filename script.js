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

window.onload = async () => {
    const data = await loadData();
    let html = ``;
    for (let i = 0; data[i]; i++){
        html += `<li class="course-item">
                    <a href="${data[i].link}" target="_blank" class="course">
                        <img src="${data[i].image}">
                        <p><strong>${data[i].title}</strong></p>
                        <p class="author">${data[i].author}</p>
                        <div class="rate-section">
                            ${rateHtmlFormatting(data[i].rate)}
                        </div>
                        <p class="price">E£${data[i].price}</p>
                    </a>
                </li>\n`;
    }
    console.log(html);
    const subject = document.querySelector('.courses-list');
    subject.insertAdjacentHTML('afterbegin', html);
};