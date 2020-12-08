import React from 'react';
import Table from '../Table/Table';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const AwardTable = () => {
  const { awardData } = useSelector(state => state)
  const dispatch = useDispatch();
  
  const handleAwardDelete = (awardId) => {  
    let confirmDelete = prompt('Type "yes" to delete this award entry');
    if (confirmDelete === 'yes') {
      dispatch({
        type: 'DELETEAWARDDATA',
        payload: {
          id: awardId,
        },
      })  
    }
  }
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date Entered',
        accessor: 'dateEntered',
        Cell: c => <span>{c.row.original.dateEntered && DateTime.fromSeconds(c.row.original.dateEntered).toFormat('MM/dd/yyyy')}</span>,
      },
      {
        Header: 'Proposed Presentation Date',
        accessor: 'proposedPresDate',
        Cell: c => <span>{c.row.original.proposedPresDate && DateTime.fromSeconds(c.row.original.proposedPresDate).toFormat('MM/dd/yyyy')}</span>,
      },
      {
        Header: 'Awardee',
        accessor: 'awardee',
      },
      {
        Header: 'Recommender',
        accessor: 'recommender',
      },
      {
        Header: 'Award Type',
        accessor: 'awardType',
      },
      {
        Header: 'Award Location',
        accessor: 'awardLocation',
      },
      {
        Header: 'As Of Date',
        accessor: 'asOfDate',
        Cell: c => <span>{c.row.original.asOfDate && DateTime.fromSeconds(c.row.original.asOfDate).toFormat('MM/dd/yyyy')}</span>,
      },
      {
        Header: 'Delete Entry',
        accessor: 'id',
        Cell: c => <span><button onClick={() => handleAwardDelete(c.row.original.id)}>X</button></span>
      }
    ],
    []
  )

  return (
    <Table
      data={getAwardData(awardData)}
      columns={columns}
    />
  );
};

const getAwardData = (awardData) => {  
  return awardData.map(awardEntry => {
    return {
      // convert dates to seconds and then display as dates in the table for the ability to sort by date
      dateEntered: DateTime.fromFormat(awardEntry['dateEntered'], 'yyyy-MM-dd').toSeconds(),
      proposedPresDate: DateTime.fromFormat(awardEntry['proposedPresDate'], 'yyyy-MM-dd').toSeconds(),
      asOfDate: DateTime.fromFormat(awardEntry['asOfDate'], 'yyyy-MM-dd').toSeconds(),
      awardee: awardEntry['awardee'],
      recommender: awardEntry['recommender'],
      awardType: awardEntry['awardType'],
      awardLocation: awardEntry['awardLocation'],
      id: awardEntry['id']
    }
  });
}

export default AwardTable;