const axios = require('axios');

class Portal{
    async getServices(addressId){

        const data = {
            adrid: addressId,
            common: false
        };

        const response = await axios.post(
            'https://rebild-sb.renoweb.dk/Legacy/JService.asmx/GetAffaldsplanMateriel_mitAffald',
            data
        ).catch((error) => {
            console.log(error);
        });;

        return JSON.parse(response.data.d).list;
    }

    async getAddress(address){
        const data = {
            addresswithmateriel:3,
            searchterm:address
        };

        const response = await axios.post(
            'https://rebild-sb.renoweb.dk/Legacy/JService.asmx/Adresse_SearchByString',
            data
        ).catch((error) => {
            console.log(error);
            return;
        });
        return JSON.parse(response.data.d).list[0];

    }

    /**
     * Fetches the
     * @return {Promise.<void>}
     */
    async getId(materialId){
        const response = await axios.post(
            'https://rebild.renoweb.dk/Legacy/JService.asmx/GetCalender_mitAffald',
            JSON.parse(materialId)
        ).catch((error) => {
            console.log(error);
        });

        return JSON.parse(response.data.d).list;

    }
}

module.exports = Portal;