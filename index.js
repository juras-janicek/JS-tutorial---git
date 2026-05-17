 // Tvoje projekty jako pole objektů
const projects = [
    {
        title: "Sidebar",
        description: "Po kliknutí na tlačítko se vysune sidebar",
        GitHub_URL: "https://github.com/juras-janicek/sidebar",
        language: "JavaSkript",
        
    },
    {
        title: "My Portfolio",
        description: "Vizualizace stránky o mně",
        GitHub_URL: "https://github.com/juras-janicek/my-portfolio",
        language: "JavaSkript",
    },
    {
        title: "id-card",
        description: "karta se základními informacemi",
        GitHub_URL: "https://github.com/juras-janicek/id-card",
        language: "Phyton",
    }
];

// Najdeme kontejner v HTML
const container = document.getElementById("projects-container");

// Projdeme každý projekt a vytvoříme kartu
projects.forEach(project => {
    container.innerHTML += `
        <div class="card">
             <h2>${project.title}</h2>
             <div class="language_${project.language}">${project.language}</div>
             <a class="GitHub" href="${project.GitHub_URL}" target="_blank">github</a>
             <p>${project.description}</p>
         </div>
    `;
});