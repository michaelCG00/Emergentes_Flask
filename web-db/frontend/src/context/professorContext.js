import { useState, createContext, useContext, useEffect } from 'react'
import { createProfessorRequest, getAllProfessorsRequest, setUpdateProfessorRequest, getProfessorRequest, deleteProfessorRequest } from '../api/professors';


const professorContext = createContext()

export const useProfessor = () => {
    const context = useContext(professorContext)
    return context;
}

export const ProffesorProvider = ({ children }) => {
    const [postsProfessor, setPostsProfessor] = useState([])

    const createProfessor = async (professor) => {
        const res = await createProfessorRequest(professor);
        return res.data;
    }

    const getAllProfessors = async () => {
        const res = await getAllProfessorsRequest()
        setPostsProfessor(res.data)
    }

    const updateProfessor = async (professor) => {
        const res = await setUpdateProfessorRequest(professor)
        return res.data;
    }

    const getProfessorById = async (id) => {
        const res = await getProfessorRequest(id)
        return res.data;
    }

    const deleteProfessorById = async (id) => {
        const res = await deleteProfessorRequest(id)
        return res.data;
    }

    useEffect(() => {
        getAllProfessors();
    }, [])

    return <professorContext.Provider value={{
        createProfessor,
        getAllProfessors,
        updateProfessor,
        deleteProfessorById,
        getProfessorById,
        postsProfessor, setPostsProfessor
    }}>
        {children}
    </professorContext.Provider>
}