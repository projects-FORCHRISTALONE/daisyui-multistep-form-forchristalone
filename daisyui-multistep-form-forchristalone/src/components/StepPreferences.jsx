import React from 'react'

const StepPreferences = ({data, onChange, errors}) => {
     const plans = [
        {
        id: "Free",
        name: "Free",
        price: "$0/month",
        description: "Basic features for getting started",
        features: ["Up to 5 projects", "1GB storage", "Basic support"],
        },
        {
        id: "Pro",
        name: "Pro",
        price: "$29/month",
        description: "Perfect for growing teams",
        features: [
            "Unlimited projects",
            "50GB storage",
            "Priority support",
            "Advanced analytics",
        ],
        },
        {
        id: "Enterprise",
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations",
        features: [
            "Unlimited everything",
            "Dedicated manager",
            "Custom integrations",
            "SLA guarantee",
        ],
        },
    ];

  return (
    <div className='space-y-4'>
        <div>
            <div className='flex justify-between items-center mb-3'>

                <label htmlFor="" className='label mb-1'>Choose your plan</label>
                {
                    errors.plan && (
                        <span className='text-sm text-red-500'>{errors.plan}</span>
                    )
                }
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {plans.map((plan)=>(
                    <div key = {plan.id} onClick={()=> onChange("plan", plan.id)} className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${data.plan === plan.id ? "border-primary bg-primary/10" : "border-gray-300 hover:border-gray-500"}`}> 
                        <div className='flex justify-between items-center mb-2'>
                            <h3 className='font-bold text-lg'>{plan.name}</h3>
                            <span className='text-sm font-semibold'>{plan.price}</span>
                        </div>
                        <p className='text-sm mb-3'>{plan.description}</p>
                        <ul className='text-xs space-y-1'>
                            {
                                plan.features.map((feature, index) => (
                                    <li key = {index}>
                                        {feature}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        <div className='border-t pt-4'>
            <p className='mb-3 font-medium'>Notification preferences</p>
            <label className='flex items-center cursor-pointer'>
                <input type="checkbox" checked={!!data.notifications} className='toggle toggle-sm' onChange={(e)=> onChange("notifications", e.target.checked)} />
                <span className='ml-3'>
                    Receive email notifications about product updates
                </span>
            </label>

        </div>
    </div>
  )
}

export default StepPreferences