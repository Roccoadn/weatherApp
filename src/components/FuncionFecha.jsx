import './FuncionFecha.css';

const FechaHoraLocal = ({ timezone }) => {
    if (timezone === undefined) return null;

    const obtenerFechaHoraLocal = (offsetSegundos) => {
        const ahoraUTC = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
        return new Date(ahoraUTC.getTime() + offsetSegundos * 1000);
    };

    const fechaLocal = obtenerFechaHoraLocal(timezone);

    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const diaSemana = dias[fechaLocal.getDay()];
    const diaNumero = fechaLocal.getDate();
    const mesNombre = meses[fechaLocal.getMonth()];
    const anio = fechaLocal.getFullYear();
    const hora = `${fechaLocal.getHours().toString().padStart(2, '0')}:${fechaLocal.getMinutes().toString().padStart(2, '0')}`;

    return (
        <div className="weather-details">
            <h3 className="day">{diaSemana}</h3>
            <h3 className="time">{hora}</h3>
            <h3 className="date">{`${diaNumero} ${mesNombre} ${anio}`}</h3>
        </div>
    );
};

export default FechaHoraLocal;
