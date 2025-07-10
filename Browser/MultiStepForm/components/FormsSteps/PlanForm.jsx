import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PlanForm.css";
import arcade from "/assets/images/icon-arcade.svg";
import advanced from "/assets/images/icon-advanced.svg";
import pro from "/assets/images/icon-pro.svg";



const PlanForm = ({handleChange, formData, setFormData}) => {
    const [period, setPeriod] = useState(true);

    useEffect(() => {
        const valuePeriod = period ? "Monthly": "Yearly"
        handleChange({
            target: {
                name: "period",
                value: valuePeriod,
            }
        })
        const fakeEvent = { target: { value: formData.plan.planName } };
        handlePlan(fakeEvent);
    }, [formData.period])

    const togglePeriod = () => {
        setPeriod(
            (prevMode) => {
                const newPeriod = !prevMode;
                const valuePeriod = newPeriod ? "Monthly" : "Yearly";
                handleChange({
                    target: {
                        name: "period",
                        value: valuePeriod
                    }
                })
                return newPeriod;
            })
    }

    const handlePlan = (e) => {
        if(formData.period === "Monthly") {
            if(e.target.value === "arcade") {
                setFormData({
                    ...formData,
                    plan: {
                        planName: "Arcade",
                        planPrice: 9
                    }
                })
            } else if(e.target.value === "advanced") {
                setFormData({
                    ...formData,
                    plan: {
                        planName: "Advanced",
                        planPrice: 12
                    }
                })
            } else if(e.target.value === "pro") {
                setFormData({
                    ...formData,
                    plan: {
                        planName: "Pro",
                        planPrice: 15
                    }
                })
            }
        } else if(formData.period === "Yearly") {
            if(e.target.value === "arcade") {
                setFormData({
                    ...formData,
                    plan: {
                        planName: "Arcade",
                        planPrice: 90
                    }
                })
            } else if(e.target.value === "advanced") {
                setFormData({
                    ...formData,
                    plan: {
                        planName: "Advanced",
                        planPrice: 120
                    }
                })
            } else if(e.target.value === "pro") {
                setFormData({
                    ...formData,
                    plan: {
                        planName: "Pro",
                        planPrice: 150
                    }
                })
            }
        } 
        
    } 
    return(
        <div className="planFormContainer">
            <div className="multiStepsTxt">
                <h2>Select your Plan</h2>
                <p>You have the option of monthly or yearly billing</p>
            </div>
            <div className="planFormInputsBox">
                {period ? (
                        <form className="planFormForm">
                        <fieldset className="planFormInputs">
                        <label>
                            <input type="radio" name="plan" value="arcade" onChange={handlePlan} />
                            <div className="imgLabel">
                            <img src={arcade} />
                            </div>
                            <div className="textLabel">
                            <p>Arcade</p>
                            <p>$9/mo</p>
                            </div>
                        </label>
                        <label>
                            <input type="radio" name="plan" value="advanced" onChange={handlePlan} />
                            <div className="imgLabel">
                            <img src={advanced} />
                            </div>
                            <div className="textLabel">
                            <p>Advanced</p>
                            <p>$12/mo</p>
                            </div>
                        </label>
                        <label>
                            <input type="radio" name="plan" value="pro" onChange={handlePlan}/>
                            <div className="imgLabel">
                            <img src={pro} />
                            </div>
                            <div className="textLabel">
                            <p>Pro</p>
                            <p>$15/mo</p>
                            </div>
                        </label>
                        </fieldset>
                    </form>
                    ) : (
                    <form className="planFormForm">
                        <fieldset className="planFormInputs">
                        <label>
                            <input type="radio" name="plan" value="arcade" onChange={handlePlan} />
                            <div className="imgLabel">
                            <img src={arcade} />
                            </div>
                            <div className="textLabel">
                            <p>Arcade</p>
                            <p>$90/yr</p>
                            <p>2 months free</p>
                            </div>
                        </label>
                        <label>
                            <input type="radio" name="plan" value="advanced" onChange={handlePlan} />
                            <div className="imgLabel">
                            <img src={advanced} />
                            </div>
                            <div className="textLabel">
                            <p>Advanced</p>
                            <p>$120/yr</p>
                            <p>2 months free</p>
                            </div>
                        </label>
                        <label>
                            <input type="radio" name="plan" value="pro" onChange={handlePlan}/>
                            <div className="imgLabel">
                            <img src={pro} />
                            </div>
                            <div className="textLabel">
                            <p>Pro</p>
                            <p>$150/yr</p>
                            <p>2 months free</p>
                            </div>
                        </label>
                        </fieldset>
                    </form> 
                ) }
                
                <div className="switchButtonDiv">
                    <span className="label-left">Monthly</span>
                        <button className={`switchButton ${period ? "": "right" }`} onClick={togglePeriod}>
                            <div className="thumbButton"/>
                        </button>
                    <span className="label-right">Yearly</span>
                </div>
            </div>
            
        </div>

    )
}

PlanForm.propTypes = {
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

export default PlanForm;