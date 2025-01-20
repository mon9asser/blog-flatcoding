import { Helper } from '../../services/helper';
import Config from '../../services/config';

export default async function handler(req, res) {
  try {

    var current_page = parseInt(req.query.page_number, 10) || 1;

    var latest_request = await Helper.sendWPRequest({
        api: `wp-json/custom/v1/latest-posts?page_number=${current_page}`,
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
