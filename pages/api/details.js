import { parse } from 'node-html-parser';

export default async function handler(req, res) {
    const { query } = req.body;

    try {
        const domain = `toonstream.co`;
        const mainUrl = `https://${domain}/${query ? query : "series/naruto-shippuden-hindi-dub"}`;
        const main_server = await fetch(`${mainUrl}`, { method: "GET" });

        const imdbData = [];

        try {
            const str = mainUrl.split("series/")[1].replace("/", "");
            const newStr = str.replace(/-/g, " ");
            const r = str.split('-eng')[0];
            const bnewStr = r.replace("hindi dub", "").trim();
            console.log(bnewStr);

            const urlComp = encodeURIComponent(bnewStr);
            const accessToken = process.env.TMDB_ACCESS_TOKEN; // Use Access Token

            const rs = await fetch(`https://api.themoviedb.org/3/search/multi?query=${urlComp}&include_adult=false&language=en-US&page=1`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`, // Correct Authorization header
                },
                method: 'GET',
            });

            if (!rs.ok) {
                throw new Error(`HTTP error! status: ${rs.status}`);
            }

            const json = await rs.json();
            imdbData.push(json.results[0]);

        } catch (err) {
            console.error('Error fetching TMDB data:', err);
        }

        const html = await main_server.text();
        const root = parse(html);
        const body = root.querySelector('body')?.querySelector('.bd');
        const article = body?.querySelector('article');

        const votes = article?.querySelector('footer')?.querySelector('.vote-cn')?.querySelector('.vote .num')?.innerText?.trim() || "no rating";
        const postThumbnail = article?.querySelector('.dfxb .post-thumbnail figure img')?.getAttribute('data-src');

        const aside = article?.querySelector('.dfxb aside');
        const header = aside?.querySelector('.entry-header');
        const entryMeta = header?.querySelector('.entry-meta');

        const title = header?.querySelector('h1')?.innerText?.trim();
        const description = aside?.querySelector('.description p')?.innerText?.trim() || 'no description';

        const genresArry = entryMeta?.querySelectorAll('.genres a')?.map(r => ({
            href: r.getAttribute('href'),
            text: r.innerText.trim()
        })) || [];

        const tagArry = entryMeta?.querySelectorAll('.tag a')?.map(r => ({
            href: r.getAttribute('href'),
            text: r.innerText.trim()
        })) || [];

        const duration = entryMeta?.querySelector('.duration')?.innerText?.trim();
        const year = entryMeta?.querySelector('.year')?.innerText?.trim();
        const seasons = entryMeta?.querySelector('.seasons')?.innerText?.trim();
        const episodes = entryMeta?.querySelector('.episodes')?.innerText?.trim();

        const sections = body?.querySelectorAll('section') || [];
        const sectionsArray = Array.from(sections);

        const session = sectionsArray.slice(0, sectionsArray.length / 2);
        const relatedSeries = sectionsArray.slice(sectionsArray.length / 2);

        // Episodes Extraction
        const sessionEpisodesArray = session?.[0]?.querySelector('#episode_by_temp')?.querySelectorAll('li')?.map(r => {
            const articles = r.querySelector('article');
            if (articles) {
                const postThumbnail = articles?.querySelector('.post-thumbnail figure img')?.getAttribute('data-src');
                const numEpi = articles?.querySelector('.num-epi')?.innerText?.trim();
                const h2 = articles?.querySelector('h2')?.innerText?.trim();
                const time = articles?.querySelector('.entry-meta span')?.innerText?.trim();
                const href = articles?.querySelector('a')?.getAttribute('href');

                if (postThumbnail && numEpi && h2 && time && href) {
                    return {
                        postThumbnail,
                        numEpi,
                        h2,
                        time,
                        href
                    };
                }
            }
            return null;
        })?.filter(episode => episode !== null) || [];

        // Related Series Extraction
        const relatDataArry = relatedSeries[0]?.querySelector('.owl-carousel')?.querySelectorAll("article")?.map(r => {
            if (r) {
                const postThumbnail = r?.querySelector('.post-thumbnail figure img')?.getAttribute('data-src');
                const h2 = r?.querySelector('h2')?.innerText?.trim();
                const vote = r?.querySelector('.entry-meta span')?.innerText?.trim();
                const href = r?.querySelector('a')?.getAttribute('href');

                if (postThumbnail && h2 && vote && href) {
                    return {
                        postThumbnail,
                        h2,
                        vote,
                        href
                    };
                }
            }
            return null;
        })?.filter(series => series !== null) || [];

        // Session Information Extraction
        const numberOfSessions = [];
        session?.[0]?.querySelector('.section-header')?.querySelector('div')?.querySelector('.aa-cnt')?.querySelectorAll('li')?.forEach(r => {
            const a = r.querySelector('a');
            const dataPost = a?.getAttribute('data-post');
            const dataSeason = a?.getAttribute('data-season');
            const text = a?.innerText || "";

            if (dataPost && dataSeason) {
                numberOfSessions.push({
                    dataPost,
                    dataSeason,
                    text
                });
            }
        });

        // Send JSON response
        res.status(200).json({
            imdbData,
            title,
            description,
            votes,
            postThumbnail,
            duration,
            year,
            seasons,
            episodes,
            genresArry,
            tagArry,
            sessionEpisodesArray,
            relatDataArry,
            numberOfSessions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}
