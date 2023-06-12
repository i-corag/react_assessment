import './errorMsg.css'

const ErrorMsg = ({ error }) => {
    return (
        <div className='error_container'>
            <p className='error_msg'>{error}</p>
        </div>
    )
}

export default ErrorMsg