import "./MultiStepForm.css";
import InfoForm from "../components/FormsSteps/InfoForm";
import PlanForm from "../components/FormsSteps/PlanForm";
import AddOnsForm from "../components/FormsSteps/AddOnsForm";
import SummaryForm from "../components/FormsSteps/SummaryForm";
import EndForm from "../components/FormsSteps/EndForm";
import Header from "../components/Header";
import { useState } from "react";




const MultiStepForm = () => {

    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        plan: {
            planName: "",
            planPrice: 0
        },
        period: "",
        addOns: {
            OnlineService: 0,
            LargerStorage: 0,
            CustomizableProfile: 0,
        },
    });
    // const [summaryTotal, setSummaryTotal] = useState([]);    

    

    const handleStep = (e) => {
        if(e.target.value === "+"){
            if(step === 5){
                setStep(3);
            } else{
                setStep(step + 1);  
            }
        } else if(e.target.value === "-") {
            if(step === 5){
                setStep(3);
            } else{
                setStep(step - 1);  
            }

        }
    }

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        const type = e.target.type;
        const checked = e.target.checked;

        if(type === "checkbox") {
            let newOddOns = [...formData[key]];
            if(checked) {
                newOddOns.push(value);
            } else {
                newOddOns = newOddOns.filter((item) => item !== value);
            }

            const newForm = {
                ...formData,
                [key] : newOddOns,
            };

            setFormData(newForm);
            console.log(newForm); 
        } else{
            const newForm = {
                ...formData,
                [key] : value,
            };
    
            setFormData(newForm);
            console.log(newForm);  
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    // const handleSummaryTotal = () => {
    //     let newSummary = [...summaryTotal];
    //     if(formData.period === "Monthly") {
    //         if(formData.plan === "arcade") {
    //             newSummary.push(9);
    //         } else if(formData.plan === "advanced") {
    //             newSummary.push(9);
    //         }

    //     }
    // }

    const forms = [
        <InfoForm key="info" formData={formData} handleChange={handleChange} />,
        <PlanForm key="plan" formData={formData} setFormData={setFormData} handleChange={handleChange} />,
        <AddOnsForm key="addons" formData={formData} setFormData={setFormData} handleChange={handleChange} />,
        <SummaryForm key="summary" formData={formData} setFormData={setFormData} handleChange={handleChange} step={step} setStep={setStep}/>,
        <EndForm key="end" />,
        <PlanForm key="plan" formData={formData} setFormData={setFormData} handleChange={handleChange} />,
    ];
    
    
    return(
        <div className="multiStepFormPage">
            <Header />
            <div className="multiStepFormContainer">
            <div className="step-block">
                <div className="steps" onClick={() => setStep(0)}>
                    <div className={`circleNum ${step === 0 ? "filled" : "blank" }`}>1</div>
                    <div className="stepName">
                        <h2>STEP 1</h2>
                        <h1>YOUR INFO</h1>
                    </div>
                </div>

                <div className="steps" onClick={() => setStep(1)}>
                <div className={`circleNum ${step === 1 ? "filled" : "blank" }`}>2</div>
                    <div className="stepName">
                        <h2>STEP 2</h2>
                        <h1>SELECT PLAN</h1>
                    </div>
                </div>

                <div className="steps" onClick={() => setStep(2)}>
                <div className={`circleNum ${step === 2 ? "filled" : "blank" }`}>3</div>
                    <div className="stepName">
                        <h2>STEP 3</h2>
                        <h1>ADD-ONS</h1>
                    </div>
                </div>

                <div className="steps" onClick={() => setStep(3)}>
                <div className={`circleNum ${step === 3 ? "filled" : "blank" }`}>4</div>
                    <div className="stepName">
                        <h2>STEP 4</h2>
                        <h1>SUMMARY</h1>
                    </div>
                </div>
            </div>

            <div className="form-block">
                <form className="stepForm" onSubmit={handleSubmit}>  
                <div className="componentsForm">
                    {forms[step]}
                </div>
                <div className="buttonStepForm">
                {step != 0 && step != 4 ? (
                    <button type="button" value={"-"} onClick={handleStep}>Go Back</button> 
                ) : (<div />)}
                {step != 3 && step != 4 ?(
                    <button type="button" value={"+"} onClick={handleStep}>Next Step</button>
                ) : step == 3 ? (
                    <button type="button" value={"+"} onClick={handleStep}>Confirm</button>
                ) : null }
                {/* {step === 5 && (
                    <button type="button" value={"+"} onClick={handleStep}>Confirm</button>
                )} */}
                </div>
                </form>
            </div>
            </div>            
        </div>
    )
}

export default MultiStepForm;