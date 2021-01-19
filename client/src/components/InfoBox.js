import React, {useEffect} from 'react';
import * as L from "leaflet";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import Button  from"@material-ui/core/Button"
import { Card, CardContent, Typography } from "@material-ui/core"
import '../css/InfoBox.css'

const GET_LOCATIONS = gql`
  {
   points{
     properties{
       info
     }
     geometry{
       type
       coordinates
     }
   }
   polygons{
     properties{
       info
     }
     geometry{
       type
       coordinates
     }
   }
  }
`;

const InfoBox = () => 
{
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  return (
    <Card className="app__right">
       <div className="app__header">
          <h1>Draws Software</h1>
          <h5>All Draws imported here</h5>
        </div>
        <hr/>
        <CardContent className="table">
            {error?<strong className="red">Error while loading, server might be down! </strong>:null}
            {loading? <strong className="primary">Loading ...</strong>:null}
            {data?
              <div>
                { data.points.map(point => (
                  <Card className="infoBox" key={point.properties.info}>
                    <CardContent>
                      <Typography className="infoBox__title"><strong>Type:</strong> {point.geometry.type}</Typography>
                      <div className="coordinates">
                        <strong>Coordinates: <br/></strong>
                        Lat Lng: {point.geometry.coordinates.map(latLng=> <small key={latLng}>{latLng} - </small>)}
                      </div>
                      <Button href="#"  color="primary" className="">Relocate</Button>
                    </CardContent>
                  </Card>
                ))
                }
                {
                  data.polygons.map(polygon => (
                    <Card className="infoBox" key={polygon.properties.info}>
                      <CardContent>
                        <Typography className="infoBox__title"><strong>Type:</strong> {polygon.geometry.type}</Typography>
                        <div className="coordinates">
                        <strong>Coordinates: <br/></strong>
                          {polygon.geometry.coordinates[0].map(latLngs=> <h6 key={latLngs}>Lat Lng: {latLngs.map(latLng => <small key={latLng}>{latLng} - </small>)} </h6>)}
                        </div>
                        <Button href="#"  color="primary" className="">Relocate</Button>
                      </CardContent>
                    </Card>
                  ))
                }
              </div>
            :null
             }
          </CardContent>
    </Card>
  )
}

export default InfoBox
