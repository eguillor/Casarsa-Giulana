const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
})


const placeInput = document.getElementById("place-input");
let map;
let autocomplete;
let properties = [
    {
        id: 1,
        nombre: "Casa en la Condesa",
        telefono: 5551234567,
        coords: {
            lat: 19.41325,
            lng: -99.17385,
        },
        cuartos: "3",
        banios: "2",
        direccion: "Calle Mazatlán 222",
        ciudad: "Ciudad de México",
    },
    {
        id: 2,
        nombre: "Departamento en la Playa",
        telefono: 5556789123,
        coords: {
            lat: 20.65337,
            lng: -105.22938,
        },
        cuartos: "2",
        banios: "2",
        direccion: "Avenida los Tules 136",
        ciudad: "Puerto Vallarta",
    },
    {
        id: 3,
        nombre: "Casa en la Montaña",
        telefono: 8185554321,
        coords: {
            lat: 25.70709,
            lng: -100.39778,
        },
        cuartos: "4",
        banios: "3",
        direccion: "Calle Encino 456",
        ciudad: "Monterrey",
    },
    {
        id: 4,
        nombre: "Departamento en Reforma",
        telefono: 5558765432,
        coords: {
            lat: 19.43195,
            lng: -99.15486,
        },
        cuartos: "1",
        banios: "1",
        direccion: "Avenida Paseo de la Reforma 1234",
        ciudad: "Ciudad de México",
    },
    {
        id: 5,
        nombre: "Casa en la Playa del Carmen",
        telefono: 9987654321,
        coords: {
            lat: 20.62839,
            lng: -87.07477,
        },
        cuartos: "3",
        banios: "2",
        direccion: "Calle 10 Norte 123",
        ciudad: "Playa del Carmen",
    },
    {
        id: 6,
        nombre: "Departamento en la Zona Rosa",
        telefono: 5554321098,
        coords: {
            lat: 19.42647,
            lng: -99.16267,
        },
        cuartos: "2",
        banios: "2",
        direccion: "Calle Genova 33",
        ciudad: "Ciudad de México",
    },
    {
        id: 7,
        nombre: "Casa en la Colonia Roma",
        telefono: 5559876543,
        coords: {
            lat: 19.41985,
            lng: -99.16019,
        },
        cuartos: "4",
        banios: "3",
        direccion: "Calle Orizaba 234",
        ciudad: "Ciudad de México",
    },
    {
        id: 8,
        nombre: "Departamento en Acapulco",
        telefono: 7445551212,
        coords: {
            lat: 16.85836,
            lng: -99.87691,
        },
        cuartos: "3",
        banios: "2",
        direccion: "Avenida Costera Miguel Alemán 123",
        ciudad: "Acapulco",
    },
    {
        id: 9,
        nombre: "Casa en la Zona Esmeralda",
        telefono: 5558765432,
        coords: {
            lat: 19.53022,
            lng: -99.27976,
        },
        cuartos: "5",
        banios: "4",
        direccion: "Calle Esmeralda 456",
        ciudad: "Atizapán de Zaragoza",
    },
    {
        id: 10,
        nombre: "Departamento en Polanco",
        telefono: 5556781234,
        coords: {
            lat: 19.43382,
            lng: -99.19504,
        },
        cuartos: "2",
        banios: "1",
        direccion: "Calle Lamartine 98",
        ciudad: "Ciudad de México",
    },
    {
        id: 11,
        nombre: "Casa en la Colonia del Valle",
        telefono: 5552468135,
        coords: {
            lat: 19.38676,
            lng: -99.17066,
        },
        cuartos: "3",
        banios: "2",
        direccion: "Calle Providencia 345",
        ciudad: "Ciudad de México",
    },
    {
        id: 12,
        nombre: "Departamento en Mazatlán",
        telefono: 6695552468,
        coords: {
            lat: 23.22802,
            lng: -106.41383,
        },
        cuartos: "1",
        banios: "1",
        direccion: "Avenida del Mar 123",
        ciudad: "Mazatlán",
    },
];

window.initMap = function () {
    firstPositionMap();
    let infoWindow = new google.maps.InfoWindow();
    const addMarker = (properties) => {
        properties.forEach((propertie) => {
            const informationCard = createInfoWindow(propertie);
            const marker = new google.maps.Marker({
                position: propertie.coords,
                map,
                icon: "./icons/marker.png",
            });
            google.maps.event.addListener(marker, "click", () => {
                infoWindow.setContent(informationCard);
                infoWindow.open(map, marker);
                map.setCenter(propertie.coords);
                map.setZoom(14);
            });
        });
    };
    getYourApproximateLocation();
    addMarker(properties);
    searchGoogleMap();
};

const searchGoogleMap = () => {
    autocomplete = new google.maps.places.Autocomplete(placeInput);
    autocomplete.addListener("place_changed", () => {
        if (placeInput.value !== "") {
            const place = autocomplete.getPlace();
            map.setCenter(place.geometry.location);
            map.setZoom(13);
        }
    });
};
const firstPositionMap = () => {
    const coords = { lat: 19.406940428320986, lng: -99.14819687896599 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: coords,
    });
};

const createInfoWindow = (propertie) => {
    return `
  <div>
    <h3 class="text-reset py-1">${propertie.nombre}</h3>
    <div class="d-flex justify-content-space-between">
      <p><b>Cuartos: </b>${propertie.cuartos}</p>
      <p><b>Baños: </b>${propertie.banios}</p>
    </div>
    <p><b>Teléfono: </b>${propertie.telefono}</p>
  </div>
  `;
};
const getYourApproximateLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                const coords = {
                    lat: latitude,
                    lng: longitude,
                };
                map.setCenter(coords);
                map.setZoom(13);
                new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: "./position.svg",
                });
            },
            () => {
                alert(
                    "Tu navegador esta bien, pero ocurrio un error al obtener tu ubicación"
                );
            }
        );
    } else {
        alert("Tu navegador no cuenta con localizacion ");
    }
};
