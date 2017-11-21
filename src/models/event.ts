export class Event {
  id: string;
  organizerId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  category: string;
  subCategory: string;
  location: {
    name: string;
    address: string;
    description: string;
  };
  description: string;
  imageUrl: string;
}
