import { Helper } from '../../services/helper';
import Config from '../../services/config';

export default async function handler(req, res) {
  try {
    // Using your custom Helper.sendRequest to fetch the JSON data
    const reqs = await Helper.sendWPRequest({
      api: 'wp-json/wp/v2/pages', // Path relative to the base URL in Helper
      method: 'get', 
      data: {}
    });
    
    var response = await reqs.json();
    
    if (!response || !Array.isArray(response)) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }
    
    // Convert JSON to XML
    const xmlData = response.map((urlData, indx) => {
        console.log(urlData);
        var link = urlData.link.replace("authors.flatcoding.com", "flatcoding.com/blog");
        
        var xml_data = ``;
        const now = new Date();

        if( indx == 0 ) {
          xml_data += `
            <url>
              <loc>https://flatcoding.com/blog/</loc> 
              <lastmod>${now.toISOString().slice(0, 19)}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        }

        xml_data += `
          <url>
            <loc>${link}</loc> 
            <lastmod>${urlData.modified}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>
        `;

        return xml_data;
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
