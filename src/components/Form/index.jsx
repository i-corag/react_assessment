import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsCamera } from 'react-icons/Bs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPost, getCategories } from '../../api'
import PulseLoader from "react-spinners/PulseLoader"
import ErrorMsg from '../ErrorMsg'
import './form.css'


const Form = ({ className }) => {

    // get categories for select input
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    })

    // add post to api
    const queryClient = useQueryClient();
    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => queryClient.invalidateQueries(['posts'])
    })

    //handle form submission
    const { register, handleSubmit, formState, reset } = useForm();
    const { errors, isSubmitSuccessful } = formState;

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('category_id', data.category_id);
        formData.append('image', data.image[0]);

        createPostMutation.mutate({ formData })
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);


    return (
        <div className={className}>

            {createPostMutation.isError && <ErrorMsg error={createPostMutation.error.message} />}

            <h2>Plaats een blog bericht</h2>

            <form onSubmit={handleSubmit(onSubmit)} >

                {/* Post title input */}
                <div className='form_input'>
                    <p className='form_input_label'>
                        Berichtnaam
                        <span className='form_input_error'>{errors.title?.message}</span>
                    </p>
                    <div className='form_input_container'>
                        <input
                            type="text"
                            placeholder="Geen titel"
                            {...register("title", { required: 'Een titel is vereist' })} />
                    </div>
                </div>

                {/* Post category select */}
                <div className='form_input'>
                    <p className='form_input_label'>
                        Categorie
                        <span className='form_input_error'>{errors.category_id?.message}</span>
                    </p>
                    <div className='form_input_container'>
                        <select
                            {...register("category_id", { required: 'Selecteer een categorie' })}>
                            <option value=''>{isLoading ? 'Loading...' : 'Geen categorie'}</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Post file input */}
                <div className='form_input'>
                    <p className='form_input_label'>
                        Header afbeelding
                        <span className='form_input_error'>{errors.image?.message}</span>
                    </p>
                    <div className='form_input_container'>
                        <label htmlFor='image' className='input_file'>
                            <BsCamera size="15px" color='#888888' />
                            <div>Kies bestand</div>
                            <input
                                type="file"
                                id='image'
                                {...register("image", { required: 'Een afbeelding is vereist' })} />
                        </label>
                    </div>
                </div>

                {/* Post message input */}
                <div className='form_input'>
                    <p className='form_input_label'>
                        Bericht
                        <span className='form_input_error'>{errors.content?.message}</span>
                    </p>
                    <div className='form_input_container_textarea'>
                        <textarea
                            type='text'
                            {...register("content", { required: 'Een bericht is vereist' })} />
                    </div>
                </div>

                {/* Submit button */}
                <div className='form_submit'>
                    <button>
                        {createPostMutation.isLoading ?
                            <PulseLoader color='#FFFFFF' size={8} />
                            : 'Bericht aanmaken'}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Form

