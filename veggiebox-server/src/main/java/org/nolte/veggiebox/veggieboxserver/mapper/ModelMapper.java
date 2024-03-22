package org.nolte.veggiebox.veggieboxserver.mapper;

public interface ModelMapper<S,T> {

    public S mapTo(T t);

    public T mapFrom(S s);

}
