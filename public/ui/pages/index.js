
import { Helper } from "../services/helper.js";

export default function Home() {
    return (
      <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple Next.js app using the pages folder for routing.</p>
      </div>
    );
}

export async function getServerSideProps(context) {
    try {

        var request = await Helper.sendRequest({
            api: "home-page/get",
            method: "get",
            data: {} 
        })

        console.log(request);

        return {
            props: {data: ''}
        };

    } catch (error) {
        return { props: { error: 'Server is offline, please try again later.' } }; 
    }
}
  