import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DropdownModal from './DropDownModal';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import axios from 'axios';

const BookingForm = () => {
    const [isPitchDropdownOpen, setIsPitchDropdownOpen] = useState(false);
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [isCourtDropdownOpen, setIsCourtDropdownOpen] = useState(false);
    const [pitchInfo, setPitchInfo] = useState('');
    const [gender, setGender] = useState('');
    const [court, setCourt] = useState('');

    // const { values, setFieldValue } = useFormikContext(); // Access values from Formik context

    // console.log(useFormikContext());
    // const [availableTimes, setAvailableTimes] = useState([]);

    const pitchButtonRef = useRef(null);
    const genderButtonRef = useRef(null);
    const courtButtonRef = useRef(null);

    const handlePitchButtonClick = () => {
        setIsPitchDropdownOpen((prev) => !prev)
    }
    const handleGenderButtonClick = () => {
        setIsGenderDropdownOpen((prev) => !prev)
    }
    const handleCourtButtonClick = () => {
        setIsCourtDropdownOpen((prev) => !prev)
    }

    const validationSchema = Yup.object({
        customerName: Yup.string().required('Customer name is required'),
        phone: Yup.string().required('Phone number is required'),
        pitchInfo: Yup.string().required('Pitch info is required'),
        gender: Yup.string().required('Gender is required'),
        court: Yup.string().required('Court is required'),
        duration: Yup.string().required('Duration is required'),
        date: Yup.string().required('Date is required'),
        time: Yup.string().required('Time is required'),
        additionalNote: Yup.string(),
        discountCode: Yup.string(),
        amount: Yup.string().required('Payment status is required'),
        policies: Yup.bool().oneOf([true], 'You must accept the policies')
    });

    const [values, setValues] = useState({
        duration: '',
        date: '',
        time: ''
    });
    // const [availableTimes, setAvailableTimes] = useState([]);

    const [availableTimes, setAvailableTimes] = useState([
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', // Dummy data
        '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
        '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
    ]);
    const dateContainerRef = useRef(null);
    const timeContainerRef = useRef(null);

    const handleDurationClick = (duration) => {
        setValues({ ...values, duration });
        const dummyData = getDummyDataForDuration(duration);
        setAvailableTimes(dummyData);
    };

    const handleDateClick = (date) => {
        setValues({ ...values, date });
        const dummyData = getDummyDataForDate(date);
        setAvailableTimes(dummyData);
    };

    const getDummyDataForDuration = (duration) => {
        switch (duration) {
            case '60 Mins':
                return ['09:00 AM', '10:00 AM', '11:00 AM'];
            case '90 Mins':
                return ['09:00 AM', '10:30 AM', '12:00 PM'];
            case '120 Mins':
                return ['09:00 AM', '11:00 AM', '1:00 PM'];
            // Add more cases for other durations
            default:
                return [];
        }
    };

    const getDummyDataForDate = (date) => {
        // You can add logic to return dummy data based on the selected date
        // For now, return an empty array
        return [];
    };

    // const fetchAvailableTimes = async () => {
    //     const { duration, date } = values;
    //     if (duration && date) {
    //         try {
    //             const response = await axios.get('/api/available-times', {
    //                 params: {
    //                     duration,
    //                     date
    //                 }
    //             });
    //             setAvailableTimes(response.data);
    //         } catch (error) {
    //             console.error('Error fetching available times:', error);
    //         }
    //     }
    // };

    // useEffect(() => {
    //     // Simulate fetching available times from API
    //     const fetchAvailableTimes = async () => {
    //         // Simulated delay for API response (remove in real implementation)
    //         await new Promise(resolve => setTimeout(resolve, 1000));
    //         // Mock API response data
    //         setAvailableTimes([
    //             '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', // Dummy data
    //             '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    //             '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    //             '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
    //         ]);
    //     }
    //     fetchAvailableTimes();
    // }, [values.duration, values.date]);

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            // Simulated delay for API response (remove in real implementation)
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Mock API response data
            setAvailableTimes(getDummyDataForDuration(values.duration));
        };
        fetchAvailableTimes();
    }, [values.duration, values.date]);

    const scroll = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = 150; // Adjust based on desired scroll distance
            ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // useEffect(() => {
    //     const fetchAvailableTimes = async (duration, date) => {
    //         if (duration && date) {
    //             try {
    //                 const response = await axios.get('/api/available-times', {
    //                     params: {
    //                         duration,
    //                         date
    //                     }
    //                 });
    //                 setAvailableTimes(response.data);
    //             } catch (error) {
    //                 console.error('Error fetching available times:', error);
    //             }
    //         }
    //     };

    //     fetchAvailableTimes(values.duration, values.date);
    // }, [values.duration, values.date]);

    return (
        <Formik
            initialValues={{
                customerName: '',
                phone: '',
                pitchInfo: '',
                gender: '',
                court: '',
                duration: '',
                date: '',
                time: '',
                additionalNote: '',
                discountCode: '',
                amount: '',
                policies: false
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ setFieldValue, values }) => (
                <Form className="p-6 bg-white rounded-lg shadow-lg w-96 relative">
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
                        {/* <p>{values.phone}</p> */}
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
                        <label className="block text-gray-700">Duration Selection</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['60 Mins', '90 Mins', '120 Mins', '180 Mins', '240 Mins'].map((duration) => (
                                <button
                                    key={duration}
                                    className={`p-2 border border-gray-300 rounded ${values.duration === duration ? 'bg-blue-500 text-white' : ''}`}
                                    onClick={() => handleDurationClick(duration)}
                                >
                                    {duration}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date Selection</label>
                        <div className="flex items-center">
                            <button type="button" onClick={() => scroll(dateContainerRef, 'left')} className="p-2">
                                <MdChevronLeft size={24} />
                            </button>
                            <div ref={dateContainerRef} className="flex space-x-2 overflow-x-hidden">
                                {['29 Oct', '30 Oct', '31 Oct', '1 Nov', '2 Nov', "3 Nov", "4 Nov", "5 Nov", "6 Nov", "7 Nov"].map((date) => (
                                    <button
                                        key={date}
                                        className={`p-2 focus:bg-blue-300  hover:bg-blue-300 border border-gray-300 rounded ${values.date === date ? 'bg-blue-500 text-white' : ''}`}
                                        onClick={() => handleDateClick(date)}
                                    >
                                        {date}
                                    </button>
                                ))}
                            </div>
                            <button type="button" onClick={() => scroll(dateContainerRef, 'right')} className="p-2">
                                <MdChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Available Time</label>
                        <div className="flex items-center">
                            <button type="button" onClick={() => scroll(timeContainerRef, 'left')} className="p-2">
                                <MdChevronLeft size={24} />
                            </button>
                            <div ref={timeContainerRef} className="flex space-x-2 overflow-x-hidden">
                                {availableTimes.map((time) => (
                                    <button
                                        key={time}
                                        className={`p-2 border border-gray-300 rounded ${values.time === time ? 'bg-blue-500 text-white' : ''}`}
                                        onClick={() => setFieldValue('time', time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                            <button type="button" onClick={() => scroll(timeContainerRef, 'right')} className="p-2">
                                <MdChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Additional Note</label>
                        <Field name="additionalNote" as="textarea" className="w-full p-2 border border-gray-300 rounded" />
                        <ErrorMessage name="additionalNote" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Discount Code</label>
                        <Field name="discountCode" type="text" className="w-full p-2 border border-gray-300 rounded" />
                        <ErrorMessage name="discountCode" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Amount</label>
                        <div className="flex flex-col">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="amount" value="unpaid" />
                                <span className="ml-2">Unpaid</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="amount" value="partly_paid" />
                                <span className="ml-2">Partly Paid</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="amount" value="already_paid" />
                                <span className="ml-2">Already Paid</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Subtotal</label>
                        <div className="text-right">299.00 SAR</div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Discount</label>
                        <div className="text-right">-20.00 SAR</div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Total Amount</label>
                        <div className="text-right">279.00 SAR</div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Field type="checkbox" name="policies" id="policies" />
                        <label htmlFor="policies" className="text-gray-700">I have read the policies and accept them</label>
                        <ErrorMessage name="policies" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Continue</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default BookingForm;
