fetch('htmlSections/NavBar.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    });

function loadPage(filename) {
    const content = document.getElementById('main-content');
    content.style.opacity = 0;

    setTimeout(() => {
        fetch(filename)
            .then(res => res.text())
            .then(data => {
                content.innerHTML = data;
                content.style.opacity = 1;
                window.scrollTo(0, 0); // Scroll to top on change
            })
            .catch(err => {
                content.innerHTML = '<p>Failed to load content.</p>';
                content.style.opacity = 1;
            });
    }, 200);
}

function sortTable(n) {
    let table = document.getElementById("coauthorsTable");
    let th = table.getElementsByTagName("th")[n];
    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = Array.from(tbody.getElementsByTagName("tr"));
    let direction = th.getAttribute("data-sort") === "asc" ? "desc" : "asc";

    // Réinitialiser toutes les flèches
    let allTh = table.getElementsByTagName("th");
    for (let i = 0; i < allTh.length; i++) {
        let icon = allTh[i].querySelector(".sort-icon");
        icon.classList.remove("asc");
        allTh[i].removeAttribute("data-sort");
    }

    // Mettre à jour la flèche de la colonne active
    let icon = th.querySelector(".sort-icon");
    if (direction === "asc") {
        icon.classList.add("asc");
    }
    th.setAttribute("data-sort", direction);

    // Trier les lignes
    rows.sort((rowA, rowB) => {
        let cellA = rowA.getElementsByTagName("td")[n].textContent.trim();
        let cellB = rowB.getElementsByTagName("td")[n].textContent.trim();

        // Si c'est la colonne Publications (numérique)
        if (n === 2) {
            cellA = Number(cellA);
            cellB = Number(cellB);
        } else {
            cellA = cellA.toLowerCase();
            cellB = cellB.toLowerCase();
        }

        if (direction === "asc") {
            return cellA > cellB ? 1 : -1;
        } else {
            return cellA < cellB ? 1 : -1;
        }
    });

    // Réorganiser les lignes dans le tableau
    rows.forEach(row => tbody.appendChild(row));
}



// Attendez que le contenu de la navbar soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Une fois que la navbar est chargée, ajoutez l'event listener
    setTimeout(() => {
        const homeButton = document.querySelector('#home-btn'); // Assurez-vous que votre bouton a bien cet ID
        if (homeButton) {
            homeButton.addEventListener('click', () => {
                loadPage('htmlSections/About.html');
            });
        }
        const researchButton = document.querySelector('#research-btn'); // Assurez-vous que votre bouton a bien cet ID
        if (researchButton) {
            researchButton.addEventListener('click', () => {
                loadPage('htmlSections/Research.html');
            });
        }const publicationsButton = document.querySelector('#publications-btn'); // Assurez-vous que votre bouton a bien cet ID
        if (publicationsButton) {
            publicationsButton.addEventListener('click', () => {
                loadPage('htmlSections/Publications.html');
            });
        }const teachingButton = document.querySelector('#teaching-btn'); // Assurez-vous que votre bouton a bien cet ID
        if (teachingButton) {
            teachingButton.addEventListener('click', () => {
                loadPage('htmlSections/Teaching.html');
            });
        }
    }, 300); // Donnez un peu de temps pour que la navbar soit complètement chargée
});


loadPage('htmlSections/About.html');
