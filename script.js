document.getElementById("webhookForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const webhook = document.getElementById("webhook").value;
    const message = document.getElementById("message").value;
    const username = document.getElementById("username").value;
    const avatar = document.getElementById("avatar").value;
    const numThreads = parseInt(document.getElementById("thread").value);

    if (numThreads <= 0) {
        alert("Number of threads must be greater than 0");
        return;
    }

    for (let i = 0; i < numThreads; i++) {
        setTimeout(() => {
            const payload = {
                content: message,
                username: username,
                avatar_url: avatar
            };

            fetch(webhook, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(`Message ${i+1} sent successfully!`);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                alert(`Failed to send message ${i+1}.`);
            });
        }, i * 1000); // Adjust this delay as needed (currently 1 second)
    }
});
