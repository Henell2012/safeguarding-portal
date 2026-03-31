async function submitReport() {
    const name = document.getElementById("name").value;
    const concern = document.getElementById("concern").value;
    const severity = document.getElementById("severity").value;

    const res = await fetch("/report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, concern, severity })
    });

    const data = await res.json();
    document.getElementById("status").innerText = data.message;
}

async function loadReports() {
    const res = await fetch("/reports");
    const reports = await res.json();

    const list = document.getElementById("reports");
    list.innerHTML = "";

    reports.forEach(r => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${r.name}</strong> (${r.severity})<br>
            ${r.concern}<br>
            <small>${new Date(r.date).toLocaleString()}</small>
        `;
        list.appendChild(li);
    });
}
