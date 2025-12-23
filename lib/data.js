
export const services = [
    {
        id: "baby-care",
        title: "Baby Care",
        description: "Professional babysitting and expert child care services for your peace of mind.",
        image: "/images/baby-care.jpg",
        pricePerDay: 50,
        longDescription: "Our baby care service provides meaningful and safe engagement for your little ones. Our certified caretakers ensures your child reaches their developmental milestones while you are away."
    },
    {
        id: "elderly-care",
        title: "Elderly Care",
        description: "Compassionate companionship and assistance for senior citizens in the comfort of their homes.",
        image: "/images/elderly-care.jpg",
        pricePerDay: 45,
        longDescription: "We offer specialized care for the elderly, including medication reminders, companionship, and assistance with daily activities to ensure a dignified quality of life."
    },
    {
        id: "sick-care",
        title: "Sick People Service",
        description: "Dedicated support for patients recovering from illness or surgery.",
        image: "/images/sick-care.jpg",
        pricePerDay: 60,
        longDescription: "Our sick care service is designed to help patients recover faster. We provide constant monitoring and assistance with post-operative care or chronic illness management."
    }
];

export const locations = {
    divisions: ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal", "Rangpur", "Mymensingh"],
    districts: {
        "Dhaka": ["Dhaka", "Gazipur", "Narayanganj"],
        "Chittagong": ["Chittagong", "Cox's Bazar", "Comilla"],
        // Add more as needed for demo
    }
};
