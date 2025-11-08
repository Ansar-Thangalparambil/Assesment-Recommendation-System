async function getRecommendations() {
    const query = document.getElementById("queryInput").value;

    if (!query.trim()) {
        alert("Please enter a query");
        return;
    }

    let responseBox = document.getElementById("results");
    responseBox.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch("http://127.0.0.1:8000/recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error("Backend error");
        }

        const data = await response.json();
        console.log("Backend Response:", data);

        if (data.results && data.results.length > 0) {
            let table = `
                <table border="1" cellpadding="8">
                    <tr>
                        <th>Assessment URL</th>
                        <th>Score</th>
                    </tr>
            `;

            data.results.forEach(item => {
                table += `
                    <tr>
                        <td><a href="${item.assessment_url}" target="_blank">${item.assessment_url}</a></td>
                        <td>${item.score}</td>
                    </tr>
                `;
            });

            table += "</table>";
            responseBox.innerHTML = table;
        } else {
            responseBox.innerHTML = "<p>No results found</p>";
        }

    } catch (error) {
        console.error(error);
        responseBox.innerHTML = "<p>Error connecting to backend</p>";
    }
}
