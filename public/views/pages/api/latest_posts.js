import { Helper } from '../../services/helper';
import Config from '../../services/config';

export default async function handler(req, res) {
  try {

    var current_page = parseInt(req.query.page_number, 10) || 1;

    var new_param = '';

    // Author Query
    if( req.query.author ) {
      new_param += `&author=${req.query.author}`;
    }

    // Tag Query
    if( req.query.tag ) {
      new_param += `&tag=${req.query.tag}`;
    }

    // Category Query
    if( req.query.category ) {
      new_param += `&category=${req.query.category}`;
    }

    var latest_request = await Helper.sendWPRequest({
        api: `wp-json/custom/v1/latest-posts?page_number=${current_page}${new_param}`,
        method: "get",
        data: {}
    });

    var resonse = await latest_request.json();
    if( resonse.is_error ) {
        return res.send({
            is_error: true, 
            message: resonse.message,
            data: []
        });
    }

    return res.send({
        is_error: false, 
        message: resonse.message,
        data: resonse.data
    });

  } catch (error) {
    console.error('Error fetching sitemap:', error);
    // Handle errors
    res.status(500).send('Error fetching sitemap');
  }
}
