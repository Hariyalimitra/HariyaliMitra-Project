// Demo Mandi Price Data (State-wise)
// Format: { crop: [min, max, modal] } prices in Rs per Quintal

const mandiData = {
    bihar: {
        updated: "13 June 2026",
        prices: {
            "Wheat": [2150, 2280, 2200],
            "Rice (Paddy)": [1900, 2100, 2000],
            "Maize": [1800, 1950, 1880],
            "Mustard": [5200, 5500, 5350],
            "Sugarcane": [320, 360, 340],
            "Potato": [900, 1200, 1050],
            "Onion": [1400, 1800, 1600]
        }
    },
    up: {
        updated: "13 June 2026",
        prices: {
            "Wheat": [2180, 2300, 2240],
            "Rice (Paddy)": [1950, 2150, 2050],
            "Maize": [1850, 2000, 1920],
            "Mustard": [5300, 5600, 5450],
            "Sugarcane": [340, 380, 360],
            "Potato": [850, 1150, 1000],
            "Onion": [1350, 1750, 1550]
        }
    },
    punjab: {
        updated: "13 June 2026",
        prices: {
            "Wheat": [2200, 2350, 2275],
            "Rice (Paddy)": [2000, 2200, 2100],
            "Maize": [1900, 2050, 1975],
            "Mustard": [5400, 5700, 5550],
            "Sugarcane": [350, 390, 370],
            "Potato": [950, 1250, 1100],
            "Onion": [1450, 1850, 1650]
        }
    },
    mp: {
        updated: "13 June 2026",
        prices: {
            "Wheat": [2120, 2260, 2190],
            "Rice (Paddy)": [1880, 2080, 1980],
            "Maize": [1780, 1930, 1855],
            "Mustard": [5150, 5450, 5300],
            "Sugarcane": [310, 350, 330],
            "Potato": [880, 1180, 1030],
            "Onion": [1380, 1780, 1580]
        }
    },
    haryana: {
        updated: "13 June 2026",
        prices: {
            "Wheat": [2190, 2330, 2260],
            "Rice (Paddy)": [1980, 2180, 2080],
            "Maize": [1870, 2020, 1945],
            "Mustard": [5350, 5650, 5500],
            "Sugarcane": [345, 385, 365],
            "Potato": [920, 1220, 1070],
            "Onion": [1420, 1820, 1620]
        }
    }
};

function loadMandiPrices() {
    let state = document.getElementById("stateSelect").value;
    let data = mandiData[state];

    document.getElementById("mandiUpdated").innerText =
        "📅 Last Updated: " + data.updated;

    let html = `
        <table style="width:100%; border-collapse: collapse; margin-top:15px;">
            <thead>
                <tr style="background-color: green; color: white;">
                    <th style="padding:10px; border:1px solid #ddd;">Crop</th>
                    <th style="padding:10px; border:1px solid #ddd;">Min Price (₹)</th>
                    <th style="padding:10px; border:1px solid #ddd;">Max Price (₹)</th>
                    <th style="padding:10px; border:1px solid #ddd;">Modal Price (₹)</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let crop in data.prices) {
        let [min, max, modal] = data.prices[crop];
        html += `
            <tr>
                <td style="padding:10px; border:1px solid #ddd; font-weight:bold;">${crop}</td>
                <td style="padding:10px; border:1px solid #ddd;">₹${min}</td>
                <td style="padding:10px; border:1px solid #ddd;">₹${max}</td>
                <td style="padding:10px; border:1px solid #ddd; color:green; font-weight:bold;">₹${modal}</td>
            </tr>
        `;
    }

    html += `
            </tbody>
        </table>
    `;

    document.getElementById("mandiTableContainer").innerHTML = html;
}

// Load default state on page load
window.onload = function () {
    loadMandiPrices();
};