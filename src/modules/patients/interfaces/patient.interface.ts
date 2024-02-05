export enum EnrollmentStatus {
    ENROLLED = 'Enrolled',
    WITHDRAWN = 'Withdrawn',
    COMPLETED = 'Completed',
    ON_HOLD = 'On Hold',
    SCREENING_IN_PROGRESS = 'Screening In Progress',
    SCREENING_FAILED = 'Screening Failed',
    INACTIVE = 'Inactive',
    PENDING_CONSENT = 'Pending Consent',
    PENDING_SCREENING_RESULTS = 'Pending Screening Results',
}

export interface IPatient {
    name: string;
    patientId: string;
    enrollmentDate: string;
    enrollmentStatus: EnrollmentStatus;
    birthDate: string;
    gender: 'male' | 'female';
    nationality: string;
    consentReceived: boolean;
    commencedTreatment: boolean;
    droppedOut: boolean;
    visitCompleted: boolean;
    withinWindow: boolean;
    companyId: string;
}