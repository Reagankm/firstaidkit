import React from 'react';
import styles from '../styles/Home.module.css';
import type {Applicant} from '../pages/api/lib/applicant';

type ApplicantListProps = {
    applicants: Applicant[];
}

const ApplicantList: React.FC<ApplicantListProps> = (props) => {
    const formatPhone = (phoneNumber: string) => {
        if (phoneNumber.length !== 10) {
            return phoneNumber;
        }

        return `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`;
    }

    return (
        <ul className={styles['applicant-list']}>
            {props.applicants.map(a => <li className={styles.applicant} key={a.name}>
                    <div className={styles.name}>{a.name}</div>
                    <div className={styles.phone}>{formatPhone(a.phone)}</div>
                {/*{a.screener && <div className={styles.screener}>{a.screener}</div>}*/}
                <div className={styles.screener}>{a.screener ? a.screener : 'null'}</div>
                </li>
            )}
        </ul>
    );
}

export default ApplicantList;