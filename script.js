const url = 'http://localhost:3000/Courses';
const loadData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

function rateHtmlFormatting(rate){
    let html = `<span class="rate"><strong>${rate}</strong></span>\n`
    for (let i = 0; i < 5; i++, rate--){
        if (rate >= 1) 
            html += `\t\t\t\t\t\t\t<i class="fa fa-star"></i>\n`;
        else if (rate > 0) 
            html += `\t\t\t\t\t\t\t<i class="fa fa-star-half-full"></i>\n`;
        else
            html += `\t\t\t\t\t\t\t<i class="fa fa-star-o"></i>\n`;
    }
    return html;
}

const getCourse = (data) => {
    let html = `<div class="card-container">
        <div class="course-item">
            <a href="${data.link}" target="_blank">
                <img src="${data.image}">
                <p><strong>${data.title}</strong></p>
                <p class="author">${data.author}</p>
                <div class="rate-section">
                    ${rateHtmlFormatting(data.rate)}
                </div>
                <p class="price">E£${data.price}</p>
            </a>
        </div>
    </div>\n`;
    return html;
}

const getCourses = (data, className) => {
    let html = `<div class="${className} courses-list">\n`;
    data.forEach((course) => {
        html += getCourse(course);
    });
    html += `</div>\n`;
    return html;
}

window.onload = async () => {
    const data = await loadData();
    let html = ``;
    for (let ele in data) {
        html += getCourses(data[ele], ele);
    }
    
    const coursesList = document.querySelector('.carousel-inner');
    coursesList.insertAdjacentHTML('afterbegin', html);

    let coursesDivs = document.querySelectorAll('.carousel-inner > div');
    const divsArray = Array.from(coursesDivs);
    divsArray.forEach((div) => {
        div.style.display = "none";
    });

    // add tabs section
    let tabs = document.querySelectorAll(".nav-item");
    let tabsArray = Array.from(tabs);
    tabsArray.forEach((tab) => {
        if (tab.classList.contains("active")) {
            document.querySelector(tab.dataset.cont).style.display = "flex";
        }
    });

    tabsArray.forEach((tab) => {
        tab.addEventListener("click", (e) => {
            tabsArray.forEach((tab) => {
                tab.classList.remove("active");
                document.querySelector(tab.dataset.cont).style.display = "none";
            });
            e.currentTarget.classList.add("active");
            document.querySelector(e.currentTarget.dataset.cont).style.display = "flex";
        });
    });

    // search section
    let searchButton = document.getElementById('search-button');
    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        coursesList.innerHTML = '';
        const searchText = document.getElementById("input-bar").value.trim().toLowerCase();
        html = `<div class="courses-list">\n`;
        for (let courses in data) {
            data[courses].forEach((course) => {
                if(course.title.toLowerCase().includes(searchText))
                    html += getCourse(course);
            });
        }
        html += `</div>\n`;
        coursesList.insertAdjacentHTML('afterbegin', html);
    });

    // slider section
    const prevArrow = document.querySelector(".prev");
    const nextArrow = document.querySelector(".next");
    const coursesSection = document.querySelector('.courses-list');
    const carouselWidth = document.querySelector('.carousel-container').offsetWidth;
    
    let indexPage = 0;
    prevArrow.addEventListener('click', () => {
        indexPage--;
        coursesSection.style.transform = `translateX(-${indexPage * carouselWidth}px)`;
    });

    nextArrow.addEventListener('click', () => {
        indexPage++;
        coursesSection.style.transform = `translateX(-${indexPage * carouselWidth}px)`;
    });
    
};