export class Meeting {
  meetedUserId: string;
  meetingDate: Date;
  rssi: number;

  constructor(obj: Partial<Meeting>) {
    Object.assign(this, obj);
  }
}
