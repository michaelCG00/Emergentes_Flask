import axios from 'axios'

export const getAllProfessorsRequest = async () => await axios.get('/professors');
export const createProfessorRequest = async (professor) => await axios.post('/professors', professor)
export const setUpdateProfessorRequest = async (professor) => await axios.put('/professors', professor)

export const getProfessorRequest = async (id) => await axios.get('/professor/'+id)
export const deleteProfessorRequest = async (id) => await axios.delete('/professor/'+id)
