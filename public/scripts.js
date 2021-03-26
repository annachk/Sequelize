async function windowActions() {
    const request = await fetch('/api/dining');
    const main = await request.json();
    console.log(main);

    const html = `
            <thead>
                <tr class="th is-selected">
                    <th>Hall Name</th>
                    <th>Location</th>
                </tr>
            </thead>
                    
            <tbody>
                <tr>
                    <td>${main.data[0].hall_name}</td>
                    <td>${main.data[0].hall_address}</td>
                </tr>
                <tr>
                    <td>${main.data[1].hall_name}</td>
                    <td>${main.data[1].hall_address}</td>
                </tr>
                <tr>
                    <td>${main.data[2].hall_name}</td>
                    <td>${main.data[2].hall_address}</td>
                </tr>
            </tbody>
            `
    const table = document.querySelector('.table');
    table.innerHTML = html;
}

window.onload = windowActions;