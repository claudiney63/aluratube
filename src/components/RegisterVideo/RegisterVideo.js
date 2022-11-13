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