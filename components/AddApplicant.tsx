import React, { useState } from 'react';

import styles from '../styles/Home.module.css'

type AddApplicantProps = {
    onAddApplicant: (name: string, phone: string, screener?: string) => void;
}

const AddApplicant: React.FC<AddApplicantProps> = (props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [screener, setScreener] = useState('');

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (screener && screener.length > 0) {
            props.onAddApplicant(name, phone, screener);
        } else {
            props.onAddApplicant(name, phone);
        }

    }

    return (
        <form className={styles.addApplicant} onSubmit={submitHandler}>
            <div className={styles.formInput}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input type="text" id="add-applicant-name" value={name}
                       onChange={(event) => {
                           setName(event.target.value)
                       }}
                />
            </div>
            <div className={styles.formInput}>
                <label className={styles.label} htmlFor="phone">Phone Number</label>
                <input className={styles.phoneInput} type="number" id="add-applicant-phone" value={phone}
                       onChange={(event) => {
                           setPhone(event.target.value)
                       }}
                />
            </div>
            <div className={styles.formInput}>
                <label className={styles.label} htmlFor="screener">Screener</label>
                <input type="text" id="add-applicant-screener" value={screener}
                       onChange={(event) => {
                           setScreener(event.target.value)
                       }}
                />
            </div>

            <button>Add Applicant</button>
        </form>
    );
}

export default AddApplicant;