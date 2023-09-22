
const url = 'https://api.gael.cloud/general/public/clima';

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            const primerObjeto = data[0]; // Accede al primer objeto en el arreglo
            mostrarData(primerObjeto);
            displayCharts(data);
        } else {
            console.error('La respuesta del API está vacía o no es un arreglo.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });



function mostrarData(objeto) {
    // Obtiene los valores del objeto
    const codigo = objeto.Codigo;
    const estacion = objeto.Estacion;
    const hora = objeto.HoraUpdate;
    const estado = objeto.Estado;
    const icono = objeto.Icono;

    // Obtiene elementos HTML por ID
    const codigoDiv = document.getElementById('codigo');
    const estacionDiv = document.getElementById('estacion');
    const horaDiv = document.getElementById('hora');
    const estadoDiv = document.getElementById('estado');
    const iconoImg = document.getElementById('icono'); // Corrección en el nombre de la variable

    // Actualiza el contenido de los elementos HTML
    codigoDiv.textContent = `Código: ${codigo}`;
    estacionDiv.textContent = `Estación: ${estacion}`;
    horaDiv.textContent = `Hora: ${hora}`;
    estadoDiv.textContent = `Estado: ${estado}`;
    iconoImg.src = `imagen/${icono}.png`; // ruta imagen?
}



const createChart = (ctx, type, labels, data, label) => {
    return new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
        },
    });
};

// charts

const displayCharts = (data) => {
    // Extraer las etiquetas (horas de actualización) y datos de temperatura y humedad
    const labels = data.map(item => item.Estacion);
    const tempData = data.map(item => parseFloat(item.Temp));
    const humedadData = data.map(item => parseFloat(item.Humedad));

    // Obtener el contexto del gráfico de temperatura (Chart 4)
    const ctx4 = document.getElementById('mychart4').getContext('2d');

    // Crear el gráfico de temperatura
    const temperaturaChart = createChart(ctx4, 'bar', labels, tempData, 'Temperatura');

    // Obtener el contexto del gráfico de humedad (Chart 5)
    const ctx5 = document.getElementById('mychart5').getContext('2d');

    // Crear el gráfico de humedad
    const humedadChart = createChart(ctx5, 'line', labels, humedadData, 'Humedad');

    // Retornar los objetos de gráfico (opcional, útil si necesitas interactuar con los gráficos más adelante)
    return { temperaturaChart, humedadChart };
};