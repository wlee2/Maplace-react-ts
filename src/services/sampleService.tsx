import { Observable } from "rxjs";

export default class SampleService {
  getData(): Observable<any> {
    return new Observable(observer => {
      let watchID: number;

      if ("geolocation" in navigator) {
        watchID = navigator.geolocation.watchPosition(
          data => observer.next(data),
          error => observer.error(error)
        );
      } else {
        observer.error("Geolocation not available");
      }

      return {
        unsubscribe() {
          navigator.geolocation.clearWatch(watchID);
        }
      };
    });
  }
}
