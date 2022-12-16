import {
  login,
  getCompanies,
  getRegions,
  getLocations,
  createCompany,
  createRegion,
  createLocation,
  updateCompany,
  updateRegion,
  updateLocation,
} from './httpClient.js';

login('viet.nguyen@gmail.com', 'Evizi#Training')
  .then((data) => console.log(data))
  .catch((ex) => console.log(ex));

/*
getCompanies({
  first: 20,
  after: null,
  name: 'test',
})
  .then(data => console.log(data))
  .catch(ex => console.log('EX', ex));
*/

/*
getRegions({
  active: true,
  orderBy: {
    field: 'NAME',
    direction: 'ASC'
  }
})
  .then(data => console.log(data))
  .catch(ex => console.log('EX', ex));
*/

/*
getLocations({
  company: [101],
  orderBy: {
    field: 'NAME',
    direction: 'ASC'
  }
})
  .then(data => console.log(data))
  .catch(ex => console.log('EX', ex));
*/

/*
  company: {
    id: 310,
    name: 'viet_test_api_training_01'
  }
*/
/*
createCompany({
  name: 'viet_test_api_training_01',
  maxLocations: 100,
  maxUsers: 20,
})
  .then(data => console.log(data))
  .catch(ex => console.log('EX', ex));
*/

/*
  region: {
    id: 159,
    name: 'viet_test_api_training_01'
  }
*/
/*
createRegion({
  name: 'viet_test_api_training_01',
  companyId: 310,
})
  .then(data => console.log(data))
  .catch(ex => console.log('EX', ex));
*/

/*
  location: {
    id: 1000000703,
    name: 'viet_test_api_training_01'
  }
*/
/*
createLocation({
  name: 'viet_test_api_training_01',
  companyId: 310,
  regionId: 159,
})
  .then(data => console.log(data))
  .catch(ex => console.log('EX', ex));
*/

updateCompany(310, {
  name: 'viet_test_api_training_01',
})
  .then((data) => console.log(data))
  .catch((ex) => console.log('EX', ex));

updateRegion(159, {
  name: 'viet_test_api_training_01',
})
  .then((data) => console.log(data))
  .catch((ex) => console.log('EX', ex));

updateLocation(1000000703, {
  name: 'viet_test_api_training_01',
})
  .then((data) => console.log(data))
  .catch((ex) => console.log('EX', ex));
