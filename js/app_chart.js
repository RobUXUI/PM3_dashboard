// Define el elemento select
const selectEstaciones = document.querySelector('#selectEstaciones');

// Función para agregar opciones al select
function agregarOpcion(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    selectElement.appendChild(option);
}

// Define la URL de la API
const url = 'https://api.gael.cloud/general/public/clima';

// Obtener datos de la API y crear el <select> al cargar la página
fetch(url)
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            // Agregar una opción vacía como primer elemento
            agregarOpcion(selectEstaciones, '', 'Selecciona una estación');

            // Agregar opciones basadas en los datos de la API
            data.forEach(objeto => {
                agregarOpcion(selectEstaciones, objeto.Estacion, objeto.Estacion); // Utilizar objeto.Estacion
            });
        } else {
            console.error('La respuesta del API está vacía.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Evento change para el select
selectEstaciones.addEventListener('change', () => {
    const selectedStation = selectEstaciones.value; // Obtener el valor seleccionado, que es el nombre de la estación

    // Obtener datos de la API y crear el select
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const selectedData = data.find(objeto => objeto.Estacion === selectedStation); // Buscar datos por nombre de estación

            if (selectedData) {
                mostrarData(selectedData);
                displayCharts(data);
            } else {
                console.error('No se encontraron datos para la estación seleccionada.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Función para mostrar datos
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
    const iconoImg = document.getElementById('icono');
      
    // Actualiza el contenido de los elementos HTML
    codigoDiv.textContent = `Código: ${codigo}`;
    estacionDiv.textContent = `Estación: ${estacion}`;
    horaDiv.textContent = `Hora: ${hora}`;
    estadoDiv.textContent = `Estado: ${estado}`;
    iconoImg.src = `/imagen/${icono}`; 
}

// Función para crear gráficos
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

// Función para mostrar gráficos
const displayCharts = (data) => {
    // Extraer  datos de temperatura y humedad
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

    // Retornar los objetos de gráfico 
    return { temperaturaChart, humedadChart };
};
