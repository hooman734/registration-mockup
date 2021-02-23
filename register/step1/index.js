
import Head from "next/head";


import StepOne from "../../components/registration/StepOne";

const Registration = () => {
    return (

        <div>
            <Head>
                <title>Registration</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StepOne/>
        </div>
    );
}

export default Registration
