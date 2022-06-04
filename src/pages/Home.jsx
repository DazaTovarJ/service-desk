import React from "react";
import electrical from "../assets/manteinance_electrical.jpg";
import ac from "../assets/manteinance_ac.png";
import keepings from "../assets/general_keepings.jpg";

const Home = ({user}) => {
  return (
    <div className="App">
      <h2>Bienvenido{user ? ", " + user.email : " al sistema"}</h2>
      <div className="row">
        <div className="col-12">
          <h3>¿Quiénes somos?</h3>
          <p>
            Somos una empresa de desarrollo de software con enfoque en
            soluciones de alta calidad, accesibles y adecuadas a las necesidades
            de nuestros clientes.
          </p>
          <p>
            Creemos en una empresa en la que todos sus trabajadores contribuyen
            a su crecimiento y posicionamiento, para lo cual diseñamos este
            sistema integrado de gestión de incidentes de la empresa y de sus
            insumos.
          </p>
        </div>
      </div>
      <div className="row">
        <h3>¿Qué se puede hacer con este sistema?</h3>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100">
            <img
              src={electrical}
              alt="Mantenimiento de inmuebles"
              className="card-img-top"
            />
            <div className="card-body">
              <h4 className="card-title">Mantenimiento de Inmuebles</h4>
              <p className="card-text">
                ¿Baños sucios? ¿Paredes agrietadas? ¿Problemas de tuberías?
                Nuestros especialistas están atentos a cualquier problemática.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100">
            <img src={ac} alt="" className="card-img-top" />
            <div className="card-body">
              <h4 className="card-title">Mantenimiento de Muebles</h4>
              <p className="card-text">
                Las sillas, el aire acondicionado y otros insumos de la empresa
                deben estar en perfectas condiciones. Puede reportar todo tipo
                de incidentes relacionados. Nosotros lo cubrimos.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100">
            <img src={keepings} alt="" className="card-img-top" />
            <div className="card-body">
              <h4 className="card-title">Mantenimiento de Inmuebles</h4>
              <p className="card-text">
                ¿Situación de seguridad complicada en su casa? Puede contar con
                excelentes conductores. También puede solicitar aseo genera en
                su zona de trabajo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
