import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../api'
import ErrorMsg from '../ErrorMsg'
import './categoryFilter.css'

const CategoryFilter = ({ onFilterChange }) => {

    const { data: categories, isLoading, isError, error } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    })

    { isError && <ErrorMsg error={error.message} /> }

    return (
        <select
            onChange={onFilterChange}
            name="categoryId"
            id="categoryId"
            className='filter_select'>

            <option value=''>{isLoading ? 'Loading...' : 'Alle categorieën'}</option>
            {categories?.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
    )
}

export default CategoryFilter