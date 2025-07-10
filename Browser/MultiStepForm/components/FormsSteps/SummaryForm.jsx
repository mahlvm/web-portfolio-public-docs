    // import { key } from "localforage";
    import PropTypes from "prop-types";
    import { useState } from "react";
    import { useEffect } from "react";
    // import PlanForm from "./PlanForm";
    import "./SummaryForm.css";

    const SummaryForm = ({formData, setStep}) => {
        const [total, setTotal] = useState(0);
        const [arrayAdd, setArrayAdd] = useState([]);
        // const [changeOpen, setChangeOpen] = useState(false);

        useEffect(() => {
            const oddOnsToArray = Object.entries(formData.addOns);
            const addOnsNoZero = oddOnsToArray.filter(([, value]) => value!== 0);
            const sum = addOnsNoZero.reduce((acc, [, value]) => acc + value, 0)

            setArrayAdd(addOnsNoZero);
            setTotal(sum + formData.plan.planPrice);
        
        }, [])

        const handleChangePlan = () => {
            // setChangeOpen(!changeOpen);
            setStep(1);

        }


        return(
            <div className="summaryFormContainer">
                <div className="multiStepsTxt">
                    <h2>Finishing ip</h2>
                    <p>Double-check everything looks OK before confirming. </p>
                </div>
                <div className="summaryBox">
                    <div className="summaryBoxPlan">
                        <div>
                            <p>{formData.plan.planName}</p>
                            {/* {changeOpen && (<PlanForm formData={formData} setFormData={setFormData} handleChange={handleChange} />)} */}
                            <a className="sumaryBoxButton" href="#" onClick={handleChangePlan}>Change</a>
                        </div>
                        <div>
                            <p>${formData.plan.planPrice}</p>
                        </div>
                    </div>
                    <hr className="summaryDivider" />
                    <dl className="summaryBoxOdds">
                        {arrayAdd.map(([key, value]) => (
                            <div key={key} className="summaryListItem">
                                <dt>{key}</dt>
                                <dd>+${value}</dd>
                            </div>
                        ))}
                    </dl>    

                </div>
                {formData.period === "Monthly" ? (
                    <div className="totalBox">
                        <p>Total(per month):</p> 
                        <p>${total}/mo</p>
                    </div>
                ) : (
                    <div className="totalBox">
                        <p>Total(per year):</p>  
                        <p>${total}/yr</p>  
                    </div>
                    )}
            </div>
        )
    }

    SummaryForm.propTypes = {
            formData: PropTypes.shape({
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            phoneNumber: PropTypes.string.isRequired,
            plan: PropTypes.shape({
                planName: PropTypes.string.isRequired,
                planPrice: PropTypes.number.isRequired,
            }).isRequired,
            period: PropTypes.oneOf(["Monthly", "Yearly"]).isRequired,
            addOns: PropTypes.shape({
                OnlineService: PropTypes.number.isRequired,
                LargerStorage: PropTypes.number.isRequired,
                CustomizableProfile: PropTypes.number.isRequired,
            }).isRequired,
            }).isRequired,
            setFormData: PropTypes.func.isRequired,
            handleChange: PropTypes.func.isRequired,
            setStep: PropTypes.func.isRequired,
            handleAddOns: PropTypes.func.isRequired,
        };

    export default SummaryForm;