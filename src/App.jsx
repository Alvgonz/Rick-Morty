import { useEffect, useState, useRef } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './helpers/getRandomNumber';
import LocationInfo from './components/LocationInfo';
import ResidentCard from './components/ResidentCard';
import getNumbers from './helpers/getNumbers';

function App() {
  const [locationID, setLocationID] = useState(getRandomNumber(126));
  const [errorMessage, setErrorMessage] = useState(getRandomNumber(''));
  /* https://rickandmortyapi.com/api/location/3 */
  const url =`https://rickandmortyapi.com/api/location/${locationID}`;
  const [location, getLocation, isLoading, hasError] = useFetch(url);
  const [locations, getLocations, isLoadingLocations, hasErrorLocations] = useFetch(`https://rickandmortyapi.com/api/location/${getNumbers()}`);

  useEffect(() => {
   getLocation()
  }, [locationID])

  useEffect(() => {
    getLocations()
  }, [])

  const handlesubmit = (e) => {
    e.preventDefault();

    const inputValue = inputName.current.value.trim();
    const selectedLocation = locations.find(
      location => location.name.toLowerCase() === inputValue.toLowerCase()
    );

    /*if(inputID.current.value) {
      setLocationID(inputID.current.value.trim());
    }*/

    if(inputValue) {
      setLocationID(selectedLocation ? selectedLocation.id : null);
      setErrorMessage(selectedLocation ? '' : 'NO LOCATION FOUND WITH THAT NAME!')
    }
  }
  
  const inputID = useRef()
  const inputName = useRef()

  return (
   <div className='app flex-container'>
    <header className='app-hero'>
      <img className='hero-image' src="/images/hero_image2.jpg" alt="hero image" />
    </header>
    <section className='app__body'>
      <form className='form' onSubmit={handlesubmit}>
        {/*<input className='form__input' type="number" ref={inputID} min={1}/>*/}
        <input type="text" className='form__input' placeholder='Search location name' ref={inputName} list='locations'/>
        <datalist id="locations">
          {
            isLoadingLocations ? <option>Loading...</option> : locations.map((location) => (
              <option value={location.name} key={location.id}></option>
            ))
          }
        </datalist>
        <button className='form__btn'>Search</button>
      </form>
      {
        isLoading ? <h1>Is loading...</h1> : errorMessage ? <h1>{errorMessage}</h1> 
         : (<>
          <LocationInfo location={location}/>
          <section className='cards__container flex-container'>
            {
              location?.residents?.map( (url) => (
                <ResidentCard key={url} url={url}/>
              ))
            }
          </section>
        </>)
      }
    </section>
    
   </div>
  )
}

export default App
