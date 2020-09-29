import {Injectable} from '@angular/core';
import {FbResponse, Product, ProductId} from './interfaces';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  type = 'phone';
  cartProducts: Product [] = [];

  constructor(private http: HttpClient) {
  }

  create(order): any {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(
        map((res: FbResponse) => {
          return {
            ...order,
            id: res.name,
            date: new Date(order.date)
          };
        })
      );
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/orders.json`).pipe(
      map(res => {
        if (res) {
          return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }));
        }
        return null;
      })
    );
  }

  remove(id: ProductId): any {
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`);
  }

}
