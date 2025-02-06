import { Helper } from '../../services/helper';
import Config from '../../services/config';

export default async function handler(req, res) {
  // Using your custom Helper.sendRequest to fetch the JSON data
  var siteMapXml = await Helper.sendRequest({
    api: 'sitemap_index',
    method: 'get',
  });
   
  var response = await siteMapXml.json();

  if (!response.sitemapindex || !Array.isArray(response.sitemapindex)) {
  return res.status(400).json({ error: "Invalid JSON format" });
  }

  // other sitemaps for blog
  /*
 
  */

  var blogSitemaps = [
    'sitemap_blog_users.xml',
    'sitemap_blog_categories.xml',
    'sitemap_blog_tags.xml',
    'sitemap_blog_posts.xml',
    'sitemap_blog_pages.xml'
  ].map(x => ({loc: `https://flatcoding.com/${x}`}))

  // Convert JSON to XML
  const xmlData = [...response.sitemapindex, ...blogSitemaps].map(sitemap => {
  return `
    <sitemap>
      <loc>${sitemap.loc}</loc>
    </sitemap>
  `;
  }).join("");

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xmlData}
  </sitemapindex>`;

  // Set the response header to XML
  res.setHeader('Content-Type', 'application/xml');

  // Send the XML data as the response
  return res.send(sitemapIndex.trim());

}
