// HariyaliMitra - Crop Calendar Data

const cropCalendarData = [
    {
        crop: "🌾 Wheat",
        season: "rabi",
        seasonLabel: "Rabi (Winter)",
        sowing: "Oct - Nov",
        harvest: "Mar - Apr",
        link: "wheat.html"
    },
    {
        crop: "🌾 Rice (Paddy)",
        season: "kharif",
        seasonLabel: "Kharif (Monsoon)",
        sowing: "Jun - Jul",
        harvest: "Oct - Nov",
        link: "rice.html"
    },
    {
        crop: "🌾 Mustard",
        season: "rabi",
        seasonLabel: "Rabi (Winter)",
        sowing: "Oct - Nov",
        harvest: "Feb - Mar",
        link: "mustard.html"
    },
    {
        crop: "🌾 Sugarcane",
        season: "zaid",
        seasonLabel: "Zaid (Year-round)",
        sowing: "Feb - Mar",
        harvest: "Dec - Mar (next year)",
        link: "sugarcane.html"
    },
    {
        crop: "🌽 Maize",
        season: "kharif",
        seasonLabel: "Kharif (Monsoon)",
        sowing: "Jun - Jul",
        harvest: "Sep - Oct",
        link: "#"
    },
    {
        crop: "🥔 Potato",
        season: "rabi",
        seasonLabel: "Rabi (Winter)",
        sowing: "Oct - Nov",
        harvest: "Jan - Feb",
        link: "#"
    },
    {
        crop: "🌸 Rose",
        season: "zaid",
        seasonLabel: "Zaid (Summer)",
        sowing: "Feb - Mar",
        harvest: "Oct - Mar (flowering)",
        link: "rose.html"
    },
    {
        crop: "🌸 Marigold",
        season: "kharif",
        seasonLabel: "Kharif (Monsoon)",
        sowing: "Jun - Jul",
        harvest: "Sep - Dec (flowering)",
        link: "marigold.html"
    },
    {
        crop: "🌸 Jasmine",
        season: "zaid",
        seasonLabel: "Zaid (Summer)",
        sowing: "Feb - Mar",
        harvest: "Apr - Oct (flowering)",
        link: "jasmine.html"
    },
    {
        crop: "🌸 Lily",
        season: "rabi",
        seasonLabel: "Rabi (Winter)",
        sowing: "Oct - Nov",
        harvest: "Feb - Apr (flowering)",
        link: "lily.html"
    }
];

function renderCalendar(season) {
    let tbody = document.getElementById("calendarBody");
    tbody.innerHTML = "";

    let filtered = cropCalendarData;
    if (season !== "all") {
        filtered = cropCalendarData.filter(item => item.season === season);
    }

    if (filtered.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5' style='padding:15px;'>No crops found for this season.</td></tr>";
        return;
    }

    for (let item of filtered) {
        let row = document.createElement("tr");

        let linkCell = item.link !== "#"
            ? `<a href="${item.link}"><button style="padding:6px 12px; font-size:14px;">View</button></a>`
            : `<span style="color:gray;">Coming Soon</span>`;

        row.innerHTML = `
            <td style="padding:10px; border:1px solid #ddd; font-weight:bold;">${item.crop}</td>
            <td style="padding:10px; border:1px solid #ddd;">${item.seasonLabel}</td>
            <td style="padding:10px; border:1px solid #ddd;">${item.sowing}</td>
            <td style="padding:10px; border:1px solid #ddd;">${item.harvest}</td>
            <td style="padding:10px; border:1px solid #ddd;">${linkCell}</td>
        `;

        tbody.appendChild(row);
    }
}

function filterCalendar() {
    let season = document.getElementById("seasonFilter").value;
    renderCalendar(season);
}

window.onload = function () {
    renderCalendar("all");
};