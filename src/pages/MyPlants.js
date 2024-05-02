import React, {useState, useEffect} from 'react';
import { useAuth } from '../hooks/AuthProvider';
import authFetch from '../helpers/axios';
import { AddUserPlantForm } from '../components/AddUserPlantForm';
import { PlantCard } from '../components/PlantCard';

export const MyPlants = () => {
  const [results, setResults] = useState([]);
  const {logOut} = useAuth();

  useEffect(() => {
    authFetch("userplants/")
      .then((response) => {setResults(response.data)})
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

  const getUserPlants = async () => {
    await authFetch("userplants/")
      .then((response) => {setResults(response.data)})
      .catch((err) => {
        console.log(err.message);
      });
  }

  const waterPlant = async (plantId) => {
    await authFetch.post(
      "userplants/water/", 
      JSON.stringify({
        "plant_ids": [
          plantId
        ]
      })
    )
    .catch((err) => {
      console.log(err.message)
    });
    getUserPlants();
  }

  const UTCToLocalDate = (utc) => {
    var date = new Date(utc + "Z").toLocaleDateString();
    return date
  }

  let plants = [];
  if (results) {
    plants = results.map(result => {
      return (
        // <li key={result.id}>
        //   <h3>{result.plant_data.name}</h3>
        //   {result.last_watered && <p><i>last watered on {UTCToLocalDate(result.last_watered)}</i></p>}
        //   <button onClick={() => waterPlant(result.id)}>Water</button>
        // </li>
        <PlantCard data={result} />
      )
    })
  }

  return (
    <div>
      <button onClick={() => logOut()}>Logout</button>
      <h1>Here are your plants!</h1>
      {/* <ul id="plants">
        {plants}
      </ul> */}
      <div id="plants">
        {plants}
      </div>
      <AddUserPlantForm />
    </div>
  )
}