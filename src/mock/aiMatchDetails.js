export const aiMatchDetails = {
  1: {
    id: 1,
    confidence: 0.82,
    posRecord: { id: 101, name: 'Jane Doe', email: 'jane@pos.com' },
    alleRecord: { id: 201, name: 'Jane D.', email: 'jane@alle.com' },
    aspireRecord: { id: 301, name: 'Jane A. Doe', email: 'jane@aspire.com' },
    audit: [{ action: 'created', user: 'system', date: '2024-05-01' }]
  },
  2: {
    id: 2,
    confidence: 0.59,
    posRecord: { id: 102, name: 'Mary Smith' },
    alleRecord: { id: 202, name: 'M. Smith' },
    aspireRecord: { id: 302, name: 'Mary S' },
    audit: [{ action: 'flagged', user: 'system', date: '2024-05-02' }]
  },
  3: {
    id: 3,
    confidence: 0.4,
    posRecord: { id: 103, name: 'John Brown' },
    alleRecord: { id: 203, name: 'J. Brown' },
    aspireRecord: { id: 303, name: 'Jon Brow' },
    audit: [{ action: 'flagged', user: 'system', date: '2024-05-03' }]
  },
  4: {
    id: 4,
    confidence: 0.76,
    posRecord: { id: 104, name: 'Chris Green' },
    alleRecord: { id: 204, name: 'Christopher Green' },
    aspireRecord: { id: 304, name: 'Chris G.' },
    audit: [{ action: 'created', user: 'system', date: '2024-05-04' }]
  },
  5: {
    id: 5,
    confidence: 0.65,
    posRecord: { id: 105, name: 'Pat Johnson' },
    alleRecord: { id: 205, name: 'Pat J.' },
    aspireRecord: { id: 305, name: 'Patrick Johnson' },
    audit: [{ action: 'flagged', user: 'system', date: '2024-05-05' }]
  }
};
