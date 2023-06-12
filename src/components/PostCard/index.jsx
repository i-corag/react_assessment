import './postCard.css'

const PostCard = ({ post }) => {

    const date = new Date(post.updated_at);
    const formattedDate = Intl.DateTimeFormat("en-GB", { dateStyle: "short", }).format(date);

    return (
        <li className='post_card'>
            <div style={{ backgroundImage: `url("https://frontend-case-api.sbdev.nl/storage/${post.img_url}")` }} className='post_card_header'>
                <div className='post_dat_cat'>
                    <h5>{formattedDate}</h5>
                    <h5>{post.category.name}</h5>
                </div>
            </div>

            <div className='post_card_body'>
                <h2>{post.title}</h2>
                <div className='post_content'>{post.content}</div>
            </div>
        </li>
    )
}

export default PostCard