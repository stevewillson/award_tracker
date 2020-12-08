

const initialState = {
  date: new Date().toISOString().slice(0,10),
  awardData: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DISPLAY_DATE':
      // update display date
      return {
        ...state,
        date: action.payload.date
      }

      case 'RESET_TRACKER':
        if (action.payload.resetType === 'yes') {
          return initialState;
        }
        return state;


          // AWARD INFO
      case 'ADDAWARDDATA':
        const addAwardData = [...state.awardData, action.payload.awardEntry]
        return {
          ...state,
          awardData: addAwardData
        }

      case 'UPDATEAWARDDATA':
        return {
          ...state,
        }

      case 'DELETEAWARDDATA':
        let updatedAwardData = state.awardData.slice()
        updatedAwardData = updatedAwardData.filter(awardEntry => awardEntry.id !== action.payload.id);
        return {
          ...state,
          awardData: updatedAwardData
        }

    default:
      return state;
  }
}

export default reducer;