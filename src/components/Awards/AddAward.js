import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

const AddAward = () => {

  // use dispatch to update the global state
  const dispatch = useDispatch();

  const today = DateTime.local();

  // maintain local state of the entry, then update the global state with the entry
  const [dateEntered, setDateEntered] = useState(today.toISODate());
  const [proposedPresDate, setproposedPresDate] = useState(today.toISODate());
  const [asOfDate, setAsOfDate] = useState(today.toISODate());
  const [awardee, setAwardee] = useState('');
  const [recommender, setRecommender] = useState('');
  const [awardType, setAwardType] = useState('');
  const [awardLocation, setAwardLocation] = useState('');
  
  const addAwardContent =
    <React.Fragment>
      <label htmlFor='dateEntered'>Date Entered</label>
      <input
        id='dateEntered'
        type='date'
        value={dateEntered}
        onChange={event => setDateEntered(event.target.value)}
      />
      <label htmlFor='ppd'>Proposed Presentation Date</label>
      <input
        id='ppd'
        type='date'
        value={proposedPresDate}
        onChange={event => setproposedPresDate(event.target.value)}
      />
      <label htmlFor='awardee'>Awardee</label>
      <input
        id='awardee'
        type="text"
        onChange={event => setAwardee(event.target.value)}
        value={awardee}
      />
      <label htmlFor='recommender'>Recommender</label>
      <input
        id='recommender'
        type="text"
        onChange={event => setRecommender(event.target.value)}
        value={recommender}
      />
      <label htmlFor='recommendedAward'>Recommended Award</label>
      <input
        id='recommendedAward'
        type="text"
        onChange={event => setAwardType(event.target.value)}
        value={awardType}
      />
      <label htmlFor='awardLocation'>Award Location</label>
      <input
        type="text"
        onChange={event => setAwardLocation(event.target.value)}
        value={awardLocation}
      />
      <label htmlFor='asOfDate'>As of date</label> 
      <input
        id='asOfDate'
        type='date'
        value={asOfDate}
        onChange={event => setAsOfDate(event.target.value)}
      />
    </React.Fragment>

  const handleAddAward = (dateEntered, proposedPresDate, asOfDate, awardee, recommender, awardType, awardLocation) => {
    // add an award entry
    dispatch({
      type: 'ADDAWARDDATA',
      payload: {
        awardEntry: {
          dateEntered,
          proposedPresDate,
          asOfDate,
          awardee,
          recommender,
          awardType,
          awardLocation,
          id: uuidv4(),
        }
      },
    });

    // set the state variables to ''
    setDateEntered(today.toISODate());
    setproposedPresDate(today.toISODate());
    setAsOfDate(today.toISODate());
    setAwardee('');
    setRecommender('');
    setAwardType('');
    setAwardLocation('');
  };

  return (
    <React.Fragment>
      {addAwardContent}
      <button onClick={() => handleAddAward(dateEntered, proposedPresDate, asOfDate, awardee, recommender, awardType, awardLocation)}>
        Add Award Entry
      </button>
    </React.Fragment>
  );
};

export default AddAward;