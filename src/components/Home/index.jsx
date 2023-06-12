import Form from '../Form'
import InfinitePosts from '../InfinitePosts'
import './home.css'

const Home = () => {
    return (
        <section className='home'>
            <div className='form_container'>
                <Form className='form' />
            </div>
            <div className='posts_container'>
                <InfinitePosts />
            </div>
        </section>
    )
}

export default Home