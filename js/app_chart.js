const url = 'https://api.gael.cloud/general/public/clima';

fetch(url)
    .then(response => response.json())
    .then(data => {
        mostrarData(data);
        displayCharts(data);
    })
    .catch(error => console.error(error)); //  console.error para errores

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

const displayCharts = (data) => {
    // Extraer las etiquetas (horas de actualización) y datos de temperatura y humedad
    const labels = data.map(item => item.codigo);
    const tempData = data.map(item => parseFloat(item.Temp));
    const humedadData = data.map(item => parseFloat(item.Humedad));

    // Obtener el contexto del gráfico de temperatura (Chart 4)
    const ctx4 = document.getElementById('mychart4').getContext('2d');

    // Crear el gráfico de temperatura
    const temperaturaChart = createChart(ctx4, 'radar', labels, tempData, 'Temperatura');

    // Obtener el contexto del gráfico de humedad (Chart 5)
    const ctx5 = document.getElementById('mychart5').getContext('2d');

    // Crear el gráfico de humedad
    const humedadChart = createChart(ctx5, 'line', labels, humedadData, 'Humedad');

    // Retornar los objetos de gráfico (opcional, útil si necesitas interactuar con los gráficos más adelante)
    return { temperaturaChart, humedadChart };
};

const mostrarData = (data) => {
    // Accede a los campos que deseas mostrar
    const codigo = data.Codigo;
    const estacion = data.Estacion;
    const horaUpdate = data.HoraUpdate;

    // Ahora puedes mostrar estos datos en tu página HTML
    // Por ejemplo, asumiendo que tienes elementos con IDs correspondientes en tu HTML:
    document.getElementById('codigo').textContent = `Código: ${codigo}`;
    document.getElementById('estacion').textContent = `Estación: ${estacion}`;
    document.getElementById('horaUpdate').textContent = `Hora Actualizada: ${horaUpdate}`;
}
