async function getRecommendations() {
    const query = document.getElementById("queryInput").value;

    if (!query.trim()) {
        alert("Please enter a query");
        return;
    }

    let responseBox = document.getElementById("results");
    responseBox.innerHTML = "<p>Loading...</p>";

    try {
        // ✅ UPDATE: Use your Render backend URL
        const response = await fetch("https://assesment-recommendation-system-5.onrender.com/recommend", {
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
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>Assessment URL</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.results.forEach(item => {
                table += `
                    <tr>
                        <td><a href="${item.assessment_url}" target="_blank">${item.assessment_url}</a></td>
                        <td>${item.score}</td>
                    </tr>
                `;
            });

            table += `
                    </tbody>
                </table>
            `;

            responseBox.innerHTML = table;
        } else {
            responseBox.innerHTML = "<p>No results found</p>";
        }

    } catch (error) {
        console.error(error);
        responseBox.innerHTML = "<p>Error connecting to backend</p>";
    }
}
