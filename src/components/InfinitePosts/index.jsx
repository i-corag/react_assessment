import { useInfiniteQuery } from '@tanstack/react-query'
import { getInfinitePosts } from '../../api'
import { useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader"
import CategoryFilter from '../CategoryFilter'
import PostCard from '../PostCard'
import ErrorMsg from '../ErrorMsg'
import './infinitePosts.css'

const InfinitePosts = () => {

    const [categoryId, setCategoryId] = useState(null)

    const onFilterChange = (e) => {
        const filterBy = e.target.value
        filterBy == '' ? setCategoryId(null) : setCategoryId(filterBy)
    }

    const { data: posts, fetchNextPage, isFetching, hasNextPage, error, status } = useInfiniteQuery({
        queryKey: ['posts', categoryId],
        queryFn: ({ pageParam = 1 }) => getInfinitePosts(pageParam, categoryId),
        getNextPageParam: (lastPage, allPages) => {
            const maxPages = lastPage.last_page;
            const nextPage = allPages.length + 1;
            return nextPage <= maxPages ? nextPage : undefined;
        }
    })

    return (
        <section className='infinite_posts_container'>

            {status === 'error' && <ErrorMsg error={error?.message} />}

            <div className='infinite_posts_filter'>
                <CategoryFilter onFilterChange={onFilterChange} />
            </div>

            <ul className='infinite_posts'>
                {posts?.pages.map(page => page.data.map(post =>
                    <PostCard key={post.id} post={post} />
                ))}
            </ul>

            <div className='load_more_button'>
                {hasNextPage && <button onClick={fetchNextPage}>
                    {isFetching ? <PulseLoader color='#FFFFFF' size={8} /> : 'Laad meer'}
                </button>}
            </div>
        </section>
    )
}

export default InfinitePosts