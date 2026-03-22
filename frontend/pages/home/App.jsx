import { useEffect, useState, useRef} from 'react'
import './App.css'
import Bg from '../../src/assets/clean_gradient_background.svg'
import API from '../../src/services/API'

function App() {

  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

///////////////get////////////////////
useEffect(() => {
  async function getUsers() {
    const response = await API.get('/users')
    setUsers(response.data)
  }
  getUsers()
}, [])
///////////////////////////////////////

//tratamento de erro Nao preenchimento dos dados
const [erro, setErro] = useState('')
//////////////create/////////////////////
async function createUsers() {
  if (!inputName.current.value) {
    setErro('Preencha o campo Nome!')
    return
  }
  if (!inputAge.current.value) {
    setErro('Preencha o campo Idade!')
    return
  }
  if (!inputEmail.current.value) {
    setErro('Preencha o campo Email!')
    return
  }
  if (!inputEmail.current.value.endsWith('@gmail.com')) {
    setErro('Use um email @gmail.com!')
    return
  }

  setErro('')  // limpa o erro se tudo ok

  await API.post('/users', {
    name: inputName.current.value,
    age: inputAge.current.value,
    email: inputEmail.current.value
  })

  inputName.current.value = ''
  inputAge.current.value = ''
  inputEmail.current.value = ''

  const response = await API.get('/users')
  setUsers(response.data)
}
//////////////////////////////////

////////////edit/put/////////////
const [userEdit, setUserEdit] = useState(null)

async function editUsers() {
  if (!userEdit) return

  await API.put(`/users/${userEdit.id}`, {
    name: inputName.current.value,
    age: inputAge.current.value,
    email: inputEmail.current.value
  })

  setUserEdit(null)
  inputName.current.value = ''
  inputAge.current.value = ''
  inputEmail.current.value = ''

  const response = await API.get('/users')
  setUsers(response.data)
}

function selectEdit(user) {
  setUserEdit(user)
  inputName.current.value = user.name
  inputAge.current.value = user.age
  inputEmail.current.value = user.email
}
//////////////delete///////////////
  async function deleteUsers(id) {
  await API.delete(`/users/${id}`)  // ← crase, não aspas simples

  const response = await API.get('/users')
  setUsers(response.data)

  
}
////////////////////////
  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder='Nome' name='nome' type='text' ref={inputName}/>
          <input placeholder='Idade' name='idade' type="number" ref={inputAge}/>
          <input placeholder='Email' name='email' type="email" ref={inputEmail}/>
          <button type='button' onClick={userEdit ? editUsers : createUsers}>
          {userEdit ? 'Salvar' : 'Cadastrar'}
          </button>
          {erro && <p className='erro'>{erro}</p>}
        </form>

        {users.map((user) => (
          <div key={user.id} className='card'>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email} </span></p>
            <button onClick={() => selectEdit(user)} className='bx bxs-edit btn-edit'></button>
            <button onClick={() => deleteUsers(user.id)} className='bx bxs-trash' ></button>
          </div>
          
        ))}
      </div>
    </>
  )
}

export default App