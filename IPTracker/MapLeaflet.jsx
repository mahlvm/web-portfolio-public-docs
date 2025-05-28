import "./MapLeaflet.css";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import PropTypes from 'prop-types';

const RecenterMap = ({ lat, lng }) => {
    const map = useMap();
    map.flyTo([lat, lng], 13);
};

const MapLeaflet = (props) => {
    const latNumb = Number(props.lat)
    const lngNum = Number(props.lng);
    const position = [latNumb, lngNum];
    console.log(position);
    

    return(
        <MapContainer center={position} zoom={5} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
            <RecenterMap lat={latNumb} lng={lngNum} />
        </MapContainer>
    );
};

MapLeaflet.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
};

RecenterMap.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
};

export default MapLeaflet;