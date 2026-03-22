import express from 'express'
import "dotenv/config"
import cors from 'cors'          // ← adicione
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const app = express()
app.use(cors({
   origin: 'https://crud-front-back-lnak.vercel.app'
}))                   // ← adicione
app.use(express.json())

app.post('/users', async (req, res) => {
  const { name, age, email } = req.body
  const newUser = await prisma.user.create({
    data: { name, age, email }
  })
  res.status(201).json(newUser)
})

app.get('/users', async (req, res) =>{
    const allUser = await prisma.user.findMany()
    res.status(200).json(allUser)
})

app.put('/users/:id', async (req, res) => {   
    const { name, age, email } = req.body 
  const updatedUser = await prisma.user.update({
    where: {id: req.params.id},
    data: { name , age, email }
  })
  res.status(200).json(updatedUser)
})

app.delete('/users/:id' , async (req, res)=> {
    const deleteUser= await prisma.user.delete({
    where: {id: req.params.id},
    
  })
  res.status(200).json('usuário deletado com sucesso')
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
// app.post('/users')
// app.put('/users')
// app.delete('/users')

