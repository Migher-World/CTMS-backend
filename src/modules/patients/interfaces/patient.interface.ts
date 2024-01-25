export interface IPatient {
    name: string;
    patientId: string;
    enrollmentDate: string;
    enrollmentSite: string;
    enrollmentStatus: string;
    birthDate: string;
    gender: string;
    nationality: string;
    consentRecived: boolean;
    commencedTreatment: boolean;
    droppedOut: boolean;
    visitCompleted: boolean;
    withinWindow: boolean;
    companyId: string;
}