import { IBloodGroup } from "../interfaces/common";

export const BloodGroup: IBloodGroup[] = ['O+',  'O-' , 'B+' , 'B-' , 'AB+' , 'AB-' , 'A+' , 'A-']
export const patientCondition: string[] = [  "Critical",  "Serious",  "Stable",  "Acute",  "Chronic",  "Critical but Stable",  "Non-Critical",  "Terminal",  "Emergent",  "Urgent"];
export const IAuthRules = ['ADMIN' , "PATIENT" , "DOCTOR"]

export const IOptions = ['limit', 'page', 'sortBy', 'sortOrder']