import { Observable } from 'rxjs';
import { DataResult, Result, DataListResult } from 'src/app/_entities/entitiesForResults';

export interface IBaseCRUD<T> {
   getall(): Observable<DataListResult<T>>; 
   getlistbyotherobject(foreignId: number): Observable<DataListResult<T>>;  // alternatif bir id ile dataları cekmek
   getById(id: number): Observable<DataResult<T>>; 
   add(entity: T): Observable<DataResult<T>> ;
   update(entity: T): Observable<DataResult<any>> ;
   delete(entity: T): Observable<Result>;
   
   url :string;
}
