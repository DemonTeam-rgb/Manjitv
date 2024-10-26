// pages/api/search.js
export default async function handler(req, res) {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: "Query must be provided." });
    }

    try {
        const response = await fetch(`https://toonstream.co/wp-admin/admin-ajax.php?s=${encodeURIComponent(query)}&action=search_in_place&lang=en`, {
            headers: {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.5",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Brave\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-requested-with": "XMLHttpRequest",
                "Referer": "https://toonstream.co/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch data." });
    }
}