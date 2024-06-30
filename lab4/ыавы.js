import React, { useState } from 'react';

const CreateRange = ({ firstValue, step }) => {
    const [values, setValues] = useState([parseInt(firstValue)]);

    const addNextValue = () => {
        const lastValue = values[values.length - 1];
        const nextValue = lastValue + parseInt(step);
        setValues([...values, nextValue]);
    };

    return (
        <div>
            {values.join(' ')} <span onClick={addNextValue} style={{cursor: 'pointer'}}>…</span>
        </div>
    );
};

export default CreateRange;
ReactDOM.render(
    <CreateRange firstValue="10" step="3" />,
    document.getElementById('root')
);