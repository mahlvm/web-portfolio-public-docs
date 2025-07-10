import PropTypes from "prop-types";
import "./InfoForm.css";

const InfoForm = ({formData, handleChange}) => {
    return(
        <div className="infoFormContainer">
            <div className="multiStepsTxt">
                <h2>Personal Info</h2>
                <p>Please provide your name, email address, and phone number.</p>
            </div>
        
            <div className="infoFormInputs">
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
            </div>
        
        </div>
        
    )
}

InfoForm.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};


export default InfoForm;