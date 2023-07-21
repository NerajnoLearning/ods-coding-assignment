import React, { useEffect, useState } from 'react';
import './App.css';
import InputBox from './components/InputBox';
import Pagination from './components/Pagination';
import moment from 'moment-timezone';

function App() {
  const [flightsData, updateFlightsData] = useState([]);
  const [inputAutofillList, updateInputAutofill] = useState([]);
  const [availableFlights, updateAvailableFlights] = useState([]);
  const shownPages = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [displayedFlights, setDisplayedFlights] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch('/data/flights.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const flights = csv.split(/\n/);
      const headers = flights.shift().split(/,/);
      let tempFlights = [], tempAutofill = [];
      for (let flightCount = 0; flightCount < flights.length; flightCount++) {
        let obj = {};
        const flight = flights[flightCount].split(/,/);
        for (let dataCount = 0; dataCount < headers.length; dataCount++) {
          const currHeader = headers[dataCount];
          const currData = flight[dataCount];
          obj[currHeader] = currData;
          if (currData && (currHeader === 'destination' || currHeader === 'destination_full_name' || currHeader === 'origin' || currHeader === 'origin_full_name')) {
            if (!tempAutofill[currData]) {
              tempAutofill[currData] = [flight[0]];
            }
            else {
              tempAutofill[currData].push(flight[0]);
            }
          }
        }
        tempFlights[obj.id] = obj;
      }
      updateFlightsData(tempFlights);
      updateInputAutofill(tempAutofill);
    }
    if (!flightsData.length) {
      getData();
    }
  }, [flightsData.length]);

  const getFlights = (s) => {
    setCurrentPage(1);
    const flightIds = inputAutofillList[s];
    let tempFlights = [];
    for (let i = 0; i < flightIds.length; i++) {
      tempFlights.push(flightsData[flightIds[i]]);
    }
    updateAvailableFlights(tempFlights);
    determinePages(tempFlights, 1);
  };

  const determinePages = (flights, curr) => {
    const tot = Math.ceil(flights.length / 10);
    if (tot !== totalPages) {
      setTotalPages(tot);
    }
    let startPage = 1, endPage = 1;
    let pagesArr = [];
    endPage = Math.min(tot, curr + Math.floor(shownPages / 2));
    startPage = endPage - shownPages + 1;
    if (startPage < 1) {
      startPage = 1;
    }
    if (endPage !== startPage + shownPages - 1) {
      endPage = startPage + shownPages - 1;
      if (endPage > tot) {
        endPage = tot;
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pagesArr.push(i);
    }
    setPages(pagesArr);

    const start = (curr - 1) * 10;
    setDisplayedFlights(flights.slice(start, start + 10));
  }

  const changePage = (num) => {
    if (num <= totalPages) {
      setCurrentPage(num);
    }
    determinePages(availableFlights, num);
  };

  return (
    <div className="App">
      <div className="input-group my-3 justify-content-center">
        <div className="input-group-prepend">
          <span className="input-group-text" id="station">Enter City/Airport Code below:</span>
        </div>
        <InputBox inputAutofill={inputAutofillList} getFlights={getFlights} />
      </div>
      {availableFlights.length > 0 && (<>
        <p>Total flights: {availableFlights.length}</p>
        <table className="table table-bordered w-75 mx-auto mb-3">
          <thead>
            <tr>
              <th scope="col">Flight Number</th>
              <th scope="col">Departure Airport</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Arrival Airport</th>
              <th scope="col">Arrival Time</th>
            </tr>
          </thead>
          <tbody>
          {displayedFlights.map(
            flight => (
                <tr key={flight.id}>
                  <th>{flight.flt_num}</th>
                  <td>{flight.origin_full_name} ({flight.origin})</td>
                  <td>{moment(flight.out_gmt).format("LLL")}</td>
                  <td>{flight.destination_full_name} ({flight.destination})</td>
                  <td>{moment(flight.in_gmt).format("LLL")}</td>
                </tr>
            )
          )}
          </tbody>
        </table>
      </>)}
      <Pagination totalPages={totalPages} currentPage={currentPage} changePage={changePage} pages={pages} />
    </div>
  );
}

export default App;
