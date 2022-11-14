import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { StyledRegisterVideo } from "./StyledRegisterVideo";

const useForm = (props) => { //hook custom

    const [valuesInput, setValuesInput] = useState(props.initialValues)

    return {
        valuesInput, 
        handleChange: (e) => {
            setValuesInput({
                ...valuesInput,
                [e.target.name]: e.target.value,
            })
        },
        clearForm: () => {
            setValuesInput({})
        }
    }
}

const PROJECT_URL = 'https://osdsuglajugvvreoqwpi.supabase.co'
const KEY_API = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZHN1Z2xhanVndnZyZW9xd3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODM5OTUsImV4cCI6MTk4Mzk1OTk5NX0._-oyqm-LturvKCYlum0k_x69QSKjapg1GzbjnBoUP_g'
const supabase = createClient(PROJECT_URL, KEY_API)

const getThumbnail = (url) => {
    return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {

    const [formVisibel, setFormVisibel] = useState(false)
    const formCadastro = useForm({ //hook custom
        initialValues: {
            titulo: '',
            url: ''
        }
    })

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisibel(!formVisibel)}>
                +
            </button>
            {
                formVisibel
                    ? (<form onSubmit={(e) => {
                        e.preventDefault()
                        // console.log(formCadastro.valuesInput)

                        supabase.from('videos').insert({
                            title: formCadastro.valuesInput.titulo,
                            url: formCadastro.valuesInput.url,
                            thumb: getThumbnail(formCadastro.valuesInput.url),
                            playlist: 'jogos'
                        })
                        .then((response) => {
                            console.log(response)
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                        setFormVisibel(!formVisibel)
                        formCadastro.clearForm()
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisibel(!formVisibel)}> X </button>
                            <input
                                placeholder="Titulo do Video"
                                name="titulo"
                                type='text'
                                value={formCadastro.valuesInput.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="URL"
                                name="url"
                                type='text'
                                value={formCadastro.valuesInput.url}
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>)
                    : null
            }
        </StyledRegisterVideo>
    )
}