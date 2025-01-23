import { Helper } from '../../services/helper';
import Config from '../../services/config';

export default async function handler(req, res) {
  try {
    // Ensure this endpoint only supports POST requests
    if (req.method !== 'POST') {
      return res.status(405).send({
        is_error: true,
        message: 'Method not allowed. Use POST.',
        data: []
      });
    }
    console.log('=================================');    
    console.log(req.body);
    console.log('=================================');
    // Extract data from the request body
    const { name, email, image, accessToken, post_id, reply_to_comment_id, comment_value } = req.body;

    // Validate required fields
    if (!name || !email || !post_id || !comment_value) {
      return res.send({
        is_error: true,
        message: 'Missing required fields: name, email, post_id, or comment_value.',
        data: []
      });
    }

    // Prepare data for the WordPress API
    const data_form = {
      name,
      email,
      image,
      accessToken,
      post_id,
      reply_to_comment_id: reply_to_comment_id || -1,
      comment_value
    };

    // Send the request to the WordPress API
    const wp_response = await Helper.sendWPRequest({
      api: `wp-json/custom/v1/post-comment`,
      method: "post",
      data: data_form
    });

    // Parse the response
    const response_data = await wp_response.json();

    // Handle WordPress API errors
    if (response_data.is_error) {
      return res.send({
        is_error: true,
        message: response_data.message,
        data: []
      });
    }

    // Return success response
    return res.send({
      is_error: false,
      message: response_data.message,
      data: response_data.data
    });

  } catch (error) {
    console.error('Error posting comment:', error);

    // Handle unexpected errors
    return res.status(500).send({
      is_error: true,
      message: 'An unexpected error occurred.',
      data: []
    });
  }
}
