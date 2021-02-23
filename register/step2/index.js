import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";


import StepTwo from "../../components/registration/StepTwo";

const Registration = () => {
    return (

        <div>
            <Head>
                <title>Registration</title>
                <link rel="icon" href="/favicon.ico" />
                <script src="https://kit.fontawesome.com/ba7061d606.js" crossOrigin="anonymous" />
            </Head>
            <StepTwo/>
        </div>
    );
}

export default Registration
