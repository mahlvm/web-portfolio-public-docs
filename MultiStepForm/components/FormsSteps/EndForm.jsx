import thanks from "/assets/images/icon-thank-you.svg";
import "./EndForm.css";

const EndForm = () => {
    return(
        <div className="endformContainer">
            <div>
                <img src={thanks}/>
            </div>
            <div className="multiStepsTxtEnd">
                <h2>Thank you</h2>
                <p>Thanks for confirming your subscription! We hope you have fun using
                    our plataform.
                </p>
            </div>
        </div>
    )
}

export default EndForm;