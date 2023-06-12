import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getPaginatedPosts } from '../../api'
import PulseLoader from "react-spinners/PulseLoader"
import PostCard from '../PostCard';
import Pagination from '../Pagination';
import CategoryFilter from '../CategoryFilter'
import ErrorMsg from '../ErrorMsg';
import './pagitatedPosts.css'

const PaginatedPosts = () => {

    // filter by category
    const [categoryId, setCategoryId] = useState(null)

    const onFilterChange = (e) => {
        const filterBy = e.target.value
        filterBy == '' ? setCategoryId(null) : setCategoryId(filterBy)
    }

    //pagination

    const [pageNumber, setPageNumber] = useState(1)

    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ['posts', pageNumber, categoryId],
        keepPreviousData: true,
        queryFn: () => getPaginatedPosts(pageNumber, categoryId)
    })

    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
    }

    return (
        <section className='blog'>

            {isLoading && <PulseLoader color='#f27623' size={10} />}
            {isError && <ErrorMsg error={error.message} />}

            <div className='paginated_posts_filter'>
                <CategoryFilter onFilterChange={onFilterChange} />
            </div>

            <ul className='paginated_posts'>
                {posts?.data.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </ul>

            <Pagination posts={posts} changePage={changePage} />
        </section>
    )
}

export default PaginatedPosts