import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DropdownModal from './DropDownModal';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import axios from 'axios';
import { format } from 'date-fns'; // Import date-fns for date formatting

const BookingForm4 = () => {
    const [isPitchDropdownOpen, setIsPitchDropdownOpen] = useState(false);
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [isCourtDropdownOpen, setIsCourtDropdownOpen] = useState(false);
    const [pitchInfo, setPitchInfo] = useState('');
    const [gender, setGender] = useState('');
    const [court, setCourt] = useState('');
    const [dateArray, setDateArray] = useState([]);
    const [initialDate, setInitialDate] = useState('');

    const [loadingTimes, setLoadingTimes] = useState(false);

    const pitchButtonRef = useRef(null);
    const genderButtonRef = useRef(null);
    const courtButtonRef = useRef(null);

    const handlePitchButtonClick = () => {
        setIsPitchDropdownOpen((prev) => !prev);
    };

    const handleGenderButtonClick = () => {
        setIsGenderDropdownOpen((prev) => !prev);
    };

    const handleCourtButtonClick = () => {
        setIsCourtDropdownOpen((prev) => !prev);
    };

    const generateDateArray = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }
        setDateArray(dates);
        setInitialDate(dates[0]);
        return dates;
    };

    useEffect(() => {
        generateDateArray();
    }, []);

    const validationSchema = Yup.object({
        customerName: Yup.string().required('Customer name is required'),
        phone: Yup.string().required('Phone number is required'),
        pitchInfo: Yup.string().required('Pitch info is required'),
        gender: Yup.string().required('Gender is required'),
        court: Yup.string().required('Court is required'),
        duration: Yup.string().required('Duration is required'),
        date: Yup.string().required('Date is required'),
        time: Yup.string().required('Time is required'),
        additionalNote: Yup.string().nullable(),
        discountCode: Yup.string().nullable(),
        amount: Yup.string().required('Payment status is required'),
        policies: Yup.bool().oneOf([true], 'You must accept the policies')
    });

    const [availableTimes, setAvailableTimes] = useState([]);

    const dateContainerRef = useRef(null);
    const timeContainerRef = useRef(null);

    // const handleDurationClick = (duration, setFieldValue) => {
    //     setFieldValue('duration', duration);
    //     const dummyData = getDummyDataForDuration(duration);
    //     setAvailableTimes(dummyData);
    // };

    // const handleDateClick = (date, setFieldValue) => {
    //     setFieldValue('date', date);
    //     const dummyData = getDummyDataForDate(date);
    //     setAvailableTimes(dummyData);
    // };

    // const getDummyDataForDuration = (duration) => {
    //     switch (duration) {
    //         case '60 Mins':
    //             return ['09:00 AM', '10:00 AM', '11:00 AM'];
    //         case '90 Mins':
    //             return ['09:00 AM', '10:30 AM', '12:00 PM'];
    //         case '120 Mins':
    //             return ['09:00 AM', '11:00 AM', '1:00 PM'];
    //         default:
    //             return [];
    //     }
    // };

    const getDummyDataForDate = (date) => {
        // Return dummy data based on the selected date
        return availableTimes;
    };

    const scroll = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = 150;
            ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const handleDurationClick = (duration, setFieldValue, values) => {
        setFieldValue('duration', duration);
        updateAvailableTimes(duration, values.pitchInfo, values.court, values.date);
    };

    const handleDateClick = (date, setFieldValue, values) => {
        setFieldValue('date', date);
        updateAvailableTimes(values.duration, values.pitchInfo, values.court, date);
    };

    // const updateAvailableTimes = (duration, pitchInfo, court, date) => {
    //     // Fetch available times based on selected fields. Replace with your API call.
    //     const dummyData = getDummyDataForSelection(duration, pitchInfo, court, date);
    //     setAvailableTimes(dummyData);
    // };


    const updateAvailableTimes = async (duration, pitchInfo, court, date) => {
        setLoadingTimes(true); // Set loading state
        try {
            // Replace with your actual API call or data fetching logic
            const dummyData = await getDummyDataForSelection(duration, pitchInfo, court, date);
            setAvailableTimes(dummyData);
        } catch (error) {
            console.error('Error fetching available times:', error);
        } finally {
            setLoadingTimes(false); // Clear loading state
        }
    };



    // const getDummyDataForSelection = (duration, pitchInfo, court, date) => {
    //     if (duration && pitchInfo && court && date) {
    //         switch (duration) {
    //             case '60 Mins':
    //                 return ['09:00 AM', '10:00 AM', '11:00 AM'];
    //             case '90 Mins':
    //                 return ['09:00 AM', '10:30 AM', '12:00 PM'];
    //             case '120 Mins':
    //                 return ['09:00 AM', '11:00 AM', '1:00 PM'];
    //             default:
    //                 return [];
    //         }
    //     }
    //     return [];
    // };

    const getDummyDataForSelection = (duration, pitchInfo, court, date) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (duration && pitchInfo && court && date) {
                    switch (duration) {
                        case '60 Mins':
                            resolve(['09:00 AM', '10:00 AM', '11:00 AM']);
                            break;
                        case '90 Mins':
                            resolve(['09:00 AM', '10:30 AM', '12:00 PM']);
                            break;
                        case '120 Mins':
                            resolve(['09:00 AM', '11:00 AM', '1:00 PM']);
                            break;
                        default:
                            resolve([]);
                    }
                } else {
                    resolve([]);
                }
            }, 1000); // Simulating loading time with setTimeout (remove in production)
        });
    };
    const FormikContextComponent = () => {
        const { values, setFieldValue } = useFormikContext();

        useEffect(() => {
            if (values.duration && values.pitchInfo && values.court && values.date) {
                updateAvailableTimes(values.duration, values.pitchInfo, values.court, values.date);
            }
        }, [values.duration, values.pitchInfo, values.court, values.date]);

        return null;
    };
    // FormikContextComponent()

    // const handleSubmit = (values, { setSubmitting, resetForm }) => {
    //     // Perform actions like API calls, data processing, etc.
    //     console.log('Submitting form with values:', values);

    // Example: Post data to an API using axios
    // axios.post('https://example.com/api/submit', values)
    //     .then(response => {
    //         console.log('Form submitted successfully!', response.data);
    //         // Optionally, perform any success actions
    //     })
    //     .catch(error => {
    //         console.error('Error submitting form:', error);
    //         // Optionally, handle errors or show error messages
    //     })
    //     .finally(() => {
    //         setSubmitting(false); // Reset submitting state
    //         resetForm(); // Clear form values
    //     });
    // };

    return (
        <Formik
            initialValues={{
                customerName: '',
                phone: '',
                pitchInfo: '',
                gender: '',
                court: '',
                duration: '60 Mins',
                date: initialDate,
                time: '',
                additionalNote: '',
                discountCode: '',
                amount: '',
                policies: false
            }}
            validationSchema={validationSchema}
            enableReinitialize
            // onSubmit={handleSubmit}
            onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                // Perform any validation or additional logic before submitting
                console.log(values);
                setSubmitting(false)
                resetForm()
                // const formattedDate = format(new Date(values.date), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
                // const formattedDate = new Date(values.date).toISOString().slice(0, -1) + 'Z';

                const dateTimeString = `${values.date} ${values.time}`;
                const dateTime = new Date(dateTimeString);

                // Convert the Date object to ISO 8601 format with milliseconds and 'Z'
                const formattedDate = dateTime.toISOString();

                console.log(formattedDate);

                setPitchInfo('');
                setGender('');
                setCourt('');
                setAvailableTimes([]);


                resetForm({
                    values: {
                        customerName: '',
                        pitchInfo: '',
                        gender: '',
                        court: '',
                        duration: '60 Mins',
                        date: initialDate,
                        time: '',
                        additionalNote: '',
                        discountCode: '',
                        amount: '',
                        policies: false
                    }
                });

                // Example: Post data to an API using axios
                // axios.post('https://example.com/api/submit', values)
                //     .then(response => {
                //         console.log('Form submitted successfully!', response.data);
                //         // Optionally, perform any success actions like showing a success message
                //     })
                //     .catch(error => {
                //         console.error('Error submitting form:', error);
                //         // Optionally, handle errors or show error messages
                //     })
                //     .finally(() => {
                //         setSubmitting(false); // Reset submitting state
                //     });
            }}
        >
            {({ setFieldValue, values, isSubmitting }) => (
                <Form className="p-6 bg-white rounded-lg shadow-lg w-96 relative">
                    <FormikContextComponent />
                    <div className="mb-4">
                        <label className="block text-gray-700">Customer Name</label>
                        <Field name="customerName" type="text" className="w-full p-2 border border-gray-300 rounded" />
                        <ErrorMessage name="customerName" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Mobile Number</label>
                        <PhoneInput
                            country={'in'}
                            value={values.phone}
                            onChange={(phone) => setFieldValue('phone', phone)}
                            containerStyle={{ width: '100%' }}
                            inputStyle={{ width: '100%' }}
                        />
                        <ErrorMessage name="phone" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Pitch Info</label>
                        <button
                            type="button"
                            ref={pitchButtonRef}
                            onClick={handlePitchButtonClick}
                            className=" flex justify-between items-center pitch w-full p-2 border border-gray-300 rounded text-left">
                            <p>
                                {pitchInfo || 'Select Pitch'}
                            </p>
                            <MdKeyboardArrowDown />
                        </button>
                        <ErrorMessage name="pitchInfo" component="div" className="text-red-600 text-sm" />
                        {isPitchDropdownOpen && (
                            <DropdownModal
                                isOpen={isPitchDropdownOpen}
                                onClose={(selectedPitch) => {
                                    setPitchInfo(selectedPitch);
                                    setFieldValue('pitchInfo', selectedPitch);
                                    setIsPitchDropdownOpen(false);
                                }}
                                buttonRef={pitchButtonRef}
                                options={['Court A', 'Court B']}
                            />
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Gender</label>
                        <button
                            type="button"
                            ref={genderButtonRef}
                            onClick={handleGenderButtonClick}
                            className="pitch flex justify-between items-center w-full p-2 border border-gray-300 rounded text-left">
                            <p>
                                {gender || 'Select Gender'}
                            </p>
                            <MdKeyboardArrowDown />
                        </button>
                        <ErrorMessage name="gender" component="div" className="text-red-600 text-sm" />
                        {isGenderDropdownOpen && (
                            <DropdownModal
                                isOpen={isGenderDropdownOpen}
                                onClose={(selectedGender) => {
                                    setGender(selectedGender);
                                    setFieldValue('gender', selectedGender);
                                    setIsGenderDropdownOpen(false);
                                }}
                                buttonRef={genderButtonRef}
                                options={['Male', 'Female', 'Other']}
                            />
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Court</label>
                        <button
                            type="button"
                            ref={courtButtonRef}
                            onClick={handleCourtButtonClick}
                            className="pitch flex justify-between items-center w-full p-2 border border-gray-300 rounded text-left">
                            <p>
                                {court || 'Select Court'}
                            </p>
                            <MdKeyboardArrowDown />
                        </button>
                        <ErrorMessage name="court" component="div" className="text-red-600 text-sm" />
                        {isCourtDropdownOpen && (
                            <DropdownModal
                                isOpen={isCourtDropdownOpen}
                                onClose={(selectedCourt) => {
                                    setCourt(selectedCourt);
                                    setFieldValue('court', selectedCourt);
                                    setIsCourtDropdownOpen(false);
                                }}
                                buttonRef={courtButtonRef}
                                options={['Court 1', 'Court 2', 'Court 3']}
                            />
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Duration</label>
                        <div className="flex justify-around">
                            {['60 Mins', '90 Mins', '120 Mins'].map((duration) => (
                                <button
                                    key={duration}
                                    type="button"
                                    onClick={() => handleDurationClick(duration, setFieldValue, values)}
                                    className={`${values.duration === duration ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                        } p-2 rounded`}
                                >
                                    {duration}
                                </button>
                            ))}
                        </div>
                        <ErrorMessage name="duration" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Date</label>
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() => scroll(dateContainerRef, 'left')}
                                className="p-1">
                                <MdChevronLeft size={24} />
                            </button>
                            <div className="flex space-x-2 overflow-x-scroll scrollbar-hide" ref={dateContainerRef}>
                                {dateArray?.map((dateString) => {
                                    const dateObj = new Date(dateString);
                                    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
                                    return (
                                        <button
                                            key={dateString}
                                            type="button"
                                            onClick={() => handleDateClick(dateString, setFieldValue, values)}
                                            className={`${values.date === dateString ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                                } p-2 rounded whitespace-nowrap`}
                                        >
                                            {formattedDate}
                                        </button>
                                    );
                                })}
                            </div>


                            <button
                                type="button"
                                onClick={() => scroll(dateContainerRef, 'right')}
                                className="p-1">
                                <MdChevronRight size={24} />
                            </button>
                        </div>
                        <ErrorMessage name="date" component="div" className="text-red-600 text-sm" />

                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Time</label>
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() => scroll(timeContainerRef, 'left')}
                                className="p-1">
                                <MdChevronLeft size={24} />
                            </button>
                            <div
                                ref={timeContainerRef}
                                className="flex space-x-2 overflow-x-scroll scrollbar-hide">
                                {/* {loadingTimes ? ( */}
                                {/* //     <div className="p-2 rounded bg-gray-200 text-gray-700">
                                //         Loading times...
                                //     </div>
                                // ) : ( */}
                                {availableTimes.map((time) => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => setFieldValue('time', time)}
                                        className={`${values.time === time ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                            } p-2 rounded whitespace-nowrap`}
                                    >
                                        {time}
                                    </button>
                                ))
                                }
                                {/* )} */}

                            </div>
                            <button
                                type="button"
                                onClick={() => scroll(timeContainerRef, 'right')}
                                className="p-1">
                                <MdChevronRight size={24} />
                            </button>
                        </div>
                        <ErrorMessage name="time" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Additional Note</label>
                        <Field name="additionalNote" as="textarea" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Discount Code</label>
                        <Field name="discountCode" type="text" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Payment Status</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center">
                                <Field type="radio" name="amount" value="paid" className="mr-2" />
                                Paid
                            </label>
                            <label className="flex items-center">
                                <Field type="radio" name="amount" value="unpaid" className="mr-2" />
                                Unpaid
                            </label>
                        </div>
                        <ErrorMessage name="amount" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <Field type="checkbox" name="policies" className="mr-2" />
                            I agree to the policies.
                        </label>
                        <ErrorMessage name="policies" component="div" className="text-red-600 text-sm" />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </Form>
            )
            }
        </Formik >
    );
};

export default BookingForm4;
