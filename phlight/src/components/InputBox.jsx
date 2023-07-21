import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InputBox = ({ inputAutofill, getFlights }) => {
    const list = inputAutofill;
    const [options, updateOptions] = useState([]);
    const [inputStr, updateInputStr] = useState('');

    const updateList = (e) => {
        const newStr = e.target.value ? e.target.value : e.target.innerHTML;
        updateInputStr(newStr);
        const str = new RegExp(newStr, 'i');
        let tempOptions = [];
        if (e.type !== 'click') {
            for (let key in list) {
                if (key === 'length' || !Object.prototype.hasOwnProperty.call(list, key)) continue;
                if (key.match(str)) {
                    tempOptions.push(key);
                }
                if (tempOptions.length > 10) {
                    updateOptions(tempOptions);
                    break;
                }
            }
        }
        else {
            getFlights(newStr);
        }
        updateOptions(tempOptions);
    };

    return (
        <div>
            <input type="text" className="form-control flex-grow-2" placeholder="Yup, Right Here" aria-label="City/Airport Code" aria-describedby="station" onInput={updateList} value={inputStr} />
            <ul className="list-group position-absolute">
                {inputStr && options.map(
                    item => (
                        <li className="list-group-item" key={item} onClick={updateList}>{item}</li>
                    )
                )}
            </ul>
        </div>
    );
};

InputBox.propTypes = {
    inputAutofill: PropTypes.object.isRequired,
    getFlights: PropTypes.func.isRequired,
};

export default InputBox;
