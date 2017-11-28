const centers = [
  {
    id: 1,
    name: 'Kachi\'s center',
    detail: 'We do stuff',
    image: 'ramsey.jpg',
    address: 'somewhere in lagos',
    state: 'lagos',
    facilities: ['rolls, paste, soap'],
    events: [
      {
        id: 1,
        name: 'kachi\'s event',
        date: '2011-11-11',
        time: '08:00',
        centerId: '1'
      },
    ]
  },
  {
    id: 2,
    name: 'Kachi\'s elite center',
    detail: 'We do stuff',
    image: 'ramsey.jpg',
    address: 'somewhere in lagos',
    state: 'lagos',
    facilities: ['rolls, paste, soap'],
    events: [
      {
        id: 1,
        name: 'kachi\'s major event',
        date: '2011-11-11',
        time: '08:00',
        centerId: '2'
      },
    ]
  },
  {
    id: 3,
    name: 'the main center',
    detail: 'We do stuff',
    image: 'ramsey.jpg',
    address: 'somewhere in lagos',
    state: 'lagos'
  }
];

module.exports = centers;
