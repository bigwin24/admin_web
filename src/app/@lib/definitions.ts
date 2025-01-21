export interface User {
  username: string;
  name: string;
  email: string;
  desc: string;
  createdAt: string;
  hasSmartCoordiUnread: number;
  researches: Research[];
  uid: string;
  profile: Profile;
  hospitals: Hospital[];
  summaries: Summaries;
}

export interface Research {
  id: number;
  uid: string;
  cls: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface Profile {
  id: number;
  uid: string;
  action: string;
  sex: string;
  birth: string;
  age: number;
  ageGroup: string;
  height: number;
  weight: number;
  bmi: number;
  ibw: number;
  obe: number;
  diabetesOrPre: string;
  diabetes: any;
  previousDiabetes: any;
  diabetesDiagnosisDate: any;
  takeDiabetesMedication: any;
  useInsulin: any;
  hypertensionOrPre: string;
  hypertensionDiagnosisDate: any;
  takeHypertensionMedication: any;
  drinking: string;
  drinkingPerWeek: any;
  alcoholUnit: any;
  smoking: string;
  quitDuration: any;
  cigarettePacks: any;
  smokingDuration: any;
  enabler: boolean;
  pa: string;
  familyCvd: any;
  familyDm: any;
  familyHtn: any;
  noInterest: any;
  depression: any;
  pregnantStatus: string;
  conceptionDate: any;
  dueDate: any;
  childBirth: any;
  weightBeforePregnancy: any;
  pregnancyWeek: any;
  pregnancyStage: any;
  feeding: any;
  firstChild: any;
  isTwin: any;
  twinCount: any;
  birthName: any;
  takeAspirinMedication: any;
  takeThyroidMedication: any;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  comorbidities: any[];
  pregnancies: Pregnancy[];
}

export interface Pregnancy {
  id: number;
  uid: string;
  pregnantStatus: string;
  conceptionDate: string;
  dueDate: string;
  weightBeforePregnancy: number;
  pregnancyStage: any;
  hasGdm: boolean;
  gdmDiagnosisDate: string;
  hasPih: boolean;
  pihDiagnosisDate: string;
  hasPet: boolean;
  petDiagnosisDate: any;
  hasPp: boolean;
  ppDiagnosisDate: string;
  childBirth: string;
  lastWeight: any;
  currentWeight: number;
  firstChild: boolean;
  isTwin: boolean;
  twinCount: any;
  deliveryType: string;
  isEmergency: boolean;
  csectionReason: string;
  csectionReasonWrited: string;
  feeding: string;
  lastBreastfeedDate: any;
  deathDate: any;
  deathReason: any;
  aid: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  profileId: number;
}

export interface Hospital {
  hid: string;
  name: string;
  dtid: string;
  doctorName: string;
  rid: string;
  favorite: boolean;
  monitoring: boolean;
  monitoringDate: any;
  hasMessage: boolean;
}

export interface Summaries {
  raw: any;
  result: any[];
}
