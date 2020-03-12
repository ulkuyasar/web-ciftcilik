import { Observable } from 'rxjs';

export interface IBaseCRUD<T> {
   getall(): Observable<T[]>; 
   getById(id: number): Observable<T>; 
   add(entity: T): Observable<T> ;
   update(entity: T): Observable<any> ;
   delete(entity: T): Observable<any>;
   
   url :string;
}
