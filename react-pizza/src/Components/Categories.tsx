import { type } from '@testing-library/user-event/dist/type'
import { useWhyDidYouUpdate } from 'ahooks';
import React from 'react'

type CategoriesItem = {
  value: number;
  onChangeCategory: (idx: number) => void;
}
const Categories: React.FC <CategoriesItem> = React.memo(
  ({value, onChangeCategory}) => {

    const categories = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']
    useWhyDidYouUpdate('categories', {value, onChangeCategory})
  
    return (
      <div className="categories">
      <ul>
        {
          categories.map((catigoriesName, id) => (
            <li key={id} onClick={() => onChangeCategory(id)} className={value === id ? "active":''}>
            {catigoriesName}
          </li>
          ))
        }
        
  
      </ul>
    </div>
    )
  }
)
export default Categories;