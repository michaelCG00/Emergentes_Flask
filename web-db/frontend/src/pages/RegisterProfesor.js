import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useProfessor } from "../context/professorContext";

export function RegisterProfessor() {
  const { createProfessor, updateProfessor } = useProfessor();
  const { getProfessorById } = useProfessor();
  const params = useParams();

  const [post, setPost] = useState({
    id: null,
    first_name: "",
    last_name: "",
    city: "",
    address: "",
    salary: 0,
  });

  console.log(params.id != null)

  useEffect(() => {
    (async () => {
      if (params.id != null) {
        const post = await getProfessorById(params.id);
        setPost({
          id: post[0].id,
          first_name: post[0].first_name,
          last_name: post[0].last_name,
          city: post[0].city,
          address: post[0].address,
          salary: post[0].salary,
        });
      }
    })();
  }, [params.id, getProfessorById]);

  console.log(post);

  return (
    <div className="container m-5">
      <h1>Formulario de professor</h1>
      <Formik
        className="form"
        initialValues={post}
        onSubmit={async (values, actions) => {
          if (post.id != null) {
            const posts = await updateProfessor(values);
            if (posts != null) {
              window.location.replace("/");
            }
          } else {
            const posts = await createProfessor(values);
            if (posts != null) {
              window.location.replace("/");
            }
          }
        }}
        enableReinitialize
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <Field
                name="first_name"
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>

            <div className="form-group mb-3">
              <Field
                name="last_name"
                type="text"
                className="form-control"
                placeholder="Apellido"
              />
            </div>

            <div className="form-group mb-3">
              <Field
                name="city"
                type="text"
                className="form-control"
                placeholder="Ciudad"
              />
            </div>

            <div className="form-group mb-3">
              <Field
                name="address"
                type="text"
                className="form-control"
                placeholder="Dirección"
              />
            </div>

            <div className="form-group mb-3">
              <Field
                name="salary"
                type="text"
                className="form-control"
                placeholder="Salario"
              />
            </div>

            <div className="text-center">
              <div className="mt-4 text-center">
                <button type="submit" className="btn btn-primary">
                  Hacer efectivo
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
