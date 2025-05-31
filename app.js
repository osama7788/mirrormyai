
document.getElementById('mirrorForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const social = document.getElementById('social').value;
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = "<p>Thinking hard... Generating your digital mirror...</p>";

    try {
        const response = await fetch('/api/mirror', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, social })
        });

        const data = await response.json();
        if (data && data.result) {
            resultDiv.innerHTML = `<pre>${data.result}</pre>`;
        } else {
            resultDiv.innerHTML = "<p>Something went wrong. Try again later.</p>";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p>Error connecting to AI engine.</p>";
    }
});
