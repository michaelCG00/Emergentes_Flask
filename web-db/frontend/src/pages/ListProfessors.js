import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useProfessor } from "../context/professorContext";

export function ListProfessorView() {
  const { postsProfessor } = useProfessor();
  const { deleteProfessorById } = useProfessor();

  function refreshPage() {
      window.location.href = '/';
  }

  return (
    <div className="container m-5">
      <h1>Lista de profesores</h1>

      <a className="btn btn-success" href="/professor">Agregar profesor</a>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Dirección</th>
            <th scope="col">Salario</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {postsProfessor.map((post) => (
            <tr>
              <th>{post.id}</th>
              <th>{post.first_name}</th>
              <td>{post.last_name}</td>
              <td>{post.city}</td>
              <td>{post.address}</td>
              <td>{post.salary}</td>
              <td>
                <a className="btn btn-secondary" href={'/professor/'+post.id}>Modificar</a>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => { deleteProfessorById(post.id); refreshPage(); }}>Borrar Registro</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
