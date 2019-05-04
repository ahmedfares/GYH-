const apiHost = 'https://BakeSaleforgood.com';
import { AsyncStorage } from 'react-native';
export default {
    async fetchGroup (lang){
        let token2 = await AsyncStorage.getItem('token');
        try {
            let response = await fetch('https://eumra.com/gyh/api/gyh/GetGroupStatusCounts?IsArabic='+(lang == 'ar'), {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token2,
              }
          });
            let responseJson = await response.json();
            return responseJson;
          } catch (error) {
            console.error(error);
          }
    },
    async fetchDetailedGroups (Id,pageNo){
      let token2 = await AsyncStorage.getItem('token');
      try {
          let response = await fetch('https://eumra.com/gyh/api/gyh/GetGroups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token2,
            },
            body: JSON.stringify({
              Status:Id,
              PageId:pageNo
            }) 
        });
          let responseJson = await response.json();
          return responseJson;
        } catch (error) {
          console.error(error);
        }
  },
  async fetchDetailedMutamers (Id,pageNo){
    let token2 = await AsyncStorage.getItem('token');
    try {
        let response = await fetch('https://eumra.com/gyh/api/gyh/GetMutamers', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token2,
          },
          body: JSON.stringify({
            StatusId:Id,
            PageId:pageNo
          }) 
      });
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.error(error);
      }
},
async fetchDetailedTafweej (Id,pageNo,lang){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetTafweejs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({
          StatusId:Id,
          PageId:pageNo,
          isArabic:lang
        }) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async fetchInboxDetails (Type,pageNo,Read,lang){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetInboxDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({
          "Type": Type,
          "ReadStatus": Read,
          "IsArabic": lang,
          "PageId": pageNo,
          "PageLength": 20
        }) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async fetchDetailedVoucher (Id,pageNo,lang,
  selectedVouchNo,selectedPayState,selectedCancelledVouch,
  selectedExpiredVouch,selectedVouchCountry,selectedVouchAgent,
  selectedByVouchDate,selectedByPaymentDate,selectedVouchFromDate,
  selectedVouchToDate){
    let countriesIds =[];
    if (selectedVouchCountry > 0)
      countriesIds.push(selectedVouchCountry);
    let agentsIds =[];
    if (selectedVouchAgent > 0)
      agentsIds.push(selectedVouchAgent);
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetVouchers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({
          "StatusId": Id,
          "IsArabic": lang,
          "PageId": pageNo,
          "PageLength": 20,
          VoucherNumber:selectedVouchNo,
          PaymentStatus:selectedPayState,
          HideCancelled:selectedCancelledVouch,
          HideExpired:selectedExpiredVouch,
          CountrysIds:countriesIds,
          AgentsIds:agentsIds,
          IssueDateFrom:(selectedByVouchDate)?selectedVouchFromDate:'',
          IssueDateTo:(selectedByVouchDate)?selectedVouchToDate:'',
          PaymentDateFrom:(selectedByPaymentDate)?selectedVouchFromDate:'',
          PaymentDateTo:(selectedByPaymentDate)?selectedVouchToDate:'',
        }) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async fetchSearchedMutamers(Id,pageNo,lang,MutamerName,CountryId,AgentId
  ,mofa,Passport,group,moi){
  let token2 = await AsyncStorage.getItem('token');
  let countriesIds =[];
  if (CountryId > 0)
    countriesIds.push(CountryId);
  let agentsIds =[];
  if (AgentId > 0)
    agentsIds.push(AgentId);
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetMutamers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({
          StatusId:Id,
          PageId:pageNo,
          Name:MutamerName,
          CountrysIds:countriesIds,
          AgentsIds:agentsIds,
          IsArabic:lang,
          PassportNumber:Passport,
          MofaNumber:mofa,
          MoiNumber:moi,
          GroupId:group
        }) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
}

  ,
  async fetchSearchedReports(Status,pageNo,lang,Mutamer,
    arrivalFrom,arrivalTo,DepartureFrom,DepartureTo,
      GroupNo,Passport,CountryId,AgentId){
    let token2 = await AsyncStorage.getItem('token');
    let countriesIds =[];
    if (CountryId > 0)
      countriesIds.push(CountryId);
    let agentsIds =[];
    if (AgentId > 0)
      agentsIds.push(AgentId);
    try {
        let response = await fetch('https://eumra.com/gyh/api/gyh/GetElmReport', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token2,
          },
          body: JSON.stringify({
            GroupNumber: GroupNo,
            PassportNumber: Passport,
            MutamerName: Mutamer,
            ArrivalFrom: arrivalFrom,
            ArrivalTo: arrivalTo,
            DepartureFrom: DepartureFrom,
            DepartureTo: DepartureTo,
            IsArabic: lang,
            PageId: pageNo,
            PageLength: 20,
            CountrysIds: countriesIds,
            AgentsIds: agentsIds
          }) 
      });
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.error(error);
      }
  },
async fetchSearchedGroups(GroupId,pageNo,lang,GroupName,CountryId,AgentId){
  let token2 = await AsyncStorage.getItem('token');
  let countriesIds =[];
  if (CountryId > 0)
    countriesIds.push(CountryId);
  let agentsIds =[];
  if (AgentId > 0)
    agentsIds.push(AgentId);
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetGroups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({
          Status:GroupId,
          PageId:pageNo,
          Name:GroupName,
          CountrysIds:countriesIds,
          AgentsIds:agentsIds,
          isArabic:lang
        }) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async fetchDetailedAgent(pageNo,lang,AgentYear,AgentCountry,AgentId){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetAgentsStatistics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({
          "PageId": pageNo,
          "Language":(lang)?"Ar":"English",
          "PageLength": 20,
          "Year": AgentYear,
          "CountryId": AgentCountry,
          "AgentId":AgentId
        }) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
  async askMofa (Id,lang,IgnoreFilterFlag){
    let token2 = await AsyncStorage.getItem('token');
    let groups = [];
  groups.push(Id);
    try {
        let response = await fetch('https://eumra.com/gyh/api/gyh/AskMofa', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token2,
          },
          body: JSON.stringify({
            GroupIds:groups,
            language:lang,
            IgnoreFilter:IgnoreFilterFlag
          }) 
      });
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.error(error);
      }
},
async getUpdatedStatLookups (lastUpdated){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/UpdateStatsLookups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({LastUpdate: lastUpdated}) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async getUpdatedLookups (lastUpdated){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/UpdateLookups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({LastUpdate: lastUpdated}) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async returnToAgent (Id,lang){
  let groups = [];
  groups.push(Id);
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/ReturnToAgent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({
          GroupIds:groups,
          language:lang
        }) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async pullGroup (Id,lang){
  let groups = [];
  groups.push(Id);
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/PullGroup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({
          GroupIds:groups,
          language:lang
        }) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async changePackage (Id,lang){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/ChangePackage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        },
        body: JSON.stringify({
          GroupId:Id,
          language:lang
        }) 
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async getMainGroups (lang){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetGroupStatusCounts?IsArabic='+(lang == 'ar'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        }
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async getMainInbox (lang){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetInbox?IsArabic='+(lang == 'ar'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        }
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},
async getMainVoucher (lang){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetVoucherStatusCounts?IsArabic='+(lang == 'ar'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        }
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},async getMainMutamers (lang){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetMutamerStatusCounts?IsArabic='+(lang == 'ar'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        }
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
},async getMainTafweej (lang){
  let token2 = await AsyncStorage.getItem('token');
  try {
      let response = await fetch('https://eumra.com/gyh/api/gyh/GetTafweejStatusCounts?IsArabic='+(lang == 'ar'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token2,
        }
    });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
}

}