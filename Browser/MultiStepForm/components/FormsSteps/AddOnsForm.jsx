import PropTypes from "prop-types";
import "./AddOnsForm.css";


const AddOnsForm = ({formData, setFormData}) => {


    const handleAddOns = (e) => {
        if(e.target.checked) {
            if(formData.period === "Monthly") {
                if(e.target.value === "OnlineService") {
                    setFormData({
                        ...formData,
                        addOns: {
                            ...formData.addOns, 
                            OnlineService: 1,
                        }
                    });
                } else if (e.target.value === "LargerStorage") {
                    setFormData({
                        ...formData,
                        addOns: {
                            ...formData.addOns, 
                            LargerStorage: 2,
                        }
                    });
                } else if (e.target.value === "CustomizableProfile") {
                    setFormData({
                        ...formData,
                        addOns: {
                            ...formData.addOns, 
                            CustomizableProfile: 2,
                        }
                    });
                }
            } if(formData.period === "Yearly") {
                if(e.target.value === "OnlineService") {
                    setFormData({
                        ...formData,
                        addOns: {
                            ...formData.addOns, 
                            OnlineService: 10,
                        }
                    });
                } else if (e.target.value === "LargerStorage") {
                    setFormData({
                        ...formData,
                        addOns: {
                            ...formData.addOns, 
                            LargerStorage: 20,
                        }
                    });
                } else if (e.target.value === "CustomizableProfile") {
                    setFormData({
                        ...formData,
                        addOns: {
                            ...formData.addOns, 
                            CustomizableProfile: 20,
                        }
                    });
                }
            } 
        } else{
            setFormData({
                ...formData,
                addOns: {
                    ...formData.addOns, 
                    [e.target.value]: 0,
                } 
            })
        } 
}


    return(
        <div className="addOnsFormContainer">       
            <div className="multiStepsTxt">
                <h2>Pick add-ons</h2>
                <p>Add-ons help enhance your game experience</p>
            </div>
            <div className="addOnsInputsBox">
                {formData.period === "Monthly" ? (
                    <form className="addOnsForm">
                        <fieldset className="addOnsInputs">
                            <label>
                                <input type="checkbox" name="addOns" value="OnlineService" onChange={handleAddOns}/>
                                <div className="addOnsTxt">
                                    <h3>Online service</h3>
                                    <p>Access to multiplayer games</p>
                                </div>
                                <h4>+$1/mo</h4>
                            </label>
                            <label>
                                <input type="checkbox" name="addOns" value="LargerStorage" onChange={handleAddOns}/>
                                <div className="addOnsTxt">
                                    <h3>LargerStorage</h3>
                                    <p>Extra 1TB of cloud save</p>
                                </div>
                                <h4>+$2/mo</h4>
                            </label>
                            <label>
                                <input type="checkbox" name="addOns" value="CustomizableProfile" onChange={handleAddOns} />
                                <div className="addOnsTxt">
                                    <h3>Customizable Profile</h3>
                                    <p>Custom theme on your profile</p>
                                </div>
                                <h4>+$2/mo</h4>
                            </label>
                        </fieldset>
                    </form>
                ) : (
                    <form className="addOnsForm">
                    <fieldset className="addOnsInputs">
                        <label>
                            <input type="checkbox" name="addOns" value="OnlineService" onChange={handleAddOns}/>
                            <div className="addOnsTxt">
                                <h3>Online service</h3>
                                <p>Access to multiplayer games</p>
                            </div>
                            <h4>+$10/yr</h4>
                        </label>
                        <label>
                            <input type="checkbox" name="addOns" value="LargerStorage" onChange={handleAddOns}/>
                            <div className="addOnsTxt">
                                <h3>LargerStorage</h3>
                                <p>Extra 1TB of cloud save</p>
                            </div>
                            <h4>+$20/yr</h4>
                        </label>
                        <label>
                            <input type="checkbox" name="addOns" value="CustomizableProfile" onChange={handleAddOns} />
                            <div className="addOnsTxt">
                                <h3>Customizable Profile</h3>
                                <p>Custom theme on your profile</p>
                            </div>
                            <h4>+$20/yr</h4>
                        </label>
                    </fieldset>
                </form>
                )}
            </div>
        </div>

    )
}

AddOnsForm.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        plan: PropTypes.shape({
            planName: PropTypes.string.isRequired,
            planPrice: PropTypes.number.isRequired,
        }).isRequired,
        period: PropTypes.oneOf(["Monthly", "Yearly"]).isRequired,
        addOns: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};


export default AddOnsForm;