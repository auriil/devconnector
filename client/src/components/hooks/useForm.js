import { useState } from 'react';

const useForm = (callback) => {

    const [values, setValues] = useState({});

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
    };

    const handleChange = (event) => {
        event.persist();
        if(event.target.type === 'checkbox')
            setValues(values => ({ ...values, [event.target.name]: event.target.checked }));
        else
            setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    return {
        setValues,
        handleChange,
        handleSubmit,
        values
    }
};

export default useForm;