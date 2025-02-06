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
   
    // Extract data from the request body
    const { 
        name,
        email,
        message,
        subject,
    } = req.body;
    
    console.log({
        name,
        email,
        message,
        subject
    });
    // Prepare data for the WordPress API
    const data_form = {
        name,
        email,
        message,
        subject,
    };

    // Send the request to the WordPress API
    const wp_response = await Helper.sendWPRequest({
      api: `wp-json/custom/v1/send_contact`,
      method: "post",
      data: data_form
    });

    // Parse the response
    const response_data = await wp_response.json();
    

    return res.send({
        is_error: response_data.is_error,
        message: response_data.message,
        data: response_data.data
    });
 
  } catch (error) { 

    // Handle unexpected errors
    return res.status(500).send({
      is_error: true,
      message: 'An unexpected error occurred.',
      data: []
    });
  }
}
