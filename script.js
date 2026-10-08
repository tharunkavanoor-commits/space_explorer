// NASA provides a DEMO_KEY for testing.
// For heavier usage, replace DEMO_KEY with your own NASA API key.
const API_KEY = "DEMO_KEY";

const dateInput = document.getElementById("date");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

// Set today's date as the default.
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;
dateInput.max = today;

async function getSpaceData() {
    const date = dateInput.value;

    if (!date) {
        error.textContent = "Please select a date.";
        return;
    }

    loading.style.display = "block";
    result.innerHTML = "";
    error.textContent = "";

    try {
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch NASA data.");
        }

        const data = await response.json();

        let media = "";

        if (data.media_type === "image") {
            media = `<img src="${data.url}" alt="${data.title}">`;
        } else if (data.media_type === "video") {
            media = `<iframe src="${data.url}" allowfullscreen></iframe>`;
        }

        result.innerHTML = `
            ${media}

            <div class="content">
                <h2>${data.title}</h2>
                <p class="date">📅 ${data.date}</p>
                <p>${data.explanation}</p>
            </div>
        `;

    } catch (err) {
        error.textContent = "Something went wrong. Please try again.";
        console.error(err);
    } finally {
        loading.style.display = "none";
    }
}

// Load today's NASA picture automatically.
getSpaceData();
