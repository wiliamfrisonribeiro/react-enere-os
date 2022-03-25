import { Redirect } from 'react-router-dom';
import config from '../../Config';
import { useState, useEffect } from 'react';

function Cadastrar({ pcodigo, atualizaAlerta, editar }) {

    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", estado: ""
    })

    const [listaMarcas, setListaMarcas] = useState([]);

    const [redirecionar, setRedirecionar] = useState(false);

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/cidades/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data[0]))
            .catch(err => console.log(err))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                const body = {
                    codigo: objeto.codigo,
                    nome: objeto.nome,
                    descricao: objeto.descricao,
                    estado: objeto.estado
                }
                const response = await fetch(config.enderecoapi + "/cidades", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const body = {
                    nome: objeto.nome,
                    descricao: objeto.descricao,
                    estado: objeto.estado
                }
                const response = await fetch(config.enderecoapi + "/cidades", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        }
        setRedirecionar(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value })
    }

    const recuperaMarcas = async () => {
        await fetch(`${config.enderecoapi}/estados`)
            .then(response => response.json())
            .then(data => setListaMarcas(data))
            .catch(err => console.log('Erro: ' + err))
    }

    useEffect(() => {
        if (editar) {
            recuperar(pcodigo);
        } else {
            setObjeto({
                codigo: "", nome: "", descricao: "", estado: ""
            });
        }
        recuperaMarcas();
    }, []);

    if (redirecionar === true) {
        return <Redirect to="/cidades" />
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Cidade</h2>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <div >
                    <div className="form-group">
                        <label htmlFor="txtCodido" className="form-label">
                            Código
                        </label>
                        <input
                            type="text"
                            readOnly
                            className="form-control"
                            id="txtCodido"
                            name="codigo"
                            value={objeto.codigo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtNome" className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtNome"
                            name="nome"
                            value={objeto.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtData" className="form-label">
                            descrição
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtDescricao"
                            name="descricao"
                            value={objeto.descricao}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectEstado" className="form-label">
                            Estado
                        </label>
                        <select
                            required
                            className="form-control"
                            id="selectselectEstadoPerson"
                            value={objeto.estado}
                            name="Estado"
                            onChange={handleChange}>
                            <option disable="true" value="">(Selecione o estado)</option>
                            {listaMarcas.map((estado) => (
                                <option key={estado.codigo} value={estado.codigo}>
                                    {estado.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-success" >
                    Salvar  <i className="bi bi-save"></i>
                </button>

            </form>
        </div>
    )

}

export default Cadastrar;