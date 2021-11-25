import { makeRequest } from '../helpers/make-request';

const URL = '/event-listing/data/events.json';

export interface APIEvent {
  id: string;
  name: string;
  date: string;
  city: string;
  genre: string;
  image: string;
}

export class API {
  public static async getEvents(): Promise<APIEvent[]> {
    return makeRequest<APIEvent[]>(URL);
  }
}
