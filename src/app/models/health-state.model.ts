export class HealthState {
  message: string;
  hasSymptom: boolean;
  isDiagnotic: boolean;

  constructor(obj: Partial<HealthState>) {
    Object.assign(this, obj);
  }

}
