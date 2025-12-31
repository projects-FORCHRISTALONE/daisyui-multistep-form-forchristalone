import {useDebugValue, useEffect, useState} from "react"
import confetti from "canvas-confetti";
import Progress from "./Progress";
import StepPersonal from "./StepPersonal";
import StepAccount from "./StepAccount";
import StepPreferences from "./StepPreferences";
import StepSummary from "./StepSummary";
import  {AnimatePresence, motion} from "framer-motion";

const validators = {
    required : (value) => (
        value === undefined || value === null || value === "" ? 
        "Required" : ""
    ),
    email: (value)=>(/\S+@\S+\.\S+/.test(value) ? "" : "Invalid email"),
    minLen: (len)=> (value)=>(
        value && value.length >= len ? "" :`Must be at least ${len} characters`
    )
}

// const validators = {
//   required: (value) =>
//     value === undefined || value === null || value === "" ? "Required" : "",

//   email: (value) => (/\S+@\S+\.\S+/.test(value) ? "" : "Invalid email"),
//   minLen: (len) => (value) =>
//     value && value.length >= len ? "" : `Must be at least ${len} characters`,
// };

const MultistepForm = () => {
    const totalSteps = 4;
    const [step, setStep] = useState(()=>{
        const savedStep = parseInt(localStorage.getItem("msf-step") || "0", 10);
        return isNaN(savedStep) ? 0 : savedStep
    });
    const [data, setData] = useState(()=>JSON.parse(localStorage.getItem("msf-data") || "{}"));
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [complete, setComplete] = useState(false);


    useEffect(()=>{
        localStorage.setItem("msf-data", JSON.stringify(data))
    }, [data])

    useEffect(()=>{
        localStorage.setItem("msf-step", step.toString());
    }, [step])

    const handleChange = (key, value) => {
        setData((d)=>({...d, [key]:value}));
        setErrors((e)=> ({...e, [key]: ""}));
    }

    const validateStep = (s = step) => {
        const e = {};

        if (s === 0){
            e.fullName = validators.required(data.fullName);
            e.email = validators.required(data.email) || validators.email(data.email);
        }    

        if (s === 1){
            e.username = validators.required(data.username) || validators.minLen(3)(data.username);
            e.password = validators.required(data.password) || validators.minLen(8)(data.password);
            e.passwordConfirm = data.password === data.passwordConfirm ? "" : "Passwords do not match";
        }

        if (s === 2){
            e.plan = validators.required(data.plan);
        }

        setErrors(e);
        return Object.values(e).every((v) => v ==="");
    }

    const next = () =>{
        if(!validateStep(step)) return;
        setStep((s)=> Math.min( s + 1, totalSteps - 1));

    }

    const back = () => {
        setStep((s)=>Math.max(s - 1, 0));
    }

    const submit = async () => {
        if(!validateStep(step)) return;
        setSubmitting(true);
        try{
            await new Promise((res)=>setTimeout(res, 1000));
            confetti({
                particleCount: 100,
                spread: 70,
                origin: {y: 0.6}
            })
            setComplete(true);
            localStorage.removeItem("msf-data");
            localStorage.removeItem("msf-step");

        }
        finally{
            setSubmitting(true)
        }
    }

    const resetForm = () => {
        setData({});
        setStep(0);
        localStorage.removeItem("msf-data");
        localStorage.removeItem("msf-step");
    }

    const steps = [
        {
            id : "personal",
            title : "Personal",
            component: (
                <StepPersonal 
                    data = {data}
                    errors = {errors}
                    onChange = {handleChange}
                />
            )
        },
        {
            id : "account",
            title : "Account",
            component: (
                <StepAccount 
                    data = {data}
                    errors = {errors}
                    onChange = {handleChange}
                />
            )
        },
        {
            id : "Preferences",
            title : "Preferences",
            component: (
                <StepPreferences 
                    data = {data}
                    errors = {errors}
                    onChange = {handleChange}
                />
            )
        },
        {
            id : "Summary",
            title : "Summary",
            component: (
                <StepSummary 
                    data = {data}
                    errors = {errors}
                    onChange = {handleChange}
                />
            )
        },
    ]

    console.log(totalSteps)

    return(
        <div
            className="min-h-screen flex items-center justify-center p-6"
        >
            <div className="w-full max-w-3xl border rounded-xl">
                <div className="card shadow-xl">
                    <div className="card-body p-6 md:p-10">
                        {/* Header */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold">Create Account</h2>
                            <p className="text-sm text-gray-300">
                                A CHRISTLY modern multi-step form with validation, animations and confetti
                            </p>
                        </div>
                        {/* Progress Bar */}
                        <Progress step = {step} />
                        {/* Step Content with animation */}
                        <div className="relative min-h-80">
                            <AnimatePresence
                                mode="wait"
                            >
                                <motion.div key={steps[step].id} 
                                initial = {{
                                    opacity: 0,
                                    x : 30
                                }}
                                animate = {{
                                    opacity: 1,
                                    x : 0
                                }}
                                exit = {{
                                    opacity: 0,
                                    x : -30
                                }}
                                transition={{duration: 0.4}}
                                
                                >
                                    {steps[step].component}
                                </motion.div>
                            </AnimatePresence>

                        </div>
                        {/* Navigation Buttons */}
                        <div className="mt-6 flex items-center justify-between gap-3">
                                <div>
                                    <button onClick={resetForm} className="btn btn-secondary">
                                        Reset
                                    </button>
                                </div>
                                <div className="flex  items-center justify-end w-full gap-3">
                                    {
                                        (step > 0) && (
                                            <button className="btn btn-secondary" onClick={back}>
                                                Back
                                            </button>
                                        )
                                    }
                                    {
                                        (step < totalSteps - 1 ) && (
                                            
                                            <button className="btn btn-primary" onClick={next}>
                                                Next
                                            </button>
                                        )
                                    }
                                    {
                                        (step === totalSteps - 1 ) && (
                                            
                                            <button
                                                className={`btn btn-primary ${submitting ? "Sending" : ""}`}
                                                onClick={submit}
                                                disabled={submitting || complete}
                                            >
                                               {submitting && <span className="loading loading-sm"></span>} 
                                                {!submitting && (complete ? "Completed":"Submit")}
                                            </button>
                                        )
                                    }
                                </div>
                        </div>
                        {/* Footer */}
                        <div className="mt-4 text-xs text-gray-500">
                                Gracious Tip: The form can be reset at any time by clicking the "Reset" button
                        </div>
                    </div>
                </div>
                {/* Success Overlay */}
                <AnimatePresence>
                    {
                        complete && (
                            <motion.div
                                initial = {{
                                    opacity: 0,
                                    
                                }}
                                animate = {{
                                    opacity: 1,
                                    
                                }}
                                exit = {{
                                    opacity: 0,
                                    
                                }}
                                className="fixed inset-0 bg-black/30 flex items-center justify-center p-6"
                            >
                                <motion.div
                                    className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md text-center"
                                    initial = {{scale: 0.8}} animate = {{scale: 1}}
                                >

                                    <h3 className="mb-6 text-center">Account Created</h3>
                                    <p className="mb-6 text-center text-gray-600">
                                        Your account has been successfully created. A confirmation email will be sent to <strong>{data.email}</strong>
                                    </p>
                                    <div>
                                        <button className="btn btn-primary w-full" onClick={()=>{
                                            setComplete(false);
                                            resetForm();
                                        }}>
                                            Close 
                                        </button>
                                    </div>
                                </motion.div>

                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default MultistepForm