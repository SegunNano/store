import React from 'react';

const ProgressStepper = ({ step1, step2, step3 }) => {
    return (
        <div className='ml-[15rem] flex-col flex justify-center items-center space-x-4 '>
            <ul className="relative flex flex-row gap-x-2 w-full">
                <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
                    <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
                        <span className={`size-14 flex justify-center items-center shrink-0 ${step1 ? "bg-[#25D366] text-white" : "bg-gray-100 text-gray-800"} font-medium  rounded-full`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <span className="ms-2 block text-sm font-medium text-gray-800">
                            Login
                        </span>
                    </div>
                    <div className={`w-full ml-5 h-px flex-10 ${step1 ? "bg-[#25D366]" : "bg-gray-100"} group-last:hidden`}></div>
                </li>
                <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
                    <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
                        <span className={`size-14 flex justify-center items-center shrink-0 ${step2 ? "bg-[#25D366] text-white" : "bg-gray-100 text-gray-800"} font-medium  rounded-full`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                                <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                                <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                            </svg>

                        </span>
                        <span className="ms-2 block text-sm font-medium text-gray-800">
                            Shipping
                        </span>
                    </div>
                    <div className={`w-full ml-6 h-px flex-10 ${step2 ? "bg-[#25D366]" : "bg-gray-200"} group-last:hidden`}></div>
                </li>
                <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
                    <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
                        <span className={`size-14 flex justify-center items-center shrink-0 ${step3 ? "bg-[#25D366] text-white" : "bg-gray-100 text-gray-800"} font-medium  rounded-full`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                            </svg>

                        </span>
                        <span className="ms-2 block text-sm font-medium text-gray-800">
                            Summary
                        </span>
                    </div>

                </li>
            </ul>

        </div>
    );
};

export default ProgressStepper;



