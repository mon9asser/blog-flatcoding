import { Helper } from '../../services/helper';
import Config from '../../services/config';

export default async function handler(req, res) {
  try {
    // Using your custom Helper.sendRequest to fetch the JSON data
    const reqs = await Helper.sendWPRequest({
      api: 'wp-json/wp/v2/users?context=edit', // Path relative to the base URL in Helper
      method: 'get', 
      data: {}
    });
    
    var response = await reqs.json();

    if (!response || !Array.isArray(response)) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }
    
    // Convert JSON to XML
    const xmlData = response.map(urlData => {
      if( urlData['roles'][0] != 'subscriber' ) { 
        var link = urlData.link.replace("authors.flatcoding.com/author", "flatcoding.com/blog/u");
        return `
          <url>
            <loc>${link}</loc> 
          </url>
        `;
      }
    }).join("");

    const sitemap = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${xmlData}
      </urlset>
    `;

    // Set the response header to XML
    res.setHeader('Content-Type', 'application/xml');
    // Send the XML data as the response
    return res.send(sitemap.trim());
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    // Handle errors
    res.status(500).send('Error fetching sitemap');
  }
}
