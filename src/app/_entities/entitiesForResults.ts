class Result{
    success :boolean;
    message :string;
    kod :string;
}

class DataResult<T> extends Result{
    data :T;
}

class DataListResult<T> extends Result{
    data :T[];
}


export { Result,DataResult,DataListResult };