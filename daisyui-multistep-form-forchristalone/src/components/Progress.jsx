// BY GOD'S GRACE ALONE

const Progress = ({step}) => {
    const stepTitles = ["Personal", "Account", "Preferences", "Summary"];
    return(
        <>
            <div>
                <ul className="steps w-full mb-4">
                    {
                        stepTitles.map((title, index)=>(
                            <li key={index} className={`step ${index <= step ? "step-primary" : ""} text-xs sm:text-sm `}>
                                
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Progress