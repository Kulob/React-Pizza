import React from "react";
import qs from "qs";
import axios, { Axios } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { setCategoriesId, setCurrentPage, setFilters,selectFillter, filterSliceState } from "../Components/Redux/Slice/filterSlice";
import { fetchPizzas, FetchPizzasArgs} from "../Components/Redux/Slice/pizzaSlice";

import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import { sorting } from "../Components/Sort";
import PizzaBlock from "../Components/PizzaBlock";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import Pagination from "../Components/Pagination";

import { selectPizzaData } from "../Components/Redux/Slice/pizzaSlice";
import { useAppDispatch } from "../Components/Redux/store";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {categoriesId, sort, currentPage, searchValue} = useSelector(selectFillter);
  const {items, status} = useSelector(selectPizzaData);
  
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

   
  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoriesId(idx))
  }, []);

  const onChangePage = React.useCallback((page: number) => {
      dispatch(setCurrentPage(page))
  }, []);
  const getPizzas = async() => {
    
    const sortBy = sort.sortProperty.replace('_', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue;
    const catigories = categoriesId > 0 ? `category=${categoriesId}` : ''
   
    // axios
    // .get(`https://633c9178f2b0e623dc6496be.mockapi.io/items?page=${currentPage}&limit=4&${catigories}&sortBy=${sortBy}&order=${order}${search}`)
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   })
    dispatch(  
      fetchPizzas({
      sortBy,
      order,
      search,
      catigories,
      currentPage
    }),
    ) 
    window.scrollTo(0, 0)
  }
  // Если был первый рендер, то URL -  параметры и сохраняем в REDUX
  React.useEffect(() =>{
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sorting.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true; 
    }
  }, [])

  //Если был первый рейдер то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
      window.scrollTo(0, 0);
  }, [categoriesId, sort.sortProperty, searchValue, currentPage]);

  //Если изменили параметры и был первый рендер
  React.useEffect(() =>{
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoriesId,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoriesId, sort.sortProperty, currentPage] )
  return (
    <>
              <div className="content__top">
            <Categories value={categoriesId} onChangeCategory={onChangeCategory}/>
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === 'error' ? (
            <div className="content__error-info">
              <h2>Произошла ошибка!!!! </h2>
              <p>К сожалениюб не удалось получить пиццы. Попробуйте повторить попытку позжею</p>
            </div>
           ) :(status === 'loading'
              ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
              : items.map((obj: any) =><PizzaBlock {...obj} key={obj.id} />))}
          </div>
          <Pagination currentPage={currentPage} onChangePage = {onChangePage}/>
    </>
  )
}
export default Home;